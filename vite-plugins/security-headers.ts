import type { Plugin } from 'vite';

/**
 * Vite plugin to add security headers for development and preview servers
 * These headers help achieve Mozilla Observatory A+ rating
 */
export function securityHeadersPlugin(): Plugin {
  return {
    name: 'security-headers',
    configureServer(server) {
      server.middlewares.use((_req, res, next) => {
        // Prevent MIME type sniffing
        res.setHeader('X-Content-Type-Options', 'nosniff');

        // Prevent clickjacking attacks
        res.setHeader('X-Frame-Options', 'DENY');

        // Control referrer information
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

        // Restrict browser features and APIs
        res.setHeader(
          'Permissions-Policy',
          'camera=(), microphone=(), geolocation=(), interest-cohort=()'
        );

        // Content Security Policy (strict but allows inline scripts for Vite HMR in dev)
        res.setHeader(
          'Content-Security-Policy',
          "default-src 'self'; " +
          "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " + // unsafe-eval needed for Vite HMR
          "style-src 'self' 'unsafe-inline'; " +
          "img-src 'self' data: https:; " +
          "font-src 'self' data:; " +
          "connect-src 'self' ws: wss:; " + // ws/wss for Vite HMR
          "frame-ancestors 'none'; " +
          "base-uri 'self'; " +
          "form-action 'self'"
        );

        // Cross-Origin policies
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');

        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((_req, res, next) => {
        // Stricter headers for preview (production-like)
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        res.setHeader(
          'Permissions-Policy',
          'camera=(), microphone=(), geolocation=(), interest-cohort=()'
        );

        // Strict CSP for preview (A+ rating - no unsafe-inline needed)
        res.setHeader(
          'Content-Security-Policy',
          "default-src 'none'; " +
          "script-src 'self'; " +
          "style-src 'self'; " +
          "img-src 'self' data: https:; " +
          "font-src 'self' data:; " +
          "connect-src 'self' https:; " +
          "frame-ancestors 'none'; " +
          "base-uri 'self'; " +
          "form-action 'self'; " +
          "object-src 'none'; " +
          "upgrade-insecure-requests"
        );

        // HTTP Strict Transport Security (only for HTTPS in production)
        // Commented out for local preview, uncomment if preview is served over HTTPS
        // res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');

        next();
      });
    }
  };
}
