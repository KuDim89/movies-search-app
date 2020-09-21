import React from "react";
import styles from "./Loader.module.scss"

const Loader = () => {
  return (
      <div className={styles.loader_container}>
        <div className={`d-flex justify-content-center ${styles.width_height}`}>
          <div className="spinner-border"/>
        </div>
      </div>
  )
}

export default Loader;

