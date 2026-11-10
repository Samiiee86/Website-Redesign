#!/usr/bin/env node
/* TestMu DS installer. Run once from a project root:  node <path>/testmu-ds/bin/install.mjs [project-dir]
   It adds, without touching your own code:
     .testmu/tokens/   tokens.css, testmu-base.css, testmu.css, theme.css, tailwind.preset.cjs, tokens.json
     .testmu/bin/      ds-check.mjs (the fixer) and this installer
     AGENTS.md         TestMu rules block (read by Codex, Cursor, Claude Code and most agents)
     CLAUDE.md         points Claude Code at AGENTS.md
     .cursor/rules/testmu-ds.mdc
     .claude/settings.json  Claude Code hooks (skip with --no-hook): the rules on every prompt, the fixer after every edit
                            and shell command and at the end of each turn, updates and the commit check at session start
     .cursor/hooks.json     the fixer after every Cursor edit and at the end of each turn
     .agents/rules/testmu-ds.md  the rules for Google Antigravity
     .git/hooks/pre-commit  fixes staged files on commit, for any agent or editor (re-added for every teammate by the
                            hooks above and by npm install, since git does not share hooks)
     .github/workflows/testmu-ds.yml  checks every pull request, so nothing off the system merges even if a hook was skipped
     package.json      "ds:check", "ds:fix", "ds:update" and a "prepare" step, if a package.json exists
     .testmu/config.json  where updates come from; the kit checks once a day and updates itself
   Safe to run again: it only replaces what it added.
   Options: --source <url> (where the published kit lives), --no-hook, --no-auto-update, --quiet */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ensureGitHook } from './git-hook.mjs';

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const optVal = k => { const i = args.indexOf(k); return i > -1 ? args[i + 1] : undefined; };
const SOURCE_ARG = optVal('--source');
const target = path.resolve(args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--source') || '.');
const noHook = args.includes('--no-hook'), QUIET = args.includes('--quiet'), NO_AUTO = args.includes('--no-auto-update');
let MANIFEST = {}; try { MANIFEST = JSON.parse(fs.readFileSync(path.join(SRC, 'manifest.json'), 'utf8')); } catch {}
const done = [];
const rel = p => path.relative(target, p) || '.';

function copy(from, to) { if (path.resolve(from) === path.resolve(to)) return; fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to); }
function block(file, startTag, endTag, text, fallbackHead = '') {
  const cur = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : fallbackHead;
  const re = new RegExp(`${startTag}[\\s\\S]*?${endTag}\\n?`);
  const next = re.test(cur) ? cur.replace(re, text) : (cur ? cur.replace(/\s*$/, '\n\n') : '') + text;
  fs.writeFileSync(file, next);
}

// 1. tokens + tools
const dot = path.join(target, '.testmu');
for (const f of fs.readdirSync(path.join(SRC, 'tokens'))) copy(path.join(SRC, 'tokens', f), path.join(dot, 'tokens', f));
for (const f of fs.readdirSync(path.join(SRC, 'bin'))) if (f.endsWith('.mjs')) copy(path.join(SRC, 'bin', f), path.join(dot, 'bin', f));
/* keep the rule templates too, so .testmu/bin/install.mjs can re-install the project on its own */
for (const f of fs.readdirSync(path.join(SRC, 'templates'))) copy(path.join(SRC, 'templates', f), path.join(dot, 'templates', f));
/* update settings: keep what the project already chose, take the version from this kit */
const cfgPath = path.join(dot, 'config.json');
let cfg = {}; try { cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8')); } catch {}
cfg.source = SOURCE_ARG || cfg.source || MANIFEST.source || '';
cfg.version = MANIFEST.version || cfg.version || 'dev';
if (NO_AUTO) cfg.autoUpdate = false; else cfg.autoUpdate ??= true;
cfg.checkedAt = new Date().toISOString();
fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2) + '\n');
fs.writeFileSync(path.join(dot, 'README.md'), '# .testmu\n\nTestMu design system files, managed by the TestMu kit. Do not edit them by hand.\n\nThey update themselves once a day from the published design system (see config.json). Update now with `node .testmu/bin/update.mjs`. Turn automatic updates off with `"autoUpdate": false` in config.json.\n');
done.push(`${rel(dot)}/  tokens, styles and the fixer`);

