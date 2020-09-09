import React, {useContext, useState} from "react";
import logo from "../../assets/movie-logo.jpg";
import styles from "./Header.module.scss"
import {useHistory} from "react-router-dom";
import AppContext from "../../context";
import NavigationLinks from "./NavigationLinks";

const Header = (props) => {
  const {appData, setAppData} = useContext(AppContext)
  const [show, setShow] = useState(false)
  const history = useHistory();

  const handleLogout = () => {
    const newAppData = {
      ...appData,
      active: false,
      loginPage: true
    }

    window.localStorage.removeItem('Movies');
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

  const isTrigger = () => {
    setShow(!show)
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
          <div className={`collapse navbar-collapse ${show ? "show" : ""}`} id="navbarSupportedContent">
            <NavigationLinks isTrigger={isTrigger}/>
          </div>

          {appData.loginPage
              ? null
              : <div className="form-inline my-2 my-lg-0">
                {appData.active
                    ? <button
                        className={`btn btn-outline-secondary my-2 my-sm-0 ${styles.padding_right}`}
                        onClick={handleLogout}
                    >Logout</button>
                    : <button
                        className={`btn btn-outline-secondary my-2 my-sm-0 ${styles.padding_right}`}
                        onClick={handleLogin}
                    >Login</button>
                }
              </div>
          }
          <button
              className={`navbar-toggler ${styles.absolute}`}
              onClick={isTrigger}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
      </header>
  )
}

export default Header;