#!/bin/bash

echo "Creating Route 53 A records..."

HOSTED_ZONE_ID="Z0097765505SEDE32M9A"

# Create A record for root domain
echo "Creating A record for bladeandbarrel.com..."
aws route53 change-resource-record-sets --hosted-zone-id $HOSTED_ZONE_ID --change-batch '{
  "Changes": [{
    "Action": "CREATE",
    "ResourceRecordSet": {
      "Name": "bladeandbarrel.com",
      "Type": "A",
      "AliasTarget": {
        "HostedZoneId": "Z2FDTNDATAQYW2",
        "DNSName": "d140ojizs9fkiz.cloudfront.net",
        "EvaluateTargetHealth": false
      }
    }
  }]
}'

echo ""
echo "Creating A record for www.bladeandbarrel.com..."
aws route53 change-resource-record-sets --hosted-zone-id $HOSTED_ZONE_ID --change-batch '{
  "Changes": [{
    "Action": "CREATE",
    "ResourceRecordSet": {
      "Name": "www.bladeandbarrel.com",
      "Type": "A",
      "AliasTarget": {
        "HostedZoneId": "Z2FDTNDATAQYW2",
        "DNSName": "d140ojizs9fkiz.cloudfront.net",
        "EvaluateTargetHealth": false
      }
    }
  }]
}'

echo ""
echo "✅ DNS records created!"
echo ""
echo "Wait 2-5 minutes for DNS propagation, then test:"
echo "  nslookup bladeandbarrel.com"
echo "  nslookup www.bladeandbarrel.com"
echo "  curl -I https://bladeandbarrel.com"
echo "  curl -I https://www.bladeandbarrel.com"