// 2. agent rules
const agents = fs.readFileSync(path.join(SRC, 'templates', 'AGENTS.md'), 'utf8');
block(path.join(target, 'AGENTS.md'), '<!-- testmu-ds:start', '<!-- testmu-ds:end -->', agents);
done.push('AGENTS.md  TestMu rules for Codex, Cursor and other agents');
const claudeMd = path.join(target, 'CLAUDE.md');
const cm = fs.existsSync(claudeMd) ? fs.readFileSync(claudeMd, 'utf8') : '';
if (!/@AGENTS\.md/.test(cm)) { fs.writeFileSync(claudeMd, (cm ? cm.replace(/\s*$/, '\n\n') : '') + '@AGENTS.md\n'); done.push('CLAUDE.md  loads AGENTS.md for Claude Code'); }
copy(path.join(SRC, 'templates', 'testmu-ds.mdc'), path.join(target, '.cursor', 'rules', 'testmu-ds.mdc'));
done.push('.cursor/rules/testmu-ds.mdc  Cursor rule, always on');

// 3. Claude Code hooks (project level, committed with the repo, so every teammate's Claude Code gets them)
const OURS = h => /\.testmu\/bin\//.test(h.command || '') || (h.args || []).some(x => /\.testmu\/bin\//.test(x));
const strip = list => (list || []).map(g => ({ ...g, hooks: (g.hooks || []).filter(h => !OURS(h)) })).filter(g => g.hooks.length);
if (!noHook) {
  const sp = path.join(target, '.claude', 'settings.json');
  let s = {}; try { s = JSON.parse(fs.readFileSync(sp, 'utf8')); } catch {}
  s.hooks ??= {};
  for (const ev of ['PostToolUse', 'SessionStart', 'UserPromptSubmit', 'Stop', 'SubagentStop']) s.hooks[ev] = strip(s.hooks[ev]);
  const node = f => `node "$CLAUDE_PROJECT_DIR/.testmu/bin/${f}"`;
  const fix = { type: 'command', command: `${node('ds-check.mjs')} --hook`, timeout: 60 };
  s.hooks.PostToolUse.push({ matcher: 'Edit|Write|MultiEdit|NotebookEdit', hooks: [fix] });
  s.hooks.PostToolUse.push({ matcher: 'Bash', hooks: [fix] });                      /* files written by shell commands */
  s.hooks.Stop.push({ hooks: [fix] });                                              /* anything left at the end of a turn */
  s.hooks.SubagentStop.push({ hooks: [fix] });
  s.hooks.UserPromptSubmit.push({ hooks: [{ type: 'command', command: node('remind.mjs'), timeout: 10 }] });
  s.hooks.SessionStart.push({ hooks: [
    { type: 'command', command: `${node('update.mjs')} --if-due --quiet`, timeout: 60 },
    { type: 'command', command: node('git-hook.mjs'), timeout: 10 }] });
  for (const ev of Object.keys(s.hooks)) if (!s.hooks[ev].length) delete s.hooks[ev];
  fs.mkdirSync(path.dirname(sp), { recursive: true }); fs.writeFileSync(sp, JSON.stringify(s, null, 2) + '\n');
  done.push('.claude/settings.json  rules on every prompt; fixer after edits, shell commands and each turn');
}

// 3b. Cursor hooks (same fixer, Cursor's hook format)
if (!noHook) {
  const cp = path.join(target, '.cursor', 'hooks.json');
  let c = {}; try { c = JSON.parse(fs.readFileSync(cp, 'utf8')); } catch {}
  c.version ??= 1; c.hooks ??= {};
  for (const ev of ['afterFileEdit', 'stop']) c.hooks[ev] = (c.hooks[ev] || []).filter(h => !OURS(h));
  c.hooks.afterFileEdit.push({ command: 'node .testmu/bin/ds-check.mjs --hook' });
  c.hooks.stop.push({ command: 'node .testmu/bin/ds-check.mjs --hook' });
  fs.mkdirSync(path.dirname(cp), { recursive: true }); fs.writeFileSync(cp, JSON.stringify(c, null, 2) + '\n');
  done.push('.cursor/hooks.json  fixer after every Cursor edit and each turn');
}

