import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '@/App';

// Mock the console.log to avoid console noise in tests
const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('App - Hero Section with CTA (Story 2.1)', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('displays the tagline "Groomed. Poured. Perfected."', () => {
    render(<App />);
    const taglines = screen.getAllByText(/groomed\. poured\. perfected\./i);
    expect(taglines.length).toBeGreaterThan(0);
    expect(taglines[0]).toBeInTheDocument();
  });

  it('displays the headline about barbershop meets bar concept', () => {
    render(<App />);
    const headlines = screen.getAllByText(/tampa's premier barbershop meets neighborhood bar/i);
    expect(headlines.length).toBeGreaterThan(0);
    expect(headlines[0]).toBeInTheDocument();
  });

  it('displays the Book Appointment CTA button', () => {
    render(<App />);
    const ctaButton = screen.getByRole('button', { name: /book appointment/i });
    expect(ctaButton).toBeInTheDocument();
  });

  it('calls booking handler when CTA button is clicked', () => {
    render(<App />);
    const ctaButton = screen.getByRole('button', { name: /book appointment/i });

    fireEvent.click(ctaButton);

    // Verify console.log was called (placeholder for booking integration)
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Booking initiated')
    );
  });

  it('has proper accessibility attributes on hero section', () => {
    render(<App />);
    // Multiple banner roles exist (Header and HeroSection), so get all and find the one with 'Hero section' label
    const banners = screen.getAllByRole('banner');
    const heroSection = banners.find(el => el.getAttribute('aria-label') === 'Hero section');
    expect(heroSection).toBeDefined();
    expect(heroSection).toHaveAttribute('aria-label', 'Hero section');
  });

  // Story 1.6: Image Optimization Tests
  describe('Image Optimization (Story 1.6)', () => {
    it('renders picture element with WebP and JPG sources', () => {
      render(<App />);
      const picture = document.querySelector('picture');
      expect(picture).toBeInTheDocument();

      const sources = picture?.querySelectorAll('source');
      expect(sources?.length).toBeGreaterThanOrEqual(2); // WebP + JPG fallback
    });

    it('includes WebP source with correct type attribute', () => {
      render(<App />);
      const webpSource = document.querySelector('source[type="image/webp"]');
      expect(webpSource).toBeInTheDocument();
      expect(webpSource?.getAttribute('srcset')).toContain('.webp');
    });

    it('includes responsive srcset for mobile, tablet, and desktop', () => {
      render(<App />);
      const webpSource = document.querySelector('source[type="image/webp"]');
      const srcset = webpSource?.getAttribute('srcset') || '';

      expect(srcset).toContain('640w'); // Mobile
      expect(srcset).toContain('1024w'); // Tablet
      expect(srcset).toContain('1920w'); // Desktop
    });

    it('has descriptive alt text for hero image', () => {
      render(<App />);
      const heroImg = screen.getByAltText(/blade and barrel barbershop interior/i);
      expect(heroImg).toBeInTheDocument();
      expect(heroImg.getAttribute('alt')).not.toBe('');
    });

    it('does not apply lazy loading to hero image (above-the-fold)', () => {
      render(<App />);
      const heroImg = screen.getByAltText(/blade and barrel barbershop interior/i);
      expect(heroImg.getAttribute('loading')).not.toBe('lazy');
    });

    it('uses organized image paths with subfolder structure', () => {
      render(<App />);
      const webpSource = document.querySelector('source[type="image/webp"]');
      const srcset = webpSource?.getAttribute('srcset') || '';

      expect(srcset).toContain('/images/hero/'); // Images in hero/ subfolder
    });

    it('hero image uses hero subfolder path', () => {
      render(<App />);
      const heroImg = screen.getByAltText(/blade and barrel barbershop interior/i);
      expect(heroImg.getAttribute('src')).toContain('/images/hero/');
    });
  });
});
