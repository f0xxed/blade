import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useScrollPosition } from '@/hooks/useScrollPosition';

describe('useScrollPosition Hook', () => {
  beforeEach(() => {
    // Reset scrollY to 0
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns current scroll Y position', () => {
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true, configurable: true });

    const { result } = renderHook(() => useScrollPosition());

    expect(result.current).toBe(100);
  });

  it('returns 0 when page is at top', () => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });

    const { result } = renderHook(() => useScrollPosition());

    expect(result.current).toBe(0);
  });

  it('updates scroll position on scroll event', () => {
    const { result, rerender } = renderHook(() => useScrollPosition());

    expect(result.current).toBe(0);

    // Simulate scroll to 200px
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true, configurable: true });
    window.dispatchEvent(new Event('scroll'));

    rerender();

    expect(result.current).toBe(200);
  });

  it('cleans up scroll event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useScrollPosition());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('adds passive event listener for performance', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

    renderHook(() => useScrollPosition());

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    );
  });
});
