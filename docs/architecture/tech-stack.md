# Tech Stack

This is the **DEFINITIVE** technology selection for the entire project. All development must use these exact versions and technologies.

## Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|-----------|---------|---------|-----------|
| **Frontend Language** | TypeScript | 5.3+ | Type-safe React development | Catches errors at compile time, improves IDE support, self-documenting code for team collaboration |
| **Frontend Framework** | React | 18.2+ | Component-based UI library | Industry standard, strong ecosystem, team familiarity, shadcn/ui compatibility |
| **Build Tool** | Vite | 5.0+ | Fast development server & optimized builds | 10x faster HMR than CRA, optimized production bundles, native ESM support |
| **UI Component Library** | shadcn/ui | Latest | Pre-built accessible components | Copy-paste components (no dependency bloat), full customization, built on Radix UI primitives, WCAG AA compliant |
| **CSS Framework** | Tailwind CSS | 3.4+ | Utility-first styling | Required by shadcn/ui, rapid development, small production bundle with PurgeCSS, consistent design tokens |
| **Animation Library** | Framer Motion | 11.0+ | Scroll animations & page transitions | Performant 60fps animations, scroll-triggered reveals for storytelling, React-first API |
| **State Management** | React Context API | Built-in (React 18+) | Global UI state | Zero dependencies, sufficient for one-page site (modal state, form handling), upgradeable to Zustand if needed |
| **Form Handling** | React Hook Form | 7.49+ | Contact form validation | Performant uncontrolled forms, integrates with shadcn/ui Form components, built-in validation |
| **Backend Language** | Node.js (JavaScript) | 20.x LTS | Lambda runtime | AWS Lambda native support, team JavaScript familiarity, consistent language across stack |
| **Backend Framework** | None (vanilla Lambda) | N/A | Serverless contact form | Simple single-function use case doesn't warrant Express/Fastify overhead |
| **API Style** | REST | N/A | Contact form endpoint | Simple POST `/api/contact`, lightweight for single endpoint, API Gateway native support |
| **Database** | None | N/A | No persistent storage needed | Static site with third-party data sources (booking platform, Instagram API) |
| **Cache** | CloudFront Edge Cache | Built-in | Static asset caching | Global edge caching for images/JS/CSS, 1-hour TTL for dynamic Instagram feed proxy |
| **File Storage** | AWS S3 | N/A | Static site hosting & image storage | Cost-effective static hosting, integrates with CloudFront, unlimited scalability |
| **Authentication** | None (MVP) | N/A | No user accounts required | Booking platform handles auth, no admin panel needed for MVP |
| **Email Service** | AWS SES | N/A | Contact form delivery | Transactional email, cost-effective ($0.10/1000 emails), integrates with Lambda |
| **Frontend Testing** | Vitest | 1.0+ | React component unit tests | Native Vite integration, Jest-compatible API, faster than Jest |
| **Testing Library** | React Testing Library | 14.0+ | Component integration tests | User-centric testing, accessibility-focused, industry best practice |
| **E2E Testing** | Playwright | 1.40+ (deferred post-MVP) | Critical flow validation | Cross-browser E2E, mobile emulation, deferred to post-launch based on PRD |
| **Linting** | ESLint | 8.56+ | Code quality enforcement | Catches bugs, enforces consistent style, React/TypeScript rules |
| **Formatting** | Prettier | 3.1+ | Automated code formatting | Eliminates style debates, integrates with ESLint, Git hooks for pre-commit |
| **Package Manager** | npm | 10.0+ (Node 20 bundled) | Dependency management | Built-in with Node, team familiarity, workspaces support for future monorepo needs |
| **Bundler** | Vite (Rollup) | Built-in with Vite 5.0+ | Production bundle optimization | Tree-shaking, code splitting, CSS minification, WebP image optimization |
| **IaC Tool** | AWS CLI + GitHub Actions | AWS CLI 2.x | Infrastructure deployment | Manual S3/CloudFront setup documented, CI/CD via GitHub Actions, no Terraform needed for simple stack |
| **CI/CD** | GitHub Actions | N/A | Automated build & deployment | Free for public repos, AWS integration, cache node_modules, invalidate CloudFront on deploy |
| **Monitoring** | AWS CloudWatch | Built-in | Lambda logs & error tracking | Lambda execution logs, API Gateway metrics, free tier includes 5GB logs/month |
| **Error Tracking** | CloudWatch Logs (MVP) | Built-in | Lambda error monitoring | Built-in error capture, upgrade to Sentry post-MVP if needed for client-side errors |
| **Analytics** | Google Analytics 4 | GA4 (gtag.js) | User behavior tracking | Free, event-based tracking, conversion funnels, real-time reports |
| **Spam Protection** | reCAPTCHA v3 | 3.0 | Contact form bot prevention | Invisible (no user interaction), score-based filtering, Google-backed reliability |
| **Booking Integration** | TBD (Story 3.1) | Latest | Appointment scheduling | **DECISION PENDING:** Square Appointments, Booksy, or Schedulicity (evaluated in Epic 3) |
| **Instagram API** | Instagram Graph API | 2.0 (current) | Social feed integration | Business account support, better security than Basic Display API, rate limits 200 calls/hour |
| **Maps** | Google Maps Embed API | N/A | Location section map | Free for static embeds, no API key billing for embed-only usage |
| **Hosting Platform** | AWS S3 + CloudFront | N/A | Static site delivery | Global CDN, HTTPS with custom domain, SPA routing, <$15/month estimated |
