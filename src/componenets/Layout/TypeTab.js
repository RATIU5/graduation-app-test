import React from "react";
import { c } from "../../functions/utils";

import styles from "./TypeTab.module.css";

function TypeTab(props) {
  const tabs = props.types.map((type) => {
    return (
      <button
        className={c(
          styles.tab,
          type === props.activeType ? styles.active : ""
        )}
        onClick={() => props.typeChangeHandler(type)}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </button>
    );
  });

  return <div className={styles.tabs}>{tabs}</div>;
}

export default TypeTab;
