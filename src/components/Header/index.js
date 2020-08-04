import React from "react";
import logo from "../../assets/movie-logo.jpg";
import styles from "./style.scss"

const Header = (props) => {
  return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand">
            <img src={logo} alt="logo"/>
            {props.text}
          </a>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link"
                >Home</a>
              </li>
              <li className="nav-item">
                <a
                    className="nav-link"
                >Info</a>
              </li>
            </ul>
        </nav>
      </header>
  )
}

export default Header;