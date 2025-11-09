// next.config.js
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
    // ... your other config
    output: 'export', // Keep this if you need static export
    webpack: (config) => {
        config.plugins.push(
            new CopyPlugin({
                patterns: [{
                    from: path.join(__dirname, '.next/routes-manifest.json'),
                    to: path.join(__dirname, 'out/'),
                }, ],
            })
        );
        return config;
    },
}

module.exports = nextConfig;