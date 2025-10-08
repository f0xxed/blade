# Blade and Barrel - Tampa's Premier Barbershop

[![Deploy to AWS](https://github.com/f0xxed/blade/workflows/Deploy%20to%20AWS/badge.svg)](https://github.com/f0xxed/blade/actions/workflows/deploy.yml)

A modern, high-performance single-page application for Blade and Barrel barbershop, located in Tampa's Channelside District.

## Tech Stack

This project is built with a modern frontend stack optimized for performance and developer experience:

- **React 18.3+** - Component-based UI library
- **Vite 5.4+** - Fast build tool with HMR (Hot Module Replacement)
- **TypeScript 5.6+** - Type-safe development
- **Tailwind CSS 3.4+** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library built on Radix UI primitives
- **Framer Motion 11+** - Performant animations and scroll effects
- **React Hook Form 7+** - Performant form handling and validation
- **Zod 3+** - TypeScript-first schema validation

## Project Structure

```
blade/
├── src/                              # React frontend application
│   ├── components/                   # Page-level components
│   ├── components/ui/                # shadcn/ui components
│   ├── hooks/                        # Custom React hooks
│   ├── services/                     # API client services
│   ├── types/                        # TypeScript interfaces
│   ├── lib/                          # Utilities and helpers
│   ├── constants/                    # Static data
│   ├── assets/                       # Images, fonts
│   ├── App.tsx                       # Main app component
│   ├── main.tsx                      # React entry point
│   └── index.css                     # Global styles with Tailwind
│
├── public/                           # Static assets
│   └── images/                       # Image files
│
├── infrastructure/                   # AWS infrastructure configs
│   ├── s3-bucket-policy.json         # S3 bucket policy
│   ├── cloudfront-config.json        # CloudFront configuration
│   ├── aws-resources.md              # AWS resource documentation
│   └── invalidate-cloudfront.sh      # Cache invalidation script
│
├── docs/                             # Project documentation
├── lambda/                           # AWS Lambda functions (future)
├── tests/                            # Test files (future)
│
├── package.json                      # Dependencies and scripts
├── vite.config.ts                    # Vite configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── components.json                   # shadcn/ui configuration
└── tsconfig.json                     # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blade
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

## Development

### Available Commands

- **`npm run dev`** - Start development server with HMR
  - Opens at http://localhost:5173
  - Hot reload on file changes
  - Fast refresh for React components

- **`npm run build`** - Create production build
  - TypeScript compilation
  - Optimized bundles in `/dist`
  - Tree-shaking and code splitting
  - Minified CSS and JS

- **`npm run preview`** - Preview production build locally
  - Serves the `/dist` directory
  - Test production build before deployment

- **`npm run lint`** - Run ESLint on source files
  - Checks TypeScript and React code
  - Enforces coding standards
  - Shows errors and warnings

- **`npm run format`** - Format code with Prettier
  - Formats all `.ts` and `.tsx` files in `src/`
  - Ensures consistent code style
  - Runs automatically in CI/CD

## Development Workflow

1. **Start the dev server:**
```bash
npm run dev
```

2. **Make your changes** - Edit files in `src/`
   - Components hot reload automatically
   - TypeScript errors show in terminal

3. **Lint and format:**
```bash
npm run lint
npm run format
```

4. **Build for production:**
```bash
npm run build
npm run preview  # Test the build
```

## AWS Infrastructure

This project is deployed to AWS using S3 for static hosting and CloudFront for global CDN delivery, with a custom domain configured via Route 53 and ACM SSL certificate.

### AWS Resources

- **Custom Domain**: `bladeandbarrel.com`
  - Production URL: https://bladeandbarrel.com
  - WWW URL: https://www.bladeandbarrel.com
  - HTTPS: Enforced with ACM SSL certificate
  - DNS: Managed by Route 53

- **S3 Bucket**: `bladeandbarrel-site`
  - Region: `us-east-1`
  - Website Endpoint: `http://bladeandbarrel-site.s3-website-us-east-1.amazonaws.com`
  - Configuration: Static website hosting with public read access

- **CloudFront Distribution**: `EJNJPQN7X1JDD`
  - Custom Domains: `bladeandbarrel.com`, `www.bladeandbarrel.com`
  - CloudFront Domain: `d140ojizs9fkiz.cloudfront.net` (internal)
  - HTTPS: Enforced (HTTP redirects to HTTPS)
  - SSL Certificate: AWS Certificate Manager (ACM)
  - Security Policy: TLSv1.2_2021
  - Compression: Gzip/Brotli enabled
  - SPA Routing: 404/403 errors redirect to index.html

- **Route 53 Hosted Zone**: `bladeandbarrel.com`
  - DNS A Records: Root and www subdomains (alias to CloudFront)
  - Configuration: See `infrastructure/route53-config.json`

- **ACM SSL Certificate**: (us-east-1 region)
  - Domains: `bladeandbarrel.com`, `www.bladeandbarrel.com`
  - Validation: DNS (automatic)
  - Auto-renewal: Enabled
  - Configuration: See `infrastructure/acm-certificate.json`

### Deployment

#### Automated Deployment (GitHub Actions)

The project uses **GitHub Actions** for automated deployment. Every push to the `main` branch automatically:

1. Builds the production bundle
2. Syncs files to S3 with optimized cache headers
3. Invalidates CloudFront cache for fresh content delivery

**Deployment workflow status:** Check the badge above or visit the [Actions tab](https://github.com/f0xxed/blade/actions).

**Manual deployment trigger:**
```bash
# Trigger workflow manually via GitHub CLI
gh workflow run deploy.yml

# Or use the GitHub UI: Actions → Deploy to AWS → Run workflow
```

#### Manual Deployment (CLI)

For manual deployments or emergency rollbacks:

**Prerequisites:**
- AWS CLI v2.x installed
- AWS credentials configured (`aws configure`)
- IAM permissions required:
  - `s3:PutObject`
  - `s3:DeleteObject`
  - `s3:ListBucket`
  - `cloudfront:CreateInvalidation`
  - `cloudfront:GetInvalidation`

**Deploy to Production:**

```bash
# 1. Build production bundle
npm run build

# 2. Sync assets with long-term caching (excludes index.html)
aws s3 sync dist/ s3://bladeandbarrel-site/ --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "index.html"

# 3. Upload index.html with no-cache headers
aws s3 cp dist/index.html s3://bladeandbarrel-site/index.html \
  --cache-control "no-cache, no-store, must-revalidate"

# 4. Invalidate CloudFront cache (ensures fresh content)
aws cloudfront create-invalidation --distribution-id EJNJPQN7X1JDD --paths "/*"
```

#### Quick Invalidation

You can also use the provided script:

```bash
# Make executable (first time only)
chmod +x infrastructure/invalidate-cloudfront.sh

# Run invalidation
./infrastructure/invalidate-cloudfront.sh
```

#### Testing Deployment

After deployment, verify:

1. **Production site**: https://bladeandbarrel.com
2. **WWW site**: https://www.bladeandbarrel.com
3. **HTTPS redirect**: http://bladeandbarrel.com → redirects to HTTPS
4. **SPA routing**: https://bladeandbarrel.com/any-path → serves index.html
5. **Compression**: Check response headers for `Content-Encoding: gzip` or `br`
6. **SSL certificate**: Verify green padlock in browser (valid ACM certificate)

### Infrastructure Files

Reference configuration files and automation scripts are in `/infrastructure`:

**Configuration Files:**
- `s3-bucket-policy.json` - S3 bucket policy for public read access
- `cloudfront-config.json` - CloudFront distribution configuration with custom domain
- `route53-config.json` - Route 53 hosted zone and DNS records
- `acm-certificate.json` - ACM SSL certificate details and ARN
- `aws-resources.md` - Complete AWS resource documentation

**Automation Scripts:**
- `setup-route53-acm.sh` - Setup Route 53 hosted zone and ACM certificate
- `update-cloudfront-custom-domain.sh` - Configure CloudFront with custom domain
- `create-dns-records.sh` - Create DNS A records in Route 53
- `invalidate-cloudfront.sh` - Cache invalidation script

**Documentation:**
- `CUSTOM-DOMAIN-SETUP.md` - Complete guide for custom domain setup

## Adding shadcn/ui Components

This project uses shadcn/ui for accessible, customizable components:

```bash
# Add a new component (e.g., card)
npx shadcn@latest add card

# Components are installed to src/components/ui/
```

## Environment Variables

Environment variables must be prefixed with `VITE_` to be exposed to the client:

```env
VITE_API_BASE_URL=https://api.example.com
```

Access in code via config objects (not directly via `import.meta.env`):

```typescript
// ❌ Don't do this in components
const url = import.meta.env.VITE_API_BASE_URL;

// ✅ Do this - create config object
// src/lib/config.ts
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
};
```

## Coding Standards

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Components | PascalCase | `HeroSection.tsx` |
| Hooks | camelCase with 'use' | `useAnalytics.ts` |
| Environment Variables | SCREAMING_SNAKE_CASE | `VITE_API_BASE_URL` |

### Key Rules

- **Type Sharing:** Define types in `/src/types` and import consistently
- **API Calls:** Use service layer functions, never direct HTTP calls in components
- **Environment Variables:** Access through config objects only
- **State Updates:** Never mutate state directly - use React hooks

## Performance Goals

- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.0s
- **Lighthouse Score:** 85+ (Performance, Accessibility, Best Practices, SEO)

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Contributing

1. Create a feature branch from `main`
2. Make your changes following coding standards
3. Run `npm run lint` and `npm run format`
4. Test with `npm run build`
5. Submit a pull request

## License

Proprietary - Blade and Barrel

## Contact

For questions or support, contact the development team.
