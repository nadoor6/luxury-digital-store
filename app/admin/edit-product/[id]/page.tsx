'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getProduct, updateProduct, getCategories } from '@/lib/product-storage';
import Link from 'next/link';
import { FaArrowLeft, FaSave, FaUpload } from 'react-icons/fa';

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
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.push('/');
      return;
    }
    loadProductAndCategories();
  }, [user, router, productId]);

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

  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white">Unauthorized access</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <FaArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Edit Product</h1>
            <p className="text-gray-400">Update product details</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-white mb-3">Product Image</label>
            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-white/40 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <FaUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400">
                  {imageFile ? imageFile.name : 'Click to upload new image'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Leave empty to keep current image
                </p>
              </label>
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-colors"
              placeholder="Enter product name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-colors resize-none"
              placeholder="Enter product description"
            />
          </div>

          {/* Price, Stock, and Category */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Price ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-colors"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Stock</label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-colors"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/40 transition-colors"
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
                <option value="apps">Apps & Software</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="game-coins">Game Coins</option>
                <option value="accounts">Accounts</option>
                <option value="licenses">Licenses</option>
              </select>
            </div>
          </div>

          {/* Delivery Type and Digital Content */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Delivery Type</label>
              <select
                value={formData.deliveryType}
                onChange={(e) => setFormData({ ...formData, deliveryType: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/40 transition-colors"
              >
                <option value="instant">Instant Automatic</option>
                <option value="auto">Automated</option>
                <option value="manual">Manual Delivery</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Digital Content</label>
              <input
                type="text"
                value={formData.digitalContent}
                onChange={(e) => setFormData({ ...formData, digitalContent: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-colors"
                placeholder="License key, download URL, etc."
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-white rounded focus:ring-white focus:ring-2 bg-white/10 border-white/20"
              />
              <label htmlFor="featured" className="text-sm text-white">
                Featured
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
              <label htmlFor="isActive" className="text-sm text-white">
                Active
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-white text-black py-4 rounded-full font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <FaSave className="w-5 h-5" />
            )}
            {saving ? 'Updating...' : 'Update Product'}
          </button>
        </form>
      </div>
    </div>
  );
}