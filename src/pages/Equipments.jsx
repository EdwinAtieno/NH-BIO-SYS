import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React from 'react';
import PrimaryLayout from '../layouts/PrimaryLayout';
import EquipmentInfo from '../features/Equipments/EquipmentInfo';
import EquipmentForm from '../features/Equipments/EquipmentForm';
import '../components/tables/Tabs.scss';

const Equipments = () => {
  return (
    <PrimaryLayout>
      <div className="App">
        <Tabs className="Tabs">
          <TabList>
            <Tab>Equipments</Tab>
            <Tab>Add Equipment</Tab>
          </TabList>
          <TabPanel>
            <EquipmentInfo />
          </TabPanel>
          <TabPanel>
            <EquipmentForm />
          </TabPanel>
        </Tabs>
      </div>
    </PrimaryLayout>
  );
};
export default Equipments;
