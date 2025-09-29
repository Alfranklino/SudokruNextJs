'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Clock, Trophy, Target, TrendingUp, Star } from 'lucide-react';

export default function StatsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Statistics</h1>
        <p className="text-gray-600 mt-2">
          Track your Sudoku progress and performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Games Played</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-blue-600" />
              <span className="text-2xl font-bold">247</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold">78%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg. Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <span className="text-2xl font-bold">8:42</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Current Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <span className="text-2xl font-bold">1,642</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Performance by Difficulty
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">Easy</Badge>
                  <span className="text-sm text-gray-600">92 games</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">95%</div>
                  <div className="text-sm text-gray-600">6:23 avg</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                  <span className="text-sm text-gray-600">128 games</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">84%</div>
                  <div className="text-sm text-gray-600">9:45 avg</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-800">Hard</Badge>
                  <span className="text-sm text-gray-600">27 games</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">67%</div>
                  <div className="text-sm text-gray-600">18:32 avg</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">This week</span>
                <span className="font-semibold text-green-600">+5 wins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Best streak</span>
                <span className="font-semibold">12 games</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Personal best</span>
                <span className="font-semibold">4:23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Rating change</span>
                <span className="font-semibold text-green-600">+45</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Games</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { difficulty: 'Medium', time: '7:23', result: 'Won', rating: '+12' },
              { difficulty: 'Hard', time: '15:45', result: 'Won', rating: '+18' },
              { difficulty: 'Easy', time: '5:12', result: 'Won', rating: '+8' },
              { difficulty: 'Medium', time: '12:33', result: 'Lost', rating: '-10' },
              { difficulty: 'Medium', time: '8:45', result: 'Won', rating: '+15' },
            ].map((game, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge 
                    className={
                      game.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }
                  >
                    {game.difficulty}
                  </Badge>
                  <span className="text-sm text-gray-600">{game.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${
                    game.result === 'Won' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {game.result}
                  </span>
                  <span className={`text-sm font-medium ${
                    game.rating.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {game.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}