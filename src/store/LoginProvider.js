import React, { useState } from "react";
import LoginContext from "./login-context";

function LoginProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);

  function loginHandler(admin = false) {
    setLoggedIn(true);
    setAdmin(admin);
  }
  function logoutHandler() {
    setLoggedIn(false);
  }

  return (
    <LoginContext.Provider
      value={{
        loggedIn: loggedIn, //development!! change to loggedIn before production
        admin: admin, //development!! change to admin before production
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
