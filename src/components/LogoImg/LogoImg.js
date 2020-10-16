import React from 'react';
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import styles from './LogoImg.module.scss'
import logo from "./assets/movie-logo.jpg";


export default function LogoImg ({additionalClasses, width, borderRadius}) {

  const isAuthentication = useSelector(state => state.isAuthentication)

  const classes = [additionalClasses, styles.link].filter(el => {
    return el != null;
  });

  const css = {
    width: `${width}rem`,
    borderRadius: `${borderRadius}px`
  }

  const history = useHistory();

  const handleMovies = () => {
    history.push("/movies")
  }

  const handleRevert = () => {
    history.push("/")
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
