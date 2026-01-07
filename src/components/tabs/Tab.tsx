import { useId, useLayoutEffect, useRef } from 'react';
import { useTabsContext, useTabListContext } from './tab-contexts';
import clsx from 'clsx';

type TabProps = {
  children: React.ReactNode;
};

export function Tab({ children }: TabProps) {
  const { selectedTab, isInit } = useTabsContext();
  const { activateTab, registerTab, unregisterTab } = useTabListContext();
  const id = useId();

  const tabRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (tabRef.current) {
      registerTab(tabRef.current, id);
    }

    return () => {
      unregisterTab(id);
    };
  }, [id, registerTab, unregisterTab]);

  function handleTabSelect() {
    activateTab(tabRef.current!, id);
  }

  return (
    <button
      className={clsx('py-2 px-3 relative z-1 ', selectedTab === id && 'text-white', isInit && 'transition-all ease-in-out duration-300')}
      role="tab"
      onClick={handleTabSelect}
      ref={tabRef}
    >
      {children}
    </button>
  );
}
