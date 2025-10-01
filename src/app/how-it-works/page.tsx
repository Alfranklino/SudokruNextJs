'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { VisitorLayout } from '@/components/layout/VisitorLayout';
import {
  Play,
  UserPlus,
  Trophy,
  Zap,
  Users,
  Target,
  CheckCircle2,
  ArrowRight,
  Home
} from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: "Sign Up Free",
      description: "Create your account in seconds. No credit card required, just your email and you're ready to play.",
      icon: <UserPlus className="w-8 h-8" />,
      color: "bg-blue-500"
    },
    {
      number: 2,
      title: "Choose Your Mode",
      description: "Select from single player practice, competitive multiplayer battles, or join tournaments with players worldwide.",
      icon: <Target className="w-8 h-8" />,
      color: "bg-green-500"
    },
    {
      number: 3,
      title: "Start Playing",
      description: "Jump into a puzzle and compete in real-time. See live updates as you and opponents solve cells simultaneously.",
      icon: <Play className="w-8 h-8" />,
      color: "bg-purple-500"
    },
    {
      number: 4,
      title: "Earn Achievements",
      description: "Track your progress, climb leaderboards, and earn badges as you improve your skills and complete challenges.",
      icon: <Trophy className="w-8 h-8" />,
      color: "bg-yellow-500"
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-Time Multiplayer",
      description: "Compete against players in live battles with instant updates"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Social Features",
      description: "Add friends, create custom rooms, and spectate ongoing games"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Tournaments",
      description: "Join competitive tournaments with prizes and global rankings"
    }
  ];

  return (
    <VisitorLayout className="bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
              How Sudokru Works
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              From beginner to expert, here's everything you need to know about playing competitive Sudoku
            </p>
            <Link href="/#try-now">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Play className="w-5 h-5 mr-2" />
                Try It Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get Started in 4 Simple Steps
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of players in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="pt-6">
                  <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center text-white mb-4 mx-auto`}>
                    {step.icon}
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-500 mb-2">
                      Step {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-gray-300" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Makes Sudokru Special?
            </h2>
            <p className="text-lg text-gray-600">
              More than just another Sudoku game
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-blue-600">
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

      {/* Game Modes Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Multiple Ways to Play
            </h2>
            <p className="text-lg text-gray-600">
              Choose the experience that fits your style
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Single Player</h3>
                    <p className="text-gray-600">
                      Practice and improve your skills at your own pace. Choose from easy to expert difficulty levels.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Multiplayer Battles</h3>
                    <p className="text-gray-600">
                      Race against opponents in real-time. First to complete the puzzle wins!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Tournaments</h3>
                    <p className="text-gray-600">
                      Compete in organized events with multiple rounds. Climb the leaderboard and win prizes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-yellow-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Custom Rooms</h3>
                    <p className="text-gray-600">
                      Create private games with friends. Set your own rules and difficulty settings.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Playing?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of players and experience Sudoku like never before
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#try-now">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Play className="w-5 h-5 mr-2" />
                Try Free Demo
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-blue-600">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </section>
    </VisitorLayout>
  );
}
