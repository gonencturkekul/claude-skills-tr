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
import { listCommands, listTopics, parseFrontmatter, ShapeError } from '../lib.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const syncDir = join(here, '..');
const realMetadata = join(here, 'fixtures', 'command-metadata.json');
const ALL = Object.keys(JSON.parse(readFileSync(realMetadata, 'utf8'))).sort();

// First lines of the real Apache-2.0 LICENSE file in pbakaus/impeccable.
const APACHE_HEADER = '                                 Apache License\n                           Version 2.0, January 2004\n                        http://www.apache.org/licenses/\n';

function tmp() {
  return mkdtempSync(join(tmpdir(), 'skills-tr-'));
}

// Every docs README carries the one-line tagline the website shows.
const README = '---\ntagline: Arayüz tasarımı için kısa bir Türkçe rehber.\n---\n# Genel bakış\n';

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
      kind: 'commands', skillDir: 'plugin/skills/impeccable', skillName: 'impeccable',
      metadataPath: 'skills/impeccable/scripts/command-metadata.json',
      documentedCommit: 'abc', version: '4.7.0', syncedAt: '2026-10-25', items: commands }],
  }));
  writeFileSync(join(docs, 'README.md'), README);
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
  writeFileSync(join(dir, 'plugin', 'skills', 'impeccable', 'SKILL.md'), '---\nname: impeccable\ndescription: x\n---\nbody\n');
  writeFileSync(join(dir, 'README.md'), 'outside plugin');
  // Upstream's plugin.json has no `license` field; the repo-root LICENSE file
  // is where pbakaus/impeccable states its license, so the fixture has one too.
  writeFileSync(join(dir, 'LICENSE'), APACHE_HEADER);
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
  assert.deepEqual(out.addedItems, ['polish']);
  assert.deepEqual(out.removedItems, ['gone']);
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
  assert.deepEqual(s.items, ALL);
});

test('check-upstream treats an unknown documentedCommit as every plugin file changed', () => {
  const up = makeUpstream();
  const out = JSON.parse(run('check-upstream.mjs', ['--repo', makeMarketplace(ALL), '--skill', 'impeccable', '--upstream', up.dir]).stdout);
  assert.equal(out.changed, true);
  assert.deepEqual(out.changedFiles, ['plugin/.claude-plugin/plugin.json', 'plugin/skills/impeccable/SKILL.md', 'plugin/skills/impeccable/scripts/command-metadata.json']);
});

// ---- review fixes: metadata shape, mass removal, renames, license, --head ----

// Overwrites fields of the recorded skill entry, so tests can start from
// e.g. "docs match this commit".
function setRecorded(dir, fields, i = 0) {
  const u = join(dir, 'sync', 'upstream.json');
  const json = JSON.parse(readFileSync(u, 'utf8'));
  Object.assign(json.skills[i], fields);
  writeFileSync(u, JSON.stringify(json));
}

function writeMeta(content) {
  const f = join(tmp(), 'm.json');
  writeFileSync(f, typeof content === 'string' ? content : JSON.stringify(content));
  return f;
}

test('listCommands throws ShapeError when metadata is an empty object', () => {
  assert.throws(() => listCommands(writeMeta({})), ShapeError);
});

test('listCommands throws ShapeError when metadata is wrapped in another object', () => {
  const wrapped = { commands: JSON.parse(readFileSync(realMetadata, 'utf8')) };
  assert.throws(() => listCommands(writeMeta(wrapped)), ShapeError);
});

test('listCommands throws ShapeError when a key is not a command name', () => {
  assert.throws(() => listCommands(writeMeta({ Polish: { description: 'x' } })), ShapeError);
});

test('listCommands throws ShapeError when an entry has no string description', () => {
  assert.throws(() => listCommands(writeMeta({ polish: { summary: 'x' } })), ShapeError);
  assert.throws(() => listCommands(writeMeta({ polish: 'x' })), ShapeError);
});

