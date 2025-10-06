# Epic 3: Interactive Features & Launch Readiness

**Epic Goal:** Implement booking system integration, contact form backend with AWS Lambda + SES, analytics tracking, SEO optimization, security hardening, and complete all launch preparation activities to make the website production-ready for grand opening.

## Story 3.1: Research and Select Booking Platform

**As a** product manager,
**I want** to evaluate and select the best booking platform for Blade and Barrel,
**so that** we choose a solution that meets our needs for ease of integration, features, and cost.

### Acceptance Criteria

1. Research conducted on Square Appointments, Booksy, and Schedulicity platforms
2. Feature comparison documented: appointment scheduling, calendar management, client notifications, payment processing
3. Integration methods evaluated: embedded widget vs. API integration vs. redirect link
4. Pricing comparison completed for barbershop use case (8 barbers, expected booking volume)
5. Ease of setup and business admin usability assessed
6. Mobile booking experience tested (critical for 70%+ mobile users)
7. Customer support and documentation quality reviewed
8. Final recommendation documented with rationale
9. Booking platform account created and configured with Blade and Barrel business details
10. API credentials or embed code obtained and securely stored for development use

---

## Story 3.2: Integrate Booking System into Website

**As a** customer,
**I want** to book a barbershop appointment directly from the website,
**so that** I can secure my preferred time slot conveniently without calling.

### Acceptance Criteria

1. Booking system integration implemented using selected platform (Square/Booksy/Schedulicity)
2. "Book Appointment" CTA button in hero section links to or triggers booking interface
3. Booking interface displays available barbers, services, and time slots
4. Booking flow allows customer to select service, barber (optional), date, and time
5. Customer can complete booking with contact information (name, email, phone)
6. Confirmation message displays after successful booking
7. Email confirmation sent to customer automatically via booking platform
8. Booking data syncs to business calendar for Rich and barbers to manage
9. Mobile booking experience optimized - form fields and calendar picker work smoothly on touch devices
10. Booking conversion tracked - successful bookings logged for analytics review

---

## Story 3.3: Build AWS Lambda Function for Contact Form Backend

**As a** developer,
**I want** a serverless backend to handle contact form submissions,
**so that** inquiries are reliably delivered to the business email without a dedicated server.

### Acceptance Criteria

1. AWS Lambda function created using Node.js runtime (latest supported version)
2. Lambda function code validates incoming form data (name, email, phone, message fields)
3. Function sanitizes input to prevent injection attacks or malicious content
4. AWS SES SDK integrated to send formatted email notifications
5. Email template created with professional formatting including all form field data
6. Function includes error handling for SES failures and returns appropriate HTTP status codes
7. Environment variables configured for recipient email address (business email)
8. Lambda execution role created with SES send permissions
9. Function tested locally or in AWS console with sample form data
10. CloudWatch logging enabled for debugging and monitoring form submissions

---

## Story 3.4: Set Up API Gateway and Connect Contact Form Frontend

**As a** customer,
**I want** to submit a contact inquiry and receive confirmation,
**so that** I know my message was sent successfully to Blade and Barrel.

### Acceptance Criteria

1. AWS API Gateway REST API created with POST endpoint for form submissions
2. API Gateway integrated with Lambda function from Story 3.3
3. CORS configuration enabled to allow requests from bladeandbarrel.com domain
4. API endpoint URL secured and documented for frontend integration
5. Contact form frontend (from Story 2.6) connected to API Gateway endpoint
6. Form submission triggers Lambda function and sends email via SES
7. Success message displays to user: "Thanks! We'll get back to you soon."
8. Error handling implemented - user sees friendly error if submission fails
9. Form resets after successful submission (clears all fields)
10. End-to-end testing completed - form submission from website delivers email to business inbox

---

## Story 3.5: Configure AWS SES and Verify Email Domain

**As a** business owner,
**I want** contact form inquiries delivered reliably to my business email,
**so that** I don't miss potential customer questions or event bookings.

### Acceptance Criteria

1. AWS SES account activated (out of sandbox mode if needed for production email sending)
2. Business email domain verified in SES (or single email address verified if domain verification not feasible)
3. SPF and DKIM records configured in Route 53 for email authentication (if domain verification used)
4. Test email sent from Lambda via SES to business email address and successfully received
5. SES sending limits reviewed and sufficient for expected inquiry volume (50-100/month estimated)
6. Bounce and complaint handling configured (SES notifications to SNS topic or email)
7. Email template tested - formatting displays correctly in Gmail, Outlook, Apple Mail
8. Reply-to address set to customer's email so business can respond directly
9. Email subject line includes "Blade and Barrel Website Inquiry" or similar for easy filtering
10. Spam folder checked - emails deliver to inbox, not spam (authentication helps prevent this)

