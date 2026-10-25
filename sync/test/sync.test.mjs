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
import { frontmatterValue, listCollectionSkills, listCommands, listTopics, parseFrontmatter, ShapeError } from '../lib.mjs';

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

// ---- "collection" and "single" skills ----
//
// collection: one plugin bundling many skills (obra/superpowers,
// alirezarezvani/claude-skills/engineering). Items are found through the
// plugin manifest's `skills` field. single: one skill, README only
// (vercel-labs/agent-skills web-design-guidelines, tt-a1i/archify). The
// fixtures copy the real layouts in miniature.

function initRepo(dir) {
  git(dir, 'init', '-q', '-b', 'main');
  git(dir, 'config', 'user.email', 't@t');
  git(dir, 'config', 'user.name', 't');
}

function commitAll(dir, msg = 'base') {
  git(dir, 'add', '-A');
  git(dir, 'commit', '-q', '-m', msg);
  return git(dir, 'rev-parse', 'HEAD');
}

function writeSkill(dir, name = basenameOf(dir)) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'SKILL.md'), `---\nname: ${name}\ndescription: x\n---\nbody\n`);
}
function basenameOf(p) {
  return p.split(/[\\/]/).pop();
}

// A collection upstream: plugin root = `root` inside the repo, plugin.json
// with an optional `skills` field, and skill folders at the given paths
// (relative to the plugin root).
function makeCollectionUpstream({ root = '.', skills, folders = ['skills/alpha', 'skills/beta'], manifest = {} } = {}) {
  const dir = tmp();
  initRepo(dir);
  const plugin = join(dir, root);
  mkdirSync(join(plugin, '.claude-plugin'), { recursive: true });
  const json = { name: 'superpowers', version: '7.0.1', license: 'MIT', ...manifest };
  if (skills !== undefined) json.skills = skills;
  writeFileSync(join(plugin, '.claude-plugin', 'plugin.json'), JSON.stringify(json));
  for (const f of folders) writeSkill(join(plugin, f));
  writeFileSync(join(dir, 'README.md'), 'outside the skills');
  writeFileSync(join(dir, 'LICENSE'), 'MIT License\n');
  return { dir, plugin, base: commitAll(dir) };
}

function skillSummary(id, { key = 'skill', source = `skills/${id}/SKILL.md` } = {}) {
  return `---\n${key}: ${id}\ntitle: Başlık\nsource: ${source}\nupstreamCommit: abc\n---\n${'Bu skill işini anlatır. '.repeat(20)}\n`;
}

// Adds an entry to a marketplace made by makeMarketplace(): the marketplace
// plugin, the upstream.json skill and its docs (README + one summary per item).
function addSkill(dir, entry, { summaries = {}, readme = '---\ntagline: Kısa bir tanıtım cümlesi.\n---\n# x\n' } = {}) {
  const m = join(dir, '.claude-plugin', 'marketplace.json');
  const mj = JSON.parse(readFileSync(m, 'utf8'));
  mj.plugins.push({ name: entry.name, description: 'Açıklama', category: 'development', source: './x' });
  writeFileSync(m, JSON.stringify(mj));
  const u = join(dir, 'sync', 'upstream.json');
  const uj = JSON.parse(readFileSync(u, 'utf8'));
  uj.skills.push({ repo: 'o/r', path: '.', author: 'A', homepage: 'https://example.com', license: 'MIT',
    documentedCommit: 'abc', version: '1.0.0', syncedAt: '2026-10-25', items: [], ...entry });
  writeFileSync(u, JSON.stringify(uj));
  const docs = join(dir, 'docs', 'tr', entry.name);
  mkdirSync(docs, { recursive: true });
  writeFileSync(join(docs, 'README.md'), readme);
  for (const [id, text] of Object.entries(summaries)) writeFileSync(join(docs, `${id}.md`), text);
  return dir;
}

function addCollection(dir, items = ['alpha', 'beta'], extra = {}) {
  return addSkill(dir, { name: 'superpowers', kind: 'collection', watchPath: 'skills', items, ...extra },
    { summaries: Object.fromEntries(items.map((id) => [id, skillSummary(id)])) });
}

function addSingle(dir, extra = {}, opts = {}) {
  return addSkill(dir, { name: 'web-design-guidelines', kind: 'single', path: 'skills/web-design-guidelines',
    skillDir: 'skills/web-design-guidelines', skillName: 'web-design-guidelines', ...extra }, opts);
}

