import { useCallback, useMemo, useState } from 'react';
import { TabListContext } from './tab-contexts';

type Props = {
  children: React.ReactNode;
};

interface IndicatorPosition {
  left: number;
  width: number;
}

export function TabList({ children }: Props) {
  const [indicatorPosition, setIndicatorPosition] = useState<IndicatorPosition>({ left: 0, width: 0 });

  const activateTab = useCallback((tab: HTMLButtonElement) => {
    setIndicatorPosition({
      left: tab.offsetLeft,
      width: tab.offsetWidth,
    });
  }, []);

  const context = useMemo(
    () => ({
      activateTab,
    }),
    [activateTab]
  );

  return (
    <TabListContext.Provider value={context}>
      <div className="flex space-x-2 relative" role="tablist">
        <div
          className="absolute rounded-md h-full bg-gray-500 z-0 transition-transform ease-in-out duration-300"
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
