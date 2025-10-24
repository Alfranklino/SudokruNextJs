'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SudokuGrid } from '@/components/game/SudokuGrid';
import { NumberTracker } from '@/components/game/NumberTracker';
import { Play, Trophy, RotateCcw, Clock, TrendingUp, AlertCircle, Lightbulb, X } from 'lucide-react';
import { useSinglePlayerStore } from '@/stores/singlePlayerStore';
import { DEFAULT_HIGHLIGHT_CONFIG } from '@/types/game-config';
import type { Difficulty } from '@/lib/sudoku/difficulty';

const MAX_HINTS_VISITOR = 3; // Limit hints for non-authenticated users

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
    hintCount,
    lastHint,
    isTimerRunning,
    startNewGame,
    restartGame,
    makeMove,
    updateElapsedTime,
    useHint,
    clearLastHint,
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

  // Timer effect
  useEffect(() => {
    if (!isTimerRunning) return;

    const interval = setInterval(() => {
      updateElapsedTime(elapsedTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, elapsedTime, updateElapsedTime]);

  // Auto-dismiss hint after 8 seconds
  useEffect(() => {
    if (lastHint) {
      const timer = setTimeout(() => {
        clearLastHint();
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [lastHint, clearLastHint]);

  const handleStartGame = () => {
    startNewGame(selectedDifficulty, 'unlimited');
  };

  const handleCellChange = (row: number, col: number, value: number) => {
    makeMove(row, col, value);
  };

  const handleUseHint = () => {
    useHint();
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

              {/* Timer Display */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-2xl font-mono font-bold text-blue-600">
                  {formatTime(elapsedTime)}
                </span>
                <span className="text-sm text-slate-500 ml-1">Elapsed</span>
              </div>

              {/* Game Stats */}
              <div className="flex items-center justify-center gap-6 mb-6 text-sm flex-wrap">
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
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-purple-600" />
                  <span className="text-slate-600">Hints:</span>
                  <span className="font-semibold text-purple-600">{hintCount}/{MAX_HINTS_VISITOR}</span>
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

              {/* Hint Explanation Card */}
              {lastHint && (
                <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Card className="bg-purple-50 border-purple-200 p-4 relative">
                    <button
                      onClick={clearLastHint}
                      className="absolute top-2 right-2 text-purple-400 hover:text-purple-600 transition-colors"
                      aria-label="Dismiss hint"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex items-start gap-3 pr-6">
                      <Lightbulb className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-1">
                          {lastHint.technique}
                        </h4>
                        <p className="text-sm text-purple-700 leading-relaxed">
                          {lastHint.explanation}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Inline Difficulty Selector & Game Controls */}
              <div className="border-t pt-6 mt-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">
                  Start New Game
                </h4>

                {/* Difficulty Selector */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {['easy', 'medium', 'hard', 'expert'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff as Difficulty)}
                      className={`p-3 border-2 rounded-lg transition-all text-sm ${
                        selectedDifficulty === diff
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <div className="font-semibold capitalize">{diff}</div>
                    </button>
                  ))}
                </div>

                {/* Game Control Buttons */}
                <div className="flex gap-3 justify-center flex-wrap">
                  <Button
                    onClick={restartGame}
                    variant="outline"
                    size="sm"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Restart
                  </Button>
                  <Button
                    onClick={handleUseHint}
                    variant="outline"
                    size="sm"
                    className="border-purple-300 text-purple-600 hover:bg-purple-50"
                    disabled={gameStatus !== 'playing' || hintCount >= MAX_HINTS_VISITOR}
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Hint ({hintCount}/{MAX_HINTS_VISITOR})
                  </Button>
                  <Button
                    onClick={handleStartGame}
                    className="bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    New Game ({selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)})
                  </Button>
                </div>

                {/* Hint Limit Message */}
                {hintCount >= MAX_HINTS_VISITOR && showSignUpPrompt && (
                  <div className="mt-4 text-center text-sm text-purple-600 bg-purple-50 py-2 px-4 rounded-lg">
                    🎯 Hint limit reached!{' '}
                    <Link href="/register" className="underline font-medium hover:text-purple-700">
                      Sign up for unlimited hints
                    </Link>
                  </div>
                )}

                {/* Sign Up Prompt */}
                {showSignUpPrompt && hintCount < MAX_HINTS_VISITOR && (
                  <div className="mt-4 text-center">
                    <div className="text-sm text-gray-500">
                      Want to save your progress and get unlimited hints?{' '}
                      <Link href="/register" className="text-blue-600 hover:underline font-medium">
                        Create a free account
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
