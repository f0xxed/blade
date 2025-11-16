# Booksy Integration Technical Guide

**For:** Story 3.2 - Integrate Booking System
**Framework:** React 18.2+ with TypeScript 5.3+
**Build Tool:** Vite 5.0+

---

## Overview

Booksy provides a simple **iframe embed** as their primary integration method for websites. This means:
- ✅ No API complexity
- ✅ No authentication required (public-facing)
- ✅ Responsive out-of-the-box
- ✅ Minimal code (10-15 lines of TypeScript)
- ✅ Easy to maintain

---

## Basic Integration (Simplest Approach)

### Step 1: Raw HTML Embed Code

After setting up your Booksy account, you'll receive an iframe embed code that looks like:

```html
<iframe
  src="https://booksy.com/en-us/12345678"
  width="100%"
  height="800"
  frameborder="0"
  scrolling="yes"
  style="border: none;">
</iframe>
```

**Where:**
- `12345678` = Your Booksy Business ID (from account setup)
- `width="100%"` = Full width of container
- `height="800"` = Minimum height (scrolls internally if needed)

### Step 2: Create React Component

**File:** `src/components/BookingWidgetWrapper.tsx`

```typescript
import React, { useEffect } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface BookingWidgetWrapperProps {
  /**
   * Booksy Business ID from account setup
   * Get from environment: VITE_BOOKSY_BUSINESS_ID
   */
  businessId: string;

  /**
   * Track booking_initiated event
   */
  trackingEnabled?: boolean;

  /**
   * Optional callback when widget loads
   */
  onWidgetLoad?: () => void;

  /**
   * Custom CSS class for styling
   */
  className?: string;

  /**
   * Container height in pixels or CSS value
   */
  height?: string;
}

/**
 * Booksy Appointment Booking Widget
 *
 * Renders a responsive iframe containing the Booksy booking interface.
 * Handles lazy loading, error states, and analytics tracking.
 *
 * Usage:
 * <BookingWidgetWrapper
 *   businessId="12345678"
 *   trackingEnabled={true}
 *   height="800px"
 * />
 */
export const BookingWidgetWrapper: React.FC<BookingWidgetWrapperProps> = ({
  businessId,
  trackingEnabled = true,
  onWidgetLoad,
  className = '',
  height = '800px',
}) => {
  const { trackEvent } = useAnalytics();

  // Track when widget loads
  useEffect(() => {
    if (trackingEnabled) {
      trackEvent('booking_widget_loaded', {
        businessId,
        timestamp: new Date().toISOString(),
      });
    }

    onWidgetLoad?.();
  }, [businessId, trackingEnabled, trackEvent, onWidgetLoad]);

  const bookingUrl = `https://booksy.com/en-us/${businessId}`;

  return (
    <div className={`booking-widget-container ${className}`}>
      {/* Loading skeleton or fallback */}
      <noscript>
        <p className="text-center text-gray-600">
          Please{' '}
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            click here to book an appointment
          </a>
        </p>
      </noscript>

      {/* Booksy iframe embed */}
      <iframe
        src={bookingUrl}
        title="Blade and Barrel Appointment Booking"
        className="w-full border-0"
        style={{
          height,
          display: 'block',
        }}
        frameBorder="0"
        scrolling="yes"
        allowFullScreen
        allow="payment"
      />
    </div>
  );
};

export default BookingWidgetWrapper;
```

### Step 3: Use Component in Hero Section

**File:** `src/components/Hero.tsx` (update existing)

```typescript
import { BookingWidgetWrapper } from './BookingWidgetWrapper';

