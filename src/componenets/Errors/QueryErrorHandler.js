import React from "react";

import styles from "./QueryErrorHandler.module.css";

function QueryErrorHandler(result) {
  if (result.isLoading) {
    return <p>Query Loading...</p>;
  }
  if (result.isError) {
    console.error("Query Error: " + result.error.message);
    return <p>Query Error: {result.error.message}</p>;
  }
}

export default QueryErrorHandler;