test('listCollectionSkills reads ./skills when the manifest has no "skills" field', () => {
  const up = makeCollectionUpstream({ folders: ['skills/beta', 'skills/alpha'] });
  mkdirSync(join(up.plugin, 'skills', 'notes'));
  writeFileSync(join(up.plugin, 'skills', 'helper.test.mjs'), '// not a skill');
  assert.deepEqual(listCollectionSkills(up.plugin, {}), ['alpha', 'beta']);
});

test('listCollectionSkills accepts a string "skills" path (ui-ux-pro-max: "./.claude/skills/")', () => {
  const up = makeCollectionUpstream({ folders: ['.claude/skills/brand', '.claude/skills/slides'] });
  assert.deepEqual(listCollectionSkills(up.plugin, { skills: './.claude/skills/' }), ['brand', 'slides']);
});

test('listCollectionSkills accepts an array mixing a skills folder and single skill folders', () => {
  const up = makeCollectionUpstream({ folders: ['skills/alpha', 'skills/beta', 'minimalist', 'strict-api'] });
  assert.deepEqual(listCollectionSkills(up.plugin, { skills: ['./skills', './minimalist', './strict-api'] }),
    ['alpha', 'beta', 'minimalist', 'strict-api']);
});

test('listCollectionSkills also scans ./skills when "skills" lists other folders (it adds to the default)', () => {
  const up = makeCollectionUpstream({ folders: ['skills/alpha', 'extra/beta'] });
  assert.deepEqual(listCollectionSkills(up.plugin, { skills: './extra/' }), ['alpha', 'beta']);
  // An empty default folder does not matter when the listed folder has skills.
  const empty = makeCollectionUpstream({ folders: ['extra/beta'] });
  mkdirSync(join(empty.plugin, 'skills'));
  assert.deepEqual(listCollectionSkills(empty.plugin, { skills: ['./extra'] }), ['beta']);
});

test('listCollectionSkills treats a quoted SKILL.md name like a bare one', () => {
  const up = makeCollectionUpstream({ folders: ['skills/alpha'] });
  writeFileSync(join(up.plugin, 'skills', 'alpha', 'SKILL.md'), '---\nname: "alpha"\ndescription: x\n---\nbody\n');
  assert.deepEqual(listCollectionSkills(up.plugin, {}), ['alpha']);
});

test('listCollectionSkills throws ShapeError when a folder name differs from its SKILL.md name', () => {
  const up = makeCollectionUpstream();
  writeSkill(join(up.plugin, 'skills', 'beta'), 'beta-renamed');
  assert.throws(() => listCollectionSkills(up.plugin, {}), (err) => err instanceof ShapeError && /beta-renamed/.test(err.message));
});

test('listCollectionSkills throws ShapeError when nothing is found', () => {
  const up = makeCollectionUpstream({ folders: [] });
  mkdirSync(join(up.plugin, 'skills'));
  // A listed folder with no SKILL.md anywhere, an empty list, a missing folder.
  assert.throws(() => listCollectionSkills(up.plugin, {}), ShapeError);
  assert.throws(() => listCollectionSkills(up.plugin, { skills: [] }), ShapeError);
  assert.throws(() => listCollectionSkills(up.plugin, { skills: './moved' }), ShapeError);
  assert.throws(() => listCollectionSkills(up.plugin, { skills: { path: './skills' } }), ShapeError);
});

test('listCollectionSkills throws ShapeError on a path outside the plugin or a duplicate skill', () => {
  const up = makeCollectionUpstream({ root: 'engineering', folders: ['skills/alpha', 'alpha-copy/alpha'] });
  writeSkill(join(up.dir, 'outside'));
  assert.throws(() => listCollectionSkills(up.plugin, { skills: '../outside' }), ShapeError);
  assert.throws(() => listCollectionSkills(up.plugin, { skills: ['./skills', './alpha-copy'] }), /listed twice/);
});

