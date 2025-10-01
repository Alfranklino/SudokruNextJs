'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import confetti from 'canvas-confetti';

interface CellState {
  value: number;
  isInitial: boolean;
  hasMistake: boolean;
  mistakeValue?: number;
}

// Real expert-level Sudoku puzzle
const EXPERT_PUZZLE = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 3, 0, 8, 5],
  [0, 0, 1, 0, 2, 0, 0, 0, 0],
  [0, 0, 0, 5, 0, 7, 0, 0, 0],
  [0, 0, 4, 0, 0, 0, 1, 0, 0],
  [0, 9, 0, 0, 0, 0, 0, 0, 0],
  [5, 0, 0, 0, 0, 0, 0, 7, 3],
  [0, 0, 2, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 0, 0, 0, 9]
];

// Solution to the puzzle
const SOLUTION = [
  [9, 8, 7, 6, 5, 4, 3, 2, 1],
  [2, 4, 6, 1, 7, 3, 9, 8, 5],
  [3, 5, 1, 9, 2, 8, 7, 4, 6],
  [1, 2, 8, 5, 3, 7, 6, 9, 4],
  [6, 3, 4, 8, 9, 2, 1, 5, 7],
  [7, 9, 5, 4, 6, 1, 8, 3, 2],
  [5, 1, 9, 2, 8, 6, 4, 7, 3],
  [4, 7, 2, 3, 1, 9, 5, 6, 8],
  [8, 6, 3, 7, 4, 5, 2, 1, 9]
];

// Generate solving sequence with some mistakes
const generateSolvingSequence = () => {
  const sequence: Array<{
    row: number;
    col: number;
    value: number;
    hasMistake: boolean;
    mistakeValue?: number;
  }> = [];

  // Find all empty cells
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (EXPERT_PUZZLE[row][col] === 0) {
        const correctValue = SOLUTION[row][col];
        const hasMistake = Math.random() < 0.12; // 12% chance of mistake

        let mistakeValue: number | undefined;
        if (hasMistake) {
          // Generate a plausible wrong value (different from correct)
          const wrongValues = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(v => v !== correctValue);
          mistakeValue = wrongValues[Math.floor(Math.random() * wrongValues.length)];
        }

        sequence.push({
          row,
          col,
          value: correctValue,
          hasMistake,
          mistakeValue
        });
      }
    }
  }

  // Shuffle to create more realistic solving order
  for (let i = sequence.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
  }

  return sequence;
};

