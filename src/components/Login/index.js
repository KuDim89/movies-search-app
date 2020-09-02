import React, {useContext, useEffect, useState} from "react";
import styles from "./Login.module.scss"
import logo from "./../../assets/movie-logo.jpg"
import {Link, useHistory} from "react-router-dom";
import {getDataCollection, getDataDocument} from "../../utils/api";
import AppContext from "../../context";

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState('');
  const [validate, setValidate] = useState(false);
  const [siteData, setSiteData] = useState('');

  const {appData, setAppData} = useContext(AppContext)
  const history = useHistory();

  useEffect(() => {
    appData.active && history.push("/movies")
    getDataCollection("users").then(setUsers);
    getDataDocument("siteData", "login").then(setSiteData);

    phone.match(/^((8|\+{0,9})[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,10}$/)
    && password.length > 6
    && setValidate(true)

  }, [phone, password])

  const toRegister = () => {
    const newAppData = {
      ...appData,
      loginPage: false
    }
    history.push("/register")
    setAppData(newAppData)
  }

  const checkUser = () => {
    const siteArray = users.slice(0).find(user => user.phone === phone && user.password === password)
    if (siteArray) {
      const newAppData = {
        ...appData,
        active: true,
        loginPage: false
      }
      history.push("/movies")
      setAppData(newAppData)
    }
  }

  return (
      <div className="container px-4 py-5 mx-auto">
        <div className="d-flex flex-lg-row">
          <div className={styles.card_left}>
            <div className="row justify-content-center my-auto">
              <div className="col-md-8 col-10 my-5">
                <div className="row justify-content-center px-3 mb-3">
                  <img className={styles.logo} id="logo" src={logo} alt="logo"/>
                </div>
                <h3 className="mb-5 text-center">{siteData.name}</h3>
                <h6>Please login to your account</h6>

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
                    <label className="form-control-label text-muted">Password</label>
                    <input
                        type="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Password"
                        className={`form-control ${password.length > 6 ? "is-valid" : "is-invalid"}`}
                        onChange={e => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="row justify-content-center my-3 px-3">
                    <button
                        className="btn-secondary btn-block btn-color py-2"
                        onClick={checkUser}
                        disabled={!validate}
                    >Login to JustWatch
                    </button>
                  </div>
                </form>

                <div className="row justify-content-center my-2">
                  <Link to='/forgotPass'>
                    <small className="text-muted">Forgot Password?</small>
                  </Link>
                </div>
              </div>
            </div>
            <div className="bottom text-center mb-5">
              <p className="sm-text mx-auto mb-3">Don't have an account?
                <button
                    className="btn-secondary btn-color ml-2 py-2 px-3"
                    onClick={toRegister}
                >Create new</button>
              </p>
            </div>
          </div>
          <div className={`card ${styles.card_right}`}>
            <div className="my-auto mx-md-5 px-md-5 right">
              <h3>{siteData.title}</h3> <small>{siteData.text}</small>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Login;