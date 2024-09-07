/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React's Strict Mode for improved development experience
  reactStrictMode: true,

  // Expose environment variables to the browser
  env: {
    // Make API URL available on the client-side
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // Set up API route rewrites for proxying requests
  async rewrites() {
    return [
      {
        // Rewrite requests to /api/* to the actual API server
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
};

// Export the configuration for Next.js to use
export default nextConfig;