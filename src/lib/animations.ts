import { Variants, Transition } from 'framer-motion';

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
 * Common viewport configuration for scroll-triggered animations
 */
export const defaultViewport = {
  once: true, // Animate only once, don't re-trigger on scroll back
  amount: 0.05, // Trigger when 5% visible for better UX
};

/**
 * Fade-in-up animation variants
 * Used for: Section reveals, card animations
 */
export const fadeInUpVariants: Variants = {
  initial: {
    opacity: 0,
    y: 40, // Start 40px below final position
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
};

export const fadeInUpTransition: Transition = {
  duration: 0.6,
  ease: 'easeOut',
};

/**
 * Fade-in animation variants
 * Used for: Backgrounds, overlays, simple reveals
 */
export const fadeInVariants: Variants = {
  initial: {
    opacity: 0,
  },
  whileInView: {
    opacity: 1,
  },
};

export const fadeInTransition: Transition = {
  duration: 0.6,
  ease: 'easeOut',
};

/**
 * Stagger container animation variants
 * Used for: Service cards grid, lists of items
 */
export const staggerContainerVariants: Variants = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1, // 100ms delay between children
      delayChildren: 0.2, // 200ms initial delay before first child
    },
  },
};

/**
 * Stagger item animation variants
 * Used with: staggerContainer parent
 */
export const staggerItemVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
};

export const staggerItemTransition: Transition = {
  duration: 0.5,
  ease: 'easeOut',
};

/**
 * Hero entrance animation variants
 * Used for: Hero text, CTA button
 * Note: Uses `animate` prop instead of `whileInView` for immediate page load animation
 */
export const heroEntranceVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

export const heroEntranceTransition: Transition = {
  duration: 0.8,
  ease: 'easeOut',
};

/**
 * Slide-in from right animation variants
 * Used for: Mobile hamburger menu panel
 */
export const slideInRightVariants: Variants = {
  initial: {
    x: '100%',
  },
  animate: {
    x: 0,
  },
  exit: {
    x: '100%',
  },
};

export const slideInRightTransition: Transition = {
  duration: 0.3,
  ease: 'easeOut',
};

/**
 * Backdrop fade animation variants
 * Used for: Overlay fade-in/out for modals, mobile menu
 */
export const backdropFadeVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const backdropFadeTransition: Transition = {
  duration: 0.2,
};

/**
 * Scale on hover animation variants
 * Used for: Buttons, cards
 */
export const scaleOnHoverVariants: Variants = {
  hover: {
    scale: 1.02,
  },
  tap: {
    scale: 0.98,
  },
};

export const scaleOnHoverTransition: Transition = {
  duration: 0.15,
  ease: 'easeOut',
};

// Backward compatibility exports (deprecated - use separate variants and configs)
export const fadeInUp = fadeInUpVariants;
export const fadeIn = fadeInVariants;
export const staggerContainer = staggerContainerVariants;
export const staggerItem = staggerItemVariants;
export const heroEntrance = heroEntranceVariants;
export const slideInRight = slideInRightVariants;
export const backdropFade = backdropFadeVariants;
export const scaleOnHover = scaleOnHoverVariants;
