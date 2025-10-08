import { motion } from 'framer-motion';

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.jpg"
          alt="Blade and Barrel interior"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-slate-900/70"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.img
          src="/images/logo.svg"
          alt="Blade and Barrel Logo"
          className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-amber-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Groomed. Poured. Perfected.
        </motion.h1>

        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl mb-6 text-slate-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Coming Soon - Grand Opening 2025
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-slate-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Tampa's premier barbershop meets neighborhood bar. Channelside District.
        </motion.p>
      </div>
    </motion.div>
  );
}

export default App;
