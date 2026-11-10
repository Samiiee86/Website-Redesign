#!/usr/bin/env node
/* TestMu DS check: snaps off-system styling to the nearest TestMu token.
   - colors   -> nearest color in the TestMu palette (alpha kept)
   - fonts    -> Manrope, or Space Mono for monospace stacks
   - font-size, spacing, font-weight -> nearest step on the TestMu scale
   - radius   -> by element: buttons, inputs, selects 6px · tags, labels, badges 4px · pills, chips, avatars, toggles round ·
                everything else (cards, images, panels) 0px
   Works on CSS/SCSS/LESS, HTML (<style> and style=""), JSX/TSX (style={{}}, styled/css``),
   Vue, Svelte, Astro, and Tailwind arbitrary classes like p-[13px] or text-[#333].

   Usage
     node ds-check.mjs [paths...]            report only (exit 1 if anything is off)
     node ds-check.mjs --fix [paths...]      rewrite files in place
     node ds-check.mjs --hook                after-edit hook for Claude Code (PostToolUse) and Cursor (afterFileEdit): reads the edited file from stdin, fixes it.
                                             With no file in the input (a shell command, or the end of a turn) it fixes every changed file instead.
     node ds-check.mjs --changed [--fix]     every style file changed since the last commit (or in the last 15 minutes outside git)
   Skip a line with a comment containing "ds-ignore". No dependencies. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, execFileSync } from 'node:child_process';
import { ensureGitHook } from './git-hook.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const T = JSON.parse(fs.readFileSync(path.join(HERE, '..', 'tokens', 'tokens.json'), 'utf8'));

/* ---------- token sets ---------- */
const PALETTE = [];
const addHex = h => { h = h.toUpperCase(); if (h.length === 9) h = h.slice(0, 7); if (!PALETTE.includes(h)) PALETTE.push(h); };
for (const v of Object.values(T.color.primitive)) typeof v === 'string' ? addHex(v) : Object.values(v).forEach(addHex);
/* state-only colors (hovers, the hero arrow) are never a snap target */
const STATE_ONLY = new Set(['button-primary-hover', 'button-primary-disabled', 'segment-hover', 'hero-arrow', 'fg-disabled']);
for (const [k, v] of Object.entries(T.color.semantic)) if (!STATE_ONLY.has(k)) addHex(v);
/* any exact token, including state-only ones, is already on the system */
const EXACT = new Set([...PALETTE, ...Object.values(T.color.semantic).map(h => h.toUpperCase().slice(0, 7))]);
const TYPE = [...new Set(Object.values(T.type).map(t => t[0]))].sort((a, b) => a - b);
const SPACE = T.space;
const RADIUS = Object.values(T.radius).filter(r => r < 100).sort((a, b) => a - b);
const SANS = T.font.sans, MONO = T.font.mono;

