# Epic 2: Content & Storytelling Experience

**Epic Goal:** Build the complete one-page scrolling narrative experience with all content sections (hero, services, about, location), integrated Instagram feed, responsive design across all devices, and smooth scroll animations that bring the Blade and Barrel brand story to life.

## Story 2.1: Build Hero Section Component with CTA

**As a** first-time visitor,
**I want** to immediately understand what Blade and Barrel offers and be able to book an appointment,
**so that** I can quickly decide if this is the right barbershop for me and take action.

### Acceptance Criteria

1. Full-screen hero section component created using shadcn/ui and Tailwind CSS
2. Hero displays high-quality background image showcasing barbershop or hybrid concept (from brand assets)
3. "Groomed. Poured. Perfected." tagline prominently displayed with brand typography
4. Compelling headline communicates hybrid barbershop-bar concept (e.g., "Tampa's Premier Barbershop Meets Neighborhood Bar")
5. Primary call-to-action button labeled "Book Appointment" with prominent styling (gold accent color)
6. CTA button placeholder link prepared (will connect to booking system in Epic 3)
7. Hero section is fully responsive - maintains visual impact on mobile (320px+), tablet, and desktop
8. Text remains readable over background image with proper contrast (overlay/gradient if needed)
9. Hero height adjusts appropriately for mobile (prevents excessive scrolling before content)
10. Entrance animation implemented - hero content fades/slides in on page load using Framer Motion

---

## Story 2.2: Create Services Overview Section

**As a** potential customer,
**I want** to see what barbershop services are offered with pricing,
**so that** I can understand what's available and decide what service I need.

### Acceptance Criteria

1. Services section component created below hero with clear section heading ("Our Services" or "Grooming Services")
2. Service cards or list displays at minimum: Haircut, Beard Trim, Hot Towel Shave
3. Each service includes brief description (1-2 sentences) and pricing
4. Section mentions complimentary draft beer included with barbershop services
5. Section communicates bar service availability (daytime beverages, evening social atmosphere)
6. Services arranged in grid layout on desktop (2-3 columns), stacked vertically on mobile
7. Service cards use shadcn/ui Card component with consistent styling
8. Responsive design - service cards resize appropriately across all breakpoints
9. Scroll-triggered animation - services fade/slide in as user scrolls to section using Framer Motion
10. Section maintains visual hierarchy with adequate spacing and readability

---

## Story 2.3: Develop About/Story Section

**As a** potential customer unfamiliar with the concept,
**I want** to learn about the Blade and Barrel story and what makes it unique,
**so that** I understand the vision and feel connected to the brand.

### Acceptance Criteria

1. About section component created with section heading ("Our Story" or "About Blade and Barrel")
2. Section includes 2-3 paragraphs explaining the hybrid barbershop-bar concept
3. Content communicates Rich Keeley's vision and entrepreneurial journey
4. Text explains day-to-night transformation (daytime grooming + lunch → evening neighborhood bar)
5. Channelside Tampa location and community focus emphasized
6. Section includes Rich's photo and brief bio (founder, vision, background)
7. Content mentions future multi-location expansion aspiration (establishes credibility)
8. Section layout includes image(s) of the space or concept photography alongside text
9. Responsive layout - text and images stack vertically on mobile, side-by-side on desktop
10. Scroll-triggered animation - content animates in smoothly as section enters viewport

---

## Story 2.4: Implement Location & Hours Section with Google Maps

**As a** potential customer,
**I want** to see exactly where Blade and Barrel is located and when it's open,
**so that** I can plan my visit and find the shop easily.

### Acceptance Criteria

1. Location section component created with section heading ("Visit Us" or "Location & Hours")
2. Embedded Google Map showing Channelside Tampa location using Google Maps Embed API
3. Map is interactive - users can zoom, pan, and click "View larger map" to open in Google Maps
4. Full street address displayed prominently near map
5. Operating hours displayed clearly (format: "Monday-Friday: 9am-7pm" or similar)
6. Hours differentiated for barbershop vs. bar if applicable (e.g., "Barbershop: 9am-6pm, Bar: 4pm-11pm")
7. Parking information included (e.g., "Street parking available, nearby garage at...")
8. Phone number and email contact displayed for quick reference
9. Map and contact info are responsive - map resizes on mobile, contact info remains readable
10. Section maintains accessibility - map has proper ARIA labels and keyboard navigation

