import { motion, useReducedMotion } from 'framer-motion';

interface AboutSectionProps {
  className?: string;
}

export function AboutSection({ className }: AboutSectionProps = {}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className={`py-16 md:py-24 px-4 md:px-8 bg-[#E8DCC8] ${className || ''}`}
      aria-label="About Blade and Barrel"
    >
      <div className="max-w-7xl mx-auto">
        {/* Two-column grid layout: text left, image right on desktop; stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content (left on desktop, top on mobile) */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1A1A1A]">
              Our Story
            </h2>

            {/* Story content */}
            <div className="space-y-4 text-base md:text-lg leading-relaxed text-[#1A1A1A]">
              <p>
                Welcome to Blade and Barrel, where exceptional grooming meets craft culture.
                We're redefining the barbershop experience by blending premium men's grooming
                services with the relaxed atmosphere of a neighborhood bar. Here, your haircut
                comes with a complimentary draft beer, and every visit is an opportunity to
                unwind, connect, and look your best.
              </p>
              <p>
                Our unique concept transforms throughout the day. By day, we're your go-to
                destination for precision haircuts, expert beard trims, and traditional hot towel
                shaves. As evening approaches, we transition into a vibrant community gathering
                spot where professionals and locals come together over craft beverages and
                conversation. It's grooming by day, neighborhood bar by night—creating a true
                "third place" in Tampa's Channelside district.
              </p>
              <p>
                Founded by entrepreneur Rich Keeley, Blade and Barrel represents a bold vision
                for modern men's grooming. Inspired by the hybrid barbershop-bar model and driven
                by a passion for authentic community spaces, Rich created a destination that honors
                traditional barbering craftsmanship while embracing contemporary social culture.
                With aspirations to expand this unique concept to multiple locations, Blade and
                Barrel is poised to become the premier destination for discerning gentlemen who
                value quality, community, and craftsmanship.
              </p>
            </div>
          </motion.div>

          {/* Image content (right on desktop, bottom on mobile) */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <img
              src="/images/Barbearia industrial.jpg"
              alt="Blade and Barrel interior showcasing industrial-modern barbershop atmosphere with exposed brick and premium fixtures"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Founder bio section */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 p-8 bg-[#2C3539] rounded-lg"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Founder photo */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-[#8B6F47] flex items-center justify-center text-[#E8DCC8] font-bold text-2xl overflow-hidden">
                {/* Placeholder for founder photo - will use actual image in Task 4 */}
                <span>RK</span>
              </div>
            </div>

            {/* Founder bio text */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-3 text-[#B8935E]">
                Rich Keeley
              </h3>
              <p className="text-sm uppercase tracking-wider mb-4 text-[#D4C4B0]">
                Founder & Visionary
              </p>
              <p className="text-base leading-relaxed text-[#E8DCC8]">
                Rich Keeley is an entrepreneur with a passion for creating authentic community
                spaces that bring people together. Drawing inspiration from innovative hybrid
                concepts and his own experiences in Tampa's vibrant Channelside district, Rich
                founded Blade and Barrel to fill a unique niche—a place where traditional
                barbershop craftsmanship meets modern social culture. His vision extends beyond
                a single location, with plans to build a network of Blade and Barrel establishments
                that serve as "third places" for discerning gentlemen across multiple markets.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
