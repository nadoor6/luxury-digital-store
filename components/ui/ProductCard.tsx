'use client'

import { motion } from 'framer-motion'
import { FaTelegram, FaStar, FaCreditCard, FaPaypal } from 'react-icons/fa'
import { SiEpicgames, SiSteam } from 'react-icons/si'

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  image: string;
  category: string;
  features: string[];
  popular?: boolean;
  active?: boolean;
}

interface ProductCardProps {
  product: Product
}

// Product icon mapping function
const getProductIcon = (productName: string, className: string = "w-12 h-12") => {
  const iconProps = { className }
  
  const icons: { [key: string]: JSX.Element } = {
    'Telegram Premium': <FaTelegram {...iconProps} />,
    'Telegram Stars': <FaStar {...iconProps} />,
    'V-Bucks': <SiEpicgames {...iconProps} />,
    'Steam Wallet': <SiSteam {...iconProps} />,
    'Virtual MasterCard': <FaCreditCard {...iconProps} />,
    'PayPal Funds': <FaPaypal {...iconProps} />
  }
  
  return icons[productName] || <FaStar {...iconProps} />
}

export default function ProductCard({ product }: ProductCardProps) {
  const ProductIcon = getProductIcon(product.name, "w-12 h-12")

  return (
    <motion.div
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-turquoise transition-all duration-500"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Popular Badge */}
      {product.popular && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-dark-grey px-3 py-1 rounded-full text-xs font-bold font-display uppercase tracking-wide shadow-lg">
            Popular
          </span>
        </div>
      )}

      {/* Product Header with Gradient */}
      <div className="relative h-40 bg-gradient-to-br from-turquoise via-blue-500 to-dark-grey overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 animate-pulse"></div>
        </div>
        
        {/* Product Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {ProductIcon}
          </motion.div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-serif group-hover:text-turquoise transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold text-turquoise font-display">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
          {product.description}
        </p>

        {/* Features List */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {product.features.slice(0, 2).map((feature, index) => (
              <span 
                key={index}
                className="bg-turquoise/10 text-turquoise px-2 py-1 rounded-lg text-xs font-medium"
              >
                {feature}
              </span>
            ))}
            {product.features.length > 2 && (
              <span className="bg-dark-grey/10 text-dark-grey dark:bg-cream-white/10 dark:text-cream-white px-2 py-1 rounded-lg text-xs font-medium">
                +{product.features.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          className="w-full bg-gradient-to-r from-turquoise to-cyan-400 text-dark-grey py-3 px-4 rounded-xl font-display font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 group/btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Add to Cart</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.button>
      </div>

      {/* Category Badge */}
      <div className="absolute top-4 left-4">
        <span className="bg-dark-grey text-cream-white px-3 py-1 rounded-full text-xs font-bold font-display uppercase tracking-wide shadow-lg">
          {product.category}
        </span>
      </div>
    </motion.div>
  )
}