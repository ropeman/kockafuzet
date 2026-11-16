/* ===== Játékok: Szorzótábla-bajnok, Óra-mester, Pénzszámolás, Hibáim ===== */
const pad2 = n => String(n).padStart(2, '0');
const dig = (hh, mm) => `${hh}:${pad2(mm)}`;

/* ---------- Óra-mester ---------- */
const ORA = {
  half(L) {
    const hh = ri(1, 12), mm = L === 1 ? 0 : pick([0, 30]);
    if (L === 3) return M2.clock(1);
    const ans = dig(hh, mm), o = new Set([ans]); while (o.size < 4) o.add(dig(ri(1, 12), L === 1 ? 0 : pick([0, 30])));
    return mcq('Hány óra van?', ans, [...o].filter(x => x !== ans), { visual: clockSvg(hh, mm), fmt: v => v, hint: 'A kismutató az órát mutatja. Ha a nagymutató a 12-esen áll, egész óra van; ha a 6-oson, fél.' });
  },
  quarter(L) { return M2.clock(L); },
  five(L) {
    const hh = ri(1, 12), mm = L === 1 ? pick([5, 10, 20, 25, 35, 40, 50, 55]) : ri(0, 11) * 5, ans = dig(hh, mm);
    if (L === 3) return { type: 'input', prompt: 'Hány perc van az egész óra után? (Nézd a nagymutatót!)', visual: clockSvg(hh, mm), answer: mm, hint: 'A nagymutató minden számnál 5 percet lép: 1 → 5 perc, 2 → 10 perc, 3 → 15 perc…' };
    const o = new Set([ans]); let g = 0;
    while (o.size < 4 && g++ < 50) o.add(dig(pick([hh, hh % 12 + 1, ri(1, 12)]), pick([mm, (mm + 5) % 60, (mm + 55) % 60, (60 - mm) % 60, ri(0, 11) * 5])));
    return mcq('Hány óra van?', ans, [...o].filter(x => x !== ans), { visual: clockSvg(hh, mm), fmt: v => v, hint: 'Számold a nagymutatót ötösével: a 3-as 15 perc, a 6-os 30 perc, a 9-es 45 perc.' });
  },
  minute(L) {
    const hh = ri(1, 12), mm = L === 1 ? ri(0, 11) * 5 + pick([1, 2, 3, 4]) : ri(0, 59);
    if (L === 1) { const ans = dig(hh, mm), o = new Set([ans]); while (o.size < 4) o.add(dig(hh, Math.max(0, Math.min(59, mm + pick([-2, -1, 1, 2, 5, -5]))))); return mcq('Hány óra van? Figyeld a kis vonalakat is!', ans, [...o].filter(x => x !== ans), { visual: clockSvg(hh, mm, 200), fmt: v => v, hint: 'Keresd meg a legközelebbi számot, és onnan számold tovább a kis vonalakat egyesével.' }); }
    return { type: 'input', prompt: L === 2 ? 'Hány perc van az egész óra után?' : 'Hány perc múlva lesz a következő egész óra?', visual: clockSvg(hh, mm, 200), answer: L === 2 ? mm : (60 - mm) % 60 || 60, hint: 'A nagymutató egy kis vonalnyi lépése 1 perc, két szám között 5 perc van.' };
  },
  elapsed(L) {
    const h1 = ri(7, 17), m1 = L === 1 ? 0 : pick([0, 15, 30, 45]), d = L === 1 ? 60 * ri(1, 4) : L === 2 ? pick([15, 30, 45, 60, 75, 90]) : ri(5, 150);
    const tot = h1 * 60 + m1 + d, h2 = Math.floor(tot / 60), m2 = tot % 60;
    return { type: 'input', prompt: `Az edzés ${dig(h1, m1)}-kor kezdődött, és ${dig(h2, m2)}-kor ért véget. Hány percig tartott?`, answer: d, hint: 'Számolj az egész óráig, aztán tovább a végéig. 1 óra = 60 perc.' };
  },
  day(L) {
    const pm = Math.random() < .6, hh = pm ? ri(1, 10) : ri(6, 11), mm = L === 1 ? 0 : pick([0, 15, 30, 45]), h24 = pm ? hh + 12 : hh;
    const part = pm ? (hh <= 5 ? 'délután' : 'este') : (hh <= 8 ? 'reggel' : 'délelőtt');
    if (L === 3) return { type: 'input', prompt: `Hány óra ez a 24 órás számlapon? <b>${part} ${hh} óra</b>`, answer: h24, hint: 'Délután és este 12-t adunk hozzá: délután 3 óra = 15 óra.' };
    const ans = dig(h24, mm), o = new Set([ans]); o.add(dig(pm ? hh : hh + 12, mm)); while (o.size < 4) o.add(dig(ri(1, 23), mm));
    return mcq(`Melyik időpont ez? <b>${part} ${mm ? huTime(hh, mm) : hh + ' óra'}</b>`, ans, [...o].filter(x => x !== ans), { fmt: v => v, hint: 'Délben 12 óra van. Délután és este 12-t adunk hozzá: délután 2 óra = 14:00. Negyed 3 = 2:15, fél 3 = 2:30.' });
  }
};
PAGES['jatek-ora'] = {
  id: 'jatek-ora', title: 'Óra-mester', grade: 0,
  blurb: 'Az óra leolvasása lépésről lépésre: egész és fél órák, negyedek, 5 perces és percre pontos idő, eltelt idő, 24 órás időpontok.',
  topics: [
    { id: 'half', sample: '3:00 · 3:30', name: 'Egész és fél', desc: 'A legegyszerűbb időpontok.', gen: ORA.half },
    { id: 'quarter', sample: 'negyed 4', name: 'Negyedórák', desc: 'Negyed, fél, háromnegyed.', gen: ORA.quarter },
    { id: 'five', sample: '7:25', name: 'Öt perc pontossággal', desc: 'A nagymutató ötösével lép.', gen: ORA.five },
    { id: 'minute', sample: '8:47', name: 'Percre pontosan', desc: 'A kis vonalak is számítanak.', gen: ORA.minute },
    { id: 'elapsed', sample: '9:15 → 10:00', name: 'Eltelt idő', desc: 'Mennyi ideig tartott?', gen: ORA.elapsed },
    { id: 'day', sample: '15:00', name: 'Délelőtt, délután', desc: 'A 24 órás időpontok.', gen: ORA.day }
  ]
};

