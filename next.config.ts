import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Todas las decisiones de arquitectura viven en instrucciones.md.
  // Aquí solo lo que Next.js exige que sea código.
  images: {
    // Cuando incrustemos imágenes externas (GitHub, YouTube thumbnails),
    // agregar los remotePatterns aquí.
    remotePatterns: [],
  },
};

export default nextConfig;