// 3c. Antigravity workspace rule (it also reads AGENTS.md)
copy(path.join(SRC, 'templates', 'AGENTS.md'), path.join(target, '.agents', 'rules', 'testmu-ds.md'));
done.push('.agents/rules/testmu-ds.md  Antigravity rule');

// 3d. Git pre-commit: fixes staged files from any agent or editor before they are committed
if (!noHook) {
  ensureGitHook(target);
  if (fs.existsSync(path.join(target, '.git'))) done.push('.git/hooks/pre-commit  fixes staged files on every commit, whichever agent wrote them');
}

// 3e. Pull request check (GitHub Actions): the last line of defence when a hook was skipped
if (!noHook && fs.existsSync(path.join(target, '.git'))) {
  const wf = path.join(target, '.github', 'workflows', 'testmu-ds.yml');
  const cur = fs.existsSync(wf) ? fs.readFileSync(wf, 'utf8') : '';
  if (!cur || cur.includes('# managed by testmu-ds')) {
    fs.mkdirSync(path.dirname(wf), { recursive: true });
    fs.writeFileSync(wf, `# managed by testmu-ds (.testmu/bin/install.mjs). Fails a pull request that adds styling off the TestMu design system.
name: TestMu design system
on:
  pull_request:
  push:
    branches: [main, master]
jobs:
  ds-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Check changed files against the TestMu design system
        run: |
          BASE="\${{ github.event.pull_request.base.sha || github.event.before }}"
          if [ -z "$BASE" ] || ! git cat-file -e "$BASE^{commit}" 2>/dev/null; then BASE=$(git rev-list --max-parents=0 HEAD | tail -n 1); fi
          git diff --name-only -z --diff-filter=ACMR "$BASE" HEAD -- '*.css' '*.scss' '*.sass' '*.less' '*.pcss' '*.html' '*.htm' '*.jsx' '*.tsx' '*.js' '*.ts' '*.mjs' '*.vue' '*.svelte' '*.astro' '*.mdx' > changed.txt
          if [ ! -s changed.txt ]; then echo "No style files changed."; exit 0; fi
          xargs -0 node .testmu/bin/ds-check.mjs < changed.txt
`);
    done.push('.github/workflows/testmu-ds.yml  checks every pull request');
  }
}

// 4. npm scripts
const pj = path.join(target, 'package.json');
if (fs.existsSync(pj)) {
  try {
    const j = JSON.parse(fs.readFileSync(pj, 'utf8')); j.scripts ??= {};
    j.scripts['ds:check'] ??= 'node .testmu/bin/ds-check.mjs src';
    j.scripts['ds:fix'] ??= 'node .testmu/bin/ds-check.mjs --fix src';
    j.scripts['ds:update'] ??= 'node .testmu/bin/update.mjs';
    /* npm install runs "prepare": it re-adds the commit check on every teammate's clone */
    const hookCmd = 'node .testmu/bin/git-hook.mjs';
    if (!(j.scripts.prepare || '').includes(hookCmd)) j.scripts.prepare = j.scripts.prepare ? `${j.scripts.prepare} && ${hookCmd}` : hookCmd;
    fs.writeFileSync(pj, JSON.stringify(j, null, 2) + '\n'); done.push('package.json  npm run ds:check / ds:fix, commit check on npm install');
  } catch { done.push('package.json  skipped (could not parse)'); }
}

if (QUIET) process.exit(0);
console.log(`\nTestMu DS ${cfg.version} installed in ${target}\n`);
for (const d of done) console.log('  + ' + d);
console.log(`
Next: load the styles once in your app.
  Plain CSS / HTML:  .testmu/tokens/tokens.css, then testmu-base.css, then testmu.css
  Tailwind v3:       presets: [require('./.testmu/tokens/tailwind.preset.cjs')]
  Tailwind v4:       @import "./.testmu/tokens/theme.css";
Check anything, any time:  node .testmu/bin/ds-check.mjs --fix <folder>
Updates: ${cfg.source ? 'automatic, once a day, from ' + cfg.source : 'no source set; re-run with --source <url> to turn them on'}
`);
