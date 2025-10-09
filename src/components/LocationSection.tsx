import { motion, useReducedMotion } from 'framer-motion';

interface LocationSectionProps {
  className?: string;
}

export function LocationSection({ className }: LocationSectionProps = {}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="location"
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className={`py-12 md:py-16 px-4 md:px-8 bg-[#2C3539] ${className || ''}`}
      aria-label="Location and Hours"
    >
      <div className="max-w-6xl mx-auto">
        {/* Top section: Visit Us, Hours, Contact - 3 equal columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Visit Us - Column 1 */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#E8DCC8]">Visit Us</h2>
            <address className="not-italic">
              <p className="text-base font-semibold mb-1 text-[#E8DCC8]">
                Blade and Barrel
              </p>
              <p className="text-sm md:text-base text-[#E8DCC8]">
                232 N 11th St
              </p>
              <p className="text-sm md:text-base text-[#E8DCC8] mb-3">
                Tampa, FL 33602
              </p>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=232+N+11th+St+Tampa+FL+33602"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 text-sm bg-[#B8935E] text-[#1A1A1A] font-semibold rounded hover:bg-[#8B6F47] transition-colors duration-200"
              >
                Get Directions
              </a>
            </address>
          </motion.div>

          {/* Hours - Column 2 */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg md:text-xl font-semibold text-[#E8DCC8] mb-2">Hours</h3>
            <div className="space-y-0.5">
              <p className="text-sm md:text-base text-[#E8DCC8]">
                <span className="font-semibold">Barbershop:</span> Mon-Fri 9am-6pm, Sat 10am-5pm
              </p>
              <p className="text-sm md:text-base text-[#E8DCC8]">
                <span className="font-semibold">Bar:</span> Mon-Sat 4pm-11pm
              </p>
              <p className="text-sm md:text-base text-[#E8DCC8]">
                Sunday: Closed
              </p>
            </div>
          </motion.div>

          {/* Contact - Column 3 */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg md:text-xl font-semibold text-[#E8DCC8] mb-2">Contact</h3>
            <div className="space-y-1">
              <p className="text-sm md:text-base">
                <span className="text-[#E8DCC8]">Phone: </span>
                <a
                  href="tel:+18138741508"
                  className="text-[#E8DCC8] hover:text-[#B8935E] transition-colors duration-200 underline"
                >
                  813-874-1508
                </a>
              </p>
              <p className="text-sm md:text-base">
                <span className="text-[#E8DCC8]">Email: </span>
                <a
                  href="mailto:help@bladeandbarrel.com"
                  className="text-[#E8DCC8] hover:text-[#B8935E] transition-colors duration-200 underline"
                >
                  help@bladeandbarrel.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Google Maps */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-4"
        >
          <div className="aspect-video w-full rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3523.7629839284844!2d-82.45185892404308!3d27.94843197579058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2c4f3fc0b0e39%3A0x8e3c3e6f6b0e5c3a!2s232%20N%2011th%20St%2C%20Tampa%2C%20FL%2033602!5e0!3m2!1sen!2sus!4v1696000000000!5m2!1sen!2sus"
              title="Blade and Barrel location map"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        {/* Parking - Below Map */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-lg md:text-xl font-semibold text-[#E8DCC8] mb-2">Parking</h3>
          <p className="text-sm md:text-base text-[#E8DCC8]">
            Street parking available on N 11th Street. Nearby public parking garage located at Channelside Bay Plaza.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
