'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Navbar and Footer to avoid SSR issues with GSAP
const Navbar = dynamic(
  () => import('@/components/layout/Navbar').then(mod => ({ default: mod.Navbar })),
  { ssr: false }
);

const Footer = dynamic(
  () => import('@/components/layout/Footer').then(mod => ({ default: mod.Footer })),
  { ssr: false }
);

interface VisitorLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * VisitorLayout - Layout for non-authenticated users
 *
 * Used for:
 * - Landing pages (home, play-now, tournaments-preview, leaderboards-preview)
 * - Auth pages (login, register, forgot-password)
 * - Public pages (about, contact, help, etc.)
 *
 * Features:
 * - Navbar with scroll effect (light to dark)
 * - Footer with dark theme
 * - Responsive design
 */
export function VisitorLayout({ children, className = '' }: VisitorLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className={`flex-1 ${className}`}>
        {children}
      </main>

      <Footer isAuthenticated={false} />
    </div>
  );
}
