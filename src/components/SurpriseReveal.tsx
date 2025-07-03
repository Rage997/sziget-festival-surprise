import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Tent } from 'lucide-react';

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
      className="text-center max-w-4xl mx-auto px-4 sm:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-emerald-300 via-teal-300 to-green-300 bg-clip-text text-transparent leading-tight drop-shadow-2xl">
          SURPRISE!
        </h1>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 border border-emerald-300/20 shadow-2xl"
      >
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
          We're going to
        </h2>
        <div className="text-3xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-amber-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
          SZIGET FESTIVAL
        </div>
        <p className="text-xl sm:text-2xl md:text-3xl text-emerald-50 mb-6 sm:mb-8 leading-relaxed drop-shadow-lg">
          In our very own camper! 🚐✨
        </p>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8"
      >
        <div className="bg-gradient-to-br from-emerald-800/60 to-teal-800/60 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-emerald-400/30 shadow-xl">
          <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-300 mx-auto mb-2 sm:mb-3 drop-shadow-lg" />
          <h3 className="text-white font-bold text-sm sm:text-lg mb-1 sm:mb-2 drop-shadow-sm">Location</h3>
          <p className="text-emerald-100 text-xs sm:text-base">Budapest, Hungary</p>
        </div>
        
        <div className="bg-gradient-to-br from-teal-800/60 to-green-800/60 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-teal-400/30 shadow-xl">
          <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-amber-300 mx-auto mb-2 sm:mb-3 drop-shadow-lg" />
          <h3 className="text-white font-bold text-sm sm:text-lg mb-1 sm:mb-2 drop-shadow-sm">When</h3>
          <p className="text-emerald-100 text-xs sm:text-base">Summer 2025</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-800/60 to-emerald-800/60 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-400/30 shadow-xl">
          <Users className="w-6 h-6 sm:w-8 sm:h-8 text-rose-300 mx-auto mb-2 sm:mb-3 drop-shadow-lg" />
          <h3 className="text-white font-bold text-sm sm:text-lg mb-1 sm:mb-2 drop-shadow-sm">Who</h3>
          <p className="text-emerald-100 text-xs sm:text-base">Just you & me! 💕</p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-800/60 to-emerald-800/60 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-400/30 shadow-xl">
          <Tent className="w-6 h-6 sm:w-8 sm:h-8 text-sage-300 mx-auto mb-2 sm:mb-3 drop-shadow-lg" />
          <h3 className="text-white font-bold text-sm sm:text-lg mb-1 sm:mb-2 drop-shadow-sm">How</h3>
          <p className="text-emerald-100 text-xs sm:text-base">Camper adventure!</p>
        </div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="text-lg sm:text-xl md:text-2xl text-emerald-50 leading-relaxed space-y-3 sm:space-y-4 drop-shadow-lg"
      >
        <p>
          Get ready for the most amazing music festival experience! 🎵
        </p>
        <p>
          We'll have our own cozy camper, incredible music, and unforgettable memories together! 
        </p>
        <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-300 to-emerald-300 bg-clip-text text-transparent drop-shadow-xl">
          I can't wait to share this adventure with you! 💖
        </p>
      </motion.div>
    </motion.div>
  );
}