'use strict';
const BASE = '/kockafuzet/';
const PAGE_IDS = ["matek-1", "matek-2", "matek-3", "matek-4", "magyar-1", "magyar-2", "magyar-3", "magyar-4"];
const HERO_SVG = "<svg viewBox=\"0 0 440 340\" role=\"img\" aria-label=\"Kock\u00e1s f\u00fczetlap egy \u00f6sszead\u00e1ssal, bet\u0171k\u00e1rty\u00e1val \u00e9s arany csillaggal\">\n<defs><pattern id=\"hg\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\"><path d=\"M20 0H0V20\" fill=\"none\" stroke=\"#3563e9\" stroke-opacity=\".17\" stroke-width=\"1\"/></pattern></defs>\n<g transform=\"rotate(-4 220 170)\">\n<rect x=\"66\" y=\"50\" width=\"300\" height=\"250\" rx=\"18\" fill=\"#1d2742\" opacity=\".1\"/>\n<rect x=\"58\" y=\"38\" width=\"300\" height=\"250\" rx=\"18\" fill=\"#ffffff\"/>\n<rect x=\"58\" y=\"38\" width=\"300\" height=\"250\" rx=\"18\" fill=\"url(#hg)\"/>\n<path d=\"M104 38v250\" stroke=\"#ee6a4c\" stroke-opacity=\".6\" stroke-width=\"2\"/>\n<circle cx=\"80\" cy=\"72\" r=\"6\" fill=\"#e9edf6\"/><circle cx=\"80\" cy=\"112\" r=\"6\" fill=\"#e9edf6\"/><circle cx=\"80\" cy=\"152\" r=\"6\" fill=\"#e9edf6\"/><circle cx=\"80\" cy=\"192\" r=\"6\" fill=\"#e9edf6\"/><circle cx=\"80\" cy=\"232\" r=\"6\" fill=\"#e9edf6\"/><circle cx=\"80\" cy=\"272\" r=\"6\" fill=\"#e9edf6\"/>\n<text x=\"124\" y=\"128\" font-family=\"Fredoka,ui-rounded,sans-serif\" font-weight=\"600\" font-size=\"44\" fill=\"#1d2742\">3 + 4 =</text>\n<circle cx=\"304\" cy=\"113\" r=\"31\" fill=\"#e8eefe\"/>\n<text x=\"304\" y=\"129\" text-anchor=\"middle\" font-family=\"Fredoka,ui-rounded,sans-serif\" font-weight=\"600\" font-size=\"44\" fill=\"#3563e9\">7</text>\n<text x=\"124\" y=\"206\" font-family=\"Fredoka,ui-rounded,sans-serif\" font-weight=\"500\" font-size=\"36\" fill=\"#1d2742\">ma \u00b7 m\u00e1 \u00b7 mi</text>\n<path d=\"M124 244h170\" stroke=\"#3563e9\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-dasharray=\"1 11\"/>\n</g>\n<g transform=\"translate(332 196) rotate(9)\">\n<rect y=\"7\" width=\"80\" height=\"80\" rx=\"17\" fill=\"#c9472b\"/>\n<rect width=\"80\" height=\"80\" rx=\"17\" fill=\"#ee6a4c\"/>\n<text x=\"40\" y=\"57\" text-anchor=\"middle\" font-family=\"Fredoka,ui-rounded,sans-serif\" font-weight=\"600\" font-size=\"46\" fill=\"#ffffff\">\u00c1</text>\n</g>\n<polygon points=\"62.0,26.0 72.0,52.2 100.0,53.6 78.2,71.3 85.5,98.4 62.0,83.0 38.5,98.4 45.8,71.3 24.0,53.6 52.0,52.2\" fill=\"#e0a812\" transform=\"translate(0 5)\"/>\n<polygon points=\"62.0,26.0 72.0,52.2 100.0,53.6 78.2,71.3 85.5,98.4 62.0,83.0 38.5,98.4 45.8,71.3 24.0,53.6 52.0,52.2\" fill=\"#ffc93c\"/>\n<g transform=\"translate(150 322) rotate(-5)\">\n<rect width=\"150\" height=\"20\" rx=\"4\" fill=\"#3563e9\"/><rect width=\"150\" height=\"6\" rx=\"3\" fill=\"#5a7fef\"/>\n<rect x=\"-22\" width=\"26\" height=\"22\" rx=\"5\" fill=\"#f2a7b8\"/><rect x=\"-2\" width=\"10\" height=\"22\" fill=\"#c9cfdc\"/>\n<polygon points=\"150,0 178,11 150,22\" fill=\"#f3d9a8\"/><polygon points=\"170,8 178,11 170,14\" fill=\"#1d2742\"/>\n</g>\n</svg>";
const SUBJ_ICON = {"matek": "<svg viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" aria-hidden=\"true\"><path d=\"M9 4v10M4 9h10M18 9h10M19.5 19.5l7 7M26.5 19.5l-7 7M4 21h10M4 26.5h10\"/></svg>", "magyar": "<svg viewBox=\"0 0 32 32\" aria-hidden=\"true\"><text x=\"16\" y=\"24\" text-anchor=\"middle\" font-family=\"Fredoka,ui-rounded,sans-serif\" font-weight=\"600\" font-size=\"21\" fill=\"currentColor\">Aa</text></svg>", "jatek": "<svg viewBox=\"0 0 32 32\" aria-hidden=\"true\"><path d=\"M16 3.5l3.6 7.6 8.2 1-6 5.7 1.5 8.2L16 22l-7.3 4 1.5-8.2-6-5.7 8.2-1z\" fill=\"currentColor\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/></svg>"};
const SUBJ_DESC = {"matek": "Számolás, számok, mértékegységek, geometria és szöveges feladatok.", "magyar": "Betűk, olvasás, helyesírás, nyelvtan és szövegértés."};
/* ===== util ===== */
const $ = (s, r = document) => r.querySelector(s);
const h = (tag, attrs, ...kids) => {
  const e = document.createElement(tag);
  if (attrs) for (const [n, v] of Object.entries(attrs)) {
    if (n === 'class') e.className = v;
    else if (n === 'html') e.innerHTML = v;
    else if (n.startsWith('on')) e.addEventListener(n.slice(2), v);
    else if (v !== false && v != null) e.setAttribute(n, v === true ? '' : v);
  }
  for (const c of kids.flat()) if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c));
  return e;
};
const ri = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace('-', '−');
const fr = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;
const near = (n, k, lo, hi, step = 1) => {
  const s = new Set(); let g = 0;
  while (s.size < k && g++ < 300) { const v = n + ri(1, 3) * step * (Math.random() < .5 ? -1 : 1); if (v !== n && v >= lo && v <= hi) s.add(v); }
  return [...s];
};
function mcq(prompt, correct, wrongs, o = {}) {
  const vals = [correct];
  for (const w of wrongs) if (!vals.some(v => String(v) === String(w))) vals.push(w);
  const f = o.fmt || (v => (typeof v === 'number' ? fmt(v) : String(v)));
  return { type: 'choice', prompt, answer: correct, options: shuffle(vals).map(v => ({ value: v, html: f(v) })), ...o };
}
const svg = (w, hh, inner, cls = '') => `<svg class="vis ${cls}" viewBox="0 0 ${w} ${hh}" width="${w}" height="${hh}" aria-hidden="true">${inner}</svg>`;

/* ===== storage ===== */
const mem = {};
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); if (v != null) return JSON.parse(v); } catch (e) {} return k in mem ? mem[k] : d; },
  set(k, v) { mem[k] = v; try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
let profiles = store.get('tt.profiles', null) || [{ name: 'Tanuló' }];
let active = store.get('tt.active', 0); if (!profiles[active]) active = 0;
const pk = (page, topic, f) => `tt.${active}.${page}.${topic}.${f}`;

/* ===== sound & speech ===== */
let muted = store.get('tt.mute', false), ac = null;
function beep(ok) {
  if (muted) return;
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const t = ac.currentTime;
    (ok ? [[660, 0], [880, .12]] : [[240, 0]]).forEach(([f, d]) => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(.0001, t + d); g.gain.exponentialRampToValueAtTime(.14, t + d + .02); g.gain.exponentialRampToValueAtTime(.0001, t + d + .24);
      o.connect(g); g.connect(ac.destination); o.start(t + d); o.stop(t + d + .26);
    });
  } catch (e) {}
}
let huVoice = null;
function loadVoices() { try { huVoice = speechSynthesis.getVoices().find(v => /^hu/i.test(v.lang)) || null; } catch (e) {} }
if ('speechSynthesis' in window) {
  loadVoices();
  speechSynthesis.onvoiceschanged = () => { const had = !!huVoice; loadVoices(); if (!had && huVoice && !S && typeof route === 'function' && !document.activeElement?.matches?.('input')) route(); };
}
const canSpeak = () => !!huVoice;
function speak(t) {
  if (!huVoice) return;
  try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.voice = huVoice; u.lang = huVoice.lang; u.rate = .8; speechSynthesis.speak(u); } catch (e) {}
}
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;


/* ===== read-aloud: turn a question into speakable text ===== */
function plainSpeech(html, mathy) {
  let s = html || '';
  s = s.replace(/<span class="frac"><span>([^<]*)<\/span><span>([^<]*)<\/span><\/span>/g, ' $1 per $2 ');
  s = s.replace(/<span class="blank">([^<]*)<\/span>/g, (m, c) => mathy ? ' kérdőjel ' : (c === '…' || c === '?' ? ' hiányzó betű ' : ' ' + c + ' '));
  s = s.replace(/<div class="col"><div>/g, ' ').replace(/<\/div><div class="u">/g, ' ').replace(/<\/div><\/div>/g, ' ');
  s = s.replace(/<br\s*\/?>/g, '. ').replace(/<\/div>/g, '. ').replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ');
  s = s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  s = s.replace(/(\d)\u00a0(?=\d)/g, '$1');
  if (mathy) {
    s = s.replace(/(\d{1,2}):(\d{2})/g, (m, hh, mm) => mm === '00' ? hh + ' óra' : hh + ' óra ' + mm + ' perc').replace(/(\d)\s*Ft-os/g, '$1 forintos')
      .replace(/\u2212/g, ' mínusz ').replace(/\+/g, ' plusz ').replace(/·/g, ' szorozva ').replace(/\s:\s/g, ' osztva ')
      .replace(/=/g, ' egyenlő ').replace(/</g, ' kisebb ').replace(/>/g, ' nagyobb ')
      .replace(/°C/g, ' fok ').replace(/cm²/g, ' négyzetcentiméter ')
      .replace(/\bkm\b/g, ' kilométer ').replace(/\bdkg\b/g, ' dekagramm ').replace(/\bkg\b/g, ' kilogramm ').replace(/\bcm\b/g, ' centiméter ').replace(/\bdm\b/g, ' deciméter ')
      .replace(/\bmm\b/g, ' milliméter ').replace(/\bdl\b/g, ' deciliter ').replace(/\bml\b/g, ' milliliter ').replace(/\bFt\b/g, ' forint ')
      .replace(/(\d)\s*m\b/g, '$1 méter ').replace(/(\d)\s*l\b/g, '$1 liter ').replace(/(\d)\s*g\b/g, '$1 gramm ');
  }
  s = s.replace(/\s+/g, ' ').replace(/\s+([.,?!])/g, '$1').trim();
  if (mathy) { const m = s.match(/^(.*?)\s*egyenlő kérdőjel\.?$/); if (m && m[1] && !/[a-zá-ű]{4,}/i.test(m[1].replace(/plusz|mínusz|szorozva|osztva/g, ''))) s = `Mennyi ${m[1]}?`; }
  return s;
}
function spokenText(q, page) {
  const mathy = /^matek/.test(page.id);
  let t = q.speak || plainSpeech(q.prompt, mathy);
  if (q.visual && /passage|class="col"/.test(q.visual)) t = t.replace(/[.\s]+$/, '') + '. ' + plainSpeech(q.visual, mathy);
  if (q.type === 'choice' && page.speakOpts !== false) {
    const o = q.options.map(x => plainSpeech(x.html, mathy)).filter(x => x);
    if (o.length === q.options.length && o.length) t = t.replace(/[.\s]+$/, '') + '. A válaszok: ' + o.join(', ') + '.';
  }
  return t;
}
const autoRead = () => store.get('tt.autoread', false);

/* ===== router & shell ===== */
const PAGES = {};
const VIEWS = {};   // utility pages (parents' page, shared set, print) registered by features.js
const SUBJ_NAV = { matek: ['Matematika', '#matek'], magyar: ['Magyar nyelv és olvasás', '#magyar'], jatek: ['Játékok', '#jatekok'] };
const subjOf = id => id.split('-')[0];
const PLAN = [
  { s: 'matek', name: 'Matematika' },
  { s: 'magyar', name: 'Magyar nyelv és olvasás' }
];
let S = null;            // active practice session
let cleanups = [];
const app = () => $('#app');
function mount(...nodes) {
  const w = h('div', { class: 'wrap' }, nodes);
  app().replaceChildren(w);
  return w;
}
function runCleanups() { cleanups.forEach(f => { try { f(); } catch (e) {} }); cleanups = []; }
function route() {
  const id = document.body.dataset.page || '';
  S = null;
  try { speechSynthesis.cancel(); } catch (e) {}
  if (VIEWS[id]) VIEWS[id](); else if (PAGES[id]) (PAGES[id].render || showTopics)(PAGES[id]); else showHub();
  window.scrollTo(0, 0);
  const tgt = !id && location.hash.length > 1 && document.getElementById(location.hash.slice(1)); if (tgt) tgt.scrollIntoView();
}
// BASE is injected by the build
const pageUrl = id => BASE + id.replace('-', '/') + '/';
{ const old = location.hash.slice(1); if (!document.body.dataset.page && PAGE_IDS.includes(old)) location.replace(pageUrl(old)); }

const starsHtml = n => `<span class="stars" aria-label="${n} csillag a háromból">${[1, 2, 3].map(i => `<span class="${i <= n ? 'on' : 'off'}">★</span>`).join('')}</span>`;
const pageStars = p => p.topics.reduce((a, t) => a + store.get(pk(p.id, t.id, 'stars'), 0), 0);

function profileBar(rerender) {
  const box = h('div', { class: 'panel' });
  const row = h('div', { class: 'chips' });
  profiles.forEach((p, i) => row.append(h('button', {
    class: 'chip', 'aria-pressed': i === active ? 'true' : 'false',
    onclick: () => { active = i; store.set('tt.active', i); rerender(); }
  }, p.name)));
  const inp = h('input', { id: 'newname', type: 'text', maxlength: 14, placeholder: 'Új gyerek neve', 'aria-label': 'Új gyerek neve' });
  const add = () => {
    const n = inp.value.trim(); if (!n) return;
    profiles.push({ name: n }); active = profiles.length - 1;
    store.set('tt.profiles', profiles); store.set('tt.active', active); rerender();
  };
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') add(); });
  const tools = h('div', { class: 'field' }, inp, h('button', { class: 'btn small', onclick: add }, 'Hozzáad'));
  if (profiles.length > 1) {
    let armed = false;
    const del = h('button', { class: 'btn small', onclick: () => {
      if (!armed) { armed = true; del.textContent = 'Biztos? Töröld ' + profiles[active].name + ' adatait'; return; }
      const gone = active; profiles.splice(gone, 1);
      try {
      // move stored progress down one index
      const keys = []; try { for (let i = 0; i < localStorage.length; i++) keys.push(localStorage.key(i)); } catch (e) {}
      const moved = {};
      keys.filter(k => /^tt\.\d+\./.test(k)).forEach(k => {
        const m = k.match(/^tt\.(\d+)\.(.*)$/); const idx = +m[1];
        if (idx === gone) localStorage.removeItem(k);
        else if (idx > gone) { moved[`tt.${idx - 1}.${m[2]}`] = localStorage.getItem(k); localStorage.removeItem(k); }
      });
      Object.entries(moved).forEach(([k, v]) => localStorage.setItem(k, v));
      } catch (e) {}
      active = 0; store.set('tt.profiles', profiles); store.set('tt.active', 0); rerender();
    } }, 'Gyerek törlése');
    tools.append(del);
  }
  box.append(h('div', { class: 'who' }, h('h3', null, 'Ki gyakorol most?'), h('span', { class: 'mute' }, 'A csillagok gyerekenként, ezen az eszközön gyűlnek.')), row, tools);
  return box;
}

function showHub() {
  runCleanups();
  const rerender = () => showHub();
  const blocks = PLAN.map(sub => {
    const grid = h('div', { class: 'grades' });
    [1, 2, 3, 4].forEach(g => {
      const id = `${sub.s}-${g}`, pg = PAGES[id];
      if (pg) {
        const got = pageStars(pg), max = pg.topics.length * 3;
        grid.append(h('a', { class: 'grade', href: pageUrl(id) },
          h('span', { class: 'no', html: `${g}<small>. osztály</small>` }),
          h('span', { class: 'meter', 'aria-hidden': 'true' }, h('i', { style: `width:${Math.round(got / max * 100)}%` })),
          h('span', { class: 'mute' }, `${got} / ${max} csillag`),
          h('span', { class: 'go' }, 'Gyakorlás →')));
      } else {
        grid.append(h('div', { class: 'grade off' }, h('span', { class: 'no', html: `${g}<small>. osztály</small>` }), h('span', null, 'Hamarosan')));
      }
    });
    return h('section', { class: 'subject subj-' + sub.s, id: sub.s },
      h('div', { class: 'subj-head' }, h('span', { class: 'subj-ico', html: SUBJ_ICON[sub.s] }),
        h('div', null, h('h2', null, sub.name), h('p', { class: 'mute' }, SUBJ_DESC[sub.s]))), grid);
  });
  mount(
    h('section', { class: 'hero' },
      h('div', null,
        h('h1', null, 'Gyakorolj játékosan, a saját tempódban!'),
        h('p', { class: 'lead' }, 'Interaktív matek- és magyarfeladatok 1–4. osztályosoknak, a NAT témái szerint. Egy kör 10 feladat, a csillagok megmutatják, hol tartasz.'),
        h('ul', { class: 'perks' }, h('li', null, 'Ingyenes'), h('li', null, 'Reklám és regisztráció nélkül'), h('li', null, 'Telefonon és tableten is')),
        h('div', { class: 'hero-cta' },
          h('a', { class: 'btn primary', href: '#matek' }, 'Matematika'),
          h('a', { class: 'btn primary magyar', href: '#magyar' }, 'Magyar nyelv'))),
      h('div', { class: 'hero-art', html: HERO_SVG })),
    profileBar(rerender),
    ...(typeof hubTop === 'function' ? hubTop() : []),
    ...blocks,
    ...(typeof hubExtras === 'function' ? hubExtras() : []),
    h('div', { class: 'prefs' },
      h('button', { class: 'linkbtn', onclick: () => { muted = !muted; store.set('tt.mute', muted); showHub(); } }, muted ? 'Hang be' : 'Hang ki'),
      h('span', { class: 'foot' }, 'A csillagok az eszköz böngészőjében tárolódnak. ' + (canSpeak() ? 'Felolvasás: elérhető, minden feladatnál van „Felolvasom” gomb.' : 'Felolvasás: ezen az eszközön nincs magyar hang, ezért a „Felolvasom” gomb nem jelenik meg.')))
  );
}

function showTopics(page) {
  runCleanups();
  const who = profiles[active].name;
  const tiles = h('div', { class: 'tiles' });
  page.topics.forEach(t => {
    const lock = t.unavailable ? t.unavailable() : null;
    tiles.append(h('button', { class: 'tile', disabled: !!lock, onclick: () => startTopic(page, t) },
      h('span', { class: 'glyph', html: t.sample }),
      h('span', { class: 'nm' }, t.name),
      h('span', { class: 'ds' }, lock || t.desc),
      h('span', { html: starsHtml(store.get(pk(page.id, t.id, 'stars'), 0)) })));
  });
  const nodes = [
    h('div', { class: 'bar' },
      h('nav', { class: 'crumbs', 'aria-label': 'Útvonal' },
        h('a', { href: BASE }, 'Főoldal'), h('span', { class: 'sep' }, '›'),
        h('a', { href: BASE + SUBJ_NAV[subjOf(page.id)][1] }, SUBJ_NAV[subjOf(page.id)][0]), h('span', { class: 'sep' }, '›'),
        h('span', { 'aria-current': 'page' }, page.grade ? `${page.grade}. osztály` : page.title)),
      h('span', { class: 'whochip' }, 'Gyakorol: ' + who)),
    h('header', { class: 'page-head' },
      h('span', { class: 'subj-ico', html: SUBJ_ICON[subjOf(page.id)] }),
      h('div', null, h('h1', null, page.grade ? `${page.title} · ${page.grade}. osztály` : page.title), h('p', { class: 'mute' }, page.blurb))),
  ];
  if (page.settings) nodes.push(page.settings(() => showTopics(page)));
  nodes.push(tiles);
  mount(...nodes);
}

/* ===== practice session ===== */
function startTopic(page, topic) {
  S = { page, topic, n: 0, total: topic.total || 10, correct: 0, level: store.get(pk(page.id, topic.id, 'lvl'), 1), streak: 0, wrongRun: 0, res: [], q: null, tries: 0, last: '' };
  nextQ();
}
function startList(opts) {   // opts: { page, list, title, back, onFinish, onAnswer }
  S = { ...opts, topic: { id: 'list', name: opts.title }, n: 0, total: opts.list.length, correct: 0, level: opts.level || 1, fixed: true, streak: 0, wrongRun: 0, res: [], q: null, tries: 0, last: '' };
  nextQ();
}
function nextQ() {
  if (S.n >= S.total) return finish();
  let q, g = 0;
  if (S.list) { S.q = S.list[S.n]; S.tries = 0; S.n++; return renderQ(); }
  do { q = S.topic.gen(S.level); } while (q.key === undefined && (q.prompt + '|' + q.answer) === S.last && g++ < 6);
  S.last = q.prompt + '|' + q.answer;
  S.q = q; S.tries = 0; S.n++;
  renderQ();
}
const PRAISE = ['Ügyes!', 'Szuper!', 'Így van!', 'Remek!', 'Pontos!', 'Nagyszerű!'];

function renderQ() {
  runCleanups();
  const q = S.q, page = (q._page && PAGES[q._page]) || S.page;
  const dots = h('div', { class: 'dots', 'aria-label': `${S.n}. kérdés, összesen ${S.total}` });
  for (let i = 0; i < S.total; i++) dots.append(h('i', { class: S.res[i] || (i === S.n - 1 ? 'now' : '') }));
  const fb = h('div', { 'aria-live': 'polite', style: 'width:100%;display:flex;flex-direction:column;align-items:center;gap:12px' });
  const actions = h('div', { class: 'actions' });
  const card = h('div', { class: 'qcard' });
  try { speechSynthesis.cancel(); } catch (e) {}
  const spoken = canSpeak() ? spokenText(q, page) : '';
  if (canSpeak()) {
    const ar = h('button', { class: 'chip', 'aria-pressed': String(autoRead()), onclick: () => { const v = !autoRead(); store.set('tt.autoread', v); ar.setAttribute('aria-pressed', String(v)); if (v) speak(spoken); } }, 'Mindig felolvas');
    card.append(h('div', { class: 'chips', style: 'justify-content:center' },
      h('button', { class: 'btn small', onclick: () => speak(spoken) }, '🔊 Felolvasom'), ar));
  }
  card.append(h('div', { class: 'prompt', html: q.prompt }));
  if (q.visual) card.append(h('div', { class: 'visual', html: q.visual }));
  if (q.say && canSpeak()) card.append(h('button', { class: 'btn small', onclick: () => speak(q.say) }, '🔊 Meghallgatom'));

  const ui = UI[q.type](q, resp => submit(resp));
  card.append(ui.el);
  S.ui = ui; S.fb = fb; S.actions = actions;

  const exSrc = typeof exSource === 'function' ? exSource(q) : null;
  const exBtn = exSrc && exSrc.gen ? h('button', { class: 'linkbtn', onclick: () => { const e = similarEx(q, exSrc.gen, S.level, exSrc.pid, exSrc.tid); if (e) openExplain(e, 'Egy hasonló példán'); } }, '💡 Így működik') : null;
  if (q.hint || exBtn) {
    const hintBox = q.hint ? h('div', { class: 'hint', hidden: true, html: q.hint }) : null;
    const hb = q.hint ? h('button', { class: 'linkbtn', onclick: () => { hintBox.hidden = !hintBox.hidden; } }, 'Segítség') : null;
    card.append(h('div', { class: 'helprow' }, hb, exBtn), hintBox);
  }
  card.append(fb, actions);
  if (ui.submitBtn) actions.append(ui.submitBtn);

  mount(
    h('div', { class: 'bar' },
      h('button', { class: 'btn small', onclick: () => S.back ? S.back() : showTopics(page) }, S.back ? '← Vissza' : '← Témák'),
      dots,
      h('span', { class: 'lvl' }, S.list ? S.title : `Szint ${S.level}/3`)),
    card);
  if (q.autoSpeak && q.say) speak(q.say);
  else if (spoken && autoRead()) setTimeout(() => { if (S && S.q === q) speak(spoken); }, 250);
  ui.focus && ui.focus();
}

function judge(q, resp) {
  switch (q.type) {
    case 'choice': return resp === q.answer;
    case 'input': return String(resp).trim() !== '' && Number(resp) === Number(q.answer);
    case 'find': { const a = [...resp].sort().join(','), b = [...q.targets].sort().join(','); return a === b; }
    case 'build': return resp.join('|') === q.answer.join('|');
    case 'read': return resp === true;
  }
}
function submit(resp) {
  if (!S || S.done) return;
  const q = S.q, ok = judge(q, resp);
  S.tries++;
  S.fb.replaceChildren(); S.actions.querySelectorAll('.next').forEach(n => n.remove());
  if (ok) {
    beep(true);
    if (S.tries === 1) S.correct++;
    S.res[S.n - 1] = S.tries === 1 ? 'ok' : 'no';
    afterAnswer(q, S.tries === 1);
    S.ui.lock && S.ui.lock(resp, true);
    let extra = '';
    if (S.tries === 1) {
      S.streak++; S.wrongRun = 0;
      if (!S.fixed && S.streak >= 3 && S.level < 3) { S.level++; S.streak = 0; extra = 'Szint fel! Egyre nehezebb jön.'; }
    }
    S.fb.append(h('div', { class: 'fb good pop', html: `${pick(PRAISE)}${q.explain ? `<small>${q.explain}</small>` : ''}${extra ? `<small>${extra}</small>` : ''}` }));
    endQ();
  } else if (S.tries < 2 && q.type !== 'read') {
    beep(false);
    S.ui.wrong && S.ui.wrong(resp);
    S.fb.append(h('div', { class: 'fb bad', html: 'Nem egészen. Próbáld meg még egyszer!' }));
  } else {
    beep(false);
    S.res[S.n - 1] = 'no';
    afterAnswer(q, false);
    S.streak = 0; S.wrongRun++;
    let extra = '';
    if (!S.fixed && S.wrongRun >= 2 && S.level > 1) { S.level--; S.wrongRun = 0; extra = 'Menjünk egy kicsit könnyebben.'; }
    S.ui.lock && S.ui.lock(resp, false);
    const ans = q.answerText || (q.type === 'read' ? q.text : q.type === 'choice' ? (q.options.find(o => o.value === q.answer) || {}).html : q.type === 'build' ? q.answer.join('') : String(q.answer));
    S.fb.append(h('div', { class: 'fb bad', html: `A helyes válasz: <b>${ans}</b>${q.explain ? `<small>${q.explain}</small>` : ''}${extra ? `<small>${extra}</small>` : ''}` }));
    const exS = typeof exSource === 'function' ? exSource(q) : null;
    if (exS) S.fb.append(h('button', { class: 'btn small exbtn', onclick: () => openExplain(exS.ex, 'A te feladatod') }, '💡 Mutasd lépésről lépésre'));
    endQ();
  }
}
function endQ() {
  S.ui.done && S.ui.done();
  const last = S.n >= S.total;
  const b = h('button', { class: 'btn primary next', onclick: () => nextQ() }, last ? 'Eredmény' : 'Tovább');
  S.actions.replaceChildren(b);
  b.focus();
  const onKey = e => { if (e.key === 'Enter') { e.preventDefault(); b.click(); } };
  setTimeout(() => document.addEventListener('keydown', onKey), 50);
  cleanups.push(() => document.removeEventListener('keydown', onKey));
}
function afterAnswer(q, firstTry) {
  if (S.onAnswer) S.onAnswer(q, firstTry);
  else if (!firstTry && typeof rememberMistake === 'function') rememberMistake(S.page, S.topic, q);
}
function finish() {
  runCleanups();
  if (S.onFinish) return S.onFinish(S);
  const { page, topic, correct, total } = S;
  const st = correct >= 9 ? 3 : correct >= 7 ? 2 : correct >= 5 ? 1 : 0;
  const best = store.get(pk(page.id, topic.id, 'stars'), 0);
  if (st > best) store.set(pk(page.id, topic.id, 'stars'), st);
  store.set(pk(page.id, topic.id, 'lvl'), S.level);
  store.set(pk(page.id, topic.id, 'last'), correct);
  store.set(pk(page.id, topic.id, 'plays'), store.get(pk(page.id, topic.id, 'plays'), 0) + 1);
  store.set(pk(page.id, topic.id, 'date'), Date.now());
  if (typeof reviewAfterRound === 'function') reviewAfterRound(page, topic, correct);
  const msg = st === 3 ? 'Hibátlan közelében! Nagyszerű munka.' : st === 2 ? 'Nagyon jó! Még egy kör, és meglesz a három csillag.' : st === 1 ? 'Jó kezdés. Gyakoroljunk még egy kört!' : 'Semmi baj, a gyakorlás segít. Próbáld újra!';
  mount(h('div', { class: 'qcard results' },
    h('h2', null, `${correct} / ${total} jó válasz`),
    h('div', { class: 'pop', html: starsHtml(st) }),
    h('p', { class: 'mute' }, msg + (st < best ? ` (Eddigi legjobb: ${best} csillag.)` : '')),
    h('div', { class: 'actions' },
      h('button', { class: 'btn primary', onclick: () => startTopic(page, topic) }, 'Újra'),
      h('button', { class: 'btn', onclick: () => showTopics(page) }, 'Másik téma'))));
}

