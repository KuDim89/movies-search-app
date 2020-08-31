import React from "react";
import styles from "./Modal.module.scss"

const Modal = (props) => {

  return (
      <div className="col-12">
        <div className={`modal d-block ${styles.background}`}>
          <div className={`modal-dialog ${styles.center}`}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{props.error}</h5>
                <button
                    type="button"
                    className="close"
                    onClick={props.closeModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{props.text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Modal;