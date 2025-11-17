import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * HeroSection Component
 *
 * Full-screen hero section with centered logo and headline.
 * Features Framer Motion entrance animation and respects reduced motion preferences.
 * Uses mobile-first centered layout across all breakpoints.
 */

export function HeroSection() {
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
      className="relative flex flex-col min-h-[100dvh] pt-[48px] md:pt-[72px]"
      role="banner"
      aria-label="Hero section"
    >
      {/* Hero background with logo image - unified across all screen sizes */}
      <div className="relative overflow-hidden flex-1 flex items-center justify-center bg-black">
        {/* Logo image - responsive sizing */}
        <img
          src="/images/mobile-logo.jpeg"
          alt="Blade and Barrel barbershop interior with vintage decor and bar seating"
          className="w-full h-auto max-h-[40vh] sm:max-h-[45vh] md:max-h-[50vh] lg:max-h-[55vh] object-contain object-center"
        />
      </div>

      {/* Content below image - unified across all screen sizes */}
      <div className="bg-black flex flex-col px-4 pb-6 pt-4 md:pb-8 md:pt-6 lg:pb-10 lg:pt-8 relative">
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Headline - responsive text sizing */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="mb-6 md:mb-8 text-center"
          >
            <div className="space-y-1 md:space-y-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-slate-100 font-light leading-tight">Tampa's Premier</h1>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-slate-200 font-light leading-tight">Barbershop Meets</h1>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-slate-100 font-light leading-tight">Neighborhood Bar</h1>
            </div>
          </motion.div>

          {/* Modern Scroll Indicator */}
          <div className="flex justify-center">
            <motion.button
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{
                opacity: 1,
                y: shouldReduceMotion ? 0 : [0, 10, 0]
              }}
              transition={{
                opacity: { duration: 0.5, delay: 0.6 },
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="relative rounded-full p-5 md:p-6 lg:p-7 transition-all duration-300 group"
              aria-label="Scroll to services"
            >
              <ChevronDown className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 text-amber-400 group-hover:text-amber-300 transition-colors" />
              <span className="absolute inset-0 md:inset-3 lg:inset-5 rounded-full border-2 border-amber-400/30 animate-ping"></span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
