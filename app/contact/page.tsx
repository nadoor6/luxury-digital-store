'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaHeadset } from 'react-icons/fa';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'EMAIL US',
      details: 'support@ugarit.digital',
      description: 'Send us an email anytime'
    },
    {
      icon: FaPhone,
      title: 'CALL US',
      details: '+1 (555) 123-4567',
      description: 'Mon to Fri 9am to 6pm'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'HEADQUARTERS',
      details: 'Digital Plaza, Tech District',
      description: 'Virtual Office - Global Reach'
    },
    {
      icon: FaClock,
      title: 'BUSINESS HOURS',
      details: '24/7 Support',
      description: 'We operate around the clock'
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 brand-ugarit">
            CONTACT US
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-helvetica font-bold">
            Get in touch with our luxury support team. We're here to provide exceptional service for our discerning clients.
          </p>
        </motion.div>

        {/* Contact Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-2xl p-6 text-center border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-turquoise to-neon-blue flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-black text-white mb-2 font-helvetica-heavy">
                {item.title}
              </h3>
              <p className="text-turquoise font-helvetica font-bold mb-1">
                {item.details}
              </p>
              <p className="text-gray-400 text-sm font-helvetica">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="glass-card rounded-2xl p-8 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-turquoise to-neon-blue flex items-center justify-center">
                <FaHeadset className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white font-helvetica-heavy">
                  SEND US A MESSAGE
                </h2>
                <p className="text-gray-400 font-helvetica font-bold">
                  We'll respond within 24 hours
                </p>
              </div>
            </div>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                  <FaEnvelope className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2 font-helvetica-heavy">
                  MESSAGE SENT!
                </h3>
                <p className="text-gray-400 font-helvetica font-bold">
                  Thank you for contacting us. We'll get back to you soon.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-6 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors font-helvetica font-bold"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </motion.div>
            ) : (
              <ContactForm onSuccess={() => setFormSubmitted(true)} />
            )}
          </motion.div>

          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="space-y-6"
          >
            {/* Premium Support Card */}
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-black text-white mb-4 font-helvetica-heavy">
                PREMIUM SUPPORT
              </h3>
              <ul className="space-y-3">
                {[
                  '24/7 Priority Support Access',
                  'Dedicated Account Manager',
                  'Fast Response Times (< 2 hours)',
                  'Custom Solutions & Integration',
                  'White-Glove Service Guarantee'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300 font-helvetica font-bold">
                    <div className="w-2 h-2 bg-turquoise rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Commitment Card */}
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-black text-white mb-4 font-helvetica-heavy">
                OUR COMMITMENT
              </h3>
              <p className="text-gray-300 font-helvetica font-bold mb-4">
                At Ugarit Digital, we believe in providing exceptional service that matches the quality of our luxury digital products.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-helvetica font-bold">Response Time</span>
                  <span className="text-turquoise font-helvetica-heavy">Under 2 Hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-helvetica font-bold">Support Languages</span>
                  <span className="text-turquoise font-helvetica-heavy">English, Arabic, French</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-helvetica font-bold">Satisfaction Rate</span>
                  <span className="text-turquoise font-helvetica-heavy">99.8%</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="glass-card rounded-2xl p-6 border border-yellow-500/20 bg-yellow-500/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-xl bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30">
                  <FaPhone className="w-3 h-3 text-yellow-400" />
                </div>
                <h3 className="text-lg font-black text-white font-helvetica-heavy">
                  URGENT SUPPORT
                </h3>
              </div>
              <p className="text-gray-300 font-helvetica font-bold mb-3">
                For critical issues requiring immediate attention
              </p>
              <div className="text-center">
                <p className="text-yellow-400 text-lg font-helvetica-heavy mb-2">
                  +1 (555) 911-UGARIT
                </p>
                <p className="text-gray-400 text-sm font-helvetica">
                  Available 24/7 for premium clients
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}