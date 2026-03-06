import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import ProblemList from "./components/ProblemList";
import ProblemDetail from "./components/ProblemDetail";
import Matrix from "./components/Matrix";
import { Language } from "./types";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light",
  );
  const [activeLang, setActiveLang] = useState<Language>(
    () => (localStorage.getItem("activeLang") as Language) || "TypeScript",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("activeLang", activeLang);
  }, [activeLang]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="min-h-screen">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<ProblemList />} />
          <Route
            path="/problem/:id"
            element={
              <ProblemDetail
                activeLang={activeLang}
                setActiveLang={setActiveLang}
              />
            }
          />
          <Route path="/matrix" element={<Matrix />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
