import React,{useState} from "react";
import styled from "styled-components";
import MeteroTab from "../../_screens/_landingPage/MeteroTab";
import { Header, HeaderBottom, Footer } from "../../_components";
// import {headerBg, meteroLogo,meteroSecondLogo,} from '../../_config/images';


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

const Page = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${props => props.theme.pageBackground};
  transition: all .5s ease;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    color: ${props => props.theme.titleColor};
    transition: all .5s ease;
`;

const TagLine = styled.span`
    color: ${props => props.theme.tagLineColor};
    font-size: 18px;
    transition: all .5s ease;
`;

function SplashScreen(props) {
    
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("");
  const [selectedTab, setselectedTab] = useState(0);

    return (
        <Page className={props.theme}>
               <Header />
       <HeaderBottom theme={props.theme} setTheme={props.setTheme} selectedTab={selectedTab} setSelectedJob={setSelectedJob} setSelectedJobId={setSelectedJobId} />
         <MeteroTab setselectedTab={setselectedTab} selectedJob={selectedJob} selectedJobId={selectedJobId} />
        <Footer />
        
               
               
            
        </Page>
    );
};

export default SplashScreen;