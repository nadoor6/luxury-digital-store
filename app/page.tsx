'use client';

import { motion } from 'framer-motion';
import { FaArrowRight, FaStar, FaShippingFast, FaShieldAlt, FaHeadset, FaGem } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: <FaStar className="w-6 h-6" />,
      title: 'Premium Quality',
      description: 'Curated selection of the finest digital products',
    },
    {
      icon: <FaShippingFast className="w-6 h-6" />,
      title: 'Instant Delivery',
      description: 'Digital downloads available immediately after purchase',
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: 'Secure Payment',
      description: 'Bank-level encryption for all transactions',
    },
    {
      icon: <FaHeadset className="w-6 h-6" />,
      title: '24/7 Support',
      description: 'Round-the-clock premium customer service',
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dark Luxury Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      {/* Subtle Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-2 h-2 bg-white/10 rounded-full top-1/4 left-1/4 animate-float" />
        <div className="absolute w-3 h-3 bg-white/10 rounded-full top-1/3 right-1/4 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute w-2 h-2 bg-white/10 rounded-full bottom-1/4 left-1/3 animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute w-3 h-3 bg-white/10 rounded-full bottom-1/3 right-1/3 animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center max-w-6xl mx-auto"
          >
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tight"
            >
              <span className="text-white brand-ugarit">Ugarit</span>
              <br />
              <span className="elegant-text text-white">
                Digital
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-helvetica font-bold"
            >
              Where <span className="font-black text-white">innovation</span> meets{' '}
              <span className="font-black text-white">elegance</span>. 
              Discover exclusive digital products crafted for the modern connoisseur.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
            >
              <Link href="/products" className="magnetic-btn">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-luxury flex items-center gap-3 text-lg font-black font-helvetica"
                >
                  <FaGem className="w-5 h-5" />
                  Explore Collection
                  <FaArrowRight className="w-4 h-4" />
                </motion.div>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-glass flex items-center gap-3 text-lg font-black font-helvetica text-white"
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
            >
              {[
                { number: '10K+', label: 'Premium Products' },
                { number: '50K+', label: 'Elite Clients' },
                { number: '24/7', label: 'Concierge' },
                { number: '99.9%', label: 'Uptime' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center"
                >
                  <div className="glass-card">
                    <div className="text-2xl md:text-3xl font-black text-white mb-1 font-helvetica-heavy">
                      {stat.number}
                    </div>
                    <div className="text-xs md:text-sm text-gray-400 font-bold font-helvetica">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 brand-ugarit">
              Why Choose Ugarit
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-helvetica font-bold">
              Experience the difference of premium digital products with unparalleled quality and service
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ 
                  y: -12,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                className="relative group"
              >
                {/* Glass Card */}
                <div className="relative glass-card transform-3d perspective-1000">
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-6 mx-auto glow"
                  >
                    <div className="text-black">
                      {feature.icon}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-black text-white text-center mb-3 font-helvetica-heavy">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-center text-sm leading-relaxed font-helvetica font-bold">
                    {feature.description}
                  </p>

                  {/* Hover Arrow */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute bottom-6 right-6 text-white"
                  >
                    <FaArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultimate CTA Section */}
      <section className="relative py-32 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative"
          >
            {/* Glass Container */}
            <div className="relative glass-card border border-white/10 rounded-3xl p-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-3xl mx-auto"
              >
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 brand-ugarit">
                  Ready to Experience True Luxury?
                </h2>
                
                <p className="text-xl text-gray-300 mb-8 leading-relaxed font-helvetica font-bold">
                  Join over 50,000 discerning customers who have elevated their digital experience with our premium products.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/products" className="magnetic-btn">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-luxury flex items-center gap-3 text-lg font-black font-helvetica px-8 py-4"
                    >
                      <FaStar className="w-5 h-5" />
                      Discover Premium Collection
                      <FaArrowRight className="w-4 h-4" />
                    </motion.div>
                  </Link>
                  
                  <Link href="/auth/signin" className="magnetic-btn">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-glass flex items-center gap-3 text-lg font-black font-helvetica px-8 py-4"
                    >
                      Create Account
                    </motion.button>
                  </Link>
                </div>

                {/* Trust Badges */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-white/10"
                >
                  {['Secure Payments', '24/7 Support', 'Instant Delivery', 'Premium Quality'].map((badge, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-400 font-helvetica font-bold">
                      <FaShieldAlt className="w-3 h-3 text-white" />
                      {badge}
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}