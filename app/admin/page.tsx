'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { getProducts, deleteProduct } from '@/lib/product-storage';
import { Product } from '@/types/product';
import { FaPlus, FaEdit, FaTrash, FaBox, FaChartBar, FaUsers, FaEye, FaEyeSlash } from 'react-icons/fa';

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

  const handleToggleActive = async (product: Product) => {
    try {
      // This would call updateProduct to toggle isActive
      // For now, we'll just show an alert
      alert(`Product ${product.isActive ? 'deactivated' : 'activated'}`);
    } catch (error) {
      console.error('Error toggling product:', error);
    }
  };

  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl font-helvetica font-bold">UNAUTHORIZED ACCESS</p>
        </div>
      </div>
    );
  }

  const stats = [
    { 
      label: 'TOTAL PRODUCTS', 
      value: products.length, 
      icon: FaBox, 
    },
    { 
      label: 'ACTIVE PRODUCTS', 
      value: products.filter(p => p.isActive).length, 
      icon: FaChartBar, 
    },
    { 
      label: 'FEATURED PRODUCTS', 
      value: products.filter(p => p.featured).length, 
      icon: FaUsers, 
    },
    { 
      label: 'OUT OF STOCK', 
      value: products.filter(p => p.stock === 0).length, 
      icon: FaBox, 
    },
  ];

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8 mb-8 border border-white/10"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-black text-white mb-2 brand-ugarit">
                UGARIT ADMIN
              </h1>
              <p className="text-gray-400 font-helvetica font-bold">
                Manage your luxury digital products
              </p>
            </div>
            <Link href="/admin/add-product" className="magnetic-btn mt-4 lg:mt-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-luxury flex items-center gap-3 px-6 py-3 text-lg font-black font-helvetica"
              >
                <FaPlus className="w-5 h-5" />
                ADD PRODUCT
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center border border-white/10"
            >
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-black" />
              </div>
              <div className="text-2xl font-black text-white mb-1 font-helvetica-heavy">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm font-helvetica font-bold">
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
          className="glass-card rounded-2xl p-8 border border-white/10"
        >
          <h2 className="text-2xl font-black text-white mb-6 font-helvetica-heavy">
            PRODUCTS ({products.length})
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400 font-helvetica font-bold">LOADING PRODUCTS...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <FaBox className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-4 font-helvetica font-bold">NO PRODUCTS FOUND</p>
              <Link href="/admin/add-product" className="btn-luxury inline-flex items-center gap-2 px-6 py-3 font-black font-helvetica">
                <FaPlus className="w-4 h-4" />
                ADD YOUR FIRST PRODUCT
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-gray-400 font-black font-helvetica text-sm">PRODUCT</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-black font-helvetica text-sm">CATEGORY</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-black font-helvetica text-sm">PRICE</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-black font-helvetica text-sm">STOCK</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-black font-helvetica text-sm">STATUS</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-black font-helvetica text-sm">ACTIONS</th>
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
                            <div className="font-black text-white text-sm font-helvetica-heavy">
                              {product.name}
                            </div>
                            <div className="text-xs text-gray-400 line-clamp-1 font-helvetica font-bold">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-400 font-helvetica font-bold text-sm capitalize">
                        {product.category}
                      </td>
                      <td className="py-4 px-4 font-black text-white font-helvetica-heavy">
                        ${product.price}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-black font-helvetica ${
                          product.stock === 0 
                            ? 'bg-red-500/20 text-red-500' 
                            : product.stock < 10 
                            ? 'bg-yellow-500/20 text-yellow-500'
                            : 'bg-green-500/20 text-green-500'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          {product.featured && (
                            <span className="px-2 py-1 bg-white/20 text-white rounded-full text-xs font-black font-helvetica">
                              FEATURED
                            </span>
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-black font-helvetica ${
                            product.isActive 
                              ? 'bg-green-500/20 text-green-500' 
                              : 'bg-gray-500/20 text-gray-500'
                          }`}>
                            {product.isActive ? 'ACTIVE' : 'INACTIVE'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleActive(product)}
                            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors magnetic-btn"
                            title={product.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {product.isActive ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                          </button>
                          <Link
                            href={`/admin/edit-product/${product.id}`}
                            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors magnetic-btn"
                            title="Edit"
                          >
                            <FaEdit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors magnetic-btn"
                            title="Delete"
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