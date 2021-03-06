import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { loginError } from "../../_config/images";
import { useDispatch, useSelector } from "react-redux";
import { selectJob_Action, meteroTable_Action } from "../../_stores/_actions";
import Select from "react-select";
import CommonModal from "../../_screens/_AllModals/CommonModal";
import {themeToggle, themeToggleDark } from '../../_config/images';
import { CgSun } from "react-icons/cg";
import { HiMoon } from "react-icons/hi";

const HeaderBottom = (props) => {
  // Selectors
const Toggle = styled.button`
cursor: pointer;
height: 50px;
width: 50px;   
border-radius: 50%;
border: none;
background-color: ${props => props.theme.titleColor};
color: ${props => props.theme.pageBackground};
&:focus {
    outline: none;
}
transition: all .5s ease;he
`;

  const getJob = useSelector((state) => state.getJob);
  const selectJobData = useSelector((state) => state.meteroTable);
  console.log(" job list ", selectJobData);
  const dispatch = useDispatch();
  const [dropDownArray, setdropDownArray] = useState([]);
  const [getJobID, setgetJobID] = useState([]);
  const [ToggleSearchOn, setToggleSearchOn] = useState(false);
  const [getresult, setGetResult] = useState(dropDownArray.label);
  const [validationModalData, setValidationModalData] = useState({
    showModal: false,
    validationMessage: "",
    cancelButtonText: "Cancel",
    showActionButton: false,
    showCancelButton: true,
    showFooterActions: true,
  });
  

  useEffect(() => {
    try {
      dispatch(selectJob_Action());
    } catch (error) {}
  }, []);

  useEffect(() => {
    if (getJob.GETJOBData) {
      let newArraydrop = [];

      if (getJob.GETJOBData) {
        getJob.GETJOBData.map((item) => {
          let obj = {
            value: item.Job,
            label: item.Description,
          };
          newArraydrop.push(obj);
        });
      }
      setdropDownArray(newArraydrop);
      console.log(newArraydrop);
    }
  }, [getJob.GETJOBData]);

  const _getSelectdJob = (e) => {    
    setGetResult(e.label);
    props.setSelectedJob(e.label);
    props.setSelectedJobId(e.value);
    let data = { jobId: e.value };
    setgetJobID(e.value);
  };

  
  const _ToggleSearch = (data) => {    
    if (ToggleSearchOn) {
      setToggleSearchOn(false);
      return;
    }

    if (!getJobID.length) {
      setValidationModalData({
        showModal: true,

        validationMessage: "Please select job",
        cancelButtonText: "Ok",
        loginError: true,
        showActionButton: false,
        showCancelButton: true,
        showFooterActions: true,
      });
      return;
    }
    
    let searchData = { jobId: getJobID };
    try {
      dispatch(meteroTable_Action(searchData));
    } catch (error) {}
    if (getJob.isSuccess === true) {
      
      setToggleSearchOn(true);
    } else {
      setToggleSearchOn(false);
    }
  };

  function changeTheme() {
      if (props.theme === "light") {
          props.setTheme("dark");
      } else {
          props.setTheme("light");
      }
  };

  const icon = props.theme === "light" ? <HiMoon size={30} /> : <CgSun size={25} />;
  // const icon = props.theme === "light" ? <mg src={themeToggleDark } width={40}  /> : <img src={themeToggle} width={40} />;

  return (
    <>
      <div className="header-bottom py-3">
        <div className="container-fluid px-3">
          <div className="row">
            <div className="col-md-1">
              <div className="theme-toggle">
                {/* <Toggle onClick={changeTheme}>
                              {icon}
                          </Toggle> 
                   <img src={themeToggle} className="img-fluid" alt="logo" /> */}
                   
               <Toggle onClick={changeTheme}>
                    {icon}
                </Toggle>
              </div>
            </div>
            <div className="col-md-11 full-search">
              <div className=" job-search-div d-flex justify-content-end">
                <form className=" header-Search d-flex justify-content-end">
                  {ToggleSearchOn ? (
                    <div className="col-md-11 select-job header-caption">
                      <h2>{getresult}</h2>
                    </div>
                  ) : (
                    <>
                      <div className="col-md-11 select-job">
                        <Select
                          options={dropDownArray}
                          onChange={_getSelectdJob}
                          isDisabled={props.selectedTab !== 0}
                          required
                          // onChange={opt => console.log(opt.label, opt.value)}
                        />
                      </div>
                    </>
                  )}

                  <button
                    className="btn btn-primary text-white"
                    type="button"
                    disabled
                    disabled={!dropDownArray || props.selectedTab !== 0}
                    onClick={() => {
                      _ToggleSearch();
                    }}
                  >
                    {ToggleSearchOn ? "Change" : "Select"} Job
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommonModal
        showModal={validationModalData.showModal}
        onHide={() =>
          setValidationModalData({
            showModal: false,
            validationMessage: "",
            cancelButtonText: "Cancel",
            showActionButton: false,
            showCancelButton: true,
            showFooterActions: true,
          })
        }
        hideModal={() =>
          setValidationModalData({
            showModal: false,
            validationMessage: "",
            cancelButtonText: "Cancel",
            showActionButton: false,
            showCancelButton: true,
            showFooterActions: true,
          })
        }
        showFooterActions={validationModalData.showFooterActions}
        cancelButtonText={validationModalData.cancelButtonText}
        showCancelButton={validationModalData.showCancelButton}
        icon={loginError}
      >
        <h4 className=" default-color">
          {validationModalData.validationMessage}
        </h4>
      </CommonModal>
   
    </>
  );
};

export default HeaderBottom;
