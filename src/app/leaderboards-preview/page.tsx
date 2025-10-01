'use client';

import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, TrendingUp, Users, Lock, Crown, Star, Zap, Target } from 'lucide-react';

export default function LeaderboardsPreviewPage() {
  const topPlayers = [
    {
      rank: 1,
      username: "SudokuMaster2024",
      rating: 2450,
      gamesWon: 1248,
      avatar: "/avatars/avatar1.png",
      badge: "gold"
    },
    {
      rank: 2,
      username: "PuzzleKing",
      rating: 2389,
      gamesWon: 1156,
      avatar: "/avatars/avatar2.png",
      badge: "silver"
    },
    {
      rank: 3,
      username: "LogicQueen",
      rating: 2301,
      gamesWon: 1089,
      avatar: "/avatars/avatar3.png",
      badge: "bronze"
    }
  ];

  const categories = [
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Global Rankings",
      description: "Compete with players from around the world"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Speed Records",
      description: "Fastest puzzle completion times"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Accuracy Stats",
      description: "Track your error rates and improvement"
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: "Tournament Champions",
      description: "Hall of fame for tournament winners"
    }
  ];

  return (
    <>
      <Navbar variant="visitor" enableScrollChange={false} />
      <div className="h-16" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <TrendingUp className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
            Global Leaderboards
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Track your progress and compete with the best Sudoku players worldwide. See where you rank among thousands of players!
          </p>
          <Badge className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
            <Lock className="w-4 h-4 mr-2" />
            Registration Required to View Full Rankings
          </Badge>
        </div>
      </section>

      {/* Top 3 Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Top Players This Month
            </h2>
            <p className="text-lg text-gray-600">
              See who's dominating the leaderboards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {topPlayers.map((player, index) => (
              <Card key={index} className={`${player.rank === 1 ? 'border-2 border-yellow-400 shadow-xl' : ''}`}>
                <CardContent className="pt-6 text-center">
                  <div className="relative inline-block mb-4">
                    <Avatar className="w-20 h-20 border-4 border-gray-200">
                      <AvatarImage src={player.avatar} alt={player.username} />
                      <AvatarFallback>{player.username[0]}</AvatarFallback>
                    </Avatar>
                    {player.rank === 1 && (
                      <Crown className="w-8 h-8 text-yellow-500 absolute -top-2 -right-2" />
                    )}
                  </div>

                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    #{player.rank}
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{player.username}</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-bold">{player.rating}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Trophy className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-600">Wins:</span>
                      <span className="font-bold">{player.gamesWon}</span>
                    </div>
                  </div>

                  <Badge className={`mt-3 ${
                    player.badge === 'gold' ? 'bg-yellow-100 text-yellow-800' :
                    player.badge === 'silver' ? 'bg-gray-100 text-gray-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {player.badge.charAt(0).toUpperCase() + player.badge.slice(1)} Tier
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Blurred Preview of More Rankings */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 backdrop-blur-md bg-white/60 z-10 flex items-center justify-center">
              <Card className="max-w-md mx-4">
                <CardContent className="pt-6 text-center">
                  <Lock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-bold mb-2">See Full Rankings</h3>
                  <p className="text-gray-600 mb-4">
                    Create a free account to view complete leaderboards and track your own ranking
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Link href="/register">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                        Create Free Account
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button size="lg" variant="outline">
                        Sign In
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Blurred Preview Content */}
            <div className="opacity-20 pointer-events-none space-y-3">
              {[4, 5, 6, 7, 8, 9, 10].map((rank) => (
                <Card key={rank} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div className="flex-1 h-4 bg-gray-300 rounded"></div>
                    <div className="w-20 h-4 bg-gray-300 rounded"></div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Multiple Leaderboard Categories
            </h2>
            <p className="text-lg text-gray-600">
              Compete and track your progress in various ways
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-blue-600">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <TrendingUp className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Ready to Climb the Rankings?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of competitive players and see how you stack up against the best!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Create Free Account
              </Button>
            </Link>
            <Link href="/play-now">
              <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-blue-600">
                Practice First
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
