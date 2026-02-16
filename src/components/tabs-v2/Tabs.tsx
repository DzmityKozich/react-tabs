import { TabPanel, TabPanels } from '@headlessui/react';
import { Tab } from './Tab';
import { TabList } from './TabList';
import { TabGroup } from './TabGroup';
// import clsx from 'clsx';

export function Tabs() {
  return (
    <TabGroup>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Content 1</TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
