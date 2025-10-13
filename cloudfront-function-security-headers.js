/**
 * CloudFront Function: Add Security Headers
 *
 * This function adds comprehensive security headers to all responses
 * to achieve Mozilla Observatory A+ rating.
 *
 * Deploy this via AWS Console:
 * 1. Go to CloudFront → Functions
 * 2. Create new function named "add-security-headers"
 * 3. Paste this code
 * 4. Publish the function
 * 5. Associate with your distribution (Viewer Response event)
 *
 * Cost: ~$0.10 per 1 million requests (very cheap!)
 */

function handler(event) {
    var response = event.response;
    var headers = response.headers;

    // Prevent MIME type sniffing attacks
    headers['x-content-type-options'] = { value: 'nosniff' };

    // Prevent clickjacking by blocking iframe embedding
    headers['x-frame-options'] = { value: 'DENY' };

    // Force HTTPS for 1 year (required for A+ rating)
    headers['strict-transport-security'] = {
        value: 'max-age=31536000; includeSubDomains; preload'
    };

    // Control referrer information sent to other sites
    headers['referrer-policy'] = {
        value: 'strict-origin-when-cross-origin'
    };

    // Restrict browser features (camera, microphone, etc.)
    headers['permissions-policy'] = {
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
    };

    // Content Security Policy - Strict policy for A+ rating
    // NO unsafe-inline needed - all scripts/styles are external files
    // frame-src allows Google Maps embed
    headers['content-security-policy'] = {
        value: "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-src https://www.google.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests"
    };

    // Cross-Origin policies for enhanced security
    // NOTE: COEP removed - incompatible with Google Maps and other third-party iframes
    // headers['cross-origin-embedder-policy'] = { value: 'require-corp' };
    headers['cross-origin-opener-policy'] = { value: 'same-origin' };
    headers['cross-origin-resource-policy'] = { value: 'same-origin' };

    // Remove server information (security best practice)
    delete headers['server'];
    delete headers['x-powered-by'];

    return response;
}
