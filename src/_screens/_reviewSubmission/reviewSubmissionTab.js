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
import { API_ENDPOINT, AUTH_HEADERS } from "../../_config/ApiConstants";
import {
    Header,
    Search  
  } from "../../_components/_UICompoents/datatable";
const ReviewSubmissionTab = () => {
    const meteroTableList = useSelector((state) => state.meteroTable);
    const [data, setData] = useState([]);
    // useEffect(() => {
    //     if (
    //       meteroTableList.meteroTableData !== null &&
    //       meteroTableList.meteroTableData !== undefined &&
    //       meteroTableList.meteroTableData.length !== 0
    //     ) {
    //       console.log("listing", meteroTableList.meteroTableData.length);
    //       setData([...meteroTableList.meteroTableData]);
    //       setRawData(JSON.parse(JSON.stringify(meteroTableList.meteroTableData)));
    //     }
    //   }, [meteroTableList]);
  
    return (
      <></>
     );
}
export default ReviewSubmissionTab;