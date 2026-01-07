import { Tab, TabBody, TabContent, TabList, Tabs } from './components/tabs';

import './App.css';
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
