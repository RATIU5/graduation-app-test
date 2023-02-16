import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import PageTitle from "../componenets/Layout/PageTitle";
import AddManagerForm from "../componenets/Management/Managers/AddManagerForm";
import ManagerList from "../componenets/Management/Managers/ManagerList";
import LoginContext from "../store/login-context";

import styles from "./AddManager.module.css";

function Managers() {
  const loginCtx = useContext(LoginContext);

  return (
    <React.Fragment>
      <PageTitle title="Management" />
      {
        !loginCtx.loggedIn && (
          <Navigate replace to="/" />
        ) /* redirect to home page if not loggedin */
      }
      <AddManagerForm />
      <ManagerList />
    </React.Fragment>
  );
}

export default Managers;
