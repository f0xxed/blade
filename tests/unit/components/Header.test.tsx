import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Header } from '@/components/Header';

// Mock the hooks
vi.mock('@/hooks/useScrollToSection', () => ({
  useScrollToSection: () => vi.fn(),
}));

vi.mock('@/hooks/useScrollPosition', () => ({
  useScrollPosition: () => 0, // Default: not scrolled
}));

describe('Header Component', () => {
  const mockBookingClick = vi.fn();

  beforeEach(() => {
    mockBookingClick.mockClear();
  });

  it('renders navigation links', () => {
    render(<Header onBookingClick={mockBookingClick} />);

    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders BLADE AND BARREL logo', () => {
    render(<Header onBookingClick={mockBookingClick} />);

    expect(screen.getByText('BLADE AND BARREL')).toBeInTheDocument();
  });

  it('renders Book Appointment button', () => {
    render(<Header onBookingClick={mockBookingClick} />);

    const buttons = screen.getAllByText('Book Appointment');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('calls onBookingClick when Book Appointment button is clicked', () => {
    render(<Header onBookingClick={mockBookingClick} />);

    // Click the desktop button (first one found)
    const buttons = screen.getAllByText('Book Appointment');
    fireEvent.click(buttons[0]);

    expect(mockBookingClick).toHaveBeenCalledTimes(1);
  });

  it('navigation links have correct href values', () => {
    render(<Header onBookingClick={mockBookingClick} />);

    expect(screen.getAllByRole('link', { name: 'Services' })[0]).toHaveAttribute('href', '#services');
    expect(screen.getAllByRole('link', { name: 'About' })[0]).toHaveAttribute('href', '#about');
    expect(screen.getAllByRole('link', { name: 'Location' })[0]).toHaveAttribute('href', '#location');
    expect(screen.getAllByRole('link', { name: 'Contact' })[0]).toHaveAttribute('href', '#contact');
  });

  it('renders mobile menu button', () => {
    render(<Header onBookingClick={mockBookingClick} />);

    const menuButton = screen.getByRole('button', { name: /open menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('opens mobile menu when hamburger button is clicked', () => {
    render(<Header onBookingClick={mockBookingClick} />);

    const menuButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(menuButton);

    // Mobile menu should now be visible
    expect(screen.getByRole('dialog', { name: /mobile navigation menu/i })).toBeInTheDocument();
  });

  it('closes mobile menu when close button is clicked', async () => {
    render(<Header onBookingClick={mockBookingClick} />);

    // Open menu
    const openButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(openButton);

    // Close menu
    const closeButtons = screen.getAllByRole('button', { name: /close menu/i });
    fireEvent.click(closeButtons[0]);

    // Wait for menu to be removed (AnimatePresence exit animation)
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('has semantic HTML with header and nav elements', () => {
    const { container } = render(<Header onBookingClick={mockBookingClick} />);

    expect(container.querySelector('header')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  });
});
