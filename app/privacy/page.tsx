'use client';

import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-serif mb-6">
              Privacy Policy
            </h1>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Information We Collect
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  How We Use Your Information
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Data Security
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Your Rights
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You have the right to access, correct, or delete your personal information at any time through your account settings.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Us
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  If you have any questions about this Privacy Policy, please contact us at support@luxurystore.nd
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}