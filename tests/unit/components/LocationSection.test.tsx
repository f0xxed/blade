import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LocationSection } from '@/components/LocationSection';

describe('LocationSection Component', () => {
  it('renders section heading', () => {
    render(<LocationSection />);
    expect(screen.getByRole('heading', { name: /visit us/i, level: 2 })).toBeInTheDocument();
  });

  it('renders business name and address', () => {
    render(<LocationSection />);
    expect(screen.getByText(/blade and barrel/i)).toBeInTheDocument();
    expect(screen.getByText(/232 N 11th St/i)).toBeInTheDocument();
    expect(screen.getByText(/Tampa, FL 33602/i)).toBeInTheDocument();
  });

  it('renders operating hours with barbershop and bar hours', () => {
    render(<LocationSection />);
    expect(screen.getByText(/hours/i)).toBeInTheDocument();
    expect(screen.getByText(/barbershop:/i)).toBeInTheDocument();
    expect(screen.getByText(/bar:/i)).toBeInTheDocument();
    expect(screen.getByText(/sunday: closed/i)).toBeInTheDocument();
  });

  it('renders phone number as clickable link', () => {
    render(<LocationSection />);
    const phoneLink = screen.getByRole('link', { name: /813-874-1508/i });
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute('href', 'tel:+18138741508');
  });

  it('renders email as clickable link', () => {
    render(<LocationSection />);
    const emailLink = screen.getByRole('link', { name: /help@bladeandbarrel.com/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:help@bladeandbarrel.com');
  });

  it('renders Get Directions button', () => {
    render(<LocationSection />);
    const directionsLink = screen.getByRole('link', { name: /get directions/i });
    expect(directionsLink).toBeInTheDocument();
    expect(directionsLink).toHaveAttribute('href', expect.stringContaining('google.com/maps'));
    expect(directionsLink).toHaveAttribute('target', '_blank');
  });

  it('renders parking information', () => {
    render(<LocationSection />);
    expect(screen.getByRole('heading', { name: /parking/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByText(/street parking available/i)).toBeInTheDocument();
  });

  it('renders Google Maps iframe with title', () => {
    render(<LocationSection />);
    const iframe = screen.getByTitle(/blade and barrel location map/i);
    expect(iframe).toBeInTheDocument();
    expect(iframe.tagName).toBe('IFRAME');
    expect(iframe).toHaveAttribute('src', expect.stringContaining('google.com/maps/embed'));
  });

  it('has responsive grid layout classes', () => {
    const { container } = render(<LocationSection />);
    const grid = container.querySelector('.grid');
    expect(grid?.className).toContain('grid-cols-1');
    expect(grid?.className).toContain('md:grid-cols-3');
  });

  it('has proper ARIA label for accessibility', () => {
    const { container } = render(<LocationSection />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('aria-label', 'Location and Hours');
  });

  it('uses semantic HTML with address element', () => {
    const { container } = render(<LocationSection />);
    const address = container.querySelector('address');
    expect(address).toBeInTheDocument();
    expect(address?.className).toContain('not-italic');
  });

  it('renders contact section heading', () => {
    render(<LocationSection />);
    expect(screen.getByRole('heading', { name: /contact/i, level: 3 })).toBeInTheDocument();
  });

  it('renders hours section heading', () => {
    render(<LocationSection />);
    expect(screen.getByRole('heading', { name: /^hours$/i, level: 3 })).toBeInTheDocument();
  });

  it('renders parking section heading', () => {
    render(<LocationSection />);
    expect(screen.getByRole('heading', { name: /^parking$/i, level: 3 })).toBeInTheDocument();
  });

  it('applies correct background color styling', () => {
    const { container } = render(<LocationSection />);
    const section = container.querySelector('section');
    expect(section?.className).toContain('bg-[#2C3539]');
  });

  it('applies correct text color styling to heading', () => {
    render(<LocationSection />);
    const heading = screen.getByRole('heading', { name: /visit us/i, level: 2 });
    expect(heading.className).toContain('text-[#E8DCC8]');
  });
});
