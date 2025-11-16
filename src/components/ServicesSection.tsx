import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SERVICES } from '@/constants/services';
import { FancyMobileHeading } from '@/components/ui/FancyMobileHeading';

/**
 * ServicesSection Component
 *
 * Displays barbershop services with pricing in a responsive grid layout.
 * Features scroll-triggered animations and complementary offerings information.
 */
export function ServicesSection() {
  return (
    <section
      id="services"
      className="py-16 md:py-20 px-4 md:px-8"
      aria-label="Services section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-12">
          {/* Fancy heading for mobile/tablet only - centered */}
          <div className="lg:hidden">
            <FancyMobileHeading
              words={['Our', 'Services']}
              textColors={['text-amber-500', 'text-amber-600']}
              lineColor="bg-amber-500/50"
              size="large"
              align="center"
            />
          </div>

          {/* Regular heading for desktop */}
          <h2 className="hidden lg:block text-3xl md:text-5xl font-bold text-center text-slate-900">
            Our Services
          </h2>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {SERVICES.map((service) => (
            <div key={service.id}>
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
            </div>
          ))}
        </div>

        {/* Complementary Offerings Section */}
        <div className="mt-12 p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-100 text-center">
          {/* Fancy heading for mobile/tablet only */}
          <div className="lg:hidden mb-4">
            <FancyMobileHeading
              words={['More Than', 'Just a', 'Haircut']}
              textColors={['text-amber-700', 'text-amber-600', 'text-amber-700']}
              lineColor="bg-amber-600/30"
              size="small"
              align="center"
              noIndent={true}
            />
          </div>

          {/* Regular heading for desktop */}
          <h3 className="hidden lg:block text-xl font-semibold text-slate-900 mb-4">
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
    </section>
  );
}
