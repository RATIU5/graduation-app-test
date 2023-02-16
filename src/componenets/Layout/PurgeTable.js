import React, { useState } from "react";

import styles from "./PurgeTable.module.css";

function PurgeTable(props) {
  const [showConfirm, setShowConfirm] = useState(false);
  function clickClearHandler() {
    setShowConfirm(true);
  }

  function clearHandler() {
    props.onClickClear();

    setShowConfirm(false);
  }

  return (
    <React.Fragment>
      {!showConfirm && (
        <button onClick={clickClearHandler}>Clear all data</button>
      )}
      {showConfirm && (
        <div>
          <h3>Are you sure?</h3>
          <button onClick={clearHandler}>
            Yes, I want to delete all data in this table
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

export default PurgeTable;
