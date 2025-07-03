import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

interface BudapestMapProps {
  isVisible: boolean;
}

export default function BudapestMap({ isVisible }: BudapestMapProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      className="mt-12 sm:mt-16 max-w-4xl mx-auto px-4 sm:px-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <Navigation className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 flex-shrink-0" />
            <span>Our Destination</span>
            <Navigation className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 flex-shrink-0" />
          </h3>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
            Sziget Island, Budapest - The Island of Freedom! 🏝️
          </p>
        </div>

        <div className="relative bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="aspect-video bg-gradient-to-br from-blue-900 to-green-900 rounded-lg sm:rounded-xl relative overflow-hidden">
            {/* Simplified map representation */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="flex items-center gap-1 sm:gap-2 bg-red-500 text-white px-3 sm:px-4 py-2 rounded-full font-bold shadow-lg text-sm sm:text-base"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 20px rgba(239, 68, 68, 0.3)",
                      "0 0 40px rgba(239, 68, 68, 0.6)",
                      "0 0 20px rgba(239, 68, 68, 0.3)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="whitespace-nowrap">Sziget Festival</span>
                </motion.div>
              </div>
              
              {/* Mobile-optimized decorative elements */}
              <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-2 sm:w-3 h-2 sm:h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-3 sm:bottom-6 right-4 sm:right-8 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-1/4 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="mt-3 sm:mt-4 text-center">
            <p className="text-white/60 text-xs sm:text-sm mb-2 sm:mb-3">
              Click to view on Google Maps
            </p>
            <a
              href="https://maps.google.com/?q=Sziget+Festival,+Budapest,+Hungary"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors duration-200 text-sm sm:text-base touch-manipulation"
            >
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>View Full Map</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
          <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <h4 className="text-white font-bold mb-1 sm:mb-2 text-sm sm:text-base">🌍 Country</h4>
            <p className="text-white/80 text-sm sm:text-base">Hungary</p>
          </div>
          <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <h4 className="text-white font-bold mb-1 sm:mb-2 text-sm sm:text-base">🏙️ City</h4>
            <p className="text-white/80 text-sm sm:text-base">Budapest</p>
          </div>
          <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <h4 className="text-white font-bold mb-1 sm:mb-2 text-sm sm:text-base">🏝️ Location</h4>
            <p className="text-white/80 text-sm sm:text-base">Óbudai-sziget</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}