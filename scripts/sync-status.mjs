#!/usr/bin/env node
/* Rewrites curriculum.json, setting each lesson's status to "published" when its
   tracks/<track>/<lesson>/docs/en.md exists, otherwise "planned". Keeps the
   compact one-lesson-per-line formatting. Run: npm run sync */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = join(root, "curriculum.json");
const curr = JSON.parse(readFileSync(file, "utf8"));

const esc = (s) => JSON.stringify(s == null ? "" : String(s));
let published = 0, total = 0;

for (const track of curr.tracks || []) {
  for (const lesson of track.lessons || []) {
    total++;
    const p = join(root, "tracks", track.id, lesson.id, "docs", "en.md");
    lesson.status = existsSync(p) ? "published" : "planned";
    if (lesson.status === "published") published++;
  }
}

// Custom serializer to preserve the compact, diff-friendly layout.
let out = "{\n";
out += `  "title": ${esc(curr.title)},\n`;
out += `  "tagline": ${esc(curr.tagline)},\n`;
out += `  "version": ${esc(curr.version)},\n`;
out += `  "tracks": [\n`;
curr.tracks.forEach((track, ti) => {
  out += "    {\n";
  out += `      "id": ${esc(track.id)},\n`;
  out += `      "title": ${esc(track.title)},\n`;
  out += `      "summary": ${esc(track.summary)},\n`;
  out += `      "lessons": [\n`;
  track.lessons.forEach((l, li) => {
    out += `        { "id": ${esc(l.id)}, "title": ${esc(l.title)}, "summary": ${esc(l.summary)}, "status": ${esc(l.status)} }`;
    out += li < track.lessons.length - 1 ? ",\n" : "\n";
  });
  out += "      ]\n";
  out += ti < curr.tracks.length - 1 ? "    },\n" : "    }\n";
});
out += "  ]\n}\n";

writeFileSync(file, out);
console.log(`✓ Synced curriculum.json — ${published}/${total} lessons published.`);
