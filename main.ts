// One Line of Earned Pride — make.fun entry
// u-mang-one-line-of-earned-pride-a0138557
//
// The program writes a single line of text (1-240 characters) to
// /output/entry.txt. The house judge reads entries two at a time and picks
// the line that makes it feel the most genuine, earned pride, weighing:
//
//   1. genuine earned pride — a quiet moment for someone in a scene, a small
//      person doing something hard, or a long effort finally landing
//   2. a concrete scene with a real person, seen happening, not summarised
//   3. pride earned inside the line by effort or difficulty the reader can
//      feel — never asserted, congratulated, or explained
//   4. it lands in one read — the pride arrives by the last word
//   5. freshness — no stock trophy, podium, or graduation
//
// This program holds a shortlist of candidate lines, ranked best-first by
// those criteria, and writes the first one that passes every gate the
// competition seals: UTF-8 text, 1-240 characters, not only white space,
// a single line, and free of the stock images the judge brief names.
// The choice is fully deterministic: the grader runs this program twice
// and both runs write the same bytes.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// ---------------------------------------------------------------------------
// Candidates, ranked best first. Each was written for this entry: a concrete
// person, a scene you can see, a long effort landing, and a last word that
// lets the pride arrive instead of announcing it.
// ---------------------------------------------------------------------------

const CANDIDATES: string[] = [
  // 1. Twenty years of carrying bricks for other men's houses, and the
  // morning his own roof goes on. The contrast does the earning; the
  // final image — sitting on the ridge, watching the sun come up over
  // his own street — is the pride, arriving at the last word.
  "For twenty years Yusuf carried bricks for other men's houses; the morning his own roof went on, he climbed the ladder, drove in the last nail, and sat on the ridge to watch the sun come up over his street.",

  // 2. Eleven failed harvests, one green shoot. The pride is in staying
  // kneeling a little longer than needed — felt, never said.
  "After eleven failed harvests, the farmer pressed his palm into the wet soil, felt the first green shoot push back against his hand, and stayed kneeling there a little longer than he needed to.",

  // 3. Seventy-three, one needle, one kebaya. A lifetime of sewing lands
  // in a single quiet gesture at the window.
  "At seventy-three, Ibu Sari threaded the needle on her first try, finished the last stitch on her granddaughter's wedding kebaya, and held it up to the window light without saying a word.",

  // 4. A small person, a heavy bucket, a hill. The gentleness at the end
  // is the whole point of the climb.
  "Mira, eight, carried the bucket up the hill without spilling a drop, and when she reached her grandmother's door she set it down gently, like it was something precious.",
];

// Last resort: short, plain, and always valid, so the program never
// crashes on the grader and leaves /output/entry.txt empty. It is only
// reached if every ranked candidate above somehow fails the gate.
const LAST_RESORT =
  "The night-shift nurse finished her last round, hung up her coat, and walked home as the bakery lights came on.";

// Words and images the judge brief calls stock. A candidate carrying one
// is not fresh, so it never leaves this program.
const STOCK_IMAGES: RegExp[] = [
  /\btrophy\b/i,
  /\bpodium\b/i,
  /\bgraduation\b/i,
  /\bchampion\b/i,
  /\bcongratulations\b/i,
  /\bso proud of\b/i,
  /\bmedal\b/i,
];

// The sealed gate: 1 to 240 characters, not only white space. Characters
// are counted as code points, the way a reader counts them.
const MIN_CHARS = 1;
const MAX_CHARS = 240;

function isValidEntry(line: string): boolean {
  if (typeof line !== "string") return false;
  // One line only: no line breaks, no leading or trailing white space.
  if (line !== line.trim()) return false;
  if (/[\r\n]/.test(line)) return false;
  const chars = [...line].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) return false;
  if (line.trim().length === 0) return false;
  // Must be valid UTF-8 round-trippable text.
  if (Buffer.from(line, "utf8").toString("utf8") !== line) return false;
  for (const stock of STOCK_IMAGES) {
    if (stock.test(line)) return false;
  }
  return true;
}

function pickEntry(): string {
  for (const candidate of CANDIDATES) {
    if (isValidEntry(candidate)) return candidate;
  }
  if (isValidEntry(LAST_RESORT)) return LAST_RESORT;
  throw new Error("no candidate line passes the entry gate");
}

function main(): void {
  // The grader mounts the writable output directory at /output and tells
  // the program through MAKEFUN_OUTPUT_DIR; locally, pass it yourself,
  // e.g. MAKEFUN_OUTPUT_DIR=out node main.ts
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const entry = pickEntry();
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, entry, "utf8");
  // Read back and confirm the exact bytes landed before reporting success:
  // a grader run that writes nothing valid is a lost entry.
  const written = readFileSync(target, "utf8");
  if (written !== entry) {
    throw new Error("entry.txt did not round-trip as written");
  }
  console.log(`wrote ${[...entry].length} characters to ${target}`);
  console.log(entry);
}

main();
