import { useCallback, useRef, useState } from 'react';

interface Props {
  selectNextTab: (currentTabIndex: number) => void;
  selectPreviousTab: (currentTabIndex: number) => void;
  selectedTabIndex: number;
}

const SWIPE_THRESHOLD = 100;

export function useSwipe({ selectNextTab, selectPreviousTab, selectedTabIndex }: Props) {
  const [xOffset, setXOffset] = useState(0);

  const startPosition = useRef<{ x: number; y: number }>(null);
  const isSwipeRef = useRef(false);

  function cancelSwipe() {
    setXOffset(0);
    isSwipeRef.current = false;
    startPosition.current = null;
  }

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!!startPosition.current && event.pointerType === 'touch') {
      cancelSwipe();
      return;
    }

    if (event.pointerType === 'touch' && (event as unknown as TouchEvent).touches?.length > 1) {
      return;
    }

    startPosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
    isSwipeRef.current = false;
  }, []);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!startPosition.current) return;

    const dx = event.clientX - startPosition.current.x;
    const dy = event.clientY - startPosition.current.y;

    if (!isSwipeRef.current && Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) {
      isSwipeRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    if (isSwipeRef.current) {
      setXOffset(dx);
      event.preventDefault();
    }
  }, []);

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!startPosition.current) return;

      const dx = event.clientX - startPosition.current.x;

      if (dx > SWIPE_THRESHOLD) {
        selectPreviousTab(selectedTabIndex);
      } else if (dx < -SWIPE_THRESHOLD) {
        selectNextTab(selectedTabIndex);
      }

      setXOffset(0);
      isSwipeRef.current = false;
      startPosition.current = null;
      event.currentTarget.releasePointerCapture(event.pointerId);
    },
    [selectNextTab, selectPreviousTab, selectedTabIndex]
  );

  const handlePointerCancel = useCallback(() => {
    cancelSwipe();
  }, []);

  return {
    xOffset,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
  };
}