test('check-upstream (collection) finds the skills, reads the version and resolves sources from the plugin root', () => {
  const up = makeCollectionUpstream({ folders: ['skills/alpha', 'skills/beta', 'skills/gamma'] });
  const dir = addCollection(makeMarketplace(ALL), ['alpha', 'beta']);
  writeFileSync(join(dir, 'docs', 'tr', 'superpowers', 'beta.md'), skillSummary('beta', { source: 'skills/old-beta/SKILL.md' }));
  setRecorded(dir, { documentedCommit: up.base }, 1);
  writeFileSync(join(up.dir, 'skills', 'alpha', 'extra.md'), 'x');
  writeFileSync(join(up.dir, 'README.md'), 'changed outside');
  commitAll(up.dir, 'change');
  const r = run('check-upstream.mjs', ['--repo', dir, '--skill', 'superpowers', '--upstream', up.dir]);
  assert.equal(r.status, 0, r.stderr);
  const out = JSON.parse(r.stdout);
  assert.equal(out.kind, 'collection');
  assert.equal(out.version, '7.0.1');
  assert.deepEqual(out.changedFiles, ['skills/alpha/extra.md']);
  assert.deepEqual(out.addedItems, ['gamma']);
  assert.deepEqual(out.removedItems, []);
  assert.deepEqual(out.missingSources, [{ item: 'beta', source: 'skills/old-beta/SKILL.md' }]);
});

test('check-upstream (collection) exits 2 when a bundled skill is renamed in its SKILL.md', () => {
  const up = makeCollectionUpstream();
  writeSkill(join(up.dir, 'skills', 'alpha'), 'alpha-two');
  const r = run('check-upstream.mjs', ['--repo', addCollection(makeMarketplace(ALL)), '--skill', 'superpowers', '--upstream', up.dir]);
  assert.equal(r.status, 2, r.stdout + r.stderr);
  assert.match(r.stderr, /shape-change/);
});

test('record-sync (collection) records the discovered skills from a subfolder plugin with an array "skills"', () => {
  const up = makeCollectionUpstream({ root: 'engineering', skills: ['./skills', './minimalist'], folders: ['skills/alpha', 'minimalist'],
    manifest: { name: 'engineering-advanced-skills', version: '2.14.1' } });
  const dir = addCollection(makeMarketplace(ALL), ['alpha'], { path: 'engineering', watchPath: undefined });
  const r = run('record-sync.mjs', ['--repo', dir, '--skill', 'superpowers', '--upstream', up.dir, '--date', '2026-11-03']);
  assert.equal(r.status, 0, r.stderr);
  const s = JSON.parse(readFileSync(join(dir, 'sync', 'upstream.json'), 'utf8')).skills[1];
  assert.deepEqual(s.items, ['alpha', 'minimalist']);
  assert.equal(s.version, '2.14.1');
});

// A plain skill repo like vercel-labs/agent-skills: no plugin manifest, no
// LICENSE file ("## License / MIT" in the README), version in SKILL.md
// frontmatter metadata.
function makeSingleUpstream({ readme = '# Agent skills\n\n## License\n\nMIT\n', skillName = 'web-design-guidelines' } = {}) {
  const dir = tmp();
  initRepo(dir);
  const skill = join(dir, 'skills', 'web-design-guidelines');
  mkdirSync(skill, { recursive: true });
  writeFileSync(join(skill, 'SKILL.md'), `---\nname: ${skillName}\ndescription: x\nmetadata:\n  author: vercel\n  version: "1.0.0"\n---\nbody\n`);
  writeFileSync(join(dir, 'README.md'), readme);
  writeFileSync(join(dir, 'package.json'), '{"name":"x","version":"0.1.22"}');
  return { dir, base: commitAll(dir) };
}

const SINGLE_FALLBACKS = { licenseFile: 'README.md', versionFrom: { frontmatter: 'metadata.version' } };

function checkSingle(dir, up) {
  return run('check-upstream.mjs', ['--repo', dir, '--skill', 'web-design-guidelines', '--upstream', up]);
}

test('check-upstream (single) has no items and reads license and version from the declared fallbacks', () => {
  const up = makeSingleUpstream();
  const r = checkSingle(addSingle(makeMarketplace(ALL), SINGLE_FALLBACKS), up.dir);
  assert.equal(r.status, 0, r.stderr);
  const out = JSON.parse(r.stdout);
  assert.equal(out.kind, 'single');
  assert.deepEqual(out.addedItems, []);
  assert.deepEqual(out.removedItems, []);
  assert.equal(out.version, '1.0.0');
});

test('check-upstream (single) exits 2 when SKILL.md is renamed', () => {
  const up = makeSingleUpstream({ skillName: 'web-guidelines' });
  const r = checkSingle(addSingle(makeMarketplace(ALL), SINGLE_FALLBACKS), up.dir);
  assert.equal(r.status, 2, r.stdout + r.stderr);
  assert.match(r.stderr, /name/);
});

