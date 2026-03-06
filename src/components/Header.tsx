import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMatrix = location.pathname === "/matrix";

  return (
    <header className="sticky top-0 z-50 bg-indigo-700 dark:bg-indigo-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-14 gap-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
          >
            <rect width="28" height="28" rx="6" fill="rgba(255,255,255,0.2)" />
            <text
              x="5"
              y="21"
              fontSize="18"
              fill="white"
              fontFamily="monospace"
              fontWeight="bold"
            >
              λ
            </text>
          </svg>
          <span className="hidden sm:inline">Algo Functional</span>
        </button>

        <div className="flex-1" />

        <nav className="flex gap-1" aria-label="Main navigation">
          <button
            onClick={() => navigate("/")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
              !isMatrix
                ? "bg-white/20 text-white"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            Problems
          </button>
          <button
            onClick={() => navigate("/matrix")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
              isMatrix
                ? "bg-white/20 text-white"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            Matrix
          </button>
        </nav>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-white/10 transition text-xl"
          aria-label="Toggle dark/light mode"
          title="Toggle theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}
