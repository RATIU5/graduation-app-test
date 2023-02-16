import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import styles from "./App.css";

import LoginProvider from "./store/LoginProvider";

import Header from "./componenets/Layout/Header";
import CheckIn from "./Pages/CheckIn";
import People from "./Pages/People";
import FourOhFour from "./Pages/FourOhFour";
import Managers from "./Pages/Managers";
import Sync from "./sync/Sync";
import There from "./Pages/There";
import AddDepartment from "./Pages/AddDepartment";
import ThereModal from "./componenets/Layout/ThereModal";
import { c } from "./functions/utils";

//Development
const PATH = `${process.env.REACT_APP_SERVER_URL}/index.php`;
console.log(PATH);

function App() {
  const [showThereList, setShowThereList] = useState(false);

  return (
    <div className={c("App")}>
      {/* <Sync /> */}
      <LoginProvider>
        {showThereList && (
          <ThereModal onClose={() => setShowThereList((prev) => !prev)} />
        )}

        {!showThereList && (
          <Header onClickThereList={() => setShowThereList((prev) => !prev)} />
        )}

        <main>
          <Routes>
            <Route path="/" element={<CheckIn />} />
            <Route path="check-in" element={<CheckIn />} />
            <Route path="graduates" element={<People />} />
            <Route path="managers" element={<Managers />} />
            <Route path="departments" element={<AddDepartment />} />
            <Route path="there" element={<There />} />
            <Route path="/*" element={<FourOhFour />} />
          </Routes>
        </main>
      </LoginProvider>
    </div>
  );
}

export default App;
