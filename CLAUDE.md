# CLAUDE.md — Claude Code Instructions

## Project

**Algo Functional**: Grind 169 LeetCode problems solved in 10 functional languages.
React 19 + TypeScript 5.9 + Tailwind 4 + Vite 7.

## Quick Reference

- `npm run dev` — dev server
- `npm run build` — production build (tsc + vite)
- `npm run lint` — type-check (tsc --noEmit)
- `npm run extract` — regenerate solution files from solutions.ts

## Key Files

- `src/data/problems.ts` — 169 problem definitions
- `src/data/solutions.ts` — 169 × 8 solution strings (very large file, ~18k lines)
- `src/types.ts` — Language type, LANGUAGES, LANG_EXT, LANG_SHORT
- `src/components/CodeBlock.tsx` — highlight.js renderer with line numbers
- `scripts/extract-solutions.ts` — extracts solutions to `solutions/<lang>/` dirs

## Rules

1. **Functional style only**: no imperative loops, prefer reduce/fold/map/filter, immutability, recursion, pure functions
2. **All 10 languages**: TypeScript, Haskell, Elixir, Rust, Scala, OCaml, Clojure, Lisp, Scheme, Unison
3. **Self-contained solutions**: no external dependencies beyond standard library
4. **Strict TypeScript**: no `any`, pass `tsc --noEmit` with strict mode
5. **When adding problems**: update both `problems.ts` and `solutions.ts`, then run `npm run extract`
6. **Solution files**: `NNN-slug.ext` format in `solutions/<lang>/`
7. **Test before committing**: `npm run lint && npm run build`

## Architecture Notes

- Solutions are stored as template literal strings in `solutions.ts` keyed by problem ID
- The extraction script creates standalone files with metadata headers in language-appropriate comment syntax
- highlight.js handles syntax highlighting with Catppuccin-inspired themed CSS classes in `index.css`
- CI validates solutions per-language (Rust: `rustc`, Haskell: `ghc`, etc.)
