# User Interface Design Goals

## Overall UX Vision

The website delivers a bold, immersive scrolling narrative experience that mirrors the physical space's dual identity. Users journey through a cinematic story: from an impactful hero moment that immediately communicates "barbershop meets bar," through service offerings that balance grooming precision with social atmosphere, to community connection points (team, location, Instagram feed). The experience feels premium yet approachable—sophisticated without being stuffy—reflecting the target demographic of professional men who value both appearance and authentic social connection.

The design prioritizes frictionless booking as the primary conversion goal while building emotional connection to the Blade and Barrel lifestyle brand.

## Key Interaction Paradigms

- **Smooth scroll-triggered animations**: Sections elegantly reveal as users scroll, creating a curated storytelling experience (using Framer Motion or similar)
- **One-click booking**: Prominent, persistent booking CTA remains accessible throughout scroll journey
- **Touch-optimized mobile navigation**: Mobile-first interactions with large tap targets, swipeable elements where appropriate
- **Lazy-loaded imagery**: High-quality photos load progressively to maintain performance without sacrificing visual impact
- **Inline Instagram feed**: Social proof integrates seamlessly into narrative flow rather than feeling tacked on

## Core Screens and Views

Since this is a one-page website, "screens" are actually distinct scroll sections:

1. **Hero Section** - Full-screen brand impact moment with tagline and booking CTA
2. **Services Overview** - Barbershop services with pricing and hybrid concept explanation
3. **About/Story Section** - Rich's vision and the day-to-night transformation narrative
4. **Instagram Feed Integration** - Live social proof showcasing space and community
5. **Location & Hours** - Interactive map with contact details
6. **Contact Form** - Inquiry submission for events/partnerships

## Accessibility: WCAG AA

Target WCAG 2.1 Level AA compliance to ensure the site is accessible to users with disabilities while balancing development timeline and budget constraints. This includes:
- Sufficient color contrast ratios (4.5:1 for normal text)
- Keyboard navigation support
- Proper semantic HTML and ARIA labels
- Alt text for all images
- Focus indicators for interactive elements

## Branding

**Visual Identity:** Industrial/vintage aesthetic with gold and dark tones, incorporating nautical elements that reflect the Channelside location. High-quality photography showcasing both barbershop precision (close-ups of grooming services, tools, craftsmanship) and bar atmosphere (craft beverages, social moments, space ambiance).

**Design Inspiration:** maverickbarbers.com serves as reference for bold, modern barbershop web design with strong visual hierarchy and immersive scrolling experience.

**Assets Available:** Logo, brand imagery, and concept photos located in `C:\Users\astr0\Desktop\void\projects\blade\images`

**Tone:** Modern and sophisticated yet warm and welcoming—avoiding both overly corporate sterility and dated traditional barbershop clichés.

## Target Device and Platforms: Web Responsive

**Primary:** Mobile-first responsive web design (70%+ expected traffic from mobile devices)

**Supported:**
- Mobile: iOS Safari, Android Chrome (320px - 767px)
- Tablet: iPad Safari, Android tablets (768px - 1024px)
- Desktop: Chrome, Safari, Firefox, Edge on macOS/Windows (1025px+)

**Optimization Priority:** Mobile > Desktop > Tablet, given target user behavior (on-the-go discovery and booking)

---
