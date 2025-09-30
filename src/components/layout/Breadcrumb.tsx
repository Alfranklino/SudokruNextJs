'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbProps {
  className?: string;
}

export function Breadcrumb({ className }: BreadcrumbProps) {
  const pathname = usePathname();

  // Don't show breadcrumbs on root pages
  const rootPages = ['/', '/dashboard', '/login', '/register', '/forgot-password', '/verify-email'];
  if (rootPages.includes(pathname)) {
    return null;
  }

  // Generate breadcrumb items from pathname
  const pathSegments = pathname.split('/').filter(Boolean);

  // Don't show breadcrumbs if only one level deep
  if (pathSegments.length < 2) {
    return null;
  }

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = formatLabel(segment);
    const isLast = index === pathSegments.length - 1;

    return {
      href,
      label,
      isLast
    };
  });

  return (
    <nav className={cn('flex items-center gap-2 text-sm text-slate-500 mb-4', className)}>
      {/* Home link */}
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-slate-900 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>

      {/* Breadcrumb items */}
      {breadcrumbItems.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4" />
          {item.isLast ? (
            <span className="text-slate-900 font-medium">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="hover:text-slate-900 transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

// Format segment name for display
function formatLabel(segment: string): string {
  // Handle special cases
  const labelMap: Record<string, string> = {
    'play': 'Play',
    'single': 'Single Player',
    'quick': 'Quick Match',
    'custom': 'Custom Game',
    'practice': 'Practice Mode',
    'tournaments': 'Tournaments',
    'friends': 'Friends',
    'stats': 'Statistics',
    'settings': 'Settings',
    'profile': 'Profile',
  };

  if (labelMap[segment]) {
    return labelMap[segment];
  }

  // Default: capitalize first letter and replace hyphens with spaces
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}