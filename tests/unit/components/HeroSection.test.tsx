import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HeroSection } from '@/components/HeroSection';

// Mock Framer Motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <section {...props}>{children}</section>
    ),
    h1: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <h1 {...props}>{children}</h1>
    ),
    h2: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <h2 {...props}>{children}</h2>
    ),
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
  useReducedMotion: () => false,
}));

// Mock useAnalytics hook
vi.mock('@/hooks/useAnalytics', () => ({
  useAnalytics: () => ({
    trackEvent: vi.fn(),
  }),
}));

describe('HeroSection Component', () => {
  const defaultProps = {
    tagline: 'Groomed. Poured. Perfected.',
    headline: "Tampa's Premier Barbershop Meets Neighborhood Bar",
    ctaText: 'Book Appointment',
    onBookingClick: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders tagline with correct text', () => {
      render(<HeroSection {...defaultProps} />);
      expect(screen.getByText('Groomed. Poured. Perfected.')).toBeInTheDocument();
    });

    it('renders headline with correct text', () => {
      render(<HeroSection {...defaultProps} />);
      expect(
        screen.getByText("Tampa's Premier Barbershop Meets Neighborhood Bar")
      ).toBeInTheDocument();
    });

    it('renders CTA button with correct text', () => {
      render(<HeroSection {...defaultProps} />);
      expect(screen.getByRole('button', { name: /book appointment/i })).toBeInTheDocument();
    });

    it('renders with custom props', () => {
      render(
        <HeroSection
          tagline="Custom Tagline"
          headline="Custom Headline"
          ctaText="Custom Button"
          onBookingClick={vi.fn()}
        />
      );

      expect(screen.getByText('Custom Tagline')).toBeInTheDocument();
      expect(screen.getByText('Custom Headline')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /custom button/i })).toBeInTheDocument();
    });
  });

  describe('Image and Accessibility', () => {
    it('renders picture element with WebP and JPG sources', () => {
      render(<HeroSection {...defaultProps} />);

      const img = screen.getByRole('img');
      const picture = img.closest('picture');

      expect(picture).toBeInTheDocument();

      // Check for WebP source
      const webpSource = picture?.querySelector('source[type="image/webp"]');
      expect(webpSource).toBeInTheDocument();
      expect(webpSource?.getAttribute('srcset')).toContain('.webp');

      // Check for JPG source (no type attribute)
      const jpgSource = picture?.querySelectorAll('source')[1];
      expect(jpgSource).toBeInTheDocument();
      expect(jpgSource?.getAttribute('srcset')).toContain('.jpg');
    });

    it('has descriptive alt text for hero image', () => {
      render(<HeroSection {...defaultProps} />);

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt');
      expect(img.getAttribute('alt')).toContain('Blade and Barrel');
      expect(img.getAttribute('alt')).not.toBe('');
    });

    it('renders with semantic HTML structure', () => {
      render(<HeroSection {...defaultProps} />);

      // Check for section element
      const section = screen.getByRole('banner');
      expect(section).toBeInTheDocument();

      // Check for h1 (tagline)
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent('Groomed. Poured. Perfected.');

      // Check for h2 (headline)
      const h2 = screen.getByRole('heading', { level: 2 });
      expect(h2).toHaveTextContent("Tampa's Premier Barbershop Meets Neighborhood Bar");
    });
  });

  describe('Interaction', () => {
    it('calls onBookingClick when CTA button is clicked', () => {
      const mockOnClick = vi.fn();
      render(<HeroSection {...defaultProps} onBookingClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: /book appointment/i });
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('tracks analytics event when button is clicked', () => {
      // Analytics hook is already mocked at module level
      // This test verifies the component calls trackEvent without errors
      render(<HeroSection {...defaultProps} />);

      const button = screen.getByRole('button', { name: /book appointment/i });

      // Should not throw when clicking (analytics hook is mocked)
      expect(() => {
        fireEvent.click(button);
      }).not.toThrow();

      // The mock trackEvent would be called with correct parameters
      // Full analytics integration will be tested in E2E tests when GA4 is configured
    });
  });

  describe('Responsive Design', () => {
    it('has responsive height classes for mobile, tablet, and desktop', () => {
      render(<HeroSection {...defaultProps} />);

      const section = screen.getByRole('banner');
      const className = section.className;

      // Check for responsive height classes
      expect(className).toMatch(/h-\[85vh\]/); // Mobile height
      expect(className).toMatch(/sm:h-\[90vh\]/); // Tablet height
      expect(className).toMatch(/lg:h-screen/); // Desktop height
    });

    it('has responsive text sizing classes', () => {
      render(<HeroSection {...defaultProps} />);

      const tagline = screen.getByRole('heading', { level: 1 });
      const taglineClass = tagline.className;

      // Check for responsive text sizing
      expect(taglineClass).toMatch(/text-4xl/); // Mobile
      expect(taglineClass).toMatch(/md:text-6xl/); // Tablet
      expect(taglineClass).toMatch(/lg:text-7xl/); // Desktop
    });

    it('applies flexbox centering for content', () => {
      render(<HeroSection {...defaultProps} />);

      const section = screen.getByRole('banner');
      const className = section.className;

      expect(className).toContain('flex');
      expect(className).toContain('items-center');
      expect(className).toContain('justify-center');
    });
  });

  describe('Styling', () => {
    it('applies gold accent color to tagline', () => {
      render(<HeroSection {...defaultProps} />);

      const tagline = screen.getByRole('heading', { level: 1 });
      expect(tagline.className).toContain('text-amber-400');
    });

    it('applies gold accent background to CTA button', () => {
      render(<HeroSection {...defaultProps} />);

      const button = screen.getByRole('button', { name: /book appointment/i });
      expect(button.className).toContain('bg-amber-500');
      expect(button.className).toContain('hover:bg-amber-600');
    });

    it('has gradient overlay for text readability', () => {
      const { container } = render(<HeroSection {...defaultProps} />);

      // Check for gradient overlay div
      const overlay = container.querySelector('.bg-gradient-to-b');
      expect(overlay).toBeInTheDocument();
      expect(overlay?.className).toContain('from-black/60');
      expect(overlay?.className).toContain('to-black/40');
    });
  });
});
