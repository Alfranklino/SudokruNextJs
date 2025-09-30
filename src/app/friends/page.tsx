'use client';

import { MainLayout } from '@/components/layout';
import { Card } from '@/components/ui/card';
import { Users, Clock } from 'lucide-react';

export default function FriendsPage() {
  return (
    <MainLayout isAuthenticated={true}>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Friends</h1>
          </div>

          {/* Coming Soon Card */}
          <Card className="p-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Friends Feature Coming Soon
              </h2>
              <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
                Connect with other Sudoku players, challenge friends to matches, and build your gaming community.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                <Clock className="w-4 h-4" />
                <span>Expected in Phase 3</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}