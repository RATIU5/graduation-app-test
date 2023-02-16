import React, { useContext, useState } from "react";

import PersonList from "../componenets/Management/People/PersonList";
import AddPersonForm from "../componenets/Management/People/AddPersonForm";

import styles from "./People.module.css";
import LoginContext from "../store/login-context";
import { Navigate } from "react-router-dom";
import TypeTab from "../componenets/Layout/TypeTab";
import PageTitle from "../componenets/Layout/PageTitle";

function People() {
  const loginCtx = useContext(LoginContext);
  const [type, setType] = useState("student");

  function typeChangeHandler(value) {
    setType(value);
  }

  return (
    <section className={styles.people}>
      <PageTitle title="Attendees" />

      {!loginCtx.loggedIn && (
        <Navigate replace to="/" /* redirect to home page if not loggedin */ />
      )}

      <TypeTab
        types={["student", "faculty"]}
        activeType={type}
        typeChangeHandler={typeChangeHandler}
      />

      <AddPersonForm type={type} />

      <PersonList type={type} />
    </section>
  );
}

export default People;
