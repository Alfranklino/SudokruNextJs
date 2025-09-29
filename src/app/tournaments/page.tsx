'use client';

import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock, Users, Calendar, Star, Medal } from 'lucide-react';

export default function TournamentsPage() {
  return (
    <MainLayout isAuthenticated={true}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tournaments</h1>
          <p className="text-gray-600">Compete in tournaments and climb the leaderboards</p>
        </div>

        {/* Active Tournaments */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-amber-600" />
                  <CardTitle className="text-lg">Weekend Championship</CardTitle>
                </div>
                <Badge className="bg-amber-100 text-amber-800">Live</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>128/256 players</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>2h 45m remaining</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Medal className="w-4 h-4 mr-2" />
                  <span>Prize: 500 ELO + Badge</span>
                </div>
                <Button className="w-full bg-amber-600 hover:bg-amber-700">
                  Join Tournament
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg">Speed Blitz</CardTitle>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Starting Soon</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>45/64 players</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Starts in 15 minutes</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Medal className="w-4 h-4 mr-2" />
                  <span>Prize: 200 ELO</span>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Join Tournament
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-green-600" />
                  <CardTitle className="text-lg">Daily Challenge</CardTitle>
                </div>
                <Badge className="bg-green-100 text-green-800">Open</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Unlimited players</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Resets in 18h</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Medal className="w-4 h-4 mr-2" />
                  <span>Prize: 50 ELO + XP</span>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Start Challenge
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-amber-500" />
              Tournament Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { rank: 1, name: 'charlie_master', rating: 1520, tournaments: 24, badge: '🥇' },
                { rank: 2, name: 'alice_solver', rating: 1350, tournaments: 18, badge: '🥈' },
                { rank: 3, name: 'diana_speed', rating: 1420, tournaments: 22, badge: '🥉' },
                { rank: 4, name: 'bob_puzzle', rating: 1280, tournaments: 15, badge: '' },
                { rank: 5, name: 'You', rating: 1350, tournaments: 12, badge: '', highlight: true },
              ].map((player) => (
                <div
                  key={player.rank}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    player.highlight ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-500">#{player.rank}</span>
                      {player.badge && <span className="text-lg">{player.badge}</span>}
                    </div>
                    <div>
                      <div className={`font-medium ${player.highlight ? 'text-blue-700' : 'text-gray-900'}`}>
                        {player.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {player.tournaments} tournaments completed
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{player.rating}</div>
                    <div className="text-sm text-gray-500">Rating</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tournaments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tournaments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Masters Cup', date: 'Tomorrow 2:00 PM', players: '0/512', prize: '1000 ELO + Trophy' },
                { name: 'Weekly Showdown', date: 'Friday 6:00 PM', players: '12/256', prize: '750 ELO' },
                { name: 'Beginner Friendly', date: 'Saturday 10:00 AM', players: '5/128', prize: '300 ELO' },
              ].map((tournament, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{tournament.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {tournament.date}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {tournament.players}
                      </span>
                      <span className="flex items-center">
                        <Medal className="w-4 h-4 mr-1" />
                        {tournament.prize}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Register
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}