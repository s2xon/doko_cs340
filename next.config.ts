import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    allowedDevOrigins: [
      "http://classwork.engr.oregonstate.edu:8019", // Your Go backend origin
      "http://classwork.engr.oregonstate.edu:3004", // Your frontend dev server
    ],
  },
};

export default nextConfig;
