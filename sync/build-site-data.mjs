#!/usr/bin/env node
// Builds the JSON file the website page (gonencturkekul.com/skills.html)
// renders: marketplace commands, one card per skill, Turkish summaries as HTML.
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
import { parseFrontmatter, paths, readJson } from './lib.mjs';

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
      // Page structure: h1 = page, h2 = skill, so summary headings start at h3.
      const level = Math.min(line.match(/^#+/)[0].length + 1, 5);
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

export function buildSiteData(repo) {
  const p = paths(repo);
  const marketplace = readJson(p.marketplace);
  const upstream = readJson(p.upstream);
  const skills = upstream.skills.map((skill) => {
    const docsDir = p.docs(skill.name);
    const docsPath = `docs/tr/${skill.name}`;
    const ctx = { skill: skill.name, docsPath };
    const overviewFile = join(docsDir, 'README.md');
    const overview = existsSync(overviewFile) ? parseFrontmatter(readFileSync(overviewFile, 'utf8')).body : '';
    const entry = marketplace.plugins.find((x) => x.name === skill.name) ?? {};
    return {
      name: skill.name,
      description: entry.description ?? '',
      author: skill.author,
      homepage: skill.homepage,
      repoUrl: `https://github.com/${skill.repo}`,
      license: skill.license,
      version: skill.version,
      syncedAt: skill.syncedAt,
      installCommand: `/plugin install ${skill.name}@${marketplace.name}`,
      docsUrl: `https://github.com/${GITHUB_REPO}/tree/main/${docsPath}`,
      overviewHtml: markdownToHtml(overview, ctx),
      commands: (skill.commands ?? []).map((command) => {
        const { data, body } = parseFrontmatter(readFileSync(join(docsDir, `${command}.md`), 'utf8'));
        return { command, title: data.title ?? command, html: markdownToHtml(body, ctx) };
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
      updateCommand: `/plugin marketplace update ${marketplace.name}`,
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
