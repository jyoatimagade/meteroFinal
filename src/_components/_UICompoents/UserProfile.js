import React, { useState } from 'react';
import {profileUser, closeIcon} from '../../_config/images';
import { Modal } from "react-bootstrap";
const UserProfile = props => {

    const [ToggleOn, setToggleOn] = useState(false);
    const [LogoutModalOn, setLogoutModalOn] = useState(false);
    const [LogOutSucessOn, setLogOutSucessOn] = useState(false);
    const [LogoutModalCancel, setLogoutModalCancel] = useState(false);

    // const __toggleProfile = () => setToggleOn(true)

    const __toggleProfile = (e) => {
        setToggleOn(!ToggleOn);        
    }
    const _onLogoutModal =(e) =>{        
        setLogoutModalOn(!LogoutModalOn);
    }
    const _LogOutSucess =(e) =>{
      console.log('completed')
      setLogoutModalOn(!LogoutModalOn);
  }
  const _CancelLogoutModal =(e) =>{
    console.log('completed')  
    setLogoutModalOn(!LogoutModalOn);
}
   
    return (
       
      <>
            <div className="dropdown px-3 py-3">
              <a
                href="#"                
                className={`link-dark text-decoration-none dropdown-toggle`}
                className=""
                onClick={() => {
                    __toggleProfile()                
                }} 
              >
                <img
                  src={profileUser}
                  alt="mdo"
                  width="32"
                  height="32"
                  className="rounded-circle"
                />{" "}
                <span>Meter Submit</span>
              
              </a>
    
              
                <ul className={`dropdown-menu text-small ${!ToggleOn ? 'd-none' : 'd-block'}`} >               
    
                  <li>
                   
                    <a className="dropdown-item" onClick={() => {
                   _onLogoutModal()                
                }}>
                      Logout
                    </a>
                  </li>
                </ul>
                 <Modal
            className="text-center"
            dialogClassName="modal-90w"
            show={LogoutModalOn}
          >
            <Modal.Body className="">
              <a
                className="position-absolute modal-close"
                onClick={() => {(_CancelLogoutModal())}}
              >
                <img src={closeIcon} />
              </a>

              <h4 className=" default-color">Logout ?</h4>

              <p>Are you sure You want to logout?</p>
              <div className="export-modal-btn py-2 d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  onClick={() =>{_LogOutSucess()}}
                >
                  LOGOUT{" "}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary mx-2 btn-secondary"
                  onClick={() => {_CancelLogoutModal()}}
                >
                  CANCEL
                </button>
              </div>
            </Modal.Body>
          </Modal> 
                
            
            </div>
          </>
    )
}
export default UserProfile;
