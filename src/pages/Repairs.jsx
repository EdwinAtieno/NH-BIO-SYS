import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import React from 'react';
import PrimaryLayout from '../layouts/PrimaryLayout';
import RepairForm from '../features/repairs/RepairForm';
import AddRepair from '../features/repairs/AddRepair';
import '../components/tables/Tabs.scss';

const Repairs = () => {
  return (
    <PrimaryLayout>
      <div className="App">
        <Tabs className="Tabs">
          <TabList>
            <Tab>Repairments</Tab>
            <Tab>Report Repair</Tab>
          </TabList>
          <TabPanel>
            <RepairForm />
          </TabPanel>
          <TabPanel>
            <AddRepair />
          </TabPanel>
        </Tabs>
      </div>
    </PrimaryLayout>
  );
};
export default Repairs;
