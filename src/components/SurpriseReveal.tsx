import { motion } from 'framer-motion';
import mapImage from '../assets/images/map2.png';

interface SurpriseRevealProps {
  isVisible: boolean;
}

export default function SurpriseReveal({ isVisible }: SurpriseRevealProps) {
  if (!isVisible) return null;

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

 return (
  <motion.div
    className="text-center max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center space-y-10"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.div variants={itemVariants}>
      <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-emerald-300 via-teal-300 to-green-300 bg-clip-text text-transparent leading-tight drop-shadow-2xl">
        SURPRISE!
      </h1>
    </motion.div>

    <motion.div
      variants={itemVariants}
      className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-emerald-300/20 shadow-2xl"
    >
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
        We're going to
      </h2>
      <div className="text-3xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-amber-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
        SZIGET FESTIVAL
      </div>
      <p className="text-xl sm:text-2xl md:text-3xl text-emerald-50 mb-6 sm:mb-4 leading-relaxed drop-shadow-lg">
        With our own camper! 🚐✨
      </p>
    </motion.div>

    {/* Map image */}
    <motion.div
      variants={itemVariants}
      className="relative w-full max-w-3xl aspect-[4/3] mx-auto overflow-hidden rounded-3xl border border-emerald-300/30 shadow-2xl"
    >
      <img
        src={mapImage}
        alt="Map of the trip"
        className="w-full h-full object-cover rounded-3xl map-fade-mask"
      />
    </motion.div>

    <motion.div
      variants={itemVariants}
      className="text-lg sm:text-xl md:text-2xl text-emerald-50 leading-relaxed drop-shadow-lg"
    >
      <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-300 to-emerald-300 bg-clip-text text-transparent drop-shadow-xl">
        I can't wait to share this adventure with you!
      </p>
    </motion.div>
  </motion.div>
);

}
