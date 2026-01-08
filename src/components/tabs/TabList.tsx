import { useMemo, useState } from 'react';
import { TabListContext, useTabsContext } from './tab-contexts';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
};

interface IndicatorPosition {
  left: number;
  width: number;
}

export function TabList({ children }: Props) {
  const { variant } = useTabsContext();
  const [indicatorPosition, setIndicatorPosition] = useState<IndicatorPosition>({ left: 0, width: 0 });

  const context = useMemo(
    () => ({
      activateTab: (tab: HTMLButtonElement) => {
        setIndicatorPosition({
          left: tab.offsetLeft,
          width: tab.offsetWidth,
        });
      },
    }),
    []
  );

  return (
    <TabListContext.Provider value={context}>
      <div className="flex space-x-2 relative" role="tablist">
        <div
          className={clsx(
            'absolute rounded-md bg-gray-500 z-0 transition-transform ease-in-out duration-300',
            variant === 'plain' ? 'h-full' : 'bottom-0 h-0.5'
          )}
          style={{
            transform: `translateX(${indicatorPosition.left}px)`,
            width: `${indicatorPosition.width}px`,
          }}
        />
        {children}
      </div>
    </TabListContext.Provider>
  );
}