/* ---------- Pénzszámolás ---------- */
const sumOf = l => l.reduce((a, b) => a + b, 0);
const wallet = (vals, k, max) => { let l, g = 0; do { l = Array.from({ length: k }, () => pick(vals)).sort((a, b) => b - a); } while (sumOf(l) > max && g++ < 80); return l; };
const PENZ = {
  sum(L) {
    const l = L === 1 ? wallet([5, 10, 20, 50], ri(2, 4), 100) : L === 2 ? wallet([10, 20, 50, 100, 200], ri(3, 5), 500) : wallet([20, 50, 100, 200, 500, 1000, 2000], ri(3, 5), 5000);
    return { type: 'input', prompt: 'Mennyi pénz van a képen? (Ft)', visual: moneySvg(l), answer: sumOf(l), hint: 'Kezdd a legnagyobb címlettel, és sorban add hozzá a többit.' };
  },
  change(L) {
    const pay = L === 1 ? pick([50, 100]) : L === 2 ? pick([200, 500]) : pick([1000, 2000, 5000]);
    const step = L === 3 ? 10 : 5, price = ri(Math.ceil(pay * .3 / step), Math.floor((pay - step) / step)) * step;
    const item = pick(['egy füzetet', 'egy uzsonnát', 'egy könyvet', 'egy labdát', 'egy jégkrémet', 'egy társasjátékot']);
    return { type: 'input', prompt: `Veszel ${item} ${fmt(price)} Ft-ért. Ezzel fizetsz. Mennyi a visszajáró? (Ft)`, visual: moneySvg([pay]), answer: pay - price, hint: `Számolj felfelé az árból a kifizetett összegig: ${fmt(price)} → ${fmt(pay)}.` };
  },
  enough(L) {
    const l = L === 1 ? wallet([5, 10, 20, 50], ri(2, 4), 100) : L === 2 ? wallet([10, 20, 50, 100, 200], ri(3, 5), 500) : wallet([50, 100, 200, 500, 1000], ri(3, 5), 3000);
    const s = sumOf(l), step = L === 1 ? 5 : 10, price = Math.max(step, s + pick([-3, -2, -1, 1, 2, 3]) * step * (L === 3 ? 5 : 1));
    const ok = s >= price;
    return { type: 'choice', prompt: `Elég ennyi pénz egy ${fmt(price)} Ft-os ajándékra?`, visual: moneySvg(l), answer: ok ? 'igen' : 'nem', options: [{ value: 'igen', html: 'Igen, elég' }, { value: 'nem', html: 'Nem elég' }], answerText: ok ? `Igen, elég (${fmt(s)} Ft van)` : `Nem elég (csak ${fmt(s)} Ft van)`, hint: 'Számold össze a pénzt, és hasonlítsd össze az árral.' };
  },
  exact(L) {
    const vals = L === 1 ? [5, 10, 20, 50] : L === 2 ? [10, 20, 50, 100, 200] : [50, 100, 200, 500, 1000];
    const right = wallet(vals, ri(2, 3), L === 1 ? 100 : L === 2 ? 500 : 3000), price = sumOf(right), seen = new Set([price]), opts = [{ value: 'ok', html: moneySvg(right) }]; let g = 0;
    while (opts.length < 3 && g++ < 80) { const w = wallet(vals, ri(2, 3), price * 2); const s = sumOf(w); if (!seen.has(s)) { seen.add(s); opts.push({ value: 'x' + s, html: moneySvg(w) }); } }
    return { type: 'choice', prompt: `Melyik pénzzel tudsz pontosan fizetni, ha az ár <b>${fmt(price)} Ft</b>?`, answer: 'ok', options: shuffle(opts), answerText: `ami pontosan ${fmt(price)} Ft`, hint: 'Számold össze mindegyik csoportot, és keresd azt, amelyik pontosan annyi, mint az ár.' };
  }
};
PAGES['jatek-penz'] = {
  id: 'jatek-penz', title: 'Pénzszámolás', grade: 0,
  blurb: 'Forint érmék és bankjegyek: összeadás, visszajáró, elég-e a pénz, pontos fizetés.',
  topics: [
    { id: 'sum', sample: '20 + 50 Ft', name: 'Mennyi pénz?', desc: 'Érmék és bankjegyek összeadása.', gen: PENZ.sum },
    { id: 'change', sample: 'visszajáró', name: 'Visszajáró', desc: 'Mennyit kapsz vissza a boltban?', gen: PENZ.change },
    { id: 'enough', sample: 'elég?', name: 'Elég a pénz?', desc: 'Megveheted, vagy még gyűjteni kell?', gen: PENZ.enough },
    { id: 'exact', sample: 'pontosan', name: 'Pontos fizetés', desc: 'Melyik pénzzel fizetsz pontosan?', gen: PENZ.exact }
  ]
};

