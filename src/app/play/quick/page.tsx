'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Zap, Clock, Users, Target } from 'lucide-react';

export default function QuickMatchPage() {
  const [isSearching, setIsSearching] = useState(false);

  const handleQuickMatch = () => {
    setIsSearching(true);
    // Simulate search process
    setTimeout(() => {
      setIsSearching(false);
      // In real app, would redirect to game or handle match found
    }, 3000);
  };

  return (
    <MainLayout isAuthenticated={true}>
      <div className="max-w-4xl mx-auto space-y-6">
        <Breadcrumb />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quick Match</h1>
        <p className="text-gray-600 mt-2">
          Get matched with players of similar skill level in under 30 seconds
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Quick Match
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  Estimated wait time
                </span>
                <Badge variant="secondary">~30s</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4" />
                  Skill matching
                </span>
                <Badge variant="outline">±200 rating</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4" />
                  Difficulty
                </span>
                <Badge variant="outline">Medium</Badge>
              </div>
            </div>

            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleQuickMatch}
              disabled={isSearching}
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Searching for match...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Start Quick Match
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Currently online</span>
                <span className="font-semibold text-green-600">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">In matchmaking</span>
                <span className="font-semibold text-blue-600">23</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Your rating range</span>
                <span className="font-semibold">1400-1800</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {isSearching && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <h3 className="font-semibold text-blue-900">Finding your match...</h3>
              <p className="text-blue-700 text-sm">
                We're matching you with a player of similar skill level
              </p>
              <Button variant="outline" onClick={() => setIsSearching(false)}>
                Cancel Search
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      </div>
    </MainLayout>
  );
}