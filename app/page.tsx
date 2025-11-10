'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaShield, FaRocket, FaGem, FaArrowRight, FaCrown, FaStar, FaAward, FaLock } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Luxury Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Luxury Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/6 w-4 h-4 bg-white/20 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/3 right-1/5 w-3 h-3 bg-white/15 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -25, 0],
            rotate: [0, 8, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 left-2/5 w-2 h-2 bg-white/10 rounded-full blur-sm"
        />
      </div>

      <div className="text-center space-y-12 max-w-6xl mx-auto px-4 relative z-10">
        {/* Enhanced Luxury UGARIT Title */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="luxury-badge glass-card px-6 py-3 rounded-full border border-white/20 inline-flex items-center gap-2">
              <FaCrown className="w-4 h-4 text-yellow-400" />
              <span className="text-white/80 text-sm font-medium tracking-wider">PREMIUM DIGITAL LUXURY</span>
              <FaStar className="w-3 h-3 text-yellow-400" />
            </div>
          </motion.div>

          {/* Main Luxury Title */}
          <div className="relative">
            <motion.h1 
              className="luxury-main-title text-8xl md:text-10xl lg:text-12xl font-black tracking-tighter leading-none"
              initial={{ letterSpacing: '0.2em', opacity: 0 }}
              animate={{ letterSpacing: '-0.02em', opacity: 1 }}
              transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
            >
              UGARIT
            </motion.h1>
            
            {/* Subtle Glow Effect */}
            <div className="absolute inset-0 luxury-title-glow opacity-60"></div>
          </div>

          {/* Enhanced Subtitle */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="space-y-4"
          >
            <p className="text-2xl md:text-3xl text-white/90 font-light tracking-wide max-w-3xl mx-auto leading-relaxed luxury-subtitle">
              Where digital excellence meets unparalleled luxury. 
              <br className="hidden md:block" />
              Experience the future of premium digital ownership.
            </p>
            
            {/* Stats Bar */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
              className="flex flex-wrap justify-center gap-8 pt-6 luxury-stats-bar"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white luxury-stat-number">500+</div>
                <div className="text-white/60 text-sm font-medium">Premium Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white luxury-stat-number">10K+</div>
                <div className="text-white/60 text-sm font-medium">Elite Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white luxury-stat-number">99.9%</div>
                <div className="text-white/60 text-sm font-medium">Uptime</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
        >
          <Link
            href="/products"
            className="luxury-primary-btn btn-liquid-glass px-10 py-5 text-xl font-semibold flex items-center gap-4 group magnetic-hover relative overflow-hidden"
          >
            <span className="relative z-10">EXPLORE COLLECTION</span>
            <FaArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            <div className="absolute inset-0 luxury-btn-shimmer"></div>
          </Link>
          
          <Link
            href="/wallet/create"
            className="luxury-secondary-btn btn-glass-modern px-10 py-5 text-xl font-semibold flex items-center gap-4 magnetic-hover relative overflow-hidden"
          >
            <FaGem className="w-5 h-5 relative z-10" />
            <span className="relative z-10">CREATE WALLET</span>
            <div className="absolute inset-0 luxury-btn-sparkle"></div>
          </Link>
        </motion.div>

        {/* Enhanced Features Grid */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-20 max-w-6xl mx-auto"
        >
          {/* Feature 1 */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            className="luxury-feature-card glass-card p-8 rounded-3xl text-center group relative overflow-hidden"
          >
            <div className="luxury-feature-glow"></div>
            <div className="w-16 h-16 luxury-icon-bg rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
              <FaLock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-bold text-xl mb-4">MILITARY SECURITY</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Bank-grade encryption and blockchain technology protecting every transaction
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            className="luxury-feature-card glass-card p-8 rounded-3xl text-center group relative overflow-hidden"
          >
            <div className="luxury-feature-glow"></div>
            <div className="w-16 h-16 luxury-icon-bg rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
              <FaRocket className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-bold text-xl mb-4">INSTANT ACCESS</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Immediate digital delivery with seamless experience across all devices
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            className="luxury-feature-card glass-card p-8 rounded-3xl text-center group relative overflow-hidden"
          >
            <div className="luxury-feature-glow"></div>
            <div className="w-16 h-16 luxury-icon-bg rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
              <FaGem className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-bold text-xl mb-4">EXCLUSIVE CONTENT</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Curated premium digital assets available only to our elite clientele
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            className="luxury-feature-card glass-card p-8 rounded-3xl text-center group relative overflow-hidden"
          >
            <div className="luxury-feature-glow"></div>
            <div className="w-16 h-16 luxury-icon-bg rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
              <FaAward className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-bold text-xl mb-4">PREMIUM SUPPORT</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              24/7 dedicated concierge service for all your digital luxury needs
            </p>
          </motion.div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="pt-16"
        >
          <p className="text-white/50 text-sm font-medium mb-6 tracking-wider">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-40">
            {['Blockchain', 'Security', 'Luxury', 'Digital', 'Premium', 'Elite'].map((badge, index) => (
              <motion.div
                key={badge}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.2 + index * 0.1 }}
                className="glass-card px-4 py-2 rounded-lg border border-white/10"
              >
                <span className="text-white/60 text-xs font-medium">{badge}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}