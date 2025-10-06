# Security and Performance

## Security Requirements

**Frontend Security:**
- **CSP Headers:** `Content-Security-Policy: default-src 'self'; script-src 'self' https://www.googletagmanager.com https://www.google.com; style-src 'self' 'unsafe-inline'`
- **XSS Prevention:** React escapes output by default, avoid `dangerouslySetInnerHTML`
- **Secure Storage:** No sensitive data in localStorage; reCAPTCHA tokens short-lived

**Backend Security:**
- **Input Validation:** Joi/Zod schema validation in Lambda, sanitize all user input
- **Rate Limiting:** API Gateway throttling (1000 req/sec burst, 5000/hour steady)
- **CORS Policy:** Restrict to `https://bladeandbarrel.com` origin only

**Authentication Security:**
- **Token Storage:** Instagram access token in Lambda environment variables (encrypted at rest)
- **Session Management:** Not applicable (no user sessions for MVP)
- **Password Policy:** Not applicable (no user accounts)

## Performance Optimization

**Frontend Performance:**
- **Bundle Size Target:** <200KB gzipped (JS + CSS combined)
- **Loading Strategy:** Code splitting for routes, lazy loading for images
- **Caching Strategy:** CloudFront 1-year cache for assets, versioned filenames

**Backend Performance:**
- **Response Time Target:** <500ms p95 for contact form, <300ms for Instagram proxy (cached)
- **Database Optimization:** Not applicable (no database)
- **Caching Strategy:** CloudFront 1-hour cache for Instagram feed API responses
