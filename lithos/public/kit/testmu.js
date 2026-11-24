/* TestMu AI · Section kit · testmu.js
   One small script for every fold. No dependencies. Safe to include once per page.
   Each behaviour finds its own markup by data attribute, so unused parts cost nothing. */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function init(root) {
    root = root || document;

    /* reveal: fade and rise once when a fold enters the screen */
    var reveals = all(".tm-reveal", root);
    if (reveals.length) {
      if (reduce || !("IntersectionObserver" in window)) reveals.forEach(function (el) { el.classList.add("is-in"); });
      else {
        var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }); }, { rootMargin: "-10% 0px -10% 0px" });
        reveals.forEach(function (el) { io.observe(el); });
      }
    }

    /* marquee: duplicates its items once so the loop is seamless */
    all("[data-tm-marquee]", root).forEach(function (m) {
      var track = m.querySelector(".tm-marquee__track"); if (!track || track.dataset.ready) return;
      track.dataset.ready = "1"; track.innerHTML += track.innerHTML;
      Array.prototype.slice.call(track.children, track.children.length / 2).forEach(function (c) { c.setAttribute("aria-hidden", "true"); });
    });

    /* faq: one open at a time, "view more" reveals the rest */
    all("[data-tm-faq]", root).forEach(function (faq) {
      faq.addEventListener("click", function (e) {
        var q = e.target.closest(".tm-faq__q");
        if (q) { var item = q.parentNode, open = !item.classList.contains("is-open");
          all(".tm-faq__item", faq).forEach(function (i) { i.classList.remove("is-open"); i.querySelector(".tm-faq__q").setAttribute("aria-expanded", "false"); });
          if (open) { item.classList.add("is-open"); q.setAttribute("aria-expanded", "true"); } }
        var more = e.target.closest(".tm-faq__more");
        if (more) { var on = faq.dataset.all !== "true"; faq.dataset.all = on; more.querySelector("span").textContent = on ? "View fewer questions" : "View more questions"; more.setAttribute("aria-expanded", on); }
      });
    });

    /* tabs: [data-tm-tabs] holds buttons [data-tab] and panels [data-panel] */
    all("[data-tm-tabs]", root).forEach(function (t) {
      t.addEventListener("click", function (e) {
        var b = e.target.closest("[data-tab]"); if (!b) return;
        all("[data-tab]", t).forEach(function (x) { x.setAttribute("aria-selected", x === b); });
        all("[data-panel]", t).forEach(function (p) { p.hidden = p.dataset.panel !== b.dataset.tab; });
      });
    });

    /* carousel: [data-tm-carousel] with a .tm-carousel__track and prev/next buttons */
    all("[data-tm-carousel]", root).forEach(function (c) {
      var track = c.querySelector(".tm-carousel__track"); if (!track) return;
      var step = function () { var card = track.children[0]; return card ? card.getBoundingClientRect().width + 16 : 320; };
      var prev = c.querySelector("[data-prev]"), next = c.querySelector("[data-next]");
      function sync() { if (prev) prev.disabled = track.scrollLeft < 4; if (next) next.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 4; }
      if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: reduce ? "auto" : "smooth" }); });
      if (next) next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: reduce ? "auto" : "smooth" }); });
      track.addEventListener("scroll", sync, { passive: true }); sync();
    });

    /* billing toggle: [data-tm-billing] with buttons [data-period]; prices carry data-month / data-year */
    all("[data-tm-billing]", root).forEach(function (w) {
      w.addEventListener("click", function (e) {
        var b = e.target.closest("[data-period]"); if (!b) return;
        all("[data-period]", w).forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        all("[data-month]", w).forEach(function (p) { p.textContent = b.dataset.period === "year" ? p.dataset.year : p.dataset.month; });
      });
    });

    /* copy: [data-tm-copy] copies the text of its target (closest .tm-code pre) */
    all("[data-tm-copy]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        var box = b.closest("[data-tm-code]"), pre = box && (box.querySelector("[data-panel]:not([hidden]) pre") || box.querySelector("pre"));
        if (!pre) return; var txt = pre.innerText, label = b.textContent;
        var done = function () { b.textContent = "Copied"; setTimeout(function () { b.textContent = label; }, 1400); };
        if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, done); else done();
      });
    });

    /* grouped catalog: [data-tm-groups] with nav buttons [data-group] and panels [data-group-panel]; one group at a time or all, plus search */
    all("[data-tm-groups]", root).forEach(function (w) {
      var btns = all("[data-group]", w), panels = all("[data-group-panel]", w), empty = w.querySelector(".tm-empty"), input = w.querySelector("input[type=search]"), pick = "";
      function run() {
        var q = ((input || {}).value || "").trim().toLowerCase(), shown = 0;
        panels.forEach(function (p) {
          var n = 0;
          all("[data-item]", p).forEach(function (it) { var ok = !q || it.textContent.toLowerCase().indexOf(q) > -1; it.hidden = !ok; if (ok) n++; });
          p.hidden = !n || (pick && p.dataset.groupPanel !== pick); if (!p.hidden) shown += n;
        });
        btns.forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.group === pick); });
        if (empty) empty.classList.toggle("is-on", !shown);
      }
      btns.forEach(function (b) { b.addEventListener("click", function () { pick = pick === b.dataset.group ? "" : b.dataset.group; run(); }); });
      if (input) input.addEventListener("input", run);
      run();
    });

    /* copy a fixed string: [data-tm-copy-text="..."]; the button gets .is-copied for a moment */
    all("[data-tm-copy-text]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        var done = function () { b.classList.add("is-copied"); setTimeout(function () { b.classList.remove("is-copied"); }, 1400); };
        if (navigator.clipboard) navigator.clipboard.writeText(b.dataset.tmCopyText).then(done, done); else done();
      });
    });

    /* popup: [data-tm-open="id"] opens <dialog id>, exit intent opens [data-tm-exit] once per session */
    all("[data-tm-open]", root).forEach(function (b) {
      b.addEventListener("click", function () { var d = document.getElementById(b.dataset.tmOpen); if (d && d.showModal) d.showModal(); });
    });
    all("dialog.tm-popup", root).forEach(function (d) {
      d.addEventListener("click", function (e) { if (e.target === d || e.target.closest("[data-tm-close]")) d.close(); });
    });
    var exit = root.querySelector && root.querySelector("dialog[data-tm-exit]");
    if (exit && !sessionStorageGet("tm-exit-shown")) {
      document.addEventListener("mouseout", function onOut(e) {
        if (!e.relatedTarget && e.clientY <= 0) { document.removeEventListener("mouseout", onOut); sessionStorageSet("tm-exit-shown", "1"); if (exit.showModal && !exit.open) exit.showModal(); }
      });
    }

    /* video: [data-tm-video="src"] opens a full-screen player with sound */
    all("[data-tm-video]", root).forEach(function (el) {
      function open() {
        var d = document.createElement("dialog"); d.className = "tm-player";
        d.innerHTML = '<button class="tm-player__close" aria-label="Close video">&times;</button><video controls autoplay playsinline src="' + el.dataset.tmVideo + '"></video>';
        document.body.appendChild(d); d.showModal();
        d.addEventListener("click", function (e) { if (e.target === d || e.target.closest(".tm-player__close")) d.close(); });
        d.addEventListener("close", function () { d.remove(); });
      }
      el.addEventListener("click", open);
      el.addEventListener("keydown", function (e) { if (e.key === "Enter") open(); });
    });

    /* code: numbers every line, keeps the status bar line count in step with the open tab */
    all("[data-tm-code]", root).forEach(function (box) {
      all("pre", box).forEach(function (pre) {
        if (pre.dataset.ready) return; pre.dataset.ready = "1";
        var lines = pre.innerHTML.replace(/^\n+|\s+$/g, "").split("\n");
        pre.innerHTML = lines.map(function (l) { return '<span class="ln">' + (l || " ") + "</span>"; }).join("");
        pre.dataset.count = lines.length;
      });
      function status() {
        var panel = box.querySelector("[data-panel]:not([hidden])") || box, pre = panel.querySelector("pre"), out = box.querySelector("[data-lines]"), lang = box.querySelector("[data-lang]");
        if (out && pre) out.textContent = pre.dataset.count + " lines";
        if (lang && panel.dataset.label) lang.textContent = panel.dataset.label;
      }
      box.addEventListener("click", function (e) { if (e.target.closest("[data-tab]")) status(); }); status();
    });

    /* filter: pills [data-filter], selects [data-key], a search box; items carry [data-item] and data-tags / data-<key> */
    all("[data-tm-filter]", root).forEach(function (w) {
      var items = all("[data-item]", w), empty = w.querySelector(".tm-empty");
      function run() {
        var pill = w.querySelector("[data-filter][aria-pressed='true']"), tag = pill ? pill.dataset.filter : "all";
        var q = (w.querySelector("input[type=search]") || {}).value; q = (q || "").trim().toLowerCase();
        var sels = all("select[data-key]", w), shown = 0;
        items.forEach(function (it) {
          var ok = tag === "all" || (" " + (it.dataset.tags || "") + " ").indexOf(" " + tag + " ") > -1;
          sels.forEach(function (s) { if (s.value && it.dataset[s.dataset.key] !== s.value) ok = false; });
          if (q && it.textContent.toLowerCase().indexOf(q) < 0) ok = false;
          it.hidden = !ok; if (ok) shown++;
        });
        if (empty) empty.classList.toggle("is-on", !shown);
      }
      w.addEventListener("click", function (e) { var b = e.target.closest("[data-filter]"); if (!b) return; all("[data-filter]", w).forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); run(); });
      w.addEventListener("input", run); w.addEventListener("change", run);
    });

    /* accordion strip: one story open; hover opens on desktop, click or Enter everywhere */
    all("[data-tm-accordion]", root).forEach(function (acc) {
      var items = all(".tm-acc__item", acc), wide = matchMedia("(min-width: 1024px)");
      function open(it) { items.forEach(function (x) { x.classList.toggle("is-open", x === it); x.setAttribute("aria-expanded", x === it); }); }
      items.forEach(function (it) {
        it.addEventListener("click", function (e) { if (!it.classList.contains("is-open")) { e.preventDefault(); open(it); } });
        it.addEventListener("mouseenter", function () { if (wide.matches) open(it); });
        it.addEventListener("keydown", function (e) { if (e.key === "Enter" && !it.classList.contains("is-open")) open(it); });
      });
    });

    /* stepper: tabs [data-step] show panels [data-step-panel]; autoplay runs off the progress line (tour, reel) */
    all("[data-tm-step-root]", root).forEach(function (w) {
      var tabs = all("[data-step]", w), panels = all("[data-step-panel]", w), auto = w.hasAttribute("data-autoplay") && !reduce, i = 0;
      function go(n) {
        i = (n + tabs.length) % tabs.length;
        tabs.forEach(function (t, k) { t.setAttribute("aria-selected", k === i); t.tabIndex = k === i ? 0 : -1; var p = t.querySelector(".tm-progress"); if (p) { p.style.animation = "none"; void p.offsetWidth; p.style.animation = ""; } });
        panels.forEach(function (p, k) { var key = p.getAttribute("data-step-panel"), on = key ? +key === i : k === i; p.classList.toggle("is-active", on); if (p.hasAttribute("data-hide")) p.hidden = !on; var v = p.querySelector("video"); if (v) { if (on) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } else v.pause(); } });
      }
      w.addEventListener("click", function (e) {
        var t = e.target.closest("[data-step]"); if (t) { go(tabs.indexOf(t)); return; }
        if (e.target.closest("[data-step-prev]")) go(i - 1); if (e.target.closest("[data-step-next]")) go(i + 1);
      });
      w.addEventListener("keydown", function (e) { if (!e.target.closest("[data-step]")) return; if (e.key === "ArrowRight") { go(i + 1); tabs[i].focus(); } if (e.key === "ArrowLeft") { go(i - 1); tabs[i].focus(); } });
      w.addEventListener("animationend", function (e) { if (e.animationName === "tm-progress") go(i + 1); });
      if (auto) {
        w.classList.add("is-playing");
        w.addEventListener("mouseenter", function () { w.classList.add("is-paused"); });
        w.addEventListener("mouseleave", function () { w.classList.remove("is-paused"); });
        if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { w.classList.toggle("is-paused", !es[0].isIntersecting); }).observe(w);
      }
      go(0);
    });

    /* switch: a [role=switch] inside [data-tm-variant] flips its [data-v="a"] / [data-v="b"] content */
    all("[data-tm-variant]", root).forEach(function (w) {
      var sw = w.querySelector("[role=switch]"); if (!sw) return;
      function set(on) { sw.setAttribute("aria-checked", on); all("[data-v]", w).forEach(function (x) { x.hidden = (x.dataset.v === "b") !== on; }); all("[data-side]", w).forEach(function (x) { x.classList.toggle("is-on", (x.dataset.side === "b") === on); }); }
      sw.addEventListener("click", function () { set(sw.getAttribute("aria-checked") !== "true"); }); set(false);
    });

    /* animations pause while their fold is off screen */
    if ("IntersectionObserver" in window) all("[data-tm-anim]", root).forEach(function (el) {
      new IntersectionObserver(function (es) { el.classList.toggle("is-offscreen", !es[0].isIntersecting); }).observe(el);
    });
  }

  function sessionStorageGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function sessionStorageSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }

  window.TestMu = { init: init };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { init(); }); else init();
})();