test('check-upstream exits 2 for a repo without a manifest when the skill declares no versionFrom', () => {
  const up = makeSingleUpstream();
  const r = checkSingle(addSingle(makeMarketplace(ALL), { licenseFile: 'README.md' }), up.dir);
  assert.equal(r.status, 2, r.stdout + r.stderr);
  assert.match(r.stderr, /manifest/);
});

test('check-upstream exits 2 when the licenseFile has no recognisable license section', () => {
  const up = makeSingleUpstream({ readme: '# Agent skills\n\nUnlike MIT, this is ...\n\n## Licensing\n\nAsk us.\n' });
  const r = checkSingle(addSingle(makeMarketplace(ALL), SINGLE_FALLBACKS), up.dir);
  assert.equal(r.status, 2, r.stdout + r.stderr);
  assert.match(r.stderr, /license/i);
});

test('check-upstream exits 2 when the licenseFile states another license than recorded', () => {
  const up = makeSingleUpstream({ readme: '# x\n\n## License\n\nMIT\n' });
  const r = checkSingle(addSingle(makeMarketplace(ALL), { ...SINGLE_FALLBACKS, license: 'Apache-2.0' }), up.dir);
  assert.equal(r.status, 2, r.stdout + r.stderr);
  assert.match(r.stderr, /license changed/);
});

test('check-upstream reads versionFrom {file,key} and exits 2 when the key is gone', () => {
  const up = makeSingleUpstream();
  const dir = addSingle(makeMarketplace(ALL), { licenseFile: 'README.md', versionFrom: { file: 'package.json', key: 'version' } });
  assert.equal(JSON.parse(checkSingle(dir, up.dir).stdout).version, '0.1.22');
  writeFileSync(join(up.dir, 'package.json'), '{"name":"x"}');
  const r = checkSingle(dir, up.dir);
  assert.equal(r.status, 2, r.stdout + r.stderr);
  assert.match(r.stderr, /version/);
});

test('check-upstream exits 2 when the versionFrom frontmatter key is gone', () => {
  const up = makeSingleUpstream();
  writeFileSync(join(up.dir, 'skills', 'web-design-guidelines', 'SKILL.md'), '---\nname: web-design-guidelines\nversion: 1.0.0\n---\nbody\n');
  const r = checkSingle(addSingle(makeMarketplace(ALL), SINGLE_FALLBACKS), up.dir);
  assert.equal(r.status, 2, r.stdout + r.stderr);
});

test('record-sync (single) records an empty item list and the fallback version', () => {
  const up = makeSingleUpstream();
  const dir = addSingle(makeMarketplace(ALL), { ...SINGLE_FALLBACKS, version: '0.0.1' });
  const r = run('record-sync.mjs', ['--repo', dir, '--skill', 'web-design-guidelines', '--upstream', up.dir, '--date', '2026-11-04']);
  assert.equal(r.status, 0, r.stderr);
  const s = JSON.parse(readFileSync(join(dir, 'sync', 'upstream.json'), 'utf8')).skills[1];
  assert.deepEqual(s.items, []);
  assert.equal(s.version, '1.0.0');
  assert.equal(s.documentedCommit, up.base);
});

test('frontmatterValue reads top-level and one-level nested keys and strips quotes', () => {
  const md = '---\nname: x\nversion: top\nmetadata:\n  author: vercel\n  version: "1.0.0"\nother: y\n---\nversion: body\n';
  assert.equal(frontmatterValue(md, 'version'), 'top');
  assert.equal(frontmatterValue(md, 'metadata.version'), '1.0.0');
  assert.equal(frontmatterValue(md, 'metadata.missing'), undefined);
  assert.equal(frontmatterValue('---\nname: x\n  version: 2\n---\n', 'version'), undefined);
});

test('validate: a collection needs no skillDir/skillName, a single skill does', () => {
  const ok = addCollection(makeMarketplace(ALL));
  assert.equal(run('validate.mjs', ['--repo', ok]).status, 0, run('validate.mjs', ['--repo', ok]).stdout);
  const r = run('validate.mjs', ['--repo', addSingle(makeMarketplace(ALL), { skillDir: undefined, skillName: undefined })]);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /web-design-guidelines.*skillDir/);
  assert.match(r.stdout, /web-design-guidelines.*skillName/);
});

