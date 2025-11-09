'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaTimes, FaPlus, FaMinus, FaTrash, FaCreditCard, FaLock } from 'react-icons/fa';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartItemsCount, clearCart } = useCart();

  const handleCheckout = () => {
    // Close cart and redirect to checkout
    setIsOpen(false);
    // In a real app, this would go to /checkout
    alert('Proceeding to checkout - this would integrate with Stripe/PayPal');
  };

  return (
    <>
      {/* Cart Button */}
      <motion.button
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="p-3 text-gray-400 hover:text-white transition-colors rounded-2xl magnetic-btn relative group"
        title="Shopping Cart"
      >
        <FaShoppingCart className="w-5 h-5" />
        
        {/* Cart Counter */}
        {getCartItemsCount() > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full w-6 h-6 flex items-center justify-center font-black font-helvetica shadow-lg"
          >
            {getCartItemsCount()}
          </motion.span>
        )}
        
        {/* Hover Effect */}
        <div className="absolute inset-0 bg-white/10 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300" />
      </motion.button>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed top-0 right-0 h-full w-96 max-w-full bg-black border-l border-white/10 shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="glass border-b border-white/20 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-white font-helvetica-heavy">
                    SHOPPING CART
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl hover:bg-white/10 transition-colors magnetic-btn"
                  >
                    <FaTimes className="w-5 h-5 text-white" />
                  </button>
                </div>
                <p className="text-gray-400 mt-1 font-helvetica font-bold">
                  {getCartItemsCount()} items in cart
                </p>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <FaShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg mb-4 font-helvetica font-bold">
                      Your cart is empty
                    </p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="btn-luxury px-6 py-3 font-black font-helvetica"
                    >
                      CONTINUE SHOPPING
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.product.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10"
                      >
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-black text-white text-sm font-helvetica-heavy truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-white font-black font-helvetica">
                            ${item.product.price}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                          >
                            <FaMinus className="w-3 h-3 text-white" />
                          </button>
                          
                          <span className="w-8 text-center font-black text-white font-helvetica">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                          >
                            <FaPlus className="w-3 h-3 text-white" />
                          </button>
                          
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors flex items-center justify-center ml-2"
                          >
                            <FaTrash className="w-3 h-3 text-red-400" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-white/10 p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-helvetica font-bold">SUBTOTAL:</span>
                    <span className="text-2xl font-black text-white font-helvetica-heavy">
                      ${getCartTotal().toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={clearCart}
                      className="flex-1 btn-glass font-black font-helvetica py-3"
                    >
                      CLEAR CART
                    </button>
                    
                    <button
                      onClick={handleCheckout}
                      className="flex-1 btn-luxury font-black font-helvetica py-3 flex items-center justify-center gap-2"
                    >
                      <FaLock className="w-4 h-4" />
                      CHECKOUT
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-400 text-center font-helvetica">
                    <FaCreditCard className="w-3 h-3 inline mr-1" />
                    Secure checkout with Stripe
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}