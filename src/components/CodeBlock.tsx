import { useState, useMemo } from "react";
import { Language } from "../types";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import haskell from "highlight.js/lib/languages/haskell";
import elixir from "highlight.js/lib/languages/elixir";
import rust from "highlight.js/lib/languages/rust";
import scala from "highlight.js/lib/languages/scala";
import ocaml from "highlight.js/lib/languages/ocaml";
import clojure from "highlight.js/lib/languages/clojure";
import lisp from "highlight.js/lib/languages/lisp";
import scheme from "highlight.js/lib/languages/scheme";

// Register languages once
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("haskell", haskell);
hljs.registerLanguage("elixir", elixir);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("scala", scala);
hljs.registerLanguage("ocaml", ocaml);
hljs.registerLanguage("clojure", clojure);
hljs.registerLanguage("lisp", lisp);
hljs.registerLanguage("scheme", scheme);

const langMap: Record<Language, string> = {
  TypeScript: "typescript",
  Haskell: "haskell",
  Elixir: "elixir",
  Rust: "rust",
  Scala: "scala",
  OCaml: "ocaml",
  Clojure: "clojure",
  Lisp: "lisp",
  Scheme: "scheme",
  Unison: "haskell",
};

interface Props {
  code: string;
  language: Language;
}

export default function CodeBlock({ code, language }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const lines = useMemo(() => {
    const hljsLang = langMap[language] || "typescript";
    let highlighted: string;
    try {
      highlighted = hljs.highlight(code, { language: hljsLang }).value;
    } catch {
      // Fallback: escape HTML
      highlighted = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }
    const result = highlighted.split("\n");
    // Remove trailing empty line from final newline
    if (result.length > 1 && result[result.length - 1] === "") {
      result.pop();
    }
    return result;
  }, [code, language]);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className={`px-3 py-1 text-xs rounded-md transition ${
            copied
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="code-block-wrapper">
        <pre className="code-block">
          <table className="code-table">
            <tbody>
              {lines.map((line, i) => (
                <tr key={i} className="code-line">
                  <td className="code-line-number">{i + 1}</td>
                  <td
                    className="code-line-content"
                    dangerouslySetInnerHTML={{ __html: line || "\u00a0" }}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </pre>
      </div>
    </div>
  );
}
