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
                // Modern B&W color palette
                'luxury-black': '#000000',
                'luxury-white': '#FFFFFF',
                'luxury-gray': {
                    100: '#f7f7f7',
                    200: '#e6e6e6',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                },
                'glass-white': 'rgba(255, 255, 255, 0.1)',
                'glass-border': 'rgba(255, 255, 255, 0.2)',
            },
            animation: {
                'float-sophisticated': 'float-sophisticated 6s ease-in-out infinite',
                'fade-in-up': 'fadeInUp 0.8s ease-out',
                'shimmer': 'shimmer 3s infinite',
                'pulse-sophisticated': 'pulse-sophisticated 3s ease-in-out infinite',
                'gradient-shift': 'gradientShift 15s ease infinite',
                'background-float': 'floatBackground 20s ease-in-out infinite',
            },
            keyframes: {
                floatSophisticated: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '33%': { transform: 'translateY(-8px) rotate(0.5deg)' },
                    '66%': { transform: 'translateY(-4px) rotate(-0.5deg)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                pulseSophisticated: {
                    '0%, 100%': { opacity: '1', transform: 'scale(1)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.02)' },
                },
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                floatBackground: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '33%': { transform: 'translateY(-20px) rotate(1deg)' },
                    '66%': { transform: 'translateY(10px) rotate(-1deg)' },
                }
            },
            backdropBlur: {
                'xs': '2px',
                'sm': '4px',
                'md': '8px',
                'lg': '12px',
                'xl': '16px',
                '2xl': '24px',
                '3xl': '36px',
            },
            scale: {
                '105': '1.05',
                '102': '1.02',
            },
            fontFamily: {
                'helvetica': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
                'helvetica-heavy': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
            },
            borderRadius: {
                'lg': '0.75rem',
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },
            backgroundImage: {
                'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            }
        },
    },
    plugins: [],
}