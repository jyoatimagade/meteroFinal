import React, { useEffect, useState, useCallback } from "react";
import {} from "../../_config/images";
import { useDispatch, useSelector } from "react-redux";
import { SplashScreen } from "../index";
import { selectJob_Action, meteroTable_Action } from "../../_stores/_actions";
import Searchable from "react-searchable-dropdown";
import SelectSearch from "react-select-search";
import Select from "react-select";
import { useSelect } from "react-select-search";


const LightTheme = {
  pageBackground: "white",
  titleColor: "#dc658b",
  tagLineColor: "black",
};

const DarkTheme = {
  pageBackground: "#282c36",
  titleColor: "lightpink",
  tagLineColor: "lavender",
};

const themes = {
  light: LightTheme,
  dark: DarkTheme,
};
const HeaderBottom = (props) => {
  const [theme, setTheme] = useState("light");
  // Selectors
  const getJob = useSelector((state) => state.getJob);
  const selectJobData = useSelector((state) => state.meteroTable);

  // console.log(getJob.GETJOBData);
  const dispatch = useDispatch();
  const [dropDownArray, setdropDownArray] = useState([]);
  const [getJobID, setgetJobID] = useState([]);
  const [ToggleSearchOn, setToggleSearchOn] = useState(false);
  const [getresult, setGetResult] = useState(dropDownArray.label);
  const [JobIdResult, setJobIdResult] = useState(dropDownArray.value);
  // console.log("check id", JobIdResult);

  useEffect(() => {
    try {
      dispatch(selectJob_Action());
    } catch (error) {}
  }, []);

  useEffect(() => {
    if (getJob.GETJOBData) {
      let newArraydrop = [];
      // console.log(newArraydrop);
      if (getJob.GETJOBData) {
        getJob.GETJOBData.map((item) => {
          // console.log("item", item);
          let obj = {
            value: item.Job,
            label: item.Description,
          };
          newArraydrop.push(obj);
        });
      }
      setdropDownArray(newArraydrop);
    }
  }, [getJob.GETJOBData]);

  const _getSelectdJob = (e) => {
    // debugger;
    setGetResult(e.label);
    // setGetResult(e.value);

    // console.log("get job id result 111", e);
    let data = { jobId: e.value };
    setgetJobID(e.value);
    // try {
    //   dispatch(meteroTable_Action(data));
    // } catch (error) {}

    // console.log(getJob.SELECTJOBData[0].Description);
    
  };

  // useEffect(() => {
  //   if (selectJobData.METEROTABLEdata) {
  //     let newArraydrop1 = [];
  //     // console.log(newArraydrop);
  //     if (selectJobData.METEROTABLEdata) {
  //       selectJobData.METEROTABLEdata.map((item) => {
  //         // console.log("item", item);
  //         let obj = {
  //           value: item.jobId,
  //           label: item.Description,
  //         };
  //         newArraydrop1.push(obj);
  //       });
  //     }
  //     setJobIdResult(newArraydrop1);
  //   }
  // }, [selectJobData.METEROTABLEdata]);

  const _ToggleSearch = (data) => {
    debugger;
    // alert("YOU clicked !!!")
    let searchData = { jobId: getJobID };
    // setGetResult(searchData);
    // console.log(searchData);
    // let data={jobId:e.value }
    try {
      dispatch(meteroTable_Action(searchData));
    } catch (error) {}
    // if(getJob.isSuccess === true){
    //   // alert("111")
    //   setToggleSearchOn(!ToggleSearchOn);
    // }else{
    //   setToggleSearchOn(!ToggleSearchOn);
    // }
  };

  return (
    <>
      <div className="header-bottom py-3">
        <div className="container-fluid px-3">
          <div className="row">
            <div className="col-md-2">
              <div className="theme-toggle">
              {/* <SplashScreen theme={theme} setTheme={setTheme} /> */}
                {/* <Toggle onClick={changeTheme}>
                              {icon}
                          </Toggle> 
                   <img src={themeToggle} className="img-fluid" alt="logo" /> */}
              </div>
            </div>
            <div className="col-md-10">
              <div className=" job-search-div d-flex justify-content-end">
                <form className=" header-Search d-flex justify-content-end">
                  {getresult ? (
                  <div className="col-md-8 select-job header-caption">
                    <h2>{getresult}</h2>
                  </div>
                   ) : ( /*}*/
                  <div className="col-md-8 select-job">
                    <Select
                      options={dropDownArray}
                      onChange={_getSelectdJob}
                      required
                      // onChange={opt => console.log(opt.label, opt.value)}
                    />
                  </div>
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
                    {" "}
                    Select Job{" "}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="check the">
        {getJob.GETJOBData.map((item, key) => {
          // let dateFormat = moment(item.blogPublishDate).format("DD-MMMM-YYYY")
          console.log("Thnks for coming");
          return (
            <div className="card-itme mb-32" key={key}>
              <p>
                {item.Description} || {item.jobId}
              </p>
            </div>
          );
        })}
      </div> */}
    </>
  );
};

export default HeaderBottom;
