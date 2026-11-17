"""Kockafüzet build: assembles the static site from dev/src into the repository root.

Usage (from the repository root):
    python3 dev/build.py [--base /kockafuzet/] [--out .]

Sources:
    dev/src/*.js     concatenated in ORDER below into assets/app.js
    dev/src/base.css + dev/src/theme.css (+ font faces) -> assets/app.css
    dev/src/theme.js -> assets/theme.js (light/dark switch, loaded in <head>)
Fonts live in assets/fonts (self-hosted, from @fontsource) and are not rebuilt.
"""
import argparse, hashlib, json, re
from pathlib import Path

DEV = Path(__file__).resolve().parent
SRC = DEV / "src"
import sys; sys.path.insert(0, str(DEV))
import redesign

ap = argparse.ArgumentParser()
ap.add_argument("--base", default="/kockafuzet/")
ap.add_argument("--out", default=str(DEV.parent))
args = ap.parse_args()
BASE = args.base.rstrip("/") + "/"
OUT = Path(args.out)
SITE = "Kockafüzet"

ORDER = ["core.js", "visuals.js",
         "matek-1.js", "matek-2.js", "matek-3.js", "matek-4.js",
         "magyar-1.js", "magyar-2.js", "magyar-3.js", "magyar-4.js", "kornyezet-4.js",
         "modes.js", "features.js", "explain.js", "review.js", "zz-boot.js"]

# ---------- JS ----------
body = "\n".join((SRC / f).read_text(encoding="utf-8") for f in ORDER if (SRC / f).exists())
page_ids = re.findall(r"^PAGES\['([a-z]+-\d)'\] = \{", body, re.M)
mode_ids = re.findall(r"^PAGES\['(jatek-[a-z]+)'\] = \{", body, re.M)
consts = (f"const BASE = {BASE!r};\n"
          f"const PAGE_IDS = {json.dumps(page_ids)};\n"
          "const HERO_SVG = " + json.dumps(redesign.HERO) + ";\n"
          "const SUBJ_ICON = " + json.dumps({"matek": redesign.ICON_MATEK, "magyar": redesign.ICON_MAGYAR, "kornyezet": redesign.ICON_ENV, "jatek": redesign.ICON_MOD}) + ";\n"
          "const SUBJ_DESC = " + json.dumps({"matek": "Számolás, számok, mértékegységek, geometria és szöveges feladatok.",
                                             "magyar": "Betűk, olvasás, helyesírás, nyelvtan és szövegértés.", "kornyezet": "Természet, időjárás, testünk és egészségünk, hazánk tájai."}, ensure_ascii=False) + ";\n")
app_js = "'use strict';\n" + consts + body.replace("'use strict';\n", "", 1)
(OUT / "assets").mkdir(exist_ok=True)
(OUT / "assets" / "app.js").write_text(app_js, encoding="utf-8")

# ---------- CSS ----------
LATIN = "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
LATIN_EXT = "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF"
faces = []
for family, pkg, weights in [("Fredoka", "fredoka", (500, 600)), ("Nunito", "nunito", (600, 700))]:
    for w in weights:
        for subset, rng in (("latin", LATIN), ("latin-ext", LATIN_EXT)):
            fn = f"{pkg}-{subset}-{w}-normal.woff2"
            assert (OUT / "assets" / "fonts" / fn).exists(), fn
            faces.append(f"@font-face{{font-family:'{family}';font-style:normal;font-weight:{w};font-display:swap;"
                         f"src:url({BASE}assets/fonts/{fn}) format('woff2');unicode-range:{rng}}}")
css = "\n".join(faces) + "\n" + "".join((SRC / f).read_text(encoding="utf-8") + "\n" for f in ("base.css", "theme.css", "features.css", "explain.css") if (SRC / f).exists())
(OUT / "assets" / "app.css").write_text(css, encoding="utf-8")
(OUT / "assets" / "theme.js").write_text((SRC / "theme.js").read_text(encoding="utf-8"), encoding="utf-8")

VER = hashlib.sha1((app_js + css + (SRC / "theme.js").read_text(encoding="utf-8")).encode()).hexdigest()[:8]

# ---------- HTML ----------
SUN = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="currentColor"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
MOON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.6A8.2 8.2 0 0 1 9.4 4a8.2 8.2 0 1 0 10.6 10.6z" fill="currentColor"/></svg>'

def page_html(title, desc, data_page="", body_extra="", script=True, path=""):
    dp = f' data-page="{data_page}"' if data_page else ""
    return f"""<!doctype html>
<html lang="hu">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#3563e9">
<link rel="icon" href="{BASE}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="{BASE}assets/icon-192.png">
<link rel="manifest" href="{BASE}manifest.webmanifest">
<link rel="preload" href="{BASE}assets/fonts/fredoka-latin-600-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{BASE}assets/fonts/nunito-latin-600-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{BASE}assets/app.css?v={VER}">
<script src="{BASE}assets/theme.js?v={VER}"></script>
</head>
<body{dp}>
<header class="site-head"><div class="site-head-in">
<a class="brand" href="{BASE}">{redesign.LOGO}<span>Kockafüzet</span></a>
<nav class="site-nav" aria-label="Tantárgyak"><a class="m" href="{BASE}#matek">Matematika</a><a class="h" href="{BASE}#magyar">Magyar</a><a class="k" href="{BASE}#kornyezet">Környezet</a><a class="x" href="{BASE}#jatekok">Játékok</a></nav>
<button class="theme-switch" type="button" id="theme-btn" role="switch" aria-checked="false" aria-label="Sötét mód" title="Világos / sötét mód"><span class="ts-ico ts-l">{SUN}</span><span class="ts-ico ts-r">{MOON}</span><span class="ts-knob"><span class="k-sun">{SUN}</span><span class="k-moon">{MOON}</span></span></button>
</div></header>
<main id="app">{body_extra}</main>
<footer class="site-foot"><div class="site-foot-in">
<span><b>Kockafüzet</b> · ingyenes gyakorló feladatok alsósoknak</span>
<span class="foot-links"><a href="{BASE}szuloknek/">Szülőknek és tanítóknak</a><a href="{BASE}adatvedelem/">Adatvédelem</a></span>
</div></footer>
{f'<script src="{BASE}assets/app.js?v={VER}"></script>' if script else ''}
<noscript><p style="padding:20px">Az oldal használatához engedélyezd a JavaScriptet.</p></noscript>
</body>
</html>
"""