/* ---------- Szorzótábla-bajnok ---------- */
PAGES['jatek-szorzo'] = {
  id: 'jatek-szorzo', title: 'Szorzótábla-bajnok', grade: 0, topics: [],
  blurb: 'Hány szorzást vagy osztást tudsz megoldani egy perc alatt? Döntsd meg a saját rekordodat!',
  render: page => szorzoSetup(page)
};
const SZ_KEY = () => `tt.${active}.szorzo`;
function szorzoSetup(page) {
  runCleanups();
  const cfg = store.get(SZ_KEY() + '.cfg', { tables: [2, 3, 4, 5, 6, 7, 8, 9, 10], op: 'mul', secs: 60 });
  const save = () => store.set(SZ_KEY() + '.cfg', cfg);
  const key = () => `${cfg.op}.${cfg.secs}.${cfg.tables.join('-')}`;
  const best = () => store.get(SZ_KEY() + '.best.' + key(), 0);
  const tbl = h('div', { class: 'chips' });
  const drawT = () => { tbl.replaceChildren(...[2, 3, 4, 5, 6, 7, 8, 9, 10].map(t => h('button', { class: 'chip letter', 'aria-pressed': String(cfg.tables.includes(t)), onclick: () => { cfg.tables = cfg.tables.includes(t) ? cfg.tables.filter(x => x !== t) : [...cfg.tables, t].sort((a, b) => a - b); if (!cfg.tables.length) cfg.tables = [t]; save(); redraw(); } }, `${t}`))); };
  const seg = (opts, k) => h('div', { class: 'chips' }, opts.map(([v, lab]) => h('button', { class: 'chip', 'aria-pressed': String(cfg[k] === v), onclick: () => { cfg[k] = v; save(); szorzoSetup(page); } }, lab)));
  const bestEl = h('p', { class: 'mute' });
  const redraw = () => { drawT(); bestEl.textContent = best() ? `Rekordod ezzel a beállítással: ${best()} jó válasz.` : 'Ezzel a beállítással még nincs rekordod.'; };
  redraw();
  mount(
    h('div', { class: 'bar' }, h('nav', { class: 'crumbs', 'aria-label': 'Útvonal' }, h('a', { href: BASE }, 'Főoldal'), h('span', { class: 'sep' }, '›'), h('a', { href: BASE + '#jatekok' }, 'Játékok'), h('span', { class: 'sep' }, '›'), h('span', { 'aria-current': 'page' }, page.title)), h('span', { class: 'whochip' }, 'Játszik: ' + profiles[active].name)),
    h('header', { class: 'page-head' }, h('span', { class: 'subj-ico', html: SUBJ_ICON.jatek }), h('div', null, h('h1', null, page.title), h('p', { class: 'mute' }, page.blurb))),
    h('div', { class: 'panel sz-setup' },
      h('h3', null, 'Melyik szorzótáblák?'), tbl,
      h('div', { class: 'chips' }, h('button', { class: 'btn small', onclick: () => { cfg.tables = [2, 5, 10]; save(); redraw(); } }, '2, 5, 10'), h('button', { class: 'btn small', onclick: () => { cfg.tables = [3, 4, 6, 8]; save(); redraw(); } }, '3, 4, 6, 8'), h('button', { class: 'btn small', onclick: () => { cfg.tables = [6, 7, 8, 9]; save(); redraw(); } }, '6, 7, 8, 9'), h('button', { class: 'btn small', onclick: () => { cfg.tables = [2, 3, 4, 5, 6, 7, 8, 9, 10]; save(); redraw(); } }, 'Mind')),
      h('h3', null, 'Mit gyakorolsz?'), seg([['mul', 'Szorzás'], ['div', 'Osztás'], ['mix', 'Vegyes']], 'op'),
      h('h3', null, 'Mennyi idő?'), seg([[60, '1 perc'], [120, '2 perc']], 'secs'),
      bestEl,
      h('div', { class: 'actions', style: 'justify-content:flex-start' }, h('button', { class: 'btn primary', onclick: () => szorzoPlay(page, cfg, key()) }, 'Indulás!'))));
}
function szorzoPlay(page, cfg, key) {
  runCleanups();
  let score = 0, wrong = [], val = '', q = null, left = cfg.secs, over = false, last = '', pause = false;
  const timeEl = h('span', { class: 'sz-time' }), bar = h('i'), scoreEl = h('span', { class: 'sz-score' }), qEl = h('div', { class: 'sz-q' }), disp = h('div', { class: 'numdisp' }), card = h('div', { class: 'qcard sz-card' });
  const next = () => {
    let a, b, g = 0; do { a = pick(cfg.tables); b = ri(1, 10); if (Math.random() < .5) [a, b] = [b, a]; } while (`${a}·${b}` === last && g++ < 10);
    last = `${a}·${b}`;
    const div = cfg.op === 'div' || (cfg.op === 'mix' && Math.random() < .5);
    q = div ? { t: `${a * b} : ${b}`, ans: a, fact: `${a * b} : ${b} = ${a}` } : { t: `${a} · ${b}`, ans: a * b, fact: `${a} · ${b} = ${a * b}` };
    val = ''; pause = false; qEl.innerHTML = `${q.t} = <span class="blank">?</span>`; draw();
  };
  const draw = () => { disp.replaceChildren(document.createTextNode(val), h('span', { class: 'caret' })); scoreEl.textContent = `${score} jó`; };
  const flash = cls => { card.classList.remove('flash-good', 'flash-bad'); void card.offsetWidth; card.classList.add(cls); };
  const check = () => {
    if (over || pause || val === '') return;
    if (Number(val) === q.ans) { score++; beep(true); flash('flash-good'); next(); }
    else { pause = true; beep(false); flash('flash-bad'); wrong.push(q.fact); qEl.innerHTML = `${q.fact}`; val = ''; draw(); const keep = q; setTimeout(() => { if (!over && q === keep) next(); }, 900); }
  };
  const press = k => { if (over || pause) return; if (k === 'del') val = val.slice(0, -1); else if (val.length < 3) val += k; draw(); if (val.length >= String(q.ans).length) check(); };
  const pad = h('div', { class: 'pad' }, ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0', 'ok'].map(k => h('button', { class: 'key' + (k === 'ok' ? ' ok' : ''), 'aria-label': k === 'del' ? 'Törlés' : k === 'ok' ? 'Kész' : null, onclick: () => k === 'ok' ? check() : press(k) }, k === 'del' ? '⌫' : k === 'ok' ? 'Kész' : k)));
  const onKey = e => { if (/^\d$/.test(e.key)) press(e.key); else if (e.key === 'Backspace') press('del'); else if (e.key === 'Enter') check(); };
  document.addEventListener('keydown', onKey);
  const t0 = Date.now();
  const tick = setInterval(() => {
    left = Math.max(0, cfg.secs - (Date.now() - t0) / 1000);
    timeEl.textContent = `${Math.ceil(left)} mp`; bar.style.width = `${left / cfg.secs * 100}%`;
    if (left <= 0) { over = true; clearInterval(tick); document.removeEventListener('keydown', onKey); szorzoEnd(page, cfg, key, score, wrong); }
  }, 100);
  cleanups.push(() => { clearInterval(tick); document.removeEventListener('keydown', onKey); });
  card.append(qEl, disp, pad);
  mount(h('div', { class: 'bar' }, h('button', { class: 'btn small', onclick: () => szorzoSetup(page) }, '← Kilépés'), scoreEl, timeEl), h('div', { class: 'sz-bar' }, bar), card);
  next();
}
function szorzoEnd(page, cfg, key, score, wrong) {
  runCleanups();
  const bk = SZ_KEY() + '.best.' + key, best = store.get(bk, 0), rec = score > best;
  if (rec) store.set(bk, score);
  const uniq = [...new Set(wrong)];
  uniq.forEach(f => { const [lhs, ans] = f.split(' = '); if (typeof rememberMistake === 'function') rememberMistake(page, { id: 'play', name: 'Szorzótábla-bajnok' }, { type: 'input', prompt: `${lhs} = <span class="blank">?</span>`, answer: Number(ans) }); });
  mount(h('div', { class: 'qcard results' },
    h('h2', null, `${score} jó válasz ${cfg.secs === 60 ? '1 perc' : '2 perc'} alatt`),
    h('div', { class: 'pop sz-trophy', html: rec && score > 0 ? '🏆' : '⭐' }),
    h('p', { class: 'mute' }, rec && score > 0 ? (best ? `Új rekord! Az előző ${best} volt.` : 'Ez az első rekordod!') : `A rekordod: ${best}. Próbáld meg újra!`),
    uniq.length ? h('div', { class: 'hint', html: `<b>Ezeket érdemes gyakorolni:</b><br>${uniq.join('<br>')}` }) : h('p', { class: 'mute' }, 'Egyetlen hiba sem volt!'),
    h('div', { class: 'actions' }, h('button', { class: 'btn primary', onclick: () => szorzoPlay(page, cfg, key) }, 'Újra'), h('button', { class: 'btn', onclick: () => szorzoSetup(page) }, 'Beállítások'))));
}

/* ---------- Hibáim gyakorlása ---------- */
PAGES['jatek-hibak'] = {
  id: 'jatek-hibak', title: 'Hibáim gyakorlása', grade: 0, topics: [],
  blurb: 'Azok a feladatok, amelyeket elsőre nem sikerült megoldani. Ha most elsőre jó, lekerül a listáról.',
  render: page => hibakView(page)
};
function hibakView(page) {
  runCleanups();
  const list = getMistakes();
  const byPage = {}; list.forEach(m => { byPage[m.p] = (byPage[m.p] || 0) + 1; });
  let armed = false;
  const clear = h('button', { class: 'btn small', onclick: () => { if (!armed) { armed = true; clear.textContent = 'Biztosan törlöd az egész listát?'; return; } setMistakes([]); hibakView(page); } }, 'Lista törlése');
  mount(
    h('div', { class: 'bar' }, h('nav', { class: 'crumbs', 'aria-label': 'Útvonal' }, h('a', { href: BASE }, 'Főoldal'), h('span', { class: 'sep' }, '›'), h('a', { href: BASE + '#jatekok' }, 'Játékok'), h('span', { class: 'sep' }, '›'), h('span', { 'aria-current': 'page' }, page.title)), h('span', { class: 'whochip' }, 'Gyakorol: ' + profiles[active].name)),
    h('header', { class: 'page-head' }, h('span', { class: 'subj-ico', html: SUBJ_ICON.jatek }), h('div', null, h('h1', null, page.title), h('p', { class: 'mute' }, page.blurb))),
    list.length ? h('div', { class: 'panel' },
      h('h3', null, `${list.length} feladat vár gyakorlásra`),
      h('ul', { class: 'misslist' }, Object.entries(byPage).map(([p, n]) => h('li', null, h('span', null, pageLabel(p)), h('b', null, `${n} db`)))),
      h('div', { class: 'actions', style: 'justify-content:flex-start' }, h('button', { class: 'btn primary', onclick: () => startMistakes(page) }, `Gyakorlás (${Math.min(10, list.length)} feladat)`), clear))
      : h('div', { class: 'panel empty' }, h('div', { class: 'big-emoji' }, '🎉'), h('h3', null, 'Nincs hibás feladat!'), h('p', { class: 'mute' }, 'Ha egy feladat elsőre nem sikerül, ide kerül, és később újra gyakorolhatod.'), h('a', { class: 'btn primary', href: BASE, style: 'text-decoration:none;align-self:flex-start' }, 'Gyakorlás'))
  );
}
function startMistakes(page) {
  const all = getMistakes(), pickd = shuffle(all).slice(0, 10);
  let fixed = 0;
  startList({
    page, title: 'Hibáim', list: pickd.map(m => ({ ...m.q, _page: m.p, _mk: m.k })), back: () => hibakView(page),
    onAnswer: (q, first) => { if (first) { fixed++; setMistakes(getMistakes().filter(m => m.k !== q._mk)); } },
    onFinish: s => {
      const left = getMistakes().length;
      mount(h('div', { class: 'qcard results' },
        h('h2', null, `${fixed} hibát kijavítottál`),
        h('div', { class: 'pop sz-trophy', html: fixed === s.total ? '🏆' : '⭐' }),
        h('p', { class: 'mute' }, left ? `Még ${left} feladat van a listán.` : 'Elfogyott a lista, szép munka!'),
        h('div', { class: 'actions' }, left ? h('button', { class: 'btn primary', onclick: () => startMistakes(page) }, 'Még egy kör') : null, h('button', { class: 'btn', onclick: () => hibakView(page) }, 'Vissza'))));
    }
  });
}

/* ---------- hub section ---------- */
const pageLabel = id => { const p = PAGES[id]; if (!p) return id; return p.grade ? `${SUBJ_NAV[subjOf(id)][0]} · ${p.grade}. osztály` : p.title; };
function hubExtras() {
  const n = getMistakes().length;
  const cards = [
    ['jatek-szorzo', '🏆', 'Szorzótábla-bajnok', 'Egy perc, minél több szorzás. Döntsd meg a rekordodat!'],
    ['jatek-ora', '🕒', 'Óra-mester', 'Egész és fél óráktól a percre pontos időig.'],
    ['jatek-penz', '🪙', 'Pénzszámolás', 'Forint érmék és bankjegyek, visszajáró.'],
    ['jatek-hibak', '🔁', 'Hibáim gyakorlása', n ? `${n} feladat vár újra rád.` : 'Ide kerülnek a nehezebb feladatok.']
  ];
  return [h('section', { class: 'subject subj-jatek', id: 'jatekok' },
    h('div', { class: 'subj-head' }, h('span', { class: 'subj-ico', html: SUBJ_ICON.jatek }), h('div', null, h('h2', null, 'Játékok és gyakorló módok'), h('p', { class: 'mute' }, 'Minden osztálynak: szorzótábla, óra, pénz és a saját hibáid.'))),
    h('div', { class: 'grades modes' }, cards.map(([id, em, t, d]) => h('a', { class: 'grade mode', href: pageUrl(id) }, h('span', { class: 'mode-ico', 'aria-hidden': 'true' }, em), h('span', { class: 'mode-t' }, t), h('span', { class: 'mute' }, d), h('span', { class: 'go' }, 'Indítás →'))))),
    h('a', { class: 'parent-cta', href: BASE + 'szuloknek/' }, h('span', { class: 'pc-ico', 'aria-hidden': 'true' }, '👪'), h('span', null, h('b', null, 'Szülőknek és tanítóknak'), h('span', { class: 'mute' }, 'Haladás gyerekenként, nyomtatható feladatlapok, megosztható feladatsorok, telepítés offline használatra.')), h('span', { class: 'go' }, '→'))];
}
