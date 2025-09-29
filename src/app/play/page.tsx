'use client';

import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Users, Clock, Target, Zap, Brain } from 'lucide-react';

export default function PlayPage() {
  return (
    <MainLayout isAuthenticated={true}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Play Sudoku</h1>
          <p className="text-gray-600">Choose your game mode and difficulty level</p>
        </div>

        {/* Game Modes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Match */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Quick Match</CardTitle>
                  <p className="text-sm text-gray-500">Find opponents instantly</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Get matched with players of similar skill level in seconds</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Play className="w-4 h-4 mr-2" />
                Quick Match
              </Button>
            </CardContent>
          </Card>

          {/* Private Room */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Private Room</CardTitle>
                  <p className="text-sm text-gray-500">Play with friends</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Create or join a private room to play with specific players</p>
              <Button variant="outline" className="w-full">
                Create Room
              </Button>
            </CardContent>
          </Card>

          {/* Speed Race */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Speed Race</CardTitle>
                  <p className="text-sm text-gray-500">Fast-paced competition</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Race against time and other players to solve puzzles fastest</p>
              <Button variant="outline" className="w-full">
                Join Race
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Difficulty Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Difficulty Level</CardTitle>
            <p className="text-gray-600">Choose your preferred challenge level</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg hover:border-green-300 cursor-pointer">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-green-700">Easy</h3>
                <p className="text-sm text-gray-500">Perfect for beginners</p>
                <Badge className="mt-2 bg-green-100 text-green-800">Recommended</Badge>
              </div>

              <div className="text-center p-4 border rounded-lg hover:border-yellow-300 cursor-pointer">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-yellow-700">Medium</h3>
                <p className="text-sm text-gray-500">Moderate challenge</p>
              </div>

              <div className="text-center p-4 border rounded-lg hover:border-orange-300 cursor-pointer">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-orange-700">Hard</h3>
                <p className="text-sm text-gray-500">For experienced players</p>
              </div>

              <div className="text-center p-4 border rounded-lg hover:border-red-300 cursor-pointer">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Brain className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-red-700">Expert</h3>
                <p className="text-sm text-gray-500">Ultimate challenge</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Games */}
        <Card>
          <CardHeader>
            <CardTitle>Active Games</CardTitle>
            <p className="text-gray-600">Your ongoing and recent matches</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Play className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Speed Race vs alice_solver</h4>
                    <p className="text-sm text-gray-500">Medium difficulty • 08:32 elapsed</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800 mb-2">In Progress</Badge>
                  <Button size="sm">Resume</Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Private Room: Friends Challenge</h4>
                    <p className="text-sm text-gray-500">Hard difficulty • Completed</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-blue-100 text-blue-800 mb-2">Won</Badge>
                  <Button size="sm" variant="outline">View Replay</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}