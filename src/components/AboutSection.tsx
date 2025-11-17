interface AboutSectionProps {
  className?: string;
}

export function AboutSection({ className }: AboutSectionProps = {}) {
  return (
    <section
      id="about"
      className={`py-12 md:py-20 px-4 md:px-8 bg-[#E8DCC8] ${className || ''}`}
      aria-label="About Blade and Barrel"
    >
      <div className="max-w-7xl mx-auto">
        {/* Two-column grid layout: image left, text right on desktop; stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image content (left on desktop, top on mobile) */}
          <div className="relative">
            <img
              src="/images/Barbearia industrial.jpg"
              alt="Blade and Barrel interior showcasing industrial-modern barbershop atmosphere with exposed brick and premium fixtures"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
              loading="lazy"
            />
          </div>

          {/* Text content (right on desktop, bottom on mobile) */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#1A1A1A]">
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
            </div>
          </div>
        </div>

        {/* Founder bio section */}
        <div className="mt-16 p-16 bg-[#2C3539] rounded-lg">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            {/* Founder photo */}
            <div className="flex-shrink-0">
              <img
                src="/images/rich.jpeg"
                alt="Rich Keeley, Founder of Blade and Barrel"
                className="w-72 h-72 rounded-full object-cover shadow-lg"
                loading="lazy"
              />
            </div>

            {/* Founder bio text */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-3 text-[#B8935E]">
                Rich Keeley
              </h3>
              <p className="text-sm uppercase tracking-wider mb-4 text-[#D4C4B0]">
                Founder & Visionary
              </p>
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-[#E8DCC8]">
                  Rich Keeley is an entrepreneur with a passion for creating authentic community
                  spaces that bring people together. Drawing inspiration from innovative hybrid
                  concepts and his own experiences in Tampa's vibrant Channelside district, Rich
                  founded Blade and Barrel to fill a unique niche—a place where traditional
                  barbershop craftsmanship meets modern social culture. His vision extends beyond
                  a single location, with plans to build a network of Blade and Barrel establishments
                  that serve as "third places" for discerning gentlemen across multiple markets.
                </p>
                <p className="text-base leading-relaxed text-[#E8DCC8]">
                  Founded by entrepreneur Rich Keeley, Blade and Barrel represents a bold vision
                  for modern men's grooming. Inspired by the hybrid barbershop-bar model and driven
                  by a passion for authentic community spaces, Rich created a destination that honors
                  traditional barbering craftsmanship while embracing contemporary social culture.
                  With aspirations to expand this unique concept to multiple locations, Blade and
                  Barrel is poised to become the premier destination for discerning gentlemen who
                  value quality, community, and craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
