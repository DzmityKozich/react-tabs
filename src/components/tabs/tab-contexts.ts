import { createContext } from 'react';

export class TabsManager {
  private register = new Set<string>();

  public addTab(tab: string) {
    this.register.add(tab);
  }

  public removeTab(tab: string) {
    this.register.delete(tab);
  }

  public get tabList() {
    return [...this.register];
  }

  public get fistTab() {
    return this.tabList[0];
  }

  public getTabByIndex(index: number) {
    return this.tabList[index];
  }
}

export type TabsContextType = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  registerTab: (id: string) => void;
  selectedTabIndex: number;
  // variant: 'default' | 'pill';
  isInit: boolean;
};

export const TabsContext = createContext<TabsContextType | null>(null);

export type TabListContextType = {
  activateTab: (tab: HTMLButtonElement, id: string) => void;
  registerTab: (tab: HTMLButtonElement, id: string) => void;
  unregisterTab: (id: string) => void;
};

export const TabListContext = createContext<TabListContextType | null>(null);
