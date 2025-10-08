# Custom Domain Setup Guide - bladeandbarrel.com

This guide provides step-by-step instructions for configuring the custom domain `bladeandbarrel.com` with AWS Route 53, ACM SSL certificate, and CloudFront CDN.

## Overview

This setup enables:
- **Custom Domain**: bladeandbarrel.com (instead of CloudFront's d140ojizs9fkiz.cloudfront.net)
- **HTTPS Enforcement**: Automatic HTTP → HTTPS redirect
- **SSL/TLS Certificate**: Free AWS Certificate Manager (ACM) certificate
- **Global CDN**: CloudFront edge locations worldwide
- **Dual Domain Support**: Both `bladeandbarrel.com` and `www.bladeandbarrel.com`

## Prerequisites

### Required Tools

1. **AWS CLI v2.x** - [Install Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
   ```bash
   aws --version
   # Should show: aws-cli/2.x.x or higher
   ```

2. **jq** - JSON processor
   ```bash
   # Windows (via chocolatey)
   choco install jq

   # macOS
   brew install jq

   # Linux
   sudo apt-get install jq
   ```

3. **Bash** - Shell environment
   - Windows: Use Git Bash or WSL
   - macOS/Linux: Built-in

### AWS Credentials

Configure AWS CLI with credentials that have the following IAM permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "route53:CreateHostedZone",
        "route53:GetHostedZone",
        "route53:ListHostedZones",
        "route53:ListHostedZonesByName",
        "route53:ChangeResourceRecordSets",
        "route53:GetChange",
        "route53:ListResourceRecordSets",
        "acm:RequestCertificate",
        "acm:DescribeCertificate",
        "acm:ListCertificates",
        "cloudfront:GetDistribution",
        "cloudfront:GetDistributionConfig",
        "cloudfront:UpdateDistribution"
      ],
      "Resource": "*"
    }
  ]
}
```

**Configure credentials:**
```bash
aws configure
# Enter: Access Key ID, Secret Access Key, Region (us-east-1), Output (json)
```

## Domain Registration

**CRITICAL**: The domain `bladeandbarrel.com` must be registered before proceeding.

### Option 1: Domain Already Registered in Route 53
✅ Skip to [Step 1: Automated Setup](#step-1-automated-setup)

### Option 2: Domain Registered Externally (GoDaddy, Namecheap, etc.)
You'll need to update nameservers at your registrar after running the setup scripts. Instructions are provided during script execution.

### Option 3: Domain Not Yet Registered
Register the domain using one of these options:

**Via AWS Route 53 ($12/year for .com):**
1. Go to [Route 53 Console → Registered Domains](https://console.aws.amazon.com/route53/home#DomainRegistration)
2. Click "Register Domain"
3. Enter `bladeandbarrel.com` and follow registration steps
4. Registration takes **1-3 business days**

**Via External Registrar:**
1. Register at GoDaddy, Namecheap, Google Domains, etc.
2. You'll update nameservers to Route 53 after setup

⚠️ **Wait for domain registration to complete before proceeding**

---

## Setup Process

The setup consists of 3 automated scripts that handle all AWS configuration:

1. **`setup-route53-acm.sh`** - Creates Route 53 hosted zone and ACM certificate
2. **`update-cloudfront-custom-domain.sh`** - Configures CloudFront with custom domain
3. **`create-dns-records.sh`** - Creates DNS A records pointing to CloudFront

---

## Step 1: Route 53 Hosted Zone and ACM Certificate Setup

This script creates the Route 53 hosted zone, requests an ACM SSL certificate, and validates it via DNS.

### Run the Script

```bash
cd infrastructure
chmod +x setup-route53-acm.sh
./setup-route53-acm.sh
```

### What This Script Does

1. **Creates Route 53 Hosted Zone** (if not exists)
   - Hosted zone for `bladeandbarrel.com`
   - Retrieves nameservers (NS records)
   - Saves configuration to `infrastructure/route53-config.json`

2. **Requests ACM SSL Certificate** (if not exists)
   - Region: `us-east-1` (REQUIRED for CloudFront)
   - Domains: `bladeandbarrel.com` + `www.bladeandbarrel.com`
   - Validation method: DNS
   - Saves configuration to `infrastructure/acm-certificate.json`

3. **Creates DNS Validation CNAME Record**
   - ACM provides a CNAME record for validation
   - Script automatically creates it in Route 53

4. **Waits for Certificate Validation**
   - Typically takes **5-30 minutes**
   - Script polls ACM every 30 seconds
   - Continues automatically when status changes to "ISSUED"

### Expected Output

```
==========================================
Route 53 and ACM Setup for bladeandbarrel.com
==========================================

