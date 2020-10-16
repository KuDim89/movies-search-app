import React from 'react';
import styles from './ButtonBurger.module.scss'

export default function ButtonBurger({isTrigger}) {

  return (
      <button
          className={`navbar-toggler ${styles.button_burger}`}
          onClick={isTrigger}
      >
        <span className="navbar-toggler-icon"/>
      </button>
  );
};