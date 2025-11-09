'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import { getProduct, updateProduct, getCategories } from '@/lib/product-storage';
import Link from 'next/link';
import { FaArrowLeft, FaSave, FaUpload, FaWallet } from 'react-icons/fa';

export default function EditProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '1',
    featured: false,
    isActive: true,
    deliveryType: 'instant',
    digitalContent: ''
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const { isAdmin, wallet } = useWallet();
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  useEffect(() => {
    loadProductAndCategories();
  }, [productId]);

  const loadProductAndCategories = async () => {
    try {
      const [product, categoriesData] = await Promise.all([
        getProduct(productId),
        getCategories()
      ]);
      
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          category: product.category,
          stock: product.stock?.toString() || '1',
          featured: product.featured || false,
          isActive: product.isActive !== undefined ? product.isActive : true,
          deliveryType: product.deliveryType || 'instant',
          digitalContent: product.digitalContent || ''
        });
      }
      setCategories(categoriesData.map(cat => cat.name));
    } catch (error) {
      console.error('Error loading product:', error);
      setError('FAILED TO LOAD PRODUCT');
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 border border-white/20">
            <FaWallet className="w-8 h-8 text-white" />
          </div>
          <p className="text-white text-xl font-helvetica font-bold">ADMIN ACCESS REQUIRED</p>
          <p className="text-gray-400 mt-2 font-helvetica">
            Contact system administrator for access
          </p>
          <Link 
            href="/"
            className="inline-block mt-4 px-6 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await updateProduct(
        productId,
        {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          featured: formData.featured,
          stock: parseInt(formData.stock),
          isActive: formData.isActive,
          deliveryType: formData.deliveryType as 'instant' | 'manual' | 'auto',
          digitalContent: formData.digitalContent
        },
        imageFile || undefined
      );

      router.push('/admin');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="glass-card rounded-2xl p-8 text-center border border-white/10">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 font-helvetica font-bold">LOADING PRODUCT...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8 border border-white/10"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/admin"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors magnetic-btn"
            >
              <FaArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-white brand-ugarit">
                EDIT PRODUCT
              </h1>
              <p className="text-gray-400 font-helvetica font-bold">
                Update your luxury digital product
              </p>
              {wallet && (
                <p className="text-turquoise text-sm mt-1 font-helvetica">
                  Admin Wallet: {wallet.address.slice(0, 8)}...
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl mb-6 font-helvetica font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-black text-white mb-3 font-helvetica">
                PRODUCT IMAGE
              </label>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-white/40 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <FaUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 font-helvetica font-bold">
                    {imageFile ? imageFile.name : 'CLICK TO UPLOAD NEW IMAGE'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1 font-helvetica">
                    Leave empty to keep current image
                  </p>
                </label>
              </div>
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-sm font-black text-white mb-2 font-helvetica">
                PRODUCT NAME
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 font-helvetica font-bold"
                placeholder="ENTER PRODUCT NAME"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-black text-white mb-2 font-helvetica">
                DESCRIPTION
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 font-helvetica font-bold resize-none"
                placeholder="ENTER PRODUCT DESCRIPTION"
              />
            </div>

            {/* Price, Stock, and Category */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-black text-white mb-2 font-helvetica">
                  PRICE ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 font-helvetica font-bold"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-black text-white mb-2 font-helvetica">
                  STOCK
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 font-helvetica font-bold"
                  placeholder="100"
                />
              </div>
              <div>
                <label className="block text-sm font-black text-white mb-2 font-helvetica">
                  CATEGORY
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 font-helvetica font-bold"
                >
                  <option value="">SELECT CATEGORY</option>
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-black text-white">
                      {category.toUpperCase()}
                    </option>
                  ))}
                  <option value="apps" className="bg-black text-white">APPS & SOFTWARE</option>
                  <option value="subscriptions" className="bg-black text-white">SUBSCRIPTIONS</option>
                  <option value="game-coins" className="bg-black text-white">GAME COINS</option>
                  <option value="accounts" className="bg-black text-white">ACCOUNTS</option>
                  <option value="licenses" className="bg-black text-white">LICENSES</option>
                </select>
              </div>
            </div>

            {/* Delivery Type and Digital Content */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-black text-white mb-2 font-helvetica">
                  DELIVERY TYPE
                </label>
                <select
                  value={formData.deliveryType}
                  onChange={(e) => setFormData({ ...formData, deliveryType: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 font-helvetica font-bold"
                >
                  <option value="instant" className="bg-black text-white">INSTANT AUTOMATIC</option>
                  <option value="auto" className="bg-black text-white">AUTOMATED</option>
                  <option value="manual" className="bg-black text-white">MANUAL DELIVERY</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-black text-white mb-2 font-helvetica">
                  DIGITAL CONTENT
                </label>
                <input
                  type="text"
                  value={formData.digitalContent}
                  onChange={(e) => setFormData({ ...formData, digitalContent: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 font-helvetica font-bold"
                  placeholder="License key, download URL, etc."
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-white rounded focus:ring-white focus:ring-2 bg-white/10 border-white/20"
                />
                <label htmlFor="featured" className="text-sm font-black text-white font-helvetica">
                  FEATURED
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-white rounded focus:ring-white focus:ring-2 bg-white/10 border-white/20"
                />
                <label htmlFor="isActive" className="text-sm font-black text-white font-helvetica">
                  ACTIVE
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={saving}
              whileHover={{ scale: saving ? 1 : 1.02 }}
              whileTap={{ scale: saving ? 1 : 0.98 }}
              className="w-full btn-luxury flex items-center justify-center gap-3 text-lg font-black font-helvetica disabled:opacity-50 disabled:cursor-not-allowed py-4"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaSave className="w-5 h-5" />
              )}
              {saving ? 'UPDATING PRODUCT...' : 'UPDATE PRODUCT'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}