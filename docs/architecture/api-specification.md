# API Specification

The API follows REST principles with two serverless endpoints: contact form submission and Instagram feed proxy. Both endpoints are deployed via AWS API Gateway + Lambda.

## REST API Specification

```yaml
openapi: 3.0.0
info:
  title: Blade and Barrel API
  version: 1.0.0
  description: Serverless REST API for Blade and Barrel website - contact form submission and Instagram feed proxy

servers:
  - url: https://api.bladeandbarrel.com
    description: Production API Gateway endpoint
  - url: https://dev-api.bladeandbarrel.com
    description: Development/staging environment

paths:
  /contact:
    post:
      summary: Submit contact form inquiry
      description: Processes contact form submissions, validates reCAPTCHA, and sends email via AWS SES
      operationId: submitContactForm
      tags:
        - Contact
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ContactFormRequest'
            example:
              name: "John Doe"
              email: "john@example.com"
              phone: "+1-555-123-4567"
              message: "I'm interested in booking a private event for 20 people. Can you provide details?"
              recaptchaToken: "03AGdBq27..."
      responses:
        '200':
          description: Contact form successfully submitted
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ContactFormResponse'
              example:
                success: true
                message: "Thank you! We'll get back to you within 24 hours."
        '400':
          description: Invalid request (validation errors)
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                success: false
                error: "Invalid email format"
        '403':
          description: reCAPTCHA verification failed (likely bot)
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                success: false
                error: "reCAPTCHA verification failed. Please try again."
        '500':
          description: Internal server error (SES failure, Lambda error)
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                success: false
                error: "Failed to send email. Please try again later."
      security:
        - corsOrigin: []

  /instagram/feed:
    get:
      summary: Fetch Instagram feed (server-side proxy)
      description: Proxies Instagram Graph API requests to secure access token, returns cached posts
      operationId: getInstagramFeed
      tags:
        - Instagram
      parameters:
        - name: limit
          in: query
          description: Number of posts to fetch (default 9, max 25)
          required: false
          schema:
            type: integer
            default: 9
            minimum: 1
            maximum: 25
      responses:
        '200':
          description: Instagram feed successfully fetched
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InstagramFeedProxyResponse'
              example:
                posts:
                  - id: "17895695668004550"
                    mediaType: "IMAGE"
                    mediaUrl: "https://scontent.cdninstagram.com/..."
                    permalink: "https://www.instagram.com/p/ABC123/"
                    caption: "Fresh cuts and cold brews at Blade and Barrel!"
                    timestamp: "2025-10-04T14:30:00Z"
                    likeCount: 145
                    commentsCount: 12
                cachedAt: "2025-10-05T10:00:00Z"
        '500':
          description: Instagram API error or cache failure
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                error: "Failed to fetch Instagram feed"
      security:
        - corsOrigin: []

components:
  schemas:
    ContactFormRequest:
      type: object
      required:
        - name
        - email
        - message
        - recaptchaToken
      properties:
        name:
          type: string
          minLength: 2
          maxLength: 100
          example: "John Doe"
        email:
          type: string
          format: email
          example: "john@example.com"
        phone:
          type: string
          pattern: '^\+?[0-9\s\-\(\)]+$'
          example: "+1-555-123-4567"
        message:
          type: string
          minLength: 10
          maxLength: 1000
          example: "I'm interested in booking a private event..."
        recaptchaToken:
          type: string
          description: reCAPTCHA v3 verification token
          example: "03AGdBq27..."

    ContactFormResponse:
      type: object
      properties:
        success:
          type: boolean
        message:
          type: string
        error:
          type: string

    InstagramPost:
      type: object
      properties:
        id:
          type: string
        mediaType:
          type: string
          enum: [IMAGE, VIDEO, CAROUSEL_ALBUM]
        mediaUrl:
          type: string
          format: uri
        permalink:
          type: string
          format: uri
        caption:
          type: string
        timestamp:
          type: string
          format: date-time
        likeCount:
          type: integer
        commentsCount:
          type: integer

    InstagramFeedProxyResponse:
      type: object
      properties:
        posts:
          type: array
          items:
            $ref: '#/components/schemas/InstagramPost'
        cachedAt:
          type: string
          format: date-time
        error:
          type: string

    ErrorResponse:
      type: object
      properties:
        success:
          type: boolean
          default: false
        error:
          type: string

  securitySchemes:
    corsOrigin:
      type: apiKey
      in: header
      name: Origin
      description: CORS restricted to bladeandbarrel.com domain
```

**Key API Design Decisions:**

**Authentication & Security:**
- No API keys required for public endpoints (CORS restricts to bladeandbarrel.com origin)
- reCAPTCHA v3 validates contact form submissions server-side
- Instagram access token never exposed to client (proxied through Lambda)

**Caching Strategy:**
- Instagram feed: Cached at CloudFront edge for 1 hour (respects 200 calls/hour rate limit)
- Contact form: No caching (each submission processed immediately)

**Error Handling:**
- 4xx errors: Client validation failures (bad email, reCAPTCHA fail)
- 5xx errors: Server-side issues (SES failure, Lambda timeout, Instagram API down)
- Consistent error format: All errors return `{success: false, error: "message"}`

**Rate Limiting:**
- API Gateway: 1000 requests/second burst, 5000 requests/hour steady state (AWS default)
- Contact form: Consider adding custom rate limit (10 submissions/hour per IP) to prevent abuse
