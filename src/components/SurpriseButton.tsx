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
      className="relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.button
        onClick={onClick}
        className="relative px-12 py-6 text-2xl font-bold text-white rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 overflow-hidden group"
        animate={{
          boxShadow: [
            "0 0 20px rgba(255, 107, 107, 0.3)",
            "0 0 40px rgba(255, 107, 107, 0.5)",
            "0 0 20px rgba(255, 107, 107, 0.3)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <span className="relative flex items-center gap-3">
          <Sparkles className="w-6 h-6" />
          Surprise! Click me!
          <Sparkles className="w-6 h-6" />
        </span>
      </motion.button>
      
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-full opacity-30 blur-lg -z-10"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}