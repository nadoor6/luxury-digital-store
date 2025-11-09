'use client'

import { motion } from 'framer-motion'
import ContactForm from '../../components/ContactForm'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-6 font-serif">Contact Us</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get in touch with our premium support team. We're here to help you with any questions or concerns.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <ContactForm />
          </motion.div>

          {/* Additional Info */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {[
              { 
                title: 'Email Support', 
                content: 'support@luxurystore.nd', 
                icon: '✉️',
                description: 'We typically respond within 2 hours during business hours'
              },
              { 
                title: 'Response Time', 
                content: '2-4 Hours', 
                icon: '⏱️',
                description: 'Average response time during business hours (9AM-6PM PST)'
              },
              { 
                title: 'Premium Support', 
                content: '24/7 Available', 
                icon: '🛟',
                description: 'Emergency support available for critical issues'
              }
            ].map((item, index) => (
              <div key={item.title} className="text-center glass dark:glass-dark p-6 rounded-xl">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2 font-serif">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 font-bold text-lg mb-2">{item.content}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}