#!/bin/bash

# Create Route 53 DNS A Records (Alias) for Custom Domain
# This script automates Task 4 from Story 1.3

set -e  # Exit on any error

DOMAIN="bladeandbarrel.com"
WWW_DOMAIN="www.bladeandbarrel.com"
DISTRIBUTION_ID="EJNJPQN7X1JDD"

echo "=========================================="
echo "Route 53 DNS A Records Setup"
echo "=========================================="
echo ""

# ============================================================================
# Load Configuration
# ============================================================================

if [ ! -f "infrastructure/route53-config.json" ]; then
    echo "✗ Error: infrastructure/route53-config.json not found"
    echo "  Please run ./infrastructure/setup-route53-acm.sh first"
    exit 1
fi

HOSTED_ZONE_ID=$(jq -r '.hostedZoneId' infrastructure/route53-config.json)

if [ -z "$HOSTED_ZONE_ID" ] || [ "$HOSTED_ZONE_ID" == "null" ]; then
    echo "✗ Error: Hosted Zone ID not found in route53-config.json"
    exit 1
fi

echo "✓ Loaded Hosted Zone ID: $HOSTED_ZONE_ID"
echo ""

# ============================================================================
# Get CloudFront Distribution Details
# ============================================================================

echo "Step 1: Retrieving CloudFront distribution details..."

DIST_DOMAIN=$(aws cloudfront get-distribution \
    --id "$DISTRIBUTION_ID" \
    --query "Distribution.DomainName" \
    --output text)

echo "✓ CloudFront Domain: $DIST_DOMAIN"
echo ""

# ============================================================================
# Create A Record for Root Domain
# ============================================================================

echo "Step 2: Creating A record (alias) for $DOMAIN..."

# Check if record already exists
EXISTING_ROOT_RECORD=$(aws route53 list-resource-record-sets \
    --hosted-zone-id "$HOSTED_ZONE_ID" \
    --query "ResourceRecordSets[?Name=='${DOMAIN}.' && Type=='A'].Name" \
    --output text)

if [ -z "$EXISTING_ROOT_RECORD" ]; then
    # Create A record (alias) for root domain
    ROOT_CHANGE_BATCH=$(cat <<EOF
{
  "Changes": [
    {
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "$DOMAIN",
        "Type": "A",
        "AliasTarget": {
          "HostedZoneId": "Z2FDTNDATAQYW2",
          "DNSName": "$DIST_DOMAIN",
          "EvaluateTargetHealth": false
        }
      }
    }
  ]
}
EOF
)

    ROOT_CHANGE_ID=$(aws route53 change-resource-record-sets \
        --hosted-zone-id "$HOSTED_ZONE_ID" \
        --change-batch "$ROOT_CHANGE_BATCH" \
        --query "ChangeInfo.Id" \
        --output text)

    echo "✓ Created A record for $DOMAIN (Change ID: $ROOT_CHANGE_ID)"
else
    echo "✓ A record already exists for $DOMAIN"
fi

echo ""

# ============================================================================
# Create A Record for WWW Subdomain
# ============================================================================

echo "Step 3: Creating A record (alias) for $WWW_DOMAIN..."

# Check if record already exists
EXISTING_WWW_RECORD=$(aws route53 list-resource-record-sets \
    --hosted-zone-id "$HOSTED_ZONE_ID" \
    --query "ResourceRecordSets[?Name=='${WWW_DOMAIN}.' && Type=='A'].Name" \
    --output text)

if [ -z "$EXISTING_WWW_RECORD" ]; then
    # Create A record (alias) for www subdomain
    WWW_CHANGE_BATCH=$(cat <<EOF
{
  "Changes": [
    {
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "$WWW_DOMAIN",
        "Type": "A",
        "AliasTarget": {
          "HostedZoneId": "Z2FDTNDATAQYW2",
          "DNSName": "$DIST_DOMAIN",
          "EvaluateTargetHealth": false
        }
      }
    }
  ]
}
EOF
)

    WWW_CHANGE_ID=$(aws route53 change-resource-record-sets \
        --hosted-zone-id "$HOSTED_ZONE_ID" \
        --change-batch "$WWW_CHANGE_BATCH" \
        --query "ChangeInfo.Id" \
        --output text)

    echo "✓ Created A record for $WWW_DOMAIN (Change ID: $WWW_CHANGE_ID)"
