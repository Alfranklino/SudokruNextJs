'use client';

import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, Users, Crown, Lock, Star, Zap } from 'lucide-react';

export default function TournamentsPreviewPage() {
  const upcomingTournaments = [
    {
      name: "Weekend Warrior Championship",
      date: "Every Saturday & Sunday",
      participants: "500+ players",
      prize: "Gold Badge",
      difficulty: "Medium",
      status: "Recurring"
    },
    {
      name: "Speed Sudoku Sprint",
      date: "Daily at 8 PM EST",
      participants: "200+ players",
      prize: "XP Boost",
      difficulty: "Hard",
      status: "Daily"
    },
    {
      name: "Monthly Masters Tournament",
      date: "First Monday of Month",
      participants: "1000+ players",
      prize: "Premium Badge",
      difficulty: "Expert",
      status: "Monthly"
    }
  ];

  const features = [
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Competitive Rankings",
      description: "Climb global leaderboards and earn prestigious badges"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multiplayer Battles",
      description: "Compete against players worldwide in real-time"
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: "Exclusive Rewards",
      description: "Win badges, XP boosts, and premium features"
    }
  ];

  return (
    <>
      <Navbar variant="visitor" enableScrollChange={false} />
      <div className="h-16" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Trophy className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
            Competitive Tournaments
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Join thousands of players in daily, weekly, and monthly tournaments. Test your skills and win exclusive rewards!
          </p>
          <Badge className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
            <Lock className="w-4 h-4 mr-2" />
            Registration Required
          </Badge>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Join Tournaments?
            </h2>
            <p className="text-lg text-gray-600">
              Experience the thrill of competitive Sudoku
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-purple-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Tournaments Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Upcoming Tournaments
            </h2>
            <p className="text-lg text-gray-600">
              Sign up to participate in these exciting events
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {upcomingTournaments.map((tournament, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute top-0 right-0">
                  <Badge className="m-4 bg-purple-100 text-purple-800">
                    {tournament.status}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{tournament.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {tournament.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {tournament.participants}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 mr-2" />
                    Prize: {tournament.prize}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Zap className="w-4 h-4 mr-2" />
                    Difficulty: {tournament.difficulty}
                  </div>
                  <div className="pt-3">
                    <Button className="w-full" disabled>
                      <Lock className="w-4 h-4 mr-2" />
                      Sign Up Required
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Blurred Preview Overlay */}
          <div className="relative">
            <div className="absolute inset-0 backdrop-blur-sm bg-white/50 z-10 flex items-center justify-center">
              <Card className="max-w-md mx-4">
                <CardContent className="pt-6 text-center">
                  <Lock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-bold mb-2">More Tournaments Available</h3>
                  <p className="text-gray-600 mb-4">
                    Create a free account to see all tournaments and join the competition
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Link href="/register">
                      <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
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
            <div className="opacity-30 pointer-events-none">
              <Card className="p-6">
                <div className="h-40 bg-gray-200 rounded animate-pulse"></div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Trophy className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Ready to Compete?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of players and start your journey to becoming a Sudoku champion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Create Free Account
              </Button>
            </Link>
            <Link href="/play-now">
              <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-purple-600">
                Try Demo First
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
