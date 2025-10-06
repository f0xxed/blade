# Testing Strategy

## Testing Pyramid

```
        E2E Tests (Future)
       /                \
      Integration Tests
     /                    \
   Frontend Unit        Backend Unit
```

## Test Organization

**Frontend Tests:**
```
/tests/unit/components/
├── HeroSection.test.tsx
├── ContactForm.test.tsx
└── InstagramFeed.test.tsx

/tests/integration/
├── contact-form-flow.test.tsx
└── instagram-feed.test.tsx
```

**Backend Tests:**
```
/lambda/contact-form/tests/
├── handler.test.js
└── validate.test.js

/lambda/instagram-proxy/tests/
└── handler.test.js
```

**Test Examples:**

```typescript
// Frontend Component Test
import { render, screen, fireEvent } from '@testing-library/react';
import { HeroSection } from '@/components/HeroSection';

test('calls onBookingClick when CTA button is clicked', () => {
  const mockOnClick = vi.fn();
  render(<HeroSection tagline="Test" ctaText="Book" onBookingClick={mockOnClick} />);

  fireEvent.click(screen.getByText('Book'));
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
```

```javascript
// Backend API Test
const { handler } = require('../index');

test('returns 403 when reCAPTCHA score is low', async () => {
  const event = {
    body: JSON.stringify({
      name: 'Test',
      email: 'test@example.com',
      message: 'Test message',
      recaptchaToken: 'invalid-token'
    })
  };

  const response = await handler(event);
  expect(response.statusCode).toBe(403);
});
```
