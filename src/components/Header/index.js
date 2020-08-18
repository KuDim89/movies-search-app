import React, {useContext, useEffect, useState} from "react";
import logo from "../../assets/movie-logo.jpg";
import styles from "./Header.module.scss"
import {NavLink, useHistory } from "react-router-dom";
import AppContext from "../../context";

const Header = (props) => {
  const {appActive, setAppActive} = useContext(AppContext);
  const {loginPage, setLoginPage} = useContext(AppContext)

  const currentLocation = window.location.pathname;
  const history = useHistory();

  useEffect(() => {
    if(currentLocation  === '/') {
      setLoginPage(true)
    }
  })

  const handleLogout = () => {
    history.push("/")
    setAppActive(false);
  }

  const handleLogin = () => {
    history.push("/")
  }

  console.log("appActive", appActive)
  console.log("loginPage", loginPage)
  return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <a
                  className={`navbar-brand ${styles.link}`}
                  onClick={handleLogin}
              >
                <img className={styles.header_logo} src={logo} alt="logo"/>
                {props.text}
              </a>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
              <li className="nav-item my-3">
                <NavLink
                    className={`nav-link ${!appActive ? "disabled" : ""}`}
                    to='/movies'
                    exact
                >Movies</NavLink>
              </li>
              <li className="nav-item my-3">
                <NavLink
                    className={`nav-link ${!appActive ? "disabled" : ""}`}
                    to='/info'
                >Info</NavLink>
              </li>
            </ul>
              </div>
          {loginPage
          ? <div className="form-inline my-2 my-lg-0">
              {appActive
                 ? <button
                     className="btn btn-outline-secondary my-2 my-sm-0"
                     onClick={handleLogout}
                  >Logout</button>
                 :<button
                   className="btn btn-outline-secondary my-2 my-sm-0"
                   onClick={handleLogin}
                 >Login</button>
              }
              </div>
          : null
          }

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
     </header>
  )
}

export default Header;