# AWS CloudFront Security Headers Setup

This guide shows you how to add security headers to your CloudFront distribution to achieve **Mozilla Observatory A+ rating**.

## Why CloudFront Functions?

S3 doesn't support the `_headers` file (that's Netlify/Cloudflare only). For AWS CloudFront + S3, you need to use **CloudFront Functions** to inject headers into responses.

**Benefits:**
- ✅ Very cheap (~$0.10 per 1 million requests)
- ✅ Fast (runs at edge locations)
- ✅ Easy to deploy (copy-paste JavaScript code)
- ✅ No infrastructure to manage

## Step-by-Step Deployment Guide

### Step 1: Open AWS CloudFront Console

1. Log into AWS Console: https://console.aws.amazon.com/
2. Go to **CloudFront** service
3. Click **Functions** in the left sidebar

### Step 2: Create New Function

1. Click **Create function** button
2. **Function name:** `add-security-headers`
3. **Description:** "Add security headers for A+ Mozilla Observatory rating"
4. Click **Create function**

### Step 3: Add Function Code

1. In the function editor, delete the default code
2. Open the file: `cloudfront-function-security-headers.js` (in project root)
3. Copy ALL the code from that file
4. Paste it into the CloudFront Function editor
5. Click **Save changes**

### Step 4: Test the Function (Optional but Recommended)

1. Click the **Test** tab
2. **Event type:** Select "Viewer response"
3. Use this test event:

```json
{
  "version": "1.0",
  "context": {
    "eventType": "viewer-response"
  },
  "viewer": {
    "ip": "1.2.3.4"
  },
  "request": {
    "method": "GET",
    "uri": "/index.html",
    "headers": {}
  },
  "response": {
    "statusCode": 200,
    "statusDescription": "OK",
    "headers": {
      "content-type": {
        "value": "text/html"
      }
    }
  }
}
```

4. Click **Test function**
5. **Expected output:** You should see all security headers added to the response

### Step 5: Publish the Function

1. Click the **Publish** tab
2. Review the code one last time
3. Click **Publish function**
4. **Important:** You'll see a message "Function published successfully" - note the ARN

### Step 6: Associate Function with CloudFront Distribution

1. Go back to **CloudFront** → **Distributions**
2. Find your distribution (bladeandbarrel.com)
3. Click on the **Distribution ID**
4. Go to the **Behaviors** tab
5. Select the default behavior (usually `*` or `Default (*)`)
6. Click **Edit**

7. Scroll down to **Function associations** section
8. Under **Viewer response**, click the dropdown
9. Select **CloudFront Functions**
10. Choose your function: `add-security-headers`
11. Click **Save changes**

### Step 7: Wait for Deployment

CloudFront will deploy your function to all edge locations. This takes **5-10 minutes**.

You can monitor progress:
1. Go to your distribution
2. Check the **Status** column
3. Wait until it says **Deployed** (it will say "In Progress" while deploying)

### Step 8: Test the Headers

Once deployment is complete, test your headers:

**Option A: Using curl**
```bash
curl -I https://bladeandbarrel.com
```

**Option B: Using browser DevTools**
1. Open https://bladeandbarrel.com
2. Open DevTools (F12)
3. Go to **Network** tab
4. Refresh the page
5. Click on the first request (document)
6. View **Response Headers**

**Expected headers:**
```
x-content-type-options: nosniff
x-frame-options: DENY
strict-transport-security: max-age=31536000; includeSubDomains; preload
referrer-policy: strict-origin-when-cross-origin
permissions-policy: camera=(), microphone=(), ...
content-security-policy: default-src 'self'; ...
cross-origin-embedder-policy: require-corp
cross-origin-opener-policy: same-origin
cross-origin-resource-policy: same-origin
```

### Step 9: Run Mozilla Observatory Scan

1. Go to: https://observatory.mozilla.org/
2. Enter: `https://bladeandbarrel.com`
3. Click **Scan Me**
4. **Expected Result:** A+ rating with 100+ score 🎉

---

## Troubleshooting

### Problem: Headers not showing up

**Solution 1: Clear CloudFront cache**
```bash
# Via AWS CLI (if you have it configured)
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

Or via AWS Console:
1. Go to CloudFront → Distributions → Your distribution
2. Click **Invalidations** tab
3. Click **Create invalidation**
4. Enter `/*` in the paths
5. Click **Create invalidation**

**Solution 2: Hard refresh browser**
- Chrome/Firefox: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- This clears browser cache

**Solution 3: Check function association**
- Go to CloudFront → Distributions → Behaviors
- Make sure function is associated with **Viewer response** (not Viewer request)

### Problem: Function deployment stuck at "In Progress"

**Wait:** Deployments can take up to 15 minutes during high-traffic times
**Check status:** Refresh the distributions page every 2-3 minutes

### Problem: CSP blocking resources

**Symptom:** Console errors like "Refused to load script"

**Solution:** Update the CSP policy in the CloudFront Function

For example, to allow Google Analytics:
```javascript
headers['content-security-policy'] = {
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; connect-src 'self' https://www.google-analytics.com; ..."
};
```

Then:
1. Update the function code
2. Save changes
3. Publish again
4. Wait for deployment
5. Test

---

## Alternative: Automate with GitHub Actions (Advanced)

If you want to automate CloudFront Function deployment, you can add this to your `.github/workflows/deploy.yml`:

```yaml
- name: Deploy CloudFront Function (optional - requires setup)
  run: |
    # Update function code
    aws cloudfront update-function \
      --name add-security-headers \
      --function-code fileb://cloudfront-function-security-headers.js \
      --function-config Comment="Security headers for A+ rating",Runtime="cloudfront-js-1.0"

    # Publish function
    aws cloudfront publish-function \
      --name add-security-headers \
      --if-match $(aws cloudfront describe-function --name add-security-headers --query 'ETag' --output text)
```

**Note:** This requires:
1. Function already exists (create manually first)
2. AWS credentials with CloudFront permissions
3. Additional setup for ETags

For now, **manual deployment via Console is easier** and you only need to do it once.

---

## Cost Estimate

**CloudFront Functions pricing:**
- $0.10 per 1 million invocations
- If you get 100,000 page views/month = $0.01/month
- Essentially free for most sites! 💰

**Comparison:**
- CloudFront Functions: $0.10/million requests
- Lambda@Edge: $0.60/million requests (6x more expensive)

---

## Verification Checklist

Before running Mozilla Observatory scan:

- [ ] CloudFront Function created and published
- [ ] Function associated with distribution (Viewer response)
- [ ] Distribution status shows "Deployed"
- [ ] CloudFront cache invalidated
- [ ] Headers visible in curl/browser DevTools
- [ ] No console errors or CSP violations
- [ ] Site loads correctly on all pages

---

## Quick Reference

**AWS Console URLs:**
- CloudFront Functions: https://console.aws.amazon.com/cloudfront/v3/home#/functions
- CloudFront Distributions: https://console.aws.amazon.com/cloudfront/v3/home#/distributions

**Testing URLs:**
- Mozilla Observatory: https://observatory.mozilla.org/
- SecurityHeaders.com: https://securityheaders.com/
- CSP Evaluator: https://csp-evaluator.withgoogle.com/

**Function file:** `cloudfront-function-security-headers.js` (in project root)

---

## Support

If you encounter issues:
1. Check the Troubleshooting section above
2. Review AWS CloudFront Functions documentation: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html
3. Check function execution logs in CloudWatch

---

**Last Updated:** 2025-10-13
**Estimated Setup Time:** 10-15 minutes
**Expected Result:** A+ Mozilla Observatory rating
