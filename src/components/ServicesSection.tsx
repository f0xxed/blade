import { motion, useReducedMotion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SERVICES } from '@/constants/services';

/**
 * ServicesSection Component
 *
 * Displays barbershop services with pricing in a responsive grid layout.
 * Features scroll-triggered animations and complementary offerings information.
 */
export function ServicesSection() {
  const shouldReduceMotion = useReducedMotion();

  // Container animation - fades in when scrolled into view
  const containerAnimation = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.6, ease: 'easeOut' }
      };

  // Individual card animation with stagger effect
  const getCardAnimation = (index: number) => {
    if (shouldReduceMotion) return {};

    return {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.3 },
      transition: {
        duration: 0.5,
        delay: index * 0.1, // Stagger delay: 100ms between each card
        ease: 'easeOut'
      }
    };
  };

  return (
    <motion.section
      {...containerAnimation}
      className="py-16 md:py-24 px-4 md:px-8"
      aria-label="Services section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900">
          Our Services
        </h2>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              {...getCardAnimation(index)}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-slate-900">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Service Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Price and Duration */}
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-amber-500">
                      ${service.price}
                    </span>
                    {service.duration && (
                      <span className="text-sm text-gray-500">
                        {service.duration} min
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Complementary Offerings Section */}
        <div className="mt-12 p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-100 text-center">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            More Than Just a Haircut
          </h3>
          <p className="text-lg text-gray-700 mb-2">
            All barbershop services include a <span className="font-semibold text-amber-700">complimentary draft beer</span> to enhance your experience.
          </p>
          <p className="text-gray-600">
            Our bar is open for daytime beverages and transforms into an evening social atmosphere.
            Grab a drink, relax, and enjoy the unique Blade and Barrel experience.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
