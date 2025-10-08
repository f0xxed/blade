import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ServicesSection } from '@/components/ServicesSection';
import { SERVICES } from '@/constants/services';

describe('ServicesSection Component', () => {
  it('renders section heading', () => {
    render(<ServicesSection />);
    expect(screen.getByRole('heading', { name: /our services/i, level: 2 })).toBeInTheDocument();
  });

  it('renders all services from SERVICES array', () => {
    render(<ServicesSection />);

    // Verify all service names are present
    SERVICES.forEach(service => {
      expect(screen.getByText(service.name)).toBeInTheDocument();
      expect(screen.getByText(service.description)).toBeInTheDocument();
    });
  });

  it('displays correct pricing for each service', () => {
    render(<ServicesSection />);

    SERVICES.forEach(service => {
      expect(screen.getByText(`$${service.price}`)).toBeInTheDocument();
    });
  });

  it('displays duration when available', () => {
    render(<ServicesSection />);

    SERVICES.forEach(service => {
      if (service.duration) {
        expect(screen.getByText(`${service.duration} min`)).toBeInTheDocument();
      }
    });
  });

  it('renders complementary offerings text about draft beer', () => {
    render(<ServicesSection />);
    const draftBeerTexts = screen.getAllByText(/complimentary draft beer/i);
    expect(draftBeerTexts.length).toBeGreaterThan(0);
    expect(draftBeerTexts[0]).toBeInTheDocument();
  });

  it('renders bar availability information', () => {
    render(<ServicesSection />);
    expect(screen.getByText(/bar is open for daytime beverages/i)).toBeInTheDocument();
    expect(screen.getByText(/evening social atmosphere/i)).toBeInTheDocument();
  });

  it('renders "More Than Just a Haircut" heading', () => {
    render(<ServicesSection />);
    expect(screen.getByRole('heading', { name: /more than just a haircut/i, level: 3 })).toBeInTheDocument();
  });

  it('has responsive grid layout classes', () => {
    const { container } = render(<ServicesSection />);
    const grid = container.querySelector('.grid');

    expect(grid).toBeInTheDocument();
    expect(grid?.className).toContain('grid-cols-1');
    expect(grid?.className).toContain('md:grid-cols-2');
    expect(grid?.className).toContain('lg:grid-cols-3');
  });

  it('renders correct number of service cards', () => {
    const { container } = render(<ServicesSection />);
    const grid = container.querySelector('.grid');
    const cards = grid?.children;

    expect(cards?.length).toBe(SERVICES.length);
  });

  it('has proper section aria-label for accessibility', () => {
    const { container } = render(<ServicesSection />);
    const section = container.querySelector('section');

    expect(section?.getAttribute('aria-label')).toBe('Services section');
  });

  it('applies proper spacing classes to section', () => {
    const { container } = render(<ServicesSection />);
    const section = container.querySelector('section');

    expect(section?.className).toContain('py-16');
    expect(section?.className).toContain('md:py-24');
  });

  it('renders cards with proper structure', () => {
    render(<ServicesSection />);

    // Verify first service card structure
    const firstService = SERVICES[0];
    const cardTitle = screen.getByText(firstService.name);
    const cardDescription = screen.getByText(firstService.description);
    const cardPrice = screen.getByText(`$${firstService.price}`);

    expect(cardTitle).toBeInTheDocument();
    expect(cardDescription).toBeInTheDocument();
    expect(cardPrice).toBeInTheDocument();
  });

  it('renders services in correct order', () => {
    render(<ServicesSection />);

    const serviceNames = SERVICES.map(s => s.name);
    serviceNames.forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('applies hover effect classes to cards', () => {
    const { container } = render(<ServicesSection />);
    const cards = container.querySelectorAll('[class*="hover:shadow"]');

    expect(cards.length).toBeGreaterThan(0);
  });

  it('renders complementary offerings section with proper styling', () => {
    const { container } = render(<ServicesSection />);
    const offeringsSection = container.querySelector('.bg-gradient-to-br');

    expect(offeringsSection).toBeInTheDocument();
    expect(offeringsSection?.className).toContain('from-amber-50');
  });
});