/* ===== answer UIs ===== */
const UI = {
  choice(q, send) {
    const el = h('div', { class: 'opts' });
    const btns = q.options.map(o => {
      const b = h('button', { class: 'opt', html: o.html, onclick: () => send(o.value) });
      b._v = o.value; return b;
    });
    el.append(...btns);
    return {
      el,
      wrong(v) { const b = btns.find(x => x._v === v); if (b) { b.classList.add('wrong'); b.disabled = true; } },
      lock(v, ok) { btns.forEach(b => { b.disabled = true; if (b._v === q.answer) b.classList.add('right'); else if (b._v === v) b.classList.add('wrong'); }); }
    };
  },
  input(q, send) {
    let val = '';
    const disp = h('div', { class: 'numdisp', 'aria-live': 'polite' });
    const draw = () => { disp.replaceChildren(document.createTextNode(val === '' ? '' : val.replace('-', '−')), h('span', { class: 'caret' })); };
    const press = k => {
      if (k === 'del') val = val.slice(0, -1);
      else if (k === '-') { if (q.neg && val === '') val = '-'; }
      else if (val.replace('-', '').length < 7) val = (val === '0' ? '' : val) + k;
      draw();
    };
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', q.neg ? '-' : 'del', '0', q.neg ? 'del' : 'ok'];
    const pad = h('div', { class: 'pad' });
    keys.forEach(k => pad.append(h('button', {
      class: 'key' + (k === 'ok' ? ' ok' : ''), 'aria-label': k === 'del' ? 'Törlés' : k === 'ok' ? 'Kész' : null,
      onclick: () => { if (k === 'ok') go(); else press(k); }
    }, k === 'del' ? '⌫' : k === 'ok' ? 'Kész' : k === '-' ? '−' : k)));
    const go = () => { if (val !== '' && val !== '-') send(val); };
    const submitBtn = q.neg ? h('button', { class: 'btn primary', onclick: go }, 'Kész') : null;
    const onKey = e => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (/^\d$/.test(e.key)) press(e.key);
      else if (e.key === 'Backspace') press('del');
      else if (e.key === '-' ) press('-');
      else if (e.key === 'Enter' && !S.locked) { if (document.activeElement && document.activeElement.classList.contains('next')) return; go(); }
    };
    document.addEventListener('keydown', onKey);
    cleanups.push(() => document.removeEventListener('keydown', onKey));
    draw();
    const wrap = h('div', { style: 'display:flex;flex-direction:column;align-items:center;gap:14px;width:100%' }, disp, pad);
    return {
      el: wrap, submitBtn,
      wrong() { val = ''; draw(); },
      lock() { pad.querySelectorAll('button').forEach(b => b.disabled = true); if (submitBtn) submitBtn.disabled = true; document.removeEventListener('keydown', onKey); },
      done() { if (submitBtn) submitBtn.remove(); }
    };
  },
  find(q, send) {
    const sel = new Set();
    const grid = h('div', { class: 'grid-find' });
    const cells = q.cells.map((c, i) => {
      const b = h('button', { class: 'cell', 'aria-pressed': 'false', onclick: () => {
        if (sel.has(i)) { sel.delete(i); b.classList.remove('on'); } else { sel.add(i); b.classList.add('on'); }
        b.setAttribute('aria-pressed', sel.has(i)); sb.disabled = sel.size === 0;
      } }, c);
      return b;
    });
    grid.append(...cells);
    const sb = h('button', { class: 'btn primary', disabled: true, onclick: () => send(sel) }, 'Kész');
    return {
      el: grid, submitBtn: sb,
      wrong() { sel.clear(); cells.forEach(c => c.classList.remove('on')); sb.disabled = true; },
      lock() { cells.forEach((c, i) => { c.disabled = true; c.classList.remove('on'); const t = q.targets.includes(i); if (t && sel.has(i)) c.classList.add('right'); else if (t || sel.has(i)) c.classList.add('miss'); }); },
      done() { sb.remove(); }
    };
  },
  build(q, send) {
    const n = q.answer.length, slots = Array(n).fill(null);
    const slotEls = Array.from({ length: n }, (_, i) => h('button', { class: 'slot', 'aria-label': `${i + 1}. betű helye`, onclick: () => { if (slots[i] != null) { slots[i] = null; draw(); } } }));
    const bank = q.tiles.map((t, i) => h('button', { class: 'opt', onclick: () => { const j = slots.indexOf(null); if (j >= 0 && !slots.includes(i)) { slots[j] = i; draw(); } } }, t));
    const sb = h('button', { class: 'btn primary', disabled: true, onclick: () => send(slots.map(i => q.tiles[i])) }, 'Kész');
    const draw = () => {
      slotEls.forEach((s, i) => { s.textContent = slots[i] == null ? '' : q.tiles[slots[i]]; s.classList.toggle('fill', slots[i] != null); });
      bank.forEach((b, i) => { const u = slots.includes(i); b.classList.toggle('used', u); b.disabled = u; });
      sb.disabled = slots.includes(null);
    };
    draw();
    return {
      el: h('div', { style: 'display:flex;flex-direction:column;gap:16px;align-items:center;width:100%' }, h('div', { class: 'slots' }, slotEls), h('div', { class: 'tilebank' }, bank)),
      submitBtn: sb,
      wrong() { slots.fill(null); draw(); },
      lock() { slotEls.forEach(s => s.disabled = true); bank.forEach(b => b.disabled = true); },
      done() { sb.remove(); }
    };
  },
  read(q, send) {
    const heard = h('div', { class: 'heard', 'aria-live': 'polite' });
    const note = h('div', { class: 'hint', hidden: true });
    const mic = h('button', { class: 'btn primary micbtn', onclick: () => listen() }, SR ? '🎤 Mondd ki!' : '🎤 Olvasd el hangosan');
    let rec = null, tries = 0;
    const parentOk = h('button', { class: 'btn small', onclick: () => send(true) }, '✔ Jól olvasta');
    const parentNo = h('button', { class: 'btn small', onclick: () => { stop(); send(false); } }, 'Még gyakorolja');
    const stop = () => { try { rec && rec.abort(); } catch (e) {} mic.classList.remove('live'); };
    function listen() {
      if (!SR) { showNote(); return; }
      stop();
      try {
        rec = new SR(); rec.lang = 'hu-HU'; rec.maxAlternatives = 6; rec.interimResults = false; rec.continuous = false;
      } catch (e) { showNote(); return; }
      let got = false;
      rec.onresult = ev => {
        got = true;
        const alts = [...ev.results[0]].map(a => a.transcript);
        heard.textContent = 'Ezt hallottam: „' + alts[0] + '”';
        if (matchesSpoken(q.text, alts)) send(true);
        else { tries++; heard.textContent += tries >= 2 ? ' – ha jól olvasta, nyomd meg a „Jól olvasta” gombot.' : ' – Próbáld újra, lassabban és tisztán!'; }
      };
      rec.onerror = ev => {
        mic.classList.remove('live');
        if (ev.error === 'not-allowed' || ev.error === 'service-not-allowed' || ev.error === 'audio-capture') showNote();
        else if (ev.error === 'no-speech') heard.textContent = 'Nem hallottam semmit. Nyomd meg újra a gombot, és szólj hangosabban.';
        else if (ev.error !== 'aborted') heard.textContent = 'Nem sikerült a felismerés (' + ev.error + '). A szülő is eldöntheti, jól olvasta-e.';
      };
      rec.onend = () => { mic.classList.remove('live'); if (!got && !note.hidden) return; };
      heard.textContent = 'Hallgatlak…'; mic.classList.add('live');
      try { rec.start(); } catch (e) { mic.classList.remove('live'); showNote(); }
    }
    function showNote() {
      note.hidden = false; heard.textContent = '';
      note.textContent = window.STANDALONE
        ? 'A böngésző nem engedte a mikrofont. Engedélyezd a címsor melletti mikrofon-ikonnál (Chrome vagy Edge kell hozzá). Addig a szülő jelöli, jól olvasta-e.'
        : 'Ebben a nézetben nincs mikrofon. A hangfelismeréshez töltsd le az oldalt fájlként, és nyisd meg Chrome-ban. Addig a szülő jelöli, jól olvasta-e.';
    }
    const el = h('div', { style: 'display:flex;flex-direction:column;align-items:center;gap:14px;width:100%' },
      h('div', { class: 'bigtext' }, q.text),
      mic, heard, note,
      h('div', { class: 'actions' }, parentOk, parentNo));
    return { el, lock() { stop(); el.querySelectorAll('button').forEach(b => b.disabled = true); }, done() { }, };
  }
};

/* loose matching of what the recogniser heard against the expected text */
const stripAcc = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ő/g, 'o').replace(/ű/g, 'u');
const normTxt = s => s.toLowerCase().normalize('NFC').replace(/[^a-záéíóöőúüű]/g, '');
function lev(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
function matchesSpoken(target, alts) {
  const t = normTxt(target);
  return alts.some(raw => {
    const a = normTxt(raw);
    if (!a) return false;
    if (a === t) return true;
    if (t.length >= 2 && a.includes(t)) return true;
    if (t.length <= 3) return stripAcc(a) === stripAcc(t);
    return lev(a, t) <= (t.length >= 7 ? 2 : 1);
  });
}

/* ===== Matematika: visuals ===== */
const DICE = { 1: [[1, 1]], 2: [[0, 0], [2, 2]], 3: [[0, 0], [1, 1], [2, 2]], 4: [[0, 0], [2, 0], [0, 2], [2, 2]], 5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]], 6: [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]] };
function diceSvg(n) {
  const c = DICE[n].map(([x, y]) => `<circle cx="${30 + x * 30}" cy="${30 + y * 30}" r="10" class="f-blue"/>`).join('');
  return svg(120, 120, `<rect x="4" y="4" width="112" height="112" rx="18" class="f-card s-ink" stroke-width="4"/>${c}`, 'dice');
}
function frames(parts) {           // ten-frames; parts = [[count, cssClass], ...]
  const cells = []; parts.forEach(([n, cls]) => { for (let i = 0; i < n; i++) cells.push(cls); });
  const nf = Math.max(1, Math.ceil(cells.length / 10)); let out = '';
  for (let f = 0; f < nf; f++) {
    const ox = f * 156 + 4;
    out += `<rect x="${ox}" y="4" width="140" height="56" class="f-none s-ink" stroke-width="3"/>`;
    for (let i = 1; i < 5; i++) out += `<line x1="${ox + i * 28}" y1="4" x2="${ox + i * 28}" y2="60" class="s-line" stroke-width="2"/>`;
    out += `<line x1="${ox}" y1="32" x2="${ox + 140}" y2="32" class="s-line" stroke-width="2"/>`;
    for (let i = 0; i < 10; i++) { const cls = cells[f * 10 + i]; if (cls) out += `<circle cx="${ox + (i % 5) * 28 + 14}" cy="${i < 5 ? 18 : 46}" r="10" class="${cls}"/>`; }
  }
  return svg(nf * 156, 64, out, 'frames');
}
function clockSvg(hh, mm, size = 170) {
  let s = `<circle cx="70" cy="70" r="66" class="f-card s-ink" stroke-width="4"/>`;
  for (let i = 0; i < 60; i++) { const a = i * 6 * Math.PI / 180, r1 = i % 5 ? 60 : 56; s += `<line x1="${70 + r1 * Math.sin(a)}" y1="${70 - r1 * Math.cos(a)}" x2="${70 + 63 * Math.sin(a)}" y2="${70 - 63 * Math.cos(a)}" class="s-ink" stroke-width="${i % 5 ? 1 : 2.5}"/>`; }
  for (let i = 1; i <= 12; i++) { const a = i * 30 * Math.PI / 180; s += `<text x="${70 + 45 * Math.sin(a)}" y="${70 - 45 * Math.cos(a) + 5}" text-anchor="middle" font-size="15" class="f-ink">${i}</text>`; }
  const ha = ((hh % 12) * 30 + mm * .5) * Math.PI / 180, ma = mm * 6 * Math.PI / 180;
  s += `<line x1="70" y1="70" x2="${70 + 30 * Math.sin(ha)}" y2="${70 - 30 * Math.cos(ha)}" class="s-ink" stroke-width="6" stroke-linecap="round"/>`;
  s += `<line x1="70" y1="70" x2="${70 + 50 * Math.sin(ma)}" y2="${70 - 50 * Math.cos(ma)}" class="s-blue" stroke-width="3.5" stroke-linecap="round"/>`;
  s += `<circle cx="70" cy="70" r="4" class="f-ink"/>`;
  return svg(140, 140, s).replace('<svg ', `<svg style="width:${size}px" `);
}
function polySvg(n, rot = 0, sx = 1, sy = 1) {
  const pts = []; for (let i = 0; i < n; i++) { const a = rot + i * 2 * Math.PI / n - Math.PI / 2; pts.push(`${(60 + 50 * Math.cos(a) * sx).toFixed(1)},${(60 + 50 * Math.sin(a) * sy).toFixed(1)}`); }
  return svg(120, 120, `<polygon points="${pts.join(' ')}" class="f-hi s-ink" stroke-width="4" stroke-linejoin="round"/>`);
}
const SHAPES = {
  'háromszög': r => svg(120, 120, `<polygon points="${pick([['60,10 112,104 8,104'], ['20,104 108,104 70,12'], ['14,100 106,92 40,16']])[0]}" class="f-hi s-ink" stroke-width="4" stroke-linejoin="round"/>`),
  'négyzet': r => svg(120, 120, `<rect x="22" y="22" width="76" height="76" class="f-hi s-ink" stroke-width="4" ${r ? `transform="rotate(${r} 60 60)"` : ''}/>`),
  'téglalap': r => svg(120, 120, `<rect x="10" y="32" width="100" height="56" class="f-hi s-ink" stroke-width="4" ${r ? `transform="rotate(${r} 60 60)"` : ''}/>`),
  'kör': () => svg(120, 120, `<circle cx="60" cy="60" r="48" class="f-hi s-ink" stroke-width="4"/>`),
  'ötszög': r => polySvg(5, (r || 0) * Math.PI / 180),
  'hatszög': r => polySvg(6, (r || 0) * Math.PI / 180)
};
function pieSvg(n, k) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const a0 = i * 2 * Math.PI / n - Math.PI / 2, a1 = (i + 1) * 2 * Math.PI / n - Math.PI / 2;
    const p = a => `${(60 + 54 * Math.cos(a)).toFixed(2)} ${(60 + 54 * Math.sin(a)).toFixed(2)}`;
    s += `<path d="M60 60 L${p(a0)} A54 54 0 ${(a1 - a0) > Math.PI ? 1 : 0} 1 ${p(a1)} Z" class="${i < k ? 'f-hi' : 'f-card'} s-ink" stroke-width="3" stroke-linejoin="round"/>`;
  }
  return svg(120, 120, s);
}
function numLine(lo, hi, v) {
  const x = n => 20 + (n - lo) * (320 / (hi - lo));
  let s = `<line x1="${x(lo) - 10}" y1="40" x2="${x(hi) + 10}" y2="40" class="s-ink" stroke-width="3"/>`;
  for (let n = lo; n <= hi; n++) {
    const big = n % 5 === 0;
    s += `<line x1="${x(n)}" y1="${big ? 30 : 34}" x2="${x(n)}" y2="${big ? 50 : 46}" class="s-ink" stroke-width="${big ? 3 : 2}"/>`;
    if (big) s += `<text x="${x(n)}" y="72" text-anchor="middle" font-size="15" class="f-ink">${String(n).replace('-', '−')}</text>`;
  }
  s += `<circle cx="${x(v)}" cy="40" r="9" class="f-red s-ink" stroke-width="3"/>`;
  return svg(360, 82, s);
}
function rectSvg(a, b, label = true) {
  const sc = Math.min(210 / Math.max(a, b), 26), w = a * sc, hh = b * sc, ox = 40, oy = 30;
  let s = `<rect x="${ox}" y="${oy}" width="${w}" height="${hh}" class="f-hi s-ink" stroke-width="4"/>`;
  if (label) s += `<text x="${ox + w / 2}" y="${oy - 8}" text-anchor="middle" font-size="18" class="f-ink">${a} cm</text><text x="${ox + w + 8}" y="${oy + hh / 2 + 6}" font-size="18" class="f-ink">${b} cm</text>`;
  return svg(ox + w + 80, oy + hh + 14, s);
}
function gridRect(w, hh) {
  const sc = Math.min(32, 280 / w); let s = '';
  for (let i = 0; i < w; i++) for (let j = 0; j < hh; j++) s += `<rect x="${4 + i * sc}" y="${4 + j * sc}" width="${sc}" height="${sc}" class="f-hi s-ink" stroke-width="1.5"/>`;
  return svg(w * sc + 8, hh * sc + 8, s);
}
const col = (a, op, b) => {
  const A = String(a), B = String(b), w = Math.max(A.length, B.length + 2);
  return `<div class="col"><div>${A.padStart(w)}</div><div class="u">${(op + ' ' + B).padStart(w)}</div></div>`;
};

/* ===== shared helpers for grades 2–3 ===== */
// Hungarian article before a number written in digits: "az 5", "a 7", "az 1 000"
const azN = n => {
  const s = String(Math.abs(n)); if (n < 0) return 'a';
  if (s[0] === '5') return 'az';
  if (s[0] === '1') return (s.length === 1 || s.length === 4) ? 'az' : 'a';
  return 'a';
};
const Az = n => azN(n) === 'az' ? 'Az' : 'A';
// base-ten blocks: tens as rods, ones as cubes
function blocks(t, e) {
  let s = '', x = 4;
  for (let i = 0; i < t; i++) { for (let j = 0; j < 10; j++) s += `<rect x="${x}" y="${4 + j * 12}" width="12" height="12" class="f-blue s-ink" stroke-width="1"/>`; x += 18; }
  x += 10;
  for (let i = 0; i < e; i++) s += `<rect x="${x + (i % 3) * 16}" y="${112 - Math.floor(i / 3) * 16}" width="12" height="12" class="f-hi s-ink" stroke-width="1"/>`;
  return svg(x + 52, 128, s);
}
// forint coins and notes
const COIN = { 5: ['#e3b23c', '#e3b23c'], 10: ['#c9ced8', '#c9ced8'], 20: ['#e3b23c', '#e3b23c'], 50: ['#c9ced8', '#c9ced8'], 100: ['#c9ced8', '#e3b23c'], 200: ['#e3b23c', '#c9ced8'] };
const NOTE = { 500: '#c98bb9', 1000: '#7fa7d9', 2000: '#b9905c', 5000: '#d9a441', 10000: '#c9786b', 20000: '#7fb39a' };
function moneySvg(list) {
  let s = '', x = 6; const H = 96;
  list.forEach(v => {
    if (NOTE[v]) {
      s += `<g transform="translate(${x} 12)"><rect width="128" height="70" rx="6" fill="${NOTE[v]}" stroke="#1d2742" stroke-opacity=".5" stroke-width="2"/><rect x="8" y="8" width="112" height="54" rx="4" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2"/><text x="64" y="44" text-anchor="middle" font-size="24" fill="#1d2742" font-weight="700">${fmt(v)}</text><text x="64" y="60" text-anchor="middle" font-size="11" fill="#1d2742">FORINT</text></g>`;
      x += 138;
    } else {
      const r = v >= 100 ? 34 : v >= 20 ? 31 : 27, [ring, core] = COIN[v];
      s += `<g transform="translate(${x + r} ${H / 2})"><circle r="${r}" fill="${ring}" stroke="#1d2742" stroke-opacity=".45" stroke-width="2"/>${ring !== core ? `<circle r="${r - 9}" fill="${core}"/>` : `<circle r="${r - 5}" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2"/>`}<text y="8" text-anchor="middle" font-size="${v >= 100 ? 21 : 22}" fill="#1d2742" font-weight="700">${v}</text><text y="22" text-anchor="middle" font-size="9" fill="#1d2742">Ft</text></g>`;
      x += 2 * r + 10;
    }
  });
  return svg(x, H, s, 'money');
}
// Roman numerals
const ROMAN = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
const toRoman = n => { let s = ''; for (const [v, r] of ROMAN) while (n >= v) { s += r; n -= v; } return s; };
// Hungarian clock phrases: negyed 3 = 2:15, fél 3 = 2:30, háromnegyed 3 = 2:45
const huTime = (hh, mm) => { const nx = hh % 12 + 1; return mm === 0 ? `${hh} óra` : mm === 15 ? `negyed ${nx}` : mm === 30 ? `fél ${nx}` : `háromnegyed ${nx}`; };
const relOpts = { fmt: v => ({ '<': '&lt;', '>': '&gt;', '=': '=' })[v] };
// '2-es', '3-as', '5-ös', '6-os' … (the 3-as szorzótábla)
const esN = n => n + '-' + ({ 1: 'es', 2: 'es', 3: 'as', 4: 'es', 5: 'ös', 6: 'os', 7: 'es', 8: 'as', 9: 'es', 10: 'es' })[n];
// accusative and allative forms of small numbers: 3-at, 5-öt; 3-hoz, 5-höz
const accN = n => n + '-' + ({ 1: 'et', 2: 't', 3: 'at', 4: 'et', 5: 'öt', 6: 'ot', 7: 'et', 8: 'at', 9: 'et', 10: 'et', 11: 'et', 12: 't', 13: 'at', 14: 'et', 15: 'öt' }[n] || 't');
const hozN = n => n + '-' + ({ 1: 'hez', 2: 'höz', 3: 'hoz', 4: 'hez', 5: 'höz', 6: 'hoz', 7: 'hez', 8: 'hoz', 9: 'hez', 10: 'hez' }[n] || 'hoz');

/* ===== Matematika 1 (számkör 20, 100) ===== */
const M1 = {
  count(L) {
    const n = L === 1 ? ri(1, 6) : L === 2 ? ri(5, 10) : ri(11, 20);
    return mcq('Hány pötty van a képen?', n, near(n, 3, 1, 20), { visual: L === 1 ? diceSvg(n) : frames([[n, 'f-blue']]), hint: 'Számold meg egyesével. A tízes keretben egy sor 5 pötty, és 10 pötty tölt meg egy keretet.' });
  },
  add(L) {
    let a, b;
    if (L === 1) { a = ri(1, 9); b = ri(1, 10 - a); }
    else if (L === 2) { const u = ri(0, 8); a = 10 + u; b = ri(1, 9 - u); if (Math.random() < .5) [a, b] = [b, a]; }
    else { a = ri(6, 9); b = ri(11 - a, 9); if (Math.random() < .5) [a, b] = [b, a]; }
    const big = Math.max(a, b), small = Math.min(a, b);
    const hint = L === 3 ? `Egészítsd ki tízre: ${big} + ${10 - big} = 10, és még ${small - (10 - big)} marad. Így 10 + ${small - (10 - big)}.` : 'Rakd össze a két csoportot, és számold meg, hány pötty lett.';
    return { type: 'input', prompt: `${a} + ${b} = <span class="blank">?</span>`, answer: a + b, hint, visual: L <= 2 ? frames([[a, 'f-blue'], [b, 'f-red']]) : '' };
  },
  sub(L) {
    let a, b;
    if (L === 1) { a = ri(2, 10); b = ri(1, a - 1); }
    else if (L === 2) { a = ri(12, 19); b = ri(1, a - 10); }
    else { a = ri(12, 18); b = ri(a - 10 + 1, 9); }
    const hint = L === 3 ? `Előbb vegyél el ${accN(a - 10)}, hogy 10 maradjon, aztán még ${accN(b - (a - 10))}: 10 − ${b - (a - 10)}.` : 'Képzeld el a pöttyöket, és vegyél el belőlük annyit, amennyit a feladat kér.';
    return { type: 'input', prompt: `${a} − ${b} = <span class="blank">?</span>`, answer: a - b, hint, visual: L <= 2 ? frames([[a, 'f-blue']]) : '' };
  },
  split(L) {
    if (L === 1) { const t = ri(3, 10), a = ri(1, t - 1); return { type: 'input', prompt: `${t} = ${a} + <span class="blank">?</span>`, answer: t - a, hint: `Mennyit kell ${hozN(a)} adni, hogy ${t} legyen?`, visual: frames([[a, 'f-blue'], [t - a, 'f-red']]).replace(/class="f-red"/g, 'class="f-none s-red" stroke-width="3"') }; }
    if (L === 2) { const t = pick([10, 20]), a = ri(1, t - 1); return pick([{ type: 'input', prompt: `${a} + <span class="blank">?</span> = ${t}`, answer: t - a }, { type: 'input', prompt: `<span class="blank">?</span> + ${a} = ${t}`, answer: t - a }]); }
    const t = ri(11, 20), a = ri(2, t - 2); return { type: 'input', prompt: pick([`${t} = ${a} + <span class="blank">?</span>`, `${t} − ${a} = <span class="blank">?</span>`, `<span class="blank">?</span> + ${a} = ${t}`]), answer: t - a, hint: 'Gondold végig: melyik számot kell hozzáadni, vagy mennyi marad, ha elveszel?' };
  },
  rel(L) {
    let l, r, lv, rv;
    if (L === 1) { lv = ri(0, 10); rv = Math.random() < .2 ? lv : ri(0, 10); l = lv; r = rv; }
    else if (L === 2) { lv = ri(0, 20); rv = Math.random() < .2 ? lv : ri(0, 20); l = lv; r = rv; }
    else {
      const a = ri(1, 9), b = ri(1, 10); lv = a + b; l = `${a} + ${b}`;
      if (Math.random() < .35) { const c = ri(1, lv - 1); r = `${c} + ${lv - c}`; rv = lv; }
      else { rv = ri(2, 19); r = Math.random() < .5 ? rv : `${rv - 1} + 1`; }
    }
    const ans = lv < rv ? '<' : lv > rv ? '>' : '=';
    return mcq(`${l} <span class="blank">?</span> ${r}`, ans, ['<', '=', '>'], { speak: `Melyik jel illik ide: ${plainSpeech(String(l), true)} kérdőjel ${plainSpeech(String(r), true)}?`, fmt: v => ({ '<': '&lt;', '>': '&gt;', '=': '=' })[v], hint: 'Előbb számold ki mindkét oldalt. A nyitott oldal a nagyobb szám felé néz: 3 < 7.' });
  },
  neigh(L) {
    if (L === 1) {
      const t = pick(['after', 'before', 'between']);
      if (t === 'after') { const n = ri(1, 18); return { type: 'input', prompt: `Melyik szám jön ${n} után?`, answer: n + 1 }; }
      if (t === 'before') { const n = ri(2, 19); return { type: 'input', prompt: `Melyik szám van ${n} előtt?`, answer: n - 1 }; }
      const n = ri(1, 17); return { type: 'input', prompt: `Melyik szám van ${n} és ${n + 2} között?`, answer: n + 1 };
    }
    if (L === 2) { const a = ri(0, 12), d = ri(3, 8); return { type: 'input', prompt: `Hány egész szám van ${a} és ${a + d} között?`, answer: d - 1, hint: `Számold végig: ${a + 1}, ${a + 2}, … a ${a + d} előttiig.` }; }
    const n = ri(11, 98); if (n % 10 === 0) return M1.neigh(3);
    const lo = Math.floor(n / 10) * 10, ans = `${lo} és ${lo + 10}`;
    return mcq(`Melyik két tízes között van a ${n}?`, ans, [`${lo - 10} és ${lo}`, `${lo + 10} és ${lo + 20}`, `${n - 10} és ${n}`].filter(x => !x.startsWith('-')), { fmt: v => v, hint: 'A tízes számszomszédok kerek tízesek: a kisebb tízes és a következő tízes.' });
  },
  seq(L) {
    let step, start, len = 5;
    if (L === 1) { step = pick([1, 1, -1]); start = step > 0 ? ri(1, 12) : ri(8, 20); }
    else if (L === 2) { step = pick([2, 5, 10]); start = step === 10 ? ri(0, 5) * 10 : ri(0, 5); }
    else { step = pick([-2, -5, -10, 3, 4]); start = step < 0 ? 4 * -step + ri(0, 5) : ri(0, 6); }
    const seq = Array.from({ length: len }, (_, i) => start + i * step);
    const hide = L === 3 ? ri(1, 3) : ri(2, 4);
    const txt = seq.map((v, i) => i === hide ? '<span class="blank">?</span>' : v).join(', ');
    return { type: 'input', prompt: `Folytasd a sort!<br>${txt}`, answer: seq[hide], hint: `Nézd meg, mennyivel ${step > 0 ? 'nő' : 'csökken'} a szám két szomszédos tag között.` };
  },
  shape(L) {
    const pool = L === 1 ? ['háromszög', 'négyzet', 'kör', 'téglalap'] : L === 2 ? ['háromszög', 'négyzet', 'kör', 'téglalap', 'ötszög'] : ['háromszög', 'négyzet', 'kör', 'téglalap', 'ötszög', 'hatszög'];
    const name = pick(pool), rot = L === 1 ? 0 : pick([0, 0, 15, 30, 45]);
    return mcq('Milyen alakzat ez?', name, shuffle(pool.filter(x => x !== name)).slice(0, 3), { visual: SHAPES[name](rot), fmt: v => v, hint: 'Számold meg az oldalakat és a csúcsokat. A körnek nincs sarka.' });
  },
  clock(L) {
    const hh = ri(1, 12), mm = L === 1 ? 0 : pick([0, 30]), t = (x, y) => `${x}:${String(y).padStart(2, '0')}`;
    if (L === 3 && Math.random() < .5) {
      const times = new Set([t(hh, mm)]); while (times.size < 3) times.add(t(ri(1, 12), pick([0, 30])));
      const ans = t(hh, mm);
      return { type: 'choice', prompt: `Melyik óra mutatja ezt: <b>${ans}</b>?`, answer: ans, options: shuffle([...times]).map(x => { const [a, b] = x.split(':').map(Number); return { value: x, html: clockSvg(a, b, 120) }; }), answerText: ans, hint: 'A rövid mutató az órát, a hosszú mutató a percet jelzi.' };
    }
    const ans = t(hh, mm), opts = new Set([ans]); while (opts.size < 4) opts.add(t(ri(1, 12), L === 1 ? 0 : pick([0, 30])));
    return { type: 'choice', prompt: 'Hány óra van?', visual: clockSvg(hh, mm), answer: ans, options: shuffle([...opts]).map(v => ({ value: v, html: v })), hint: 'A rövid mutató az órát mutatja. Ha a hosszú mutató a 12-esen áll, pontos óra van; ha a 6-oson, akkor fél.' };
  }
};
PAGES['matek-1'] = {
  id: 'matek-1', title: 'Matematika', grade: 1,
  blurb: 'Számok 20-ig, összeadás és kivonás, alakzatok, óra. Egy kör 10 feladat.',
  topics: [
    { id: 'count', sample: '● ● ●', name: 'Számlálás', desc: 'Hány pötty van? Dobókocka és tízes keret.', gen: M1.count },
    { id: 'add', sample: '7 + 5', name: 'Összeadás', desc: '10-ig, 20-ig, tízesátlépéssel.', gen: M1.add },
    { id: 'sub', sample: '13 − 6', name: 'Kivonás', desc: '10-ig, 20-ig, tízesátlépéssel.', gen: M1.sub },
    { id: 'split', sample: '8 = 3 + ?', name: 'Bontás', desc: 'Mennyi hiányzik? Számok kétfelé bontása.', gen: M1.split },
    { id: 'rel', sample: '6 ? 9', name: 'Kisebb, nagyobb, egyenlő', desc: 'A <, > és = jelek használata.', gen: M1.rel },
    { id: 'neigh', sample: '5 · 6 · 7', name: 'Számszomszédok', desc: 'Előtte, utána, között; tízes szomszédok.', gen: M1.neigh },
    { id: 'seq', sample: '2, 4, 6', name: 'Számsorozatok', desc: 'Folytasd a sort a szabály szerint.', gen: M1.seq },
    { id: 'shape', sample: '△ ▢ ○', name: 'Alakzatok', desc: 'Háromszög, négyzet, téglalap, kör és társaik.', gen: M1.shape },
    { id: 'clock', sample: '3:00', name: 'Az óra', desc: 'Egész és fél órák leolvasása.', gen: M1.clock }
  ]
};