export function AnimatedSudokuGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const congratsRef = useRef<HTMLDivElement>(null);
  const [gridState, setGridState] = useState<CellState[][]>(() =>
    EXPERT_PUZZLE.map(row =>
      row.map(val => ({
        value: val,
        isInitial: val !== 0,
        hasMistake: false
      }))
    )
  );
  const cellRefs = useRef<(HTMLDivElement | null)[][]>(
    Array(9).fill(null).map(() => Array(9).fill(null))
  );

  useGSAP(() => {
    if (!gridRef.current) return;

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 4,
    });

    // Generate solving sequence
    const solvingSequence = generateSolvingSequence();

    // Initial state: show only initial values
    EXPERT_PUZZLE.forEach((row, i) => {
      row.forEach((val, j) => {
        if (val !== 0) {
          gsap.set(cellRefs.current[i][j], {
            opacity: 1,
            scale: 1,
          });
        } else {
          gsap.set(cellRefs.current[i][j], {
            opacity: 0,
            scale: 0.5,
          });
        }
      });
    });

    gsap.set(congratsRef.current, {
      opacity: 0,
      scale: 0.8,
    });

    // Solve cells one by one with smooth timing
    let currentTime = 0.5;
    const baseDelay = 0.25; // Base time between each cell solve

    solvingSequence.forEach((move, index) => {
      const { row, col, value, hasMistake, mistakeValue } = move;

      if (hasMistake && mistakeValue) {
        // Show mistake first
        tl.call(() => {
          setGridState(prev => {
            const newState = prev.map(r => r.map(c => ({ ...c })));
            newState[row][col] = {
              value: mistakeValue,
              isInitial: false,
              hasMistake: true,
              mistakeValue
            };
            return newState;
          });
        }, [], currentTime);

        // Animate mistake appearing
        tl.to(
          cellRefs.current[row][col],
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'back.out(1.7)',
          },
          currentTime
        );

        currentTime += 0.5;

        // Shake animation for mistake
        tl.to(
          cellRefs.current[row][col],
          {
            x: -3,
            duration: 0.05,
            yoyo: true,
            repeat: 5,
            ease: 'none',
          },
          currentTime
        );

        currentTime += 0.3;

        // Fade out mistake
        tl.to(
          cellRefs.current[row][col],
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.2,
            ease: 'power2.in',
          },
          currentTime
        );

        currentTime += 0.3;
      }

      // Show correct value
      tl.call(() => {
        setGridState(prev => {
          const newState = prev.map(r => r.map(c => ({ ...c })));
          newState[row][col] = {
            value,
            isInitial: false,
            hasMistake: false
          };
          return newState;
        });
      }, [], currentTime);

      // Animate correct value appearing
      tl.to(
        cellRefs.current[row][col],
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.35,
          ease: 'back.out(1.4)',
        },
        currentTime
      );

      currentTime += baseDelay;
    });

    // Completion animation
    currentTime += 0.5;

    // Grid subtle scale
    tl.to(
      gridRef.current,
      {
        scale: 1.03,
        duration: 0.4,
        ease: 'power2.out',
      },
      currentTime
    );

    tl.to(gridRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.in',
    });

    currentTime += 0.7;

    // Show congratulations
    tl.to(
      congratsRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.4)',
      },
      currentTime
    );

    // Confetti burst
    tl.call(() => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        const count = 60;
        const defaults = {
          origin: { x, y },
          disableForReducedMotion: true,
          spread: 70,
          startVelocity: 30,
          decay: 0.91,
          scalar: 0.9,
        };

        function fire(particleRatio: number, opts: any) {
          confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
          });
        }

        fire(0.25, { spread: 30, startVelocity: 60 });
        fire(0.2, { spread: 70 });
        fire(0.35, { spread: 110, decay: 0.92, scalar: 0.85 });
        fire(0.1, { spread: 130, startVelocity: 30, decay: 0.93, scalar: 1.1 });
        fire(0.1, { spread: 130, startVelocity: 50 });
      }
    }, [], currentTime);

    currentTime += 3;

    // Fade out congratulations
    tl.to(congratsRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
    }, currentTime);

    currentTime += 0.5;

    // Reset all non-initial cells
    tl.call(() => {
      setGridState(prev => {
        const newState = EXPERT_PUZZLE.map(row =>
          row.map(val => ({
            value: val,
            isInitial: val !== 0,
            hasMistake: false
          }))
        );
        return newState;
      });
    }, [], currentTime);

    EXPERT_PUZZLE.forEach((row, i) => {
      row.forEach((val, j) => {
        if (val === 0) {
          tl.to(
            cellRefs.current[i][j],
            {
              opacity: 0,
              scale: 0.5,
              duration: 0.3,
              ease: 'power2.in',
            },
            currentTime
          );
        }
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      <div
        ref={gridRef}
        className="relative bg-slate-800/50 backdrop-blur-sm rounded-lg p-2 shadow-2xl border border-white/10"
        style={{
          width: 'min(90vw, 450px)',
          aspectRatio: '1/1',
        }}
      >
        {/* Sudoku Grid */}
        <div className="grid grid-cols-9 gap-0 w-full h-full">
          {gridState.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isThickRight = (colIndex + 1) % 3 === 0 && colIndex !== 8;
              const isThickBottom = (rowIndex + 1) % 3 === 0 && rowIndex !== 8;
              const cellIndex = rowIndex * 9 + colIndex;

              return (
                <div
                  key={cellIndex}
                  ref={(el) => {
                    cellRefs.current[rowIndex][colIndex] = el;
                  }}
                  className={`
                    relative flex items-center justify-center
                    bg-slate-900/80 backdrop-blur-sm
                    border border-slate-600/50
                    ${isThickRight ? 'border-r-2 border-r-blue-400/60' : ''}
                    ${isThickBottom ? 'border-b-2 border-b-blue-400/60' : ''}
                    ${cell.isInitial ? 'text-blue-200 font-bold' : cell.hasMistake ? 'text-red-400' : 'text-green-400'}
                    font-mono text-base sm:text-lg md:text-xl
                    transition-colors duration-200
                  `}
                  style={{
                    opacity: cell.isInitial ? 1 : 0,
                    transform: cell.isInitial ? 'scale(1)' : 'scale(0.5)',
                  }}
                >
                  {cell.value || ''}
                  {/* Error indicator for mistakes */}
                  {cell.hasMistake && (
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Congratulations Message */}
        <div
          ref={congratsRef}
          className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-md rounded-lg"
          style={{
            opacity: 0,
          }}
        >
          <div className="text-center space-y-4 p-6">
            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
              Expert Solved!
            </div>
            <div className="text-lg text-gray-300 font-medium">
              🎉 Incredible work! 🎉
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
