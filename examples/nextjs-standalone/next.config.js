/** @type {import('next').NextConfig} */

// Only required within the scope of this monorepo
const nextConfig = {
  transpilePackages: [
    '@web3modal/ethereum',
    '@bitizenwallet/web3modal-react',
    '@bitizenwallet/web3modal-ui',
    '@bitizenwallet/web3modal-core'
  ],
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
