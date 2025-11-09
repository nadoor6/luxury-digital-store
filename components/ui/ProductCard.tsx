'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaHeart, FaEye, FaStar } from 'react-icons/fa';

// Use YOUR existing Product interface
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  // Add any other fields you have
  description?: string;
  category?: string;
  inStock?: boolean;
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

  return (
    <motion.div
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700">
        {/* Admin Badge */}
        {showAdminActions && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Admin
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md"
        >
          <FaHeart
            className={`w-4 h-4 ${
              isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'
            }`}
          />
        </button>

        {/* Product Image */}
        <div className="relative h-64 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-600 animate-pulse" />
          )}
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Quick View Overlay */}
          {onQuickView && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onQuickView(product)}
                className="bg-white text-gray-900 p-3 rounded-full shadow-lg"
              >
                <FaEye className="w-5 h-5" />
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
          {product.name}
        </h3>
        
        <p className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          ${product.price}
        </p>

        {/* Admin Actions */}
        {showAdminActions && onEdit && onDelete && (
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => onEdit(product)}
              className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product)}
              className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        )}

        {/* Add to Cart */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddToCart(product)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}