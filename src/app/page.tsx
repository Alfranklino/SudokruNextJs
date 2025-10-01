// Home page with Sudoku game demo
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SudokuGrid } from '@/components/game/SudokuGrid';
import { NumberTracker } from '@/components/game/NumberTracker';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import dynamic from 'next/dynamic';

// Dynamically import components with GSAP to avoid SSR issues
const Navbar = dynamic(
  () => import('@/components/layout/Navbar').then(mod => ({ default: mod.Navbar })),
  { ssr: false }
);

const AnimatedSudokuGrid = dynamic(
  () => import('@/components/game/AnimatedSudokuGrid').then(mod => ({ default: mod.AnimatedSudokuGrid })),
  { ssr: false }
);
import { Play, Trophy, Users, Zap, RotateCcw, Star, TrendingUp, AlertCircle, Clock, PlayCircle, CheckCircle } from 'lucide-react';
import { useSinglePlayerStore } from '@/stores/singlePlayerStore';
import { DEFAULT_HIGHLIGHT_CONFIG } from '@/types/game-config';
import type { Difficulty } from '@/lib/sudoku/difficulty';

export default function HomePage() {
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

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Multiplayer",
      description: "Compete against players worldwide in live Sudoku battles"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Tournaments",
      description: "Join competitive tournaments and climb the leaderboards"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Social Gaming",
      description: "Play with friends, create custom rooms, and spectate games"
    },
  ];

  return (
    <>
      {/* Custom Navbar with scroll effect */}
      <Navbar variant="visitor" enableScrollChange={true} />

      {/* Spacer for fixed navbar */}
      <div className="h-16" />

      {/* Hero Section - Dark Theme with Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-900">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: "url('/images/sudokru_hero_bkg.webp')",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.85) 100%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Content */}
            <div className="space-y-8">
              {/* Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                  Sudoku Evolved.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                    Multiplayer Reimagined.
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 max-w-lg leading-relaxed">
                  Join thousands of players in competitive and collaborative sudoku puzzles.
                  New challenges daily.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={handleStartGame}
                  className="
                    bg-blue-600 hover:bg-blue-700
                    text-white font-semibold
                    px-8 py-4 text-lg
                    h-14
                    transform hover:scale-105
                    transition-all duration-200
                    shadow-xl hover:shadow-2xl hover:shadow-blue-500/50
                    group
                  "
                >
                  <Play className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Start Playing Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="
                    border-2 border-white/50
                    text-white backdrop-blur-sm
                    bg-white/5
                    hover:bg-white/15 hover:border-white/70
                    px-8 py-4 text-lg
                    h-14
                    font-semibold
                    transition-all duration-200
                  "
                  asChild
                >
                  <Link href="#how-it-works">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    How It Works
                  </Link>
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-gray-300 text-sm">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Avatar key={i} className="w-10 h-10 border-2 border-slate-900">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="font-medium">
                    Join <span className="text-blue-400 font-bold">10,000+</span> players worldwide
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-semibold text-white">4.9</span>
                  <span className="text-gray-400">/5 from 2,000+ reviews</span>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-300 font-medium">Real-time Battles</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-green-400" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-300 font-medium">Tournaments</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-300 font-medium">Social Gaming</span>
                </div>
              </div>
            </div>

            {/* Right: Animated Sudoku Grid */}
            <div className="flex items-center justify-center lg:justify-end">
              <AnimatedSudokuGrid />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Sudokru?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-blue-600">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Playable Demo */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Try Sudokru Now - No Sign Up Required
            </h3>
            <p className="text-lg text-gray-600">
              Experience the full game right in your browser. Start playing instantly!
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

                  <div className="text-sm text-gray-500">
                    Want to save your progress and track stats?{' '}
                    <Link href="/register" className="text-blue-600 hover:underline font-medium">
                      Create a free account
                    </Link>
                  </div>
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
                  <Link href="/register">
                    <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                      Sign Up to Save Progress
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Why Sign Up Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Enjoying the Game?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Create a free account to unlock multiplayer modes, track your stats, join tournaments, and compete with players worldwide!
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Track Your Progress</h4>
                <p className="text-sm text-gray-600">Save games, view stats, earn achievements</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Play Multiplayer</h4>
                <p className="text-sm text-gray-600">Challenge friends, join tournaments</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Zap className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Compete & Win</h4>
                <p className="text-sm text-gray-600">Climb leaderboards, win prizes</p>
              </CardContent>
            </Card>
          </div>
          <Link href="/register">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Original features kept below */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">More Coming Soon</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Multiplayer Modes:</span> Real-time competitive gameplay
                </div>
                <div>
                  <span className="font-medium">Tournaments:</span> Compete for prizes and rankings
                </div>
                <div>
                  <span className="font-medium">Social Features:</span> Friends, chat, spectate games
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Join the Competition?</h3>
          <p className="text-xl text-gray-300 mb-8">
            Sign up now and start your journey to becoming a Sudoku master
          </p>
          <div className="flex justify-center space-x-4 flex-wrap gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Create Free Account
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-gray-900">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-gray-500">
              © 2024 Sudokru. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-900">Privacy</a>
              <a href="#" className="hover:text-gray-900">Terms</a>
              <a href="#" className="hover:text-gray-900">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