---

## Story 3.6: Implement reCAPTCHA v3 Spam Protection

**As a** business owner,
**I want** spam and bot submissions blocked from the contact form,
**so that** I only receive legitimate customer inquiries.

### Acceptance Criteria

1. Google reCAPTCHA v3 account created and site/secret keys obtained for bladeandbarrel.com
2. reCAPTCHA v3 script loaded in website frontend (invisible, no user interaction required)
3. reCAPTCHA token generated on contact form submission and included in API request
4. Lambda function validates reCAPTCHA token with Google API before processing form
5. Score threshold configured (e.g., 0.5) - submissions below threshold rejected as likely spam
6. Failed reCAPTCHA validation returns error to user: "Submission failed verification, please try again"
7. reCAPTCHA site key and secret stored securely (environment variables, AWS Secrets Manager)
8. Privacy policy updated to mention reCAPTCHA usage per Google's terms
9. Testing completed - legitimate form submission passes, bot-like behavior blocked
10. No impact on user experience - form remains easy to use (invisible reCAPTCHA)

---

## Story 3.7: Implement Google Analytics 4 Tracking

**As a** business owner,
**I want** website traffic and user behavior tracked,
**so that** I can understand how customers find and use the website.

### Acceptance Criteria

1. Google Analytics 4 property created for bladeandbarrel.com
2. GA4 tracking code (gtag.js) added to website in `<head>` section
3. GA4 measurement ID configured in environment variables or constants file
4. Basic page view tracking verified - real-time reports show page views in GA4 dashboard
5. User demographics, location, and device data collecting properly
6. Traffic sources tracked - organic search, social media, direct traffic identifiable
7. GA4 account shared with business owner for dashboard access
8. Privacy policy updated to disclose Google Analytics usage and cookie tracking
9. Cookie consent banner considered (optional for MVP, required if targeting EU users)
10. Verification completed - test visits from mobile and desktop appear in GA4 real-time reports

---

## Story 3.8: SEO Optimization and Meta Tags

**As a** potential customer searching Google,
**I want** Blade and Barrel to appear in search results for "barbershop Tampa" and "Channelside barbershop",
**so that** I can discover this business when looking for grooming services.

### Acceptance Criteria

1. HTML title tag optimized: "Blade and Barrel - Tampa's Premier Barbershop & Neighborhood Bar | Channelside"
2. Meta description written (150-160 characters): "Experience Tampa's unique barbershop-bar hybrid. Premium grooming, craft beverages, and community. Channelside District. Book your appointment today."
3. Open Graph tags added for social media sharing (og:title, og:description, og:image, og:url)
4. Twitter Card tags added for Twitter/X sharing (twitter:card, twitter:title, twitter:description, twitter:image)
5. Favicon and Apple Touch icons added for browser tabs and mobile home screen bookmarks
6. Semantic HTML structure implemented - proper heading hierarchy (H1, H2, H3)
7. Alt text added to all images with descriptive, keyword-rich text (e.g., "Blade and Barrel barbershop interior Channelside Tampa")
8. Structured data (JSON-LD) added for LocalBusiness schema with name, address, hours, phone
9. robots.txt file created allowing search engine crawling
10. sitemap.xml generated and submitted to Google Search Console

---

## Story 3.9: Google Business Profile Integration

**As a** local customer searching "barbershop near me",
**I want** Blade and Barrel to appear in Google Maps and local search results,
**so that** I can find the business, see reviews, and visit the website.

### Acceptance Criteria

1. Google Business Profile created for Blade and Barrel (or claimed if already exists)
2. Business information completed: name, address, phone, website URL, hours, categories
3. Primary category set to "Barber Shop" with secondary categories "Bar" and "Lounge"
4. Business description written highlighting hybrid barbershop-bar concept
5. High-quality photos uploaded (exterior, interior, services, team) - minimum 10 photos
6. Website URL linked to https://bladeandbarrel.com in profile
7. Google Search Console verified ownership of website and Google Business Profile linked
8. Posts feature used to share updates (grand opening announcement, special offers)
9. Messaging enabled for customer inquiries via Google Business Profile (optional)
10. Profile published and visible in Google Maps search for "Blade and Barrel Tampa"

---

## Story 3.10: Security Hardening and Privacy Policy

**As a** customer,
**I want** my personal information protected when using the website,
**so that** I feel safe booking appointments and submitting contact inquiries.

