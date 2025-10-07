import { useRef, useCallback, useMemo } from 'react';

export interface UseLongPressOptions {
  onLongPress: () => void;
  onClick?: () => void;
  threshold?: number; // ms
  moveThreshold?: number; // px
}

export interface LongPressHandlers {
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerCancel: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
  style: React.CSSProperties;
}

/**
 * Hook to detect long-press gestures
 * @param options Configuration object
 * @returns Event handlers for pointer events
 */
export function useLongPress({
  onLongPress,
  onClick,
  threshold = 500,
  moveThreshold = 10,
}: UseLongPressOptions): LongPressHandlers {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const isLongPressRef = useRef(false);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    startPosRef.current = null;
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Prevent text selection during long-press
      e.preventDefault();

      // Record starting position
      startPosRef.current = { x: e.clientX, y: e.clientY };
      isLongPressRef.current = false;

      // Start timer for long-press
      timerRef.current = setTimeout(() => {
        isLongPressRef.current = true;
        onLongPress();
        clear();
      }, threshold);
    },
    [onLongPress, threshold, clear]
  );

  const onPointerUp = useCallback(
    (_e: React.PointerEvent) => {
      // If not a long-press and onClick is provided, trigger it
      if (!isLongPressRef.current && onClick) {
        onClick();
      }

      clear();
      isLongPressRef.current = false;
    },
    [onClick, clear]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!startPosRef.current) return;

      // Calculate distance from start position
      const deltaX = Math.abs(e.clientX - startPosRef.current.x);
      const deltaY = Math.abs(e.clientY - startPosRef.current.y);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // If moved beyond threshold, cancel long-press
      if (distance > moveThreshold) {
        clear();
        isLongPressRef.current = false;
      }
    },
    [moveThreshold, clear]
  );

  const onPointerCancel = useCallback(() => {
    clear();
    isLongPressRef.current = false;
  }, [clear]);

  const onContextMenu = useCallback((e: React.MouseEvent) => {
    // Prevent context menu during long-press
    e.preventDefault();
  }, []);

  const style = useMemo<React.CSSProperties>(
    () => ({
      userSelect: 'none',
      WebkitUserSelect: 'none',
      WebkitTouchCallout: 'none',
    }),
    []
  );

  return {
    onPointerDown,
    onPointerUp,
    onPointerMove,
    onPointerCancel,
    onContextMenu,
    style,
  };
}
