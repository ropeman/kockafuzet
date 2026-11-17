# Kockafüzet – fejlesztői jegyzet

A weboldal a repó gyökerében van (GitHub Pages ezt szolgálja ki). A forrás a `dev/` mappában:

- `dev/src/core.js` – motor: profilok, tárolás, útválasztás, főoldal, feladatkör, válaszfelületek
- `dev/src/visuals.js` – közös rajzok és segédfüggvények (óra, pénz, tízes rudak, névelők)
- `dev/src/matek-N.js`, `dev/src/magyar-N.js` – évfolyamonkénti feladatgenerátorok (`PAGES['matek-2'] = {...}`)
- `dev/src/modes.js` – Játékok: Szorzótábla-bajnok, Óra-mester, Pénzszámolás, Hibáim gyakorlása
- `dev/src/features.js` – Szülőknek oldal, nyomtatható feladatlap, megosztható feladatsor, telepítés
- `dev/src/explain.js` – Így működik: lépésenkénti magyarázatok (a kérdésből ismeri fel a típust)
- `dev/src/review.js` – Napi 5 perc: ismétlés témánkénti dobozokkal (1–5), heti cél
- `dev/src/kornyezet-3.js`, `dev/src/kornyezet-4.js` – Környezetismeret (NAT 2020 kerettanterv); a 3. osztály a 4. osztály segédfüggvényeit is használja, ezért utána töltődik be
- `dev/src/matek-extra.js` – további matekfeladatok minden évfolyamra: számegyenes, számpiramis, bűvös négyzet, párosító, számkártyák, nyitott mondatok, oszthatóság, diagramok, testek, szimmetria, szabályjáték, kombinatorika, óra beállítása
- `dev/src/interact.js` – interaktív típusok: Válogató (húzd a kosárba), Címkézd fel!, Állítsd be (hőmérő, iránytű), Ki vagyok én?
- `dev/src/lab.js` – Kísérletező: „Mit gondolsz? → Próbáld ki! → Mit láttál?” kísérletek (melegítés-hűtés, úszik vagy elsüllyed, oldódás)
- `dev/src/map.js` – térképek: Magyarország megyékkel, a szomszédos országok, Budapest Duna-hídjai; „Koppints a térképre!” feladattípus
- `dev/src/mapdata.js` – generált térképadat (Natural Earth, közkincs). Újragenerálás: `node dev/tools/make-map.js <node_modules> dev/src/mapdata.js` (kell hozzá: datamaps, world-atlas, @geo-maps/earth-lakes-10m, topojson-client, d3-geo)
- `dev/src/*.css`, `dev/src/theme.js`, `dev/src/sw.js` – megjelenés, világos/sötét mód, offline működés

Építés (a repó gyökeréből):

    python3 dev/build.py --base /kockafuzet/

Tesztek (Playwright kell hozzá):

    dev/tests/stage.sh                # tesztpéldány építése /tmp/kfsite alá
    python3 dev/tests/fuzz.py 300     # minden generátor ellenőrzése
    python3 dev/tests/e2e.py          # böngészős végigjátszás
    python3 dev/tests/explain_check.py # a magyarázatok a helyes eredményhez jutnak-e
    python3 dev/tests/interact_test.py # húzás, koppintás, térkép egérrel és érintéssel
    python3 dev/tests/sample.py matek-3   # mintakérdések átnézéshez
