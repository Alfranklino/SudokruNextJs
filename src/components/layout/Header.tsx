'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  BarChart3
} from 'lucide-react';
import { mockCurrentUser } from '@/lib/mock-data';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeaderProps {
  className?: string;
  isAuthenticated?: boolean;
  onSidebarToggle?: () => void;
}

export function Header({ className = '', isAuthenticated = true, onSidebarToggle }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationCount] = useState(5);
  const [isDark, setIsDark] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const navigationItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/play', label: 'Play', icon: Gamepad },
    { href: '/tournaments', label: 'Tournaments', icon: Trophy, badge: 3 },
    { href: '/friends', label: 'Friends', icon: Users },
    { href: '/stats', label: 'Statistics', icon: BarChart3 },
  ];

  // GSAP ScrollTrigger for smooth theme change
  useGSAP(() => {
    if (!headerRef.current) return;

    const headerElement = headerRef.current;

    ScrollTrigger.create({
      start: '50px top',
      end: '200px top',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;

        // Smoothly transition between light and dark
        if (progress > 0.3 && !isDark) {
          setIsDark(true);
        } else if (progress <= 0.3 && isDark) {
          setIsDark(false);
        }

        // Animate background opacity
        gsap.to(headerElement, {
          backgroundColor: progress > 0.3
            ? 'rgba(15, 23, 42, 0.95)'
            : 'rgba(255, 255, 255, 1)',
          duration: 0.6,
          ease: 'power2.out',
        });

        // Animate border
        gsap.to(headerElement, {
          borderColor: progress > 0.3
            ? 'rgba(55, 65, 81, 1)'
            : 'rgba(229, 231, 235, 1)',
          duration: 0.6,
          ease: 'power2.out',
        });

        // Animate shadow
        gsap.to(headerElement, {
          boxShadow: progress > 0.3
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
            : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          duration: 0.6,
          ease: 'power2.out',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isDark]);

  // Dynamic classes based on theme
  const headerClasses = isDark
    ? 'bg-slate-900/95 backdrop-blur-md border-gray-700 shadow-xl'
    : 'bg-white border-gray-200';

  const textClasses = isDark ? 'text-white' : 'text-gray-900';
  const secondaryTextClasses = isDark ? 'text-gray-300' : 'text-gray-600';
  const hoverClasses = isDark
    ? 'hover:text-blue-400 hover:bg-blue-500/10'
    : 'hover:text-blue-600 hover:bg-blue-50';

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ease-out ${headerClasses} ${className}`}
      style={{
        transitionProperty: 'background-color, border-color, box-shadow, color',
      }}
    >
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
                className={`mr-4 h-8 w-8 p-0 ${isDark ? 'hover:bg-gray-700' : ''}`}
              >
                <Menu className={`h-5 w-5 ${textClasses}`} />
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
              <Badge className={`text-xs ${isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
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
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors relative ${secondaryTextClasses} ${hoverClasses}`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                      {item.badge && (
                        <Badge className={`ml-2 text-xs px-1.5 py-0.5 ${isDark ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'}`}>
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
                <Button size="sm" className={`hidden sm:flex ${isDark ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
                  <Gamepad className="w-4 h-4 mr-2" />
                  Quick Play
                </Button>

                {/* Notifications */}
                <div className="relative">
                  <Button variant="ghost" size="sm" className={`relative ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                    <Bell className={`w-5 h-5 ${textClasses}`} />
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
                    <Button variant="ghost" className={`flex items-center space-x-2 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={mockCurrentUser.avatar} alt={mockCurrentUser.username} />
                        <AvatarFallback>{mockCurrentUser.username[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="hidden sm:block text-left">
                        <div className={`text-sm font-medium ${textClasses}`}>{mockCurrentUser.username}</div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Rating: {mockCurrentUser.rating}</div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className={`w-56 ${isDark ? 'bg-slate-800 border-gray-700' : 'bg-white'}`}>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className={`flex items-center ${isDark ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-900'}`}>
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className={`flex items-center ${isDark ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-900'}`}>
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
                <Button variant="outline" size="sm" asChild className={isDark ? 'border-gray-600 text-white hover:bg-gray-700' : ''}>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" className={isDark ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`md:hidden ${isDark ? 'hover:bg-gray-700' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={`w-5 h-5 ${textClasses}`} />
              ) : (
                <Menu className={`w-5 h-5 ${textClasses}`} />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-t py-3 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <nav className="space-y-1">
              {isAuthenticated ? (
                <>
                  {navigationItems.map((item) => {
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
                          <Badge className={`ml-auto text-xs ${isDark ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'}`}>
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    );
                  })}

                  {/* Mobile Quick Play */}
                  <div className={`pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <Button className={`w-full ${isDark ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
                      <Gamepad className="w-4 h-4 mr-2" />
                      Quick Play
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Mobile Guest Actions */}
                  <div className="space-y-2">
                    <Button variant="outline" className={`w-full ${isDark ? 'border-gray-600 text-white hover:bg-gray-700' : ''}`} asChild>
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button className={`w-full ${isDark ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'}`} asChild>
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