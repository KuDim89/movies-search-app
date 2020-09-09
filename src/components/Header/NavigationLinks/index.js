import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import AppContext from "../../../context";

const NavigationLinks = (props) => {
  const context = useContext(AppContext)
  const links = [
    {to: '/movies', label: 'Movies', exact: true},
    {to: '/info', label: 'Info', exact: false},
  ]

  return (
      <ul
          className="navbar-nav"
      >
        {links.map((link, index) => {
          return  (
              <li key={index} className="nav-item my-3">
                <NavLink
                    className={`nav-link ${context.appData.active ? "" : "disabled"}`}
                    to={link.to}
                    exact={link.exact}
                    onClick={props.isTrigger}
                >{link.label}</NavLink>
              </li>
          )
        })}
      </ul>
  );
};

export default NavigationLinks;