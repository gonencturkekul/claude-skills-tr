// Tests for the sync scripts. They build throwaway marketplace repos and
// throwaway "upstream" git repos in the OS temp dir, so they never touch the
// real repo or the network. Run with: node --test sync/test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, copyFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync, execFileSync } from 'node:child_process';
import { listCommands, parseFrontmatter, ShapeError } from '../lib.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const syncDir = join(here, '..');
const realMetadata = join(here, 'fixtures', 'command-metadata.json');
const ALL = Object.keys(JSON.parse(readFileSync(realMetadata, 'utf8'))).sort();

function tmp() {
  return mkdtempSync(join(tmpdir(), 'skills-tr-'));
}

function summary(command, body = 'Bu komut arayüzü toparlar. '.repeat(20)) {
  return `---\ncommand: ${command}\ntitle: Başlık\nsource: reference/${command}.md\nupstreamCommit: abc\n---\n${body}\n`;
}

// A minimal marketplace repo: manifest, upstream.json and one summary per command.
function makeMarketplace(commands, { skip = [], extra = [] } = {}) {
  const dir = tmp();
  mkdirSync(join(dir, '.claude-plugin'), { recursive: true });
  mkdirSync(join(dir, 'sync'), { recursive: true });
  const docs = join(dir, 'docs', 'tr', 'impeccable');
  mkdirSync(docs, { recursive: true });
  writeFileSync(join(dir, '.claude-plugin', 'marketplace.json'), JSON.stringify({
    name: 'skills-tr', owner: { name: 'T' },
    plugins: [{ name: 'impeccable', description: 'x', source: { source: 'git-subdir', url: 'https://github.com/pbakaus/impeccable.git', path: 'plugin' } }],
  }));
  writeFileSync(join(dir, 'sync', 'upstream.json'), JSON.stringify({
    skills: [{ name: 'impeccable', repo: 'pbakaus/impeccable', path: 'plugin', author: 'Paul Bakaus',
      homepage: 'https://impeccable.style', license: 'Apache-2.0',
      metadataPath: 'skills/impeccable/scripts/command-metadata.json',
      documentedCommit: 'abc', version: '4.7.0', syncedAt: '2026-10-25', commands }],
  }));
  writeFileSync(join(docs, 'README.md'), '# Genel bakış\n');
  for (const c of commands) if (!skip.includes(c)) writeFileSync(join(docs, `${c}.md`), summary(c));
  for (const c of extra) writeFileSync(join(docs, `${c}.md`), summary(c));
  return dir;
}

function run(script, args) {
  return spawnSync(process.execPath, [join(syncDir, script), ...args], { encoding: 'utf8' });
}

function git(dir, ...args) {
  return execFileSync('git', ['-C', dir, ...args], { encoding: 'utf8' }).trim();
}

// An upstream repo with plugin/ + metadata, one baseline commit, returns {dir, base}.
function makeUpstream() {
  const dir = tmp();
  git(dir, 'init', '-q', '-b', 'main');
  git(dir, 'config', 'user.email', 't@t');
  git(dir, 'config', 'user.name', 't');
  const meta = join(dir, 'plugin', 'skills', 'impeccable', 'scripts');
  mkdirSync(meta, { recursive: true });
  copyFileSync(realMetadata, join(meta, 'command-metadata.json'));
  mkdirSync(join(dir, 'plugin', '.claude-plugin'), { recursive: true });
  writeFileSync(join(dir, 'plugin', '.claude-plugin', 'plugin.json'), '{"name":"impeccable","version":"4.7.0"}');
  writeFileSync(join(dir, 'README.md'), 'outside plugin');
  git(dir, 'add', '-A');
  git(dir, 'commit', '-q', '-m', 'base');
  return { dir, base: git(dir, 'rev-parse', 'HEAD') };
}

test('listCommands returns the 24 command names sorted', () => {
  const names = listCommands(realMetadata);
  assert.equal(names.length, 24);
  assert.deepEqual(names, ALL);
  assert.ok(names.includes('polish'));
});

test('listCommands throws ShapeError when the metadata file is missing', () => {
  assert.throws(() => listCommands(join(tmp(), 'nope.json')), ShapeError);
});

test('listCommands throws ShapeError when metadata is not a plain object', () => {
  const f = join(tmp(), 'm.json');
  writeFileSync(f, '["polish"]');
  assert.throws(() => listCommands(f), ShapeError);
});

