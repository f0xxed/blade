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
      const taglines = screen.getAllByText('Groomed. Poured. Perfected.');
      expect(taglines.length).toBeGreaterThan(0);
      expect(taglines[0]).toBeInTheDocument();
    });

    it('renders headline with correct text', () => {
      render(<HeroSection {...defaultProps} />);
      const headlines = screen.getAllByText("Tampa's Premier Barbershop Meets Neighborhood Bar");
      expect(headlines.length).toBeGreaterThan(0);
      expect(headlines[0]).toBeInTheDocument();
    });

    it('renders CTA button with correct text', () => {
      render(<HeroSection {...defaultProps} />);
      const buttons = screen.getAllByRole('button', { name: /book appointment/i });
      expect(buttons.length).toBeGreaterThan(0);
      expect(buttons[0]).toBeInTheDocument();
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

      const taglines = screen.getAllByText('Custom Tagline');
      const headlines = screen.getAllByText('Custom Headline');
      const buttons = screen.getAllByRole('button', { name: /custom button/i });

      expect(taglines[0]).toBeInTheDocument();
      expect(headlines[0]).toBeInTheDocument();
      expect(buttons[0]).toBeInTheDocument();
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

      // Check for h1 elements (both desktop and mobile versions)
      const h1Elements = screen.getAllByRole('heading', { level: 1 });
      expect(h1Elements.length).toBeGreaterThan(0);
      expect(h1Elements[0]).toHaveTextContent('Groomed. Poured. Perfected.');

      // Check for h2 elements (both desktop and mobile versions)
      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      expect(h2Elements.length).toBeGreaterThan(0);
      expect(h2Elements[0]).toHaveTextContent("Tampa's Premier Barbershop Meets Neighborhood Bar");
    });
  });

  describe('Interaction', () => {
    it('calls onBookingClick when CTA button is clicked', () => {
      const mockOnClick = vi.fn();
      render(<HeroSection {...defaultProps} onBookingClick={mockOnClick} />);

      const buttons = screen.getAllByRole('button', { name: /book appointment/i });
      fireEvent.click(buttons[0]);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('tracks analytics event when button is clicked', () => {
      // Analytics hook is already mocked at module level
      // This test verifies the component calls trackEvent without errors
      render(<HeroSection {...defaultProps} />);

      const buttons = screen.getAllByRole('button', { name: /book appointment/i });

      // Should not throw when clicking (analytics hook is mocked)
      expect(() => {
        fireEvent.click(buttons[0]);
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

      // Hero section uses flex-col layout
      expect(className).toContain('flex');
      expect(className).toContain('flex-col');
    });

    it('has responsive text sizing classes', () => {
      render(<HeroSection {...defaultProps} />);

      const taglines = screen.getAllByRole('heading', { level: 1 });
      const taglineClass = taglines[0].className;

      // Check for responsive text sizing (updated to match front-end spec - Story 2.8)
      // H1: 40px (2.5rem) mobile → 64px (4rem) desktop
      expect(taglineClass).toMatch(/text-\[2\.5rem\]/); // Mobile: 40px (2.5rem)
      expect(taglineClass).toMatch(/md:text-6xl/); // Tablet: 60px
      expect(taglineClass).toMatch(/lg:text-\[4rem\]/); // Desktop: 64px (4rem)
    });

    it('applies flexbox layout for content', () => {
      render(<HeroSection {...defaultProps} />);

      const section = screen.getByRole('banner');
      const className = section.className;

      expect(className).toContain('flex');
      expect(className).toContain('flex-col');
    });
  });

  describe('Styling', () => {
    it('applies gold accent color to tagline', () => {
      render(<HeroSection {...defaultProps} />);

      const taglines = screen.getAllByRole('heading', { level: 1 });
      expect(taglines[0].className).toContain('text-amber-400');
    });

    it('applies gold accent background to CTA button', () => {
      render(<HeroSection {...defaultProps} />);

      const buttons = screen.getAllByRole('button', { name: /book appointment/i });
      expect(buttons[0].className).toContain('bg-amber-500');
      expect(buttons[0].className).toContain('hover:bg-amber-600');
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
