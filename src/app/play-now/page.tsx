'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PlayableDemo } from '@/components/game/PlayableDemo';

export default function PlayNowPage() {
  return (
    <>
      <Navbar variant="visitor" enableScrollChange={false} />
      <div className="h-16" />

      <PlayableDemo
        title="Play Sudokru Now - Free Demo"
        description="Try our full Sudoku experience with no registration required. Choose your difficulty and start solving!"
        showSignUpPrompt={true}
      />

      <Footer />
    </>
  );
}
