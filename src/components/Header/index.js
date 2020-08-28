import React, {useContext} from "react";
import logo from "../../assets/movie-logo.jpg";
import styles from "./Header.module.scss"
import {NavLink, useHistory} from "react-router-dom";
import AppContext from "../../context";

const Header = (props) => {
  const {appData, setAppData} = useContext(AppContext)
  const history = useHistory();

  const handleLogout = () => {
    const newAppData = {
      ...appData,
      active: false,
      loginPage: true
    }
    history.push("/")
    setAppData(newAppData);
  }

  const handleLogin = () => {
    const newAppData = {
      ...appData,
      active: false,
      loginPage: true
    }
    history.push("/")
    setAppData(newAppData);
  }

  const handleMovies = () => {
    history.push("/movies")
  }

  const handleRevert = () => {
    const newAppData = {
      ...appData,
      active: false,
      loginPage: true
    }
    history.push("/")
    setAppData(newAppData);
  }

  return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a
              className={`navbar-brand ${styles.link}`}
              onClick={appData.active ? handleMovies : handleRevert}
          >
            <img className={styles.header_logo} src={logo} alt="logo"/>
            {props.text}
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item my-3">
                <NavLink
                    className={`nav-link ${appData.active ? "" : "disabled"}`}
                    to='/movies'
                    exact
                >Movies</NavLink>
              </li>
              <li className="nav-item my-3">
                <NavLink
                    className={`nav-link ${appData.active ? "" : "disabled"}`}
                    to='/info'
                >Info</NavLink>
              </li>
            </ul>
          </div>

          {appData.loginPage
              ? null
              : <div className="form-inline my-2 my-lg-0">
                {appData.active
                    ? <button
                        className="btn btn-outline-secondary my-2 my-sm-0"
                        onClick={handleLogout}
                    >Logout</button>
                    : <button
                        className="btn btn-outline-secondary my-2 my-sm-0"
                        onClick={handleLogin}
                    >Login</button>
                }
              </div>
          }

          <button className="navbar-toggler">
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
      </header>
  )
}

export default Header;