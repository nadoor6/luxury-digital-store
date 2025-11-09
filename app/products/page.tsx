'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ui/ProductCard';
import { useAuth } from '@/contexts/AuthContext'; // Your existing auth hook

// KEEP your existing product fetching logic
// Just wrap it with loading states

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Your existing auth context

  // YOUR existing data fetching - just add loading state
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // YOUR existing product fetching logic here
        // const productsData = await getProducts();
        // setProducts(productsData);
        
        // Simulate loading
        setTimeout(() => {
          setProducts([]); // Replace with your actual data
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    // YOUR existing add to cart logic
    console.log('Add to cart:', product);
  };

  const handleEditProduct = (product) => {
    // YOUR existing edit logic
    console.log('Edit product:', product);
  };

  const handleDeleteProduct = (product) => {
    // YOUR existing delete logic
    console.log('Delete product:', product);
  };

  if (loading) {
    return <ProductsLoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 pt-24">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Products
          </h1>
          {/* Admin Notice */}
          {user?.isAdmin && (
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              Admin Mode: You can edit and delete products
            </p>
          )}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                showAdminActions={user?.isAdmin}
                onEdit={user?.isAdmin ? handleEditProduct : undefined}
                onDelete={user?.isAdmin ? handleDeleteProduct : undefined}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {products.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No products available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {user?.isAdmin 
                ? "Add some products from the admin dashboard"
                : "Check back later for new products"
              }
            </p>
            {user?.isAdmin && (
              <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add First Product
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Loading Skeleton Component
function ProductsLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 pt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse"
            >
              <div className="h-64 bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}