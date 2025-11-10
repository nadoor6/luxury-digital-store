'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaComment, FaPaperPlane } from 'react-icons/fa';

interface ContactFormProps {
  onSuccess: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    onSuccess();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-black text-white mb-2 font-helvetica">
            FULL NAME
          </label>
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-turquoise/50 focus:border-transparent transition-all duration-300 font-helvetica font-bold"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-black text-white mb-2 font-helvetica">
            EMAIL ADDRESS
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-turquoise/50 focus:border-transparent transition-all duration-300 font-helvetica font-bold"
              placeholder="Enter your email"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-black text-white mb-2 font-helvetica">
          SUBJECT
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-turquoise/50 focus:border-transparent transition-all duration-300 font-helvetica font-bold"
          placeholder="What is this regarding?"
        />
      </div>

      <div>
        <label className="block text-sm font-black text-white mb-2 font-helvetica">
          MESSAGE
        </label>
        <div className="relative">
          <FaComment className="absolute left-4 top-4 text-gray-400 w-4 h-4" />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-turquoise/50 focus:border-transparent transition-all duration-300 font-helvetica font-bold resize-none"
            placeholder="Tell us how we can help you..."
          />
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="w-full btn-luxury flex items-center justify-center gap-3 text-lg font-black font-helvetica disabled:opacity-50 disabled:cursor-not-allowed py-4"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
        ) : (
          <FaPaperPlane className="w-5 h-5" />
        )}
        {loading ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}
      </motion.button>
    </form>
  );
}