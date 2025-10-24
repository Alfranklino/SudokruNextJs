/**
 * Admin Feature Flags Page
 * Admin dashboard for managing feature flags
 */

import { FlagDashboard } from '@/components/feature-flags';

export const metadata = {
  title: 'Feature Flags | Sudokru Admin',
  description: 'Manage feature flags and rollouts',
};

export default function AdminFlagsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <FlagDashboard />
    </div>
  );
}
