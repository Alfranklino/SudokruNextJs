'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description?: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Construction className="w-24 h-24 text-yellow-500 animate-pulse" />
            <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl"></div>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
          {title}
        </h1>

        <p className="text-xl text-gray-300 mb-4">
          Coming Soon
        </p>

        {description && (
          <p className="text-lg text-gray-400 mb-8 max-w-lg mx-auto">
            {description}
          </p>
        )}

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 mb-8">
          <p className="text-gray-300 mb-4">
            We're working hard to bring you this feature. Stay tuned!
          </p>
          <p className="text-sm text-gray-500">
            Want to be notified when this launches? Follow us on social media or join our Discord community.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/play">
            <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-gray-900">
              Play Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
