#!/bin/bash

# Setup Route 53 Hosted Zone and ACM Certificate for bladeandbarrel.com
# This script automates Tasks 1, 2, and 4 from Story 1.3

set -e  # Exit on any error

DOMAIN="bladeandbarrel.com"
WWW_DOMAIN="www.bladeandbarrel.com"
REGION="us-east-1"  # CRITICAL: ACM cert must be in us-east-1 for CloudFront
CLOUDFRONT_DISTRIBUTION_ID="EJNJPQN7X1JDD"

echo "=========================================="
echo "Route 53 and ACM Setup for $DOMAIN"
echo "=========================================="
echo ""

# ============================================================================
# TASK 1: Check/Create Route 53 Hosted Zone
# ============================================================================

echo "Step 1: Checking Route 53 Hosted Zone for $DOMAIN..."

# Check if hosted zone already exists
HOSTED_ZONE_ID=$(aws route53 list-hosted-zones-by-name --dns-name "$DOMAIN" --query "HostedZones[?Name=='${DOMAIN}.'].Id" --output text 2>/dev/null | cut -d'/' -f3)

if [ -z "$HOSTED_ZONE_ID" ]; then
    echo "✗ Hosted zone not found. Creating new hosted zone..."

    # Create hosted zone
    CREATE_RESPONSE=$(aws route53 create-hosted-zone \
        --name "$DOMAIN" \
        --caller-reference "bladeandbarrel-$(date +%s)" \
        --hosted-zone-config Comment="Blade and Barrel website hosted zone" \
        --output json)

    HOSTED_ZONE_ID=$(echo "$CREATE_RESPONSE" | jq -r '.HostedZone.Id' | cut -d'/' -f3)
    echo "✓ Created hosted zone: $HOSTED_ZONE_ID"
else
    echo "✓ Hosted zone already exists: $HOSTED_ZONE_ID"
fi

# Get nameservers
NAMESERVERS=$(aws route53 get-hosted-zone --id "$HOSTED_ZONE_ID" --query "DelegationSet.NameServers" --output json)
echo ""
echo "Nameservers for $DOMAIN:"
echo "$NAMESERVERS" | jq -r '.[]'
echo ""
echo "⚠️  IMPORTANT: If domain is registered externally, update nameservers at your registrar!"
echo ""

# Save hosted zone info to file
cat > infrastructure/route53-config.json <<EOF
{
  "hostedZoneId": "$HOSTED_ZONE_ID",
  "domain": "$DOMAIN",
  "nameservers": $NAMESERVERS,
  "createdAt": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "dnsRecords": []
}
EOF

echo "✓ Saved hosted zone config to infrastructure/route53-config.json"
echo ""

# ============================================================================
# TASK 2: Request ACM Certificate
# ============================================================================

echo "Step 2: Requesting ACM Certificate for $DOMAIN and $WWW_DOMAIN..."
echo "Region: $REGION (CRITICAL: Must be us-east-1 for CloudFront)"
echo ""

# Check if certificate already exists
EXISTING_CERT=$(aws acm list-certificates \
    --region "$REGION" \
    --query "CertificateSummaryList[?DomainName=='$DOMAIN'].CertificateArn" \
    --output text 2>/dev/null)

if [ -n "$EXISTING_CERT" ]; then
    echo "✓ Certificate already exists: $EXISTING_CERT"
    CERT_ARN="$EXISTING_CERT"
else
    echo "✗ Certificate not found. Requesting new certificate..."

    # Request certificate with DNS validation
    CERT_ARN=$(aws acm request-certificate \
        --region "$REGION" \
        --domain-name "$DOMAIN" \
        --subject-alternative-names "$WWW_DOMAIN" \
        --validation-method DNS \
        --tags Key=Name,Value="Blade and Barrel Website Certificate" \
        --query "CertificateArn" \
        --output text)

    echo "✓ Certificate requested: $CERT_ARN"
    echo ""
    echo "⏳ Waiting 10 seconds for certificate details to be available..."
    sleep 10
fi

echo ""
echo "Step 3: Retrieving DNS validation records from ACM..."

