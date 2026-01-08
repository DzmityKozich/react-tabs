import { useTabsContext } from './tab-contexts';
import clsx from 'clsx';
import { useSwipe } from './useSwipe';

type Props = {
  children: React.ReactNode;
};

export function TabBody({ children }: Props) {
  const { selectedTabIndex, isInit } = useTabsContext();

  const { xOffset, handlePointerDown, handlePointerMove, handlePointerUp, handlePointerCancel } = useSwipe();

  return (
    <div
      className={clsx('flex h-full', isInit && 'transition-transform duration-300 ease-out')}
      style={{
        transform: `translateX(calc(${-selectedTabIndex * 100}% + ${xOffset}px))`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      {children}
    </div>
  );
}
