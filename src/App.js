import React, {useState} from 'react';
// import initReactFastclick from 'react-fastclick';
// import {Header, Footer, HeaderBottom} from './_components/'
// import {Login, Metero, } from './_screens'
// import { isIOS, isAndroid, isChrome, isSafari, isFirefox, isMobile, isTablet, isMobileSafari, isIOS13 } from 'react-device-detect';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './_assets/css/meteroTheme.css';



const App = props => {
  const [theme, setTheme] = useState("light")
  let baseClass = 'app'
  return (
    <>
   
    <div className={baseClass} id="app">
          {/* <Metero /> */}
         {props.children}
     
    </div>
    
    </>
  );
}

export default App;
