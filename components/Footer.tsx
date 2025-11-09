'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark-grey text-cream-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-turquoise mb-4 font-serif">LuxuryStore.nd</h3>
            <p className="text-gray-300">
              Premium digital goods with luxury service and instant delivery.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h4 className="text-lg font-semibold mb-4 font-display">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Products', 'Contact', 'Admin'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-turquoise transition-colors font-display"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className="text-lg font-semibold mb-4 font-display">Products</h4>
            <ul className="space-y-2">
              {['Telegram Premium', 'V-Bucks', 'Steam Wallet', 'MasterCard'].map((product) => (
                <li key={product}>
                  <span className="text-gray-300 hover:text-turquoise transition-colors cursor-pointer font-display">
                    {product}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h4 className="text-lg font-semibold mb-4 font-display">Contact</h4>
            <ul className="space-y-2 text-gray-300 font-display">
              <li>support@luxurystore.nd</li>
              <li>24/7 Customer Support</li>
              <li>Instant Delivery</li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p>&copy; 2024 LuxuryStore.nd. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}