#!/usr/bin/env node
/* Validates curriculum.json: structure, unique ids, and that every lesson marked
   "published" has a docs/en.md file on disk. Run: npm run validate */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];

let curr;
try {
  curr = JSON.parse(readFileSync(join(root, "curriculum.json"), "utf8"));
} catch (e) {
  console.error("✗ Cannot read/parse curriculum.json:", e.message);
  process.exit(1);
}

if (!Array.isArray(curr.tracks)) errors.push("`tracks` must be an array.");

const trackIds = new Set();
let lessonCount = 0, publishedCount = 0;

for (const track of curr.tracks || []) {
  if (!track.id) errors.push("A track is missing `id`.");
  if (trackIds.has(track.id)) errors.push(`Duplicate track id: ${track.id}`);
  trackIds.add(track.id);
  if (!track.title) warnings.push(`Track ${track.id} missing title.`);

  const lessonIds = new Set();
  for (const lesson of track.lessons || []) {
    lessonCount++;
    if (!lesson.id) errors.push(`Track ${track.id} has a lesson missing \`id\`.`);
    if (lessonIds.has(lesson.id)) errors.push(`Duplicate lesson id ${lesson.id} in ${track.id}`);
    lessonIds.add(lesson.id);
    if (!lesson.title) warnings.push(`Lesson ${track.id}/${lesson.id} missing title.`);

    const status = lesson.status || "planned";
    if (!["published", "planned", "draft"].includes(status))
      warnings.push(`Lesson ${track.id}/${lesson.id} has unknown status "${status}".`);

    if (status === "published") {
      publishedCount++;
      const p = join(root, "tracks", track.id, lesson.id, "docs", "en.md");
      if (!existsSync(p))
        errors.push(`Published lesson ${track.id}/${lesson.id} has no file at tracks/${track.id}/${lesson.id}/docs/en.md`);
    }
  }
}

for (const w of warnings) console.warn("⚠ " + w);
for (const e of errors) console.error("✗ " + e);

if (errors.length) {
  console.error(`\n✗ Validation failed: ${errors.length} error(s).`);
  process.exit(1);
}
console.log(`✓ curriculum.json OK — ${curr.tracks.length} tracks, ${lessonCount} lessons (${publishedCount} published).`);
