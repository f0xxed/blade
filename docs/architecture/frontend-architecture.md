# Frontend Architecture

## Component Architecture

### Component Organization

```
/src
├── /components         # Page-level components
│   ├── HeroSection.tsx
│   ├── ServicesGrid.tsx
│   ├── AboutSection.tsx
│   ├── InstagramFeed.tsx
│   ├── ContactForm.tsx
│   ├── GoogleMapEmbed.tsx
│   └── BookingWidgetWrapper.tsx
├── /components/ui      # shadcn/ui base components
│   ├── button.tsx
│   ├── card.tsx
│   ├── form.tsx
│   ├── input.tsx
│   └── textarea.tsx
├── /lib                # Utilities and helpers
│   ├── utils.ts        # Class name utilities, etc.
│   └── analytics.ts    # GA4 tracking helpers
├── /services           # API client services
│   ├── api.ts          # Axios instance configuration
│   ├── contactService.ts
│   └── instagramService.ts
├── /types              # TypeScript interfaces
│   ├── index.ts        # Export all types
│   ├── contact.ts
│   ├── instagram.ts
│   └── analytics.ts
├── /hooks              # Custom React hooks
│   ├── useAnalytics.ts
│   └── useIntersectionObserver.ts
├── /constants          # Static data
│   └── services.ts     # SERVICES array
├── App.tsx             # Main app component
└── main.tsx            # React entry point
```

### Component Template

```typescript
// HeroSection.tsx - Typical component structure
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/hooks/useAnalytics';

interface HeroSectionProps {
  tagline: string;
  ctaText: string;
  onBookingClick: () => void;
}

export function HeroSection({ tagline, ctaText, onBookingClick }: HeroSectionProps) {
  const { trackEvent } = useAnalytics();

  const handleBookingClick = () => {
    trackEvent('booking_initiated', {
      eventCategory: 'conversion',
      eventLabel: 'Hero CTA clicked'
    });
    onBookingClick();
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-screen flex items-center justify-center"
    >
      <picture>
        <source srcSet="/hero.webp" type="image/webp" />
        <img src="/hero.jpg" alt="Blade and Barrel interior" className="absolute inset-0 w-full h-full object-cover" />
      </picture>

      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">{tagline}</h1>
        <Button size="lg" onClick={handleBookingClick}>
          {ctaText}
        </Button>
      </div>
    </motion.section>
  );
}
```

## State Management Architecture

### State Structure

```typescript
// /src/contexts/AppContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isBookingModalOpen: boolean;
  setBookingModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <AppContext.Provider value={{
      isMobileMenuOpen,
      setMobileMenuOpen,
      isBookingModalOpen,
      setBookingModalOpen
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
```

### State Management Patterns

- **React Context for global UI state:** Mobile menu open/close, booking modal visibility
- **Component local state for forms:** React Hook Form manages contact form state internally
- **API data in component state:** Instagram feed data fetched with `useEffect`, stored in `useState`
- **No Redux/Zustand needed:** Minimal state requirements for one-page site

## Routing Architecture

### Route Organization

```
# No routing library needed for one-page site
# Smooth scroll to sections using anchor links

Single page application with scroll-based navigation:
- / (root) → Full page with all sections
- Anchor links (#services, #contact) scroll to sections
- No React Router required
```

### Protected Route Pattern

```typescript
// Not applicable - no authentication or protected routes for MVP
// Future: If admin panel added, implement protected routes with React Router
```

## Frontend Services Layer

### API Client Setup

```typescript
// /src/services/api.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.bladeandbarrel.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### Service Example

```typescript
// /src/services/contactService.ts
import { apiClient } from './api';
import type { ContactFormRequest, ContactFormResponse } from '@/types/contact';

export async function submitContactForm(data: ContactFormRequest): Promise<ContactFormResponse> {
  const response = await apiClient.post<ContactFormResponse>('/contact', data);
  return response.data;
}

// /src/services/instagramService.ts
import { apiClient } from './api';
import type { InstagramFeedProxyResponse } from '@/types/instagram';

export async function fetchInstagramFeed(limit: number = 9): Promise<InstagramFeedProxyResponse> {
  const response = await apiClient.get<InstagramFeedProxyResponse>(`/instagram/feed?limit=${limit}`);
  return response.data;
}
```
