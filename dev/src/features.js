/* ===== Szülőknek és tanítóknak: hibák, haladás, nyomtatás, megosztás, telepítés ===== */

/* ---------- remembered mistakes (per child, on this device) ---------- */
const MKEY = () => `tt.${active}.miss`;
const getMistakes = () => store.get(MKEY(), []);
const setMistakes = l => store.set(MKEY(), l);
function rememberMistake(page, topic, q) {
  if (!page || !q || q.type === 'read' || q.autoSpeak || page.id === 'jatek-hibak') return;
  const clean = JSON.parse(JSON.stringify(q)); delete clean._mk; delete clean._page; delete clean._topic;
  const k = (String(q.prompt) + '|' + JSON.stringify(q.answer) + '|' + String(q.visual || '').length).slice(0, 400);
  const l = getMistakes().filter(m => m.k !== k);
  l.push({ k, p: page.id, t: topic && topic.id, q: clean, d: Date.now() });
  setMistakes(l.slice(-40));
}

/* ---------- reproducible question sets (same seed → same questions on every device) ---------- */
function mulberry32(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function withSeed(seed, fn) { const orig = Math.random; Math.random = mulberry32(seed); try { return fn(); } finally { Math.random = orig; } }
const newSeed = () => Math.floor(Math.random() * 1e9) + 1;
function printable(t) {
  if (t._printable === undefined) {
    try { const q = withSeed(7, () => t.gen(1)); t._printable = !!q && q.type !== 'read' && !q.autoSpeak; } catch (e) { t._printable = false; }
  }
  return t._printable;
}
const SET_PAGES = () => Object.values(PAGES).filter(p => p.topics && p.topics.some(t => t.gen && printable(t)));
function readSpec() {
  const u = new URLSearchParams(location.search), page = PAGES[u.get('p')];
  if (!page || !page.topics) return null;
  const ids = (u.get('t') || '').split(',').filter(Boolean);
  const topics = page.topics.filter(t => ids.includes(t.id) && t.gen && printable(t));
  if (!topics.length) return null;
  const level = Math.min(3, Math.max(1, Number(u.get('l')) || 1)), n = Math.min(40, Math.max(5, Number(u.get('n')) || 10)), seed = (Number(u.get('s')) >>> 0) || 1;
  const letters = u.get('b') ? u.get('b').split(',').filter(g => ALL_G.includes(g)) : null;
  return { page, topics, level, n, seed, letters: letters && letters.length >= 4 ? letters : null, key: u.get('k') !== '0' };
}
function specQuery(sp) {
  const q = new URLSearchParams({ p: sp.page.id, t: sp.topics.map(t => t.id).join(','), l: sp.level, n: sp.n, s: sp.seed });
  if (sp.letters) q.set('b', sp.letters.join(','));
  if (sp.key === false) q.set('k', '0');
  return q.toString();
}
function genList(sp) {
  if (sp.letters) window.LETTERS_OVERRIDE = sp.letters;
  try {
    return withSeed(sp.seed, () => {
      const out = [], seen = new Set(), per = Math.ceil(sp.n / sp.topics.length);
      for (const t of sp.topics) for (let i = 0; i < per && out.length < sp.n; i++) {
        let q, key, g = 0;
        for (const L of [sp.level, sp.level - 1, sp.level + 1, sp.level - 2, sp.level + 2].filter(L => L >= 1 && L <= 3)) { g = 0; do { q = t.gen(L); key = qKey(q); } while (seen.has(key) && g++ < 40); if (!seen.has(key)) break; }
        seen.add(key); out.push({ ...q, _topic: t.id });
      }
      return out;
    });
  } finally { if (sp.letters) delete window.LETTERS_OVERRIDE; }
}
const levelName = l => ['', 'könnyű', 'közepes', 'nehéz'][l];

/* ---------- static (printable) rendering of a question ---------- */
const stripTags = s => String(s ?? '').replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const printPrompt = s => String(s || '')
  .replace(/Koppints az összes/g, 'Karikázd be az összes')
  .replace('Rakd ki a szót a képhez!', 'Írd le a kép nevét ezekből a betűkből!')
  .replace('Rakd betűrendbe a szavakat! Koppints rájuk sorban.', 'Írd le a szavakat betűrendben!')
  .replace(/ Koppints (rá a térképen|a pontra|a megyére)!/g, '').replace(/Koppints arra az országra/g, 'Színezd ki azt az országot').replace(/ Koppints rájuk sorban\./g, ' Írd le őket sorban!');
function staticQ(q, i) {
  if (q.type === 'lab') q = { ...q, type: 'choice' };
  const body = h('div', { class: 'pq-b' }, h('div', { class: 'pq-p', html: printPrompt(q.prompt) }));
  if (q.visual) body.append(h('div', { class: 'pq-v', html: expandVis(q.visual) }));
  if (q.type === 'choice') body.append(h('div', { class: 'pq-o' }, q.options.map((o, k) => h('span', { class: 'pq-opt' }, h('b', null, 'ABCDEF'[k] + ')'), h('span', { html: o.html })))));
  else if (q.type === 'input') body.append(h('div', { class: 'pq-a' }, 'Válasz: ', h('span', { class: 'pq-line' })));
  else if (q.type === 'find') body.append(h('div', { class: 'pq-grid' }, q.cells.map(c => h('span', null, c))));
  else if (q.type === 'sort') body.append(h('div', { class: 'pq-words' }, q.items.map(it => h('span', null, it.text))), h('div', { class: 'pq-sort', style: `--n:${q.bins.length}` }, q.bins.map(b => h('div', null, b.label))));
  else if (q.type === 'label') { const f = h('div', { class: 'pq-lfig', html: q.img }); q.spots.forEach((s, k) => f.append(h('span', { style: `left:${s.x}%;top:${s.y}%` }, String(k + 1)))); body.append(f, h('div', { class: 'pq-words' }, 'Írd a számok mellé: ', ...q.labels.map(l => h('span', null, l.text)))); }
  else if (q.type === 'set') body.append(h('div', { class: 'pq-v', html: q.kind === 'thermo' ? thermo(-10).replace(/<rect x="52"[^>]*class="f-red"\/>/, '') : compass(null, [0, 2, 4, 6]) }), h('div', { class: 'pq-a' }, q.kind === 'thermo' ? 'Színezd be a hőmérőt a megfelelő magasságig!' : 'Rajzold be a nyilat!'));
  else if (q.type === 'map') body.append(h('div', { class: 'pq-v pq-map', html: q.map === 'region' ? regionMap() : huMap({ dots: q.dots, labels: q.pick === 'dot' ? 'num' : false }) }), h('div', { class: 'pq-a' }, q.pick === 'dot' ? 'Írd ide a helyes pont számát: ' : 'Színezd ki a térképen!', q.pick === 'dot' ? h('span', { class: 'pq-box' }) : ''));
  else if (q.type === 'riddle') body.append(h('ol', { class: 'pq-clues' }, q.clues.map(c => h('li', null, c))), h('div', { class: 'pq-o' }, q.options.map((o, k) => h('span', { class: 'pq-opt' }, h('b', null, 'ABCDEF'[k] + ')'), h('span', { html: o.html })))));
  else if (q.type === 'build') {
    const words = q.answer.some(x => x.length > 3);
    body.append(h('div', { class: 'pq-tiles' }, q.tiles.map(t => h('span', null, t))), h('div', { class: 'pq-a' }, words ? h('span', { class: 'pq-line wide' }) : q.answer.map(() => h('span', { class: 'pq-box' }))));
  }
  return h('div', { class: 'pq' }, h('div', { class: 'pq-n' }, `${i + 1}.`), body);
}
function keyText(q) {
  if (q.type === 'lab') q = { ...q, type: 'choice' };
  if (q.type === 'choice') { const k = q.options.findIndex(o => o.value === q.answer); const txt = stripTags(q.options[k] && q.options[k].html); return `${'ABCDEF'[k]})${txt ? ' ' + txt : q.answerText ? ' ' + stripTags(q.answerText) : ''}`; }
  if (q.type === 'find') return `${q.targets.length} db: ${q.targets.map(i => i + 1).join(', ')}. hely`;
  if (q.type === 'build') return q.answer.join(q.answer.some(x => x.length > 3) ? ', ' : '');
  if (q.type === 'sort' || q.type === 'label' || q.type === 'set') return stripTags(String(q.answerText).replace(/<br>/g, '; '));
  if (q.type === 'map') return q.pick === 'dot' ? `${q.dots.indexOf(q.answer) + 1}. pont: ${q.answer}` : q.answer;
  if (q.type === 'riddle') { const k = q.options.findIndex(o => o.value === q.answer); return `${'ABCDEF'[k]}) ${q.answer}`; }
  return String(q.answer).replace('-', '−');
}

/* ---------- /nyomtatas/ : printable worksheet ---------- */
VIEWS.nyomtatas = () => {
  runCleanups();
  const sp = readSpec();
  if (!sp) return mount(h('div', { class: 'panel' }, h('h2', null, 'Hiányos feladatlap-beállítás'), h('p', { class: 'mute' }, 'Állítsd össze a feladatlapot a szülői oldalon.'), h('a', { class: 'btn primary', href: BASE + 'szuloknek/', style: 'text-decoration:none;align-self:flex-start' }, 'Szülőknek és tanítóknak')));
  const qs = genList(sp);
  const keyBox = h('input', { type: 'checkbox', id: 'withkey' }); keyBox.checked = sp.key;
  const keyEl = h('section', { class: 'pkey' }, h('h2', null, 'Megoldókulcs'), h('ol', null, qs.map(q => h('li', { html: keyText(q) }))));
  keyEl.hidden = !sp.key;
  keyBox.addEventListener('change', () => { keyEl.hidden = !keyBox.checked; sp.key = keyBox.checked; history.replaceState(null, '', '?' + specQuery(sp)); });
  const label = pageLabel(sp.page.id);
  mount(
    h('div', { class: 'bar no-print' },
      h('a', { class: 'btn small', href: BASE + 'szuloknek/', style: 'text-decoration:none' }, '← Vissza'),
      h('div', { class: 'chips' },
        h('label', { class: 'chip', for: 'withkey' }, keyBox, ' Megoldókulcs'),
        h('button', { class: 'btn small', onclick: () => { sp.seed = newSeed(); history.replaceState(null, '', '?' + specQuery(sp)); VIEWS.nyomtatas(); } }, 'Új feladatok'),
        h('button', { class: 'btn primary small', onclick: () => window.print() }, '🖨 Nyomtatás'))),
    h('article', { class: 'sheet' },
      h('header', { class: 'sheet-head' },
        h('div', null, h('div', { class: 'sheet-brand', html: `${LOGO_SMALL} Kockafüzet` }), h('h1', null, label), h('p', null, `${sp.topics.map(t => t.name).join(', ')} · ${qs.length} feladat · ${levelName(sp.level)}`)),
        h('div', { class: 'sheet-name' }, h('span', null, 'Név:'), h('span', { class: 'pq-line' }), h('span', null, 'Dátum:'), h('span', { class: 'pq-line' }))),
      h('div', { class: 'pqs' }, qs.map(staticQ))),
    keyEl);
};
const LOGO_SMALL = '<svg viewBox="0 0 40 40" width="20" height="20" aria-hidden="true"><rect width="40" height="40" rx="11" fill="#3563e9"/><path d="M12 21l5.5 5.5L29 14" fill="none" stroke="#ffc93c" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/* ---------- /feladatsor/ : shared set for a class ---------- */
VIEWS.feladatsor = () => {
  runCleanups();
  const sp = readSpec();
  if (!sp) return mount(h('div', { class: 'panel' }, h('h2', null, 'Ez a feladatsor-link hiányos'), h('p', { class: 'mute' }, 'Kérd el újra a linket a tanítótól, vagy gyakorolj a főoldalon.'), h('a', { class: 'btn primary', href: BASE, style: 'text-decoration:none;align-self:flex-start' }, 'Főoldal')));
  const list = genList(sp), rkey = `tt.${active}.set.${sp.page.id}.${sp.seed}`, prev = store.get(rkey, null);
  const start = () => startList({
    page: sp.page, title: 'Feladatsor', list, level: sp.level, back: () => VIEWS.feladatsor(),
    onAnswer: (q, first) => { if (!first) rememberMistake(sp.page, { id: q._topic }, q); },
    onFinish: s => {
      const res = { c: s.correct, n: s.total, d: Date.now() }; store.set(rkey, res); markDay();
      const when = new Date(res.d).toLocaleString('hu-HU', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      mount(h('div', { class: 'qcard results' },
        h('p', { class: 'mute' }, `Feladatsor · ${pageLabel(sp.page.id)}`),
        h('h2', null, `${s.correct} / ${s.total} jó válasz`),
        h('div', { class: 'dots big', 'aria-hidden': 'true' }, s.res.map(r => h('i', { class: r }))),
        h('p', { class: 'mute' }, `${profiles[active].name} · ${when}. Ezt az eredményt megmutathatod a tanítódnak.`),
        h('div', { class: 'actions' }, h('button', { class: 'btn primary', onclick: start }, 'Újra'), h('a', { class: 'btn', href: BASE, style: 'text-decoration:none' }, 'Főoldal'))));
    }
  });
  mount(
    h('header', { class: 'page-head' }, h('span', { class: 'subj-ico', html: SUBJ_ICON[subjOf(sp.page.id)] || SUBJ_ICON.jatek }), h('div', null, h('p', { class: 'mute' }, 'Tanítói feladatsor'), h('h1', null, pageLabel(sp.page.id)), h('p', { class: 'mute' }, `${sp.topics.map(t => t.name).join(', ')} · ${list.length} feladat · ${levelName(sp.level)}`))),
    profileBar(() => VIEWS.feladatsor()),
    h('div', { class: 'panel' },
      h('p', null, 'Mindenki ugyanazokat a feladatokat kapja. A végén megjelenik az eredményed.'),
      prev ? h('p', { class: 'mute' }, `Legutóbbi eredményed: ${prev.c} / ${prev.n}.`) : null,
      h('div', { class: 'actions', style: 'justify-content:flex-start' }, h('button', { class: 'btn primary', onclick: start }, 'Kezdés'))));
};

/* ---------- /szuloknek/ : progress, worksheets, share links, install ---------- */
let installEvt = null;
addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; if (document.body.dataset.page === 'szulo' && !S) VIEWS.szulo(); });

