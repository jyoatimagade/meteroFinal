import React from "react";
import { Header, HeaderBottom, Footer } from "../../_components";
import MeteroTab from "./MeteroTab";
import { ThemeProvider } from "styled-components";
import {SplashScreen} from   "../../_components/_UICompoents/SplashScreen"

const Metero = () => {
 
  return (
    <>
      {/* <ThemeProvider theme={themes[theme]}> */}
      
        <Header />
        <HeaderBottom />
        <MeteroTab />
        <Footer />
      {/* </ThemeProvider> */}
    </>
  );
};

export default Metero;
{/* <MeteroTab />; */}
