/**
 * useAnalytics Hook
 *
 * Provides analytics tracking functionality for the application.
 * This is a placeholder implementation that logs events to console.
 *
 * Future: Will integrate with Google Analytics 4 (gtag.js) in Epic 3.
 *
 * @returns Object with trackEvent function
 */

export interface AnalyticsEvent {
  eventCategory?: string;
  eventLabel?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
}

export function useAnalytics() {
  /**
   * Track an analytics event
   *
   * @param eventName - Name of the event (e.g., 'booking_initiated', 'contact_form_submitted')
   * @param params - Additional event parameters (eventCategory, eventLabel, etc.)
   */
  const trackEvent = (eventName: string, params?: AnalyticsEvent) => {
    // Placeholder implementation - logs to console
    // Future: Replace with gtag('event', eventName, params) when GA4 is configured
    console.log('[Analytics Event]', eventName, params);

    // When GA4 is integrated in Epic 3, this will become:
    // if (typeof window !== 'undefined' && window.gtag) {
    //   window.gtag('event', eventName, params);
    // }
  };

  return { trackEvent };
}
