# Database Schema

**Database:** None required for MVP

**Rationale:**
- **Booking data:** Managed externally by booking platform (Square/Booksy/Schedulicity)
- **Contact form submissions:** Delivered immediately via SES email (no storage needed)
- **Instagram posts:** Fetched dynamically from Instagram Graph API (cached at CloudFront edge)
- **Service offerings:** Static content hardcoded in React components
- **Analytics data:** Stored in Google Analytics 4 (external service)

**Future Considerations:**
- If multi-location expansion requires centralized appointment management, consider adding DynamoDB or RDS
- If admin panel needed for content management, add database for CMS functionality
- If user accounts required (loyalty program), add authentication database
