import React, {useState} from 'react';

import {headerBg, meteroLogo,meteroSecondLogo} from '../../_config/images';
import UserProfile from './UserProfile';

const Header = () => {
 
  
    return (
      <>
      <div
        className="header border-bottom"
        style={{
          backgroundImage: "url(" + headerBg + ")",
        }}
      >
        <div className="header-top">
          <div className="d-flex align-items-center justify-content-between">
            <a
              href="/"
              className="d-flex align-items-center px-3  py-2 mb-lg-0 text-decoration-none logo-section"
            >
              <img src={meteroLogo} className="img-fluid" alt="logo" />
              <img src={meteroSecondLogo} className="img-fluid" alt="logo" />
            </a>

            <UserProfile />
            {/* <Popover /> */}
          </div>
        </div>
      </div>
     {/* <JobListSearch /> */}
    </>
    )
}
export default Header;