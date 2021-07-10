import React from 'react';
import styled from "styled-components";
const Global = () =>{
  
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
//   display: flex;
//   justify-content: center;
//   align-items: center;
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
}

export default Global;