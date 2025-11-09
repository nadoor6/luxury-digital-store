'use client';

import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { FaShoppingCart, FaStar, FaEye, FaBox } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const isOutOfStock = product.stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-500"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />
        
        {/* Stock Status */}
        {isOutOfStock && (
          <div className="absolute top-4 left-4">
            <div className="px-3 py-1 bg-red-500/90 text-white text-xs font-black font-helvetica rounded-full">
              OUT OF STOCK
            </div>
          </div>
        )}

        {product.stock > 0 && product.stock < 10 && (
          <div className="absolute top-4 left-4">
            <div className="px-3 py-1 bg-yellow-500/90 text-black text-xs font-black font-helvetica rounded-full">
              LOW STOCK: {product.stock}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-black hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title={isOutOfStock ? "Out of stock" : "Add to cart"}
          >
            <FaShoppingCart className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-black hover:bg-white transition-all duration-300"
            title="Quick view"
          >
            <FaEye className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-1 px-3 py-1 bg-white text-black rounded-full text-xs font-black font-helvetica">
              <FaStar className="w-3 h-3" />
              FEATURED
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-black text-white uppercase tracking-wide font-helvetica">
            {product.category}
          </span>
          <span className="text-2xl font-black text-white font-helvetica-heavy">
            ${product.price}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-black text-white text-lg mb-2 line-clamp-1 font-helvetica-heavy">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 font-helvetica font-bold">
          {product.description}
        </p>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black font-helvetica transition-all duration-300 ${
            isOutOfStock 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'btn-luxury hover:shadow-2xl'
          }`}
        >
          <FaShoppingCart className="w-4 h-4" />
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </motion.button>
      </div>
    </motion.div>
  );
}