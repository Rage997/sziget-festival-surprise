import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface SurpriseButtonProps {
  onClick: () => void;
  isRevealed: boolean;
}

export default function SurpriseButton({ onClick, isRevealed }: SurpriseButtonProps) {
  if (isRevealed) return null;

  return (
    <motion.div
      className="relative w-full flex justify-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.button
        onClick={onClick}
        className="relative px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-2xl font-bold text-white rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 overflow-hidden group w-full max-w-sm sm:max-w-none sm:w-auto touch-manipulation border border-emerald-400/30"
        animate={{
          boxShadow: [
            "0 0 30px rgba(16, 185, 129, 0.4)",
            "0 0 50px rgba(20, 184, 166, 0.5)",
            "0 0 30px rgba(34, 197, 94, 0.4)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <span className="relative flex items-center justify-center gap-2 sm:gap-3 drop-shadow-lg">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
          <span className="whitespace-nowrap">Surprise! Click me!</span>
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
        </span>
      </motion.button>
      
      <motion.div
        className="absolute -inset-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 rounded-full opacity-15 blur-xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}