test('parseFrontmatter reads key/value pairs and the body', () => {
  const { data, body } = parseFrontmatter(summary('polish', 'Gövde ığşçöüİ'));
  assert.equal(data.command, 'polish');
  assert.equal(data.source, 'reference/polish.md');
  assert.equal(body.trim(), 'Gövde ığşçöüİ');
});

test('validate passes on a complete marketplace', () => {
  const r = run('validate.mjs', ['--repo', makeMarketplace(ALL)]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
});

test('validate fails and names a command with no summary', () => {
  const r = run('validate.mjs', ['--repo', makeMarketplace(ALL, { skip: ['polish'] })]);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /polish/);
});

test('validate fails and names a summary for a command that does not exist', () => {
  const r = run('validate.mjs', ['--repo', makeMarketplace(ALL, { extra: ['foo'] })]);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /foo/);
});

test('validate fails when a summary is missing required frontmatter', () => {
  const dir = makeMarketplace(ALL);
  writeFileSync(join(dir, 'docs', 'tr', 'impeccable', 'audit.md'), '---\ncommand: audit\n---\n' + 'kelime '.repeat(150));
  const r = run('validate.mjs', ['--repo', dir]);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /audit.*(source|upstreamCommit)/);
});

test('validate fails when a summary body is too short', () => {
  const dir = makeMarketplace(ALL);
  writeFileSync(join(dir, 'docs', 'tr', 'impeccable', 'layout.md'), summary('layout', 'kısa'));
  const r = run('validate.mjs', ['--repo', dir]);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /layout.*word/);
});

test('validate fails when a marketplace plugin has no upstream.json entry', () => {
  const dir = makeMarketplace(ALL);
  const m = join(dir, '.claude-plugin', 'marketplace.json');
  const json = JSON.parse(readFileSync(m, 'utf8'));
  json.plugins.push({ name: 'other', source: './x' });
  writeFileSync(m, JSON.stringify(json));
  const r = run('validate.mjs', ['--repo', dir]);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /other/);
});

test('check-upstream reports no change when HEAD equals documentedCommit', () => {
  const up = makeUpstream();
  const dir = makeMarketplace(ALL);
  const u = join(dir, 'sync', 'upstream.json');
  const json = JSON.parse(readFileSync(u, 'utf8'));
  json.skills[0].documentedCommit = up.base;
  writeFileSync(u, JSON.stringify(json));
  const r = run('check-upstream.mjs', ['--repo', dir, '--skill', 'impeccable', '--upstream', up.dir]);
  assert.equal(r.status, 0, r.stderr);
  const out = JSON.parse(r.stdout);
  assert.equal(out.changed, false);
  assert.deepEqual(out.changedFiles, []);
});

test('check-upstream lists plugin files changed since documentedCommit and ignores files outside plugin/', () => {
  const up = makeUpstream();
  const dir = makeMarketplace(ALL);
  const u = join(dir, 'sync', 'upstream.json');
  const json = JSON.parse(readFileSync(u, 'utf8'));
  json.skills[0].documentedCommit = up.base;
  writeFileSync(u, JSON.stringify(json));
  writeFileSync(join(up.dir, 'plugin', 'x.md'), 'new');
  writeFileSync(join(up.dir, 'README.md'), 'changed outside');
  git(up.dir, 'add', '-A');
  git(up.dir, 'commit', '-q', '-m', 'change');
  const out = JSON.parse(run('check-upstream.mjs', ['--repo', dir, '--skill', 'impeccable', '--upstream', up.dir]).stdout);
  assert.equal(out.changed, true);
  assert.deepEqual(out.changedFiles, ['plugin/x.md']);
  assert.equal(out.headCommit, git(up.dir, 'rev-parse', 'HEAD'));
  assert.equal(out.version, '4.7.0');
});

test('check-upstream reports added and removed commands against the recorded list', () => {
  const up = makeUpstream();
  const dir = makeMarketplace(ALL.filter((c) => c !== 'polish').concat('gone'));
  const out = JSON.parse(run('check-upstream.mjs', ['--repo', dir, '--skill', 'impeccable', '--upstream', up.dir]).stdout);
  assert.deepEqual(out.addedCommands, ['polish']);
  assert.deepEqual(out.removedCommands, ['gone']);
});

