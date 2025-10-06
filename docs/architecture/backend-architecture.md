# Backend Architecture

## Service Architecture

### Function Organization

```
/lambda
├── /contact-form
│   ├── index.js           # Handler function
│   ├── package.json       # Dependencies (@aws-sdk/client-ses, etc.)
│   └── utils/
│       ├── validate.js    # Input sanitization
│       └── recaptcha.js   # reCAPTCHA verification
├── /instagram-proxy
│   ├── index.js           # Handler function
│   ├── package.json       # Dependencies (node-fetch)
│   └── utils/
│       └── transform.js   # Transform Instagram API response
└── /shared                # Shared utilities (if needed)
    └── logger.js
```

### Function Template

```javascript
// /lambda/contact-form/index.js
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const { validateInput } = require('./utils/validate');
const { verifyRecaptcha } = require('./utils/recaptcha');

const sesClient = new SESClient({ region: 'us-east-1' });

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    // Validate and sanitize input
    const validatedData = validateInput(body);

    // Verify reCAPTCHA
    const recaptchaValid = await verifyRecaptcha(
      body.recaptchaToken,
      event.requestContext.identity.sourceIp
    );

    if (!recaptchaValid) {
      return {
        statusCode: 403,
        body: JSON.stringify({
          success: false,
          error: 'reCAPTCHA verification failed'
        })
      };
    }

    // Send email via SES
    const emailParams = {
      Source: process.env.FROM_EMAIL,
      Destination: { ToAddresses: [process.env.TO_EMAIL] },
      Message: {
        Subject: { Data: 'Blade and Barrel Website Inquiry' },
        Body: {
          Text: {
            Data: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nPhone: ${validatedData.phone || 'N/A'}\n\nMessage:\n${validatedData.message}`
          }
        }
      },
      ReplyToAddresses: [validatedData.email]
    };

    await sesClient.send(new SendEmailCommand(emailParams));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: 'Thank you! We'll get back to you within 24 hours.'
      })
    };

  } catch (error) {
    console.error('Contact form error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: 'Failed to send message. Please try again.'
      })
    };
  }
};
```

## Database Architecture

**Not applicable** - No database required. See Database Schema section above for rationale and future considerations.
