import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PROBLEMS } from "../data/problems";
import { SOLUTIONS } from "../data/solutions";
import { LANGUAGES, type Language } from "../types";
import CodeBlock from "./CodeBlock";

interface Props {
  activeLang: Language;
  setActiveLang: (l: Language) => void;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ProblemDetail({ activeLang, setActiveLang }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const problemId = Number(id);
  const problem = PROBLEMS.find((p) => p.id === problemId);
  const sol = SOLUTIONS[problemId] || {};

  const [currentLang, setCurrentLang] = useState<Language>(() => {
    if (sol[activeLang]) return activeLang;
    return LANGUAGES.find((l) => sol[l]) || "TypeScript";
  });

  if (!problem) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400">Problem not found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-indigo-600 hover:underline"
        >
          Back to Problems
        </button>
      </div>
    );
  }

  const handleLangChange = (lang: Language) => {
    setCurrentLang(lang);
    setActiveLang(lang);
  };

  const hasSolutions = LANGUAGES.some((l) => sol[l]);

  // Navigate to prev/next
  const prevId = problemId > 1 ? problemId - 1 : null;
  const nextId = problemId < 169 ? problemId + 1 : null;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/")}
          className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
        >
          ← Back to Problems
        </button>
        <div className="flex-1" />
        {prevId && (
          <button
            onClick={() => navigate(`/problem/${prevId}`)}
            className="text-sm text-gray-500 hover:text-indigo-600 transition"
          >
            ← Prev
          </button>
        )}
        {nextId && (
          <button
            onClick={() => navigate(`/problem/${nextId}`)}
            className="text-sm text-gray-500 hover:text-indigo-600 transition"
          >
            Next →
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs text-gray-400 mb-1">
              Grind #{problem.id} · LeetCode #{problem.leetcode}
            </div>
            <h1 className="text-2xl font-bold">{problem.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`badge-${problem.difficulty} px-3 py-1 rounded-full text-sm font-semibold`}
            >
              {problem.difficulty}
            </span>
            <a
              href={`https://leetcode.com/problems/${slugify(problem.title)}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Open on LeetCode ↗
            </a>
          </div>
        </div>
        <div className="text-sm text-gray-500 mt-2">
          Acceptance: {problem.acceptance}
        </div>
      </div>

      {/* Language tabs */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-800">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLangChange(lang)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition border-b-2 ${
                currentLang === lang
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              } ${!sol[lang] ? "opacity-40" : ""}`}
              disabled={false}
            >
              {lang}
              {sol[lang] && <span className="ml-1 text-emerald-500">✓</span>}
            </button>
          ))}
        </div>
        <div className="p-4">
          {sol[currentLang] ? (
            <CodeBlock code={sol[currentLang]!} language={currentLang} />
          ) : (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-2">🚧</div>
              <p>Solution not yet available in {currentLang}.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
