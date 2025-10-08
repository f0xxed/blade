import { motion } from 'framer-motion';

// Content constants for easier maintenance
const CONTENT = {
  logo: {
    src: '/images/logo.svg',
    alt: 'Blade and Barrel Logo',
  },
  hero: {
    backgroundImage: '/images/hero.jpg',
  },
  tagline: 'Groomed. Poured. Perfected.',
  comingSoon: 'Coming Soon - Grand Opening 2025',
  description: "Tampa's premier barbershop meets neighborhood bar. Channelside District.",
} as const;

// Animation configuration
const ANIMATIONS = {
  container: { duration: 0.8 },
  logo: { duration: 0.8, delay: 0.2 },
  tagline: { duration: 0.8, delay: 0.4 },
  comingSoon: { duration: 0.8, delay: 0.6 },
  description: { duration: 0.8, delay: 0.8 },
} as const;

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={ANIMATIONS.container}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      role="main"
      aria-label="Coming soon landing page"
    >
      {/* Hero background image */}
      <div className="absolute inset-0 z-0" role="img" aria-label="Barbershop and bar interior">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${CONTENT.hero.backgroundImage})` }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-slate-900/70" aria-hidden="true"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.img
          src={CONTENT.logo.src}
          alt={CONTENT.logo.alt}
          className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={ANIMATIONS.logo}
        />

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-amber-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={ANIMATIONS.tagline}
        >
          {CONTENT.tagline}
        </motion.h1>

        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl mb-6 text-slate-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={ANIMATIONS.comingSoon}
        >
          {CONTENT.comingSoon}
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-slate-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={ANIMATIONS.description}
        >
          {CONTENT.description}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default App;
