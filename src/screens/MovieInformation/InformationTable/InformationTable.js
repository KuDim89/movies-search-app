import React from 'react';
import styles from "./InformationTable.module.scss";

export default function InformationTable({tableData}) {
  return (
      <>
        <span className="text-white">{tableData.title}</span>
        <hr className={`${styles.line} mb-4`}/>
        <div className="row">
          <div className="col-12 mb-4">
            <table className="table table-borderless table-dark">
              <tbody>
              {Object.keys(tableData.data).map((tableField, index) => {
                const rowName = tableField.toString().charAt(0).toUpperCase() + tableField.toString().slice(1);
                return (
                    <tr key={index}>
                      <th scope="row">{rowName}</th>
                      <td>{tableData.data[tableField] === "N/A" ? "No information" : tableData.data[tableField]}</td>
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
