import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Evita el proxy de Next.js que falla por certificados SSL en algunas redes
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
