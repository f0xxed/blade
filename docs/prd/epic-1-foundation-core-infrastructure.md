# Epic 1: Foundation & Core Infrastructure

**Epic Goal:** Establish project foundation with AWS infrastructure, React application setup, CI/CD pipeline, and deliver a deployable "coming soon" landing page with basic brand presence that can go live immediately to support early marketing efforts.

## Story 1.1: Initialize React Project with Vite and shadcn/ui

**As a** developer,
**I want** a properly configured React project with Vite, Tailwind CSS, and shadcn/ui,
**so that** I have a solid foundation to build components efficiently with modern tooling.

### Acceptance Criteria

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

## Story 1.2: Set Up AWS S3 Bucket and CloudFront Distribution

**As a** developer,
**I want** AWS infrastructure configured for static site hosting,
**so that** the website can be deployed with global CDN performance and HTTPS security.

### Acceptance Criteria

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

## Story 1.3: Configure Custom Domain with Route 53 and SSL Certificate

**As a** business owner,
**I want** the website accessible via bladeandbarrel.com with HTTPS,
**so that** customers can find the site using our brand domain securely.

### Acceptance Criteria

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

## Story 1.4: Implement CI/CD Pipeline with GitHub Actions

**As a** developer,
**I want** automated build and deployment on every push to main branch,
**so that** changes go live quickly without manual deployment steps.

### Acceptance Criteria

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

## Story 1.5: Create "Coming Soon" Landing Page with Brand Assets

**As a** potential customer,
**I want** to see a branded "coming soon" page when visiting bladeandbarrel.com,
**so that** I know the business is launching and can find basic information.

### Acceptance Criteria

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

## Story 1.6: Optimize Images and Configure WebP Format with Fallbacks

**As a** user on mobile device,
**I want** images to load quickly without sacrificing quality,
**so that** I have a smooth browsing experience even on slower connections.

### Acceptance Criteria

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
