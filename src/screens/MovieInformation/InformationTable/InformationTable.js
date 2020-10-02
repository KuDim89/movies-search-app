import React from 'react';
import styles from "./InformationTable.module.scss";

const InformationTable = (props) => {
  return (
      <>
        <span className="text-white">{props.tableData.title}</span>
        <hr className={`${styles.line} mb-4`}/>
        <div className="row">
          <div className="col-12 mb-4">
            <table className="table table-borderless table-dark">
              <tbody>
              {Object.keys(props.tableData.data).map((tableField, index) => {
                const rowName = tableField.toString().charAt(0).toUpperCase() + tableField.toString().slice(1);
                return (
                    <tr key={index}>
                      <th scope="row">{rowName}</th>
                      <td>{props.tableData.data[tableField] === "N/A" ? "No information" : props.tableData.data[tableField]}</td>
                    </tr>
                )
              })}
              </tbody>
            </table>
          </div>
        </div>


      </>
  );
};

export default InformationTable;