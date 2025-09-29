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
} from 'lucide-react';
import { mockCurrentUser } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

const navigationItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/play', label: 'Play', icon: Gamepad },
  { href: '/tournaments', label: 'Tournaments', icon: Trophy, badge: 3 },
  { href: '/friends', label: 'Friends', icon: Users },
  { href: '/stats', label: 'Statistics', icon: BarChart3 },
];

const bottomItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/help', label: 'Help', icon: HelpCircle },
];

export function Sidebar({ isOpen, onToggle, className = '' }: SidebarProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sidebarWidth = isOpen ? 'w-70' : 'w-16';
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
          'fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-40 transition-all duration-300 ease-in-out flex flex-col',
          sidebarWidth,
          sidebarTransform,
          isMobile && 'shadow-lg',
          className
        )}
      >
        {/* Toggle Button */}
        <div className="flex justify-end p-2 border-b border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0"
          >
            {isOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 rounded-md transition-colors relative group',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600',
                  !isOpen && 'justify-center'
                )}
                title={!isOpen ? item.label : undefined}
              >
                <Icon className={cn('h-5 w-5 flex-shrink-0', isOpen && 'mr-3')} />

                {isOpen && (
                  <>
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge className="ml-auto bg-red-100 text-red-800 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}

                {/* Tooltip for collapsed state */}
                {!isOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                    {item.badge && (
                      <span className="ml-1 bg-red-500 text-white px-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 p-4 space-y-1">
          {/* Bottom Navigation Items */}
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 rounded-md transition-colors relative group',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600',
                  !isOpen && 'justify-center'
                )}
                title={!isOpen ? item.label : undefined}
              >
                <Icon className={cn('h-5 w-5 flex-shrink-0', isOpen && 'mr-3')} />

                {isOpen && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}

                {/* Tooltip for collapsed state */}
                {!isOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}

          {/* User Profile Section */}
          <div className="pt-2 border-t border-gray-100">
            {isOpen ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-3 py-2 h-auto"
                  >
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src={mockCurrentUser.avatar} alt={mockCurrentUser.username} />
                      <AvatarFallback className="text-xs">
                        {mockCurrentUser.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {mockCurrentUser.username}
                      </div>
                      <div className="text-xs text-gray-500">
                        Rating: {mockCurrentUser.rating}
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={mockCurrentUser.avatar} alt={mockCurrentUser.username} />
                        <AvatarFallback className="text-xs">
                          {mockCurrentUser.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 ml-2">
                    <div className="px-2 py-1.5 text-sm">
                      <div className="font-medium">{mockCurrentUser.username}</div>
                      <div className="text-xs text-gray-500">Rating: {mockCurrentUser.rating}</div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}