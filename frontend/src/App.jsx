import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";

function App() {
  // Keeps track of which page we want to show
  const [currentPage, setCurrentPage] = useState("dashboard");

  // For now, we are only building the dashboard.
  // The other pages will be added later.
  return (
    <Dashboard
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
}

export default App;