import React, { useEffect, useState, useCallback } from "react";
import {} from "../../_config/images";
import { useDispatch, useSelector } from "react-redux";
import AsyncSelect from "react-select/async";
import { selectJob_Action } from "../../_stores/_actions";
import Searchable from "react-searchable-dropdown";
import SelectSearch from "react-select-search";
import Select from "react-select";
import { useSelect } from "react-select-search";

const HeaderBottom = (props) => {
  // Selectors
  const selectJob = useSelector((state) => state.selectJob);
  const dispatch = useDispatch();
  const [dropDownArray, setdropDownArray] = useState([]);
  // const [selectedValue, setSelectedValue] = useState(3);
  // debugger;
  console.log("Show array", dropDownArray);
  // const aquaticCreatures = [
  //   { label: 'Shark', value: 'Shark' },
  //   { label: 'Dolphin', value: 'Dolphin' },
  //   { label: 'Whale', value: 'Whale' },
  //   { label: 'Octopus', value: 'Octopus' },
  //   { label: 'Crab', value: 'Crab' },
  //   { label: 'Lobster', value: 'Lobster' },
  // ];
  const data = [
    {
      value: 1,
      label: "cerulean",
    },
    {
      value: 2,
      label: "fuchsia rose",
    },
    {
      value: 3,
      label: "true red",
    },
    {
      value: 4,
      label: "aqua sky",
    },
    {
      value: 5,
      label: "tigerlily",
    },
    {
      value: 6,
      label: "blue turquoise",
    },
  ];
  const [ToggleSearchOn, setToggleSearchOn] = useState(false);
  // const [inputValue, setValue] = useState("");
  // const [selectedValue, setSelectedValue] = useState(null);

  const _ToggleSearch = (e) => {
    setToggleSearchOn(!ToggleSearchOn);
  };

  useEffect(() => {
    //  console.log(selectJob)
    // debugger;
    try {
      dispatch(selectJob_Action());
    } catch (error) {}
  }, []);
  useEffect(() => {
    if (selectJob.SELECTJOBData) {
      console.log(selectJob);
      setdropDownArray(selectJob.SELECTJOBData);
    }
    // console.log(selectJob)
    // debugger;
  }, [selectJob.SELECTJOBData]);

  // load options using API call
  const loadOptions = (inputValue) => {
    // debugger;
    if (selectJob.SELECTJOBData) {
      console.log(selectJob);
      return selectJob.SELECTJOBData;
    }
    console.log("111");
    // console.log(inputValue);
    // return fetch(
    //   `https://testmeteroapi.iea.net:60000/api/metero/getjobs?JOB=${inputValue}`
    // ).then((res) => res.json());
    // // return fetch(`http://jsonplaceholder.typicode.com/posts?userId=${inputValue}`).then(res => res.json());
  };

  // handle input change event
  // const handleInputChange = (value) => {
  //   setValue(value);
  // };
  // // handle selection
  // const handleChange = (value) => {
  //   setSelectedValue(value);
  // };
  // set value for default selection

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setdropDownArray(e.value);
  };

  return (
    <>
      <div className="header-bottom py-3">
        <div className="container-fluid px-3">
          <div className="row">
            <div className="col-md-2">
              <div className="theme-toggle">
                {/* <Toggle onClick={changeTheme}>
                              {icon}
                          </Toggle> 
                   <img src={themeToggle} className="img-fluid" alt="logo" /> */}
              </div>
            </div>
            <div className="col-md-10">
              <div className=" job-search-div d-flex justify-content-end">
                <form className=" header-Search d-flex justify-content-end">
                  {ToggleSearchOn ? (
                    <div className="col-md-8 select-job header-caption">
                      <h2>Selected Job</h2>
                    </div>
                  ) : (
                    <div className="col-md-8 select-job">
                      {/* <AsyncSelect
                          value={this.state.selectedOption}
                          loadOptions={this.getSizes}
                          placeholder="Select Job"
                          onChange={(e) => {
                            this.onSearchChange(e);
                          }}
                          defaultOptions={true}
                        /> */}
                      {/* <pre>Input Value: "{inputValue.Job}"</pre> */}
                      {/* <SelectSearch options={options} value="sv" name="language" placeholder="Choose your language" /> */}
                      {/* <div>
            <button {...valueProps}>{snapshot.displayValue}</button>
            {snapshot.focus && (
                <ul>
                    {snapshot.options.map((option) => (
                        <li key={option.value}>
                            <button {...optionProps} value={option.value}>{option.name}</button>
                        </li>
                    ))}
                </ul>
            )}
        </div> */}
                      {/* <Select
        options={dropDownArray}
        onChange={opt => console.log(opt.label, opt.value)}
      /> */}
                      <Select
                        placeholder="Select Option"
                        // value={dropDownArray.find(obj => obj.value === dropDownArray)} // set selected value
                        options={data} // set list of the data
                        onChange={handleChange} // assign onChange function
                      />

                      {dropDownArray && (
                        <div style={{ marginTop: 20, lineHeight: "25px" }}>
                          <div>
                            <b>Selected Value: </b> {dropDownArray}
                          </div>
                        </div>
                      )}
                     
                     
                    </div>
                  )}

                  <button
                    className="btn btn-primary text-white"
                    type="button"
                    onClick={() => {
                      _ToggleSearch();
                    }}
                  >
                    {" "}
                    Select Job{" "}
                  </button>
                </form>
              </div>

              {/* <myContext.Provider value={{selectedJobId:this.state.selectedOption.value}}> */}

              {/* <myContext.Provider value={{ email: "jyoatimagade@gmail.com" }}>
                            <MeterEntryHeader />
                          </myContext.Provider> */}

              {/* <Modal
                            className="text-center"
                            centered
                            show={this.state.selectJob}
                          >
                            <Modal.Body className="py-4">
                              <a
                                className="position-absolute modal-close"
                                onClick={() => this.loginValidationModal()}
                              >
                                <img src={closeIcon} />
                              </a>
                              <img src={loginError} className="img-fluid py-2" />
                              <h4 className=" default-color">Job List</h4>
                              <p>Job List should not blank</p>
                            </Modal.Body>
                          </Modal> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderBottom;