def write(rel, html):
    p = OUT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(html, encoding="utf-8")

write("index.html", page_html(f"{SITE} – gyakorló feladatok alsósoknak",
      "Ingyenes, interaktív gyakorló feladatok alsósoknak matematikából és magyarból, a NAT témái szerint. Regisztráció és reklám nélkül."))

SUBJ = {"matek": ("Matematika", "matematika"), "magyar": ("Magyar nyelv és olvasás", "magyar nyelv, olvasás és helyesírás"), "kornyezet": ("Környezetismeret", "környezetismeret")}
for pid in page_ids:
    s, g = pid.split("-")
    name, words = SUBJ[s]
    write(f"{s}/{g}/index.html", page_html(f"{name} {g}. osztály – {SITE}",
          f"Interaktív {words} gyakorló feladatok {g}. osztályosoknak, a NAT témái szerint. Ingyenes, regisztráció nélkül.", data_page=pid))
MODE_META = json.loads((DEV / "modes.json").read_text(encoding="utf-8")) if (DEV / "modes.json").exists() else {}
for mid in mode_ids:
    slug, title, desc = MODE_META[mid]
    write(f"jatek/{slug}/index.html", page_html(f"{title} – {SITE}", desc, data_page=mid))

# app-rendered utility pages
write("szuloknek/index.html", page_html(f"Szülőknek és tanítóknak – {SITE}",
      "Haladás gyerekenként, nyomtatható feladatlapok és megosztható feladatsorok tanítóknak.", data_page="szulo"))
write("feladatsor/index.html", page_html(f"Feladatsor – {SITE}", "Tanító által megosztott feladatsor.", data_page="feladatsor"))
write("nyomtatas/index.html", page_html(f"Nyomtatható feladatlap – {SITE}", "Nyomtatható feladatlap megoldókulccsal.", data_page="nyomtatas"))

privacy = (DEV / "privacy.html").read_text(encoding="utf-8")
write("adatvedelem/index.html", page_html(f"Adatvédelem – {SITE}", f"Milyen adatot kezel a {SITE} oldal.", body_extra=privacy, script=False))
write("404.html", page_html(f"Nincs ilyen oldal – {SITE}", "Nincs ilyen oldal.", script=False,
      body_extra=f'<div class="wrap"><header><h1>Ez az oldal nem található</h1></header>'
                 f'<p><a class="btn primary" href="{BASE}" style="text-decoration:none">Vissza a főoldalra</a></p></div>'))

# ---------- misc files ----------
(OUT / "favicon.svg").write_text(redesign.LOGO.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ', 1), encoding="utf-8")
(OUT / ".nojekyll").write_text("", encoding="utf-8")
(OUT / "robots.txt").write_text(f"User-agent: *\nAllow: /\nDisallow: {BASE}dev/\n", encoding="utf-8")
manifest = {"name": "Kockafüzet – gyakorló feladatok alsósoknak", "short_name": "Kockafüzet", "lang": "hu",
            "start_url": BASE, "scope": BASE, "display": "standalone", "background_color": "#f5f7fb", "theme_color": "#3563e9",
            "icons": [{"src": f"{BASE}assets/icon-192.png", "sizes": "192x192", "type": "image/png"},
                      {"src": f"{BASE}assets/icon-512.png", "sizes": "512x512", "type": "image/png"},
                      {"src": f"{BASE}assets/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}]}
(OUT / "manifest.webmanifest").write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding="utf-8")

# service worker: cache-first for versioned assets, network-first for pages, everything precached for offline use
pages = ["", "adatvedelem/", "szuloknek/", "feladatsor/", "nyomtatas/"] + [f"{p.replace('-', '/')}/" for p in page_ids] + [f"jatek/{MODE_META[m][0]}/" for m in mode_ids]
fonts = sorted(f"assets/fonts/{p.name}" for p in (OUT / "assets" / "fonts").glob("*.woff2"))
pre = [BASE + p for p in pages] + [f"{BASE}assets/app.css?v={VER}", f"{BASE}assets/app.js?v={VER}", f"{BASE}assets/theme.js?v={VER}",
                                   f"{BASE}favicon.svg", f"{BASE}manifest.webmanifest"] + [BASE + f for f in fonts]
sw = (SRC / "sw.js").read_text(encoding="utf-8").replace("__VER__", VER).replace("__PRECACHE__", json.dumps(pre, indent=1)).replace("__BASE__", BASE)
(OUT / "sw.js").write_text(sw, encoding="utf-8")

sitemap = "".join(f"<url><loc>https://ropeman.github.io{BASE}{p}</loc></url>" for p in pages if p not in ("feladatsor/", "nyomtatas/"))
(OUT / "sitemap.xml").write_text(f'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{sitemap}</urlset>\n', encoding="utf-8")
with open(OUT / "robots.txt", "a", encoding="utf-8") as f:
    f.write(f"Sitemap: https://ropeman.github.io{BASE}sitemap.xml\n")

print("version", VER, "| pages:", ", ".join(page_ids), "| modes:", ", ".join(mode_ids) or "-")
