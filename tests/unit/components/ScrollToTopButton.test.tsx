import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';

// Mock the useScrollPosition hook
vi.mock('@/hooks/useScrollPosition', () => ({
  useScrollPosition: vi.fn(),
}));

import { useScrollPosition } from '@/hooks/useScrollPosition';

describe('ScrollToTopButton Component', () => {
  it('does not render when scroll position is less than 400px', () => {
    (useScrollPosition as ReturnType<typeof vi.fn>).mockReturnValue(300);

    render(<ScrollToTopButton />);

    expect(screen.queryByRole('button', { name: /scroll to top/i })).not.toBeInTheDocument();
  });

  it('renders when scroll position is 400px or more', () => {
    (useScrollPosition as ReturnType<typeof vi.fn>).mockReturnValue(401);

    render(<ScrollToTopButton />);

    expect(screen.getByRole('button', { name: /scroll to top/i })).toBeInTheDocument();
  });

  it('renders when scroll position is greater than 400px', () => {
    (useScrollPosition as ReturnType<typeof vi.fn>).mockReturnValue(500);

    render(<ScrollToTopButton />);

    expect(screen.getByRole('button', { name: /scroll to top/i })).toBeInTheDocument();
  });

  it('scrolls to top when button is clicked', () => {
    (useScrollPosition as ReturnType<typeof vi.fn>).mockReturnValue(500);

    // Mock window.scrollTo
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    render(<ScrollToTopButton />);

    const button = screen.getByRole('button', { name: /scroll to top/i });
    fireEvent.click(button);

    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });

    scrollToSpy.mockRestore();
  });

  it('has proper ARIA label', () => {
    (useScrollPosition as ReturnType<typeof vi.fn>).mockReturnValue(500);

    render(<ScrollToTopButton />);

    const button = screen.getByRole('button', { name: /scroll to top/i });
    expect(button).toHaveAttribute('aria-label', 'Scroll to top');
  });

  it('has minimum 48x48px touch target size', () => {
    (useScrollPosition as ReturnType<typeof vi.fn>).mockReturnValue(500);

    render(<ScrollToTopButton />);

    const button = screen.getByRole('button', { name: /scroll to top/i });

    // Check for w-12 h-12 classes (48px x 48px)
    expect(button).toHaveClass('w-12');
    expect(button).toHaveClass('h-12');
  });
});
