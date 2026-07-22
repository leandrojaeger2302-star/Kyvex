import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: produces a plain HTML/CSS/JS `out/` folder that can be
  // drag-and-dropped onto Netlify (or any static host) with no build step
  // required on their side.
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d8j0ntlcm91z4.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
