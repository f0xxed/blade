# AWS Resources for Blade and Barrel

## Production URLs

- **Primary Domain**: https://bladeandbarrel.com
- **WWW Domain**: https://www.bladeandbarrel.com

## Route 53 Hosted Zone

- **Domain**: `bladeandbarrel.com`
- **Hosted Zone ID**: *(To be populated after setup)*
- **Nameservers**: *(To be populated after setup)*
- **Purpose**: DNS management for custom domain
- **Configuration**: See `infrastructure/route53-config.json`

### DNS Records

| Record Name | Type | Target | Description |
|------------|------|--------|-------------|
| `bladeandbarrel.com` | A (Alias) | CloudFront Distribution | Root domain |
| `www.bladeandbarrel.com` | A (Alias) | CloudFront Distribution | WWW subdomain |
| ACM Validation CNAME | CNAME | ACM-provided value | SSL certificate validation |

## ACM SSL Certificate

- **Certificate ARN**: *(To be populated after setup)*
- **Region**: `us-east-1` (**CRITICAL**: Must be us-east-1 for CloudFront compatibility)
- **Domains Covered**:
  - `bladeandbarrel.com`
  - `www.bladeandbarrel.com`
- **Validation Method**: DNS validation (automatic)
- **Auto-Renewal**: Enabled (AWS manages renewal automatically)
- **Purpose**: HTTPS/SSL for custom domain on CloudFront
- **Configuration**: See `infrastructure/acm-certificate.json`

## S3 Bucket

- **Bucket Name**: `bladeandbarrel-site`
- **Region**: `us-east-1`
- **Website Endpoint**: `http://bladeandbarrel-site.s3-website-us-east-1.amazonaws.com`
- **Purpose**: Static website hosting for React application
- **Configuration**:
  - Static website hosting: Enabled
  - Index document: `index.html`
  - Error document: `index.html` (for SPA routing)
  - Public read access: Enabled via bucket policy

## CloudFront Distribution

- **Distribution ID**: `EJNJPQN7X1JDD`
- **CloudFront Domain**: `d140ojizs9fkiz.cloudfront.net` (internal)
- **Custom Domains**: `bladeandbarrel.com`, `www.bladeandbarrel.com`
- **Origin**: S3 website endpoint (`bladeandbarrel-site.s3-website-us-east-1.amazonaws.com`)
- **Purpose**: Global CDN with HTTPS, custom domain, and SPA routing

### Key Features

- **Custom Domain**: Configured with alternate domain names (CNAMEs)
- **SSL Certificate**: AWS Certificate Manager (ACM)
  - Security Policy: `TLSv1.2_2021`
  - SSL Support Method: SNI only
- **HTTPS**: Enforced (HTTP redirects to HTTPS)
- **Compression**: Enabled (Gzip/Brotli)
- **SPA Routing**: 404/403 errors redirect to `/index.html` with 200 status
- **Default Root Object**: `index.html`
- **Cache TTL**:
  - Min: 0 seconds
  - Default: 86400 seconds (24 hours)
  - Max: 31536000 seconds (1 year)

## Deployment Commands

### Upload to S3
```bash
# Build production bundle
npm run build

# Sync dist folder to S3
aws s3 sync dist/ s3://bladeandbarrel-site/ --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id EJNJPQN7X1JDD --paths "/*"
```

### Cache Invalidation
```bash
aws cloudfront create-invalidation --distribution-id EJNJPQN7X1JDD --paths "/*"
```

## IAM Users and Permissions

### GitHub Actions Deployment User

**User Name**: `github-actions-deploy`
**User ARN**: `arn:aws:iam::171087615758:user/github-actions-deploy`
**Purpose**: Automated CI/CD deployments via GitHub Actions
**Created**: Story 1.4 (CI/CD Pipeline Implementation)

**Attached Policy**: `GitHubActionsDeployPolicy`
**Policy ARN**: `arn:aws:iam::171087615758:policy/GitHubActionsDeployPolicy`

**Permissions (Minimal for Security):**

