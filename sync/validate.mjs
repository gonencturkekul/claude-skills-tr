#!/usr/bin/env node
// Checks that the marketplace repo is consistent before anything is pushed.
//
// Why: the daily routine regenerates Turkish summaries with an LLM and pushes
// straight to main (no human review, by design). This script is the gate that
// stops a half-done or broken state from going live. It prints every problem
// it finds (not just the first) so one routine run can fix them all.
//
// Usage: node sync/validate.mjs [--repo <marketplaceDir>] [--site <siteRepoDir>]
// Exit codes: 0 = ok, 1 = problems found (listed on stdout).
import { readdirSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { DEFAULT_REPO, readJson, parseFrontmatter, parseArgs, paths, wordCount } from './lib.mjs';

const REQUIRED_KEYS = ['command', 'title', 'source', 'upstreamCommit'];
// Slightly looser than the 100-250 target so small rewrites don't fail the run.
const MIN_WORDS = 80;
const MAX_WORDS = 300;

export async function validate(repo, { site } = {}) {
  const problems = [];
  const p = paths(repo);
  const marketplace = readJson(p.marketplace);
  const upstream = readJson(p.upstream);
  const known = new Set(upstream.skills.map((s) => s.name));

  for (const plugin of marketplace.plugins) {
    if (!known.has(plugin.name)) {
      problems.push(`marketplace plugin "${plugin.name}" has no entry in sync/upstream.json`);
    }
  }

  for (const skill of upstream.skills) {
    const docsDir = p.docs(skill.name);
    if (!existsSync(join(docsDir, 'README.md'))) {
      problems.push(`${skill.name}: docs/tr/${skill.name}/README.md (overview) is missing`);
    }
    const expected = new Set(skill.commands ?? []);
    const present = existsSync(docsDir)
      ? readdirSync(docsDir).filter((f) => f.endsWith('.md') && f !== 'README.md').map((f) => f.slice(0, -3))
      : [];

    for (const cmd of expected) {
      if (!present.includes(cmd)) problems.push(`${skill.name}: missing summary for command "${cmd}"`);
    }
    for (const cmd of present) {
      if (!expected.has(cmd)) {
        problems.push(`${skill.name}: summary "${cmd}.md" has no matching upstream command`);
        continue;
      }
      const { data, body } = parseFrontmatter(readFileSync(join(docsDir, `${cmd}.md`), 'utf8'));
      for (const key of REQUIRED_KEYS) {
        if (!data[key]) problems.push(`${skill.name}/${cmd}.md: frontmatter key "${key}" is missing`);
      }
      if (data.command && data.command !== cmd) {
        problems.push(`${skill.name}/${cmd}.md: frontmatter command "${data.command}" does not match file name`);
      }
      const words = wordCount(body);
      if (words < MIN_WORDS || words > MAX_WORDS) {
        problems.push(`${skill.name}/${cmd}.md: body has ${words} words (allowed ${MIN_WORDS}-${MAX_WORDS})`);
      }
    }
  }

  if (site) problems.push(...(await validateSite(repo, site)));
  return problems;
}

// The website renders skills/data.json. If it differs from a fresh build of
// this repo, the site is stale (e.g. a previous run's site push failed), and
// the routine must rebuild and push it.
async function validateSite(repo, site) {
  const file = join(site, 'skills', 'data.json');
  if (!existsSync(file)) return [`site: ${file} is missing`];
  // Imported lazily so plain docs validation works without the site builder.
  const { buildSiteData, serialize } = await import('./build-site-data.mjs');
  return readFileSync(file, 'utf8') === serialize(buildSiteData(repo))
    ? []
    : ['site: skills/data.json is stale; run build-site-data.mjs and push the site'];
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const repo = typeof args.repo === 'string' ? args.repo : DEFAULT_REPO;
  const problems = await validate(repo, { site: typeof args.site === 'string' ? args.site : undefined });
  if (problems.length) {
    console.log(problems.map((x) => `- ${x}`).join('\n'));
    process.exit(1);
  }
  console.log('ok');
}

// Run only when executed directly, so tests and other scripts can import validate().
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