/* ===== Matematika 2 (számkör 100) ===== */
const M2 = {
  place(L) {
    if (L === 1) {
      const t = ri(1, 9), e = ri(0, 9);
      return { type: 'input', prompt: `${t} tízes és ${e} egyes. Melyik szám ez?`, answer: t * 10 + e, visual: blocks(t, e), hint: 'Egy rúd 10, egy kis kocka 1. Számold meg a rudakat (tízesek), aztán a kockákat (egyesek).' };
    }
    if (L === 2) {
      const n = ri(11, 99), ten = Math.random() < .5;
      return { type: 'input', prompt: `Hány ${ten ? 'tízes' : 'egyes'} van ${azN(n)} <b>${n}</b> számban?`, answer: ten ? Math.floor(n / 10) : n % 10, hint: 'A kétjegyű számban az első számjegy a tízesek, a második az egyesek száma.' };
    }
    const set = new Set(); while (set.size < 4) set.add(ri(10, 99));
    const arr = [...set], big = Math.random() < .5, ans = big ? Math.max(...arr) : Math.min(...arr);
    return mcq(`Melyik a ${big ? 'legnagyobb' : 'legkisebb'} szám?`, ans, arr.filter(x => x !== ans), { hint: 'Először a tízeseket hasonlítsd össze. Ha egyformák, az egyesek döntenek.' });
  },
  add(L) {
    let a, b, g = 0;
    if (L === 1) {
      if (Math.random() < .5) { a = ri(1, 8) * 10; b = ri(1, 9 - a / 10) * 10; }
      else do { a = ri(11, 89); b = ri(1, 9); } while ((a % 10) + b >= 10 && g++ < 60);
    } else if (L === 2) {
      if (Math.random() < .5) do { a = ri(11, 89); b = ri(2, 9); } while (((a % 10) + b < 10 || a + b > 100) && g++ < 80);
      else { a = ri(11, 79); b = ri(1, Math.floor((100 - a) / 10)) * 10; }
    } else do { a = ri(15, 79); b = ri(12, 100 - a); } while ((a % 10) + (b % 10) < 10 && g++ < 80);
    const t = b - b % 10;
    return { type: 'input', prompt: `${a} + ${b} = <span class="blank">?</span>`, answer: a + b,
      hint: L === 3 && b % 10 ? `Bontsd a második számot: ${a} + ${t} = ${a + t}, aztán ${a + t} + ${b % 10}.` : 'Előbb a tízeseket add össze, aztán az egyeseket. Ha az egyesek összege 10 vagy több, abból lesz még egy tízes.' };
  },
  sub(L) {
    let a, b, g = 0;
    if (L === 1) {
      if (Math.random() < .5) { a = ri(2, 10) * 10; b = ri(1, a / 10 - 1) * 10; }
      else do { a = ri(12, 99); b = ri(1, 9); } while (b > a % 10 && g++ < 60);
    } else if (L === 2) {
      if (Math.random() < .5) do { a = ri(21, 99); b = ri(2, 9); } while (b <= a % 10 && g++ < 80);
      else { a = ri(31, 99); b = ri(1, Math.floor(a / 10) - 1) * 10; }
    } else do { a = ri(31, 99); b = ri(12, a - 5); } while ((b % 10) <= (a % 10) && g++ < 80);
    const t = b - b % 10;
    return { type: 'input', prompt: `${a} − ${b} = <span class="blank">?</span>`, answer: a - b,
      hint: L === 3 && b % 10 ? `Bontsd a kivonandót: ${a} − ${t} = ${a - t}, aztán ${a - t} − ${b % 10}.` : 'Ha az egyesekből nem tudsz elvenni, bonts fel egy tízest: az 10 egyes.' };
  },
  mul(L) {
    const tbl = pick(L === 1 ? [2, 5, 10] : L === 2 ? [3, 4, 2, 5, 10] : [6, 7, 8, 9, 3, 4]), n = ri(1, 10);
    const [a, b] = Math.random() < .3 ? [tbl, n] : [n, tbl];
    const hint = a <= 6 ? `${a} · ${b} = ${Array(a).fill(b).join(' + ')}` : `${a} · ${b} = ${a - 1} · ${b} + ${b} = ${(a - 1) * b} + ${b}`;
    if (L === 3 && Math.random() < .3) return { type: 'input', prompt: `<span class="blank">?</span> · ${b} = ${a * b}`, answer: a, hint: `Mondd végig ${azN(b)} ${esN(b)} szorzótáblát, amíg el nem jutsz ${azN(a * b)} ${a * b}-ig. Hányadik lépésnél tartasz?` };
    return { type: 'input', prompt: `${a} · ${b} = <span class="blank">?</span>`, answer: a * b, hint };
  },
  div(L) {
    const b = pick(L === 1 ? [2, 5, 10] : L === 2 ? [3, 4, 2, 5] : [6, 7, 8, 9, 3, 4]), q = ri(1, 10), n = b * q;
    if (L === 3 && Math.random() < .45) {
      const [txt, hint] = pick([
        [`${n} szem cukrot ${b} gyerek között osztunk el egyenlően. Hány szem jut egy gyereknek?`, 'Egyenlő részekre osztás: oszd el a cukrokat a gyerekek számával.'],
        [`${n} ceruzát ${b} dobozba rakunk, mindegyikbe ugyanannyit. Hány ceruza kerül egy dobozba?`, 'Egyenlő részekre osztás: hány jut egy dobozba?'],
        [`${n} gyerek ${b} fős csapatokba áll. Hány csapat lesz?`, `Bennfoglalás: ${n} : ${b} = ?`]
      ]);
      return { type: 'input', prompt: txt, answer: q, hint, key: 1 };
    }
    return { type: 'input', prompt: `${n} : ${b} = <span class="blank">?</span>`, answer: q, hint: `Gondolj a szorzótáblára: ? · ${b} = ${n}. Melyik szám kerül a kérdőjel helyére?` };
  },
  parity(L) {
    if (L < 3) {
      const n = L === 1 ? ri(1, 20) : ri(21, 100);
      return { type: 'choice', prompt: `Páros vagy páratlan ${azN(n)} <b>${n}</b>?`, answer: n % 2 ? 'páratlan' : 'páros', options: [{ value: 'páros', html: 'páros' }, { value: 'páratlan', html: 'páratlan' }], hint: 'A páros számok 0-ra, 2-re, 4-re, 6-ra vagy 8-ra végződnek. Ezeket kettesével párba lehet állítani.' };
    }
    const even = Math.random() < .5, ans = ri(5, 49) * 2 + (even ? 0 : 1), wr = new Set();
    while (wr.size < 3) wr.add(ri(5, 49) * 2 + (even ? 1 : 0));
    return mcq(`Melyik szám ${even ? 'páros' : 'páratlan'}?`, ans, [...wr], { hint: 'Csak az utolsó számjegyet nézd! Páros: 0, 2, 4, 6, 8. Páratlan: 1, 3, 5, 7, 9.' });
  },
  seq(L) {
    if (L === 3 && Math.random() < .5) {
      const st = ri(2, 9), s0 = ri(1, 30), up = Math.random() < .6;
      const seq = [0, 1, 2, 3].map(i => up ? s0 + i * st : s0 + 3 * st - i * st);
      const sym = up ? '+' : '−', ans = `${sym}${st}`;
      const wr = [`${sym}${st + 1}`, st > 2 ? `${sym}${st - 1}` : `${sym}${st + 2}`, `${up ? '−' : '+'}${st}`];
      return mcq(`Mi a szabály? ${seq.join(', ')}, …`, ans, wr, { fmt: v => v, hint: 'Nézd meg, mennyivel változik a szám két szomszédos tag között, és hogy nő vagy csökken.' });
    }
    const step = L === 1 ? pick([2, 5, 10]) : pick([3, 4, 6, -2, -5, -10]);
    const start = step > 0 ? ri(0, 100 - 4 * step) : ri(-4 * step, 100);
    const seq = [0, 1, 2, 3, 4].map(i => start + i * step), hide = ri(1, 4);
    return { type: 'input', prompt: `Folytasd a sort!<br>${seq.map((v, i) => i === hide ? '<span class="blank">?</span>' : v).join(', ')}`, answer: seq[hide], hint: `Nézd meg, mennyivel ${step > 0 ? 'nő' : 'csökken'} a szám lépésenként.` };
  },
  units(L) {
    if (L === 1) {
      const [txt, ans] = pick([
        ['Egy ceruza hossza körülbelül 15', 'cm'], ['Az ajtó magassága körülbelül 2', 'm'], ['Egy vödörbe körülbelül 10', 'l'],
        ['Egy pohárba körülbelül 2', 'dl'], ['Egy zsák krumpli tömege körülbelül 10', 'kg'], ['A tanterem hossza körülbelül 8', 'm'],
        ['Egy kenyér tömege körülbelül 1', 'kg'], ['Egy radír hossza körülbelül 4', 'cm'], ['Egy fazékba körülbelül 5', 'l'], ['Egy bögrébe körülbelül 3', 'dl']]);
      const wr = shuffle(['cm', 'm', 'l', 'dl', 'kg'].filter(u => u !== ans)).slice(0, 2);
      const end = /vödörbe|pohárba|fazékba|bögrébe/.test(txt) ? ' fér.' : '.';
      return mcq(`Melyik mértékegység illik ide?<br>${txt} <span class="blank">?</span>${end}`, ans, wr, { fmt: v => v, hint: 'Hosszúság: cm, m. Űrtartalom (mennyi fér bele): l, dl. Tömeg (milyen nehéz): kg.' });
    }
    if (L === 2) {
      const [a, b, k, max] = pick([['m', 'dm', 10, 9], ['dm', 'cm', 10, 9], ['l', 'dl', 10, 9], ['hét', 'nap', 7, 9], ['nap', 'óra', 24, 4], ['m', 'cm', 100, 1], ['óra', 'perc', 60, 1]]);
      const n = ri(1, max);
      return { type: 'input', prompt: `${n} ${a} = <span class="blank">?</span> ${b}`, answer: n * k, hint: `1 ${a} = ${k} ${b}` };
    }
    const [a, b, k] = pick([['dm', 'cm', 10], ['m', 'dm', 10], ['l', 'dl', 10]]);
    const x = ri(1, 9), y = ri(Math.max(1, x * k - 15), x * k + 15), ans = x * k < y ? '<' : x * k > y ? '>' : '=';
    return mcq(`${x} ${a} <span class="blank">?</span> ${y} ${b}`, ans, ['<', '=', '>'], { ...relOpts, hint: `Váltsd át: 1 ${a} = ${k} ${b}. Így ${x} ${a} = ${x * k} ${b}.` });
  },
  money(L) {
    const coins = L === 1 ? [5, 10, 20] : [5, 10, 20, 50];
    let list, sum, g = 0;
    do { list = Array.from({ length: L === 1 ? ri(2, 3) : ri(3, 5) }, () => pick(coins)).sort((a, b) => b - a); sum = list.reduce((a, b) => a + b, 0); } while (sum > 100 && g++ < 50);
    if (L < 3) return { type: 'input', prompt: 'Mennyi pénz van a képen? (Ft)', visual: moneySvg(list), answer: sum, hint: 'Kezdd a legnagyobb pénzérmével, és add hozzá sorban a többit.' };
    if (sum < 25) return M2.money(3);
    const item = pick(['fagyit', 'kiflit', 'ceruzát', 'matricát', 'lufit', 'zsemlét']), price = ri(3, Math.floor((sum - 5) / 5)) * 5;
    return { type: 'input', prompt: `Ennyi pénzed van. Veszel egy ${price} Ft-os ${item}. Mennyi pénzed marad? (Ft)`, visual: moneySvg(list), answer: sum - price, hint: `Előbb számold össze a pénzed (${sum} Ft), aztán vond ki belőle az árat.`, key: 1 };
  },
  clock(L) {
    const mins = L === 1 ? [0, 30] : [0, 15, 30, 45];
    const hh = ri(1, 12), mm = pick(mins), ans = huTime(hh, mm);
    if (L === 3 && Math.random() < .5) {
      const seen = new Set([`${hh}:${mm}`]), opts = [{ value: ans, html: clockSvg(hh, mm, 120) }];
      while (opts.length < 3) { const a = ri(1, 12), b = pick(mins), k = `${a}:${b}`; if (!seen.has(k) && huTime(a, b) !== ans) { seen.add(k); opts.push({ value: huTime(a, b), html: clockSvg(a, b, 120) }); } }
      return { type: 'choice', prompt: `Melyik óra mutatja ezt: <b>${ans}</b>?`, answer: ans, options: shuffle(opts), answerText: ans, hint: 'Negyed: a nagymutató a 3-on áll. Fél: a 6-on. Háromnegyed: a 9-en. A „negyed 4”, „fél 4”, „háromnegyed 4” mind 3 és 4 óra között van.' };
    }
    const opts = new Set([ans]); let g = 0;
    while (opts.size < 4 && g++ < 60) opts.add(huTime(pick([hh, hh % 12 + 1, ri(1, 12)]), pick(mins)));
    return mcq('Hány óra van?', ans, [...opts].filter(x => x !== ans), { visual: clockSvg(hh, mm), fmt: v => v, hint: 'Ha a nagymutató a 6-on áll, „fél” van, és a következő órát mondjuk: 2:30 = fél 3. A 3-on negyed, a 9-en háromnegyed.' });
  },
  shape(L) {
    const SIDES = { 'háromszög': 3, 'négyzet': 4, 'téglalap': 4, 'ötszög': 5, 'hatszög': 6 };
    const pool = L === 1 ? ['háromszög', 'négyzet', 'téglalap'] : Object.keys(SIDES), name = pick(pool);
    if (L === 3 && Math.random() < .5) {
      const s = ri(2, 9), sq = Math.random() < .5;
      return sq ? { type: 'input', prompt: `Egy négyzet minden oldala ${s} cm. Mennyi az oldalak hosszának összege? (cm)`, answer: 4 * s, hint: 'A négyzetnek 4 egyforma oldala van.', visual: SHAPES['négyzet'](0) }
        : { type: 'input', prompt: `Egy háromszög minden oldala ${s} cm. Mennyi az oldalak hosszának összege? (cm)`, answer: 3 * s, hint: 'A háromszögnek 3 oldala van.', visual: SHAPES['háromszög'](0) };
    }
    const ask = Math.random() < .5 ? 'oldala' : 'csúcsa';
    return { type: 'input', prompt: `Hány ${ask} van ennek az alakzatnak?`, visual: SHAPES[name](L === 1 ? 0 : pick([0, 15, 30])), answer: SIDES[name], hint: 'Az oldal az alakzat egyenes vonala. A csúcs az a pont, ahol két oldal találkozik. A sokszögnek ugyanannyi csúcsa van, mint oldala.' };
  },
  word(L) {
    const n1 = pick(NAMES);
    const T1 = [
      () => { const a = ri(12, 60), b = ri(5, 99 - a); return [`${n1} ${a} matricát gyűjtött, aztán kapott még ${b} darabot. Hány matricája van most?`, a + b, 'Összeadás: ami volt + amit kapott.']; },
      () => { const a = ri(30, 90), b = ri(5, a - 10); return [`A buszon ${a} utas ült. A megállóban ${b} utas leszállt. Hányan maradtak a buszon?`, a - b, 'Kivonás: ami volt − ami elment.']; },
      () => { const a = ri(20, 60), b = ri(3, a - 5); return [`A kosárban ${a} alma volt. ${b} almát megettünk. Hány alma maradt?`, a - b, 'Ami maradt = ami volt − amit megettünk.']; }
    ];
    const T2 = [
      () => { const k = pick([6, 10, 5]), n = ri(2, 9); return [`Egy dobozban ${k} tojás van. Hány tojás van ${n} dobozban?`, k * n, 'Ugyanannyi van minden dobozban, ezért szorzással számolunk.']; },
      () => { const n = ri(2, 9), k = ri(2, 9); return [`${n} gyereknek ${k}-${k} szem cukrot adunk. Hány szem cukor kell összesen?`, n * k, 'Minden gyerek ugyanannyit kap: szorzás.']; },
      () => { const b = pick([2, 3, 4, 5]), q = ri(3, 9); return [`${b * q} gyerek ${b} fős csoportokba áll. Hány csoport lesz?`, q, `Bennfoglalás: ${b * q} : ${b} = ?`]; }
    ];
    const T3 = [
      () => { const p = ri(2, 6) * 5, q = ri(2, 5) * 5, a = p + q + ri(1, 8) * 5; return [`${n1} ${a} Ft-ot kapott. Vett egy ${p} Ft-os ceruzát és egy ${q} Ft-os radírt. Mennyi pénze maradt?`, a - p - q, 'Add össze, amit elköltött, aztán vond ki a pénzéből.']; },
      () => { const a = ri(40, 80), b = ri(10, 30), c = ri(5, 20); return [`A polcon ${a} könyv volt. ${b} könyvet elvittek, aztán ${c} újat hoztak. Hány könyv van most a polcon?`, a - b + c, 'Előbb vond ki, amit elvittek, aztán add hozzá, amit hoztak.']; },
      () => { const k = ri(3, 9), n = ri(5, 10), e = ri(2, 9); return [`A teremben ${k} sorban ${n}-${n} szék áll. ${e} széket kivittek. Hány szék maradt?`, k * n - e, 'Előbb számold ki az összes széket (szorzás), aztán vond ki, amit kivittek.']; }
    ];
    const [txt, ans, hint] = pick(L === 1 ? T1 : L === 2 ? T2 : T3)();
    return { type: 'input', prompt: txt, answer: ans, hint, key: 1 };
  }
};
PAGES['matek-2'] = {
  id: 'matek-2', title: 'Matematika', grade: 2,
  blurb: 'Számok 100-ig, összeadás és kivonás, szorzótábla, osztás, pénz, óra, mértékegységek. Egy kör 10 feladat.',
  topics: [
    { id: 'place', sample: '4 tízes 7 egyes', name: 'Számok 100-ig', desc: 'Tízesek és egyesek, melyik a nagyobb.', gen: M2.place },
    { id: 'add', sample: '37 + 25', name: 'Összeadás', desc: 'Kerek tízesek, tízesátlépés, kétjegyű számok.', gen: M2.add },
    { id: 'sub', sample: '72 − 38', name: 'Kivonás', desc: 'Kerek tízesek, tízesátlépés, kétjegyű számok.', gen: M2.sub },
    { id: 'mul', sample: '6 · 4', name: 'Szorzótábla', desc: 'A kis szorzótábla 1-től 10-ig.', gen: M2.mul },
    { id: 'div', sample: '24 : 6', name: 'Osztás', desc: 'Bennfoglalás és egyenlő részekre osztás.', gen: M2.div },
    { id: 'parity', sample: '2 · 4 · 6', name: 'Páros, páratlan', desc: 'Melyik szám páros, melyik páratlan?', gen: M2.parity },
    { id: 'seq', sample: '5, 10, 15', name: 'Számsorozatok', desc: 'Folytasd a sort, találd ki a szabályt.', gen: M2.seq },
    { id: 'units', sample: '1 m = 10 dm', name: 'Mértékegységek', desc: 'cm, dm, m, l, dl, kg, nap, hét.', gen: M2.units },
    { id: 'money', sample: '50 Ft', name: 'Pénz', desc: 'Forint érmék összeadása, mennyi marad?', gen: M2.money },
    { id: 'clock', sample: 'negyed 3', name: 'Az óra', desc: 'Egész, negyed, fél és háromnegyed.', gen: M2.clock },
    { id: 'shape', sample: '△ ▢ ⬠', name: 'Alakzatok', desc: 'Oldalak és csúcsok száma.', gen: M2.shape },
    { id: 'word', sample: 'Anna 24 matrica…', name: 'Szöveges feladatok', desc: 'Egy- és kétlépéses feladatok.', gen: M2.word }
  ]
};

/* ===== Matematika 3 (számkör 1000) ===== */
const M3 = {
  place(L) {
    if (L === 1) {
      const s = ri(1, 9), t = ri(0, 9), e = ri(0, 9);
      return { type: 'input', prompt: `${s} százas, ${t} tízes és ${e} egyes. Melyik szám ez?`, answer: s * 100 + t * 10 + e, hint: 'Ha egy helyiérték üres, oda 0-t írunk: 3 százas és 5 egyes = 305.' };
    }
    if (L === 2) {
      const n = ri(101, 999), k = ri(0, 2), nm = ['az egyesek', 'a tízesek', 'a százasok'][k];
      if (Math.random() < .5) return { type: 'input', prompt: `Melyik számjegy áll ${azN(n)} <b>${n}</b> számban ${nm} helyén?`, answer: Math.floor(n / 10 ** k) % 10, hint: 'Jobbról balra: egyesek, tízesek, százasok.' };
      return { type: 'input', prompt: `Hány tízes van összesen ${azN(n)} <b>${n}</b> számban?`, answer: Math.floor(n / 10), hint: `Takard le az egyeseket: ami marad, az a tízesek száma. ${n} = ${Math.floor(n / 10)} tízes és ${n % 10} egyes.` };
    }
    const d = shuffle([ri(1, 9), ri(0, 9), ri(0, 9)]); let g = 0;
    while ((new Set(d)).size < 3 && g++ < 30) d[ri(0, 2)] = ri(0, 9);
    const perms = [...new Set([[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]].map(p => p.map(i => d[i]).join('')))].filter(x => x[0] !== '0').map(Number);
    const arr = shuffle(perms).slice(0, 4);
    if (arr.length < 3) return M3.place(3);
    const big = Math.random() < .5, ans = big ? Math.max(...arr) : Math.min(...arr);
    return mcq(`Melyik a ${big ? 'legnagyobb' : 'legkisebb'} szám?`, ans, arr.filter(x => x !== ans), { hint: 'Először a százasokat hasonlítsd össze, aztán a tízeseket, végül az egyeseket.' });
  },
  round(L) {
    const k = L === 1 ? 10 : L === 2 ? 100 : pick([10, 100]);
    let n; do { n = ri(101, 994); } while (n % k === 0);
    return { type: 'input', prompt: `Kerekítsd ${k === 10 ? 'tízesekre' : 'százasokra'}: <b>${n}</b>`, answer: Math.round(n / k) * k, hint: k === 10 ? 'Nézd az egyesek helyét: 0–4 esetén lefelé, 5–9 esetén felfelé kerekítünk.' : 'Nézd a tízesek helyét: 0–4 esetén lefelé, 5–9 esetén felfelé kerekítünk.' };
  },
  mental(L) {
    let a, b, plus = Math.random() < .5, g = 0;
    if (L === 1) { a = ri(1, 8) * 100; b = plus ? ri(1, 10 - a / 100) * 100 : ri(1, a / 100) * 100; if (!plus && b === a) b -= 100; if (b <= 0) { plus = true; b = 100; } }
    else if (L === 2) { if (plus) do { a = ri(11, 95) * 10; b = ri(2, 9) * 10; } while (((a % 100) + b < 100 || a + b > 1000) && g++ < 80); else do { a = ri(11, 99) * 10; b = ri(2, 9) * 10; } while ((b <= a % 100 || b > a) && g++ < 80); }
    else { if (plus) do { a = ri(101, 960); b = ri(5, 39); } while (((a % 10) + (b % 10) < 10 || a + b > 1000) && g++ < 80); else do { a = ri(110, 999); b = ri(5, 39); } while ((b % 10) <= (a % 10) && g++ < 80); }
    return { type: 'input', prompt: `${a} ${plus ? '+' : '−'} ${b} = <span class="blank">?</span>`, answer: plus ? a + b : a - b, hint: L === 1 ? 'Számolj százasokkal, mint egyjegyű számokkal: 3 százas + 4 százas = 7 százas.' : 'Bontsd részekre: előbb a tízeseket, aztán az egyeseket. Figyelj, ha átlépsz egy kerek százast!' };
  },
  add(L) {
    let a, b, g = 0;
    do { a = ri(100, 800); b = ri(100, 999 - a); if (L === 1 && Math.random() < .3) b = ri(10, 99); } while (g++ < 500 && !(L === 1 ? carries(a, b) === 0 : L === 2 ? carries(a, b) === 1 : carries(a, b) >= 2));
    return { type: 'input', prompt: 'Számold ki írásban!', visual: col(a, '+', b), answer: a + b, hint: 'Írd egymás alá a helyiértékeket, és jobbról balra adj össze. Ha 10 vagy több lett, a tízest vidd át a következő helyre.' };
  },
  sub(L) {
    let a, b, g = 0;
    do { a = ri(200, 999); b = ri(100, a - 1); } while (g++ < 800 && !(L === 1 ? borrows(a, b) === 0 : L === 2 ? borrows(a, b) === 1 : borrows(a, b) >= 2));
    return { type: 'input', prompt: 'Számold ki írásban!', visual: col(a, '−', b), answer: a - b, hint: 'Jobbról balra haladunk. Az alsó számjegyet egészítsd ki a felsőre: 4 meg mennyi az 7? Ha a felső számjegy kisebb, 10-zel nagyobbra egészíts ki (4 meg mennyi az 12?), és a maradt 1-et add hozzá a következő alsó számjegyhez. Ellenőrzés: különbség + kivonandó = kisebbítendő.' };
  },
  mul(L) {
    if (L === 1) { const a = ri(2, 10), b = ri(2, 10); return { type: 'input', prompt: `${a} · ${b} = <span class="blank">?</span>`, answer: a * b, hint: `${a} · ${b} = ${a - 1} · ${b} + ${b}` }; }
    if (L === 2) { const a = ri(2, 9) * 10, b = ri(2, 9), sw = Math.random() < .5; return { type: 'input', prompt: sw ? `${b} · ${a} = <span class="blank">?</span>` : `${a} · ${b} = <span class="blank">?</span>`, answer: a * b, hint: `${a} = ${a / 10} tízes. ${a / 10} · ${b} = ${a / 10 * b}, tehát ${a / 10 * b} tízes = ${a * b}.` }; }
    const a = ri(12, 99), b = ri(2, 9); if (a * b > 1000) return M3.mul(3);
    const t = a - a % 10;
    return { type: 'input', prompt: `${a} · ${b} = <span class="blank">?</span>`, answer: a * b, hint: `Bontsd: ${t} · ${b} = ${t * b} és ${a % 10} · ${b} = ${(a % 10) * b}. Aztán add össze.` };
  },
  div(L) {
    if (L === 1) { const b = ri(2, 10), q = ri(2, 10); return { type: 'input', prompt: `${b * q} : ${b} = <span class="blank">?</span>`, answer: q, hint: `Gondolj a szorzótáblára: ? · ${b} = ${b * q}.` }; }
    if (L === 2) {
      let a, b, g = 0; do { b = ri(2, 9); a = ri(b + 1, 9 * b + b - 1); } while ((a % b === 0 || Math.floor(a / b) > 10) && g++ < 50);
      const q = Math.floor(a / b), r = a % b, askR = Math.random() < .5;
      return { type: 'input', prompt: askR ? `${a} : ${b} = ${q}, maradék: <span class="blank">?</span>` : `${a} : ${b} = <span class="blank">?</span>, maradék: ${r}`, answer: askR ? r : q, hint: `${q} · ${b} = ${q * b}, és ${a} − ${q * b} = ${r}. A maradék mindig kisebb, mint az osztó.` };
    }
    if (Math.random() < .5) { const b = ri(2, 9), q = ri(2, 9) * 10; if (b * q > 1000) return M3.div(3); return { type: 'input', prompt: `${b * q} : ${b} = <span class="blank">?</span>`, answer: q, hint: `${b * q} = ${b * q / 10} tízes. ${b * q / 10} : ${b} = ${q / 10}, tehát ${q / 10} tízes.` }; }
    const b = ri(2, 4), t = ri(1, 3), e = ri(1, 3), q = t * 10 + e, n = q * b;
    return { type: 'input', prompt: `${n} : ${b} = <span class="blank">?</span>`, answer: q, hint: `Bontsd: ${t * 10 * b} : ${b} = ${t * 10} és ${e * b} : ${b} = ${e}.` };
  },
  frac(L) {
    if (L === 1) {
      const n = pick([2, 3, 4, 5, 6, 8]), k = ri(1, n - 1), v = `${k}/${n}`;
      const wr = new Set([`${n - k}/${n}`, `${k}/${n + 1}`, `${Math.min(k + 1, n)}/${n}`, `1/${n}`, `${k}/${Math.max(2, n - 1)}`]); wr.delete(v);
      const html = x => { const [a, b] = x.split('/'); return fr(a, b); };
      return mcq('Mekkora része van kiszínezve?', v, [...wr].slice(0, 3), { visual: pieSvg(n, k), fmt: html, answerText: html(v), hint: 'Az alsó szám (nevező): hány egyenlő részre van osztva a kör. A felső szám (számláló): hány rész van kiszínezve.' });
    }
    if (L === 2) { const n = pick([2, 3, 4, 5, 10]), W = n * ri(2, 10); return { type: 'input', prompt: `Mennyi ${azN(W)} ${W} ${FRN[n]}?`, answer: W / n, hint: `Oszd el ${n} egyenlő részre: ${W} : ${n} = ?` }; }
    const n = pick([3, 4, 5]), k = ri(2, n - 1), W = n * ri(2, 9);
    return { type: 'input', prompt: `Mennyi ${azN(W)} ${W} ${fr(k, n)} része?`, answer: W / n * k, hint: `Előbb keresd meg az egy részt: ${W} : ${n} = ${W / n}. Aztán szorozd meg: ${W / n} · ${k}.` };
  },
  units(L) {
    if (L === 1) {
      const [a, b, k, max] = pick([['m', 'dm', 10, 9], ['dm', 'cm', 10, 9], ['cm', 'mm', 10, 9], ['m', 'cm', 100, 9], ['km', 'm', 1000, 1], ['kg', 'dkg', 100, 9], ['dkg', 'g', 10, 9], ['l', 'dl', 10, 9], ['dl', 'cl', 10, 9], ['l', 'cl', 100, 9], ['óra', 'perc', 60, 9], ['perc', 'másodperc', 60, 9], ['nap', 'óra', 24, 9], ['év', 'hónap', 12, 9], ['hét', 'nap', 7, 9]]);
      const n = ri(1, max);
      return { type: 'input', prompt: `${n} ${a} = <span class="blank">?</span> ${b}`, answer: n * k, hint: `1 ${a} = ${k} ${b}` };
    }
    if (L === 2) {
      const [a, b, k] = pick([['m', 'cm', 100], ['kg', 'dkg', 100], ['óra', 'perc', 60], ['m', 'dm', 10], ['l', 'dl', 10], ['l', 'cl', 100]]);
      const x = ri(1, 9), y = ri(1, k - 1);
      return { type: 'input', prompt: `${x} ${a} ${y} ${b} = <span class="blank">?</span> ${b}`, answer: x * k + y, hint: `1 ${a} = ${k} ${b}. Váltsd át az első részt (${x} ${a} = ${x * k} ${b}), és add hozzá a másodikat.` };
    }
    const [a, b, k] = pick([['m', 'cm', 100], ['kg', 'dkg', 100], ['l', 'dl', 10], ['óra', 'perc', 60], ['km', 'm', 1000]]);
    const x = ri(1, k === 1000 ? 1 : 9), off = pick([-1, 0, 1]) * ri(1, Math.max(1, Math.floor(k / 4))), y = Math.max(1, x * k + off);
    const ans = x * k < y ? '<' : x * k > y ? '>' : '=';
    return mcq(`${x} ${a} <span class="blank">?</span> ${y} ${b}`, ans, ['<', '=', '>'], { ...relOpts, hint: `Váltsd át ugyanarra a mértékegységre: ${x} ${a} = ${x * k} ${b}.` });
  },
  perim(L) {
    if (L === 1) { const a = ri(3, 12), b = ri(2, 10); return { type: 'input', prompt: 'Mennyi a téglalap kerülete? (cm)', visual: rectSvg(a, b), answer: 2 * (a + b), hint: 'A kerület az oldalak hosszának összege: a + b + a + b.' }; }
    if (L === 2) {
      if (Math.random() < .5) { const s = ri(3, 25); return { type: 'input', prompt: `Egy négyzet oldala ${s} cm. Mennyi a kerülete? (cm)`, answer: 4 * s, hint: 'A négyzetnek 4 egyforma oldala van: 4 · oldal.' }; }
      const a = ri(3, 15), b = ri(3, 15), c = ri(Math.abs(a - b) + 1, a + b - 1);
      return { type: 'input', prompt: `Egy háromszög oldalai ${a} cm, ${b} cm és ${c} cm. Mennyi a kerülete? (cm)`, answer: a + b + c, hint: 'Add össze a három oldal hosszát.' };
    }
    const a = ri(4, 20), b = ri(2, a - 1), P = 2 * (a + b);
    return { type: 'input', prompt: `Egy téglalap kerülete ${P} cm, az egyik oldala ${a} cm. Milyen hosszú a másik oldala? (cm)`, answer: b, hint: `Két oldal együtt a kerület fele: ${P} : 2 = ${P / 2}. Ebből vedd el az ismert oldalt: ${P / 2} − ${a}.` };
  },
  roman(L) {
    const max = L === 1 ? 20 : L === 2 ? 100 : 1000, n = ri(L === 3 ? 21 : 1, max);
    if (L === 3 && Math.random() < .5) {
      const wr = new Set(); let g = 0;
      while (wr.size < 3 && g++ < 60) { const m = n + pick([-10, -1, 1, 10, 4, -4, 50, -50, 100]); if (m > 0 && m !== n && m < 4000) wr.add(toRoman(m)); }
      return mcq(`Hogyan írjuk római számmal: <b>${n}</b>?`, toRoman(n), [...wr], { fmt: v => v, hint: 'I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000. A kisebb jel a nagyobb előtt kivonást jelent: IV = 4, IX = 9, XL = 40, XC = 90.' });
    }
    return { type: 'input', prompt: `Melyik szám ez? <b>${toRoman(n)}</b>`, answer: n, hint: 'I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000. Ha kisebb jel áll a nagyobb előtt, kivonjuk: IV = 4, IX = 9, XL = 40, XC = 90.' };
  },
  word(L) {
    const n1 = pick(NAMES);
    const T1 = [
      () => { const a = ri(120, 600), b = ri(50, 999 - a); return [`Az iskolába ${a} lány és ${b} fiú jár. Hány gyerek jár az iskolába?`, a + b, 'Összeadás: lányok + fiúk.']; },
      () => { const a = ri(300, 900), b = ri(100, a - 50); return [`A cukrászdában reggel ${a} pogácsa volt. Napközben ${b} darabot eladtak. Hány pogácsa maradt?`, a - b, 'Kivonás: ami volt − amit eladtak.']; },
      () => { const n = ri(3, 9), k = ri(12, 99); if (n * k > 999) return [`Egy könyv ${k} oldalas. Hány oldal van 2 ilyen könyvben?`, 2 * k, 'Szorzás.']; return [`Egy zsemle ára ${k} Ft. Mennyibe kerül ${n} zsemle?`, n * k, 'Egy zsemle ára · darabszám.']; }
    ];
    const T2 = [
      () => { const a = ri(200, 500), b = ri(50, 200), c = ri(30, 150); return [`A vonaton ${a} utas ült. Az első megállóban ${b} leszállt, ${c} felszállt. Hányan utaznak most?`, a - b + c, 'Előbb vond ki, aki leszállt, aztán add hozzá, aki felszállt.']; },
      () => { const p = ri(12, 60) * 5, q = ri(10, 40) * 5, t = 1000; return [`${n1} ${t} Ft-tal ment a boltba. Vett egy ${p} Ft-os füzetet és egy ${q} Ft-os tollat. Mennyi pénze maradt?`, t - p - q, 'Add össze, amit elköltött, és vond ki az 1000 Ft-ból.']; },
      () => { const b = pick([3, 4, 5, 6]), q = ri(12, 40); return [`${b * q} almát ${b} kosárba osztunk szét egyenlően. Hány alma kerül egy kosárba?`, q, `Egyenlő részekre osztás: ${b * q} : ${b}.`]; }
    ];
    const T3 = [
      () => { const k = ri(4, 9), d = ri(12, 30), e = ri(10, 60); if (k * d - e < 0) return T1[0](); return [`A raktárban ${k} láda van, mindegyikben ${d} kg alma. ${e} kg almát elvittek. Hány kg alma maradt?`, k * d - e, 'Előbb az összes alma (szorzás), aztán vond ki, amit elvittek.']; },
      () => { const a = ri(2, 6) * 50, b = a + ri(1, 6) * 25; return [`${n1} ${a} Ft-ot gyűjtött, a testvére ${b - a} Ft-tal többet. Mennyit gyűjtöttek együtt?`, a + b, `Előbb számold ki a testvér pénzét (${a} + ${b - a}), aztán add össze a kettőt.`]; },
      () => { const n = ri(3, 8), k = ri(15, 45), r = ri(5, 30); return [`Egy kirándulásra ${n} osztály megy, osztályonként ${k} gyerek. ${r} gyerek beteg lett, ők otthon maradtak. Hány gyerek ment kirándulni?`, n * k - r, 'Előbb az összes gyerek, aztán vond ki, akik otthon maradtak.']; }
    ];
    const [txt, ans, hint] = pick(L === 1 ? T1 : L === 2 ? T2 : T3)();
    return { type: 'input', prompt: txt, answer: ans, hint, key: 1 };
  }
};
PAGES['matek-3'] = {
  id: 'matek-3', title: 'Matematika', grade: 3,
  blurb: 'Számok 1000-ig, kerekítés, fejszámolás, írásbeli összeadás és kivonás, szorzás, osztás, törtek, kerület, római számok. Egy kör 10 feladat.',
  topics: [
    { id: 'place', sample: '3 százas 5 egyes', name: 'Számok 1000-ig', desc: 'Százasok, tízesek, egyesek; melyik a nagyobb.', gen: M3.place },
    { id: 'round', sample: '347 ≈ 350', name: 'Kerekítés', desc: 'Tízesekre és százasokra.', gen: M3.round },
    { id: 'mental', sample: '340 + 70', name: 'Fejszámolás', desc: 'Kerek százasok és tízesek, átlépéssel.', gen: M3.mental },
    { id: 'add', sample: '356 + 278', name: 'Írásbeli összeadás', desc: 'Háromjegyű számok, átvitellel.', gen: M3.add },
    { id: 'sub', sample: '702 − 348', name: 'Írásbeli kivonás', desc: 'Háromjegyű számok, kölcsönzéssel.', gen: M3.sub },
    { id: 'mul', sample: '40 · 6', name: 'Szorzás', desc: 'Szorzótábla, kerek tízesek, kétjegyű szám szorzása.', gen: M3.mul },
    { id: 'div', sample: '23 : 4', name: 'Osztás', desc: 'Osztótábla, maradékos osztás, kerek tízesek.', gen: M3.div },
    { id: 'frac', sample: '1/4', name: 'Törtek', desc: 'Fele, harmada, negyede; a szám törtrésze.', gen: M3.frac },
    { id: 'units', sample: '3 m 20 cm', name: 'Mértékegységek', desc: 'Hosszúság, tömeg, űrtartalom, idő.', gen: M3.units },
    { id: 'perim', sample: 'K = 2 · (a + b)', name: 'Kerület', desc: 'Téglalap, négyzet, háromszög.', gen: M3.perim },
    { id: 'roman', sample: 'XIV', name: 'Római számok', desc: 'Olvasd és írd le a római számokat.', gen: M3.roman },
    { id: 'word', sample: '450 utas…', name: 'Szöveges feladatok', desc: 'Egy- és többlépéses feladatok.', gen: M3.word }
  ]
};

