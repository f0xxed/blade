# Monitoring and Observability

## Monitoring Stack

- **Frontend Monitoring:** Google Analytics 4 (user behavior, Core Web Vitals)
- **Backend Monitoring:** AWS CloudWatch (Lambda logs, API Gateway metrics)
- **Error Tracking:** CloudWatch Logs (MVP), upgrade to Sentry for client-side errors if needed
- **Performance Monitoring:** Lighthouse CI for frontend, CloudWatch metrics for Lambda

## Key Metrics

**Frontend Metrics:**
- Core Web Vitals (FCP <1.5s, LCP <2.5s, CLS <0.1)
- JavaScript errors (tracked via CloudWatch or Sentry)
- API response times (measured client-side)
- User interactions (booking initiated, form submitted)

**Backend Metrics:**
- Request rate (API Gateway CloudWatch metrics)
- Error rate (Lambda error count, 4xx/5xx responses)
- Response time (Lambda duration, p50/p95/p99)
- Instagram API rate limit usage (custom CloudWatch metric)

**Alerting Strategy:**
- CloudWatch alarm for Lambda error rate >5% in 5-minute window
- CloudWatch alarm for API Gateway 5xx errors >10 in 5-minute window
- Instagram API rate limit warning at 80% of hourly quota (160/200 calls)

---
