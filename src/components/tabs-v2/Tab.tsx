import { useLayoutEffect, useRef, Fragment } from 'react';
import { Tab as HuTab } from '@headlessui/react';
import clsx from 'clsx';
import { useTabListContext } from './tab-context';

interface Props {
  children: React.ReactNode;
}

// export function Tab({ children }: Props) {
//   const { deleteTab, registerTab } = useTabListContext();

//   const tabRef = useRef<HTMLButtonElement>(null);

//   useLayoutEffect(() => {
//     const currentTab = tabRef.current;

//     if (currentTab) {
//       registerTab(currentTab);
//     }

//     return () => {
//       if (currentTab) {
//         deleteTab(currentTab);
//       }
//     };
//   }, [deleteTab, registerTab]);

//   return (
//     <HuTab className={clsx('px-4 py-2 outline-0 data-selected:text-blue-400')} ref={tabRef}>
//       {children}
//     </HuTab>
//   );
// }

export function Tab({ children }: Props) {
  return (
    <HuTab as={Fragment}>
      {({ selected }) => (
        <button className="outline-0">
          <TabContent selected={selected}>{children}</TabContent>
        </button>
      )}
    </HuTab>
  );
}

interface TabRenderProps {
  selected: boolean;
  children: React.ReactNode;
}

export function TabContent(props: TabRenderProps) {
  const { selected, children, ...rest } = props;

  const { setSelectedTab } = useTabListContext();

  const tabRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (selected && tabRef.current) {
      setSelectedTab(tabRef.current);
    }
  }, [selected, setSelectedTab]);

  return (
    <span className={clsx('px-4 py-2 block', { 'text-blue-400': selected })} ref={tabRef} {...rest}>
      {children}
    </span>
  );
}
