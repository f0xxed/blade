#!/bin/bash

# Wait for certificate to be issued
echo "Checking certificate status..."
CERT_ARN="arn:aws:acm:us-east-1:171087615758:certificate/3b2764e0-3eb7-407f-9587-159a37621b77"
STATUS=$(aws acm describe-certificate --region us-east-1 --certificate-arn $CERT_ARN --query 'Certificate.Status' --output text)

if [ "$STATUS" != "ISSUED" ]; then
    echo "❌ Certificate is still $STATUS"
    echo "Please wait for certificate to be ISSUED before running this script"
    exit 1
fi

echo "✅ Certificate is ISSUED"
echo ""
echo "Updating CloudFront distribution..."

# Get current config
aws cloudfront get-distribution-config --id EJNJPQN7X1JDD --query 'DistributionConfig' > /tmp/cf-config.json
ETAG=$(aws cloudfront get-distribution-config --id EJNJPQN7X1JDD --query 'ETag' --output text)

# Modify config using Python
python3 << 'PYTHON'
import json

with open('/tmp/cf-config.json', 'r') as f:
    config = json.load(f)

# Add custom domains
config['Aliases'] = {
    'Quantity': 2,
    'Items': ['bladeandbarrel.com', 'www.bladeandbarrel.com']
}

# Update SSL certificate
config['ViewerCertificate'] = {
    'ACMCertificateArn': 'arn:aws:acm:us-east-1:171087615758:certificate/3b2764e0-3eb7-407f-9587-159a37621b77',
    'SSLSupportMethod': 'sni-only',
    'MinimumProtocolVersion': 'TLSv1.2_2021',
    'Certificate': 'arn:aws:acm:us-east-1:171087615758:certificate/3b2764e0-3eb7-407f-9587-159a37621b77',
    'CertificateSource': 'acm'
}

with open('/tmp/cf-config-updated.json', 'w') as f:
    json.dump(config, f, indent=2)

print("✅ Config updated")
PYTHON

# Update CloudFront
aws cloudfront update-distribution \
    --id EJNJPQN7X1JDD \
    --distribution-config file:///tmp/cf-config-updated.json \
    --if-match $ETAG

echo ""
echo "✅ CloudFront update initiated"
echo "Distribution will be in 'InProgress' state for 10-15 minutes"
