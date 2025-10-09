import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';

/**
 * ScrollToTopButton Component
 *
 * Floating button that appears after scrolling 400px down the page.
 * Smoothly scrolls to top when clicked.
 * Respects reduced motion preferences.
 */

export function ScrollToTopButton() {
  const scrollY = useScrollPosition();
  const shouldReduceMotion = useReducedMotion();

  // Show button after 400px scroll (per story spec)
  const isVisible = scrollY > 400;

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-[#B8935E] hover:bg-[#A07D4A] text-[#1A1A1A] rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 hover:shadow-xl"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
