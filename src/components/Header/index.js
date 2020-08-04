import React from "react";
import logo from "../../assets/movie-logo.jpg";
import styles from "./style.scss"
import {NavLink} from "react-router-dom";

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
                <NavLink
                    className="nav-link"
                    to='/'
                    exact
                >Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                    className="nav-link"
                    to='/info'
                >Info</NavLink>
              </li>
            </ul>
        </nav>
      </header>
  )
}

export default Header;