test('check-upstream exits 2 when more than half of the recorded commands disappear', () => {
  const up = makeUpstream();
  const meta = join(up.dir, 'plugin', 'skills', 'impeccable', 'scripts', 'command-metadata.json');
  const full = JSON.parse(readFileSync(meta, 'utf8'));
  writeFileSync(meta, JSON.stringify(Object.fromEntries(Object.entries(full).slice(0, 5))));
  const r = run('check-upstream.mjs', ['--repo', makeMarketplace(ALL), '--skill', 'impeccable', '--upstream', up.dir]);
  assert.equal(r.status, 2, r.stdout + r.stderr);
  assert.match(r.stderr, /shape-change/);
});

test('check-upstream reports both paths of a renamed file (no rename detection)', () => {
  const up = makeUpstream();
  const ref = join(up.dir, 'plugin', 'skills', 'impeccable', 'reference');
  mkdirSync(ref, { recursive: true });
  writeFileSync(join(ref, 'polish.md'), 'polish guidance\n'.repeat(20));
  git(up.dir, 'add', '-A');
  git(up.dir, 'commit', '-q', '-m', 'add polish');
  const dir = makeMarketplace(ALL);
  setRecorded(dir, { documentedCommit: git(up.dir, 'rev-parse', 'HEAD') });
  git(up.dir, 'mv', 'plugin/skills/impeccable/reference/polish.md', 'plugin/skills/impeccable/reference/polishing.md');
  git(up.dir, 'commit', '-q', '-m', 'rename');
  const out = JSON.parse(run('check-upstream.mjs', ['--repo', dir, '--skill', 'impeccable', '--upstream', up.dir]).stdout);
  assert.ok(out.changedFiles.includes('plugin/skills/impeccable/reference/polish.md'), JSON.stringify(out.changedFiles));
  assert.ok(out.changedFiles.includes('plugin/skills/impeccable/reference/polishing.md'));
});

test('check-upstream lists summaries whose source file no longer exists upstream', () => {
  const up = makeUpstream();
  const ref = join(up.dir, 'plugin', 'skills', 'impeccable', 'reference');
  mkdirSync(ref, { recursive: true });
  for (const c of ALL) if (c !== 'polish') writeFileSync(join(ref, `${c}.md`), c);
  git(up.dir, 'add', '-A');
  git(up.dir, 'commit', '-q', '-m', 'refs');
  const out = JSON.parse(run('check-upstream.mjs', ['--repo', makeMarketplace(ALL), '--skill', 'impeccable', '--upstream', up.dir]).stdout);
  assert.deepEqual(out.missingSources, [{ item: 'polish', source: 'reference/polish.md' }]);
});

test('check-upstream exits 2 when the upstream LICENSE differs from the recorded license', () => {
  const up = makeUpstream();
  writeFileSync(join(up.dir, 'LICENSE'), 'MIT License\n\nCopyright (c) 2026\n');
  const r = run('check-upstream.mjs', ['--repo', makeMarketplace(ALL), '--skill', 'impeccable', '--upstream', up.dir]);
  assert.equal(r.status, 2, r.stdout + r.stderr);
  assert.match(r.stderr, /license/i);
});

test('check-upstream exits 2 when plugin.json declares a different license', () => {
  const up = makeUpstream();
  writeFileSync(join(up.dir, 'plugin', '.claude-plugin', 'plugin.json'), '{"name":"impeccable","version":"4.7.0","license":"MIT"}');
  const r = run('check-upstream.mjs', ['--repo', makeMarketplace(ALL), '--skill', 'impeccable', '--upstream', up.dir]);
  assert.equal(r.status, 2, r.stdout + r.stderr);
  assert.match(r.stderr, /license/i);
});

test('check-upstream exits 2 when the upstream license cannot be found', () => {
  const up = makeUpstream();
  rmSync(join(up.dir, 'LICENSE'));
  const r = run('check-upstream.mjs', ['--repo', makeMarketplace(ALL), '--skill', 'impeccable', '--upstream', up.dir]);
  assert.equal(r.status, 2, r.stdout + r.stderr);
});

// The tarball fallback has no .git folder, so the head SHA comes from --head.
function makeTarballCheckout() {
  const up = makeUpstream();
  rmSync(join(up.dir, '.git'), { recursive: true, force: true });
  return up.dir;
}
const API_SHA = '0123456789abcdef0123456789abcdef01234567';

