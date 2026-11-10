#!/usr/bin/env node
/* TestMu DS git hook. Makes sure the project's pre-commit hook aligns staged style files to the tokens.
   Git does not share hooks through clones, so this runs from several places to cover every teammate:
   the installer, Claude Code's session start, every Claude Code / Cursor edit, and npm install ("prepare").
     node .testmu/bin/git-hook.mjs            add or refresh the hook in this project
   Respects core.hooksPath (husky and similar). Never fails a command: it exits 0 even when there is no git. */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const START = '# testmu-ds:start', END = '# testmu-ds:end';
const BLOCK = `${START}  (TestMu DS: stay on the latest design system, then align staged style files to the tokens)
if [ -f .testmu/bin/ds-check.mjs ]; then
  node .testmu/bin/update.mjs --if-due --quiet >/dev/null 2>&1
  git diff --cached --name-only --diff-filter=ACM | grep -E '\\.(css|scss|sass|less|pcss|html|htm|jsx|tsx|js|ts|mjs|vue|svelte|astro|mdx)$' | while IFS= read -r f; do
    node .testmu/bin/ds-check.mjs --fix "$f" >/dev/null 2>&1 && git add -- "$f"
  done
fi
${END}
`;

/* the hooks folder git actually uses for this project, or null when it is not a git work tree */
function hooksDir(root) {
  let top;
  try { top = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return null; }
  let custom = '';
  try { custom = execFileSync('git', ['config', '--get', 'core.hooksPath'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch {}
  if (custom) return path.resolve(top, custom);
  try { return path.resolve(top, execFileSync('git', ['rev-parse', '--git-path', 'hooks'], { cwd: top, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()); } catch { return null; }
}

/* adds the block, or refreshes it when it is out of date; returns the hook path when it changed anything */
export function ensureGitHook(root) {
  const dir = hooksDir(root); if (!dir) return null;
  const hp = path.join(dir, 'pre-commit');
  let cur = '';
  try { cur = fs.readFileSync(hp, 'utf8'); } catch {}
  if (cur.includes(BLOCK)) return null;
  cur = cur.replace(new RegExp(`${START}[\\s\\S]*?${END}\\n?`), '');
  if (!cur.trim()) cur = '#!/bin/sh\n';
  try {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(hp, cur.replace(/\s*$/, '\n') + BLOCK);
    fs.chmodSync(hp, 0o755);
    return hp;
  } catch { return null; }
}

/* CLI: run from anywhere inside the project */
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let root = process.cwd();
  while (!fs.existsSync(path.join(root, '.testmu')) && path.dirname(root) !== root) root = path.dirname(root);
  ensureGitHook(fs.existsSync(path.join(root, '.testmu')) ? root : process.cwd());
  process.exit(0);
}
