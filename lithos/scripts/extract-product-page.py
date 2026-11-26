"""Turn a live testmuai.com product page (the MuAI template) into page data.

Every word is copied as it is; links inside running text become plain
text. Usage: extract.py <in.html> <slug> <out.json>"""
import json, re, sys
from bs4 import BeautifulSoup

src, slug, out = sys.argv[1:4]
soup = BeautifulSoup(open(src).read(), "html.parser")


def cls(el, name):
    """find by MuAI class prefix (MuAI_<name>__hash)"""
    return el.find(class_=lambda c: c and any(x.split("__")[0] == f"MuAI_{name}" for x in c.split()))


def clsall(el, name):
    return el.find_all(class_=lambda c: c and any(x.split("__")[0] == f"MuAI_{name}" for x in c.split()))


def has(el, name):
    return any(x.split("__")[0] == f"MuAI_{name}" for x in (el.get("class") or []))


def txt(el):
    if el is None:
        return ""
    t = re.sub(r"\s+", " ", el.get_text(" ", strip=True))
    t = re.sub(r" ([.,;:!?])(?=\s|$)", r"\1", t)
    return t.replace("( ", "(").replace(" )", ")").strip()


def head(sec):
    hd = cls(sec, "sec-hd")
    h2 = sec.find("h2")
    body = [txt(p) for p in hd.find_all("p")] if hd else []
    return {"id": h2.get("id") if h2 else None, "title": txt(h2), "body": [b for b in body if b]}


def status(el):
    if el is None:
        return None
    return {"label": txt(el), "kind": next((k for k in ("pass", "fail", "done", "run") if has(el, k)), "done")}


def run_card(fig):
    if fig is None:
        return None
    hd = cls(fig, "run-hd")
    rows = []
    lst = fig.find(["ol", "ul"], class_=lambda c: c and any(x.split("__")[0] in ("MuAI_term", "MuAI_chat", "MuAI_brws", "MuAI_devs", "MuAI_bars", "MuAI_mini") for x in c.split())) or fig.find("ol")
    if lst:
        for li in lst.find_all("li", recursive=False):
            st = cls(li, "st")
            who = cls(li, "who") or li.find("b")
            parts = [c for c in li.find_all(["span", "b"], recursive=False) if c is not st and c is not who and not has(c, "pr")]
            rows.append({"who": txt(who), "text": " ".join(txt(p) for p in parts if txt(p)), "st": status(st)})
    diff = cls(fig, "diff")
    panes = [txt(p.find("span")) for p in clsall(diff, "pane")] if diff else []
    ft = cls(fig, "run-ft")
    return {
        "title": txt(cls(hd, "t")) if hd else "",
        "live": txt(cls(hd, "live")) if hd else "",
        "rows": rows,
        "diff": panes,
        "verdict": txt(cls(ft, "verdict")) if ft else "",
        "evid": txt(cls(ft, "evid")) if ft else "",
    }


def ctas(row):
    out = []
    for b in row.find_all(["a", "button"], recursive=False) if row else []:
        arr = cls(b, "arr")
        label = txt(b).replace(txt(arr), "").strip() if arr else txt(b)
        out.append({"label": label, "href": b.get("href"), "primary": has(b, "btn-dark")})
    return out


def code_block(sec):
    c = cls(sec, "code")
    if not c:
        return None
    hd = cls(c, "code-hd")
    lab = hd.find("span") if hd else None
    code = c.find("code")
    lang = next((x[9:] for x in (code.get("class") or []) if x.startswith("language-")), "") if code else ""
    return {"label": txt(lab), "lang": lang, "code": code.get_text() if code else "", "note": txt(cls(c, "code-note"))}


def groups(sec):
    g = cls(sec, "groups")
    if not g:
        return []
    out = []
    for d in g.find_all("details", recursive=False):
        sm = d.find("summary")
        cnt = sm.find("span")
        count = txt(cnt)
        if cnt:
            cnt.extract()
        t = d.find("table")
        out.append({"name": txt(sm), "count": count,
                    "cols": [txt(th) for th in t.find("thead").find_all("th")],
                    "rows": [[txt(c) for c in tr.find_all(["th", "td"])] for tr in t.find("tbody").find_all("tr")]})
    return out


def frameworks(sec):
    fw = cls(sec, "fw")
    if not fw:
        return None
    gs = []
    for div in cls(fw, "fw-m").find_all("div", recursive=False):
        dt = div.find("dt")
        a = dt.find("a")
        gs.append({"title": txt(dt), "href": a.get("href") if a else None, "links": [{"label": txt(a), "href": a.get("href")} for a in div.find("dd").find_all("a")]})
    return {"summary": txt(fw.find("summary")), "groups": gs}