/* ===== Matematika 4 (számkör 10 000) ===== */
const carries = (a, b) => { let c = 0, n = 0; while (a > 0 || b > 0) { const s = (a % 10) + (b % 10) + c; c = s >= 10 ? 1 : 0; n += c; a = Math.floor(a / 10); b = Math.floor(b / 10); } return n; };
const borrows = (a, b) => { let c = 0, n = 0; while (a > 0 || b > 0) { const x = (a % 10) - c, y = b % 10; c = x < y ? 1 : 0; n += c; a = Math.floor(a / 10); b = Math.floor(b / 10); } return n; };
const FRN = { 2: 'fele', 3: 'harmada', 4: 'negyede', 5: 'ötöde', 6: 'hatoda', 8: 'nyolcada', 10: 'tizede' };
const NAMES = ['Anna', 'Bence', 'Dóri', 'Máté', 'Zsófi', 'Levente', 'Hanna', 'Ádám', 'Nóra', 'Gergő'];
const PLACE = ['egyesek', 'tízesek', 'százasok', 'ezresek'];

const M4 = {
  place(L) {
    const t = pick(L === 1 ? [0, 1] : L === 2 ? [0, 1, 2] : [0, 1, 3, 3]);
    if (t === 0) {
      const n = L === 3 ? pick([ri(1000, 9999), ri(1, 9) * 1000 + ri(0, 9) * 10 + ri(0, 9)]) : ri(1000, 9999);
      const p = ri(0, 3), d = Math.floor(n / 10 ** p) % 10;
      return { type: 'input', prompt: `Melyik számjegy áll ${artOf(PLACE[p])} ${PLACE[p]} helyén ${azN(n)} ${fmt(n)} számban?`, answer: d, hint: 'Jobbról balra: egyesek, tízesek, százasok, ezresek.' };
    }
    if (t === 1) {
      const e = ri(1, 9), s = L === 1 ? ri(1, 9) : ri(0, 9), ti = L === 1 ? ri(1, 9) : ri(0, 9), eg = L === 1 ? ri(1, 9) : ri(0, 9);
      return { type: 'input', prompt: `${e} ezres, ${s} százas, ${ti} tízes és ${eg} egyes. Melyik ez a szám?`, answer: e * 1000 + s * 100 + ti * 10 + eg, hint: 'Ha egy helyiérték üres, oda 0-t írunk.' };
    }
    if (t === 2) {
      const e = ri(1, 9), s = ri(0, 9), ti = ri(0, 9), eg = ri(0, 9), n = e * 1000 + s * 100 + ti * 10 + eg;
      const parts = [e * 1000, s * 100, ti * 10, eg].filter(x => x > 0).map(fmt);
      return { type: 'input', prompt: `${parts.join(' + ')} = <span class="blank">?</span>`, answer: n };
    }
    const n = ri(1000, 9999), isT = Math.random() < .5;
    return { type: 'input', prompt: `Hány ${isT ? 'tízes' : 'százas'} van összesen ${azN(n)} ${fmt(n)} számban?`, answer: Math.floor(n / (isT ? 10 : 100)), hint: `Hány ${isT ? 'tízest' : 'százast'} tudsz kivenni a számból? Vágd le a(z) ${isT ? 'egyesek' : 'tízesek és egyesek'} helyét.` };
  },
  round(L) {
    const k = L === 1 ? 10 : L === 2 ? 100 : pick([10, 100, 1000]);
    const n = L === 1 ? ri(101, 999) : ri(1001, 9998);
    if (n % k === 0) return M4.round(L);
    const nm = { 10: 'tízesekre', 100: 'százasokra', 1000: 'ezresekre' }[k];
    return { type: 'input', prompt: `Kerekítsd ${nm}: <b>${fmt(n)}</b>`, answer: Math.round(n / k + 1e-9) * k, hint: 'Nézd meg a következő, kisebb helyiértéken álló számjegyet. Ha 5 vagy több, felfelé kerekítünk; ha kevesebb, lefelé.' };
  },
  add(L) {
    let a, b, g = 0;
    do {
      if (L === 1) { a = ri(100, 800); b = ri(100, 999 - a); } else { a = ri(1000, 7000); b = ri(1000, 9999 - a); }
    } while (g++ < 500 && !(L === 1 ? carries(a, b) === 0 : L === 2 ? carries(a, b) === 1 : carries(a, b) >= 2));
    return { type: 'input', prompt: 'Számold ki írásban!', visual: col(a, '+', b), answer: a + b, hint: 'Írd egymás alá a helyiértékeket, és jobbról balra adj össze. Ha 10 vagy több lett, a tízest vidd át a következő helyre.' };
  },
  sub(L) {
    let a, b, g = 0;
    do {
      if (L === 1) { a = ri(300, 999); b = ri(100, a - 1); } else { a = ri(2000, 9999); b = ri(1000, a - 1); }
    } while (g++ < 800 && !(L === 1 ? borrows(a, b) === 0 : L === 2 ? borrows(a, b) === 1 : borrows(a, b) >= 2));
    return { type: 'input', prompt: 'Számold ki írásban!', visual: col(a, '−', b), answer: a - b, hint: 'Jobbról balra haladunk. Az alsó számjegyet egészítsd ki a felsőre: 4 meg mennyi az 7? Ha a felső számjegy kisebb, 10-zel nagyobbra egészíts ki (4 meg mennyi az 12?), és a maradt 1-et add hozzá a következő alsó számjegyhez. Ellenőrzés: különbség + kivonandó = kisebbítendő.' };
  },
  mul(L) {
    if (L === 1) { const a = ri(3, 9), b = ri(3, 9); return { type: 'input', prompt: `${a} · ${b} = <span class="blank">?</span>`, answer: a * b, hint: `Ha nem jut eszedbe, indulj ismert szorzatból: ${a} · ${b} = ${a} · ${b - 1} + ${a}.` }; }
    if (L === 2 || Math.random() < .4) { const a = L === 2 ? ri(12, 99) : ri(101, 499), b = ri(2, 9); return { type: 'input', prompt: 'Számold ki írásban!', visual: col(a, '·', b), answer: a * b, hint: 'Szorozd meg egyesével jobbról balra a számjegyeket, és vidd át a tízest.' }; }
    const a = ri(12, 45), b = ri(11, 30); return { type: 'input', prompt: 'Számold ki írásban!', visual: col(a, '·', b), answer: a * b, hint: `Szorozz külön: ${a} · ${Math.floor(b / 10) * 10} és ${a} · ${b % 10}, aztán add össze.` };
  },
  div(L) {
    if (L === 1) { const b = ri(3, 9), q = ri(3, 10); return { type: 'input', prompt: `${b * q} : ${b} = <span class="blank">?</span>`, answer: q, hint: `Gondolj a szorzótáblára: ? · ${b} = ${b * q}.` }; }
    if (L === 2) { const b = ri(2, 9), q = ri(12, 99); return { type: 'input', prompt: `${b * q} : ${b} = <span class="blank">?</span>`, answer: q, hint: 'Bontsd tízesekre és egyesekre: osszd el külön a tízeseket, majd a maradékot.' }; }
    let a, b, qv, r, g = 0;
    do { a = ri(30, 500); b = ri(3, 9); qv = Math.floor(a / b); r = a % b; } while (r === 0 && g++ < 50);
    const askR = Math.random() < .5;
    return { type: 'input', prompt: askR ? `${a} : ${b} = ${qv} (maradék <span class="blank">?</span>)` : `${a} : ${b} = <span class="blank">?</span> (maradék ${r})`, answer: askR ? r : qv, hint: `Ellenőrzés: ${b} · hányados + maradék = ${a}. A maradék mindig kisebb, mint ${b}.` };
  },
  frac(L) {
    if (L === 1) {
      const n = pick([2, 3, 4, 5, 6, 8]), k = ri(1, n - 1), v = `${k}/${n}`;
      const wr = new Set([`${n - k}/${n}`, `${k}/${n + 1}`, `${Math.min(k + 1, n)}/${n}`, `1/${n}`, `${k}/${Math.max(2, n - 1)}`]); wr.delete(v);
      const html = x => { const [a, b] = x.split('/'); return fr(a, b); };
      return mcq('Mekkora része van befestve?', v, [...wr].slice(0, 3), { visual: pieSvg(n, k), fmt: html, answerText: html(v), hint: 'A nevező azt mutatja, hány egyenlő részre van osztva a kör, a számláló pedig azt, hány rész van befestve.' });
    }
    if (L === 2) { const n = pick([2, 3, 4, 5, 6, 8, 10]), W = n * ri(2, 10); return { type: 'input', prompt: `Mennyi ${azN(W)} ${W} ${FRN[n]}?`, answer: W / n, hint: `Oszd el ${n} egyenlő részre: ${W} : ${n} = ?` }; }
    if (Math.random() < .45) {
      const a = ri(2, 8); let b = ri(2, 8); while (b === a) b = ri(2, 8);
      const bigger = a < b ? a : b;
      return mcq(`Melyik a nagyobb: ${fr(1, a)} vagy ${fr(1, b)}?`, `1/${bigger}`, [`1/${a === bigger ? b : a}`, 'egyforma'], { fmt: v => v === 'egyforma' ? v : fr(1, v.split('/')[1]), hint: 'Minél több egyenlő részre osztunk valamit, annál kisebb egy rész.' });
    }
    const n = pick([3, 4, 5, 6, 8]), k = ri(2, n - 1), W = n * ri(2, 8);
    return { type: 'input', prompt: `Számítsd ki: ${W} ${fr(k, n)} része = <span class="blank">?</span>`, answer: (W / n) * k, hint: `Előbb keresd meg az egy részt: ${W} : ${n}. Utána szorozd meg: ${W / n} · ${k}.` };
  },
  neg(L) {
    const T = '−';
    if (L === 1) { const v = ri(-9, 9); return mcq('Melyik számot jelöli a piros pont?', v, near(v, 3, -10, 10), { visual: numLine(-10, 10, v), hint: 'A nullától balra negatív számok vannak. Minél balabbra mész, annál kisebb a szám.' }); }
    if (L === 2) {
      const s = ri(-8, 4), d = ri(2, 9), warm = Math.random() < .5, ans = warm ? s + d : s - d;
      if (ans < -15 || ans > 20) return M4.neg(2);
      return { type: 'input', neg: true, prompt: `Reggel ${fmt(s)} °C volt. Délre ${d} fokkal ${warm ? 'melegebb' : 'hidegebb'} lett. Hány °C lett?`, answer: ans, hint: 'Képzeld el a hőmérőt: melegedésnél felfelé, hűlésnél lefelé lépsz.' };
    }
    const set = new Set(); while (set.size < 4) set.add(ri(-9, 9));
    const arr = [...set], small = Math.random() < .5;
    const ans = small ? Math.min(...arr) : Math.max(...arr);
    return mcq(`Melyik a ${small ? 'legkisebb' : 'legnagyobb'} szám? ${arr.map(fmt).join(';  ')}`, ans, arr.filter(x => x !== ans), { hint: 'A negatív számok közül az a kisebb, amelyik a nullától távolabb van: ' + T + '8 < ' + T + '2.' });
  },
  units(L) {
    if (L === 1) {
      const u = pick([['m', 'cm', 100], ['km', 'm', 1000], ['kg', 'g', 1000], ['l', 'dl', 10], ['cm', 'mm', 10], ['óra', 'perc', 60], ['perc', 'másodperc', 60], ['nap', 'óra', 24], ['hét', 'nap', 7], ['dm', 'cm', 10]]);
      const n = ri(2, 9);
      return { type: 'input', prompt: `${n} ${u[0]} = <span class="blank">?</span> ${u[1]}`, answer: n * u[2], hint: `1 ${u[0]} = ${u[2]} ${u[1]}` };
    }
    const u = pick([['m', 'cm', 100, 99], ['kg', 'g', 1000, 999], ['óra', 'perc', 60, 59], ['l', 'dl', 10, 9], ['km', 'm', 1000, 999]]);
    const a = ri(1, 9), b = ri(1, u[3]);
    if (L === 2) return { type: 'input', prompt: `${a} ${u[0]} ${b} ${u[1]} = <span class="blank">?</span> ${u[1]}`, answer: a * u[2] + b, hint: `1 ${u[0]} = ${u[2]} ${u[1]}. Váltsd át az első részt, és add hozzá a másodikat.` };
    return { type: 'input', prompt: `${a * u[2] + b} ${u[1]} = ${a} ${u[0]} <span class="blank">?</span> ${u[1]}`, answer: b, hint: `Hány egész ${u[0]} van benne? ${a} ${u[0]} = ${a * u[2]} ${u[1]}. Mennyi marad?` };
  },
  area(L) {
    if (L === 1) { const a = ri(3, 12), b = ri(2, 10); return { type: 'input', prompt: 'Mennyi a téglalap kerülete? (cm)', visual: rectSvg(a, b), answer: 2 * (a + b), hint: 'A kerület az összes oldal hossza: a + b + a + b.' }; }
    if (L === 2) { const w = ri(3, 9), hh = ri(2, 6); return { type: 'input', prompt: 'Hány négyzetcentiméter a téglalap területe? (Egy kis négyzet 1 cm².)', visual: gridRect(w, hh), answer: w * hh, hint: 'Számold meg, hány kis négyzet van egy sorban, és hány sor van.' }; }
    const a = ri(6, 24), b = ri(4, 18), sq = Math.random() < .25, s = ri(5, 20);
    if (sq) return { type: 'input', prompt: `Egy négyzet oldala ${s} cm. Mennyi a kerülete? (cm)`, answer: 4 * s, hint: 'A négyzet mind a négy oldala egyenlő.' };
    const per = Math.random() < .5;
    return { type: 'input', prompt: per ? `Egy téglalap oldalai ${a} cm és ${b} cm. Mennyi a kerülete? (cm)` : `Egy téglalap oldalai ${a} cm és ${b} cm. Mennyi a területe? (cm²)`, visual: rectSvg(a, b), answer: per ? 2 * (a + b) : a * b, hint: per ? 'Kerület: az oldalak összege.' : 'Terület: a két szomszédos oldal szorzata.' };
  },
  word(L) {
    const n1 = pick(NAMES); let n2 = pick(NAMES); while (n2 === n1) n2 = pick(NAMES);
    const T1 = [
      () => { const n = ri(3, 9), p = ri(20, 90); return [`${n1} ${n} matricát vett. Egy matrica ${p} Ft. Mennyit fizetett összesen?`, n * p, 'Egy matrica ára · darabszám.']; },
      () => { const g = ri(3, 8), k = ri(6, 14); return [`${g * k} diák ${g} egyenlő csoportba áll. Hány diák van egy csoportban?`, k, 'Egyenlő részekre osztás: oszd el a diákok számát a csoportok számával.']; },
      () => { const a = ri(300, 900), b = ri(100, a - 50); return [`A boltban ${a} liter tej volt. ${b} litert eladtak. Hány liter maradt?`, a - b, 'Ami maradt = ami volt − amit eladtak.']; }
    ];
    const T2 = [
      () => { const a = ri(3, 8), p = ri(100, 400), b = ri(2, 6), q = ri(50, 300); return [`${n1} ${a} db ${p} Ft-os füzetet és ${b} db ${q} Ft-os tollat vett. Mennyibe került az egész vásárlás?`, a * p + b * q, 'Számold ki külön a füzetek és a tollak árát, aztán add össze.']; },
      () => { const a = ri(120, 400), b = ri(20, 100), c = ri(20, 100); return [`A vonaton ${a} utas ült. Az első megállóban ${b} leszállt, ${c} felszállt. Hányan ülnek most a vonaton?`, a - b + c, 'Előbb vedd le, aztán add hozzá.']; },
      () => { const l = ri(4, 9), k = ri(8, 25), s = ri(20, l * k - 10); return [`A raktárban ${l} láda alma van, ládánként ${k} kg. ${s} kg-ot elvittek. Hány kg maradt?`, l * k - s, 'Először számold ki az összes almát, aztán vond ki belőle, amit elvittek.']; }
    ];
    const T3 = [
      () => { const n = ri(20, 38), p = ri(120, 250); return [`A kiránduláson ${n} gyerek vesz részt. A buszjegy ${p} Ft. Mennyit kell fizetni összesen?`, n * p, 'Jegyár · gyerekek száma.']; },
      () => { const t = ri(5000, 9000), a = ri(1000, 2400), b = ri(500, 2000); return [`${n1} ${fmt(t)} Ft-ot gyűjtött. Vett egy könyvet ${fmt(a)} Ft-ért és egy játékot ${fmt(b)} Ft-ért. Mennyi pénze maradt?`, t - a - b, 'Add össze, amit elköltött, és vond ki az összegből a pénzét.']; },
      () => { const k = ri(4, 9), d = ri(6, 14), e = ri(3, 8); return [`${n1} és ${n2} együtt ${k} dobozba tesz matricát, dobozonként ${d} darabot. Ha ${e} matricát elajándékoznak, hány marad?`, k * d - e, 'Előbb az összes matrica, utána vond ki az elajándékozottakat.']; }
    ];
    const f = pick(L === 1 ? T1 : L === 2 ? T2 : T3), [txt, ans, hint] = f();
    return { type: 'input', prompt: txt, answer: ans, hint, key: 1 };
  },
  prob(L) {
    if (L === 1) {
      const r = ri(1, 6), b = pick([0, 0, ri(1, 5)]), color = pick(['piros', 'kék']);
      const have = color === 'piros' ? r : b, other = color === 'piros' ? b : r;
      const ans = have === 0 ? 'lehetetlen' : other === 0 ? 'biztos' : 'lehetséges, de nem biztos';
      return mcq(`Egy zsákban ${r} piros és ${b} kék golyó van. Behunyt szemmel húzunk egyet. Ez történik: <b>${color}</b> golyót húzunk. Milyen esemény ez?`, ans, ['biztos', 'lehetetlen', 'lehetséges, de nem biztos'], { fmt: v => v, hint: 'Biztos: mindig megtörténik. Lehetetlen: soha nem történhet meg. A kettő között: lehet, hogy megtörténik, lehet, hogy nem.' });
    }
    if (L === 2) {
      const it = pick([['Hatoldalú kockával dobunk. Hatost dobunk.', 'lehetséges, de nem biztos'], ['Hatoldalú kockával dobunk. Hetest dobunk.', 'lehetetlen'], ['Hatoldalú kockával dobunk. 1 és 6 közötti számot dobunk.', 'biztos'], ['Pénzt dobunk fel. Fejet kapunk.', 'lehetséges, de nem biztos'], ['Egy dobozban csak piros golyók vannak. Pirosat húzunk.', 'biztos'], ['Egy kocka lapjain 1-től 6-ig vannak számok. Nullát dobunk.', 'lehetetlen']]);
      return mcq(it[0], it[1], ['biztos', 'lehetetlen', 'lehetséges, de nem biztos'], { fmt: v => v, hint: 'Gondold végig, milyen eredmények lehetségesek.' });
    }
    const r = ri(1, 9), b = ri(1, 9), ans = r > b ? 'piros' : r < b ? 'kék' : 'egyformán valószínű';
    return mcq(`A zsákban ${r} piros és ${b} kék golyó van. Melyik színt valószínűbb kihúzni?`, ans, ['piros', 'kék', 'egyformán valószínű'], { fmt: v => v, hint: 'Abból a színből könnyebb húzni, amelyikből több golyó van.' });
  }
};
PAGES['matek-4'] = {
  id: 'matek-4', title: 'Matematika', grade: 4,
  blurb: 'Számok 10 000-ig, írásbeli műveletek, törtek, negatív számok, mértékegységek, terület. Egy kör 10 feladat.',
  topics: [
    { id: 'place', sample: '3 472', name: 'Helyi érték', desc: 'Ezresek, százasok, tízesek, egyesek.', gen: M4.place },
    { id: 'round', sample: '478 ≈ 480', name: 'Kerekítés', desc: 'Tízesekre, százasokra, ezresekre.', gen: M4.round },
    { id: 'add', sample: '2475 + 1368', name: 'Írásbeli összeadás', desc: 'Tízesátvitellel, 10 000-es számkörben.', gen: M4.add },
    { id: 'sub', sample: '5003 − 2478', name: 'Írásbeli kivonás', desc: 'Kölcsönzéssel, nullákkal is.', gen: M4.sub },
    { id: 'mul', sample: '34 · 26', name: 'Szorzás', desc: 'Szorzótábla és írásbeli szorzás.', gen: M4.mul },
    { id: 'div', sample: '47 : 5', name: 'Osztás', desc: 'Osztótábla, maradékos osztás.', gen: M4.div },
    { id: 'frac', sample: '3/4', name: 'Törtrészek', desc: 'Fele, harmada, negyede és társaik.', gen: M4.frac },
    { id: 'neg', sample: '−5 °C', name: 'Negatív számok', desc: 'Számegyenes, hőmérséklet, sorrend.', gen: M4.neg },
    { id: 'units', sample: '3 m = ? cm', name: 'Mértékegységek', desc: 'Hosszúság, tömeg, űrtartalom, idő.', gen: M4.units },
    { id: 'area', sample: 'T = a · b', name: 'Kerület és terület', desc: 'Téglalap és négyzet.', gen: M4.area },
    { id: 'word', sample: 'Anna 4 db…', name: 'Szöveges feladatok', desc: 'Egy- és többlépéses feladatok.', gen: M4.word },
    { id: 'prob', sample: 'biztos?', name: 'Valószínűség', desc: 'Biztos, lehetséges, lehetetlen; melyik valószínűbb.', gen: M4.prob }
  ]
};

