# Blade and Barrel Product Requirements Document (PRD)

## Goals and Background Context

### Goals

- Launch a modern one-page website before grand opening to establish digital presence and capture early bookings
- Drive consistent barbershop appointment bookings through integrated online booking system
- Communicate the unique hybrid barbershop-bar concept ("Groomed. Poured. Perfected.") effectively to first-time visitors
- Support pre-launch and ongoing marketing campaigns as the central digital hub
- Establish credibility and search visibility for "barbershop Tampa" and "Channelside bars" searches
- Create a scalable digital foundation to support future multi-location expansion

### Background Context

Blade and Barrel is launching as an innovative hybrid establishment in Tampa's Channelside district, seamlessly blending premium barbershop services with a vibrant community bar. The business transforms from a daytime grooming destination (offering haircuts, beard trims, and complimentary draft beer) into an evening neighborhood bar, creating a unique "third place" for professional men aged 25-50.

Currently, the business lacks any digital presence to support its imminent grand opening (1-2 months away). Without a website, Blade and Barrel faces critical challenges: lost booking revenue (60-70% of modern consumers prefer online scheduling), poor discoverability in local searches, brand confusion around the hybrid concept, and competitive disadvantage against established Tampa barbershops with professional websites. The website will serve as the digital embodiment of the brand's dual identity, driving bookings, building community engagement, and establishing the foundation for future franchise expansion inspired by the Scissors and Scotch model.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-10-05 | v1.0 | Initial PRD creation from project brief | John (PM Agent) |

---

## Requirements

### Functional Requirements

**FR1:** The website shall display a full-screen hero section featuring the "Groomed. Poured. Perfected." tagline, compelling brand imagery, and a prominent call-to-action button for booking appointments.

**FR2:** The website shall present barbershop services (haircuts, beard trims, hot towel shaves) with pricing information and mention of complimentary draft beer for barbershop clients.

**FR3:** The website shall integrate a third-party booking system (Square Appointments, Booksy, or Schedulicity) allowing customers to view barber availability, select services, and book appointments directly.

**FR4:** The website shall display an About/Story section explaining the hybrid barbershop-bar concept, Rich Keeley's vision, and the day-to-night transformation from grooming destination to social bar.

**FR5:** The website shall include an interactive Google Map showing the Channelside Tampa location with full address, operating hours (differentiated for barbershop vs. bar if needed), and parking information.

**FR6:** The website shall integrate a live Instagram feed displaying recent posts to showcase the space, services, and community atmosphere.

**FR7:** The website shall provide a contact form for inquiries about private events, partnerships, sponsorships, or general questions, with email and phone contact options.

**FR8:** The website shall communicate both the barbershop excellence and bar experience through visual storytelling in a cohesive scrolling narrative.

### Non-Functional Requirements

**NFR1:** The website shall load in under 2 seconds on 4G mobile connections to minimize bounce rates from mobile users.

**NFR2:** The website shall be fully responsive and optimized for mobile (320px+), tablet, and desktop devices (up to 2560px+).

**NFR3:** The website shall achieve a Lighthouse performance score of 85 or higher.

**NFR4:** The website shall support modern browsers (Chrome, Safari, Firefox, Edge - last 2 versions) including iOS Safari and Android Chrome.

**NFR5:** The website shall be deployed on AWS S3 + CloudFront with proper SPA routing configuration for cost-effective static hosting.

**NFR6:** The website shall implement basic SEO foundation including meta tags, title tags, alt text on images, and Google Business Profile integration.

**NFR7:** AWS service usage must aim to stay within or near free-tier limits where feasible (estimated $5-15/month).

**NFR8:** The website shall include contact form spam protection using reCAPTCHA or honeypot methods.

**NFR9:** The website shall serve all content over HTTPS with SSL certificate.

**NFR10:** The website shall implement Google Analytics 4 for tracking traffic, conversions, and user behavior.

---

## User Interface Design Goals

### Overall UX Vision

The website delivers a bold, immersive scrolling narrative experience that mirrors the physical space's dual identity. Users journey through a cinematic story: from an impactful hero moment that immediately communicates "barbershop meets bar," through service offerings that balance grooming precision with social atmosphere, to community connection points (team, location, Instagram feed). The experience feels premium yet approachable—sophisticated without being stuffy—reflecting the target demographic of professional men who value both appearance and authentic social connection.

The design prioritizes frictionless booking as the primary conversion goal while building emotional connection to the Blade and Barrel lifestyle brand.

### Key Interaction Paradigms

- **Smooth scroll-triggered animations**: Sections elegantly reveal as users scroll, creating a curated storytelling experience (using Framer Motion or similar)
- **One-click booking**: Prominent, persistent booking CTA remains accessible throughout scroll journey
- **Touch-optimized mobile navigation**: Mobile-first interactions with large tap targets, swipeable elements where appropriate
- **Lazy-loaded imagery**: High-quality photos load progressively to maintain performance without sacrificing visual impact
- **Inline Instagram feed**: Social proof integrates seamlessly into narrative flow rather than feeling tacked on

### Core Screens and Views

Since this is a one-page website, "screens" are actually distinct scroll sections:

