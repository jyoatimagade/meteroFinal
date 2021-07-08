import React, { useEffect, useState, useCallback } from "react";
import { loginError } from "../../_config/images";
import { useDispatch, useSelector } from "react-redux";
import { selectJob_Action, meteroTable_Action } from "../../_stores/_actions";
import Select from "react-select";
import CommonModal from "../../_screens/_AllModals/CommonModal";

const HeaderBottom = (props) => {
  // Selectors
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
              </div>
            </div>
            <div className="col-md-11">
              <div className=" job-search-div d-flex justify-content-end">
                <form className=" header-Search d-flex justify-content-end">
                  {ToggleSearchOn ? (
                    <div className="col-md-10 select-job header-caption">
                      <h2>{getresult}</h2>
                    </div>
                  ) : (
                    <>
                      <div className="col-md-10 select-job">
                        <Select
                          options={dropDownArray}
                          onChange={_getSelectdJob}
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
                    disabled={!dropDownArray}
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
