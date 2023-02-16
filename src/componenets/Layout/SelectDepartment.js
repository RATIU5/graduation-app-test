import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "../../functions/databaseFunctions";

import styles from "./SelectDepartment.module.css";
import QueryErrorHandler from "../Errors/QueryErrorHandler";
import LoadingSpinner from "./LoadingSpinner";
import { c } from "../../functions/utils";

function SelectDepartment(props) {
  const departmentsQuery = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });

  function selectDepartmentHandler(e, id) {
    e.preventDefault();
    props.selectDepartment(id);
  }

  if (departmentsQuery.isLoading) return <LoadingSpinner />;

  const sortedDeps = departmentsQuery.data.sort((a, b) => {
    return a.department > b.department ? 1 : -1;
  });

  return (
    <React.Fragment>
      <table className={c(styles.table)}>
        <tbody>
          {sortedDeps.map((dep, i) => {
            return (
              <tr key={i}>
                <td>
                  <button
                    onClick={(e) => selectDepartmentHandler(e, dep.id)}
                    className={c(styles.depBtn)}
                  >
                    {dep.department}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default SelectDepartment;
