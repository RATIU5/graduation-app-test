import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getDepartment,
  removeGraduate,
} from "../../../functions/databaseFunctions";

import { c } from "../../../functions/utils";
import styles from "./PersonItem.module.css";
import LoadingSpinner from "../../Layout/LoadingSpinner";

function PersonItem(props) {
  const queryClient = useQueryClient();
  const removeStudentMutation = useMutation({
    mutationFn: removeGraduate,
    onSuccess: () => queryClient.fetchQuery(["getGraduates"]),
  });

  const graduate = props.graduate;
  const departmentQuery = useQuery({
    queryKey: ["getDepartment", graduate.departmentId],
    queryFn: () => getDepartment(graduate.departmentId),
    enabled: !!graduate,
  });

  if (departmentQuery.isLoading) return <LoadingSpinner />;

  function removeStudentHandler(e) {
    e.preventDefault();
    removeStudentMutation.mutate({ id: graduate.id });
  }

  return (
    <div className={c("item", "grid-container-inline")}>
      <div className={c("itemField")}>
        <strong>
          {graduate.firstName} {graduate.lastName}
        </strong>
      </div>
      <div className={c("itemField")}>{departmentQuery.data?.department}</div>
      {+graduate.platinum ? (
        <div className={c("itemField")}>Platinum Performer</div>
      ) : null}
      <button
        onClick={removeStudentHandler}
        className={c("coolBtn", "itemField")}
      >
        Remove
      </button>
    </div>
  );
}

export default PersonItem;
