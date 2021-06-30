import React from "react";
import {} from "../../_components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import MeteroTable from './MeteroTable'

const MeteroTab = (props) => {
  return (
    <>
      <div className="metero-tab-section p-3">
      <Tabs>
        <TabList className="nav nav-tabs">
          <Tab className="nav-item">Meter Entry</Tab>
          <Tab className="nav-item">Review Submission</Tab>
          <Tab className="nav-item">Manage Equipments</Tab>
        </TabList>

        <TabPanel>
        <MeteroTable selectedJob={props.selectedJob} />
        </TabPanel>
        <TabPanel>
        <div className="d-flex justify-content-center align-item-center no-job-selected"><p>No Job Selected</p></div>
        </TabPanel>
        <TabPanel>
        <div className="d-flex justify-content-center align-item-center no-job-selected"><p>No Job Selected</p></div>
        </TabPanel>
      </Tabs>
      </div>
    </>
  );
};

export default MeteroTab;
