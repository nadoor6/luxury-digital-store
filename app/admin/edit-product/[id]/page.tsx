'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
// FIXED: Import specific functions instead of ProductStorage
import { getProduct, updateProduct } from '@/lib/product-storage';
import Link from 'next/link';
import { FaArrowLeft, FaSave, FaPlus, FaTimes, FaUpload } from 'react-icons/fa';

export default function EditProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    featured: false
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.push('/');
      return;
    }
    loadProduct();
  }, [user, router, productId]);

  const loadProduct = async () => {
    try {
      const product = await getProduct(productId);
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          category: product.category,
          featured: product.featured || false
        });
      }
    } catch (error) {
      console.error('Error loading product:', error);
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

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
          featured: formData.featured
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

  if (!user || !user.isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="glass-card-dark rounded-3xl p-8 text-center">
            <div className="w-8 h-8 border-2 border-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-dark rounded-3xl p-8"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/admin"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors magnetic-btn"
            >
              <FaArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Edit Product
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Update your luxury digital product
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 px-4 py-3 rounded-2xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Product Image
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-6 text-center hover:border-turquoise transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <FaUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-400">
                    {imageFile ? imageFile.name : 'Click to upload new product image'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Leave empty to keep current image
                  </p>
                </label>
              </div>
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/5 dark:bg-black/5 border border-white/10 dark:border-gray-600/20 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-turquoise/50 focus:border-transparent transition-all duration-300 focus-glass"
                placeholder="Enter product name"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 bg-white/5 dark:bg-black/5 border border-white/10 dark:border-gray-600/20 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-turquoise/50 focus:border-transparent transition-all duration-300 focus-glass resize-none"
                placeholder="Enter product description"
              />
            </div>

            {/* Price and Category */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 dark:bg-black/5 border border-white/10 dark:border-gray-600/20 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-turquoise/50 focus:border-transparent transition-all duration-300 focus-glass"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 dark:bg-black/5 border border-white/10 dark:border-gray-600/20 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-turquoise/50 focus:border-transparent transition-all duration-300 focus-glass"
                >
                  <option value="">Select category</option>
                  <option value="templates">Templates</option>
                  <option value="graphics">Graphics</option>
                  <option value="fonts">Fonts</option>
                  <option value="plugins">Plugins</option>
                  <option value="courses">Courses</option>
                </select>
              </div>
            </div>

            {/* Featured */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-turquoise rounded focus:ring-turquoise focus:ring-2"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Feature this product on homepage
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={saving}
              whileHover={{ scale: saving ? 1 : 1.02 }}
              whileTap={{ scale: saving ? 1 : 0.98 }}
              className="w-full btn-liquid flex items-center justify-center gap-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <FaSave className="w-5 h-5" />
              )}
              {saving ? 'Updating Product...' : 'Update Product'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}