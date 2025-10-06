# Development Workflow

## Local Development Setup

### Prerequisites

```bash
# Required software
node --version  # v20.x LTS required
npm --version   # v10.x (bundled with Node 20)
git --version   # Latest stable

# AWS CLI (for Lambda deployment and infrastructure)
aws --version   # v2.x

# Optional but recommended
code --version  # VS Code for TypeScript support
```

### Initial Setup

```bash
# Clone repository
git clone https://github.com/bladeandbarrel/website.git
cd blade

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Configure environment variables
# Edit .env.local with your API keys:
# - VITE_API_BASE_URL
# - VITE_GA4_MEASUREMENT_ID
# - VITE_RECAPTCHA_SITE_KEY
# - VITE_INSTAGRAM_BUSINESS_ACCOUNT_ID

# Install Lambda dependencies
cd lambda/contact-form && npm install && cd ../..
cd lambda/instagram-proxy && npm install && cd ../..

# Start development server
npm run dev
```

### Development Commands

```bash
# Start all services (frontend only for local dev)
npm run dev              # Vite dev server on http://localhost:5173

# Frontend-specific commands
npm run build            # Production build
npm run preview          # Preview production build locally
npm run lint             # Run ESLint
npm run format           # Run Prettier
npm run type-check       # TypeScript type checking

# Testing commands
npm run test             # Run Vitest unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report

# Lambda local testing (requires AWS SAM CLI)
cd lambda/contact-form
node index.js           # Run handler locally with test event

# Build Lambda for deployment
cd lambda/contact-form && npm run build && cd ../..
```

## Environment Configuration

### Required Environment Variables

```bash
# Frontend (.env.local)
VITE_API_BASE_URL=https://api.bladeandbarrel.com
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_RECAPTCHA_SITE_KEY=6LxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxE
VITE_INSTAGRAM_BUSINESS_ACCOUNT_ID=17841400000000000
VITE_GOOGLE_MAPS_EMBED_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX  # Optional

# Backend Lambda (.env for deployment - NOT committed)
FROM_EMAIL=noreply@bladeandbarrel.com
TO_EMAIL=info@bladeandbarrel.com
RECAPTCHA_SECRET_KEY=6LxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxE
INSTAGRAM_ACCESS_TOKEN=IGQVJxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# AWS Deployment (GitHub Secrets)
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AWS_REGION=us-east-1
S3_BUCKET=bladeandbarrel-website
CLOUDFRONT_DISTRIBUTION_ID=E1XXXXXXXXXX
```