/* ===== Magyar 1: betűtanulás ===== */
const ALL_G = ['a', 'm', 'e', 't', 'o', 'l', 'i', 's', 'á', 'n', 'r', 'z', 'é', 'k', 'ó', 'u', 'b', 'd', 'ö', 'p', 'g', 'h', 'j', 'f', 'ú', 'í', 'v', 'ő', 'c', 'ü', 'ű', 'sz', 'zs', 'cs', 'gy', 'ny', 'ty', 'ly', 'dz', 'dzs'];
const DEFAULT_G = ['a', 'm', 'e', 't', 'o', 'l', 'i', 's', 'á', 'n'];
const VOWELS = new Set(['a', 'á', 'e', 'é', 'i', 'í', 'o', 'ó', 'ö', 'ő', 'u', 'ú', 'ü', 'ű']);
const DIGR = ['dzs', 'dz', 'cs', 'gy', 'ly', 'ny', 'sz', 'ty', 'zs'];
const CONF = {
  b: ['d', 'p', 'h'], d: ['b', 'g', 'p'], p: ['b', 'd', 'g'], g: ['gy', 'p', 'q'], m: ['n', 'r'], n: ['m', 'r', 'h'], r: ['n', 'm'], h: ['k', 'n', 'b'], k: ['h', 'r'],
  a: ['á', 'o', 'e'], á: ['a', 'é'], e: ['é', 'a', 'o'], é: ['e', 'á'], i: ['í', 'l', 'j'], í: ['i'], o: ['ó', 'a', 'ö'], ó: ['o', 'ő'], ö: ['ő', 'o', 'ü'], ő: ['ö', 'ó', 'ű'],
  u: ['ú', 'ü', 'v'], ú: ['u', 'ű'], ü: ['ű', 'u', 'ö'], ű: ['ü', 'ú', 'ő'], l: ['i', 't', 'j'], t: ['l', 'f'], f: ['t', 'l'], j: ['i', 'l'], s: ['sz', 'z', 'zs'],
  z: ['s', 'sz', 'zs'], sz: ['s', 'z', 'cs'], zs: ['z', 's', 'cs'], c: ['cs', 'e', 'o'], cs: ['c', 'sz', 'zs'], gy: ['g', 'ny', 'ty'], ny: ['n', 'gy', 'ty'], ty: ['t', 'gy', 'ny'], ly: ['l', 'j'], v: ['u', 'b']
};
const cap = g => g[0].toUpperCase() + g.slice(1);
const tok = w => { const out = []; w = w.toLowerCase(); for (let i = 0; i < w.length;) { const d = DIGR.find(x => w.startsWith(x, i)); if (d) { out.push(d); i += d.length; } else { out.push(w[i]); i++; } } return out; };

const PICT = [
  ['alma', '🍎'], ['autó', '🚗'], ['ajtó', '🚪'], ['ágy', '🛏️'], ['béka', '🐸'], ['busz', '🚌'], ['bohóc', '🤡'], ['banán', '🍌'], ['bicikli', '🚲'],
  ['cica', '🐱'], ['citrom', '🍋'], ['cipő', '👟'], ['csiga', '🐌'], ['csillag', '⭐'], ['csésze', '☕'], ['csirke', '🐔'], ['dinnye', '🍉'], ['doboz', '📦'], ['dob', '🥁'],
  ['egér', '🐭'], ['elefánt', '🐘'], ['eper', '🍓'], ['esernyő', '☂️'], ['égő', '💡'], ['ékszer', '💍'], ['fa', '🌳'], ['fagyi', '🍦'], ['fül', '👂'], ['farkas', '🐺'],
  ['gomba', '🍄'], ['gitár', '🎸'], ['galamb', '🕊️'], ['gyertya', '🕯️'], ['gyűrű', '💍'], ['gyerek', '🧒'], ['ház', '🏠'], ['hal', '🐟'], ['hó', '❄️'], ['hold', '🌙'], ['hajó', '🚢'], ['hegy', '⛰️'],
  ['ing', '👕'], ['iskola', '🏫'], ['íj', '🏹'], ['jég', '🧊'], ['juh', '🐑'], ['kutya', '🐶'], ['kéz', '✋'], ['kacsa', '🦆'], ['kenyér', '🍞'], ['kulcs', '🔑'], ['kalap', '🎩'], ['kanál', '🥄'],
  ['labda', '⚽'], ['lámpa', '💡'], ['lepke', '🦋'], ['léggömb', '🎈'], ['ló', '🐴'], ['majom', '🐒'], ['maci', '🧸'], ['malac', '🐷'], ['méh', '🐝'], ['mókus', '🐿️'], ['mama', '👩'],
  ['nap', '☀️'], ['narancs', '🍊'], ['nadrág', '👖'], ['nő', '👩'], ['nyúl', '🐰'], ['nyuszi', '🐇'], ['orr', '👃'], ['olló', '✂️'], ['oroszlán', '🦁'], ['óra', '🕐'], ['ökör', '🐂'], ['ősz', '🍂'], ['őz', '🦌'],
  ['pók', '🕷️'], ['paprika', '🫑'], ['pizza', '🍕'], ['pillangó', '🦋'], ['róka', '🦊'], ['rák', '🦀'], ['repülő', '✈️'], ['ruha', '👗'], ['sapka', '🧢'], ['sün', '🦔'], ['sajt', '🧀'], ['sál', '🧣'], ['sárkány', '🐉'],
  ['szív', '❤️'], ['szék', '🪑'], ['szemüveg', '👓'], ['szőlő', '🍇'], ['tehén', '🐄'], ['tigris', '🐯'], ['tojás', '🥚'], ['torta', '🎂'], ['tök', '🎃'], ['tea', '🍵'], ['tűz', '🔥'], ['tyúk', '🐔'],
  ['uszoda', '🏊'], ['ujj', '☝️'], ['uborka', '🥒'], ['út', '🛣️'], ['újság', '📰'], ['üveg', '🍾'], ['űrhajó', '🚀'], ['vonat', '🚆'], ['víz', '💧'], ['virág', '🌸'], ['vár', '🏰'], ['veréb', '🐦'],
  ['zebra', '🦓'], ['zokni', '🧦'], ['zászló', '🚩'], ['zsiráf', '🦒']
];
const READ_EXTRA = ['ima', 'atom', 'malom', 'motel', 'mese', 'ital', 'most', 'este', 'sima', 'tele', 'olaj', 'tollas', 'asztal', 'anya', 'apa', 'ami', 'oda', 'ide', 'ez', 'az', 'is', 'itt', 'ott', 'nem', 'igen', 'rés', 'rizs', 'retek', 'perec', 'pad', 'dal', 'disznó', 'bokor', 'bors', 'cukor', 'dió', 'fej', 'fák', 'hős', 'kés', 'lúd', 'rét', 'szó', 'tó', 'utca', 'zöld'];
const WORDS = [...new Set([...PICT.map(p => p[0]), ...READ_EXTRA])];

const Lset = () => new Set(window.LETTERS_OVERRIDE || store.get('tt.letters', DEFAULT_G));
const okTok = (w, L) => tok(w).every(g => L.has(g));
const consOn = L => [...L].filter(g => !VOWELS.has(g) && g !== 'ly' && g !== 'dz' && g !== 'dzs');
const vowOn = L => [...L].filter(g => VOWELS.has(g));
const needLetters = n => () => Lset().size < n ? `Jelölj be legalább ${n} betűt a szülői beállításban.` : null;
const needSyl = () => { const L = Lset(); return consOn(L).length < 1 || vowOn(L).length < 1 ? 'Kell legalább egy magánhangzó és egy mássalhangzó.' : null; };
const disp = (g, up) => up ? cap(g) : g;

function distract(letter, pool, k) {
  const sim = (CONF[letter] || []).filter(x => pool.includes(x));
  const rest = shuffle(pool.filter(x => x !== letter && !sim.includes(x)));
  return [...shuffle(sim), ...rest].slice(0, k);
}
function makeSyl(L, kind) {
  const C = consOn(L), V = vowOn(L);
  const c = () => pick(C), v = () => pick(V);
  const parts = kind === 'cv' ? [c(), v()] : kind === 'vc' ? [v(), c()] : [c(), v(), c()];
  return parts;
}

const MG = {
  find(L) {
    const set = Lset(), pool = [...set], target = pick(pool);
    const nT = L === 1 ? 3 : L === 2 ? 4 : 5;
    const fillers = distract(target, pool, 6);
    const cells = [];
    for (let i = 0; i < nT; i++) cells.push({ g: target, t: true });
    while (cells.length < 12) cells.push({ g: pick(fillers), t: false });
    const arr = shuffle(cells).map(c => ({ ...c, up: L >= 2 && Math.random() < .35 }));
    return {
      type: 'find', prompt: `Koppints az összes <span class="blank">${target}</span> betűre!`, target,
      cells: arr.map(c => disp(c.g, c.up)), targets: arr.map((c, i) => c.t ? i : -1).filter(i => i >= 0),
      answerText: `${nT} db „${target}” betű (zölddel jelöltem őket, narancs: ami kimaradt vagy tévedés)`,
      hint: `Keresd a ${target} betűt. Nagy és kis betű is lehet: ${cap(target)} és ${target}.`
    };
  },
  first(L) {
    const set = Lset(), pool = PICT.filter(([w]) => set.has(tok(w)[0]));
    const [w, em] = pick(pool), g = tok(w)[0], gl = [...set];
    const up = L >= 2;
    const wrongs = distract(g, gl, L === 1 ? 2 : 3);
    return mcq('Melyik betűvel kezdődik a kép neve?', g, wrongs, {
      visual: `<div class="big-emoji" role="img" aria-label="kép">${em}</div>`, fmt: v => disp(v, up),
      say: w, autoSpeak: false, explain: `A kép neve: <b>${w}</b>.`,
      hint: 'Mondd ki magadban a szót, és figyeld meg, mivel kezdődik.'
    });
  },
  hear(L) {
    const set = Lset(), C = consOn(set), V = vowOn(set);
    const kind = L === 1 ? 'cv' : L === 2 ? pick(['cv', 'vc']) : pick(['cvc', 'cv']);
    const t = makeSyl(set, kind), target = t.join('');
    const opts = new Set([target]);
    let g = 0;
    while (opts.size < (L === 1 ? 3 : 4) && g++ < 60) {
      const p = t.slice(); const i = Math.floor(Math.random() * p.length);
      const isV = VOWELS.has(p[i]); p[i] = pick(isV ? V : C); opts.add(p.join(''));
    }
    return {
      type: 'choice', prompt: 'Mit mondtam? Hallgasd meg, és válaszd ki!', answer: target, say: target, autoSpeak: true,
      options: shuffle([...opts]).map(v => ({ value: v, html: v })), hint: 'Nyomd meg újra a hangszóró gombot, és figyeld az első hangot.'
    };
  },
  read(L) {
    const set = Lset();
    let text;
    const ws = WORDS.filter(w => okTok(w, set));
    const long = ws.filter(w => tok(w).length >= 5), short = ws.filter(w => tok(w).length <= 4);
    if (L === 1 || !ws.length) text = makeSyl(set, L === 3 ? 'cvc' : 'cv').join('');
    else if (L === 2) text = pick(short.length ? short : ws);
    else text = pick(long.length ? long : ws);
    return { type: 'read', prompt: 'Olvasd el hangosan!', text, say: text, hint: 'Olvasd betűről betűre, aztán kösd össze: m–a → ma.' };
  },
  accent(L) {
    const set = Lset(), pool = PICT.filter(([w]) => okTok(w, set) && /[áéíóöőúüű]/.test(w));
    const [w, em] = pick(pool);
    const PL = { á: 'a', é: 'e', í: 'i', ó: 'o', ő: 'ö', ú: 'u', ű: 'ü' };
    const vars = new Set();
    for (let i = 0; i < w.length; i++) if (PL[w[i]]) vars.add(w.slice(0, i) + PL[w[i]] + w.slice(i + 1));
    if (w.includes('ö') || w.includes('ü')) for (let i = 0; i < w.length; i++) { const m = { ö: 'ő', ü: 'ű' }[w[i]]; if (m) vars.add(w.slice(0, i) + m + w.slice(i + 1)); }
    const wr = shuffle([...vars].filter(x => x !== w)).slice(0, L === 1 ? 1 : 2);
    return mcq('Melyik a helyes írás?', w, wr, {
      visual: `<div class="big-emoji" role="img" aria-label="kép">${em}</div>`, fmt: v => v, say: w,
      hint: 'Figyelj a hosszú és a rövid magánhangzókra: o és ó, ö és ő, u és ú, ü és ű. A hosszú betűn ékezet van.'
    });
  },
  build(L) {
    const set = Lset(), pool = PICT.filter(([w]) => okTok(w, set));
    const want = L === 1 ? [3, 4] : L === 2 ? [4, 5] : [5, 9];
    const good = pool.filter(([w]) => { const n = tok(w).length; return n >= want[0] && n <= want[1]; });
    const [w, em] = pick(good.length ? good : pool), tk = tok(w);
    const tiles = tk.slice();
    if (L === 3) { const d = distract(pick(tk), [...set], 1)[0]; if (d) tiles.push(d); }
    return { type: 'build', prompt: 'Rakd ki a szót a képhez!', visual: `<div class="big-emoji" role="img" aria-label="kép">${em}</div>`, answer: tk, tiles: shuffle(tiles), say: w, explain: `A szó: <b>${w}</b>.`, hint: 'Mondd ki lassan a kép nevét, és keresd az első hangot, aztán a következőt.' };
  }
};

function letterSettings(rerender) {
  const set = Lset();
  const save = arr => { store.set('tt.letters', arr); openSettings = true; rerender(); };
  const wrap = h('details', { class: 'panel' });
  if (openSettings) wrap.open = true;
  wrap.addEventListener('toggle', () => { openSettings = wrap.open; });
  wrap.append(h('summary', { style: 'cursor:pointer;font:600 20px var(--f-disp)' }, `Szülői beállítás: tanult betűk (${set.size} bejelölve)`));
  const row = h('div', { class: 'chips' });
  ALL_G.forEach(g => row.append(h('button', {
    class: 'chip letter', 'aria-pressed': set.has(g) ? 'true' : 'false',
    onclick: () => { const n = new Set(set); n.has(g) ? n.delete(g) : n.add(g); save(ALL_G.filter(x => n.has(x))); }
  }, `${cap(g)} ${g}`)));
  const presets = h('div', { class: 'chips' },
    h('button', { class: 'btn small', onclick: () => save(ALL_G.slice(0, 8)) }, 'Első 8 betű'),
    h('button', { class: 'btn small', onclick: () => save(ALL_G.slice(0, 16)) }, 'Első 16 betű'),
    h('button', { class: 'btn small', onclick: () => save(ALL_G.slice(0, 31)) }, 'Minden egyjegyű betű'),
    h('button', { class: 'btn small', onclick: () => save(ALL_G.slice()) }, 'Mind'));
  wrap.append(
    h('p', { class: 'mute', style: 'margin-top:8px' }, 'A feladatok csak a bejelölt betűket használják, így a gyerek csak olyat gyakorol, amit az osztály már tanult. A sorrend egy gyakori ABC-s tanmenetet követ; jelöld be a saját tankönyvéhez igazodva.'),
    row, presets);
  return wrap;
}
let openSettings = false;

PAGES['magyar-1'] = {
  id: 'magyar-1', title: 'Magyar', grade: 1,
  blurb: 'Betűk, hangok, szótagok és szavak olvasása. Egy kör 10 feladat. A „Hangosan” feladatnál a gép meghallgatja az olvasást (Chrome vagy Edge böngészőben).',
  settings: letterSettings, speakOpts: false,
  topics: [
    { id: 'find', sample: 'm n <b>m</b> r', name: 'Betűvadászat', desc: 'Keresd meg az összes egyforma betűt.', gen: MG.find, unavailable: needLetters(4) },
    { id: 'first', sample: '🍎 → ?', name: 'Mivel kezdődik?', desc: 'Képről a kezdőbetű.', gen: MG.first, unavailable: () => needLetters(4)() || (PICT.filter(([w]) => Lset().has(tok(w)[0])).length < 2 ? 'Több tanult betű kell, hogy legyen elég kép.' : null) },
    { id: 'hear', sample: 'ma · me · mi', name: 'Hallgasd és válaszd', desc: 'Szótagot hallasz, a leírt alakot választod.', gen: MG.hear, unavailable: () => !canSpeak() ? 'Ehhez magyar hang kell. Ezen az eszközön nem találtam.' : (needLetters(4)() || needSyl()) },
    { id: 'read', sample: 'ma-ma', name: 'Olvasd hangosan', desc: 'Szótagok és szavak, mikrofonos ellenőrzéssel.', gen: MG.read, unavailable: needSyl },
    { id: 'build', sample: 'a l m a', name: 'Szóépítés', desc: 'Rakd ki betűkből a kép nevét.', gen: MG.build, unavailable: () => PICT.filter(([w]) => okTok(w, Lset())).length < 3 ? 'Több tanult betű kell, hogy legyen elég szó.' : null },
    { id: 'accent', sample: 'o ó  ö ő', name: 'Hosszú vagy rövid?', desc: 'Melyik a helyes írásmód?', gen: MG.accent, unavailable: () => PICT.filter(([w]) => okTok(w, Lset()) && /[áéíóöőúüű]/.test(w)).length < 2 ? 'Kellenek hosszú magánhangzók (á, é, ó, ő, ú, ű) a tanult betűk között.' : null }
  ]
};

/* ===== Magyar 2: ábécé, szótagolás, helyesírás alapjai, szövegértés ===== */
const HYPH2 = ['al-ma', 'ma-ci', 'ku-tya', 'lab-da', 'sap-ka', 'tor-ta', 'ró-ka', 'mó-kus', 'ka-lap', 'ke-nyér', 'e-gér', 'tü-kör', 'vi-rág', 'ma-dár', 'fe-hér',
  'u-bor-ka', 'pa-ra-di-csom', 'cse-resz-nye', 'tás-ka', 'ka-rá-csony', 'ce-ru-za', 'te-le-fon', 'hű-tő', 'ab-lak', 'csi-ga', 'ba-rát', 'fü-zet', 'is-ko-la',
  'gom-ba', 'er-dő', 'pil-lan-gó', 'nyu-szi', 'bo-szor-kány', 'do-boz', 'bé-ka', 'ci-pő', 'sze-mü-veg', 'fa-gyi', 'ka-csa', 'zseb-lám-pa', 've-réb', 'ha-jó', 'pa-pír', 'mo-zi', 'fo-lyó'];
const ONESYL = ['ház', 'kert', 'tó', 'fa', 'hó', 'nap', 'kéz', 'szék', 'toll', 'kör', 'hal', 'jég', 'tej', 'sajt', 'pad', 'kés', 'sün', 'ló', 'fül', 'fej'];
const LONGV = { a: 'á', e: 'é', i: 'í', o: 'ó', ö: 'ő', u: 'ú', ü: 'ű' }, SHORTV = Object.fromEntries(Object.entries(LONGV).map(([a, b]) => [b, a]));
const DBL = ['to[ll]', 'o[ll]ó', 'o[rr]', 'u[jj]', 'csi[ll]ag', 'pi[ll]angó', 'ke[tt]ő', 'sza[pp]an', 'kaku[kk]', 'ma[kk]', 'i[tt]', 'o[tt]', 'te[ss]ék', 'vi[ll]a', 'nu[ll]a', 'pi[zz]a', 'sa[kk]',
  'a[p]a', 'ma[m]a', 'ka[l]ap', 'ka[p]u', 'ó[r]a', 'ze[n]e', 'ke[r]ék', 'ma[d]ár', 'fa[z]ék', 'csi[g]a', 'ebé[d]', 'tü[k]ör', 'ce[r]uza', 'ba[n]án', 'ka[b]át', 'ha[t]', 'ko[c]ka', 'bi[c]ikli', 'ki[l]ó', 'gu[m]i'];
const JLY2 = [['király', 'ly'], ['hely', 'ly'], ['golyó', 'ly'], ['lyuk', 'ly'], ['bagoly', 'ly'], ['gólya', 'ly'], ['folyó', 'ly'], ['pálya', 'ly'], ['mély', 'ly'],
  ['jég', 'j'], ['játék', 'j'], ['ajtó', 'j'], ['fej', 'j'], ['tej', 'j'], ['hajó', 'j'], ['majom', 'j'], ['sajt', 'j'], ['olaj', 'j'], ['tojás', 'j'], ['jó', 'j'], ['fejsze', 'j'], ['vaj', 'j']];
const CAPS2 = ['Péter focizik az udvaron.', 'Anna a Balatonnál nyaralt.', 'A kutyánk neve Bodri.', 'Szegeden lakik a nagymamám.', 'Holnap Budapestre utazunk.',
  'Zsófi és Máté együtt rajzol.', 'A Duna nagyon széles folyó.', 'Cirmi a kanapén alszik.', 'Nóra levelet ír Ádámnak.', 'Nyáron a Tiszán csónakáztunk.'];
const PUNCT2 = {
  '.': ['Ma szép idő van.', 'A cica tejet iszik.', 'Apa autót szerel.', 'Az iskola nyolckor kezdődik.', 'A fán három madár ül.'],
  '?': ['Hol van a táskám?', 'Mit eszünk ebédre?', 'Ki jön velem játszani?', 'Mikor indul a vonat?', 'Hány éves vagy?'],
  '!': ['Jaj, de fáj!', 'De jó, itt a nyár!', 'Csukd be az ajtót!', 'Moss kezet!', 'Milyen szép ez a kép!', 'Siess, mert elkésünk!']
};
const GROUPS = {
  gyümölcsök: ['alma', 'körte', 'szilva', 'barack', 'szőlő', 'eper', 'cseresznye', 'banán'],
  zöldségek: ['répa', 'krumpli', 'paprika', 'paradicsom', 'uborka', 'hagyma', 'káposzta', 'borsó'],
  állatok: ['kutya', 'macska', 'ló', 'tehén', 'nyúl', 'róka', 'medve', 'béka'],
  járművek: ['autó', 'busz', 'vonat', 'bicikli', 'hajó', 'repülő', 'villamos', 'traktor'],
  színek: ['piros', 'kék', 'zöld', 'sárga', 'fehér', 'fekete', 'lila', 'barna'],
  ruhadarabok: ['ing', 'nadrág', 'szoknya', 'kabát', 'sapka', 'sál', 'zokni', 'pulóver'],
  bútorok: ['asztal', 'szék', 'ágy', 'szekrény', 'polc', 'kanapé'],
  hangszerek: ['dob', 'gitár', 'hegedű', 'furulya', 'zongora', 'trombita']
};
const COMP2 = [
  { t: 'Peti kapott egy kiskutyát. A kutya neve Morzsa. Morzsa nagyon szeret labdázni.', q: [['Hogy hívják a kiskutyát?', 'Morzsa.', ['Peti.', 'Bodri.']], ['Mit szeret Morzsa?', 'Labdázni.', ['Aludni.', 'Úszni.']]] },
  { t: 'Ma esik az eső. Lili felveszi a sárga esőkabátját és a piros csizmáját. Így nem ázik meg.', q: [['Milyen színű Lili esőkabátja?', 'Sárga.', ['Piros.', 'Kék.']], ['Miért veszi fel Lili az esőkabátot?', 'Mert esik az eső.', ['Mert hideg van.', 'Mert új.']]] },
  { t: 'A nagymama almás pitét sütött. Bence és Zsófi segítettek neki. Bence hámozta az almát, Zsófi pedig a tésztát gyúrta.', q: [['Mit sütött a nagymama?', 'Almás pitét.', ['Kakaós csigát.', 'Túrós rétest.']], ['Ki gyúrta a tésztát?', 'Zsófi.', ['Bence.', 'A nagymama.']]] },
  { t: 'Az erdőben élt egy kis sün. Nappal egy bokor alatt aludt, éjszaka pedig bogarakat keresett. Ősszel levelekből puha fészket épített.', q: [['Mikor aludt a sün?', 'Nappal.', ['Éjszaka.', 'Soha.']], ['Miből épített fészket a sün?', 'Levelekből.', ['Ágakból.', 'Tollakból.']]] },
  { t: 'Hétfőn úszni megyünk, szerdán focizunk, pénteken pedig zeneiskolába járok. Szombaton pihenünk.', q: [['Mit csinálunk szerdán?', 'Focizunk.', ['Úszunk.', 'Pihenünk.']], ['Melyik napon pihenünk?', 'Szombaton.', ['Hétfőn.', 'Pénteken.']]] },
  { t: 'Máté a vonatablakból nézte a tájat. Látott teheneket, egy nagy folyót és egy magas templomtornyot. A vonat délben ért Debrecenbe.', q: [['Honnan nézte Máté a tájat?', 'A vonatablakból.', ['Az autóból.', 'A buszból.']], ['Mikor ért a vonat Debrecenbe?', 'Délben.', ['Reggel.', 'Este.']]] }
];
function hyphChoice(w) {
  const plain = w.replace(/-/g, ''), syls = w.split('-'), tk = tok(plain), bounds = [];
  syls.reduce((a, x) => { a += tok(x).length; bounds.push(a); return a; }, 0); bounds.pop();
  const join = set => tk.map((g, i) => (set.has(i) ? '-' : '') + g).join('');
  const corr = join(new Set(bounds)), k = bounds.length, cands = Array.from({ length: tk.length - 1 }, (_, i) => i + 1), wrongs = new Set(); let g = 0;
  while (wrongs.size < 2 && g++ < 80) { const set = new Set(shuffle(cands).slice(0, k)); const j = join(set); if (j !== corr) wrongs.add(j); }
  return mcq(`Hogyan választjuk el ezt a szót: <b>${plain}</b>?`, corr, [...wrongs], { fmt: v => v, hint: 'Egy magánhangzó egy szótag. Két magánhangzó között egy mássalhangzó a következő szótagba kerül (ma-ci); ha kettő van, az egyik marad, a másik átmegy (lab-da). A kétjegyű betűket (cs, sz, ny…) nem vágjuk ketté.' });
}
const emojiVis = em => `<div class="big-emoji" role="img" aria-label="kép">${em}</div>`;
const gapAt = (w, i, n = 1) => w.slice(0, i) + '<span class="blank">…</span>' + w.slice(i + n);

