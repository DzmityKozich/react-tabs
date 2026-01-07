import { useCallback, useDeferredValue, useMemo, useReducer } from 'react';
import { TabsContext } from './tab-contexts';

type TabsProps = {
  children: React.ReactNode;
};

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

export function Tabs({ children }: TabsProps) {
  const [state, dispatch] = useReducer(reducer, { currentTabId: '', tabs: [] });
  const isInit = useDeferredValue(!!state.currentTabId);

  const setSelectedTab = useCallback((tabId: string) => {
    dispatch({ type: 'SET_CURRENT_TAB', payload: { tabId } });
  }, []);

  const registerTab = useCallback((tabId: string) => {
    dispatch({ type: 'REGISTER_TAB', payload: { tabId } });
  }, []);

  const selectedTabIndex = state.tabs.indexOf(state.currentTabId);

  const context = useMemo(
    () => ({
      selectedTab: state.currentTabId,
      setSelectedTab,
      registerTab,
      selectedTabIndex,
      isInit,
    }),
    [state.currentTabId, setSelectedTab, registerTab, selectedTabIndex, isInit]
  );

  return (
    <TabsContext.Provider value={context}>
      <div className="flex flex-col">{children}</div>
    </TabsContext.Provider>
  );
}
