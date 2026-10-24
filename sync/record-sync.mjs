#!/usr/bin/env node
// Records in sync/upstream.json that our Turkish docs now match a given
// upstream commit: the commit SHA, the plugin version, the command list and
// the date.
//
// Why: the next run diffs from `documentedCommit`, validate.mjs checks
// summaries against `commands`, and the website shows `version`/`syncedAt`.
// The routine calls this only AFTER the summaries are regenerated, so a failed
// run never marks upstream as "documented".
//
// Usage:
//   node sync/record-sync.mjs --skill <name> --upstream <checkoutDir> --date YYYY-MM-DD [--repo <dir>]
import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { DEFAULT_REPO, listCommands, parseArgs, paths, readJson, upstreamFiles } from './lib.mjs';

export function recordSync(repo, skillName, checkoutDir, date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date ?? '')) throw new Error('--date must be YYYY-MM-DD');
  const file = paths(repo).upstream;
  const data = readJson(file);
  const skill = data.skills.find((s) => s.name === skillName);
  if (!skill) throw new Error(`skill "${skillName}" not found in sync/upstream.json`);
  const files = upstreamFiles(checkoutDir, skill);
  skill.documentedCommit = execFileSync('git', ['-C', checkoutDir, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  skill.version = readJson(files.pluginJson).version ?? skill.version;
  skill.commands = listCommands(files.metadata);
  skill.syncedAt = date;
  writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
  return skill;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = parseArgs(process.argv.slice(2));
  try {
    const repo = typeof args.repo === 'string' ? args.repo : DEFAULT_REPO;
    console.log(JSON.stringify(recordSync(repo, args.skill, args.upstream, args.date), null, 2));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
