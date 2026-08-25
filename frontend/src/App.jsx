import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import CreateLesson from "./pages/CreateLesson";
import QuizGenerator from "./pages/QuizGenerator";
import AIAssistant from "./pages/AIAssistant";
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

  if (currentPage === "assistant") {
    return <AIAssistant setCurrentPage={setCurrentPage} />;
  }

  if (currentPage === "library") {
    return <Library setCurrentPage={setCurrentPage} library={library} />;
  }

  return <Dashboard setCurrentPage={setCurrentPage} library={library} />;
}

export default App;