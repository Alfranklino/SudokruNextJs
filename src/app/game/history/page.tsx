'use client';

import { ComingSoonPage } from '@/components/ComingSoonPage';

export default function GameHistoryPage() {
  return (
    <ComingSoonPage
      title="Game History"
      description="View and replay all your past games. This feature is coming soon!"
      estimatedRelease="Phase 2"
      features={[
        'Complete game history with filters',
        'Replay any past game move-by-move',
        'Performance statistics per game',
        'Export game data',
        'Share notable games with friends',
        'Game analysis and insights'
      ]}
    />
  );
}
