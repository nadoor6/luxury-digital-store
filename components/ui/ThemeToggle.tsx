'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Monitor } from 'lucide-react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, systemTheme } = useTheme()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    )
  }

  const currentTheme = theme === 'system' ? systemTheme : theme

  const themes = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ]

  return (
    <div className="relative">
      {/* Theme Selector Dropdown */}
      <div className="group relative">
        <motion.button
          className="w-12 h-12 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-turquoise/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTheme}
              initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              {currentTheme === 'dark' ? (
                <Moon className="w-5 h-5 text-turquoise" />
              ) : (
                <Sun className="w-5 h-5 text-turquoise" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>

        {/* Dropdown Menu */}
        <div className="absolute right-0 top-14 hidden group-hover:block z-50">
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="glass dark:glass-dark rounded-2xl p-2 min-w-48 shadow-2xl border border-white/20"
          >
            <div className="space-y-1">
              {themes.map((themeOption) => {
                const Icon = themeOption.icon
                const isActive = 
                  (themeOption.value === 'system' && theme === 'system') ||
                  (themeOption.value === 'light' && theme === 'light') ||
                  (themeOption.value === 'dark' && theme === 'dark')

                return (
                  <motion.button
                    key={themeOption.value}
                    onClick={() => setTheme(themeOption.value)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-display transition-all duration-200 ${
                      isActive
                        ? 'bg-turquoise/20 text-turquoise'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-700/50'
                    }`}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{themeOption.label}</span>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-turquoise rounded-full ml-auto"
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-turquoise/10 to-purple-500/10 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </div>
  )
}