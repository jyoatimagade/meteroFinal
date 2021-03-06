import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  notesIcon,
  closeIcon,
  loginError,
  successIcon,
  notesDarkIcon,
  refreshIcon,
  exportListIcon,
} from "../../_config/images";
import axios from "axios";
import { API_ENDPOINT, AUTH_HEADERS } from "../../_config/ApiConstants";
import { Modal } from "react-bootstrap";
import CommonModal from "../_AllModals/CommonModal";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Header,
  Search  
} from "../../_components/_UICompoents/datatable";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable, { TableHeaderColumn } from "react-bootstrap-table-next";
import ReactPaginate from "react-paginate";
// import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const ManageEquipmentTab = (props) => {
  const meteroTableList = useSelector((state) => state.meteroTable);
  const getJob = useSelector((state) => state.getJob);

  const [dropDownArray, setdropDownArray] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const [offset, setOffset] = useState(0);
  const [perPage, setPerpage] = useState(10);
  const [currentPage, setCurrentpage] = useState(1);
  const [notesModal, setnotesModal] = useState(false);
  // const [notesModalData, setnotesModalData] = useState();

  const [searchcurrentPage, setSearchcurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [rawdata, setRawData] = useState([]);
  const [pageRange, setPageRange] = useState([0, 10]);
  const [validationModalData, setValidationModalData] = useState({
    showModal: false,
    validationMessage: "",
    cancelButtonText: "Ok",
    showActionButton: false,
    showCancelButton: true,
    showFooterActions: true,
    icon: loginError,
  });
  const [mailData, setMailData] = useState({
    sub: `Subject: Query From ${props.selectedJob}`,
    fromemail: "",
    body: "",
    job: props.selectedJob,
    item: ""
  });
  

  // console.log("select MeteroTable value", meteroTableList);
  const dispatch = useDispatch();

  const ITEMS_PER_PAGE = 10;
  useEffect(() => {
    if (
      meteroTableList.meteroTableData !== null &&
      meteroTableList.meteroTableData !== undefined &&
      meteroTableList.meteroTableData.length !== 0
    ) {
      console.log("listing", meteroTableList.meteroTableData.length);
      setData([...meteroTableList.meteroTableData]);
      setRawData(JSON.parse(JSON.stringify(meteroTableList.meteroTableData)));
    }
  }, [meteroTableList]);
  // console.log("selected data", data);
  const headers = [
    { dataField: "notes", text: "Notes", sort: true },
    { dataField: "equipment_no", text: "Equipment No", sort: true },
    { dataField: "serial_no", text: "Serial No", sort: true },
    { dataField: "Description", text: "Description", sort: true },
    { dataField: "LicenseNumber", text: "License No", sort: true },
    // { dataField: "udReerenceNumber", text: "Last Rec Hrs", sort: true },
    { dataField: "gpsEnable", text: "Job Assign" },
    { dataField: "udReerenceNumber", text: "Reference No", sort: true },
  
    { dataField: "submitBtn", text: "" }
    
  ];


  const handlePageClick = (e) => {    
    const selectedPage = e.selected + 1;
    let perPageCount = e.perPage ? e.perPage : perPage;
    const offset = selectedPage !== 1 ? e.selected * perPageCount + 1 : 0;
    
    let pageRangeTo =
      selectedPage !== 1 ? selectedPage * perPageCount + 1 : perPageCount;
    setCurrentpage(selectedPage);
    setOffset(offset);
    setPageRange([offset, pageRangeTo]);
  };
  
  
  

  const searchDataList = (searchTerm) => {
    if (searchTerm) {
      let filteredDataList = data.filter((item) => {
        let _return = 0;
        let searchStringsArray = searchTerm.split(" ").filter((i) => i);
        searchStringsArray.forEach((st) => {
          if (
            st &&
            item.Equipment &&
            item.Equipment.toLowerCase().includes(st.toLowerCase())
          ) {
            _return++;
          }
          if (
            st &&
            item.SerialNo &&
            item.SerialNo.toLowerCase().includes(st.toLowerCase())
          ) {
            _return++;
          }
          if (
            st &&
            item.Description &&
            item.Description.toLowerCase().includes(st.toLowerCase())
          ) {
            _return++;
          }
          if (
            st &&
            item.LicenseNumber &&
            item.LicenseNumber.toLowerCase().includes(st.toLowerCase())
          ) {
            _return++;
          }
        });
        return _return >= searchStringsArray.length ? true : false;
      });
      // console.log("search data", filteredDataList);
      setData(filteredDataList);
    } else {
      setData(meteroTableList.meteroTableData);
    }
  };


  const updateInputValues = (value, equipment, inputField) => {
    // console.log(value,itemIndex,inputField);
    data.forEach((item) => {
      if (item.Equipment === equipment) {
        item[inputField] = value;
      }
    });
    setData([...data]);
  };
  


  const onBackPress = (searchTerm, dataList=[]) => {
    // console.log('back pressed');
    let searchDataList = dataList;
    if (!dataList.length) {
      searchDataList = meteroTableList.meteroTableData;
    }
    let filteredDataList = searchDataList.filter((item) => {
      let _return = 0;
      let searchStringsArray = searchTerm.split(" ").filter((i) => i);
      searchStringsArray.forEach((st) => {
        if (
          st &&
          item.Equipment &&
          item.Equipment.toLowerCase().includes(st.toLowerCase())
        ) {
          _return++;
        }
        if (
          st &&
          item.SerialNo &&
          item.SerialNo.toLowerCase().includes(st.toLowerCase())
        ) {
          _return++;
        }
        if (
          st &&
          item.Description &&
          item.Description.toLowerCase().includes(st.toLowerCase())
        ) {
          _return++;
        }
        if (
          st &&
          item.LicenseNumber &&
          item.LicenseNumber.toLowerCase().includes(st.toLowerCase())
        ) {
          _return++;
        }
      });
      return _return >= searchStringsArray.length ? true : false;
    });
    // console.log("search data", filteredDataList);
    setData(filteredDataList);
  }


  const _addNotesModalShow = () => {
    setnotesModal(true);
  };
  const _addNotesModalHide = () => {
    setnotesModal(false);
  };

  const saveData = (item) => {
    console.log(item);
    // if (!item.udReferenceNumber) {
    //   setValidationModalData({
    //     showModal: true,
    //     validationMessage: (
    //       <h4 className=" default-color">Please enter Reference Number</h4>
    //     ),
    //     cancelButtonText: "Ok",
    //     showActionButton: false,
    //     showCancelButton: true,
    //     showFooterActions: true,
    //     icon: loginError,
    //   });
    //   return;
    // }
    // data.forEach((dataItem) => {
    //   if (dataItem.udReferenceNumber === item.udReferenceNumber) {
    //     dataItem.Saved_MeterO = "true";
    //   }
    // });

    axios
      .post(`${API_ENDPOINT}/metero/updateEquipment`, [item])
      .then((apiRes) => {
        console.log(apiRes);
        if (apiRes.data === "Success") {
          setValidationModalData({
            showModal: true,
            validationMessage: "Data added successfully",
            cancelButtonText: "Ok",
            showActionButton: false,
            showCancelButton: true,
            showFooterActions: true,
            icon: successIcon,
          });
        } else {
          setValidationModalData({
            showModal: true,
            validationMessage: "Error occured",
            cancelButtonText: "Ok",
            showActionButton: false,
            showCancelButton: true,
            showFooterActions: true,
            icon: loginError,
          });
        }
      })
      .catch((apiErr) => {
        console.log(apiErr);
        setValidationModalData({
          showModal: true,
          validationMessage: "Error occured",
          cancelButtonText: "Ok",
          showActionButton: false,
          showCancelButton: true,
          showFooterActions: true,
        });
      });
  };

  const submitQuery = () => {
    
    if (!mailData.sub) {
      setValidationModalData({
        showModal: true,
        validationMessage: "Please enter subject",
        cancelButtonText: "Ok",
        showActionButton: false,
        showCancelButton: true,
        showFooterActions: true,
        icon: loginError,
      });
      return;
    }

    if (!mailData.fromemail) {
      setValidationModalData({
        showModal: true,
        validationMessage: "Please enter email id",
        cancelButtonText: "Ok",
        showActionButton: false,
        showCancelButton: true,
        showFooterActions: true,
        icon: loginError,
      });
      return;
    }

    if (!mailData.body) {
      setValidationModalData({
        showModal: true,
        validationMessage: "Please enter body",
        cancelButtonText: "Ok",
        showActionButton: false,
        showCancelButton: true,
        showFooterActions: true,
        icon: loginError,
      });
      return;
    }

    let mailQuery = mailData;

    delete mailQuery.item;

    axios
      .post(`${API_ENDPOINT}/metero/sendEmailQuery`, [mailData])
      .then((apiRes) => {
        console.log(apiRes);
        if (apiRes.data.toLowerCase() === "success") {
          _addNotesModalHide();
          setValidationModalData({
            showModal: true,
            validationMessage: "Email sent successfully",
            cancelButtonText: "Ok",
            showActionButton: false,
            showCancelButton: true,
            showFooterActions: true,
            icon: successIcon,
          });
        } else {
          setValidationModalData({
            showModal: true,
            validationMessage: "Email not sent",
            cancelButtonText: "Ok",
            showActionButton: false,
            showCancelButton: true,
            showFooterActions: true,
            icon: loginError,
          });
        }
      })
      .catch((apiErr) => {
        console.log(apiErr);
        setValidationModalData({
          showModal: true,
          validationMessage: "Error occured",
          cancelButtonText: "Ok",
          showActionButton: false,
          showCancelButton: true,
          showFooterActions: true,
          icon: loginError,
        });
      });
  };

  return (
    <div className="tab-div review-tab manage-equipment-tab">
       {meteroTableList.meteroTableData !== null &&
      meteroTableList.meteroTableData !== undefined &&
      meteroTableList.isSuccess == true &&
      meteroTableList.meteroTableData.length !== 0 ? (
        <>
          <div className="meter-Header d-flex justify-content-between align-items-center py-3">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2 d-flex justify-content-between align-items-center pb-1">
              <div className="export-btn-div">
                <button
                  type="button"
                  className="btn btn-primary export-list text-white"
                  onClick={() => {
                    _addNotesModalShow();
                    // setnotesModalData(item);
                    setMailData({
                      sub: `Subject: Query From JOB: ${props.selectedJob}`,
                      fromemail: "",
                      body: "",
                      job: props.selectedJob,
                      item: ""
                    })
                  }}
                >
                  SUBMIT QUERY TO EM <img className="headerbtm-icon" src={exportListIcon} title="Export List" />
                </button>
              </div>
              </div>
           
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 d-flex justify-content-between align-items-center pb-1 ">
            
            
              <div className="search-div ">
                <Search
                  showClose={true}
                  onSearch={(value) => {
                    searchDataList(value);
                  }}
                  onBackPress={(value)=> onBackPress(value)}
                />
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2 d-flex justify-content-around align-items-center pb-1 header-bottom-right-div review-tab-pageItem">
              
            
              <div className="d-flex justify-content-around align-items-cente pageIte-main-div">
              <div className="page-item-div">
                <label>Page Item : </label>
                <select
                  value={perPage}
                  onChange={(e) => {
                    setPerpage(parseInt(e.target.value));
                    handlePageClick({
                      selected: currentPage - 1,
                      perPage: parseInt(e.target.value),
                    });
                  }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </div>
              </div>
            </div>
          </div>

          <div className="table-div" id="no-more-tables">
            <table className="table table-striped manage-equipment-table">
              <Header headers={headers} />
              <tbody>
                {data &&
                  data.slice(pageRange[0], pageRange[1]).map((item, key) => {
                    return (
                      <tr
                        // className={`card-itme mb-32 ${
                        //   item.Saved_MeterO === "true" ? "saved-entry" : ""
                        // }`}
                        // key={key}
                      >
                        
                        <td data-title="Notes">
                          <img
                            src={ props.theme === 'dark' ? notesDarkIcon : notesIcon}
                            className="img-fluid notesIcon"
                            alt="notesIcon"
                            onClick={() => {
                              _addNotesModalShow();
                              // setnotesModalData(item);
                              setMailData({
                                sub: `Subject: Query From Equipment ${item.Equipment} JOB: ${props.selectedJob}`,
                                fromemail: "",
                                body: "",
                                job: props.selectedJob,
                                item: item
                              })
                            }}
                          />
                        
                        </td>
                        <td data-title="Equipment No">{item.Equipment}</td>
                        <td data-title="Serial No">{item.SerialNo}</td>
                        <td data-title="Description">{item.Description}</td>
                        <td data-title="License No">{item.LicenseNumber}</td>
                       
                        <td data-title="Job Assign"> 
                          {item.JobAssign}
                        </td>
                        <td data-title="Reference No" ><span>
                         <input
                            // disabled={
                            //   item.HourReading === 0 && item.NewHr === "0"
                            //     ? true
                            //     : false
                            // }
                            type="text"
                            value={item.udReferenceNumber ? item.udReferenceNumber : ''}
                            onInput={(e) =>
                              updateInputValues(
                                e.target.value,
                                item.Equipment,
                                "udReferenceNumber"
                              )
                            }
                            className="form-control"
                          />
                          </span>
                        </td>
                        <td data-title="">
                        <button
                         
                         onClick={() => saveData(item)}
                         className="btn btn-primary tbl-save-btn"
                       >
                         UPDATE
                       </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              {/* <Pagination
              total={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            /> */}
            </table>
          </div>
          
          {meteroTableList.meteroTableData !== null &&
          meteroTableList.meteroTableData !== undefined &&
          meteroTableList.isSuccess == true &&
          meteroTableList.meteroTableData.length !== 0 ? (
            <div className="pagination-div">
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                // pageCount={Math.ceil(meteroTableList.meteroTableData && meteroTableList.meteroTableData !== null && meteroTableList.meteroTableData.length / perPage)}
                pageCount={Math.ceil(
                  meteroTableList.meteroTableData.length / perPage
                )}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                // subContainerClassName={"pages pagination"}
                // activeClassName={"pagination-active"}

                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            </div>
          ) : null}

       
          <Modal
            show={notesModal}
            onHide={_addNotesModalHide}
            className="notesModal"
          >
            <Modal.Header className="d-flex justify-content-end">
              <a
                className="position-absolute modal-close"
                onClick={_addNotesModalHide}
              >
                <img src={closeIcon} />
              </a>
            </Modal.Header>
            <Modal.Body className="px-4">
                <>
                  <h4 className=" default-color py-2">
                    Submit Query
                  </h4>
                  <p>Compose Email</p>
                  <div className="row d-flex justify-content-start py-1">
                                       <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Subject:"
                        value={mailData.sub}
                        onChange={(e)=>{ 
                          console.log(e.target.value);
                          setMailData({
                            ...mailData,
                            sub: e.target.value
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="row d-flex justify-content-start py-1">
                   
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="CC To: Provide your email address"
                        value={mailData.fromemail}
                        onChange={(e)=>{ 
                          console.log(e.target.value);
                          setMailData({
                            ...mailData,
                            fromemail: e.target.value
                          })
                        }}
                      />
                    </div>
                  </div>
                  <div className="row d-flex justify-content-start py-1">
                    
                    <div className="col-md-12">
                      <textarea type="text" className="form-control" placeholder="Message" 
                        value={mailData.body}
                        onChange={(e)=>{ 
                          console.log(e.target.value);
                          setMailData({
                            ...mailData,
                            body: e.target.value
                          })
                        }}>
                       
                      </textarea>
                    </div>
                  </div>
                </>
            </Modal.Body> 
            <Modal.Footer>
              <div className="d-flex justify-content-start">
                <button
                  onClick={() => submitQuery()}
                  type="submit"
                  className="btn btn-primary mx-1"
                >
                  EMAIL
                </button>
                <button
                  type="submit"
                  className="btn btn-cancel mx-1"
                  onClick={_addNotesModalHide}
                >
                  CANCEL
                </button>
              </div>
            </Modal.Footer>
          </Modal>

          {/* <Modal
            show={exportListModal}
            onHide={_exportListModalHide}
            className="notesModal "
          >
            <Modal.Header className="d-flex justify-content-end">
              <a
                className="position-absolute modal-close"
                onClick={_exportListModalHide}
              >
                <img src={closeIcon} />
              </a>
            </Modal.Header>
            <Modal.Body>
              <>
                <h4 className=" default-color py-2 px-3">Email List</h4>
                <div className="row d-flex justify-content-start py-1 px-3">
                  <div className="col-12 mb-2">
                    <label for="email"> Enter email address</label>
                  </div>

                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      value={exportListEmailid}
                      onInput={(e) => setExportListEmailid(e.target.value)}
                    />
                  </div>
                </div>
              </>
            </Modal.Body>
            <Modal.Footer>
              <div className="d-flex justify-content-start">
                <button
                  onClick={() => sendExportEmail()}
                  type="submit"
                  className="btn btn-primary mx-1"
                >
                  EMAIL
                </button>
                <button
                  onClick={_exportListModalHide}
                  type="submit"
                  className="btn btn-cancel mx-1"
                >
                  CANCEL
                </button>
              </div>
            </Modal.Footer>
          </Modal> */}

          <CommonModal
            showModal={validationModalData.showModal}
            onHide={() =>
              setValidationModalData({
                showModal: false,
                validationMessage: "",
                cancelButtonText: "Ok",
                showActionButton: false,
                showCancelButton: true,
                showFooterActions: true,
              })
            }
            hideModal={() =>
              setValidationModalData({
                showModal: false,
                validationMessage: "",
                cancelButtonText: "Ok",
                showActionButton: false,
                showCancelButton: true,
                showFooterActions: true,
              })
            }
            showFooterActions={validationModalData.showFooterActions}
            cancelButtonText={validationModalData.cancelButtonText}
            showCancelButton={validationModalData.showCancelButton}
            icon={validationModalData.icon}
          >
            <h4 className=" default-color">
              {" "}
              {validationModalData.validationMessage}
            </h4>
          </CommonModal>

          {/* <NotesModal /> */}
        </>
      ) : (
        <div className="d-flex justify-content-center align-item-center no-job-selected">
          <p>
            {props.selectedJob && meteroTableList.isSuccess == true
              ? "No data to show"
              : "No Job Selected"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageEquipmentTab;
