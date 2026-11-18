// @ts-nocheck
/* The behaviour of the version 10 home: the hero demo (a pure function of
   time), the starting-point switch that also drives pricing, the pinned
   three-chapter story and the terminal. Ported from the design file and
   scoped to the page root. Returns a cleanup function. */

export function startHome10(root: HTMLElement): () => void {
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = root) => r.querySelector(s);
  const $$ = (s, r = root) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const prog = (t, a, b) => clamp((t - a) / (b - a));
  const ss = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
  const mob = matchMedia("(max-width:760px)");
  const offs = [];
  const on = (el, ev, fn, o?) => { el.addEventListener(ev, fn, o); offs.push(() => el.removeEventListener(ev, fn, o)); };
  let alive = true;

  /* the console's glass shows a blurred copy of the painting, lined up with the hero */
  const hero = $(".x-hero"), con = $("#x-console");
  function alignGlass() {
    const h = hero.getBoundingClientRect(), c = con.getBoundingClientRect();
    const sc = Math.max(h.width / 1600, h.height / 1060), bw = 1600 * sc, bh = 1060 * sc, st = con.style;
    st.setProperty("--bw", bw.toFixed(0) + "px"); st.setProperty("--bh", bh.toFixed(0) + "px");
    st.setProperty("--bx", ((h.width - bw) / 2 - (c.left - h.left)).toFixed(0) + "px");
    st.setProperty("--by", (-(c.top - h.top)).toFixed(0) + "px");
  }
  alignGlass(); on(window, "resize", alignGlass);
  document.fonts && document.fonts.ready.then(() => alive && alignGlass());

  /* ================= hero console ================= */
  const R = 12;
  const AG = [{ s: 0, e: 1.6, d: ["reading the diff", "3 surfaces changed", "planned 3 checks"] }, { s: 1.0, e: 3.0, d: ["writing checkout steps", "building caller persona", "mapping tool calls"] }, { s: 2.4, e: 8.6, d: ["3 checks in parallel", "chrome, voice, a2a", "collecting traces"] }, { s: 8.0, e: 11.0, d: ["judging 3 runs", "sealing .evidence", "gate decided"] }];
  const IDLE = ["reads the diff, picks checks", "writes the tests", "runs them in parallel", "judges and seals evidence"];
  const L0 = [3.0, 3.9, 4.8, 5.7], L0v = 6.2, L1 = { u: 3.1, b: 4.6, e: 6.3, v: 7.2 }, L2 = [3.4, 5.0, 6.8], L2v = [8.3, 7.8];
  const LOGS = [[[0.2, "planner", "diff: cart.ts, refund-bot prompt, payments tool"], [0.9, "planner", "3 checks: web, voice, agent-to-agent"], [1.4, "author", "checkout_test.md written (4 steps)"], [2.1, "author", "persona: upset customer, broken order"], [2.7, "executor", "chrome headless started"], [3.3, "executor", "voice call connected to refund-bot"], [4.7, "executor", "issue_refund() sent to payments-agent"], [6.2, "analyst", "checkout: PASS"], [7.2, "analyst", "refund-bot: FAIL, credit above policy. bug filed"], [8.3, "analyst", "payments: sandbox timeout. unable to verify"], [9.2, "analyst", "writing .evidence (video, transcript, traces)"], [10.6, "gate", "blocked: 1 fail, 1 unverified"]],
  [[0.2, "planner", "diff: refund-bot prompt fix, sandbox restored"], [0.9, "planner", "re-running 3 checks"], [1.4, "author", "checkout replayed from cache"], [2.1, "author", "same persona, same policy check"], [2.7, "executor", "chrome headless started"], [3.3, "executor", "voice call connected to refund-bot"], [4.7, "executor", "issue_refund() sent to payments-agent"], [6.2, "analyst", "checkout: PASS"], [7.2, "analyst", "refund-bot: PASS, within policy"], [7.8, "analyst", "payments: PASS, refund matches order"], [9.2, "analyst", "writing .evidence (video, transcript, traces)"], [10.6, "gate", "cleared: 3 of 3 verified"]]];
  const WHO = { planner: "var(--x-plan)", author: "var(--x-author)", executor: "var(--x-exec)", analyst: "var(--x-analyse)", gate: "var(--tm-fg-default)" };
  const agents = $$(".x-agent").map((a) => ({ el: a, base: a.className.replace(/ (on|done)/g, ""), s: $(".x-agent-s", a), d: $(".x-agent-d", a), bar: $(".x-agent-bar i", a) }));
  const lanes = $$(".x-lane").map((l) => ({ el: l, steps: $$(".x-steps li", l), vd: $(".x-vd", l) }));
  const wave = $(".x-wave"); wave.innerHTML = ""; for (let i = 0; i < 28; i++) wave.appendChild(document.createElement("i")); const bars = $$("i", wave);
  const bubs = $$(".x-bub"), botLine = $("#x-bot-line"), evalLine = $("#x-eval-line"), pkt = $("#x-pkt"), log = $("#x-log");
  const evBar = $("#x-ev-bar"), evHash = $("#x-ev-hash"), evName = $("#x-ev-name"), gate = $("#x-gate"), gateT = $("#x-gate-t"), gateS = $("#x-gate-s");
  const cRun = $("#x-c-run"), tlHead = $("#x-tl-head"), tlFill = $("#x-tl-fill"), tlT = $("#x-tl-t"), track = $("#x-track"), runBtns = $$(".x-tl-runs button");
  const chips = $$(".x-chip"), chipDots = $$(".x-chip i"); const grid = $("#x-c-grid");
  const cache = new Map();
  const set = (el, k, v, fn) => { let m = cache.get(el); if (!m) { m = {}; cache.set(el, m); } if (m[k] !== v) { m[k] = v; fn(v); } };
  const txt = (el, v) => set(el, "t", v, (x) => (el.textContent = x));
  const html = (el, v) => set(el, "h", v, (x) => (el.innerHTML = x));
  const cls = (el, v) => set(el, "c", v, (x) => (el.className = x));
  const sty = (el, p, v) => set(el, p, v, (x) => (el.style[p] = x));
  const HEX = "0123456789abcdef";
  const hashAt = (seed, n) => { let h = "", x = seed * 9301 + 49297; for (let i = 0; i < n; i++) { x = (x * 9301 + 49297) % 233280; h += HEX[Math.floor((x / 233280) * 16)]; } return h; };
  const VD = "x-vd text-b4 x-mono";
  function setVerdict(L, kind, b, s) {
    const key = kind + b + s; const vd = L.vd; if (vd.dataset.k === key) return;
    const landed = kind && vd.dataset.k !== undefined; vd.dataset.k = key;
    vd.className = VD + (kind ? " " + kind : "") + (landed && !RM ? " land" : "");
    vd.innerHTML = kind ? `<b>${b}</b><span>${s}</span>` : `<span>${b}</span>`;
  }
  let liveLane = 0, focus = null;
  const LANE = "x-lane";
  function render(run, t, now) {
    txt(cRun, run ? "run 2 of 2, after fix" : "run 1 of 2");
    agents.forEach((a, i) => {
      const g = AG[i], p = prog(t, g.s, g.e), on = t >= g.s && t < g.e, done = t >= g.e;
      cls(a.el, a.base + (on ? " on" : "") + (done ? " done" : "")); txt(a.s, on ? "working" : done ? "done" : "idle");
      const di = on ? Math.min(2, Math.floor(p * 3)) : done ? 2 : -1; txt(a.d, di < 0 ? IDLE[i] : g.d[di]); sty(a.bar, "transform", `scaleX(${p.toFixed(3)})`);
    });
    const ex = t >= 2.4 && t < 8.6;
    const st = [];
    const l0 = lanes[0]; cls(l0.el, LANE + (t >= 2.6 && t < L0v ? " run" : "") + (focus === 0 ? " focus" : ""));
    l0.steps.forEach((li, i) => { const s0 = i ? L0[i - 1] : 2.6; cls(li, t >= L0[i] ? "ok" : t >= s0 ? "a" : t >= 1.4 ? "w" : ""); });
    if (t >= L0v) { setVerdict(l0, "pass", "PASS", run ? "replayed, no model call" : "total matches, 4 of 4 steps"); st[0] = "pass"; } else { setVerdict(l0, "", t >= 2.6 ? "running" : "waiting for run"); st[0] = t >= 2.6 ? "run" : ""; }
    const l1 = lanes[1], talk = t >= L1.u - 0.3 && t < L1.e; cls(l1.el, LANE + (talk ? " run" : "") + (focus === 1 ? " focus" : ""));
    const tt = now / 1000;
    bars.forEach((b, i) => { let h = 0.15; if (talk && !RM) { const k = Math.sin(tt * 9 + i * 0.7) * 0.5 + 0.5, k2 = Math.sin(tt * 3.3 + i * 1.9) * 0.5 + 0.5; h = 0.15 + 0.85 * k * k2; } sty(b, "transform", `scaleY(${h.toFixed(2)})`); sty(b, "opacity", talk ? ".85" : ".3"); });
    bubs[0].classList.toggle("in", t >= L1.u); bubs[1].classList.toggle("in", t >= L1.b);
    txt(botLine, run ? "Sorry about that. I have refunded the full order to your card." : "Sorry about that. Full refund done, plus a $50 credit.");
    const ev = t >= L1.v; txt(evalLine, ev ? (run ? "policy check: refund within limit" : "policy check: credit above $25 limit") : "evaluator: checking refund policy");
    cls(evalLine, "x-bub e text-b4 x-mono" + (t >= L1.e ? " in" : "") + (ev ? (run ? " good" : " bad") : ""));
    if (ev) { run ? setVerdict(l1, "pass", "PASS", "within refund policy") : setVerdict(l1, "fail", "FAIL", "reported as bug, not healed"); st[1] = run ? "pass" : "fail"; } else { setVerdict(l1, "", talk ? "call in progress" : "waiting for run"); st[1] = talk ? "run" : ""; }
    const l2 = lanes[2], v2 = L2v[run]; cls(l2.el, LANE + (t >= 2.8 && t < v2 ? " run" : "") + (focus === 2 ? " focus" : ""));
    l2.steps.forEach((li, i) => {
      const s0 = i ? L2[i - 1] : 2.8; let s = t >= 1.6 ? "w" : ""; if (t >= s0) s = "a";
      if (!run && i === 1 && t >= 5.0) s = t >= v2 ? "q" : "a"; else if (!run && i === 2) s = t >= 1.6 ? "w" : ""; else if (t >= L2[i]) s = "ok"; cls(li, s);
    });
    const pk = ex && t < (run ? 7.6 : 8.2); pkt.setAttribute("opacity", pk ? 1 : 0); if (pk) pkt.setAttribute("cx", (113 + 74 * ((tt * 0.9) % 1)).toFixed(1));
    if (t >= v2) { run ? setVerdict(l2, "pass", "PASS", "3 of 3 tool calls verified") : setVerdict(l2, "unk", "UNABLE TO VERIFY", "sandbox down, no guess"); st[2] = run ? "pass" : "unk"; } else { setVerdict(l2, "", t >= 2.8 ? "calling tools" : "waiting for run"); st[2] = t >= 2.8 ? "run" : ""; }
    chipDots.forEach((d, i) => set(d, "s", st[i], (v) => (d.dataset.s = v || "")));
    liveLane = t < L0v + 0.9 ? 0 : t < L1.v + 1.1 ? 1 : 2;
    if (focus === null && mob.matches) { lanes.forEach((L, i) => L.el.classList.toggle("focus", i === liveLane)); chips.slice(1).forEach((c, i) => set(c, "auto", i === liveLane, (v) => c.classList.toggle("x-auto", v))); }
    const lines = LOGS[run].filter((l) => l[0] <= t).slice(-6);
    html(log, lines.map((l, i) => {
      const last = i === lines.length - 1; const n = last ? Math.floor(prog(t, l[0], l[0] + 0.45) * l[2].length) : l[2].length;
      return `<p${last && t < 11.5 ? ' class="cur"' : ""}><span class="ts">${("00" + l[0].toFixed(1)).slice(-4)}s</span><span class="who" style="color:${WHO[l[1]]}">${l[1]}</span>${l[2].slice(0, n).replace(/&/g, "&amp;").replace(/</g, "&lt;")}</p>`;
    }).join(""));
    const ep = prog(t, 9.0, 10.3); sty(evBar, "transform", `scaleX(${ep.toFixed(3)})`);
    txt(evName, ep >= 1 ? ".evidence sealed" : ep > 0 ? ".evidence writing" : ".evidence");
    txt(evHash, ep <= 0 ? "not sealed" : "sha256 " + hashAt(run * 7 + 3 + (ep < 1 ? Math.floor(t * 20) : 0), 12));
    if (t >= 10.6) { cls(gate, "x-gate " + (run ? "green" : "red")); txt(gateT, run ? "Release cleared" : "Release blocked"); txt(gateS, run ? "3 of 3 verified, evidence sealed" : "1 bug, 1 unverified"); }
    else { cls(gate, "x-gate"); txt(gateT, "Release gate"); txt(gateS, t >= 6.2 ? "verdicts landing" : "waiting for verdicts"); }
    const f = t / R; sty(tlHead, "transform", `translateX(${(f * track.clientWidth).toFixed(1)}px)`); sty(tlFill, "transform", `scaleX(${f.toFixed(4)})`);
    txt(tlT, t.toFixed(1) + "s"); set(track, "v", t.toFixed(1), (v) => { track.setAttribute("aria-valuenow", v); track.setAttribute("aria-valuetext", v + " seconds"); });
    runBtns.forEach((b) => set(b, "p", String(+b.dataset.run === run), (v) => b.setAttribute("aria-pressed", v)));
  }
  let clock = 4.8, playing = !RM, last = performance.now(), visible = true;
  if (RM) clock = R - 0.01;
  let raf = 0;
  function frame(now) {
    const dt = clamp((now - last) / 1000, 0, 0.1); last = now;
    if (visible) {
      if (playing) { const pr = Math.floor(clock / R); clock += dt; if (Math.floor(clock / R) !== pr) clock = (Math.floor(clock / R) % 2) * R + 2.5; clock %= R * 2; }
      const run = Math.floor(clock / R) % 2; render(run, clock - run * R, now);
    }
    raf = requestAnimationFrame(frame);
  }
  const io1 = new IntersectionObserver((es) => es.forEach((e) => (visible = e.isIntersecting))); io1.observe(con);
  raf = requestAnimationFrame(frame);
  const playBtn = $("#x-tl-play");
  function setPlaying(p) { playing = p; playBtn.setAttribute("aria-label", p ? "Pause demo" : "Play demo"); $("#x-ic-pause").setAttribute("display", p ? "inline" : "none"); $("#x-ic-play").setAttribute("display", p ? "none" : "inline"); }
  setPlaying(playing);
  on(playBtn, "click", () => setPlaying(!playing));
  runBtns.forEach((b) => on(b, "click", () => { clock = +b.dataset.run * R + (RM ? R - 0.01 : 0.01); }));
  const scrub = (e) => { const r = track.getBoundingClientRect(), run = Math.floor(clock / R) % 2; clock = run * R + clamp((e.clientX - r.left) / r.width, 0, 0.999) * R; };
  on(track, "pointerdown", (e) => { track.setPointerCapture(e.pointerId); setPlaying(false); scrub(e); });
  on(track, "pointermove", (e) => { if (track.hasPointerCapture(e.pointerId)) scrub(e); });
  on(track, "keydown", (e) => {
    const run = Math.floor(clock / R) % 2, t = clock - run * R;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); setPlaying(false); clock = run * R + clamp(t + (e.key === "ArrowRight" ? 0.5 : -0.5), 0, R - 0.01); }
    else if (e.key === " ") { e.preventDefault(); setPlaying(!playing); }
  });
  function pickChip(c, fromKey?) {
    chips.forEach((x) => { const o = x === c; x.setAttribute("aria-checked", o); x.tabIndex = o ? 0 : -1; });
    focus = c.dataset.f === "" ? null : +c.dataset.f; chips.forEach((x) => { x.classList.remove("x-auto"); cache.delete(x); });
    if (focus === null) grid.removeAttribute("data-focus"); else grid.dataset.focus = focus;
    lanes.forEach((L, i) => L.el.classList.toggle("focus", focus === i || (focus === null && mob.matches && i === liveLane)));
    if (fromKey) c.focus();
  }
  chips.forEach((c) => {
    on(c, "click", () => pickChip(c.getAttribute("aria-checked") === "true" && c.dataset.f !== "" ? chips[0] : c));
    on(c, "keydown", (e) => { const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (d) { e.preventDefault(); const vis = chips.filter((x) => x.offsetParent); const j = vis.indexOf(c); pickChip(vis[(j + d + vis.length) % vis.length], true); } });
  });

  /* ================= starting point (also picks the plan) ================= */
  const pathEls = $$(".x-path"), plans = $$(".x-plan");
  function seg(i, src?, fromKey?) {
    $$("[data-seg]").forEach((g) => $$("button", g).forEach((b, j) => { b.setAttribute("aria-pressed", j === i); b.tabIndex = j === i ? 0 : -1; if (fromKey && g === src && j === i) b.focus(); }));
    pathEls.forEach((el, j) => { el.hidden = j !== i; if (j === i && src && !RM) { el.classList.remove("x-swap"); void el.offsetWidth; el.classList.add("x-swap"); } });
    plans.forEach((p, j) => { p.classList.toggle("rec", j === i); const b = $(".btn", p); b.classList.toggle("btn-primary", j === i); b.classList.toggle("btn-secondary", j !== i); });
  }
  $$("[data-seg]").forEach((g) => $$("button", g).forEach((b, j) => {
    on(b, "click", () => seg(j, g));
    on(b, "keydown", (e) => { const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (d) { e.preventDefault(); seg((j + d + 3) % 3, g, true); } });
  }));
  seg(0);

  /* ================= story ================= */
  const story = $("#x-story"), chaps = $$(".x-chap"), rail = $$("#x-rail li"), railB = $$("#x-rail b");
  const sDawn = $("#x-s-dawn"), sDay = $("#x-s-day"), sun = $("#x-sun");
  const prs = $$("#x-prs li"), gapn = $("#x-gapn");
  const selfL = $$(".x-rep.self li"), selfE = $(".x-rep.self .end"), tmL = $$(".x-rep.tm li"), tmE = $(".x-rep.tm .end");
  const rows = $$(".x-ledger tr.r"), g2 = $("#x-gate2"), g2b = $("#x-g2b"), g2s = $("#x-g2s"), g2c = $("#x-g2c");
  const stacked = () => mob.matches;
  function applyMode() { story.classList.toggle("stacked", stacked()); }
  applyMode();
  function chapP(c) {
    const r = c.getBoundingClientRect(), vh = innerHeight;
    if (stacked()) return { p: clamp((vh * 0.85 - r.top) / (vh * 0.6)), enter: clamp((vh - r.top) / vh) };
    return { p: clamp(-r.top / (r.height - vh)), enter: clamp((vh - r.top) / vh) };
  }
  function r1(p) { prs.forEach((li, i) => li.classList.toggle("on", p >= i * 0.12 - 0.1)); txt(gapn, String(Math.round(ss(0.05, 0.8, p) * 47))); }
  function r2(p) {
    selfL.forEach((li, i) => li.classList.toggle("on", p >= 0.02 + i * 0.08)); selfE.classList.toggle("on", p >= 0.26);
    tmL.forEach((li, i) => li.classList.toggle("on", p >= 0.34 + i * 0.14)); tmE.classList.toggle("on", p >= 0.76);
    sty(sun, "transform", `translate3d(0,${(-ss(0, 1, p) * 30).toFixed(2)}vh,0)`);
  }
  function r3(p) {
    rows.forEach((tr, i) => { tr.classList.toggle("on", p >= 0.04 + i * 0.12); tr.classList.toggle("sealed", p >= 0.1 + i * 0.12); });
    const open = p >= 0.7; g2.classList.toggle("open", open); txt(g2b, open ? "Release gate: open" : "Release gate: held");
    txt(g2s, open ? "All verdicts pass. Evidence sealed." : p >= 0.3 ? "1 fail, 1 unable to verify" : "Waiting on verdicts"); txt(g2c, open ? "exit 0" : "blocked");
  }
  if (RM) { r1(1); r2(1); r3(1); }
  sDawn.style.opacity = 0; sDay.style.opacity = 0;
  const maxP = [0, 0, 0];
  function onScroll() {
    const vh = innerHeight; const sr = story.getBoundingClientRect(); const P = chaps.map(chapP);
    if (sr.bottom < 0 || sr.top > vh) return;
    if (!stacked()) {
      sty(sDawn, "opacity", ss(0.15, 0.85, P[1].enter).toFixed(3)); sty(sDay, "opacity", ss(0.15, 0.85, P[2].enter).toFixed(3));
      story.classList.toggle("day", P[2].enter > 0.6);
      let a = 0; P.forEach((q, i) => { if (q.enter > 0.5) a = i; });
      rail.forEach((li, i) => { li.classList.toggle("on", i === a); sty(railB[i], "transform", `scaleY(${P[i].p.toFixed(3)})`); });
    }
    if (stacked()) P.forEach((q, i) => { q.p = Math.max(q.p, maxP[i]); maxP[i] = q.p; });
    if (!RM) { r1(P[0].p); r2(P[1].p); r3(P[2].p); }
  }
  const onMob = () => { applyMode(); onScroll(); };
  mob.addEventListener("change", onMob); offs.push(() => mob.removeEventListener("change", onMob));
  let tick = false;
  on(window, "scroll", () => { if (!tick) { tick = true; requestAnimationFrame(() => { tick = false; onScroll(); }); } }, { passive: true });
  on(window, "resize", onScroll); onScroll();

  /* ================= developer band: live exit codes ================= */
  const out = $("#x-term-out"), codes = $$(".x-codes li"), ghs = $("#x-ghs"), ghsC = $("#x-ghs-c"), ghsT = $("#x-ghs-t");
  const CMD = "kane-cli testrun run --tags smoke --parallel 4 --headless --on-failure fail-fast";
  const RUNS = [
    { pre: [["$", "npm install -g @testmuai/kane-cli"], ["$", "kane-cli login --oauth"]], lines: [["c", "  planning     4 tests tagged smoke"], ["c", "  running      4 in parallel, chrome headless"], ["g", "  ✓ guest checkout             pass"], ["g", "  ✓ apply WELCOME10            pass"], ["g", "  ✓ pay with a test card       pass"], ["g", "  ✓ order total matches cart   pass"], ["", ""], ["g", "  PASS  4 of 4             exit 0"], ["c", "  evidence     ./.evidence"]], code: 0 },
    { pre: [["#", "# a coding agent changed the discount code"]], lines: [["c", "  planning     4 tests tagged smoke"], ["c", "  running      4 in parallel, chrome headless"], ["g", "  ✓ guest checkout             pass"], ["r", "  ✗ apply WELCOME10            fail"], ["c", "    total not discounted, reported as a bug"], ["", ""], ["r", "  FAIL  bug filed, not healed  exit 1"], ["c", "  evidence     ./.evidence"]], code: 1 }];
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  let termTimer = null, ti = 0;
  function lit(code) {
    codes.forEach((li) => li.classList.toggle("on", li.dataset.c === String(code)));
    if (code === null) return; ghs.classList.toggle("f", code === 1); txt(ghsC, "exit " + code);
    txt(ghsT, code === 0 ? "verify / kane-cli: passed, verdict posted to the pull request" : "verify / kane-cli: failed, bug and evidence posted to the pull request");
  }
  function playTerm(animate) {
    clearTimeout(termTimer); const run = RUNS[ti % 2]; let buf = ""; const q = [];
    run.pre.forEach(([k, s]) => q.push(() => (buf += (k === "$" ? `<span class="p">$ </span>${esc(s)}` : `<span class="c">${esc(s)}</span>`) + "\n")));
    q.push(() => { lit(null); buf += `<span class="p">$ </span>${esc(CMD)}\n`; });
    run.lines.forEach(([k, s]) => q.push(() => (buf += (k ? `<span class="${k}">${esc(s)}</span>` : "") + "\n")));
    q.push(() => { lit(run.code); buf += `<span class="p">$ </span><span class="x-caret"></span>`; });
    if (!animate) { q.forEach((f) => f()); out.innerHTML = buf; return; }
    let i = 0; const step = () => { if (!alive) return; q[i++](); out.innerHTML = buf; if (i < q.length) termTimer = setTimeout(step, i <= run.pre.length + 1 ? 420 : 260); else termTimer = setTimeout(() => { ti++; playTerm(true); }, 4200); }; step();
  }
  playTerm(false);
  let started = false;
  const io2 = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting && !started && !RM) { started = true; playTerm(true); } else if (!e.isIntersecting && started) { started = false; clearTimeout(termTimer); } }), { threshold: 0.3 });
  io2.observe($("#x-term"));
  const tabs = $$('.x-tabs [role="tab"]');
  function selTab(tab) { tabs.forEach((t) => { const o = t === tab; t.setAttribute("aria-selected", o); t.tabIndex = o ? 0 : -1; $("#" + t.getAttribute("aria-controls")).hidden = !o; }); }
  selTab(tabs[0]);
  tabs.forEach((t, i) => { on(t, "click", () => selTab(t)); on(t, "keydown", (e) => { const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (d) { const n = tabs[(i + d + tabs.length) % tabs.length]; selTab(n); n.focus(); } }); });

  /* copy buttons */
  $$("[data-copy],[data-copy-from]").forEach((b) => on(b, "click", async () => {
    const s = b.dataset.copyFrom ? $("#" + b.dataset.copyFrom).textContent : b.dataset.copy;
    try { await navigator.clipboard.writeText(s); } catch { /* clipboard blocked */ }
    const was = b.textContent; b.textContent = "Copied"; setTimeout(() => (b.textContent = was), 1400);
  }));

  return () => {
    alive = false; cancelAnimationFrame(raf); clearTimeout(termTimer);
    io1.disconnect(); io2.disconnect(); offs.forEach((f) => f());
  };
}
