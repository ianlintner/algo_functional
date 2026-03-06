#!/usr/bin/env npx tsx
/**
 * Extract all solutions from the solutions registry into individual code files.
 * Usage: npx tsx scripts/extract-solutions.ts
 *
 * Outputs to: solutions/<language>/<NNN>-<slug>.<ext>
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { SOLUTIONS } from "../src/data/solutions";
import { PROBLEMS } from "../src/data/problems";
import { LANGUAGES, LANG_EXT, type Language } from "../src/types";

const ROOT = join(import.meta.dirname, "..");
const OUT = join(ROOT, "solutions");

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const langDir: Record<Language, string> = {
  TypeScript: "typescript",
  Haskell: "haskell",
  Elixir: "elixir",
  Rust: "rust",
  Scala: "scala",
  OCaml: "ocaml",
  Clojure: "clojure",
  Lisp: "lisp",
};

let created = 0;
let skipped = 0;

for (const lang of LANGUAGES) {
  const dir = join(OUT, langDir[lang]);
  mkdirSync(dir, { recursive: true });
}

for (const prob of PROBLEMS) {
  const solMap = SOLUTIONS[prob.id];
  if (!solMap) {
    console.warn(`⚠ No solutions found for problem ${prob.id}: ${prob.title}`);
    continue;
  }
  const slug = slugify(prob.title);
  const prefix = String(prob.id).padStart(3, "0");

  for (const lang of LANGUAGES) {
    const code = solMap[lang];
    if (!code || code.trim().length === 0) {
      skipped++;
      continue;
    }
    const ext = LANG_EXT[lang];
    const filename = `${prefix}-${slug}.${ext}`;
    const dir = join(OUT, langDir[lang]);
    const filepath = join(dir, filename);

    // Add header comment with problem metadata
    const commentStyle = getCommentStyle(lang);
    const header = formatHeader(commentStyle, prob, lang);

    writeFileSync(filepath, header + code.trimEnd() + "\n", "utf-8");
    created++;
  }
}

console.log(`✓ Created ${created} solution files in ${OUT}`);
if (skipped > 0) console.log(`⚠ Skipped ${skipped} empty solutions`);

type CommentStyle = { start: string; end: string; line: string };

function getCommentStyle(lang: Language): CommentStyle {
  switch (lang) {
    case "TypeScript":
    case "Rust":
    case "Scala":
      return { start: "/**", end: " */", line: " * " };
    case "Haskell":
      return { start: "{-", end: "-}", line: "  " };
    case "Elixir":
      return { start: "#", end: "#", line: "# " };
    case "OCaml":
      return { start: "(*", end: "*)", line: "  " };
    case "Clojure":
    case "Lisp":
      return { start: ";;", end: ";;", line: ";; " };
  }
}

function formatHeader(
  cs: CommentStyle,
  prob: (typeof PROBLEMS)[0],
  lang: Language,
): string {
  if (cs.start === "#" || cs.start === ";;") {
    // Line-comment languages
    const p = cs.line;
    return [
      `${p}Problem ${prob.id}: ${prob.title} (LeetCode ${prob.leetcode})`,
      `${p}Difficulty: ${prob.difficulty}`,
      `${p}Language: ${lang}`,
      `${p}`,
      "",
    ].join("\n");
  }
  return [
    cs.start,
    `${cs.line}Problem ${prob.id}: ${prob.title} (LeetCode ${prob.leetcode})`,
    `${cs.line}Difficulty: ${prob.difficulty}`,
    `${cs.line}Language: ${lang}`,
    cs.end,
    "",
  ].join("\n");
}
