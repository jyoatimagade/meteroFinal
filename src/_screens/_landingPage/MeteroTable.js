import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notesIcon, closeIcon, loginError } from "../../_config/images";
// import axios from "axios";
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
  const [pageRange, setPageRange] = useState([0, 11]);
  const [notesModal, setnotesModal] = useState(false);
  const [notesModalData, setnotesModalData] = useState();

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

  useMemo(() => {
    let selectedIdData = meteroTableList.meteroTableData;

    if (search) {
      selectedIdData = selectedIdData.filter(
        (meteroTableData) =>
          meteroTableList.meteroTableData.Equipment.toLowerCase().includes(
            search.toLowerCase()
          ) ||
          meteroTableList.meteroTableData.SerialNo.toLowerCase().includes(
            search.toLowerCase()
          )
      );
      console.log("search data", selectedIdData);
    }

    // setTotalItems(computedComments.length);

    // //Sorting comments
    // if (sorting.field) {
    //     const reversed = sorting.order === "asc" ? 1 : -1;
    //     computedComments = computedComments.sort(
    //         (a, b) =>
    //             reversed * a[sorting.field].localeCompare(b[sorting.field])
    //     );
    // }

    //Current Page slice
    // return selectedIdData.slice(
    //     (currentPage - 1) * ITEMS_PER_PAGE,
    //     (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    // );
  }, [meteroTableList.meteroTableData, currentPage, search]);

  const handlePageClick = (e) => {
    // window.scrollTo(0, 0);
    const selectedPage = e.selected + 1;
    const offset = e.selected * perPage + 1;
    console.log(selectedPage);
    setCurrentpage(selectedPage);
    setOffset(offset);
    setPageRange([offset, selectedPage * perPage + 1]);
  };
  const _addNotesModalShow = () => {
    setnotesModal(true);
  };
  const _addNotesModalHide = () => {
    setnotesModal(false);
  };

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
                onClick={() => this.exportListModal()}
              >
                EXPORT LIST
              </button>
            </div>
            <div className="refresh-btn-div">
              <button
                type="button"
                className="btn btn-primary refresh-list text-white"
              >
                REFRESH
              </button>
            </div>
            <div className="search-div">
              <Search
                onSearch={(value) => {
                  setSearch(value);
                  setSearchcurrentPage(1);
                }}
              />
            </div>
            <div className="total-equip-div">
              <label>
                Total Equipments: {meteroTableList.meteroTableData.length}
              </label>
            </div>
            <div className="show-equip-div">
              <label>
                Showing Equipments: {meteroTableList.meteroTableData.length}
              </label>
            </div>
            <div className="page-item-div">
              <label>Page Item</label>
              <select>
                <option>5</option>
                <option>10</option>
                <option>20</option>
              </select>
            </div>
            <div className="">
              <label>Remaining / All</label>
            </div>
          </div>
          <table className="table table-striped">
            <Header headers={headers} />
            <tbody>
              {meteroTableList.meteroTableData &&
                meteroTableList.meteroTableData
                  .slice(pageRange[0], pageRange[1])
                  .map((item, key) => {
                    return (
                      <tr className="card-itme mb-32" key={key}>
                        <td>
                          {" "}
                          <img
                            src={notesIcon}
                            className="img-fluid notesIcon"
                            alt="notesIcon"
                            onClick={() => {_addNotesModalShow(); setnotesModalData(item)}}
                          />
                        </td>
                        <td>{item.Equipment}</td>
                        <td>{item.SerialNo}</td>
                        <td>{item.Description}</td>
                        <td>{item.LicenseNumber}</td>
                        <td>{item.udReferenceNumber}</td>
                        <td>
                          {" "}
                          <input type="checkbox" />
                        </td>
                        <td>
                          <input type="text" value={item.NewHr} className="form-control" />
                        </td>
                        <td>
                          <input type="text" value={item.NewOdo} className="form-control" />
                        </td>
                        <td>{item.IsGPSActive}</td>
                        <td>
                          {" "}
                          <button className="btn btn-primary tbl-save-btn">
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
                  
                  pageClassName={'page-item'}
                  pageLinkClassName={'page-link'}
                  previousClassName={'page-item'}
                  previousLinkClassName={'page-link'}
                  nextClassName={'page-item'}
                  nextLinkClassName={'page-link'}
                  activeClassName={'active'}
                />
              </div>
            ) : null}
          </table>
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
          <Modal show={notesModal} onHide={_addNotesModalHide} className="notesModal">
            <Modal.Header className="d-flex justify-content-end">
              <a
                className="position-absolute modal-close"
                onClick={_addNotesModalHide}
              >
                <img src={closeIcon} />
              </a>
            </Modal.Header>
            <Modal.Body>
          
            {
              notesModalData ? (
                   <>
                <h4 className=" default-color py-2">Equipment No: {notesModalData.Equipment}</h4>
              <div class="row d-flex justify-content-start py-1">
                <div class="col-md-5">
                  <label for="email"> Last Recorded Hours</label>
                </div>

                <div class="col-md-7">
                  <input type="text" className="form-control"  disabled />
                </div>
              </div>
              <div class="row d-flex justify-content-start py-1">
                <div class="col-md-5">
                  <label for="text"> Last Recorded Odo</label>
                </div>
                <div class="col-md-7">
                  <input type="text" className="form-control"  />
                </div>
              </div>
              <div class="row d-flex justify-content-start py-1">
                <div class="col-md-5">
                  <label for="text">Enter Notes Below</label>
                </div>
                <div class="col-md-7">
                  <textarea type="text" className="form-control" ></textarea>
                </div>
              </div>
                  
             </>
              ) : null
            }
            </Modal.Body>
            <Modal.Footer>
              <div className="d-flex justify-content-start">
                <button type="submit" class="btn btn-primary mx-1">
                  UPDATED NOTE
                </button>
                <button type="submit" class="btn btn-primary mx-1">
                  CANCEL
                </button>
              </div>
            </Modal.Footer>
          </Modal>
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
