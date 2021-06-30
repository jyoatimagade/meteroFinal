import React,{useState} from "react";
import { Header, HeaderBottom, Footer } from "../../_components";
import MeteroTab from "./MeteroTab";
import { ThemeProvider } from "styled-components";
import {SplashScreen} from   "../../_components/_UICompoents/SplashScreen"

const Metero = () => {
  const [selectedJob, setSelectedJob] = useState("");
 
  return (
    <>
      {/* <ThemeProvider theme={themes[theme]}> */}
      
        <Header />
        <HeaderBottom setSelectedJob={setSelectedJob} />
        <MeteroTab selectedJob={selectedJob} />
        <Footer />
      {/* </ThemeProvider> */}
    </>
  );
};

export default Metero;
{/* <MeteroTab />; */}