function progressPanel() {
  const rows = [];
  let rounds = 0, stars = 0;
  for (const p of Object.values(PAGES)) for (const t of p.topics || []) {
    const plays = store.get(pk(p.id, t.id, 'plays'), 0); if (!plays) continue;
    const last = store.get(pk(p.id, t.id, 'last'), null), st = store.get(pk(p.id, t.id, 'stars'), 0), d = store.get(pk(p.id, t.id, 'date'), 0);
    rounds += plays; stars += st; rows.push({ p, t, plays, last, st, d });
  }
  const miss = getMistakes().length;
  if (!rows.length) return h('div', { class: 'panel empty' }, h('h3', null, 'Még nincs eredmény ezen az eszközön'), h('p', { class: 'mute' }, 'Amint a gyerek befejez egy kört, itt látod, melyik téma megy jól, és melyiket érdemes még gyakorolni.'));
  rows.sort((a, b) => b.d - a.d);
  const weak = rows.filter(r => r.last !== null && r.last < 7);
  const fmtD = d => d ? new Date(d).toLocaleDateString('hu-HU', { month: 'short', day: 'numeric' }) : '';
  return h('div', { class: 'panel' },
    h('div', { class: 'kpis' },
      h('div', null, h('b', null, `${weekInfo().count} / ${GOAL}`), h('span', null, 'gyakorló nap ezen a héten')),
      h('div', null, h('b', null, String(rounds)), h('span', null, 'befejezett kör')),
      h('div', null, h('b', null, String(stars)), h('span', null, 'csillag')),
      h('div', null, h('b', null, String(weak.length)), h('span', null, 'gyakorlandó téma')),
      h('a', { href: pageUrl('jatek-hibak') }, h('b', null, String(miss)), h('span', null, 'hibás feladat a listán'))),
    weak.length ? h('div', { class: 'hint' }, h('b', null, 'Érdemes gyakorolni: '), weak.slice(0, 6).map(r => `${r.t.name} (${pageLabel(r.p.id)})`).join(', ') + '.') : null,
    h('div', { class: 'scroll' }, h('table', { class: 'prog stack' },
      h('thead', null, h('tr', null, ['Téma', 'Csillag', 'Legutóbb', 'Körök', 'Dátum'].map(x => h('th', null, x)))),
      h('tbody', null, rows.map(r => h('tr', { class: r.last !== null && r.last < 7 ? 'weak' : '' },
        h('td', { 'data-l': 'Téma' }, h('a', { href: pageUrl(r.p.id) }, r.t.name), h('small', null, pageLabel(r.p.id))),
        h('td', { 'data-l': 'Csillag', html: starsHtml(r.st) }), h('td', { 'data-l': 'Legutóbb' }, r.last === null ? '–' : `${r.last} / 10`), h('td', { 'data-l': 'Körök' }, String(r.plays)), h('td', { 'data-l': 'Dátum' }, fmtD(r.d))))))));
}

