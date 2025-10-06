# Introduction

This document outlines the complete fullstack architecture for Blade and Barrel, including backend systems, frontend implementation, and their integration. It serves as the single source of truth for AI-driven development, ensuring consistency across the entire technology stack.

This unified approach combines what would traditionally be separate backend and frontend architecture documents, streamlining the development process for modern fullstack applications where these concerns are increasingly intertwined.

## Starter Template or Existing Project

**Decision:** N/A - Greenfield Custom Build

This is a greenfield project with a carefully selected technology stack optimized for the specific requirements of a high-performance, one-page website with AWS infrastructure.

**Technology Foundation:**
- React 18+ with Vite build tool for fast development and optimized production builds
- shadcn/ui component library with Tailwind CSS for rapid UI development
- Manual AWS infrastructure configuration (S3, CloudFront, Lambda, SES, Route 53)
- Static JAMstack architecture with serverless functions for dynamic features
- Single repository monorepo structure

**Rationale:**
- **Manual AWS setup vs. Amplify:** Team has existing AWS and GitHub CI/CD expertise, enabling full infrastructure control and cost optimization without framework abstraction overhead
- **Custom build vs. starter template:** One-page site scope with aggressive performance requirements (2s load, Lighthouse 85+) benefits from purpose-built optimization
- **JAMstack approach:** Eliminates backend server complexity, reduces operational costs, enables global CDN edge delivery

**Pre-Configured Architectural Decisions:**
- Static site hosting with client-side React interactivity
- Third-party service integrations (booking platform, Instagram Graph API, Google Maps)
- Serverless contact form backend (AWS Lambda + SES)
- No custom database required for MVP

**Flexibility Retained:**
- Booking platform selection (Square Appointments, Booksy, or Schedulicity - evaluated in Epic 3)
- State management approach (React Context for MVP, upgradeable to Zustand if multi-location complexity increases)
- Instagram Graph API integration (business best practice for Instagram Business accounts)

## Glossary of Key Terms

**JAMstack (JavaScript + APIs + Markup):**
An architecture pattern (not a specific technology) that describes building websites with:
- **Markup:** Pre-built static HTML/CSS/JS files (your React build output stored in S3)
- **JavaScript:** Client-side interactivity (React components, animations)
- **APIs:** Dynamic functionality via external APIs and serverless functions (Lambda, Instagram, Booking platform)

*In simple terms:* JAMstack is just a buzzword for the S3 + CloudFront + Lambda approach you're using. It means "static files served fast via CDN, with backend logic handled by APIs."

**Static Site:**
A website where HTML/CSS/JS files are pre-built during deployment (not generated on-demand by a server). Your React app builds to static files that S3 stores.

**CDN (Content Delivery Network):**
A global network of servers (CloudFront) that cache and serve your website files from locations near users. Makes sites load faster worldwide vs. serving from a single S3 bucket region.

**Serverless Functions:**
Code (Lambda) that runs on-demand without managing servers. You only pay when the function executes (e.g., when someone submits the contact form). No idle server costs.

**SPA (Single Page Application):**
A website where navigation happens without full page reloads (React handles routing client-side). Requires special CDN configuration to route all URLs to `index.html`.

**Edge Caching:**
Storing website files at CloudFront edge locations (servers near users) so they load instantly without fetching from origin S3 bucket.

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-10-05 | v1.0 | Initial fullstack architecture creation | Winston (Architect) |
