import { Variants } from 'framer-motion';

/**
 * Reusable Framer Motion Animation Variants
 *
 * Centralized animation configurations for consistent motion across the app.
 * All animations respect the `prefers-reduced-motion` setting via useReducedMotion hook.
 *
 * Performance: Animations only use GPU-accelerated properties (transform, opacity)
 * Timing: 300-600ms durations for responsive, not sluggish feel (per AC 9)
 */

/**
 * Fade-in-up animation: Element slides up while fading in
 * Used for: Section reveals, card animations
 * Duration: 600ms (responsive feel per front-end spec)
 */
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 40, // Start 40px below final position
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: {
    once: true, // Animate only once, don't re-trigger on scroll back
    amount: 0.3, // Trigger when 30% visible (per AC 3)
  },
  transition: {
    duration: 0.6,
    ease: 'easeOut',
  },
};

/**
 * Fade-in animation: Element fades in without movement
 * Used for: Backgrounds, overlays, simple reveals
 * Duration: 600ms
 */
export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  whileInView: {
    opacity: 1,
  },
  viewport: {
    once: true,
    amount: 0.05, // Trigger when 5% visible for better UX
  },
  transition: {
    duration: 0.6,
    ease: 'easeOut',
  },
};

/**
 * Stagger container animation: Parent container for staggered children
 * Used for: Service cards grid, lists of items
 * Delay: 100ms between each child (per front-end spec)
 */
export const staggerContainer: Variants = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1, // 100ms delay between children
      delayChildren: 0.2, // 200ms initial delay before first child
    },
  },
  viewport: {
    once: true,
    amount: 0.05, // Trigger when 5% visible for better UX
  },
};

/**
 * Stagger item animation: Child items within staggered container
 * Used with: staggerContainer parent
 */
export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.5,
    ease: 'easeOut',
  },
};

/**
 * Hero entrance animation: Page load animation for hero section
 * Used for: Hero text, CTA button
 * Note: Uses `animate` prop instead of `whileInView` for immediate page load animation
 */
export const heroEntrance = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.8,
    ease: 'easeOut',
  },
};

/**
 * Slide-in from right: Mobile menu animation
 * Used for: Mobile hamburger menu panel
 * Duration: 300ms (fast for UI feedback)
 */
export const slideInRight: Variants = {
  initial: {
    x: '100%',
  },
  animate: {
    x: 0,
  },
  exit: {
    x: '100%',
  },
  transition: {
    duration: 0.3,
    ease: 'easeOut',
  },
};

/**
 * Backdrop fade: Overlay fade-in/out for modals, mobile menu
 * Duration: 200ms (fast for responsiveness)
 */
export const backdropFade: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
  transition: {
    duration: 0.2,
  },
};

/**
 * Scale on hover: Subtle scale-up for interactive elements
 * Used for: Buttons, cards
 * Scale: 1.02x (subtle, not overwhelming)
 */
export const scaleOnHover = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.15,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: 'easeIn',
    },
  },
};
