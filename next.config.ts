import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export', // ضروري لتمكين التصدير الثابت ليعمل مع Capacitor
  images: {
    unoptimized: true, // ضروري لعمل الصور في نسخة الأندرويد
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;