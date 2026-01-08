import { TabsContext, type TabVariant } from './tab-contexts';
import { useTabs } from './useTabs';

type TabsProps = {
  children: React.ReactNode;
  draggable?: boolean;
  variant?: TabVariant;
};

export function Tabs({ children, draggable = true, variant }: TabsProps) {
  const context = useTabs({ draggable, variant });

  return (
    <TabsContext.Provider value={context}>
      <div className="flex flex-col overflow-hidden">{children}</div>
    </TabsContext.Provider>
  );
}
