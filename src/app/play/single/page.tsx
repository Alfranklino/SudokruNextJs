'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { SudokuGrid } from '@/components/game/SudokuGrid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Settings,
  ArrowLeft,
  Cloud,
  Star,
  Clock,
  Brain,
  CheckCircle,
  Play
} from 'lucide-react';

// Mock Sudoku grid data
const mockInitialGrid = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const mockCurrentGrid = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

const difficultyLevels = [
  {
    id: 'easy',
    name: 'Easy',
    color: 'bg-green-500',
    borderColor: 'border-green-200',
    bgColor: 'bg-green-50',
    textColor: 'text-green-900',
    rating: 1,
    bestTime: '8:32',
    successRate: '98%',
    masteryProgress: 98,
    description: 'Perfect for beginners and learning basic techniques'
  },
  {
    id: 'medium',
    name: 'Medium',
    color: 'bg-blue-500',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-900',
    rating: 3,
    bestTime: '12:45',
    successRate: '87%',
    masteryProgress: 67,
    description: 'Intermediate puzzles with moderate complexity'
  },
  {
    id: 'hard',
    name: 'Hard',
    color: 'bg-orange-500',
    borderColor: 'border-orange-200',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-900',
    rating: 4,
    bestTime: '39:15',
    successRate: '73%',
    masteryProgress: 45,
    description: 'Advanced puzzles requiring strategic thinking'
  },
  {
    id: 'expert',
    name: 'Expert',
    color: 'bg-red-500',
    borderColor: 'border-red-200',
    bgColor: 'bg-red-50',
    textColor: 'text-red-900',
    rating: 5,
    bestTime: '52:19',
    successRate: '62%',
    masteryProgress: 12,
    description: 'Master-level puzzles for true Sudoku experts'
  }
];

export default function SinglePlayerPage() {
  const [currentGrid, setCurrentGrid] = useState(mockCurrentGrid);
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [cloudSyncEnabled, setCloudSyncEnabled] = useState(true);

  const handleCellChange = (row: number, col: number, value: number) => {
    const newGrid = currentGrid.map((r, rowIndex) =>
      rowIndex === row
        ? r.map((cell, colIndex) => (colIndex === col ? value : cell))
        : r
    );
    setCurrentGrid(newGrid);
  };

  const handleCellSelect = (row: number, col: number) => {
    console.log(`Selected cell: ${row}, ${col}`);
  };

  return (
    <MainLayout isAuthenticated={true}>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <span>Home</span>
              <span>/</span>
              <span>Play</span>
              <span>/</span>
              <span className="text-slate-900 font-medium">Single Player</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Single Player</h1>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Sudoku Grid */}
            <div className="col-span-8">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="flex justify-center">
                  <SudokuGrid
                    initialGrid={mockInitialGrid}
                    currentGrid={currentGrid}
                    onCellChange={handleCellChange}
                    onCellSelect={handleCellSelect}
                    className="scale-110"
                  />
                </div>
                <div className="text-center mt-6">
                  <p className="text-slate-500 text-sm">Enter numbers 1-9 to solve the puzzle</p>
                </div>
              </div>
            </div>

            {/* Right Column - Control Panel */}
            <div className="col-span-4 space-y-6">
              {/* Game Controls */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Game Controls
                </h3>
                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    New Game
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Game Settings
                  </Button>
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Menu
                  </Button>
                </div>
              </div>

              {/* Cloud Sync */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Cloud className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-slate-900">Cloud Sync</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">BACKED</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Auto-save</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">Every 5 minutes</span>
                    <button
                      onClick={() => setCloudSyncEnabled(!cloudSyncEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        cloudSyncEnabled ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          cloudSyncEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Select Difficulty */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Select Difficulty
                </h3>
                <div className="space-y-3">
                  {difficultyLevels.map((difficulty) => (
                    <div
                      key={difficulty.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedDifficulty === difficulty.id
                          ? `${difficulty.borderColor} ${difficulty.bgColor}`
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      onClick={() => setSelectedDifficulty(difficulty.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${difficulty.color}`} />
                          <span className={`font-medium ${
                            selectedDifficulty === difficulty.id ? difficulty.textColor : 'text-slate-900'
                          }`}>
                            {difficulty.name}
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < difficulty.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-slate-900">{difficulty.bestTime}</div>
                          <div className="text-xs text-slate-500">Best Time</div>
                        </div>
                      </div>
                      <div className="text-xs text-slate-600 mb-2">{difficulty.description}</div>
                      <div className="grid grid-cols-3 gap-4 text-xs mb-3">
                        <div className="text-center">
                          <div className="font-medium text-slate-900">{difficulty.bestTime}</div>
                          <div className="text-slate-500">Best Time</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-slate-900">{difficulty.successRate}</div>
                          <div className="text-slate-500">Success Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-slate-900">{difficulty.masteryProgress}%</div>
                          <div className="text-slate-500">Mastery</div>
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="text-xs text-slate-500 mb-1">Mastery Progress</div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${difficulty.color}`}
                            style={{ width: `${difficulty.masteryProgress}%` }}
                          />
                        </div>
                        <div className="text-xs text-slate-500 mt-1">{difficulty.masteryProgress}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Start Options */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Start Options</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Recommended: Medium</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Continue Where I Left Off</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Path */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  Learning Path
                </h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="text-sm font-medium text-blue-900">Master each difficulty level with 90%+ success rate for efficient advancement. Each level teaches essential techniques for competitive play.</div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Start Learning Path
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