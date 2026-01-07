import { useTabsContext } from './tab-contexts';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
};

export function TabBody({ children }: Props) {
  const { selectedTabIndex, isInit } = useTabsContext();

  return (
    <div
      className={clsx('flex h-full', isInit && 'transition-transform duration-300 ease-out')}
      style={{
        transform: `translateX(calc(${-selectedTabIndex * 100}%))`,
      }}
    >
      {children}
    </div>
  );
}
