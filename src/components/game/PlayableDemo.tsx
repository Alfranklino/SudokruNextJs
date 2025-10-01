'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SudokuGrid } from '@/components/game/SudokuGrid';
import { NumberTracker } from '@/components/game/NumberTracker';
import { Play, Trophy, RotateCcw, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { useSinglePlayerStore } from '@/stores/singlePlayerStore';
import { DEFAULT_HIGHLIGHT_CONFIG } from '@/types/game-config';
import type { Difficulty } from '@/lib/sudoku/difficulty';

interface PlayableDemoProps {
  title?: string;
  description?: string;
  showSignUpPrompt?: boolean;
}

export function PlayableDemo({
  title = "Try Sudokru Now - No Sign Up Required",
  description = "Experience the full game right in your browser. Start playing instantly!",
  showSignUpPrompt = true
}: PlayableDemoProps) {
  const [hasShownConfetti, setHasShownConfetti] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');

  const {
    gameStatus,
    initialGrid,
    currentGrid,
    solution,
    elapsedTime,
    moveCount,
    errorCount,
    startNewGame,
    restartGame,
    makeMove,
    updateElapsedTime,
  } = useSinglePlayerStore();

  // Trigger confetti on game completion
  useEffect(() => {
    if (gameStatus === 'completed' && !hasShownConfetti) {
      setHasShownConfetti(true);

      // Fire confetti
      const duration = 3000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        confetti({
          particleCount: 3,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'],
        });
      }, 50);
    }
  }, [gameStatus, hasShownConfetti]);

  // Reset confetti flag when starting new game
  useEffect(() => {
    if (gameStatus === 'playing') {
      setHasShownConfetti(false);
    }
  }, [gameStatus]);

  const handleStartGame = () => {
    startNewGame(selectedDifficulty, 'unlimited');
  };

  const handleCellChange = (row: number, col: number, value: number) => {
    makeMove(row, col, value);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="try-now" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h3>
          <p className="text-lg text-gray-600">
            {description}
          </p>
        </div>

        {gameStatus === 'idle' || gameStatus === 'abandoned' ? (
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full">
                  <Play className="w-10 h-10 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Ready to Play?</h4>
                  <p className="text-gray-600">Select your difficulty and start your first game</p>
                </div>

                {/* Difficulty Selection */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['easy', 'medium', 'hard', 'expert'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff as Difficulty)}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        selectedDifficulty === diff
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold capitalize">{diff}</div>
                    </button>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleStartGame}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Playing
                </Button>

                {showSignUpPrompt && (
                  <div className="text-sm text-gray-500">
                    Want to save your progress and track stats?{' '}
                    <Link href="/register" className="text-blue-600 hover:underline font-medium">
                      Create a free account
                    </Link>
                  </div>
                )}
              </div>
            </Card>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <Card className="p-8">
              {/* Game Completed Badge */}
              {gameStatus === 'completed' && (
                <div className="text-center mb-6">
                  <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
                    <Trophy className="w-5 h-5 mr-2" />
                    Puzzle Completed! 🎉
                  </Badge>
                </div>
              )}

              {/* Game Stats */}
              <div className="flex items-center justify-center gap-6 mb-6 text-sm flex-wrap">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="font-mono font-semibold text-slate-700">
                    {formatTime(elapsedTime)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-slate-600">Moves:</span>
                  <span className="font-semibold text-slate-900">{moveCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-slate-600">Errors:</span>
                  <span className="font-semibold text-red-600">{errorCount}</span>
                </div>
              </div>

              {/* Sudoku Grid */}
              <div className="flex justify-center mb-6">
                {initialGrid && currentGrid && solution && (
                  <SudokuGrid
                    initialGrid={initialGrid}
                    currentGrid={currentGrid}
                    solution={solution}
                    showErrors={true}
                    highlightConfig={DEFAULT_HIGHLIGHT_CONFIG}
                    onCellChange={handleCellChange}
                    readOnly={gameStatus === 'completed'}
                    className="scale-110"
                  />
                )}
              </div>

              {/* Number Tracker */}
              {currentGrid && (
                <div className="mb-6">
                  <NumberTracker currentGrid={currentGrid} />
                </div>
              )}

              {/* Game Controls */}
              <div className="flex gap-3 justify-center flex-wrap">
                <Button
                  onClick={restartGame}
                  variant="outline"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restart
                </Button>
                <Button
                  onClick={handleStartGame}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Play className="w-4 h-4 mr-2" />
                  New Game
                </Button>
                {showSignUpPrompt && (
                  <Link href="/register">
                    <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                      Sign Up to Save Progress
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
