'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { MainLayout } from '@/components/layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SudokuGrid } from '@/components/game/SudokuGrid';
import { GameTimer } from '@/components/game/GameTimer';
import { GameStats } from '@/components/game/GameStats';
import { NumberTracker } from '@/components/game/NumberTracker';
import { TestUtilities } from '@/components/game/TestUtilities';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Settings,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  StopCircle,
  Star,
  Trophy,
  TrendingUp
} from 'lucide-react';
import { useSinglePlayerStore } from '@/stores/singlePlayerStore';
import type { Difficulty } from '@/lib/sudoku/difficulty';
import { DIFFICULTY_CONFIG } from '@/lib/sudoku/difficulty';
import { DEFAULT_HIGHLIGHT_CONFIG } from '@/types/game-config';

const difficultyLevels = [
  {
    id: 'easy' as Difficulty,
    name: 'Easy',
    color: 'bg-green-500',
    borderColor: 'border-green-200',
    bgColor: 'bg-green-50',
    textColor: 'text-green-900',
    description: 'Perfect for beginners and learning basic techniques'
  },
  {
    id: 'medium' as Difficulty,
    name: 'Medium',
    color: 'bg-blue-500',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-900',
    description: 'Intermediate puzzles with moderate complexity'
  },
  {
    id: 'hard' as Difficulty,
    name: 'Hard',
    color: 'bg-orange-500',
    borderColor: 'border-orange-200',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-900',
    description: 'Advanced puzzles requiring strategic thinking'
  },
  {
    id: 'expert' as Difficulty,
    name: 'Expert',
    color: 'bg-red-500',
    borderColor: 'border-red-200',
    bgColor: 'bg-red-50',
    textColor: 'text-red-900',
    description: 'Master-level puzzles for true Sudoku experts'
  }
];

