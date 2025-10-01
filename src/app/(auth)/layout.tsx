import { ReactNode } from 'react';
import { VisitorLayout } from '@/components/layout/VisitorLayout';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <VisitorLayout className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-md mx-auto px-4 py-12">
        {children}
      </div>
    </VisitorLayout>
  );
}