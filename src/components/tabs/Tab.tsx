import { useId, useLayoutEffect, useRef } from 'react';
import { useTabsContext, useTabListContext } from './tab-contexts';
import clsx from 'clsx';

type TabProps = {
  children: React.ReactNode;
};

export function Tab({ children }: TabProps) {
  const { selectedTab, isInit, registerTab, setSelectedTab } = useTabsContext();
  const { activateTab } = useTabListContext();
  const id = useId();

  const tabRef = useRef<HTMLButtonElement>(null);

  const isSelected = selectedTab === id;

  useLayoutEffect(() => {
    if (tabRef.current) {
      registerTab(id);
    }
  }, [id, registerTab]);

  useLayoutEffect(() => {
    if (isSelected && tabRef.current) {
      activateTab(tabRef.current, id);
    }
  }, [id, isSelected, activateTab]);

  function handleTabSelect() {
    setSelectedTab(id);
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
