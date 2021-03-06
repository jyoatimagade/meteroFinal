import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  notesIcon,
  closeIcon,
  loginError,
  successIcon,
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
import { selectJob_Action, meteroTable_Action, reviewSubmissionTable_Action } from "../../_stores/_actions";
// import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const ReviewSubmissionTab = (props) => {
  const meteroTableList = useSelector((state) => state.meteroTable);
  const reviewSubmissionList = useSelector((state) => state.reviewSubmissionTable);
  const getJob = useSelector((state) => state.getJob);
  const RoleId = sessionStorage.getItem("RoleId");
  const [dropDownArray, setdropDownArray] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const [offset, setOffset] = useState(0);
  const [perPage, setPerpage] = useState(10);
  const [currentPage, setCurrentpage] = useState(1);

  const [searchcurrentPage, setSearchcurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [rawdata, setRawData] = useState([]);
  const [reviewSubmitdata, setReviewSubmitdata] = useState([]);
  const [rawReviewSubmitdata, setRawReviewSubmitdata] = useState([]);
  const [pageRange, setPageRange] = useState([0, 10]);
  const [isAPIcalled, setIsAPIcalled] = useState(false);
  const [validationModalData, setValidationModalData] = useState({
    showModal: false,
    validationMessage: "",
    cancelButtonText: "Ok",
    showActionButton: false,
    showCancelButton: true,
    showFooterActions: true,
    icon: loginError,
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  

  // console.log("select MeteroTable value", meteroTableList);
  const dispatch = useDispatch();

  const ITEMS_PER_PAGE = 10;
  useEffect(() => {
    console.log('in review submission tab', props.selectedTab);
    if(props.selectedTab === 1 && !isAPIcalled){
      setIsAPIcalled(true);
      try {
        dispatch(reviewSubmissionTable_Action({ jobId: props.selectedJobId ? props.selectedJobId : "" }));
      } catch (error) {}
    }

    if (
      reviewSubmissionList.reviewSubmissionTableData !== null &&
      reviewSubmissionList.reviewSubmissionTableData !== undefined &&
      reviewSubmissionList.reviewSubmissionTableData.length !== 0
    ) {
      console.log('reviewSubmissionTableData ', reviewSubmissionList.reviewSubmissionTableData);
      setReviewSubmitdata([...reviewSubmissionList.reviewSubmissionTableData]);
      setRawReviewSubmitdata(JSON.parse(JSON.stringify(reviewSubmissionList.reviewSubmissionTableData)));
      
    }

    if (
      meteroTableList.meteroTableData !== null &&
      meteroTableList.meteroTableData !== undefined &&
      meteroTableList.meteroTableData.length !== 0
    ) {
      console.log("listing", meteroTableList.meteroTableData.length);
      setData([...meteroTableList.meteroTableData]);
      setRawData(JSON.parse(JSON.stringify(meteroTableList.meteroTableData)));
    }
  }, [meteroTableList, reviewSubmissionList, props.selectedTab]);
  // console.log("selected data", data);
  const headers = [
    { dataField: "notes", text: "Notes", sort: true },
    { dataField: "equipment_no", text: "Equipment No", sort: true },
    { dataField: "serial_no", text: "Serial No", sort: true },
    { dataField: "Description", text: "Description", sort: true },
    { dataField: "LicenseNumber", text: "License No", sort: true },
    { dataField: "udReerenceNumber", text: "Last Rec Hrs", sort: true },
    {
      dataField: "noChangeCheckbox",
      text: "Last Rec Odo",
    },
    { dataField: "newHourText", text: "New Hour" },
    { dataField: "newOdoText", text: "New Odo" },
    { dataField: "gpsEnable", text: "Job Assign" },
    { dataField: "submitBtn", text: "Entered by" },
    
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
      let filteredDataList = reviewSubmitdata.filter((item) => {
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
      setReviewSubmitdata(filteredDataList);
    } else {
      setReviewSubmitdata(reviewSubmissionList.reviewSubmissionTableData);
    }
  };

  const onBackPress = (searchTerm, dataList=[]) => {
    // console.log('back pressed');
    let searchDataList = dataList;
    if (!dataList.length) {
      searchDataList = reviewSubmissionList.reviewSubmissionTableData;
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
    setReviewSubmitdata(filteredDataList);
  }

  const showReviewSubmissionConfirmation = () => {
    // let reviewSubmissionEquipmentList = [];
    // reviewSubmissionList.reviewSubmissionTableData.forEach(item=>{
    //   reviewSubmissionEquipmentList.push(item.Equipment);
    // });
    // let remainingEquipments = meteroTableList.meteroTableData.filter(item=> !reviewSubmissionEquipmentList.includes(item.Equipment))
    axios.post(`${API_ENDPOINT}/metero/reviewremainingEquipments`, reviewSubmissionList.reviewSubmissionTableData)
    .then((apiRes) => {
      console.log(apiRes);
      if (!apiRes.data.length) {
        setValidationModalData({
          showModal: true,
          validationMessage: (
            <h4 className="default-color">Error occured</h4>
          ),
          cancelButtonText: "Ok",
          showActionButton: false,
          showCancelButton: true,
          showFooterActions: true,
          icon: loginError,
        });
        return;
      }
      setShowConfirmationModal(true);
    })
    .catch((apiErr) => {
      console.log(apiErr);
      setValidationModalData({
        showModal: true,
        validationMessage: (
          <h4 className="default-color">Error occured</h4>
        ),
        cancelButtonText: "Ok",
        showActionButton: false,
        showCancelButton: true,
        showFooterActions: true,
        icon: loginError,
      });
    });
  }

  const saveReviewSubmitData = () => {
    console.log('save data now');
    axios.post(`${API_ENDPOINT}/metero/SubmitReadings`, reviewSubmissionList.reviewSubmissionTableData)
    .then((apiRes) => {
      console.log(apiRes);
      if (apiRes.data === "Success") {
        setShowConfirmationModal(false);
        setValidationModalData({
          showModal: true,
          icon: successIcon,
          validationMessage: (
            <h4 className="default-color">Data saved successfully</h4>
          ),
          cancelButtonText: "Ok",
          showActionButton: false,
          showCancelButton: true,
          showFooterActions: true,
        });
      } else {
        setShowConfirmationModal(false);
        setValidationModalData({
          showModal: true,
          validationMessage: (
            <h4 className="default-color">Error occured</h4>
          ),
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
      setShowConfirmationModal(false);
      setValidationModalData({
        showModal: true,
        validationMessage: (
          <h4 className="default-color">Error occured</h4>
        ),
        cancelButtonText: "Ok",
        showActionButton: false,
        showCancelButton: true,
        showFooterActions: true,
        icon: loginError,
      });
    });
  }

  return (
    <div className="tab-div review-tab">
       {reviewSubmissionList.reviewSubmissionTableData !== null &&
      reviewSubmissionList.reviewSubmissionTableData !== undefined &&
      reviewSubmissionList.isSuccess == true &&
      reviewSubmissionList.reviewSubmissionTableData.length !== 0 ? (
        <>
          <div className="row meter-Header d-flex justify-content-between align-items-center py-3">
            <div className="col-xs-6 col-sm-10 col-md-8 col-lg-4 d-flex justify-content-between align-items-center pb-1 review-tab-search">
            
            
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
            <div className="col-xs-6 col-sm-10 col-md-8 col-lg-6 justify-content-between align-items-center pb-1 review-tab-search">
              {/* <ul className="review-list">
                <li>Readings saved successfully for  1 / 39 equipments</li>
                <li>Equipment with "No Change" selected</li>
              </ul> */}

            </div>
            <div className="col-xs-6 col-sm-2 col-md-4 col-lg-2 d-flex justify-content-around align-items-center pb-1 header-bottom-right-div review-tab-pageItem">
              
            
              <div className="d-flex justify-content-around align-items-cente pageIte-main-div">
              <div className="page-item-div">
                <label className="mr-2">Page Item : </label>
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
            <table className="table table-striped">
              <Header headers={headers} />
              <tbody>
                {reviewSubmitdata &&
                  reviewSubmitdata.slice(pageRange[0], pageRange[1]).map((item, key) => {
                    return (
                      <tr
                        className={`card-itme mb-32 ${
                          item.Saved_MeterO === "true" ? "saved-entry" : ""
                        }`}
                        key={key}
                      >
                        <td data-title="Notes">
                         
                        </td>
                        <td data-title="Equipment No">{item.Equipment}</td>
                        <td data-title="Serial No">{item.SerialNo}</td>
                        <td data-title="Description">{item.Description}</td>
                        <td data-title="License No">{item.LicenseNumber}</td>
                        <td data-title="Last Rec Hrs">{item.HourReading}</td>
                        <td data-title="Last Rec Odo">
                        {item.OdoReading}
                        </td>
                        <td data-title="New Hour">
                         {item.NewHr}
                        </td>
                        <td data-title="New Odo">
                         {item.NewOdo}
                        </td>
                        <td data-title="Job Assign">
                          {item.JobAssign}
                        </td>
                        <td data-title="Entered by">
                          {item.CreatedBy}
                         
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
          { RoleId === "1" || RoleId === "2" || RoleId === "3" 
            ? 
          <div className="review-sbumission-btn d-flex justify-content-center">
            <button disabled={meteroTableList.meteroTableData === null ||
      meteroTableList.meteroTableData === undefined ||
      meteroTableList.meteroTableData.length === 0} onClick={()=>showReviewSubmissionConfirmation()} className="btn btn-primary tbl-save-btn py-3">SUBMIT</button>
          </div>: ''}
          {reviewSubmissionList.reviewSubmissionTableData !== null &&
          reviewSubmissionList.reviewSubmissionTableData !== undefined &&
          reviewSubmissionList.isSuccess == true &&
          reviewSubmissionList.reviewSubmissionTableData.length !== 0 ? (
            <div className="pagination-div">
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                // pageCount={Math.ceil(reviewSubmissionList.reviewSubmissionTableData && reviewSubmissionList.reviewSubmissionTableData !== null && reviewSubmissionList.reviewSubmissionTableData.length / perPage)}
                pageCount={Math.ceil(
                  reviewSubmissionList.reviewSubmissionTableData.length / perPage
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

       
          {/* <Modal
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
            <Modal.Body>
              {notesModalData ? (
                <>
                  <h4 className=" default-color py-2">
                    Equipment No: {notesModalData.Equipment}
                  </h4>
                  <div className="row d-flex justify-content-start py-1">
                    <div className="col-md-5">
                      <label for="email"> Last Recorded Hours</label>
                    </div>

                    <div className="col-md-7">
                      <input
                        type="text"
                        className="form-control"
                        value={notesModalData.HourReading}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row d-flex justify-content-start py-1">
                    <div className="col-md-5">
                      <label for="text"> Last Recorded Odo</label>
                    </div>
                    <div className="col-md-7">
                      <input
                        type="text"
                        className="form-control"
                        value={notesModalData.OdoReading}
                      />
                    </div>
                  </div>
                  <div className="row d-flex justify-content-start py-1">
                    <div className="col-md-5">
                      <label for="text">Enter Notes Below</label>
                    </div>
                    <div className="col-md-7">
                      <textarea type="text" className="form-control">
                        {notesModalData.Notes}
                      </textarea>
                    </div>
                  </div>
                </>
              ) : null}
            </Modal.Body> 
            <Modal.Footer>
              <div className="d-flex justify-content-start">
                <button
                  onClick={() => saveNotes(notesModalData)}
                  type="submit"
                  className="btn btn-primary mx-1"
                >
                  UPDATED NOTE
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
          </Modal>*/}

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
              {validationModalData.validationMessage}
          </CommonModal>

          

          <CommonModal
            showModal={showConfirmationModal}
            onHide={() => setShowConfirmationModal(false)}
            hideModal={() => setShowConfirmationModal(false)}
            showFooterActions={true}
            showActionButton={true}
            buttonText={"Continue"}
            buttonAction={()=> saveReviewSubmitData()}
            cancelButtonText={"Cancel"}
            showCancelButton={true}
            // icon={validationModalData.icon}
          >
            <h4 className="default-color pb-3">
              Submit Summary
            </h4>
            Total Equipments on Job:  {data.length} 
            <hr />
            Readings saved for equipments: {reviewSubmitdata.length} 
            <hr />
            I confirm that all readings are accurate. Pre proceed to submit cancel to continue adding more meter readings
          </CommonModal>

          {/* <NotesModal /> */}
        </>
      ) : (
        <div className="d-flex justify-content-center align-item-center no-job-selected">
          <p>
            {/* { reviewSubmissionList.isSuccess == true
              ? "No data to show"
              : "No Job Selected"} */}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewSubmissionTab;
