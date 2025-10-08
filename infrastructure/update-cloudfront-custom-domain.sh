#!/bin/bash

# Update CloudFront Distribution with Custom Domain and SSL Certificate
# This script automates Task 3 from Story 1.3

set -e  # Exit on any error

DOMAIN="bladeandbarrel.com"
WWW_DOMAIN="www.bladeandbarrel.com"
DISTRIBUTION_ID="EJNJPQN7X1JDD"
REGION="us-east-1"

echo "=========================================="
echo "CloudFront Custom Domain Configuration"
echo "=========================================="
echo ""

# ============================================================================
# Load Certificate ARN from acm-certificate.json
# ============================================================================

if [ ! -f "infrastructure/acm-certificate.json" ]; then
    echo "✗ Error: infrastructure/acm-certificate.json not found"
    echo "  Please run ./infrastructure/setup-route53-acm.sh first"
    exit 1
fi

CERT_ARN=$(jq -r '.certificateArn' infrastructure/acm-certificate.json)

if [ -z "$CERT_ARN" ] || [ "$CERT_ARN" == "null" ]; then
    echo "✗ Error: Certificate ARN not found in acm-certificate.json"
    exit 1
fi

echo "✓ Loaded Certificate ARN: $CERT_ARN"
echo ""

# ============================================================================
# Verify Certificate Status
# ============================================================================

echo "Step 1: Verifying ACM certificate status..."

CERT_STATUS=$(aws acm describe-certificate \
    --region "$REGION" \
    --certificate-arn "$CERT_ARN" \
    --query "Certificate.Status" \
    --output text)

if [ "$CERT_STATUS" != "ISSUED" ]; then
    echo "✗ Error: Certificate status is '$CERT_STATUS' (must be 'ISSUED')"
    echo "  Please wait for certificate validation to complete"
    exit 1
fi

echo "✓ Certificate status: ISSUED"
echo ""

# ============================================================================
# Get Current CloudFront Distribution Configuration
# ============================================================================

echo "Step 2: Retrieving current CloudFront distribution configuration..."

DIST_CONFIG=$(aws cloudfront get-distribution-config \
    --id "$DISTRIBUTION_ID" \
    --output json)

ETAG=$(echo "$DIST_CONFIG" | jq -r '.ETag')
CURRENT_CONFIG=$(echo "$DIST_CONFIG" | jq '.DistributionConfig')

echo "✓ Retrieved configuration (ETag: $ETAG)"
echo ""

# ============================================================================
# Update Configuration with Custom Domain and Certificate
# ============================================================================

echo "Step 3: Updating CloudFront configuration with custom domain..."

# Add alternate domain names (CNAMEs)
UPDATED_CONFIG=$(echo "$CURRENT_CONFIG" | jq \
    --arg domain "$DOMAIN" \
    --arg wwwDomain "$WWW_DOMAIN" \
    '
    .Aliases = {
        "Quantity": 2,
        "Items": [$domain, $wwwDomain]
    }
    ')

# Add custom SSL certificate
UPDATED_CONFIG=$(echo "$UPDATED_CONFIG" | jq \
    --arg certArn "$CERT_ARN" \
    '
    .ViewerCertificate = {
        "ACMCertificateArn": $certArn,
        "SSLSupportMethod": "sni-only",
        "MinimumProtocolVersion": "TLSv1.2_2021",
        "Certificate": $certArn,
        "CertificateSource": "acm"
    }
    ')

echo "  ✓ Added alternate domain names: $DOMAIN, $WWW_DOMAIN"
echo "  ✓ Associated SSL certificate: $CERT_ARN"
echo "  ✓ Set security policy: TLSv1.2_2021"
echo ""

# ============================================================================
# Apply Configuration Update
# ============================================================================

echo "Step 4: Applying configuration changes to CloudFront..."

# Save updated config to temporary file
echo "$UPDATED_CONFIG" > /tmp/cloudfront-config-update.json

# Update distribution
UPDATE_RESPONSE=$(aws cloudfront update-distribution \
    --id "$DISTRIBUTION_ID" \
    --distribution-config file:///tmp/cloudfront-config-update.json \
    --if-match "$ETAG" \
    --output json)

NEW_ETAG=$(echo "$UPDATE_RESPONSE" | jq -r '.ETag')

echo "✓ Configuration updated successfully (New ETag: $NEW_ETAG)"
echo ""

# Clean up temp file
rm /tmp/cloudfront-config-update.json

# ============================================================================
# Wait for Distribution Deployment
# ============================================================================

echo "Step 5: Waiting for CloudFront distribution deployment..."
echo "⏳ This typically takes 10-15 minutes. Checking every 30 seconds..."
echo ""

while true; do
    DIST_STATUS=$(aws cloudfront get-distribution \
        --id "$DISTRIBUTION_ID" \
        --query "Distribution.Status" \
        --output text)

    if [ "$DIST_STATUS" == "Deployed" ]; then
        echo "✓ Distribution deployed!"
        break
    else
        echo "  Status: $DIST_STATUS (waiting...)"
        sleep 30
    fi
done

echo ""

# ============================================================================
# Update cloudfront-config.json Reference File
# ============================================================================

echo "Step 6: Updating infrastructure/cloudfront-config.json..."

# Read existing config
EXISTING_CF_CONFIG=$(cat infrastructure/cloudfront-config.json)

# Add custom domain configuration
UPDATED_CF_CONFIG=$(echo "$EXISTING_CF_CONFIG" | jq \
    --arg domain "$DOMAIN" \
    --arg wwwDomain "$WWW_DOMAIN" \
    --arg certArn "$CERT_ARN" \
    '
    . + {
        "AlternateDomainNames": {
            "Quantity": 2,
            "Items": [$domain, $wwwDomain]
        },
        "CustomSSLCertificate": {
            "ACMCertificateArn": $certArn,
            "SSLSupportMethod": "sni-only",
            "MinimumProtocolVersion": "TLSv1.2_2021"
        }
    }
    ')

echo "$UPDATED_CF_CONFIG" > infrastructure/cloudfront-config.json

echo "✓ Updated cloudfront-config.json with custom domain configuration"
echo ""

# ============================================================================
# Summary
# ============================================================================

echo "=========================================="
echo "✓ CloudFront Custom Domain Setup Complete!"
echo "=========================================="
echo ""
echo "Summary:"
echo "  Distribution ID: $DISTRIBUTION_ID"
echo "  Custom Domains: $DOMAIN, $WWW_DOMAIN"
echo "  SSL Certificate: $CERT_ARN"
echo "  Security Policy: TLSv1.2_2021"
echo "  Status: Deployed"
echo ""
echo "Next Steps:"
echo "  1. Run ./infrastructure/create-dns-records.sh to create A records in Route 53"
echo "  2. Wait 2-5 minutes for DNS propagation"
echo "  3. Test: https://$DOMAIN"
echo "  4. Test: https://$WWW_DOMAIN"
echo ""
