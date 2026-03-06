import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { PROBLEMS } from "../data/problems";
import { SOLUTIONS, SOLVED_IDS } from "../data/solutions";
import {
  LANGUAGES,
  LANG_SHORT,
  type Difficulty,
  type Language,
} from "../types";

export default function ProblemList() {
  const [search, setSearch] = useState("");
  const [diffFilter, setDiffFilter] = useState<Difficulty | "all">("all");
  const [langFilter, setLangFilter] = useState<Language | "all">("all");

  const filtered = useMemo(() => {
    return PROBLEMS.filter((p) => {
      if (diffFilter !== "all" && p.difficulty !== diffFilter) return false;
      if (langFilter !== "all") {
        const sol = SOLUTIONS[p.id];
        if (!sol || !sol[langFilter]) return false;
      }
      if (search) {
        const q = search.toLowerCase();
        if (
          !p.title.toLowerCase().includes(q) &&
          !String(p.leetcode).includes(q)
        )
          return false;
      }
      return true;
    });
  }, [search, diffFilter, langFilter]);

  const solvedCount = SOLVED_IDS.size;
  const totalSolutions = [...SOLVED_IDS].reduce((sum, id) => {
    const sol = SOLUTIONS[id] || {};
    return sum + LANGUAGES.filter((l) => sol[l]).length;
  }, 0);

  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-8 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Grind 169 — Functional Style
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          All 169 Grind LeetCode problems solved using purely functional
          patterns across {LANGUAGES.length} languages.
        </p>
        <div className="flex justify-center gap-6 mt-6">
          {[
            { num: "169", label: "Problems" },
            { num: String(LANGUAGES.length), label: "Languages" },
            { num: String(solvedCount), label: "Solved" },
            { num: String(totalSolutions), label: "Solutions" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {s.num}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 mb-6 space-y-3">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or LeetCode number…"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Difficulty
          </span>
          {(["all", "Easy", "Med", "Hard"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDiffFilter(d)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition ${
                diffFilter === d
                  ? d === "all"
                    ? "bg-indigo-600 text-white"
                    : d === "Easy"
                      ? "bg-emerald-600 text-white"
                      : d === "Med"
                        ? "bg-amber-500 text-white"
                        : "bg-red-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {d === "all" ? "All" : d}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Language
          </span>
          {LANGUAGES.map((l) => (
            <button
              key={l}
              onClick={() => setLangFilter(langFilter === l ? "all" : l)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition ${
                langFilter === l
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {LANG_SHORT[l]}
            </button>
          ))}
        </div>
      </div>

      {/* Results info */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {filtered.length === PROBLEMS.length
          ? `Showing all ${PROBLEMS.length} problems`
          : `Showing ${filtered.length} of ${PROBLEMS.length} problems`}
      </p>

      {/* Problem grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-2">🔍</div>
          <p>No problems match your filters.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((p) => {
            const sol = SOLUTIONS[p.id] || {};
            return (
              <Link
                key={p.id}
                to={`/problem/${p.id}`}
                className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition group"
              >
                <span className="text-xs text-gray-400 w-8 text-right font-mono">
                  #{p.id}
                </span>
                <span className="text-xs text-gray-400 w-10 text-right font-mono">
                  {p.leetcode}
                </span>
                <span className="flex-1 font-medium text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                  {p.title}
                </span>
                <span
                  className={`badge-${p.difficulty} px-2 py-0.5 rounded text-xs font-semibold`}
                >
                  {p.difficulty}
                </span>
                <div className="flex gap-0.5">
                  {LANGUAGES.map((lang) => (
                    <div
                      key={lang}
                      className={`w-2 h-2 rounded-full ${
                        sol[lang]
                          ? "bg-emerald-500"
                          : "bg-gray-300 dark:bg-gray-700"
                      }`}
                      title={`${lang}${sol[lang] ? " ✓" : ""}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400 w-12 text-right">
                  {p.acceptance}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
