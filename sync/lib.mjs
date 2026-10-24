// Shared helpers for the sync scripts.
//
// Why this exists: the marketplace never copies skill code. It only keeps
// Turkish summaries of each upstream command. These helpers let the scripts
// (and the daily Claude Code routine that runs them) find out which commands
// upstream has, read our summary files, and locate the repo's bookkeeping
// files. Everything uses Node built-ins only, so the routine's cloud VM needs
// no `npm install`.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Thrown when upstream no longer looks the way our scripts expect (metadata
// moved, renamed or reformatted). The routine must stop and open an issue
// instead of guessing, so this is a distinct type with its own exit code (2).
export class ShapeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ShapeError';
  }
}

// Default marketplace repo root = the folder above sync/.
export const DEFAULT_REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

// Upstream impeccable lists its user-facing commands as the keys of
// command-metadata.json, each mapped to `{ description, argumentHint }`. We
// need exactly one Turkish summary per key.
//
// Why the strict checks: the routine deletes the summary of every command
// that vanishes from this file and then publishes without review. If upstream
// wrapped the map (`{"commands": {...}}`) or emptied it, a loose "is it an
// object?" check would report every command as removed and the routine would
// wipe all summaries. Anything that does not look exactly like the format we
// know is a shape change, so the run stops and a human looks.
const COMMAND_NAME = /^[a-z0-9-]+$/;
export function listCommands(metadataFile) {
  if (!existsSync(metadataFile)) {
    throw new ShapeError(`command metadata not found: ${metadataFile}`);
  }
  let data;
  try {
    data = readJson(metadataFile);
  } catch (err) {
    throw new ShapeError(`command metadata is not valid JSON: ${metadataFile} (${err.message})`);
  }
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    throw new ShapeError(`command metadata is not a JSON object: ${metadataFile}`);
  }
  const names = Object.keys(data);
  if (names.length === 0) throw new ShapeError(`command metadata has no commands: ${metadataFile}`);
  for (const name of names) {
    if (!COMMAND_NAME.test(name)) {
      throw new ShapeError(`command metadata key "${name}" is not a command name (format changed?): ${metadataFile}`);
    }
    const entry = data[name];
    if (entry === null || typeof entry !== 'object' || Array.isArray(entry) || typeof entry.description !== 'string') {
      throw new ShapeError(`command metadata entry "${name}" has no string "description" (format changed?): ${metadataFile}`);
    }
  }
  return names.sort();
}

// A full git commit SHA. Used to validate `--head`, which the routine passes
// by hand (from the GitHub API) when it could only download a tarball. A typo
// or a ref name like "HEAD" would otherwise be recorded as documentedCommit.
export const FULL_SHA = /^[0-9a-f]{40}$/;

// Recognisable first lines of license files, mapped to SPDX ids. Kept tiny on
// purpose: it only has to recognise licenses of skills we list; anything else
// is reported as "unrecognised" and stops the run for a human to check.
const LICENSE_PATTERNS = [
  [/Apache License\s+Version 2\.0/i, 'Apache-2.0'],
  [/^\s*MIT License/i, 'MIT'],
  [/GNU GENERAL PUBLIC LICENSE\s+Version 3/i, 'GPL-3.0'],
  [/BSD 3-Clause License/i, 'BSD-3-Clause'],
];

// Throws ShapeError unless upstream's license still equals the one recorded
// in sync/upstream.json (`skill.license`).
//
// Why: we show the license on our pages, and a license change upstream may
// change whether and how we can point people at the skill. The spec treats it
// as a shape change: stop and let a human decide. plugin.json's `license`
// wins when present; pbakaus/impeccable does not set it, so we fall back to
// the LICENSE file at the upstream repo root (the checkout root).
export function checkLicense(checkoutDir, skill, pluginJson) {
  let found = typeof pluginJson.license === 'string' ? pluginJson.license : null;
  let where = 'plugin.json "license"';
  if (!found) {
    const file = ['LICENSE', 'LICENSE.md', 'LICENSE.txt'].map((f) => join(checkoutDir, f)).find((f) => existsSync(f));
    if (!file) throw new ShapeError(`no license found upstream (no plugin.json "license" and no LICENSE file in ${checkoutDir})`);
    const text = readFileSync(file, 'utf8').slice(0, 2000);
    const hit = LICENSE_PATTERNS.find(([re]) => re.test(text));
    if (!hit) throw new ShapeError(`upstream license file ${file} is not a license we recognise`);
    found = hit[1];
    where = file;
  }
  if (found !== skill.license) {
    throw new ShapeError(`upstream license changed: recorded "${skill.license}", upstream now "${found}" (from ${where})`);
  }
  return found;
}

// Summary files start with a tiny `key: value` frontmatter block. We only need
// flat string values, so a full YAML parser would be dead weight.
export function parseFrontmatter(md) {
  const text = md.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (!match) return { data: {}, body: text };
  const data = {};
  for (const line of match[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { data, body: text.slice(match[0].length) };
}

// Minimal CLI flag parser: `--name value` pairs, repeated flags keep the last.
export function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) out[key] = true;
      else out[key] = argv[++i];
    }
  }
  return out;
}

export function paths(repo) {
  return {
    marketplace: join(repo, '.claude-plugin', 'marketplace.json'),
    upstream: join(repo, 'sync', 'upstream.json'),
    docs: (skill) => join(repo, 'docs', 'tr', skill),
  };
}

export function findSkill(repo, name) {
  const skill = readJson(paths(repo).upstream).skills.find((s) => s.name === name);
  if (!skill) throw new Error(`skill "${name}" not found in sync/upstream.json`);
  return skill;
}

// Where an upstream checkout keeps its command metadata and plugin manifest.
export function upstreamFiles(checkoutDir, skill) {
  const pluginDir = join(checkoutDir, skill.path);
  return {
    pluginDir,
    metadata: join(pluginDir, skill.metadataPath),
    pluginJson: join(pluginDir, '.claude-plugin', 'plugin.json'),
  };
}

// Word count used to keep summaries short (spec: roughly 100-250 words).
export function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}
