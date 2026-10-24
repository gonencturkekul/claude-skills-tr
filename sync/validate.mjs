#!/usr/bin/env node
// Checks that the marketplace repo is consistent before anything is pushed.
//
// Why: the daily routine regenerates Turkish summaries with an LLM and pushes
// straight to main (no human review, by design). This script is the gate that
// stops a half-done or broken state from going live. It prints every problem
// it finds (not just the first) so one routine run can fix them all.
//
// It understands both skill kinds (see KINDS in lib.mjs): "commands" skills
// need one summary per command (frontmatter key `command`), "guide" skills one
// summary per reference topic (frontmatter key `topic`, `source` fixed to
// references/<topic>.md).
//
// Usage: node sync/validate.mjs [--repo <marketplaceDir>] [--site <siteRepoDir>]
// Exit codes: 0 = ok, 1 = problems found (listed on stdout).
import { readdirSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { DEFAULT_REPO, KINDS, expectedSource, readJson, parseFrontmatter, parseArgs, paths, wordCount } from './lib.mjs';

// Every summary needs these besides its kind's item key (`command`/`topic`).
const REQUIRED_KEYS = ['title', 'source', 'upstreamCommit'];
// Slightly looser than the 100-250 target so small rewrites don't fail the run.
const MIN_WORDS = 80;
const MAX_WORDS = 300;
// The website shows each skill's tagline in its list row, which is designed
// for one short sentence. build-site-data reads it from the docs README
// frontmatter, so it is checked here, before it can break the layout.
export const MAX_TAGLINE = 110;

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
    // With an unknown kind none of the per-kind rules below can be applied.
    if (!Object.hasOwn(KINDS, skill.kind ?? '')) {
      problems.push(`${skill.name}: sync/upstream.json "kind" must be ${Object.keys(KINDS).join(' or ')}, got "${skill.kind}"`);
      continue;
    }
    // Every script locates upstream files and builds the invocation from these.
    for (const field of ['skillDir', 'skillName']) {
      if (typeof skill[field] !== 'string' || !skill[field]) problems.push(`${skill.name}: sync/upstream.json "${field}" is missing`);
    }
    const itemKey = KINDS[skill.kind].key;
    const docsDir = p.docs(skill.name);
    const readme = join(docsDir, 'README.md');
    if (!existsSync(readme)) {
      problems.push(`${skill.name}: docs/tr/${skill.name}/README.md (overview) is missing`);
    } else {
      const tagline = parseFrontmatter(readFileSync(readme, 'utf8')).data.tagline;
      // Counted in characters (code points), the unit the site layout cares about.
      const length = tagline ? [...tagline].length : 0;
      if (!tagline) problems.push(`${skill.name}: README.md frontmatter "tagline" is missing`);
      else if (length > MAX_TAGLINE) problems.push(`${skill.name}: README.md tagline has ${length} characters (max ${MAX_TAGLINE})`);
    }
    const expected = new Set(skill.items ?? []);
    const present = existsSync(docsDir)
      ? readdirSync(docsDir).filter((f) => f.endsWith('.md') && f !== 'README.md').map((f) => f.slice(0, -3))
      : [];

    for (const item of expected) {
      if (!present.includes(item)) problems.push(`${skill.name}: missing summary for ${itemKey} "${item}"`);
    }
    for (const item of present) {
      if (!expected.has(item)) {
        problems.push(`${skill.name}: summary "${item}.md" has no matching upstream ${itemKey}`);
        continue;
      }
      const { data, body } = parseFrontmatter(readFileSync(join(docsDir, `${item}.md`), 'utf8'));
      for (const key of [itemKey, ...REQUIRED_KEYS]) {
        if (!data[key]) problems.push(`${skill.name}/${item}.md: frontmatter key "${key}" is missing`);
      }
      if (data[itemKey] && data[itemKey] !== item) {
        problems.push(`${skill.name}/${item}.md: frontmatter ${itemKey} "${data[itemKey]}" does not match file name`);
      }
      const source = expectedSource(skill, item);
      if (source && data.source && data.source !== source) {
        problems.push(`${skill.name}/${item}.md: frontmatter source "${data.source}" must be "${source}"`);
      }
      const words = wordCount(body);
      if (words < MIN_WORDS || words > MAX_WORDS) {
        problems.push(`${skill.name}/${item}.md: body has ${words} words (allowed ${MIN_WORDS}-${MAX_WORDS})`);
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