export const Hero: React.FC = () => {
  const bookingUrl = import.meta.env.VITE_BOOKSY_BOOKING_URL;

  return (
    <section className="relative h-screen bg-gray-900 flex items-center justify-center">
      {/* Existing hero content */}
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Blade and Barrel</h1>
        <p className="text-xl mb-8">The Bar-bershop</p>

        {/* Booking CTA Button - Opens in modal or scrolls to widget */}
        <button
          onClick={() => {
            // Scroll to booking widget section
            document.getElementById('booking-section')?.scrollIntoView({
              behavior: 'smooth'
            });

            // Track booking initiation
            gtag('event', 'booking_initiated', {
              source: 'hero_button',
              device: window.innerWidth < 768 ? 'mobile' : 'desktop',
            });
          }}
          className="px-8 py-3 bg-brass-gold hover:bg-brass-dark text-white font-bold rounded-lg"
        >
          Book Appointment
        </button>
      </div>
    </section>
  );
};
```

---

## Advanced Integration (Recommended)

### Step 1: Create Custom Booking Component with Lazy Loading

**File:** `src/components/BookingWidgetWrapper.tsx` (enhanced version)

```typescript
import React, { useEffect, useRef, useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface BookingWidgetWrapperProps {
  businessId: string;
  trackingEnabled?: boolean;
  onWidgetLoad?: () => void;
  className?: string;
  height?: string;
  lazyLoad?: boolean; // NEW: Lazy load on scroll
}

/**
 * Booksy Widget with Lazy Loading & Error Handling
 *
 * Features:
 * - Lazy loads iframe when section comes into view (Intersection Observer)
 * - Shows skeleton loading state
 * - Falls back to direct link if iframe fails
 * - Tracks analytics events
 * - Fully responsive
 */
export const BookingWidgetWrapper: React.FC<BookingWidgetWrapperProps> = ({
  businessId,
  trackingEnabled = true,
  onWidgetLoad,
  className = '',
  height = '800px',
  lazyLoad = true,
}) => {
  const { trackEvent } = useAnalytics();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!lazyLoad); // Start as visible if not lazy loading
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Lazy load with Intersection Observer
  useEffect(() => {
    if (!lazyLoad || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before visible
      }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [lazyLoad]);

  // Track when widget actually loads
  const handleIframeLoad = () => {
    setIsLoading(false);

    if (trackingEnabled) {
      trackEvent('booking_widget_loaded', {
        businessId,
        timestamp: new Date().toISOString(),
        method: 'iframe',
      });
    }

    onWidgetLoad?.();
  };

  const handleIframeError = () => {
    setHasError(true);
    setIsLoading(false);

    trackEvent('booking_widget_error', {
      businessId,
      error: 'iframe_load_failed',
    });
  };

  const bookingUrl = `https://booksy.com/en-us/${businessId}`;

  return (
    <div
      ref={containerRef}
      id="booking-section"
      className={`booking-widget-container ${className}`}
      style={{
        minHeight: height,
      }}
    >
      {/* Fallback for JavaScript disabled */}
      <noscript>
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50">
          <p className="text-gray-700 mb-4">
            Please enable JavaScript to use the booking widget, or
          </p>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-brass-gold text-white font-bold rounded-lg hover:bg-brass-dark"
          >
            Book on Booksy
          </a>
        </div>
      </noscript>

      {/* Loading skeleton */}
      {isLoading && !hasError && (
        <div className="animate-pulse bg-gray-200" style={{ height }} />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="flex flex-col items-center justify-center p-8 bg-yellow-50 border border-yellow-200 rounded-lg" style={{ height }}>
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            Booking Widget Unavailable
          </h3>
          <p className="text-gray-600 mb-4">
            Click the button below to book your appointment directly
          </p>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-brass-gold text-white font-bold rounded-lg hover:bg-brass-dark"
          >
            Book on Booksy
          </a>
          <p className="text-sm text-gray-500 mt-4">
            Or call us: (XXX) XXX-XXXX
          </p>
        </div>
      )}

      {/* Actual iframe (only render if visible or not lazy loading) */}
      {isVisible && !hasError && (
        <iframe
          src={bookingUrl}
          title="Blade and Barrel Appointment Booking"
          className="w-full border-0"
          style={{
            height,
            display: 'block',
            opacity: isLoading ? 0.5 : 1,
            transition: 'opacity 0.3s ease-in-out',
          }}
          frameBorder="0"
          scrolling="yes"
          allowFullScreen
          allow="payment"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      )}
    </div>
  );
};

export default BookingWidgetWrapper;
```

### Step 2: Create Booking Service Layer

**File:** `src/services/bookingService.ts` (for future API integration)

```typescript
/**
 * Booking Service
 *
 * Handles booking-related operations:
 * - Get booking widget configuration
 * - Track booking events
 * - Handle fallback contact info
 */

export interface BookingConfig {
  businessId: string;
  bookingUrl: string;
  phoneNumber: string;
  fallbackEmail: string;
}

class BookingService {
  private config: BookingConfig;

  constructor() {
    this.config = {
      businessId: import.meta.env.VITE_BOOKSY_BUSINESS_ID || '',
      bookingUrl: import.meta.env.VITE_BOOKSY_BOOKING_URL || '',
      phoneNumber: import.meta.env.VITE_BUSINESS_PHONE || '(813) XXX-XXXX',
      fallbackEmail: import.meta.env.VITE_BUSINESS_EMAIL || 'contact@bladeandbarrel.com',
    };
  }

  getConfig(): BookingConfig {
    return this.config;
  }

  /**
   * Open booking widget (could trigger modal or scroll)
   */
  openBookingWidget(source: string = 'unknown'): void {
    const element = document.getElementById('booking-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });

      // Track booking initiation
      if (window.gtag) {
        gtag('event', 'booking_initiated', {
          source,
          device: window.innerWidth < 768 ? 'mobile' : 'desktop',
          timestamp: new Date().toISOString(),
        });
      }
    }
  }

  /**
   * Get fallback contact info (if booking widget fails)
   */
  getFallbackInfo() {
    return {
      phone: this.config.phoneNumber,
      email: this.config.fallbackEmail,
      bookingUrl: this.config.bookingUrl,
    };
  }
}

export const bookingService = new BookingService();
```

### Step 3: Add Analytics Tracking Hook

**File:** `src/hooks/useAnalytics.ts` (update existing)

```typescript
import { useCallback } from 'react';

interface AnalyticsEvent {
  [key: string]: string | number | boolean | undefined;
}

export const useAnalytics = () => {
  const trackEvent = useCallback((eventName: string, eventData: AnalyticsEvent = {}) => {
    // Google Analytics 4 tracking
    if (window.gtag) {
      gtag('event', eventName, eventData);
    }

    // Debug logging in development
    if (import.meta.env.MODE === 'development') {
      console.log(`📊 Analytics Event: ${eventName}`, eventData);
    }
  }, []);

  return { trackEvent };
};
```

### Step 4: Usage in Page Component

**File:** `src/pages/Home.tsx`

```typescript
import { BookingWidgetWrapper } from '@/components/BookingWidgetWrapper';
import { bookingService } from '@/services/bookingService';

export const Home: React.FC = () => {
  const bookingConfig = bookingService.getConfig();

  return (
    <div>
      {/* Hero section with CTA */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Blade and Barrel</h1>
          <button
            onClick={() => bookingService.openBookingWidget('hero')}
            className="px-8 py-3 bg-brass-gold hover:bg-brass-dark text-white font-bold rounded-lg"
          >
            Book Appointment
          </button>
        </div>
      </section>

      {/* Booking widget section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Book Your Appointment</h2>

          <BookingWidgetWrapper
            businessId={bookingConfig.businessId}
            trackingEnabled={true}
            lazyLoad={true}
            height="900px"
            className="shadow-lg rounded-lg overflow-hidden"
          />
        </div>
      </section>
    </div>
  );
};
```

---

## File Structure

After integration, your project structure will be:

```
src/
├── components/
│   ├── Hero.tsx                        # Hero with booking CTA
│   ├── BookingWidgetWrapper.tsx       # ✨ NEW - Booksy widget
│   ├── Services.tsx                    # Existing
│   └── ...
├── hooks/
│   ├── useAnalytics.ts                # Updated with booking events
│   └── ...
├── services/
│   ├── bookingService.ts              # ✨ NEW - Booking config
│   ├── contactService.ts              # Existing
│   └── ...
├── types/
│   └── booking.ts                     # ✨ NEW - TypeScript types (optional)
├── pages/
│   └── Home.tsx                       # Uses BookingWidgetWrapper
└── ...
```

---

## Environment Variables

**File:** `.env.local` (never commit this!)

```bash
# Booksy Configuration (Story 3.1 - Account Setup)
VITE_BOOKING_PLATFORM=booksy
VITE_BOOKSY_BUSINESS_ID=12345678              # From Booksy account
VITE_BOOKSY_BOOKING_URL=https://booksy.com/en-us/12345678

# Fallback contact info
VITE_BUSINESS_PHONE=(813) XXX-XXXX
VITE_BUSINESS_EMAIL=contact@bladeandbarrel.com

# Google Analytics
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

**File:** `.env.example` (commit this - already updated)

```bash
VITE_BOOKING_PLATFORM=booksy
VITE_BOOKSY_BUSINESS_ID=                 # Get from Booksy account setup
VITE_BOOKSY_BOOKING_URL=                 # https://booksy.com/en-us/[ID]
VITE_BUSINESS_PHONE=                     # Fallback phone if booking fails
VITE_BUSINESS_EMAIL=                     # Fallback email if booking fails
VITE_GA4_MEASUREMENT_ID=                 # From Google Analytics
```

---

## Analytics Events to Track

**Booking-related events to track in Google Analytics 4:**

| Event | Trigger | Data Sent |
|-------|---------|-----------|
| `booking_initiated` | User clicks "Book Appointment" button | `source: 'hero' \| 'services' \| 'header'`, `device: 'mobile' \| 'desktop'` |
| `booking_widget_loaded` | Booksy iframe finishes loading | `businessId`, `timestamp`, `method: 'iframe'` |
| `booking_widget_error` | Booksy iframe fails to load | `error: 'iframe_load_failed'`, shows fallback |
| `booking_fallback_used` | User clicks fallback "Book on Booksy" link | `reason: 'widget_unavailable'` |
| `booking_contact_clicked` | User clicks phone/email if widget fails | `contact_type: 'phone' \| 'email'` |

---

## Performance Considerations

### 1. Lazy Loading (Recommended)

```typescript
<BookingWidgetWrapper
  businessId="12345678"
  lazyLoad={true}  // Only load when scrolled to
  height="800px"
/>
```

**Benefits:**
- ✅ Doesn't slow down initial page load
- ✅ Booksy iframe loads only when user scrolls to section
- ✅ Improves Largest Contentful Paint (LCP)
- ✅ Better Core Web Vitals

### 2. Iframe Performance

```typescript
// In iframe element:
allow="payment"  // Allow payments inside iframe
sandbox=""       // Ensure no sandbox restrictions
```

### 3. Loading State

```typescript
// Shows skeleton while iframe loads
{isLoading && !hasError && (
  <div className="animate-pulse bg-gray-200" style={{ height }} />
)}
```

### 4. CSS Optimization

```css
/* Minimal CSS for widget */
.booking-widget-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

.booking-widget-container iframe {
  width: 100%;
  border: none;
  display: block;
}
```

---

## Responsive Design

Booksy iframe automatically handles responsiveness at these breakpoints:

| Breakpoint | Height | Notes |
|------------|--------|-------|
| Mobile (320px-767px) | 900px | Full-height vertical scroll |
| Tablet (768px-1023px) | 900px | Larger touch targets |
| Desktop (1024px+) | 1000px | More whitespace |

```typescript
// Dynamic height based on screen size
const getHeight = () => {
  if (typeof window === 'undefined') return '800px';
  if (window.innerWidth < 768) return '900px';
  if (window.innerWidth < 1024) return '900px';
  return '1000px';
};

<BookingWidgetWrapper height={getHeight()} />
```

---

## Error Handling & Fallbacks

### Scenario 1: Iframe Fails to Load

```typescript
{hasError && (
  <div className="flex flex-col items-center justify-center p-8">
    <h3>Booking Widget Unavailable</h3>
    <a href={bookingUrl} target="_blank">
      Book on Booksy
    </a>
    <p>Or call us: {fallbackPhone}</p>
  </div>
)}
```

### Scenario 2: JavaScript Disabled

```typescript
<noscript>
  <p>
    Please{' '}
    <a href={bookingUrl} target="_blank">
      click here to book an appointment
    </a>
  </p>
</noscript>
```

### Scenario 3: Network Timeout

```typescript
// Add timeout detection
setTimeout(() => {
  if (isLoading) {
    // Show fallback after 5 seconds
    setHasError(true);
  }
}, 5000);
```

---

## Testing Checklist (Story 3.2)

- [ ] Component renders on page load
- [ ] iframe loads Booksy widget (check Network tab in DevTools)
- [ ] Widget is responsive at 320px, 768px, 1024px, 1920px widths
- [ ] "Book Appointment" button scrolls to widget section
- [ ] Analytics event `booking_initiated` fires on button click
- [ ] Analytics event `booking_widget_loaded` fires when iframe loads
- [ ] Fallback link shows if iframe fails (simulate by breaking URL)
- [ ] Mobile testing: iPhone Safari + Android Chrome (real devices)
- [ ] Load time < 1s on 4G mobile connection
- [ ] No console errors or warnings

---

## Security Considerations

### Content Security Policy (CSP)

Update your CSP headers to allow Booksy iframe:

```
frame-src https://booksy.com;
```

### HTTPS Only

Booksy only works over HTTPS. Ensure your site uses HTTPS in production.

### Sandboxing

Booksy needs `allow="payment"` to process credit cards:

```typescript
<iframe
  src={bookingUrl}
  allow="payment"  // Required for payments
  sandbox=""       // No restrictions
/>
```

---

## Deployment Notes

### Production

```bash
# Build Vite
npm run build

# Environment variables needed in production
VITE_BOOKSY_BUSINESS_ID=your_business_id
VITE_GA4_MEASUREMENT_ID=your_ga_id
```

### Staging

Test with same config as production. Booksy URLs are public (no secrets exposed).

---

## Support & Troubleshooting

| Issue | Solution |
|-------|----------|
| Iframe not loading | Check VITE_BOOKSY_BUSINESS_ID is correct |
| Widget shows blank | Check browser console for CSP errors |
| Analytics not tracking | Verify Google Analytics 4 is initialized |
| Mobile looks broken | Check viewport meta tag in HTML head |
| Payment fails | Ensure `allow="payment"` on iframe |

---

**Next Steps:**
1. Complete Booksy account setup (Task 9 in Story 3.1)
2. Get `VITE_BOOKSY_BUSINESS_ID` from Booksy dashboard
3. Copy this guide to Story 3.2 implementation
4. Create components using provided code
5. Test on real devices (iPhone + Android)
6. Deploy to production
