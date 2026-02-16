import { useCallback, useRef } from 'react';

export function useTabList() {
  const tabs = useRef<Set<HTMLButtonElement>>(new Set());

  const registerTab = useCallback((tab: HTMLButtonElement) => {
    tabs.current.add(tab);
  }, []);

  const getTabByIndex = useCallback((index: number) => {
    return Array.from(tabs.current)[index];
  }, []);

  const deleteTab = useCallback((tab: HTMLButtonElement) => {
    tabs.current.delete(tab);
  }, []);

  return {
    registerTab,
    deleteTab,
    getTabByIndex,
  };
}
