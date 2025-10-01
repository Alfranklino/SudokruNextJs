import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect mappings for incorrect/old routes
  const redirects: Record<string, string> = {
    '/game/play': '/play',
    '/game/single-player': '/play/single',
    '/leaderboard': '/leaderboards',
  };

  // Check if current path matches any redirect
  if (redirects[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = redirects[pathname];
    return NextResponse.redirect(url);
  }

  // Redirect base /game to /play
  if (pathname === '/game' && !pathname.includes('/game/')) {
    const url = request.nextUrl.clone();
    url.pathname = '/play';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/game/:path*',
    '/leaderboard',
  ],
};
