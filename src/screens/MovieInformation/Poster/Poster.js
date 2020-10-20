import React from 'react';
import styles from "./Poster.module.scss";
import defaultPoster from "../../../assets/poster.jpg";

export default function Poster ({poster, title}) {
  return (
      <div className={styles.img_wrapper}>
        <img className="mb-5"
             src={poster === "N/A" ? defaultPoster : poster}
             alt={title}/>
      </div>
  );
};

