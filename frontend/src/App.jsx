import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import CreateLesson from "./pages/CreateLesson";
import QuizGenerator from "./pages/QuizGenerator";
import AIAssistant from "./pages/AIAssistant";
import Library from "./pages/Library";
import { loadLibrary } from "./services/storage";
import Login from "./pages/Login";
import { isSupabaseConfigured, supabase } from "./services/supabase";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [library, setLibrary] = useState(loadLibrary);
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [libraryError, setLibraryError] = useState("");

  useEffect(() => {
    if (!supabase) return undefined;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
      if (data.session) loadUserLibrary(data.session.user.id);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setAuthLoading(false);
      if (nextSession) loadUserLibrary(nextSession.user.id);
      else setLibrary({ lessons: [], quizzes: [] });
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const loadUserLibrary = async (userId) => {
    setLibraryLoading(true);
    setLibraryError("");
    try {
      setLibrary(await loadLibrary(userId));
    } catch (error) {
      setLibraryError(error.message);
    } finally {
      setLibraryLoading(false);
    }
  };

  const handleSave = (type, item) => {
    setLibrary((previous) => ({
      ...previous,
      [type]: [item, ...previous[type]],
    }));
  };

  const handleSignOut = async () => {
    await supabase?.auth.signOut();
    setCurrentPage("dashboard");
  };

  if (authLoading) {
    return <div className="app-loading">Loading your workspace...</div>;
  }

  if (!session) {
    return <Login />;
  }

  if (currentPage === "create-lesson") {
    return <CreateLesson setCurrentPage={setCurrentPage} onSave={handleSave} userId={session.user.id} />;
  }

  if (currentPage === "quiz") {
    return <QuizGenerator setCurrentPage={setCurrentPage} onSave={handleSave} userId={session.user.id} />;
  }

  if (currentPage === "assistant") {
    return <AIAssistant setCurrentPage={setCurrentPage} />;
  }

  if (currentPage === "library") {
    return <Library setCurrentPage={setCurrentPage} library={library} />;
  }

  return <Dashboard setCurrentPage={setCurrentPage} library={library} libraryLoading={libraryLoading} libraryError={libraryError} onSignOut={handleSignOut} user={session.user} />;
}

export default App;