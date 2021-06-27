import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { meteroTable_Action } from "../../_stores/_actions";
import {
  Header,
  Search,
  Pagination,
} from "../../_components/_UICompoents/datatable";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import ReactPaginate from 'react-paginate';

// import paginationFactory from "react-bootstrap-table2-paginator";
// import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const MeteroTable = (props) => {
  const meteroTableList = useSelector((state) => state.meteroTable);
  const [dropDownArray, setdropDownArray] = useState([]);
  console.log("select MeteroTable value", meteroTableList);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerpage] = useState(10);  
  const [currentPage, setCurrentpage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  
  const ITEMS_PER_PAGE = 50
  const dispatch = useDispatch();

  // useEffect(() => {
  //   try {
  //     dispatch(meteroTable_Action());
  //   } catch (error) {}
  // }, []);

  useEffect(() => {
    dispatch(meteroTable_Action());
  }, []);

  useEffect(() => {
    if (meteroTableList.METEROTABLEdata) {
      let newArraydrop = [];
      console.log(newArraydrop);
      if (meteroTableList.METEROTABLEdata) {
        meteroTableList.METEROTABLEdata.map((item) => {
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
    
  }, [meteroTableList.METEROTABLEdata]);

  const handlePageClick = (e) => {
    window.scrollTo(0, 0);
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    console.log(offset)
    setCurrentpage(selectedPage)
    setOffset(offset)
  }

  const products = [
    {
      id: 1,
      notes: "",
      equipment_no: "40JA1629",
      Description: "(R) CAT 966M W/FORKS",
      LicenseNumber: "",
      udReferenceNumber: "0EJA01629",
    },
    {
      id: 2,
      notes: "",
      equipment_no: "97114336",
      Description: "(R) 2019 CHEVY 2500 BEDSIDE PICKUP",
      LicenseNumber: "ZMD9836",
      udReferenceNumber: "0EJA01629",
    },
    {
      id: 3,
      notes: "",
      equipment_no: "97114336",
      Description: "(R) 2019 CHEVY 2500 BEDSIDE PICKUP",
      LicenseNumber: "ZMD9836",
      udReferenceNumber: "0EJA01629",
    },
    {
      id: 4,
      notes: "",
      equipment_no: "97114336",
      Description: "(R) 2019 CHEVY 2500 BEDSIDE PICKUP",
      LicenseNumber: "ZMD9836",
      udReferenceNumber: "0EJA01629",
    },
    {
      id: 5,
      notes: "",
      equipment_no: "97114336",
      Description: "(R) 2019 CHEVY 2500 BEDSIDE PICKUP",
      LicenseNumber: "ZMD9836",
      udReferenceNumber: "0EJA01629",
    },
    {
      id: 6,
      notes: "",
      equipment_no: "97114336",
      Description: "(R) 2019 CHEVY 2500 BEDSIDE PICKUP",
      LicenseNumber: "ZMD9836",
      udReferenceNumber: "0EJA01629",
    },
    {
      id: 7,
      notes: "",
      equipment_no: "97114336",
      Description: "(R) 2019 CHEVY 2500 BEDSIDE PICKUP",
      LicenseNumber: "ZMD9836",
      udReferenceNumber: "0EJA01629",
    },
    {
      id: 8,
      notes: "",
      equipment_no: "97114336",
      Description: "(R) 2019 CHEVY 2500 BEDSIDE PICKUP",
      LicenseNumber: "ZMD9836",
      udReferenceNumber: "0EJA01629",
    },
    // { id: 1, name: 'Jeffrey', animal: 'Giraffe' },
  ];

  const columns = [
    { dataField: "id", text: "Id", sort: true },
    { dataField: "notes", text: "Notes", sort: true },
    { dataField: "equipment_no", text: "Equipment No", sort: true },
    { dataField: "Description", text: "Description", sort: true },
    { dataField: "LicenseNumber", text: "License Number", sort: true },
    { dataField: "udReferenceNumber", text: "Reference Number", sort: true },
  ];
  const headers = [
    { field: "id", name: "Id" },
    { field: "notes", name: "Notes" },
    { field: "equipment_no", name: "Equipment No" },
    { field: "Description", name: "Description" },
    { field: "LicenseNumber", name: "License Number" },
    { field: "udReferenceNumber", name: "Reference Number" },
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

  // const pagination = paginationFactory({
  //   page: 2,
  //   sizePerPage: 5,
  //   lastPageText: ">>",
  //   firstPageText: "<<",
  //   nextPageText: ">",
  //   prePageText: "<",
  //   showTotal: true,
  //   alwaysShowAllBtns: true,
  //   onPageChange: function (page, sizePerPage) {
  //     //console.log('page', page);
  //     //console.log('sizePerPage', sizePerPage);
  //   },
  //   onSizePerPageChange: function (page, sizePerPage) {
  //     // console.log('page', page);
  //     // console.log('sizePerPage', sizePerPage);
  //   },
  // });

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
      <div className="row w-100">
        <div className="col mb-3 col-12 text-center">
          <div className="row">
            <div className="col-md-6">
             
            </div>
            <div className="col-md-6 d-flex flex-row-reverse">
              {/* <Search
                                onSearch={value => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            /> */}
            </div>
          </div>

          <table className="table table-striped">
            <Header
              headers={headers}
              // onSorting={(field, order) =>
              //     setSorting({ field, order })
              // }
            />
            <tbody>
           
              {
                // meteroTableList.METEROTABLEData && meteroTableList.METEROTABLEData.data.map((item, key) => {
                meteroTableList.METEROTABLEdata &&
                  meteroTableList.METEROTABLEdata.map((item, key) => {
                    return (
                      <tr className="card-itme mb-32" key={key}>
                        <td>
                          {item.Job} 
                        </td>
                        <td>
                           {item.Description}
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    );
                  })
              }
             
            </tbody>
{/*             
               <Pagination
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                            /> */}
                              {
                   meteroTableList.METEROTABLEdata !== null && meteroTableList.METEROTABLEdata.length > 0  ?
                    <div className="pagination-div">

                      <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        // pageCount={Math.ceil(whatsavailabledata.whatsavailabledata.data.pagination.total / perPage)}
                        pageCount={Math.ceil(meteroTableList.METEROTABLEdata.total / perPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />


                    </div> : null
                    }
            
          </table>
          
        </div>
      </div>
    </div>
  );
};

export default MeteroTable;