export default function SinglePlayerPage() {
  const router = useRouter();
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');
  const [selectedTimerMode, setSelectedTimerMode] = useState<'unlimited' | 'timed'>('unlimited');
  const [selectedDuration, setSelectedDuration] = useState<number>(600); // 10 minutes default
  const [showErrors, setShowErrors] = useState(false);
  const [hasShownConfetti, setHasShownConfetti] = useState(false);

  const {
    gameStatus,
    difficulty,
    initialGrid,
    currentGrid,
    solution,
    timerMode,
    duration,
    elapsedTime,
    isTimerRunning,
    moveCount,
    errorCount,
    startNewGame,
    pauseGame,
    resumeGame,
    stopGame,
    restartGame,
    makeMove,
    updateElapsedTime,
    autoFillSolution,
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
    startNewGame(
      selectedDifficulty,
      selectedTimerMode,
      selectedTimerMode === 'timed' ? selectedDuration : undefined
    );
  };

  const handleCellChange = (row: number, col: number, value: number) => {
    makeMove(row, col, value);
  };

  const handleStopGame = () => {
    if (confirm('Are you sure you want to stop this game? Your progress will be lost.')) {
      stopGame();
    }
  };

  const handleBackToMenu = () => {
    if (gameStatus === 'playing' || gameStatus === 'paused') {
      if (confirm('Are you sure you want to leave? Your current game will be lost.')) {
        router.push('/dashboard');
      }
    } else {
      router.push('/dashboard');
    }
  };

  // Test utilities handlers
  const handleAutoFill = () => {
    autoFillSolution();
  };

  const handleGenerateNew = (diff: Difficulty) => {
    setSelectedDifficulty(diff);
    startNewGame(diff, selectedTimerMode, selectedTimerMode === 'timed' ? selectedDuration : undefined);
  };

  const handlePrintSolution = () => {
    if (solution) {
      console.log('=== SOLUTION ===');
      solution.forEach(row => console.log(row.join(' ')));
      console.log('================');
    }
  };

  const isGameActive = gameStatus === 'playing' || gameStatus === 'paused';

  return (
    <MainLayout isAuthenticated={true}>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-slate-900">Single Player</h1>
              {gameStatus === 'completed' && (
                <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
                  <Trophy className="w-5 h-5 mr-2" />
                  Puzzle Completed!
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Sudoku Grid */}
            <div className="col-span-8">
              <Card className="p-8">
                {isGameActive ? (
                  <>
                    {/* Timer */}
                    <div className="mb-6">
                      <GameTimer
                        mode={timerMode}
                        elapsedTime={elapsedTime}
                        duration={duration}
                        isRunning={isTimerRunning}
                        onTimeUpdate={updateElapsedTime}
                      />
                    </div>

                    {/* Grid */}
                    <div className="flex justify-center mb-6">
                      {initialGrid && currentGrid && solution && (
                        <SudokuGrid
                          initialGrid={initialGrid}
                          currentGrid={currentGrid}
                          solution={solution}
                          showErrors={showErrors}
                          highlightConfig={DEFAULT_HIGHLIGHT_CONFIG}
                          onCellChange={handleCellChange}
                          readOnly={gameStatus === 'paused' || gameStatus === 'completed'}
                          className="scale-110"
                        />
                      )}
                    </div>

                    {/* Game Stats Bar */}
                    <div className="mt-6 flex items-center justify-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="text-slate-600">Moves:</span>
                        <span className="font-semibold text-slate-900">{moveCount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-600">Errors:</span>
                        <span className="font-semibold text-red-600">{errorCount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-slate-600">Difficulty:</span>
                        <Badge variant="outline">{DIFFICULTY_CONFIG[difficulty].name}</Badge>
                      </div>
                    </div>

                    {/* Number Tracker */}
                    {currentGrid && (
                      <div className="mt-6">
                        <NumberTracker
                          currentGrid={currentGrid}
                        />
                      </div>
                    )}

                    {gameStatus === 'paused' && (
                      <div className="mt-6 text-center">
                        <p className="text-lg font-semibold text-slate-900">Game Paused</p>
                        <p className="text-sm text-slate-500 mt-1">Click Resume to continue playing</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Play className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-slate-900 mb-2">Ready to Play?</p>
                    <p className="text-sm text-slate-500">Select your difficulty and timer mode, then click Start Game</p>
                  </div>
                )}
              </Card>
            </div>

            {/* Right Column - Controls */}
            <div className="col-span-4 space-y-6">
              {/* Game Controls */}
              {isGameActive && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Game Controls
                  </h3>
                  <div className="space-y-3">
                    {gameStatus === 'playing' && (
                      <Button
                        onClick={pauseGame}
                        variant="outline"
                        className="w-full"
                      >
                        <Pause className="w-4 h-4 mr-2" />
                        Pause Game
                      </Button>
                    )}
                    {gameStatus === 'paused' && (
                      <Button
                        onClick={resumeGame}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Resume Game
                      </Button>
                    )}
                    <Button
                      onClick={restartGame}
                      variant="outline"
                      className="w-full"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Restart Game
                    </Button>
                    <Button
                      onClick={handleStopGame}
                      variant="destructive"
                      className="w-full"
                    >
                      <StopCircle className="w-4 h-4 mr-2" />
                      Stop Game
                    </Button>
                  </div>
                </Card>
              )}

              {/* Select Difficulty */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Select Difficulty
                </h3>
                <div className="space-y-3">
                  {difficultyLevels.map((diff) => (
                    <div
                      key={diff.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedDifficulty === diff.id
                          ? `${diff.borderColor} ${diff.bgColor}`
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      onClick={() => setSelectedDifficulty(diff.id)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${diff.color}`} />
                        <span className={`font-medium ${
                          selectedDifficulty === diff.id ? diff.textColor : 'text-slate-900'
                        }`}>
                          {diff.name}
                        </span>
                        <div className="flex ml-auto">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < DIFFICULTY_CONFIG[diff.id].rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-xs text-slate-600">{diff.description}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Timer Mode */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Timer Mode</h3>
                <div className="space-y-3">
                  <div
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      selectedTimerMode === 'unlimited'
                        ? 'border-blue-300 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => setSelectedTimerMode('unlimited')}
                  >
                    <div className="font-medium text-slate-900">Unlimited Time</div>
                    <div className="text-xs text-slate-600 mt-1">No time pressure, solve at your own pace</div>
                  </div>
                  <div
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      selectedTimerMode === 'timed'
                        ? 'border-orange-300 bg-orange-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => setSelectedTimerMode('timed')}
                  >
                    <div className="font-medium text-slate-900">Timed Challenge</div>
                    <div className="text-xs text-slate-600 mt-1">Race against the clock</div>
                    {selectedTimerMode === 'timed' && (
                      <div className="mt-3">
                        <label className="text-xs text-slate-600 block mb-1">Duration (minutes):</label>
                        <input
                          type="number"
                          min="1"
                          max="60"
                          value={Math.floor(selectedDuration / 60)}
                          onChange={(e) => setSelectedDuration(parseInt(e.target.value) * 60)}
                          className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Start/New Game Button */}
              {!isGameActive && (
                <Button
                  onClick={handleStartGame}
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Game
                </Button>
              )}

              {gameStatus === 'completed' && (
                <Button
                  onClick={handleStartGame}
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Play className="w-5 h-5 mr-2" />
                  New Game
                </Button>
              )}

              {/* Back to Menu */}
              <Button
                onClick={handleBackToMenu}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Menu
              </Button>

              {/* Test Utilities (dev only) */}
              <TestUtilities
                onAutoFill={handleAutoFill}
                onGenerateNew={handleGenerateNew}
                onToggleErrors={() => setShowErrors(!showErrors)}
                onPrintSolution={handlePrintSolution}
                showErrors={showErrors}
                currentDifficulty={difficulty}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}