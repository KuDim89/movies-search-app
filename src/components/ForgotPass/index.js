import React, {useContext, useEffect, useState} from "react";
import styles from "../Login/Login.module.scss";
import logo from "../../assets/movie-logo.jpg";
import {useHistory} from "react-router-dom";
import {getData} from "../../utils/api";
import AppContext from "../../context";

const ForgotPass = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState('');
  const [validate, setValidate] = useState(false);
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [isAlertSuccess, setIsAlertSuccess] = useState(false);
  const [isAlertDanger, setIsAlertDanger] = useState(false);

  const {appData, setAppData} = useContext(AppContext)
  const history = useHistory();

  useEffect(() => {
    getData("users").then(setUsers);

    const newAppData = {
      ...appData,
      active: false,
      loginPage: false
    }
    setAppData(newAppData);

    if (phone.match(/^((8|\+{0,9})[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,10}$/)
        && email.match(/.+@.+..+/i)) {
      setValidate(true)
    }

  }, [phone, email])

  const toLogin = () => {
    history.push("/")
  }

  const toRegister = () => {
    history.push("/register")
  }

  const sendPassword = (event) => {
    event.preventDefault()
    const siteArray = users.slice(0).find(user => user.phone === phone && user.email === email)
    if (siteArray) {
      setName(siteArray.name);
      setSurname(siteArray.surname);
      setPassword(siteArray.password);
      setIsAlertSuccess(true);
      setIsAlertDanger(false);
    } else {
      setIsAlertDanger(true);
      setIsAlertSuccess(false);
    }
  }

  return (
      <div className="container px-4 py-5 mx-auto">
        <div className={`d-flex flex-lg-row ${styles.flex_direction_column}`}>
          <div className={styles.card_left}>
            <div className="row justify-content-center my-auto">
              <div className="col-md-8 col-10 my-5">
                <div className="row justify-content-center px-3 mb-3">
                  <img className={styles.logo} id="logo" src={logo} alt="logo"/>
                </div>
                <h3 className="mb-5 text-center">We are JustWatch helpers</h3>
                <h6>Please enter your phone and email</h6>

                <form>
                  <div className="form-group">
                    <label className="form-control-label text-muted">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        placeholder="+385619086171"
                        className={`form-control ${phone.match(/^((8|\+{0,9})[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{12,13}$/) ? "is-valid" : "is-invalid"}`}
                        onChange={e => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-control-label text-muted">Email</label>
                    <input
                        type="email"
                        name="email"
                        className={`form-control ${email.match(/.+@.+..+/i) ? "is-valid" : "is-invalid"}`}
                        onChange={e => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="row justify-content-center my-3 px-3">
                    <button
                        className="btn-secondary btn-block btn-color py-2"
                        onClick={sendPassword}
                        disabled={!validate}
                    >Send me password
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
          <div className="card py-5 px-5">
            <div className="my-auto mx-md-5 px-md-5">
              <h3>If you forgot password</h3>
              <small>Lorem
                ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.</small>
              <> {isAlertSuccess && validate && (
                  <div>
                    <div className="alert alert-success my-3">
                      {name.charAt(0).toUpperCase() + name.slice(1)} {surname.charAt(0).toUpperCase() + surname.slice(1)} your
                      password:&nbsp;
                      <b>{password}</b>
                    </div>
                    <button
                        className="btn-secondary btn-block btn-color py-2"
                        onClick={toLogin}
                    >Go to Login page
                    </button>
                  </div>
                )}
              </>
              <> {isAlertDanger && validate && (
                  <div>
                    <div className="alert alert-danger my-3">
                      We don't know your phone number or mail. Please fill form correct.
                    </div>
                    <button
                        className="btn-secondary btn-block btn-color py-2"
                        onClick={toRegister}
                    >Go to Register page
                    </button>
                  </div>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ForgotPass;