#!/bin/bash

echo "=== Blade and Barrel Domain Setup Status ==="
echo ""

# Check certificate status
echo "1. ACM Certificate Status:"
CERT_STATUS=$(aws acm describe-certificate --region us-east-1 --certificate-arn arn:aws:acm:us-east-1:171087615758:certificate/3b2764e0-3eb7-407f-9587-159a37621b77 --query 'Certificate.Status' --output text 2>/dev/null)
if [ "$CERT_STATUS" == "ISSUED" ]; then
    echo "   ✅ ISSUED"
else
    echo "   ⏳ $CERT_STATUS (waiting...)"
fi

echo ""

# Check CloudFront status
echo "2. CloudFront Distribution Status:"
CF_STATUS=$(aws cloudfront get-distribution --id EJNJPQN7X1JDD --query 'Distribution.Status' --output text 2>/dev/null)
CF_ALIASES=$(aws cloudfront get-distribution --id EJNJPQN7X1JDD --query 'Distribution.DistributionConfig.Aliases.Items' --output text 2>/dev/null)
echo "   Status: $CF_STATUS"
if [ -z "$CF_ALIASES" ]; then
    echo "   Custom domains: ❌ Not configured yet"
else
    echo "   Custom domains: ✅ $CF_ALIASES"
fi

echo ""

# Check DNS records
echo "3. Route 53 DNS Records:"
A_ROOT=$(aws route53 list-resource-record-sets --hosted-zone-id Z0097765505SEDE32M9A --query "ResourceRecordSets[?Name=='bladeandbarrel.com.'].Type" --output text 2>/dev/null)
A_WWW=$(aws route53 list-resource-record-sets --hosted-zone-id Z0097765505SEDE32M9A --query "ResourceRecordSets[?Name=='www.bladeandbarrel.com.'].Type" --output text 2>/dev/null)

if [ "$A_ROOT" == "A" ]; then
    echo "   ✅ bladeandbarrel.com A record exists"
else
    echo "   ❌ bladeandbarrel.com A record missing"
fi

if [ "$A_WWW" == "A" ]; then
    echo "   ✅ www.bladeandbarrel.com A record exists"
else
    echo "   ❌ www.bladeandbarrel.com A record missing"
fi

echo ""
echo "=== Next Steps ==="

if [ "$CERT_STATUS" != "ISSUED" ]; then
    echo "⏳ Waiting for certificate validation (5-30 minutes)"
    echo "   Run: ./check-status.sh to check again"
elif [ -z "$CF_ALIASES" ]; then
    echo "📝 Run: ./update-cloudfront.sh"
elif [ "$A_ROOT" != "A" ] || [ "$A_WWW" != "A" ]; then
    echo "📝 Run: ./create-dns-records.sh"
else
    echo "✅ All configured! Test your site:"
    echo "   https://bladeandbarrel.com"
    echo "   https://www.bladeandbarrel.com"
fi

echo ""
