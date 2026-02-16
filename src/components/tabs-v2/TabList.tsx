import { TabList as HuTabList } from '@headlessui/react';
import { TabListContext } from './tab-context';
import { useCallback, useDeferredValue, useState } from 'react';
// import { useTabList } from './useTabList';
import clsx from 'clsx';

interface Props {
  children: React.ReactNode;
}

export function TabList({ children }: Props) {
  const [style, setStyle] = useState({ left: 0, width: 0 });
  const isAnimated = useDeferredValue(!!style.left);

  const setSelectedTab = useCallback((tab: HTMLElement) => {
    const { offsetLeft, offsetWidth } = tab;
    setStyle({ left: offsetLeft, width: offsetWidth });
  }, []);

  return (
    <TabListContext.Provider value={{ setSelectedTab }}>
      <HuTabList className="relative">
        {children}
        <div
          className={clsx('absolute h-0.5 bg-blue-500', { 'transition-transform duration-300': isAnimated })}
          style={{ transform: `translateX(${style.left}px)`, width: style.width }}
        />
      </HuTabList>
    </TabListContext.Provider>
  );
}
