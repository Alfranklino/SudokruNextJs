'use client';

import { ComingSoonPage } from '@/components/ComingSoonPage';

export default function DailyChallengePage() {
  return (
    <ComingSoonPage
      title="Daily Challenge"
      description="This feature is currently under development. Get ready to test your skills with our unique daily puzzles!"
      estimatedRelease="Phase 2"
      features={[
        'New puzzle every day at midnight',
        'Global leaderboard for each challenge',
        'Streak tracking and rewards',
        'Special badges for perfect solutions',
        'Time-limited challenges',
        'XP and coin rewards'
      ]}
    />
  );
}
