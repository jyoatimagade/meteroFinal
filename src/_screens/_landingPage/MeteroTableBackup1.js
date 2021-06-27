import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectJob_Action, meteroTable_Action } from "../../_stores/_actions";
import { notesIcon } from "../../_config/images";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable, { TableHeaderColumn } from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const MeteroTable = (props) => {
  const meteroTableList = useSelector((state) => state.meteroTable);
  const getJob = useSelector((state) => state.getJob);
  const [dropDownArray, setdropDownArray] = useState([]);
  const [data, setData] = useState([]);
  console.log("select MeteroTable value", meteroTableList);
  const dispatch = useDispatch();
  console.log("listing", meteroTableList)
  useEffect(() => {
    if(meteroTableList.meteroTableData !== null && meteroTableList.meteroTableData !== undefined && meteroTableList.meteroTableData.length !==0 ){
      setData(meteroTableList.meteroTableData);
     

  }
  }, [meteroTableList]);
  console.log("selected data", data)
  
  // useEffect(() => {
  //   {getJob.GETJOBData.map((item, key) => {
     
  //     console.log("selecct");
    
  //   })}
   
  // }, [meteroTableList.METEROTABLEdata]);
  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://testmeteroapi.iea.net:60000/api/metero/getjobs"
  //     )
  //     .then(response => {
  //       setData(response.data);
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }, []);

  const notesfield = (cell, row, rowIndex, formatExtraData) =>{
    return (
      <div
        style={{
          textAlign: "center",
          cursor: "pointer",
          lineHeight: "normal",
        }}
      >
        <img src={notesIcon} className="img-fluid" alt="notesIcon" />
      </div>
    );
  }
  const noChangeFeild = () =>{
    return (
      <div
        style={{
          textAlign: "center",
          cursor: "pointer",
          lineHeight: "normal",
        }}  
      >
       <input type="checkbox" />
      </div>
    );
  }
  const newHoursField = () =>{
    return (
      <div className="d-flex justify-content-center align-items-center">
       <input type="text" className="form-control" />
      </div>
    );
  }
  const newOdoField = () =>{
    return (
      <div className="d-flex justify-content-center align-items-center">
       <input type="text" className="form-control" />
      </div>
    );
  }
  const submitBtnField = () =>{
    return (
      <div>
      <button className="btn btn-primary tbl-save-btn">Save</button>
      </div>
    );
  }
  

  const header = [
    // { dataField: "notes", formatter: notesfield, text: "Notes", sort: true },
    { dataField: "equipment_no", text: "Equipment No", sort: true },
    { dataField: "serial_no", text: "Serial No", sort: true },
    { dataField: "Description", text: "Description", sort: true },
    { dataField: "LicenseNumber", text: "License Number", sort: true },
    { dataField: "udReerenceNumber", text: "Ref Number", sort: true },
    // {
    //   dataField: "noChangeCheckbox",
    //   text: "No Change",
    //   formatter: noChangeFeild,
    // },
    // { dataField: "newHourText", text: "New Hour", formatter: newHoursField },
    // { dataField: "newOdoText", text: "New Odo", formatter: newOdoField },
    { dataField: "gpsEnable", text: "GPS Enable" },
    // { dataField: "submitBtn", text: "", formatter: submitBtnField },
  ];

  // const columns = [
  //   { dataField: 'id', text: 'Id', sort: true },
  //   { dataField: 'name', text: 'Name', sort: true },
  //   { dataField: 'animal', text: 'Animal', sort: true }
  // ];

  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ];

  const pagination = paginationFactory({
    page: 2,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      //console.log('page', page);
      //console.log('sizePerPage', sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      // console.log('page', page);
      // console.log('sizePerPage', sizePerPage);
    },
  });

  const { SearchBar, ClearSearchButton } = Search;

  return (
    <div className="tab-div">
      {/* <div className="">

{
    // meteroTableList.METEROTABLEData && meteroTableList.METEROTABLEData.data.map((item, key) => {
    meteroTableList.METEROTABLEdata && meteroTableList.METEROTABLEdata.map((item, key) => {

       
        return (
          <ul className="card-itme mb-32" key={key}>
          <li>{item.Job} || {item.Description}</li>
            
        </ul>
        )
    })
}
</div> */}
{
  meteroTableList.meteroTableData !== null && meteroTableList.meteroTableData !== undefined && meteroTableList.isSuccess == true && meteroTableList.meteroTableData.length !== 0   ?
  <ToolkitProvider
  bootstrap4
  keyField="id"
  data={data}
  columns={header}
  search
>
  {(props) => (
    <div>
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
          <SearchBar {...props.searchProps} />
          {/* <ClearSearchButton {...props.searchProps} /> */}
          {/* <input type="search" className="form-control" /> */}
        </div>
        <div className="total-equip-div">
          <label>Total Equipments: 155</label>
        </div>
        <div className="show-equip-div">
          <label>Showing Equipments: 155</label>
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

      <BootstrapTable
        defaultSorted={defaultSorted}
        pagination={pagination}
        {...props.baseProps}
      >
      
      </BootstrapTable>
    </div>
  )}
</ToolkitProvider>
:<div>
  fetchingdata....
</div>
}
    
         </div>
  );
};

export default MeteroTable;
