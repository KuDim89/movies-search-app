import React from 'react';
import styles from "./Poster.module.scss";
import defaultPoster from "../../../assets/poster.jpg";

const Poster = (props) => {
  return (
      <div className={styles.img_wrapper}>
        <img className="mb-5"
             src={props.poster === "N/A" ? defaultPoster : props.poster}
             alt={props.title}/>
      </div>
  );
};

export default Poster;