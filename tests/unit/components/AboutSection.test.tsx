import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AboutSection } from '@/components/AboutSection';

describe('AboutSection Component', () => {
  it('renders section heading', () => {
    render(<AboutSection />);
    expect(screen.getByRole('heading', { name: /our story/i, level: 2 })).toBeInTheDocument();
  });

  it('renders story content paragraphs with hybrid concept', () => {
    render(<AboutSection />);
    expect(screen.getByText(/exceptional grooming meets craft culture/i)).toBeInTheDocument();
    expect(screen.getByText(/blending premium men's grooming services/i)).toBeInTheDocument();
  });

  it('renders content mentioning Channelside Tampa location', () => {
    render(<AboutSection />);
    expect(screen.getByText(/third place.*tampa.*channelside district/i)).toBeInTheDocument();
  });

  it('renders day-to-night transformation content', () => {
    render(<AboutSection />);
    expect(screen.getByText(/grooming by day, neighborhood bar by night/i)).toBeInTheDocument();
  });

  it('renders founder name and bio', () => {
    render(<AboutSection />);
    expect(screen.getByRole('heading', { name: /rich keeley/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByText(/founder & visionary/i)).toBeInTheDocument();
  });

  it('renders founder bio with entrepreneurial vision', () => {
    render(<AboutSection />);
    expect(screen.getByText(/entrepreneur with a passion/i)).toBeInTheDocument();
    expect(screen.getByText(/network of blade and barrel establishments/i)).toBeInTheDocument();
  });

  it('renders supporting image with descriptive alt text', () => {
    render(<AboutSection />);
    const image = screen.getByAltText(/blade and barrel interior showcasing industrial-modern barbershop/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('src', '/images/Barbearia industrial.jpg');
  });

  it('has responsive grid layout classes', () => {
    const { container } = render(<AboutSection />);
    const grid = container.querySelector('.grid');
    expect(grid?.className).toContain('grid-cols-1');
    expect(grid?.className).toContain('lg:grid-cols-2');
  });

  it('has proper section padding classes', () => {
    const { container } = render(<AboutSection />);
    const section = container.querySelector('section');
    expect(section?.className).toContain('py-16');
    expect(section?.className).toContain('md:py-24');
  });

  it('has proper ARIA label for accessibility', () => {
    const { container } = render(<AboutSection />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('aria-label', 'About Blade and Barrel');
  });

  it('uses semantic HTML structure', () => {
    const { container } = render(<AboutSection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();

    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();

    const h3 = screen.getByRole('heading', { level: 3 });
    expect(h3).toBeInTheDocument();
  });

  it('renders founder photo placeholder', () => {
    render(<AboutSection />);
    expect(screen.getByText('RK')).toBeInTheDocument();
  });

  it('has proper background color styling', () => {
    const { container } = render(<AboutSection />);
    const section = container.querySelector('section');
    expect(section?.className).toContain('bg-[#E8DCC8]');
  });

  it('renders all three main story paragraphs', () => {
    const { container } = render(<AboutSection />);
    const paragraphs = container.querySelectorAll('p');
    // Should have at least 3 paragraphs in story content + 2 in bio section
    expect(paragraphs.length).toBeGreaterThanOrEqual(5);
  });

  it('has rounded corners on image', () => {
    render(<AboutSection />);
    const image = screen.getByAltText(/blade and barrel interior/i);
    expect(image.className).toContain('rounded-lg');
  });

  it('has shadow styling on image', () => {
    render(<AboutSection />);
    const image = screen.getByAltText(/blade and barrel interior/i);
    expect(image.className).toContain('shadow-lg');
  });

  it('applies custom className prop when provided', () => {
    const { container } = render(<AboutSection className="custom-test-class" />);
    const section = container.querySelector('section');
    expect(section?.className).toContain('custom-test-class');
  });
});
