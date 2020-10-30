import React from "react";
import styles from "./Card.module.scss"
import defaultPoster from "../../../assets/poster.jpg"
import {Link} from "react-router-dom";


export default function Card ({cardData}) {
  return (
        <div className="col-12 col-md-6 col-lg-3 col-xl-3 my-4">
          <Link className={styles.tooltip} to={"/movies/" + cardData.imdbID} data-title={cardData.Title}>
          <div
              className={`card ${styles.card_height_width} ${styles.card_padding} ${styles.card_hover}`}
              id={cardData.imdbID}
          >
            <div className="my-1 pt-2">
              <h5
                  className={`card-title ${styles.text_center} ${styles.title_nowrap}`}
              >{cardData.Title} </h5>
            </div>
            <div className={styles.img_container}>
              <img src={cardData.Poster === "N/A" ? defaultPoster : cardData.Poster} className="card-img-top" alt={cardData.Title} />
            </div>
            <p className={`pt-2 ${styles.text_center}`}>{cardData.Year}</p>
          </div>
          </Link>
        </div>
  )
}