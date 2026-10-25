#!/usr/bin/env node
// Builds the JSON file the website's "AI Skills" page (gonencturkekul.com)
// renders: the marketplace add command, then one entry per skill with its
// install command, invocation, Turkish overview and one item per command
// ("commands" skills), reference topic ("guide" skills) or bundled skill
// ("collection" skills), as HTML. "single" skills have no items: their
// overview is the whole guide.
//
// The output shape is a contract with the site, which renders any number of
// skills from it, so keep it stable. The test "buildSiteData emits the site
// contract for every kind" pins every key:
//   { generatedAt, marketplace: { name, repoUrl, addCommand },
//     skills: [{ name, kind, tagline, description, author, homepage, repoUrl,
//       license, version, syncedAt, category, installCommand, invocation,
//       docsUrl, overviewHtml, items: [{ id, title, html, call }] }] }
//   `kind` is "commands", "guide", "collection" or "single".
//
// Why a generated data file: the routine should update *data*, never edit
// hand-written HTML. The page stays a static file designed once; adding a new
// skill or refreshing summaries only changes skills/data.json.
//
// Why our own tiny Markdown converter: the summaries use a small, known subset
// (headings, paragraphs, lists, inline/fenced code, links, simple tables) and
// the scripts must run with zero dependencies in the routine's cloud VM.
// Everything is HTML-escaped first, so summary text can never inject markup.
//
// Usage: node sync/build-site-data.mjs <marketplaceDir> <outFile>
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { kindOf, parseFrontmatter, paths, readJson } from './lib.mjs';

const GITHUB_REPO = 'gonencturkekul/claude-skills-tr';

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Links: only http(s) and in-repo relative links survive. A relative link to
// another command's summary (./polish.md) becomes an in-page anchor; any other
// relative link points at the file on GitHub.
function resolveHref(href, ctx) {
  if (/^https?:\/\//i.test(href)) return href;
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return null; // javascript:, data:, etc.
  const cmd = /^(?:\.\/)?([a-z0-9-]+)\.md$/i.exec(href);
  if (cmd && ctx.skill && cmd[1].toLowerCase() !== 'readme') return `#${ctx.skill}-${cmd[1]}`;
  if (ctx.docsPath) return `https://github.com/${GITHUB_REPO}/blob/main/${ctx.docsPath}/${href.replace(/^\.\//, '')}`;
  return null;
}

function inline(text, ctx) {
  // Split out code spans first so their content is not treated as markup.
  return text.split(/(`[^`]+`)/).map((part) => {
    if (/^`[^`]+`$/.test(part)) return `<code>${escapeHtml(part.slice(1, -1))}</code>`;
    let s = escapeHtml(part);
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
      const url = resolveHref(href.replace(/&amp;/g, '&'), ctx);
      if (!url) return label;
      const external = /^https?:/.test(url) ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${escapeHtml(url)}"${external}>${label}</a>`;
    });
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    return s;
  }).join('');
}

export function markdownToHtml(md, ctx = {}) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let para = [];
  const flush = () => {
    if (para.length) out.push(`<p>${inline(para.join(' '), ctx)}</p>`);
    para = [];
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^```/.test(line)) {
      flush();
      const code = [];
      while (++i < lines.length && !/^```/.test(lines[i])) code.push(lines[i]);
      out.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
    } else if (/^#{1,4}\s/.test(line)) {
      flush();
      // Page structure: h1 = page, h2 = skill, h3 = item title (the site
      // renders it from `title`), so a summary's own `##` sections become h4
      // and a README's `#` becomes h3.
      const level = Math.min(line.match(/^#+/)[0].length + 2, 6);
      out.push(`<h${level}>${inline(line.replace(/^#+\s*/, ''), ctx)}</h${level}>`);
    } else if (/^\s*[-*]\s+/.test(line)) {
      flush();
      const items = [];
      for (; i < lines.length && /^\s*[-*]\s+/.test(lines[i]); i++) items.push(`<li>${inline(lines[i].replace(/^\s*[-*]\s+/, ''), ctx)}</li>`);
      i--;
      out.push(`<ul>${items.join('')}</ul>`);
    } else if (/^\s*\|/.test(line)) {
      flush();
      const rows = [];
      for (; i < lines.length && /^\s*\|/.test(lines[i]); i++) rows.push(lines[i]);
      i--;
      const cells = (r) => r.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      const body = rows.slice(2).map((r) => `<tr>${cells(r).map((c) => `<td>${inline(c, ctx)}</td>`).join('')}</tr>`).join('');
      out.push(`<table><thead><tr>${cells(rows[0]).map((c) => `<th>${inline(c, ctx)}</th>`).join('')}</tr></thead><tbody>${body}</tbody></table>`);
    } else if (line.trim() === '') {
      flush();
    } else {
      para.push(line.trim());
    }
  }
  flush();
  return out.join('\n');
}

