import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    UNSPLASH_KEY: process.env.UNSPLASH_KEY,
    GIPHY_KEY: process.env.GIPHY_KEY
  },
  images: {
    domains: [
      'images.unsplash.com',
      'media.giphy.com',
      'giphy.com',
      'i.giphy.com',
      'giphyusercontent.com',
      "media0.giphy.com",
      "media1.giphy.com",
      "media2.giphy.com",
      "media3.giphy.com",
      "media4.giphy.com",
      "media5.giphy.com",
    ],
  },
  experimental: {
  },
};

export default nextConfig;