1. **Hero Section** - Full-screen brand impact moment with tagline and booking CTA
2. **Services Overview** - Barbershop services with pricing and hybrid concept explanation
3. **About/Story Section** - Rich's vision and the day-to-night transformation narrative
4. **Instagram Feed Integration** - Live social proof showcasing space and community
5. **Location & Hours** - Interactive map with contact details
6. **Contact Form** - Inquiry submission for events/partnerships

### Accessibility: WCAG AA

Target WCAG 2.1 Level AA compliance to ensure the site is accessible to users with disabilities while balancing development timeline and budget constraints. This includes:
- Sufficient color contrast ratios (4.5:1 for normal text)
- Keyboard navigation support
- Proper semantic HTML and ARIA labels
- Alt text for all images
- Focus indicators for interactive elements

### Branding

**Visual Identity:** Industrial/vintage aesthetic with gold and dark tones, incorporating nautical elements that reflect the Channelside location. High-quality photography showcasing both barbershop precision (close-ups of grooming services, tools, craftsmanship) and bar atmosphere (craft beverages, social moments, space ambiance).

**Design Inspiration:** maverickbarbers.com serves as reference for bold, modern barbershop web design with strong visual hierarchy and immersive scrolling experience.

**Assets Available:** Logo, brand imagery, and concept photos located in `C:\Users\astr0\Desktop\void\projects\blade\images`

**Tone:** Modern and sophisticated yet warm and welcoming—avoiding both overly corporate sterility and dated traditional barbershop clichés.

### Target Device and Platforms: Web Responsive

**Primary:** Mobile-first responsive web design (70%+ expected traffic from mobile devices)

**Supported:**
- Mobile: iOS Safari, Android Chrome (320px - 767px)
- Tablet: iPad Safari, Android tablets (768px - 1024px)
- Desktop: Chrome, Safari, Firefox, Edge on macOS/Windows (1025px+)

**Optimization Priority:** Mobile > Desktop > Tablet, given target user behavior (on-the-go discovery and booking)

---

## Technical Assumptions

### Repository Structure: Monorepo

**Decision:** Single monorepo containing the one-page website application.

**Rationale:**
- Simple one-page website doesn't warrant multiple repositories
- All code (components, assets, configuration) lives in single cohesive structure
- Easier deployment and version control for small team
- Future multi-location expansion can be handled through dynamic content rather than separate repos

**Structure:**
```
/src - React components and application code
/public - Static assets (images, fonts, favicons)
/components - Reusable shadcn/ui components
/assets - Brand imagery and media files
```

### Service Architecture

**Architecture Pattern:** Static Site with Client-Side JavaScript (JAMstack approach)

**Rationale:**
- **Static hosting** on AWS S3 + CloudFront eliminates backend server costs and complexity
- **Client-side React** provides interactivity (scroll animations, form handling) without server dependencies
- **Third-party service integrations** handle dynamic functionality:
  - Booking: Square Appointments/Booksy/Schedulicity API or embed widget
  - Contact form: AWS Lambda + SES
  - Instagram feed: Instagram Basic Display API (client-side fetch)
  - Analytics: Google Analytics 4 (client-side tracking)
- **Serverless functions** (AWS Lambda) for contact form backend
- **No custom backend** required for MVP - all data handled by external services

**Why this fits:**
- Meets performance requirements (CDN-delivered static assets load fast)
- Stays within budget constraints (minimal infrastructure costs)
- Easy to maintain for non-technical team
- Scales effortlessly for traffic spikes around grand opening

### Testing Requirements

**Testing Strategy:** Unit + Integration testing with manual QA focus

