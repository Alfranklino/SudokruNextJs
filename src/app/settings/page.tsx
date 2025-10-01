'use client';

import { MainLayout } from '@/components/layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Settings as SettingsIcon, Clock } from 'lucide-react';

export default function SettingsPage() {
  return (
    <MainLayout isAuthenticated={true}>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto p-6">
          <Breadcrumb />
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          </div>

          {/* Coming Soon Card */}
          <Card className="p-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
                <SettingsIcon className="w-10 h-10 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Settings Feature Coming Soon
              </h2>
              <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
                Customize your gaming experience with account settings, game preferences, notifications, and privacy controls.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                <Clock className="w-4 h-4" />
                <span>Expected in Phase 2</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}