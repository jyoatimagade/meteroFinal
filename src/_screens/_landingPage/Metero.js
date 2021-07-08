import React,{useState} from "react";
import { Header, HeaderBottom, Footer } from "../../_components";
import MeteroTab from "./MeteroTab";
import { ThemeProvider } from "styled-components";
import {SplashScreen} from   "../../_components/_UICompoents/SplashScreen"
import { Redirect } from "react-router-dom";

const Metero = () => {
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("");
  const [selectedTab, setselectedTab] = useState(0);
 
  if (!sessionStorage.getItem("UserId")) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {/* <ThemeProvider theme={themes[theme]}> */}
      
        <Header />
        <HeaderBottom selectedTab={selectedTab} setSelectedJob={setSelectedJob} setSelectedJobId={setSelectedJobId} />
        <MeteroTab setselectedTab={setselectedTab} selectedJob={selectedJob} selectedJobId={selectedJobId} />
        <Footer />
      {/* </ThemeProvider> */}
    </>
  );
};

export default Metero;
{/* <MeteroTab />; */}
