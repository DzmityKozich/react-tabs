import { Tab } from './components/tabs/Tab';
import { TabList } from './components/tabs/TabList';
import { Tabs } from './components/tabs/Tabs';

import './App.css';
import { TabBody } from './components/tabs/TabBody';
import { TabContent } from './components/tabs/TabContent';
// import { LibTabs } from './components/lib-tabs/LibTabs';

function App() {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>
            <span>Tab 1</span>
          </Tab>
          <Tab>
            <span>Tab 2</span>
          </Tab>
          <Tab>
            <span>Tab 3</span>
          </Tab>
        </TabList>
        <TabBody>
          <TabContent>first</TabContent>
          <TabContent>second</TabContent>
          <TabContent>third</TabContent>
        </TabBody>
      </Tabs>

      {/* <LibTabs /> */}
    </>
  );
}

export default App;