test('check-upstream --head without git history treats every plugin file as changed', () => {
  const r = run('check-upstream.mjs', ['--repo', makeMarketplace(ALL), '--skill', 'impeccable', '--upstream', makeTarballCheckout(), '--head', API_SHA]);
  assert.equal(r.status, 0, r.stderr);
  const out = JSON.parse(r.stdout);
  assert.equal(out.headCommit, API_SHA);
  assert.equal(out.changed, true);
  assert.deepEqual(out.changedFiles, ['plugin/.claude-plugin/plugin.json', 'plugin/skills/impeccable/SKILL.md', 'plugin/skills/impeccable/scripts/command-metadata.json']);
});

test('check-upstream --head equal to documentedCommit reports no change', () => {
  const dir = makeMarketplace(ALL);
  setRecorded(dir, { documentedCommit: API_SHA });
  const out = JSON.parse(run('check-upstream.mjs', ['--repo', dir, '--skill', 'impeccable', '--upstream', makeTarballCheckout(), '--head', API_SHA]).stdout);
  assert.equal(out.changed, false);
});

test('check-upstream and record-sync reject a --head that is not a full commit SHA', () => {
  const up = makeTarballCheckout();
  const dir = makeMarketplace(ALL);
  assert.equal(run('check-upstream.mjs', ['--repo', dir, '--skill', 'impeccable', '--upstream', up, '--head', 'HEAD']).status, 1);
  assert.equal(run('record-sync.mjs', ['--repo', dir, '--skill', 'impeccable', '--upstream', up, '--head', 'abc', '--date', '2026-11-01']).status, 1);
});

test('record-sync --head records the given SHA without git history', () => {
  const dir = makeMarketplace(ALL);
  const r = run('record-sync.mjs', ['--repo', dir, '--skill', 'impeccable', '--upstream', makeTarballCheckout(), '--head', API_SHA, '--date', '2026-11-01']);
  assert.equal(r.status, 0, r.stderr);
  const s = JSON.parse(readFileSync(join(dir, 'sync', 'upstream.json'), 'utf8')).skills[0];
  assert.equal(s.documentedCommit, API_SHA);
  assert.deepEqual(s.items, ALL);
});

test('check-upstream and record-sync print usage and exit 1 without --skill or --upstream', () => {
  for (const script of ['check-upstream.mjs', 'record-sync.mjs']) {
    const r = run(script, ['--skill', 'impeccable']);
    assert.equal(r.status, 1, script);
    assert.match(r.stderr, /usage/i, script);
  }
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
  assert.equal(data.skills[0].items.length, 24);
});

