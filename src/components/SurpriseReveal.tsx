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
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent leading-tight">
          SURPRISE!
        </h1>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 border border-white/20"
      >
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          We're going to
        </h2>
        <div className="text-3xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
          SZIGET FESTIVAL
        </div>
        <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
          In our very own camper! 🚐✨
        </p>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8"
      >
        <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
          <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mx-auto mb-2 sm:mb-3" />
          <h3 className="text-white font-bold text-sm sm:text-lg mb-1 sm:mb-2">Location</h3>
          <p className="text-white/80 text-xs sm:text-base">Budapest, Hungary</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
          <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mx-auto mb-2 sm:mb-3" />
          <h3 className="text-white font-bold text-sm sm:text-lg mb-1 sm:mb-2">When</h3>
          <p className="text-white/80 text-xs sm:text-base">Summer 2025</p>
        </div>
        
        <div className="bg-gradient-to-br from-pink-500/20 to-red-500/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
          <Users className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400 mx-auto mb-2 sm:mb-3" />
          <h3 className="text-white font-bold text-sm sm:text-lg mb-1 sm:mb-2">Who</h3>
          <p className="text-white/80 text-xs sm:text-base">Just you & me! 💕</p>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
          <Tent className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 mx-auto mb-2 sm:mb-3" />
          <h3 className="text-white font-bold text-sm sm:text-lg mb-1 sm:mb-2">How</h3>
          <p className="text-white/80 text-xs sm:text-base">Camper adventure!</p>
        </div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed space-y-3 sm:space-y-4"
      >
        <p>
          Get ready for the most amazing music festival experience! 🎵
        </p>
        <p>
          We'll have our own cozy camper, incredible music, and unforgettable memories together! 
        </p>
        <p className="text-xl sm:text-2xl font-bold text-yellow-400">
          I can't wait to share this adventure with you! 💖
        </p>
      </motion.div>
    </motion.div>
  );
}