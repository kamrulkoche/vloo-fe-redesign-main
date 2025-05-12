/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vloo.lamptechs.com",
      },
    ],
  },
};

export default nextConfig;
