#!/bin/bash

# CloudFront Cache Invalidation Script
# Invalidates all files in the CloudFront distribution

DISTRIBUTION_ID="EJNJPQN7X1JDD"

echo "Invalidating CloudFront cache for distribution: $DISTRIBUTION_ID"

aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"

echo "Invalidation request submitted. Check status with:"
echo "aws cloudfront get-invalidation --distribution-id $DISTRIBUTION_ID --id <INVALIDATION_ID>"
