import { use, useLayoutEffect, useRef, useState } from 'react';
import { createRandomId } from '../../utils/random-id';
import { TabListContext, TabsContext } from './tab-contexts';
import clsx from 'clsx';

type TabProps = {
  children: React.ReactNode;
};

export function Tab({ children }: TabProps) {
  const { selectedTab, isInit } = use(TabsContext)!;
  const { activateTab, registerTab, unregisterTab } = use(TabListContext)!;
  const id = useState(createRandomId())[0];

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