else
    echo "✓ A record already exists for $WWW_DOMAIN"
fi

echo ""

# ============================================================================
# Update route53-config.json with DNS Records
# ============================================================================

echo "Step 4: Updating infrastructure/route53-config.json with DNS records..."

# Read existing config
EXISTING_R53_CONFIG=$(cat infrastructure/route53-config.json)

# Add DNS records
UPDATED_R53_CONFIG=$(echo "$EXISTING_R53_CONFIG" | jq \
    --arg domain "$DOMAIN" \
    --arg wwwDomain "$WWW_DOMAIN" \
    --arg cfDomain "$DIST_DOMAIN" \
    --arg distributionId "$DISTRIBUTION_ID" \
    '
    .dnsRecords = [
        {
            "name": $domain,
            "type": "A",
            "aliasTarget": {
                "hostedZoneId": "Z2FDTNDATAQYW2",
                "dnsName": $cfDomain,
                "evaluateTargetHealth": false
            },
            "description": "Root domain alias to CloudFront"
        },
        {
            "name": $wwwDomain,
            "type": "A",
            "aliasTarget": {
                "hostedZoneId": "Z2FDTNDATAQYW2",
                "dnsName": $cfDomain,
                "evaluateTargetHealth": false
            },
            "description": "WWW subdomain alias to CloudFront"
        }
    ] |
    .cloudFrontDistribution = {
        "id": $distributionId,
        "domain": $cfDomain
    }
    ')

echo "$UPDATED_R53_CONFIG" > infrastructure/route53-config.json

echo "✓ Updated route53-config.json with DNS records"
echo ""

# ============================================================================
# Test DNS Propagation
# ============================================================================

echo "Step 5: Testing DNS propagation..."
echo "⏳ Waiting 30 seconds for initial propagation..."
sleep 30
echo ""

# Test root domain
echo "Testing DNS resolution for $DOMAIN:"
if nslookup "$DOMAIN" >/dev/null 2>&1; then
    RESOLVED_IP=$(nslookup "$DOMAIN" | grep -A 1 "Name:" | tail -1 | awk '{print $2}')
    echo "  ✓ Resolves to: $RESOLVED_IP"
else
    echo "  ⚠️  Not yet propagated (may take 2-5 minutes)"
fi

echo ""

# Test www subdomain
echo "Testing DNS resolution for $WWW_DOMAIN:"
if nslookup "$WWW_DOMAIN" >/dev/null 2>&1; then
    RESOLVED_IP=$(nslookup "$WWW_DOMAIN" | grep -A 1 "Name:" | tail -1 | awk '{print $2}')
    echo "  ✓ Resolves to: $RESOLVED_IP"
else
    echo "  ⚠️  Not yet propagated (may take 2-5 minutes)"
fi

echo ""

# ============================================================================
# Summary
# ============================================================================

echo "=========================================="
echo "✓ DNS A Records Created Successfully!"
echo "=========================================="
echo ""
echo "Summary:"
echo "  Hosted Zone ID: $HOSTED_ZONE_ID"
echo "  Root Domain: $DOMAIN → CloudFront ($DIST_DOMAIN)"
echo "  WWW Domain: $WWW_DOMAIN → CloudFront ($DIST_DOMAIN)"
echo ""
echo "Note: Z2FDTNDATAQYW2 is the CloudFront hosted zone ID (required for alias records)"
echo ""
echo "Next Steps:"
echo "  1. Wait 2-5 minutes for DNS propagation (typically very fast with Route 53)"
echo "  2. Test HTTPS: https://$DOMAIN"
echo "  3. Test HTTPS: https://$WWW_DOMAIN"
echo "  4. Verify HTTP redirects to HTTPS"
echo "  5. Check SSL certificate in browser (green padlock)"
echo ""
echo "Verification Commands:"
echo "  nslookup $DOMAIN"
echo "  nslookup $WWW_DOMAIN"
echo "  curl -I https://$DOMAIN"
echo "  curl -I https://$WWW_DOMAIN"
echo ""
