import React from "react";
import PageTitle from "../componenets/Layout/PageTitle";
import AddDepartmentForm from "../componenets/Management/Departments/AddDepartmentForm";
import DepartmentList from "../componenets/Management/Departments/DepartmentList";

import styles from "./AddDepartment.module.css";

function AddDepartment() {
  return (
    <React.Fragment>
      <PageTitle title="Departments" />
      <AddDepartmentForm />
      <DepartmentList />
    </React.Fragment>
  );
}

export default AddDepartment;
