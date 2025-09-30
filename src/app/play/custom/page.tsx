'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Settings, Users, Clock, Lock, Globe } from 'lucide-react';

export default function CustomGamePage() {
  const [gameSettings, setGameSettings] = useState({
    gameName: '',
    difficulty: 'medium',
    timeLimit: '10',
    isPrivate: false,
    maxPlayers: '2'
  });

  const handleCreateGame = () => {
    // Handle game creation
    console.log('Creating game with settings:', gameSettings);
  };

  return (
    <MainLayout isAuthenticated={true}>
      <div className="max-w-4xl mx-auto space-y-6">
        <Breadcrumb />
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Custom Game</h1>
        <p className="text-gray-600 mt-2">
          Create a custom Sudoku game with your preferred settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Game Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gameName">Game Name</Label>
                <Input
                  id="gameName"
                  placeholder="Enter game name..."
                  value={gameSettings.gameName}
                  onChange={(e) => setGameSettings(prev => ({
                    ...prev,
                    gameName: e.target.value
                  }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <div className="flex gap-2">
                    {['easy', 'medium', 'hard'].map((diff) => (
                      <Button
                        key={diff}
                        variant={gameSettings.difficulty === diff ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setGameSettings(prev => ({
                          ...prev,
                          difficulty: diff
                        }))}
                      >
                        {diff.charAt(0).toUpperCase() + diff.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    min="5"
                    max="60"
                    value={gameSettings.timeLimit}
                    onChange={(e) => setGameSettings(prev => ({
                      ...prev,
                      timeLimit: e.target.value
                    }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxPlayers">Max Players</Label>
                  <select
                    id="maxPlayers"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={gameSettings.maxPlayers}
                    onChange={(e) => setGameSettings(prev => ({
                      ...prev,
                      maxPlayers: e.target.value
                    }))}
                  >
                    <option value="2">2 Players</option>
                    <option value="4">4 Players</option>
                    <option value="6">6 Players</option>
                    <option value="8">8 Players</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Privacy</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={!gameSettings.isPrivate ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setGameSettings(prev => ({
                        ...prev,
                        isPrivate: false
                      }))}
                    >
                      <Globe className="w-4 h-4 mr-1" />
                      Public
                    </Button>
                    <Button
                      variant={gameSettings.isPrivate ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setGameSettings(prev => ({
                        ...prev,
                        isPrivate: true
                      }))}
                    >
                      <Lock className="w-4 h-4 mr-1" />
                      Private
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Game Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">
                    {gameSettings.gameName || 'Untitled Game'}
                  </h3>
                  <Badge className={
                    gameSettings.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    gameSettings.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {gameSettings.difficulty}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 text-sm text-gray-600 gap-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {gameSettings.timeLimit} minutes
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Up to {gameSettings.maxPlayers} players
                  </div>
                  <div className="flex items-center gap-1">
                    {gameSettings.isPrivate ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                    {gameSettings.isPrivate ? 'Private' : 'Public'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleCreateGame}
                disabled={!gameSettings.gameName.trim()}
              >
                Create Game
              </Button>
              <Button variant="outline" className="w-full">
                Save as Template
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Custom Games</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Easy games</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Medium games</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hard games</span>
                  <span className="font-semibold">3</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </MainLayout>
  );
}