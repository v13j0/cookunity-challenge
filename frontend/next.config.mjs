/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['img.pokemondb.net'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.pokemondb.net/',
                port: '',
                pathname: '/sprites/home/normal/2x/avif/**',
            },
        ],
    },
};

export default nextConfig;