### Acceptance Criteria

1. Content Security Policy (CSP) headers configured in CloudFront to prevent XSS attacks
2. Environment variables used for all API keys and secrets (never hardcoded in source code)
3. `.env` file excluded from Git repository via `.gitignore`
4. HTTPS enforced - all HTTP requests redirect to HTTPS (CloudFront configuration)
5. API Gateway endpoint secured - only accepts requests from bladeandbarrel.com origin (CORS)
6. Lambda function input validation prevents SQL injection and code injection (sanitization implemented)
7. Privacy policy page created and linked in footer with disclosures for Google Analytics, reCAPTCHA, cookies
8. Contact form SSL/TLS encrypted during transmission (HTTPS enforces this)
9. No sensitive customer data stored on website - booking platform handles PII securely
10. Security audit checklist completed - OWASP top 10 vulnerabilities reviewed and mitigated

---

## Story 3.11: Performance Testing and Lighthouse Optimization

**As a** user on a mobile device,
**I want** the website to load quickly and smoothly,
**so that** I can browse services and book appointments without frustration.

### Acceptance Criteria

1. Lighthouse performance audit run on mobile device emulation (Chrome DevTools)
2. Lighthouse performance score 85+ achieved on mobile
3. Lighthouse performance score 90+ achieved on desktop
4. First Contentful Paint (FCP) under 1.5 seconds on mobile 4G connection
5. Largest Contentful Paint (LCP) under 2.5 seconds on mobile
6. Cumulative Layout Shift (CLS) score under 0.1 (minimal layout shifting during load)
7. Time to Interactive (TTI) under 3.5 seconds on mobile
8. Image optimization verified - all images compressed and using WebP format
9. JavaScript bundle size reviewed - unused dependencies removed, code splitting implemented if needed
10. Accessibility audit passed - Lighthouse accessibility score 95+ (WCAG AA compliance)

---

## Story 3.12: Cross-Browser and Device Testing

**As a** customer using any browser or device,
**I want** the website to work perfectly regardless of my setup,
**so that** I have a seamless experience booking and browsing.

### Acceptance Criteria

1. Testing completed on Chrome (last 2 versions) - desktop and mobile
2. Testing completed on Safari (last 2 versions) - desktop and mobile iOS
3. Testing completed on Firefox (last 2 versions) - desktop
4. Testing completed on Edge (last 2 versions) - desktop
5. All interactive features tested: booking button, contact form, Instagram feed, Google Maps
6. Responsive design verified at breakpoints: 320px, 375px, 768px, 1024px, 1920px
7. Touch interactions verified on iPad and mobile devices (tap targets, swipe, scroll)
8. Print styles tested (optional) - website prints reasonably if customer wants hard copy
9. Keyboard navigation tested - all interactive elements accessible via Tab key
10. Screen reader tested (VoiceOver on iOS or NVDA on Windows) - critical flows understandable

---

## Story 3.13: Final Content Review and Launch Preparation

**As a** business owner,
**I want** all website content reviewed and finalized before launch,
**so that** we present a professional, accurate brand experience to customers.

### Acceptance Criteria

1. All website copy proofread for spelling, grammar, and accuracy
2. Service descriptions and pricing verified as correct
3. Operating hours confirmed with business owner and displayed accurately
4. Contact email and phone number verified as correct
5. Instagram handle and social media links verified as active accounts
6. Rich Keeley bio and photo reviewed and approved
7. Brand imagery and photos reviewed for quality and brand alignment
8. "Coming Soon" placeholder content replaced with final launch content
9. Legal disclaimers added if needed (e.g., pricing subject to change, appointment policies)
10. Business owner sign-off obtained on final website before production launch

---

## Story 3.14: Production Launch and Post-Launch Monitoring

**As a** business owner,
**I want** the website launched successfully and monitored for issues,
**so that** customers have a reliable experience from day one.

### Acceptance Criteria

1. Final production deployment completed via CI/CD pipeline to AWS S3/CloudFront
2. DNS propagation verified - bladeandbarrel.com resolves correctly worldwide (use DNS checker tools)
3. SSL certificate valid and HTTPS working on all pages
4. All links tested - no broken links or 404 errors
5. Contact form submission tested end-to-end on production
6. Booking system integration tested on production - test appointment successfully booked
7. Google Analytics tracking verified - real-time data appears in GA4 dashboard
8. CloudWatch alarms configured for Lambda errors and high error rates on API Gateway
9. Post-launch monitoring schedule established - daily checks for first week, then weekly
10. Launch announcement prepared for social media and email (coordinates with marketing team)

---
