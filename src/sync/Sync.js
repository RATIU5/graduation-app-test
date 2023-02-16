import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

function Sync() {
  const [refresh, setRefresh] = useState(false);

  return (
    <React.Fragment>
      <input
        type="checkbox"
        id="refresh"
        onChange={() => setRefresh((prev) => !prev)}
      />
      <label htmlFor="refresh">Auto Refresh</label>
      {refresh ? <Refresh /> : null}
    </React.Fragment>
  );
}

function Refresh() {
  const queryClient = useQueryClient();

  const refreshTime = 5000;

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("refresh");
      queryClient.refetchQueries();
    }, refreshTime);

    return () => {
      clearInterval(interval);
    };
  }, [queryClient]);

  return <p>Auto Refreshing</p>;
}

export default Sync;
