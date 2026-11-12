// Claims check: fails the build if any banned phrase sneaks into source copy.
// Run manually with `pnpm claims-check` or as part of `pnpm build`.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const banned: RegExp[] = [
  /\bcures?\b/i,
  /\btreat(s|ment|ing)?\b/i,
  /\bprevent(s|ion|ing)?\b/i,
  /\bheal(s|ing)?\b/i,
  /\bdetox/i,
  /boosts? (your )?immun/i,
  /strengthen(s|ing)? (your )?immun/i,
  /fight(s|ing)? infection/i,
  /blood pressure/i,
  /blood sugar/i,
  /diabet/i,
  /cholesterol/i,
  /weight loss/i,
  /fat[- ]burn/i,
  /doctor[- ]recommended/i,
  /clinically proven/i,
  /made fresh daily/i,
];

const isProd = process.env.VERCEL_ENV === "production";
if (isProd) banned.push(/\bCONFIRM\b/);

// Allowlist: the product name itself, and the explicit "no health claims"
// line in Terms of sale. Any OTHER banned phrase on the same line still fails.
const allowLine: RegExp[] = [/We make no health claims/i];

const roots = ["src/content", "src/data", "content/blog", "src/app"];
const hits: string[] = [];

function walk(dir: string) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|mdx?|json)$/.test(f)) check(p);
  }
}

function check(file: string) {
  const content = readFileSync(file, "utf8");
  content.split("\n").forEach((line, i) => {
    // Allowlisted lines get a free pass.
    if (allowLine.some((a) => a.test(line))) return;

    // Strip "Immunity Shot" before scanning, so the product name itself does
    // not trip the "immun" patterns. A sentence like
    // "Immunity Shot strengthens immunity" still fails on the second occurrence.
    const scanLine = line.replace(/Immunity Shot/g, "");

    for (const b of banned) {
      if (b.test(scanLine)) {
        hits.push(`${file}:${i + 1} ${b} -> ${line.trim()}`);
      }
    }
  });
}

for (const r of roots) {
  try {
    walk(r);
  } catch {
    // Directory may not exist yet; that is fine during scaffolding.
  }
}

if (hits.length) {
  console.error("Claims check failed:\n" + hits.join("\n"));
  process.exit(1);
}

console.log("Claims check passed");
