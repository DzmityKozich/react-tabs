import { use, useCallback, useMemo, useRef } from 'react';
import { TabListContext, TabsContext } from './tab-contexts';

type Props = {
  children: React.ReactNode;
};

export function TabList({ children }: Props) {
  const { registerTab, setSelectedTab } = use(TabsContext)!;
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabRegisterRef = useRef<Map<string, HTMLButtonElement>>(new Map());

  const activateTab = useCallback(
    (tab: HTMLButtonElement, id: string) => {
      if (indicatorRef.current) {
        setSelectedTab(id);
        indicatorRef.current.style.transform = `translateX(${tab.offsetLeft}px)`;
        indicatorRef.current.style.width = `${tab.offsetWidth}px`;
      }
    },
    [setSelectedTab]
  );

  const unregisterTabEl = useCallback((id: string) => {
    tabRegisterRef.current.delete(id);
  }, []);

  const registerTabEl = useCallback(
    (tab: HTMLButtonElement, id: string) => {
      tabRegisterRef.current.set(id, tab);
      registerTab(id);

      // Activate the first registered tab
      if (tabRegisterRef.current.size === 1) {
        activateTab(tab, id);
      }
    },
    [registerTab, activateTab]
  );

  const context = useMemo(
    () => ({
      registerTab: registerTabEl,
      unregisterTab: unregisterTabEl,
      activateTab,
    }),
    [registerTabEl, activateTab, unregisterTabEl]
  );

  return (
    <TabListContext.Provider value={context}>
      <div className="flex space-x-2 relative" role="tablist">
        <div className="absolute rounded-md h-full bg-gray-500 z-0 transition-transform ease-in-out duration-300" ref={indicatorRef} />
        {children}
      </div>
    </TabListContext.Provider>
  );
}
