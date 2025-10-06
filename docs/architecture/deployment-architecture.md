# Deployment Architecture

## Deployment Strategy

**Frontend Deployment:**
- **Platform:** AWS S3 + CloudFront CDN
- **Build Command:** `npm run build`
- **Output Directory:** `dist/`
- **CDN/Edge:** CloudFront global edge locations with 1-year cache for assets, no-cache for index.html

**Backend Deployment:**
- **Platform:** AWS Lambda + API Gateway
- **Build Command:** `cd lambda/{function} && npm install --production`
- **Deployment Method:** ZIP upload via AWS CLI or GitHub Actions

## CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to AWS

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build frontend
        run: npm run build
        env:
          VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
          VITE_GA4_MEASUREMENT_ID: ${{ secrets.VITE_GA4_MEASUREMENT_ID }}
          VITE_RECAPTCHA_SITE_KEY: ${{ secrets.VITE_RECAPTCHA_SITE_KEY }}
          VITE_INSTAGRAM_BUSINESS_ACCOUNT_ID: ${{ secrets.VITE_INSTAGRAM_BUSINESS_ACCOUNT_ID }}

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Sync to S3
        run: |
          aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} --delete \
            --cache-control "public, max-age=31536000, immutable" \
            --exclude "index.html"

          aws s3 cp dist/index.html s3://${{ secrets.S3_BUCKET }}/index.html \
            --cache-control "no-cache, no-store, must-revalidate"

      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"

  deploy-lambda:
    runs-on: ubuntu-latest
    needs: deploy-frontend
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Deploy contact-form Lambda
        run: |
          cd lambda/contact-form
          npm install --production
          zip -r function.zip .
          aws lambda update-function-code \
            --function-name blade-contact-form \
            --zip-file fileb://function.zip

      - name: Deploy instagram-proxy Lambda
        run: |
          cd lambda/instagram-proxy
          npm install --production
          zip -r function.zip .
          aws lambda update-function-code \
            --function-name blade-instagram-proxy \
            --zip-file fileb://function.zip
```

## Environments

| Environment | Frontend URL | Backend URL | Purpose |
|-------------|--------------|-------------|---------|
| Development | http://localhost:5173 | http://localhost:3000 | Local development |
| Staging | https://staging.bladeandbarrel.com | https://api-staging.bladeandbarrel.com | Pre-production testing |
| Production | https://bladeandbarrel.com | https://api.bladeandbarrel.com | Live environment |

**Deployment Process:**
1. Developer pushes to `main` branch
2. GitHub Actions triggers CI/CD pipeline
3. Frontend builds with production environment variables
4. Static files sync to S3 with optimized cache headers
5. CloudFront cache invalidated to serve fresh content
6. Lambda functions updated with production code
7. Deployment status reported in GitHub Actions

**Rollback Strategy:**
- S3 versioning enabled for quick rollback to previous deployment
- Lambda versions tagged for instant revert if issues detected
- CloudFront cache can be invalidated to force fresh content delivery
