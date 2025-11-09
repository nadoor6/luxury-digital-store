'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-black text-white mb-4 brand-ugarit">Ugarit</h3>
            <p className="text-gray-400 font-helvetica font-bold leading-relaxed">
              Premium digital goods with luxury service and instant delivery for the discerning client.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h4 className="text-lg font-black mb-4 font-helvetica-heavy">NAVIGATION</h4>
            <ul className="space-y-3">
              {['Home', 'Products', 'Contact', 'Admin'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors font-helvetica font-bold text-sm"
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
            <h4 className="text-lg font-black mb-4 font-helvetica-heavy">PRODUCTS</h4>
            <ul className="space-y-3">
              {['Premium Accounts', 'Digital Currency', 'Gaming Credits', 'Exclusive Access'].map((product) => (
                <li key={product}>
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer font-helvetica font-bold text-sm">
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
            <h4 className="text-lg font-black mb-4 font-helvetica-heavy">CONTACT</h4>
            <ul className="space-y-3 text-gray-400 font-helvetica font-bold text-sm">
              <li>support@ugarit.com</li>
              <li>24/7 Concierge Service</li>
              <li>Instant Digital Delivery</li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-helvetica font-bold">&copy; 2024 Ugarit. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}