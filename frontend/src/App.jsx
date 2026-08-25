import React, { useState } from "react";

import Dashboard from "./pages/Dashboard";
import CreateLesson from "./pages/CreateLesson";

function App() {

  const [currentPage, setCurrentPage] = useState("dashboard");


  /*
  =========================================================
  PAGE SWITCHING

  We are NOT using React Router.

  React state decides which page appears.
  =========================================================
  */

  if (currentPage === "create-lesson") {

    return (
      <CreateLesson
        setCurrentPage={setCurrentPage}
      />
    );

  }


  /*
  =========================================================
  DASHBOARD
  =========================================================
  */

  return (
    <Dashboard
      setCurrentPage={setCurrentPage}
    />
  );

}

export default App;