# Get DNS validation records
VALIDATION_RECORDS=$(aws acm describe-certificate \
    --region "$REGION" \
    --certificate-arn "$CERT_ARN" \
    --query "Certificate.DomainValidationOptions" \
    --output json)

echo "✓ Retrieved validation records"
echo ""

# Extract CNAME records (ACM provides same validation record for both domains)
CNAME_NAME=$(echo "$VALIDATION_RECORDS" | jq -r '.[0].ResourceRecord.Name')
CNAME_VALUE=$(echo "$VALIDATION_RECORDS" | jq -r '.[0].ResourceRecord.Value')

echo "DNS Validation CNAME Record:"
echo "  Name:  $CNAME_NAME"
echo "  Value: $CNAME_VALUE"
echo ""

# ============================================================================
# TASK 4: Create DNS Validation CNAME Record in Route 53
# ============================================================================

echo "Step 4: Creating DNS validation CNAME record in Route 53..."

# Check if validation record already exists
EXISTING_VALIDATION_RECORD=$(aws route53 list-resource-record-sets \
    --hosted-zone-id "$HOSTED_ZONE_ID" \
    --query "ResourceRecordSets[?Name=='${CNAME_NAME}'].Name" \
    --output text)

if [ -z "$EXISTING_VALIDATION_RECORD" ]; then
    # Create CNAME record for certificate validation
    CHANGE_BATCH=$(cat <<EOF
{
  "Changes": [
    {
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "$CNAME_NAME",
        "Type": "CNAME",
        "TTL": 300,
        "ResourceRecords": [
          {
            "Value": "$CNAME_VALUE"
          }
        ]
      }
    }
  ]
}
EOF
)

    CHANGE_ID=$(aws route53 change-resource-record-sets \
        --hosted-zone-id "$HOSTED_ZONE_ID" \
        --change-batch "$CHANGE_BATCH" \
        --query "ChangeInfo.Id" \
        --output text)

    echo "✓ Created DNS validation CNAME record (Change ID: $CHANGE_ID)"
else
    echo "✓ DNS validation CNAME record already exists"
fi

echo ""

# Save ACM certificate info to file
cat > infrastructure/acm-certificate.json <<EOF
{
  "certificateArn": "$CERT_ARN",
  "region": "$REGION",
  "domains": [
    "$DOMAIN",
    "$WWW_DOMAIN"
  ],
  "validationMethod": "DNS",
  "validationRecords": [
    {
      "name": "$CNAME_NAME",
      "value": "$CNAME_VALUE",
      "type": "CNAME"
    }
  ],
  "requestedAt": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF

echo "✓ Saved ACM certificate config to infrastructure/acm-certificate.json"
echo ""

# ============================================================================
# Wait for Certificate Validation
# ============================================================================

echo "Step 5: Waiting for ACM certificate validation..."
echo "⏳ This typically takes 5-30 minutes. Checking every 30 seconds..."
echo ""

while true; do
    CERT_STATUS=$(aws acm describe-certificate \
        --region "$REGION" \
        --certificate-arn "$CERT_ARN" \
        --query "Certificate.Status" \
        --output text)

    if [ "$CERT_STATUS" == "ISSUED" ]; then
        echo "✓ Certificate validated and issued!"
        break
    elif [ "$CERT_STATUS" == "FAILED" ] || [ "$CERT_STATUS" == "VALIDATION_TIMED_OUT" ]; then
        echo "✗ Certificate validation failed: $CERT_STATUS"
        exit 1
    else
        echo "  Status: $CERT_STATUS (waiting...)"
        sleep 30
    fi
done

echo ""
echo "=========================================="
echo "✓ Route 53 and ACM Setup Complete!"
echo "=========================================="
echo ""
echo "Summary:"
echo "  Hosted Zone ID: $HOSTED_ZONE_ID"
echo "  Certificate ARN: $CERT_ARN"
echo "  Certificate Status: ISSUED"
echo ""
echo "Next Steps:"
echo "  1. Run ./infrastructure/update-cloudfront-custom-domain.sh to configure CloudFront"
echo "  2. Run ./infrastructure/create-dns-records.sh to create A records"
echo ""
echo "⚠️  If domain is registered externally, update nameservers at your registrar:"
echo "$NAMESERVERS" | jq -r '.[]'
echo ""
