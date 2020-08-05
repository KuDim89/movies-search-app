import React from "react";
import styles from "./Login.module.scss"
import logo from "../../assets/movie-logo.jpg"

const Login = () => {
  return (
      <div className="container px-4 py-5 mx-auto">
          <div className="d-flex flex-lg-row">
            <div className={styles.card_left}>
              <div className="row justify-content-center my-auto">
                <div className="col-md-8 col-10 my-5">
                  <div className="row justify-content-center px-3 mb-3">
                    <img className={styles.logo} id="logo" src={logo} alt="logo" />
                  </div>
                  <h3 className="mb-5 text-center">We are JustWatch</h3>
                  <h6>Please login to your account</h6>
                  <div className="form-group"><label className="form-control-label">Username</label> <input
                      type="text" id="email" name="email" placeholder="Phone number or email id" className="form-control" />
                  </div>
                  <div className="form-group"><label className="form-control-label text-muted">Password</label> <input
                      type="password" id="psw" name="psw" placeholder="Password" className="form-control" /></div>
                  <div className="row justify-content-center my-3 px-3">
                    <button className="btn-secondary btn-block btn-color py-2">Login to JustWatch</button>
                  </div>
                  <div className="row justify-content-center my-2"><a href="#"><small className="text-muted">Forgot
                    Password?</small></a>
                  </div>
                </div>
              </div>
              <div className="bottom text-center mb-5">
                <p className="sm-text mx-auto mb-3">Don't have an account?
                  <button className="btn-secondary btn-color ml-2 py-2 px-3">Create new</button>
                </p>
              </div>
            </div>
            <div className="card card2">
              <div className="my-auto mx-md-5 px-md-5 right">
                <h3>We are more than just a search</h3> <small>Lorem
                ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.</small>
              </div>
            </div>
          </div>
      </div>
  )
}

export default Login;