# Daily sync routine

These are the instructions the daily Claude Code scheduled task follows. The
task's prompt is only: "Follow sync/ROUTINE.md in claude-skills-tr exactly."
Keeping the steps here (in git) means changes to the routine are reviewed and
versioned like code.

## Why this routine exists

The marketplace never copies skill code: users install each skill straight
from its author's repo. What we own is the Turkish layer, short summaries in
`docs/tr/<skill>/` and the page at https://gonencturkekul.com/skills.html.
When an upstream skill changes, that layer must follow, without anyone doing
it by hand. Gönenç chose: no API key (this runs on his Claude subscription),
and changes go live without review (push straight to `main`).

## Repositories attached to the task

| Path in the session | Repo | Access |
|---|---|---|
| `claude-skills-tr/` | gonencturkekul/claude-skills-tr | read/write, push to `main` |
| `gonencturkekul.com/` | gonencturkekul/gonencturkekul.com | read/write, push to `main` (Vercel deploys) |
| `impeccable/` | pbakaus/impeccable | read only, never push |

If a folder name differs in the session, find each repo by its remote URL.
Every skill in `sync/upstream.json` must have its upstream repo attached. If
one is missing, treat it as a failure (see Failures).

## Rules

- Never modify, copy or translate anything Claude-facing from upstream. We
  only write Turkish summaries for humans.
- Never push to an upstream repo.
- Never force-push, never rewrite history, never delete branches.
- Do the steps in order. Do not commit anything until step 5.
- Use today's date in UTC as `TODAY` (YYYY-MM-DD).

## Steps

### 1. Prepare

```bash
cd claude-skills-tr
git pull --ff-only
npm test            # the sync scripts' own tests; stop on failure (see Failures)
```

### 2. Check each upstream skill

For every `name` in `sync/upstream.json` (today only `impeccable`):

```bash
git -C ../<upstream-folder> pull --ff-only
node sync/check-upstream.mjs --skill <name> --upstream ../<upstream-folder>
```

- Exit code 2 (`shape-change`): upstream reorganised its files. Stop and
  open an issue (see Failures). Do not guess.
- Otherwise read the JSON: `changed`, `changedFiles`, `addedCommands`,
  `removedCommands`, `headCommit`, `version`.
- If `changed` is false and both command lists are empty, this skill has
  nothing to do.

### 3. Update the Turkish summaries (only for skills that changed)

Each summary is `docs/tr/<name>/<command>.md`. Its frontmatter `source`
names the upstream file it summarises (relative to the skill folder, e.g.
`reference/polish.md`); upstream's path is
`<skill.path>/skills/<name>/<source>` (for impeccable: `plugin/skills/impeccable/reference/polish.md`).

- **Changed source:** for every summary whose upstream source file is in
  `changedFiles`, read the new upstream file and rewrite that summary.
  Also rewrite every summary if `plugin/skills/<name>/SKILL.md` or the
  command metadata file changed in a way that affects behaviour.
- **Added command:** write a new summary for each name in `addedCommands`.
- **Removed command:** delete the summary of each name in `removedCommands`,
  and remove it from the command table in `docs/tr/<name>/README.md`.
- If a change touches the skill's overall purpose or install steps, update
  `docs/tr/<name>/README.md` and the root `README.md` too.

Writing rules for every summary (same as the first ones):

```
---
command: <command>
title: <short Turkish title, 2-5 words>
source: reference/<command>.md
upstreamCommit: <headCommit from step 2>
---
## Ne yapar
## Ne zaman kullanılır
## Örnek
## İlgili komutlar
```

- 100–250 words of body, natural plain Turkish, no em dashes, no hype.
- Command names, file names, code and CLI text stay in English.
- A summary, not a translation. Be accurate to the source; don't invent.
- If upstream marks a command deprecated, say so first.
- Summaries you did not need to touch keep their old `upstreamCommit`.

Then record the sync (this is what marks the docs as matching upstream):

```bash
node sync/record-sync.mjs --skill <name> --upstream ../<upstream-folder> --date TODAY
node sync/validate.mjs        # must print "ok"; fix every listed problem, then re-run
```

### 4. Rebuild the website data

Always do this, even if no skill changed: it also repairs a site that missed
a previous push.

```bash
node sync/build-site-data.mjs . ../gonencturkekul.com/skills/data.json
node sync/validate.mjs --site ../gonencturkekul.com   # must print "ok"
```

### 5. Commit and push

Marketplace first, website second. The site is only pushed after the
marketplace push succeeded, so the page never shows summaries that aren't
in the repo.

```bash
# claude-skills-tr, only if it has changes
git add -A
git commit -m "changed: auto-sync <name> <version> (<short headCommit>)"
git push origin main

# gonencturkekul.com, only if skills/data.json changed
cd ../gonencturkekul.com
git add skills/data.json
git commit -m "changed: skills page data for <name> <version>"
git push origin main
```

If neither repo has changes, the run is done: report "nothing to do".

### 6. Close old failure issues

If the run succeeded and there are open issues labelled `sync-failure` in
gonencturkekul/claude-skills-tr, close each with a comment
"Resolved by the <TODAY> sync run." (`gh issue list --label sync-failure`,
`gh issue close <n> --comment ...`).

## Failures

On any failure **before the marketplace push** (tests fail, upstream missing,
shape change, validation still failing after a fix attempt):

1. Discard local changes in both repos (`git checkout -- . && git clean -fd`
   inside `docs/` and `sync/` only, and `skills/data.json` in the site).
2. Commit nothing.
3. Open an issue in gonencturkekul/claude-skills-tr labelled `sync-failure`
   (or comment on the open one instead of opening another) with: the date,
   the step, the exact command and its output, and the upstream `headCommit`.

If the **marketplace push succeeded but the site push failed**: do not roll
back. The next run will see `validate --site` fail and push the site. Open or
update the `sync-failure` issue so Gönenç knows.

## Adding a new skill later (manual, not done by the routine)

1. Add an entry to `.claude-plugin/marketplace.json` with a `git-subdir`
   source pointing at the author's repo (no `version` field).
2. Add the skill to `sync/upstream.json` (`documentedCommit` can be
   anything; the next check treats an unknown commit as "everything changed").
3. Write `docs/tr/<name>/README.md` and one summary per command, run
   `record-sync.mjs`, `validate.mjs`, `build-site-data.mjs`.
4. Attach the new upstream repo to the scheduled task.
