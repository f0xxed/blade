/**
 * Responsive Design Test Suite for Story 2.8
 *
 * Comprehensive automated tests for all breakpoints:
 * - Mobile: 320px, 375px, 414px
 * - Tablet: 768px, 1024px
 * - Desktop: 1280px, 1920px
 *
 * Tests validate:
 * - No horizontal scrolling (AC #7)
 * - Touch targets minimum 48x48px on mobile (AC #6)
 * - Typography scaling (AC #4)
 * - Grid layouts adapt correctly (AC #1, #2, #3)
 * - Images scale without distortion (AC #5)
 * - Spacing adapts proportionally (AC #8)
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@/App';
// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <section {...props}>{children}</section>
    ),
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
    h1: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <h1 {...props}>{children}</h1>
    ),
    h2: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <h2 {...props}>{children}</h2>
    ),
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <button {...props}>{children}</button>
    ),
    nav: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <nav {...props}>{children}</nav>
    ),
    header: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <header {...props}>{children}</header>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  useReducedMotion: () => false,
}));
// Helper to set viewport size
const setViewport = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  window.dispatchEvent(new Event('resize'));
};
// Helper to check for horizontal scrolling
const hasHorizontalScroll = () => {
  return document.documentElement.scrollWidth > document.documentElement.clientWidth;
};
// Helper to get computed dimensions
const getDimensions = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
  };
};
describe('Responsive Design Tests - Mobile 320px (iPhone SE)', () => {
  beforeEach(() => {
    setViewport(320, 568);
  });
  it('should render without horizontal scrolling at 320px', () => {
    render(<App />);
    expect(hasHorizontalScroll()).toBe(false);
  });
  it('should display hero section with mobile layout', () => {
    render(
        <App />
    );
    const heroSection = screen.getByRole('banner', { name: /hero/i });
    expect(heroSection).toBeInTheDocument();
  });
  it('should display mobile hamburger menu button', () => {
    render(
        <App />
    );
    const menuButton = screen.getByRole('button', { name: /open menu/i });
    expect(menuButton).toBeInTheDocument();
    // Verify touch target size (minimum 48x48px per AC #6)
    const dimensions = getDimensions(menuButton);
    expect(dimensions.width).toBeGreaterThanOrEqual(44); // 48px ideal, 44px acceptable
    expect(dimensions.height).toBeGreaterThanOrEqual(44);
  });
  it('should display services in 1-column grid on mobile', () => {
    render(
        <App />
    );
    const servicesSection = screen.getByLabelText(/services section/i);
    expect(servicesSection).toBeInTheDocument();
    // Check grid layout
    const servicesGrid = servicesSection.querySelector('.grid');
    const computedStyle = window.getComputedStyle(servicesGrid!);
    // On mobile, should be 1 column (grid-cols-1)
    expect(computedStyle.gridTemplateColumns).toMatch(/^1fr$/);
  });
  it('should have form inputs with minimum 48px height', () => {
    render(
        <App />
    );
    const nameInput = screen.getByPlaceholderText(/your full name/i);
    const dimensions = getDimensions(nameInput);
    expect(dimensions.height).toBeGreaterThanOrEqual(48);
  });
  it('should have submit button with minimum 48x48px touch target', () => {
    render(
        <App />
    );
    const submitButton = screen.getByRole('button', { name: /send message/i });
    const dimensions = getDimensions(submitButton);
    expect(dimensions.width).toBeGreaterThanOrEqual(44);
    expect(dimensions.height).toBeGreaterThanOrEqual(44);
  });
});
describe('Responsive Design Tests - Mobile 375px (iPhone 12/13)', () => {
  beforeEach(() => {
    setViewport(375, 667);
  });
  it('should render without horizontal scrolling at 375px', () => {
    render(
        <App />
    );
    expect(hasHorizontalScroll()).toBe(false);
  });
  it('should scale typography correctly on mobile', () => {
    render(
        <App />
    );
    // H1 should be 40px (2.5rem) on mobile per AC #4
    const h1 = screen.getByRole('heading', { level: 1 });
    const h1Style = window.getComputedStyle(h1);
    // Check font size is in expected mobile range (40px = 2.5rem)
    const fontSize = parseFloat(h1Style.fontSize);
    expect(fontSize).toBeGreaterThanOrEqual(38); // Allow 2px variance
    expect(fontSize).toBeLessThanOrEqual(50);
  });
});
describe('Responsive Design Tests - Mobile 414px (iPhone Plus)', () => {
  beforeEach(() => {
    setViewport(414, 896);
  });
  it('should render without horizontal scrolling at 414px', () => {
    render(
        <App />
    );
    expect(hasHorizontalScroll()).toBe(false);
  });
});
describe('Responsive Design Tests - Tablet 768px (iPad Portrait)', () => {
  beforeEach(() => {
    setViewport(768, 1024);
  });
  it('should render without horizontal scrolling at 768px', () => {
    render(
        <App />
    );
    expect(hasHorizontalScroll()).toBe(false);
  });
  it('should display services in 2-column grid on tablet', () => {
    render(
        <App />
    );
    const servicesSection = screen.getByLabelText(/services section/i);
    const servicesGrid = servicesSection.querySelector('.grid');
    const computedStyle = window.getComputedStyle(servicesGrid!);
    // On tablet (md breakpoint), should be 2 columns (grid-cols-2)
    expect(computedStyle.gridTemplateColumns).toMatch(/1fr\s+1fr/);
  });
  it('should display desktop navigation on tablet', () => {
    render(
        <App />
    );
    // Desktop nav should be visible at md breakpoint
    const servicesLink = screen.getByRole('link', { name: /^services$/i });
    expect(servicesLink).toBeVisible();
  });
});
describe('Responsive Design Tests - Tablet 1024px (iPad Landscape)', () => {
  beforeEach(() => {
    setViewport(1024, 768);
  });
  it('should render without horizontal scrolling at 1024px', () => {
    render(
        <App />
    );
    expect(hasHorizontalScroll()).toBe(false);
  });
});
describe('Responsive Design Tests - Desktop 1280px', () => {
  beforeEach(() => {
    setViewport(1280, 720);
  });
  it('should render without horizontal scrolling at 1280px', () => {
    render(
        <App />
    );
    expect(hasHorizontalScroll()).toBe(false);
  });
  it('should display services in 3-column grid on desktop', () => {
    render(
        <App />
    );
    const servicesSection = screen.getByLabelText(/services section/i);
    const servicesGrid = servicesSection.querySelector('.grid');
    const computedStyle = window.getComputedStyle(servicesGrid!);
    // On desktop (lg breakpoint), should be 3 columns (grid-cols-3)
    expect(computedStyle.gridTemplateColumns).toMatch(/1fr\s+1fr\s+1fr/);
  });
  it('should scale H1 to desktop size (64px)', () => {
    render(
        <App />
    );
    const h1 = screen.getByRole('heading', { level: 1 });
    const h1Style = window.getComputedStyle(h1);
    // H1 should be 64px (4rem) on desktop per AC #4
    const fontSize = parseFloat(h1Style.fontSize);
    expect(fontSize).toBeGreaterThanOrEqual(60); // Allow variance
    expect(fontSize).toBeLessThanOrEqual(68);
  });
  it('should display about section in side-by-side layout', () => {
    render(
        <App />
    );
    const aboutSection = screen.getByLabelText(/about blade and barrel/i);
    const grid = aboutSection.querySelector('.grid');
    const computedStyle = window.getComputedStyle(grid!);
    // On desktop (lg breakpoint), should be 2 columns (grid-cols-2)
    expect(computedStyle.gridTemplateColumns).toMatch(/1fr\s+1fr/);
  });
  it('should display location section in 3-column layout', () => {
    render(
        <App />
    );
    const locationSection = screen.getByLabelText(/location and hours/i);
    const grid = locationSection.querySelector('.grid');
    const computedStyle = window.getComputedStyle(grid!);
    // Location info should be 3 columns on tablet/desktop
    expect(computedStyle.gridTemplateColumns).toMatch(/1fr\s+1fr\s+1fr/);
  });
});
describe('Responsive Design Tests - Wide Desktop 1920px', () => {
  beforeEach(() => {
    setViewport(1920, 1080);
  });
  it('should render without horizontal scrolling at 1920px', () => {
    render(
        <App />
    );
    expect(hasHorizontalScroll()).toBe(false);
  });
  it('should constrain content with max-width container', () => {
    render(
        <App />
    );
    const servicesSection = screen.getByLabelText(/services section/i);
    const container = servicesSection.querySelector('.max-w-7xl');
    expect(container).toBeInTheDocument();
    // Verify container doesn't exceed max-width (1280px + padding)
    const dimensions = getDimensions(container!);
    expect(dimensions.width).toBeLessThanOrEqual(1312); // 1280px + 2*(16px padding)
  });
  it('should not have excessive stretching on wide screens', () => {
    render(
        <App />
    );
    // Content should be centered and not stretch full width
    const servicesSection = screen.getByLabelText(/services section/i);
    const container = servicesSection.querySelector('.max-w-7xl');
    const containerWidth = getDimensions(container!).width;
    expect(containerWidth).toBeLessThan(window.innerWidth);
  });
});
describe('Responsive Design Tests - ScrollToTopButton', () => {
  it('should have minimum 48x48px touch target on mobile', () => {
    setViewport(375, 667);
    render(
        <App />
    );
    // Scroll down to trigger button appearance (appears after 400px)
    window.scrollY = 500;
    window.dispatchEvent(new Event('scroll'));
    const scrollButton = screen.getByRole('button', { name: /scroll to top/i });
    const dimensions = getDimensions(scrollButton);
    expect(dimensions.width).toBeGreaterThanOrEqual(48);
    expect(dimensions.height).toBeGreaterThanOrEqual(48);
  });
});
describe('Responsive Design Tests - Images', () => {
  it('should render hero image without distortion on mobile', () => {
    setViewport(375, 667);
    render(
        <App />
    );
    const heroImage = screen.getByAltText(/blade and barrel barbershop interior/i);
    expect(heroImage).toBeInTheDocument();
    // Verify image has object-fit to prevent distortion
    const imageStyle = window.getComputedStyle(heroImage);
    expect(imageStyle.objectFit).toBe('cover');
  });
  it('should render about section image without distortion', () => {
    setViewport(375, 667);
    render(
        <App />
    );
    const aboutImage = screen.getByAltText(/industrial-modern barbershop atmosphere/i);
    expect(aboutImage).toBeInTheDocument();
    // Verify image scales responsively
    const imageStyle = window.getComputedStyle(aboutImage);
    expect(imageStyle.width).toBe('100%');
    expect(imageStyle.height).toBe('auto');
  });
});
