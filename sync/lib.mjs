// Shared helpers for the sync scripts.
//
// Why this exists: the marketplace never copies skill code. It only keeps
// Turkish summaries of each upstream item (a command, a reference topic, or
// one skill of a multi-skill plugin; see KINDS). These helpers let the
// scripts (and the daily Claude Code routine that runs them) find out which
// items upstream has, read our summary files, and locate the repo's
// bookkeeping files. Everything uses Node built-ins only, so the routine's
// cloud VM needs no `npm install`.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative, basename, isAbsolute } from 'node:path';
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

// A Markdown "License" section whose first paragraph starts with the license
// name, e.g. "## License\n\nMIT" at the end of a README. Only used for a
// `licenseFile` a skill declares (see checkLicense). The heading must be on
// its own line and the name must open the section, so a sentence such as
// "unlike MIT, ..." further down does not count.
const LICENSE_SECTION_PATTERNS = [
  [/^#{1,6}[ \t]*Licen[cs]e[ \t]*\n(?:[ \t]*\n)*[ \t]*MIT\b/im, 'MIT'],
];

// Resolves a path from sync/upstream.json against `dir` and refuses one that
// escapes it ("../x" or an absolute path). These paths are our own config,
// so a bad one is a plain Error, but it must never make a script read files
// outside the upstream checkout.
function insideDir(dir, rel, field) {
  if (typeof rel !== 'string' || !rel) throw new Error(`"${field}" must be a non-empty path, got ${JSON.stringify(rel)}`);
  const full = resolve(dir, rel);
  const back = relative(resolve(dir), full);
  if (isAbsolute(rel) || back.startsWith('..') || isAbsolute(back)) throw new Error(`"${field}" must stay inside the upstream checkout: ${rel}`);
  return full;
}

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
//
// `licenseFile` (optional in sync/upstream.json, relative to the checkout
// root) replaces that default file. vercel-labs/agent-skills has no LICENSE
// file at all and states "MIT" only under a "## License" heading in its
// README, so that skill names README.md here. The README heading pattern is
// only tried for such a declared file: a skill has to opt in explicitly, and
// the existing LICENSE-file check stays exactly as strict as before.
export function checkLicense(checkoutDir, skill, manifest) {
  let found = typeof manifest.license === 'string' ? manifest.license : null;
  let where = 'manifest "license"';
  if (!found && skill.licenseFile !== undefined) {
    const file = insideDir(checkoutDir, skill.licenseFile, 'licenseFile');
    if (!existsSync(file)) throw new ShapeError(`licenseFile not found upstream: ${file}`);
    // Not cut to 2000 characters like a LICENSE file: in a README the
    // license section is usually near the end.
    const text = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
    const hit = [...LICENSE_PATTERNS, ...LICENSE_SECTION_PATTERNS].find(([re]) => re.test(text));
    if (!hit) throw new ShapeError(`upstream licenseFile ${file} states no license we recognise`);
    found = hit[1];
    where = file;
  } else if (!found) {
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
// so we write one summary per topic file instead. superpowers
// ("collection") is one plugin that bundles many independent skills, so we
// write one summary per bundled skill. web-design-guidelines ("single") is
// one small skill with nothing worth splitting up: its docs README is the
// whole guide and it has no items. Everything else (diffing, license check,
// publishing) is the same, so the scripts branch on `kind` only where the
// item list, the summary frontmatter key or the invocation differ.
export const KINDS = {
  // `key` is the frontmatter field that names the item in a summary file.
  // A single skill has no item summaries, so it has no key.
  commands: { key: 'command' },
  guide: { key: 'topic' },
  collection: { key: 'skill' },
  single: { key: null },
};

// Kinds whose upstream.json entry describes ONE skill folder: they need
// `skillDir` (where SKILL.md is) and `skillName` (its frontmatter `name`).
// A collection has many skill folders, found through the plugin manifest
// instead (see listCollectionSkills), so it needs neither.
export const ONE_SKILL_KINDS = new Set(['commands', 'guide', 'single']);

// The kind of a skill entry in sync/upstream.json. An unknown kind is a
// mistake in our own config, not an upstream shape change, so plain Error.
export function kindOf(skill) {
  if (!Object.hasOwn(KINDS, skill.kind ?? '')) {
    throw new Error(`skill "${skill.name}": unknown kind "${skill.kind}" (expected ${Object.keys(KINDS).join(', ')})`);
  }
  return skill.kind;
}

// The upstream file a summary must name in `source`, when the kind fixes it.
// Guide topics are defined BY their file (item id = file basename), so any
// other source would mean the summary describes something else. Command
// summaries point at whichever reference file covers the command: no rule.
// A collection skill's SKILL.md can sit in any folder the manifest lists, so
// the exact path is only known with a checkout; validate.mjs checks the part
// it can (the path ends in <id>/SKILL.md).
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

// A collection plugin's skills, found the way Claude Code finds them
// (plugins reference, "How each key combines with its default location"):
// Claude Code always scans ./skills, and the plugin manifest's `skills`
// field (a string or an array of folders relative to the plugin root) ADDS
// folders to that scan; it does not replace it. So ./skills is read when it
// exists (it must exist when the field is absent, else nothing is found) and
// every listed folder is read too. A folder that holds SKILL.md is one skill;
// otherwise each child folder that holds SKILL.md is one skill. ui-ux-pro-max lists
// "./.claude/skills/", engineering-advanced-skills lists ["./skills",
// "./boost-asio-pro", ...]: both forms occur upstream.
//
// The item id is the folder name, and it must equal the SKILL.md `name`.
// Why: Claude Code calls a plugin skill /<plugin>:<SKILL.md name>, while our
// summary files and page anchors are named after the id. If the two drifted
// apart, the page would advertise a call that does not exist, so a mismatch
// is a shape change for a human to look at.
//
// Why ShapeError on a missing listed folder, a listed folder with no
// skills, or an empty result: the same reasoning as listTopics. The routine
// deletes the summary of every skill that disappears, so a moved folder or a
// reformatted `skills` field must stop the run instead of reading as "all
// skills were removed".
export function listCollectionSkills(pluginDir, manifest) {
  const field = manifest.skills;
  const listed = field === undefined ? [] : typeof field === 'string' ? [field] : field;
  if (field !== undefined && (!Array.isArray(listed) || listed.length === 0 || !listed.every((p) => typeof p === 'string' && p))) {
    throw new ShapeError(`plugin manifest "skills" is not a path or a non-empty list of paths (format changed?): ${JSON.stringify(field)}`);
  }
  // The default folder only counts when it exists or nothing else is listed
  // (then its absence is reported as a missing folder below).
  const defaultDir = resolve(pluginDir, 'skills');
  const scan = field === undefined || existsSync(defaultDir) ? ['./skills', ...listed] : listed;
  const found = new Map(); // id -> folder relative to the plugin root
  const seenDirs = new Set(); // "./skills" may also be listed explicitly
  for (const rel of scan) {
    let dir;
    try {
      dir = insideDir(pluginDir, rel, 'skills');
    } catch {
      // The path comes from upstream here, not from our config, so an
      // escaping path is a shape change rather than our own mistake.
      throw new ShapeError(`plugin manifest "skills" entry leaves the plugin folder: ${rel}`);
    }
    if (seenDirs.has(dir)) continue;
    seenDirs.add(dir);
    if (!existsSync(dir) || !statSync(dir).isDirectory()) throw new ShapeError(`skills folder listed in the plugin manifest not found: ${dir}`);
    const skillDirs = existsSync(join(dir, 'SKILL.md'))
      ? [dir]
      : readdirSync(dir, { withFileTypes: true })
        .filter((e) => e.isDirectory() && existsSync(join(dir, e.name, 'SKILL.md')))
        .map((e) => join(dir, e.name));
    // An empty default folder next to listed folders is harmless (Claude
    // Code loads the listed ones); any folder we depend on must hold skills.
    if (skillDirs.length === 0 && field !== undefined && dir === defaultDir && !listed.some((p) => resolve(pluginDir, p) === defaultDir)) continue;
    if (skillDirs.length === 0) throw new ShapeError(`skills folder listed in the plugin manifest holds no skill (no SKILL.md): ${dir}`);
    for (const skillDir of skillDirs) {
      const id = basename(skillDir);
      const skillMd = join(skillDir, 'SKILL.md');
      if (!COMMAND_NAME.test(id)) throw new ShapeError(`skill folder "${id}" is not a plain lowercase name (format changed?): ${skillMd}`);
      // frontmatterValue, not parseFrontmatter: alirezarezvani/claude-skills
      // writes `name: "agent-designer"`, and in YAML the quoted string is the
      // same name as the bare one.
      const name = frontmatterValue(readFileSync(skillMd, 'utf8'), 'name');
      if (name !== id) throw new ShapeError(`skill folder "${id}" has SKILL.md name "${name}"; they must be equal: ${skillMd}`);
      // Two listed folders with a skill of the same name would collide in
      // Claude Code's /<plugin>:<name> namespace and in our file names.
      if (found.has(id)) throw new ShapeError(`skill "${id}" is listed twice in the plugin (${found.get(id)} and ${relative(pluginDir, skillDir)})`);
      found.set(id, relative(pluginDir, skillDir).split('\\').join('/'));
    }
  }
  return [...found.keys()].sort();
}

// Where an upstream checkout keeps the files our scripts read. All paths come
// from sync/upstream.json (`path` = plugin root, `skillDir` = the folder that
// holds SKILL.md, both relative to the upstream repo root), so no script
// hard-codes impeccable's `<path>/skills/<name>` layout.
export function upstreamFiles(checkoutDir, skill) {
  const pluginDir = join(checkoutDir, skill.path);
  return {
    pluginDir,
    // A collection has no single skill folder (see ONE_SKILL_KINDS).
    skillDir: skill.skillDir ? join(checkoutDir, skill.skillDir) : null,
    // The folder a summary's `source` is relative to: the skill folder for
    // one-skill kinds, the plugin root for a collection (its sources look
    // like skills/<id>/SKILL.md or boost-asio-pro/SKILL.md).
    sourceDir: skill.kind === 'collection' ? pluginDir : (skill.skillDir ? join(checkoutDir, skill.skillDir) : null),
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
//
// Some upstreams are plain skill repos with no plugin manifest at all
// (vercel-labs/agent-skills, microsoft/playwright-cli, tt-a1i/archify): our
// own marketplace entry is their manifest (`strict: false`). For those the
// manifest only ever gave us the version, so a skill may declare where the
// version lives instead (`versionFrom`, see readVersion), and then a missing
// manifest is expected and returns {}. The license is still checked, from
// `licenseFile` or the repo's LICENSE file (checkLicense). Every skill that
// does not declare `versionFrom` keeps the old rule: no manifest = shape
// change, because for those it means upstream moved things.
function readManifest(files, skill) {
  if (existsSync(files.pluginJson)) return readJson(files.pluginJson);
  if (existsSync(files.marketplace)) {
    const entry = (readJson(files.marketplace).plugins ?? []).find((p) => p && p.name === skill.name);
    if (entry) return entry;
  }
  if (skill.versionFrom !== undefined) return {};
  throw new ShapeError(`no plugin manifest upstream: neither ${files.pluginJson} nor a "${skill.name}" entry in ${files.marketplace}`);
}

// What a version we publish must look like ("2.15.0", "3.2", "1.0.0-beta.1").
// Anything else (an object, an empty string, "latest") means the file we read
// changed meaning.
const VERSION = /^\d+(\.\d+)*([-+][0-9A-Za-z.-]+)?$/;

// One value from a SKILL.md frontmatter block, by dotted key: "version" or
// "metadata.version" (one level of nesting, the way vercel-labs/agent-skills
// writes `metadata:` followed by indented `version: "1.0.0"`). parseFrontmatter
// cannot do this: it flattens indented lines, so a nested key could be
// confused with a top-level one of the same name. Surrounding quotes are
// removed. Returns undefined when the key is not there.
export function frontmatterValue(md, dottedKey) {
  const text = md.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  const match = /^---\n([\s\S]*?)\n---/.exec(text);
  if (!match) return undefined;
  const [parent, child] = dottedKey.split('.');
  const lines = match[1].split('\n');
  const unquote = (v) => v.trim().replace(/^(['"])(.*)\1$/, '$2');
  const keyOf = (line) => /^([A-Za-z0-9_-]+):(.*)$/.exec(line.trim());
  if (child === undefined) {
    for (const line of lines) {
      const m = /^\S/.test(line) && keyOf(line);
      if (m && m[1] === parent) return unquote(m[2]);
    }
    return undefined;
  }
  const start = lines.findIndex((line) => /^\S/.test(line) && keyOf(line)?.[1] === parent);
  if (start === -1) return undefined;
  for (const line of lines.slice(start + 1)) {
    if (/^\S/.test(line)) break; // the next top-level key ends the block
    const m = keyOf(line);
    if (m && m[1] === child) return unquote(m[2]);
  }
  return undefined;
}

// The upstream version we show on the page and record in upstream.json.
// By default it is the manifest's `version` (or null when the manifest has
// none; record-sync then keeps the recorded one). A skill can declare
// `versionFrom` in sync/upstream.json to read it elsewhere, because plain
// skill repos keep it in different places:
//   { "file": "package.json", "key": "version" }  a top-level key of a JSON
//       file, path relative to the checkout root (playwright-cli, archify's
//       archify/skill-release.json)
//   { "frontmatter": "metadata.version" }  a key of the skill's SKILL.md
//       frontmatter (web-design-guidelines)
// Why ShapeError when the declared place has no usable version: we chose
// that place on purpose, so a missing file or key means upstream reorganised
// and the page would silently show a stale or empty version.
function readVersion(checkoutDir, files, skill, manifest) {
  const from = skill.versionFrom;
  if (from === undefined) return manifest.version ?? null;
  let value;
  let where;
  if (from && typeof from.file === 'string' && typeof from.key === 'string' && from.frontmatter === undefined) {
    where = insideDir(checkoutDir, from.file, 'versionFrom.file');
    if (!existsSync(where)) throw new ShapeError(`versionFrom file not found upstream: ${where}`);
    let data;
    try {
      data = readJson(where);
    } catch (err) {
      throw new ShapeError(`versionFrom file is not valid JSON: ${where} (${err.message})`);
    }
    value = data && typeof data === 'object' && !Array.isArray(data) ? data[from.key] : undefined;
    where = `${where} "${from.key}"`;
  } else if (from && typeof from.frontmatter === 'string' && from.file === undefined && from.key === undefined) {
    // A collection has no single SKILL.md, so this form is for one-skill
    // kinds only; validate.mjs reports the misconfiguration up front.
    if (!files.skillDir) throw new Error(`skill "${skill.name}": versionFrom.frontmatter needs "skillDir"`);
    where = join(files.skillDir, 'SKILL.md');
    value = frontmatterValue(readFileSync(where, 'utf8'), from.frontmatter);
    where = `${where} frontmatter "${from.frontmatter}"`;
  } else {
    // Our own config is wrong, not upstream: plain Error, like kindOf.
    throw new Error(`skill "${skill.name}": "versionFrom" must be {"file","key"} or {"frontmatter"}, got ${JSON.stringify(from)}`);
  }
  if (typeof value !== 'string' || !VERSION.test(value)) {
    throw new ShapeError(`no usable version upstream at ${where}: ${JSON.stringify(value)}`);
  }
  return value;
}

// Reads everything check-upstream and record-sync need from an upstream
// checkout, and throws ShapeError if upstream no longer looks the way
// sync/upstream.json says: plugin folder, skill name, item list, manifest,
// license, version. Both scripts call this, so a run can never record a
// sync that check-upstream would have stopped.
//
// Why check the SKILL.md name: our pages print the invocation
// (`/taste-skill:design-taste-frontend`), and Claude Code builds it from that
// frontmatter `name`. After a rename upstream the page would show a command
// that no longer exists, so a human has to look. A single skill has no items
// but gets the same check, since its page shows the same kind of call. A
// collection checks every bundled skill's name instead (listCollectionSkills).
export function readUpstream(checkoutDir, skill) {
  const kind = kindOf(skill);
  const files = upstreamFiles(checkoutDir, skill);
  if (!existsSync(files.pluginDir)) throw new ShapeError(`plugin folder "${skill.path}" not found in upstream`);
  if (ONE_SKILL_KINDS.has(kind)) {
    if (!files.skillDir) throw new Error(`skill "${skill.name}": sync/upstream.json "skillDir" is missing`);
    const skillMd = join(files.skillDir, 'SKILL.md');
    if (!existsSync(skillMd)) throw new ShapeError(`SKILL.md not found at ${skillMd}`);
    // Quotes are YAML syntax, not part of the name (see listCollectionSkills).
    const name = frontmatterValue(readFileSync(skillMd, 'utf8'), 'name');
    if (name !== skill.skillName) {
      throw new ShapeError(`SKILL.md name changed: recorded "${skill.skillName}", upstream now "${name}" (${skillMd})`);
    }
  }
  const manifest = readManifest(files, skill);
  let items;
  if (kind === 'guide') items = listTopics(files.skillDir);
  else if (kind === 'commands') items = listCommands(files.metadata);
  else if (kind === 'collection') items = listCollectionSkills(files.pluginDir, manifest);
  else items = [];
  checkLicense(checkoutDir, skill, manifest);
  return { files, items, version: readVersion(checkoutDir, files, skill, manifest) };
}

// Word count used to keep summaries short (spec: roughly 100-250 words).
export function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}