Step 1: Checking Route 53 Hosted Zone for bladeandbarrel.com...
✓ Created hosted zone: Z1234567890ABC

Nameservers for bladeandbarrel.com:
  ns-1234.awsdns-12.org
  ns-5678.awsdns-34.com
  ns-9012.awsdns-56.net
  ns-3456.awsdns-78.co.uk

⚠️  IMPORTANT: If domain is registered externally, update nameservers at your registrar!

✓ Saved hosted zone config to infrastructure/route53-config.json

Step 2: Requesting ACM Certificate...
✓ Certificate requested: arn:aws:acm:us-east-1:ACCOUNT:certificate/CERT_ID

Step 3: Retrieving DNS validation records from ACM...
✓ Retrieved validation records

Step 4: Creating DNS validation CNAME record in Route 53...
✓ Created DNS validation CNAME record

Step 5: Waiting for ACM certificate validation...
⏳ This typically takes 5-30 minutes. Checking every 30 seconds...
  Status: PENDING_VALIDATION (waiting...)
  ...
✓ Certificate validated and issued!

==========================================
✓ Route 53 and ACM Setup Complete!
==========================================

Summary:
  Hosted Zone ID: Z1234567890ABC
  Certificate ARN: arn:aws:acm:us-east-1:ACCOUNT:certificate/CERT_ID
  Certificate Status: ISSUED

Next Steps:
  1. Run ./infrastructure/update-cloudfront-custom-domain.sh
  2. Run ./infrastructure/create-dns-records.sh
```

### Action Required: Update Nameservers (if domain registered externally)

If your domain is registered at GoDaddy, Namecheap, or another external registrar:

1. Copy the 4 nameservers from the script output
2. Go to your domain registrar's control panel
3. Find "Nameservers" or "DNS Settings"
4. Replace existing nameservers with Route 53 nameservers
5. Save changes
6. **Wait 24-48 hours** for nameserver propagation (DNS changes take time)

⚠️ **If nameservers are not updated, DNS will not resolve and the custom domain will not work!**

---

## Step 2: Update CloudFront with Custom Domain and Certificate

This script configures the CloudFront distribution to use the custom domain and SSL certificate.

### Run the Script

```bash
cd infrastructure
chmod +x update-cloudfront-custom-domain.sh
./update-cloudfront-custom-domain.sh
```

### What This Script Does

1. **Loads Certificate ARN** from `infrastructure/acm-certificate.json`
2. **Verifies Certificate Status** - Must be "ISSUED"
3. **Retrieves Current CloudFront Configuration**
4. **Updates Configuration:**
   - Adds alternate domain names (CNAMEs): `bladeandbarrel.com`, `www.bladeandbarrel.com`
   - Associates ACM certificate
   - Sets security policy: `TLSv1.2_2021`
5. **Applies Configuration to CloudFront**
6. **Waits for Deployment** - Typically **10-15 minutes**
7. **Updates** `infrastructure/cloudfront-config.json`

### Expected Output

```
==========================================
CloudFront Custom Domain Configuration
==========================================

✓ Loaded Certificate ARN: arn:aws:acm:us-east-1:ACCOUNT:certificate/CERT_ID

Step 1: Verifying ACM certificate status...
✓ Certificate status: ISSUED

Step 2: Retrieving current CloudFront distribution configuration...
✓ Retrieved configuration (ETag: E1234567890)

Step 3: Updating CloudFront configuration with custom domain...
  ✓ Added alternate domain names: bladeandbarrel.com, www.bladeandbarrel.com
  ✓ Associated SSL certificate
  ✓ Set security policy: TLSv1.2_2021

Step 4: Applying configuration changes to CloudFront...
✓ Configuration updated successfully

Step 5: Waiting for CloudFront distribution deployment...
⏳ This typically takes 10-15 minutes. Checking every 30 seconds...
  Status: InProgress (waiting...)
  ...
✓ Distribution deployed!

Step 6: Updating infrastructure/cloudfront-config.json...
✓ Updated cloudfront-config.json

==========================================
✓ CloudFront Custom Domain Setup Complete!
==========================================

Next Steps:
  1. Run ./infrastructure/create-dns-records.sh
