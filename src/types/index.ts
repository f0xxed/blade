/**
 * Type definitions for Blade and Barrel application
 */

/**
 * Service Offering Interface
 * Represents a barbershop service with pricing and details
 */
export interface ServiceOffering {
  id: string;           // Unique identifier (slug: 'haircut', 'beard-trim')
  name: string;         // Display name
  description: string;  // Brief 1-2 sentence description
  price: number;        // Price in USD
  duration?: number;    // Duration in minutes (optional)
}
