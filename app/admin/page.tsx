'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { FaBox, FaShoppingCart, FaUsers, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

// Mock data
const mockProducts = [
  { id: '1', name: 'Premium Watch', price: 299, stock: 15 },
  { id: '2', name: 'Wireless Headphones', price: 199, stock: 8 },
];

const mockOrders = [
  { id: '1', customer: 'John Doe', total: 299, status: 'pending', date: '2024-01-15' },
  { id: '2', customer: 'Jane Smith', total: 498, status: 'completed', date: '2024-01-14' },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState(mockProducts);
  const [orders, setOrders] = useState(mockOrders);
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push('/auth/signin');
    }
  }, [user, router]);

  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You need admin privileges to access this page.
          </p>
        </div>
      </div>
    );
  }

  const handleAddProduct = (productData: any) => {
    const newProduct = {
      id: Date.now().toString(),
      ...productData,
      stock: parseInt(productData.stock)
    };
    setProducts([...products, newProduct]);
    setShowAddProduct(false);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 pt-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your store products and orders
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FaBox className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{products.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <FaShoppingCart className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{orders.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <FaUsers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {orders.filter(o => o.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px">
              {[
                { id: 'products', name: 'Products', icon: FaBox },
                { id: 'orders', name: 'Orders', icon: FaShoppingCart },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'products' && (
              <ProductsTab 
                products={products}
                onAddProduct={handleAddProduct}
                onDeleteProduct={handleDeleteProduct}
                showAddProduct={showAddProduct}
                setShowAddProduct={setShowAddProduct}
              />
            )}

            {activeTab === 'orders' && (
              <OrdersTab 
                orders={orders}
                onUpdateStatus={updateOrderStatus}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductsTab({ products, onAddProduct, onDeleteProduct, showAddProduct, setShowAddProduct }: any) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct(formData);
    setFormData({ name: '', price: '', stock: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Product Management
        </h3>
        <button
          onClick={() => setShowAddProduct(!showAddProduct)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FaPlus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {showAddProduct && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={() => setShowAddProduct(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="space-y-4">
        {products.map((product: any) => (
          <div key={product.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">{product.name}</h4>
              <p className="text-gray-600 dark:text-gray-400">${product.price} • {product.stock} in stock</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
                <FaEdit className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onDeleteProduct(product.id)}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersTab({ orders, onUpdateStatus }: any) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Order Management
      </h3>
      
      <div className="space-y-4">
        {orders.map((order: any) => (
          <div key={order.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Order #{order.id}</h4>
                <p className="text-gray-600 dark:text-gray-400">{order.customer}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">{order.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'completed' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              }`}>
                {order.status}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold text-gray-900 dark:text-white">${order.total}</p>
              
              {order.status === 'pending' && (
                <button
                  onClick={() => onUpdateStatus(order.id, 'completed')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  Mark Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}