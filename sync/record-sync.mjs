#!/usr/bin/env node
// Records in sync/upstream.json that our Turkish docs now match a given
// upstream commit: the commit SHA, the plugin version, the item list
// (commands, reference topics for a "guide" skill, bundled skills for a
// "collection", always [] for a "single" skill) and the date.
//
// Why: the next run diffs from `documentedCommit`, validate.mjs checks
// summaries against `items`, and the website shows `version`/`syncedAt`.
// The routine calls this only AFTER the summaries are regenerated, so a failed
// run never marks upstream as "documented".
//
// Usage:
//   node sync/record-sync.mjs --skill <name> --upstream <checkoutDir> --date YYYY-MM-DD [--head <sha>] [--repo <dir>]
//   --head: only for a checkout WITHOUT git history (tarball fallback). Pass
//   the full 40-char head SHA from the GitHub API instead of reading it from
//   git, so the no-git path still goes through this script rather than a
//   hand-edited upstream.json.
import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { DEFAULT_REPO, FULL_SHA, parseArgs, paths, readJson, readUpstream } from './lib.mjs';

const USAGE = 'usage: node sync/record-sync.mjs --skill <name> --upstream <checkoutDir> --date YYYY-MM-DD [--head <sha>] [--repo <dir>]';

export function recordSync(repo, skillName, checkoutDir, date, { head } = {}) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date ?? '')) throw new Error('--date must be YYYY-MM-DD');
  if (head !== undefined && !FULL_SHA.test(head)) throw new Error(`--head must be a full 40-character commit SHA, got "${head}"`);
  const file = paths(repo).upstream;
  const data = readJson(file);
  const skill = data.skills.find((s) => s.name === skillName);
  if (!skill) throw new Error(`skill "${skillName}" not found in sync/upstream.json`);
  // Same reader and checks as check-upstream: the version comes from
  // plugin.json, or from the upstream marketplace.json entry when the plugin
  // has none (taste-skill), or from the place `versionFrom` names for a plain
  // skill repo without any manifest (archify, playwright-cli). If upstream
  // changed shape since the check, this throws and nothing is recorded.
  const { items, version } = readUpstream(checkoutDir, skill);
  skill.documentedCommit = head ?? execFileSync('git', ['-C', checkoutDir, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  skill.version = version ?? skill.version;
  skill.items = items;
  skill.syncedAt = date;
  writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
  return skill;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = parseArgs(process.argv.slice(2));
  // Fail early with the expected flags instead of a confusing error later
  // (e.g. `skill "undefined" not found`).
  if (typeof args.skill !== 'string' || typeof args.upstream !== 'string') {
    console.error(USAGE);
    process.exit(1);
  }
  try {
    const repo = typeof args.repo === 'string' ? args.repo : DEFAULT_REPO;
    const head = args.head === undefined ? undefined : String(args.head);
    console.log(JSON.stringify(recordSync(repo, args.skill, args.upstream, args.date, { head }), null, 2));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
