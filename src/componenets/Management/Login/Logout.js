import React, { useContext } from "react";
import { c } from "../../../functions/utils";
import LoginContext from "../../../store/login-context";

import styles from "./Logout.module.css";

function Logout() {
  const loginCtx = useContext(LoginContext);

  function formSubmitHandler(e) {
    e.preventDefault();

    loginCtx.onLogout();
  }
  return (
    <form action="" className={styles.logoutForm}>
      <button
        type="submit"
        onClick={formSubmitHandler}
        className={c([styles.logout])}
      >
        Loggout
      </button>
    </form>
  );
}

export default Logout;
