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
      className="mt-16 max-w-4xl mx-auto px-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Navigation className="w-8 h-8 text-blue-400" />
            Our Destination
            <Navigation className="w-8 h-8 text-blue-400" />
          </h3>
          <p className="text-xl text-white/80">
            Sziget Island, Budapest - The Island of Freedom! 🏝️
          </p>
        </div>

        <div className="relative bg-white/5 rounded-2xl p-6 mb-6">
          <div className="aspect-video bg-gradient-to-br from-blue-900 to-green-900 rounded-xl relative overflow-hidden">
            {/* Simplified map representation */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg"
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
                  <MapPin className="w-5 h-5" />
                  Sziget Festival
                </motion.div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-6 right-8 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-white/60 text-sm mb-2">
              Click to view on Google Maps
            </p>
            <a
              href="https://maps.google.com/?q=Sziget+Festival,+Budapest,+Hungary"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors duration-200"
            >
              <MapPin className="w-4 h-4" />
              View Full Map
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="text-white font-bold mb-2">🌍 Country</h4>
            <p className="text-white/80">Hungary</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="text-white font-bold mb-2">🏙️ City</h4>
            <p className="text-white/80">Budapest</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="text-white font-bold mb-2">🏝️ Location</h4>
            <p className="text-white/80">Óbudai-sziget</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}