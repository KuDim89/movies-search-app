import React from 'react';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";


const NavigationLinks = ({isAuthentication, ...props}) => {

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
                    className={`nav-link ${isAuthentication ? "" : "disabled"}`}
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
const mapStateToProps = state => {
  return {
    isAuthentication: state.isAuthentication
  }
}
export default connect(mapStateToProps, null)(NavigationLinks);