test('check-upstream exits 2 with shape-change when upstream metadata is gone', () => {
  const up = makeUpstream();
  rmSync(join(up.dir, 'plugin', 'skills', 'impeccable', 'scripts', 'command-metadata.json'));
  const r = run('check-upstream.mjs', ['--repo', makeMarketplace(ALL), '--skill', 'impeccable', '--upstream', up.dir]);
  assert.equal(r.status, 2);
  assert.match(r.stderr, /shape-change/);
});

test('record-sync writes headCommit, version, commands and date into upstream.json', () => {
  const up = makeUpstream();
  const dir = makeMarketplace(ALL);
  const r = run('record-sync.mjs', ['--repo', dir, '--skill', 'impeccable', '--upstream', up.dir, '--date', '2026-11-01']);
  assert.equal(r.status, 0, r.stderr);
  const s = JSON.parse(readFileSync(join(dir, 'sync', 'upstream.json'), 'utf8')).skills[0];
  assert.equal(s.documentedCommit, up.base);
  assert.equal(s.version, '4.7.0');
  assert.equal(s.syncedAt, '2026-11-01');
  assert.deepEqual(s.commands, ALL);
});

test('check-upstream treats an unknown documentedCommit as every plugin file changed', () => {
  const up = makeUpstream();
  const out = JSON.parse(run('check-upstream.mjs', ['--repo', makeMarketplace(ALL), '--skill', 'impeccable', '--upstream', up.dir]).stdout);
  assert.equal(out.changed, true);
  assert.deepEqual(out.changedFiles, ['plugin/.claude-plugin/plugin.json', 'plugin/skills/impeccable/scripts/command-metadata.json']);
});

// ---- build-site-data ----
import { buildSiteData, serialize, markdownToHtml } from '../build-site-data.mjs';

test('buildSiteData produces the install and add commands', () => {
  const data = buildSiteData(makeMarketplace(ALL));
  assert.equal(data.marketplace.name, 'skills-tr');
  assert.equal(data.marketplace.addCommand, '/plugin marketplace add gonencturkekul/claude-skills-tr');
  assert.equal(data.skills[0].installCommand, '/plugin install impeccable@skills-tr');
  assert.equal(data.skills[0].author, 'Paul Bakaus');
  assert.equal(data.skills[0].repoUrl, 'https://github.com/pbakaus/impeccable');
  assert.equal(data.skills[0].commands.length, 24);
});

test('buildSiteData keeps Turkish characters and renders inline code', () => {
  const dir = makeMarketplace(ALL);
  writeFileSync(join(dir, 'docs', 'tr', 'impeccable', 'polish.md'), summary('polish', '`polish` ve ığşçöüİ'));
  const cmd = buildSiteData(dir).skills[0].commands.find((c) => c.command === 'polish');
  assert.match(cmd.html, /<code>polish<\/code>/);
  assert.match(cmd.html, /ığşçöüİ/);
  assert.equal(cmd.title, 'Başlık');
});

test('markdownToHtml escapes raw HTML', () => {
  const html = markdownToHtml('<script>alert(1)</script> & "x"');
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /&lt;script&gt;/);
});

test('markdownToHtml renders headings, lists, fenced code and safe links', () => {
  const html = markdownToHtml('## Ne yapar\n\nMetin.\n\n- bir\n- iki\n\n```\n/impeccable polish <x>\n```\n\n[repo](https://github.com/a/b) [kötü](javascript:alert(1))');
  assert.match(html, /<h3>Ne yapar<\/h3>/);
  assert.match(html, /<ul><li>bir<\/li><li>iki<\/li><\/ul>/);
  assert.match(html, /<pre><code>\/impeccable polish &lt;x&gt;<\/code><\/pre>/);
  assert.match(html, /<a href="https:\/\/github.com\/a\/b"[^>]*>repo<\/a>/);
  assert.doesNotMatch(html, /href="javascript/);
});

test('buildSiteData is deterministic', () => {
  const dir = makeMarketplace(ALL);
  assert.equal(serialize(buildSiteData(dir)), serialize(buildSiteData(dir)));
});

test('validate --site passes when data.json is fresh and fails when stale', () => {
  const dir = makeMarketplace(ALL);
  const site = tmp();
  mkdirSync(join(site, 'skills'));
  writeFileSync(join(site, 'skills', 'data.json'), serialize(buildSiteData(dir)));
  assert.equal(run('validate.mjs', ['--repo', dir, '--site', site]).status, 0);
  writeFileSync(join(site, 'skills', 'data.json'), '{}');
  const r = run('validate.mjs', ['--repo', dir, '--site', site]);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /stale/);
});
