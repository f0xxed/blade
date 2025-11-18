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

/**
 * Service Package Interface
 * Represents a monthly grooming subscription package
 */
export interface ServicePackage {
  id: string;                    // Unique identifier
  name: string;                  // Package name
  price: number;                 // Monthly price in USD
  includes: string[];            // Array of included services per month
  tagline?: string;              // Optional tagline/subtitle
  additionalNote?: string;       // Optional additional information
  isSpecial?: boolean;           // Special/featured package flag
}
