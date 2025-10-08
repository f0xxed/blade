import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import * as fs from 'fs';
import * as path from 'path';

describe('SEO Meta Tags - AC9 Validation', () => {
  let dom: JSDOM;
  let document: Document;

  beforeEach(() => {
    // Read the index.html file
    const htmlPath = path.resolve(__dirname, '../../../index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Parse HTML with JSDOM
    dom = new JSDOM(htmlContent);
    document = dom.window.document;
  });

  it('has proper page title', () => {
    const title = document.querySelector('title');
    expect(title).toBeTruthy();
    expect(title?.textContent).toContain('Blade and Barrel');
    expect(title?.textContent).toContain('Coming Soon');
  });

  it('has meta description tag', () => {
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toBeTruthy();
    expect(metaDescription?.getAttribute('content')).toContain('Tampa');
    expect(metaDescription?.getAttribute('content')).toContain('barbershop');
  });

  it('has viewport meta tag for responsive design', () => {
    const viewport = document.querySelector('meta[name="viewport"]');
    expect(viewport).toBeTruthy();
    expect(viewport?.getAttribute('content')).toBe('width=device-width, initial-scale=1.0');
  });

  describe('Open Graph Tags', () => {
    it('has og:type meta tag', () => {
      const ogType = document.querySelector('meta[property="og:type"]');
      expect(ogType).toBeTruthy();
      expect(ogType?.getAttribute('content')).toBe('website');
    });

    it('has og:url meta tag', () => {
      const ogUrl = document.querySelector('meta[property="og:url"]');
      expect(ogUrl).toBeTruthy();
      expect(ogUrl?.getAttribute('content')).toBe('https://bladeandbarrel.com');
    });

    it('has og:title meta tag', () => {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      expect(ogTitle).toBeTruthy();
      expect(ogTitle?.getAttribute('content')).toContain('Blade and Barrel');
    });

    it('has og:description meta tag', () => {
      const ogDescription = document.querySelector('meta[property="og:description"]');
      expect(ogDescription).toBeTruthy();
      expect(ogDescription?.getAttribute('content')).toContain('Tampa');
    });

    it('has og:image meta tag', () => {
      const ogImage = document.querySelector('meta[property="og:image"]');
      expect(ogImage).toBeTruthy();
      expect(ogImage?.getAttribute('content')).toContain('https://bladeandbarrel.com');
      expect(ogImage?.getAttribute('content')).toContain('hero.jpg');
    });
  });

  describe('Twitter Card Tags', () => {
    it('has twitter:card meta tag', () => {
      const twitterCard = document.querySelector('meta[property="twitter:card"]');
      expect(twitterCard).toBeTruthy();
      expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');
    });

    it('has twitter:url meta tag', () => {
      const twitterUrl = document.querySelector('meta[property="twitter:url"]');
      expect(twitterUrl).toBeTruthy();
      expect(twitterUrl?.getAttribute('content')).toBe('https://bladeandbarrel.com');
    });

    it('has twitter:title meta tag', () => {
      const twitterTitle = document.querySelector('meta[property="twitter:title"]');
      expect(twitterTitle).toBeTruthy();
      expect(twitterTitle?.getAttribute('content')).toContain('Blade and Barrel');
    });

    it('has twitter:description meta tag', () => {
      const twitterDesc = document.querySelector('meta[property="twitter:description"]');
      expect(twitterDesc).toBeTruthy();
      expect(twitterDesc?.getAttribute('content')).toContain('Tampa');
    });

    it('has twitter:image meta tag', () => {
      const twitterImage = document.querySelector('meta[property="twitter:image"]');
      expect(twitterImage).toBeTruthy();
      expect(twitterImage?.getAttribute('content')).toContain('https://bladeandbarrel.com');
    });
  });
});
