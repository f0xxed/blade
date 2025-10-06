# Coding Standards

## Critical Fullstack Rules

- **Type Sharing:** Always define types in `/src/types` and import consistently across components
- **API Calls:** Never make direct HTTP calls - always use service layer functions (`contactService`, `instagramService`)
- **Environment Variables:** Access only through config objects, never `import.meta.env` directly in components
- **Error Handling:** All API routes must use try-catch with consistent error response format
- **State Updates:** Never mutate state directly - use proper React hooks and Context patterns

## Naming Conventions

| Element | Frontend | Backend | Example |
|---------|----------|---------|---------|
| Components | PascalCase | - | `UserProfile.tsx` |
| Hooks | camelCase with 'use' | - | `useAnalytics.ts` |
| API Routes | - | kebab-case | `/api/contact` |
| Lambda Functions | - | kebab-case | `blade-contact-form` |
| Environment Variables | SCREAMING_SNAKE_CASE | SCREAMING_SNAKE_CASE | `VITE_API_BASE_URL` |
