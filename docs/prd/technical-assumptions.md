# Technical Assumptions

## Repository Structure: Monorepo

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

## Service Architecture

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

## Testing Requirements

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

## Additional Technical Assumptions and Requests

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
