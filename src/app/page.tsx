// Home page with Sudoku game demo
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SudokuGrid } from '@/components/game/SudokuGrid';
import { GameStatus } from '@/components/game/GameStatus';
import { PlayerList } from '@/components/game/PlayerList';
import { Badge } from '@/components/ui/badge';
import {
  mockGame,
  mockGameState,
  mockPlayerGames,
  mockCurrentUser,
  mockEasyPuzzle,
  mockCurrentGrid
} from '@/lib/mock-data';
import { Play, Trophy, Users, Zap } from 'lucide-react';

export default function HomePage() {
  const [currentGrid, setCurrentGrid] = useState(mockCurrentGrid);
  const [timeRemaining, setTimeRemaining] = useState(735); // 12:15

  const handleCellChange = (row: number, col: number, value: number) => {
    const newGrid = currentGrid.map((gridRow, r) =>
      r === row
        ? gridRow.map((cell, c) => c === col ? value : cell)
        : gridRow
    );
    setCurrentGrid(newGrid);
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">Sudokru</h1>
              <Badge className="ml-3 bg-blue-100 text-blue-800">Beta</Badge>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline">Sign In</Button>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Multiplayer Sudoku
            <br />
            <span className="text-blue-200">Like Never Before</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Real-time competitive Sudoku gaming with tournaments, leaderboards, and social features
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Play className="w-5 h-5 mr-2" />
            Play Demo Game
          </Button>
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

      {/* Live Demo */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Live Game Demo
          </h3>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Game Status */}
            <div className="lg:col-span-1">
              <GameStatus
                gameType="competitive"
                status="active"
                timeRemaining={timeRemaining}
                playerCount={2}
                maxPlayers={4}
                difficulty="easy"
                className="mb-6"
              />

              <PlayerList
                players={mockPlayerGames}
                currentUserId={mockCurrentUser.id}
                showStats={true}
              />
            </div>

            {/* Game Board */}
            <div className="lg:col-span-2 flex justify-center">
              <div className="flex flex-col items-center">
                <SudokuGrid
                  initialGrid={mockEasyPuzzle.initialGrid}
                  currentGrid={currentGrid}
                  solution={mockEasyPuzzle.solution}
                  showErrors={true}
                  onCellChange={handleCellChange}
                  className="mb-6"
                />
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm">
                    Hint
                  </Button>
                  <Button variant="outline" size="sm">
                    Pause
                  </Button>
                  <Button variant="destructive" size="sm">
                    Leave Game
                  </Button>
                </div>
              </div>
            </div>

            {/* Chat / Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Game Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="text-gray-500">
                      <span className="font-medium text-blue-600">Alice:</span> Good luck everyone!
                    </div>
                    <div className="text-gray-500">
                      <span className="font-medium text-green-600">Bob:</span> Thanks! Let's have a great game
                    </div>
                    <div className="text-gray-500 text-xs">
                      Charlie is spectating
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-sm">Game Info</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Difficulty:</span>
                    <Badge variant="outline" className="text-green-600 bg-green-50">Easy</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Mode:</span>
                    <span>Speed Race</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prize:</span>
                    <span>+25 ELO</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Play?</h3>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of players in the ultimate Sudoku experience
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Create Account
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
              Play as Guest
            </Button>
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
    </div>
  );
}
