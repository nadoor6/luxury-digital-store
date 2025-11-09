'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ProductCard from '../components/ui/ProductCard'
import { Product } from '../lib/utils'
import { ProductStorage } from '../lib/product-storage'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ShippingIcon, ShieldIcon, SupportIcon } from '../components/ui/Icons'

const features = [
  {
    title: 'Instant Delivery',
    description: 'Receive your digital goods immediately after purchase',
    icon: 'shipping'
  },
  {
    title: 'Secure Payment',
    description: 'Multiple secure payment methods with encryption',
    icon: 'shield'
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock customer support team',
    icon: 'support'
  }
]

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedProducts = ProductStorage.getProducts()
    const activeProducts = storedProducts.filter(product => product.active !== false)
    setProducts(activeProducts)
    setLoading(false)
  }, [])

  const featuredProducts = products.filter(product => product.popular).slice(0, 4)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-turquoise/20 via-cream-white to-dark-grey/10 dark:from-turquoise/10 dark:via-dark-grey dark:to-black">
          <div className="absolute inset-0 bg-black/5"></div>
          <motion.div 
            className="relative z-10 text-center max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 font-serif"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Luxury <span className="text-turquoise">Digital</span> Goods
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300 font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Premium digital products with unparalleled service and instant delivery
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link href="/products" className="bg-gradient-to-r from-turquoise to-cyan-400 text-dark-grey px-8 py-4 rounded-xl font-display font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 inline-block">
                Explore Products
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Featured Products */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-4 font-serif">Featured Products</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 font-display">
                Curated selection of premium digital goods
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {featuredProducts.length === 0 && (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                  No featured products yet.
                </p>
                <Link href="/products" className="bg-dark-grey text-cream-white px-8 py-4 rounded-xl font-display font-semibold text-lg transition-all duration-300 border-2 border-turquoise hover:bg-turquoise hover:text-dark-grey hover:scale-105 active:scale-95 inline-block">
                  View All Products
                </Link>
              </motion.div>
            )}

            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/products" className="bg-dark-grey text-cream-white px-8 py-4 rounded-xl font-display font-semibold text-lg transition-all duration-300 border-2 border-turquoise hover:bg-turquoise hover:text-dark-grey hover:scale-105 active:scale-95 inline-block">
                View All Products
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-cream-white to-gray-100 dark:from-dark-grey dark:to-gray-900 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-4 font-serif">Why Choose LuxuryStore</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-display">
                Experience premium digital shopping with unparalleled service quality
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="glass dark:glass-dark p-8 rounded-2xl text-center group hover:scale-105 transition-all duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-turquoise to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500">
                    {feature.icon === 'shipping' && <ShippingIcon className="w-8 h-8 text-white" />}
                    {feature.icon === 'shield' && <ShieldIcon className="w-8 h-8 text-white" />}
                    {feature.icon === 'support' && <SupportIcon className="w-8 h-8 text-white" />}
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-serif text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-display">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}