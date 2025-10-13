#!/bin/bash
# Monitor CloudFront deployment status

echo "🔍 Checking CloudFront deployment status..."
echo ""

STATUS=$(aws cloudfront get-distribution --id EJNJPQN7X1JDD --query "Distribution.Status" --output text)

if [ "$STATUS" == "Deployed" ]; then
    echo "✅ CloudFront deployment complete!"
    echo ""
    echo "🧪 Testing security headers on https://bladeandbarrel.com..."
    echo ""
    curl -I https://bladeandbarrel.com 2>/dev/null | grep -i "x-content-type-options\|x-frame-options\|strict-transport-security\|content-security-policy\|referrer-policy"
    echo ""
    echo "📊 Run Mozilla Observatory scan: https://observatory.mozilla.org/"
    echo "   Enter: https://bladeandbarrel.com"
    echo "   Expected: A+ rating (100+ score)"
else
    echo "⏳ Status: $STATUS"
    echo ""
    echo "CloudFront is still deploying to edge locations worldwide."
    echo "This typically takes 5-10 minutes."
    echo ""
    echo "Run this script again in a few minutes to check status."
    echo ""
    echo "Command: bash check-cloudfront-deployment.sh"
fi
