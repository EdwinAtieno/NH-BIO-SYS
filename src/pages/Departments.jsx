import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React from 'react';
import PrimaryLayout from '../layouts/PrimaryLayout';
import DepartmentInfo from '../features/Department/DepartmentInfo';
import SectionInfo from '../features/Section/SectionInfo';
import DepartmentForm from '../features/Department/DepartmentForm';
import SectionForm from '../features/Section/SectionForm';
import '../components/tables/Tabs.scss';

const Departments = () => {
  return (
    <PrimaryLayout>
      <div className="App">
        <Tabs className="Tabs">
          <TabList>
            <Tab>Departments</Tab>
            <Tab>New Department</Tab>
            <Tab>Sections</Tab>
            <Tab>New Section</Tab>
          </TabList>
          <TabPanel>
            <DepartmentInfo />
          </TabPanel>
          <TabPanel>
            <DepartmentForm />
          </TabPanel>
          <TabPanel>
            <SectionInfo />
          </TabPanel>
          <TabPanel>
            <SectionForm />
          </TabPanel>
        </Tabs>
      </div>
    </PrimaryLayout>
  );
};

export default Departments;