// The skill-level call shown in the page header (see the invocation
// comment in buildSiteData).
function invocationOf(skill, kind) {
  if (kind === 'commands') return `/${skill.skillName} <komut>`;
  if (kind === 'collection') return `/${skill.name}:<skill-adı>`;
  return `/${skill.name}:${skill.skillName}`;
}

// What a user types to use one item, shown next to it on the page so it can
// be copied. A command is an argument of the skill (`/impeccable polish`); a
// bundled skill is its own plugin skill (`/superpowers:brainstorming`). A
// guide topic is not callable by itself: Claude reads the topic file when
// the skill needs it, so the call is the guide skill's own invocation.
function callOf(skill, kind, id) {
  if (kind === 'commands') return `/${skill.skillName} ${id}`;
  if (kind === 'collection') return `/${skill.name}:${id}`;
  return `/${skill.name}:${skill.skillName}`;
}

export function buildSiteData(repo) {
  const p = paths(repo);
  const marketplace = readJson(p.marketplace);
  const upstream = readJson(p.upstream);
  const skills = upstream.skills.map((skill) => {
    const kind = kindOf(skill);
    const docsDir = p.docs(skill.name);
    const docsPath = `docs/tr/${skill.name}`;
    const ctx = { skill: skill.name, docsPath };
    const overviewFile = join(docsDir, 'README.md');
    const overview = existsSync(overviewFile) ? parseFrontmatter(readFileSync(overviewFile, 'utf8')) : { data: {}, body: '' };
    const entry = marketplace.plugins.find((x) => x.name === skill.name) ?? {};
    return {
      name: skill.name,
      kind,
      // The tagline is the `tagline` key in the frontmatter of
      // docs/tr/<skill>/README.md: written on purpose as one sentence, so the
      // page never has to cut a paragraph. validate.mjs requires it (max 110).
      tagline: overview.data.tagline ?? '',
      description: entry.description ?? '',
      author: skill.author,
      homepage: skill.homepage,
      repoUrl: `https://github.com/${skill.repo}`,
      license: skill.license,
      version: skill.version,
      syncedAt: skill.syncedAt,
      category: entry.category ?? null,
      installCommand: `/plugin install ${skill.name}@${marketplace.name}`,
      // How a user calls the skill. A commands skill takes a subcommand
      // (`/impeccable polish`; "<komut>" is Turkish for "<command>"). Guide
      // and single skills have none: Claude invokes them by itself, and the
      // explicit form is Claude Code's plugin skill name,
      // /<plugin>:<SKILL.md name>. A collection holds many skills, each
      // called /<plugin>:<skill> ("<skill-adı>" = "<skill name>").
      invocation: invocationOf(skill, kind),
      docsUrl: `https://github.com/${GITHUB_REPO}/tree/main/${docsPath}`,
      overviewHtml: markdownToHtml(overview.body, ctx),
      // One entry per command, topic or bundled skill, in upstream.json order
      // (record-sync sorts it). `id` is also the in-page anchor suffix
      // #<skill>-<id>, which is where relative ./<id>.md links in the
      // summaries point. A single skill never has items, whatever
      // upstream.json says (validate.mjs flags leftovers).
      items: kind === 'single' ? [] : (skill.items ?? []).map((id) => {
        const { data, body } = parseFrontmatter(readFileSync(join(docsDir, `${id}.md`), 'utf8'));
        return { id, title: data.title ?? id, html: markdownToHtml(body, ctx), call: callOf(skill, kind, id) };
      }),
    };
  });
  return {
    // Dates come from upstream.json, never the clock, so rebuilding unchanged
    // docs yields a byte-identical file (validate --site relies on that).
    generatedAt: upstream.skills.map((s) => s.syncedAt).sort().pop() ?? null,
    marketplace: {
      name: marketplace.name,
      repoUrl: `https://github.com/${GITHUB_REPO}`,
      addCommand: `/plugin marketplace add ${GITHUB_REPO}`,
    },
    skills,
  };
}

export function serialize(data) {
  return JSON.stringify(data, null, 2) + '\n';
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [repo, outFile] = process.argv.slice(2);
  if (!repo || !outFile) {
    console.error('usage: node sync/build-site-data.mjs <marketplaceDir> <outFile>');
    process.exit(1);
  }
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, serialize(buildSiteData(repo)));
  console.log(`wrote ${outFile}`);
}
