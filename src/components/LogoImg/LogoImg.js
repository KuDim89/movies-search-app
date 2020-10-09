import React from 'react';
import styles from './LogoImg.module.scss'
import logo from "./assets/movie-logo.jpg";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {logout, showLoginPage} from "../../redux/actions";


const LogoImg = ( props, {isAuthentication, logout, showLoginPage}) => {
  const classes = [props.additionalClasses, styles.link].filter(el => {
    return el != null;
  });

  const css = {
    width: `${props.width}rem`,
    borderRadius: `${props.borderRadius}px`
  }

  const history = useHistory();

  const handleMovies = () => {
    history.push("/movies")
  }

  const handleRevert = () => {
    history.push("/")
    logout()
    showLoginPage()
  }

  return (
      <span
          className={classes.join(' ')}
          onClick={isAuthentication ? handleMovies : handleRevert}
      >
      <img className={styles.border} style={css} src={logo} alt="logo"/>
      </span>
  );
};

const mapStateToProps = state => {
  return {
    isAuthentication: state.isAuthentication.active,
  }
}

const mapDispatchToProps = {
  logout,
  showLoginPage
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoImg);