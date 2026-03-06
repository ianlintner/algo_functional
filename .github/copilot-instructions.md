# Algo Functional — Agent Instructions

## Project Overview

This is a study site for the **Grind 169** LeetCode interview problems, solved in **10 functional programming languages**: TypeScript, Haskell, Elixir, Rust, Scala, OCaml, Clojure, Common Lisp, Scheme, and Unison.

## Architecture

- **Frontend**: React 19 + TypeScript 5.9 + Tailwind CSS 4 + Vite 7
- **Syntax highlighting**: highlight.js with registered languages for all 10 target languages
- **Routing**: react-router-dom v7 with hash-based routing
- **Build**: `npm run build` (tsc + vite build)

## Directory Structure

```
src/
  main.tsx              — App entry point
  App.tsx               — Router and layout
  types.ts              — TypeScript types, Language union, LANG_EXT, LANG_SHORT
  index.css             — Global styles, Catppuccin-inspired hljs theme
  components/
    Header.tsx          — Site header with navigation
    ProblemList.tsx     — Filterable/searchable problem list
    ProblemDetail.tsx   — Single problem view with tabbed language solutions
    CodeBlock.tsx       — highlight.js code renderer with line number gutter
    Matrix.tsx          — Overview matrix of all problems × languages
  data/
    problems.ts         — All 169 problem definitions (id, leetcode #, title, difficulty, acceptance)
    solutions.ts        — All 169 × 8 solution strings (SolutionsRegistry)
solutions/
  typescript/           — 169 .ts files
  haskell/              — 169 .hs files
  elixir/               — 169 .ex files
  rust/                 — 169 .rs files
  scala/                — 169 .scala files
  ocaml/                — 169 .ml files
  clojure/              — 169 .clj files
  lisp/                 — 169 .lisp files
  scheme/              — 169 .scm files
  unison/              — 169 .u files
scripts/
  extract-solutions.ts  — Extracts solution files from solutions.ts registry
```

## Conventions

### Solution Code Style

- All solutions must use a **functional programming style**:
  - Prefer `reduce`, `fold`, `map`, `filter` over imperative loops
  - Prefer immutable data structures
  - Use recursion over mutation
  - Avoid side effects; keep functions pure
- Each solution should be self-contained (no external library imports beyond the language standard library)
- Solutions should be correct and handle edge cases

### Adding a New Problem

1. Add the problem to `src/data/problems.ts` with `id`, `leetcode` number, `title`, `difficulty`, `acceptance`
2. Add solutions for all 10 languages in `src/data/solutions.ts` under the problem's ID
3. Run `npm run extract` to regenerate the individual solution files
4. The site will automatically pick up the new problem via the data arrays

### Adding a New Language

1. Add the language to the `Language` union type in `src/types.ts`
2. Add entries to `LANGUAGES`, `LANG_SHORT`, and `LANG_EXT` in `src/types.ts`
3. Register the language in `src/components/CodeBlock.tsx` (import + hljs.registerLanguage)
4. Add the language directory to `solutions/`
5. Add solutions for all 169 problems

### Code Quality

- Run `npm run lint` (tsc --noEmit) before committing
- Run `npm run build` to verify the production build
- All TypeScript must pass strict type checking
- No `any` types unless absolutely necessary

### File Naming

- Solution files: `NNN-slug.ext` (e.g., `001-two-sum.ts`)
- Problem IDs are sequential 1-169
- Slugs are lowercase, hyphen-separated from the problem title

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build (tsc + vite)
npm run preview   # Preview production build
npm run lint      # Type-check only
npm run extract   # Regenerate solution files from solutions.ts
```
