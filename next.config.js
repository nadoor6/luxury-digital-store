/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    typescript: {
        ignoreBuildErrors: false, // Change to false to see TypeScript errors
    },
    eslint: {
        ignoreDuringBuilds: false, // Change to false to see ESLint errors
    },
    images: {
        domains: ['localhost', 'firebasestorage.googleapis.com'],
        unoptimized: process.env.NODE_ENV === 'production', // Required for static export
    },
    trailingSlash: true,
    output: 'export' // Add this for static export
}

module.exports = nextConfig