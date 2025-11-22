/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev-retro-wizard-demo.pantheonsite.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;