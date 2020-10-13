import React, {useEffect, useState} from "react";
import styles from "./ErrorModal.module.scss"

const Modal = (props) => {

  const objectErrorText = {
    MOVIE_NOT_FOUND: "Movie not found!",
    TOO_MANY_RESULTS: "Too many results.",
    INCORRECT_IMDB_ID: "Incorrect IMDb ID.",
    REQUEST_LIMIT_REACHED: "Request limit reached!"
  }

  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    defineErrorText(props.error);
  })

  const defineErrorText = (error) => {
    switch (error) {
      case objectErrorText.MOVIE_NOT_FOUND :
        setErrorText("It looks like there aren't any great matches for your search. Change your keywords and try again.")
        break;
      case objectErrorText.TOO_MANY_RESULTS :
        setErrorText("Your word very short or it's only symbols. We find too many coincidences. Please enter more longer word without symbols.")
        break;
      case objectErrorText.INCORRECT_IMDB_ID :
        setErrorText("We got incorrect movie id. Please try again later.")
        break;
      case objectErrorText.REQUEST_LIMIT_REACHED :
        setErrorText("Please accept our apologies and visit us tomorrow.")
        break;
      default:
        setErrorText("We have problems. Please try again later.")
    }
  }

  return (
      <div className="col-12">
        <div className={`modal d-block ${styles.background}`}>
          <div className={`modal-dialog ${styles.center}`}>
            <div className="modal-content">
              <div className="modal-header">
                <div className={styles.title_wrapper}>
                  <div className="list-group-item list-group-item-danger h5">
                    <div className="d-flex list-group-item-error py-2">
                      <div>&mdash; &nbsp;</div>
                      {props.error}
                    </div>
                  </div>
                </div>
                <button
                    type="button"
                    className={`close ${styles.outline}`}
                    onClick={props.closeModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{errorText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Modal;