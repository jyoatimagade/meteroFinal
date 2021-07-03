// import favIcon from './logo.svg';
import React, { useState } from "react";

import "../../App.css";
import {
    loginBg,
    meteroLogo,
    meteroSecondLogo,
    closeIcon,
    loginError,
  } from "../../_config/images";
import { Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const mapStateToProps =(state) =>{
  debugger
  return{
    myName:state.name
  }
}

class LoginNew extends React.Component {
  constructor(props) {
    super(props);

    // let MeteroSession = sessionStorage.getItem("MeteroRollName");
    const token = sessionStorage.getItem("SID");
    let UserName = sessionStorage.getItem("profile");
    //debugger
    console.log(UserName)

  //   this.setState({UserName: UserName}, function () {
  //     console.log(this.state.UserName);
  //  });
    let loggedIn =true
    // let MeteroRollName = true;
    // if (MeteroSession == null) {
    //   MeteroRollName = false;
    // }

    // let token = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      username: sessionStorage.getItem("profile"),
      password: "",
      userNameError: "",
      passwordError: "",
      rememberMe:false,
      show: false,
      loggedIn,
      loginValidation: false,
      loop: 0,
      // MeteroRollName,
      rowitem: [],
    };
  }
  toggleRememberMe = ()=> {
    this.setState({
        rememberMe: !this.state.rememberMe
    });
}

  submitForm = (e) => {
    //debugger
    e.preventDefault();
    const { username, password, rememberMe } = this.state;
    console.log("state", this.state);

    console.log(this.state.username + this.state.password);
    if (this.state.username !== "" && this.state.password !== "") {
      fetch("https://testmeteroapi.iea.net:60000/api/MeterO/validateUser", {
        method: "POST",
        HEADERS: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.state),
      }).then((res) => {
        console.log(res);
        res.json().then((response) => {
          console.log(response);
          // console.log(response[0].UserValidated);
          if (
            response[0].UserValidated === "true" &&
            response[0].SessionID > 0
          ) {
            sessionStorage.setItem("UserId", username);
            sessionStorage.setItem("UserFullName", response[0].Name);
            sessionStorage.setItem("SID", response[0].SessionID);
            sessionStorage.setItem("UserObject", response[0]);
            sessionStorage.setItem("RoleInfo", response[0].RoleInfo);
            let roleInfo = response[0].RoleInfo;
            roleInfo.split(";").forEach(item=>{
              if(item.split(':')[0] === 'Role_ID'){
                sessionStorage.setItem("RoleId", item.split(':')[1]);
              }
            })
            console.log(response[0].RoleInfo);
            //debugger;
            sessionStorage.setItem("profile", response[0].Name);
            this.setState({
              profileName: true,
            });
            sessionStorage.setItem("SID", response[0].SessionID);
            this.setState({
              loggedIn: true,
            });

            const roles = response[0].RoleInfo.split("#");
            let role_data = [];

            let loop = 0;

            for (loop = 0; loop < roles.length; loop++) {
              let rowitem = {};
              rowitem["App_ID"] = roles[loop].split(";")[0].split(":")[1];
              rowitem["App_Name"] = roles[loop].split(";")[1].split(":")[1];
              rowitem["Role_ID"] = roles[loop].split(";")[2].split(":")[1];
              rowitem["Role_Name"] = roles[loop].split(";")[3].split(":")[1];
              rowitem["UserAccessID"] = roles[loop].split(";")[4].split(":")[1];
              // console.log(rowitem);
              role_data.push(rowitem);
              console.log(role_data);
            }

            sessionStorage.setItem("MeteroRollName", role_data["App_Name"]);
            this.setState({
              MeteroRollName: true,
            });
            sessionStorage.setItem("TransitRollName", role_data["App_Name"]);
            // if (role_data.length == 1) {
            //   let app = role_data[0];
            //   if (app["App_Name"] == "MeterO")
            //    return  <Redirect to="/home)" />

            //   else if(app["App_Name"] == "Transit"){
            //     alert('You cant logged sucessfully in meter Entery')
            //   }

            // }
          } else {
            // alert('You CAN not logged sucessfully');
            this.setState({ show: !this.state.show });
          }
        });
      });
    } else {
      // alert("User name and password should not blank")
      // this.setState({ show: !this.state.show })
      this.setState({ loginValidation: !this.state.loginValidation });
    }
  };

  loginErrorModal() {
    this.setState({ show: !this.state.show });
  }

  loginValidationModal() {
    this.setState({ loginValidation: !this.state.loginValidation });
  }
  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/Metero" />;
    }

    return (
      <>
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
                      <form onSubmit={this.submitForm} className="sign-in-form">
                        <div className="mb-3 row">
                          <label className="col-sm-3 col-form-label">
                            User Name
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              className="form-control"
                              id="staticEmail"
                              name="username"
                              placeholder="Username"
                              onChange={(e) => {
                                this.setState({ username: e.target.value });
                              }}
                            />
                            <p>{this.state.userNameError}</p>
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
                              id="inputPassword"
                              name="password"
                              placeholder="Password"
                              onChange={(e) => {
                                this.setState({ password: e.target.value });
                              }}
                            />
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <label className="col-sm-3 col-form-label"></label>
                          <div className="col-sm-9 d-flex  justify-content-between">
                            <div className="form-check remeber-me">
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
                            </div>
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
        <Modal className="text-center" centered show={this.state.show}>
          <Modal.Body className="py-4">
            <a
              className="position-absolute modal-close"
              onClick={() => this.loginErrorModal()}
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
              onClick={() => this.loginValidationModal()}
            >
              <img src={closeIcon} />
            </a>
            <img src={loginError} className="img-fluid py-2" />
            <h4 className=" default-color">Login Status</h4>
            <p>User name and password should not blank</p>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default LoginNew;
