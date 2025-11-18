import type { ServiceOffering, ServicePackage } from '@/types';

/**
 * Available barbershop services
 * Static data for MVP - future enhancement could fetch from booking platform API
 */
export const SERVICES: ServiceOffering[] = [
  {
    id: 'haircut',
    name: 'Haircut',
    description: 'Precision cut tailored to your style. Includes complimentary draft beer and expert consultation.',
    price: 35,
    duration: 45
  },
  {
    id: 'beard-trim',
    name: 'Beard Trim',
    description: 'Expert beard sculpting and grooming to keep you looking sharp.',
    price: 25,
    duration: 30
  },
  {
    id: 'hot-towel-shave',
    name: 'Hot Towel Shave',
    description: 'Traditional straight razor shave experience with hot towels and premium products.',
    price: 45,
    duration: 60
  }
];

/**
 * Monthly grooming subscription packages
 * Designed for gentlemen who value consistency, convenience, and savings
 */
export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'gentlemans-essential',
    name: "The Gentleman's Essential",
    price: 125,
    includes: [
      '2 Premium Haircuts',
      'Unlimited Neck Trims (Clean-ups between cuts)'
    ]
  },
  {
    id: 'dapper-gentleman',
    name: 'The Dapper Gentleman',
    price: 145,
    includes: [
      '3 Premium Haircuts',
      '1 Beard Trim',
      '1 Mid-month Neck Trim Clean-up'
    ]
  },
  {
    id: 'distinguished-gentleman',
    name: 'The Distinguished Gentleman',
    price: 175,
    includes: [
      '4 Premium Haircuts',
      '2 Beard Trims'
    ]
  },
  {
    id: 'midday-refresher',
    name: 'The Midday Refresher (Lunch Special)',
    price: 60,
    tagline: 'Need a quick and stylish reset during your workday?',
    includes: [
      "Gentleman's Haircut",
      'Lunch of your choice',
      'Beverage of your choice (Beer or Soda)'
    ],
    additionalNote: 'Add a Beard Trim for an additional $25.',
    isSpecial: true
  }
];
