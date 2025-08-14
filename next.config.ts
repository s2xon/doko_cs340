import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    allowedDevOrigins: [
      "http://classwork.engr.oregonstate.edu:43520", // Your Go backend origin
      "http://classwork.engr.oregonstate.edu:3617", // Your frontend dev server
    ],
  },
};

export default nextConfig;
