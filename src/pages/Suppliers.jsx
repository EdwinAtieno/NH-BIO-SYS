import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import React from 'react';
import PrimaryLayout from '../layouts/PrimaryLayout';
import SuppliersInfo from '../features/Suppliers/SuppliersInfo';
import ContactPInfo from '../features/ContactPerson/ContactPInfo';
import ContactPersonForm from '../features/ContactPerson/ContacrPersonForm';
import SupplierForm from '../features/Suppliers/SupplierForm';
import '../components/tables/Tabs.scss';

const Suppliers = () => {
  return (
    <PrimaryLayout>
      {' '}
      <div className="App">
        <Tabs className="Tabs">
          <TabList>
            <Tab>Suppliers</Tab>
            <Tab>New Supplier</Tab>
            <Tab>Contact Person</Tab>
            <Tab>Add Contact Person</Tab>
          </TabList>
          <TabPanel>
            <SuppliersInfo />
          </TabPanel>
          <TabPanel>
            <SupplierForm />
          </TabPanel>
          <TabPanel>
            <ContactPInfo />
          </TabPanel>
          <TabPanel>
            <ContactPersonForm />
          </TabPanel>
        </Tabs>
      </div>
    </PrimaryLayout>
  );
};

export default Suppliers;
