import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '@/App';

describe('App - Coming Soon Landing Page', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('displays the Blade and Barrel logo', () => {
    render(<App />);
    const logo = screen.getByAltText(/blade and barrel logo/i);
    expect(logo).toBeInTheDocument();
  });

  it('displays the tagline', () => {
    render(<App />);
    expect(screen.getByText(/groomed\. poured\. perfected\./i)).toBeInTheDocument();
  });

  it('displays the coming soon message', () => {
    render(<App />);
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });

  it('displays Tampa location information', () => {
    render(<App />);
    expect(screen.getByText(/tampa's premier barbershop meets neighborhood bar/i)).toBeInTheDocument();
    expect(screen.getByText(/channelside district/i)).toBeInTheDocument();
  });

  it('displays the hero background image', () => {
    render(<App />);
    const heroImage = screen.getByAltText(/blade and barrel interior/i);
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('src', '/images/hero.jpg');
  });

  it('displays the Grand Opening 2025 message', () => {
    render(<App />);
    expect(screen.getByText(/grand opening 2025/i)).toBeInTheDocument();
  });
});