test('buildSiteData keeps Turkish characters and renders inline code', () => {
  const dir = makeMarketplace(ALL);
  writeFileSync(join(dir, 'docs', 'tr', 'impeccable', 'polish.md'), summary('polish', '`polish` ve ığşçöüİ'));
  const cmd = buildSiteData(dir).skills[0].items.find((c) => c.id === 'polish');
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
  assert.match(html, /<h4>Ne yapar<\/h4>/);
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

// ---- "guide" skills: no slash commands, one summary per references/*.md topic ----
//
// taste-skill (Leonxlnx/taste-skill) is the real case: no plugin.json, its
// version lives in the repo's own .claude-plugin/marketplace.json, and the
// documented items are the topic files in skills/taste-skill/references/.

const TOPICS = ['colour', 'motion', 'type'];

function topicSummary(topic, { key = 'topic', source = `references/${topic}.md` } = {}) {
  return `---\n${key}: ${topic}\ntitle: Başlık\nsource: ${source}\nupstreamCommit: abc\n---\n${'Bu konu sayfayı anlatır. '.repeat(20)}\n`;
}

// Adds taste-skill (kind "guide") to a marketplace made by makeMarketplace().
function addGuideSkill(dir, topics, { skip = [], extra = [] } = {}) {
  const m = join(dir, '.claude-plugin', 'marketplace.json');
  const mj = JSON.parse(readFileSync(m, 'utf8'));
  mj.plugins.push({ name: 'taste-skill', description: 'Sanat yönetmenliği', category: 'design', source: { source: 'github', repo: 'Leonxlnx/taste-skill' } });
  writeFileSync(m, JSON.stringify(mj));
  const u = join(dir, 'sync', 'upstream.json');
  const uj = JSON.parse(readFileSync(u, 'utf8'));
  uj.skills.push({ name: 'taste-skill', kind: 'guide', repo: 'Leonxlnx/taste-skill', path: '.', watchPath: 'skills/taste-skill',
    skillDir: 'skills/taste-skill', skillName: 'design-taste-frontend', author: 'Leonxlnx',
    homepage: 'https://github.com/Leonxlnx/taste-skill', license: 'MIT', documentedCommit: 'abc', version: '2.1.4',
    syncedAt: '2026-10-25', items: topics });
  writeFileSync(u, JSON.stringify(uj));
  const docs = join(dir, 'docs', 'tr', 'taste-skill');
  mkdirSync(docs, { recursive: true });
  writeFileSync(join(docs, 'README.md'), '---\ntagline: Sayfalarına sanat yönetmenliği getiren skill.\n---\n# taste-skill\n\n## Bölüm\n');
  for (const t of topics) if (!skip.includes(t)) writeFileSync(join(docs, `${t}.md`), topicSummary(t));
  for (const t of extra) writeFileSync(join(docs, `${t}.md`), topicSummary(t));
  return dir;
}

// An upstream shaped like Leonxlnx/taste-skill: plugin root = repo root, no
// plugin.json, version/license in .claude-plugin/marketplace.json.
function makeGuideUpstream(topics = TOPICS) {
  const dir = tmp();
  git(dir, 'init', '-q', '-b', 'main');
  git(dir, 'config', 'user.email', 't@t');
  git(dir, 'config', 'user.name', 't');
  mkdirSync(join(dir, '.claude-plugin'), { recursive: true });
  writeFileSync(join(dir, '.claude-plugin', 'marketplace.json'), JSON.stringify({
    name: 'taste-skill', owner: { name: 'leonxlnx' },
    plugins: [{ name: 'taste-skill', version: '2.1.4', license: 'MIT', source: './', skills: ['./skills/taste-skill'] }],
  }));
  const skill = join(dir, 'skills', 'taste-skill');
  mkdirSync(join(skill, 'references'), { recursive: true });
  writeFileSync(join(skill, 'SKILL.md'), '---\nname: design-taste-frontend\ndescription: >-\n  art direction\n---\nbody\n');
  for (const t of topics) writeFileSync(join(skill, 'references', `${t}.md`), `# ${t}\n`);
  writeFileSync(join(dir, 'README.md'), 'outside the skill');
  writeFileSync(join(dir, 'LICENSE'), 'MIT License\n\nCopyright (c) 2026 Leonxlnx\n');
  git(dir, 'add', '-A');
  git(dir, 'commit', '-q', '-m', 'base');
  return { dir, base: git(dir, 'rev-parse', 'HEAD') };
}

function checkGuide(dir, up, extra = []) {
  return run('check-upstream.mjs', ['--repo', dir, '--skill', 'taste-skill', '--upstream', up, ...extra]);
}

test('listTopics returns the sorted basenames of references/*.md', () => {
  const up = makeGuideUpstream(['type', 'colour', 'motion']);
  writeFileSync(join(up.dir, 'skills', 'taste-skill', 'references', 'notes.txt'), 'not a topic');
  assert.deepEqual(listTopics(join(up.dir, 'skills', 'taste-skill')), ['colour', 'motion', 'type']);
});

test('listTopics throws ShapeError when references/ is missing or has no .md files', () => {
  const up = makeGuideUpstream();
  const skillDir = join(up.dir, 'skills', 'taste-skill');
  rmSync(join(skillDir, 'references'), { recursive: true });
  assert.throws(() => listTopics(skillDir), ShapeError);
  mkdirSync(join(skillDir, 'references'));
  writeFileSync(join(skillDir, 'references', 'readme.txt'), 'x');
  assert.throws(() => listTopics(skillDir), ShapeError);
});

test('validate passes on a marketplace with a commands skill and a guide skill', () => {
  const r = run('validate.mjs', ['--repo', addGuideSkill(makeMarketplace(ALL), TOPICS)]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
});

test('validate names a guide topic with no summary and a summary with no topic', () => {
  const r = run('validate.mjs', ['--repo', addGuideSkill(makeMarketplace(ALL), TOPICS, { skip: ['motion'], extra: ['ghost'] })]);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /taste-skill.*motion/);
  assert.match(r.stdout, /taste-skill.*ghost/);
});

test('validate requires a guide summary to use the "topic" key and source references/<id>.md', () => {
  const dir = addGuideSkill(makeMarketplace(ALL), TOPICS);
  const docs = join(dir, 'docs', 'tr', 'taste-skill');
  writeFileSync(join(docs, 'colour.md'), topicSummary('colour', { key: 'command' }));
  writeFileSync(join(docs, 'type.md'), topicSummary('type', { source: 'references/fonts.md' }));
  const r = run('validate.mjs', ['--repo', dir]);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /colour\.md.*"topic"/);
  assert.match(r.stdout, /type\.md.*source/);
});

test('validate requires a README tagline of at most 110 characters', () => {
  const dir = addGuideSkill(makeMarketplace(ALL), TOPICS);
  writeFileSync(join(dir, 'docs', 'tr', 'taste-skill', 'README.md'), '# taste-skill\n');
  writeFileSync(join(dir, 'docs', 'tr', 'impeccable', 'README.md'), `---\ntagline: ${'uzun '.repeat(30)}\n---\n# x\n`);
  const r = run('validate.mjs', ['--repo', dir]);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /taste-skill.*tagline/);
  assert.match(r.stdout, /impeccable.*tagline/);
});

