import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

export function LibTabs() {
  return (
    <TabGroup>
      <TabList>
        <Tab className="transition-all ease-in-out duration-300 data-selected:bg-blue-500 data-selected:text-white">Tab 1</Tab>
        <Tab className="transition-all ease-in-out duration-300 data-selected:bg-blue-500 data-selected:text-white">Tab 2</Tab>
        <Tab className="transition-all ease-in-out duration-300 data-selected:bg-blue-500 data-selected:text-white">Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Content 1</TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
