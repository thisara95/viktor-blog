import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppWrapper } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Viktor Blog',
  description: 'Blog posts from Viktor.ai',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
