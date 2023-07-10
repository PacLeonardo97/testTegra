/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
    "@pokemon/service"
]);

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@pokemon/service'],
  };
   
  module.exports = nextConfig;