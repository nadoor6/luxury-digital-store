/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Remove all neon colors, keep only black/white shades
                'luxury-black': '#000000',
                'luxury-white': '#FFFFFF',
                'luxury-gray': '#1A1A1A',
                'luxury-silver': '#E8E8E8',
            },
            animation: {
                'float': 'float 8s ease-in-out infinite',
                'fade-in-up': 'fadeInUp 0.8s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-15px)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            },
            backdropBlur: {
                xs: '2px',
            },
            scale: {
                '105': '1.05',
                '102': '1.02',
            },
            fontFamily: {
                'helvetica': ['Helvetica', 'Arial', 'sans-serif'],
                'helvetica-heavy': ['Helvetica Heavy', 'Helvetica', 'Arial', 'sans-serif'],
            },
            borderRadius: {
                'lg': '0.75rem', // Increased from default
                'xl': '1rem', // Increased from default
                '2xl': '1.5rem', // Increased from default
                '3xl': '2rem', // New larger radius
            }
        },
    },
    plugins: [],
}