/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'images.unsplash.com',
      'plus.unsplash.com',
      'partynet.netlify.app'
    ],
  },
}

module.exports = nextConfig
