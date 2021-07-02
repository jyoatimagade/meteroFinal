import React, { useCallback, useState, useEffect } from "react";
import axios from 'axios';
import { API_ENDPOINT, AUTH_HEADERS } from '../../_config/ApiConstants';
import {
  loginBg,
  meteroLogo,
  meteroSecondLogo,
  closeIcon,
  loginError,
} from "../../_config/images";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { loginAPI_Action, resetLoginAPI_Action } from "../../_stores/_actions";
import {
  setLocalStorageData,
  getLocalStorageData,
  clearLocalStorage,
} from "../../_utils/storage";
import { Redirect, useHistory } from "react-router-dom";
const Login = (props) => {
  // Selectors
  const loginData = useSelector((state) => state.login);
  // console.log(loginData)
  // Login
  const dispatch = useDispatch();
  let history = useHistory();
  const [Notes, setNotes] =useState();
  const [formData, setFormData] = useState(
    Object.freeze({
      userName: "",
      password: "",
    })
  );

  useEffect(()=>{ 
    axios.post(`${API_ENDPOINT}/metero/validateUser`)
    .then(apiRes=>{
      console.log(apiRes);
      // if(apiRes.data === 'Success'){
        setNotes(apiRes)
      // } else {
       
      // }
    })   
    
    }, [])

  // useEffect(() => {
  //   try {
  //     dispatch(loginAPI_Action());
  //   } catch (error) {}
  // }, []);

  // useEffect(() => {

  //   if (loginData.loginData !== null || loginData !== undefined && loginData.loginData.isSuccess == true) {
  //     alert('Login suceesful',loginData )
  //   } else {
  //     dispatch(loginAPI_Action());

  //     console.Console.log('try again')
  //   }
  // }, [loginData.loginData]);

  // if (loginData.logindata && loginData.logindata[0].UserValidated!==undefined && loginData.logindata[0].UserValidated!=="true") {
  // if ( loginData.logindata &&  loginData.logindata[0].UserValidated !== true) {
  //   console.log("loginData.logindata.data ", loginData[0]);

  //   if (
  //     // loginData.logindata &&
  //     // loginData.logindata[0].UserValidated !== undefined &&
  //     // loginData.logindata[0].UserValidated !== true
  //     loginData.logindata[0].UserValidated === "true" &&
  //     loginData.logindata[0].SessionID > 0
  //   ) {
  //     history.push("/Metero");
      
  //   } else {
  //     // alert('Try again');
  //     console.log("try again"); 
  //   }
  // } else {
  //   // alert('Try again2');
  //   console.log("try again2");


  const __onTextChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const __apiCall = useCallback(async () => {
    debugger;
    try {
      await dispatch(loginAPI_Action(formData));
    } catch (error) {
    
    }
  });

  const _submitForm = (e) => {
    e.preventDefault();
    debugger
    __apiCall();
    if (loginData.logindata &&  loginData.logindata.UserValidated !== true) {
          alert('Login suceesful',loginData )
         
        } else {
          dispatch(resetLoginAPI_Action());
    
          alert('try again')
        }
  
  };
  const _loginErrorModal = () => {};
  const _loginValidationModal = () => {};

  return (
    <>
    <div>
  {/* {
    todos && todos.map((todo)=>{
      const{} = todo
    })
  } */}
</div>
      <div
        className="login"
        style={{
          backgroundImage: "url(" + loginBg + ")",
        }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="login-form">
                <div className="login-base-div d-flex  justify-content-center  flex-column ">
                  <div className="logo-img d-flex border-bottom border-3  justify-content-around  py-3 ">
                    <div className="col d-flex  justify-content-end">
                      <img src={meteroLogo} className="img-fluid" alt="logo" />
                    </div>
                    <div className="col">
                      <img
                        src={meteroSecondLogo}
                        className="img-fluid"
                        alt="logo"
                      />
                    </div>
                  </div>
                  <div className="welcome-heading text-center  py-4">
                    <h2>Welcome to IEA MeterO</h2>
                  </div>
                  <div className="sign-in-section text-center p-4">
                    <div className="sign-in-heading pb-3">
                      <h2>Sign In</h2>
                      <p>Please enter your credentials to continue</p>
                    </div>
                    <form onSubmit={_submitForm} className="sign-in-form">
                      <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">
                          User Name
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="Username"
                            onChange={__onTextChange}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">
                          Password
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Password"
                            onChange={__onTextChange}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label"></label>
                        <div className="col-sm-9 d-flex  justify-content-between">
                          {/* <div className="form-check remeber-me">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                onChange={this.toggleRememberMe}
                              />
                              <label className="form-check-label">
                                Remember Me
                              </label>
                            </div>
                            <div className="forgot-password">
                              <a href="#" className="">
                                <i>Forgot Password</i>
                              </a>
                            </div> */}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-75 mb-5 mt-2"
                      >
                        Sign in
                      </button>
                    </form>
                    <div className="sign-in-footer d-flex  justify-content-between pt-4">
                      <a href="#">About MeterO</a>
                      <a href="#">Contact Us</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal className="text-center" centered show={this.state.show}>
          <Modal.Body className="py-4">
            <a
              className="position-absolute modal-close"
              onClick={() => (_loginErrorModal())}
            >
              <img src={closeIcon} />
            </a>
            <img src={loginError} className="img-fluid py-2" />
            <h4 className=" default-color">Login Status</h4>
            <p>Invalid Credentials, Please try again</p>
          </Modal.Body>
        </Modal>

        <Modal
          className="text-center"
          centered
          show={this.state.loginValidation}
        >
          <Modal.Body className="py-4">
            <a
              className="position-absolute modal-close"
              onClick={() => (_loginValidationModal())}
            >
              <img src={closeIcon} />
            </a>
            <img src={loginError} className="img-fluid py-2" />
            <h4 className=" default-color">Login Status</h4>
            <p>User name and password should not blank</p>
          </Modal.Body>
        </Modal> */}
    </>
  );
};

export default Login;
