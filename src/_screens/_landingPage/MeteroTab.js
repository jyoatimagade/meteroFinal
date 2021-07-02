import React from "react";
import {} from "../../_components";
import{meterEntryIcon, reviewSubmissionIcon, mangEquipmentIcon} from "../../_config/images"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import MeteroTable from './MeteroTable'

const MeteroTab = (props) => {
  return (
    <>
      <div className="metero-tab-section p-3">
      <Tabs>
        <TabList className="nav nav-tabs">
        <Tab className="nav-item"> <span className="metero-tab-icon"><img src={meterEntryIcon} /></span><span className="metero-tab-text">Meter Entry</span></Tab>
          <Tab className="nav-item"> <span className="metero-tab-icon"><img src={reviewSubmissionIcon} /></span><span className="metero-tab-text">Review Submission</span></Tab>
          <Tab className="nav-item"> <span className="metero-tab-icon"><img src={mangEquipmentIcon} /></span> <span className="metero-tab-text">Manage Equipments</span></Tab>

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
