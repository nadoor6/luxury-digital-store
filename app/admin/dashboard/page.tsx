'use client';

import { motion } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import Link from 'next/link';
import { FaBox, FaUsers, FaShoppingCart, FaChartBar, FaCog, FaPlus } from 'react-icons/fa';

export default function AdminDashboard() {
  const { isAdmin, wallet } = useWallet();

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 border border-white/20">
            <FaCog className="w-8 h-8 text-white" />
          </div>
          <p className="text-white text-xl font-helvetica font-bold">ADMIN ACCESS REQUIRED</p>
          <p className="text-gray-400 mt-2 font-helvetica">
            Please use admin access to view this page
          </p>
          <Link 
            href="/admin/access"
            className="inline-block mt-4 px-6 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
          >
            Admin Access
          </Link>
        </div>
      </div>
    );
  }

  const adminCards = [
    {
      title: 'Products',
      description: 'Manage your digital products',
      icon: FaBox,
      href: '/admin',
      count: '25+',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Add Product',
      description: 'Create new digital products',
      icon: FaPlus,
      href: '/admin/add-product',
      count: 'New',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Orders',
      description: 'View and manage orders',
      icon: FaShoppingCart,
      href: '#',
      count: '12',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Analytics',
      description: 'View store analytics',
      icon: FaChartBar,
      href: '#',
      count: 'Stats',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8 mb-8 border border-white/10"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-black text-white mb-2 brand-ugarit">
                ADMIN DASHBOARD
              </h1>
              <p className="text-gray-400 font-helvetica font-bold">
                Manage your luxury digital store
              </p>
              {wallet && (
                <p className="text-turquoise text-sm mt-2 font-helvetica">
                  Admin Wallet: {wallet.address}
                </p>
              )}
            </div>
            <div className="flex gap-4 mt-4 lg:mt-0">
              <Link href="/admin" className="magnetic-btn">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-luxury flex items-center gap-3 px-6 py-3 text-lg font-black font-helvetica"
                >
                  <FaBox className="w-5 h-5" />
                  MANAGE PRODUCTS
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={card.href}>
                <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer h-full">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-2 font-helvetica-heavy">
                    {card.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 font-helvetica font-bold">
                    {card.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-turquoise text-sm font-helvetica font-bold">
                      {card.count}
                    </span>
                    <div className="w-2 h-2 bg-turquoise rounded-full"></div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}