data = {"slug": slug}
data["title"] = soup.title.get_text(strip=True) if soup.title else ""
m = soup.find("meta", attrs={"name": "description"})
data["description"] = m["content"] if m else ""

main = soup.find("main")
crumb = main.find("nav")
data["crumb"] = [txt(li) for li in crumb.find_all("li")] if crumb else []

# ---- hero
hero = cls(main, "hero")
eb = cls(hero, "eyebrow")
h1 = hero.find("h1")
b = cls(h1, "b")
h1b = txt(b)
if b:
    b.extract()
chips = cls(hero, "chips")
media = cls(hero, "hero-media")
shot = cls(hero, "shot")
img = shot.find("img") if shot else None
data["hero"] = {
    "eyebrow": [txt(s) for s in eb.find_all(["span", "time"]) if txt(s) and txt(s) != "·"] if eb else [],
    "h1a": txt(h1),
    "h1b": h1b,
    "lede": txt(cls(hero, "lede")),
    "ctas": ctas(cls(hero, "cta-row")),
    "note": txt(cls(hero, "cta-note")),
    "chipsLabel": txt(cls(chips, "lbl")) if chips else "",
    "chips": [txt(li) for li in chips.find_all("li") if not has(li, "lbl")] if chips else [],
    "image": {"src": img.get("src"), "alt": img.get("alt", "")} if img else None,
    "run": run_card(hero.find("figure", class_=lambda c: c and any(x.split("__")[0] == "MuAI_run" for x in c.split()))),
}

# ---- sections
secs = []
unknown = []
for sec in main.find_all("section"):
    if has(sec, "hero") or not any((x or "").startswith("MuAI_sec") for x in (sec.get("class") or [])):
        continue
    h = head(sec)
    s = None
    if cls(sec, "facts"):
        s = {"type": "glance", "price": txt(cls(sec, "price")),
             "facts": [[txt(d.find("dt")), txt(d.find("dd"))] for d in cls(sec, "facts").find_all("div", recursive=False)]}
    elif cls(sec, "steps"):
        s = {"type": "steps", "items": [[txt(li.find("h3")), txt(li.find("p"))] for li in cls(sec, "steps").find_all("li", recursive=False)]}
    elif cls(sec, "strat"):
        s = {"type": "strat", "items": [[txt(li.find("h3")), txt(li.find("p"))] for li in cls(sec, "strat").find_all("li", recursive=False)]}
    elif cls(sec, "caps"):
        s = {"type": "caps", "items": [[txt(li.find("h3")), txt(li.find("p"))] for li in cls(sec, "caps").find_all("li", recursive=False)]}
    elif cls(sec, "cmp"):
        t = cls(sec, "cmp")
        cols = [txt(th) for th in t.find("thead").find_all("th")]
        rows = [[txt(c) for c in tr.find_all(["th", "td"])] for tr in t.find("tbody").find_all("tr")]
        s = {"type": "cmp", "caption": txt(t.find("caption")), "cols": cols, "rows": rows,
             "notes": [txt(p) for p in sec.find_all("p") if txt(p) and not p.find_parent(class_=lambda c: c and ("MuAI_sec-hd" in c or "MuAI_code" in c))],
             "code": code_block(sec)}
    elif cls(sec, "groups"):
        s = {"type": "groups", "groups": groups(sec), "src": " ".join(txt(p) for p in clsall(sec, "src"))}
    elif cls(sec, "data"):
        t = cls(sec, "data")
        s = {"type": "data", "cols": [txt(th) for th in t.find("thead").find_all("th")],
             "rows": [[txt(c) for c in tr.find_all(["th", "td"])] for tr in t.find("tbody").find_all("tr")],
             "src": " ".join(txt(p) for p in clsall(sec, "src"))}
    elif cls(sec, "teams"):
        s = {"type": "teams", "items": [{"name": txt(t.find("h3")), "for": txt(cls(t, "for")),
                                         "items": [txt(li) for li in t.find_all("li")], "dark": has(t, "ent")}
                                        for t in clsall(sec, "team")]}
    elif cls(sec, "stories"):
        s = {"type": "stories", "items": [{"num": txt(a.find("b")), "text": txt(a.find("p")), "cta": txt(a.find("span")), "href": a.get("href")}
                                          for a in clsall(sec, "story")]}
    elif cls(sec, "rel"):
        s = {"type": "rel",
             "items": [{"name": txt(li.find("strong")), "body": txt(li.find("span")), "href": li.find("a").get("href")} for li in cls(sec, "rel").find_all("li", recursive=False)],
             "res": [{"group": txt(g.find("h3")), "links": [{"label": txt(a), "href": a.get("href")} for a in g.find_all("a")]} for g in clsall(sec, "res-g")],
             "fw": frameworks(sec)}
    elif cls(sec, "faq"):
        s = {"type": "faq", "items": [{"q": txt(d.find("summary")), "a": " ".join(txt(p) for p in d.find_all(["p", "li"]))} for d in cls(sec, "faq").find_all("details")]}
    elif cls(sec, "final"):
        f = cls(sec, "final")
        s = {"type": "final", "body": txt(f.find("p")), "ctas": ctas(cls(f, "cta-row"))}
    if s is None:
        unknown.append(h["id"] or txt(sec)[:60])
        continue
    s.update({"id": h["id"], "head": h["title"], "body": h["body"]} if s["type"] != "final" else {"id": h["id"], "head": h["title"]})
    secs.append(s)

