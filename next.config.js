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
        unoptimized: true,
    },
    experimental: {
        turbo: {
            rules: {
                '*.css': {
                    loaders: ['postcss-loader'],
                },
            },
        },
    },
}

module.exports = nextConfig