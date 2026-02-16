import { createContext, use } from 'react';

interface TabListContextValue {
  setSelectedTab: (tab: HTMLElement) => void;
}

export const TabListContext = createContext<TabListContextValue | null>(null);

export function useTabListContext() {
  const context = use(TabListContext);

  if (!context) {
    throw new Error('useTabListContext must be used within a TabList');
  }

  return context;
}