test('check-upstream (guide) reads the version from the upstream marketplace.json and scopes the diff to watchPath', () => {
  const up = makeGuideUpstream();
  const dir = addGuideSkill(makeMarketplace(ALL), TOPICS);
  setRecorded(dir, { documentedCommit: up.base }, 1);
  writeFileSync(join(up.dir, 'skills', 'taste-skill', 'references', 'copy.md'), '# copy\n');
  writeFileSync(join(up.dir, 'README.md'), 'changed outside');
  git(up.dir, 'add', '-A');
  git(up.dir, 'commit', '-q', '-m', 'add copy');
  const r = checkGuide(dir, up.dir);
  assert.equal(r.status, 0, r.stderr);
  const out = JSON.parse(r.stdout);
  assert.equal(out.version, '2.1.4');
  assert.deepEqual(out.changedFiles, ['skills/taste-skill/references/copy.md']);
  assert.deepEqual(out.addedItems, ['copy']);
  assert.deepEqual(out.removedItems, []);
});

test('check-upstream (guide) reports a removed topic and its missing source', () => {
  const up = makeGuideUpstream(['colour', 'motion', 'type', 'layout']);
  const dir = addGuideSkill(makeMarketplace(ALL), ['colour', 'motion', 'type', 'layout']);
  rmSync(join(up.dir, 'skills', 'taste-skill', 'references', 'layout.md'));
  const out = JSON.parse(checkGuide(dir, up.dir).stdout);
  assert.deepEqual(out.removedItems, ['layout']);
  assert.deepEqual(out.missingSources, []);
});

test('check-upstream (guide) lists a summary whose source moved', () => {
  const up = makeGuideUpstream();
  const dir = addGuideSkill(makeMarketplace(ALL), TOPICS);
  writeFileSync(join(dir, 'docs', 'tr', 'taste-skill', 'type.md'), topicSummary('type', { source: 'references/old-type.md' }));
  const out = JSON.parse(checkGuide(dir, up.dir).stdout);
  assert.deepEqual(out.missingSources, [{ item: 'type', source: 'references/old-type.md' }]);
});

test('check-upstream (guide) exits 2 when references/ is gone', () => {
  const up = makeGuideUpstream();
  rmSync(join(up.dir, 'skills', 'taste-skill', 'references'), { recursive: true });
  const r = checkGuide(addGuideSkill(makeMarketplace(ALL), TOPICS), up.dir);
  assert.equal(r.status, 2, r.stdout + r.stderr);
  assert.match(r.stderr, /shape-change/);
});

test('check-upstream (guide) exits 2 when more than half of the topics disappear', () => {
  const up = makeGuideUpstream(['colour']);
  const r = checkGuide(addGuideSkill(makeMarketplace(ALL), TOPICS), up.dir);
  assert.equal(r.status, 2, r.stdout + r.stderr);
});

