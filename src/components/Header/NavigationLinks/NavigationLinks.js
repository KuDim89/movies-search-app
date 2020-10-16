import React from 'react';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";


export default function NavigationLinks ({isTrigger}) {

  const isAuthentication = useSelector(state => state.isAuthentication)

  const links = [
    {to: '/movies', label: 'Movies', exact: true},
    {to: '/info', label: 'Info', exact: false}
  ]

  return (
      <ul
          className="navbar-nav"
      >
        {links.map((link, index) => {
          return  (
              <li key={index} className="nav-item my-3">
                <NavLink
                    className={`nav-link ${isAuthentication ? "" : "disabled"}`}
                    to={link.to}
                    exact={link.exact}
                    onClick={isTrigger}
                >{link.label}</NavLink>
              </li>
          )
        })}
      </ul>
  );
};
