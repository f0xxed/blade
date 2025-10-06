# External APIs

This section documents all third-party API integrations required for the project.

## Instagram Graph API

**Purpose:** Fetch recent Instagram posts to display in social feed section for brand engagement and social proof

**Documentation:** https://developers.facebook.com/docs/instagram-api

**Base URL(s):**
- Production: `https://graph.instagram.com/v18.0`
- Token Exchange: `https://api.instagram.com/oauth/access_token`

**Authentication:**
- OAuth 2.0 with long-lived access token (60 days)
- Token stored securely in Lambda environment variables (never exposed to client)
- Refresh token workflow required to maintain access beyond 60 days

**Rate Limits:**
- 200 API calls per hour per user
- Burst limit: 4800 calls per day

**Key Endpoints Used:**
- `GET /{user-id}/media` - Fetch list of user's media objects (posts)
  - **Query params:** `fields=id,media_type,media_url,permalink,caption,timestamp,like_count,comments_count`, `limit=25`
  - **Returns:** Array of Instagram post objects

**Integration Notes:**
- **Security:** Access token must be server-side only (Lambda proxy prevents client exposure)
- **Caching:** Implement 1-hour cache at CloudFront edge to stay within rate limits
- **Permissions:** Requires `instagram_graph_user_profile` and `instagram_graph_user_media` permissions
- **Business Account Required:** Must link Instagram Business/Creator account to Facebook Page
- **Error Handling:** Graceful fallback if API unavailable (show cached posts or placeholder message)
- **Token Refresh:** Implement automated token refresh workflow before 60-day expiration

---

## Google reCAPTCHA v3 API

**Purpose:** Invisible spam protection for contact form submissions (bot detection without user interaction)

**Documentation:** https://developers.google.com/recaptcha/docs/v3

**Base URL(s):**
- Client-side script: `https://www.google.com/recaptcha/api.js`
- Server-side verification: `https://www.google.com/recaptcha/api/siteverify`

**Authentication:**
- Site Key: Public key embedded in frontend (safe to expose)
- Secret Key: Private key used in Lambda for server-side verification (environment variable)

**Rate Limits:**
- 1000 requests/second per site key (generous, unlikely to hit)

**Key Endpoints Used:**
- `POST /siteverify` - Verify reCAPTCHA token from client submission
  - **Body params:** `secret`, `response` (token), `remoteip` (optional)
  - **Returns:** `{ success: true/false, score: 0.0-1.0, action: "submit", ... }`

**Integration Notes:**
- **Score Threshold:** Accept submissions with score ≥ 0.5 (adjust based on spam patterns)
- **Frontend:** Load reCAPTCHA script, execute on form submit to get token
- **Backend (Lambda):** Verify token before processing contact form
- **Privacy:** Update privacy policy to disclose reCAPTCHA usage per Google's terms
- **Fallback:** If verification API fails, log error and optionally allow submission (or reject with user-friendly message)

---

## Google Maps Embed API

**Purpose:** Display interactive map showing business location in Location & Hours section

**Documentation:** https://developers.google.com/maps/documentation/embed/get-started

**Base URL(s):**
- Embed: `https://www.google.com/maps/embed/v1/{MODE}`

**Authentication:**
- API Key (optional for basic embeds, recommended for production)
- Restrict key to bladeandbarrel.com domain for security

**Rate Limits:**
- Unlimited for static embeds (no API key required if using iframe only)
- If using API key: Generous limits (unlikely to hit for single location)

**Key Endpoints Used:**
- `GET /maps/embed/v1/place` - Embed map with place marker
  - **Query params:** `key={API_KEY}`, `q=Blade+and+Barrel,Channelside+Tampa,FL`
  - **Returns:** Embedded map iframe

**Integration Notes:**
- **Simple Implementation:** Use basic iframe embed without API key for MVP
- **Enhanced Features (Future):** API key enables directions, Street View, custom styling
- **Accessibility:** Add ARIA label to iframe ("Map showing Blade and Barrel location")
- **Responsive:** Iframe must resize for mobile (use container with aspect-ratio CSS)
- **Privacy:** Embedded maps don't require cookie consent banner (no tracking cookies set)

---

## Booking Platform API (TBD - Story 3.1)

**Purpose:** Enable customers to book barbershop appointments directly from website

**Platform Options (Research Phase):**
1. **Square Appointments**
   - **Docs:** https://developer.squareup.com/docs/appointments-api/what-it-does
   - **Auth:** OAuth 2.0 or API key
   - **Integration:** Widget embed or API-driven booking flow

2. **Booksy**
   - **Docs:** https://booksy.com/en-us/integration
   - **Auth:** API key or widget embed code
   - **Integration:** Iframe widget (simpler) or REST API

3. **Schedulicity**
   - **Docs:** https://www.schedulicity.com/integration
   - **Auth:** Embed widget (no API required)
   - **Integration:** JavaScript widget or iframe

**Decision Criteria (Story 3.1):**
- Mobile booking experience quality (70%+ traffic is mobile)
- Integration complexity (widget embed vs. API)
- Pricing for barbershop use case (8 barbers, estimated volume)
- Client notification features (email/SMS confirmations)

**Integration Notes:**
- **Final selection determines implementation:** Widget embed (simplest), API redirect, or custom API integration
- **Testing:** Validate booking flow end-to-end on mobile and desktop before launch
- **Analytics:** Track `booking_initiated` event when user interacts with booking interface

---

## Google Analytics 4

**Purpose:** Track user behavior, conversion funnels, and traffic sources for data-driven optimization

**Documentation:** https://developers.google.com/analytics/devguides/collection/ga4

**Base URL(s):**
- Tracking script: `https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`

**Authentication:**
- Measurement ID (G-XXXXXXXXXX) - public, embedded in client-side code

**Rate Limits:**
- No strict rate limits for standard tracking (10M events/month free tier)

**Key Endpoints Used:**
- Client-side `gtag()` function for event tracking
- Automatic page view tracking on script load
- Custom events: `gtag('event', 'booking_initiated', { ... })`

**Integration Notes:**
- **Event Tracking:** Use predefined `ANALYTICS_EVENTS` constants for consistency
- **Privacy Compliance:** Add privacy policy disclosure, consider cookie consent banner for EU traffic
- **Conversion Tracking:** Set up conversion goals in GA4 dashboard (booking clicks, contact form submissions)
- **Real-time Monitoring:** Use real-time reports during launch to validate tracking
- **Custom Dimensions:** Track service type selected, section scrolled to, Instagram post clicked
