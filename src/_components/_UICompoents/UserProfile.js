import React, { useState } from "react";
import { Redirect, useHistory  } from "react-router-dom";
import { profileUser, closeIcon } from "../../_config/images";
import { Modal } from "react-bootstrap";

const UserProfile = (props) => {
  const [ToggleOn, setToggleOn] = useState(false);
  const [LogoutModalOn, setLogoutModalOn] = useState(false);
  const [LogOutSucessOn, setLogOutSucessOn] = useState(false);
  const [LogoutModalCancel, setLogoutModalCancel] = useState(false);
  const [loggedIn, setloggedIn] = useState(true);
  let token = sessionStorage.getItem("SID");
  let history = useHistory();

  // const __toggleProfile = () => setToggleOn(true)

  const __toggleProfile = (e) => {
    setToggleOn(!ToggleOn);
  };
  const _onLogoutModal = (e) => {
    setLogoutModalOn(!LogoutModalOn);
  };
  const _LogOutSucess = (e) => {
    {
      // debugger;
      var idleTime = 0;
      var myObj = { SessionId: sessionStorage.getItem("SID"), message: "logout" };
  
      fetch("https://testmeteroapi.iea.net:60000/api/metero/disconnectSession", {
        method: "POST",
        HEADERS: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(myObj),
      }).then((res) => {
        console.log(res);
        res.json().then((response) => {
          console.log(response);
          if (response == "success") {
            // sessionStorage.removeItem("token");
            
            sessionStorage.clear();
            setloggedIn(false);
            history.push('/');
            // this.setState({ loggedIn: !this.state.loggedIn });
          } else {
            alert("cant logout");
          }
        });
      });
    }}
  // const _LogOutSucess = (e) => {
  //   console.log(token);
    
    
  //   if (token == null) {
  //     // setloggedIn(false);
  //     // <Redirect to="/" />;
  //     setLogoutModalOn(!LogoutModalOn);
  //   }
  // };
  const _CancelLogoutModal = (e) => {
    console.log("completed");
    setLogoutModalOn(!LogoutModalOn);
  };

  return (
    <>
      <div className="dropdown px-3 py-3">
        <a
          href="#"
          className={`link-dark text-decoration-none dropdown-toggle`}
          className=""
          onClick={() => {
            __toggleProfile();
          }}
        >
          <img
            src={profileUser}
            alt="mdo"
            width="32"
            height="32"
            className="rounded-circle"
          />{" "}
          <span>{sessionStorage.getItem('UserFullName')}</span>
        </a>

        <ul
          className={`dropdown-menu text-small ${
            !ToggleOn ? "d-none" : "d-block"
          }`}
        >
          <li>
            <a
              className="dropdown-item"
              onClick={() => {
                _onLogoutModal();
              }}
            >
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
              onClick={() => {
                _CancelLogoutModal();
              }}
            >
              <img src={closeIcon} />
            </a>

            <h4 className=" default-color">Logout ?</h4>

            <p>Are you sure You want to logout?</p>
            <div className="export-modal-btn py-2 d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary mx-2"
                onClick={() => {
                  _LogOutSucess();
                }}
              >
                LOGOUT{" "}
              </button>
              <button
                type="button"
                className="btn btn-secondary mx-2 btn-secondary"
                onClick={() => {
                  _CancelLogoutModal();
                }}
              >
                CANCEL
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
export default UserProfile;
