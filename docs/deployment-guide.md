# Deployment Guide - Blade and Barrel

This guide covers the complete deployment setup for the Blade and Barrel website, including GitHub Actions CI/CD, AWS infrastructure, and troubleshooting.

## Table of Contents

1. [Overview](#overview)
2. [GitHub Repository Setup](#github-repository-setup)
3. [GitHub Secrets Configuration](#github-secrets-configuration)
4. [GitHub Actions Workflow](#github-actions-workflow)
5. [Deployment Process](#deployment-process)
6. [Troubleshooting](#troubleshooting)
7. [Rollback Procedures](#rollback-procedures)

---

## Overview

The Blade and Barrel website uses an automated CI/CD pipeline powered by **GitHub Actions**. Every push to the `main` branch triggers an automatic deployment to AWS.

### Architecture

- **Source Control**: GitHub (f0xxed/blade)
- **CI/CD**: GitHub Actions
- **Hosting**: AWS S3 (static files)
- **CDN**: AWS CloudFront (global distribution)
- **Domain**: bladeandbarrel.com (Route 53 + ACM SSL)
- **Region**: us-east-1

### Deployment Flow

```
Git Push to main
    ↓
GitHub Actions Triggered
    ↓
Checkout Code
    ↓
Setup Node.js 20 + Cache npm
    ↓
Install Dependencies (npm ci)
    ↓
Build Production Bundle (npm run build)
    ↓
Configure AWS Credentials
    ↓
Sync Assets to S3 (optimized cache headers)
    ↓
Upload index.html (no-cache)
    ↓
Invalidate CloudFront Cache
    ↓
Deployment Complete ✓
    ↓
Site Live at https://bladeandbarrel.com (1-5 min propagation)
```

---

## GitHub Repository Setup

### Initial Setup (Already Completed)

The GitHub repository has been created at: **https://github.com/f0xxed/blade**

### Repository Settings

- **Default Branch**: `main`
- **Visibility**: Public
- **GitHub Actions**: Enabled

### Branch Protection (Recommended - Optional)

To prevent accidental pushes to production, configure branch protection:

1. Navigate to **Settings → Branches**
2. Add rule for `main` branch:
   - ✓ Require pull request reviews before merging
   - ✓ Require status checks to pass before merging
   - ✓ Require branches to be up to date before merging

---

## GitHub Secrets Configuration

GitHub Secrets are encrypted environment variables used by the workflow. All secrets have been configured for this project.

### Required Secrets

| Secret Name | Value | Description |
|------------|-------|-------------|
| `AWS_ACCESS_KEY_ID` | `AKIASPVM524HEAACZ3AG` | IAM user access key for deployment |
| `AWS_SECRET_ACCESS_KEY` | `5FS++...` | IAM user secret access key (encrypted) |
| `S3_BUCKET` | `bladeandbarrel-site` | S3 bucket name for static hosting |
| `CLOUDFRONT_DISTRIBUTION_ID` | `EJNJPQN7X1JDD` | CloudFront distribution ID for cache invalidation |
| `VITE_API_BASE_URL` | `https://api.bladeandbarrel.com` | Backend API endpoint (placeholder for future) |
| `VITE_GA4_MEASUREMENT_ID` | *(empty)* | Google Analytics 4 measurement ID (future) |
| `VITE_RECAPTCHA_SITE_KEY` | *(empty)* | reCAPTCHA site key (future) |
| `VITE_INSTAGRAM_BUSINESS_ACCOUNT_ID` | *(empty)* | Instagram Business Account ID (future) |

### IAM User Permissions

The `github-actions-deploy` IAM user has the following minimal permissions:

**S3 Permissions:**
- `s3:PutObject` - Upload files to S3
- `s3:DeleteObject` - Remove old files during sync
- `s3:ListBucket` - List bucket contents for sync

**CloudFront Permissions:**
- `cloudfront:CreateInvalidation` - Invalidate cached content
- `cloudfront:GetInvalidation` - Check invalidation status

**Policy ARN**: `arn:aws:iam::171087615758:policy/GitHubActionsDeployPolicy`

### Viewing Secrets

To view configured secrets:

```bash
# Using GitHub CLI
gh secret list --repo f0xxed/blade

# Via GitHub UI
# Navigate to: Settings → Secrets and variables → Actions
```

### Updating Secrets

```bash
# Update a secret using GitHub CLI
gh secret set SECRET_NAME --body "new-value" --repo f0xxed/blade

# Example: Update API base URL
gh secret set VITE_API_BASE_URL --body "https://api.bladeandbarrel.com" --repo f0xxed/blade
```

---

## GitHub Actions Workflow

### Workflow File Location

`.github/workflows/deploy.yml`

### Workflow Triggers

**Automatic Trigger:**
- Push to `main` branch

**Manual Trigger:**
```bash
# Via GitHub CLI
gh workflow run deploy.yml

# Via GitHub UI
# Navigate to: Actions → Deploy to AWS → Run workflow → Select branch: main
```

### Workflow Steps

1. **Checkout code** (`actions/checkout@v4`)
   - Clones the repository to the runner

2. **Setup Node.js** (`actions/setup-node@v4`)
   - Installs Node.js 20
   - Caches npm dependencies for faster builds

3. **Install dependencies** (`npm ci`)
   - Installs exact versions from `package-lock.json`
   - Faster and more reliable than `npm install`

4. **Build frontend** (`npm run build`)
   - Compiles TypeScript
   - Bundles JavaScript with Vite
   - Processes CSS with Tailwind
   - Optimizes images and assets
   - Injects environment variables from GitHub Secrets
   - Outputs to `/dist` directory

5. **Configure AWS credentials** (`aws-actions/configure-aws-credentials@v4`)
   - Sets up AWS CLI with IAM user credentials
   - Scoped to `us-east-1` region

6. **Sync assets to S3 with long-term caching**
   - Uploads all files except `index.html`
   - Sets cache headers: `public, max-age=31536000, immutable` (1 year)
   - Uses `--delete` flag to remove old files
   - Hashed filenames (Vite) ensure no stale cache issues

7. **Upload index.html with no-cache headers**
   - Uploads `index.html` separately
   - Sets cache headers: `no-cache, no-store, must-revalidate`
   - Ensures users always get latest version
   - Index.html references hashed assets for cache busting

8. **Invalidate CloudFront cache**
   - Invalidates all cached content at edge locations
   - Path: `/*` (all files)
   - Propagation time: 1-5 minutes
   - First 1,000 invalidations/month are FREE

### Workflow Timing

- **Checkout + Node.js setup**: ~20 seconds
- **npm ci (with cache)**: ~30 seconds
- **npm run build**: ~20-40 seconds
- **S3 sync**: ~30-60 seconds
- **CloudFront invalidation**: ~1-5 minutes (async)
- **Total workflow execution**: ~2-3 minutes
- **Time until changes live**: ~3-8 minutes

### Monitoring Workflow Runs

**GitHub UI:**
1. Navigate to **Actions** tab
2. View workflow runs with status indicators (✓ or ✗)
3. Click on a run to see step-by-step logs

**GitHub CLI:**
```bash
# List recent workflow runs
gh run list --workflow=deploy.yml --limit 10

# View specific run
gh run view <run-id>

# Watch a running workflow
gh run watch
```

**Workflow Badge:**

The README.md includes a status badge:

```markdown
[![Deploy to AWS](https://github.com/f0xxed/blade/workflows/Deploy%20to%20AWS/badge.svg)](https://github.com/f0xxed/blade/actions/workflows/deploy.yml)
```

---

## Deployment Process

### Automated Deployment (Standard)

1. **Make changes locally**
   ```bash
   # Edit files in src/
   npm run dev  # Test locally
   npm run build  # Verify build succeeds
   ```

2. **Commit and push to main**
   ```bash
   git add .
   git commit -m "Your descriptive commit message"
   git push origin main
   ```

3. **Monitor deployment**
   ```bash
   # Watch workflow execution
   gh run watch

   # Or visit GitHub Actions tab
   ```

4. **Verify deployment**
   - Wait 1-5 minutes for CloudFront invalidation
   - Visit https://bladeandbarrel.com
   - Verify changes are live
   - Check browser DevTools Network tab for cache headers

### Manual Deployment (Emergency/Rollback)

If GitHub Actions is unavailable or you need immediate deployment:

```bash
# 1. Build production bundle
npm run build

# 2. Sync assets with long-term caching (excludes index.html)
aws s3 sync dist/ s3://bladeandbarrel-site/ --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "index.html"

# 3. Upload index.html with no-cache headers
aws s3 cp dist/index.html s3://bladeandbarrel-site/index.html \
  --cache-control "no-cache, no-store, must-revalidate"

# 4. Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id EJNJPQN7X1JDD --paths "/*"
```

### Testing Deployment

After deployment completes:

1. **Verify site is accessible**
   ```bash
   curl -I https://bladeandbarrel.com
   # Should return 200 OK
   ```

2. **Check cache headers**
   ```bash
   # Check index.html (should be no-cache)
   curl -I https://bladeandbarrel.com/index.html | grep -i cache-control

   # Check assets (should be max-age=31536000)
   curl -I https://bladeandbarrel.com/assets/index-<hash>.js | grep -i cache-control
   ```

3. **Verify HTTPS redirect**
   ```bash
   curl -I http://bladeandbarrel.com
   # Should return 301 redirect to https://
   ```

4. **Test SPA routing**
   ```bash
   curl -I https://bladeandbarrel.com/services
   # Should return 200 (serves index.html)
   ```

---

## Troubleshooting

### Build Failures

**Symptom**: Workflow fails at "Build frontend" step

**Common Causes:**
- TypeScript compilation errors
- Missing dependencies
- Linting errors (if enabled in build)

**Solution:**
```bash
# Run build locally to see exact error
npm run build

# Fix TypeScript errors
npm run lint

# Ensure dependencies are correct
npm ci
```

### S3 Sync Failures

**Symptom**: Workflow fails at "Sync assets to S3" step

**Common Causes:**
- Invalid AWS credentials
- Insufficient IAM permissions
- S3 bucket doesn't exist or is in wrong region

**Solution:**
```bash
# Verify AWS credentials are valid
aws sts get-caller-identity

# Check S3 bucket exists
aws s3 ls s3://bladeandbarrel-site/

# Verify IAM permissions
aws iam get-user-policy --user-name github-actions-deploy --policy-name GitHubActionsDeployPolicy
```

### CloudFront Invalidation Failures

**Symptom**: Workflow fails at "Invalidate CloudFront cache" step

**Common Causes:**
- Invalid CloudFront distribution ID
- Insufficient IAM permissions
- Distribution is disabled

**Solution:**
```bash
# Verify distribution ID and status
aws cloudfront get-distribution --id EJNJPQN7X1JDD

# Check distribution is enabled
aws cloudfront get-distribution --id EJNJPQN7X1JDD | grep -i "enabled"
```

### Changes Not Visible After Deployment

**Symptom**: Deployment succeeds but changes not visible on site

**Common Causes:**
- Browser caching old version
- CloudFront invalidation not complete
- DNS propagation delay

**Solution:**
```bash
# 1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

# 2. Check invalidation status
aws cloudfront get-invalidation --distribution-id EJNJPQN7X1JDD --id <invalidation-id>

# 3. Clear browser cache completely

# 4. Test in incognito/private browsing mode

# 5. Test with curl (bypasses browser cache)
curl -I https://bladeandbarrel.com/
```

### GitHub Actions Workflow Not Triggering

**Symptom**: Push to main doesn't trigger deployment

**Common Causes:**
- Workflow file has syntax errors
- Actions are disabled for repository
- Push was to wrong branch

**Solution:**
```bash
# 1. Verify workflow file syntax
cat .github/workflows/deploy.yml

# 2. Check GitHub Actions are enabled
# Navigate to: Settings → Actions → General → Allow all actions

# 3. Verify branch name
git branch --show-current

# 4. Manually trigger workflow
gh workflow run deploy.yml
```

---

## Rollback Procedures

### Quick Rollback (Revert Commit)

If a bad deployment goes live, the fastest rollback is to revert the commit:

```bash
# 1. Find the last good commit
git log --oneline

# 2. Revert the bad commit
git revert <bad-commit-hash>

# 3. Push to trigger new deployment
git push origin main
```

### Manual Rollback (S3 Versioning)

If S3 versioning is enabled, you can restore a previous version:

```bash
# 1. List previous versions of index.html
aws s3api list-object-versions --bucket bladeandbarrel-site --prefix index.html

# 2. Copy a previous version to current
aws s3api copy-object \
  --bucket bladeandbarrel-site \
  --copy-source bladeandbarrel-site/index.html?versionId=<version-id> \
  --key index.html

# 3. Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id EJNJPQN7X1JDD --paths "/*"
```

### Emergency Rollback (Manual Upload)

If GitHub Actions is down and you need to rollback immediately:

```bash
# 1. Checkout last good commit
git checkout <last-good-commit-hash>

# 2. Build from that commit
npm ci
npm run build

# 3. Manually deploy (see Manual Deployment section above)
aws s3 sync dist/ s3://bladeandbarrel-site/ --delete
aws cloudfront create-invalidation --distribution-id EJNJPQN7X1JDD --paths "/*"

# 4. Return to main branch
git checkout main
```

---

## Best Practices

### Deployment Workflow

1. **Always test locally first**
   ```bash
   npm run build
   npm run preview
   ```

2. **Use feature branches for major changes**
   ```bash
   git checkout -b feature/my-feature
   # Make changes
   git push origin feature/my-feature
   # Create pull request → Review → Merge to main
   ```

3. **Monitor deployments**
   - Watch GitHub Actions during deployment
   - Verify changes on production site
   - Check browser console for errors

4. **Document breaking changes**
   - Update CHANGELOG.md for version history
   - Add deployment notes to commit messages

### Security Best Practices

1. **Never commit secrets**
   - Use `.env.local` for local development
   - Use GitHub Secrets for CI/CD
   - Verify `.gitignore` excludes `.env*` files

2. **Rotate AWS credentials periodically**
   ```bash
   # Create new access key
   aws iam create-access-key --user-name github-actions-deploy

   # Update GitHub Secrets
   gh secret set AWS_ACCESS_KEY_ID --body "new-key-id"
   gh secret set AWS_SECRET_ACCESS_KEY --body "new-secret-key"

   # Delete old access key
   aws iam delete-access-key --user-name github-actions-deploy --access-key-id "old-key-id"
   ```

3. **Audit IAM permissions regularly**
   ```bash
   # Review user policies
   aws iam list-attached-user-policies --user-name github-actions-deploy
   aws iam list-user-policies --user-name github-actions-deploy
   ```

### Performance Optimization

1. **Monitor bundle size**
   ```bash
   # After build, check dist/ size
   npm run build
   du -sh dist/

   # Analyze bundle composition
   npx vite-bundle-visualizer
   ```

2. **Optimize cache invalidation**
   - Only invalidate when necessary
   - Use specific paths instead of `/*` when possible
   - First 1,000 invalidations/month are free

3. **Monitor CloudFront metrics**
   - AWS Console → CloudFront → Distribution → Monitoring
   - Track: Requests, Data transfer, Error rates

---

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [Vite Build Optimization](https://vitejs.dev/guide/build.html)

---

## Support

For deployment issues or questions:
- Check GitHub Actions logs first
- Review this troubleshooting guide
- Contact the development team

---

**Last Updated**: 2025-10-08
**Version**: 1.0
**Author**: Dev Agent (Story 1.4 Implementation)
