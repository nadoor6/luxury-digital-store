'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight, FaGem, FaCrown, FaRocket, FaShieldAlt, FaStar, FaAward } from 'react-icons/fa';

export default function Home() {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: FaGem,
      title: 'PREMIUM QUALITY',
      description: 'Curated digital assets of the highest caliber'
    },
    {
      icon: FaCrown,
      title: 'EXCLUSIVE ACCESS',
      description: 'Limited edition digital products for discerning clients'
    },
    {
      icon: FaRocket,
      title: 'INSTANT DELIVERY',
      description: 'Immediate access to your purchases'
    },
    {
      icon: FaShieldAlt,
      title: 'SECURE TRANSACTIONS',
      description: 'Blockchain-verified security for all transactions'
    }
  ];

  const products = [
    {
      name: 'LUXURY APP SUITE',
      price: 299,
      description: 'Premium application bundle with exclusive features',
      category: 'Software'
    },
    {
      name: 'DIGITAL ART COLLECTION',
      price: 599,
      description: 'Limited edition digital artwork series',
      category: 'Art'
    },
    {
      name: 'PREMIUM SUBSCRIPTION',
      price: 99,
      description: 'Year-long access to exclusive content',
      category: 'Subscription'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  // Get current feature data
  const currentFeatureData = features[currentFeature];
  const CurrentFeatureIcon = currentFeatureData.icon;

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with increased top padding */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 pb-20 px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/10 to-cyan-900/10" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto text-center relative z-10">
          {/* Main Brand Name with increased spacing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-7xl md:text-9xl font-black text-white mb-4 tracking-tighter leading-none">
              <span className="font-helvetica-black">UGARIT</span>
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-turquoise to-neon-blue mx-auto mb-6 rounded-full"></div>
            <p className="text-2xl md:text-3xl text-gray-300 font-light tracking-widest uppercase">
              DIGITAL LUXURY
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 font-helvetica font-bold leading-relaxed"
          >
            Exclusive digital experiences for the discerning client. 
            Where innovation meets elegance in the digital realm.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link href="/products" className="magnetic-btn">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-luxury flex items-center gap-3 px-8 py-4 text-lg font-black font-helvetica"
              >
                <FaGem className="w-5 h-5" />
                EXPLORE COLLECTION
                <FaArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
            
            <Link href="/wallet/create">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white/20 text-white rounded-xl font-bold font-helvetica hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              >
                CREATE WALLET
              </motion.button>
            </Link>
          </motion.div>

          {/* Rotating Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="max-w-md mx-auto"
          >
            <div className="glass-card rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
              <motion.div
                key={currentFeature}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-turquoise to-neon-blue flex items-center justify-center">
                  <CurrentFeatureIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-white font-black text-lg font-helvetica-heavy">
                    {currentFeatureData.title}
                  </h3>
                  <p className="text-gray-400 text-sm font-helvetica font-bold">
                    {currentFeatureData.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-purple-900/5">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              <span className="font-helvetica-black">WHY</span> 
              <span className="font-light"> UGARIT</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-helvetica font-bold">
              Experience the pinnacle of digital luxury with unparalleled quality and service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-card rounded-2xl p-6 text-center border border-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-turquoise to-neon-blue flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FeatureIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-3 font-helvetica-heavy">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 font-helvetica font-bold">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium Products Preview */}
      <section className="py-20 px-4 bg-black">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              <span className="font-helvetica-black">CURATED</span> 
              <span className="font-light"> SELECTION</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-helvetica font-bold">
              Discover our exclusive range of premium digital products and experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                  <FaStar className="w-5 h-5 text-turquoise" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2 font-helvetica-heavy">
                  {product.name}
                </h3>
                <p className="text-gray-400 mb-4 font-helvetica font-bold">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-turquoise text-lg font-black font-helvetica-heavy">
                    ${product.price}
                  </span>
                  <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-helvetica font-bold">
                    {product.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center mt-12"
          >
            <Link href="/products" className="magnetic-btn inline-block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-luxury flex items-center gap-3 px-8 py-4 text-lg font-black font-helvetica"
              >
                VIEW ALL PRODUCTS
                <FaArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-cyan-900/5">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-turquoise to-neon-blue flex items-center justify-center mx-auto mb-6">
              <FaAward className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              <span className="font-helvetica-black">JOIN THE</span> 
              <span className="font-light"> ELITE</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 font-helvetica font-bold">
              Create your wallet today and gain access to the world's most exclusive digital marketplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/wallet/create" className="magnetic-btn">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-luxury flex items-center gap-3 px-8 py-4 text-lg font-black font-helvetica"
                >
                  <FaGem className="w-5 h-5" />
                  CREATE WALLET
                </motion.div>
              </Link>
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-white/20 text-white rounded-xl font-bold font-helvetica hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                >
                  BROWSE PRODUCTS
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}