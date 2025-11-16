import { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import { useScrollPosition } from '@/hooks/useScrollPosition';

/**
 * Header Component
 *
 * Sticky navigation header that becomes solid on scroll.
 * Features smooth scroll navigation and responsive mobile menu.
 *
 * @param onBookingClick - Callback function when "Book Appointment" CTA is clicked
 */

export interface HeaderProps {
  onBookingClick: () => void;
}

export function Header({ onBookingClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollToSection = useScrollToSection();
  const scrollY = useScrollPosition();
  const shouldReduceMotion = useReducedMotion();

  // Header becomes solid after 100px scroll (per front-end spec)
  const isScrolled = scrollY > 100;

  // Navigation links configuration
  const navLinks = [
    { label: 'Services', sectionId: 'services' },
    { label: 'About', sectionId: 'about' },
    { label: 'Contact', sectionId: 'contact' },
    { label: 'Location', sectionId: 'location' },
  ];

  // Handle navigation link click
  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  // Handle booking click
  const handleBookingClick = () => {
    onBookingClick();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 bg-black transition-all duration-300 ${
          isScrolled ? 'shadow-xl border-b border-gray-800' : ''
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center" aria-label="Main navigation">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center transition-transform duration-200 hover:scale-105"
            aria-label="Blade and Barrel - Home"
          >
            <img
              src="/images/nav-logo.svg"
              alt="Blade and Barrel"
              className="h-10 md:h-12 w-auto"
            />
          </button>

          {/* Desktop Navigation - Hidden on mobile */}
          <ul className="hidden md:flex gap-4 lg:gap-8 items-center">
            {navLinks.map((link) => (
              <li key={link.sectionId}>
                <a
                  href={`#${link.sectionId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.sectionId);
                  }}
                  className="text-white hover:text-[#B8935E] transition-colors duration-200 text-sm lg:text-base font-medium whitespace-nowrap"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Book Appointment Button - Hidden on mobile, shows at lg breakpoint to prevent crowding */}
          <div className="hidden lg:block">
            <Button
              onClick={handleBookingClick}
              className="bg-[#B8935E] hover:bg-[#A07D4A] text-[#1A1A1A] font-semibold px-4 lg:px-6 py-2 transition-colors duration-200 whitespace-nowrap text-sm lg:text-base"
            >
              Book Appointment
            </Button>
          </div>

          {/* Mobile Hamburger Menu Button - Visible on mobile only */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-[#B8935E] transition-colors duration-200 p-3"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay - Full-screen */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={shouldReduceMotion ? { x: 0 } : { x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-black z-50 flex flex-col md:hidden"
              role="dialog"
              aria-label="Mobile navigation menu"
            >
              {/* Close Button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-[#B8935E] transition-colors duration-200 p-3"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-8" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <a
                    key={link.sectionId}
                    href={`#${link.sectionId}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.sectionId);
                    }}
                    className="text-white hover:text-[#B8935E] transition-colors duration-200 text-2xl font-medium"
                  >
                    {link.label}
                  </a>
                ))}

                {/* Mobile Book Appointment Button */}
                <div className="mt-8 w-full">
                  <Button
                    onClick={handleBookingClick}
                    className="w-full bg-[#B8935E] hover:bg-[#A07D4A] text-[#1A1A1A] font-semibold px-6 py-3 text-lg transition-colors duration-200"
                  >
                    Book Appointment
                  </Button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
