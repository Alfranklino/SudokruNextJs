'use client';

import { ReactNode, useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
  isAuthenticated?: boolean;
}

export function MainLayout({ children, className = '', isAuthenticated = true }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Show sidebar only if authenticated */}
      {isAuthenticated && (
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={handleSidebarToggle}
        />
      )}

      <div className={`${isAuthenticated ? `${sidebarOpen ? 'ml-64' : 'ml-16'}` : ''} transition-all duration-300 ease-in-out`}>
        <Header
          isAuthenticated={isAuthenticated}
          onSidebarToggle={isAuthenticated ? handleSidebarToggle : undefined}
        />

        <main className="pt-20 p-6">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}