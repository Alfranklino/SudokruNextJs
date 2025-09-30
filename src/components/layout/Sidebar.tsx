'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Home,
  Play,
  Gamepad,
  Trophy,
  Users,
  BarChart3,
  Settings,
  User,
  LogOut,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Zap,
  Brain,
  CircleIcon,
  ArrowRight,
} from 'lucide-react';
import { mockCurrentUser } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

interface NavigationChild {
  href: string;
  label: string;
  icon: React.ComponentType<any>;
  badge?: string | number;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

interface NavigationItem {
  href: string;
  label: string;
  icon: React.ComponentType<any>;
  badge?: string | number;
  hasChildren?: boolean;
  children?: NavigationChild[];
}

const navigationItems: NavigationItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  {
    href: '/play',
    label: 'Play',
    icon: Gamepad,
    badge: 2,
    hasChildren: true,
    children: [
      { href: '/play/single', label: 'Single Player', icon: Play },
      { href: '/play/quick', label: 'Quick Match', icon: Zap, badge: '~30s', badgeVariant: 'secondary' },
      { href: '/play/custom', label: 'Custom Game', icon: Settings },
      { href: '/play/practice', label: 'Practice Mode', icon: Brain },
    ]
  },
  { href: '/tournaments', label: 'Tournaments', icon: Trophy, badge: 3 },
  { href: '/friends', label: 'Friends', icon: Users, badge: 5 },
  { href: '/stats', label: 'Statistics', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

// Timer state for next tournament
const getNextTournamentTime = () => {
  // Mock countdown - in real app this would come from API
  return { hours: 2, minutes: 45, seconds: 32 };
};

export function Sidebar({ isOpen, onToggle, className = '' }: SidebarProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [tournamentTime, setTournamentTime] = useState(getNextTournamentTime());

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Timer for tournament countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTournamentTime(getNextTournamentTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  const sidebarWidth = isOpen ? 'w-64' : 'w-16';
  const sidebarTransform = isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0';

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 left-0 h-screen bg-slate-50 border-r border-slate-200 z-40 transition-all duration-300 ease-in-out flex flex-col',
          sidebarWidth,
          sidebarTransform,
          isMobile && 'shadow-lg',
          className
        )}
      >
        {/* Top Section */}
        <div className="p-4 space-y-4">
          {/* Quick Play Button */}
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg"
            size="lg"
          >
            <Play className="w-4 h-4 mr-3" />
            Quick Play
          </Button>

          {/* Next Tournament Alert */}
          {isOpen && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-800">Next Tournament</span>
              </div>
              <div className="font-mono text-lg font-bold text-amber-900">
                {String(tournamentTime.hours).padStart(2, '0')}:
                {String(tournamentTime.minutes).padStart(2, '0')}:
                {String(tournamentTime.seconds).padStart(2, '0')}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 mx-4" />

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || 
              (item.hasChildren && item.children?.some(child => pathname === child.href));
            const isExpanded = expandedItems.includes(item.href);

            return (
              <div key={item.href}>
                {item.hasChildren && isOpen ? (
                  <button
                    onClick={() => toggleExpanded(item.href)}
                    className={cn(
                      'w-full flex items-center px-3 py-2.5 rounded-md transition-colors text-left',
                      isActive
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100'
                    )}
                  >
                    <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span className="text-sm font-medium flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge variant={isActive ? "secondary" : "destructive"} className="mr-2 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className={cn(
                      "w-4 h-4 transition-transform",
                      isExpanded && "rotate-90"
                    )} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center px-3 py-2.5 rounded-md transition-colors relative group',
                      isActive
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100',
                      !isOpen && 'justify-center'
                    )}
                    title={!isOpen ? item.label : undefined}
                  >
                    <Icon className={cn('w-4 h-4 flex-shrink-0', isOpen && 'mr-3')} />

                    {isOpen && (
                      <>
                        <span className="text-sm font-medium">{item.label}</span>
                        {item.badge && (
                          <Badge variant={isActive ? "secondary" : "outline"} className="ml-auto text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}

                    {/* Tooltip for collapsed state */}
                    {!isOpen && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                        {item.label}
                        {item.badge && (
                          <span className="ml-1 bg-red-500 text-white px-1 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                )}

                {/* Children items */}
                {item.hasChildren && isExpanded && isOpen && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children?.map((child) => {
                      const ChildIcon = child.icon;
                      const isChildActive = pathname === child.href;

                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'flex items-center px-3 py-2 rounded-md transition-colors text-sm',
                            isChildActive
                              ? 'bg-slate-200 text-slate-900'
                              : 'text-slate-600 hover:bg-slate-100'
                          )}
                        >
                          <ChildIcon className="w-4 h-4 mr-3 flex-shrink-0" />
                          <span className="flex-1">{child.label}</span>
                          {child.badge && (
                            <Badge 
                              variant={child.badgeVariant === 'secondary' ? 'secondary' : 'outline'} 
                              className="text-xs"
                            >
                              {child.badge}
                            </Badge>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="border-t border-slate-200 mx-4" />

        {/* Live Games Alert */}
        {isOpen && (
          <div className="m-4 bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-800">2 Live Games</span>
            </div>
            <button className="text-xs text-green-700 hover:text-green-800 font-medium flex items-center gap-1">
              View Active Games
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Collapse Button */}
        <div className="p-4 border-t border-slate-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="w-full justify-center"
          >
            {isOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </>
  );
}