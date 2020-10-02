import React from 'react';
import styles from './ButtonBurger.module.scss'

const ButtonBurger = (props) => {

  return (
      <button
          className={`navbar-toggler ${styles.button_burger}`}
          onClick={props.isTrigger}
      >
        <span className="navbar-toggler-icon"/>
      </button>
  );
};

export default ButtonBurger;