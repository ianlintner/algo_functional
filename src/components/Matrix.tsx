import { Link } from "react-router-dom";
import { PROBLEMS } from "../data/problems";
import { SOLUTIONS, SOLVED_IDS } from "../data/solutions";
import { LANGUAGES, LANG_SHORT } from "../types";

export default function Matrix() {
  let totalSolved = 0;
  SOLVED_IDS.forEach((id) => {
    const sol = SOLUTIONS[id] || {};
    totalSolved += LANGUAGES.filter((l) => sol[l]).length;
  });
  const totalCells = PROBLEMS.length * LANGUAGES.length;
  const pct = ((totalSolved / totalCells) * 100).toFixed(1);

  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-8 py-6">
        <h1 className="text-3xl font-bold">Solution Matrix</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          All 169 problems × {LANGUAGES.length} languages — coverage at a
          glance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { num: PROBLEMS.length, label: "Problems" },
          { num: LANGUAGES.length, label: "Languages" },
          { num: totalSolved, label: "Solutions" },
          { num: `${pct}%`, label: "Coverage" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center"
          >
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {s.num}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Matrix table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="text-left p-3 font-semibold sticky left-0 bg-white dark:bg-gray-900 z-10">
                Problem
              </th>
              {LANGUAGES.map((l) => (
                <th
                  key={l}
                  className="p-3 font-semibold text-center whitespace-nowrap"
                >
                  <span className="sm:hidden">{LANG_SHORT[l]}</span>
                  <span className="hidden sm:inline">{l}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROBLEMS.map((p) => {
              const sol = SOLUTIONS[p.id] || {};
              return (
                <tr
                  key={p.id}
                  className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                >
                  <td className="p-2 sticky left-0 bg-white dark:bg-gray-900 z-10">
                    <Link
                      to={`/problem/${p.id}`}
                      className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                    >
                      <span className="text-xs text-gray-400 font-mono w-6 text-right">
                        {p.id}
                      </span>
                      <span
                        className={`badge-${p.difficulty} px-1.5 py-0.5 rounded text-[10px] font-semibold`}
                      >
                        {p.difficulty}
                      </span>
                      <span className="truncate max-w-[200px] sm:max-w-none text-xs">
                        {p.title}
                      </span>
                    </Link>
                  </td>
                  {LANGUAGES.map((lang) => (
                    <td key={lang} className="p-2 text-center">
                      {sol[lang] ? (
                        <span
                          className="text-emerald-500 font-bold"
                          title={`${lang} ✓`}
                        >
                          ✓
                        </span>
                      ) : (
                        <span
                          className="text-gray-300 dark:text-gray-700"
                          title={`${lang} — not yet`}
                        >
                          ○
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