---

## Story 2.5: Integrate Instagram Feed

**As a** potential customer,
**I want** to see recent Instagram posts from Blade and Barrel,
**so that** I can get a feel for the vibe, see recent work, and decide if this matches my style.

### Acceptance Criteria

1. Instagram feed section component created with section heading ("Follow Our Journey" or "Latest from Instagram")
2. Instagram Basic Display API integrated to fetch recent posts from @bladeandbarrel account
3. Feed displays 6-9 recent posts in grid layout (3 columns on desktop, 2 on tablet, 1-2 on mobile)
4. Each post displays image/video thumbnail with option to click through to Instagram
5. Instagram username and "Follow Us" CTA button link to Instagram profile
6. Loading state implemented - skeleton or spinner displays while fetching posts
7. Error handling - graceful fallback message if API fails or returns no posts
8. Images lazy-load as user scrolls to section for performance
9. Feed updates automatically on page load (no manual refresh needed)
10. Rate limiting handled - API calls respect Instagram API limits (cached for reasonable duration)

---

## Story 2.6: Build Contact Form UI (Frontend Only)

**As a** potential customer or event organizer,
**I want** to send an inquiry about private events, partnerships, or general questions,
**so that** I can get in touch with Blade and Barrel easily.

### Acceptance Criteria

1. Contact form section component created with section heading ("Get In Touch" or "Contact Us")
2. Form includes fields: Name (required), Email (required), Phone (optional), Message (required)
3. Form built using shadcn/ui Form components with proper validation
4. Client-side validation - email format validated, required fields enforced before submission
5. Form displays validation errors inline (e.g., "Please enter a valid email address")
6. Submit button labeled "Send Message" with loading state (disabled during submission)
7. Form layout is responsive - fields stack vertically on mobile, optimized spacing on desktop
8. Placeholder text provides guidance (e.g., "Tell us about your event or inquiry...")
9. Form submission handler placeholder prepared (will connect to Lambda backend in Epic 3)
10. Success/error message placeholders prepared for post-submission feedback

---

## Story 2.7: Implement Smooth Scroll Navigation and Animations

**As a** user,
**I want** smooth scrolling between sections and elegant animations,
**so that** the website feels polished, modern, and enjoyable to browse.

### Acceptance Criteria

1. Smooth scroll behavior implemented for all in-page navigation (e.g., clicking nav links scrolls smoothly to sections)
2. Scroll-triggered animations configured using Framer Motion for all major sections
3. Sections animate in with fade-in and slide-up effect as they enter viewport (threshold: 20-30% visible)
4. Hero section has entrance animation on initial page load
5. Animations are performant - no jank or lag on mobile devices (60fps target)
6. Animations respect `prefers-reduced-motion` accessibility setting (disable for users who prefer less motion)
7. Scroll progress indicator or scroll-to-top button implemented for user convenience (optional enhancement)
8. Navigation bar (if exists) becomes sticky/fixed on scroll for easy section access
9. All animations have appropriate duration (300-600ms) to feel responsive, not sluggish
10. Testing on multiple devices confirms smooth performance across mobile, tablet, desktop

---

## Story 2.8: Ensure Full Responsive Design Across All Breakpoints

**As a** user on any device,
**I want** the website to look great and function perfectly whether I'm on mobile, tablet, or desktop,
**so that** I have a consistent, high-quality experience regardless of how I access the site.

### Acceptance Criteria

1. All sections (hero, services, about, location, Instagram, contact) tested at mobile (320px-767px) breakpoint
2. All sections tested at tablet (768px-1024px) breakpoint
3. All sections tested at desktop (1025px+) and large desktop (1920px+) breakpoints
4. Typography scales appropriately - headings remain readable on small screens, not too large on desktop
5. Images resize and crop appropriately without distortion or awkward aspect ratios
6. Touch targets (buttons, links, form fields) are minimum 44x44px on mobile for easy tapping
7. No horizontal scrolling occurs on any breakpoint (content fits within viewport width)
8. Spacing and padding adjust proportionally across breakpoints (tighter on mobile, more generous on desktop)
9. Navigation and CTA buttons remain accessible and prominent across all screen sizes
10. Cross-browser testing completed on Chrome, Safari, Firefox, Edge (last 2 versions) for mobile and desktop

---
