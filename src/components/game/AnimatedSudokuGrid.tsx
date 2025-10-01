'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import confetti from 'canvas-confetti';

interface CellData {
  value: number;
  isCorrect: boolean;
  index: number;
}

// Generate a mix of correct and error values for animation
const generateAnimationData = (): CellData[] => {
  const cells: CellData[] = [];
  const totalCells = 81;

  // Create array of all cell indices
  for (let i = 0; i < totalCells; i++) {
    const value = (i % 9) + 1; // Values 1-9
    // 15% of cells will have errors
    const isCorrect = Math.random() > 0.15;
    cells.push({ value, isCorrect, index: i });
  }

  return cells;
};

export function AnimatedSudokuGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const congratsRef = useRef<HTMLDivElement>(null);
  const [animationData] = useState(generateAnimationData());
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!gridRef.current) return;

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 3,
    });

    // Initial state: all cells invisible
    gsap.set(cellRefs.current, {
      opacity: 0,
      scale: 0.5,
    });

    gsap.set(congratsRef.current, {
      opacity: 0,
      y: -20,
    });

    // Phase 1: Fill first 30 cells (0-3s)
    animationData.slice(0, 30).forEach((cell, i) => {
      tl.to(
        cellRefs.current[cell.index],
        {
          opacity: 1,
          scale: 1,
          duration: 0.15,
          ease: 'back.out(1.7)',
        },
        i * 0.08
      );
    });

    // Phase 2: Fill next 30 cells (3-5s) - faster
    animationData.slice(30, 60).forEach((cell, i) => {
      tl.to(
        cellRefs.current[cell.index],
        {
          opacity: 1,
          scale: 1,
          duration: 0.12,
          ease: 'back.out(1.7)',
        },
        2.4 + i * 0.05
      );
    });

    // Phase 3: Fill final 21 cells (5-7s) - rapid
    animationData.slice(60, 81).forEach((cell, i) => {
      tl.to(
        cellRefs.current[cell.index],
        {
          opacity: 1,
          scale: 1,
          duration: 0.08,
          ease: 'back.out(1.7)',
        },
        3.9 + i * 0.03
      );
    });

    // Phase 4: Grid completion highlight
    tl.to(
      gridRef.current,
      {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      },
      '+=0.2'
    );

    tl.to(gridRef.current, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.in',
    });

    // Show congratulations message
    tl.to(
      congratsRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      },
      '-=0.1'
    );

    // Trigger confetti (contained within hero)
    tl.call(() => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        // Create contained confetti burst
        const count = 50;
        const defaults = {
          origin: { x, y },
          disableForReducedMotion: true,
          spread: 60,
          startVelocity: 25,
          decay: 0.9,
          scalar: 0.8,
        };

        function fire(particleRatio: number, opts: any) {
          confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
          });
        }

        fire(0.25, {
          spread: 26,
          startVelocity: 55,
        });

        fire(0.2, {
          spread: 60,
        });

        fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8,
        });

        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2,
        });

        fire(0.1, {
          spread: 120,
          startVelocity: 45,
        });
      }
    });

    // Hold the congratulations message
    tl.to({}, { duration: 2 });

    // Fade out congratulations
    tl.to(congratsRef.current, {
      opacity: 0,
      duration: 0.5,
    });

    // Reset all cells for loop
    tl.to(cellRefs.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.5,
      stagger: 0.005,
      ease: 'power2.in',
    });

    return () => {
      tl.kill();
    };
  }, [animationData]);

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
          {animationData.map((cell, index) => {
            const row = Math.floor(index / 9);
            const col = index % 9;
            const isThickRight = (col + 1) % 3 === 0 && col !== 8;
            const isThickBottom = (row + 1) % 3 === 0 && row !== 8;

            return (
              <div
                key={index}
                ref={(el) => {
                  cellRefs.current[index] = el;
                }}
                className={`
                  relative flex items-center justify-center
                  bg-slate-900/80 backdrop-blur-sm
                  border border-slate-600/50
                  ${isThickRight ? 'border-r-2 border-r-blue-400/60' : ''}
                  ${isThickBottom ? 'border-b-2 border-b-blue-400/60' : ''}
                  ${cell.isCorrect ? 'text-green-400' : 'text-red-400'}
                  font-bold text-base sm:text-lg md:text-xl
                  font-mono
                  transition-colors
                `}
                style={{
                  opacity: 0,
                  transform: 'scale(0.5)',
                }}
              >
                {cell.value}
                {/* Error indicator */}
                {!cell.isCorrect && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                )}
              </div>
            );
          })}
        </div>

        {/* Congratulations Message */}
        <div
          ref={congratsRef}
          className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-md rounded-lg"
          style={{
            opacity: 0,
          }}
        >
          <div className="text-center space-y-4 p-6">
            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 animate-pulse">
              Puzzle Complete!
            </div>
            <div className="text-lg text-gray-300 font-medium">
              🎉 Amazing work! 🎉
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
