import React, {useContext} from 'react';
import styles from './LogoImg.module.scss'
import logo from "./assets/movie-logo.jpg";
import {useHistory} from "react-router-dom";
import AppContext from "../../context";

const LogoImg = (props) => {
  const classes = [props.additionalClasses, styles.link].filter(el => {
    return el != null;
  });

  const css = {
    width: `${props.width}rem`,
    borderRadius: `${props.borderRadius}px`
  }

  const {appData, setAppData} = useContext(AppContext)
  const history = useHistory();

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
      <span
          className={classes.join(' ')}
          onClick={appData.active ? handleMovies : handleRevert}
      >
      <img className={styles.border} style={css} src={logo} alt="logo"/>
      </span>
  );
};

export default LogoImg;