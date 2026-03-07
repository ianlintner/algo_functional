# Algo Functional

**Grind 169 LeetCode problems solved in 10 functional programming languages.**

A study site with syntax-highlighted, browsable solutions for every problem in the [Grind 169](https://www.techinterviewhandbook.org/grind75?hours=40&weeks=8) set, implemented using a purely functional style.

## Languages

| Language    | Extension | Solutions |
| ----------- | --------- | --------- |
| TypeScript  | `.ts`     | 169       |
| Haskell     | `.hs`     | 169       |
| Elixir      | `.ex`     | 169       |
| Rust        | `.rs`     | 169       |
| Scala       | `.scala`  | 169       |
| OCaml       | `.ml`     | 169       |
| Clojure     | `.clj`    | 169       |
| Common Lisp | `.lisp`   | 169       |
| Scheme      | `.scm`    | 169       |
| Unison      | `.u`      | 169       |

## Totals

1,690 solutions

## Live Site

Visit the deployed site at: [ianlintner.github.io/algo_functional](https://ianlintner.github.io/algo_functional)

## Tech Stack

- **Frontend**: React 19 + TypeScript 5.9 + Tailwind CSS 4 + Vite 7
- **Syntax Highlighting**: highlight.js with Catppuccin-inspired dark theme
- **Routing**: react-router-dom v7 (hash router)
- **CI/CD**: GitHub Actions (build + per-language validation + GitHub Pages deploy)

## Validation Status

- **Production-gated**: site build, TypeScript frontend checks, and the long-established language validation jobs
- **Experimental**: Scheme and Unison are now available throughout the site and extracted solution tree, but their validation jobs are currently non-blocking while those ports are being hand-polished in batches
- **Practical note**: Unison support is present for browsing and iterative improvement, even though full repository-wide typechecking is still a work in progress

## Features

- **Problem List** — filterable by difficulty, language, and search query
- **Problem Detail** — tabbed view switching between all 10 language solutions
- **Code Block** — syntax highlighted with line number gutter
- **Matrix View** — overview grid of all 169 problems × 10 languages

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Type-check
npm run lint

# Extract solution files from registry
npm run extract
```

## Project Structure

```text
src/
  data/problems.ts     — 169 problem definitions
  data/solutions.ts    — All solutions as template literal strings
  components/          — React components (Header, ProblemList, ProblemDetail, CodeBlock, Matrix)
  types.ts             — TypeScript types and language mappings
solutions/
  typescript/          — 169 standalone .ts files
  haskell/             — 169 standalone .hs files
  elixir/              — 169 standalone .ex files
  rust/                — 169 standalone .rs files
  scala/               — 169 standalone .scala files
  ocaml/               — 169 standalone .ml files
  clojure/             — 169 standalone .clj files
  lisp/                — 169 standalone .lisp files
  scheme/              — 169 standalone .scm files
  unison/              — 169 standalone .u files
scripts/
  extract-solutions.ts — Generates standalone files from solutions registry
.github/
  workflows/ci.yml     — CI pipeline: build, validate per-language, deploy
```

## Functional Programming Style

All solutions follow functional programming principles:

- **No imperative loops** — use `reduce`, `fold`, `map`, `filter`
- **Immutable data structures** — avoid mutation
- **Recursion** over iteration
- **Pure functions** — no side effects
- **Self-contained** — standard library only, no external dependencies

## Contributing

1. Add the problem to `src/data/problems.ts`
2. Add solutions for all 10 languages in `src/data/solutions.ts`
3. Run `npm run extract` to regenerate standalone files
4. Run `npm run lint && npm run build` to verify
5. Open a pull request

## License

ISC