```

---

## Step 3: Create DNS A Records

This script creates Route 53 A records (alias) that point the custom domains to CloudFront.

### Run the Script

```bash
cd infrastructure
chmod +x create-dns-records.sh
./create-dns-records.sh
```

### What This Script Does

1. **Loads Hosted Zone ID** from `infrastructure/route53-config.json`
2. **Retrieves CloudFront Domain** (e.g., `d140ojizs9fkiz.cloudfront.net`)
3. **Creates A Record for Root Domain** (`bladeandbarrel.com`)
   - Type: A (IPv4 address)
   - Alias: Yes
   - Target: CloudFront distribution
4. **Creates A Record for WWW Subdomain** (`www.bladeandbarrel.com`)
   - Type: A (IPv4 address)
   - Alias: Yes
   - Target: CloudFront distribution
5. **Updates** `infrastructure/route53-config.json` with DNS records
6. **Tests DNS Propagation**

### Expected Output

```
==========================================
Route 53 DNS A Records Setup
==========================================

✓ Loaded Hosted Zone ID: Z1234567890ABC

Step 1: Retrieving CloudFront distribution details...
✓ CloudFront Domain: d140ojizs9fkiz.cloudfront.net

Step 2: Creating A record (alias) for bladeandbarrel.com...
✓ Created A record for bladeandbarrel.com

Step 3: Creating A record (alias) for www.bladeandbarrel.com...
✓ Created A record for www.bladeandbarrel.com

Step 4: Updating infrastructure/route53-config.json...
✓ Updated route53-config.json

Step 5: Testing DNS propagation...
Testing DNS resolution for bladeandbarrel.com:
  ✓ Resolves to: 54.192.X.X

Testing DNS resolution for www.bladeandbarrel.com:
  ✓ Resolves to: 54.192.X.X

==========================================
✓ DNS A Records Created Successfully!
==========================================

Next Steps:
  1. Wait 2-5 minutes for DNS propagation
  2. Test HTTPS: https://bladeandbarrel.com
  3. Test HTTPS: https://www.bladeandbarrel.com
