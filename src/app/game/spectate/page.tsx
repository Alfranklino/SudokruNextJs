'use client';

import { ComingSoonPage } from '@/components/ComingSoonPage';

export default function SpectateGamesPage() {
  return (
    <ComingSoonPage
      title="Spectate Live Games"
      description="Watch top players compete in real-time. This feature is under development!"
      estimatedRelease="Phase 2"
      features={[
        'Watch live matches from top players',
        'Spectator chat functionality',
        'Multiple camera angles (player perspectives)',
        'Real-time game statistics',
        'Follow your favorite players',
        'Tournament spectator mode'
      ]}
    />
  );
}
