// Test utilities panel for QA and debugging (dev mode only)
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Bug,
  Zap,
  CheckCircle,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';
import type { Difficulty } from '@/lib/sudoku/difficulty';

interface TestUtilitiesProps {
  onAutoFill: () => void;
  onGenerateNew: (difficulty: Difficulty) => void;
  onToggleErrors: () => void;
  onPrintSolution: () => void;
  showErrors: boolean;
  currentDifficulty: Difficulty;
}

export function TestUtilities({
  onAutoFill,
  onGenerateNew,
  onToggleErrors,
  onPrintSolution,
  showErrors,
  currentDifficulty
}: TestUtilitiesProps) {
  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'expert'];

  return (
    <Card className="bg-yellow-50 border-2 border-yellow-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-yellow-900 flex items-center gap-2">
          <Bug className="w-4 h-4" />
          Test Utilities
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-400">
            DEV ONLY
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Auto-fill solution */}
        <Button
          onClick={onAutoFill}
          size="sm"
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Auto-Fill Solution
        </Button>

        {/* Generate new puzzle dropdown */}
        <div className="space-y-1">
          <div className="text-xs font-medium text-yellow-900 mb-1">Generate New Puzzle:</div>
          <div className="grid grid-cols-2 gap-1">
            {difficulties.map((diff) => (
              <Button
                key={diff}
                onClick={() => onGenerateNew(diff)}
                size="sm"
                variant={currentDifficulty === diff ? "default" : "outline"}
                className="text-xs"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Toggle errors */}
        <Button
          onClick={onToggleErrors}
          size="sm"
          variant="outline"
          className="w-full"
        >
          {showErrors ? (
            <>
              <EyeOff className="w-4 h-4 mr-2" />
              Hide Errors
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Show Errors
            </>
          )}
        </Button>

        {/* Print solution to console */}
        <Button
          onClick={onPrintSolution}
          size="sm"
          variant="outline"
          className="w-full"
        >
          <Zap className="w-4 h-4 mr-2" />
          Print Solution (Console)
        </Button>

        {/* Info text */}
        <div className="pt-2 border-t border-yellow-300">
          <p className="text-xs text-yellow-800">
            These utilities are only visible in development mode and will not appear in production.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}