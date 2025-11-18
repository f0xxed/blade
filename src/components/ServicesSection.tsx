import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SERVICE_PACKAGES } from '@/constants/services';
import { Check } from 'lucide-react';

/**
 * ServicesSection Component
 *
 * Displays monthly grooming subscription packages with pricing.
 * Features accordion-based expandable package details for better UX.
 */
export function ServicesSection() {
  return (
    <section
      id="services"
      className="py-16 md:py-20 px-4 md:px-8 bg-gradient-to-b from-white to-slate-50"
      aria-label="Services section"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Become an Insider
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-2">
            Monthly Grooming Subscriptions
          </p>
          <p className="text-base text-gray-500 max-w-2xl mx-auto">
            Stop booking and start maintaining. Our monthly packages are designed for the gentleman
            who values consistency, convenience, and a consistently sharp image. Lock in your savings
            and enjoy a seamless grooming routine.
          </p>
        </div>

        {/* Packages Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {SERVICE_PACKAGES.map((pkg) => (
            <AccordionItem
              key={pkg.id}
              value={pkg.id}
              className={`border rounded-lg overflow-hidden transition-all ${
                pkg.isSpecial
                  ? 'border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50'
                  : 'border-gray-200 bg-white hover:border-amber-200'
              }`}
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full text-left gap-2">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-slate-900">
                      {pkg.name}
                    </h3>
                    {pkg.tagline && (
                      <p className="text-sm text-gray-600 mt-1">{pkg.tagline}</p>
                    )}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-amber-600">
                    ${pkg.price}
                    <span className="text-sm md:text-base font-normal text-gray-500 ml-1">
                      {pkg.isSpecial ? '/visit' : '/month'}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-6 pb-4">
                <div className="pt-2">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    {pkg.isSpecial ? 'Includes:' : 'Includes (Per Month):'}
                  </p>
                  <ul className="space-y-2">
                    {pkg.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {pkg.additionalNote && (
                    <p className="mt-4 text-sm text-gray-600 italic">
                      {pkg.additionalNote}
                    </p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Complementary Offerings Section */}
        <div className="mt-12 p-6 md:p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 text-center">
          <h3 className="text-xl font-semibold text-white mb-3">
            More Than Just a Haircut
          </h3>
          <p className="text-base md:text-lg text-gray-200 mb-2">
            All barbershop services include a{' '}
            <span className="font-semibold text-amber-400">complimentary draft beer</span>{' '}
            to enhance your experience.
          </p>
          <p className="text-sm md:text-base text-gray-400">
            Our bar is open for daytime beverages and transforms into an evening social atmosphere.
            Grab a drink, relax, and enjoy the unique Blade and Barrel experience.
          </p>
        </div>
      </div>
    </section>
  );
}
