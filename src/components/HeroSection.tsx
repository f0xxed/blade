import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * HeroSection Component
 *
 * Full-screen hero section with background image, tagline, and headline.
 * Features Framer Motion entrance animation and respects reduced motion preferences.
 *
 * @param tagline - Primary tagline displayed prominently (e.g., "Groomed. Poured. Perfected.")
 * @param headline - Secondary headline describing the business concept
 */

export interface HeroSectionProps {
  tagline: string;
  headline: string;
}

export function HeroSection({ tagline, headline }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  // Animation configuration - disabled if user prefers reduced motion
  const animationVariants = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <motion.section
      id="hero"
      {...animationVariants}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative flex flex-col min-h-screen pt-[48px] md:pt-[72px]"
      role="banner"
      aria-label="Hero section"
    >
      {/* Hero background image with responsive WebP support */}
      <div className="relative overflow-hidden flex-1 sm:h-[70vh] lg:h-screen flex items-center justify-center bg-black">
        {/* Mobile: Use mobile logo */}
        <img
          src="/images/mobile-logo.jpeg"
          alt="Blade and Barrel barbershop interior with vintage decor and bar seating"
          className="lg:hidden w-full h-auto max-h-[50vh] object-contain object-center"
        />

        {/* Desktop: Use hero image */}
        <picture className="hidden lg:block absolute inset-0">
          <source
            srcSet="/images/hero/hero-desktop.webp 1920w, /images/hero/hero-tablet.webp 1024w"
            sizes="100vw"
            type="image/webp"
          />
          <source
            srcSet="/images/hero/hero-desktop.jpg 1920w, /images/hero/hero-tablet.jpg 1024w"
            sizes="100vw"
          />
          <img
            src="/images/hero/hero.jpg"
            alt="Blade and Barrel barbershop interior with vintage decor and bar seating"
            className="w-full h-full object-cover object-center bg-black"
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
              className="text-xl md:text-2xl lg:text-3xl font-light text-slate-100 max-w-3xl"
            >
              {headline}
            </motion.h2>
          </div>
        </div>

        {/* Scroll Indicator - Desktop */}
        <motion.button
          onClick={() => {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1, y: shouldReduceMotion ? 0 : [0, 10, 0] }}
          transition={{
            opacity: { duration: 0.5, delay: 0.8 },
            y: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer z-20"
          aria-label="Scroll to services"
        >
          <ChevronDown className="h-10 w-10" />
        </motion.button>
      </div>

      {/* Content below image - mobile only */}
      <div className="lg:hidden bg-black flex-1 flex flex-col items-center justify-center px-4 py-8 relative">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="mb-4"
          >
            {/* Mobile stacked version */}
            <div className="sm:hidden relative">
              <div className="flex items-center gap-3">
                <div className="w-0.5 h-32 bg-amber-400/50"></div>
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold text-amber-400 leading-none">Groomed.</h1>
                  <h1 className="text-3xl font-bold text-amber-300 leading-none pl-4">Poured.</h1>
                  <h1 className="text-3xl font-bold text-amber-400 leading-none pl-8">Perfected.</h1>
                </div>
              </div>
            </div>

            {/* Tablet/larger mobile horizontal version */}
            <h1 className="hidden sm:block text-5xl font-bold text-amber-400 text-center">
              {tagline}
            </h1>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : 0.4 }}
            className="text-lg sm:text-xl font-light text-slate-100 max-w-3xl text-center px-4"
          >
            {headline}
          </motion.h2>
        </div>

        {/* Scroll Indicator - Mobile */}
        <motion.button
          onClick={() => {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1, y: shouldReduceMotion ? 0 : [0, 10, 0] }}
          transition={{
            opacity: { duration: 0.5, delay: 0.8 },
            y: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-amber-400 hover:text-amber-300 transition-colors"
          aria-label="Scroll to services"
        >
          <ChevronDown className="h-8 w-8" />
        </motion.button>
      </div>
    </motion.section>
  );
}