**Specific Requirements:**
- **Unit tests** for React components using Vitest (Vite's test runner) or Jest
- **Component integration tests** using React Testing Library for user interaction flows
- **Visual regression testing** optional but recommended for design-critical components (can use Percy or Chromatic)
- **Manual testing checklist** covering:
  - Cross-browser compatibility (Chrome, Safari, Firefox, Edge)
  - Responsive design across breakpoints (320px, 768px, 1024px, 1920px)
  - Booking flow end-to-end on mobile and desktop
  - Form submission and validation
  - Instagram feed loading and fallback states
  - Performance testing (Lighthouse scores on mobile/desktop)
- **E2E testing** deferred to post-MVP (would require tools like Playwright/Cypress)

**Manual Testing Convenience:**
- Development environment with hot reload (Vite HMR)
- Local test data for Instagram feed (mock JSON responses)
- Test booking system in sandbox/demo mode before production integration

**Rationale:**
- Aggressive MVP timeline (1-2 months) requires pragmatic testing approach
- Static site with limited interactivity reduces testing complexity
- Critical paths (booking, contact form) must be manually verified with actual integrations
- Automated unit/integration tests catch component-level regressions
- Full E2E automation not justified for one-page site at this stage

### Additional Technical Assumptions and Requests

**Frontend Framework & Libraries:**
- **React 18+** - Component-based architecture, strong ecosystem, team familiarity
- **Vite** - Build tool for fast development and optimized production builds (preferred over Create React App)
- **shadcn/ui** - Pre-built, customizable UI components (buttons, forms, cards, dialogs)
- **Tailwind CSS** - Utility-first styling (required by shadcn/ui), enables rapid development
- **Framer Motion** - Smooth scroll animations and page transitions for premium feel

**Hosting & Infrastructure:**
- **AWS S3** - Static file hosting
- **AWS CloudFront** - CDN for global performance and HTTPS
- **AWS Route 53** - DNS management for bladeandbarrel.com domain
- **AWS Lambda** - Serverless function for contact form submission
- **AWS SES** - Email delivery for contact form inquiries
- **AWS API Gateway** - REST endpoint for Lambda function
- **GitHub** - Version control and CI/CD integration

**Third-Party Service Integrations:**
- **Booking System** - TBD: Square Appointments, Booksy, or Schedulicity (CRITICAL: Must be selected immediately)
- **Instagram API** - Instagram Basic Display API for feed integration
- **Google Maps** - Maps Embed API for location section
- **Analytics** - Google Analytics 4
- **reCAPTCHA v3** - Invisible spam protection for contact form

**Performance Optimizations:**
- **Image optimization** - WebP format with PNG/JPG fallbacks, responsive image sizes
- **Lazy loading** - Images load as user scrolls, reducing initial page weight
- **Code splitting** - Dynamic imports for non-critical JavaScript (if bundle size grows)
- **Asset compression** - Gzip/Brotli compression via CloudFront

**Security & Compliance:**
- **HTTPS enforced** - CloudFront redirects HTTP to HTTPS
- **Environment variables** - API keys stored in `.env` files (not committed to Git)
- **CSP headers** - Content Security Policy to prevent XSS attacks
- **Privacy policy page** - Required for Google Analytics cookie usage

**Development Workflow:**
- **Git branching strategy** - Feature branches merged to `main` via pull requests
- **CI/CD pipeline** - GitHub Actions for automated build and deployment to S3/CloudFront
- **Cache invalidation** - CloudFront cache invalidation on deployment to ensure fresh content

**Browser/Device Support:**
- Modern browsers last 2 versions (Chrome 120+, Safari 17+, Firefox 121+, Edge 120+)
- iOS 16+ Safari for mobile
- Android Chrome 120+ for mobile
- Graceful degradation for older browsers (functional but reduced animations)

**Data Requirements:**
- **No persistent database required** for MVP - all data handled by third-party services (booking platform, Instagram API, SES email delivery)

---

## Epic List

### Epic 1: Foundation & Core Infrastructure
**Goal:** Establish project foundation with AWS infrastructure, React application setup, CI/CD pipeline, and deliver a deployable "coming soon" landing page with basic brand presence.

### Epic 2: Content & Storytelling Experience
**Goal:** Build the complete one-page scrolling narrative with all content sections (hero, services, about, location), integrated Instagram feed, and responsive design across all devices.

### Epic 3: Interactive Features & Launch Readiness
**Goal:** Implement booking system integration, contact form with Lambda/SES backend, analytics tracking, SEO optimization, and complete all launch preparation for production deployment.

---

## Epic 1: Foundation & Core Infrastructure

**Epic Goal:** Establish project foundation with AWS infrastructure, React application setup, CI/CD pipeline, and deliver a deployable "coming soon" landing page with basic brand presence that can go live immediately to support early marketing efforts.

### Story 1.1: Initialize React Project with Vite and shadcn/ui

**As a** developer,
**I want** a properly configured React project with Vite, Tailwind CSS, and shadcn/ui,
**so that** I have a solid foundation to build components efficiently with modern tooling.

#### Acceptance Criteria

1. React 18+ project initialized using Vite build tool with TypeScript configuration
2. Tailwind CSS configured and functioning with custom theme setup for Blade and Barrel brand colors (gold, dark tones)
3. shadcn/ui CLI installed and configured with initial component library setup
4. Project folder structure created: `/src`, `/public`, `/src/components`, `/src/assets`, `/src/lib`
5. ESLint and Prettier configured for code quality and consistent formatting
6. Git repository initialized with `.gitignore` excluding `node_modules`, `.env`, and build artifacts
7. `package.json` includes all required dependencies (React, Vite, Tailwind, Framer Motion, etc.)
8. Development server runs successfully with hot module replacement (HMR) on `npm run dev`
9. Production build command (`npm run build`) generates optimized static files in `/dist` directory
10. README.md includes setup instructions and development commands

---

### Story 1.2: Set Up AWS S3 Bucket and CloudFront Distribution

**As a** developer,
**I want** AWS infrastructure configured for static site hosting,
**so that** the website can be deployed with global CDN performance and HTTPS security.

#### Acceptance Criteria

1. AWS S3 bucket created with static website hosting enabled and appropriate naming (e.g., `bladeandbarrel-website`)
2. S3 bucket configured with public read access for website objects via bucket policy
3. CloudFront distribution created pointing to S3 bucket as origin
4. CloudFront configured for SPA routing (all 404s redirect to `index.html` with 200 status)
5. HTTPS enforced - CloudFront redirects HTTP requests to HTTPS
6. Gzip/Brotli compression enabled in CloudFront for faster asset delivery
7. Default root object set to `index.html`
8. Cache invalidation strategy documented (manual or automated via CLI)
9. Test deployment: Upload simple `index.html` to S3 and verify CloudFront serves it over HTTPS
10. CloudFront distribution domain name documented (e.g., `d123456.cloudfront.net`) for testing

---

### Story 1.3: Configure Custom Domain with Route 53 and SSL Certificate

**As a** business owner,
**I want** the website accessible via bladeandbarrel.com with HTTPS,
**so that** customers can find the site using our brand domain securely.

#### Acceptance Criteria

1. bladeandbarrel.com domain registered in AWS Route 53 (or DNS records configured if registered elsewhere)
2. SSL/TLS certificate requested and validated via AWS Certificate Manager (ACM) in us-east-1 region for CloudFront compatibility
3. Certificate covers both `bladeandbarrel.com` and `www.bladeandbarrel.com`
4. CloudFront distribution configured to use custom domain with alternate domain names (CNAMEs)
5. CloudFront associated with ACM SSL certificate for HTTPS on custom domain
6. Route 53 A record (alias) created pointing bladeandbarrel.com to CloudFront distribution
7. Route 53 A record (alias) created pointing www.bladeandbarrel.com to CloudFront distribution
8. DNS propagation verified - both `bladeandbarrel.com` and `www.bladeandbarrel.com` resolve to CloudFront
9. HTTPS enforced on custom domain - HTTP redirects to HTTPS
10. Test in browser: Navigate to https://bladeandbarrel.com and verify SSL certificate is valid (green padlock)

---

### Story 1.4: Implement CI/CD Pipeline with GitHub Actions

**As a** developer,
**I want** automated build and deployment on every push to main branch,
**so that** changes go live quickly without manual deployment steps.

#### Acceptance Criteria

1. GitHub repository created and local project pushed to remote
2. GitHub Actions workflow file created (`.github/workflows/deploy.yml`)
3. Workflow triggers on push to `main` branch
4. Workflow installs dependencies (`npm install`) and runs build (`npm run build`)
5. AWS credentials securely stored in GitHub Secrets (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
6. Workflow syncs `/dist` directory to S3 bucket using AWS CLI or GitHub Actions S3 sync
7. Workflow invalidates CloudFront cache after deployment to ensure fresh content (`aws cloudfront create-invalidation`)
8. Build failures prevent deployment - workflow fails if build step errors
9. Deployment status visible in GitHub Actions tab with success/failure indicators
10. Test deployment: Push commit to `main` and verify automated deployment completes successfully and site updates

---

### Story 1.5: Create "Coming Soon" Landing Page with Brand Assets

**As a** potential customer,
**I want** to see a branded "coming soon" page when visiting bladeandbarrel.com,
**so that** I know the business is launching and can find basic information.

#### Acceptance Criteria

1. Single-page React component created for "Coming Soon" landing page
2. Page displays Blade and Barrel logo prominently (loaded from `/src/assets` or `/public`)
3. Hero section includes "Groomed. Poured. Perfected." tagline with compelling imagery
4. Page communicates "Coming Soon - Grand Opening [Month/Year]" message
5. Page includes placeholder text: "Tampa's premier barbershop meets neighborhood bar. Channelside District."
6. Responsive design - page displays correctly on mobile (320px+), tablet, and desktop
7. Tailwind CSS styling applied with brand colors (gold, dark tones, nautical accents)
8. Page loads in under 2 seconds on mobile 4G connection
9. Basic SEO meta tags added: `<title>`, `<meta description>`, Open Graph tags for social sharing
10. Page deployed to production via CI/CD and accessible at https://bladeandbarrel.com

---

### Story 1.6: Optimize Images and Configure WebP Format with Fallbacks

**As a** user on mobile device,
**I want** images to load quickly without sacrificing quality,
**so that** I have a smooth browsing experience even on slower connections.

#### Acceptance Criteria

1. All brand images converted to WebP format with optimized compression (target: <200KB per image)
2. PNG/JPG fallback images generated and included for browsers not supporting WebP
3. `<picture>` element implemented with `<source type="image/webp">` and `<img>` fallback
4. Responsive image sizes generated (mobile, tablet, desktop) using `srcset` attribute where appropriate
5. Image optimization script added to build process or documented for manual execution
6. Images stored in `/public/images` directory with organized subfolder structure
7. Alt text added to all images for accessibility (descriptive text describing image content)
8. Lazy loading implemented for below-the-fold images using `loading="lazy"` attribute
9. Lighthouse performance audit shows image optimization improvements (score 85+)
10. Visual quality verified - optimized images display sharply on Retina/high-DPI displays

---

## Epic 2: Content & Storytelling Experience

**Epic Goal:** Build the complete one-page scrolling narrative experience with all content sections (hero, services, about, location), integrated Instagram feed, responsive design across all devices, and smooth scroll animations that bring the Blade and Barrel brand story to life.

### Story 2.1: Build Hero Section Component with CTA

**As a** first-time visitor,
**I want** to immediately understand what Blade and Barrel offers and be able to book an appointment,
**so that** I can quickly decide if this is the right barbershop for me and take action.

#### Acceptance Criteria

1. Full-screen hero section component created using shadcn/ui and Tailwind CSS
2. Hero displays high-quality background image showcasing barbershop or hybrid concept (from brand assets)
3. "Groomed. Poured. Perfected." tagline prominently displayed with brand typography
4. Compelling headline communicates hybrid barbershop-bar concept (e.g., "Tampa's Premier Barbershop Meets Neighborhood Bar")
5. Primary call-to-action button labeled "Book Appointment" with prominent styling (gold accent color)
6. CTA button placeholder link prepared (will connect to booking system in Epic 3)
7. Hero section is fully responsive - maintains visual impact on mobile (320px+), tablet, and desktop
8. Text remains readable over background image with proper contrast (overlay/gradient if needed)
9. Hero height adjusts appropriately for mobile (prevents excessive scrolling before content)
10. Entrance animation implemented - hero content fades/slides in on page load using Framer Motion

---

### Story 2.2: Create Services Overview Section

**As a** potential customer,
**I want** to see what barbershop services are offered with pricing,
**so that** I can understand what's available and decide what service I need.

#### Acceptance Criteria

1. Services section component created below hero with clear section heading ("Our Services" or "Grooming Services")
2. Service cards or list displays at minimum: Haircut, Beard Trim, Hot Towel Shave
3. Each service includes brief description (1-2 sentences) and pricing
4. Section mentions complimentary draft beer included with barbershop services
5. Section communicates bar service availability (daytime beverages, evening social atmosphere)
6. Services arranged in grid layout on desktop (2-3 columns), stacked vertically on mobile
7. Service cards use shadcn/ui Card component with consistent styling
8. Responsive design - service cards resize appropriately across all breakpoints
9. Scroll-triggered animation - services fade/slide in as user scrolls to section using Framer Motion
10. Section maintains visual hierarchy with adequate spacing and readability

---

### Story 2.3: Develop About/Story Section

**As a** potential customer unfamiliar with the concept,
**I want** to learn about the Blade and Barrel story and what makes it unique,
**so that** I understand the vision and feel connected to the brand.

#### Acceptance Criteria

1. About section component created with section heading ("Our Story" or "About Blade and Barrel")
2. Section includes 2-3 paragraphs explaining the hybrid barbershop-bar concept
3. Content communicates Rich Keeley's vision and entrepreneurial journey
4. Text explains day-to-night transformation (daytime grooming + lunch → evening neighborhood bar)
5. Channelside Tampa location and community focus emphasized
6. Section includes Rich's photo and brief bio (founder, vision, background)
7. Content mentions future multi-location expansion aspiration (establishes credibility)
8. Section layout includes image(s) of the space or concept photography alongside text
9. Responsive layout - text and images stack vertically on mobile, side-by-side on desktop
10. Scroll-triggered animation - content animates in smoothly as section enters viewport

---

### Story 2.4: Implement Location & Hours Section with Google Maps

**As a** potential customer,
**I want** to see exactly where Blade and Barrel is located and when it's open,
**so that** I can plan my visit and find the shop easily.

#### Acceptance Criteria

1. Location section component created with section heading ("Visit Us" or "Location & Hours")
2. Embedded Google Map showing Channelside Tampa location using Google Maps Embed API
3. Map is interactive - users can zoom, pan, and click "View larger map" to open in Google Maps
4. Full street address displayed prominently near map
5. Operating hours displayed clearly (format: "Monday-Friday: 9am-7pm" or similar)
6. Hours differentiated for barbershop vs. bar if applicable (e.g., "Barbershop: 9am-6pm, Bar: 4pm-11pm")
7. Parking information included (e.g., "Street parking available, nearby garage at...")
8. Phone number and email contact displayed for quick reference
9. Map and contact info are responsive - map resizes on mobile, contact info remains readable
10. Section maintains accessibility - map has proper ARIA labels and keyboard navigation

---

### Story 2.5: Integrate Instagram Feed

**As a** potential customer,
**I want** to see recent Instagram posts from Blade and Barrel,
**so that** I can get a feel for the vibe, see recent work, and decide if this matches my style.

#### Acceptance Criteria

1. Instagram feed section component created with section heading ("Follow Our Journey" or "Latest from Instagram")
2. Instagram Basic Display API integrated to fetch recent posts from @bladeandbarrel account
3. Feed displays 6-9 recent posts in grid layout (3 columns on desktop, 2 on tablet, 1-2 on mobile)
4. Each post displays image/video thumbnail with option to click through to Instagram
5. Instagram username and "Follow Us" CTA button link to Instagram profile
6. Loading state implemented - skeleton or spinner displays while fetching posts
7. Error handling - graceful fallback message if API fails or returns no posts
8. Images lazy-load as user scrolls to section for performance
9. Feed updates automatically on page load (no manual refresh needed)
10. Rate limiting handled - API calls respect Instagram API limits (cached for reasonable duration)

---

### Story 2.6: Build Contact Form UI (Frontend Only)

**As a** potential customer or event organizer,
**I want** to send an inquiry about private events, partnerships, or general questions,
**so that** I can get in touch with Blade and Barrel easily.

#### Acceptance Criteria

1. Contact form section component created with section heading ("Get In Touch" or "Contact Us")
2. Form includes fields: Name (required), Email (required), Phone (optional), Message (required)
3. Form built using shadcn/ui Form components with proper validation
4. Client-side validation - email format validated, required fields enforced before submission
5. Form displays validation errors inline (e.g., "Please enter a valid email address")
6. Submit button labeled "Send Message" with loading state (disabled during submission)
7. Form layout is responsive - fields stack vertically on mobile, optimized spacing on desktop
8. Placeholder text provides guidance (e.g., "Tell us about your event or inquiry...")
9. Form submission handler placeholder prepared (will connect to Lambda backend in Epic 3)
10. Success/error message placeholders prepared for post-submission feedback

---

### Story 2.7: Implement Smooth Scroll Navigation and Animations

**As a** user,
**I want** smooth scrolling between sections and elegant animations,
**so that** the website feels polished, modern, and enjoyable to browse.

#### Acceptance Criteria

1. Smooth scroll behavior implemented for all in-page navigation (e.g., clicking nav links scrolls smoothly to sections)
2. Scroll-triggered animations configured using Framer Motion for all major sections
3. Sections animate in with fade-in and slide-up effect as they enter viewport (threshold: 20-30% visible)
4. Hero section has entrance animation on initial page load
5. Animations are performant - no jank or lag on mobile devices (60fps target)
6. Animations respect `prefers-reduced-motion` accessibility setting (disable for users who prefer less motion)
7. Scroll progress indicator or scroll-to-top button implemented for user convenience (optional enhancement)
8. Navigation bar (if exists) becomes sticky/fixed on scroll for easy section access
9. All animations have appropriate duration (300-600ms) to feel responsive, not sluggish
10. Testing on multiple devices confirms smooth performance across mobile, tablet, desktop

---

### Story 2.8: Ensure Full Responsive Design Across All Breakpoints

**As a** user on any device,
**I want** the website to look great and function perfectly whether I'm on mobile, tablet, or desktop,
**so that** I have a consistent, high-quality experience regardless of how I access the site.

#### Acceptance Criteria

1. All sections (hero, services, about, location, Instagram, contact) tested at mobile (320px-767px) breakpoint
2. All sections tested at tablet (768px-1024px) breakpoint
3. All sections tested at desktop (1025px+) and large desktop (1920px+) breakpoints
4. Typography scales appropriately - headings remain readable on small screens, not too large on desktop
5. Images resize and crop appropriately without distortion or awkward aspect ratios
6. Touch targets (buttons, links, form fields) are minimum 44x44px on mobile for easy tapping
7. No horizontal scrolling occurs on any breakpoint (content fits within viewport width)
8. Spacing and padding adjust proportionally across breakpoints (tighter on mobile, more generous on desktop)
9. Navigation and CTA buttons remain accessible and prominent across all screen sizes
10. Cross-browser testing completed on Chrome, Safari, Firefox, Edge (last 2 versions) for mobile and desktop

---

## Epic 3: Interactive Features & Launch Readiness

**Epic Goal:** Implement booking system integration, contact form backend with AWS Lambda + SES, analytics tracking, SEO optimization, security hardening, and complete all launch preparation activities to make the website production-ready for grand opening.

### Story 3.1: Research and Select Booking Platform

**As a** product manager,
**I want** to evaluate and select the best booking platform for Blade and Barrel,
**so that** we choose a solution that meets our needs for ease of integration, features, and cost.

#### Acceptance Criteria

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

### Story 3.2: Integrate Booking System into Website

**As a** customer,
**I want** to book a barbershop appointment directly from the website,
**so that** I can secure my preferred time slot conveniently without calling.

#### Acceptance Criteria

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

### Story 3.3: Build AWS Lambda Function for Contact Form Backend

**As a** developer,
**I want** a serverless backend to handle contact form submissions,
**so that** inquiries are reliably delivered to the business email without a dedicated server.

#### Acceptance Criteria

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

### Story 3.4: Set Up API Gateway and Connect Contact Form Frontend

**As a** customer,
**I want** to submit a contact inquiry and receive confirmation,
**so that** I know my message was sent successfully to Blade and Barrel.

#### Acceptance Criteria

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

### Story 3.5: Configure AWS SES and Verify Email Domain

**As a** business owner,
**I want** contact form inquiries delivered reliably to my business email,
**so that** I don't miss potential customer questions or event bookings.

#### Acceptance Criteria

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

### Story 3.6: Implement reCAPTCHA v3 Spam Protection

**As a** business owner,
**I want** spam and bot submissions blocked from the contact form,
**so that** I only receive legitimate customer inquiries.

#### Acceptance Criteria

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

### Story 3.7: Implement Google Analytics 4 Tracking

**As a** business owner,
**I want** website traffic and user behavior tracked,
**so that** I can understand how customers find and use the website.

#### Acceptance Criteria

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

### Story 3.8: SEO Optimization and Meta Tags

**As a** potential customer searching Google,
**I want** Blade and Barrel to appear in search results for "barbershop Tampa" and "Channelside barbershop",
**so that** I can discover this business when looking for grooming services.

#### Acceptance Criteria

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

### Story 3.9: Google Business Profile Integration

**As a** local customer searching "barbershop near me",
**I want** Blade and Barrel to appear in Google Maps and local search results,
**so that** I can find the business, see reviews, and visit the website.

#### Acceptance Criteria

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

### Story 3.10: Security Hardening and Privacy Policy

**As a** customer,
**I want** my personal information protected when using the website,
**so that** I feel safe booking appointments and submitting contact inquiries.

#### Acceptance Criteria

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

### Story 3.11: Performance Testing and Lighthouse Optimization

**As a** user on a mobile device,
**I want** the website to load quickly and smoothly,
**so that** I can browse services and book appointments without frustration.

#### Acceptance Criteria

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

### Story 3.12: Cross-Browser and Device Testing

**As a** customer using any browser or device,
**I want** the website to work perfectly regardless of my setup,
**so that** I have a seamless experience booking and browsing.

#### Acceptance Criteria

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

### Story 3.13: Final Content Review and Launch Preparation

**As a** business owner,
**I want** all website content reviewed and finalized before launch,
**so that** we present a professional, accurate brand experience to customers.

#### Acceptance Criteria

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

### Story 3.14: Production Launch and Post-Launch Monitoring

**As a** business owner,
**I want** the website launched successfully and monitored for issues,
**so that** customers have a reliable experience from day one.

#### Acceptance Criteria

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

## Checklist Results Report

### Executive Summary

**Overall PRD Completeness:** 92%

**MVP Scope Appropriateness:** Just Right - The 3-epic structure delivers incremental value with appropriate scope for a 1-2 month timeline.

**Readiness for Architecture Phase:** **READY** - PRD is comprehensive with clear technical constraints, functional requirements, and well-structured epics. Minor enhancements recommended but not blocking.

**Most Critical Gaps:**
1. No explicit MVP validation approach defined (how will we test success?)
2. Data requirements section minimal (acceptable for static site, but should be noted)
3. Missing explicit user journey documentation (flows are implied but not diagrammed)

### Category Analysis Table

| Category                         | Status  | Critical Issues |
| -------------------------------- | ------- | --------------- |
| 1. Problem Definition & Context  | PASS    | None - Brief provides comprehensive problem context |
| 2. MVP Scope Definition          | PASS    | MVP scope well-defined, out-of-scope items documented in brief |
| 3. User Experience Requirements  | PASS    | UI Design Goals section comprehensive, WCAG AA specified |
| 4. Functional Requirements       | PASS    | FR1-FR8 cover all core features, testable and specific |
| 5. Non-Functional Requirements   | PASS    | NFR1-NFR10 address performance, security, hosting, analytics |
| 6. Epic & Story Structure        | PASS    | 3 epics with 27 stories, properly sequenced with clear ACs |
| 7. Technical Guidance            | PASS    | Detailed tech stack, architecture decisions, AWS infrastructure |
| 8. Cross-Functional Requirements | PARTIAL | Data requirements minimal (acceptable for static site), integrations well-documented |
| 9. Clarity & Communication       | PASS    | Clear language, well-structured, consistent terminology |

### Top Issues by Priority

#### BLOCKERS
**None** - PRD is ready for architecture phase.

#### HIGH Priority
1. **Missing MVP Validation Approach** (Section 2.3)
   - How will we measure MVP success post-launch?
   - What user feedback mechanisms will we implement?
   - Criteria for moving beyond MVP unclear
   - **Recommendation:** Add story for post-launch analytics review and user feedback collection

2. **User Journey Documentation** (Section 3.1)
   - Primary user flows implied but not explicitly documented
   - Booking flow: Discover → Learn → Book not diagrammed
   - Inquiry flow: Browse → Question → Contact not mapped
   - **Recommendation:** Acceptable to defer to UX Expert phase, but could enhance clarity

#### MEDIUM Priority
3. **Data Requirements Light** (Section 8.1)
   - Minimal data storage for static site, but should explicitly note "no database required"
   - Instagram feed data caching strategy not specified
   - Contact form data retention policy not mentioned (SES handles, but should note)
   - **Recommendation:** Add note in Technical Assumptions that no persistent database is required for MVP

4. **Operational Requirements** (Section 8.3)
   - Deployment frequency not specified (assumed: on-demand via CI/CD)
   - Support requirements not documented (who handles site issues post-launch?)
   - **Recommendation:** Add operational ownership to Story 3.14 or post-launch documentation

#### LOW Priority
5. **Stakeholder Alignment** (Section 9.2)
   - Key stakeholders identified (Rich Keeley, business owner) but no formal approval process
   - **Recommendation:** Story 3.13 includes business owner sign-off, sufficient for small business

### MVP Scope Assessment

#### ✅ **Scope is Appropriately Minimal**

**Well-Scoped Features:**
- One-page website format minimizes complexity
- Third-party booking integration (vs. custom booking system)
- Serverless contact form (Lambda + SES, no backend server)
- Static site hosting (S3/CloudFront, no database)
- Deferred features properly identified (e-commerce, team profiles, blog, event calendar)

**Features That Could Be Cut (If Timeline Pressure Increases):**
- Story 2.5: Instagram feed integration (nice-to-have social proof, not critical for bookings)
- Story 3.6: reCAPTCHA spam protection (could launch with honeypot method instead)
- Story 2.7: Scroll animations (visual polish, not functional requirement)

**No Missing Essential Features** - All core user needs addressed:
- ✅ Information discovery (hero, services, about)
- ✅ Booking capability (Epic 3, Story 3.2)
- ✅ Contact/inquiry (Epic 3, Stories 3.3-3.6)
- ✅ Location/hours (Epic 2, Story 2.4)

**Complexity Concerns:**
- **AWS Infrastructure Setup** (Epic 1, Stories 1.2-1.4): Moderate complexity for developer unfamiliar with AWS
  - Mitigation: Well-documented ACs, CloudFront SPA routing explicitly called out
- **Booking Platform Integration** (Story 3.1-3.2): Dependency on third-party API/embed capabilities
  - Mitigation: Story 3.1 includes research phase to validate integration feasibility

**Timeline Realism:**
- 27 stories across 3 epics for 1-2 month timeline
- Average story size: 2-4 hours = 54-108 developer hours
- **Assessment:** Aggressive but achievable with focused execution
- **Risk Mitigation:** Epic 1 delivers "coming soon" page quickly, allowing phased rollout if needed

### Technical Readiness

#### ✅ **Clear Technical Constraints**
- React + Vite + shadcn/ui + Tailwind CSS specified
- AWS S3 + CloudFront + Lambda + SES architecture documented
- No AWS Amplify (manual setup preferred)
- Performance targets specific: <2s load, Lighthouse 85+, WCAG AA
- Browser support explicit: Last 2 versions Chrome/Safari/Firefox/Edge

#### 🔍 **Identified Technical Risks**
1. **CloudFront SPA Routing** (Story 1.2, AC #4)
   - Risk: Incorrect CloudFront configuration breaks client-side routing
   - Mitigation: Specific AC addresses this, architect should document detailed CloudFront settings

2. **Booking Platform Unknown** (Story 3.1)
   - Risk: Selected platform may have poor API/embed capabilities
   - Mitigation: Story 3.1 research phase validates integration before development

3. **Instagram API Rate Limits** (Story 2.5, AC #10)
   - Risk: API calls exceed limits, feed breaks
   - Mitigation: AC includes caching requirement, architect should specify cache duration

4. **SES Sandbox Mode** (Story 3.5, AC #1)
   - Risk: SES in sandbox only sends to verified emails, limiting testing
   - Mitigation: AC explicitly calls out sandbox exit requirement for production

#### 🏗️ **Areas Needing Architect Investigation**
1. **CloudFront Configuration Details**
   - Error page routing for SPA (404 → index.html with 200 status)
   - Cache invalidation strategy (full invalidation vs. versioned assets)
   - Cache-Control headers for static assets vs. index.html

2. **Instagram Feed Implementation**
   - Client-side API call vs. serverless function proxy (to hide access token)
   - Cache duration to balance freshness vs. API limits
   - Fallback content if Instagram API unavailable

3. **Environment Variable Management**
   - How to inject environment variables into static React build
   - API keys for Instagram, Google Maps, reCAPTCHA, GA4
   - Strategy: Build-time injection vs. runtime config

4. **CI/CD Pipeline Details**
   - GitHub Actions workflow specifics (AWS credential management, cache invalidation)
   - Build optimization (caching node_modules, incremental builds)
   - Deployment rollback strategy if production issues occur

### Recommendations

#### **Immediate Actions (Before Architect Phase)**

**✅ PROCEED AS-IS** - PRD is comprehensive and ready for architecture. High priority items are enhancements, not blockers. Architect can address technical details during design phase.

### Final Decision

**✅ READY FOR ARCHITECT**

The PRD and epics are comprehensive, properly structured, and ready for architectural design. The document provides:

- Clear problem definition and business goals from project brief
- Well-defined MVP scope with appropriate feature prioritization
- Comprehensive functional and non-functional requirements
- Detailed 3-epic structure with 27 properly sequenced stories
- Clear technical constraints and technology stack guidance
- Specific acceptance criteria for all stories

**Identified gaps are enhancements, not blockers.** The Architect can proceed with confidence to design the technical architecture, component structure, and implementation details.

---

## Next Steps

### UX Expert Prompt

Review the Blade and Barrel PRD (docs/prd.md) and create detailed UI/UX designs including wireframes, user journey flows, and component specifications. Focus on the one-page scrolling narrative experience with industrial/vintage gold aesthetic and mobile-first responsive design per the UI Design Goals section.

### Architect Prompt

Review the Blade and Barrel PRD (docs/prd.md) and create the technical architecture document. Design the React component structure, AWS infrastructure configuration (S3/CloudFront/Lambda/SES), integration patterns for booking system and Instagram API, and development workflows. Address the technical investigation areas flagged in the Checklist Results Report, particularly CloudFront SPA routing, environment variable management, and CI/CD pipeline implementation.
