'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaHeart, FaEye, FaStar, FaGem, FaEdit, FaTrash, FaSparkles } from 'react-icons/fa';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  inStock?: boolean;
  rating?: number;
  isNew?: boolean;
  isOnSale?: boolean;
  originalPrice?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  showAdminActions?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onQuickView,
  showAdminActions = false,
  onEdit,
  onDelete
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      className="group relative perspective-1000 transform-3d"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-turquoise/20 via-neon-blue/10 to-neon-purple/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-60"
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Main Glass Card */}
      <div className="relative glass-card overflow-hidden border border-white/20">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
          {/* Badges Container */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            {/* New Badge */}
            {product.isNew && (
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="bg-gradient-to-r from-green-400 to-cyan-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg glow"
              >
                NEW
              </motion.span>
            )}
            
            {/* Sale Badge */}
            {product.isOnSale && product.originalPrice && (
              <motion.span
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg glow"
              >
                -{discount}%
              </motion.span>
            )}
            
            {/* Admin Badge */}
            {showAdminActions && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg glow"
              >
                ADMIN
              </motion.span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="p-2 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 shadow-lg magnetic-btn"
            >
              <FaHeart
                className={`w-4 h-4 transition-all duration-300 ${
                  isWishlisted 
                    ? 'text-red-500 fill-current glow' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-red-400'
                }`}
              />
            </motion.button>

            {/* Quick View Button */}
            {onQuickView && (
              <motion.button
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onQuickView(product)}
                className="p-2 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 shadow-lg magnetic-btn"
              >
                <FaEye className="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-turquoise transition-colors" />
              </motion.button>
            )}
          </div>

          {/* Product Image */}
          <div className="relative h-64 overflow-hidden">
            {/* Loading Skeleton */}
            {!imageLoaded && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: imageLoaded ? 0 : 1 }}
                className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 animate-pulse rounded-lg"
              />
            )}

            {/* Main Image */}
            <motion.img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              } group-hover:scale-110`}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Glass Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Quick View Overlay */}
            {onQuickView && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onQuickView(product)}
                  className="btn-liquid flex items-center gap-2 px-6 py-3 font-semibold shadow-2xl"
                >
                  <FaEye className="w-4 h-4" />
                  Quick View
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          {/* Category */}
          {product.category && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs font-semibold text-turquoise uppercase tracking-wider mb-2"
            >
              {product.category}
            </motion.p>
          )}

          {/* Product Name */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-bold text-gray-900 dark:text-white text-lg mb-3 line-clamp-2 leading-tight group-hover:text-turquoise transition-colors duration-300"
          >
            {product.name}
          </motion.h3>

          {/* Rating */}
          {product.rating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 mb-3"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating!) 
                        ? 'text-yellow-400 fill-current glow' 
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({product.rating})
              </span>
            </motion.div>
          )}

          {/* Price Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-3">
              {/* Current Price */}
              <span className="text-2xl font-bold gradient-text bg-gradient-to-r from-turquoise to-neon-blue">
                ${product.price}
              </span>
              
              {/* Original Price */}
              {product.originalPrice && (
                <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Premium Badge */}
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
              className="text-turquoise"
            >
              <FaGem className="w-5 h-5" />
            </motion.div>
          </motion.div>

          {/* Admin Actions */}
          {showAdminActions && onEdit && onDelete && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ delay: 0.6 }}
              className="flex gap-3 mb-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(product)}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-cyan-500 text-white py-2 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 magnetic-btn"
              >
                <FaEdit className="w-3 h-3" />
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(product)}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-400 to-pink-500 text-white py-2 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 magnetic-btn"
              >
                <FaTrash className="w-3 h-3" />
                Delete
              </motion.button>
            </motion.div>
          )}

          {/* Add to Cart Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToCart(product)}
            className="w-full btn-liquid flex items-center justify-center gap-3 py-4 font-bold text-lg shadow-2xl magnetic-btn"
          >
            <FaShoppingCart className="w-5 h-5" />
            Add to Cart
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <FaSparkles className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>

        {/* Hover Border Effect */}
        <motion.div
          className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-turquoise via-neon-blue to-neon-purple rounded-3xl opacity-0 group-hover:opacity-100"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '2px'
          }}
        />
      </div>
    </motion.div>
  );
}