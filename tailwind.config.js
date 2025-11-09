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
                turquoise: '#40E0D0',
                'neon-blue': '#00C8FF',
                'neon-purple': '#B446FF',
                'neon-pink': '#FF46B4',
                'dark-grey': '#2C2C2C',
                'cream-white': '#F5F5F5',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'gradient-shift': 'gradientShift 4s ease infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%': { transform: 'translateY(-20px) rotate(1deg)' },
                },
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                }
            },
            backdropBlur: {
                xs: '2px',
            },
            scale: {
                '105': '1.05',
                '102': '1.02',
            }
        },
    },
    plugins: [],
}