export type Difficulty = "Easy" | "Med" | "Hard";

export type Language =
  | "TypeScript"
  | "Haskell"
  | "Elixir"
  | "Rust"
  | "Scala"
  | "OCaml"
  | "Clojure"
  | "Lisp"
  | "Scheme"
  | "Unison";

export const LANGUAGES: Language[] = [
  "TypeScript",
  "Haskell",
  "Elixir",
  "Rust",
  "Scala",
  "OCaml",
  "Clojure",
  "Lisp",
  "Scheme",
  "Unison",
];

export const LANG_SHORT: Record<Language, string> = {
  TypeScript: "TS",
  Haskell: "HS",
  Elixir: "EX",
  Rust: "RS",
  Scala: "SC",
  OCaml: "ML",
  Clojure: "CJ",
  Lisp: "LS",
  Scheme: "SCM",
  Unison: "UNI",
};

export const LANG_EXT: Record<Language, string> = {
  TypeScript: "ts",
  Haskell: "hs",
  Elixir: "ex",
  Rust: "rs",
  Scala: "scala",
  OCaml: "ml",
  Clojure: "clj",
  Lisp: "lisp",
  Scheme: "scm",
  Unison: "u",
};

export interface Problem {
  id: number;
  leetcode: number;
  title: string;
  difficulty: Difficulty;
  acceptance: string;
}

export type SolutionMap = Partial<Record<Language, string>>;
export type SolutionsRegistry = Record<number, SolutionMap>;

export interface AppState {
  theme: "light" | "dark";
  activeLang: Language;
  diffFilter: Difficulty | "all";
  langFilter: Language | "all";
  searchQuery: string;
}
