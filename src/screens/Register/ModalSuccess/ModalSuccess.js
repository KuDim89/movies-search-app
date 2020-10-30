import React from "react";
import styles from "./ModuleSuccess.module.scss"

export default function ModalSuccess () {
  return (
      <div className={styles.modal_success}>
        <div className="modal-dialog" role="document">
          <div className={`modal-content ${styles.border}`}>
            <div className={`modal-header ${styles.border_header}`}>
              <h5 className="modal-title">Success</h5>
            </div>
            <div className="modal-body">
              <p>Your account created successfully</p>
            </div>
          </div>
        </div>
      </div>
  )
}