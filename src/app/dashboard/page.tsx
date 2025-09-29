'use client';

import { MainLayout } from '@/components/layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Trophy,
  Users,
  Clock,
  Target,
  TrendingUp,
  Plus,
  Eye,
  BarChart3,
  Zap,
  Star,
  Award,
  Timer,
  Flame,
  Gamepad2,
  Play,
  Crown,
  Calendar,
  TrendingDown
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <MainLayout isAuthenticated={true}>
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-[1400px]">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-1">Good morning, John!</h1>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="w-4 h-4" />
                  <span>10:30 AM • Monday, September 25</span>
                </div>
                <p className="text-slate-500 text-sm mt-1">
                  Ready to challenge your mind? Jump into a quick match or continue your tournament run.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
                  ⚡ Quick Play
                </Button>
                <Button variant="outline" className="px-6 py-2 rounded-lg">
                  🏆 Join Tournament
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-1">#42</div>
              <div className="text-sm text-slate-500">Global Rank</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600 mb-1">87%</div>
              <div className="text-sm text-slate-500">Win Rate</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Flame className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-yellow-600 mb-1">12</div>
              <div className="text-sm text-slate-500">Win Streak</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-600 mb-1">2156</div>
              <div className="text-sm text-slate-500">ELO Rating</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Gamepad2 className="w-4 h-4 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-red-600 mb-1">1,247</div>
              <div className="text-sm text-slate-500">Games Played</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="col-span-2 space-y-6">

              {/* Quick Play Section */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Target className="w-5 h-5 text-green-600" />
                  <h2 className="text-lg font-semibold text-slate-900">Quick Play</h2>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-slate-600 mb-3">Game Mode</div>
                  <div className="flex gap-2 mb-4">
                    <Button variant="outline" size="sm" className="text-slate-600">⚡ Quick Match</Button>
                    <Button variant="outline" size="sm" className="text-slate-600">🎯 Custom Game</Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">🏆 Tournaments</Button>
                    <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="text-sm text-slate-600 mb-3">Difficulty</div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-2 rounded-lg border border-slate-200">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">Beginner</div>
                          <div className="text-xs text-slate-500">Easy solving</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg border border-blue-200 bg-blue-50">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-blue-900">Intermediate</div>
                          <div className="text-xs text-blue-600">Standard challenge</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg border border-slate-200">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">Advanced</div>
                          <div className="text-xs text-slate-500">For experienced players</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg border border-slate-200">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">Expert</div>
                          <div className="text-xs text-slate-500">Ultimate challenge</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-3">Time Control</div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-2 rounded-lg border border-slate-200">
                        <Clock className="w-4 h-4 text-red-500" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">Blitz!</div>
                          <div className="text-xs text-slate-500">3 min</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg border border-slate-200">
                        <Clock className="w-4 h-4 text-yellow-500" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">Blitz</div>
                          <div className="text-xs text-slate-500">5 min</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg border border-blue-200 bg-blue-50">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-blue-900">Rapid</div>
                          <div className="text-xs text-blue-600">15 min</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg border border-slate-200">
                        <Clock className="w-4 h-4 text-purple-500" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">Standard</div>
                          <div className="text-xs text-slate-500">30 min</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <div className="text-sm text-slate-600">💡 <strong>Quick Tip:</strong></div>
                  <div className="text-sm text-slate-600">Use quick match to find matches instantly with instant fun Sudoku.</div>
                </div>

                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-slate-500">Est. wait: <span className="font-medium">0s</span> - <span className="font-medium text-green-600">3,400</span> online</span>
                  <span className="text-slate-400">Position: 1 in 30</span>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base">
                  ⚡ Find Match
                </Button>
              </div>

              {/* Recent Games Section */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Gamepad2 className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-slate-900">Recent Games</h2>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    View All
                  </Button>
                </div>

                <div className="space-y-3">
                  {/* Game 1 */}
                  <div className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 hover:border-slate-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      GM
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">GuidedMasterHQ</span>
                        <Badge variant="secondary" className="text-xs">2214</Badge>
                      </div>
                      <div className="text-xs text-slate-500">Expert • Hard • 3 days ago</div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-700 mb-1">WON</Badge>
                      <div className="text-xs text-slate-500">09:42</div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-green-600">+1</span>
                        <TrendingUp className="w-3 h-3 text-green-600" />
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Game 2 */}
                  <div className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 hover:border-slate-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      LQ
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">LogicQueen</span>
                        <Badge variant="secondary" className="text-xs">2089</Badge>
                      </div>
                      <div className="text-xs text-slate-500">Intermediate • Blitz • 5 days ago</div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-red-100 text-red-700 mb-1">LOST</Badge>
                      <div className="text-xs text-slate-500">03:14</div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-red-600">-6</span>
                        <TrendingDown className="w-3 h-3 text-red-600" />
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Game 3 */}
                  <div className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 hover:border-slate-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      NH
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">NumberKing</span>
                        <Badge variant="secondary" className="text-xs">1957</Badge>
                      </div>
                      <div className="text-xs text-slate-500">Intermediate • Rapid • 1 day ago</div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-700 mb-1">WON</Badge>
                      <div className="text-xs text-slate-500">12:28</div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-green-600">+1</span>
                        <TrendingUp className="w-3 h-3 text-green-600" />
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Game 4 */}
                  <div className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 hover:border-slate-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      PP
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">PuzzlePro</span>
                        <Badge variant="secondary" className="text-xs">2156</Badge>
                      </div>
                      <div className="text-xs text-slate-500">Expert • Beginner • 1 day ago</div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-yellow-100 text-yellow-700 mb-1">DRAW</Badge>
                      <div className="text-xs text-slate-500">25:36</div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-slate-600">+2</span>
                        <TrendingUp className="w-3 h-3 text-slate-600" />
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Game 5 */}
                  <div className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 hover:border-slate-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      GS
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">GridSolver</span>
                        <Badge variant="secondary" className="text-xs">1923</Badge>
                      </div>
                      <div className="text-xs text-slate-500">Advanced • Blitz • 2 days ago</div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-700 mb-1">WON</Badge>
                      <div className="text-xs text-slate-500">02:54</div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-green-600">+1</span>
                        <TrendingUp className="w-3 h-3 text-green-600" />
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-100">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">3</div>
                    <div className="text-xs text-slate-500">Wins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-red-600">1</div>
                    <div className="text-xs text-slate-500">Losses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-yellow-600">1</div>
                    <div className="text-xs text-slate-500">Draws</div>
                  </div>
                </div>
              </div>

              {/* Tournament Highlights */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                    <h2 className="text-lg font-semibold text-slate-900">Tournament Highlights</h2>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    Browse All
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* Weekly Championship */}
                  <div className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-slate-900 mb-1">Weekly Championship</h3>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge className="bg-blue-100 text-blue-800">Live</Badge>
                          <Badge variant="outline" className="text-red-600">Expert</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-yellow-600">$500</div>
                        <div className="text-xs text-slate-500">Prize Pool</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                      <div>
                        <div className="text-xs text-slate-500">Started 2 hrs ago</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">🏆 1,247 players</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">⭐ Entry</div>
                        <div className="text-xs font-medium">Free</div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-xs text-slate-500 mb-1">Tournament Progress</div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">62% complete</div>
                    </div>

                    <Button size="sm" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                      🔥 Continue Playing
                    </Button>
                  </div>

                  {/* Speed Demon Blitz */}
                  <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-slate-900 mb-1">Speed Demon Blitz</h3>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge className="bg-orange-100 text-orange-800">Upcoming</Badge>
                          <Badge variant="outline" className="text-yellow-600">Advanced</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-orange-600">$250</div>
                        <div className="text-xs text-slate-500">Prize Pool</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                      <div>
                        <div className="text-xs text-slate-500">⏰ Tournament at 8:00 PM</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">👥 523 players</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">💰 Entry</div>
                        <div className="text-xs font-medium">$0</div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-xs text-slate-500 mb-1">Registration</div>
                      <div className="w-full bg-orange-100 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">867/1000 registered</div>
                    </div>

                    <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                      🎯 Join Tournament
                    </Button>
                  </div>

                  {/* Monthly Masters */}
                  <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-slate-900 mb-1">Monthly Masters</h3>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge className="bg-purple-100 text-purple-800">Starting</Badge>
                          <Badge variant="outline" className="text-purple-600">Expert</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">$1,500</div>
                        <div className="text-xs text-slate-500">Prize Pool</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                      <div>
                        <div className="text-xs text-slate-500">📅 March 1st</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">⏰ Entry Fee</div>
                        <div className="text-xs font-medium">$0</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">🏆 $2,650</div>
                        <div className="text-xs text-slate-500">Total Winnings</div>
                      </div>
                    </div>

                    <Button size="sm" className="w-full" variant="outline">
                      🗓️ Join Tournament
                    </Button>
                  </div>
                </div>
              </div>
            </div>


            {/* Right Column */}
            <div className="space-y-6">
              {/* Daily Challenge */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <h2 className="text-lg font-semibold text-slate-900">Daily Challenge</h2>
                  </div>
                  <Badge className="bg-red-100 text-red-800">Expert</Badge>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium text-slate-900 mb-2">Monday Masters Challenge</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>Time Remaining</span>
                    <span className="font-mono text-green-600 font-bold">23:41:28</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-slate-600 mb-2">⚡ 2,847 players</div>
                    <div className="text-sm text-slate-600 mb-2">Rewards</div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-sm">
                      💰 +100 XP
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-sm">
                      🏆 +5,000 Coins
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 mb-4">
                    🎯 Start Challenge
                  </Button>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Your Best Time</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">9:23</span>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-slate-600 mb-2">Today's Leaders</div>
                    <div className="text-right mb-2">
                      <Button variant="ghost" size="sm" className="text-xs text-blue-600 p-0">View All</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm py-1">
                      <div className="flex items-center gap-2">
                        <Crown className="w-3 h-3 text-yellow-600" />
                        <span className="font-medium">SpeedGamer</span>
                      </div>
                      <span className="font-mono font-bold">4:18</span>
                      <Badge className="text-xs">1500</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm py-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <span className="font-medium">LogicMaster</span>
                      </div>
                      <span className="font-mono font-bold">4:56</span>
                      <Badge className="text-xs">1840</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm py-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                        <span className="font-medium">GridSolver</span>
                      </div>
                      <span className="font-mono font-bold">5:43</span>
                      <Badge className="text-xs">964</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Your Statistics */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-slate-900">Your Statistics</h2>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    📊
                  </Button>
                </div>

                {/* Current Rating */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Current Rating</span>
                    <span className="text-lg font-bold text-purple-600">+24</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">2156</div>
                  <div className="text-xs text-slate-500">This week</div>
                </div>

                {/* Weekly Chart */}
                <div className="mb-6">
                  <div className="h-20 bg-slate-50 rounded-lg flex items-end justify-center px-2 py-2 mb-2">
                    <div className="flex items-end gap-1 w-full">
                      {[65, 70, 45, 80, 60, 85, 75].map((height, i) => (
                        <div key={i} className="flex-1 bg-blue-500 rounded-t-sm" style={{ height: `${height}%` }}></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-lg font-bold text-green-600">87.3%</span>
                    </div>
                    <div className="text-xs text-slate-500">Win Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Trophy className="w-4 h-4 text-purple-600" />
                      <span className="text-lg font-bold text-purple-600">#42</span>
                    </div>
                    <div className="text-xs text-slate-500">Global Rank</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-lg font-bold text-blue-600">8:45</span>
                    </div>
                    <div className="text-xs text-slate-500">Avg Time</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Flame className="w-4 h-4 text-orange-600" />
                      <span className="text-lg font-bold text-orange-600">12</span>
                    </div>
                    <div className="text-xs text-slate-500">Win Streak</div>
                  </div>
                </div>

                {/* Achievement Progress */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-slate-900 mb-4">Achievement Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-blue-600" />
                          <div>
                            <div className="text-sm font-medium">Speed Contest</div>
                            <div className="text-xs text-slate-500">Complete 50 games under 5 minutes</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">34/50</Badge>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-blue-600" />
                          <div>
                            <div className="text-sm font-medium">Perfectionist</div>
                            <div className="text-xs text-slate-500">Win 10 tournaments</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">156/200</Badge>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-blue-600" />
                          <div>
                            <div className="text-sm font-medium">Multitasking Champion</div>
                            <div className="text-xs text-slate-500">Win 10 tournaments</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">7/10</Badge>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Detailed Statistics
                </Button>
              </div>

              {/* Friends Activity */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-slate-900">Friends</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">3/5 online</Badge>
                    <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Friend 1 */}
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        GM
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="font-medium text-xs">SudokuMaster99</span>
                        <Badge variant="secondary" className="text-xs px-1">2134</Badge>
                      </div>
                      <div className="text-xs text-slate-500">🏆 Won Weekly Championship • 2 hours ago</div>
                    </div>
                  </div>

                  {/* Friend 2 */}
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        LQ
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="font-medium text-xs">LogicQueen</span>
                        <Badge variant="secondary" className="text-xs px-1">2089</Badge>
                      </div>
                      <div className="text-xs text-slate-500">⭐ Perfect game in 4:23 • 1 hour ago</div>
                    </div>
                  </div>

                  {/* Friend 3 */}
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        NH
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gray-400 rounded-full border border-white"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="font-medium text-xs">NumberNinja</span>
                        <Badge variant="secondary" className="text-xs px-1">1987</Badge>
                      </div>
                      <div className="text-xs text-slate-500">🔥 Hit 15-game win streak • 3 hours ago</div>
                    </div>
                  </div>

                  {/* Friend 4 */}
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        PP
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="font-medium text-xs">PuzzlePro</span>
                        <Badge variant="secondary" className="text-xs px-1">2156</Badge>
                      </div>
                      <div className="text-xs text-slate-500">📈 Reached 2150 rating • 5 hours ago</div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity Summary */}
                <div className="border-t pt-4 mt-4">
                  <div className="text-sm text-slate-600 mb-3">Recent Activity</div>
                  <div className="space-y-2">
                    <div className="text-xs text-slate-500">🏆 SudokuMaster99 won tournament • 3h</div>
                    <div className="text-xs text-slate-500">🎯 LogicQueen perfect game • 1h</div>
                    <div className="text-xs text-slate-500">🔥 NumberNinja 15-game streak • 3h</div>
                  </div>
                </div>

                {/* Friends Stats */}
                <div className="border-t pt-4 mt-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-600">3</div>
                      <div className="text-xs text-slate-500">Online Now</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-600">5</div>
                      <div className="text-xs text-slate-500">Total Friends</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-600">5</div>
                      <div className="text-xs text-slate-500">Active Games</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    <Eye className="w-3 h-3 mr-1" />
                    View All
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    <Plus className="w-3 h-3 mr-1" />
                    Add Friend
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}