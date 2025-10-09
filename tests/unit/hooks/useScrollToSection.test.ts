import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useScrollToSection } from '@/hooks/useScrollToSection';

describe('useScrollToSection Hook', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';

    // Mock window.scrollTo
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  it('scrolls to element with correct offset', () => {
    // Create a test element
    const testElement = document.createElement('div');
    testElement.id = 'test-section';
    document.body.appendChild(testElement);

    // Mock getBoundingClientRect
    vi.spyOn(testElement, 'getBoundingClientRect').mockReturnValue({
      top: 500,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });

    const { result } = renderHook(() => useScrollToSection());
    const scrollToSection = result.current;

    scrollToSection('test-section');

    // Header height is 80px, so expected scroll position is:
    // getBoundingClientRect().top + window.scrollY - 80
    // = 500 + 0 - 80 = 420
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 420,
      behavior: 'smooth',
    });
  });

  it('does nothing when element does not exist', () => {
    const { result } = renderHook(() => useScrollToSection());
    const scrollToSection = result.current;

    scrollToSection('non-existent-section');

    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('uses smooth scroll behavior', () => {
    const testElement = document.createElement('div');
    testElement.id = 'test-section';
    document.body.appendChild(testElement);

    vi.spyOn(testElement, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });

    const { result } = renderHook(() => useScrollToSection());
    const scrollToSection = result.current;

    scrollToSection('test-section');

    expect(window.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({
        behavior: 'smooth',
      })
    );
  });
});
