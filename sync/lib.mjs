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
// command-metadata.json. We need exactly one Turkish summary per key.
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
  return Object.keys(data).sort();
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
