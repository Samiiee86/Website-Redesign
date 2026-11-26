/* The exported product pages' script: the few parts that switch.
   - Copy buttons ([data-copy]) copy their text.
   - Tabs ([role=tab]) mark the picked one.
   - The device list: Android / Apple ([data-os-tab]), brands
     ([data-brand]) and search ([data-device-search]).
   FAQ rows are <details> and open on their own. */
(function () {
  var root = document;

  function selectBrand(i) {
    root.querySelectorAll("[data-brand]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-brand") === String(i)));
    });
    root.querySelectorAll("[data-brand-list]").forEach(function (l) {
      l.hidden = l.getAttribute("data-brand-list") !== String(i);
      l.querySelectorAll("li").forEach(function (li) { li.hidden = false; });
    });
    var s = root.querySelector("[data-device-search]");
    if (s) s.value = "";
  }

  function selectOs(os) {
    root.querySelectorAll("[data-os-tab]").forEach(function (t) {
      t.setAttribute("aria-selected", String(t.getAttribute("data-os-tab") === os));
    });
    var first = null;
    root.querySelectorAll("li[data-os]").forEach(function (li) {
      li.hidden = li.getAttribute("data-os") !== os;
      if (!li.hidden && first === null) first = li.querySelector("[data-brand]");
    });
    if (first) selectBrand(first.getAttribute("data-brand"));
  }

  root.addEventListener("click", function (e) {
    var t = e.target;
    var copy = t.closest && t.closest("[data-copy]");
    if (copy) {
      if (navigator.clipboard) navigator.clipboard.writeText(copy.getAttribute("data-copy"));
      copy.setAttribute("data-copied", "");
      setTimeout(function () { copy.removeAttribute("data-copied"); }, 1500);
      return;
    }
    var os = t.closest && t.closest("[data-os-tab]");
    if (os) return selectOs(os.getAttribute("data-os-tab"));
    var brand = t.closest && t.closest("[data-brand]");
    if (brand) return selectBrand(brand.getAttribute("data-brand"));
    var tab = t.closest && t.closest("[role=tab]");
    if (tab && tab.parentElement) {
      tab.parentElement.querySelectorAll("[role=tab]").forEach(function (x) {
        x.setAttribute("aria-selected", String(x === tab));
      });
    }
  });

  var search = root.querySelector("[data-device-search]");
  if (search) {
    var current = function () {
      var on = root.querySelector('[data-brand][aria-pressed="true"]');
      return on ? on.getAttribute("data-brand") : null;
    };
    var last = current();
    search.addEventListener("input", function () {
      var q = search.value.trim().toLowerCase();
      if (!q) {
        var keep = last;
        selectBrand(keep);
        return;
      }
      if (current() !== null) last = current();
      root.querySelectorAll("[data-brand]").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      root.querySelectorAll("[data-brand-list]").forEach(function (l) {
        var any = false;
        l.querySelectorAll("li").forEach(function (li) {
          li.hidden = (li.getAttribute("data-name") || "").indexOf(q) < 0;
          if (!li.hidden) any = true;
        });
        l.hidden = !any;
      });
    });
  }
})();
