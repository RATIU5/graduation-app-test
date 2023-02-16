import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { AddDepartment } from "../../../functions/databaseFunctions";

import { c } from "../../../functions/utils";
import styles from "./AddDepartmentForm.module.css";

function AddDepartmentForm() {
  const queryClient = useQueryClient();
  const departmentMutation = useMutation({
    mutationFn: AddDepartment,
    onSuccess: () => queryClient.fetchQuery(["getDepartments"]),
  });

  const departmentRef = useRef();

  function formSubmitHandler(e) {
    e.preventDefault();

    if (departmentRef.current.value.length < 4) return;

    departmentMutation.mutate({ name: departmentRef.current.value });
  }
  return (
    <form action="" className={c("dataForm")}>
      <input
        id="dep"
        type="text"
        placeholder="department name"
        ref={departmentRef}
        className={c("input")}
      />

      <button
        type="submit"
        onClick={formSubmitHandler}
        className={c("input", "coolBtn")}
      >
        Add
      </button>
    </form>
  );
}

export default AddDepartmentForm;