ext = []
for e in clsall(main, "ext"):
    for sec in e.find_all("section"):
        if sec.find_parent("section") or "Trusted by" in txt(sec)[:60]:
            continue
        h2 = sec.find("h2")
        if h2 and "MCP" in txt(h2):
            hd = h2.find_parent("div")
            body = [t.strip() for t in hd.find("p").get_text("\n").split("\n") if t.strip()]
            setups = []
            for blk in sec.find_all("div", class_=lambda c: c and "items-center" in c and "gap-8" in c and "flex-col" in c):
                lab = blk.find("p")
                val = lab.find_next("p")
                btn = blk.find("a")
                setups.append({"label": txt(lab), "value": txt(val), "button": txt(btn) if btn else "", "href": btn.get("href") if btn else None})
            cards = []
            for card in sec.find_all("div", class_=lambda c: c and "rounded-[12px]" in c and "bg-white" in c):
                img = card.find("img"); a = card.find("a")
                cards.append({"name": txt(card.find("h3")), "body": txt(card.find("p")), "cta": txt(a), "href": a.get("href") if a else None, "logo": img.get("src") if img else None})
            ext.append({"type": "mcp", "id": "mcp-clients", "head": txt(h2), "body": body, "setups": setups, "cards": cards})
        elif sec.find("ul", class_=lambda c: c and "list_realdevice" in c):
            tabs = [txt(li) for li in sec.find("ul").find_all("li")]
            brands = [img.get("alt") for img in sec.find("ul", class_=lambda c: c and "pt-24" in c).find_all("img") if img.get("alt") != "Arrow"]
            first = [[txt(li.find("a")), txt(li.find("span", class_=lambda c: c and "w-15" in c))] for li in sec.find("ul", class_=lambda c: c and "list_realdevice" in c).find_all("li")]
            gs = [{"name": brands[0] if brands else "", "devices": first}]
            for div in sec.find_all("div"):
                p = div.find("p", recursive=False); ul = div.find("ul", recursive=False)
                if p and ul and not div.get("class"):
                    gs.append({"name": txt(p), "devices": [[x.strip() for x in li.get_text("|", strip=True).split("|") if x.strip() != ","][:2] for li in ul.find_all("li")]})
            promos = []
            side = sec.find("div", class_=lambda c: c and "w-4/12" in c)
            for box in side.find_all("div", class_=lambda c: c and "overflow-hidden" in c and "rounded-lg" in c) if side else []:
                ps = box.find_all("p"); b = box.find(["a", "button"]); im = box.find("img")
                promos.append({"title": txt(ps[0]), "body": txt(ps[1]) if len(ps) > 1 else "", "cta": txt(b), "href": b.get("href") if b and b.name == "a" else None, "img": im.get("src") if im else None})
            ext.append({"type": "devices", "id": "devices", "head": "", "body": [], "tabs": tabs, "groups": gs, "promos": promos, "href": sec.find("ul", class_=lambda c: c and "list_realdevice" in c).find("a").get("href")})

data["sections"] = ext + secs
data["unknown"] = unknown
json.dump(data, open(out, "w"), indent=1, ensure_ascii=False)
print(slug, [s["type"] for s in secs], "UNKNOWN:" + ",".join(unknown) if unknown else "")