```

---

## Step 4: Manual Verification and Testing

After all scripts complete successfully, perform these manual verification steps.

### Wait for DNS Propagation

DNS changes typically propagate in **2-5 minutes** with Route 53, but can take up to **48 hours** in worst-case scenarios.

**Check DNS resolution:**
```bash
nslookup bladeandbarrel.com
nslookup www.bladeandbarrel.com
```

Expected output: Should resolve to CloudFront edge server IPs (not "Non-existent domain")

### Test HTTPS Functionality

#### Test 1: HTTPS Works on Root Domain

```bash
curl -I https://bladeandbarrel.com
```

Expected response:
```
HTTP/2 200
content-type: text/html
...
```

Or open in browser: https://bladeandbarrel.com

✅ **Expected:** Site loads correctly
❌ **If fails:** Check DNS resolution, verify CloudFront deployment status

#### Test 2: HTTPS Works on WWW Subdomain

```bash
curl -I https://www.bladeandbarrel.com
```

Or open in browser: https://www.bladeandbarrel.com

✅ **Expected:** Site loads correctly

#### Test 3: HTTP Redirects to HTTPS (Root Domain)

```bash
curl -I http://bladeandbarrel.com
```

Expected response:
```
HTTP/1.1 301 Moved Permanently
Location: https://bladeandbarrel.com/
...
```

Or open in browser: http://bladeandbarrel.com

✅ **Expected:** Automatically redirects to https://bladeandbarrel.com

#### Test 4: HTTP Redirects to HTTPS (WWW Subdomain)

```bash
curl -I http://www.bladeandbarrel.com
```

✅ **Expected:** Automatically redirects to https://www.bladeandbarrel.com

### Verify SSL Certificate in Browser

#### Chrome/Edge:
1. Navigate to https://bladeandbarrel.com
2. Click the **padlock icon** in address bar
3. Click "Certificate"
4. Verify:
   - ✅ Certificate is valid (green padlock, no warnings)
   - ✅ Issued to: `bladeandbarrel.com` and `www.bladeandbarrel.com`
   - ✅ Issued by: Amazon (AWS Certificate Manager)
   - ✅ Valid from/to dates are correct (future expiry)

#### Firefox:
1. Navigate to https://bladeandbarrel.com
2. Click the **padlock icon** → "Connection secure" → "More information"
3. Click "View Certificate"
4. Verify same details as Chrome

#### Safari:
1. Navigate to https://bladeandbarrel.com
2. Click the **padlock icon** → "Show Certificate"
3. Verify same details as Chrome

### Test Cross-Browser Compatibility

Test SSL/HTTPS on multiple browsers to ensure universal compatibility:

- ✅ Google Chrome (latest)
- ✅ Mozilla Firefox (latest)
- ✅ Safari (latest)
- ✅ Microsoft Edge (latest)

### Test on Multiple Devices

- ✅ Desktop (Windows/Mac/Linux)
- ✅ Mobile (iOS Safari, Android Chrome)
- ✅ Tablet (iPad, Android tablet)

### Common Issues and Troubleshooting

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| DNS not resolving | Nameservers not updated at registrar | Update nameservers, wait 24-48 hours |
| "Non-existent domain" | DNS not propagated yet | Wait longer, check with `nslookup` |
| Certificate error in browser | Certificate not associated with CloudFront | Re-run `update-cloudfront-custom-domain.sh` |
| 404 errors | CloudFront not deployed | Wait for deployment, check CloudFront console |
| HTTP not redirecting | Viewer protocol policy not set | Check CloudFront settings (should be "Redirect HTTP to HTTPS") |

---

## Infrastructure Files Reference

After running all scripts, these files will be created/updated:

### Created Files:

1. **`infrastructure/route53-config.json`**
   - Hosted zone ID
   - Nameservers
   - DNS A records configuration

2. **`infrastructure/acm-certificate.json`**
   - Certificate ARN
   - Domains covered
   - Validation records

### Updated Files:

3. **`infrastructure/cloudfront-config.json`**
   - Added: Alternate domain names (CNAMEs)
   - Added: Custom SSL certificate configuration

---

## Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| Route 53 Hosted Zone | $0.50/month | Per hosted zone |
| Route 53 DNS Queries | $0.40 per million | First 1 billion queries/month |
| ACM SSL Certificate | **FREE** | Free for CloudFront/ALB/API Gateway |
| Domain Registration | ~$12/year | Only if registering via Route 53 |
| **Total Monthly Increase** | **~$0.50/month** | (Certificate is free!) |

---

## DNS Propagation Timeline

| Stage | Timing | Notes |
|-------|--------|-------|
| Route 53 alias records | 1-5 minutes | Typically very fast |
| ACM certificate validation | 5-30 minutes | Automated DNS validation |
| CloudFront deployment | 10-15 minutes | Distribution configuration update |
| Nameserver updates (external) | 24-48 hours | Only if domain registered externally |
| Global DNS propagation | Up to 48 hours | Worst case, usually much faster |

---

## Rollback Instructions

If you need to revert changes:

### Remove Custom Domain from CloudFront:
```bash
# Manually via AWS Console:
# 1. Go to CloudFront → Distributions → EJNJPQN7X1JDD
# 2. Edit "Alternate domain names" and remove custom domains
# 3. Change "Custom SSL certificate" back to "Default CloudFront certificate"
# 4. Save and wait for deployment
```

### Delete DNS A Records:
```bash
# Delete via AWS Console or CLI
aws route53 change-resource-record-sets --hosted-zone-id Z1234567890ABC \
  --change-batch file://delete-records.json
```

### Delete ACM Certificate:
```bash
# Only delete if not in use by CloudFront
aws acm delete-certificate --certificate-arn arn:aws:acm:us-east-1:ACCOUNT:certificate/CERT_ID \
  --region us-east-1
```

### Delete Hosted Zone:
```bash
# Only delete if no records remain (except NS and SOA)
aws route53 delete-hosted-zone --id Z1234567890ABC
```

---

## Additional Resources

- [AWS Route 53 Documentation](https://docs.aws.amazon.com/route53/)
- [AWS Certificate Manager Documentation](https://docs.aws.amazon.com/acm/)
- [CloudFront Custom Domain Setup](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/CNAMEs.html)
- [DNS Validation for ACM Certificates](https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html)

---

## Support

For issues or questions:
1. Check "Common Issues and Troubleshooting" section above
2. Review AWS CloudWatch logs for CloudFront/Route 53 errors
3. Verify IAM permissions are correctly configured
4. Contact AWS Support if infrastructure issues persist

---

**Setup Complete! 🎉**

Your website is now accessible at:
- https://bladeandbarrel.com
- https://www.bladeandbarrel.com

With automatic HTTPS enforcement and a valid SSL certificate from AWS Certificate Manager.
