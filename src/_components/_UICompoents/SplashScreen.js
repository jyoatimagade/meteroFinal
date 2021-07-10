import React,{useState} from "react";
import styled from "styled-components";
import { CgSun } from "react-icons/cg";
import { HiMoon } from "react-icons/hi";
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

const Toggle = styled.button`
    cursor: pointer;
    height: 50px;
    width: 50px;   
    border-radius: 50%;
    border: none;
    background-color: ${props => props.theme.titleColor};
    color: ${props => props.theme.pageBackground};
    &:focus {
        outline: none;
    }
    transition: all .5s ease;he
`;

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
    function changeTheme() {
        if (props.theme === "light") {
            props.setTheme("dark");
        } else {
            props.setTheme("light");
        }
    };

    const icon = props.theme === "light" ? <HiMoon size={40} /> : <CgSun size={40} />;

    return (
        <Page>
               <Header />
       <HeaderBottom selectedTab={selectedTab} setSelectedJob={setSelectedJob} setSelectedJobId={setSelectedJobId} />
               {/* <Toggle onClick={changeTheme}>
                    {icon}
                </Toggle> */}
         <MeteroTab setselectedTab={setselectedTab} selectedJob={selectedJob} selectedJobId={selectedJobId} />
        <Footer />
        
               
               
            
        </Page>
    );
};

export default SplashScreen;