const MG2 = {
  abc(L) {
    if (L === 3) return M4G.abc(1);
    const i = L === 1 ? ri(0, ABC.length - 2) : ri(1, ABC.length - 1), x = ABC[i], ans = ABC[L === 1 ? i + 1 : i - 1];
    const wr = shuffle(ABC.filter(c => c !== ans && c !== x)).slice(0, 2);
    const near = ABC[L === 1 ? i + 2 : i - 2]; if (near && near !== ans && !wr.includes(near)) wr[0] = near;
    return mcq(`Melyik betű áll ${L === 1 ? 'közvetlenül utána' : 'közvetlenül előtte'} az ábécében: <b>${x}</b>?`, ans, wr, { fmt: v => v, hint: 'Az ábécé: a, á, b, c, cs, d, dz, dzs, e, é, f, g, gy, h, i, í, j, k, l, ly, m, n, ny, o, ó, ö, ő, p, q, r, s, sz, t, ty, u, ú, ü, ű, v, w, x, y, z, zs.' });
  },
  syl(L) {
    if (L === 1) { const w = pick(HYPH2); return { type: 'input', prompt: `Hány szótagú ez a szó: <b>${w.replace(/-/g, '')}</b>?`, answer: w.split('-').length, hint: 'Ahány magánhangzó, annyi szótag. Tapsold el a szót!' }; }
    if (L === 2) return hyphChoice(pick(HYPH2.filter(w => w.includes('-'))));
    const one = pick(ONESYL), more = shuffle(HYPH2).slice(0, 3).map(w => w.replace(/-/g, ''));
    return mcq('Melyik szót nem lehet elválasztani?', one, more, { fmt: v => v, hint: 'Az egy szótagú szavakat nem lehet elválasztani. Keresd azt, amelyikben csak egy magánhangzó van!' });
  },
  vowel(L) {
    if (L === 3) {
      const pool = PICT.filter(([w]) => /[áéíóőúű]/.test(w)), [w, em] = pick(pool), vars = new Set();
      for (let i = 0; i < w.length; i++) { const o = SHORTV[w[i]] || LONGV[w[i]]; if (o) vars.add(w.slice(0, i) + o + w.slice(i + 1)); }
      vars.delete(w);
      return mcq('Melyik a helyes írás?', w, shuffle([...vars]).slice(0, 2), { visual: emojiVis(em), fmt: v => v, say: w, hint: 'Mondd ki lassan, és figyeld, melyik hang hosszú. A hosszú magánhangzón ékezet van: á, é, í, ó, ő, ú, ű.' });
    }
    const pool = PICT.filter(([w]) => [...w].some((c, i) => (LONGV[c] || SHORTV[c]) && (i < w.length - 1 || SHORTV[c])) && (L === 2 || w.length <= 5));
    const [w, em] = pick(pool), idx = [...w].map((c, i) => (LONGV[c] || SHORTV[c]) && (i < w.length - 1 || SHORTV[c]) ? i : -1).filter(i => i >= 0);
    const long = idx.filter(i => SHORTV[w[i]]), i = long.length && Math.random() < .6 ? pick(long) : pick(idx), c = w[i];
    const short = LONGV[c] ? c : SHORTV[c], lng = LONGV[c] || c;
    return { type: 'choice', prompt: `Melyik betű hiányzik? <b>${gapAt(w, i)}</b>`, visual: emojiVis(em), answer: c, options: [{ value: short, html: short }, { value: lng, html: lng }], say: w, explain: `Helyesen: <b>${w}</b>.`, hint: 'Mondd ki a kép nevét lassan. Ha a hang hosszan szól, ékezetes betű kell: o – ó, u – ú, ö – ő, ü – ű.' };
  },
  double(L) {
    const raw = pick(DBL), m = raw.match(/\[(.+?)\]/), ans = m[1], word = raw.replace(/[[\]]/g, '');
    const alt = ans.length === 2 ? ans[0] : ans + ans, i = raw.indexOf('[');
    return mcq(`Melyik hiányzik? <b>${gapAt(word, i, ans.length)}</b>`, ans, [alt], { fmt: v => v, say: word, explain: `Helyesen: <b>${word}</b>.`, hint: 'Mondd ki a szót lassan. Ha a mássalhangzó hosszan szól, két betűvel írjuk: toll, olló, orr.' });
  },
  jly(L) {
    const [w, a] = pick(JLY2), i = w.indexOf(a);
    return mcq(`Melyik betű hiányzik? <b>${gapAt(w, i, a.length)}</b>`, a, [a === 'j' ? 'ly' : 'j'], { fmt: v => v, explain: `Helyesen: <b>${w}</b>.`, hint: 'A j és az ly ugyanúgy hangzik. Hogy melyik kell, azt a szóval együtt kell megjegyezni.' });
  },
  caps(L) {
    const s = pick(CAPS2), ws = s.split(' '), vars = new Set();
    vars.add(ws[0][0].toLowerCase() + s.slice(1));
    const names = ws.map((w, i) => i > 0 && /^[A-ZÁÉÍÓÖŐÚÜŰ]/.test(w) ? i : -1).filter(i => i > 0);
    if (names.length) { const k = pick(names), c = ws.slice(); c[k] = c[k][0].toLowerCase() + c[k].slice(1); vars.add(c.join(' ')); }
    const commons = ws.map((w, i) => i > 0 && /^[a-záéíóöőúüű]{3,}/.test(w) ? i : -1).filter(i => i > 0);
    if (commons.length) { const k = pick(commons), c = ws.slice(); c[k] = c[k][0].toUpperCase() + c[k].slice(1); vars.add(c.join(' ')); }
    vars.delete(s);
    return mcq('Melyik mondat van helyesen leírva?', s, shuffle([...vars]).slice(0, L === 1 ? 1 : 2), { fmt: v => v, hint: 'A mondat első szavát és a neveket (embereket, állatokat, városokat, folyókat) nagy kezdőbetűvel írjuk.' });
  },
  punct(L) {
    const marks = L === 1 ? ['.', '?'] : ['.', '?', '!'], m = pick(marks), s = pick(PUNCT2[m]);
    return { type: 'choice', prompt: `Milyen írásjel kell a mondat végére?<br><b>${s.slice(0, -1)}</b><span class="blank">…</span>`, answer: m, options: marks.map(v => ({ value: v, html: `<span style="font-size:1.4em">${v}</span>` })), answerText: m, hint: 'Pont: kijelentő mondat. Kérdőjel: kérdés. Felkiáltójel: erős érzés vagy kérés, parancs.' };
  },
  group(L) {
    const keys = Object.keys(GROUPS), A = pick(keys);
    const B = L === 3 && (A === 'gyümölcsök' || A === 'zöldségek') ? (A === 'gyümölcsök' ? 'zöldségek' : 'gyümölcsök') : pick(keys.filter(k => k !== A));
    const odd = pick(GROUPS[B]), same = shuffle(GROUPS[A]).slice(0, L === 1 ? 2 : 3);
    return mcq('Melyik szó nem illik a többi közé?', odd, same, { fmt: v => v, explain: `A többi szó: ${A}.`, hint: 'Keresd meg, mi a közös a szavak többségében. Amelyik kilóg, az a megoldás.' });
  },
  meaning(L) { return M4G.meaning(L === 3 ? 2 : 1); },
  letters(L) {
    const ok = WORDS.filter(w => !/(ssz|tty|ggy|nny|lly|zzs|ccs|ddz|dzs)/.test(w));
    const dg = w => tok(w).filter(g => g.length > 1).length;
    const pool = ok.filter(w => L === 1 ? dg(w) === 0 && tok(w).length <= 5 : L === 2 ? dg(w) === 1 : dg(w) >= 1 && tok(w).length >= 5);
    const w = pick(pool.length ? pool : ok);
    return { type: 'input', prompt: `Hány betűből áll ez a szó: <b>${w}</b>?`, answer: tok(w).length, explain: `${tok(w).join(' · ')}`, hint: 'A kétjegyű betűk (cs, dz, gy, ly, ny, sz, ty, zs) egy betűnek számítanak, és a dzs is egy betű.' };
  },
  comp(L) {
    const t = pick(COMP2), [q, a, wr] = t.q[L === 1 ? 0 : L === 3 ? 1 : ri(0, 1)];
    return { ...mcq('Olvasd el figyelmesen, és válaszolj!', a, wr, { fmt: v => v, visual: `<div><div class="passage">${t.t}</div><div class="qline">${q}</div></div>`, hint: 'Olvasd el a szöveget még egyszer, és keresd meg benne a választ.' }), key: undefined };
  }
};
PAGES['magyar-2'] = {
  id: 'magyar-2', title: 'Magyar', grade: 2,
  blurb: 'Ábécé, szótagolás, hosszú és rövid hangok, j és ly, nagy kezdőbetű, írásjelek, szövegértés. Egy kör 10 feladat.',
  topics: [
    { id: 'abc', sample: 'a á b c', name: 'Az ábécé', desc: 'Melyik betű jön utána, melyik előtte?', gen: MG2.abc },
    { id: 'syl', sample: 'ku-tya', name: 'Szótagolás', desc: 'Szótagok száma, elválasztás.', gen: MG2.syl },
    { id: 'vowel', sample: 'o – ó', name: 'Hosszú és rövid magánhangzók', desc: 'Képes szavak: melyik betű hiányzik?', gen: MG2.vowel },
    { id: 'double', sample: 'to<b>ll</b>', name: 'Hosszú mássalhangzók', desc: 'Egy vagy két betű? toll, olló, orr.', gen: MG2.double },
    { id: 'jly', sample: 'j / ly', name: 'j vagy ly?', desc: 'Gyakori szavak helyesírása.', gen: MG2.jly },
    { id: 'caps', sample: 'Anna · Duna', name: 'Nagy kezdőbetű', desc: 'Mondatkezdés és nevek.', gen: MG2.caps },
    { id: 'punct', sample: '. ? !', name: 'Írásjelek', desc: 'Milyen jel kerül a mondat végére?', gen: MG2.punct },
    { id: 'group', sample: 'alma · körte · busz', name: 'Melyik nem illik?', desc: 'Szavak csoportosítása.', gen: MG2.group },
    { id: 'meaning', sample: 'nagy ↔ kicsi', name: 'Szavak jelentése', desc: 'Ellentétes és hasonló jelentésű szavak.', gen: MG2.meaning },
    { id: 'letters', sample: 'sz-i-l-v-a', name: 'Hány betű?', desc: 'Betűk számlálása, kétjegyű betűkkel.', gen: MG2.letters },
    { id: 'comp', sample: '📖', name: 'Szövegértés', desc: 'Rövid szöveg, kérdések.', gen: MG2.comp }
  ]
};

/* ===== Magyar 3: betűrend, szófajok, helyesírás, szövegértés ===== */
const POS = {
  'főnév': ['asztal', 'kutya', 'iskola', 'ceruza', 'virág', 'ház', 'könyv', 'labda', 'felhő', 'alma', 'madár', 'erdő', 'barát', 'autó', 'tenger', 'vonat', 'cica', 'kert'],
  'ige': ['fut', 'olvas', 'énekel', 'alszik', 'játszik', 'eszik', 'iszik', 'rajzol', 'ugrik', 'főz', 'úszik', 'számol', 'táncol', 'sétál', 'épít', 'mosolyog'],
  'melléknév': ['piros', 'nagy', 'kicsi', 'szép', 'gyors', 'okos', 'édes', 'hideg', 'meleg', 'vidám', 'magas', 'puha', 'kerek', 'hosszú', 'fényes', 'bátor'],
  'számnév': ['három', 'öt', 'tíz', 'kettő', 'száz', 'négy', 'nyolc', 'ezer', 'sok', 'kevés', 'első', 'második']
};
const PROPER = [['duna', 'folyó'], ['tisza', 'folyó'], ['balaton', 'tó'], ['budapest', 'város'], ['szeged', 'város'], ['debrecen', 'város'], ['mátra', 'hegy'],
  ['bodri', 'kutya'], ['cirmi', 'macska'], ['anna', 'lány'], ['péter', 'fiú'], ['magyarország', 'ország'], ['eger', 'város'], ['kati', 'barát']];
const COMMON3 = ['folyó', 'tó', 'város', 'hegy', 'kutya', 'macska', 'lány', 'fiú', 'ország', 'iskola', 'utca', 'erdő', 'falu', 'barát'];
const HOL = [
  ['kertben', 'kertbe', 'kertből', 'p'], ['erdőben', 'erdőbe', 'erdőből', 'p'], ['iskolában', 'iskolába', 'iskolából', 'p'], ['szobában', 'szobába', 'szobából', 'p'],
  ['boltban', 'boltba', 'boltból', 'p'], ['házban', 'házba', 'házból', 'p'], ['konyhában', 'konyhába', 'konyhából', 'p'],
  ['dobozban', 'dobozba', 'dobozból', 't'], ['táskában', 'táskába', 'táskából', 't'], ['fiókban', 'fiókba', 'fiókból', 't'], ['kosárban', 'kosárba', 'kosárból', 't'], ['zsebben', 'zsebbe', 'zsebből', 't'],
  ['vízben', 'vízbe', 'vízből', 'f'], ['tóban', 'tóba', 'tóból', 'f']];
const HOL_T = {
  p: ['Anna {a} {x} van.', 'Anna {a} {x} megy.', 'Anna {a} {x} jön.'],
  t: ['A kulcs {a} {x} van.', 'A kulcsot {a} {x} teszem.', 'A kulcsot {a} {x} veszem ki.'],
  f: ['A béka {a} {x} ül.', 'A béka {a} {x} ugrik.', 'A béka {a} {x} ugrik ki.']
};
const PLUR = [['alma', 'almák'], ['kutya', 'kutyák'], ['ház', 'házak'], ['kert', 'kertek'], ['toll', 'tollak'], ['könyv', 'könyvek'], ['virág', 'virágok'], ['madár', 'madarak'],
  ['kenyér', 'kenyerek'], ['fa', 'fák'], ['ló', 'lovak'], ['tó', 'tavak'], ['kő', 'kövek'], ['füzet', 'füzetek'], ['gyerek', 'gyerekek'], ['ablak', 'ablakok'], ['asztal', 'asztalok'],
  ['szék', 'székek'], ['tükör', 'tükrök'], ['bokor', 'bokrok'], ['cica', 'cicák'], ['sapka', 'sapkák'], ['hajó', 'hajók'], ['autó', 'autók'], ['levél', 'levelek'], ['tehén', 'tehenek'], ['egér', 'egerek'], ['majom', 'majmok']];
const COMP3 = [
  { t: 'A kirándulás reggel nyolckor indult az iskola elől. A busz egy órát utazott a hegyekig. Ott a gyerekek felmásztak a kilátóba, ahonnan az egész völgyet látták. Délután háromra értek vissza.', q: [['Honnan indult a kirándulás?', 'Az iskola elől.', ['A vasútállomásról.', 'A templom elől.']], ['Mennyi ideig utazott a busz a hegyekig?', 'Egy órát.', ['Két órát.', 'Fél órát.']]] },
  { t: 'A gólyák tavasszal érkeznek vissza Afrikából. A fészküket gyakran villanyoszlopok tetejére építik. Nyár végén a fiókák már tudnak repülni, és ősszel együtt indulnak délre.', q: [['Honnan érkeznek vissza a gólyák?', 'Afrikából.', ['Ázsiából.', 'Az erdőből.']], ['Mikor indulnak délre a gólyák?', 'Ősszel.', ['Tavasszal.', 'Télen.']]] },
  { t: 'Lili és Ádám bábszínházat épített egy cipősdobozból. Lili festette a díszletet, Ádám pedig zoknikból bábokat varrt. Szombaton előadást tartottak a szüleiknek.', q: [['Miből épült a bábszínház?', 'Egy cipősdobozból.', ['Fadeszkákból.', 'Papírzacskóból.']], ['Ki varrta a bábokat?', 'Ádám.', ['Lili.', 'A szüleik.']]] },
  { t: 'A mókus egész ősszel diót és makkot gyűjt. Az élelmet több helyre is elrejti, például fák odvába vagy a föld alá. Télen, amikor kevés az élelem, ezekből a rejtekhelyekből eszik.', q: [['Mit gyűjt a mókus ősszel?', 'Diót és makkot.', ['Almát és körtét.', 'Bogarakat.']], ['Miért rejti el az élelmet a mókus?', 'Hogy télen is legyen mit ennie.', ['Hogy a madarak megtalálják.', 'Mert nem éhes.']]] },
  { t: 'Gergő elvesztette a kulcsát. Először a táskájában kereste, aztán a kabátja zsebében. Végül a húga találta meg a cipősszekrény alatt.', q: [['Hol kereste Gergő először a kulcsát?', 'A táskájában.', ['A kabátja zsebében.', 'A cipősszekrény alatt.']], ['Ki találta meg a kulcsot?', 'Gergő húga.', ['Gergő.', 'Gergő anyukája.']]] },
  { t: 'A Balaton Közép-Európa legnagyobb tava. Vize nyáron gyorsan felmelegszik, mert nem túl mély. Télen, ha nagyon hideg van, be is fagyhat.', q: [['Miért melegszik fel gyorsan a Balaton vize?', 'Mert nem túl mély.', ['Mert nagyon nagy.', 'Mert sok benne a hal.']], ['Mi történhet télen a Balatonnal?', 'Befagyhat.', ['Kiszárad.', 'Megnő.']]] }
];
const artOf = w => /^[aáeéiíoóöőuúüű]/i.test(w) ? 'az' : 'a';

const MG3 = {
  abc(L) {
    const pool = words4(); let ws;
    if (L < 3) { const used = new Set(); ws = []; for (const w of shuffle(pool)) { const f = tok(w)[0]; if (!used.has(f)) { used.add(f); ws.push(w); } if (ws.length === (L === 1 ? 3 : 4)) break; } }
    else { const gr = {}; pool.forEach(w => { const f = tok(w)[0]; (gr[f] = gr[f] || []).push(w); }); const keys = Object.keys(gr).filter(k => gr[k].length >= 3); ws = shuffle(gr[pick(keys)]).slice(0, 3); }
    const sorted = ws.slice().sort(abcCmp);
    return { type: 'build', prompt: 'Rakd betűrendbe a szavakat! Koppints rájuk sorban.', answer: sorted, tiles: shuffle(ws), explain: `Betűrendben: ${sorted.join(' – ')}.`, hint: L < 3 ? 'Nézd meg a szavak első betűjét, és gondolj az ábécére.' : 'Ha az első betű egyforma, a második betű dönt. Ha az is, akkor a harmadik.' };
  },
  syl(L) {
    if (L === 1) { const w = pick(HYPH.concat(HYPH2)); return { type: 'input', prompt: `Hány szótagú ez a szó: <b>${w.replace(/-/g, '')}</b>?`, answer: w.split('-').length, hint: 'Ahány magánhangzó, annyi szótag.' }; }
    return hyphChoice(pick((L === 2 ? HYPH2 : HYPH).filter(w => w.includes('-'))));
  },
  pos(L) {
    const kinds = L === 1 ? ['főnév', 'ige'] : L === 2 ? ['főnév', 'ige', 'melléknév'] : ['főnév', 'ige', 'melléknév', 'számnév'];
    const k = pick(kinds), w = pick(POS[k]);
    return { type: 'choice', prompt: `Milyen szófajú ez a szó: <b>${w}</b>?`, answer: k, options: kinds.map(v => ({ value: v, html: v })), hint: 'Főnév: ki? mi? (élőlény, tárgy, hely neve). Ige: mit csinál? Melléknév: milyen? Számnév: hány? hányadik?' };
  },
  proper(L) {
    if (L === 3) return M4G.caps(3);
    const [pn] = pick(PROPER), wr = shuffle(COMMON3).slice(0, L === 1 ? 1 : 2);
    return mcq('Melyik szót kell nagy kezdőbetűvel írni? (Most mind kisbetűvel írtuk.)', pn, wr, { fmt: v => v, explain: `Helyesen: <b>${pn[0].toUpperCase() + pn.slice(1)}</b>. Ez tulajdonnév: egy bizonyos személy, állat vagy hely neve.`, hint: 'A tulajdonnév egyetlen, bizonyos dolog neve (Duna, Bodri, Szeged). A köznév sok hasonló dolog közös neve (folyó, kutya, város).' });
  },
  tense(L) { return M4G.tense(L); },
  jly(L) { return M4G.jly(L); },
  hol(L) {
    const [inn, into, outof, kind] = pick(HOL), forms = L === 3 ? [inn, into, outof] : [inn, into], idx = ri(0, forms.length - 1);
    const tpl = HOL_T[kind][idx].replace('{a}', artOf(inn)).replace('{x}', '<span class="blank">…</span>');
    return mcq(`Melyik szó illik a mondatba?<br><b>${tpl}</b>`, forms[idx], forms.filter((_, i) => i !== idx), { fmt: v => v, explain: `Helyesen: ${HOL_T[kind][idx].replace('{a}', artOf(inn)).replace('{x}', '<b>' + forms[idx] + '</b>')}`, hint: 'Hol? → -ban, -ben (benne van). Hová? → -ba, -be (bele). Honnan? → -ból, -ből (ki belőle).' });
  },
  plural(L) {
    const [one, many] = pick(PLUR);
    if (L === 3) {
      const wr = [many.slice(0, -1), many.slice(0, -2)].filter(x => x !== one && x.length > 0);
      return mcq(`Mi az egyes száma ennek a szónak: <b>${many}</b>?`, one, [...new Set(wr)], { fmt: v => v, hint: 'Egyes szám: egy darab. Vedd le a többes szám jelét (-k), és figyelj, mert a szó töve néha változik: lovak → ló.' });
    }
    const cands = [one + 'k', one + 'ok', one + 'ek', one + 'ak', one + 'ök'].filter(x => x !== many);
    return mcq(`Mi a többes száma ennek a szónak: <b>${one}</b>?`, many, shuffle(cands).slice(0, L === 1 ? 1 : 2), { fmt: v => v, hint: 'A többes szám jele a -k. Figyelj: az a-ból á lesz (alma → almák), és néha a szó töve is változik (ló → lovak).' });
  },
  sent(L) { return M4G.sent(L); },
  meaning(L) { return M4G.meaning(L === 1 ? 1 : 2); },
  comp(L) {
    const t = pick(COMP3), [q, a, wr] = t.q[L === 1 ? 0 : L === 3 ? 1 : ri(0, 1)];
    return { ...mcq('Olvasd el figyelmesen, és válaszolj!', a, wr, { fmt: v => v, visual: `<div><div class="passage">${t.t}</div><div class="qline">${q}</div></div>`, hint: 'Olvasd el a szöveget még egyszer, és keresd meg benne a választ.' }), key: undefined };
  }
};
PAGES['magyar-3'] = {
  id: 'magyar-3', title: 'Magyar', grade: 3,
  blurb: 'Betűrend, elválasztás, szófajok, tulajdonnevek, igeidők, j és ly, toldalékok, többes szám, mondatfajták, szövegértés. Egy kör 10 feladat.',
  topics: [
    { id: 'abc', sample: 'alma · bab · cica', name: 'Betűrend', desc: 'Rakd betűrendbe a szavakat!', gen: MG3.abc },
    { id: 'syl', sample: 'pil-lan-gó', name: 'Elválasztás', desc: 'Szótagok, a szó helyes elválasztása.', gen: MG3.syl },
    { id: 'pos', sample: 'fut · nagy · ház', name: 'Szófajok', desc: 'Főnév, ige, melléknév, számnév.', gen: MG3.pos },
    { id: 'proper', sample: 'Duna · folyó', name: 'Tulajdonnév', desc: 'Mit írunk nagy kezdőbetűvel?', gen: MG3.proper },
    { id: 'tense', sample: 'volt · van · lesz', name: 'Igeidők', desc: 'Múlt, jelen és jövő.', gen: MG3.tense },
    { id: 'jly', sample: 'j / ly', name: 'j vagy ly?', desc: 'Gyakori szavak helyesírása.', gen: MG3.jly },
    { id: 'hol', sample: 'házban · házba', name: 'Hol? Hová? Honnan?', desc: '-ban/-ben, -ba/-be, -ból/-ből.', gen: MG3.hol },
    { id: 'plural', sample: 'ló → lovak', name: 'Többes szám', desc: 'Egy és sok: a -k jel.', gen: MG3.plural },
    { id: 'sent', sample: '. ? !', name: 'Mondatfajták', desc: 'Kijelentő, kérdő, felkiáltó, felszólító, óhajtó.', gen: MG3.sent },
    { id: 'meaning', sample: 'gyors = sebes', name: 'Szavak jelentése', desc: 'Ellentétes és rokon értelmű szavak.', gen: MG3.meaning },
    { id: 'comp', sample: '📖', name: 'Szövegértés', desc: 'Hosszabb szöveg, kérdések.', gen: MG3.comp }
  ]
};

/* ===== Magyar 4: nyelvtan, helyesírás, szövegértés ===== */
const ABC = ['a', 'á', 'b', 'c', 'cs', 'd', 'dz', 'dzs', 'e', 'é', 'f', 'g', 'gy', 'h', 'i', 'í', 'j', 'k', 'l', 'ly', 'm', 'n', 'ny', 'o', 'ó', 'ö', 'ő', 'p', 'q', 'r', 's', 'sz', 't', 'ty', 'u', 'ú', 'ü', 'ű', 'v', 'w', 'x', 'y', 'z', 'zs'];
const abcKey = w => tok(w).map(g => ABC.indexOf(g));
const abcCmp = (a, b) => { const x = abcKey(a), y = abcKey(b); for (let i = 0; i < Math.min(x.length, y.length); i++) if (x[i] !== y[i]) return x[i] - y[i]; return x.length - y.length; };
const words4 = () => WORDS.filter(w => w.length >= 3 && tok(w).every(g => ABC.includes(g)));
const TXT = s => s;
const tri = (o, v) => ({ fmt: x => x, ...o, ...v });

const HYPH = ['ku-tya', 'asz-tal', 'csi-ga', 'is-ko-la', 'ab-lak', 'ba-rát', 'bi-cik-li', 'ma-dár', 'ki-rály', 'e-le-fánt', 'va-sár-nap', 'ter-mé-szet', 'hó-em-ber', 'tan-könyv', 'gye-rek', 'ke-nyér', 'e-gér', 'pil-lan-gó', 'lab-da', 'lám-pa', 'sap-ka', 'ta-ní-tó', 'ha-jó', 'ce-ru-za', 'te-le-fon', 'csil-lag', 'vi-rág', 'ma-ci', 'tor-ta', 'to-jás', 'ci-pő', 'ba-nán', 'zsi-ráf', 'ze-bra', 'tig-ris', 'pa-pri-ka'];
const ROOTS1 = [['asztalon', 'asztal', 'on'], ['ablakban', 'ablak', 'ban'], ['könyvet', 'könyv', 'et'], ['tollat', 'toll', 'at'], ['kertben', 'kert', 'ben'], ['füzetet', 'füzet', 'et'], ['vonatot', 'vonat', 'ot'], ['székbe', 'szék', 'be'], ['házat', 'ház', 'at'], ['tóban', 'tó', 'ban'], ['barátom', 'barát', 'om'], ['játékot', 'játék', 'ot'], ['hídon', 'híd', 'on'], ['hegyen', 'hegy', 'en']];
const ROOTS2 = [['házakban', 'ház', 'ak', 'ban'], ['asztalokon', 'asztal', 'ok', 'on'], ['ablakokat', 'ablak', 'ok', 'at'], ['kertekben', 'kert', 'ek', 'ben'], ['könyveket', 'könyv', 'ek', 'et'], ['tollakat', 'toll', 'ak', 'at'], ['füzeteket', 'füzet', 'ek', 'et']];
const JLY = [['mély', 'ly'], ['király', 'ly'], ['hely', 'ly'], ['golyó', 'ly'], ['lyuk', 'ly'], ['selyem', 'ly'], ['kehely', 'ly'], ['bagoly', 'ly'], ['kölyök', 'ly'], ['sólyom', 'ly'], ['jég', 'j'], ['juh', 'j'], ['játék', 'j'], ['ajtó', 'j'], ['fej', 'j'], ['tej', 'j'], ['hajó', 'j'], ['majom', 'j'], ['sajt', 'j'], ['bajusz', 'j'], ['fáj', 'j'], ['járda', 'j'], ['jó', 'j']];
const VAL = [['tű', 'tűvel', 1], ['kutya', 'kutyával', 1], ['ceruza', 'ceruzával', 1], ['alma', 'almával', 1], ['villa', 'villával', 1], ['eső', 'esővel', 1], ['fiú', 'fiúval', 1], ['ló', 'lóval', 1], ['labda', 'labdával', 1],
  ['kéz', 'kézzel', 2], ['ház', 'házzal', 2], ['vonat', 'vonattal', 2], ['toll', 'tollal', 2], ['szék', 'székkel', 2], ['busz', 'busszal', 2], ['cukor', 'cukorral', 2], ['víz', 'vízzel', 2], ['tej', 'tejjel', 2], ['rák', 'rákkal', 2], ['láb', 'lábbal', 2], ['madár', 'madárral', 2], ['kenyér', 'kenyérrel', 2], ['levél', 'levéllel', 2], ['fej', 'fejjel', 2], ['lány', 'lánnyal', 2], ['sün', 'sünnel', 2], ['nap', 'nappal', 2]];
const SENT = {
  'kijelentő': ['A kutya az udvaron alszik.', 'Holnap esik az eső.', 'Anna szeret úszni.', 'A Duna Európa második leghosszabb folyója.', 'Tegnap a nagymamánál voltunk.'],
  'kérdő': ['Hány óra van?', 'Ki nyitotta ki az ajtót?', 'Szeretsz focizni?', 'Hová mész nyáron?', 'Mikor jön a busz?'],
  'felkiáltó': ['De szép ez a virág!', 'Milyen hideg van ma!', 'Hurrá, kitűnőt kaptam!', 'Jaj, elestem!', 'Ez nagyszerű!'],
  'felszólító': ['Gyere ide!', 'Pakold el a játékokat!', 'Nyisd ki az ablakot!', 'Kérlek, segíts nekem!', 'Ne rohanj az utcán!'],
  'óhajtó': ['Bárcsak itt lenne már a nyár!', 'Bárcsak eljönne a nagyi!', 'Bárcsak jó idő lenne holnap!', 'Bárcsak megtalálnám a kulcsomat!', 'Bárcsak minden gyerek boldog lenne!']
};
const KIND = [
  ['A <b>kutya</b> az udvaron alszik.', 'név'], ['A <b>kicsi</b> kutya alszik.', 'tul'], ['A kutya <b>alszik</b>.', 'cs'], ['<b>Három</b> kutya alszik.', 'menny'],
  ['Az <b>alma</b> édes.', 'név'], ['Az alma <b>édes</b>.', 'tul'], ['Anna <b>olvas</b> egy könyvet.', 'cs'], ['Péter <b>hat</b> almát hozott.', 'menny'],
  ['A <b>magas</b> fa az erdő szélén áll.', 'tul'], ['A <b>gyerekek</b> játszanak.', 'név'], ['A gyerekek <b>játszanak</b>.', 'cs'], ['A <b>piros</b> labda elgurult.', 'tul'],
  ['A <b>labda</b> elgurult.', 'név'], ['A labda <b>elgurult</b>.', 'cs'], ['<b>Tíz</b> perc múlva indul a vonat.', 'menny'], ['Az <b>iskola</b> nagy.', 'név'], ['Az iskola <b>nagy</b>.', 'tul'],
  ['A <b>macska</b> egeret fog.', 'név'], ['A <b>kék</b> tenger csillog.', 'tul'], ['A tenger <b>csillog</b>.', 'cs'], ['Bence <b>két</b> szendvicset evett.', 'menny'], ['A <b>tanító</b> mesét olvas.', 'név'], ['A hideg szél <b>fúj</b>.', 'cs']
];
const KLAB = { 'név': 'valaminek a neve', 'tul': 'tulajdonság', 'cs': 'cselekvés', 'menny': 'mennyiség' };
const TENSE = [['Anna olvas.', 'Anna olvasott.', 'Anna olvasni fog.'], ['A kutya ugat.', 'A kutya ugatott.', 'A kutya ugatni fog.'], ['Bence rajzol.', 'Bence rajzolt.', 'Bence rajzolni fog.'], ['A madár énekel.', 'A madár énekelt.', 'A madár énekelni fog.'], ['Apa főz.', 'Apa főzött.', 'Apa főzni fog.'], ['A tanító magyaráz.', 'A tanító magyarázott.', 'A tanító magyarázni fog.'], ['Nóra úszik.', 'Nóra úszott.', 'Nóra úszni fog.'], ['A macska alszik.', 'A macska aludt.', 'A macska aludni fog.'], ['Dani fut.', 'Dani futott.', 'Dani futni fog.'], ['A nagyi süt.', 'A nagyi sütött.', 'A nagyi sütni fog.']];
const OPP = [['nagy', 'kicsi'], ['hosszú', 'rövid'], ['meleg', 'hideg'], ['magas', 'alacsony'], ['gyors', 'lassú'], ['régi', 'új'], ['vidám', 'szomorú'], ['kemény', 'puha'], ['világos', 'sötét'], ['igaz', 'hamis'], ['száraz', 'nedves'], ['erős', 'gyenge'], ['tele', 'üres'], ['drága', 'olcsó'], ['kövér', 'sovány'], ['könnyű', 'nehéz']];
const SYN = [['nagy', 'hatalmas'], ['kicsi', 'apró'], ['szép', 'gyönyörű'], ['gyors', 'sebes'], ['bátor', 'merész'], ['okos', 'értelmes'], ['fáradt', 'kimerült'], ['vidám', 'derűs'], ['út', 'ösvény'], ['hideg', 'fagyos'], ['siet', 'rohan'], ['kincs', 'érték']];
const IDIOM = [
  ['Nem esik messze az alma a fájától.', 'A gyerek olyan, mint a szülei.'], ['Addig nyújtózkodj, amíg a takaród ér.', 'Annyit költs, amennyid van.'], ['Ki korán kel, aranyat lel.', 'Aki korán kezd dolgozni, jobban jár.'],
  ['Kettőn áll a vásár.', 'Mindkét félnek egyet kell érteni.'], ['Leesett az álla.', 'Nagyon meglepődött.'], ['Lóg az orra.', 'Szomorú, csalódott.'], ['Fűnek-fának elmondja.', 'Mindenkinek elmondja.'], ['Szárnyra kapott a hír.', 'Gyorsan elterjedt a hír.'], ['Jobb ma egy veréb, mint holnap egy túzok.', 'A biztos kevés többet ér a bizonytalan soknál.']
];
const CAPS = [['Duna', 1], ['Balaton', 1], ['Budapest', 1], ['Magyarország', 1], ['Debrecen', 1], ['Mátra', 1], ['Tisza', 1], ['Szeged', 1], ['Anna', 1], ['Bence', 1], ['május', 2], ['hétfő', 2], ['szerda', 2], ['január', 2], ['magyar', 2], ['német', 2], ['tavasz', 2], ['folyó', 2], ['város', 2]];
const COMP = [
  { t: 'Nóra a nagyi kertjében segített. Reggel almát szedett, délután virágot öntözött. Estére nagyon elfáradt, ezért korán lefeküdt.', q: [['Mit csinált Nóra reggel?', 'Almát szedett.', ['Virágot öntözött.', 'Korán lefeküdt.']], ['Miért feküdt le korán Nóra?', 'Mert nagyon elfáradt.', ['Mert beteg volt.', 'Mert már sötét volt.']]] },
  { t: 'A kismacska felfedezett egy gombolyagot a hűtő mögött. Órákig játszott vele. Amikor a gazdája megtalálta, a gombolyag már csupa csomó volt.', q: [['Mivel játszott a kismacska?', 'Egy gombolyaggal.', ['Egy labdával.', 'Egy egérrel.']], ['Mi lett a gombolyaggal?', 'Csupa csomó lett.', ['Elveszett.', 'A macska megette.']]] },
  { t: 'Bence biciklivel ment az iskolába. A hídnál lefújta a szél a sapkáját, ezért visszafordult érte. Emiatt öt percet késett.', q: [['Mit fújt le a szél?', 'Bence sapkáját.', ['Bence táskáját.', 'Bence kulcsát.']], ['Miért késett Bence?', 'Mert visszament a sapkájáért.', ['Mert defektet kapott.', 'Mert elaludt.']]] },
  { t: 'A Duna Európa második leghosszabb folyója. Tíz országon folyik át, és négy fővárost érint: Bécset, Pozsonyt, Budapestet és Belgrádot.', q: [['Hány országon folyik át a Duna?', 'Tíz országon.', ['Négy országon.', 'Két országon.']], ['Melyik város nincs a Duna mellett?', 'Prága.', ['Bécs.', 'Pozsony.']]] },
  { t: 'A méhek nektárt gyűjtenek a virágokról. A kaptárban ebből mézet készítenek. A mézet azért tárolják, hogy télen is legyen mit enniük.', q: [['Mit gyűjtenek a méhek a virágokról?', 'Nektárt.', ['Vizet.', 'Magot.']], ['Miért tárolják a méhek a mézet?', 'Hogy télen is legyen élelmük.', ['Hogy eladják.', 'Hogy a kaptárat díszítsék.']]] },
  { t: 'Dóri új szemüveget kapott. Először furcsán nézett ki a tükörben, de másnap már észre sem vette. Az osztálytársai szerint nagyon jól áll neki.', q: [['Mit kapott Dóri?', 'Új szemüveget.', ['Új cipőt.', 'Új táskát.']], ['Mit gondolnak az osztálytársai?', 'Hogy jól áll neki a szemüveg.', ['Hogy furcsán néz ki.', 'Hogy nem kell neki.']]] },
  { t: 'Télen az erdőben sok állat téli álmot alszik. A mókus nem alszik végig a telet: néha felébred, és megeszi a rejtett makkot. A medve szinte egész télen alszik.', q: [['Melyik állat alszik szinte egész télen?', 'A medve.', ['A mókus.', 'A róka.']], ['Mit csinál a mókus, amikor felébred?', 'Megeszi a rejtett makkot.', ['Vadászni megy.', 'Fát mászik.']]] },
  { t: 'Máté levelet írt a nagyszüleinek. Megköszönte az ajándékot, és meghívta őket a születésnapjára. A borítékra ráírta a címet, és bedobta a postaládába.', q: [['Mit köszönt meg Máté?', 'Az ajándékot.', ['A vacsorát.', 'A segítséget.']], ['Mit írt a borítékra?', 'A címet.', ['A születésnapját.', 'A nevét a nagyszülőknek.']]] }
];
const NAME4 = { 'kijelentő': 'kijelentő', 'kérdő': 'kérdő', 'felkiáltó': 'felkiáltó', 'felszólító': 'felszólító', 'óhajtó': 'óhajtó' };

