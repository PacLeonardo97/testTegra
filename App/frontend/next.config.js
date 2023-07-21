/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@pokemon/service'],
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
