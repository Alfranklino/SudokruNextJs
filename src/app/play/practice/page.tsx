'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Play, Star, Clock, Target, BookOpen } from 'lucide-react';

const practiceCategories = [
  {
    id: 'beginner',
    title: 'Beginner Techniques',
    description: 'Learn the basic strategies',
    icon: BookOpen,
    lessons: [
      { name: 'Naked Singles', completed: true, difficulty: 'Easy' },
      { name: 'Hidden Singles', completed: true, difficulty: 'Easy' },
      { name: 'Naked Pairs', completed: false, difficulty: 'Medium' },
      { name: 'Hidden Pairs', completed: false, difficulty: 'Medium' },
    ]
  },
  {
    id: 'intermediate',
    title: 'Intermediate Strategies',
    description: 'Master advanced solving techniques',
    icon: Target,
    lessons: [
      { name: 'Pointing Pairs', completed: false, difficulty: 'Medium' },
      { name: 'Box/Line Reduction', completed: false, difficulty: 'Medium' },
      { name: 'Naked Triples', completed: false, difficulty: 'Hard' },
      { name: 'X-Wing', completed: false, difficulty: 'Hard' },
    ]
  },
  {
    id: 'speed',
    title: 'Speed Training',
    description: 'Improve your solving speed',
    icon: Clock,
    lessons: [
      { name: '5-minute Easy', completed: true, difficulty: 'Easy' },
      { name: '10-minute Medium', completed: false, difficulty: 'Medium' },
      { name: '15-minute Hard', completed: false, difficulty: 'Hard' },
      { name: 'Sprint Mode', completed: false, difficulty: 'Expert' },
    ]
  }
];

export default function PracticeModePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleStartLesson = (categoryId: string, lessonName: string) => {
    console.log(`Starting lesson: ${lessonName} in category: ${categoryId}`);
    // In real app, would navigate to lesson
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Practice Mode</h1>
        <p className="text-gray-600 mt-2">
          Improve your Sudoku skills with guided lessons and challenges
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {practiceCategories.map((category) => {
          const IconComponent = category.icon;
          const completedLessons = category.lessons.filter(l => l.completed).length;
          const totalLessons = category.lessons.length;
          
          return (
            <Card 
              key={category.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedCategory === category.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                    <p className="text-sm text-gray-600 font-normal">
                      {category.description}
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Progress</span>
                    <Badge variant="outline">
                      {completedLessons}/{totalLessons}
                    </Badge>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${(completedLessons / totalLessons) * 100}%` }}
                    />
                  </div>

                  {selectedCategory === category.id && (
                    <div className="mt-4 space-y-2">
                      {category.lessons.map((lesson, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-2 rounded border"
                        >
                          <div className="flex items-center gap-2">
                            {lesson.completed ? (
                              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                <Star className="w-2 h-2 text-white" />
                              </div>
                            ) : (
                              <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                            )}
                            <span className="text-sm font-medium">{lesson.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="outline" 
                              className={
                                lesson.difficulty === 'Easy' ? 'border-green-300 text-green-700' :
                                lesson.difficulty === 'Medium' ? 'border-yellow-300 text-yellow-700' :
                                lesson.difficulty === 'Hard' ? 'border-red-300 text-red-700' :
                                'border-purple-300 text-purple-700'
                              }
                            >
                              {lesson.difficulty}
                            </Badge>
                            <Button
                              size="sm"
                              variant={lesson.completed ? "outline" : "default"}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStartLesson(category.id, lesson.name);
                              }}
                            >
                              {lesson.completed ? 'Replay' : 'Start'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              Daily Challenge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900">Today's Challenge</h4>
                <p className="text-sm text-purple-700">
                  Solve a medium puzzle using only basic techniques
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="border-purple-300 text-purple-700">
                    Medium
                  </Badge>
                  <Badge variant="outline" className="border-purple-300 text-purple-700">
                    +50 XP
                  </Badge>
                </div>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Play className="w-4 h-4 mr-2" />
                Start Daily Challenge
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Practice Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Lessons completed</span>
                <span className="font-semibold">3/12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Practice time</span>
                <span className="font-semibold">2h 30m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Streak</span>
                <span className="font-semibold">5 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Skill level</span>
                <Badge>Beginner</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}