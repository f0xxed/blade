import { useCallback } from 'react';

/**
 * Custom hook for smooth scrolling to sections with offset compensation
 * Accounts for sticky header height to prevent content from being hidden
 */
export function useScrollToSection() {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    // Sticky header height (80px as per front-end spec)
    const headerHeight = 80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }, []);

  return scrollToSection;
}
