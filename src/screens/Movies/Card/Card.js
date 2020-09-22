import React from "react";
import styles from "./Card.module.scss"
import defaultPoster from "../../../assets/poster.jpg"
import {Link} from "react-router-dom";


const Card = (props) => {
  return (
      <div className="col-12 col-md-6 col-lg-3 col-xl-3 my-4">
        <div
            className={`card ${styles.card_height_width} ${styles.card_padding} ${styles.card_hover}`}
            id={props.cardData.imdbID}
        >
          <div className="card-body">
            <h5
                className={`card-title ${styles.text_center} ${styles.nowrap}`}
                title={props.cardData.Title}
            >{props.cardData.Title} </h5>
          </div>
          <div className={styles.img_container}>
            <img src={props.cardData.Poster === "N/A" ? defaultPoster : props.cardData.Poster} className="card-img-top" alt={props.cardData.Title} />
          </div>
          <ul className="list-group list-group-flush">
            <li className={`list-group-item ${styles.text_center}`}>{props.cardData.Year}</li>
          </ul>
          <div className="card-body">
            <Link to={"/movies/" + props.cardData.imdbID}>
              <button className="btn-secondary btn-block btn-color py-2">View more</button>
            </Link>
          </div>
        </div>
      </div>
  )
}

export default Card;