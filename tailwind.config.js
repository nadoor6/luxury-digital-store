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
                'luxury-black': '#000000',
                'luxury-white': '#FFFFFF',
                'luxury-gray': {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#e5e5e5',
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
                'fade-in-up': 'fade-in-up 0.8s ease-out',
                'spin-smooth': 'spin 2s linear infinite',
                'pulse-sophisticated': 'pulse 3s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'spin': {
                    'from': { transform: 'rotate(0deg)' },
                    'to': { transform: 'rotate(360deg)' },
                },
                'pulse': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
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
            fontFamily: {
                'helvetica': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
                'helvetica-bold': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
                'helvetica-black': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
            },
            borderRadius: {
                'lg': '0.75rem',
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },
            backgroundImage: {
                'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                'finance-gradient': 'linear-gradient(135deg, #1a1a1a 0%, #000000 50%, #1a1a1a 100%)',
            },
        },
    },
    plugins: [],
}