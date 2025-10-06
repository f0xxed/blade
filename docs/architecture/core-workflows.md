# Core Workflows

These sequence diagrams illustrate critical user journeys showing component interactions across frontend, backend, and external services.

## Contact Form Submission Flow

```mermaid
sequenceDiagram
    actor User
    participant CF as ContactForm<br/>(React Component)
    participant RC as reCAPTCHA v3<br/>(Client SDK)
    participant API as API Gateway<br/>/api/contact
    participant Lambda as ContactFormLambda
    participant RCV as reCAPTCHA<br/>Verify API
    participant SES as AWS SES
    participant Email as Business Email

    User->>CF: Fills form (name, email, message)
    User->>CF: Clicks "Send Message"
    CF->>CF: Validate form (React Hook Form + Zod)

    alt Validation fails
        CF-->>User: Show inline errors
    else Validation passes
        CF->>RC: Execute reCAPTCHA (invisible)
        RC-->>CF: Return token

        CF->>API: POST /contact (form data + token)
        API->>Lambda: Invoke with payload

        Lambda->>Lambda: Sanitize input
        Lambda->>RCV: POST /siteverify (token)
        RCV-->>Lambda: {success, score}

        alt Score < 0.5 (likely bot)
            Lambda-->>API: 403 Forbidden
            API-->>CF: Error response
            CF-->>User: "Verification failed, try again"
        else Score >= 0.5 (human)
            Lambda->>SES: SendEmail (formatted inquiry)
            SES-->>Email: Deliver email
            SES-->>Lambda: Success response
            Lambda-->>API: 200 OK
            API-->>CF: Success response
            CF->>CF: Reset form
            CF-->>User: "Thank you! We'll respond within 24 hours"
        end
    end
```

## Instagram Feed Loading Flow

```mermaid
sequenceDiagram
    actor User
    participant IF as InstagramFeed<br/>(React Component)
    participant CF as CloudFront CDN
    participant API as API Gateway<br/>/instagram/feed
    participant Lambda as InstagramProxyLambda
    participant IG as Instagram<br/>Graph API

    User->>IF: Page loads / scrolls to feed section
    IF->>CF: GET /api/instagram/feed?limit=9

    alt Cache HIT (< 1 hour old)
        CF-->>IF: Cached response (posts array)
    else Cache MISS or expired
        CF->>API: Forward request
        API->>Lambda: Invoke with limit=9

        Lambda->>Lambda: Load access token from env var
        Lambda->>IG: GET /{user-id}/media?fields=...&limit=9

        alt Instagram API error
            IG-->>Lambda: 500 or rate limit error
            Lambda->>Lambda: Log error to CloudWatch
            Lambda-->>API: Error response
            API-->>CF: Error response
            CF-->>IF: Error response
            IF-->>User: Show fallback message
        else Instagram API success
            IG-->>Lambda: {data: [posts]}
            Lambda->>Lambda: Transform to InstagramPost[]
            Lambda-->>API: {posts, cachedAt}
            API-->>CF: Response
            CF->>CF: Cache for 1 hour
            CF-->>IF: Response with posts
        end
    end

    IF->>IF: Render grid with lazy-loaded images
    IF-->>User: Display Instagram feed

    User->>IF: Clicks post
    IF->>IF: Track analytics event
    IF->>IG: Redirect to post permalink
```

## Booking Appointment Flow

```mermaid
sequenceDiagram
    actor User
    participant Hero as HeroSection
    participant BW as BookingWidget<br/>Wrapper
    participant GA as Google Analytics
    participant BP as Booking Platform<br/>(Square/Booksy/etc)

    User->>Hero: Clicks "Book Appointment" CTA
    Hero->>GA: gtag('event', 'booking_initiated')
    Hero->>BW: Trigger booking widget

    alt Widget Embed (iframe/modal)
        BW->>BP: Load embedded booking interface
        BP-->>BW: Render calendar/services
        BW-->>User: Show booking widget

        User->>BP: Selects service, barber, date/time
        User->>BP: Enters contact info
        User->>BP: Confirms booking

        BP->>BP: Create appointment
        BP->>User: Email confirmation
        BP-->>BW: Booking success (if callback available)
        BW->>GA: gtag('event', 'booking_completed')
        BW-->>User: Show success message / redirect

    else API Redirect
        BW->>BP: Redirect to booking platform URL
        Note over User,BP: User completes booking<br/>on external platform
        BP->>User: Email confirmation
    end
```

## Page Load & Analytics Tracking Flow

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant CF as CloudFront CDN
    participant S3 as S3 Bucket
    participant GA as Google Analytics
    participant App as React App

    User->>Browser: Navigate to bladeandbarrel.com
    Browser->>CF: GET /index.html

    alt Cache HIT
        CF-->>Browser: index.html (cached)
    else Cache MISS
        CF->>S3: GET /index.html
        S3-->>CF: index.html
        CF->>CF: Cache with no-cache (always revalidate)
        CF-->>Browser: index.html
    end

    Browser->>Browser: Parse HTML
    Browser->>CF: GET /assets/main.[hash].js
    Browser->>CF: GET /assets/main.[hash].css

    CF-->>Browser: JS bundle (cached 1 year)
    CF-->>Browser: CSS bundle (cached 1 year)

    Browser->>App: Initialize React app
    App->>GA: Load gtag.js script
    GA-->>App: Initialize tracking
    App->>GA: gtag('event', 'page_view')

    App->>App: Render HeroSection (first paint)
    App-->>User: Display hero content (FCP)

    App->>App: Lazy load below-fold components
    App->>App: Initialize scroll animations
    App-->>User: Fully interactive (TTI)

    User->>App: Scrolls to Services section
    App->>GA: gtag('event', 'scroll_to_section', {section: 'services'})
```
