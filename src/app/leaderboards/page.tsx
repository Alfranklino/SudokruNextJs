'use client';

import { MainLayout } from '@/components/layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Star, TrendingUp, Filter } from 'lucide-react';

export default function LeaderboardsPage() {
  return (
    <MainLayout isAuthenticated={true}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboards</h1>
          <p className="text-gray-600">See how you rank against the best Sudoku players</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['Global', 'Weekly', 'Monthly', 'Friends', 'By Difficulty'].map((tab) => (
            <Button
              key={tab}
              variant={tab === 'Global' ? 'default' : 'outline'}
              size="sm"
            >
              {tab}
            </Button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Top 3 Podium */}
          <Card className="lg:col-span-3 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-amber-600" />
                Top 3 Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { rank: 1, name: 'charlie_master', rating: 2450, icon: '🥇', wins: 1250, streak: 45, color: 'amber' },
                  { rank: 2, name: 'alice_solver', rating: 2380, icon: '🥈', wins: 1180, streak: 32, color: 'gray' },
                  { rank: 3, name: 'diana_speed', rating: 2310, icon: '🥉', wins: 1050, streak: 28, color: 'orange' },
                ].map((player) => (
                  <Card key={player.rank} className={`border-${player.color}-300 bg-${player.color}-50`}>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-4xl mb-2">{player.icon}</div>
                        <h3 className="font-bold text-lg text-gray-900">{player.name}</h3>
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <Star className="w-4 h-4 text-amber-500" />
                          <span className="text-2xl font-bold text-gray-900">{player.rating}</span>
                        </div>
                        <div className="mt-3 space-y-1 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Wins:</span>
                            <span className="font-semibold">{player.wins}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Streak:</span>
                            <span className="font-semibold">{player.streak} games</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Leaderboard */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Global Rankings
              </CardTitle>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { rank: 4, name: 'bob_puzzle', rating: 2245, wins: 890, change: '+5', trend: 'up' },
                { rank: 5, name: 'emma_quick', rating: 2180, wins: 825, change: '+12', trend: 'up' },
                { rank: 6, name: 'frank_solver', rating: 2120, wins: 780, change: '-3', trend: 'down' },
                { rank: 7, name: 'grace_master', rating: 2095, wins: 755, change: '+8', trend: 'up' },
                { rank: 8, name: 'henry_speed', rating: 2050, wins: 720, change: '0', trend: 'same' },
                { rank: 9, name: 'ivy_champion', rating: 2025, wins: 695, change: '+15', trend: 'up' },
                { rank: 10, name: 'jack_pro', rating: 1990, wins: 670, change: '-7', trend: 'down' },
                { rank: 42, name: 'You', rating: 1642, wins: 247, change: '+45', trend: 'up', highlight: true },
              ].map((player) => (
                <div
                  key={player.rank}
                  className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                    player.highlight
                      ? 'bg-blue-50 border-2 border-blue-200'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-200">
                      <span className={`font-bold ${
                        player.rank <= 3 ? 'text-amber-600' :
                        player.highlight ? 'text-blue-600' :
                        'text-gray-600'
                      }`}>
                        #{player.rank}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-semibold ${
                          player.highlight ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {player.name}
                        </h4>
                        {player.rank <= 10 && (
                          <Medal className={`w-4 h-4 ${
                            player.rank <= 3 ? 'text-amber-500' : 'text-blue-500'
                          }`} />
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {player.wins} wins
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500" />
                        <span className="text-lg font-bold text-gray-900">{player.rating}</span>
                      </div>
                      <div className={`text-sm font-medium ${
                        player.trend === 'up' ? 'text-green-600' :
                        player.trend === 'down' ? 'text-red-600' :
                        'text-gray-500'
                      }`}>
                        {player.change}
                      </div>
                    </div>
                    {player.trend === 'up' && (
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How Rankings Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Rankings are based on your ELO rating calculated from competitive matches</p>
              <p>• Win against higher-rated opponents to gain more rating points</p>
              <p>• Weekly and monthly leaderboards reset at the end of each period</p>
              <p>• Friend rankings only show players you've added as friends</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
