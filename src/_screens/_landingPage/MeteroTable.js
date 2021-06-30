import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notesIcon, closeIcon, loginError } from "../../_config/images";
import axios from "axios";
import { API_ENDPOINT, AUTH_HEADERS } from '../../_config/ApiConstants';
import { Modal } from "react-bootstrap";
// import NotesModal from '../../_screens/_modals/NotesModal'

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Header,
  Search,
  Pagination,
} from "../../_components/_UICompoents/datatable";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable, { TableHeaderColumn } from "react-bootstrap-table-next";
import ReactPaginate from "react-paginate";
// import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const MeteroTable = (props) => {
  const meteroTableList = useSelector((state) => state.meteroTable);
  const getJob = useSelector((state) => state.getJob);

  const [dropDownArray, setdropDownArray] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const [offset, setOffset] = useState(0);
  const [perPage, setPerpage] = useState(10);
  const [currentPage, setCurrentpage] = useState(1);

  const [searchcurrentPage, setSearchcurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [pageRange, setPageRange] = useState([0, 10]);
  const [notesModal, setnotesModal] = useState(false);
  const [notesModalData, setnotesModalData] = useState();
  const [exportListModal, setexportListModal] = useState(false);
  // const [exportListData, setexportListData] = useState();
  const [dataListIsOfRemaining, setDataListIsOfRemaining] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [validationModalData,setValidationModalData] = useState({
    showModal:false,
    validationMessage:"",
    cancelButtonText:"Cancel",
    showActionButton:false,
    showCancelButton:true,
    showFooterActions:true
  })

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
      setData(meteroTableList.meteroTableData);
    }
  }, [meteroTableList]);
  // console.log("selected data", data);
  const headers = [
    { dataField: "notes", text: "Notes", sort: true },
    { dataField: "equipment_no", text: "Equipment No", sort: true },
    { dataField: "serial_no", text: "Serial No", sort: true },
    { dataField: "Description", text: "Description", sort: true },
    { dataField: "LicenseNumber", text: "License Number", sort: true },
    { dataField: "udReerenceNumber", text: "Ref Number", sort: true },
    {
      dataField: "noChangeCheckbox",
      text: "No Change",
    },
    { dataField: "newHourText", text: "New Hour" },
    { dataField: "newOdoText", text: "New Odo" },
    { dataField: "gpsEnable", text: "GPS Enable" },
    { dataField: "submitBtn", text: "" },
  ];

  // useMemo(() => {

  //   if (search) {
  //     let filteredDataList = meteroTableList.meteroTableData.filter(
  //       (item) =>
  //         item.Equipment.toLowerCase().includes(search.toLowerCase()) ||
  //         item.SerialNo.toLowerCase().includes(search.toLowerCase())
  //     );
  //     console.log("search data", filteredDataList);
  //     setData(filteredDataList);
  //   }

  //   // setTotalItems(computedComments.length);

  //   // //Sorting comments
  //   // if (sorting.field) {
  //   //     const reversed = sorting.order === "asc" ? 1 : -1;
  //   //     computedComments = computedComments.sort(
  //   //         (a, b) =>
  //   //             reversed * a[sorting.field].localeCompare(b[sorting.field])
  //   //     );
  //   // }

  //   //Current Page slice
  //   // return selectedIdData.slice(
  //   //     (currentPage - 1) * ITEMS_PER_PAGE,
  //   //     (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  //   // );
  // }, [meteroTableList.meteroTableData, currentPage, search]);

  const handlePageClick = (e) => {
    // window.scrollTo(0, 0);
    const selectedPage = e.selected + 1;
    let perPageCount = e.perPage ? e.perPage : perPage;
    const offset = selectedPage !== 1 ? e.selected * perPageCount + 1 : 0;
    // console.log(selectedPage);
    let pageRangeTo = selectedPage !== 1 ? selectedPage * perPageCount + 1 : 10;
    setCurrentpage(selectedPage);
    setOffset(offset);
    setPageRange([offset, pageRangeTo]);
  };
  const _addNotesModalShow = () => {
    setnotesModal(true);
  };
  const _addNotesModalHide = () => {
    setnotesModal(false);
  };
  const _exportListModalShow = () => {
    setexportListModal(true);
  };
  const _exportListModalHide = () => {
    setexportListModal(false);
  };
  const showRemainingData = (showRemaining) => {
    setDataListIsOfRemaining(showRemaining);
    if (!showRemaining) {
      setData(meteroTableList.meteroTableData);
    } else {
      setData(
        meteroTableList.meteroTableData.filter(
          (item) => item.Saved_MeterO !== "true"
        )
      );
    }
  };
  const searchDataList = (searchTerm) => {
    if (searchTerm) {
      let filteredDataList = meteroTableList.meteroTableData.filter(
        (item) =>
          (item.Equipment &&
            item.Equipment.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.SerialNo &&
            item.SerialNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.Description &&
            item.Description.toLowerCase().includes(
              searchTerm.toLowerCase()
            )) ||
          (item.LicenseNumber &&
            item.LicenseNumber.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      // console.log("search data", filteredDataList);
      setData(filteredDataList);
    } else {
      setData(meteroTableList.meteroTableData);
    }
  };

  const setNoChange =(event,itemToUpdate)=>{
    console.log(event.target.checked, itemToUpdate);
      data.forEach(item=>{
        if(item.Equipment === itemToUpdate.Equipment){
          if(event.target.checked){
            if(itemToUpdate.NewHr && item.NewOdo){
              setValidationModalData({
                showModal:true,
                validationMessage:"Data already added",
                cancelButtonText:"Ok",
                showActionButton:false,
                showCancelButton:true,
                showFooterActions:true
              })
              return;
            }
            item.NewHr = "0";
            item.NewOdo = item.OdoReading;
            item.Saved_MeterO = 'true';
            axios.post(`${API_ENDPOINT}/metero/addTransaction`,[item])
            .then(apiRes=>{
              console.log(apiRes);
              if(apiRes.data === 'Success'){
                setValidationModalData({
                  showModal:true,
                  validationMessage:"Data saved successfully",
                  cancelButtonText:"Ok",
                  showActionButton:false,
                  showCancelButton:true,
                  showFooterActions:true
                })
              }
            })
            .catch(apiErr=>{
              console.log(apiErr);
              setValidationModalData({
                showModal:true,
                validationMessage:"Error occured",
                cancelButtonText:"Ok",
                showActionButton:false,
                showCancelButton:true,
                showFooterActions:true
              })
            })
          } else {
            item.NewHr = "";
            item.NewOdo = "";
            item.Saved_MeterO = '';
            axios.post(`${API_ENDPOINT}/metero/deleteTransaction`,[item])
            .then(apiRes=>{
              console.log(apiRes);
              if(apiRes.data === 'Success'){
                setValidationModalData({
                  showModal:true,
                  validationMessage:"Data removed successfully",
                  cancelButtonText:"Ok",
                  showActionButton:false,
                  showCancelButton:true,
                  showFooterActions:true
                })
              }
            })
            .catch(apiErr=>{
              console.log(apiErr);
              setValidationModalData({
                showModal:true,
                validationMessage:"Error occured",
                cancelButtonText:"Ok",
                showActionButton:false,
                showCancelButton:true,
                showFooterActions:true
              })
            })
          }
        }
      })
      setData([...data]);
  }

  const saveData = (item) => {
    console.log(item);
    if(!item.NewHr){
      setValidationModalData({
        showModal:true,
        validationMessage:"Please enter New Hour",
        cancelButtonText:"Ok",
        showActionButton:false,
        showCancelButton:true,
        showFooterActions:true
      });
      return
    }
    if(!item.NewOdo){
      setValidationModalData({
        showModal:true,
        validationMessage:"Please enter New Odo",
        cancelButtonText:"Ok",
        showActionButton:false,
        showCancelButton:true,
        showFooterActions:true
      });
      return
    }
    if(item.NewOdo < item.OdoReading){
      setValidationModalData({
        showModal:true,
        validationMessage:"New Odo is less than Odo reading",
        cancelButtonText:"Ok",
        showActionButton:false,
        showCancelButton:true,
        showFooterActions:true
      });
      return
    }
    axios.post(`${API_ENDPOINT}/metero/addTransaction`,[item])
            .then(apiRes=>{
              console.log(apiRes);
              if(apiRes.data === 'Success'){
                setValidationModalData({
                  showModal:true,
                  validationMessage:"Data added successfully",
                  cancelButtonText:"Ok",
                  showActionButton:false,
                  showCancelButton:true,
                  showFooterActions:true
                })
              }
            })
            .catch(apiErr=>{
              console.log(apiErr);
              setValidationModalData({
                showModal:true,
                validationMessage:"Error occured",
                cancelButtonText:"Ok",
                showActionButton:false,
                showCancelButton:true,
                showFooterActions:true
              })
            })
  }

  const updateInputValues = (value,equipment,inputField) => {
    // console.log(value,itemIndex,inputField);
    data.forEach(item=>{
      if(item.Equipment === equipment){
        item[inputField] = value;
      }
    })
    setData([...data]);
  }

  const _exportListModal =()=>{
    alert('Just Checking');
  }
  const refreshData = ()=>{
    data.forEach(item=>{
      if(item.Saved_MeterO !== 'true'){
        item.NewHr = "";
        item.NewOdo = "";
      }
    });
    setData([...data]);
  }
  return (
    <div className="tab-div">
      {meteroTableList.meteroTableData !== null &&
      meteroTableList.meteroTableData !== undefined &&
      meteroTableList.isSuccess == true &&
      meteroTableList.meteroTableData.length !== 0 ? (
        <>
          <div className="meter-Header d-flex justify-content-between align-items-center py-3">
            <div className="export-btn-div">
              <button
                type="button"
                className="btn btn-primary export-list text-white"
                
                onClick={() => _exportListModalShow()}
              >
                EXPORT LIST
              </button>
            </div>
            <div className="refresh-btn-div">
              <button
                type="button"
                className="btn btn-primary refresh-list text-white"
                onClick={()=>refreshData()}
              >
                REFRESH
              </button>
            </div>
            <div className="search-div">
              <Search
                onSearch={(value) => {
                  searchDataList(value);
                }}
              />
            </div>
            <div className="total-equip-div">
              <label>
                Total Equipments: {meteroTableList.meteroTableData.length}
              </label>
            </div>
            <div className="show-equip-div">
              <label>Showing Equipments: {data.length}</label>
            </div>
            <div className="page-item-div">
              <label>Page Item</label>
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
            <div className="data-list-type" >
              <ul style={{ cursor: "pointer" }}>
                <li className={dataListIsOfRemaining ? "active" : null}
                onClick={() => {
                  showRemainingData(true);
                }}>Remaining</li>
                <li   className={dataListIsOfRemaining ? null : "active"}
                onClick={() => {
                  showRemainingData(false);
                }}>All</li>
              </ul>
            
            </div>
          </div>
         
         <div className="table-div">
          <table className="table table-striped">
            <Header headers={headers} />
            <tbody>
              {data &&
                data.slice(pageRange[0], pageRange[1]).map((item, key) => {
                  return (
                    <tr
                      className={`card-itme mb-32 ${
                        item.Saved_MeterO === "true" ? "saved-entry" : ""
                      }`}
                      key={key}
                    >
                      <td>
                        <img
                          src={notesIcon}
                          className="img-fluid notesIcon"
                          alt="notesIcon"
                          onClick={() => {
                            _addNotesModalShow();
                            setnotesModalData(item);
                          }}
                        />
                      </td>
                      <td>{item.Equipment}</td>
                      <td>{item.SerialNo}</td>
                      <td>{item.Description}</td>
                      <td>{item.LicenseNumber}</td>
                      <td>{item.udReferenceNumber}</td>
                      <td>
                        {" "}
                        <input checked={item.HourReading === 0 && item.NewHr ==="0" ? true :false} onChange={(e)=>setNoChange(e,item)} type="checkbox" />
                      </td>
                      <td>
                        <input
                        disabled={item.HourReading === 0 && item.NewHr ==="0" ? true :false}
                          type="text"
                          value={item.NewHr}
                          onInput={(e)=>updateInputValues(e.target.value, item.Equipment,'NewHr')}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                        disabled={item.HourReading === 0 && item.NewHr ==="0" ? true :false}
                          type="text"
                          value={item.NewOdo}
                          onInput={(e)=>updateInputValues(e.target.value, item.Equipment,'NewOdo')}
                          className="form-control"
                        />
                      </td>
                      <td>{item.IsGPSActive}</td>
                      <td>
                        {" "}
                        <button onClick={()=>saveData(item)} className="btn btn-primary tbl-save-btn">
                          Save
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


          {/* <Modal
          className="text-center"
          centered
          show={this.state.loginValidation}
        >
          <Modal.Body className="py-4">
            <a
              className="position-absolute modal-close"
              // onClick={() => (_addNotesModal())}
            >
              <img src={closeIcon} />
            </a>
            <img src={loginError} className="img-fluid py-2" />
            <h4 className=" default-color">Login Status</h4>
            <p>User name and password should not blank</p>
          </Modal.Body>
        </Modal> */}
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
                        value={notesModalData.NewHr}
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
                        value={notesModalData.NewOdo}
                      />
                    </div>
                  </div>
                  <div className="row d-flex justify-content-start py-1">
                    <div className="col-md-5">
                      <label for="text">Enter Notes Below</label>
                    </div>
                    <div className="col-md-7">
                      <textarea type="text" className="form-control"></textarea>
                    </div>
                  </div>
                </>
              ) : null}
            </Modal.Body>
            <Modal.Footer>
              <div className="d-flex justify-content-start">
                <button type="submit" className="btn btn-primary mx-1">
                  UPDATED NOTE
                </button>
                <button type="submit" className="btn btn-cancel mx-1"  onClick={_addNotesModalHide}>
                  CANCEL
                </button>
              </div>
            </Modal.Footer>
          </Modal>

          

          <Modal
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
                  <h4 className=" default-color py-2 px-3">
                   Email List
                  </h4>
                  <div className="row d-flex justify-content-start py-1 px-3">
                    <div className="col-12 mb-2">
                      <label for="email"> Enter email address</label>
                    </div>

                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        // value={notesModalData.NewHr}
                        
                      />
                    </div>
                  </div>
                  </>
              
            </Modal.Body>
            <Modal.Footer>
              <div className="d-flex justify-content-start">
                <button type="submit" className="btn btn-primary mx-1">
                  EMAIL
                </button>
                <button type="submit" className="btn btn-cancel mx-1">
                  CANCEL
                </button>
              </div>
            </Modal.Footer>
          </Modal>

          <CommonModal
          showModal={validationModalData.showModal}
          onHide={()=>setValidationModalData({
    showModal:false,
    validationMessage:"",
    cancelButtonText:"Cancel",
    showActionButton:false,
    showCancelButton:true,
    showFooterActions:true
  })}
          hideModal={()=>setValidationModalData({
    showModal:false,
    validationMessage:"",
    cancelButtonText:"Cancel",
    showActionButton:false,
    showCancelButton:true,
    showFooterActions:true
  })}
          showFooterActions={validationModalData.showFooterActions}
          cancelButtonText={validationModalData.cancelButtonText}
          showCancelButton={validationModalData.showCancelButton}>
            {validationModalData.validationMessage}
          </CommonModal>

          {/* <NotesModal /> */}
        </>
      ) : (
        <div className="d-flex justify-content-center align-item-center no-job-selected">
          <p>No Job Selected</p>
        </div>
      )}
    </div>
  );
};

export default MeteroTable;


const CommonModal = (props) => {
  return (
    <Modal
            show={props.showModal}
            onHide={props.onHide}
            className="notesModal "
          >
            <Modal.Header className="d-flex justify-content-end">
              <a
                className="position-absolute modal-close"
                onClick={props.hideModal}
              >
                <img src={closeIcon} />
              </a>
            </Modal.Header>
            <Modal.Body>
              {props.children}
            </Modal.Body>
            {
              props.showFooterActions ? (
            <Modal.Footer>
              <div className="d-flex justify-content-start">
                {
                  props.showActionButton ? 
                  <button onClick={props.buttonAction} type="submit" className="btn btn-primary mx-1">
                    {props.buttonText}
                  </button>
                : null
                }
                {
                  props.showCancelButton ? 
                  <button onClick={props.hideModal} type="submit" className="btn btn-cancel mx-1">
                    {props.cancelButtonText}
                  </button>
                : null
              }
              </div>
            </Modal.Footer>
            ) :null 
          }
          </Modal>
  )
}