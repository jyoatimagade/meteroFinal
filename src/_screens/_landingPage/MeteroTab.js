import React, { useState, useEffect } from "react";
import "react-tabs/style/react-tabs.css";
import {} from "../../_components";
import{meterEntryIcon, reviewSubmissionIcon, mangEquipmentIcon} from "../../_config/images"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { MeterEntry, ReviewSubmissionTab,ManageEquipmentTab } from '../index'

const MeteroTab = (props) => {
  const [selectedTabData, setSelectedTabData] = useState(null);
  const RoleId = sessionStorage.getItem("RoleId");

  const onTabActive = (index, lastIndex, event) => {
    // debugger
    // console.log(`tab active - `,index, lastIndex, event);
    props.setselectedTab(index);
    setSelectedTabData({
      selectedTab: index,
      lastTab: lastIndex,
      event: event
    })
  }
  
  useEffect(() => {
    if(selectedTabData && selectedTabData.selectedTab !== 1) return;
    console.log('review submission tab active');
  }, [selectedTabData]);

  return (
    <>
      <div className="metero-tab-section p-3">
      <Tabs onSelect={(index, lastIndex, event) => onTabActive(index, lastIndex, event)}>
        <TabList className="nav nav-tabs">
        <Tab className="nav-item"> <span className="metero-tab-icon"><img src={meterEntryIcon} /></span><span className="metero-tab-text">Meter Entry</span></Tab>
          <Tab className="nav-item"> <span className="metero-tab-icon"><img src={reviewSubmissionIcon} /></span><span className="metero-tab-text">Review Submission</span></Tab>
          {
            RoleId === "1" || RoleId === "2" || RoleId === "3" 
            ?  <Tab className="nav-item"> <span className="metero-tab-icon"><img src={mangEquipmentIcon} /></span> <span className="metero-tab-text">Manage Equipments</span></Tab> 
            : ''
          }
        </TabList>

        <TabPanel>
        <MeterEntry selectedJob={props.selectedJob} />
        </TabPanel>
        <TabPanel>
          <ReviewSubmissionTab selectedTab={selectedTabData?.selectedTab} selectedJob={props.selectedJob} selectedJobId={props.selectedJobId} />
        {/* <div className="d-flex justify-content-center align-item-center no-job-selected"><p>No Job Selected</p></div> */}
        </TabPanel>
        <TabPanel>
          <ManageEquipmentTab />
        {/* <div className="d-flex justify-content-center align-item-center no-job-selected"><p>No Job Selected</p></div> */}
        </TabPanel>
      </Tabs>
      </div>
    </>
  );
};

export default MeteroTab;
