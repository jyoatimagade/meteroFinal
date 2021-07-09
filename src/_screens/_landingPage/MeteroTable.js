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
  const [rawdata, setRawData] = useState([]);
  const [pageRange, setPageRange] = useState([0, 10]);
  const [notesModal, setnotesModal] = useState(false);
  const [notesModalData, setnotesModalData] = useState();
  const [exportListModal, setexportListModal] = useState(false);
  const [exportListEmailid, setExportListEmailid] = useState("");
  const [dataListIsOfRemaining, setDataListIsOfRemaining] = useState(false);
  const [validationModalData, setValidationModalData] = useState({
    showModal: false,
    validationMessage: "",
    cancelButtonText: "Ok",
    showActionButton: false,
    showCancelButton: true,
    showFooterActions: true,
    icon: loginError,
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
    let pageRangeTo =
      selectedPage !== 1 ? selectedPage * perPageCount + 1 : perPageCount;
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
    setExportListEmailid("");
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

  const setNoChange = (event, itemToUpdate) => {
    console.log(event.target.checked, itemToUpdate);
    data.forEach((item) => {
      if (item.Equipment === itemToUpdate.Equipment) {
        debugger;
        if (event.target.checked) {
          if (itemToUpdate.NewHr && item.NewOdo) {
            setValidationModalData({
              showModal: true,
              validationMessage: (
                <h4 className="default-color">Data already added</h4>
              ),
              cancelButtonText: "Ok",
              showActionButton: false,
              showCancelButton: true,
              showFooterActions: true,
              icon: loginError,
            });
            return;
          }
          item.NewHr = item.HourReading;
          item.NewOdo = item.OdoReading;
          item.Saved_MeterO = "true";
          axios
            .post(`${API_ENDPOINT}/metero/addTransaction`, [item])
            .then((apiRes) => {
              console.log(apiRes);
              if (apiRes.data === "Success") {
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
        } else {
          item.NewHr = "";
          item.NewOdo = "";
          item.Saved_MeterO = "";
          axios
            .post(`${API_ENDPOINT}/metero/deleteTransaction`, [item])
            .then((apiRes) => {
              console.log(apiRes);
              if (apiRes.data === "Success") {
                setValidationModalData({
                  showModal: true,
                  validationMessage: (
                    <h4 className="default-color">Data removed successfully</h4>
                  ),
                  cancelButtonText: "Ok",
                  showActionButton: false,
                  showCancelButton: true,
                  showFooterActions: true,
                  icon: successIcon,
                });
              } else {
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
      }
    });
    setData([...data]);
  };

  const saveData = (item) => {
    console.log(item);
    if (!item.NewHr) {
      setValidationModalData({
        showModal: true,
        validationMessage: (
          <h4 className=" default-color">Please enter New Hour</h4>
        ),
        cancelButtonText: "Ok",
        showActionButton: false,
        showCancelButton: true,
        showFooterActions: true,
        icon: loginError,
      });
      return;
    }
    if (!item.NewOdo) {
      setValidationModalData({
        showModal: true,
        validationMessage: (
          <h4 className=" default-color">Please enter New Odo</h4>
        ),
        cancelButtonText: "Ok",
        showActionButton: false,
        showCancelButton: true,
        showFooterActions: true,
        icon: loginError,
      });
      return;
    }
    if (item.NewOdo < item.OdoReading) {
      setValidationModalData({
        showModal: true,
        validationMessage: (
          <p className="odoReading">
            Current Odo reading is{" "}
            <span className="default-color">{item.OdoReading}</span>
            <br />
            Please enter reading greater than{" "}
            <span className="default-color">{item.OdoReading}</span>
          </p>
        ),
        cancelButtonText: "Ok",
        showActionButton: false,
        showCancelButton: true,
        showFooterActions: true,
        icon: loginError,
      });
      return;
    }
    if (item.NewHr < item.HourReading) {
      setValidationModalData({
        showModal: true,
        validationMessage: (
          <p className="odoReading">
            Current Hour reading is{" "}
            <span className="default-color">{item.NewHr}</span>
            <br />
            Please enter reading greater than{" "}
            <span className="default-color">{item.HourReading}</span>
          </p>
        ),
        cancelButtonText: "Ok",
        showActionButton: false,
        showCancelButton: true,
        showFooterActions: true,
        icon: loginError,
      });
      return;
    }
    let isUpdateValidationError = [];
    isUpdateValidationError = rawdata.filter(
      (jobItem) =>
        jobItem.Equipment === item.Equipment &&
        (parseFloat(jobItem.NewHr) > parseFloat(item.NewHr) ||
          parseFloat(jobItem.NewOdo) > parseFloat(item.NewOdo))
    );
    if (isUpdateValidationError.length) {
      setValidationModalData({
        showModal: true,
        validationMessage: `New Hour (${item.NewHr}) is less than Current Hour (${isUpdateValidationError[0].NewHr}) reading`,
        cancelButtonText: "Ok",
        showActionButton: false,
        showCancelButton: true,
        showFooterActions: true,
        icon: loginError,
      });
      return;
    }
    data.forEach((dataItem) => {
      if (dataItem.Equipment === item.Equipment) {
        dataItem.Saved_MeterO = "true";
      }
    });

    axios
      .post(`${API_ENDPOINT}/metero/addTransaction`, [item])
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

  const updateInputValues = (value, equipment, inputField) => {
    // console.log(value,itemIndex,inputField);
    data.forEach((item) => {
      if (item.Equipment === equipment) {
        item[inputField] = value;
      }
    });
    setData([...data]);
  };

  const _exportListModal = () => {
    alert("Just Checking");
  };
  const refreshData = () => {
    data.forEach((item) => {
      if (item.Saved_MeterO !== "true") {
        item.NewHr = "";
        item.NewOdo = "";
      }
    });
    setData([...data]);
  };

  const sendExportEmail = () => {
    if (!exportListEmailid) {
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
    meteroTableList.meteroTableData.forEach((item) => {
      item["JobDesc"] = props.selectedJob;
      item["EmailTo"] = exportListEmailid;
    });
    axios
      .post(
        `${API_ENDPOINT}/metero/EmailEquipments`,
        meteroTableList.meteroTableData
      )
      .then((apiRes) => {
        console.log(apiRes);
        if (apiRes.data === "Success") {
          _exportListModalHide();
          setValidationModalData({
            showModal: true,
            validationMessage: "Data sent successfully",
            cancelButtonText: "Ok",
            showActionButton: false,
            showCancelButton: true,
            showFooterActions: true,
            icon: successIcon,
          });
        } else {
          setValidationModalData({
            showModal: true,
            validationMessage: "Export failed",
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

  const saveNotes = (notesData) => {
    notesData.Notes = `(Meter Submit,(${new Date().toLocaleDateString()}) ${
      notesData.Notes
    }`;
    console.log(notesData.Notes);

    axios
      .post(`${API_ENDPOINT}/metero/updateNotesViewpoint`, [notesData])
      .then((apiRes) => {
        console.log(apiRes);
        if (apiRes.data === "Success") {
          _exportListModalHide();
          setValidationModalData({
            showModal: true,
            validationMessage: "Notes save successfully",
            cancelButtonText: "Ok",
            showActionButton: false,
            showCancelButton: true,
            showFooterActions: true,
            icon: successIcon,
          });
        } else {
          setValidationModalData({
            showModal: true,
            validationMessage: "Notes not saved",
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
  return (
    <div className="tab-div">
      {meteroTableList.meteroTableData !== null &&
      meteroTableList.meteroTableData !== undefined &&
      meteroTableList.isSuccess == true &&
      meteroTableList.meteroTableData.length !== 0 ? (
        <>
          <div className="meter-Header d-flex justify-content-between align-items-center py-3">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 d-flex justify-content-between align-items-center pb-1">
              <div className="export-btn-div">
                <button
                  type="button"
                  className="btn btn-primary export-list text-white"
                  onClick={() => _exportListModalShow()}
                >
                  EXPORT LIST <img className="headerbtm-icon" src={exportListIcon} title="Export List" />
                </button>
              </div>
              <div className="refresh-btn-div">
                <button
                  type="button"
                  className="btn btn-primary refresh-list text-white"
                  onClick={() => refreshData()}
                >
                  REFRESH
                  <img src={refreshIcon} className="headerbtm-icon" title="Refresh" />
                </button>
              </div>
              <div className="search-div">
                <Search
                  showClose={true}
                  onSearch={(value) => {
                    searchDataList(value);
                  }}
                  onBackPress={(value)=> onBackPress(value)}
                />
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 d-flex justify-content-around align-items-center pb-1 header-bottom-right-div">
              
              <div className="d-flex justify-content-around align-items-center total-record-div">
              <div className="total-equip-div">
                <label>
                  Total Equipments: {meteroTableList.meteroTableData.length}
                </label>
              </div>
              <div className="show-equip-div">
                <label>Showing Equipments: {data.length}</label>
              </div>
              </div>
              <div className="d-flex justify-content-around align-items-cente pageIte-main-div">
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
              <div className="data-list-type">
                <ul style={{ cursor: "pointer" }}>
                  <li
                    className={dataListIsOfRemaining ? "active" : null}
                    onClick={() => {
                      showRemainingData(true);
                    }}
                  >
                    Remaining
                  </li>
                  <li
                    className={dataListIsOfRemaining ? null : "active"}
                    onClick={() => {
                      showRemainingData(false);
                    }}
                  >
                    All
                  </li>
                </ul>
              </div>
              </div>
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
                          <input
                            checked={
                              (item.NewHr === "0" ||
                                parseFloat(item.NewHr) ===
                                  parseFloat(item.HourReading)) &&
                              item.Saved_MeterO === "true"
                                ? true
                                : false
                            }
                            onChange={(e) => setNoChange(e, item)}
                            type="checkbox"
                          />
                        </td>
                        <td>
                          <input
                            disabled={
                              item.HourReading === 0 && item.NewHr === "0"
                                ? true
                                : false
                            }
                            type="number"
                            value={item.NewHr}
                            onInput={(e) =>
                              updateInputValues(
                                e.target.value,
                                item.Equipment,
                                "NewHr"
                              )
                            }
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            disabled={
                              item.HourReading === 0 && item.NewHr === "0"
                                ? true
                                : false
                            }
                            type="number"
                            value={item.NewOdo}
                            onInput={(e) =>
                              updateInputValues(
                                e.target.value,
                                item.Equipment,
                                "NewOdo"
                              )
                            }
                            className="form-control"
                          />
                        </td>
                        <td>
                          {item.IsGPSActive.toLowerCase() !== "yes"
                            ? ""
                            : "GPS"}
                        </td>
                        <td>
                          {" "}
                          <button
                            disabled={
                              (item.NewHr === "0" ||
                                parseFloat(item.NewHr) ===
                                  parseFloat(item.HourReading)) &&
                              item.Saved_MeterO === "true"
                                ? true
                                : false
                            }
                            onClick={() => saveData(item)}
                            className="btn btn-primary tbl-save-btn"
                          >
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
          </Modal>

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

export default MeteroTable;
