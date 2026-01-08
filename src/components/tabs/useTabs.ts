import { useCallback, useDeferredValue, useMemo, useReducer } from 'react';
import type { TabVariant } from './tab-contexts';

interface Props {
  draggable?: boolean;
  variant?: TabVariant;
}

type TabsState = {
  currentTabId: string;
  tabs: string[];
};

/**
 * Discriminated union type for all possible tab actions.
 * Each action has a specific type and properly typed payload.
 */
type TabsAction =
  | { type: 'REGISTER_TAB'; payload: { tabId: string } }
  | { type: 'SET_CURRENT_TAB'; payload: { tabId: string } }
  | { type: 'UNREGISTER_TAB'; payload: { tabId: string } };

/**
 * Reducer function for managing tabs state.
 * Uses discriminated unions for type-safe action handling.
 */
function reducer(state: TabsState, action: TabsAction): TabsState {
  switch (action.type) {
    case 'REGISTER_TAB': {
      const { tabId } = action.payload;
      if (state.tabs.includes(tabId)) {
        return state;
      }

      if (!state.currentTabId) {
        return {
          ...state,
          currentTabId: tabId,
          tabs: [...state.tabs, tabId],
        };
      }

      return {
        ...state,
        tabs: [...state.tabs, tabId],
      };
    }

    case 'SET_CURRENT_TAB': {
      const { tabId } = action.payload;
      return {
        ...state,
        currentTabId: tabId,
      };
    }
    case 'UNREGISTER_TAB': {
      const { tabId } = action.payload;
      const filteredTabs = state.tabs.filter((id) => id !== tabId);
      let newCurrentTabId = state.currentTabId;

      if (filteredTabs.length === 0) {
        newCurrentTabId = '';
      } else if (state.currentTabId === tabId) {
        newCurrentTabId = filteredTabs[0];
      }

      return {
        ...state,
        tabs: filteredTabs,
        currentTabId: newCurrentTabId,
      };
    }
    default:
      return state;
  }
}

/**
 * Custom hook that manages all tabs state and logic.
 * Handles tab registration, selection, and navigation.
 */
export function useTabs({ draggable = true, variant = 'plain' }: Props) {
  const [state, dispatch] = useReducer(reducer, { currentTabId: '', tabs: [] });
  const isInit = useDeferredValue(!!state.currentTabId);

  const setSelectedTab = useCallback((tabId: string) => {
    dispatch({ type: 'SET_CURRENT_TAB', payload: { tabId } });
  }, []);

  const registerTab = useCallback((tabId: string) => {
    dispatch({ type: 'REGISTER_TAB', payload: { tabId } });
  }, []);

  const selectNextTab = useCallback(
    (currentTabIndex: number) => {
      if (currentTabIndex >= 0 && currentTabIndex < state.tabs.length - 1) {
        const nextIndex = currentTabIndex + 1;
        setSelectedTab(state.tabs[nextIndex]);
      }
    },
    [state.tabs, setSelectedTab]
  );

  const selectPreviousTab = useCallback(
    (currentTabIndex: number) => {
      if (currentTabIndex > 0 && currentTabIndex < state.tabs.length) {
        const previousIndex = currentTabIndex - 1;
        setSelectedTab(state.tabs[previousIndex]);
      }
    },
    [state.tabs, setSelectedTab]
  );

  const selectedTabIndex = state.tabs.indexOf(state.currentTabId);

  return useMemo(
    () => ({
      selectedTab: state.currentTabId,
      setSelectedTab,
      registerTab,
      selectNextTab,
      selectPreviousTab,
      selectedTabIndex,
      isInit,
      draggable,
      variant,
    }),
    [state.currentTabId, setSelectedTab, registerTab, selectedTabIndex, isInit, selectNextTab, selectPreviousTab, draggable, variant]
  );
}
