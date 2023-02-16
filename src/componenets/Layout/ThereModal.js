import React from "react";
import ReactDOM from "react-dom";
import { c } from "../../functions/utils";
import There from "../../Pages/There";

import styles from "./ThereModal.module.css";

function ThereModal(props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <There onClose={props.onClose} />,
        document.getElementById("modal-root")
      )}
    </React.Fragment>
  );
}

export default ThereModal;