S3 Permissions:
- `s3:PutObject` - Upload files to S3 bucket
- `s3:DeleteObject` - Delete files from S3 (for --delete flag during sync)
- `s3:ListBucket` - List bucket contents for sync operations

CloudFront Permissions:
- `cloudfront:CreateInvalidation` - Invalidate CloudFront cache after deployment
- `cloudfront:GetInvalidation` - Check invalidation status

**Resource Scope:**
- S3: `arn:aws:s3:::bladeandbarrel-site` and `arn:aws:s3:::bladeandbarrel-site/*`
- CloudFront: `arn:aws:cloudfront::171087615758:distribution/EJNJPQN7X1JDD`

**Access Keys**: Stored in GitHub Secrets (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)

**Security Best Practices:**
- Credentials stored encrypted in GitHub Secrets
- Minimal permissions following principle of least privilege
- No console access (programmatic access only)
- Rotate access keys every 90 days (recommended)

### IAM Permissions Required

#### For Automated Deployment (GitHub Actions)
- `s3:PutObject` - Upload files to S3
- `s3:DeleteObject` - Delete files from S3 (for --delete flag)
- `s3:ListBucket` - List bucket contents
- `cloudfront:CreateInvalidation` - Invalidate CloudFront cache
- `cloudfront:GetInvalidation` - Check invalidation status

#### For Infrastructure Setup (One-time)
- `route53:CreateHostedZone` - Create hosted zone
- `route53:GetHostedZone` - Get hosted zone details
- `route53:ListHostedZones` - List hosted zones
- `route53:ChangeResourceRecordSets` - Create/update DNS records
- `route53:GetChange` - Get DNS change status
- `route53:ListResourceRecordSets` - List DNS records
- `acm:RequestCertificate` - Request SSL certificate
- `acm:DescribeCertificate` - Get certificate details
- `acm:ListCertificates` - List certificates
- `cloudfront:GetDistribution` - Get distribution details
- `cloudfront:GetDistributionConfig` - Get distribution configuration
- `cloudfront:UpdateDistribution` - Update distribution with custom domain

## Cost Estimates

| Service | Cost | Notes |
|---------|------|-------|
| S3 Storage | ~$0.023/GB per month | Static files storage |
| CloudFront Data Transfer | First 1TB free/month, then $0.085/GB | Global CDN delivery |
| CloudFront Requests | $0.0075 per 10,000 HTTPS requests | HTTP/HTTPS requests |
| Route 53 Hosted Zone | $0.50/month | Per hosted zone |
| Route 53 DNS Queries | $0.40 per million queries | First 1 billion queries/month |
| ACM SSL Certificate | **FREE** | Free for CloudFront/ALB/API Gateway |
| Domain Registration | ~$12/year (optional) | If using Route 53 registrar |
| **Estimated Monthly Total** | **<$15-20/month** | Low-traffic site (~10k visitors/month) |

## Custom Domain Setup

See **`CUSTOM-DOMAIN-SETUP.md`** for complete instructions on configuring the custom domain with Route 53, ACM, and CloudFront.

### Quick Setup Commands

```bash
# Step 1: Setup Route 53 hosted zone and ACM certificate (5-30 mins)
cd infrastructure
chmod +x setup-route53-acm.sh
./setup-route53-acm.sh

# Step 2: Update CloudFront with custom domain (10-15 mins)
chmod +x update-cloudfront-custom-domain.sh
./update-cloudfront-custom-domain.sh

# Step 3: Create DNS A records (2-5 mins)
chmod +x create-dns-records.sh
./create-dns-records.sh

# Step 4: Test
# Visit: https://bladeandbarrel.com
# Verify SSL certificate in browser (green padlock)
```

## Resource Identifiers Summary

| Resource | Identifier | Purpose |
|----------|-----------|---------|
| S3 Bucket | `bladeandbarrel-site` | Static website storage |
| CloudFront Distribution | `EJNJPQN7X1JDD` | Global CDN |
| Route 53 Hosted Zone | *(TBD after setup)* | DNS management |
| ACM Certificate | *(TBD after setup)* | SSL/TLS certificate |
| Custom Domain | `bladeandbarrel.com` | Production URL |
