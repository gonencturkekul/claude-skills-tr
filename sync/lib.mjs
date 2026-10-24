// Shared helpers for the sync scripts.
//
// Why this exists: the marketplace never copies skill code. It only keeps
// Turkish summaries of each upstream item (a command, or for skills without
// commands a reference topic; see KINDS). These helpers let the scripts (and
// the daily Claude Code routine that runs them) find out which items upstream
// has, read our summary files, and locate the repo's bookkeeping files. Everything uses Node built-ins only, so the routine's cloud VM needs
// no `npm install`.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
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
// as a shape change: stop and let a human decide. The manifest's `license`
// wins when present (plugin.json, or for a plugin without one, such as
// taste-skill, its entry in the upstream marketplace.json; see readUpstream).
// pbakaus/impeccable does not set it, so we fall back to the LICENSE file at
// the upstream repo root (the checkout root).
export function checkLicense(checkoutDir, skill, manifest) {
  let found = typeof manifest.license === 'string' ? manifest.license : null;
  let where = 'manifest "license"';
  if (!found) {
    const file = ['LICENSE', 'LICENSE.md', 'LICENSE.txt'].map((f) => join(checkoutDir, f)).find((f) => existsSync(f));
    if (!file) throw new ShapeError(`no license found upstream (no manifest "license" and no LICENSE file in ${checkoutDir})`);
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

// ---- Skill kinds ----
//
// Not every skill has slash-commands. impeccable ("commands") exposes 24
// subcommands, listed in a metadata file, and we write one summary per
// command. taste-skill ("guide") has no subcommands: Claude invokes it by
// itself, and the skill keeps its knowledge in references/*.md topic files,
// so we write one summary per topic file instead. Everything else (diffing,
// license check, publishing) is the same, so the scripts branch on `kind`
// only where the item list, the summary frontmatter key or the invocation
// differ.
export const KINDS = {
  // `key` is the frontmatter field that names the item in a summary file.
  commands: { key: 'command' },
  guide: { key: 'topic' },
};

// The kind of a skill entry in sync/upstream.json. An unknown kind is a
// mistake in our own config, not an upstream shape change, so plain Error.
export function kindOf(skill) {
  if (!Object.hasOwn(KINDS, skill.kind ?? '')) {
    throw new Error(`skill "${skill.name}": unknown kind "${skill.kind}" (expected ${Object.keys(KINDS).join(' or ')})`);
  }
  return skill.kind;
}

// The upstream file a summary must name in `source`, when the kind fixes it.
// Guide topics are defined BY their file (item id = file basename), so any
// other source would mean the summary describes something else. Command
// summaries point at whichever reference file covers the command: no rule.
export function expectedSource(skill, item) {
  return kindOf(skill) === 'guide' ? `references/${item}.md` : null;
}

// A guide skill's topics: the basenames of <skillDir>/references/*.md.
//
// Why ShapeError on a missing or empty folder: the routine deletes the
// summary of every topic that disappears. If upstream moved or renamed the
// folder, a lenient "no topics" answer would wipe every summary and publish
// that unreviewed. The same name rule as commands keeps an odd file name
// (spaces, capitals) from becoming a broken page anchor.
export function listTopics(skillDir) {
  const dir = join(skillDir, 'references');
  if (!existsSync(dir)) throw new ShapeError(`references folder not found: ${dir}`);
  const names = readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3));
  if (names.length === 0) throw new ShapeError(`references folder has no .md topic files: ${dir}`);
  for (const name of names) {
    if (!COMMAND_NAME.test(name)) throw new ShapeError(`topic file "${name}.md" is not a plain lowercase name (format changed?): ${dir}`);
  }
  return names.sort();
}

// Where an upstream checkout keeps the files our scripts read. All paths come
// from sync/upstream.json (`path` = plugin root, `skillDir` = the folder that
// holds SKILL.md, both relative to the upstream repo root), so no script
// hard-codes impeccable's `<path>/skills/<name>` layout.
export function upstreamFiles(checkoutDir, skill) {
  const pluginDir = join(checkoutDir, skill.path);
  return {
    pluginDir,
    skillDir: join(checkoutDir, skill.skillDir),
    // Only "commands" skills have a metadata file listing their commands.
    metadata: skill.metadataPath ? join(pluginDir, skill.metadataPath) : null,
    pluginJson: join(pluginDir, '.claude-plugin', 'plugin.json'),
    // The upstream repo's own marketplace file. A plugin without plugin.json
    // (taste-skill) keeps its version and license in its entry there.
    marketplace: join(checkoutDir, '.claude-plugin', 'marketplace.json'),
  };
}

// The manifest that describes the upstream plugin: plugin.json when it
// exists, otherwise the upstream marketplace.json entry with the skill's
// name. Claude Code itself uses a marketplace entry as the manifest when a
// plugin has no plugin.json, so this mirrors what users actually install.
function readManifest(files, skill) {
  if (existsSync(files.pluginJson)) return readJson(files.pluginJson);
  if (existsSync(files.marketplace)) {
    const entry = (readJson(files.marketplace).plugins ?? []).find((p) => p && p.name === skill.name);
    if (entry) return entry;
  }
  throw new ShapeError(`no plugin manifest upstream: neither ${files.pluginJson} nor a "${skill.name}" entry in ${files.marketplace}`);
}

// Reads everything check-upstream and record-sync need from an upstream
// checkout, and throws ShapeError if upstream no longer looks the way
// sync/upstream.json says: plugin folder, skill name, item list, manifest,
// license. Both scripts call this, so a run can never record a sync that
// check-upstream would have stopped.
//
// Why check the SKILL.md name: our pages print the invocation
// (`/taste-skill:design-taste-frontend`), and Claude Code builds it from that
// frontmatter `name`. After a rename upstream the page would show a command
// that no longer exists, so a human has to look.
export function readUpstream(checkoutDir, skill) {
  const kind = kindOf(skill);
  const files = upstreamFiles(checkoutDir, skill);
  if (!existsSync(files.pluginDir)) throw new ShapeError(`plugin folder "${skill.path}" not found in upstream`);
  const skillMd = join(files.skillDir, 'SKILL.md');
  if (!existsSync(skillMd)) throw new ShapeError(`SKILL.md not found at ${skillMd}`);
  const name = parseFrontmatter(readFileSync(skillMd, 'utf8')).data.name;
  if (name !== skill.skillName) {
    throw new ShapeError(`SKILL.md name changed: recorded "${skill.skillName}", upstream now "${name}" (${skillMd})`);
  }
  const items = kind === 'guide' ? listTopics(files.skillDir) : listCommands(files.metadata);
  const manifest = readManifest(files, skill);
  checkLicense(checkoutDir, skill, manifest);
  return { files, items, version: manifest.version ?? null };
}

// Word count used to keep summaries short (spec: roughly 100-250 words).
export function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}
