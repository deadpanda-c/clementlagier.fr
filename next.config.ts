import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // manage cors error
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },

  
};

export default nextConfig;