function setBuilder() {
  const pages = SET_PAGES();
  const st = store.get('tt.builder', { p: 'matek-2', t: [], l: 1, n: 10 });
  let page = PAGES[st.p] && pages.includes(PAGES[st.p]) ? PAGES[st.p] : pages[0];
  let chosen = new Set(st.t.filter(id => page.topics.some(t => t.id === id)));
  if (!chosen.size) chosen.add(page.topics.find(t => printable(t)).id);
  let level = st.l, n = st.n;
  const save = () => store.set('tt.builder', { p: page.id, t: [...chosen], l: level, n });
  const wrap = h('div', { class: 'panel builder' });
  const out = h('div', { class: 'share-out', hidden: true });
  const spec = () => ({ page, topics: page.topics.filter(t => chosen.has(t.id)), level, n, seed: newSeed(), letters: page.id === 'magyar-1' ? [...Lset()] : null, key: true });
  const draw = () => {
    const sel = h('select', { id: 'b-page', onchange: e => { page = PAGES[e.target.value]; chosen = new Set([page.topics.find(t => printable(t)).id]); save(); draw(); } });
    [['Matematika', 'matek'], ['Magyar', 'magyar'], ['Környezetismeret', 'kornyezet'], ['Játékok', 'jatek']].forEach(([lab, s]) => {
      const g = h('optgroup', { label: lab });
      pages.filter(p => subjOf(p.id) === s).forEach(p => { const o = h('option', { value: p.id }, pageLabel(p.id)); if (p === page) o.selected = true; g.append(o); });
      if (g.children.length) sel.append(g);
    });
    const tchips = h('div', { class: 'chips' }, page.topics.filter(t => printable(t)).map(t => h('button', { class: 'chip', 'aria-pressed': String(chosen.has(t.id)), onclick: () => { chosen.has(t.id) ? chosen.size > 1 && chosen.delete(t.id) : chosen.add(t.id); save(); draw(); } }, t.name)));
    const seg = (opts, cur, set) => h('div', { class: 'chips' }, opts.map(([v, lab]) => h('button', { class: 'chip', 'aria-pressed': String(cur === v), onclick: () => { set(v); save(); draw(); } }, lab)));
    wrap.replaceChildren(
      h('h3', null, 'Feladatlap és megosztható feladatsor'),
      h('p', { class: 'mute' }, 'Válaszd ki az évfolyamot és a témákat. Nyomtatható lapot kapsz megoldókulccsal, vagy linket, amellyel minden gyerek ugyanazokat a feladatokat oldja meg a saját eszközén.'),
      h('label', { class: 'field-l', for: 'b-page' }, 'Évfolyam és tantárgy'), sel,
      h('div', { class: 'field-l' }, 'Témák'), tchips,
      h('div', { class: 'field-l' }, 'Nehézség'), seg([[1, 'Könnyű'], [2, 'Közepes'], [3, 'Nehéz']], level, v => level = v),
      h('div', { class: 'field-l' }, 'Feladatok száma'), seg([[10, '10'], [20, '20'], [30, '30']], n, v => n = v),
      h('div', { class: 'actions', style: 'justify-content:flex-start' },
        h('a', { class: 'btn primary', href: '#', onclick: e => { e.preventDefault(); location.href = BASE + 'nyomtatas/?' + specQuery(spec()); } }, '🖨 Feladatlap nyomtatáshoz'),
        h('button', { class: 'btn', onclick: () => showLink(spec()) }, '🔗 Megosztható link')),
      out);
  };
  const showLink = sp => {
    const url = `${location.origin}${BASE}feladatsor/?${specQuery(sp)}`;
    const inp = h('input', { type: 'text', readonly: true, value: url, 'aria-label': 'Feladatsor linkje', onfocus: e => e.target.select() });
    const msg = h('span', { class: 'mute', 'aria-live': 'polite' });
    out.hidden = false;
    out.replaceChildren(h('div', { class: 'field' }, inp, h('button', { class: 'btn small', onclick: async () => { try { await navigator.clipboard.writeText(url); msg.textContent = 'Kimásolva!'; } catch (e) { inp.select(); msg.textContent = 'Jelöld ki és másold ki a linket.'; } } }, 'Másolás')),
      msg, h('p', { class: 'mute' }, 'Küldd el a linket a szülőknek vagy a gyerekeknek. Mindenki ugyanazt a feladatsort kapja; a végén megjelenik az eredmény, amit megmutathatnak.'),
      h('a', { href: url, target: '_blank', rel: 'noopener' }, 'Kipróbálom →'));
  };
  draw();
  return wrap;
}