test('check-upstream exits 2 when SKILL.md no longer has the recorded skill name', () => {
  const up = makeGuideUpstream();
  writeFileSync(join(up.dir, 'skills', 'taste-skill', 'SKILL.md'), '---\nname: taste\n---\nbody\n');
  const r = checkGuide(addGuideSkill(makeMarketplace(ALL), TOPICS), up.dir);
  assert.equal(r.status, 2, r.stdout + r.stderr);
  assert.match(r.stderr, /name/);
});

test('check-upstream (guide) exits 2 with no plugin.json and no matching upstream marketplace entry', () => {
  const up = makeGuideUpstream();
  writeFileSync(join(up.dir, '.claude-plugin', 'marketplace.json'), JSON.stringify({ name: 'x', plugins: [{ name: 'other', source: './' }] }));
  const r = checkGuide(addGuideSkill(makeMarketplace(ALL), TOPICS), up.dir);
  assert.equal(r.status, 2, r.stdout + r.stderr);
});

test('check-upstream (guide) exits 2 when the upstream marketplace entry declares another license', () => {
  const up = makeGuideUpstream();
  writeFileSync(join(up.dir, '.claude-plugin', 'marketplace.json'), JSON.stringify({ name: 'x', plugins: [{ name: 'taste-skill', version: '2.1.4', license: 'Apache-2.0', source: './' }] }));
  const r = checkGuide(addGuideSkill(makeMarketplace(ALL), TOPICS), up.dir);
  assert.equal(r.status, 2, r.stdout + r.stderr);
  assert.match(r.stderr, /license/i);
});

test('record-sync (guide) records topics and the version from the upstream marketplace.json', () => {
  const up = makeGuideUpstream(['colour', 'motion', 'type', 'copy']);
  const dir = addGuideSkill(makeMarketplace(ALL), TOPICS);
  setRecorded(dir, { version: '0.0.1' }, 1);
  const r = run('record-sync.mjs', ['--repo', dir, '--skill', 'taste-skill', '--upstream', up.dir, '--date', '2026-11-02']);
  assert.equal(r.status, 0, r.stderr);
  const s = JSON.parse(readFileSync(join(dir, 'sync', 'upstream.json'), 'utf8')).skills[1];
  assert.equal(s.documentedCommit, up.base);
  assert.equal(s.version, '2.1.4');
  assert.equal(s.syncedAt, '2026-11-02');
  assert.deepEqual(s.items, ['colour', 'copy', 'motion', 'type']);
});

test('buildSiteData emits the site contract for both kinds', () => {
  const data = buildSiteData(addGuideSkill(makeMarketplace(ALL), TOPICS));
  assert.deepEqual(Object.keys(data), ['generatedAt', 'marketplace', 'skills']);
  assert.deepEqual(data.marketplace, {
    name: 'skills-tr',
    repoUrl: 'https://github.com/gonencturkekul/claude-skills-tr',
    addCommand: '/plugin marketplace add gonencturkekul/claude-skills-tr',
  });
  const keys = ['name', 'kind', 'tagline', 'description', 'author', 'homepage', 'repoUrl', 'license', 'version', 'syncedAt',
    'category', 'installCommand', 'invocation', 'docsUrl', 'overviewHtml', 'items'];
  const [imp, taste] = data.skills;
  assert.deepEqual(Object.keys(imp), keys);
  assert.deepEqual(Object.keys(taste), keys);
  assert.equal(imp.kind, 'commands');
  assert.equal(imp.invocation, '/impeccable <komut>');
  assert.equal(imp.tagline, 'Arayüz tasarımı için kısa bir Türkçe rehber.');
  assert.equal(taste.kind, 'guide');
  assert.equal(taste.invocation, '/taste-skill:design-taste-frontend');
  assert.equal(taste.installCommand, '/plugin install taste-skill@skills-tr');
  assert.equal(taste.category, 'design');
  assert.equal(taste.repoUrl, 'https://github.com/Leonxlnx/taste-skill');
  assert.deepEqual(taste.items.map((i) => i.id), TOPICS);
  assert.deepEqual(Object.keys(taste.items[0]), ['id', 'title', 'html']);
  assert.match(taste.overviewHtml, /<h3>taste-skill<\/h3>[\s\S]*<h4>Bölüm<\/h4>/);
});
