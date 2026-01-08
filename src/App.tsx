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
          <TabContent>
            <div className="flex justify-center items-center h-28 w-full bg-amber-400">first</div>
          </TabContent>
          <TabContent>
            <div className="flex justify-center items-center h-28 w-full bg-cyan-400">second</div>
          </TabContent>
          <TabContent>
            <div className="flex justify-center items-center h-28 w-full bg-green-400">third</div>
          </TabContent>
        </TabBody>
      </Tabs>

      {/* <LibTabs /> */}
    </>
  );
}

export default App;
