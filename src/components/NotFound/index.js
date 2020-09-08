import React from "react";
import styles from "./NotFound.module.scss"

const NotFound = () => {
  return (
      <div className="rows">
        <div className="col-12">
          <h1 className={styles.title}>404 Not Found</h1>
        </div>
      </div>
  )
}

export default NotFound;