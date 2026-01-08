import { TabsContext } from './tab-contexts';
import { useTabs } from './useTabs';

type TabsProps = {
  children: React.ReactNode;
  draggable?: boolean;
};

export function Tabs({ children, draggable = true }: TabsProps) {
  const context = useTabs({ draggable });

  return (
    <TabsContext.Provider value={context}>
      <div className="flex flex-col overflow-hidden">{children}</div>
    </TabsContext.Provider>
  );
}
