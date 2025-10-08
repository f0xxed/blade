import type { ServiceOffering } from '@/types';

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
