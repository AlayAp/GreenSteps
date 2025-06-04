import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.pixabay.com', 'images.unsplash.com', 'via.placeholder.com']
  }
};

export default nextConfig;