/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
            },
        ],
        unoptimized: process.env.NODE_ENV === 'production', // Only unoptimized for production
    },
    // Remove any output: 'export' if present
    trailingSlash: true,
}

module.exports = nextConfig