import '@testing-library/jest-dom';

// Mock IntersectionObserver for Framer Motion tests
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve() {}
} as unknown as typeof IntersectionObserver;
