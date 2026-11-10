#!/usr/bin/env node
/* TestMu DS updater. Keeps an installed project on the latest published design system.
     node .testmu/bin/update.mjs              check now, update if the published kit changed
     node .testmu/bin/update.mjs --if-due     same, but at most once a day (used by the hooks)
     node .testmu/bin/update.mjs --check      only report whether an update exists
     node .testmu/bin/update.mjs --quiet      print nothing unless something changed
   The published kit is a folder with manifest.json ({ version, files: { path: sha256 } }).
   Its address is "source" in .testmu/config.json, set by the installer.
   Every file is checked against its sha256 before anything is replaced; then the installer runs
   again from the new files, so tokens, styles, rules, hooks and the fixer all move together. */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const IF_DUE = args.includes('--if-due'), CHECK = args.includes('--check'), QUIET = args.includes('--quiet');
const DAY = 24 * 60 * 60 * 1000;
const say = (...m) => { if (!QUIET) console.log(...m); };

/* the project is the folder that holds .testmu (this file lives in .testmu/bin) */
const HERE = path.dirname(fileURLToPath(import.meta.url));
let project = path.resolve(args.find(a => !a.startsWith('--')) || process.cwd());
if (path.basename(path.dirname(HERE)) === '.testmu') project = path.dirname(path.dirname(HERE));
const dot = path.join(project, '.testmu');
const cfgPath = path.join(dot, 'config.json');
if (!fs.existsSync(dot)) { say('TestMu DS: no .testmu folder here. Run the installer first.'); process.exit(0); }

let cfg = {}; try { cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8')); } catch {}
const save = () => fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2) + '\n');
if (!cfg.source) { say('TestMu DS: no update source in .testmu/config.json.'); process.exit(0); }
if (cfg.autoUpdate === false && IF_DUE) process.exit(0);
if (IF_DUE && cfg.checkedAt && Date.now() - Date.parse(cfg.checkedAt) < DAY) process.exit(0);

const base = cfg.source.replace(/\/+$/, '');
async function get(url, asText = true) {
  const r = await fetch(url, { signal: AbortSignal.timeout(8000), cache: 'no-store' });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return asText ? r.text() : Buffer.from(await r.arrayBuffer());
}

try {
  const manifest = JSON.parse(await get(`${base}/manifest.json`));
  cfg.checkedAt = new Date().toISOString(); save();
  if (manifest.version === cfg.version) { say(`TestMu DS is up to date (${cfg.version}).`); process.exit(0); }
  if (CHECK) { console.log(`TestMu DS update available: ${cfg.version || 'unknown'} -> ${manifest.version}`); process.exit(0); }

  /* download into a fresh temp copy of the kit, verifying every file */
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'testmu-ds-'));
  for (const [rel, sha] of Object.entries(manifest.files)) {
    if (rel.includes('..') || path.isAbsolute(rel)) throw new Error(`refusing path ${rel}`);
    const buf = await get(`${base}/${rel.split('/').map(encodeURIComponent).join('/')}`, false);
    if (crypto.createHash('sha256').update(buf).digest('hex') !== sha) throw new Error(`checksum mismatch for ${rel}`);
    const to = path.join(tmp, rel); fs.mkdirSync(path.dirname(to), { recursive: true }); fs.writeFileSync(to, buf);
  }
  fs.writeFileSync(path.join(tmp, 'manifest.json'), JSON.stringify(manifest));
  const res = spawnSync(process.execPath, [path.join(tmp, 'bin', 'install.mjs'), project, '--quiet', '--source', cfg.source], { encoding: 'utf8' });
  fs.rmSync(tmp, { recursive: true, force: true });
  if (res.status !== 0) throw new Error((res.stderr || 'installer failed').trim());
  console.log(`TestMu DS updated: ${cfg.version || 'unknown'} -> ${manifest.version}. Tokens, styles, rules and the fixer now match the published design system.`);
} catch (e) {
  /* offline or source down: never block an edit or a commit */
  cfg.checkedAt = new Date().toISOString(); save();
  say(`TestMu DS: could not check for updates (${e.message}).`);
}
process.exit(0);