function installPanel() {
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const ready = 'serviceWorker' in navigator && navigator.serviceWorker.controller;
  return h('div', { class: 'panel' },
    h('h3', null, 'Telepítés és használat internet nélkül'),
    h('p', null, standalone ? 'A Kockafüzet már telepítve van ezen az eszközön.' : 'A Kockafüzet alkalmazásként is telepíthető: ikon kerül a kezdőképernyőre, és az első betöltés után internet nélkül is működik.'),
    h('p', { class: 'mute' }, ready ? '✓ Ezen az eszközön már internet nélkül is használható.' : 'Az oldal az első látogatás után elmenti magát; egy újratöltés után internet nélkül is megy.'),
    standalone ? null : installEvt ? h('div', { class: 'actions', style: 'justify-content:flex-start' }, h('button', { class: 'btn primary', onclick: async () => { installEvt.prompt(); try { await installEvt.userChoice; } catch (e) {} installEvt = null; VIEWS.szulo(); } }, '⬇ Telepítés'))
      : h('ul', { class: 'howto' }, ios ? h('li', null, 'iPhone, iPad (Safari): koppints a Megosztás gombra, majd a „Főképernyőhöz adás” pontra.') : null,
        h('li', null, 'Android (Chrome): a jobb felső menüben válaszd az „Alkalmazás telepítése” vagy „Hozzáadás a kezdőképernyőhöz” pontot.'),
        h('li', null, 'Számítógépen (Chrome, Edge): a címsor jobb oldalán lévő telepítés ikonra kattints.')));
}

VIEWS.szulo = () => {
  runCleanups();
  mount(
    h('div', { class: 'bar' }, h('nav', { class: 'crumbs', 'aria-label': 'Útvonal' }, h('a', { href: BASE }, 'Főoldal'), h('span', { class: 'sep' }, '›'), h('span', { 'aria-current': 'page' }, 'Szülőknek és tanítóknak'))),
    h('header', { class: 'page-head parent' }, h('span', { class: 'subj-ico' }, '👪'), h('div', null, h('h1', null, 'Szülőknek és tanítóknak'), h('p', { class: 'mute' }, 'Haladás gyerekenként, nyomtatható feladatlapok, megosztható feladatsorok. Minden adat csak ezen az eszközön marad.'))),
    h('h2', null, 'Haladás'),
    profileBar(() => VIEWS.szulo()),
    progressPanel(),
    setBuilder(),
    installPanel());
};
