import React from "react";
import styles from "./Register.module.scss";
import logo from "../../assets/movie-logo.jpg";

const Register = () => {
  return (
      <div className="container px-4 py-5 mx-auto">
        <div className="d-flex flex-lg-row">
          <div className={styles.register}>
            <div className="row justify-content-center my-auto">
              <div className="col-12">
                <div className="row justify-content-center px-3 mb-3">
                  <img className={styles.logo} id="logo" src={logo} alt="logo" />
                </div>
                <h3 className="mb-5 text-center">We are JustWatch</h3>

                <div className="form-group">
                  <div className="row justify-content-center my-auto">
                    <div className="col-6">
                      <label className="form-control-label">Name</label>
                      <input type="text" id="email" name="name" className="form-control" />
                    </div>
                    <div className="col-6">
                      <label className="form-control-label">Username</label>
                      <input type="text" id="email" name="name" className="form-control" />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-control-label">Email</label>
                  <input type="text" id="email" name="email" className="form-control" />
                </div>

                <div className="form-group">
                  <label className="form-control-label">Password</label>
                  <input type="password" id="psw" name="psw" placeholder="6+ characters" className="form-control" />
                </div>

                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Creating an account means you’re okay with our
                    <a href="#" className="text-muted"><b> Terms of Service</b></a>,
                    <a href="#" className="text-muted"><b> Privacy Policy</b></a>, and our default
                    <a href="#" className="text-muted"><b> Notification Settings</b></a>.
                  </label>
                </div>

                <div className="row justify-content-center my-3 px-3">
                  <button className="btn-secondary btn-block btn-color py-2">Create Account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Register;