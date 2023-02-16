import React from "react";

import styles from "./PredictionItem.module.css";

function PredictionItem(props) {
  const person = props.person;

  function clickHandler() {
    props.clickHandler(person);
  }

  return (
    <div onClick={clickHandler}>
      <h4>{person.firstName + " " + person.lastName}</h4>
    </div>
  );
}

export default PredictionItem;
