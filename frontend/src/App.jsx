<<<<<<< HEAD
import React from "react";
import AIAssistant from "./pages/AIAssistant";

function App() {

  return (
    <AIAssistant />
  );

=======
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import CreateLesson from "./pages/CreateLesson";
import QuizGenerator from "./pages/QuizGenerator";
import Library from "./pages/Library";
import { loadLibrary } from "./services/storage";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [library, setLibrary] = useState(loadLibrary);

  const handleSave = (type, item) => {
    setLibrary((previous) => ({
      ...previous,
      [type]: [item, ...previous[type]],
    }));
  };

  if (currentPage === "create-lesson") {
    return <CreateLesson setCurrentPage={setCurrentPage} onSave={handleSave} />;
  }

  if (currentPage === "quiz") {
    return <QuizGenerator setCurrentPage={setCurrentPage} onSave={handleSave} />;
  }

  if (currentPage === "library") {
    return <Library setCurrentPage={setCurrentPage} library={library} />;
  }

  return <Dashboard setCurrentPage={setCurrentPage} library={library} />;
>>>>>>> 3ab9c81c7f9c689d81e96305d2eb6fdc4aae662d
}

export default App;