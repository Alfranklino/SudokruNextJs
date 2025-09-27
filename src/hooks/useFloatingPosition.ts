// Hook for managing floating widget positioning
'use client';

import { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface FloatingPositionOptions {
  offset?: { x: number; y: number };
  boundary?: { top: number; left: number; right: number; bottom: number };
  preferredPosition?: 'above' | 'below' | 'left' | 'right' | 'auto';
}

export const useFloatingPosition = (
  triggerElement: Element | null,
  floatingElement: Element | null,
  options: FloatingPositionOptions = {}
) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const {
    offset = { x: 0, y: 10 },
    boundary = { top: 10, left: 10, right: 10, bottom: 10 },
    preferredPosition = 'auto'
  } = options;

  const calculatePosition = useCallback(() => {
    if (!triggerElement || !floatingElement) {
      return { x: 0, y: 0 };
    }

    const triggerRect = triggerElement.getBoundingClientRect();
    const floatingRect = floatingElement.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let x = triggerRect.left + triggerRect.width / 2;
    let y = triggerRect.bottom + offset.y;

    // Auto positioning logic
    if (preferredPosition === 'auto') {
      // Check if there's enough space below
      const spaceBelow = viewport.height - triggerRect.bottom;
      const spaceAbove = triggerRect.top;
      const spaceRight = viewport.width - triggerRect.right;
      const spaceLeft = triggerRect.left;

      if (spaceBelow < floatingRect.height + boundary.bottom && spaceAbove > spaceBelow) {
        // Position above
        y = triggerRect.top - floatingRect.height - offset.y;
      } else if (spaceRight < floatingRect.width + boundary.right && spaceLeft > spaceRight) {
        // Position to the left
        x = triggerRect.left - floatingRect.width - offset.x;
        y = triggerRect.top + triggerRect.height / 2;
      } else if (spaceLeft < floatingRect.width + boundary.left) {
        // Position to the right
        x = triggerRect.right + offset.x;
        y = triggerRect.top + triggerRect.height / 2;
      }
    } else {
      // Use preferred position
      switch (preferredPosition) {
        case 'above':
          y = triggerRect.top - floatingRect.height - offset.y;
          break;
        case 'below':
          y = triggerRect.bottom + offset.y;
          break;
        case 'left':
          x = triggerRect.left - floatingRect.width - offset.x;
          y = triggerRect.top + triggerRect.height / 2;
          break;
        case 'right':
          x = triggerRect.right + offset.x;
          y = triggerRect.top + triggerRect.height / 2;
          break;
      }
    }

    // Boundary constraints
    x = Math.max(boundary.left + floatingRect.width / 2,
        Math.min(viewport.width - boundary.right - floatingRect.width / 2, x));
    y = Math.max(boundary.top,
        Math.min(viewport.height - boundary.bottom - floatingRect.height, y));

    return { x, y };
  }, [triggerElement, floatingElement, offset, boundary, preferredPosition]);

  const updatePosition = useCallback(() => {
    if (triggerElement && floatingElement) {
      const newPosition = calculatePosition();
      setPosition(newPosition);
    }
  }, [calculatePosition, triggerElement, floatingElement]);

  // Update position when elements change or window resizes
  useEffect(() => {
    if (isVisible) {
      updatePosition();

      const handleResize = () => updatePosition();
      const handleScroll = () => updatePosition();

      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isVisible, updatePosition]);

  const show = useCallback(() => {
    setIsVisible(true);
    // Use setTimeout to ensure the floating element is rendered before calculating position
    setTimeout(updatePosition, 0);
  }, [updatePosition]);

  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    position,
    isVisible,
    show,
    hide,
    updatePosition
  };
};

// Hook specifically for cell-based positioning in a grid
export const useCellFloatingPosition = (
  cellRow: number | null,
  cellCol: number | null,
  gridElement: Element | null
) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    if (cellRow !== null && cellCol !== null && gridElement) {
      // Find the specific cell element
      const cellElement = gridElement.querySelector(
        `[data-row="${cellRow}"][data-col="${cellCol}"]`
      ) as Element;

      if (cellElement) {
        const cellRect = cellElement.getBoundingClientRect();
        const gridRect = gridElement.getBoundingClientRect();

        // Position the floating widget relative to the cell
        const x = cellRect.left + cellRect.width / 2;
        let y = cellRect.bottom + 10;

        // Check if widget would go below viewport
        const viewportHeight = window.innerHeight;
        const estimatedWidgetHeight = 300; // Approximate height of NumberSelector

        if (y + estimatedWidgetHeight > viewportHeight - 20) {
          // Position above the cell instead
          y = cellRect.top - 10;
        }

        setPosition({ x, y });
      }
    }
  }, [cellRow, cellCol, gridElement]);

  return position;
};