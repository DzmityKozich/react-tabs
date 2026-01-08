import { createContext, use } from 'react';

export type TabVariant = 'plain' | 'outlined';

export type TabsContextType = {
  selectedTab: string;
  setSelectedTab: (tabId: string) => void;
  selectNextTab: (currentTabIndex: number) => void;
  selectPreviousTab: (currentTabIndex: number) => void;
  registerTab: (tabId: string) => void;
  selectedTabIndex: number;
  draggable?: boolean;
  variant?: TabVariant;
  isInit: boolean;
};

export const TabsContext = createContext<TabsContextType | null>(null);

export type TabListContextType = {
  activateTab: (tab: HTMLButtonElement, id: string) => void;
};

export const TabListContext = createContext<TabListContextType | null>(null);

/**
 * Custom hook to safely consume TabsContext.
 * Throws a descriptive error if used outside of a Tabs component.
 *
 * @returns TabsContextType - The tabs context value
 * @throws Error if used outside of Tabs provider
 */
export function useTabsContext(): TabsContextType {
  const context = use(TabsContext);

  if (!context) {
    throw new Error(
      'useTabsContext must be used within a <Tabs> component. ' + 'Make sure your component is wrapped in a <Tabs> provider.'
    );
  }

  return context;
}

/**
 * Custom hook to safely consume TabListContext.
 * Throws a descriptive error if used outside of a TabList component.
 *
 * @returns TabListContextType - The tab list context value
 * @throws Error if used outside of TabList provider
 */
export function useTabListContext(): TabListContextType {
  const context = use(TabListContext);

  if (!context) {
    throw new Error(
      'useTabListContext must be used within a <TabList> component. ' + 'Make sure your component is wrapped in a <TabList> provider.'
    );
  }

  return context;
}
