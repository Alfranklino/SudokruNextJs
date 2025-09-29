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
  MessageCircle,
  Calendar,
  User,
  Plus,
  Eye,
  BarChart3,
  Zap,
  Star,
  Award,
  Timer,
  Flame
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <MainLayout isAuthenticated={true}>
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-[1240px]">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">Good morning, John!</h1>
                <p className="text-slate-500 text-sm">Ready to challenge your mind? Jump into a quick match or continue your tournament run.</p>
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                  Quick Play
                </Button>
                <Button variant="outline" className="px-4 py-2 rounded-md">
                  Join Tournament
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">#42</div>
                  <div className="text-sm text-slate-500">Global Rank</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">87%</div>
                  <div className="text-sm text-slate-500">Win Rate</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">2156</div>
                  <div className="text-sm text-slate-500">ELO Rating</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-red-600 mb-1">1,247</div>
                  <div className="text-sm text-slate-500">Games Played</div>
                </div>
              </div>

              {/* Game Modes */}
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-green-600" />
                  <h2 className="font-semibold text-slate-900">Quick Play</h2>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="text-sm text-slate-600 mb-3">Game Mode</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Quick Match</Button>
                    <Button variant="outline" size="sm">Ranked</Button>
                    <Button variant="outline" size="sm">Custom Game</Button>
                    <Button size="sm" className="bg-blue-600 text-white">Tournaments</Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-sm text-slate-600 mb-2">Difficulty</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Beginner</span>
                        <span className="text-xs text-slate-500">Easy solving</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Intermediate</span>
                        <span className="text-xs text-slate-500">Moderate challenge</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm">Advanced</span>
                        <span className="text-xs text-slate-500">Complex patterns</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Expert</span>
                        <span className="text-xs text-slate-500">Ultimate challenge</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-2">Time Control</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Timer className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Blitz</span>
                        <span className="text-xs text-slate-500">5 min</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Timer className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Rapid</span>
                        <span className="text-xs text-slate-500">15 min</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-600">
                        <Timer className="w-4 h-4" />
                        <span className="text-sm font-medium">Rapid</span>
                        <span className="text-xs">15 min</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Timer className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">SamRai</span>
                        <span className="text-xs text-slate-500">10 min</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm mb-4">
                  <span>Est. wait: 0s - 3,400 online</span>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Find Match
                </Button>
              </div>

              {/* Personal Statistics */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="font-semibold text-slate-900 mb-6">Your Statistics</h2>
                
                {/* Activity Chart */}
                <div className="mb-6">
                  <div className="text-sm font-medium text-slate-900 mb-3">Current Rating: 2156</div>
                  <div className="h-32 bg-slate-50 rounded-lg flex items-end justify-center px-4 py-3">
                    <div className="flex items-end gap-1 w-full">
                      {[40, 35, 45, 50, 30, 60, 55].map((height, i) => (
                        <div key={i} className="flex-1 bg-blue-500 rounded-t" style={{ height: `${height}%` }}></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>Mon</span>
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
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-lg font-bold text-green-600">87.3%</span>
                    </div>
                    <div className="text-sm text-slate-500">Win Rate</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-4 h-4 text-purple-600" />
                      <span className="text-lg font-bold text-purple-600">#42</span>
                    </div>
                    <div className="text-sm text-slate-500">Global Rank</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-lg font-bold text-blue-600">8:45</span>
                    </div>
                    <div className="text-sm text-slate-500">Avg. Time</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="w-4 h-4 text-orange-600" />
                      <span className="text-lg font-bold text-orange-600">12</span>
                    </div>
                    <div className="text-sm text-slate-500">Win Streak</div>
                  </div>
                </div>

                {/* Achievement Progress */}
                <div className="mb-6">
                  <h3 className="font-medium text-slate-900 mb-4">Achievement Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-blue-600" />
                          <div>
                            <div className="font-medium text-sm">Speed Demon</div>
                            <div className="text-xs text-slate-500">Complete 50 games under 5 minutes</div>
                          </div>
                        </div>
                        <Badge variant="outline">34/50</Badge>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-blue-600" />
                          <div>
                            <div className="font-medium text-sm">Perfectionist</div>
                            <div className="text-xs text-slate-500">Complete 200 games without errors</div>
                          </div>
                        </div>
                        <Badge variant="outline">156/200</Badge>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-blue-600" />
                          <div>
                            <div className="font-medium text-sm">Tournament Champion</div>
                            <div className="text-xs text-slate-500">Win 10 tournaments</div>
                          </div>
                        </div>
                        <Badge variant="outline">7/10</Badge>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Games this week:</span>
                        <span className="font-medium">23</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Perfect games:</span>
                        <span className="font-medium">156</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Total playtime:</span>
                        <span className="font-medium">142h 35m</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Favorite mode:</span>
                        <span className="font-medium">Rapid (10 min)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-6">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Detailed Statistics
                </Button>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Daily Challenge */}
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <h2 className="font-semibold text-slate-900">Daily Challenge</h2>
                  </div>
                  <Badge className="bg-red-100 text-red-600">Expert</Badge>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm font-medium text-slate-900 mb-2">Monday Master Challenge</div>
                  <div className="text-sm text-slate-500 mb-4">Time Remaining: 23:41:28</div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Rewards</span>
                    </div>
                    <div className="bg-slate-50 rounded p-2 text-sm">
                      +5 XP Rating
                    </div>
                    <div className="bg-slate-50 rounded p-2 text-sm">
                      +500 Points
                    </div>
                  </div>
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Start Challenge
                  </Button>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Your Best Time</span>
                    <span className="text-sm text-green-600 font-bold">9:23</span>
                  </div>
                  
                  <div className="text-sm text-slate-600 mb-3">Today's Leaders</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>1. LogicMaster</span>
                      <span>4:52</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>2. NumberNinja</span>
                      <span>5:43</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>3. SudokuQueen</span>
                      <span>6:21</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Friends Activity */}
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <h2 className="font-semibold text-slate-900">Friends</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">3/5 online</Badge>
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Friend 1 */}
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                        SU
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">SudokuMaster99</span>
                        <Badge variant="outline" className="text-xs">2134</Badge>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs">In Tournament</Badge>
                      <div className="bg-slate-50 rounded px-2 py-1 mt-2 text-xs text-slate-600">
                        <Trophy className="w-3 h-3 inline mr-1" />
                        Won Weekly Championship • 2 hours ago
                      </div>
                    </div>
                  </div>

                  {/* Friend 2 */}
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                        LO
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">LogicQueen</span>
                        <Badge variant="outline" className="text-xs">2089</Badge>
                      </div>
                      <Badge className="bg-red-100 text-red-800 text-xs">Playing Blitz</Badge>
                      <div className="bg-slate-50 rounded px-2 py-1 mt-2 text-xs text-slate-600">
                        <Star className="w-3 h-3 inline mr-1" />
                        Perfect game in 4:23 • 1 hour ago
                      </div>
                    </div>
                  </div>

                  {/* Friend 3 */}
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                        NU
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gray-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">NumberNinja</span>
                        <Badge variant="outline" className="text-xs">1987</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                        <Clock className="w-3 h-3" />
                        30 minutes ago
                      </div>
                      <div className="bg-slate-50 rounded px-2 py-1 text-xs text-slate-600">
                        <Flame className="w-3 h-3 inline mr-1" />
                        Hit 15-game win streak • 3 hours ago
                      </div>
                    </div>
                  </div>

                  {/* Friend 4 */}
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                        PU
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">PuzzlePro</span>
                        <Badge variant="outline" className="text-xs">2156</Badge>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs">Daily Challenge</Badge>
                      <div className="bg-slate-50 rounded px-2 py-1 mt-2 text-xs text-slate-600">
                        <TrendingUp className="w-3 h-3 inline mr-1" />
                        Reached 2150 rating • 5 hours ago
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="border-t pt-4 mt-6">
                  <h3 className="font-medium text-slate-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Trophy className="w-3 h-3 text-yellow-600" />
                      <span><strong>SudokuMaster99</strong> won a tournament</span>
                      <span className="text-slate-500 ml-auto">2h</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-3 h-3 text-blue-600" />
                      <span><strong>LogicQueen</strong> achieved a perfect game</span>
                      <span className="text-slate-500 ml-auto">1h</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Flame className="w-3 h-3 text-orange-600" />
                      <span><strong>NumberNinja</strong> hit 15-game streak</span>
                      <span className="text-slate-500 ml-auto">3h</span>
                    </div>
                  </div>
                </div>

                {/* Friends Stats */}
                <div className="border-t pt-4 mt-6">
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

                <div className="flex gap-2 mt-6">
                  <Button variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Plus className="w-4 h-4 mr-2" />
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