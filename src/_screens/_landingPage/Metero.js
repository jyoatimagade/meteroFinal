import React,{useState} from "react";
// import { Header, HeaderBottom, Footer, SplashScreen } from "../../_components";
import { SplashScreen } from "../../_components";
import MeteroTab from "./MeteroTab";
import { ThemeProvider } from "styled-components";
// import { SplashScreen } from './_components';
import { Redirect } from "react-router-dom";



const LightTheme = {
  pageBackground: "white",
  titleColor: "#dc658b",
  tagLineColor: "black"
};

const DarkTheme = {
  pageBackground: "#282c36",
  titleColor: "lightpink",
  tagLineColor: "lavender"
}

const themes = {
  light: LightTheme,
  dark: DarkTheme,
}

const Metero = () => {
  const [theme, setTheme] = useState("light")
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("");
  const [selectedTab, setselectedTab] = useState(0);
 
  if (!sessionStorage.getItem("UserId")) {
    return <Redirect to="/" />;
  }

  return (
    
    <>
     <ThemeProvider theme={themes[theme]}>
        <SplashScreen theme={theme} setTheme={setTheme} />
        </ThemeProvider>
    </>
  );
};

export default Metero;
{/* <MeteroTab />; */}
