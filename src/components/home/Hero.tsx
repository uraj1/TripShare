import { ArrowRight } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <div className="relative h-[650px] flex items-center bg-black" id="hero">
      <img
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
        alt="Travel destination"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/70" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative container mx-auto px-6 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-yellow-400 mb-6 drop-shadow-lg">
          Travel Smarter with <br /> <span className="text-yellow-300">TripWise</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-2xl mb-6 max-w-3xl mx-auto">
          Your ultimate travel companion for seamless planning and unforgettable adventures.
        </p>
        <p className="text-yellow-200 italic text-lg mb-8">
          "The world is a book, and those who do not travel read only one page." – Augustine
        </p>
        <ScrollLink to="planning" smooth={true} duration={500} offset={-100}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-black px-10 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-yellow-300 transition-colors shadow-lg mx-auto"
          >
            Start Planning
            <ArrowRight className="h-6 w-6" />
          </motion.button>
        </ScrollLink>
      </motion.div>
    </div>
  );
}
