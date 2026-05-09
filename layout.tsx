import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'دفتر الحسابات المحترف - Daftar Pro',
  description: 'إدارة مالية متكاملة لمتجرك مع دعم العملات والذكاء الاصطناعي',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#5E9BCD',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/20 bg-[#F0F2F5]">
        <div className="max-w-[480px] mx-auto min-h-screen relative shadow-2xl bg-background overflow-x-hidden border-x border-border/5">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}