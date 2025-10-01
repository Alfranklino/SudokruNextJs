'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Bell,
  User,
  Settings,
  LogOut,
  Trophy,
  Menu,
  X,
  Home,
  Gamepad,
  Users,
  BarChart3
} from 'lucide-react';
import { mockCurrentUser } from '@/lib/mock-data';

interface HeaderProps {
  className?: string;
  isAuthenticated?: boolean;
  onSidebarToggle?: () => void;
}

export function Header({ className = '', isAuthenticated = true, onSidebarToggle }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationCount] = useState(5);

  const navigationItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/play', label: 'Play', icon: Gamepad },
    { href: '/tournaments', label: 'Tournaments', icon: Trophy, badge: 3 },
    { href: '/friends', label: 'Friends', icon: Users },
    { href: '/stats', label: 'Statistics', icon: BarChart3 },
  ];

  return (
    <header className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            {/* Sidebar Toggle Button - Only show if authenticated and toggle function provided */}
            {isAuthenticated && onSidebarToggle && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSidebarToggle}
                className="mr-4 h-8 w-8 p-0"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}

            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/brand/SudoKru_Logo_Brand.webp"
                alt="Sudokru"
                width={140}
                height={36}
                className="h-9 w-auto transition-opacity duration-500"
                priority
              />
              <Badge className="text-xs bg-blue-100 text-blue-800">
                Beta
              </Badge>
            </Link>

            {/* Desktop Navigation - Only show if authenticated */}
            {isAuthenticated && (
              <nav className="hidden md:flex ml-8 space-x-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors relative"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                      {item.badge && (
                        <Badge className="ml-2 bg-red-100 text-red-800 text-xs px-1.5 py-0.5">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Right Side - Conditional based on authentication */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Quick Play Button */}
                <Button size="sm" className="hidden sm:flex bg-blue-600 hover:bg-blue-700">
                  <Gamepad className="w-4 h-4 mr-2" />
                  Quick Play
                </Button>

                {/* Notifications */}
                <div className="relative">
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="w-5 h-5" />
                    {notificationCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-5 h-5 flex items-center justify-center">
                        {notificationCount}
                      </Badge>
                    )}
                  </Button>
                </div>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-50">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={mockCurrentUser.avatar} alt={mockCurrentUser.username} />
                        <AvatarFallback>{mockCurrentUser.username[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="hidden sm:block text-left">
                        <div className="text-sm font-medium text-gray-900">{mockCurrentUser.username}</div>
                        <div className="text-xs text-gray-500">Rating: {mockCurrentUser.rating}</div>
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
              </>
            ) : (
              <>
                {/* Guest Header - Sign In/Sign Up buttons */}
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-3">
            <nav className="space-y-1">
              {isAuthenticated ? (
                <>
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {item.label}
                        {item.badge && (
                          <Badge className="ml-auto bg-red-100 text-red-800 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    );
                  })}

                  {/* Mobile Quick Play */}
                  <div className="pt-3 border-t border-gray-200">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Gamepad className="w-4 h-4 mr-2" />
                      Quick Play
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Mobile Guest Actions */}
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                      <Link href="/register">Get Started</Link>
                    </Button>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}