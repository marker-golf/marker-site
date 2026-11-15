// Usage counts for the trust-stats row, fetched from the hub at build time.
//
// Order of preference, first one that yields valid counts wins:
//   1. live response from STATS_URL
//   2. the last good response, saved in CACHE_FILE (restored by actions/cache in CI)
//   3. the committed src/_data/statsFallback.json
//
// A failed fetch never fails the build.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// MARKER_STATS_URL overrides this for local testing only.
const STATS_URL = "https://api.marker.golf/api/public/stats";
const TIMEOUT_MS = 5000;

const here = dirname(fileURLToPath(import.meta.url));
const CACHE_FILE = resolve(here, "../../.cache/public-stats.json");
const FALLBACK_FILE = resolve(here, "statsFallback.json");

const KEYS = ["scorecards", "scores", "golfers", "events"];

// Returns the counts from a response body, or throws if any is missing or not
// a positive integer (a zero would render as "0+").
function parseCounts(body) {
  const data = body?.data;
  const counts = {};
  for (const key of KEYS) {
    const value = data?.[key];
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error(
        `"${key}" is not a positive integer: ${JSON.stringify(value)}`,
      );
    }
    counts[key] = value;
  }
  return counts;
}

// Rounds down to a tidy figure: 11,914 → "11,000+", 2,361 → "2,300+".
function roundDown(n) {
  const step = n >= 10000 ? 1000 : n >= 1000 ? 100 : n >= 100 ? 10 : 1;
  return `${(Math.floor(n / step) * step).toLocaleString("en-US")}+`;
}

async function fetchLive() {
  const url = process.env.MARKER_STATS_URL || STATS_URL;
  const response = await fetch(url, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} from ${url}`);
  const body = await response.json();
  const counts = parseCounts(body);
  try {
    await mkdir(dirname(CACHE_FILE), { recursive: true });
    await writeFile(CACHE_FILE, JSON.stringify(body, null, 2) + "\n");
  } catch (error) {
    console.warn(`[stats] could not save the response: ${error.message}`);
  }
  return counts;
}

async function readSaved(path) {
  return parseCounts(JSON.parse(await readFile(path, "utf8")));
}

async function loadCounts() {
  try {
    return { source: "live", counts: await fetchLive() };
  } catch (error) {
    console.warn(`[stats] live fetch failed: ${error.message}`);
  }
  try {
    return { source: "cache", counts: await readSaved(CACHE_FILE) };
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.warn(`[stats] saved response unusable: ${error.message}`);
    }
  }
  return { source: "fallback", counts: await readSaved(FALLBACK_FILE) };
}

export default async function () {
  const { source, counts } = await loadCounts();
  const stats = Object.fromEntries(
    KEYS.map((key) => [key, roundDown(counts[key])]),
  );
  console.log(`[stats] using ${source} counts: ${JSON.stringify(stats)}`);
  return stats;
}