const M4G = {
  abc(L) {
    const pool = words4(); let ws;
    if (L === 1) { const used = new Set(); ws = []; for (const w of shuffle(pool)) { const f = tok(w)[0]; if (!used.has(f)) { used.add(f); ws.push(w); } if (ws.length === 4) break; } }
    else {
      const gr = {}; pool.forEach(w => { const f = tok(w)[0]; (gr[f] = gr[f] || []).push(w); });
      if (L === 2) { const keys = Object.keys(gr).filter(k => gr[k].length >= 4); ws = shuffle(gr[pick(keys)]).slice(0, 4); }
      else { const pairs = [['c', 'cs'], ['s', 'sz'], ['g', 'gy'], ['n', 'ny']].filter(([a, b]) => gr[a] && gr[a].length >= 2 && gr[b] && gr[b].length >= 2); const [a, b] = pick(pairs); ws = [...shuffle(gr[a]).slice(0, 2), ...shuffle(gr[b]).slice(0, 2)]; }
    }
    ws = shuffle(ws); const sorted = ws.slice().sort(abcCmp), first = Math.random() < .5;
    return mcq(`Melyik szó áll ${first ? 'elöl' : 'leghátul'} a betűrendben?`, first ? sorted[0] : sorted[3], ws.filter(w => w !== (first ? sorted[0] : sorted[3])), {
      fmt: v => v, explain: `A betűrend: ${sorted.join(' – ')}.`, hint: 'Az ábécé: a, á, b, c, cs, d, dz, dzs, e, é, f, g, gy, h, i, í, j, k, l, ly, m, n, ny, o, ó, ö, ő, p, q, r, s, sz, t, ty, u, ú, ü, ű, v, w, x, y, z, zs. A kettős betűk (cs, sz, gy…) egy betűnek számítanak.'
    });
  },
  syl(L) {
    const w = pick(HYPH), plain = w.replace(/-/g, '');
    if (L === 1) return { type: 'input', prompt: `Hány szótagú ${artOf(plain)} <b>${plain}</b> szó?`, answer: w.split('-').length, hint: 'Annyi szótag van, ahány magánhangzó. Tapsold el a szót!' };
    const syls = w.split('-'), tk = tok(plain);
    const cnt = syls.map(s => tok(s).length), bounds = []; cnt.reduce((a, c) => { bounds.push(a + c); return a + c; }, 0); bounds.pop();
    const join = set => tk.map((g, i) => (set.has(i) ? '-' : '') + g).join('');
    const k = bounds.length, cands = Array.from({ length: tk.length - 1 }, (_, i) => i + 1);
    const wrongs = new Set(); let g = 0; const corr = join(new Set(bounds));
    while (wrongs.size < 2 && g++ < 80 && k > 0) { const s = new Set(shuffle(cands).slice(0, k)); const j = join(s); if (j !== corr) wrongs.add(j); }
    return mcq(`Hogyan választjuk el ${artOf(plain)} <b>${plain}</b> szót?`, corr, [...wrongs], { fmt: v => v, hint: 'Egy magánhangzó egy szótagot alkot. Két magánhangzó között általában az utolsó mássalhangzó kerül át a következő szótagba. A kettős betűket (cs, sz, ty, gy…) nem választjuk el.' });
  },
  root(L) {
    if (L === 1) {
      const [w, t] = pick(ROOTS1), wr = [w, w.slice(0, t.length - 1), w.slice(0, t.length + 1)].filter(x => x !== t && x.length > 0);
      return mcq(`Mi ${artOf(w)} <b>${w}</b> szó tője?`, t, wr, { fmt: v => v, hint: 'A szótő a szó „magja”, ahhoz kapcsoljuk a toldalékot. Vedd le a végéről a toldalékot.' });
    }
    if (L === 2) {
      const [w, t, a, b] = pick(ROOTS2);
      return mcq(`Melyik a szótő ${artOf(w)} <b>${w}</b> szóban?`, t, [w, w.slice(0, t.length + a.length), w.slice(0, t.length - 1)], { fmt: v => v, explain: `${t} + ${a} + ${b}`, hint: 'Két toldalék van a szó végén. A szótő az, ami marad, ha mindkettőt levesszük.' });
    }
    const [w, t, s] = pick(ROOTS1);
    return mcq(`Melyik a toldalék ${artOf(w)} <b>${w}</b> szóban?`, s, [t.slice(0, 2), t.slice(-1) + s.slice(0, 1), t].filter(x => x !== s), { fmt: v => v, explain: `${t} + ${s}`, hint: 'A toldalék a szó végén lévő rész, amit a szótőhöz teszünk.' });
  },
  jly(L) {
    const [w, a] = pick(JLY), i = w.indexOf(a);
    const gap = w.slice(0, i) + '<span class="blank">…</span>' + w.slice(i + a.length);
    const opts = L === 1 ? ['j', 'ly'] : ['j', 'ly', 'lj'];
    return mcq(`Melyik betű hiányzik? <b>${gap}</b>`, a, opts.filter(x => x !== a), { fmt: v => v, explain: `Helyesen: <b>${w}</b>.`, hint: 'A j és az ly ugyanúgy hangzik. A helyes írásmódot a szó alakjából kell megjegyezni, ezért gyakorolni kell.' });
  },
  val(L) {
    const pool = VAL.filter(v => L === 1 ? v[2] === 1 : L === 2 ? v[2] === 2 : true), [stem, ok] = pick(pool);
    const vow = ok.endsWith('al') ? 'a' : 'e', plain = stem + 'v' + vow + 'l', alt = stem + 'v' + (vow === 'a' ? 'e' : 'a') + 'l';
    const alt2 = ok.replace(/(.)\1/, '$1') !== ok && ok.replace(/(.)\1/, '$1') !== stem ? ok.replace(/(.)\1/, '$1') : alt;
    return mcq(`Melyik a helyes: ${stem} + -val / -vel?`, ok, [plain, alt2 !== plain ? alt2 : alt], { fmt: v => v, explain: `Helyesen: <b>${ok}</b>.`, hint: 'Ha a szó mássalhangzóra végződik, a v hasonul hozzá: kéz + vel = kézzel. Magánhangzó után a v megmarad: kutya + val = kutyával.' });
  },
  sent(L) {
    const types = L === 1 ? ['kijelentő', 'kérdő', 'felkiáltó'] : L === 2 ? ['kijelentő', 'kérdő', 'felkiáltó', 'felszólító'] : ['kijelentő', 'kérdő', 'felkiáltó', 'felszólító', 'óhajtó'];
    const t = pick(types), s = pick(SENT[t]);
    return mcq(`Milyen mondat ez?<br><b>${s}</b>`, t, types.filter(x => x !== t).sort(() => Math.random() - .5).slice(0, 3), { fmt: v => v, hint: 'Kijelentő: elmond valamit (.). Kérdő: kérdez (?). Felkiáltó: érzelmet fejez ki (!). Felszólító: kér vagy parancsol. Óhajtó: vágyat fejez ki („bárcsak”).' });
  },
  kind(L) {
    const ks = L === 1 ? ['név', 'tul', 'cs'] : ['név', 'tul', 'cs', 'menny'];
    const [s, k] = pick(KIND.filter(x => ks.includes(x[1])));
    return { type: 'choice', prompt: `Mit fejez ki a vastagon szedett szó?<br>${s}`, answer: k, options: shuffle(ks).map(v => ({ value: v, html: KLAB[v] })), hint: 'Valaminek a neve: ki? mi? Tulajdonság: milyen? Cselekvés: mit csinál? Mennyiség: hány? mennyi?' };
  },
  tense(L) {
    const tr = pick(TENSE), names = ['jelen', 'múlt', 'jövő'], idx = ri(0, 2);
    if (L === 3) { const ask = names[idx]; return mcq(`Melyik mondat szól a <b>${ask} időről</b>?`, tr[idx], tr.filter((_, i) => i !== idx), { fmt: v => v, hint: 'Múlt: -t, -tt, -ott; jelen: most történik; jövő: „fog”.' }); }
    const adv = L === 1 ? ['Most', 'Tegnap', 'Holnap'][idx] + ' ' : '';
    let s = tr[idx]; if (adv) s = adv + s[0].toLowerCase() + s.slice(1);
    return { type: 'choice', prompt: `Melyik időben van az ige?<br><b>${s}</b>`, answer: names[idx], options: names.map(n => ({ value: n, html: n + ' idő' })), hint: 'Múlt: már megtörtént. Jelen: most történik. Jövő: még nem történt meg, „fog” segíti.' };
  },
  meaning(L) {
    if (L === 1) { const [a, b] = pick(OPP), flip = Math.random() < .5, q = flip ? b : a, ans = flip ? a : b; return mcq(`Mi ${artOf(q)} <b>${q}</b> ellentéte?`, ans, shuffle(OPP.flat().filter(x => x !== ans && x !== q)).slice(0, 3), { fmt: v => v, hint: 'Az ellentét az ellenkező jelentésű szó.' }); }
    if (L === 2) { const [a, b] = pick(SYN), flip = Math.random() < .5, q = flip ? b : a, ans = flip ? a : b; return mcq(`Melyik szó jelentése hasonló? <b>${q}</b>`, ans, shuffle(SYN.flat().filter(x => x !== ans && x !== q)).slice(0, 3), { fmt: v => v, hint: 'A rokon értelmű szavak közel ugyanazt jelentik.' }); }
    const [sz, m] = pick(IDIOM);
    return mcq(`Mit jelent ez a szólás?<br><b>${sz}</b>`, m, shuffle(IDIOM.filter(x => x[1] !== m)).slice(0, 2).map(x => x[1]), { fmt: v => v, hint: 'A szólás átvitt értelemben mond valamit, nem szó szerint.' });
  },
  caps(L) {
    const pool = CAPS.filter(c => L === 1 ? c[1] === 1 : L === 2 ? c[1] === 2 : true), [w, kind] = pick(pool);
    const flipped = kind === 1 ? w[0].toLowerCase() + w.slice(1) : w[0].toUpperCase() + w.slice(1);
    return mcq('Melyik a helyes írásmód?', w, [flipped, w.toUpperCase()], { fmt: v => v, hint: kind === 1 ? 'A földrajzi neveket és a személyneveket nagy kezdőbetűvel írjuk.' : 'A hónapok, napok, évszakok és a nemzetiségek neve kis kezdőbetűvel íródik.' });
  },
  comp(L) {
    const t = pick(COMP), qi = L === 1 ? 0 : L === 3 ? 1 : ri(0, 1), [q, a, wr] = t.q[qi];
    return { ...mcq('Olvasd el figyelmesen, és válaszolj!', a, wr, { fmt: v => v, visual: `<div><div class="passage">${t.t}</div><div class="qline">${q}</div></div>`, hint: 'Olvasd el a szöveget még egyszer, és keresd meg benne a választ.' }), key: undefined };
  }
};
PAGES['magyar-4'] = {
  id: 'magyar-4', title: 'Magyar', grade: 4,
  blurb: 'Nyelvtan, helyesírás és szövegértés: betűrend, szótagolás, szótő és toldalék, j–ly, mondatfajták, igeidők, szólások. Egy kör 10 feladat.',
  topics: [
    { id: 'abc', sample: 'a á b c cs', name: 'Betűrend', desc: 'Melyik szó áll előbb? A kettős betűkkel együtt.', gen: M4G.abc },
    { id: 'syl', sample: 'ku-tya', name: 'Szótagolás', desc: 'Szótagok száma és elválasztás.', gen: M4G.syl },
    { id: 'root', sample: 'ház+ak+ban', name: 'Szótő és toldalék', desc: 'Szóelemzés egy- és kétlépéses toldalékkal.', gen: M4G.root },
    { id: 'jly', sample: 'j / ly', name: 'j vagy ly?', desc: 'Gyakori szavak helyesírása.', gen: M4G.jly },
    { id: 'val', sample: 'kéz+vel', name: '-val, -vel', desc: 'Hasonulás: kézzel, házzal, kutyával.', gen: M4G.val },
    { id: 'sent', sample: '? ! .', name: 'Mondatfajták', desc: 'Kijelentő, kérdő, felkiáltó, felszólító, óhajtó.', gen: M4G.sent },
    { id: 'kind', sample: 'ki? mi? milyen?', name: 'Mit fejez ki a szó?', desc: 'Név, tulajdonság, cselekvés, mennyiség.', gen: M4G.kind },
    { id: 'tense', sample: 'volt · van · lesz', name: 'Igeidők', desc: 'Múlt, jelen és jövő.', gen: M4G.tense },
    { id: 'meaning', sample: 'nagy ↔ kicsi', name: 'Szavak jelentése', desc: 'Ellentét, rokon értelem, szólások.', gen: M4G.meaning },
    { id: 'caps', sample: 'Duna · május', name: 'Kis- és nagybetű', desc: 'Névírás, hónapok, napok, nemzetiségek.', gen: M4G.caps },
    { id: 'comp', sample: '📖', name: 'Szövegértés', desc: 'Rövid szöveg, kérdések.', gen: M4G.comp }
  ]
};

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
  markDay();
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
    page, title: 'Hibáim', list: pickd.map(m => ({ ...m.q, _page: m.p, _topic: m.t, _mk: m.k })), back: () => hibakView(page),
    onAnswer: (q, first) => { if (first) { fixed++; setMistakes(getMistakes().filter(m => m.k !== q._mk)); } },
    onFinish: s => {
      const left = getMistakes().length; markDay();
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
        do { q = t.gen(sp.level); key = String(q.prompt) + '|' + JSON.stringify(q.answer) + '|' + String(q.visual || '').length; } while (seen.has(key) && g++ < 12);
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
  .replace('Rakd betűrendbe a szavakat! Koppints rájuk sorban.', 'Írd le a szavakat betűrendben!');
function staticQ(q, i) {
  const body = h('div', { class: 'pq-b' }, h('div', { class: 'pq-p', html: printPrompt(q.prompt) }));
  if (q.visual) body.append(h('div', { class: 'pq-v', html: q.visual }));
  if (q.type === 'choice') body.append(h('div', { class: 'pq-o' }, q.options.map((o, k) => h('span', { class: 'pq-opt' }, h('b', null, 'ABCDEF'[k] + ')'), h('span', { html: o.html })))));
  else if (q.type === 'input') body.append(h('div', { class: 'pq-a' }, 'Válasz: ', h('span', { class: 'pq-line' })));
  else if (q.type === 'find') body.append(h('div', { class: 'pq-grid' }, q.cells.map(c => h('span', null, c))));
  else if (q.type === 'build') {
    const words = q.answer.some(x => x.length > 3);
    body.append(h('div', { class: 'pq-tiles' }, q.tiles.map(t => h('span', null, t))), h('div', { class: 'pq-a' }, words ? h('span', { class: 'pq-line wide' }) : q.answer.map(() => h('span', { class: 'pq-box' }))));
  }
  return h('div', { class: 'pq' }, h('div', { class: 'pq-n' }, `${i + 1}.`), body);
}
function keyText(q) {
  if (q.type === 'choice') { const k = q.options.findIndex(o => o.value === q.answer); const txt = stripTags(q.options[k] && q.options[k].html); return `${'ABCDEF'[k]})${txt ? ' ' + txt : q.answerText ? ' ' + stripTags(q.answerText) : ''}`; }
  if (q.type === 'find') return `${q.targets.length} db: ${q.targets.map(i => i + 1).join(', ')}. hely`;
  if (q.type === 'build') return q.answer.join(q.answer.some(x => x.length > 3) ? ', ' : '');
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
    [['Matematika', 'matek'], ['Magyar', 'magyar'], ['Játékok', 'jatek']].forEach(([lab, s]) => {
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

/* ===== Így működik: step-by-step worked examples ===== */
// Hungarian suffix -n/-on/-en/-ön after a clock number (a 3-on, az 5-ön, a 12-n)
const onN = n => n + '-' + ({ 1: 'en', 2: 'n', 3: 'on', 4: 'en', 5: 'ön', 6: 'on', 7: 'en', 8: 'on', 9: 'en', 10: 'en', 11: 'en', 12: 'n' }[n] || 'n');
const PLACES = ['egyesek', 'tízesek', 'százasok', 'ezresek', 'tízezresek'];
const num = s => Number(String(s).replace(/[\s ]/g, ''));

/* ---------- work out which explanation fits a question ---------- */
function deriveEx(q, pageId, topicId) {
  if (!q) return null;
  const P = String(q.prompt || ''), V = String(q.visual || ''), A = q.answer;
  let m;
  if ((m = V.match(/<div class="col"><div>\s*([\d]+)<\/div><div class="u">\s*([+−·])\s+(\d+)<\/div>/))) {
    const a = num(m[1]), b = num(m[3]);
    if (m[2] === '+') return { k: 'coladd', a, b };
    if (m[2] === '−' && a >= b) return { k: 'colsub', a, b };
    return null;
  }
  if (topicId !== 'place' && (m = P.match(/^(\d[\d\s]*) ([+−]) (\d[\d\s]*) = <span class="blank">/))) {
    const a = num(m[1]), b = num(m[3]);
    if (m[2] === '+') return { k: 'add', a, b };
    if (a >= b) return { k: 'sub', a, b };
  }
  if ((m = P.match(/^(\d+) · (\d+) = <span class="blank">/)) && +m[1] <= 10 && +m[2] <= 10) return { k: 'mul', a: +m[1], b: +m[2] };
  if ((m = P.match(/^(\d+) : (\d+) = /)) && +m[1] <= 100 && +m[2] <= 10 && +m[2] >= 2) return { k: 'divrem', a: +m[1], b: +m[2] };
  if ((m = P.match(/^Mennyi az? (\d+) (fele|harmada|negyede|ötöde|hatoda|nyolcada|tizede)\?/))) {
    const n = { fele: 2, harmada: 3, negyede: 4, 'ötöde': 5, hatoda: 6, nyolcada: 8, tizede: 10 }[m[2]];
    return +m[1] <= 100 ? { k: 'fracof', W: +m[1], n, kk: 1 } : null;
  }
  if ((m = P.match(/(\d+) <span class="frac"><span>(\d+)<\/span><span>(\d+)<\/span><\/span> része/)) && +m[1] <= 100) return { k: 'fracof', W: +m[1], n: +m[3], kk: +m[2] };
  if (/^Mekkora része van/.test(P) && typeof A === 'string' && (m = A.match(/^(\d+)\/(\d+)$/))) return { k: 'pie', kk: +m[1], n: +m[2] };
  const clockTopic = ['matek-1/clock', 'matek-2/clock', 'jatek-ora/half', 'jatek-ora/quarter', 'jatek-ora/five'].includes(`${pageId}/${topicId}`);
  if (clockTopic && typeof A === 'string') {
    if ((m = A.match(/^(\d{1,2}):(\d\d)$/))) return { k: 'clock', hh: +m[1], mm: +m[2] };
    if ((m = A.match(/^(\d+) óra$/))) return { k: 'clock', hh: +m[1], mm: 0 };
    if ((m = A.match(/^(negyed|fél|háromnegyed) (\d+)$/))) { const nx = +m[2], hh = nx === 1 ? 12 : nx - 1; return { k: 'clock', hh, mm: { negyed: 15, 'fél': 30, 'háromnegyed': 45 }[m[1]] }; }
  }
  if ((m = P.match(/^Melyik (?:betű )?hiányzik\? <b>(.*?)<span class="blank">…<\/span>(.*?)<\/b>/)) && typeof A === 'string') {
    const w = m[1] + A + m[2], i = m[1].length, vowel = /^[aáeéiíoóöőuúüű]$/.test(A), dbl = /^(.)\1$/.test(A);
    if (vowel || dbl || (A.length === 1 && q.options && q.options.some(o => o.value === A + A))) return { k: 'length', w, i, g: A, vowel };
  }
  if ((m = P.match(/(?:Hány szótagú ez a szó|Hogyan választjuk el ezt a szót): <b>([^<]+)<\/b>/) || P.match(/(?:Hány szótagú|Hogyan választjuk el) az? <b>([^<]+)<\/b> szó/))) {
    const plain = m[1], hy = (typeof HYPH2 !== 'undefined' ? HYPH2 : []).concat(HYPH).find(x => x.replace(/-/g, '') === plain);
    if (hy) return { k: 'syl', w: hy };
  }
  return null;
}

/* ---------- drawing helpers ---------- */
function jumpLine(start, jumps, upto) {
  const pts = [start]; let v = start; jumps.forEach(j => { v += j; pts.push(v); });
  const lo0 = Math.min(...pts), hi0 = Math.max(...pts), span = hi0 - lo0;
  const unit = span > 300 ? 100 : span > 30 ? 10 : 1;
  const lo = Math.floor(lo0 / (unit * (unit === 1 ? 5 : 1))) * unit * (unit === 1 ? 5 : 1), hi = Math.ceil(hi0 / (unit * (unit === 1 ? 5 : 1))) * unit * (unit === 1 ? 5 : 1) || lo + 10;
  const W = 560, x = n => 24 + (n - lo) / (hi - lo) * (W - 48), y = 96;
  const tick = unit === 1 ? 1 : unit === 10 ? (hi - lo <= 120 ? 1 : 10) : 10, lab = unit === 1 ? 5 : unit === 10 ? 10 : 100;
  let s = `<line x1="${x(lo) - 12}" y1="${y}" x2="${x(hi) + 12}" y2="${y}" class="s-ink" stroke-width="3"/>`;
  if ((hi - lo) / tick <= 160) for (let n = lo; n <= hi; n += tick) { const big = n % lab === 0; s += `<line x1="${x(n)}" y1="${y - (big ? 9 : 5)}" x2="${x(n)}" y2="${y + (big ? 9 : 5)}" class="s-ink" stroke-width="${big ? 2.5 : 1.2}"/>`; }
  for (let n = lo; n <= hi; n += lab) s += `<text x="${x(n)}" y="${y + 30}" text-anchor="middle" font-size="14" class="f-ink">${n}</text>`;
  let p = start;
  jumps.slice(0, upto).forEach((j, i) => {
    const a = x(p), b = x(p + j), mid = (a + b) / 2, hgt = Math.min(60, Math.max(26, Math.abs(b - a) * .45));
    s += `<path d="M${a} ${y - 4} Q${mid} ${y - 4 - hgt * 2} ${b} ${y - 4}" fill="none" class="${j > 0 ? 's-blue' : 's-red'} ${i === upto - 1 ? 'ex-new' : ''}" stroke-width="3" marker-end="url(#ah)"/>`;
    s += `<text x="${mid}" y="${y - 10 - hgt}" text-anchor="middle" font-size="16" class="${j > 0 ? 'f-blue' : 'f-red'}" font-weight="700">${j > 0 ? '+' : '−'}${Math.abs(j)}</text>`;
    p += j;
  });
  s += `<circle cx="${x(start)}" cy="${y}" r="7" class="f-ink"/><circle cx="${x(p)}" cy="${y}" r="9" class="f-hi s-ink" stroke-width="2.5"/>`;
  s += `<text x="${x(p)}" y="${y + 52}" text-anchor="middle" font-size="18" font-weight="700" class="f-ink">${p}</text>`;
  return svg(W, 160, `<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="context-stroke" class="f-ink"/></marker></defs>${s}`, 'ex-svg');
}
function dotRows(rows, cols, showRows) {
  const r = 11, gap = 30, w = cols * gap + 20, hh = rows * gap + 20; let s = '';
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) s += `<circle cx="${20 + j * gap}" cy="${20 + i * gap}" r="${r}" class="${i < showRows ? (i === showRows - 1 ? 'f-hi s-ink ex-new' : 'f-blue') : 'f-none s-line'}" stroke-width="2"/>`;
  for (let i = 0; i < showRows; i++) s += `<text x="${cols * gap + 4}" y="${26 + i * gap}" font-size="14" class="f-ink">${(i + 1) * cols}</text>`;
  return svg(w + 30, hh, s, 'ex-svg');
}
function groupDots(total, size, showGroups) {
  const q = Math.floor(total / size), r = total % size, cols = Math.min(size, 5), rowsIn = Math.ceil(size / cols);
  const gw = cols * 18 + 14, gh = rowsIn * 18 + 14, per = Math.max(1, Math.floor(540 / (gw + 10)));
  let s = '', gi = 0;
  const place = k => [6 + (k % per) * (gw + 10), 6 + Math.floor(k / per) * (gh + 10)];
  for (; gi < q; gi++) {
    const [ox, oy] = place(gi), on = gi < showGroups;
    if (on) s += `<rect x="${ox}" y="${oy}" width="${gw}" height="${gh}" rx="10" class="f-soft s-blue ${gi === showGroups - 1 ? 'ex-new' : ''}" stroke-width="2"/>`;
    for (let d = 0; d < size; d++) s += `<circle cx="${ox + 14 + (d % cols) * 18}" cy="${oy + 14 + Math.floor(d / cols) * 18}" r="6.5" class="${on ? 'f-blue' : 'f-none s-line'}" stroke-width="1.5"/>`;
  }
  if (r) { const [ox, oy] = place(gi); for (let d = 0; d < r; d++) s += `<circle cx="${ox + 14 + (d % cols) * 18}" cy="${oy + 14 + Math.floor(d / cols) * 18}" r="6.5" class="${showGroups >= q ? 'f-red' : 'f-none s-line'}" stroke-width="1.5"/>`; }
  const rowsTot = Math.ceil((q + (r ? 1 : 0)) / per);
  return svg(Math.min(per, q + (r ? 1 : 0)) * (gw + 10) + 8, rowsTot * (gh + 10) + 8, s, 'ex-svg');
}
function colGrid(a, op, b, opt) {   // opt: { res: digits shown from right, cur: column index, carries: {col: '1'}, bplus: {col: '+1'} }
  const A = String(a), B = String(b), R = String(opt.full), n = Math.max(A.length, B.length, R.length);
  const cell = (txt, cls = '') => `<span class="cg ${cls}">${txt}</span>`;
  const colCls = i => (i === opt.cur ? ' cur' : '');
  const row = (str, from) => Array.from({ length: n }, (_, k) => { const i = n - 1 - k, ch = str[str.length - 1 - i]; return cell(ch !== undefined ? ch : '', colCls(i) + (from ? ' ' + from : '')); }).join('');
  const carry = Array.from({ length: n }, (_, k) => { const i = n - 1 - k; return cell(opt.carries && opt.carries[i] ? opt.carries[i] : '', 'carry' + colCls(i)); }).join('');
  const brow = Array.from({ length: n }, (_, k) => { const i = n - 1 - k, ch = B[B.length - 1 - i]; return cell((ch !== undefined ? ch : '') + (opt.bplus && opt.bplus[i] ? `<sup>${opt.bplus[i]}</sup>` : ''), colCls(i)); }).join('');
  const res = Array.from({ length: n }, (_, k) => { const i = n - 1 - k, ch = R[R.length - 1 - i]; return cell(i < opt.res && ch !== undefined ? ch : '', 'res' + colCls(i) + (i === opt.res - 1 ? ' ex-new' : '')); }).join('');
  return `<div class="cgrid" style="--n:${n}">${cell('')}${carry}${cell('')}${row(A)}${cell(op, 'op')}${brow}<span class="cline"></span>${cell('')}${res}</div>`;
}
function clockEx(hh, mm, mode) {
  let s = `<circle cx="70" cy="70" r="66" class="f-card s-ink" stroke-width="4"/>`;
  if (mode === 'min' || mode === 'all') { const ma = mm * 6 * Math.PI / 180, big = mm > 30 ? 1 : 0; if (mm > 0) s += `<path d="M70 70 L70 12 A58 58 0 ${big} 1 ${70 + 58 * Math.sin(ma)} ${70 - 58 * Math.cos(ma)} Z" class="f-hi ex-new" opacity=".55"/>`; }
  for (let i = 0; i < 60; i++) { const a = i * 6 * Math.PI / 180, r1 = i % 5 ? 60 : 56; s += `<line x1="${70 + r1 * Math.sin(a)}" y1="${70 - r1 * Math.cos(a)}" x2="${70 + 63 * Math.sin(a)}" y2="${70 - 63 * Math.cos(a)}" class="s-ink" stroke-width="${i % 5 ? 1 : 2.5}"/>`; }
  for (let i = 1; i <= 12; i++) { const a = i * 30 * Math.PI / 180; s += `<text x="${70 + 45 * Math.sin(a)}" y="${70 - 45 * Math.cos(a) + 5}" text-anchor="middle" font-size="15" class="f-ink">${i}</text>`; }
  const ha = ((hh % 12) * 30 + mm * .5) * Math.PI / 180, ma = mm * 6 * Math.PI / 180;
  const hourOn = mode !== 'min', minOn = mode !== 'hour';
  s += `<line x1="70" y1="70" x2="${70 + 30 * Math.sin(ha)}" y2="${70 - 30 * Math.cos(ha)}" class="${hourOn ? 's-red' : 's-line'}" stroke-width="${mode === 'hour' ? 8 : 6}" stroke-linecap="round"/>`;
  s += `<line x1="70" y1="70" x2="${70 + 50 * Math.sin(ma)}" y2="${70 - 50 * Math.cos(ma)}" class="${minOn ? 's-blue' : 's-line'}" stroke-width="${mode === 'min' ? 6 : 3.5}" stroke-linecap="round"/>`;
  s += `<circle cx="70" cy="70" r="4" class="f-ink"/>`;
  return svg(140, 140, s, 'ex-svg ex-clock');
}
const tiles = (toks, cls = () => '', divs = new Set()) => `<div class="ltiles">${toks.map((g, i) => (divs.has(i) ? '<span class="ldiv ex-new">-</span>' : '') + `<span class="lt ${cls(i)}">${g}</span>`).join('')}</div>`;

/* ---------- explanations: each returns [{ v: visual html, t: caption }] ---------- */
const EXPLAIN = {
  add({ a, b }) {
    const s = a + b;
    if (a < 10 && b < 10 && s > 10) {
      const need = 10 - a, rest = b - need;
      return [
        { v: frames([[a, 'f-blue']]), t: `${a} + ${b} = ? Van ${a} kék pötty.` },
        { v: frames([[a, 'f-blue'], [need, 'f-red']]), t: `Töltsük fel a tízes keretet! A 10-hez még ${need} kell: ${a} + ${need} = 10.` },
        { v: frames([[a, 'f-blue'], [need, 'f-red'], [rest, 'f-hi']]), t: `A második számból már ${need} elfogyott, még ${rest} maradt.` },
        { v: frames([[a, 'f-blue'], [need, 'f-red'], [rest, 'f-hi']]), t: `10 + ${rest} = ${s}. Tehát ${a} + ${b} = ${s}.` }];
    }
    if (s <= 20) return [{ v: frames([[a, 'f-blue']]), t: `Van ${a} pötty.` }, { v: frames([[a, 'f-blue'], [b, 'f-red']]), t: `Hozzáteszünk még ${b} pöttyöt.` }, { v: frames([[a, 'f-blue'], [b, 'f-red']]), t: `Összesen ${s}. Tehát ${a} + ${b} = ${s}.` }];
    const unit = a >= 100 && b % 10 === 0 && b >= 100 ? 100 : 10;
    const t = b - b % unit, e = b % unit, nextR = Math.ceil((a + t) / unit) * unit, x = Math.min(e, nextR - (a + t)), y = e - x;
    const jumps = [t, x, y].filter(j => j > 0), steps = [{ v: jumpLine(a, jumps, 0), t: `${a} + ${b} = ? Induljunk el az első számtól a számegyenesen.` }];
    let cur = a, k = 0;
    if (t) { k++; steps.push({ v: jumpLine(a, jumps, k), t: `Előbb hozzáadjuk a ${unit === 100 ? 'százasokat' : 'tízeseket'}: ${cur} + ${t} = ${cur + t}.` }); cur += t; }
    if (x) { k++; steps.push({ v: jumpLine(a, jumps, k), t: y ? `Kiegészítjük a következő kerek ${unit === 100 ? 'százasig' : 'tízesig'}: ${cur} + ${x} = ${cur + x}.` : `Hozzáadjuk az egyeseket: ${cur} + ${x} = ${cur + x}.` }); cur += x; }
    if (y) { k++; steps.push({ v: jumpLine(a, jumps, k), t: `Hozzáadjuk, ami még maradt: ${cur} + ${y} = ${cur + y}.` }); cur += y; }
    steps.push({ v: jumpLine(a, jumps, jumps.length), t: `Megérkeztünk: ${a} + ${b} = ${s}.` });
    return steps;
  },
  sub({ a, b }) {
    const d = a - b;
    if (a <= 20 && b < 10 && a > 10 && a - b < 10) {
      const u = a - 10, rest = b - u;
      return [
        { v: frames([[a, 'f-blue']]), t: `${a} − ${b} = ? Van ${a} pötty: egy teli tízes keret és még ${u}.` },
        { v: frames([[10, 'f-blue'], [u, 'f-none s-red']]), t: `Előbb elveszünk ${u} pöttyöt, hogy éppen 10 maradjon.` },
        { v: frames([[10 - rest, 'f-blue'], [rest, 'f-none s-red']]), t: `Még ${rest} pöttyöt kell elvenni: 10 − ${rest} = ${d}.` },
        { v: frames([[d, 'f-blue']]), t: `Tehát ${a} − ${b} = ${d}.` }];
    }
    if (a <= 20) return [{ v: frames([[a, 'f-blue']]), t: `Van ${a} pötty.` }, { v: frames([[d, 'f-blue'], [b, 'f-none s-red']]), t: `Elveszünk ${b} pöttyöt.` }, { v: frames([[d, 'f-blue']]), t: `Maradt ${d}. Tehát ${a} − ${b} = ${d}.` }];
    const unit = a >= 100 && b % 100 === 0 ? 100 : 10;
    const t = b - b % unit, e = b % unit, low = Math.floor((a - t) / unit) * unit, x = Math.min(e, (a - t) - low), y = e - x;
    const jumps = [-t, -x, -y].filter(j => j < 0), steps = [{ v: jumpLine(a, jumps, 0), t: `${a} − ${b} = ? Induljunk el ${azN(a)} ${a} számtól, és lépjünk visszafelé.` }];
    let cur = a, k = 0;
    if (t) { k++; steps.push({ v: jumpLine(a, jumps, k), t: `Előbb elvesszük a ${unit === 100 ? 'százasokat' : 'tízeseket'}: ${cur} − ${t} = ${cur - t}.` }); cur -= t; }
    if (x) { k++; steps.push({ v: jumpLine(a, jumps, k), t: y ? `Visszalépünk a kerek ${unit === 100 ? 'százasig' : 'tízesig'}: ${cur} − ${x} = ${cur - x}.` : `Elvesszük az egyeseket: ${cur} − ${x} = ${cur - x}.` }); cur -= x; }
    if (y) { k++; steps.push({ v: jumpLine(a, jumps, k), t: `Elvesszük, ami még maradt: ${cur} − ${y} = ${cur - y}.` }); cur -= y; }
    steps.push({ v: jumpLine(a, jumps, jumps.length), t: `Megérkeztünk: ${a} − ${b} = ${d}.` });
    return steps;
  },
  mul({ a, b }) {
    const show = a <= 5 ? Array.from({ length: a }, (_, i) => i + 1) : [1, 2, 5, a].filter((v, i, arr) => arr.indexOf(v) === i);
    const st = show.map(k => ({ v: dotRows(a, b, k), t: k === a ? `${a === 1 ? `${a} · ${b} azt jelenti: 1 sor, benne ${b} pötty. ` : ''}${a} sor: ${a} · ${b} = ${a * b}.` : k === 1 ? `${a} · ${b} azt jelenti: ${a} sor, mindegyikben ${b} pötty. Az első sor: ${b}.` : k === 5 && a > 5 ? `5 sor: 5 · ${b} = ${5 * b}. Ezt könnyű megjegyezni!` : `${k} sor: ${Array(k).fill(b).join(' + ')} = ${k * b}.` }));
    if (a > 5 && a < 10) st.splice(st.length - 1, 0, { v: dotRows(a, b, a), t: `5 sorhoz jön még ${a - 5} sor: ${5 * b} + ${(a - 5) * b} = ${a * b}.` });
    if (a === 9) st.push({ v: dotRows(a, b, a), t: `Trükk: 9 sor = 10 sor − 1 sor: ${10 * b} − ${b} = ${9 * b}.` });
    return st;
  },
  divrem({ a, b }) {
    const q = Math.floor(a / b), r = a % b, small = a <= 60;
    const pic = k => small ? groupDots(a, b, k) : `<div class="ex-big">${a} : ${b}</div>`;
    const st = [{ v: pic(0), t: `${a} : ${b} = ? Hány ${esN(b)} csoportot tudunk kirakni ${a} pöttyből?` }];
    if (small) st.push({ v: pic(1), t: `Az első csoport: ${b} pötty.` });
    st.push({ v: pic(q), t: `Gondolj a szorzótáblára: ${q} · ${b} = ${q * b}${q < 10 && (q + 1) * b <= a + b - 1 ? `, de ${q + 1} · ${b} = ${(q + 1) * b} már több, mint ${a}` : ''}. Tehát ${q} csoport lesz.` });
    st.push({ v: pic(q), t: r ? `Kimaradt ${a} − ${q * b} = ${r} pötty: ez a maradék. A maradék mindig kisebb, mint ${b}. Tehát ${a} : ${b} = ${q}, maradék ${r}.` : `Nem maradt ki semmi. Tehát ${a} : ${b} = ${q}.` });
    return st;
  },
  coladd({ a, b }) {
    const A = String(a), B = String(b), full = a + b, n = Math.max(A.length, B.length), st = [];
    const carries = {}; let c = 0;
    st.push({ v: colGrid(a, '+', b, { full, res: 0, cur: -1, carries: {} }), t: 'Az azonos helyiértékek pontosan egymás alatt vannak. Jobbról balra, az egyesekkel kezdünk.' });
    for (let i = 0; i < n; i++) {
      const x = +(A[A.length - 1 - i] || 0), y = +(B[B.length - 1 - i] || 0), s = x + y + c;
      const parts = [x, y].concat(c ? [c] : []).join(' + ');
      const msg = `${cap(PLACES[i])}: ${parts} = ${s}. ` + (s >= 10 ? (i === n - 1 ? `Leírjuk: ${s}.` : `Leírjuk alulra: ${s % 10}, és maradt az 1. Ezt a következő oszlophoz adjuk.`) : `Leírjuk alulra: ${s}.`);
      c = s >= 10 ? 1 : 0;
      if (c && i < n - 1) carries[i + 1] = '1';
      st.push({ v: colGrid(a, '+', b, { full, res: s >= 10 && i === n - 1 ? i + 2 : i + 1, cur: i, carries: { ...carries } }), t: msg });
    }
    st.push({ v: colGrid(a, '+', b, { full, res: String(full).length, cur: -1, carries }), t: `Kész: ${a} + ${b} = ${full}.` });
    return st;
  },
  colsub({ a, b }) {
    const A = String(a), B = String(b), full = a - b, n = A.length, st = [], plus = {};
    let c = 0;
    st.push({ v: colGrid(a, '−', b, { full, res: 0, cur: -1 }), t: 'Jobbról balra haladunk. Minden oszlopban azt keressük: az alsó számhoz mennyit kell adni, hogy a felsőt kapjuk?' });
    for (let i = 0; i < n; i++) {
      const x = +A[A.length - 1 - i], y0 = +(B[B.length - 1 - i] || 0), y = y0 + c, big = y > x, target = big ? x + 10 : x, d = target - y;
      let msg = `${cap(PLACES[i])}: `;
      if (c) msg += `az alsó számjegyhez hozzáadjuk a maradt 1-et: ${y0} + 1 = ${y}. `;
      msg += `${hozN(y)} mennyit kell adni, hogy ${target} legyen? ${d}. `;
      msg += big ? `Leírjuk alulra: ${d}, és maradt az 1.` : `Leírjuk alulra: ${d}.`;
      if (c) plus[i] = '+1';
      st.push({ v: colGrid(a, '−', b, { full, res: i + 1, cur: i, bplus: { ...plus } }), t: msg.replace(/^(.)/, ch => ch.toUpperCase()) });
      c = big ? 1 : 0;
    }
    st.push({ v: colGrid(a, '−', b, { full, res: n, cur: -1, bplus: plus }), t: `Kész: ${a} − ${b} = ${full}. Ellenőrzés: ${full} + ${b} = ${a}.` });
    return st;
  },
  fracof({ W, n, kk }) {
    const one = W / n;
    const pic = k => { const cols = n, per = one, dcol = Math.min(per, 5), rws = Math.ceil(per / dcol); let s = ''; for (let g = 0; g < cols; g++) { const ox = 6 + g * (dcol * 16 + 18); s += `<rect x="${ox}" y="6" width="${dcol * 16 + 8}" height="${rws * 16 + 8}" rx="8" class="${k && g < kk ? 'f-hi' : 'f-soft'} s-line ${k && g === kk - 1 ? 'ex-new' : ''}" stroke-width="1.5"/>`; for (let d = 0; d < per; d++) s += `<circle cx="${ox + 12 + (d % dcol) * 16}" cy="${18 + Math.floor(d / dcol) * 16}" r="5.5" class="f-blue"/>`; } return svg(cols * (dcol * 16 + 18) + 6, rws * 16 + 22, s, 'ex-svg'); };
    const st = [{ v: pic(0), t: `${W} pöttyöt ${n} egyenlő részre osztunk.` }, { v: pic(1), t: `Egy rész: ${W} : ${n} = ${one}.` }];
    if (kk > 1) st.push({ v: pic(kk), t: `${kk} rész: ${one} · ${kk} = ${one * kk}.` });
    return st;
  },
  pie({ kk, n }) {
    return [{ v: pieSvg(n, 0).replace('class="vis', 'class="vis ex-svg'), t: `A kört ${n} egyenlő részre vágtuk. Ez a nevező: alul áll.` },
      { v: pieSvg(n, kk).replace('class="vis', 'class="vis ex-svg'), t: `Ebből ${kk} rész színes. Ez a számláló: felül áll.` },
      { v: `<div class="ex-big">${fr(kk, n)}</div>`, t: `Tehát a kör ${kk}/${n} része színes.` }];
  },
  clock({ hh, mm }) {
    const nx = hh % 12 + 1, pos = mm / 5;
    const st = [{ v: clockEx(hh, mm, 'hour'), t: mm === 0 ? `Először a kismutatót nézzük (piros, rövid). Pontosan ${azN(hh)} ${onN(hh)} áll.` : `Először a kismutatót nézzük (piros, rövid). ${cap(azN(hh))} ${hh} és ${azN(nx)} ${nx} között van, tehát már elmúlt ${hh} óra.` }];
    if (mm === 0) st.push({ v: clockEx(hh, mm, 'min'), t: 'A nagymutató (kék, hosszú) a 12-n áll: egész óra van.' });
    else if (Number.isInteger(pos)) st.push({ v: clockEx(hh, mm, 'min'), t: `A nagymutató (kék, hosszú) ${azN(pos)} ${onN(pos)} áll. Minden szám 5 perc, így ${pos} · 5 = ${mm} perc telt el.` });
    else st.push({ v: clockEx(hh, mm, 'min'), t: `A nagymutató (kék, hosszú) ${mm} percnél áll: számold ötösével a számokat, aztán egyesével a kis vonalakat.` });
    const say = mm === 0 ? `${hh} óra` : mm === 15 ? `Negyedóra telt el ${hh} óra után, úton vagyunk ${nx} óra felé. Ezért ezt mondjuk: negyed ${nx}.` : mm === 30 ? `Fél óra telt el: félúton vagyunk ${nx} óra felé. Ezért ezt mondjuk: fél ${nx}.` : mm === 45 ? `Háromnegyed óra telt el, mindjárt ${nx} óra. Ezért ezt mondjuk: háromnegyed ${nx}.` : `${hh} óra ${mm} perc van.`;
    st.push({ v: clockEx(hh, mm, 'all'), t: (mm === 0 ? `Tehát ${say} van.` : say) + ` Digitálisan: ${hh}:${String(mm).padStart(2, '0')}.` });
    return st;
  },
  length({ w, i, g, vowel }) {
    const tk = tok(w); let pos = 0, ti = 0; for (; ti < tk.length; ti++) { if (pos === i) break; pos += tk[ti].length; }
    const doubled = !vowel && /^(.)\1$/.test(g), isLong = vowel ? /[áéíóőúű]/.test(g) : doubled;
    const shortG = vowel ? ({ á: 'a', é: 'e', í: 'i', ó: 'o', ő: 'ö', ú: 'u', ű: 'ü' }[g] || g) : g[0], longG = vowel ? ({ a: 'á', e: 'é', i: 'í', o: 'ó', ö: 'ő', u: 'ú', ü: 'ű' }[g] || g) : g[0] + g[0];
    const hl = k => k === ti || (doubled && k === ti + 1) ? 'hl' : '';
    const bar = long => `<div class="lenbar ex-new"><span style="width:${long ? 86 : 32}%"></span><b>${long ? 'hosszú hang' : 'rövid hang'}</b></div>`;
    return [
      { v: tiles(tk), t: `Mondd ki lassan, hangosan: ${w}. Figyeld, melyik hang hogyan szól!`, say: w },
      { v: tiles(tk, hl) + bar(isLong), t: `A kiemelt hang ${isLong ? 'hosszan' : 'röviden'} szól.`, say: w },
      { v: tiles(tk, hl), t: vowel ? (isLong ? `Hosszú magánhangzó: ékezettel írjuk: ${longG}.` : `Rövid magánhangzó: ékezet nélkül írjuk: ${shortG}.`) : (isLong ? `Hosszú mássalhangzó: két betűvel írjuk: ${longG}.` : `Rövid mássalhangzó: egy betűvel írjuk: ${shortG}.`) + ` Helyesen: ${w}.` }];
  },
  syl({ w }) {
    const plain = w.replace(/-/g, ''), tk = tok(plain), V = new Set(['a', 'á', 'e', 'é', 'i', 'í', 'o', 'ó', 'ö', 'ő', 'u', 'ú', 'ü', 'ű']);
    const vi = tk.map((g, i) => V.has(g) ? i : -1).filter(i => i >= 0), bounds = []; w.split('-').reduce((acc, x) => { acc += tok(x).length; bounds.push(acc); return acc; }, 0); bounds.pop();
    const vcls = k => V.has(tk[k]) ? 'hl' : '';
    const st = [{ v: tiles(tk), t: `Bontsuk betűkre: ${plain}. A kétjegyű betűk (cs, sz, ny…) egy betűnek számítanak.` },
      { v: tiles(tk, vcls), t: `Keressük meg a magánhangzókat! ${vi.length} van, tehát a szó ${vi.length} szótagú.` }];
    const shown = new Set();
    bounds.forEach((bd, j) => {
      const left = vi[j], right = vi[j + 1], between = tk.slice(left + 1, right);
      shown.add(bd);
      const why = between.length === 0 ? 'Két magánhangzó áll egymás mellett: közöttük választunk el.' : between.length === 1 ? `Két magánhangzó között egy mássalhangzó van (${between[0]}): az átmegy a következő szótagba.` : `Két magánhangzó között ${between.length} mássalhangzó van (${between.join(', ')}): csak az utolsó megy át a következő szótagba.`;
      st.push({ v: tiles(tk, vcls, new Set(shown)), t: why });
    });
    st.push({ v: tiles(tk, () => '', new Set(bounds)), t: `Így választjuk el: ${w}.` });
    return st;
  }
};

/* ---------- player (modal) ---------- */
let expOpen = null;
function openExplain(ex, title) {
  if (!ex || !EXPLAIN[ex.k]) return;
  const steps = EXPLAIN[ex.k](ex); let i = 0;
  const prevFocus = document.activeElement;
  const vis = h('div', { class: 'exp-vis', 'aria-live': 'polite' }), txt = h('p', { class: 'exp-txt' }), dots = h('div', { class: 'exp-dots', 'aria-hidden': 'true' });
  const back = h('button', { class: 'btn', onclick: () => go(i - 1) }, '◀ Vissza'), fwd = h('button', { class: 'btn primary', onclick: () => i < steps.length - 1 ? go(i + 1) : close() });
  const sp = canSpeak() ? h('button', { class: 'btn small', onclick: () => speak(steps[i].t) }, '🔊') : null;
  const card = h('div', { class: 'exp-card', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Így működik' },
    h('div', { class: 'exp-head' }, h('span', { class: 'exp-badge' }, '💡 Így működik'), title ? h('span', { class: 'mute' }, title) : null, h('button', { class: 'exp-x', 'aria-label': 'Bezárás', onclick: () => close() }, '✕')),
    vis, txt, dots, h('div', { class: 'actions' }, back, sp, fwd));
  const ov = h('div', { class: 'exp-ov', onclick: e => { if (e.target === ov) close(); } }, card);
  const go = k => {
    i = Math.max(0, Math.min(steps.length - 1, k));
    vis.innerHTML = steps[i].v; txt.textContent = steps[i].t;
    dots.replaceChildren(...steps.map((_, j) => h('i', { class: j === i ? 'now' : j < i ? 'ok' : '' })));
    back.disabled = i === 0; fwd.textContent = i < steps.length - 1 ? 'Tovább ▶' : 'Értem!';
    if (autoRead() && canSpeak()) speak(steps[i].t);
  };
  const onKey = e => {
    e.stopImmediatePropagation();
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') { if (e.target.tagName !== 'BUTTON' || e.key === 'ArrowRight') { e.preventDefault(); fwd.click(); } }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
  };
  const close = () => { window.removeEventListener('keydown', onKey, true); ov.remove(); expOpen = null; try { speechSynthesis.cancel(); } catch (e) {} if (prevFocus && prevFocus.focus) prevFocus.focus(); };
  window.addEventListener('keydown', onKey, true);
  document.body.append(ov); expOpen = close;
  go(0); fwd.focus();
}
// a similar example (different numbers) from the same topic, so the explanation does not give the answer away
function exSource(q) {
  if (!S || !q) return null;
  const pid = q._page || (S.page && S.page.id), tid = q._topic || (S.topic && S.topic.id);
  const ex = deriveEx(q, pid, tid); if (!ex || !EXPLAIN[ex.k]) return null;
  const page = PAGES[pid], t = page && page.topics && page.topics.find(x => x.id === tid);
  return { pid, tid, ex, gen: t && t.gen };
}
function similarEx(q, gen, level, pid, tid) {
  const ex = deriveEx(q, pid, tid);
  if (!ex || !gen) return null;
  const key = JSON.stringify(ex);
  for (let g = 0; g < 25; g++) {
    let q2; try { q2 = gen(level); } catch (e) { return null; }
    const e2 = deriveEx(q2, pid, tid);
    if (e2 && e2.k === ex.k && JSON.stringify(e2) !== key) return e2;
  }
  return null;
}

/* ===== Napi 5 perc: spaced daily review and weekly goal ===== */
// Each practised topic sits in a "box" 1–5. A good round moves it up (seen less often), a weak one back to box 1.
const INTERVAL = [0, 1, 2, 4, 7, 14];          // days until the next review, by box
const GOAL = 4;                                 // practice days per week
const WD = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'];
const dayNo = (t = Date.now()) => Math.floor((t - new Date(t).getTimezoneOffset() * 6e4) / 864e5);
const RVK = () => `tt.${active}.rv`, DAYS = () => `tt.${active}.days`, DONE = () => `tt.${active}.daily`;
const getRv = () => store.get(RVK(), {});
function markDay() { const d = dayNo(), l = store.get(DAYS(), []); if (!l.includes(d)) { l.push(d); store.set(DAYS(), l.slice(-120)); } }
function rvUpdate(pid, tid, ok) {          // ok: true = step up, false = back to box 1, null = stay
  const rv = getRv(), k = `${pid}/${tid}`, e = rv[k] || { b: 1, d: dayNo(), n: 0 };
  if (ok === true) e.b = Math.min(5, e.b + 1); else if (ok === false) e.b = 1;
  e.d = dayNo() + INTERVAL[e.b]; e.n = (e.n || 0) + 1; rv[k] = e; store.set(RVK(), rv);
}
function reviewAfterRound(page, topic, correct) {
  markDay();
  if (!page || !topic || !page.topics || !topic.gen) return;
  rvUpdate(page.id, topic.id, correct >= 9 ? true : correct < 7 ? false : null);
}
function weekInfo() {
  const wd = (new Date().getDay() + 6) % 7, today = dayNo(), start = today - wd, days = new Set(store.get(DAYS(), []));
  const arr = WD.map((_, i) => ({ on: days.has(start + i), today: start + i === today, future: start + i > today }));
  return { arr, count: arr.filter(x => x.on).length };
}
function weekEl() {
  const { arr, count } = weekInfo();
  return h('div', { class: 'week' },
    h('div', { class: 'wdots', 'aria-label': `Ezen a héten ${count} napon gyakoroltál` }, arr.map((x, i) => h('span', { class: 'wd' + (x.on ? ' on' : '') + (x.today ? ' today' : '') + (x.future ? ' fut' : '') }, h('i', null, x.on ? '✓' : ''), h('small', null, WD[i])))),
    h('span', { class: 'wgoal' }, count >= GOAL ? `Heti cél teljesítve: ${count} nap! 🎉` : `Heti cél: ${count} / ${GOAL} nap`));
}
function dailyList() {
  const rv = getRv(), today = dayNo();
  const entries = Object.entries(rv).map(([k, e]) => {
    const [pid, tid] = k.split('/'), p = PAGES[pid], t = p && p.topics && p.topics.find(x => x.id === tid);
    return t && t.gen && printable(t) ? { pid, tid, t, e } : null;
  }).filter(Boolean);
  if (!entries.length) return null;
  const order = (a, b) => a.e.b - b.e.b || a.e.d - b.e.d;
  const due = entries.filter(x => x.e.d <= today).sort(order), later = entries.filter(x => x.e.d > today).sort(order);
  const pool = due.length >= 3 ? due.slice(0, 6) : due.concat(later).slice(0, 4);
  const items = shuffle(getMistakes()).slice(0, 3).map(m => ({ ...m.q, _page: m.p, _topic: m.t, _mk: m.k }));
  const seen = new Set(items.map(q => q.prompt + '|' + q.answer));
  let i = 0, guard = 0;
  while (items.length < 10 && guard++ < 80) {
    const x = pool[i++ % pool.length], lvl = Math.max(1, store.get(pk(x.pid, x.tid, 'lvl'), 1) - (x.e.b === 1 ? 1 : 0));
    try { const q = x.t.gen(lvl), key = q.prompt + '|' + q.answer; if (q && q.type !== 'read' && !q.autoSpeak && !seen.has(key)) { seen.add(key); items.push({ ...q, _page: x.pid, _topic: x.tid }); } } catch (e) {}
  }
  return shuffle(items);
}
function startDaily() {
  const list = dailyList(); if (!list || !list.length) return;
  const res = {};
  startList({
    page: { id: 'napi', title: 'Napi 5 perc', topics: [] }, title: 'Napi 5 perc', list,
    back: () => { S = null; showHub(); },
    onAnswer: (q, first) => {
      if (q._mk) { if (first) setMistakes(getMistakes().filter(m => m.k !== q._mk)); return; }
      if (!first) rememberMistake(PAGES[q._page], { id: q._topic }, q);
      const k = q._page + '/' + q._topic; res[k] = res[k] === false ? false : first;
    },
    onFinish: s => {
      Object.entries(res).forEach(([k, ok]) => { const [p, t] = k.split('/'); rvUpdate(p, t, ok); });
      store.set(DONE(), dayNo()); markDay();
      const { count } = weekInfo();
      mount(h('div', { class: 'qcard results' },
        h('p', { class: 'mute' }, 'Napi 5 perc'),
        h('h2', null, `${s.correct} / ${s.total} jó elsőre`),
        h('div', { class: 'pop sz-trophy', html: count >= GOAL ? '🏆' : s.correct >= s.total - 1 ? '🌟' : '⭐' }),
        weekEl(),
        h('p', { class: 'mute' }, count >= GOAL ? 'Megvan a heti cél! Holnap új ismétlés vár.' : `Holnap új ismétlés vár. Még ${GOAL - count} nap, és megvan a heti cél.`),
        h('div', { class: 'actions' }, h('button', { class: 'btn primary', onclick: () => { S = null; showHub(); } }, 'Főoldal'), h('button', { class: 'btn', onclick: startDaily }, 'Még egy kör'))));
    }
  });
}
function hubTop() {
  const done = store.get(DONE(), -1) === dayNo(), any = Object.keys(getRv()).length > 0;
  return [h('section', { class: 'daily' + (done ? ' done' : '') },
    h('div', { class: 'daily-main' },
      h('span', { class: 'daily-ico', 'aria-hidden': 'true' }, done ? '✅' : '⏱️'),
      h('div', { class: 'daily-txt' }, h('h2', null, done ? 'Mára kész a Napi 5 perc!' : 'Napi 5 perc'),
        h('p', { class: 'mute' }, !any ? 'Gyakorolj néhány témát, és innentől minden nap összeállítom a legfontosabb ismétlést.' : done ? 'Holnap új ismétlés vár. Ha van kedved, jöhet még egy kör.' : 'Rövid, vegyes ismétlés abból, amit már tanultál. Ami nehezebb volt, gyakrabban visszajön.')),
      any ? h('button', { class: 'btn primary', onclick: startDaily }, done ? 'Még egy kör' : 'Indulás') : null),
    weekEl())];
}

window.STANDALONE = true;
route();
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  addEventListener('load', () => navigator.serviceWorker.register(BASE + 'sw.js').catch(() => {}));
}
