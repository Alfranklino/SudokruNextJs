'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
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
  BarChart3,
  Play,
} from 'lucide-react';
import { mockCurrentUser } from '@/lib/mock-data';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface NavbarProps {
  variant?: 'visitor' | 'authenticated';
  enableScrollChange?: boolean;
  onSidebarToggle?: () => void;
}

export function Navbar({
  variant = 'visitor',
  enableScrollChange = false,
  onSidebarToggle
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationCount] = useState(5);
  const [isDark, setIsDark] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const isAuthenticated = variant === 'authenticated';

  const visitorNavItems = [
    { href: '/', label: 'Home' },
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
  ];

  const authenticatedNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/play', label: 'Play', icon: Gamepad },
    { href: '/tournaments', label: 'Tournaments', icon: Trophy, badge: 3 },
    { href: '/friends', label: 'Friends', icon: Users },
    { href: '/stats', label: 'Statistics', icon: BarChart3 },
  ];

  // GSAP ScrollTrigger for theme change
  useGSAP(() => {
    if (!enableScrollChange || !navRef.current) return;

    ScrollTrigger.create({
      start: '100px top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setIsDark(self.progress > 0);
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [enableScrollChange]);

  // Dynamic classes based on theme
  const navClasses = isDark
    ? 'bg-slate-900/95 backdrop-blur-md border-gray-700 shadow-xl'
    : 'bg-white border-gray-200';

  const textClasses = isDark ? 'text-white' : 'text-gray-900';
  const secondaryTextClasses = isDark ? 'text-gray-300' : 'text-gray-600';
  const hoverClasses = isDark
    ? 'hover:text-blue-400 hover:bg-blue-500/10'
    : 'hover:text-blue-600 hover:bg-blue-50';

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${navClasses}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            {/* Sidebar Toggle - Authenticated only */}
            {isAuthenticated && onSidebarToggle && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSidebarToggle}
                className={`mr-4 h-8 w-8 p-0 ${secondaryTextClasses} ${hoverClasses}`}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <h1 className={`text-2xl font-bold transition-colors ${textClasses}`}>
                Sudokru
              </h1>
              <Badge className={`ml-2 text-xs transition-colors ${
                isDark
                  ? 'bg-blue-500/20 text-blue-300 border-blue-400/30'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                Beta
              </Badge>
            </Link>

            {/* Desktop Navigation */}
            {!isAuthenticated ? (
              // Visitor Navigation
              <nav className="hidden md:flex ml-8 space-x-1">
                {visitorNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${secondaryTextClasses} ${hoverClasses}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            ) : (
              // Authenticated Navigation
              <nav className="hidden md:flex ml-8 space-x-1">
                {authenticatedNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors relative ${secondaryTextClasses} ${hoverClasses}`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                      {item.badge && (
                        <Badge className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              // Visitor Actions
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className={`hidden sm:flex ${secondaryTextClasses} ${hoverClasses}`}
                >
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  size="sm"
                  className={`${
                    isDark
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white`}
                  asChild
                >
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            ) : (
              // Authenticated Actions
              <>
                {/* Quick Play Button */}
                <Button
                  size="sm"
                  className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Gamepad className="w-4 h-4 mr-2" />
                  Quick Play
                </Button>

                {/* Notifications */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`relative ${secondaryTextClasses} ${hoverClasses}`}
                  >
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
                    <Button
                      variant="ghost"
                      className={`flex items-center space-x-2 ${hoverClasses}`}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={mockCurrentUser.avatar} alt={mockCurrentUser.username} />
                        <AvatarFallback>{mockCurrentUser.username[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="hidden sm:block text-left">
                        <div className={`text-sm font-medium ${textClasses}`}>
                          {mockCurrentUser.username}
                        </div>
                        <div className={`text-xs ${secondaryTextClasses}`}>
                          Rating: {mockCurrentUser.rating}
                        </div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className={`w-56 ${isDark ? 'bg-slate-800 border-gray-700' : 'bg-white border-gray-200'}`}
                  >
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className={`flex items-center ${secondaryTextClasses}`}>
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className={`flex items-center ${secondaryTextClasses}`}>
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
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`md:hidden ${secondaryTextClasses} ${hoverClasses}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-t py-3 transition-colors ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <nav className="space-y-1">
              {!isAuthenticated ? (
                // Visitor Mobile Menu
                <>
                  {visitorNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${secondaryTextClasses} ${hoverClasses}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="pt-3 border-t space-y-2">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
                      <Link href="/register">Get Started</Link>
                    </Button>
                  </div>
                </>
              ) : (
                // Authenticated Mobile Menu
                <>
                  {authenticatedNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors ${secondaryTextClasses} ${hoverClasses}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {item.label}
                        {item.badge && (
                          <Badge className="ml-auto bg-red-500 text-white text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    );
                  })}
                  <div className="pt-3 border-t">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Gamepad className="w-4 h-4 mr-2" />
                      Quick Play
                    </Button>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
}