/* ---------- color math ---------- */
const hexRgb = h => { h = h.replace('#', ''); if (h.length <= 4) h = [...h].map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); };
const lab = ([r, g, b]) => {
  const f = c => { c /= 255; return c > 0.04045 ? ((c + 0.055) / 1.055) ** 2.4 : c / 12.92; };
  const [R, G, B] = [f(r), f(g), f(b)];
  const X = (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047, Y = R * 0.2126 + G * 0.7152 + B * 0.0722, Z = (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883;
  const g3 = t => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
  return [116 * g3(Y) - 16, 500 * (g3(X) - g3(Y)), 200 * (g3(Y) - g3(Z))];
};
const PAL_LAB = PALETTE.map(h => [h, lab(hexRgb(h))]);
function nearestHex(rgb) {
  const L = lab(rgb); let best = null, bd = Infinity;
  for (const [h, p] of PAL_LAB) { const d = (L[0] - p[0]) ** 2 + (L[1] - p[1]) ** 2 + (L[2] - p[2]) ** 2; if (d < bd) { bd = d; best = h; } }
  return best;
}
function snapHex(hex) {
  const body = hex.slice(1); const hasA = body.length === 4 || body.length === 8;
  const alpha = hasA ? (body.length === 4 ? body[3] + body[3] : body.slice(6)) : '';
  const rgb = hexRgb(body.length === 4 ? body.slice(0, 3) : body.slice(0, 6));
  const full = '#' + (body.length <= 4 ? [...body.slice(0, 3)].map(c => c + c).join('') : body.slice(0, 6));
  if (EXACT.has(full.toUpperCase())) return hex;
  const near = nearestHex(rgb);
  const same = near.toUpperCase() === ('#' + (body.length <= 4 ? [...body.slice(0, 3)].map(c => c + c).join('') : body.slice(0, 6))).toUpperCase();
  if (same) return hex;
  const out = near + (alpha ? alpha.toUpperCase() : '');
  return hex === hex.toLowerCase() ? out.toLowerCase() : out;
}
function snapRgbFn(fn, args) {
  const p = args.split(/[\s,/]+/).filter(Boolean);
  if (p.length < 3 || p.slice(0, 3).some(x => !/^\d+(\.\d+)?$/.test(x))) return null;
  const rgb = p.slice(0, 3).map(Number); const near = hexRgb(nearestHex(rgb));
  if (near.every((v, i) => v === rgb[i])) return null;
  return p.length > 3 ? `rgba(${near.join(', ')}, ${p[3]})` : `rgb(${near.join(', ')})`;
}

/* ---------- number snapping ---------- */
const nearest = (n, set) => set.reduce((a, b) => Math.abs(b - n) < Math.abs(a - n) ? b : a);
const toPx = (num, unit) => unit === 'rem' || unit === 'em' ? num * 16 : num;
function snapLength(v, set, { keepSmall = 1, allowFull = false } = {}) {
  return v.replace(/(-?)(\d*\.?\d+)(px|rem)\b/g, (m, sign, n, unit) => {
    const px = toPx(parseFloat(n), unit);
    if (px <= keepSmall) return m;
    if (allowFull && px >= 100) return '9999px';
    if (allowFull && px >= 10) return '0px';   /* radius: anything bigger than a control's 6px is a surface, and surfaces are sharp */
    const s = nearest(px, set);
    return s === px && unit === 'px' ? m : `${sign}${s}px`;
  });
}

/* ---------- corners follow the element ---------- */
const PILL = new Set(['pill', 'pills', 'chip', 'chips', 'avatar', 'avatars', 'toggle', 'toggles', 'switch', 'switches', 'knob', 'radio', 'radios', 'token', 'tokens', 'circle', 'circles', 'fab', 'dot', 'dots', 'thumb', 'handle']);
const TAG = new Set(['tag', 'tags', 'label', 'labels', 'lbl', 'badge', 'badges', 'checkbox', 'checkboxes', 'check', 'tooltip', 'kbd', 'status', 'eyebrow']);
const CTRL = new Set(['btn', 'btns', 'button', 'buttons', 'input', 'inputs', 'field', 'fields', 'select', 'selects', 'textarea', 'search', 'dropdown', 'combobox', 'combo', 'seg', 'segment', 'segments', 'segmented',
  'submit', 'signin', 'signup', 'login', 'logout', 'register', 'subscribe', 'cancel', 'confirm', 'iconbtn', 'ibtn', 'sqbtn', 'navbtn', 'textbox', 'searchbox', 'listbox', 'picker', 'datepicker', 'stepper', 'menubutton']);
/* surfaces: these stay sharp even when they are clickable */
const SURFACE = new Set(['card', 'cards', 'panel', 'panels', 'modal', 'dialog', 'section', 'hero', 'banner', 'tile', 'tiles', 'container', 'wrapper', 'image', 'img', 'media', 'video', 'table', 'sheet', 'drawer', 'popover', 'box', 'boxes', 'frame', 'thumbnail', 'figure']);
/* names that are buttons only when the element also looks like one (a link tag, or small and clickable) */
const MAYBE_CTRL = new Set(['cta', 'ctas', 'action', 'actions', 'primary', 'secondary', 'tertiary', 'ghost', 'outline', 'outlined', 'link', 'links', 'go', 'next', 'prev', 'back', 'more', 'buy', 'start']);
const words = s => String(s || '').replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
function roleOfWords(s, looksControl = false) {
  const w = words(s);
  if (/rounded-full/.test(s) || w.some(x => PILL.has(x))) return 'pill';
  if (w.some(x => TAG.has(x))) return 'tag';
  if (w.some(x => CTRL.has(x))) return 'control';
  if (w.some(x => SURFACE.has(x))) return 'surface';
  if (looksControl && w.some(x => MAYBE_CTRL.has(x))) return 'control';
  return '';
}
/* what the declarations themselves say: a small square with a big radius is a circle; small and clickable is a control */
const firstPx = v => { const m = String(v).match(/(\d*\.?\d+)(px|rem)\b/); return m ? toPx(parseFloat(m[1]), m[2]) : null; };
function looksOf(body, radiusPx) {
  const num = re => { const m = String(body).match(re); return m ? toPx(parseFloat(m[1]), m[2]) : null; };
  const h = num(/(?:^|[;{\s])(?:min-)?height\s*:\s*(\d*\.?\d+)(px|rem)/), w = num(/(?:^|[;{\s])(?:min-)?width\s*:\s*(\d*\.?\d+)(px|rem)/);
  if (h != null && w != null && h <= 64 && Math.abs(w - h) <= 1 && radiusPx != null && radiusPx >= h / 2 - 1) return 'circle';
  const small = h != null && h <= 64;
  const clicky = /cursor\s*:\s*pointer|appearance\s*:\s*none/.test(body);
  if (small && (clicky || /display\s*:\s*inline-(flex|block|grid)/.test(body))) return 'control';
  if (clicky) return 'clicky';
  return '';
}
function decide(name, body, value, tagLooksControl = false) {
  const look = looksOf(body, firstPx(value));
  if (look === 'circle') return 'pill';
  const r = roleOfWords(name, tagLooksControl || look === 'control' || look === 'clicky');
  if (r) return r === 'surface' ? '' : r;
  if (tagLooksControl && /(^|[;{\s])padding/.test(body)) return 'control';   /* a link or button tag with padding is a button */
  return look === 'control' ? 'control' : '';
}
/* a selector: judge the element the rule styles (its last compound), then the whole selector; a mixed list keeps the default */
function roleOfSelector(sel, body = '', value = '') {
  const parts = String(sel || '').split(',').map(x => x.trim()).filter(Boolean);
  if (!parts.length) return '';
  const roles = parts.map(x => { const last = x.split(/[\s>+~]+/).filter(Boolean).pop() || ''; return decide(last, body, value) || (roleOfWords(last) ? '' : decide(x, '', value)); });
  return roles.every(r => r === roles[0]) ? roles[0] : '';
}
const ROLE_RADIUS = { pill: '9999px', tag: '4px', control: '6px' };
function snapRadius(v, role) {
  const to = ROLE_RADIUS[role];
  if (!to) return snapLength(v, RADIUS, { keepSmall: 0, allowFull: true });
  return v.replace(/(\d*\.?\d+)(px|rem)\b/g, (m, n, u) => toPx(parseFloat(n), u) === 0 ? m : to);
}
/* the opening tag around an offset in markup: tag name plus class, id, role and type */
function elementContext(s, off) {
  const i = s.lastIndexOf('<', off); if (i < 0) return '';
  const j = s.indexOf('>', off), tag = s.slice(i, j < 0 ? s.length : j + 1);
  const name = (tag.match(/^<\s*([A-Za-z][\w.-]*)/) || [])[1] || '';
  const attrs = [...tag.matchAll(/\b(?:class|className|id|role|type)\s*=\s*(?:"([^"]*)"|'([^']*)'|\{\s*[`"']([^`"']*)[`"']\s*\})/g)].map(m => m[1] ?? m[2] ?? m[3] ?? '');
  return [name, ...attrs].join(' ');
}
const isActionTag = ctx => /^(a|button|summary)\b/i.test(String(ctx).trim());
/* the selector stack (innermost last, each with its block body) at each position of a CSS text */
function selectorsAt(css) {
  const ev = [], stack = []; let last = 0;
  const closeOf = i => { let d = 0; for (let k = i; k < css.length; k++) { if (css[k] === '{') d++; else if (css[k] === '}' && --d === 0) return k; } return css.length; };
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (c === '{') { stack.push({ sel: css.slice(last, i).replace(/\/\*[\s\S]*?\*\//g, '').trim(), body: css.slice(i + 1, closeOf(i)).replace(/\{[^{}]*\}/g, '') }); ev.push([i, [...stack]]); last = i + 1; }
    else if (c === '}') { stack.pop(); ev.push([i, [...stack]]); last = i + 1; }
    else if (c === ';') last = i + 1;
  }
  return pos => { let lo = 0, hi = ev.length - 1, st = []; while (lo <= hi) { const mid = (lo + hi) >> 1; if (ev[mid][0] < pos) { st = ev[mid][1]; lo = mid + 1; } else hi = mid - 1; } return st; };
}

/* ---------- CSS declaration rules ---------- */
const kebab = s => s.replace(/[A-Z]/g, c => '-' + c.toLowerCase());
const SPACING_PROP = /^(margin|padding|gap|row-gap|column-gap|grid-gap|top|right|bottom|left|inset)(-(top|right|bottom|left|block|inline|x|y|start|end|block-start|block-end|inline-start|inline-end))*$/;
function fixDecl(prop, value, role = '') {
  const p = kebab(prop.trim()).replace(/^-(webkit|moz|ms)-/, '');
  let v = value;
  if (/var\(|calc\(|clamp\(|min\(|max\(/.test(v) && !/(#|rgb)/.test(v)) return v;
  if (p === 'font-family') {
    if (/manrope|space mono|geist pixel|var\(|inherit|initial|unset/i.test(v)) return v;
    const q = /['"]/.test(v[0]) ? '' : '';
    return /mono|code|courier|consolas|menlo|monaco/i.test(v) ? MONO + q : SANS + q;
  }
  if (p === 'font-size') return snapLength(v, TYPE, { keepSmall: 0 });
  if (p === 'font-weight') {
    return v.replace(/\b(bold|bolder|lighter|normal|[1-9]00)\b/g, w => {
      const n = { bold: 700, bolder: 700, lighter: 300, normal: 400 }[w] ?? +w;
      const s = n >= 600 ? (n === 600 ? 600 : 600) : n <= 300 ? 300 : n;
      return String(s) === w ? w : String(s);
    });
  }
  if (p === 'font') v = v.replace(/(\d*\.?\d+)(px|rem)(?=\s*(\/|\s))/, (m, n, u) => nearest(toPx(+n, u), TYPE) + 'px');
  if (SPACING_PROP.test(p)) v = snapLength(v, SPACE);
  if (/^border(-(top|bottom)-(left|right))?-radius$|^border-(start|end)-(start|end)-radius$/.test(p)) v = snapRadius(v, role);
  return fixColors(v);
}
function fixColors(v) {
  v = v.replace(/#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g, m => snapHex(m));
  return v.replace(/\b(rgba?)\(([^)]*)\)/g, (m, fn, args) => snapRgbFn(fn, args) || m);
}
/* a block of CSS text: rules, @media, inline style="" bodies. ctx describes the element when there is no selector (style="" or styled.button``) */
function fixCssText(css, ctx = '') {
  const at = selectorsAt(css); let pos = 0;
  const roleAt = (off, val) => { const st = at(off); for (let k = st.length - 1; k >= 0; k--) { const r = roleOfSelector(st[k].sel, st[k].body, val); if (r) return r; }
    return st.length ? (ctx ? decide(ctx, '', val, isActionTag(ctx)) : '') : decide(ctx, css, val, isActionTag(ctx)); };
  return css.split('\n').map(line => { const start = pos; pos += line.length + 1; return /ds-ignore/.test(line) ? line :
    line.replace(/(^|[{;\s])([-a-zA-Z]+)\s*:\s*([^;{}]+?)(\s*(?:!important)?\s*)(?=;|}|$)/g, (m, pre, prop, val, tail, off) => {
      if (/^(https?|data)$/.test(prop) || /^[a-z]+$/.test(prop) === false && !/^-/.test(prop) && !/-/.test(prop)) return m;
      const nv = fixDecl(prop, val, /radius/i.test(prop) ? roleAt(start + off + pre.length, val) : ''); return nv === val ? m : `${pre}${prop}: ${nv}${tail}`;
    }); }).join('\n');
}
/* React style objects: { fontSize: 15, padding: '13px 9px', color: '#333' } */
function fixStyleObject(src, ctx = '') {
  const body = src.replace(/([A-Za-z]+)\s*:\s*(-?\d*\.?\d+)\b/g, (m, k, n) => `${kebab(k)}: ${n}px`).replace(/([A-Za-z]+)\s*:\s*['"`]([^'"`]*)['"`]/g, (m, k, v) => `${kebab(k)}: ${v}`).replace(/,/g, ';');
  const rv = (src.match(/borderRadius\s*:\s*['"`]?(\d*\.?\d+)/) || [])[1];
  const role = decide(ctx, body, rv != null ? rv + 'px' : '', isActionTag(ctx));
  return src.replace(/([A-Za-z]+)\s*:\s*(-?\d*\.?\d+|'[^']*'|"[^"]*"|`[^`]*`)/g, (m, prop, val) => {
    const q = /^['"`]/.test(val) ? val[0] : '';
    let raw = q ? val.slice(1, -1) : val;
    const kp = kebab(prop);
    const numericPx = !q && /^(font-size|margin|padding|gap|row-gap|column-gap|top|right|bottom|left|inset|border-radius)/.test(kp) || /^(margin|padding)-/.test(kp);
    if (!q && !numericPx) return m;
    if (!q) { const nv = fixDecl(kp, raw + 'px', role).replace(/px$/, ''); return nv === raw ? m : `${prop}: ${nv}`; }
    let nv = fixDecl(kp, raw, role); if (nv === raw) return m;
    if (q === "'") nv = nv.replace(/'/g, '"'); else if (q === '"') nv = nv.replace(/"/g, "'");
    return `${prop}: ${q}${nv}${q}`;
  });
}
/* Tailwind: the element's role from its tag, its class names and its size classes */
function twRole(ctx, cls, val) {
  const size = k => { const m = cls.match(new RegExp(`(?:^|\\s)(?:min-)?${k}-(?:\\[(\\d*\\.?\\d+)px\\]|(\\d+))(?=\\s|$)`)); return m ? (m[1] != null ? +m[1] : +m[2] * 4) : null; };
  const w = size('w'), h = size('h'), r = firstPx(val);
  if (w != null && h != null && w === h && h <= 64 && r != null && r >= h / 2 - 1) return 'pill';
  const small = h != null && h <= 64, clicky = /(?:^|\s)cursor-pointer(?=\s|$)/.test(cls);
  const looks = isActionTag(ctx) || (small && (clicky || /(?:^|\s)inline-(flex|block|grid)(?=\s|$)/.test(cls))) || clicky;
  const role = roleOfWords(ctx + ' ' + cls, looks);
  if (role) return role === 'surface' ? '' : role;
  if (isActionTag(ctx) && /(?:^|\s)(p|px|py)-/.test(cls)) return 'control';
  return small && (clicky || /(?:^|\s)inline-(flex|block|grid)(?=\s|$)/.test(cls)) ? 'control' : '';
}
/* Tailwind arbitrary values inside class strings */
const TW_SPACE = /^(-?)(p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me|gap|gap-x|gap-y|space-x|space-y|top|right|bottom|left|inset|inset-x|inset-y)$/;
function fixTailwind(cls, ctx = '') {
  return cls.replace(/(^|[\s"'`:])([a-z!-]+(?:-[a-z]+)*)-\[([^\]\s]+)\]/g, (m, pre, util, val) => {
    let nv = val, u = util.replace(/^!/, '');
    if (/^#[0-9a-fA-F]{3,8}$/.test(val)) nv = snapHex(val);
    else if (/^(-?\d*\.?\d+)(px|rem)$/.test(val)) {
      if (u === 'text') nv = snapLength(val, TYPE, { keepSmall: 0 });
      else if (TW_SPACE.test(u)) nv = snapLength(val, SPACE);
      else if (/^rounded/.test(u)) nv = snapRadius(val, twRole(ctx, cls, val));
    } else if (u === 'font' && /^['"]?[A-Za-z]/.test(val) && !/manrope|space|geist/i.test(val)) {
      return `${pre}${/mono|code|courier/i.test(val) ? 'font-mono' : 'font-sans'}`;
    }
    return nv === val ? m : `${pre}${util}-[${nv}]`;
  });
}

/* ---------- per file type ---------- */
const CSS_EXT = new Set(['.css', '.scss', '.sass', '.less', '.pcss']);
const MARKUP_EXT = new Set(['.html', '.htm', '.vue', '.svelte', '.astro', '.jsx', '.tsx', '.js', '.ts', '.mjs', '.mdx']);
function fixSource(text, ext) {
  if (CSS_EXT.has(ext)) return fixCssText(text);
  let out = text;
  out = out.replace(/(<style[^>]*>)([\s\S]*?)(<\/style>)/gi, (m, a, css, b) => a + fixCssText(css) + b);
  out = out.replace(/(\sstyle\s*=\s*")([^"]*)(")/gi, (m, a, css, b, off, s) => a + fixCssText(css, elementContext(s, off)) + b);
  out = out.replace(/(\sstyle\s*=\s*')([^']*)(')/gi, (m, a, css, b, off, s) => a + fixCssText(css, elementContext(s, off)) + b);
  out = out.replace(/(style\s*=\s*\{\{)([\s\S]*?)(\}\})/g, (m, a, obj, b, off, s) => a + fixStyleObject(obj, elementContext(s, off)) + b);
  out = out.replace(/((?:styled(?:\.\w+|\([^)]*\))(?:\.attrs\([^)]*\))?|css|createGlobalStyle|keyframes)\s*`)([\s\S]*?)(`)/g, (m, a, css, b, off, s) => a + fixCssText(css, a + ' ' + s.slice(Math.max(0, off - 80), off).split(/[;\n]/).pop()) + b);
  out = out.replace(/(\b(?:class|className|:class)\s*=\s*)(["'`{])([\s\S]*?)(?=["'`}](?:\s|>|\/))/g, (m, a, q, body, off, s) => a + q + fixTailwind(body, elementContext(s, off)));
  out = out.replace(/((?:clsx|cn|cva|twMerge|classNames)\()([\s\S]*?)(\))/g, (m, a, body, b, off, s) => a + fixTailwind(body, s.slice(Math.max(0, off - 120), off).split(/[;\n]/).pop()) + b);
  out = out.replace(/(['"`])(#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3}))\1/g, (m, q, hex) => q + snapHex(hex) + q);
  return out;
}

/* ---------- files ---------- */
const SKIP_DIR = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'out', 'coverage', '.turbo', '.vercel', 'vendor']);
const SKIP_FILE = /(^|\/)(tokens\.css|theme\.css|testmu(-base)?\.css|tailwind\.preset\.cjs|tokens\.json|.*\.min\.(css|js))$/;
const OWN = /[\\/]testmu-ds[\\/]|[\\/]\.testmu[\\/]/;
function walk(p, acc) {
  let st; try { st = fs.statSync(p); } catch { return acc; }
  if (st.isDirectory()) { if (!SKIP_DIR.has(path.basename(p))) for (const f of fs.readdirSync(p)) walk(path.join(p, f), acc); }
  else acc.push(p);
  return acc;
}
function diffLines(a, b, file) {
  const A = a.split('\n'), B = b.split('\n'), out = [];
  for (let i = 0; i < Math.max(A.length, B.length); i++) if (A[i] !== B[i]) out.push({ file, line: i + 1, before: (A[i] || '').trim().slice(0, 140), after: (B[i] || '').trim().slice(0, 140) });
  return out;
}
function processFile(file, write) {
  const ext = path.extname(file).toLowerCase();
  if (!CSS_EXT.has(ext) && !MARKUP_EXT.has(ext)) return [];
  if (SKIP_FILE.test(file.replace(/\\/g, '/')) || OWN.test(file)) return [];
  let src; try { src = fs.readFileSync(file, 'utf8'); } catch { return []; }
  if (src.length > 2_000_000) return [];
  const fixed = fixSource(src, ext);
  if (fixed === src) return [];
  if (write) fs.writeFileSync(file, fixed);
  return diffLines(src, fixed, file);
}

/* ---------- changed files (shell commands write files the edit hook never sees) ---------- */
function changedFiles(root) {
  const keep = f => CSS_EXT.has(path.extname(f).toLowerCase()) || MARKUP_EXT.has(path.extname(f).toLowerCase());
  try {
    const out = execFileSync('git', ['status', '--porcelain', '-z', '--untracked-files=all'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 32 << 20 });
    const top = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    const parts = out.split('\0'), files = [];
    for (let i = 0; i < parts.length; i++) {
      const e = parts[i]; if (!e) continue;
      const st = e.slice(0, 2), f = e.slice(3);
      if (st[0] === 'R' || st[0] === 'C') i++;              /* rename: the next entry is the old path */
      if (st.includes('D')) continue;
      files.push(path.join(top, f));
    }
    return files.filter(keep).slice(0, 300);
  } catch {
    const since = Date.now() - 15 * 60 * 1000;
    return walk(root, []).filter(f => keep(f) && (() => { try { return fs.statSync(f).mtimeMs >= since; } catch { return false; } })()).slice(0, 300);
  }
}
const projectRoot = from => { let r = path.resolve(from); while (!fs.existsSync(path.join(r, '.testmu')) && path.dirname(r) !== r) r = path.dirname(r); return fs.existsSync(path.join(r, '.testmu')) ? r : null; };

/* ---------- CLI ---------- */
const args = process.argv.slice(2);
const FIX = args.includes('--fix'), HOOK = args.includes('--hook'), JSONOUT = args.includes('--json'), CHANGED = args.includes('--changed');
if (HOOK) {
  let input = ''; process.stdin.on('data', d => input += d); process.stdin.on('end', () => {
    let j = {}; try { j = JSON.parse(input || '{}'); } catch {}
    /* Claude Code: tool_input.file_path (Edit, Write, MultiEdit) or notebook_path · Cursor afterFileEdit: file_path */
    const file = j.tool_input?.file_path || j.tool_input?.notebook_path || j.tool_input?.path || j.file_path || null;
    const event = j.hook_event_name || '';
    /* opt-in: only projects that contain a .testmu folder (made by install.mjs) are touched */
    const start = file ? path.dirname(path.resolve(j.cwd || '.', file)) : (process.env.CLAUDE_PROJECT_DIR || j.cwd || (j.workspace_roots || [])[0] || process.cwd());
    const root = process.env.TESTMU_DS ? path.resolve(start) : projectRoot(start);
    if (!root) process.exit(0);
    /* once a day, refresh the design system in the background (never blocks the edit) */
    const upd = path.join(root, '.testmu', 'bin', 'update.mjs');
    if (fs.existsSync(upd)) { try { spawn(process.execPath, [upd, '--if-due', '--quiet'], { cwd: root, detached: true, stdio: 'ignore' }).unref(); } catch {} }
    /* every teammate gets the commit check, even when they only cloned the repo */
    try { ensureGitHook(root); } catch {}
    const targets = file ? [path.resolve(j.cwd || '.', file)] : changedFiles(root);
    const changes = targets.flatMap(f => processFile(f, true));
    if (changes.length && event !== 'Stop' && event !== 'SubagentStop' && event !== 'stop') {
      const list = changes.slice(0, 12).map(c => `  ${path.relative(root, c.file)} line ${c.line}: ${c.before}  ->  ${c.after}`).join('\n');
      const msg = `TestMu DS aligned ${changes.length} line(s) to the design tokens (colors, fonts, type sizes, spacing, corners):\n${list}\nKeep using these values; they are the TestMu standard.`;
      process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: event || 'PostToolUse', additionalContext: msg } }));
    }
    process.exit(0);
  });
} else {
  const paths = args.filter(a => !a.startsWith('--'));
  const files = CHANGED ? changedFiles(projectRoot(process.cwd()) || process.cwd()) : (paths.length ? paths : ['.']).flatMap(p => walk(path.resolve(p), []));
  const all = files.flatMap(f => processFile(f, FIX));
  if (JSONOUT) console.log(JSON.stringify(all, null, 1));
  else if (!all.length) console.log('TestMu DS: everything is on the system.');
  else {
    for (const c of all) console.log(`${path.relative(process.cwd(), c.file)}:${c.line}\n  - ${c.before}\n  + ${c.after}`);
    console.log(`\nTestMu DS: ${all.length} line(s) ${FIX ? 'fixed' : 'off the system. Run with --fix to align them.'}`);
  }
  process.exit(!FIX && all.length ? 1 : 0);
}
