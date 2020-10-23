import React, {useEffect, useState} from "react";
import styles from "./ErrorModal.module.scss"
import {defineErrorText} from "./service.js";

export default function Modal({error, closeModal}) {

  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    setErrorText(defineErrorText(error));
  })

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
                      {error}
                    </div>
                  </div>
                </div>
                <button
                    type="button"
                    className={`close ${styles.outline}`}
                    onClick={closeModal}
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