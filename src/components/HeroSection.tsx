import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/hooks/useAnalytics';

/**
 * HeroSection Component
 *
 * Full-screen hero section with background image, tagline, headline, and CTA button.
 * Features Framer Motion entrance animation and respects reduced motion preferences.
 *
 * @param tagline - Primary tagline displayed prominently (e.g., "Groomed. Poured. Perfected.")
 * @param headline - Secondary headline describing the business concept
 * @param ctaText - Text for the call-to-action button
 * @param onBookingClick - Callback function when CTA button is clicked
 */

export interface HeroSectionProps {
  tagline: string;
  headline: string;
  ctaText: string;
  onBookingClick: () => void;
}

export function HeroSection({ tagline, headline, ctaText, onBookingClick }: HeroSectionProps) {
  const { trackEvent } = useAnalytics();
  const shouldReduceMotion = useReducedMotion();

  // Animation configuration - disabled if user prefers reduced motion
  const animationVariants = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  const handleBookingClick = () => {
    // Track analytics event
    trackEvent('booking_initiated', {
      eventCategory: 'conversion',
      eventLabel: 'Hero CTA clicked',
    });

    // Execute callback
    onBookingClick();
  };

  return (
    <motion.section
      id="hero"
      {...animationVariants}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative flex flex-col pt-[72px]"
      role="banner"
      aria-label="Hero section"
    >
      {/* Hero background image with responsive WebP support */}
      <div className="relative overflow-hidden sm:h-[70vh] lg:h-screen">
        <picture>
          <source
            srcSet="/images/hero/hero-desktop.webp 1920w, /images/hero/hero-tablet.webp 1024w, /images/hero/hero-mobile.webp 640w"
            sizes="100vw"
            type="image/webp"
          />
          <source
            srcSet="/images/hero/hero-desktop.jpg 1920w, /images/hero/hero-tablet.jpg 1024w, /images/hero/hero-mobile.jpg 640w"
            sizes="100vw"
          />
          <img
            src="/images/hero/hero.jpg"
            alt="Blade and Barrel barbershop interior with vintage decor and bar seating"
            className="w-full h-auto sm:absolute sm:inset-0 sm:h-[70vh] lg:h-screen sm:object-cover sm:object-center bg-[#1A1A1A]"
          />
        </picture>

        {/* Dark gradient overlay for text readability - hidden on mobile, visible on desktop */}
        <div
          className="hidden lg:block absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"
          aria-hidden="true"
        />

        {/* Content overlay - desktop only */}
        <div className="hidden lg:flex absolute inset-0 items-end pb-24">
          <div className="relative z-10 text-center text-white px-4 md:px-8 lg:px-12 max-w-5xl mx-auto flex flex-col items-center w-full">
            <motion.h1
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : 0.2 }}
              className="text-[2.5rem] md:text-6xl lg:text-[4rem] font-bold mb-6 md:mb-8 text-amber-400"
            >
              {tagline}
            </motion.h1>

            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : 0.4 }}
              className="text-xl md:text-2xl lg:text-3xl font-light mb-8 md:mb-12 text-slate-100 max-w-3xl"
            >
              {headline}
            </motion.h2>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : 0.6 }}
            >
              <Button
                size="lg"
                onClick={handleBookingClick}
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-6 text-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {ctaText}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content below image - mobile only */}
      <div className="lg:hidden bg-[#1A1A1A] py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="text-[2.5rem] sm:text-5xl font-bold mb-6 text-amber-400"
          >
            {tagline}
          </motion.h1>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : 0.4 }}
            className="text-lg sm:text-xl font-light mb-8 text-slate-100 max-w-3xl"
          >
            {headline}
          </motion.h2>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : 0.6 }}
          >
            <Button
              size="lg"
              onClick={handleBookingClick}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-6 text-lg transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {ctaText}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