test('validate: a single skill passes with only a README and fails on items or summary files', () => {
  assert.equal(run('validate.mjs', ['--repo', addSingle(makeMarketplace(ALL), SINGLE_FALLBACKS)]).status, 0);
  const dir = addSingle(makeMarketplace(ALL), { items: ['review'] }, { summaries: { extra: skillSummary('extra') } });
  const r = run('validate.mjs', ['--repo', dir]);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /single.*review/);
  assert.match(r.stdout, /extra\.md/);
});

test('validate: a collection summary uses the "skill" key and a source ending in <id>/SKILL.md', () => {
  const dir = addCollection(makeMarketplace(ALL), ['alpha', 'beta', 'gamma']);
  const docs = join(dir, 'docs', 'tr', 'superpowers');
  writeFileSync(join(docs, 'alpha.md'), skillSummary('alpha', { key: 'topic' }));
  writeFileSync(join(docs, 'beta.md'), skillSummary('beta', { source: 'skills/alpha/SKILL.md' }));
  writeFileSync(join(docs, 'gamma.md'), skillSummary('gamma', { source: 'gamma/SKILL.md' }));
  const r = run('validate.mjs', ['--repo', dir]);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /alpha\.md.*"skill"/);
  assert.match(r.stdout, /beta\.md.*source/);
  assert.doesNotMatch(r.stdout, /gamma/);
});

test('validate flags a malformed versionFrom or licenseFile', () => {
  const dir = addSingle(makeMarketplace(ALL), { versionFrom: { file: 'package.json' }, licenseFile: '' });
  addCollection(dir, ['alpha', 'beta'], { versionFrom: { frontmatter: 'version' } });
  const r = run('validate.mjs', ['--repo', dir]);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /web-design-guidelines.*versionFrom/);
  assert.match(r.stdout, /web-design-guidelines.*licenseFile/);
  assert.match(r.stdout, /superpowers.*versionFrom\.frontmatter/);
});

test('buildSiteData emits the site contract for every kind, with a call per item', () => {
  const dir = addSingle(addCollection(addGuideSkill(makeMarketplace(ALL), TOPICS)), { items: ['ignored'] });
  const data = buildSiteData(dir);
  assert.deepEqual(Object.keys(data), ['generatedAt', 'marketplace', 'skills']);
  assert.deepEqual(data.marketplace, {
    name: 'skills-tr',
    repoUrl: 'https://github.com/gonencturkekul/claude-skills-tr',
    addCommand: '/plugin marketplace add gonencturkekul/claude-skills-tr',
  });
  const keys = ['name', 'kind', 'tagline', 'description', 'author', 'homepage', 'repoUrl', 'license', 'version', 'syncedAt',
    'category', 'installCommand', 'invocation', 'docsUrl', 'overviewHtml', 'items'];
  const [imp, taste, coll, single] = data.skills;
  for (const s of data.skills) assert.deepEqual(Object.keys(s), keys, s.name);
  for (const s of [imp, taste, coll]) assert.deepEqual(Object.keys(s.items[0]), ['id', 'title', 'html', 'call'], s.name);

  assert.equal(imp.kind, 'commands');
  assert.equal(imp.invocation, '/impeccable <komut>');
  assert.equal(imp.items.find((i) => i.id === 'polish').call, '/impeccable polish');
  assert.equal(imp.tagline, 'Arayüz tasarımı için kısa bir Türkçe rehber.');

  assert.equal(taste.kind, 'guide');
  assert.equal(taste.invocation, '/taste-skill:design-taste-frontend');
  assert.equal(taste.installCommand, '/plugin install taste-skill@skills-tr');
  assert.equal(taste.category, 'design');
  assert.equal(taste.repoUrl, 'https://github.com/Leonxlnx/taste-skill');
  assert.deepEqual(taste.items.map((i) => i.id), TOPICS);
  assert.deepEqual(taste.items.map((i) => i.call), TOPICS.map(() => '/taste-skill:design-taste-frontend'));
  assert.match(taste.overviewHtml, /<h3>taste-skill<\/h3>[\s\S]*<h4>Bölüm<\/h4>/);

  assert.equal(coll.kind, 'collection');
  assert.equal(coll.invocation, '/superpowers:<skill-adı>');
  assert.deepEqual(coll.items.map((i) => i.call), ['/superpowers:alpha', '/superpowers:beta']);

  assert.equal(single.kind, 'single');
  assert.equal(single.invocation, '/web-design-guidelines:web-design-guidelines');
  assert.deepEqual(single.items, []);
});
