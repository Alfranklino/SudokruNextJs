'use client';

import { MainLayout } from '@/components/layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, Zap, Lock, Globe, Play, Search, Trophy, Clock } from 'lucide-react';

export default function MultiplayerPage() {
  return (
    <MainLayout isAuthenticated={true}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Multiplayer Lobby</h1>
          <p className="text-gray-600">Find opponents and join competitive matches</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-blue-200 bg-blue-50 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                Quick Match
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Get matched with an opponent of similar skill level instantly
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Play className="w-4 h-4 mr-2" />
                Find Match
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-600" />
                Private Room
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Create a private room and invite your friends to play
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Create Private Room
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-green-600" />
                Ranked Match
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Compete in ranked matches to climb the leaderboards
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Play Ranked
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Join Room by Code */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Join by Room Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Input
                placeholder="Enter room code (e.g., ABC123)"
                className="flex-1 font-mono uppercase"
                maxLength={6}
              />
              <Button>Join Room</Button>
            </div>
          </CardContent>
        </Card>

        {/* Public Rooms */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Public Rooms
              </CardTitle>
              <Badge variant="outline">8 active rooms</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  id: 1,
                  name: "Beginner's Battle",
                  host: 'alice_solver',
                  players: '1/2',
                  difficulty: 'Easy',
                  rating: '1000-1400',
                  status: 'Waiting'
                },
                {
                  id: 2,
                  name: "Speed Challenge",
                  host: 'bob_fast',
                  players: '1/2',
                  difficulty: 'Medium',
                  rating: '1400-1800',
                  status: 'Waiting'
                },
                {
                  id: 3,
                  name: "Expert Arena",
                  host: 'charlie_master',
                  players: '1/2',
                  difficulty: 'Hard',
                  rating: '1800+',
                  status: 'Waiting'
                },
                {
                  id: 4,
                  name: "Casual Fun",
                  host: 'diana_chill',
                  players: '2/4',
                  difficulty: 'Medium',
                  rating: 'Any',
                  status: 'In Progress'
                },
                {
                  id: 5,
                  name: "Tournament Practice",
                  host: 'emma_prep',
                  players: '1/2',
                  difficulty: 'Hard',
                  rating: '1600+',
                  status: 'Waiting'
                },
              ].map((room) => (
                <div
                  key={room.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{room.name}</h4>
                      <Badge
                        variant="outline"
                        className={
                          room.difficulty === 'Easy' ? 'border-green-300 text-green-700' :
                          room.difficulty === 'Medium' ? 'border-yellow-300 text-yellow-700' :
                          'border-red-300 text-red-700'
                        }
                      >
                        {room.difficulty}
                      </Badge>
                      <Badge
                        className={
                          room.status === 'Waiting' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }
                      >
                        {room.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Host: {room.host}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {room.players}
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        {room.rating}
                      </span>
                    </div>
                  </div>
                  <div>
                    {room.status === 'Waiting' ? (
                      <Button size="sm">Join</Button>
                    ) : (
                      <Button size="sm" variant="outline">Spectate</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Player Stats Quick View */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Your Multiplayer Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">247</div>
                <div className="text-sm text-gray-600">Games Played</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">78%</div>
                <div className="text-sm text-gray-600">Win Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1,642</div>
                <div className="text-sm text-gray-600">Current Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">12</div>
                <div className="text-sm text-gray-600">Win Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
