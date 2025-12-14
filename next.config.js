/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/renewable-netflix-dashboard' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/renewable-netflix-dashboard/' : '',
}

module.exports = nextConfig