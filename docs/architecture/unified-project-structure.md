# Unified Project Structure

Complete monorepo structure accommodating both frontend and backend:

```
blade/ (root)
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Run tests and linting
│       └── deploy.yml                # Build and deploy to AWS
│
├── src/                              # React frontend application
│   ├── components/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── AboutSection.tsx
│   │   ├── InstagramFeed.tsx
│   │   ├── ContactForm.tsx
│   │   ├── GoogleMapEmbed.tsx
│   │   └── BookingWidgetWrapper.tsx
│   ├── components/ui/                # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   └── textarea.tsx
│   ├── contexts/
│   │   └── AppContext.tsx
│   ├── hooks/
│   │   ├── useAnalytics.ts
│   │   └── useIntersectionObserver.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── contactService.ts
│   │   └── instagramService.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── contact.ts
│   │   ├── instagram.ts
│   │   └── analytics.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── analytics.ts
│   ├── constants/
│   │   └── services.ts
│   ├── assets/                       # Images, fonts, etc.
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── public/                           # Static assets
│   ├── images/
│   │   ├── hero.webp
│   │   ├── hero.jpg
│   │   └── logo.svg
│   └── favicon.ico
│
├── lambda/                           # AWS Lambda functions
│   ├── contact-form/
│   │   ├── index.js
│   │   ├── package.json
│   │   └── utils/
│   │       ├── validate.js
│   │       └── recaptcha.js
│   ├── instagram-proxy/
│   │   ├── index.js
│   │   ├── package.json
│   │   └── utils/
│   │       └── transform.js
│   └── shared/
│       └── logger.js
│
├── infrastructure/                   # AWS infrastructure configs (optional)
│   ├── cloudfront-config.json
│   ├── s3-bucket-policy.json
│   └── api-gateway-config.json
│
├── tests/                            # Test files
│   ├── unit/
│   │   ├── components/
│   │   └── services/
│   └── integration/
│
├── docs/                             # Documentation
│   ├── prd.md
│   ├── architecture.md
│   └── deployment-guide.md
│
├── scripts/                          # Build and deployment scripts
│   ├── deploy-lambda.sh
│   └── invalidate-cloudfront.sh
│
├── .env.example                      # Environment variable template
├── .env.local                        # Local development env vars (gitignored)
├── .gitignore
├── package.json                      # Root package.json
├── tsconfig.json                     # TypeScript configuration
├── vite.config.ts                    # Vite build configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── components.json                   # shadcn/ui configuration
├── eslint.config.js                  # ESLint configuration
├── .prettierrc                       # Prettier configuration
└── README.md
```

**Key Organization Principles:**
- **/src for frontend:** All React code isolated in src directory
- **/lambda for backend:** Serverless functions separate from frontend
- **/public for static assets:** Images, favicons, fonts served directly
- **/.github/workflows for CI/CD:** GitHub Actions deployment automation
- **/infrastructure for IaC:** Optional AWS configuration files for reference
- **/tests for all testing:** Unit and integration tests organized by type
