# Data Models

Since this is a static site with no database, the data models represent **TypeScript interfaces** that define the shape of data from third-party APIs, forms, and application state. All interfaces will be stored in `/src/types/` for consistent type safety across the application.

## ContactFormSubmission

**Purpose:** Represents user-submitted contact form data for inquiries about events, partnerships, or general questions.

**Key Attributes:**
- `name`: string - Full name of the person submitting the inquiry
- `email`: string - Email address for response (validated format)
- `phone`: string (optional) - Contact phone number
- `message`: string - Inquiry details or question content
- `timestamp`: Date - Submission timestamp (auto-generated)
- `recaptchaToken`: string - reCAPTCHA v3 verification token

### TypeScript Interface

```typescript
interface ContactFormSubmission {
  name: string;
  email: string;
  phone?: string;
  message: string;
  timestamp: Date;
  recaptchaToken: string;
}

// API request payload (what frontend sends to Lambda)
interface ContactFormRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
  recaptchaToken: string;
}

// API response (what Lambda returns)
interface ContactFormResponse {
  success: boolean;
  message: string;
  error?: string;
}
```

### Relationships
- No relationships - standalone form submission sent to Lambda, delivered via SES

---

## InstagramPost

**Purpose:** Represents a single Instagram post fetched from the Instagram Graph API for display in the social feed section.

**Key Attributes:**
- `id`: string - Unique Instagram media ID
- `mediaType`: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' - Type of post
- `mediaUrl`: string - URL to the image or video file
- `permalink`: string - Link to the post on Instagram
- `caption`: string (optional) - Post caption text
- `timestamp`: string - ISO 8601 timestamp of post creation
- `likeCount`: number (optional) - Number of likes (if available via permissions)
- `commentsCount`: number (optional) - Number of comments (if available)

**Security & Engagement Decision:**
- Display engagement metrics (likes, comments) **only if available** via Instagram Graph API permissions
- **Primary focus:** High-quality imagery for visual engagement, not vanity metrics
- **Security:** Fetch via server-side Lambda proxy to keep Instagram access token secure (never expose in client bundle)
- **User engagement:** Click-through to Instagram permalink for full post interaction

### TypeScript Interface

```typescript
interface InstagramPost {
  id: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  mediaUrl: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  likeCount?: number;    // Optional - only if Graph API permissions allow
  commentsCount?: number; // Optional - only if Graph API permissions allow
}

// API response from Instagram Graph API
interface InstagramFeedResponse {
  data: InstagramPost[];
  paging?: {
    cursors?: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

// Lambda proxy response (cached, secured)
interface InstagramFeedProxyResponse {
  posts: InstagramPost[];
  cachedAt: string;
  error?: string;
}
```

### Relationships
- Multiple posts displayed in grid layout
- Fetched from Instagram Graph API via server-side Lambda proxy (secures access token)
- Cached for 1 hour at CloudFront edge to respect API rate limits

---

## ServiceOffering

**Purpose:** Represents a barbershop service displayed in the Services section (static content, not from API).

**Key Attributes:**
- `id`: string - Unique identifier (slug format: 'haircut', 'beard-trim')
- `name`: string - Service display name
- `description`: string - Brief service description
- `price`: number - Service price in USD
- `duration`: number - Estimated duration in minutes (optional)

### TypeScript Interface

```typescript
interface ServiceOffering {
  id: string;
  name: string;
  description: string;
  price: number;
  duration?: number;
}

// Example static data
const SERVICES: ServiceOffering[] = [
  {
    id: 'haircut',
    name: 'Haircut',
    description: 'Precision cut with complimentary draft beer',
    price: 35,
    duration: 45
  },
  {
    id: 'beard-trim',
    name: 'Beard Trim',
    description: 'Expert beard sculpting and grooming',
    price: 25,
    duration: 30
  },
  {
    id: 'hot-towel-shave',
    name: 'Hot Towel Shave',
    description: 'Traditional straight razor shave experience',
    price: 45,
    duration: 60
  }
];
```

### Relationships
- Static array rendered in Services section
- Future: Could be fetched from booking platform API for dynamic pricing

---

## BookingAppointment

**Purpose:** Type-safe representation of appointment data from the selected booking platform (structure depends on Square/Booksy/Schedulicity selection in Story 3.1).

**Key Attributes:**
- `appointmentId`: string - Unique booking ID from platform
- `serviceId`: string - Selected service
- `barberId`: string (optional) - Selected barber (if customer chooses)
- `dateTime`: string - ISO 8601 appointment date/time
- `customerName`: string - Customer full name
- `customerEmail`: string - Customer email
- `customerPhone`: string - Customer phone number
- `status`: 'pending' | 'confirmed' | 'completed' | 'cancelled' - Booking status

**Note:** This data is managed externally by the booking platform. This interface provides TypeScript completeness for any client-side booking flow interactions.

### TypeScript Interface

```typescript
interface BookingAppointment {
  appointmentId: string;
  serviceId: string;
  barberId?: string;
  dateTime: string; // ISO 8601 format
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

// Booking widget configuration (platform-specific)
interface BookingWidgetConfig {
  apiKey: string;
  businessId: string;
  mode: 'embed' | 'redirect';
  preselectedService?: string;
}

// Example for Square Appointments (if selected)
interface SquareBookingConfig extends BookingWidgetConfig {
  locationId: string;
  embedUrl: string;
}
```

### Relationships
- Created and managed by booking platform (external system)
- May be referenced if booking platform provides webhook notifications
- Used for TypeScript type safety when interacting with booking widget

---

## AnalyticsEvent

**Purpose:** Type-safe custom event tracking for Google Analytics 4 to measure user engagement and conversion funnels.

**Key Attributes:**
- `eventName`: string - GA4 event name (e.g., 'booking_initiated', 'contact_form_submitted')
- `eventCategory`: string - Event grouping (e.g., 'engagement', 'conversion')
- `eventLabel`: string (optional) - Additional context
- `eventValue`: number (optional) - Numeric value for conversions
- `customParams`: Record<string, any> (optional) - Additional event parameters

### TypeScript Interface

```typescript
interface AnalyticsEvent {
  eventName: string;
  eventCategory: 'page_view' | 'engagement' | 'conversion' | 'error';
  eventLabel?: string;
  eventValue?: number;
  customParams?: Record<string, any>;
}

// Predefined analytics events for consistency
const ANALYTICS_EVENTS = {
  BOOKING_INITIATED: {
    eventName: 'booking_initiated',
    eventCategory: 'conversion' as const,
    eventLabel: 'Click book appointment CTA'
  },
  CONTACT_FORM_SUBMITTED: {
    eventName: 'contact_form_submitted',
    eventCategory: 'conversion' as const,
    eventLabel: 'Contact form submission'
  },
  INSTAGRAM_POST_CLICKED: {
    eventName: 'instagram_post_clicked',
    eventCategory: 'engagement' as const,
    eventLabel: 'Instagram feed interaction'
  },
  SCROLL_TO_SERVICES: {
    eventName: 'scroll_to_section',
    eventCategory: 'engagement' as const,
    eventLabel: 'Services section viewed'
  }
} as const;

// Helper function for sending events to GA4
declare function trackAnalyticsEvent(event: AnalyticsEvent): void;
```

### Relationships
- Triggered by user interactions throughout the application
- Sent to Google Analytics 4 via gtag.js
- Used for conversion tracking and user behavior analysis
