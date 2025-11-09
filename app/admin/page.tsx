'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { getProducts, deleteProduct } from '@/lib/product-storage';
import { Product } from '@/types/product';
import { FaPlus, FaEdit, FaTrash, FaBox, FaChartBar, FaUsers } from 'react-icons/fa';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.push('/');
      return;
    }
    loadProducts();
  }, [user, router]);

  const loadProducts = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (!user || !user.isAdmin) {
    return null;
  }

  const stats = [
    { label: 'Total Products', value: products.length, icon: FaBox, color: 'from-blue-500 to-cyan-500' },
    { label: 'Featured Products', value: products.filter(p => p.featured).length, icon: FaChartBar, color: 'from-purple-500 to-pink-500' },
    { label: 'Total Revenue', value: `$${products.reduce((sum, p) => sum + p.price, 0).toLocaleString()}`, icon: FaUsers, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-dark rounded-3xl p-8 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your luxury digital products
              </p>
            </div>
            <Link href="/admin/add-product" className="magnetic-btn mt-4 lg:mt-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-liquid flex items-center gap-3 px-6 py-3 text-lg font-semibold"
              >
                <FaPlus className="w-5 h-5" />
                Add Product
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-3xl p-6 text-center"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Products Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card-dark rounded-3xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Products ({products.length})
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <FaBox className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">No products found</p>
              <Link href="/admin/add-product" className="btn-liquid inline-flex items-center gap-2 px-6 py-3">
                <FaPlus className="w-4 h-4" />
                Add Your First Product
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-gray-600 dark:text-gray-400 font-semibold">Product</th>
                    <th className="text-left py-4 px-4 text-gray-600 dark:text-gray-400 font-semibold">Category</th>
                    <th className="text-left py-4 px-4 text-gray-600 dark:text-gray-400 font-semibold">Price</th>
                    <th className="text-left py-4 px-4 text-gray-600 dark:text-gray-400 font-semibold">Featured</th>
                    <th className="text-left py-4 px-4 text-gray-600 dark:text-gray-400 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400 capitalize">
                        {product.category}
                      </td>
                      <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">
                        ${product.price}
                      </td>
                      <td className="py-4 px-4">
                        {product.featured ? (
                          <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded-full text-xs font-semibold">
                            Featured
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-500/20 text-gray-500 rounded-full text-xs font-semibold">
                            Standard
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/edit-product/${product.id}`}
                            className="p-2 rounded-xl bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 transition-colors magnetic-btn"
                          >
                            <FaEdit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 rounded-xl bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors magnetic-btn"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}