'use client';

import { VisitorLayout } from '@/components/layout/VisitorLayout';
import { PlayableDemo } from '@/components/game/PlayableDemo';

export default function PlayNowPage() {
  return (
    <VisitorLayout>
      <PlayableDemo
        title="Play Sudokru Now - Free Demo"
        description="Try our full Sudoku experience with no registration required. Choose your difficulty and start solving!"
        showSignUpPrompt={true}
      />
    </VisitorLayout>
  );
}
