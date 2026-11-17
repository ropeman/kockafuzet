'use strict';
const BASE = '/kockafuzet/';
const PAGE_IDS = ["matek-1", "matek-2", "matek-3", "matek-4", "magyar-1", "magyar-2", "magyar-3", "magyar-4", "kornyezet-4"];
const HERO_SVG = "<svg viewBox=\"0 0 440 340\" role=\"img\" aria-label=\"Kock\u00e1s f\u00fczetlap egy \u00f6sszead\u00e1ssal, bet\u0171k\u00e1rty\u00e1val \u00e9s arany csillaggal\">\n<defs><pattern id=\"hg\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\"><path d=\"M20 0H0V20\" fill=\"none\" stroke=\"#3563e9\" stroke-opacity=\".17\" stroke-width=\"1\"/></pattern></defs>\n<g transform=\"rotate(-4 220 170)\">\n<rect x=\"66\" y=\"50\" width=\"300\" height=\"250\" rx=\"18\" fill=\"#1d2742\" opacity=\".1\"/>\n<rect x=\"58\" y=\"38\" width=\"300\" height=\"250\" rx=\"18\" fill=\"#ffffff\"/>\n<rect x=\"58\" y=\"38\" width=\"300\" height=\"250\" rx=\"18\" fill=\"url(#hg)\"/>\n<path d=\"M104 38v250\" stroke=\"#ee6a4c\" stroke-opacity=\".6\" stroke-width=\"2\"/>\n<circle cx=\"80\" cy=\"72\" r=\"6\" fill=\"#e9edf6\"/><circle cx=\"80\" cy=\"112\" r=\"6\" fill=\"#e9edf6\"/><circle cx=\"80\" cy=\"152\" r=\"6\" fill=\"#e9edf6\"/><circle cx=\"80\" cy=\"192\" r=\"6\" fill=\"#e9edf6\"/><circle cx=\"80\" cy=\"232\" r=\"6\" fill=\"#e9edf6\"/><circle cx=\"80\" cy=\"272\" r=\"6\" fill=\"#e9edf6\"/>\n<text x=\"124\" y=\"128\" font-family=\"Fredoka,ui-rounded,sans-serif\" font-weight=\"600\" font-size=\"44\" fill=\"#1d2742\">3 + 4 =</text>\n<circle cx=\"304\" cy=\"113\" r=\"31\" fill=\"#e8eefe\"/>\n<text x=\"304\" y=\"129\" text-anchor=\"middle\" font-family=\"Fredoka,ui-rounded,sans-serif\" font-weight=\"600\" font-size=\"44\" fill=\"#3563e9\">7</text>\n<text x=\"124\" y=\"206\" font-family=\"Fredoka,ui-rounded,sans-serif\" font-weight=\"500\" font-size=\"36\" fill=\"#1d2742\">ma \u00b7 m\u00e1 \u00b7 mi</text>\n<path d=\"M124 244h170\" stroke=\"#3563e9\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-dasharray=\"1 11\"/>\n</g>\n<g transform=\"translate(332 196) rotate(9)\">\n<rect y=\"7\" width=\"80\" height=\"80\" rx=\"17\" fill=\"#c9472b\"/>\n<rect width=\"80\" height=\"80\" rx=\"17\" fill=\"#ee6a4c\"/>\n<text x=\"40\" y=\"57\" text-anchor=\"middle\" font-family=\"Fredoka,ui-rounded,sans-serif\" font-weight=\"600\" font-size=\"46\" fill=\"#ffffff\">\u00c1</text>\n</g>\n<polygon points=\"62.0,26.0 72.0,52.2 100.0,53.6 78.2,71.3 85.5,98.4 62.0,83.0 38.5,98.4 45.8,71.3 24.0,53.6 52.0,52.2\" fill=\"#e0a812\" transform=\"translate(0 5)\"/>\n<polygon points=\"62.0,26.0 72.0,52.2 100.0,53.6 78.2,71.3 85.5,98.4 62.0,83.0 38.5,98.4 45.8,71.3 24.0,53.6 52.0,52.2\" fill=\"#ffc93c\"/>\n<g transform=\"translate(150 322) rotate(-5)\">\n<rect width=\"150\" height=\"20\" rx=\"4\" fill=\"#3563e9\"/><rect width=\"150\" height=\"6\" rx=\"3\" fill=\"#5a7fef\"/>\n<rect x=\"-22\" width=\"26\" height=\"22\" rx=\"5\" fill=\"#f2a7b8\"/><rect x=\"-2\" width=\"10\" height=\"22\" fill=\"#c9cfdc\"/>\n<polygon points=\"150,0 178,11 150,22\" fill=\"#f3d9a8\"/><polygon points=\"170,8 178,11 170,14\" fill=\"#1d2742\"/>\n</g>\n</svg>";
const SUBJ_ICON = {"matek": "<svg viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" aria-hidden=\"true\"><path d=\"M9 4v10M4 9h10M18 9h10M19.5 19.5l7 7M26.5 19.5l-7 7M4 21h10M4 26.5h10\"/></svg>", "magyar": "<svg viewBox=\"0 0 32 32\" aria-hidden=\"true\"><text x=\"16\" y=\"24\" text-anchor=\"middle\" font-family=\"Fredoka,ui-rounded,sans-serif\" font-weight=\"600\" font-size=\"21\" fill=\"currentColor\">Aa</text></svg>", "kornyezet": "<svg viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M7 25C7 13 15 6 27 5c0 12-7 20-19 20z\"/><path d=\"M7 25c4-6 9-10 14-13\"/></svg>", "jatek": "<svg viewBox=\"0 0 32 32\" aria-hidden=\"true\"><path d=\"M16 3.5l3.6 7.6 8.2 1-6 5.7 1.5 8.2L16 22l-7.3 4 1.5-8.2-6-5.7 8.2-1z\" fill=\"currentColor\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/></svg>"};
const SUBJ_DESC = {"matek": "Számolás, számok, mértékegységek, geometria és szöveges feladatok.", "magyar": "Betűk, olvasás, helyesírás, nyelvtan és szövegértés.", "kornyezet": "Természet, időjárás, testünk és egészségünk, hazánk tájai."};
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
const SUBJ_NAV = { matek: ['Matematika', '#matek'], magyar: ['Magyar nyelv és olvasás', '#magyar'], kornyezet: ['Környezetismeret', '#kornyezet'], jatek: ['Játékok', '#jatekok'] };
const subjOf = id => id.split('-')[0];
const PLAN = [
  { s: 'matek', name: 'Matematika' },
  { s: 'magyar', name: 'Magyar nyelv és olvasás' },
  { s: 'kornyezet', name: 'Környezetismeret', grades: [3, 4] }
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
    (sub.grades || [1, 2, 3, 4]).forEach(g => {
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
// fingerprint of a question: two questions with the same fingerprint look the same to the child
function qKey(q) {
  const plain = x => String(x ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const ans = q.answer !== null && typeof q.answer === 'object' && !Array.isArray(q.answer) ? '' : JSON.stringify(q.answer);
  const extra = q.type === 'sort' ? q.bins.map(b => b.label).join(',')
    : q.type === 'label' ? q.spots.map(s => q.labels.find(l => l.id === q.answer[s.id]).text).join(',')
    : q.type === 'riddle' ? q.clues[0] : q.type === 'lab' ? (q.mode || q.item || '') : q.type === 'map' ? q.map + (q.dots || []).length : '';
  return [q.type, plain(q.prompt), ans, extra, q.text || '', q.type === 'sort' || q.type === 'label' ? '' : String(q.visual || '').length].join('|');
}
function nextQ() {
  if (S.n >= S.total) return finish();
  let q;
  if (S.list) { S.q = S.list[S.n]; S.tries = 0; S.n++; return renderQ(); }
  // never repeat a question within one round; give up only if the topic has too few different questions
  // (if this level has run out of new questions, borrow one from the nearest other level)
  S.seen = S.seen || new Set();
  const fresh = L => { for (let k = 0; k < 60; k++) { const x = S.topic.gen(L); if (!S.seen.has(qKey(x))) return x; } return null; };
  q = [S.level, S.level - 1, S.level + 1, S.level - 2, S.level + 2].filter(L => L >= 1 && L <= 3).reduce((got, L) => got || fresh(L), null) || S.topic.gen(S.level);
  S.seen.add(qKey(q));
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
  if (q.visual) card.append(h('div', { class: 'visual', html: expandVis(q.visual) }));
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
  if (UI[q.type] && UI[q.type].judge) return UI[q.type].judge(q, resp);
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
    const txt = o => String(o.html).includes('<svg') ? '' : String(o.html).replace(/<[^>]+>/g, '');
    const longest = Math.max(...q.options.map(o => Math.max(...txt(o).split(' ').map(w => w.length))));
    const total = Math.max(...q.options.map(o => txt(o).length));
    const el = h('div', { class: 'opts' + (total > 26 ? ' xlong' : longest > 8 || total > 14 ? ' long' : '') });
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
      el: h('div', { style: 'display:flex;flex-direction:column;gap:16px;align-items:center;width:100%' }, h('div', { class: 'slots' + (q.answer.some(x => x.length > 3) ? ' words' : '') }, slotEls), h('div', { class: 'tilebank' }, bank)),
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

/* ===== Interactive question types: sort, label, set, riddle ===== */
// Sort and label work one card / one spot at a time: tap the answer, get feedback at once.
// A miss is remembered: the question is then scored like a second try (no retry round needed).
const noteMiss = n => { if (n && S) S.tries = Math.max(S.tries, 1); };

/* ---------- Válogató: which basket does this card go into? ---------- */
UI.sort = (q, send) => {
  const order = q.items.slice(), place = {}; let k = 0, miss = 0, missHere = false, busy = false, locked = false;
  const counter = h('div', { class: 'sprog' });
  const card = h('div', { class: 'scard', 'aria-live': 'polite' });
  const note = h('div', { class: 'snote' });
  const binList = Object.fromEntries(q.bins.map(b => [b.id, h('div', { class: 'sbin-items' })]));
  const binBtns = q.bins.map((b, i) => h('button', { class: 'sbtn', 'data-bin': b.id, onclick: () => pickBin(b.id) },
    h('span', { class: 'sbtn-k' }, String(i + 1)), h('span', { class: 'sbtn-l' }, b.label)));
  const bins = h('div', { class: 'sbins', style: `--n:${q.bins.length}` }, q.bins.map((b, i) => h('div', { class: 'sbin' }, binBtns[i], binList[b.id])));
  function show() {
    const it = order[k];
    counter.textContent = `${k + 1}. kártya a ${q.items.length}-ból`;
    card.innerHTML = `<div class="scard-in pop" data-id="${it.id}">${it.html}</div>`;
    note.textContent = 'Hová tartozik? Koppints a megfelelő kosárra!'; note.className = 'snote';
    binBtns.forEach(b => b.classList.remove('no'));
    missHere = false;
    if (autoRead() && canSpeak()) speak(it.text);
  }
  function pickBin(bid) {
    if (busy || locked || k >= order.length) return;
    const it = order[k], btn = binBtns.find(b => b.dataset.bin === bid);
    if (bid !== it.bin) {
      if (!missHere) { miss++; missHere = true; }
      btn.classList.remove('no'); void btn.offsetWidth; btn.classList.add('no');
      card.firstChild && card.firstChild.classList.add('shake');
      setTimeout(() => card.firstChild && card.firstChild.classList.remove('shake'), 420);
      note.textContent = 'Nem oda tartozik. Próbáld egy másik kosárral!'; note.className = 'snote bad';
      beep(false); return;
    }
    place[it.id] = bid; busy = true;
    binList[bid].append(h('span', { class: 'schip pop' + (missHere ? ' late' : ''), html: it.html }));
    note.textContent = pick(['Ügyes!', 'Így van!', 'Szuper!', 'Pontosan!']); note.className = 'snote good';
    card.firstChild && card.firstChild.classList.add('fly');
    setTimeout(() => { busy = false; k++; if (k < order.length) show(); else { counter.textContent = 'Kész!'; card.innerHTML = ''; note.textContent = ''; noteMiss(miss); send({ ...place }); } }, 520);
  }
  const onKey = e => { if (expOpen || locked) return; const n = +e.key; if (n >= 1 && n <= q.bins.length) { e.preventDefault(); pickBin(q.bins[n - 1].id); } };
  document.addEventListener('keydown', onKey); cleanups.push(() => document.removeEventListener('keydown', onKey));
  show();
  return {
    el: h('div', { class: 'sortwrap' }, counter, card, note, bins),
    wrong() {},
    lock() { locked = true; binBtns.forEach(b => b.disabled = true); document.removeEventListener('keydown', onKey); }
  };
};
UI.sort.judge = (q, r) => q.items.every(it => r[it.id] === it.bin);

/* ---------- Címkézd fel: what is at the highlighted number? ---------- */
UI.label = (q, send) => {
  const put = {}, lab = Object.fromEntries(q.labels.map(l => [l.id, l])); let k = 0, miss = 0, missHere = false, busy = false, locked = false;
  const spots = q.spots.map((s, i) => h('div', { class: 'lspot', style: `left:${s.x}%;top:${s.y}%` }, String(i + 1)));
  const fig = h('div', { class: 'lfig', html: q.img }); spots.forEach(s => fig.append(s));
  const ask = h('div', { class: 'snote' });
  const btns = q.labels.map(l => h('button', { class: 'opt lname', onclick: () => pickName(l.id) }, l.text));
  const bank = h('div', { class: 'lbank' }, btns);
  function show() {
    spots.forEach((s, i) => s.classList.toggle('cur', i === k));
    ask.innerHTML = `Mi van a <b>${k + 1}.</b> számnál? Válaszd ki a nevét!`; ask.className = 'snote';
    btns.forEach(b => b.classList.remove('wrong'));
    missHere = false;
  }
  function pickName(lid) {
    if (busy || locked || k >= q.spots.length) return;
    const sid = q.spots[k].id, b = btns[q.labels.findIndex(l => l.id === lid)];
    if (q.answer[sid] !== lid) {
      if (!missHere) { miss++; missHere = true; }
      b.classList.add('wrong'); ask.innerHTML = `Ez nem a ${k + 1}. hely neve. Próbáld újra!`; ask.className = 'snote bad'; beep(false); return;
    }
    put[sid] = lid; busy = true;
    spots[k].textContent = lab[lid].text; spots[k].classList.remove('cur'); spots[k].classList.add('filled', missHere ? 'late' : 'right');
    b.classList.add('used'); b.disabled = true;
    ask.textContent = pick(['Ügyes!', 'Így van!', 'Szuper!']); ask.className = 'snote good';
    setTimeout(() => { busy = false; k++; if (k < q.spots.length) show(); else { noteMiss(miss); send({ ...put }); } }, 450);
  }
  show();
  return {
    el: h('div', { class: 'labelwrap' }, fig, ask, bank),
    wrong() {},
    lock() { locked = true; btns.forEach(b => b.disabled = true); spots.forEach((s, i) => { s.classList.remove('cur'); s.textContent = lab[q.answer[q.spots[i].id]].text; s.classList.add('filled'); }); }
  };
};
UI.label.judge = (q, r) => q.spots.every(s => r[s.id] === q.answer[s.id]);

/* ---------- Állítsd be: set an instrument (thermometer, compass) ---------- */
UI.set = (q, send) => {
  let v = q.start;
  const box = h('div', { class: 'setfig' }), readout = h('div', { class: 'setval', 'aria-live': 'polite' });
  const fmtV = x => q.kind === 'thermo' ? `${String(x).replace('-', '−')} °C` : DIRS[x];
  const draw = () => { box.innerHTML = q.kind === 'thermo' ? thermo(v) : compass(v, q.labels || [0, 2, 4, 6]); readout.textContent = fmtV(v); };
  const setV = x => { v = q.kind === 'thermo' ? Math.max(q.min, Math.min(q.max, x)) : (x + 8) % 8; draw(); };
  const fromPoint = e => {
    const s = box.querySelector('svg'); if (!s) return; const r = s.getBoundingClientRect(), vb = s.viewBox.baseVal;
    const px = (e.clientX - r.left) * vb.width / r.width, py = (e.clientY - r.top) * vb.height / r.height;
    if (q.kind === 'thermo') setV(Math.round(-10 + (216 - py) / 200 * 40));
    else { const ang = Math.atan2(px - 110, 110 - py) * 180 / Math.PI; setV(Math.round(((ang + 360) % 360) / 45) % 8); }
  };
  let drag = false;
  box.addEventListener('pointerdown', e => { drag = true; try { box.setPointerCapture(e.pointerId); } catch (x) {} fromPoint(e); });
  box.addEventListener('pointermove', e => { if (drag) fromPoint(e); });
  box.addEventListener('pointerup', () => { drag = false; });
  box.style.touchAction = 'none';
  const step = d => setV(v + d);
  const ctr = q.kind === 'thermo'
    ? h('div', { class: 'chips setctl' }, h('button', { class: 'btn', onclick: () => step(-5) }, '−5'), h('button', { class: 'btn', onclick: () => step(-1) }, '−1'), h('button', { class: 'btn', onclick: () => step(1) }, '+1'), h('button', { class: 'btn', onclick: () => step(5) }, '+5'))
    : h('div', { class: 'chips setctl' }, h('button', { class: 'btn', onclick: () => step(-1) }, '↺ Balra'), h('button', { class: 'btn', onclick: () => step(1) }, 'Jobbra ↻'));
  const onKey = e => { if (expOpen) return; if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); step(1); } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { e.preventDefault(); step(-1); } };
  document.addEventListener('keydown', onKey); cleanups.push(() => document.removeEventListener('keydown', onKey));
  const sb = h('button', { class: 'btn primary', onclick: () => send(v) }, 'Kész');
  draw();
  return {
    el: h('div', { class: 'setwrap' }, h('p', { class: 'mute ihelp' }, q.kind === 'thermo' ? 'Húzd a hőmérő oszlopát, vagy használd a gombokat.' : 'Koppints arra az irányra a körön, vagy forgasd a gombokkal.'), box, readout, ctr), submitBtn: sb,
    wrong() {},
    lock(r, ok) { ctr.querySelectorAll('button').forEach(b => b.disabled = true); document.removeEventListener('keydown', onKey); if (!ok) { v = q.answer; draw(); readout.classList.add('fix'); } },
    done() { sb.remove(); }
  };
};
UI.set.judge = (q, r) => r === q.answer;

/* ---------- Ki vagyok én? clue riddle ---------- */
UI.riddle = (q, send) => {
  let shown = 1;
  const list = h('ol', { class: 'clues' });
  const more = h('button', { class: 'btn small', onclick: () => reveal() }, '💡 Még egy tipp');
  const choice = UI.choice(q, send);
  const reveal = () => { if (shown < q.clues.length) { shown++; draw(); if (autoRead() && canSpeak()) speak(q.clues[shown - 1]); } };
  const draw = () => { list.replaceChildren(...q.clues.slice(0, shown).map((c, i) => h('li', { class: i === shown - 1 ? 'ex-new' : '' }, c))); more.hidden = shown >= q.clues.length; more.textContent = `💡 Még egy tipp (${q.clues.length - shown} maradt)`; };
  draw();
  return {
    el: h('div', { class: 'riddlewrap' }, list, more, choice.el),
    wrong(v) { choice.wrong(v); reveal(); },
    lock(v, ok) { choice.lock(v, ok); more.hidden = true; if (ok) list.after(h('p', { class: 'riddle-note pop' }, shown === 1 ? 'Már az első tippből kitaláltad! 🌟' : `${shown} tippből kitaláltad!`)); shown = q.clues.length; draw(); }
  };
};
UI.riddle.judge = (q, r) => r === q.answer;

/* ---------- builders used by the content files ---------- */
let _sid = 0;
function sortQ(prompt, groups, perBin, opts = {}) {      // groups: { binLabel: [item, …] }, items may be 'word' or ['word', '🐝']
  const labels = Object.keys(groups), items = [];
  labels.forEach((b, bi) => shuffle(groups[b]).slice(0, perBin).forEach(x => { const [w, em] = Array.isArray(x) ? x : [x, opts.emoji && opts.emoji(x)]; items.push({ id: 'i' + (++_sid), html: em ? `<span class="se">${em}</span>${w}` : w, text: w, bin: 'b' + bi }); }));
  const bins = labels.map((b, bi) => ({ id: 'b' + bi, label: b }));
  return { type: 'sort', prompt, bins, items: shuffle(items), hint: opts.hint, answerText: labels.map((b, bi) => `${b}: ${items.filter(it => it.bin === 'b' + bi).map(it => it.text).join(', ')}`).join('<br>') };
}
function labelQ(prompt, img, spots, opts = {}) {            // spots: [{ name, x, y }]
  const sp = spots.map((s, i) => ({ id: 's' + i, x: s.x, y: s.y })), labels = shuffle(spots.map((s, i) => ({ id: 'l' + i, text: s.name })));
  const answer = Object.fromEntries(spots.map((s, i) => [sp[i].id, 'l' + i]));
  return { type: 'label', prompt, img, spots: sp, labels, answer, hint: opts.hint, answerText: spots.map((s, i) => `${i + 1}. ${s.name}`).join(', ') };
}
function riddleQ(clues, answer, wrongs, hint) {
  return { type: 'riddle', prompt: 'Ki vagyok én? Olvasd el a tippet, és találd ki!', clues, answer, options: shuffle([answer, ...wrongs]).map(v => ({ value: v, html: v })), answerText: answer, hint: hint || 'Ha nem tudod, kérj még egy tippet! Minél kevesebb tippből találod ki, annál ügyesebb vagy.', speak: 'Ki vagyok én? ' + clues[0] };
}

/* generated by dev/tools/make-map.js from Natural Earth (public domain) */
const MAPDATA = {"W":600,"H":380,"counties":{"Vas":{"d":"M106.1 161.9 109.9 166.6 114.6 170.0 109.0 172.5 108.3 173.3 108.3 175.1 107.6 176.6 106.5 177.6 105.6 180.7 106.2 184.3 105.9 190.3 107.6 203.3 97.3 205.9 94.9 209.2 93.9 208.9 93.0 209.1 92.1 207.4 90.1 207.4 89.0 209.2 89.3 210.7 88.6 212.0 85.1 214.2 81.2 215.0 79.1 214.7 75.2 215.6 74.2 217.9 72.6 218.0 70.8 217.3 67.8 219.4 59.3 220.0 56.1 221.5 54.7 223.8 53.6 226.7 52.2 229.0 48.3 232.6 46.6 235.9 43.0 238.3 39.0 238.3 39.7 242.6 35.6 248.9 34.4 249.1 34.4 247.0 33.2 247.2 32.4 246.3 31.6 244.8 30.7 243.6 29.5 240.0 29.5 239.1 29.7 238.2 30.4 236.9 31.4 234.9 31.8 233.4 32.0 232.3 30.4 231.6 29.3 230.7 28.0 229.1 27.1 228.6 19.3 229.3 15.5 229.6 12.0 228.8 13.4 228.2 14.5 227.1 17.5 222.9 18.5 221.9 20.7 220.2 22.4 219.5 23.6 218.1 23.6 216.7 24.7 215.2 26.2 214.4 26.6 212.5 27.4 211.2 28.5 211.0 31.7 211.7 35.2 211.2 36.9 211.4 38.4 212.6 39.3 213.0 40.1 212.6 41.5 212.3 43.7 212.3 45.3 211.9 45.0 210.5 43.7 209.4 42.5 209.0 40.1 208.7 41.1 207.7 45.0 206.2 45.9 205.6 45.9 204.3 45.0 203.8 43.2 203.2 42.6 201.5 43.2 199.7 45.0 198.6 46.9 196.0 47.3 194.6 46.2 193.0 44.8 192.9 42.0 194.3 40.9 193.5 41.6 190.7 41.6 189.6 41.0 188.8 39.6 188.8 38.8 186.3 40.1 183.6 39.8 181.4 42.4 179.9 43.6 178.8 44.2 177.2 43.9 175.1 41.3 169.7 40.3 169.1 40.1 167.8 40.9 167.3 40.9 162.1 41.7 160.5 42.8 160.2 43.9 161.0 45.0 162.7 54.1 158.5 57.3 156.0 58.5 157.5 59.6 158.5 64.1 159.4 66.4 161.8 68.8 161.3 75.2 157.3 77.3 159.0 84.2 160.2 93.3 154.9 95.4 155.5 94.5 158.1 93.8 161.4 101.9 157.1 104.1 158.7Z","c":[67,193.5]},"Baranya":{"d":"M240.6 322.9 242.1 322.7 243.6 323.0 244.2 324.3 244.2 326.0 245.5 329.0 245.6 331.9 246.2 333.7 245.6 336.3 244.4 338.7 243.8 342.4 241.9 344.8 243.6 346.6 242.2 345.6 241.3 346.9 240.9 348.0 239.7 349.4 238.7 349.2 235.3 347.5 231.1 346.0 229.5 346.4 227.6 348.3 227.0 350.4 225.4 352.6 223.5 356.2 222.5 357.5 218.9 360.6 216.7 361.4 214.8 360.5 213.4 361.5 210.4 365.1 208.8 366.4 207.6 366.6 206.5 366.4 205.0 364.5 203.7 364.5 202.3 365.3 200.8 365.9 199.3 365.3 197.9 363.8 195.9 363.7 193.3 361.8 191.8 361.2 184.8 361.2 182.6 362.6 181.6 362.9 180.7 362.9 171.7 360.4 165.9 360.4 164.5 360.4 163.7 360.9 163.3 361.8 162.8 362.7 161.8 362.9 160.1 359.5 157.6 357.7 147.3 354.5 145.4 354.4 144.5 353.1 146.8 353.3 148.8 352.3 149.1 348.7 147.7 346.2 145.2 344.0 143.5 341.1 142.5 337.4 143.8 335.0 141.3 327.4 146.3 324.9 147.8 321.0 147.6 313.5 150.1 310.6 154.0 309.2 158.1 309.1 160.7 307.0 168.6 296.7 178.3 295.5 179.9 293.7 180.5 291.0 182.1 289.5 184.3 290.2 186.5 290.3 188.2 288.2 189.6 285.5 199.6 284.6 202.2 285.0 202.6 286.6 202.3 288.6 205.6 292.4 207.2 296.7 208.5 307.2 211.8 304.8 213.3 303.2 215.3 302.8 219.6 306.9 221.2 306.9 223.0 305.8 224.3 307.4 226.5 312.1 229.1 316.1 231.8 319.2 236.0 321.5Z","c":[191.6,329.6]},"Győr-Moson-Sopron":{"d":"M64.9 124.4 66.0 125.7 67.0 126.3 71.7 127.1 73.4 126.0 75.1 123.3 76.2 122.4 77.4 125.6 80.7 126.2 87.4 124.6 93.6 123.7 95.3 122.9 94.4 122.3 93.6 121.4 93.2 120.1 93.1 115.9 92.5 113.4 92.4 111.2 93.6 109.8 93.1 109.0 92.3 106.6 89.8 105.3 89.2 103.3 90.3 102.8 93.3 102.1 94.7 101.0 95.5 99.8 96.0 98.1 96.3 95.8 95.3 95.2 95.5 94.3 96.2 93.7 96.6 92.4 97.1 91.6 96.2 89.8 101.5 85.3 104.6 83.4 107.7 84.1 111.2 85.1 117.6 86.2 120.3 88.4 129.0 100.1 129.9 100.9 130.7 101.3 132.9 101.7 133.7 102.2 136.5 106.6 137.5 107.6 138.4 107.6 139.3 107.2 140.2 107.0 141.5 107.7 143.3 108.9 144.8 110.4 145.5 111.7 146.4 112.7 150.0 114.7 151.9 115.7 159.1 117.7 164.0 117.4 164.2 119.0 164.9 121.7 165.0 124.5 164.7 126.7 165.3 128.9 165.2 132.8 167.7 135.0 165.8 140.0 167.8 142.9 166.8 145.1 164.9 144.4 164.2 145.2 165.2 148.7 163.8 152.3 163.8 154.9 161.2 152.0 158.3 150.0 158.1 152.4 156.6 151.7 155.0 151.5 153.5 152.8 150.5 151.4 146.6 152.7 143.1 155.5 139.7 154.0 137.2 155.5 132.9 154.9 131.1 157.5 129.2 158.1 127.3 158.1 126.1 159.2 124.6 159.2 123.2 158.7 120.3 156.6 117.1 156.9 114.0 157.9 112.5 157.6 111.7 158.9 109.4 160.7 106.1 161.9 104.1 158.7 101.9 157.1 93.8 161.4 94.5 158.1 95.4 155.5 93.3 154.9 84.2 160.2 77.3 159.0 75.2 157.3 68.8 161.3 66.4 161.8 64.1 159.4 59.6 158.5 58.5 157.5 57.5 156.2 58.4 155.1 58.1 150.0 59.1 149.0 61.5 147.9 62.5 146.3 62.5 144.4 61.9 142.8 60.7 141.6 59.2 140.8 59.8 138.4 59.0 135.8 57.5 133.8 55.7 133.0 52.9 133.4 51.4 132.8 47.3 131.2 45.0 131.7 40.2 129.7 38.7 128.9 39.4 127.9 40.7 125.8 41.3 125.2 42.2 126.2 43.2 125.9 44.2 125.0 47.5 123.2 48.3 122.5 48.8 121.4 48.6 119.8 49.1 118.6 52.2 117.1 55.8 117.6 62.6 120.3 63.7 121.0 64.1 122.1 64.4 123.5Z","c":[110.8,130]},"Somogy":{"d":"M188.8 217.5 190.8 222.4 192.4 225.6 191.8 227.2 191.8 234.2 192.4 237.7 188.4 239.4 187.5 239.6 186.7 240.3 185.7 242.3 184.5 244.0 184.0 245.8 183.8 247.9 182.1 251.6 181.4 256.3 181.2 261.1 178.7 266.0 177.0 271.7 177.8 276.8 179.7 277.8 182.1 289.5 180.5 291.0 179.9 293.7 178.3 295.5 168.6 296.7 160.7 307.0 158.1 309.1 154.0 309.2 150.1 310.6 147.6 313.5 147.8 321.0 146.3 324.9 141.3 327.4 143.8 335.0 142.5 337.4 143.5 341.1 145.2 344.0 147.7 346.2 149.1 348.7 148.8 352.3 146.8 353.3 144.5 353.1 144.3 351.1 143.9 349.3 143.7 348.3 143.1 347.1 139.1 342.9 136.0 341.4 132.4 340.7 125.1 340.3 124.2 341.2 123.4 342.0 122.9 340.0 122.0 339.6 120.0 340.3 118.2 340.5 118.1 339.0 117.6 337.0 116.7 338.5 115.8 338.3 114.9 337.5 113.6 337.0 114.1 336.0 115.2 335.5 115.1 334.3 113.7 334.1 112.3 333.6 111.8 331.6 111.5 330.3 110.5 326.4 110.0 325.3 106.6 320.8 105.7 320.2 98.8 320.0 97.5 319.4 93.4 316.3 92.4 315.2 92.0 313.9 91.3 313.0 86.8 309.3 86.0 308.2 83.9 304.3 80.7 300.5 79.5 299.3 78.7 296.8 81.9 295.6 84.1 298.1 90.0 295.8 91.4 295.7 92.9 295.2 94.5 293.2 95.0 290.5 93.5 287.3 92.8 283.6 94.7 283.1 104.3 280.8 105.4 276.8 106.8 274.0 108.1 269.6 107.6 253.4 110.9 247.7 114.3 244.8 120.0 245.2 123.5 243.4 127.8 242.8 145.1 235.5 160.5 226.3 164.3 225.2 167.6 221.7 169.6 220.4 171.8 219.8 180.0 215.2 184.6 215.6Z","c":[140.1,279.7]},"Veszprém":{"d":"M163.8 154.9 164.1 158.4 163.6 161.9 166.8 163.2 169.6 163.6 170.0 166.3 171.0 168.5 173.0 168.9 182.6 166.9 185.5 172.4 182.4 173.2 181.9 176.6 182.9 180.0 186.5 183.5 189.6 190.5 192.0 191.9 193.2 195.0 192.4 203.2 193.3 206.4 192.1 212.5 188.8 217.5 184.6 215.6 180.0 215.2 171.8 219.8 169.6 220.4 167.6 221.7 164.3 225.2 160.5 226.3 145.1 235.5 127.8 242.8 123.5 243.4 120.0 245.2 114.3 244.8 110.9 247.7 107.6 253.4 103.1 255.2 100.5 251.3 101.6 242.7 100.4 214.7 100.8 213.1 101.5 211.9 101.9 210.5 101.4 209.3 99.2 208.3 98.1 207.2 97.3 205.9 107.6 203.3 105.9 190.3 106.2 184.3 105.6 180.7 106.5 177.6 107.6 176.6 108.3 175.1 108.3 173.3 109.0 172.5 114.6 170.0 109.9 166.6 106.1 161.9 109.4 160.7 111.7 158.9 112.5 157.6 114.0 157.9 117.1 156.9 120.3 156.6 123.2 158.7 124.6 159.2 126.1 159.2 127.3 158.1 129.2 158.1 131.1 157.5 132.9 154.9 137.2 155.5 139.7 154.0 143.1 155.5 146.6 152.7 150.5 151.4 153.5 152.8 155.0 151.5 156.6 151.7 158.1 152.4 158.3 150.0 161.2 152.0Z","c":[141.7,198.4]},"Zala":{"d":"M93.5 287.3 95.0 290.5 94.5 293.2 92.9 295.2 91.4 295.7 90.0 295.8 84.1 298.1 81.9 295.6 78.7 296.8 78.0 294.9 78.3 293.0 77.5 291.0 76.2 289.3 75.1 288.2 74.3 289.2 73.4 288.2 72.6 287.6 70.0 286.9 68.7 288.2 67.1 286.0 64.5 284.4 62.9 282.3 61.5 280.0 60.0 278.1 58.1 276.8 55.9 276.4 54.5 275.8 53.6 277.3 51.9 276.1 48.2 273.9 46.6 268.1 43.7 265.7 40.6 260.8 37.5 259.0 36.0 257.7 35.6 256.8 36.1 254.8 37.7 254.0 38.8 252.9 38.4 250.5 37.1 249.7 35.6 249.6 39.7 242.6 39.0 238.3 43.0 238.3 46.6 235.9 48.3 232.6 52.2 229.0 53.6 226.7 54.7 223.8 56.1 221.5 59.3 220.0 67.8 219.4 70.8 217.3 72.6 218.0 74.2 217.9 75.2 215.6 79.1 214.7 81.2 215.0 85.1 214.2 88.6 212.0 89.3 210.7 89.0 209.2 90.1 207.4 92.1 207.4 92.4 208.4 93.9 208.9 94.9 209.2 97.3 205.9 98.1 207.2 99.2 208.3 101.4 209.3 101.9 210.5 101.5 211.9 100.8 213.1 100.4 214.7 101.6 242.7 100.5 251.3 103.1 255.2 107.6 253.4 108.1 269.6 106.8 274.0 105.4 276.8 104.3 280.8 94.7 283.1 92.8 283.6Z","c":[75.8,252.3]},"Bács-Kiskun":{"d":"M328.3 218.5 330.0 218.4 331.4 216.4 333.8 214.1 336.5 213.5 339.0 215.4 341.7 216.3 345.2 212.0 347.7 210.3 350.1 209.2 353.0 210.9 356.1 214.3 353.1 216.5 352.6 217.5 353.1 218.5 354.4 218.9 355.8 219.1 356.7 219.5 355.2 222.6 352.9 221.1 351.0 220.9 351.0 223.0 352.7 224.0 351.5 226.4 348.9 226.2 346.0 227.3 344.2 230.0 343.5 233.5 343.8 235.1 345.0 236.2 346.6 235.7 348.9 236.5 344.7 240.3 341.0 245.4 342.7 246.7 343.5 249.0 341.9 262.5 338.9 265.8 331.5 264.6 328.3 266.9 328.4 271.9 332.5 274.8 333.4 280.5 332.0 286.1 330.9 288.5 329.1 288.4 326.5 289.3 324.1 291.0 321.6 291.3 319.3 290.6 317.3 290.8 315.6 292.1 315.8 295.0 315.8 297.8 314.4 300.4 314.2 303.8 315.8 308.1 317.9 312.0 319.2 315.6 317.4 314.5 315.6 313.9 313.7 313.8 308.8 314.8 307.0 314.7 305.4 315.0 303.4 315.9 301.4 317.3 300.1 318.7 300.3 319.7 301.0 320.8 301.1 321.8 298.9 323.0 298.3 323.8 297.9 324.7 297.3 325.6 295.8 326.8 294.2 327.2 293.1 327.7 292.4 328.8 291.8 330.0 290.9 330.9 289.5 331.5 286.4 331.5 284.8 331.8 284.1 332.4 283.1 333.1 282.5 334.6 282.1 336.1 281.1 337.3 278.8 337.8 271.3 337.0 269.4 335.9 268.2 333.5 266.3 332.8 264.3 333.6 263.0 335.9 262.9 339.5 261.4 340.0 259.2 339.7 257.2 341.1 256.9 342.0 257.6 343.5 257.7 344.4 255.6 343.9 250.4 343.5 249.1 343.6 248.3 344.6 247.3 345.1 245.6 345.6 244.2 346.6 241.9 344.8 243.8 342.4 244.4 338.7 245.6 336.3 246.2 333.7 245.6 331.9 245.5 329.0 244.2 326.0 244.2 324.3 243.6 323.0 242.1 322.7 240.6 322.9 242.5 321.8 244.3 320.0 242.4 319.0 241.3 316.6 242.0 315.3 243.3 316.0 244.6 315.3 246.3 311.4 245.8 309.9 244.7 310.3 243.7 309.8 243.8 308.5 245.3 307.4 250.1 306.4 251.5 305.0 251.4 294.6 251.1 293.0 249.9 290.6 249.6 288.7 250.1 284.3 252.2 277.5 252.0 273.8 250.9 269.7 248.3 262.4 246.7 259.5 249.0 257.0 254.8 254.4 257.2 251.9 258.4 249.6 258.9 247.9 258.7 246.1 257.8 243.4 257.7 242.3 257.6 240.9 257.5 239.6 256.7 238.5 255.2 236.5 254.6 235.7 253.1 234.0 252.6 233.2 252.4 232.2 252.5 230.6 252.6 228.5 252.9 227.0 253.5 225.2 254.4 223.7 255.2 223.0 255.9 222.0 256.0 219.7 255.4 214.5 254.9 212.4 254.9 211.1 255.6 209.6 256.0 207.6 257.9 203.4 261.9 203.2 265.8 202.0 272.1 196.9 281.2 192.8 284.4 193.6 286.8 196.2 287.1 199.8 285.1 203.1 284.5 206.6 286.1 209.3 288.7 208.4 290.5 204.8 292.9 203.2 295.5 202.1 296.6 200.4 296.7 197.9 298.0 196.3 303.8 197.2 307.0 200.5 311.7 208.2 313.7 210.2 317.5 214.1 324.1 218.2 326.8 218.0Z","c":[290.6,264.4]},"Fejér":{"d":"M252.5 230.6 248.6 231.8 244.9 234.3 236.7 244.9 233.0 247.3 231.4 247.8 229.9 248.7 227.3 248.0 221.3 238.5 219.7 238.7 217.9 239.9 216.9 241.9 215.9 243.2 214.8 243.4 211.2 242.7 207.7 241.1 201.8 236.2 196.7 236.5 192.4 237.7 191.8 234.2 191.8 227.2 192.4 225.6 190.8 222.4 188.8 217.5 192.1 212.5 193.3 206.4 192.4 203.2 193.2 195.0 192.0 191.9 189.6 190.5 186.5 183.5 182.9 180.0 181.9 176.6 182.4 173.2 185.5 172.4 182.6 166.9 183.1 164.8 184.1 163.3 183.9 159.6 184.7 156.7 186.7 156.6 188.7 156.0 190.2 153.7 192.0 153.8 196.9 158.1 198.1 159.9 199.6 160.9 204.1 159.7 203.3 158.2 202.2 157.0 203.4 155.2 207.7 153.0 210.1 150.6 211.8 149.9 213.0 148.5 214.8 144.3 217.7 142.2 232.0 141.4 235.3 148.2 239.7 153.6 240.6 156.8 240.1 160.4 242.4 165.9 243.4 167.2 245.9 170.2 246.5 172.0 247.5 173.4 250.5 173.8 251.9 175.9 250.9 182.1 249.2 185.8 248.7 188.1 248.5 190.6 248.5 193.1 249.3 197.9 250.0 200.5 250.5 201.5 251.9 202.5 256.0 207.6 255.9 208.8 255.1 210.2 254.9 212.4 255.4 214.5 256.0 219.7 255.9 222.0 255.2 223.0 254.4 223.7 253.5 225.2 252.9 227.0 252.6 228.5Z","c":[219.9,195.4]},"Komárom-Esztergom":{"d":"M213.0 148.5 211.8 149.9 210.1 150.6 207.7 153.0 203.4 155.2 202.2 157.0 203.3 158.2 204.1 159.7 199.6 160.9 198.1 159.9 196.9 158.1 192.0 153.8 190.2 153.7 188.7 156.0 186.7 156.6 184.7 156.7 183.9 159.6 184.1 163.3 183.1 164.8 182.6 166.9 173.0 168.9 171.0 168.5 170.0 166.3 169.6 163.6 166.8 163.2 163.6 161.9 164.1 158.4 163.8 154.9 163.8 152.3 165.2 148.7 164.2 145.2 164.9 144.4 166.8 145.1 167.8 142.9 165.8 140.0 167.7 135.0 165.2 132.8 165.3 128.9 164.7 126.7 165.0 124.5 164.9 121.7 164.2 119.0 164.0 117.4 183.4 116.1 193.9 117.2 197.0 116.9 203.4 114.3 220.8 112.3 224.6 112.5 227.7 113.9 230.2 114.4 232.7 114.1 234.8 112.9 237.5 109.6 239.0 108.5 240.9 108.0 243.1 107.3 245.9 109.2 248.8 109.8 250.7 112.8 251.6 115.0 252.1 118.8 253.2 119.9 251.6 121.3 249.7 120.6 246.3 121.8 247.1 128.2 242.7 127.7 238.3 128.4 239.1 130.0 239.7 131.8 237.3 133.5 235.5 135.9 234.2 139.3 232.0 141.4 217.7 142.2 214.8 144.3Z","c":[200.7,134.2]},"Pest":{"d":"M243.4 167.2 242.4 165.9 240.1 160.4 240.6 156.8 239.7 153.6 235.3 148.2 232.0 141.4 234.2 139.3 235.5 135.9 237.3 133.5 239.7 131.8 239.1 130.0 238.3 128.4 242.7 127.7 247.1 128.2 246.3 121.8 249.7 120.6 251.6 121.3 253.2 119.9 252.1 118.8 251.6 115.0 250.7 112.8 248.8 109.8 245.9 109.2 243.2 107.3 239.9 104.8 237.4 102.4 236.8 100.1 237.1 97.4 237.9 92.1 237.6 90.7 237.0 89.7 238.0 88.3 240.5 87.6 241.3 86.9 243.6 82.2 245.0 80.9 253.1 79.1 256.0 83.2 256.2 89.1 253.3 91.8 255.3 96.3 265.8 103.7 272.7 103.6 290.8 107.0 294.1 108.5 296.9 114.9 297.7 123.2 302.8 120.3 308.0 119.3 309.3 121.3 310.3 121.8 311.4 122.0 310.9 123.7 309.9 125.3 310.7 127.7 312.4 129.5 314.7 133.4 314.8 135.6 316.0 137.1 315.2 140.8 316.8 144.3 319.5 146.1 322.7 145.8 323.1 148.1 323.1 150.1 326.6 153.3 328.3 155.4 343.5 170.6 344.2 172.4 344.2 174.7 343.9 176.6 344.0 178.3 345.5 180.6 347.7 182.1 350.7 187.1 348.5 192.8 348.0 198.8 350.7 204.5 355.4 208.7 360.8 210.8 356.1 214.3 353.0 210.9 350.1 209.2 347.7 210.3 345.2 212.0 341.7 216.3 339.0 215.4 336.5 213.5 333.8 214.1 331.4 216.4 330.0 218.4 328.3 218.5 326.8 218.0 324.1 218.2 317.5 214.1 313.7 210.2 311.7 208.2 307.0 200.5 303.8 197.2 298.0 196.3 296.7 197.9 296.6 200.4 295.5 202.1 292.9 203.2 290.5 204.8 288.7 208.4 286.1 209.3 284.5 206.6 285.1 203.1 287.1 199.8 286.8 196.2 284.4 193.6 281.2 192.8 272.1 196.9 265.8 202.0 261.9 203.2 257.9 203.4 256.0 207.6 251.9 202.5 250.5 201.5 250.0 200.5 249.3 197.9 248.5 193.1 248.5 190.6 248.7 188.1 249.2 185.8 250.9 182.1 251.9 175.9 250.5 173.8 247.5 173.4 246.5 172.0 245.9 170.2ZM254.4 165.6 264.1 163.8 268.3 166.4 270.9 166.7 278.9 160.9 280.6 158.8 284.6 155.8 286.5 150.9 285.3 149.5 283.7 148.9 277.2 143.9 275.3 144.2 275.0 142.7 271.9 140.5 270.0 138.0 266.3 135.7 262.2 136.0 260.2 138.0 257.9 139.1 252.8 139.9 253.5 147.3 256.5 155.8 256.6 157.4 255.0 161.1Z","c":[289.6,159.1]},"Tolna":{"d":"M240.6 322.9 236.0 321.5 231.8 319.2 229.1 316.1 226.5 312.1 224.3 307.4 223.0 305.8 221.2 306.9 219.6 306.9 215.3 302.8 213.3 303.2 211.8 304.8 208.5 307.2 207.2 296.7 205.6 292.4 202.3 288.6 202.6 286.6 202.2 285.0 199.6 284.6 189.6 285.5 188.2 288.2 186.5 290.3 184.3 290.2 182.1 289.5 179.7 277.8 177.8 276.8 177.0 271.7 178.7 266.0 181.2 261.1 181.4 256.3 182.1 251.6 183.8 247.9 184.0 245.8 184.5 244.0 185.7 242.3 186.7 240.3 187.5 239.6 188.4 239.4 192.4 237.7 196.7 236.5 201.1 236.5 207.7 241.1 211.2 242.7 214.8 243.4 215.9 243.2 216.9 241.9 217.9 239.9 219.7 238.7 221.3 238.5 227.3 248.0 229.9 248.7 231.4 247.8 233.0 247.3 236.7 244.9 244.9 234.3 248.6 231.8 252.5 230.6 252.4 232.2 252.6 233.2 253.1 234.0 254.6 235.7 255.2 236.5 256.7 238.5 257.5 239.6 257.6 240.9 257.7 242.3 257.8 243.4 258.7 246.1 258.9 247.9 258.4 249.6 257.2 251.9 254.8 254.4 249.0 257.0 246.7 259.5 248.3 262.4 250.9 269.7 252.0 273.8 252.2 277.5 250.1 284.3 249.6 288.7 249.9 290.6 251.1 293.0 251.4 294.6 251.5 305.0 250.1 306.4 245.3 307.4 243.8 308.5 243.7 309.8 244.7 310.3 245.8 309.9 246.3 311.4 244.6 315.3 243.3 316.0 242.0 315.3 241.3 316.6 242.4 319.0 244.3 320.0 242.5 321.8Z","c":[220.3,272.1]},"Nógrád":{"d":"M335.6 70.2 337.6 69.5 341.4 65.9 343.4 64.7 346.6 63.7 347.8 64.7 350.1 66.4 351.8 68.1 350.9 68.6 350.3 69.5 347.8 70.7 346.0 72.6 343.5 73.3 342.4 74.0 342.0 75.8 342.5 76.5 343.6 77.0 345.4 80.4 346.0 84.6 343.5 84.9 341.4 86.7 340.3 89.9 340.0 92.8 337.8 95.1 335.5 96.6 334.3 95.4 332.9 95.5 331.7 97.4 330.8 99.7 328.7 101.2 325.9 99.7 323.5 101.3 319.3 108.7 316.0 109.7 308.0 119.3 302.8 120.3 297.7 123.2 296.9 114.9 294.1 108.5 290.8 107.0 272.7 103.6 265.8 103.7 255.3 96.3 253.3 91.8 256.2 89.1 256.0 83.2 253.1 79.1 257.2 78.2 258.4 77.6 260.3 77.7 262.0 77.8 267.1 77.1 277.6 78.3 278.6 78.1 283.7 74.9 295.1 75.1 299.6 71.9 299.9 70.5 299.6 69.2 300.7 66.9 301.5 61.9 302.4 60.1 303.8 59.2 311.7 57.2 312.6 57.2 313.5 57.4 314.4 58.3 316.2 60.5 317.1 61.0 321.0 60.2 323.0 60.5 324.5 62.4 324.6 63.6 324.1 64.8 323.8 65.8 324.6 67.0 328.5 65.9 330.6 66.6 333.8 69.5Z","c":[303,87.7]},"Borsod-Abaúj-Zemplén":{"d":"M383.8 71.6 379.2 66.8 373.8 74.0 370.9 71.8 367.8 72.1 365.4 74.2 362.4 74.2 361.0 73.1 359.9 71.3 358.7 70.8 357.3 71.0 355.7 69.0 353.7 67.2 351.8 68.1 350.1 66.4 347.8 64.7 346.9 63.5 350.3 61.4 351.9 60.8 352.6 60.2 353.2 59.1 353.7 56.8 354.0 55.9 355.1 54.7 356.7 54.8 358.2 55.0 359.6 54.3 362.1 52.0 363.1 51.6 364.8 52.4 365.8 53.5 366.8 53.9 368.8 52.9 371.2 50.4 373.3 47.2 375.1 43.5 378.4 33.3 379.4 31.3 380.6 29.6 383.2 26.9 384.5 25.0 384.7 24.1 384.6 23.2 384.4 21.0 384.5 19.9 384.5 18.9 387.0 17.9 392.3 17.6 410.2 13.4 411.6 13.4 412.9 14.1 415.5 16.4 416.7 16.7 419.3 17.0 424.0 19.8 427.0 20.1 429.1 20.0 431.6 20.4 434.0 21.5 435.7 23.2 437.9 23.6 444.4 20.5 447.3 19.9 448.8 20.5 449.9 21.4 450.8 21.9 452.1 21.1 453.0 19.7 453.5 18.4 454.2 17.2 455.9 16.2 457.3 15.9 460.2 15.8 464.6 14.4 465.9 14.8 468.7 16.5 470.3 17.1 471.0 17.8 471.5 18.9 472.3 21.4 472.9 22.2 474.2 22.9 477.3 22.8 478.8 23.2 479.5 24.6 480.7 29.9 481.4 31.3 486.1 38.6 488.1 40.9 490.4 42.6 493.0 43.5 495.6 43.3 500.0 41.1 503.7 40.5 506.3 39.0 507.5 38.5 511.9 38.3 513.5 37.8 515.0 37.7 520.1 38.2 521.7 37.7 523.1 36.5 524.7 34.4 526.8 34.8 525.2 36.8 522.0 43.4 520.2 46.4 517.8 47.8 515.4 46.8 514.4 46.9 511.0 51.7 508.7 54.5 507.4 55.5 505.8 56.1 500.4 56.5 499.2 57.4 497.6 59.1 496.0 60.4 494.7 60.4 493.6 60.7 487.2 64.8 485.6 65.0 484.0 64.7 480.6 63.1 479.2 63.1 476.0 63.5 470.6 63.2 469.0 63.5 467.7 64.4 466.5 65.9 465.5 67.8 465.0 69.5 464.8 71.7 465.2 72.9 465.9 73.9 466.2 75.6 465.3 79.6 463.1 81.8 460.3 82.6 457.4 82.7 454.0 83.0 452.7 82.7 451.7 81.8 451.0 80.7 450.0 80.0 448.7 80.1 447.8 81.6 446.6 82.7 444.6 82.6 440.2 85.2 439.3 86.1 438.7 87.7 438.2 91.0 438.1 92.1 437.6 93.9 436.9 95.0 434.1 98.3 433.4 99.9 433.3 100.9 433.5 102.1 433.5 104.4 433.3 106.4 432.8 107.4 431.0 109.3 431.5 113.1 426.8 114.8 426.8 115.7 424.7 119.8 423.7 121.6 419.4 126.0 413.2 126.6 410.9 126.8 409.4 127.5 406.6 127.0 404.7 125.7 395.4 123.9 393.6 120.9 392.5 117.0 388.5 112.4 383.1 102.7 381.7 101.2 382.6 100.0 383.2 98.8 382.8 96.3 381.7 94.4 380.1 92.5 379.5 89.9 380.6 88.1 384.3 84.1 385.4 79.0 385.7 76.1 385.3 73.1Z","c":[425.8,61]},"Szabolcs-Szatmár-Bereg":{"d":"M526.6 138.8 524.7 136.4 523.0 129.2 521.6 127.0 517.6 131.3 515.4 129.2 515.9 125.9 513.5 121.5 507.5 118.1 504.6 118.3 502.6 121.9 501.5 124.5 500.0 126.1 498.2 125.1 496.6 123.2 494.9 122.4 493.1 122.4 489.6 121.1 487.9 119.5 483.7 118.6 482.4 116.7 474.4 110.4 474.7 103.3 475.8 96.6 474.9 93.9 472.3 92.9 469.0 94.9 455.3 96.0 451.5 97.5 444.4 91.8 438.2 91.0 438.7 87.7 439.3 86.1 440.2 85.2 444.0 82.7 446.6 82.7 447.5 82.3 448.1 80.7 450.0 80.0 451.0 80.7 451.7 81.8 452.7 82.7 454.0 83.0 458.0 82.7 460.3 82.6 463.1 81.8 465.3 79.6 466.2 75.6 465.9 73.9 465.2 72.9 464.8 71.7 465.0 69.5 465.5 67.8 466.5 65.9 467.7 64.4 469.0 63.5 470.6 63.2 476.0 63.5 479.2 63.1 480.6 63.1 484.0 64.7 485.6 65.0 487.2 64.8 493.6 60.7 494.7 60.4 496.0 60.4 497.6 59.1 499.2 57.4 500.4 56.5 505.8 56.1 507.4 55.5 508.7 54.5 511.0 51.7 513.9 47.4 515.4 46.8 517.1 47.7 520.2 46.4 522.0 43.4 525.2 36.8 526.9 34.8 527.9 33.9 530.6 32.7 533.5 33.1 536.6 34.6 535.3 38.5 535.3 40.5 537.7 40.4 538.9 41.6 538.9 42.8 538.6 44.3 538.7 46.0 539.7 48.6 543.8 55.1 545.0 55.8 546.3 55.1 547.3 55.0 549.0 55.6 550.3 55.9 551.7 55.8 553.3 55.0 554.4 55.2 560.7 63.5 561.8 66.1 563.0 70.2 564.4 73.2 566.2 73.1 572.3 73.1 573.9 72.6 575.3 71.7 576.8 71.3 578.2 72.1 581.5 74.5 584.0 76.8 585.2 78.3 586.0 80.0 586.6 82.4 586.3 83.7 585.8 84.9 585.6 86.9 584.1 88.7 584.9 90.2 588.0 92.8 586.6 94.4 584.5 98.4 583.1 99.7 579.7 100.9 578.3 101.9 577.4 103.6 577.5 104.7 578.0 106.4 577.3 107.9 575.0 108.4 573.3 109.2 572.2 110.0 570.1 112.8 567.6 114.9 564.6 116.3 561.3 116.8 558.3 116.3 552.1 112.9 549.5 113.6 548.1 118.5 547.1 119.5 545.9 119.9 544.7 120.0 540.8 119.5 539.7 119.6 538.2 120.1 536.7 121.0 535.7 122.0 533.9 124.8 533.2 125.5 531.8 126.5 531.1 127.3 530.8 128.2 530.5 130.6 530.3 131.6 528.1 134.7 527.9 136.4 527.7 137.4 527.2 138.3Z","c":[521,87.1]},"Békés":{"d":"M482.4 209.3 483.3 210.3 484.8 211.0 485.5 212.4 483.6 218.8 482.9 219.7 479.1 222.9 478.4 224.8 478.5 226.4 478.8 227.7 478.8 229.0 478.1 230.6 477.2 231.4 474.1 232.2 472.4 233.9 471.3 235.9 469.4 240.9 468.8 242.2 468.5 243.6 469.2 244.5 471.5 246.1 471.2 248.5 469.6 250.8 467.9 251.8 465.6 252.2 464.7 253.7 464.0 255.7 462.2 258.1 460.3 259.1 457.2 258.8 455.4 259.3 454.1 260.8 453.7 263.2 453.3 267.9 452.3 270.2 450.8 272.0 449.6 274.0 449.4 276.5 451.9 281.3 452.4 284.0 450.4 285.5 446.9 285.6 445.2 286.2 443.8 287.9 442.9 290.6 442.5 296.1 441.8 298.4 440.8 300.3 440.0 301.0 437.5 300.9 432.9 306.2 431.4 306.7 429.8 305.3 429.2 304.6 427.8 304.3 425.3 304.6 422.2 303.3 420.7 302.9 418.8 303.8 417.3 303.6 415.8 302.3 415.0 301.9 413.3 301.8 411.5 302.3 410.5 302.8 409.5 301.3 407.9 300.0 407.3 298.1 408.0 295.1 408.1 292.2 407.1 289.8 405.7 288.0 404.1 288.2 403.3 286.8 398.8 287.9 394.6 287.9 396.1 284.5 393.4 285.2 393.4 280.1 394.3 278.5 393.7 276.0 395.5 272.9 396.6 268.9 394.2 267.8 392.8 265.3 392.5 256.1 393.7 250.2 393.5 242.3 390.8 239.8 386.5 238.6 379.6 236.2 378.3 232.0 379.2 228.5 382.5 225.5 385.5 225.2 388.4 225.9 390.8 222.6 393.3 223.2 395.3 221.5 396.5 222.4 397.6 223.9 399.3 223.5 400.9 222.4 402.3 222.1 403.6 221.2 404.5 217.5 404.1 213.4 403.2 211.9 403.1 209.9 406.4 206.0 406.3 204.4 406.9 202.0 408.3 201.0 413.4 194.7 415.1 194.1 416.8 194.6 417.9 193.8 418.7 192.2 420.0 191.8 420.9 190.2 421.6 188.6 423.7 187.8 424.6 186.5 425.2 184.8 426.5 183.1 428.1 182.3 438.6 189.2 442.2 190.4 446.1 190.8 451.6 193.6 453.3 197.2 453.3 206.2 453.0 209.8 454.1 211.7 456.1 212.3 457.8 213.9 457.0 216.9 458.6 218.5 461.4 219.1 467.3 217.4 470.9 217.5 476.7 211.6 480.3 209.8Z","c":[429.1,243.8]},"Csongrád-Csanád":{"d":"M349.1 317.3 346.6 317.6 343.1 315.6 337.6 315.0 334.2 315.8 332.9 316.3 325.9 319.3 324.4 319.0 319.2 315.6 317.9 312.0 315.8 308.1 314.2 303.8 314.4 300.4 315.8 297.8 315.8 295.0 315.6 292.1 317.3 290.8 319.3 290.6 321.6 291.3 324.1 291.0 326.5 289.3 329.1 288.4 330.9 288.5 332.0 286.1 333.4 280.5 332.5 274.8 328.4 271.9 328.3 266.9 331.5 264.6 338.9 265.8 341.9 262.5 343.5 249.0 342.7 246.7 341.0 245.4 344.7 240.3 348.9 236.5 355.1 240.5 364.9 237.2 367.9 240.1 371.1 241.0 373.8 238.8 376.8 237.9 379.6 236.2 386.5 238.6 390.8 239.8 393.5 242.3 393.7 250.2 392.5 256.1 392.8 265.3 394.2 267.8 396.6 268.9 395.5 272.9 393.7 276.0 394.3 278.5 393.4 280.1 393.4 285.2 396.1 284.5 394.6 287.9 398.8 287.9 403.3 286.8 404.1 288.2 405.7 288.0 407.1 289.8 408.1 292.2 408.0 295.1 407.3 298.1 407.9 300.0 409.5 301.3 410.5 302.8 406.4 306.0 406.1 307.8 406.9 310.5 406.9 311.5 406.2 312.2 404.6 311.8 403.5 313.0 403.5 314.5 403.0 315.9 401.7 317.4 400.0 318.2 395.3 319.2 393.6 318.8 392.8 318.2 390.3 315.9 386.9 314.6 383.4 313.8 381.4 317.1 367.7 317.5 364.3 321.8 359.7 317.9 358.2 317.3 356.0 318.3 354.8 318.0 353.9 316.8 352.0 316.1Z","c":[363.7,283.1]},"Hajdú-Bihar":{"d":"M526.6 138.8 521.9 140.3 516.7 144.2 514.1 147.0 512.5 150.1 512.8 154.0 513.5 158.3 513.6 162.5 511.9 166.0 508.2 167.1 506.6 168.0 505.0 169.8 501.8 174.6 501.2 176.0 500.3 180.5 499.9 181.7 498.9 183.5 498.5 184.9 498.5 186.4 498.7 187.5 498.7 188.6 498.2 190.2 497.5 191.2 495.6 193.0 494.8 194.2 494.4 195.3 494.0 197.5 493.4 198.6 491.7 200.3 487.5 203.1 485.6 204.9 482.3 208.9 480.3 209.8 476.7 211.6 470.9 217.5 467.3 217.4 461.4 219.1 458.6 218.5 457.0 216.9 457.8 213.9 456.1 212.3 454.1 211.7 453.0 209.8 453.3 206.2 453.3 197.2 451.6 193.6 446.1 190.8 442.2 190.4 438.6 189.2 428.1 182.3 430.5 176.0 431.0 168.1 430.2 162.1 428.7 156.2 427.7 145.6 426.6 140.5 423.9 138.0 421.2 137.6 418.5 136.4 415.2 133.0 413.2 126.6 419.4 126.0 423.7 121.6 424.2 120.4 426.8 115.7 426.8 114.8 431.4 113.9 431.0 109.3 432.8 107.4 433.3 106.4 433.5 104.4 433.5 102.1 433.3 100.9 433.4 99.9 434.1 98.3 436.9 95.0 437.6 93.9 438.1 92.1 438.2 91.0 444.4 91.8 451.5 97.5 455.3 96.0 469.0 94.9 472.3 92.9 474.9 93.9 475.8 96.6 474.7 103.3 474.4 110.4 482.4 116.7 483.7 118.6 487.9 119.5 489.6 121.1 493.1 122.4 494.9 122.4 496.6 123.2 498.2 125.1 500.0 126.1 501.5 124.5 502.6 121.9 504.6 118.3 507.5 118.1 513.5 121.5 515.9 125.9 515.4 129.2 517.6 131.3 521.6 127.0 523.0 129.2 524.7 136.4 526.5 138.8Z","c":[467.2,151.5]},"Heves":{"d":"M381.7 101.2 382.5 102.2 388.5 112.4 392.5 117.0 393.6 120.9 395.4 123.9 404.7 125.7 406.6 127.0 409.4 127.5 408.9 128.4 408.5 129.6 407.3 131.2 404.8 132.3 403.9 133.1 404.4 134.6 403.9 135.9 402.7 136.4 402.2 139.4 387.2 149.6 386.4 150.6 386.0 153.2 384.8 154.3 381.7 155.3 380.2 157.2 379.4 157.9 377.3 158.6 375.4 158.0 370.6 154.8 369.1 152.8 368.1 150.6 368.6 147.8 367.3 143.8 364.0 142.1 362.4 139.9 361.5 136.6 360.3 135.7 352.3 138.0 353.1 139.8 354.4 140.7 350.2 141.8 345.7 138.7 344.3 133.9 343.6 128.8 340.3 127.7 336.2 129.0 334.3 128.5 332.9 129.8 328.2 136.2 327.2 136.0 325.3 134.5 320.7 135.0 316.0 137.1 314.8 135.6 314.7 133.4 312.4 129.5 310.7 127.7 309.9 125.3 310.9 123.7 311.4 122.0 310.3 121.8 309.3 121.3 308.0 119.3 316.0 109.7 319.3 108.7 323.5 101.3 325.9 99.7 328.7 101.2 330.8 99.7 331.7 97.4 332.9 95.5 334.3 95.4 335.5 96.6 337.8 95.1 340.0 92.8 340.3 89.9 341.4 86.7 343.5 84.9 346.0 84.6 345.4 80.4 343.6 77.0 342.5 76.5 342.0 75.8 342.4 74.0 343.5 73.3 346.0 72.6 347.8 70.7 350.3 69.5 350.9 68.6 351.8 68.1 353.7 67.2 355.7 69.0 357.3 71.0 358.7 70.8 359.9 71.3 361.0 73.1 362.4 74.2 365.4 74.2 367.8 72.1 370.9 71.8 373.8 74.0 379.2 66.8 383.8 71.6 385.3 73.1 385.7 76.1 385.4 79.0 384.3 84.1 380.6 88.1 379.5 89.9 380.1 92.5 381.7 94.4 382.8 96.3 383.2 98.8 382.6 100.0Z","c":[360,113.3]},"Jász-Nagykun-Szolnok":{"d":"M345.5 180.6 344.0 178.3 343.9 176.6 344.2 174.7 344.2 172.4 343.5 170.6 328.3 155.4 326.6 153.3 323.1 150.1 323.1 148.1 322.7 145.8 319.5 146.1 316.8 144.3 315.2 140.8 316.0 137.1 320.7 135.0 325.3 134.5 327.2 136.0 328.2 136.2 332.9 129.8 334.3 128.5 336.2 129.0 340.3 127.7 343.6 128.8 344.3 133.9 345.7 138.7 350.2 141.8 354.4 140.7 353.1 139.8 352.3 138.0 360.3 135.7 361.5 136.6 362.4 139.9 364.0 142.1 367.3 143.8 368.6 147.8 368.1 150.6 369.1 152.8 370.6 154.8 375.4 158.0 377.3 158.6 379.4 157.9 380.2 157.2 381.3 155.8 384.8 154.3 386.0 153.2 386.4 150.6 387.2 149.6 402.2 139.4 402.7 137.2 403.5 136.2 404.1 135.4 403.9 133.1 404.8 132.3 407.3 131.2 408.5 129.6 408.9 128.4 409.4 127.5 410.9 126.8 413.2 126.6 415.2 133.0 418.5 136.4 421.2 137.6 423.9 138.0 426.6 140.5 427.7 145.6 428.7 156.2 430.2 162.1 431.0 168.1 430.5 176.0 428.1 182.3 426.5 183.1 425.2 184.8 424.6 186.5 423.7 187.8 421.6 188.6 420.9 190.2 420.0 191.8 418.7 192.2 417.9 193.8 416.8 194.6 415.1 194.1 413.4 194.7 408.3 201.0 406.9 202.0 406.0 203.6 406.4 206.0 403.1 209.9 403.2 211.9 404.1 213.4 404.5 217.5 403.6 221.2 402.3 222.1 400.9 222.4 399.3 223.5 397.6 223.9 396.5 222.4 395.3 221.5 393.3 223.2 390.8 222.6 388.4 225.9 385.5 225.2 382.5 225.5 379.2 228.5 378.3 232.0 379.6 236.2 376.8 237.9 373.8 238.8 371.1 241.0 367.9 240.1 364.9 237.2 355.1 240.5 348.9 236.5 346.6 235.7 345.0 236.2 343.8 235.1 343.5 233.5 344.7 230.3 346.0 227.3 348.9 226.2 351.5 226.4 352.7 224.0 351.0 223.0 351.0 220.9 352.9 221.1 354.5 222.5 356.7 220.3 355.8 219.1 354.4 218.9 353.1 218.5 352.6 217.5 353.1 216.5 356.1 214.3 360.8 210.8 355.4 208.7 350.7 204.5 348.0 198.8 348.5 192.8 350.7 187.1 347.7 182.1Z","c":[378.9,178.6]}},"budapest":"M254.4 165.6 255.0 161.1 256.6 157.4 256.5 155.8 253.5 147.3 252.8 139.9 257.9 139.1 260.2 138.0 262.2 136.0 266.3 135.7 270.0 138.0 271.9 140.5 275.0 142.7 275.3 144.2 277.2 143.9 283.7 148.9 285.3 149.5 286.5 150.9 284.6 155.8 280.6 158.8 278.9 160.9 270.9 166.7 268.3 166.4 264.1 163.8Z","outline":"M35.1 249.4 34.4 247.0 33.2 247.2 32.4 246.3 31.6 244.8 30.7 243.6 29.5 240.0 29.5 239.1 29.7 238.2 30.4 236.9 31.4 234.9 31.8 233.4 32.0 232.3 30.4 231.6 29.3 230.7 28.0 229.1 27.1 228.6 19.3 229.3 15.5 229.6 12.0 228.8 13.4 228.2 14.5 227.1 17.5 222.9 18.5 221.9 20.7 220.2 22.4 219.5 23.6 218.1 23.6 216.7 24.7 215.2 26.2 214.4 26.6 212.5 27.4 211.2 28.5 211.0 31.7 211.7 35.2 211.2 36.9 211.4 38.4 212.6 39.3 213.0 40.1 212.6 41.5 212.3 43.7 212.3 45.3 211.9 45.0 210.5 43.7 209.4 42.5 209.0 40.1 208.7 41.1 207.7 45.0 206.2 45.9 205.6 45.9 204.3 45.0 203.8 43.2 203.2 42.6 201.5 43.2 199.7 45.0 198.6 46.9 196.0 47.3 194.6 46.2 193.0 44.8 192.9 42.0 194.3 40.9 193.5 41.6 190.7 41.6 189.6 41.0 188.8 39.6 188.8 38.8 186.3 40.1 183.6 39.8 181.4 42.4 179.9 43.6 178.8 44.2 177.2 43.9 175.1 41.3 169.7 40.3 169.1 40.1 167.8 40.9 167.3 40.9 162.1 41.7 160.5 42.8 160.2 43.9 161.0 45.0 162.7 54.1 158.5 57.3 156.0 58.4 155.1 58.1 150.0 59.1 149.0 61.5 147.9 62.5 146.3 62.5 144.4 61.9 142.8 60.7 141.6 59.2 140.8 59.8 138.4 59.0 135.8 57.5 133.8 55.7 133.0 52.9 133.4 51.4 132.8 47.3 131.2 45.0 131.7 40.2 129.7 38.7 128.9 39.4 127.9 40.7 125.8 41.3 125.2 42.2 126.2 43.2 125.9 44.2 125.0 47.5 123.2 48.3 122.5 48.8 121.4 48.6 119.8 49.1 118.6 52.2 117.1 55.8 117.6 62.6 120.3 63.7 121.0 64.1 122.1 64.4 123.5 64.9 124.4 66.0 125.7 67.0 126.3 71.7 127.1 73.4 126.0 75.1 123.3 76.2 122.4 77.4 125.6 80.7 126.2 87.4 124.6 93.6 123.7 95.3 122.9 94.4 122.3 93.6 121.4 93.2 120.1 93.1 115.9 92.5 113.4 92.4 111.2 93.6 109.8 93.1 109.0 92.3 106.6 89.8 105.3 89.2 103.3 90.3 102.8 93.3 102.1 94.7 101.0 95.5 99.8 96.0 98.1 96.3 95.8 95.3 95.2 95.5 94.3 96.2 93.7 96.6 92.4 97.1 91.6 96.2 89.8 101.5 85.3 104.6 83.4 107.7 84.1 111.2 85.1 117.6 86.2 120.3 88.4 129.0 100.1 129.9 100.9 130.7 101.3 132.9 101.7 133.7 102.2 136.5 106.6 137.5 107.6 138.4 107.6 139.3 107.2 140.2 107.0 141.5 107.7 143.3 108.9 144.8 110.4 145.5 111.7 146.4 112.7 150.0 114.7 151.9 115.7 159.1 117.7 164.0 117.4 183.4 116.1 193.9 117.2 197.0 116.9 203.4 114.3 220.8 112.3 224.6 112.5 227.7 113.9 230.2 114.4 232.7 114.1 234.8 112.9 237.5 109.6 239.0 108.5 240.9 108.0 243.1 107.3 239.9 104.8 237.4 102.4 236.8 100.1 237.1 97.4 237.9 92.1 237.6 90.7 237.0 89.7 238.0 88.3 240.5 87.6 241.3 86.9 243.6 82.2 245.0 80.9 253.1 79.1 257.2 78.2 258.4 77.6 260.3 77.7 262.0 77.8 267.1 77.1 277.6 78.3 278.6 78.1 283.7 74.9 295.1 75.1 299.6 71.9 299.9 70.5 299.6 69.2 300.7 66.9 301.5 61.9 302.4 60.1 303.8 59.2 311.7 57.2 312.6 57.2 313.5 57.4 314.4 58.3 316.2 60.5 317.1 61.0 321.0 60.2 323.0 60.5 324.5 62.4 324.6 63.6 324.1 64.8 323.8 65.8 324.6 67.0 328.5 65.9 330.6 66.6 333.8 69.5 335.6 70.2 337.6 69.5 341.4 65.9 343.4 64.7 346.6 63.7 350.3 61.4 351.9 60.8 352.6 60.2 353.2 59.1 353.7 56.8 354.0 55.9 355.1 54.7 356.7 54.8 358.2 55.0 359.6 54.3 362.1 52.0 363.1 51.6 364.8 52.4 365.8 53.5 366.8 53.9 368.8 52.9 371.2 50.4 373.3 47.2 375.1 43.5 378.4 33.3 379.4 31.3 380.6 29.6 383.2 26.9 384.5 25.0 384.7 24.1 384.6 23.2 384.4 21.0 384.5 19.9 384.5 18.9 387.0 17.9 392.3 17.6 410.2 13.4 411.6 13.4 412.9 14.1 415.5 16.4 416.7 16.7 419.3 17.0 424.0 19.8 427.0 20.1 429.1 20.0 431.6 20.4 434.0 21.5 435.7 23.2 437.9 23.6 444.4 20.5 447.3 19.9 448.8 20.5 449.9 21.4 450.8 21.9 452.1 21.1 453.0 19.7 453.5 18.4 454.2 17.2 455.9 16.2 457.3 15.9 460.2 15.8 464.6 14.4 465.9 14.8 468.7 16.5 470.3 17.1 471.0 17.8 471.5 18.9 472.3 21.4 472.9 22.2 474.2 22.9 477.3 22.8 478.8 23.2 479.5 24.6 480.7 29.9 481.4 31.3 486.1 38.6 488.1 40.9 490.4 42.6 493.0 43.5 495.6 43.3 500.0 41.1 503.7 40.5 506.3 39.0 507.5 38.5 511.9 38.3 513.5 37.8 515.0 37.7 520.1 38.2 521.7 37.7 523.1 36.5 524.7 34.4 526.8 34.8 527.9 33.9 530.6 32.7 533.5 33.1 536.6 34.6 535.3 38.5 535.3 40.5 537.7 40.4 538.9 41.6 538.9 42.8 538.6 44.3 538.7 46.0 539.7 48.6 543.8 55.1 545.0 55.8 546.3 55.1 547.3 55.0 549.0 55.6 550.3 55.9 551.7 55.8 553.3 55.0 554.4 55.2 560.7 63.5 561.8 66.1 563.0 70.2 564.4 73.2 566.2 73.1 572.3 73.1 573.9 72.6 575.3 71.7 576.8 71.3 578.2 72.1 581.5 74.5 584.0 76.8 585.2 78.3 586.0 80.0 586.6 82.4 586.3 83.7 585.8 84.9 585.6 86.9 584.1 88.7 584.9 90.2 588.0 92.8 586.6 94.4 584.5 98.4 583.1 99.7 579.7 100.9 578.3 101.9 577.4 103.6 577.5 104.7 578.0 106.4 577.3 107.9 575.0 108.4 573.3 109.2 572.2 110.0 570.1 112.8 567.6 114.9 564.6 116.3 561.3 116.8 558.3 116.3 552.1 112.9 549.5 113.6 548.1 118.5 547.1 119.5 545.9 119.9 544.7 120.0 540.8 119.5 539.7 119.6 538.2 120.1 536.7 121.0 535.7 122.0 533.9 124.8 533.2 125.5 531.8 126.5 531.1 127.3 530.8 128.2 530.5 130.6 530.3 131.6 528.1 134.7 527.9 136.4 527.7 137.4 527.2 138.3 526.1 139.2 521.9 140.3 516.7 144.2 514.1 147.0 512.5 150.1 512.8 154.0 513.5 158.3 513.6 162.5 511.9 166.0 508.2 167.1 506.6 168.0 505.0 169.8 501.8 174.6 501.2 176.0 500.3 180.5 499.9 181.7 498.9 183.5 498.5 184.9 498.5 186.4 498.7 187.5 498.7 188.6 498.2 190.2 497.5 191.2 495.6 193.0 494.8 194.2 494.4 195.3 494.0 197.5 493.4 198.6 491.7 200.3 487.5 203.1 485.6 204.9 482.3 208.9 482.6 210.0 484.2 210.5 485.5 212.4 483.6 218.8 482.9 219.7 479.1 222.9 478.4 224.8 478.5 226.4 478.8 227.7 478.8 229.0 478.1 230.6 477.2 231.4 474.1 232.2 472.4 233.9 471.3 235.9 469.4 240.9 468.8 242.2 468.5 243.6 469.2 244.5 471.5 246.1 471.2 248.5 469.6 250.8 467.9 251.8 465.6 252.2 464.7 253.7 464.0 255.7 462.2 258.1 460.3 259.1 457.2 258.8 455.4 259.3 454.1 260.8 453.7 263.2 453.3 267.9 452.3 270.2 450.8 272.0 449.6 274.0 449.4 276.5 451.9 281.3 452.4 284.0 450.4 285.5 446.9 285.6 445.2 286.2 443.8 287.9 442.9 290.6 442.5 296.1 441.8 298.4 440.8 300.3 440.0 301.0 437.5 300.9 432.9 306.2 431.4 306.7 429.8 305.3 429.2 304.6 427.8 304.3 425.3 304.6 422.2 303.3 420.7 302.9 418.8 303.8 417.3 303.6 415.8 302.3 415.0 301.9 413.3 301.8 411.5 302.3 410.5 302.8 406.4 306.0 406.1 307.8 406.9 310.5 406.9 311.5 406.2 312.2 404.6 311.8 403.5 313.0 403.5 314.5 403.0 315.9 401.7 317.4 400.0 318.2 395.3 319.2 393.6 318.8 392.8 318.2 390.3 315.9 386.9 314.6 383.4 313.8 381.4 317.1 367.7 317.5 364.3 321.8 359.7 317.9 358.2 317.3 356.0 318.3 354.8 318.0 353.9 316.8 352.0 316.1 349.1 317.3 346.6 317.6 343.1 315.6 337.6 315.0 334.2 315.8 332.9 316.3 325.9 319.3 324.4 319.0 319.2 315.6 317.4 314.5 315.6 313.9 313.7 313.8 308.8 314.8 307.0 314.7 305.4 315.0 303.4 315.9 301.4 317.3 300.1 318.7 300.3 319.7 301.0 320.8 301.1 321.8 298.9 323.0 298.3 323.8 297.9 324.7 297.3 325.6 295.8 326.8 294.2 327.2 293.1 327.7 292.4 328.8 291.8 330.0 290.9 330.9 289.5 331.5 286.4 331.5 284.8 331.8 284.1 332.4 283.1 333.1 282.5 334.6 282.1 336.1 281.1 337.3 278.8 337.8 271.3 337.0 269.4 335.9 268.2 333.5 266.3 332.8 264.3 333.6 263.0 335.9 262.9 339.5 261.4 340.0 259.2 339.7 257.2 341.1 256.9 342.0 257.6 343.5 257.7 344.4 255.6 343.9 250.4 343.5 249.1 343.6 248.3 344.6 247.3 345.1 245.6 345.6 244.2 346.6 242.2 345.6 241.3 346.9 240.9 348.0 239.7 349.4 238.7 349.2 235.3 347.5 231.1 346.0 229.5 346.4 227.6 348.3 227.0 350.4 225.4 352.6 223.5 356.2 222.5 357.5 218.9 360.6 216.7 361.4 214.8 360.5 213.4 361.5 210.4 365.1 208.8 366.4 207.6 366.6 206.5 366.4 205.0 364.5 203.7 364.5 202.3 365.3 200.8 365.9 199.3 365.3 197.9 363.8 195.9 363.7 193.3 361.8 191.8 361.2 184.8 361.2 182.6 362.6 181.6 362.9 180.7 362.9 171.7 360.4 165.9 360.4 164.5 360.4 163.7 360.9 163.3 361.8 162.8 362.7 161.8 362.9 160.1 359.5 157.6 357.7 147.3 354.5 145.4 354.4 144.5 353.1 144.3 351.1 143.9 349.3 143.7 348.3 143.1 347.1 139.1 342.9 136.0 341.4 132.4 340.7 125.1 340.3 124.2 341.2 123.4 342.0 122.9 340.0 122.0 339.6 120.0 340.3 118.2 340.5 118.1 339.0 117.6 337.0 116.7 338.5 115.8 338.3 114.9 337.5 113.6 337.0 114.1 336.0 115.2 335.5 115.1 334.3 113.7 334.1 112.3 333.6 111.8 331.6 111.5 330.3 110.5 326.4 110.0 325.3 106.6 320.8 105.7 320.2 98.8 320.0 97.5 319.4 93.4 316.3 92.4 315.2 92.0 313.9 91.3 313.0 86.8 309.3 86.0 308.2 83.9 304.3 80.7 300.5 79.5 299.3 78.7 296.8 78.0 294.9 78.3 293.0 77.5 291.0 76.2 289.3 75.1 288.2 74.3 289.2 73.4 288.2 72.6 287.6 70.0 286.9 68.7 288.2 67.1 286.0 64.5 284.4 62.9 282.3 61.5 280.0 60.0 278.1 58.1 276.8 55.9 276.4 54.5 275.8 53.6 277.3 51.9 276.1 48.2 273.9 46.6 268.1 43.7 265.7 40.6 260.8 37.5 259.0 36.0 257.7 35.6 256.8 36.1 254.8 37.7 254.0 38.8 252.9 38.4 250.5 37.1 249.7 35.6 249.6Z","lakes":[{"d":"M175.3 204.0 179.1 205.2 180.1 206.7 182.8 208.7 184.7 208.3 186.5 209.2 187.6 210.4 188.2 214.2 186.5 216.3 186.3 217.9 186.5 219.2 182.8 219.5 180.9 219.8 180.5 221.6 179.1 222.6 175.3 223.6 175.3 226.2 174.3 225.4 173.5 223.5 171.6 223.9 170.9 225.4 167.9 226.1 167.3 225.4 164.8 229.1 164.1 230.2 160.4 231.1 158.7 232.8 156.7 234.6 152.9 234.8 152.2 236.6 149.2 236.6 145.5 238.6 141.7 240.0 138.0 242.1 134.3 243.8 134.3 245.8 130.6 245.8 129.0 247.8 124.9 247.8 123.1 249.3 121.6 247.8 118.2 247.8 115.6 246.2 113.8 245.9 113.2 247.8 111.9 248.4 110.6 247.8 109.5 245.9 110.0 244.0 110.8 240.3 111.9 240.3 115.6 242.6 117.5 243.0 119.4 241.9 120.5 240.3 122.4 236.6 123.1 237.4 126.8 238.1 128.7 237.7 130.6 238.7 132.4 238.4 133.3 236.6 134.3 235.5 136.1 236.0 138.0 234.7 139.9 233.1 141.7 234.0 143.1 232.8 145.5 230.1 146.3 229.1 149.2 226.6 152.9 227.1 155.3 225.4 156.7 224.3 160.4 221.6 160.4 219.1 164.1 218.5 162.6 221.6 161.5 223.5 162.0 225.4 164.1 225.5 164.1 224.0 166.5 221.6 164.1 221.6 164.1 218.0 165.2 217.9 164.2 215.2 167.9 216.0 170.5 214.2 171.6 214.1 172.8 214.2 173.7 210.4 175.3 208.7 176.7 206.7ZM119.4 244.0Z","a":737,"c":[153.4,228.8],"ll":[17.76,46.86]},{"d":"M73.7 94.8 74.6 94.3 75.4 94.8 76.5 96.6 75.9 98.5 75.4 102.2 74.6 103.4 73.0 106.0 70.8 108.7 69.6 109.7 69.3 113.4 67.1 115.6 67.1 119.7 68.3 120.9 67.1 120.9 67.1 123.4 70.8 123.4 72.3 124.6 72.9 126.5 72.4 128.3 70.8 128.5 70.8 127.4 67.1 126.4 65.5 124.6 65.7 120.9 63.8 117.2 63.4 124.6 62.7 120.9 62.3 117.2 63.4 115.1 65.3 115.3 65.0 113.4 63.4 111.2 62.7 109.7 64.8 109.7 65.9 106.0 65.8 102.2 67.1 100.7 67.4 98.5 67.1 97.3 70.8 97.3Z","a":186,"c":[69.1,109.1],"ll":[16.77,47.82]},{"d":"M399.2 132.1 402.9 134.2 406.4 135.8 402.9 135.8 402.9 137.9 399.2 137.8 397.4 138.0 395.5 136.8 395.2 135.8 395.5 134.5 395.5 135.8 396.9 135.8 399.2 133.5Z","a":30,"c":[400.2,135.7],"ll":[20.67,47.61]},{"d":"M97.3 252.8 100.7 253.8 101.5 255.2 104.4 258.9 104.4 260.2 100.7 261.2 100.7 257.4 98.5 255.2Z","a":23,"c":[101.3,257.3],"ll":[17.15,46.63]},{"d":"M350.4 292.5 352.1 292.5 354.4 292.5 358.2 291.8 359.0 292.5 358.2 293.5 356.3 294.1 354.4 293.8 352.1 296.3 350.7 297.8 349.1 296.3 350.7 296.3Z","a":22,"c":[353.5,293.9],"ll":[20.12,46.34]},{"d":"M402.9 128.3 402.9 125.8 406.2 125.0 405.6 128.3 403.1 132.1 402.9 129.9 399.2 129.9 399.2 128.3Z","a":20,"c":[403.3,128.2],"ll":[20.7,47.67]},{"d":"M389.7 147.0 391.8 147.0 391.8 149.1 395.5 149.1 395.5 150.7 394.2 150.7 391.8 152.9 389.6 150.7Z","a":19,"c":[392,149.9],"ll":[20.57,47.49]},{"d":"M395.5 139.5 399.2 139.5 399.2 142.6 397.9 143.3 395.5 145.3 393.8 143.3 395.5 142.5Z","a":18,"c":[396.8,142],"ll":[20.63,47.56]}],"rivers":{"Duna":"M102.5 84.8Q127.1 101.2 143.3 110.7Q159.4 120.2 171.7 118.9Q184.0 117.7 198.0 116.4Q212.0 115.1 224.4 113.2Q236.7 111.4 241.8 110.1Q246.9 108.8 251.5 110.7Q256.2 112.6 261.7 114.5Q267.2 116.4 268.5 120.2Q269.8 124.0 267.2 128.4Q264.7 132.8 265.1 139.1Q265.5 145.4 265.5 150.4Q265.5 155.4 260.4 163.0Q255.4 170.5 254.9 177.4Q254.5 184.3 254.1 199.9Q253.7 215.4 252.8 226.0Q252.0 236.6 249.4 247.7Q246.9 258.9 247.7 269.3Q248.6 279.8 251.5 296.4Q254.5 313.0 248.1 321.0Q241.8 329.0 237.5 332.6Q233.3 336.3 239.6 343.6L246.0 350.9","Tisza":"M583.1 73.3Q555.9 73.3 547.9 70.1Q539.8 67.0 533.9 52.3Q527.9 37.6 517.3 40.8Q506.7 44.0 495.2 54.2Q483.8 64.4 473.6 67.6Q463.4 70.8 449.4 82.8Q435.4 94.9 428.6 106.3Q421.8 117.7 415.0 125.9Q408.2 134.1 397.2 141.6Q386.1 149.2 379.7 161.7Q373.4 174.3 367.0 182.4Q360.6 190.5 356.4 205.5Q352.2 220.4 353.8 234.1Q355.5 247.7 357.7 258.8Q359.8 270.0 358.1 287.2Q356.4 304.4 354.3 309.4L352.2 314.3","Rába":"M26.9 217.9Q55.0 210.5 69.4 195.5Q83.8 180.5 97.0 168.0Q110.2 155.4 126.3 140.3L142.4 125.2","Körös":"M452.3 255.1Q439.6 240.3 426.9 230.4Q414.1 220.4 402.2 224.8Q390.4 229.1 373.0 238.4L355.5 247.7","Mosoni-Duna":"M102.5 84.8Q111.9 102.5 119.5 108.2Q127.1 113.9 134.8 119.6L142.4 125.2","Maros":"M407.3 317.9Q396.3 314.3 390.4 312.4Q384.4 310.6 377.6 308.7Q370.8 306.9 364.5 305.7L358.1 304.4","Zagyva":"M326.7 73.3Q319.9 88.6 319.0 96.2Q318.2 103.8 317.3 115.8Q316.5 127.8 321.6 134.1Q326.7 140.4 331.3 144.8Q336.0 149.2 340.7 160.5Q345.4 171.8 353.0 181.1L360.6 190.5","Sajó":"M374.2 47.8Q386.1 51.7 391.6 53.6Q397.2 55.5 402.2 61.2Q407.3 67.0 411.6 73.3Q415.8 79.7 420.9 84.1Q426.0 88.6 429.4 91.7L432.8 94.9","Hernád":"M448.1 18.4Q443.9 35.1 440.5 44.6Q437.1 54.2 432.0 63.8Q426.9 73.3 424.3 77.8L421.8 82.2","Bodrog":"M487.2 32.5Q477.0 45.3 473.1 52.9Q469.3 60.6 466.4 65.7L463.4 70.8","Sió":"M178.1 222.9Q195.1 231.6 207.8 237.2Q220.5 242.8 226.9 255.1Q233.3 267.5 239.6 278.0L246.0 288.5","Zala":"M38.0 229.1Q54.1 230.4 64.7 231.0Q75.3 231.6 84.3 235.3Q93.2 239.0 98.7 245.2Q104.2 251.4 106.8 249.6L109.3 247.7"},"region":{"Ukrajna":{"d":"M600.0 127.0 595.2 124.5 589.4 123.5 588.4 122.6 584.6 124.8 582.4 126.6 579.6 125.5 575.1 129.4 566.0 129.6 561.5 129.3 559.2 128.4 550.7 134.1 549.8 136.3 547.9 137.1 542.5 138.1 536.8 139.8 535.6 145.4 533.8 148.5 530.9 152.9 520.2 154.4 511.1 156.7 501.9 158.0 489.6 163.5 485.6 168.2 481.7 169.6 478.1 169.9 475.9 167.2 468.1 160.1 465.1 156.7 461.2 155.7 456.9 156.3 452.7 158.0 448.4 158.3 443.6 155.8 441.2 156.5 429.0 153.6 427.9 153.0 425.7 152.7 416.6 153.0 408.1 147.2 405.4 147.0 403.4 149.4 401.9 152.1 396.0 154.6 394.5 155.7 393.6 155.0 393.3 152.6 393.7 150.7 392.8 148.7 390.6 146.6 390.0 145.7 387.1 145.8 386.1 146.0 382.2 144.1 379.7 139.7 375.6 137.3 372.7 136.5 371.3 134.7 370.4 132.1 369.4 130.1 368.6 127.1 367.7 126.8 363.5 127.2 364.0 117.0 370.4 109.7 371.9 105.9 374.3 97.8 376.1 94.0 378.2 90.9 379.8 87.9 380.4 85.3 382.2 84.9 387.1 87.3 391.6 88.6 393.0 87.3 393.4 85.8 393.3 84.7 389.7 81.2 387.4 79.0 387.3 77.7 388.0 74.6 388.5 71.1 388.0 67.4 385.5 59.1 385.1 55.5 387.4 51.2 395.1 41.0 397.6 37.2 401.0 32.5 410.6 21.3 416.6 14.6 420.6 11.0 426.6 4.7 429.1 1.5 436.5 0.0 600.0 0.0Z","c":[489.8,77.9]},"Szlovákia":{"d":"M380.4 85.3 379.8 87.9 378.2 90.9 376.1 94.0 374.3 97.8 371.9 105.9 370.4 109.7 364.0 117.0 363.5 127.2 362.6 128.0 348.5 131.4 346.5 130.9 344.6 128.9 343.5 127.4 342.8 126.4 341.6 123.6 339.9 121.6 337.5 119.9 335.3 118.1 332.5 118.0 324.7 120.7 319.3 120.9 315.9 120.0 311.1 118.4 301.8 118.2 295.4 119.6 294.8 121.6 289.0 134.0 280.5 138.7 273.0 143.3 270.9 144.3 267.2 142.8 263.0 140.1 259.6 138.6 257.0 139.2 254.2 142.4 253.0 145.6 244.6 148.0 230.0 149.3 224.9 152.4 223.3 156.3 223.1 159.1 224.5 161.5 222.8 164.4 222.2 165.6 211.9 166.2 198.2 167.1 190.0 166.9 182.2 166.7 177.0 164.2 170.5 159.4 163.8 153.0 162.2 152.2 157.8 151.7 156.8 152.1 154.2 150.0 153.5 147.3 149.5 140.2 145.0 128.4 145.0 124.9 146.6 121.1 148.3 118.1 148.4 115.8 150.1 110.2 153.2 103.7 156.2 99.8 158.4 98.6 162.9 99.7 170.7 100.7 176.5 99.8 182.0 96.9 185.0 94.4 187.7 91.6 188.5 89.9 189.7 89.1 194.3 87.6 195.6 85.7 196.2 82.3 196.7 78.4 197.6 75.6 198.8 73.5 207.3 68.5 208.0 66.7 209.4 65.0 211.9 63.1 214.3 60.3 216.8 58.6 220.1 58.8 223.3 58.4 225.7 57.4 226.7 57.3 231.0 58.2 231.8 61.3 232.2 64.6 239.8 64.4 244.0 57.3 246.1 56.4 249.7 54.0 251.9 51.8 253.4 53.2 255.8 57.8 258.2 61.4 259.6 62.9 259.7 64.0 261.2 64.6 263.9 65.1 265.7 66.2 266.3 69.6 266.3 72.7 265.4 74.9 264.9 76.9 266.9 77.7 269.7 76.9 271.7 75.8 277.5 78.3 279.6 72.7 281.8 69.7 285.0 68.4 287.7 66.6 290.2 65.4 291.8 65.4 294.8 65.1 297.2 65.6 300.6 65.0 305.3 66.4 308.3 68.9 311.1 69.8 314.4 69.7 316.6 68.3 319.9 63.3 322.3 63.3 325.9 62.5 331.1 62.6 343.1 63.6 346.2 65.6 353.5 68.1 356.8 70.8 358.2 74.2 358.9 76.6 366.5 80.1 377.7 84.7Z","c":[253.7,108.1]},"Szlovénia":{"d":"M130.5 244.2 126.9 242.7 122.4 242.1 121.7 242.8 119.9 243.7 119.0 245.1 119.6 250.9 118.5 251.8 113.5 251.3 111.8 251.9 109.1 255.9 106.3 257.6 102.9 258.7 100.2 260.2 96.9 261.4 94.0 262.1 92.8 263.9 92.2 265.8 92.4 267.7 95.2 271.3 95.7 275.1 95.4 279.9 94.6 282.4 93.6 284.0 86.4 286.2 79.1 290.1 82.2 294.5 79.7 297.2 79.4 299.2 79.7 301.5 81.2 303.7 81.6 305.9 77.6 307.3 72.2 306.8 65.8 303.9 63.4 304.3 61.3 305.9 59.1 305.2 56.5 303.4 53.1 299.7 51.3 297.3 50.7 295.0 49.7 294.6 48.3 295.3 47.1 298.3 43.8 303.5 41.5 305.0 37.9 304.6 32.8 304.8 29.7 305.3 25.8 303.3 24.9 303.7 24.9 305.0 23.4 306.9 21.1 308.1 10.1 305.3 8.6 302.9 11.1 301.8 14.6 298.7 16.8 299.1 19.6 298.4 21.0 297.1 19.0 293.2 14.6 288.4 12.2 286.6 8.9 285.4 8.3 284.0 10.1 276.5 9.5 275.3 5.8 275.8 4.9 274.9 4.6 273.6 4.9 271.8 7.4 268.8 10.2 266.2 11.0 264.7 10.8 263.6 7.2 262.4 5.0 261.2 3.4 260.8 2.2 261.4 1.3 260.7 0.4 258.5 1.3 255.2 4.4 252.0 8.0 249.3 11.1 247.2 12.8 246.4 13.7 242.9 15.5 243.3 19.2 243.5 23.2 244.3 27.0 245.2 30.3 246.5 37.3 247.8 43.5 248.5 45.5 249.2 47.0 249.1 48.9 250.2 50.1 249.4 50.9 248.1 54.3 246.4 57.6 244.2 59.7 241.5 61.0 239.3 63.1 237.8 65.5 237.3 67.6 236.5 76.6 235.5 85.8 236.3 90.3 234.9 93.9 232.1 99.1 231.4 107.3 233.4 107.9 232.2 108.1 225.9 110.6 223.3 113.0 222.1 120.9 222.6 122.0 224.4 122.3 227.1 123.0 230.8 124.4 231.8 125.1 233.3 125.0 235.8 126.5 237.7 130.0 242.8Z","c":[59.6,267.1]},"Szerbia":{"d":"M249.0 380.0 247.6 378.5 243.3 375.3 239.8 374.1 238.9 372.5 238.5 370.7 238.9 367.6 239.1 363.5 239.8 361.0 242.8 356.2 245.7 351.1 247.5 346.2 248.4 341.6 248.1 340.3 246.6 339.4 243.4 338.4 239.1 339.3 235.4 340.9 233.9 341.0 233.4 339.0 234.0 338.1 235.2 338.2 236.1 338.6 237.2 337.7 237.8 334.9 236.3 325.3 238.9 324.4 239.1 323.1 239.2 321.9 242.1 323.5 246.1 323.5 249.7 323.2 250.3 322.3 250.2 320.8 249.4 319.8 248.2 318.9 247.3 317.6 244.9 317.1 237.5 313.6 233.9 309.9 233.9 305.9 234.9 303.7 236.3 303.0 231.6 300.4 230.1 298.0 231.5 294.7 229.2 288.1 227.0 283.9 229.2 282.2 229.5 279.7 229.7 278.2 234.3 276.6 235.5 275.2 236.4 273.6 239.7 274.9 242.2 275.1 245.1 274.0 247.3 272.4 249.9 271.2 251.1 270.4 252.5 268.9 255.7 264.9 259.1 264.0 263.6 265.1 268.7 265.5 272.4 264.5 281.8 265.7 283.8 266.6 285.1 267.7 287.7 271.2 290.0 275.6 293.3 277.7 297.2 280.2 299.2 282.0 302.1 287.3 304.5 289.9 306.0 289.1 307.2 289.1 307.2 290.7 307.4 294.3 306.9 298.2 307.7 301.8 307.7 302.9 307.2 303.9 307.2 304.9 308.1 305.8 311.3 308.1 314.2 311.8 317.5 314.5 320.8 316.1 322.8 316.2 326.0 319.2 332.5 321.4 334.6 322.1 335.9 323.3 336.9 324.7 336.9 326.2 336.1 326.9 334.6 328.9 334.1 331.5 333.1 332.1 332.0 332.1 331.3 332.9 331.4 333.9 332.3 334.9 333.7 335.8 336.2 336.8 338.7 338.2 338.7 339.2 338.1 340.3 335.0 340.8 332.6 341.0 331.4 341.4 331.6 343.6 338.3 345.7 341.4 347.7 342.9 350.4 347.3 352.1 354.3 352.9 359.2 355.6 361.9 360.2 366.4 359.1 372.7 352.3 378.8 350.6 384.8 353.8 388.0 356.4 388.6 358.5 387.1 359.4 383.9 359.0 381.0 360.3 378.9 363.2 378.6 366.3 380.1 369.7 382.2 372.0 385.1 373.3 386.4 375.0 386.7 377.2 385.8 378.8 384.5 380.0 249.0 380.0Z","c":[290.8,333]},"Románia":{"d":"M390.0 380.0 387.3 377.8 386.4 375.0 385.1 373.3 382.2 372.0 380.1 369.7 378.6 366.3 378.9 363.2 381.0 360.3 383.9 359.0 387.1 359.4 388.6 358.5 388.0 356.4 384.8 353.8 378.8 350.6 372.7 352.3 366.4 359.1 361.9 360.2 359.2 355.6 354.3 352.9 347.3 352.1 342.9 350.4 341.4 347.7 338.3 345.7 331.6 343.6 331.4 341.4 332.6 341.0 335.0 340.8 338.1 340.3 338.7 339.2 338.7 338.2 336.2 336.8 333.7 335.8 332.3 334.9 331.4 333.9 331.3 332.9 332.0 332.1 333.1 332.1 334.1 331.5 334.6 328.9 336.1 326.9 336.9 326.2 336.9 324.7 335.9 323.3 334.6 322.1 332.5 321.4 326.0 319.2 322.8 316.2 320.8 316.1 317.5 314.5 314.2 311.8 311.3 308.1 308.1 305.8 307.2 304.9 307.2 303.9 307.7 302.9 307.7 301.8 306.9 298.2 307.4 294.3 307.2 290.7 307.2 289.1 306.0 289.1 305.3 289.8 302.1 287.3 299.2 282.0 297.2 280.2 293.3 277.7 290.0 275.6 287.7 271.2 285.1 267.7 286.8 266.2 296.2 264.2 300.5 266.2 302.6 265.5 304.5 263.8 305.6 262.6 305.7 261.1 306.6 259.4 309.9 258.6 318.3 259.6 321.7 257.3 322.9 255.9 323.7 253.1 324.5 250.7 327.5 249.4 327.5 247.3 327.1 245.0 328.9 239.8 329.9 237.7 331.6 236.9 333.7 235.3 337.2 231.8 336.4 228.9 337.1 226.7 340.8 221.3 343.7 216.1 343.7 213.5 344.1 211.2 346.5 208.7 349.2 205.5 352.6 195.3 354.0 193.6 356.2 191.7 357.9 189.7 358.0 183.0 359.7 181.1 362.8 178.9 365.8 175.3 368.3 171.3 370.1 169.2 372.7 168.8 375.5 167.1 378.5 166.6 381.5 167.3 383.4 166.9 386.2 164.9 393.4 157.2 394.5 155.7 396.0 154.6 401.9 152.1 403.4 149.4 405.4 147.0 408.1 147.2 416.6 153.0 425.7 152.7 427.3 152.9 429.0 153.6 441.2 156.5 443.0 156.2 448.4 158.3 452.7 158.0 456.9 156.3 461.2 155.7 465.1 156.7 468.1 160.1 475.9 167.2 478.1 169.9 481.7 169.6 485.6 168.2 489.6 163.5 501.9 158.0 511.1 156.7 520.2 154.4 530.9 152.9 533.8 148.5 535.6 145.4 536.8 139.8 542.5 138.1 547.9 137.1 549.8 136.3 553.7 136.1 556.7 136.5 561.5 139.3 564.8 142.8 566.1 145.6 569.0 149.5 571.9 155.0 575.2 162.3 575.8 165.9 577.2 169.9 579.6 174.7 584.2 180.0 584.9 181.1 587.0 184.8 591.1 193.1 594.5 196.4 597.5 200.0 598.8 203.7 600.0 205.4 600.0 380.0Z","c":[467,269.1]},"Lengyelország":{"d":"M436.5 0.0 429.1 1.5 426.6 4.7 420.6 11.0 416.6 14.6 410.6 21.3 401.0 32.5 397.6 37.2 395.1 41.0 387.4 51.2 385.1 55.5 385.5 59.1 388.0 67.4 388.5 71.1 388.0 74.6 387.3 77.7 387.4 79.0 389.7 81.2 393.3 84.7 393.4 85.8 393.0 87.3 391.6 88.6 387.1 87.3 382.2 84.9 380.4 85.3 377.7 84.7 366.5 80.1 358.9 76.6 358.2 74.2 356.8 70.8 353.5 68.1 346.2 65.6 343.1 63.6 331.1 62.6 325.9 62.5 322.3 63.3 319.9 63.3 316.6 68.3 314.4 69.7 311.1 69.8 308.3 68.9 305.3 66.4 300.6 65.0 297.2 65.6 294.8 65.1 292.6 65.0 290.2 65.4 287.7 66.6 285.0 68.4 281.8 69.7 279.6 72.7 277.5 78.3 271.7 75.8 269.7 76.9 266.9 77.7 264.9 76.9 265.4 74.9 266.3 72.7 266.3 69.6 265.7 66.2 263.9 65.1 261.2 64.6 259.7 64.0 259.6 62.9 258.2 61.4 255.8 57.8 253.4 53.2 251.9 51.8 249.7 54.0 246.1 56.4 244.0 57.3 239.8 64.4 232.2 64.6 231.8 61.3 231.0 58.2 226.7 57.3 226.6 55.4 225.7 50.8 216.8 41.5 215.6 37.6 216.1 36.2 215.5 33.7 213.6 32.2 206.5 30.5 204.7 31.5 203.1 30.5 200.6 28.2 196.2 26.4 195.8 25.4 194.1 23.8 193.2 23.6 192.8 24.6 191.4 26.0 187.0 27.8 185.2 27.0 183.5 25.5 181.6 22.3 178.9 19.5 176.7 18.5 175.3 16.9 175.0 15.8 180.1 13.4 181.1 11.0 180.5 6.6 179.8 6.1 177.8 7.5 173.7 8.8 169.8 9.5 167.8 9.5 156.9 1.5 152.8 0.0 436.5 0.0ZM145.5 0.0 147.1 3.6 150.4 9.1 150.2 10.6 146.3 12.8 144.1 13.9 141.4 15.8 139.2 18.5 137.4 19.6 135.6 19.4 133.9 18.0 129.3 9.8 123.6 3.6 123.0 2.1 121.2 1.8 118.7 0.4 145.5 0.0Z","c":[300.4,30.6]},"Moldova":{"d":"M600.0 205.4 598.8 203.7 597.5 200.0 594.5 196.4 591.1 193.1 587.0 184.8 584.9 181.1 584.2 180.0 579.6 174.7 577.2 169.9 575.8 165.9 575.2 162.3 571.9 155.0 569.0 149.5 566.1 145.6 564.8 142.8 561.5 139.3 556.7 136.5 553.7 136.1 549.8 136.3 550.7 134.1 559.2 128.4 561.5 129.3 566.0 129.6 575.1 129.4 579.6 125.5 582.4 126.6 584.6 124.8 588.4 122.6 589.4 123.5 595.2 124.5 599.6 126.6 600.0 205.4Z","c":[585,153.4]},"Olaszország":{"d":"M0.0 240.7 5.0 240.8 13.7 242.9 12.8 246.4 11.1 247.2 8.0 249.3 4.4 252.0 1.3 255.2 0.4 258.5 1.3 260.7 2.2 261.4 3.4 260.8 5.0 261.2 7.2 262.4 10.8 263.6 11.0 264.7 10.2 266.2 7.4 268.8 4.9 271.8 4.6 273.6 4.9 274.9 5.8 275.8 9.5 275.3 10.1 276.5 8.3 284.0 8.9 285.4 12.2 286.6 14.6 288.4 19.0 293.2 21.0 297.1 19.6 298.4 16.8 299.1 14.6 298.7 17.1 296.3 10.7 287.9 7.8 287.9 4.0 291.5 0.0 290.1 0.0 240.7Z","c":[5.9,269.1]},"Magyarország":{"d":"M363.5 127.2 367.6 126.7 368.6 127.1 369.2 130.0 370.4 132.1 371.3 134.7 372.7 136.5 375.6 137.3 379.7 139.7 382.2 144.1 386.1 146.0 387.1 145.8 390.0 145.7 390.6 146.6 392.8 148.7 393.7 150.7 393.3 152.6 393.6 155.0 394.5 155.7 393.4 157.2 386.2 164.9 383.4 166.9 381.5 167.3 378.5 166.6 375.5 167.1 372.7 168.8 370.1 169.2 368.3 171.3 365.8 175.3 362.8 178.9 359.7 181.1 358.0 183.0 357.9 189.7 356.2 191.7 354.0 193.6 352.6 195.3 349.2 205.5 346.5 208.7 344.1 211.2 343.7 213.5 343.7 216.1 340.8 221.3 337.1 226.7 336.4 228.9 337.2 231.8 333.7 235.3 331.6 236.9 329.9 237.7 328.9 239.8 327.1 245.0 327.5 247.3 327.5 249.4 324.5 250.7 323.7 253.1 322.9 255.9 321.7 257.3 318.3 259.6 309.9 258.6 306.6 259.4 305.7 261.1 305.6 262.6 304.5 263.8 302.6 265.5 300.5 266.2 296.2 264.2 286.8 266.2 285.1 267.7 283.8 266.6 281.8 265.7 272.4 264.5 268.7 265.5 263.6 265.1 259.1 264.0 255.7 264.9 252.5 268.9 251.1 270.4 249.9 271.2 247.3 272.4 245.1 274.0 242.2 275.1 239.7 274.9 237.2 273.2 235.5 275.2 234.3 276.6 230.6 278.2 229.5 278.2 226.7 279.5 222.1 280.2 219.7 279.7 215.5 285.3 214.3 286.3 210.3 288.1 207.0 288.9 204.1 288.2 203.1 288.2 190.5 287.9 184.1 286.6 179.9 284.4 177.1 282.1 175.8 279.3 172.6 277.7 167.5 277.1 163.5 274.4 160.7 269.6 156.8 265.8 152.0 263.0 148.1 259.0 145.3 253.8 140.2 249.2 132.7 245.0 130.5 244.2 130.0 242.8 126.5 237.7 125.0 235.8 125.1 233.3 124.4 231.8 123.0 230.8 122.3 227.1 122.0 224.4 120.9 222.6 113.0 222.1 119.6 215.6 122.9 213.7 126.8 214.0 128.0 213.5 128.3 212.5 128.8 210.3 129.3 208.3 129.6 206.4 129.1 205.3 127.4 205.0 126.5 200.3 127.4 198.5 128.3 197.2 127.2 191.4 127.5 189.5 130.5 189.2 132.9 187.9 135.0 186.5 135.6 184.7 137.2 181.1 135.7 176.6 127.1 173.7 126.6 172.6 128.6 171.3 130.8 169.5 132.0 168.1 133.6 167.9 136.0 168.6 140.2 171.8 141.7 172.4 143.3 171.4 145.0 171.2 149.5 171.3 153.3 170.5 152.5 167.1 152.5 164.5 151.9 162.5 152.3 160.3 153.8 158.6 154.2 154.8 156.8 152.1 157.8 151.7 162.2 152.2 163.1 152.8 170.5 159.4 177.0 164.2 182.2 166.7 190.0 166.9 198.2 167.1 211.9 166.2 222.2 165.6 222.8 164.4 224.5 161.5 223.1 159.1 223.3 156.3 224.9 152.4 230.0 149.3 244.6 148.0 253.0 145.6 254.2 142.4 257.0 139.2 259.6 138.6 263.0 140.1 267.2 142.8 270.9 144.3 273.0 143.3 280.5 138.7 289.0 134.0 294.8 121.6 295.4 119.6 301.8 118.2 311.1 118.4 315.9 120.0 319.3 120.9 324.7 120.7 332.5 118.0 335.3 118.1 337.5 119.9 339.9 121.6 341.6 123.6 342.8 126.4 343.5 127.4 344.6 128.9 346.5 130.9 348.5 131.4 362.6 128.0Z","c":[250.4,203.2]},"Németország":{"d":"M0.0 88.4 0.5 89.3 1.3 91.3 2.9 92.6 7.4 92.4 13.1 97.7 16.5 101.5 18.5 104.6 18.0 105.8 17.7 109.6 17.7 113.7 17.3 115.8 14.7 118.6 13.4 119.3 12.6 119.8 4.9 116.1 3.7 117.2 1.6 128.0 0.2 129.9 0.0 88.4Z","c":[7.7,107.2]},"Csehország":{"d":"M118.5 0.0 121.2 1.8 123.0 2.1 123.6 3.6 129.3 9.8 133.9 18.0 135.6 19.4 137.4 19.6 139.2 18.5 141.4 15.8 144.1 13.9 146.3 12.8 150.2 10.6 150.4 9.1 147.1 3.6 145.5 0.0 152.8 0.0 156.9 1.5 167.8 9.5 169.8 9.5 173.7 8.8 177.8 7.5 179.8 6.1 180.5 6.6 181.1 11.0 180.1 13.4 175.0 15.8 175.3 16.9 176.7 18.5 178.9 19.5 181.6 22.3 183.5 25.5 185.2 27.0 187.0 27.8 191.4 26.0 192.8 24.6 193.2 23.6 194.1 23.8 195.8 25.4 196.2 26.4 200.6 28.2 203.1 30.5 204.7 31.5 206.5 30.5 213.6 32.2 215.5 33.7 216.1 36.2 215.6 37.6 216.8 41.5 225.7 50.8 226.6 55.4 226.7 57.3 225.7 57.4 223.3 58.4 220.1 58.8 216.8 58.6 214.3 60.3 211.9 63.1 209.4 65.0 208.0 66.7 207.3 68.5 198.8 73.5 197.6 75.6 196.7 78.4 196.2 82.3 195.6 85.7 194.3 87.6 189.7 89.1 188.5 89.9 187.7 91.6 185.0 94.4 182.0 96.9 176.5 99.8 170.7 100.7 162.9 99.7 158.4 98.6 156.2 99.8 153.2 103.7 150.1 110.2 148.7 115.1 147.7 113.7 145.7 108.5 143.6 107.8 140.8 107.4 138.7 106.6 134.1 103.6 131.7 102.7 129.0 102.5 126.3 104.2 124.4 106.3 118.2 106.3 111.5 105.3 101.8 98.4 99.4 98.3 96.7 98.6 92.5 97.0 84.3 92.5 80.4 91.5 78.1 92.1 76.0 93.1 74.3 93.3 73.4 91.7 70.4 90.0 67.3 89.8 66.4 90.9 65.5 100.7 64.5 104.2 60.3 104.1 58.8 105.8 55.5 110.6 54.8 115.0 49.1 114.2 46.4 113.4 44.0 114.0 41.3 116.6 34.0 116.3 28.2 114.9 25.6 109.2 22.9 107.0 19.6 105.0 18.5 104.6 16.5 101.5 13.1 97.7 7.4 92.4 2.9 92.6 1.3 91.3 0.5 89.3 0.0 88.4 0.0 0.0Z","c":[98.6,53.2]},"Horvátország":{"d":"M74.5 380.0 72.7 376.7 75.2 375.8 77.2 375.8 79.4 374.8 83.0 374.8 87.2 375.8 83.4 372.6 78.8 369.4 66.9 356.5 63.3 350.6 62.8 344.0 63.7 335.0 61.6 328.6 52.4 320.2 48.9 315.8 42.2 313.3 39.1 313.5 37.3 316.8 35.9 324.0 30.0 333.5 27.9 337.7 24.7 343.0 22.0 343.4 20.4 342.9 15.5 333.9 10.7 327.0 10.1 323.8 9.6 319.7 6.1 305.0 8.6 302.9 10.1 305.3 21.1 308.1 23.4 306.9 24.9 305.0 24.9 303.7 25.8 303.3 29.7 305.3 32.8 304.8 37.9 304.6 41.5 305.0 43.8 303.5 47.1 298.3 48.3 295.3 49.7 294.6 50.7 295.0 51.3 297.3 53.1 299.7 56.5 303.4 59.1 305.2 61.3 305.9 63.4 304.3 65.8 303.9 72.2 306.8 77.6 307.3 81.6 305.9 81.2 303.7 79.7 301.5 79.4 299.2 79.7 297.2 82.4 295.3 79.0 291.0 86.4 286.2 93.6 284.0 94.6 282.4 95.4 279.9 95.7 275.1 95.2 271.3 92.4 267.7 92.2 265.8 92.8 263.9 94.0 262.1 96.9 261.4 100.2 260.2 102.9 258.7 106.3 257.6 109.1 255.9 111.8 251.9 113.5 251.3 118.5 251.8 119.6 250.9 119.0 245.1 119.9 243.7 121.7 242.8 122.4 242.1 126.9 242.7 130.5 244.2 132.7 245.0 140.2 249.2 145.3 253.8 148.1 259.0 152.0 263.0 156.8 265.8 160.7 269.6 163.5 274.4 167.5 277.1 172.6 277.7 175.8 279.3 177.1 282.1 179.9 284.4 184.1 286.6 190.5 287.9 203.1 288.2 204.1 288.2 207.0 288.9 210.3 288.1 214.3 286.3 215.5 285.3 219.7 279.7 222.1 280.2 226.7 279.5 229.5 278.2 229.5 279.7 229.2 282.2 227.0 283.9 229.2 288.1 231.5 294.7 230.1 298.0 231.6 300.4 236.0 302.3 234.9 303.7 233.9 305.9 233.9 309.9 237.5 313.6 244.9 317.1 247.3 317.6 248.2 318.9 249.4 319.8 250.2 320.8 250.3 322.3 249.7 323.2 246.1 323.5 242.1 323.5 239.2 321.9 239.1 323.1 238.9 324.4 236.3 325.3 237.8 334.9 237.2 337.7 236.1 338.6 235.2 338.2 234.0 338.1 233.4 339.0 233.9 341.0 231.2 341.2 226.8 340.2 224.8 338.4 224.5 336.5 224.5 334.7 223.1 331.8 219.7 328.8 212.4 328.3 209.7 327.4 207.0 326.3 204.0 325.4 201.2 325.5 197.9 326.4 191.9 325.0 190.0 326.8 187.0 328.8 184.3 328.8 179.2 324.1 177.7 323.8 173.2 326.2 171.4 326.3 170.1 325.5 164.1 323.7 161.4 323.4 159.3 324.2 155.9 323.3 147.2 317.1 142.0 321.8 131.1 320.6 128.0 323.8 124.2 329.9 121.2 332.9 118.7 331.8 115.7 329.1 110.3 322.3 107.6 320.9 104.5 320.6 101.8 321.5 100.3 322.9 99.3 332.9 98.2 341.7 98.2 347.1 104.2 352.0 111.2 360.4 113.5 361.4 114.5 364.1 116.2 371.2 117.9 379.1 118.5 380.0 74.5 380.0ZM59.7 334.7 54.6 335.9 52.2 333.7 51.6 331.9 47.3 331.3 44.7 328.7 44.3 327.6 47.9 324.7 49.8 320.1 52.2 322.9 55.2 328.1 56.8 329.5ZM60.6 347.5 61.6 350.1 57.7 347.7 54.3 346.8 53.6 345.1 54.0 343.7 54.8 342.3 57.4 342.5 57.9 343.9ZM75.4 372.1 74.3 373.7 71.6 370.8 69.2 368.8 67.5 366.4 64.0 363.4 62.8 360.0 57.7 353.0 56.8 351.1 59.5 353.9 61.6 355.7 63.4 356.1 67.9 360.6 72.4 366.3 77.6 371.3 76.4 371.5ZM46.4 353.3 46.1 355.5 43.5 352.7 42.2 347.5 39.1 339.2 38.6 336.9 40.3 334.5 40.3 332.2 38.0 324.8 39.8 323.7 41.0 323.5 41.5 328.6 42.5 331.6 45.5 335.1 44.9 341.0 45.5 349.5 46.1 351.3Z","c":[125.6,309.9]},"Bulgária":{"d":"M384.5 380.0 385.8 378.8 387.3 377.8 390.0 380.0 384.5 380.0Z","c":[387.2,379.3]},"Bosznia-Hercegovina":{"d":"M118.5 380.0 117.9 379.1 116.2 371.2 114.5 364.1 113.5 361.4 111.2 360.4 104.2 352.0 98.2 347.1 98.2 341.7 99.3 332.9 100.3 322.9 101.8 321.5 104.5 320.6 107.6 320.9 110.3 322.3 115.7 329.1 118.7 331.8 121.2 332.9 124.2 329.9 128.0 323.8 131.1 320.6 142.0 321.8 147.2 317.1 155.9 323.3 159.3 324.2 161.4 323.4 164.1 323.7 170.1 325.5 171.4 326.3 173.2 326.2 177.7 323.8 179.2 324.1 184.3 328.8 187.0 328.8 190.0 326.8 191.9 325.0 197.9 326.4 201.2 325.5 204.0 325.4 207.0 326.3 209.7 327.4 212.4 328.3 219.7 328.8 223.1 331.8 224.5 334.7 224.5 336.5 224.8 338.4 226.8 340.2 231.2 341.2 233.9 341.0 235.4 340.9 239.1 339.3 243.4 338.4 246.6 339.4 248.1 340.3 248.4 341.6 247.5 346.2 245.7 351.1 242.8 356.2 239.8 361.0 239.1 363.5 238.9 367.6 238.5 370.7 238.9 372.5 239.8 374.1 243.3 375.3 247.6 378.5 249.0 380.0 118.5 380.0Z","c":[171.5,352.2]},"Ausztria":{"d":"M0.0 130.1 1.6 128.0 3.7 117.2 4.9 116.1 12.6 119.8 13.4 119.3 14.7 118.6 17.3 115.8 17.7 113.7 17.7 109.6 18.0 105.8 18.5 104.6 19.6 105.0 22.9 107.0 25.6 109.2 28.2 114.9 34.0 116.3 41.3 116.6 44.0 114.0 46.4 113.4 49.1 114.2 54.8 115.0 55.5 110.6 58.8 105.8 60.3 104.1 64.5 104.2 65.5 100.7 66.4 90.9 67.3 89.8 70.4 90.0 73.4 91.7 74.3 93.3 76.0 93.1 78.1 92.1 80.4 91.5 84.3 92.5 92.5 97.0 96.7 98.6 99.4 98.3 101.8 98.4 111.5 105.3 118.2 106.3 124.4 106.3 126.3 104.2 129.0 102.5 131.7 102.7 134.1 103.6 138.7 106.6 140.8 107.4 143.6 107.8 145.7 108.5 147.7 113.7 148.7 115.1 148.3 118.1 146.6 121.1 145.0 124.9 145.0 128.4 149.5 140.2 153.5 147.3 154.2 150.0 156.8 152.1 154.2 154.8 153.8 158.6 152.3 160.3 151.9 162.5 152.5 164.5 152.5 167.1 153.3 170.5 149.5 171.3 145.0 171.2 143.3 171.4 141.7 172.4 140.2 171.8 136.0 168.6 133.6 167.9 132.0 168.1 130.8 169.5 128.6 171.3 126.6 172.6 127.1 173.7 135.7 176.6 137.2 181.1 135.6 184.7 135.0 186.5 132.9 187.9 130.5 189.2 127.5 189.5 127.2 191.4 128.3 197.2 127.4 198.5 126.5 200.3 127.4 205.0 129.1 205.3 129.6 206.4 129.3 208.3 128.8 210.3 128.3 212.5 128.0 213.5 126.8 214.0 122.9 213.7 119.6 215.6 113.0 222.1 110.6 223.3 108.1 225.9 108.2 231.7 107.3 233.4 99.4 231.4 93.9 232.1 90.3 234.9 85.8 236.3 76.6 235.5 67.6 236.5 65.5 237.3 63.1 237.8 61.0 239.3 59.7 241.5 57.6 244.2 54.3 246.4 50.9 248.1 50.1 249.4 48.9 250.2 47.0 249.1 45.5 249.2 43.5 248.5 37.3 247.8 30.3 246.5 27.0 245.2 23.2 244.3 19.2 243.5 15.5 243.3 13.7 242.9 5.0 240.8 0.0 240.7 0.0 130.1Z","c":[69.7,169.3]}},"riverLabels":{"Duna":[245.2,242.8],"Tisza":[347.9,205.5]},"regionLakes":"M192.8 210.1 194.7 210.7 196.5 212.4 197.4 212.2 198.3 212.6 199.1 215.1 198.3 216.1 198.3 217.5 196.5 217.7 195.6 217.8 195.3 218.7 192.8 219.7 192.8 220.9 191.9 219.6 191.0 219.9 189.2 220.9 187.7 222.4 185.5 223.4 184.7 224.2 183.7 225.1 181.9 225.1 181.5 226.0 180.1 226.0 178.2 227.0 176.4 227.7 174.6 228.8 172.8 229.5 172.8 230.5 171.0 230.5 170.2 231.5 168.2 231.5 167.3 232.3 166.6 231.5 164.9 231.5 163.7 230.7 162.7 230.6 162.5 231.5 161.2 231.5 160.7 230.6 160.9 229.7 161.3 227.8 163.7 229.0 164.6 229.2 165.5 228.6 166.0 227.8 167.0 226.0 169.1 226.8 170.0 226.6 171.0 227.1 171.9 226.9 172.3 226.0 173.7 225.8 174.6 225.1 175.5 224.4 176.4 224.8 178.2 222.9 180.1 221.1 181.9 221.4 183.1 220.6 185.5 218.7 185.5 217.5 187.4 217.2 186.6 218.7 186.1 219.6 186.3 220.6 187.4 220.6 188.5 218.7 187.4 218.7 187.4 217.0 187.4 215.6 189.2 216.0 190.5 215.1 191.6 215.1 192.0 213.3 192.8 212.4 193.5 211.4ZM165.5 229.7Z","places":{"Budapest":[262.2,149.4],"Debrecen":[481.8,145.2],"Szeged":[355.7,304.1],"Miskolc":[409.8,72.9],"Pécs":[193.6,326.2],"Győr":[144.2,125.6],"Nyíregyháza":[489.4,91.7],"Kecskemét":[317.3,224.6],"Székesfehérvár":[209.7,188.5],"Szombathely":[56.8,182.9],"Szolnok":[359.2,191.5],"Eger":[375.7,98.4],"Sopron":[53.6,126.3],"Veszprém":[166.3,200.1],"Kaposvár":[156.6,291],"Zalaegerszeg":[75.5,231.4],"Békéscsaba":[436,252.2],"Tatabánya":[208.2,140.5],"Salgótarján":[327,73.5],"Szekszárd":[233.8,292.5],"Kékes":[344.5,102.2],"Tihany":[164.5,222.5],"Esztergom":[236.7,112.3],"Tokaj":[463.3,71.1],"Aggtelek":[386.1,25.7],"Hortobágy":[441.6,138.7],"Kőszeg":[50,163.1],"Őriszentpéter":[40.1,231.5],"Visegrád":[256.3,113.2],"Bugac":[316.5,250.4],"Badacsony":[130.3,237.1],"Hollókő":[309,86.4],"Pannonhalma":[153.1,143],"Villány":[212.4,351.1],"Mohács":[231.9,335.9],"Szentendre":[265.2,127.8],"Gyula":[452.7,255.5],"Ópusztaszer":[351,275.4],"Siófok":[178,223.6],"Keszthely":[110,240.5],"Jászberény":[336.2,149.1],"Gödöllő":[289.9,136.6]}};

/* ===== Maps: Hungary with counties, the neighbours, Budapest's Danube bridges; tap-on-map question type ===== */
let _mapN = 0;
function huMap(o = {}) {
  const M = MAPDATA, cid = 'huclip' + (++_mapN); let s = `<defs><clipPath id="${cid}"><path d="${M.outline}"/></clipPath></defs>`;
  for (const [n, c] of Object.entries(M.counties)) s += `<path class="mc${o.hl === n ? ' hl' : ''}" data-a="${n}" d="${c.d}"/>`;
  s += `<path class="mc bp${o.hl === 'Budapest' ? ' hl' : ''}" data-a="Budapest" d="${M.budapest}"/>`;
  for (const [n, d] of Object.entries(M.rivers)) s += `<path class="mr${n === 'Duna' || n === 'Tisza' ? ' big' : ''}${o.hlRiver === n ? ' hl' : ''}" clip-path="url(#${cid})" d="${d}"/>`;
  if (o.rivers !== false) for (const [n, [x, y]] of Object.entries(M.riverLabels)) s += `<text class="mriv" x="${x}" y="${y}">${n}</text>`;
  s += M.lakes.map(l => `<path class="ml" d="${l.d}"/>`).join('');
  if (o.names) for (const [n, c] of Object.entries(M.counties)) s += `<text class="mname" x="${c.c[0]}" y="${c.c[1]}">${n.replace(/-(?=.{6,})/, '-​')}</text>`;
  (o.dots || []).forEach((n, i) => {
    const [x, y] = M.places[n];
    s += `<g class="md${o.mark === n ? ' hl' : ''}" data-a="${n}"><circle class="hit" cx="${x}" cy="${y}" r="20"/><circle class="dot" cx="${x}" cy="${y}" r="6"/>`;
    if (o.labels) s += `<text class="mlab" x="${x + 9}" y="${y - 7}">${o.labels === 'num' ? i + 1 : n}</text>`;
    s += '</g>';
  });
  return `<svg class="vis humap" viewBox="0 0 ${M.W} ${M.H}" width="${M.W}" height="${M.H}" aria-hidden="true">${s}</svg>`;
}
function regionMap(o = {}) {
  const M = MAPDATA, cid = 'huclip' + (++_mapN); let s = `<defs><clipPath id="${cid}"><path d="${M.outline}"/></clipPath></defs>`;
  for (const [n, c] of Object.entries(M.region)) s += `<path class="rc${n === 'Magyarország' ? ' hu' : ''}${o.hl === n ? ' hl' : ''}" data-a="${n}" d="${c.d}"/>`;
  s += `<text class="rname hu" x="${M.region['Magyarország'].c[0]}" y="${M.region['Magyarország'].c[1] + 5}">Magyarország</text>`;
  if (o.names) for (const [n, c] of Object.entries(M.region)) if (n !== 'Magyarország' && NEIGHBOURS.includes(n)) s += `<text class="rname" x="${c.c[0]}" y="${c.c[1]}">${n}</text>`;
  return `<svg class="vis regmap" viewBox="0 0 ${M.W} ${M.H}" width="${M.W}" height="${M.H}" aria-hidden="true">${s}</svg>`;
}
const NEIGHBOURS = ['Ausztria', 'Szlovákia', 'Ukrajna', 'Románia', 'Szerbia', 'Horvátország', 'Szlovénia'];
const mapCentre = (q, a) => q.map === 'region' ? MAPDATA.region[a].c : q.pick === 'dot' ? MAPDATA.places[a] : a === 'Budapest' ? MAPDATA.places.Budapest : MAPDATA.counties[a].c;

/* ---------- Koppints a térképre! ---------- */
UI.map = (q, send) => {
  let sel = null, locked = false;
  const fig = h('div', { class: 'mapfig' + (q.map === 'region' ? ' reg' : ''), html: q.map === 'region' ? regionMap() : huMap({ dots: q.dots }) });
  const sv = fig.querySelector('svg');
  const items = [...sv.querySelectorAll(q.pick === 'dot' ? '.md' : q.map === 'region' ? '.rc:not(.hu)' : '.mc')];
  if (q.map === 'region') sv.querySelectorAll('.rc:not(.hu)').forEach(el => { if (!NEIGHBOURS.includes(el.dataset.a)) el.classList.add('far'); });
  const sb = h('button', { class: 'btn primary', disabled: true, onclick: () => send(sel) }, 'Kész');
  const choose = a => { if (locked) return; sel = a; items.forEach(el => el.classList.toggle('sel', el.dataset.a === a)); sb.disabled = false; };
  items.forEach(el => {
    el.classList.add('tap'); el.setAttribute('tabindex', '0'); el.setAttribute('role', 'button');
    el.addEventListener('click', () => choose(el.dataset.a));
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(el.dataset.a); } });
  });
  const tag = (a, cls) => {
    const [x, y] = mapCentre(q, a), t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('x', x); t.setAttribute('y', q.pick === 'dot' ? y - 12 : y + 5); t.setAttribute('class', 'mtag ' + cls); t.textContent = a; sv.append(t);
  };
  const el = a => items.find(x => x.dataset.a === a);
  return {
    el: h('div', { class: 'mapwrap' }, h('p', { class: 'mute ihelp' }, q.pick === 'dot' ? 'Koppints a megfelelő pontra, aztán nyomd meg a Kész gombot.' : 'Koppints a térképen a helyes területre, aztán nyomd meg a Kész gombot.'), fig), submitBtn: sb,
    wrong(r) { const w = el(r); if (w) { w.classList.remove('sel'); w.classList.add('was-wrong'); } sel = null; sb.disabled = true; },
    lock(r, ok) {
      locked = true; items.forEach(x => { x.classList.remove('sel', 'tap'); x.removeAttribute('tabindex'); });
      const a = el(q.answer); if (a) a.classList.add('right');
      if (!ok && r && r !== q.answer && el(r)) { el(r).classList.add('wrong'); tag(r, 'bad'); }
      tag(q.answer, 'good');
    },
    done() { sb.remove(); }
  };
};
UI.map.judge = (q, r) => r === q.answer;
function mapQ(prompt, answer, o = {}) {
  return { type: 'map', map: o.map || 'hu', pick: o.pick || 'area', dots: o.dots, prompt, answer, answerText: answer, hint: o.hint, speak: o.speak };
}

/* ---------- Budapest's Danube bridges (schematic, north at the top) ---------- */
const BRIDGES = [
  { n: 'Megyeri híd', y: 30, c: '#495057' }, { n: 'Árpád híd', y: 84, c: '#495057' }, { n: 'Margit híd', y: 132, c: '#a0742b' }, { n: 'Lánchíd', y: 174, c: '#6c757d' },
  { n: 'Erzsébet híd', y: 208, c: '#f8f9fa' }, { n: 'Szabadság híd', y: 240, c: '#2f9e44' }, { n: 'Petőfi híd', y: 272, c: '#495057' }, { n: 'Rákóczi híd', y: 304, c: '#495057' }
];
const dcx = y => 132 + 14 * Math.sin((y - 20) / 55);
function danubeSvg(o = {}) {
  const ys = []; for (let y = 0; y <= 340; y += 10) ys.push(y);
  const L = ys.map(y => `${(dcx(y) - 22).toFixed(1)} ${y}`), R = ys.map(y => `${(dcx(y) + 22).toFixed(1)} ${y}`).reverse();
  let s = `<rect x="0" y="0" width="260" height="340" class="f-soft"/>`;
  s += `<path d="M${L.join(' L')} L${R.join(' L')} Z" fill="#74c0fc" stroke="#1c7ed6" stroke-width="2"/>`;
  const mx = dcx(108);
  s += `<ellipse cx="${mx.toFixed(1)}" cy="108" rx="8" ry="21" fill="#8ce99a" stroke="#2b8a3e" stroke-width="1.5"/>`;
  s += `<path d="M${(dcx(340) - 9).toFixed(1)} 340 Q${dcx(322).toFixed(1)} 314 ${(dcx(340) + 9).toFixed(1)} 340Z" fill="#8ce99a" stroke="#2b8a3e" stroke-width="1.5"/>`;
  BRIDGES.forEach((b, i) => {
    const x1 = dcx(b.y) - 30, x2 = dcx(b.y) + 30, hl = o.hl === i, st = hl ? '#e03131' : b.c, w = hl ? 9 : 6;
    const path = b.n === 'Margit híd' ? `M${x1.toFixed(1)} ${b.y + 4} L${dcx(b.y - 3).toFixed(1)} ${b.y - 3} L${x2.toFixed(1)} ${b.y + 4}` : `M${x1.toFixed(1)} ${b.y} L${x2.toFixed(1)} ${b.y}`;
    if (hl) s += `<path d="${path}" fill="none" stroke="#ffd43b" stroke-width="16" stroke-linecap="round" opacity=".8"/>`;
    s += `<path d="${path}" fill="none" stroke="#1d2742" stroke-width="${w + 3}" stroke-linecap="round"/><path d="${path}" fill="none" stroke="${st}" stroke-width="${w}" stroke-linecap="round"/>`;
    if (b.n === 'Lánchíd') [-11, 11].forEach(d => { s += `<rect x="${(dcx(b.y) + d - 4).toFixed(1)}" y="${b.y - 10}" width="8" height="20" rx="1.5" fill="#ced4da" stroke="#1d2742" stroke-width="1.5"/>`; });
    if (b.n === 'Megyeri híd') s += `<path d="M${dcx(b.y).toFixed(1)} ${b.y - 16} L${dcx(b.y).toFixed(1)} ${b.y} M${dcx(b.y).toFixed(1)} ${b.y - 16} L${(dcx(b.y) - 24).toFixed(1)} ${b.y} M${dcx(b.y).toFixed(1)} ${b.y - 16} L${(dcx(b.y) + 24).toFixed(1)} ${b.y}" stroke="#1d2742" stroke-width="1.5" fill="none"/>`;
    if (o.names) s += `<text x="${(x2 + 8).toFixed(1)}" y="${b.y + 4}" font-size="11" class="f-ink">${b.n}</text>`;
  });
  s += `<text x="34" y="190" font-size="20" class="f-ink" text-anchor="middle">Buda</text><text x="${o.names ? 240 : 228}" y="${o.names ? 330 : 190}" font-size="20" class="f-ink" text-anchor="middle">Pest</text>`;
  s += `<text x="20" y="24" font-size="13" class="f-ink">É ▲</text>`;
  if (!o.names) s += `<text x="${(mx + 13).toFixed(1)}" y="112" font-size="10" class="f-ink">Margit-sziget</text><text x="${(dcx(330) + 14).toFixed(1)}" y="334" font-size="10" class="f-ink">Csepel-sziget</text>`;
  return svg(260, 340, s, 'danube');
}

// questions keep only a short reference to a map; it is drawn when shown (keeps saved mistakes small)
const mapRef = (o, region) => `<i data-map="${encodeURIComponent(JSON.stringify({ ...o, region: !!region }))}"></i>`;
const expandVis = v => String(v || '').replace(/<i data-map="([^"]*)"><\/i>/g, (_, j) => { const o = JSON.parse(decodeURIComponent(j)); return o.region ? regionMap(o) : huMap(o); });

/* ===== Kísérletező: predict → try → observe mini-lab ===== */
// q = { type:'lab', lab:'heat'|'float'|'dissolve', prompt, options, answer, ...lab params }
const LAB = {};

/* ---------- 1. Melegítés, hűtés: ice, water, steam ---------- */
function beakerSvg(t, mode) {
  const st = t < 0 ? 'solid' : t === 0 ? 'mix' : t < 100 ? 'liquid' : 'boil';
  let s = '';
  const flame = t > 20 ? Math.min(1, (t - 20) / 80) : 0;
  s += `<rect x="40" y="226" width="140" height="10" rx="3" fill="#868e96"/>`;
  if (flame > 0) s += `<path d="M110 ${224 - 26 * flame} C${100 - 8 * flame} ${218 - 10 * flame} 100 224 110 224 C120 224 ${120 + 8 * flame} ${218 - 10 * flame} 110 ${224 - 26 * flame}Z" fill="#ff922b"/><path d="M110 ${224 - 14 * flame} C105 220 105 224 110 224 C115 224 115 220 110 ${224 - 14 * flame}Z" fill="#ffd43b"/>`;
  if (t < -2) for (let k = 0; k < 3; k++) s += `<text x="${52 + k * 50}" y="246" font-size="13" fill="#1c7ed6">❄</text>`;
  const top = 70, bot = 196, lvl = 110;
  if (st === 'solid' && mode !== 'melt') s += `<rect x="64" y="${lvl}" width="92" height="${bot - lvl}" fill="#e7f5ff" stroke="#74c0fc" stroke-width="2"/><path d="M76 124 l10 10 M120 150 l14 -8 M90 172 l12 6 M132 182 l-8 -10" stroke="#a5d8ff" stroke-width="2"/>`;
  else if (st === 'solid') [[72, 160], [112, 166], [92, 132]].forEach(([x, y]) => { s += `<rect x="${x}" y="${y}" width="30" height="30" rx="5" fill="#e7f5ff" stroke="#74c0fc" stroke-width="2.5"/><path d="M${x + 6} ${y + 7} l8 0" stroke="#fff" stroke-width="3"/>`; });
  else {
    s += `<rect x="64" y="${lvl}" width="92" height="${bot - lvl}" fill="#74c0fc" opacity=".85"/><path d="M64 ${lvl} q12 -4 23 0 t23 0 t23 0 t23 0" fill="none" stroke="#1c7ed6" stroke-width="2"/>`;
    if (st === 'mix') [[76, 112], [118, 114]].forEach(([x, y]) => { s += `<rect x="${x}" y="${y}" width="22" height="18" rx="5" fill="#e7f5ff" stroke="#74c0fc" stroke-width="2"/>`; });
    if (st === 'boil') {
      [[80, 180, 5], [104, 160, 4], [130, 176, 6], [118, 136, 4], [90, 146, 3], [140, 150, 4]].forEach(([x, y, r]) => { s += `<circle class="bub" cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".85"/>`; });
      [[86, 0], [110, 1], [134, 2]].forEach(([x, i]) => { s += `<path class="steam s${i}" d="M${x} 96 q-10 -14 0 -28 q10 -14 0 -28" fill="none" stroke="#adb5bd" stroke-width="5" stroke-linecap="round" opacity=".8"/>`; });
    }
  }
  s += `<path d="M60 ${top} L60 ${bot + 4} Q60 ${bot + 12} 68 ${bot + 12} L152 ${bot + 12} Q160 ${bot + 12} 160 ${bot + 4} L160 ${top}" fill="none" stroke="#1d2742" stroke-width="3"/><line x1="56" y1="${top}" x2="64" y2="${top}" stroke="#1d2742" stroke-width="3"/><line x1="156" y1="${top}" x2="164" y2="${top}" stroke="#1d2742" stroke-width="3"/>`;
  s += `<rect x="170" y="8" width="44" height="26" rx="8" fill="${t < 0 ? '#d0ebff' : t >= 100 ? '#ffe3e3' : '#fff3bf'}" stroke="#1d2742" stroke-width="2"/><text x="192" y="27" font-size="15" text-anchor="middle" font-weight="700" fill="#1d2742">${String(t).replace('-', '−')}°</text>`;
  return svg(220, 250, s, 'labfig');
}
const HEAT = {
  melt: { start: -15, prompt: 'Mi lesz a jégkockákkal, ha 0 °C fölé melegíted őket?', answer: 'elolvadnak, víz lesz belőlük', wrongs: ['még keményebbek lesznek', 'gőzzé válnak, eltűnnek', 'semmi sem történik velük'], seen: t => t >= 3, obs: 'A jég elolvadt, víz lett belőle. A jég 0 °C-on olvad.', help: 'Húzd a csúszkát jobbra, hogy melegítsd a jeget!' },
  boil: { start: 20, prompt: 'Mi történik a vízzel, ha 100 °C-ra melegíted?', answer: 'forrni kezd, és gőz lesz belőle', wrongs: ['megfagy', 'jéggé válik', 'semmi, csak meleg lesz'], seen: t => t >= 100, obs: 'A víz forr: buborékok szállnak fel, és gőz lesz belőle. A víz 100 °C-on forr.', help: 'Húzd a csúszkát egészen 100 fokig!' },
  freeze: { start: 20, prompt: 'Mi lesz a vízzel, ha 0 °C alá hűtöd?', answer: 'megfagy, jég lesz belőle', wrongs: ['felforr', 'gőzzé válik', 'semmi sem történik vele'], seen: t => t <= -3, obs: 'A víz megfagyott, jég lett belőle. A víz 0 °C-on fagy meg.', help: 'Húzd a csúszkát balra, hogy lehűtsd a vizet!' }
};
LAB.heat = (q, onSeen) => {
  const H = HEAT[q.mode]; let t = H.start, fired = false;
  const fig = h('div', { class: 'labstage' });
  const rng = h('input', { type: 'range', min: -20, max: 110, step: 1, value: t, class: 'labrange', 'aria-label': 'Hőmérséklet' });
  const draw = () => { fig.innerHTML = beakerSvg(t, q.mode); if (!fired && H.seen(t)) { fired = true; onSeen(H.obs); } };
  rng.addEventListener('input', () => { t = +rng.value; draw(); });
  const step = d => { t = Math.max(-20, Math.min(110, t + d)); rng.value = t; draw(); };
  const ctl = h('div', { class: 'labctl' }, h('button', { class: 'btn small', onclick: () => step(-10) }, '❄️ Hűtés'), rng, h('button', { class: 'btn small', onclick: () => step(10) }, '🔥 Melegítés'));
  draw();
  return { el: h('div', { class: 'labexp' }, fig, ctl, h('p', { class: 'mute ihelp' }, H.help)), stop() { ctl.querySelectorAll('button,input').forEach(b => b.disabled = true); } };
};

/* ---------- 2. Úszik vagy elsüllyed? ---------- */
const FLOAT = [['fadarab', '🪵', 1], ['alma', '🍎', 1], ['jégkocka', '🧊', 1], ['műanyag labda', '🏐', 1], ['falevél', '🍂', 1], ['gyertya', '🕯️', 1], ['parafa dugó', '<span class="cork"></span>', 1],
  ['vascsavar', '🔩', 0], ['kő', '🪨', 0], ['pénzérme', '🪙', 0], ['kulcs', '🔑', 0], ['üveggolyó', '<span class="marble"></span>', 0], ['kanál', '🥄', 0]];
LAB.float = (q, onSeen) => {
  const [name, em, fl] = FLOAT.find(f => f[0] === q.item);
  const obj = h('div', { class: 'fobj', html: em });
  const tank = h('div', { class: 'tank' }, h('div', { class: 'water' }), obj);
  const go = h('button', { class: 'btn primary small', onclick: () => { go.disabled = true; obj.classList.add(fl ? 'floats' : 'sinks'); setTimeout(() => onSeen(fl ? `${capW(artOf(name))} ${name} úszik a víz tetején, mert könnyebb, mint ugyanannyi víz.` : `${capW(artOf(name))} ${name} lesüllyedt a víz aljára, mert nehezebb, mint ugyanannyi víz.`), 1100); } }, '💧 Tedd a vízbe!');
  return { el: h('div', { class: 'labexp' }, tank, go), stop() { go.disabled = true; } };
};
const capW = s => s[0].toUpperCase() + s.slice(1);

/* ---------- 3. Oldódás: mi lesz vele a vízben? ---------- */
const DISSOLVE = { 'cukor': 'sol', 'só': 'sol', 'homok': 'sink', 'kavics': 'sink', 'olaj': 'top' };
const INSTR = { 'cukor': 'cukorral', 'só': 'sóval', 'homok': 'homokkal', 'kavics': 'kaviccsal', 'olaj': 'olajjal' };
const DIS_TXT = { sol: 'feloldódik, eltűnik a vízben', sink: 'leülepszik a pohár aljára', top: 'a víz tetején marad' };
const DIS_OBS = { sol: 'feloldódott: a szemcsék eltűntek, de a víz íze megváltozott.', sink: 'nem oldódott fel: leülepedett a pohár aljára.', top: 'nem keveredett el a vízzel: a víz tetején maradt, mert könnyebb a víznél.' };
function glassSvg(kind, stir) {
  let s = `<rect x="58" y="60" width="104" height="150" fill="#e7f5ff"/><rect x="58" y="96" width="104" height="114" fill="#a5d8ff" opacity=".8"/>`;
  const r = (k, m) => (Math.sin(k * 12.9898 + m * 78.233) * 43758.5453) % 1, ab = v => Math.abs(v);
  const n = 26;
  for (let k = 0; k < n; k++) {
    if (kind === 'sol') { if (k >= n * (1 - stir / 3)) continue; const x = 64 + ab(r(k, 1)) * 92, y = stir ? 104 + ab(r(k, 2 + stir)) * 98 : 200 + ab(r(k, 2)) * 8; s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="4" height="4" fill="#fff" stroke="#adb5bd" stroke-width=".6"/>`; }
    else if (kind === 'sink') { const swirl = stir > 0 && stir < 3, x = 64 + ab(r(k, 1)) * 92, y = swirl ? 104 + ab(r(k, 2 + stir)) * 98 : 198 + ab(r(k, 2)) * 9; s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="#c9a66b" stroke="#8d6e3f" stroke-width=".6"/>`; }
    else if (k < 9) { const x = 66 + ab(r(k, 1)) * 86, y = stir > 0 && stir < 3 ? 110 + ab(r(k, 2 + stir)) * 80 : 99 + ab(r(k, 2)) * 4; s += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${stir >= 3 ? 9 : 6}" ry="3.5" fill="#ffd43b" stroke="#e67700" stroke-width=".8"/>`; }
  }
  if (stir > 0 && stir < 3) s += `<path d="M90 70 L128 200" stroke="#868e96" stroke-width="6" stroke-linecap="round"/><ellipse cx="128" cy="200" rx="8" ry="5" fill="#868e96"/>`;
  s += `<path d="M54 52 L58 214 Q58 222 66 222 L154 222 Q162 222 162 214 L166 52" fill="none" stroke="#1d2742" stroke-width="3"/>`;
  return svg(220, 236, s, 'labfig');
}
LAB.dissolve = (q, onSeen) => {
  const kind = DISSOLVE[q.item]; let stir = 0;
  const fig = h('div', { class: 'labstage', html: glassSvg(kind, 0) });
  const btn = h('button', { class: 'btn primary small', onclick: () => { stir++; fig.innerHTML = glassSvg(kind, stir); btn.textContent = stir < 3 ? `🥄 Keverd tovább! (${3 - stir})` : '✔ Megkeverted'; if (stir >= 3) { btn.disabled = true; onSeen(`${capW(artOf(q.item))} ${q.item} ${DIS_OBS[kind]}`); } } }, '🥄 Keverd meg! (3)');
  return { el: h('div', { class: 'labexp' }, fig, btn, h('p', { class: 'mute ihelp' }, `${q.item === 'olaj' ? 'Beleöntöttük' : 'Beleszórtuk'} ${artOf(q.item)} ${accWord(q.item)} a vízbe. Keverd meg háromszor!`)), stop() { btn.disabled = true; } };
};
const accWord = w => ({ cukor: 'cukrot', 'só': 'sót', homok: 'homokot', kavics: 'kavicsot', olaj: 'olajat' })[w] || w;

/* ---------- the question type ---------- */
UI.lab = (q, send) => {
  let pred = null, obs = null, locked = false;
  const btns = q.options.map(o => h('button', { class: 'opt', onclick: () => { if (locked || o.value === pred || btns.find(b => b._v === o.value).classList.contains('wrong')) return; pred = o.value; draw(); } }, h('span', { html: o.html })));
  btns.forEach((b, i) => { b._v = q.options[i].value; });
  const stage = h('div', { class: 'labstep2 off' }, h('h3', { class: 'labh' }, '2. Próbáld ki!'));
  const obsEl = h('div', { class: 'labobs', hidden: true });
  const sb = h('button', { class: 'btn primary', disabled: true, onclick: () => send(pred) }, 'Ellenőrzés');
  const exp = LAB[q.lab](q, text => { obs = text; obsEl.hidden = false; obsEl.replaceChildren(h('b', null, '3. Megfigyelés: '), text); if (autoRead() && canSpeak()) speak(text); draw(); });
  stage.append(exp.el, obsEl);
  function draw() {
    btns.forEach(b => { b.classList.toggle('sel', b._v === pred); b.setAttribute('aria-pressed', String(b._v === pred)); });
    stage.classList.toggle('off', !pred && !obs);
    sb.disabled = !(pred && obs);
  }
  draw();
  return {
    el: h('div', { class: 'labwrap' }, h('h3', { class: 'labh' }, '1. Mit gondolsz? Válassz!'), h('div', { class: 'opts long labopts' }, btns), stage), submitBtn: sb,
    wrong(v) { const b = btns.find(x => x._v === v); if (b) { b.classList.remove('sel'); b.classList.add('wrong'); b.disabled = true; } pred = null; draw(); },
    lock(v, ok) { locked = true; exp.stop(); btns.forEach(b => { b.disabled = true; b.classList.remove('sel'); if (b._v === q.answer) b.classList.add('right'); else if (b._v === v && !ok) b.classList.add('wrong'); }); },
    done() { sb.remove(); }
  };
};
UI.lab.judge = (q, r) => r === q.answer;

/* ---------- generators ---------- */
const labQ = (lab, prompt, answer, wrongs, extra) => ({ type: 'lab', lab, prompt: '🧪 ' + prompt, answer, options: shuffle([answer, ...wrongs]).map(v => ({ value: v, html: v })), answerText: answer, ...extra });
const heatLab = L => { const m = L === 1 ? 'melt' : L === 2 ? pick(['melt', 'freeze']) : pick(['boil', 'freeze', 'melt']), H = HEAT[m]; return labQ('heat', H.prompt, H.answer, H.wrongs, { mode: m, hint: 'A víz 0 °C-on fagy meg, és a jég 0 °C-on olvad el. 100 °C-on a víz forr.', explain: H.obs }); };
const floatLab = L => { const pool = L === 1 ? FLOAT.filter(f => ['fadarab', 'alma', 'kő', 'vascsavar', 'pénzérme', 'műanyag labda', 'kulcs', 'jégkocka'].includes(f[0])) : FLOAT; const [n, , fl] = pick(pool); return labQ('float', `Úszik vagy elsüllyed ${artOf(n)} <b>${n}</b>, ha vízbe teszed?`, fl ? 'úszik a víz tetején' : 'elsüllyed', [fl ? 'elsüllyed' : 'úszik a víz tetején'], { item: n, hint: 'Ami könnyebb, mint ugyanannyi víz, az úszik. A fa, a jég és a legtöbb műanyag úszik; a fémek és a kövek elsüllyednek.' }); };
const dissolveLab = L => { const it = pick(L === 1 ? ['cukor', 'homok', 'só'] : Object.keys(DISSOLVE)), k = DISSOLVE[it]; return labQ('dissolve', `Mi történik ${artOf(it)} <b>${INSTR[it]}</b>, ha ${it === 'olaj' ? 'vízbe öntöd' : 'vízbe szórod'} és megkevered?`, DIS_TXT[k], Object.values(DIS_TXT).filter(x => x !== DIS_TXT[k]), { item: it, hint: 'A cukor és a só feloldódik a vízben. A homok és a kavics leülepszik. Az olaj a víz tetején marad.' }); };
const LAB_GENS = { heat: heatLab, float: floatLab, dissolve: dissolveLab };

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

/* ===== Környezetismeret 4 (NAT 2020 kerettanterv témakörei) ===== */
// drawings
function thermo(t, lo = -10, hi = 30) {
  const top = 16, bot = 216, y = v => bot - (v - lo) / (hi - lo) * (bot - top);
  let s = `<rect x="46" y="${top - 10}" width="24" height="${bot - top + 24}" rx="12" class="f-card s-ink" stroke-width="3"/>`;
  s += `<rect x="52" y="${y(t)}" width="12" height="${bot + 14 - y(t)}" class="f-red"/><circle cx="58" cy="${bot + 22}" r="19" class="f-red s-ink" stroke-width="3"/>`;
  for (let v = lo; v <= hi; v++) { const big = v % 5 === 0; s += `<line x1="74" y1="${y(v)}" x2="${big ? 92 : 83}" y2="${y(v)}" class="s-ink" stroke-width="${v % 10 === 0 ? 2.5 : big ? 1.8 : 1}"/>`; if (v % 10 === 0) s += `<text x="97" y="${y(v) + 5}" font-size="15" class="f-ink">${v}</text>`; }
  s += `<text x="58" y="${bot + 60}" text-anchor="middle" font-size="14" class="f-ink">°C</text>`;
  return svg(130, bot + 66, s, 'thermo');
}
const DIRS = ['észak', 'északkelet', 'kelet', 'délkelet', 'dél', 'délnyugat', 'nyugat', 'északnyugat'];
// wrong options for a direction question: never the neighbouring directions (they could be argued)
const farDirs = d => { const i = DIRS.indexOf(d); return DIRS.filter((_, j) => Math.min((i - j + 8) % 8, (j - i + 8) % 8) >= 2); };
function compass(dirIdx, labels) {
  let s = `<circle cx="110" cy="110" r="96" class="f-card s-ink" stroke-width="3"/>`;
  for (let i = 0; i < 8; i++) { const a = i * 45 * Math.PI / 180, r1 = i % 2 ? 78 : 70; s += `<line x1="${110 + r1 * Math.sin(a)}" y1="${110 - r1 * Math.cos(a)}" x2="${110 + 92 * Math.sin(a)}" y2="${110 - 92 * Math.cos(a)}" class="s-ink" stroke-width="${i % 2 ? 1.5 : 3}"/>`; }
  const ab = { 0: 'É', 1: 'ÉK', 2: 'K', 3: 'DK', 4: 'D', 5: 'DNy', 6: 'Ny', 7: 'ÉNy' };
  (labels || [0]).forEach(i => { const a = i * 45 * Math.PI / 180; s += `<text x="${110 + 54 * Math.sin(a)}" y="${110 - 54 * Math.cos(a) + 6}" text-anchor="middle" font-size="${i % 2 ? 14 : 18}" font-weight="700" class="f-ink">${ab[i]}</text>`; });
  if (dirIdx !== null) { const a = dirIdx * 45 * Math.PI / 180, x = 110 + 82 * Math.sin(a), yy = 110 - 82 * Math.cos(a); s += `<line x1="110" y1="110" x2="${x}" y2="${yy}" class="s-red" stroke-width="6" stroke-linecap="round" marker-end="url(#cah)"/>`; }
  s += `<circle cx="110" cy="110" r="7" class="f-ink"/>`;
  return svg(220, 220, `<defs><marker id="cah" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="#d8412f"/></marker></defs>${s}`, 'compass');
}
const PLANT_Y = { 'virág': 40, 'levél': 112, 'szár': 150, 'gyökér': 214 };
function plantSvg(part) {
  let s = `<rect x="0" y="182" width="220" height="70" fill="#b98a5a" opacity=".35"/><line x1="0" y1="182" x2="220" y2="182" stroke="#8a5a2b" stroke-width="3"/>`;
  s += `<path d="M100 182 q-4 22 -22 40 M100 182 q2 26 -2 52 M100 182 q6 20 26 36 M90 206 q-10 4 -18 2 M110 214 q10 0 16 6" fill="none" stroke="#8a5a2b" stroke-width="3" stroke-linecap="round"/>`;
  s += `<path d="M100 182 C100 140 98 100 100 58" fill="none" stroke="#2f9e44" stroke-width="7" stroke-linecap="round"/>`;
  s += `<path d="M100 128 C70 100 50 112 44 124 C66 136 86 136 100 128Z" fill="#40c057" stroke="#2b8a3e" stroke-width="2"/><path d="M100 104 C130 78 150 90 156 102 C134 114 114 114 100 104Z" fill="#40c057" stroke="#2b8a3e" stroke-width="2"/>`;
  for (let i = 0; i < 6; i++) { const a = i * 60 * Math.PI / 180; s += `<ellipse cx="${100 + 18 * Math.sin(a)}" cy="${40 - 18 * Math.cos(a)}" rx="11" ry="15" transform="rotate(${i * 60} ${100 + 18 * Math.sin(a)} ${40 - 18 * Math.cos(a)})" fill="#f783ac" stroke="#c2255c" stroke-width="1.5"/>`; }
  s += `<circle cx="100" cy="40" r="10" fill="#ffd43b" stroke="#e67700" stroke-width="2"/>`;
  if (part) { const yy = PLANT_Y[part], x0 = part === 'levél' ? 150 : part === 'virág' ? 122 : part === 'gyökér' ? 126 : 106; s += `<line x1="200" y1="${yy}" x2="${x0 + 8}" y2="${yy}" class="s-red" stroke-width="4"/><path d="M${x0} ${yy} l12 -7 v14z" class="f-red"/><circle cx="205" cy="${yy}" r="12" class="f-hi s-ink" stroke-width="2"/><text x="205" y="${yy + 6}" text-anchor="middle" font-size="16" font-weight="700" class="f-ink">?</text>`; }
  return svg(220, 252, s, 'plant');
}
const EMO = { kutya: '🐕', tehén: '🐄', 'ló': '🐎', 'sün': '🦔', denevér: '🦇', 'bálna': '🐋', delfin: '🐬', 'mókus': '🐿️', 'nyúl': '🐇', 'hattyú': '🦢', sas: '🦅', pingvin: '🐧', 'tyúk': '🐓', kacsa: '🦆', bagoly: '🦉', 'cápa': '🦈', 'béka': '🐸', 'gyík': '🦎', 'kígyó': '🐍', 'teknős': '🐢', krokodil: '🐊', 'méh': '🐝', katica: '🐞', 'hangya': '🐜', lepke: '🦋', 'szöcske': '🦗', 'légy': '🪰', 'szúnyog': '🦟', ponty: '🐟', 'harcsa': '🐟',
  szarvas: '🦌', vaddisznó: '🐗', gomba: '🍄', 'tölgyfa': '🌳', 'mezei nyúl': '🐇', 'pipacs': '🌺', 'vidra': '🦦', 'nád': '🌾', 'szitakötő': '🪽', 'harkály': '🐦', 'fácán': '🐦', 'gém': '🐦', 'ürge': '🐿️' };
const emo = w => EMO[w] ? `<div class="big-emoji" role="img" aria-label="${w}">${EMO[w]}</div>` : '';

const ANIMALS = {
  'emlős': ['kutya', 'tehén', 'ló', 'sün', 'mókus', 'nyúl', 'denevér', 'bálna', 'delfin'],
  'madár': ['hattyú', 'sas', 'tyúk', 'kacsa', 'bagoly', 'gólya', 'cinege', 'pingvin', 'strucc'],
  'hal': ['ponty', 'csuka', 'harcsa', 'cápa', 'pisztráng'],
  'kétéltű': ['béka', 'gőte', 'szalamandra'],
  'hüllő': ['gyík', 'kígyó', 'teknős', 'krokodil', 'vipera'],
  'rovar': ['méh', 'katica', 'hangya', 'lepke', 'szöcske', 'légy', 'szúnyog', 'cserebogár']
};
const TRICKY = ['denevér', 'bálna', 'delfin', 'pingvin', 'strucc', 'teknős', 'cápa', 'gőte'];
const AFEAT = [
  ['Tollas a teste, tojással szaporodik, a mellső végtagja szárny.', 'madár'],
  ['Hat lába van, a teste három részből áll.', 'rovar'],
  ['Kopoltyúval lélegzik, uszonyokkal úszik.', 'hal'],
  ['Szőrös a teste, a kicsinyeit szoptatja.', 'emlős'],
  ['Csupasz, nedves a bőre, a vízben és a szárazföldön is él.', 'kétéltű'],
  ['Pikkelyes, száraz a bőre, tojással szaporodik.', 'hüllő']
];
const HABITAT = {
  'erdő': ['szarvas', 'vaddisznó', 'harkály', 'mókus', 'szajkó', 'gomba', 'tölgyfa', 'bükkfa', 'páfrány', 'szalamandra'],
  'mező': ['ürge', 'mezei pocok', 'pacsirta', 'fácán', 'mezei nyúl', 'pipacs', 'búzavirág', 'szöcske', 'fürj', 'kamilla'],
  'víz, vízpart': ['gém', 'vidra', 'béka', 'nád', 'gyékény', 'fűzfa', 'tavirózsa', 'szitakötő', 'hattyú', 'ponty']
};
const CHAINS = [['fű', 'szöcske', 'béka', 'gólya'], ['fű', 'nyúl', 'róka'], ['búzaszem', 'mezei pocok', 'bagoly'], ['levél', 'hernyó', 'cinege', 'karvaly'], ['makk', 'vaddisznó', 'farkas'], ['szúnyoglárva', 'kishal', 'csuka', 'vidra']];

const K4 = {
  state(L) {
    if (L === 1) {
      const items = { 'szilárd': ['jég', 'kő', 'vaj', 'fa', 'homok', 'vas', 'üveg', 'csoki'], 'folyékony': ['víz', 'tej', 'olaj', 'méz', 'szörp', 'tea'], 'légnemű': ['levegő', 'vízgőz', 'füst'] };
      const k = pick(Object.keys(items)), w = pick(items[k]);
      return { type: 'choice', prompt: `Milyen halmazállapotú: <b>${w}</b>?`, answer: k, options: Object.keys(items).map(v => ({ value: v, html: v })), hint: 'Szilárd: megtartja az alakját. Folyékony: felveszi az edény alakját, folyik. Légnemű: kitölti a teret, gyakran nem is látjuk.' };
    }
    if (L === 2) {
      const [txt, ans] = pick([['A jégkocka a meleg szobában vízzé válik.', 'olvadás'], ['Télen a tócsa vize jéggé válik.', 'fagyás'], ['A napon a vizes ruha megszárad, a víz eltűnik belőle.', 'párolgás'],
        ['A fazékban a víz bugyogni kezd, és gőz száll fel belőle.', 'forrás'], ['A hideg ablaküvegen vízcseppek jelennek meg.', 'lecsapódás'], ['A tavaszi napsütésben elolvad a hóember.', 'olvadás'], ['A fürdőszoba tükre bepárásodik zuhanyzás után.', 'lecsapódás'], ['A mélyhűtőben a víz megfagy.', 'fagyás']]);
      return mcq(`Mi történik? ${txt}`, ans, shuffle(['olvadás', 'fagyás', 'párolgás', 'forrás', 'lecsapódás'].filter(x => x !== ans)).slice(0, 3), { fmt: v => v, hint: 'Olvadás: szilárdból folyékony. Fagyás: folyékonyból szilárd. Párolgás és forrás: folyékonyból légnemű (forrás: bugyogva, melegítéskor). Lecsapódás: légneműből folyékony.' });
    }
    const t = Math.random() < .4 ? ri(-10, -1) : ri(0, 30);
    return { type: 'input', prompt: 'Hány fokot mutat a hőmérő? (°C)', visual: thermo(t), answer: t, neg: t < 0, hint: 'A hosszú vonalak 10 fokonként, a közepesek 5 fokonként vannak, a kis vonalak 1 fokot jelentenek. A 0 alatti értékek mínuszok.' };
  },
  measure(L) {
    if (L === 1) {
      const [q, a] = pick([['Mivel mérjük a hőmérsékletet?', 'hőmérővel'], ['Mivel mérjük a tömeget (milyen nehéz valami)?', 'mérleggel'], ['Mivel mérjük meg a szoba hosszát?', 'mérőszalaggal'], ['Mivel mérjük a folyadék mennyiségét?', 'mérőpohárral'], ['Mivel mérjük az időt?', 'órával']]);
      return mcq(q, a, ['hőmérővel', 'mérleggel', 'mérőszalaggal', 'mérőpohárral', 'órával'].filter(x => x !== a).sort(() => Math.random() - .5).slice(0, 3), { fmt: v => v, hint: 'Hőmérő: hőmérséklet. Mérleg: tömeg. Mérőszalag, vonalzó: hosszúság. Mérőpohár: űrtartalom. Óra: idő.' });
    }
    if (L === 2) {
      const [q, a, w] = pick([['Mi a hőmérséklet mértékegysége?', '°C (Celsius-fok)', ['kg', 'cm', 'l']], ['Melyik a tömeg mértékegysége?', 'kg', ['°C', 'm', 'dl']], ['Melyik a hosszúság mértékegysége?', 'cm', ['kg', 'l', '°C']], ['Melyik az űrtartalom mértékegysége?', 'dl', ['kg', 'cm', '°C']], ['Melyik az idő mértékegysége?', 'perc', ['kg', 'cm', 'l']]]);
      return mcq(q, a, w, { fmt: v => v, hint: 'Hosszúság: mm, cm, dm, m, km. Tömeg: g, dkg, kg. Űrtartalom: ml, dl, l. Idő: másodperc, perc, óra. Hőmérséklet: °C.' });
    }
    const [a, b, k, max] = pick([['l', 'dl', 10, 9], ['kg', 'dkg', 100, 5], ['m', 'cm', 100, 5], ['km', 'm', 1000, 5], ['óra', 'perc', 60, 3], ['perc', 'másodperc', 60, 3]]);
    const n = ri(1, max);
    return { type: 'input', prompt: `${n} ${a} = <span class="blank">?</span> ${b}`, answer: n * k, hint: `1 ${a} = ${k} ${b}` };
  },
  weather(L) {
    if (L === 1) {
      const [em, ans] = pick([['☀️', 'napos'], ['🌧️', 'esős'], ['🌨️', 'havazik'], ['⛈️', 'zivatar'], ['🌫️', 'ködös'], ['💨', 'szeles'], ['☁️', 'borult, felhős']]);
      return mcq('Milyen időt jelöl ez a jel?', ans, shuffle(['napos', 'esős', 'havazik', 'zivatar', 'ködös', 'szeles', 'borult, felhős'].filter(x => x !== ans)).slice(0, 3), { visual: `<div class="big-emoji">${em}</div>`, fmt: v => v, hint: 'Az időjárás elemei: hőmérséklet, csapadék, szél, felhőzet. Az időjárás-jelentés ezeket rajzokkal mutatja.' });
    }
    if (L === 2) {
      const [q, a, w] = pick([['Mivel mérjük, mennyi eső esett?', 'csapadékmérővel', ['hőmérővel', 'szélzászlóval', 'mérleggel']], ['Mi mutatja, merről fúj a szél?', 'a szélzászló', ['a hőmérő', 'a csapadékmérő', 'az iránytű']], ['Mivel mérjük a levegő hőmérsékletét?', 'hőmérővel', ['csapadékmérővel', 'szélzászlóval', 'vonalzóval']], ['Melyik NEM az időjárás eleme?', 'a földrengés', ['a szél', 'a csapadék', 'a hőmérséklet']]]);
      return mcq(q, a, w, { fmt: v => v, hint: 'Hőmérő: hőmérséklet. Csapadékmérő: mennyi eső vagy hó esett. Szélzászló: a szél iránya.' });
    }
    const odd = pick(['szél', 'napsütés', 'villám']), cs = shuffle(['eső', 'hó', 'jégeső', 'dér', 'harmat']).slice(0, 3);
    return mcq('Melyik NEM csapadék?', odd, cs, { fmt: v => v, hint: 'Csapadék a levegőből lehulló vagy kicsapódó víz: eső, hó, jégeső, dér, harmat.' });
  },
  energy(L) {
    if (L === 1) {
      const nat = ['a Nap', 'a villám', 'a csillagok', 'a szentjánosbogár'], art = ['a zseblámpa', 'a villanykörte', 'a gyertya', 'az utcai lámpa'];
      const isNat = Math.random() < .5, w = pick(isNat ? nat : art);
      return { type: 'choice', prompt: `Milyen fényforrás ${w}?`, answer: isNat ? 'természetes' : 'mesterséges', options: [{ value: 'természetes', html: 'természetes' }, { value: 'mesterséges', html: 'mesterséges (ember készítette)' }], hint: 'A természetes fényforrás magától világít (Nap, villám). A mesterségeset az ember készítette (lámpa, gyertya).' };
    }
    if (L === 2) {
      const burn = ['fa', 'papír', 'szén', 'gyertyaviasz', 'száraz levél', 'fenyőtoboz'], no = ['kő', 'vas', 'üveg', 'homok', 'víz', 'tégla'];
      const want = Math.random() < .5, ans = pick(want ? burn : no), wr = shuffle(want ? no : burn).slice(0, 3);
      return mcq(`Melyik anyag ${want ? 'éghető' : 'éghetetlen'}?`, ans, wr, { fmt: v => v, hint: 'Az éghető anyagok meggyulladnak és elégnek (fa, papír). Az éghetetlenek nem (kő, fém, üveg, víz).' });
    }
    const [q, a, w, hint] = pick([
      ['Mi NEM kell az égéshez?', 'víz', ['éghető anyag', 'levegő', 'elég magas hőmérséklet'], 'Az égéshez három dolog kell: éghető anyag, levegő (oxigén) és elég magas hőmérséklet. Ezért oltja el a víz a tüzet.'],
      ['Melyik helyváltoztató mozgás?', 'futás', ['guggolás', 'karkörzés', 'hajolás'], 'Helyváltoztató mozgás: máshová kerülünk (futás, úszás). Helyzetváltoztató: helyben maradunk, csak a testhelyzet változik.'],
      ['Melyik helyzetváltoztató mozgás?', 'guggolás', ['futás', 'úszás', 'kerékpározás'], 'Helyzetváltoztató mozgásnál helyben maradunk, csak a testhelyzetünk változik.'],
      ['Melyik a ló leggyorsabb járásmódja?', 'vágta', ['lépés', 'ügetés', 'poroszkálás'], 'A ló járásmódjai a leglassabbtól: lépés, ügetés (és poroszkálás), vágta.'],
      ['Mi mozgatja a csontjainkat?', 'az izmok', ['a bőr', 'a szív', 'a tüdő'], 'A csontokat az izmok mozgatják, az ízületekben hajlanak.'],
      ['Mi a szivárvány?', 'a napfény színekre bomlása az esőcseppekben', ['egy fényes felhő', 'a villám nyoma', 'a Hold fénye'], 'Ha a napfény esőcseppeken halad át, színekre bomlik: így látjuk a szivárványt.']]);
    return mcq(q, a, w, { fmt: v => v, hint });
  },
  plant(L) {
    if (L === 1) { const part = pick(Object.keys(PLANT_Y)); return mcq('Mi a neve a nyíllal jelölt résznek?', part, Object.keys(PLANT_Y).filter(x => x !== part), { visual: plantSvg(part), fmt: v => v, hint: 'A növény részei alulról felfelé: gyökér (a földben), szár, levél, virág. A virágból lesz a termés, abban van a mag.' }); }
    if (L === 2) {
      const [q, a] = pick([['Melyik rész veszi fel a vizet a talajból?', 'gyökér'], ['Melyik rész szállítja a vizet a levelekhez?', 'szár'], ['Melyik rész készít táplálékot a napfény segítségével?', 'levél'], ['Melyik rész csalogatja a rovarokat?', 'virág'], ['Miben fejlődik a mag?', 'termés'], ['Melyik rész rögzíti a növényt a talajban?', 'gyökér']]);
      return mcq(q, a, ['gyökér', 'szár', 'levél', 'virág', 'termés'].filter(x => x !== a).sort(() => Math.random() - .5).slice(0, 3), { fmt: v => v, hint: 'Gyökér: rögzít, vizet szív fel. Szár: tart és szállít. Levél: napfényből táplálékot készít. Virág: belőle lesz a termés. Termés: védi a magot.' });
    }
    if (Math.random() < .35) return { type: 'build', prompt: 'Rakd sorba a növény életszakaszait! Koppints rájuk sorban.', answer: ['csírázás', 'növekedés', 'virágzás', 'termésérés'], tiles: shuffle(['csírázás', 'növekedés', 'virágzás', 'termésérés']), explain: 'A magból kicsírázik a növény, megnő, virágot hoz, végül megérik a termése.', hint: 'Minden a magból indul.' };
    const [w, a, em] = pick([['répa', 'gyökér', '🥕'], ['retek', 'gyökér', ''], ['cékla', 'gyökér', ''], ['alma', 'termés', '🍎'], ['paradicsom', 'termés', '🍅'], ['paprika', 'termés', '🫑'], ['saláta', 'levél', '🥬'], ['káposzta', 'levél', ''], ['karfiol', 'virág', ''], ['brokkoli', 'virág', '🥦'], ['borsó', 'mag', ''], ['napraforgó', 'mag', '🌻'], ['spárga', 'szár', '']]);
    return mcq(`Melyik részét esszük ennek a növénynek: <b>${w}</b>?`, a, ['gyökér', 'szár', 'levél', 'virág', 'termés', 'mag'].filter(x => x !== a).sort(() => Math.random() - .5).slice(0, 3), { visual: em ? `<div class="big-emoji">${em}</div>` : undefined, fmt: v => v, hint: 'Gondold végig, hol nő az a rész, amit megeszünk: a földben (gyökér), a szárán, levélként, virágként vagy termésként.' });
  },
  animal(L) {
    const groups = Object.keys(ANIMALS);
    if (L === 2) { const [d, a] = pick(AFEAT); return mcq(`Melyik állatcsoportra igaz? ${d}`, a, groups.filter(x => x !== a).sort(() => Math.random() - .5).slice(0, 3), { fmt: v => v, hint: 'Emlős: szőr, szoptat. Madár: toll, tojás. Hal: kopoltyú, uszony. Kétéltű: csupasz, nedves bőr. Hüllő: pikkely, száraz bőr. Rovar: 6 láb.' }); }
    let w; do { w = L === 3 ? pick(TRICKY) : pick(ANIMALS[pick(groups)]); } while (L === 1 && TRICKY.includes(w));
    const g = groups.find(k => ANIMALS[k].includes(w));
    const why = { 'denevér': 'A denevér repül, de szőrös, és szoptatja a kicsinyeit: emlős.', 'bálna': 'A bálna a vízben él, de levegőt vesz és szoptat: emlős.', 'delfin': 'A delfin levegőt vesz és szoptat: emlős.', 'pingvin': 'A pingvin nem repül, de tollas és tojást rak: madár.', 'strucc': 'A strucc nem repül, de tollas és tojást rak: madár.', 'teknős': 'A teknős pikkelyes bőrű és tojást rak: hüllő.', 'cápa': 'A cápa kopoltyúval lélegzik: hal.', 'gőte': 'A gőte csupasz, nedves bőrű, vízben és szárazon is él: kétéltű.' }[w];
    return mcq(`Melyik csoportba tartozik ez az állat: <b>${w}</b>?`, g, groups.filter(x => x !== g).sort(() => Math.random() - .5).slice(0, 3), { visual: emo(w) || undefined, fmt: v => v, explain: why, hint: 'Emlős: szőr, szoptat. Madár: toll, tojás. Hal: kopoltyú. Kétéltű: csupasz bőr, víz és szárazföld. Hüllő: pikkely. Rovar: 6 láb.' });
  },
  habitat(L) {
    if (L === 1) { const k = pick(Object.keys(HABITAT)), w = pick(HABITAT[k]); return { type: 'choice', prompt: `Hol él ez az élőlény: <b>${w}</b>?`, visual: emo(w) || undefined, answer: k, options: Object.keys(HABITAT).map(v => ({ value: v, html: v })), hint: 'Gondold végig, mit eszik és hol talál menedéket: a fák között, a füves mezőn vagy a víz mellett?' }; }
    if (L === 2) {
      if (Math.random() < .5) { const a = pick(['park', 'szántóföld', 'gyümölcsös', 'kert']); return mcq('Melyik mesterséges (ember által létrehozott) életközösség?', a, ['erdő', 'tópart', 'hegyi rét'], { fmt: v => v, hint: 'A mesterséges életközösséget az ember hozta létre és gondozza: park, kert, szántóföld.' }); }
      const k = pick(Object.keys(HABITAT)), others = Object.keys(HABITAT).filter(x => x !== k), odd = pick(HABITAT[pick(others)]), same = shuffle(HABITAT[k]).slice(0, 3);
      return mcq('Melyik nem illik a többi közé? (Ugyanott élnek?)', odd, same, { fmt: v => v, explain: `A többi: ${k} élőlénye.`, hint: 'Keresd azt, amelyik más életközösségben él.' });
    }
    const ch = pick(CHAINS);
    return { type: 'build', prompt: 'Rakd sorba a táplálékláncot! Kezdd azzal, akit megesznek.', answer: ch, tiles: shuffle(ch), explain: ch.join(' → '), hint: 'A tápláléklánc egy növénnyel kezdődik. Utána az jön, aki megeszi, aztán az, aki őt eszi meg.' };
  },
  body(L) {
    if (L === 1) { const [e, s] = pick([['szem', 'látás'], ['fül', 'hallás'], ['orr', 'szaglás'], ['nyelv', 'ízlelés'], ['bőr', 'tapintás']]); const em = { szem: '👁️', 'fül': '👂', orr: '👃', nyelv: '👅', 'bőr': '✋' }[e]; return mcq(`Mire való ez az érzékszerv: <b>${e}</b>?`, s, ['látás', 'hallás', 'szaglás', 'ízlelés', 'tapintás'].filter(x => x !== s).sort(() => Math.random() - .5).slice(0, 3), { visual: `<div class="big-emoji">${em}</div>`, fmt: v => v, hint: 'Öt érzékszervünk van: szem, fül, orr, nyelv, bőr.' }); }
    const [q, a, w] = pick([['Melyik szervünk pumpálja a vért?', 'a szív', ['a tüdő', 'a gyomor', 'az agy']], ['Melyik szervünkkel lélegzünk?', 'a tüdő', ['a szív', 'a máj', 'a gyomor']], ['Hol kezdődik az étel megemésztése, miután lenyeltük?', 'a gyomorban', ['a tüdőben', 'a szívben', 'az agyban']], ['Melyik szervünk irányítja a testünket, és gondolkodunk vele?', 'az agy', ['a szív', 'a gyomor', 'a tüdő']], ['Mi tartja a testünket, és védi a belső szerveket?', 'a csontváz', ['a bőr', 'a haj', 'a szív']], ['Mi köti össze a csontokat, hogy hajlítani tudjuk őket?', 'az ízületek', ['a fogak', 'a körmök', 'a tüdő']]]);
    return mcq(q, a, w, { fmt: v => v, hint: 'Szív: vérkeringés. Tüdő: légzés. Gyomor: emésztés. Agy: irányítás, gondolkodás. Csontok, izmok, ízületek: mozgás.' });
  },
  health(L) {
    if (L === 1) {
      const [q, a, w] = pick([['Melyik egészséges szokás?', 'Minden nap zöldséget és gyümölcsöt eszem.', ['Sok cukros üdítőt iszom.', 'Késő éjszakáig tévézek.', 'Reggeli nélkül megyek iskolába.']], ['Melyik egészséges szokás?', 'Minden nap mozgok a szabadban.', ['Egész délután a telefont nyomkodom.', 'Sok chipset eszem.', 'Nem mosok kezet evés előtt.']], ['Mit tegyél, ha tüsszentesz?', 'Zsebkendőbe vagy a könyökhajlatomba tüsszentek.', ['A tenyerembe tüsszentek, aztán kezet fogok.', 'Mások felé fordulok.', 'Semmit, ez nem számít.']], ['Mikor kell kezet mosni?', 'Evés előtt és WC-használat után.', ['Csak hetente egyszer.', 'Csak ha látszik a kosz.', 'Soha.']]]);
      return mcq(q, a, w, { fmt: v => v, hint: 'Egészséges: változatos étrend, sok mozgás, elég alvás, tisztálkodás.' });
    }
    if (L === 2) {
      const [q, a, w] = pick([['Mi a mentők telefonszáma?', '104', ['105', '107', '108']], ['Mi a tűzoltók telefonszáma?', '105', ['104', '107', '106']], ['Mi a rendőrség telefonszáma?', '107', ['104', '105', '103']], ['Melyik az általános segélyhívó szám, amelyet bármilyen vészhelyzetben hívhatsz?', '112', ['104', '105', '107']]]);
      return mcq(q, a, w, { fmt: v => v, hint: 'Mentők: 104. Tűzoltók: 105. Rendőrség: 107. Általános segélyhívó: 112.' });
    }
    const [q, a, w] = pick([['Körülbelül mennyi az egészséges ember testhőmérséklete?', '36,5 °C', ['33 °C', '39 °C', '41 °C']], ['Mivel mérjük a lázat?', 'lázmérővel', ['mérleggel', 'vonalzóval', 'órával']], ['Mire jó a védőoltás?', 'Megvéd bizonyos betegségektől.', ['Gyorsabban nő tőle a hajunk.', 'Elmulasztja a fogfájást.', 'Erősebbek lesznek az izmaink.']], ['Melyik a nátha jellemző tünete?', 'orrfolyás, tüsszögés', ['kék folt a térden', 'fogfájás', 'hajhullás']], ['Milyen betegségnél jelennek meg viszkető pöttyök az egész testen?', 'bárányhimlő', ['nátha', 'fogszuvasodás', 'napszúrás']]]);
    return mcq(q, a, w, { fmt: v => v, hint: 'Az egészséges testhőmérséklet 36–37 °C. Ennél magasabb: láz. A védőoltás felkészíti a szervezetet egy betegség ellen.' });
  },
  compass(L) {
    if (L < 3) { const i = L === 1 ? pick([0, 2, 4, 6]) : pick([1, 3, 5, 7]); return mcq('Merre mutat a piros nyíl?', DIRS[i], shuffle(DIRS.filter(x => x !== DIRS[i] && (L === 1 ? DIRS.indexOf(x) % 2 === 0 : true))).slice(0, 3), { visual: compass(i, [0]), fmt: v => v, hint: 'Fent van az észak (É), lent a dél (D), jobbra a kelet (K), balra a nyugat (Ny). A mellékvilágtájak kettő között: északkelet, délkelet, délnyugat, északnyugat.' }); }
    if (Math.random() < .5) {
      const i = ri(0, 7), turn = pick([['jobbra', 2], ['balra', -2], ['hátra', 4]]), j = (i + turn[1] + 8) % 8;
      return mcq(`${cap(DIRS[i])} felé nézel. Ha ${turn[0]} fordulsz, merre nézel?`, DIRS[j], shuffle(DIRS.filter(x => x !== DIRS[j])).slice(0, 3), { visual: compass(null, [0, 2, 4, 6]), fmt: v => v, hint: 'Ha észak felé nézel, jobb kezed felől van a kelet, bal kezed felől a nyugat, mögötted a dél.' });
    }
    const [city, d] = pick([['Szeged', 'délkelet'], ['Pécs', 'délnyugat'], ['Miskolc', 'északkelet'], ['Sopron', 'nyugat'], ['Debrecen', 'kelet'], ['Eger', 'északkelet'], ['Kecskemét', 'délkelet'], ['Szombathely', 'nyugat'], ['Nyíregyháza', 'északkelet'], ['Zalaegerszeg', 'délnyugat'], ['Kaposvár', 'délnyugat'], ['Békéscsaba', 'délkelet']]);
    return mcq(`Budapesttől milyen irányban van ${city}?`, d, shuffle(farDirs(d)).slice(0, 3), { fmt: v => v, hint: 'Gondolj Magyarország térképére: Budapest középen, kicsit feljebb. Fent az észak, jobbra a kelet.' });
  },
  landform(L) {
    if (L === 1) {
      const [q, a] = pick([['Hogy hívjuk a nagy, sík, alacsony területet?', 'síkság'], ['Hogy hívjuk az egymás melletti dombok csoportját?', 'dombság'], ['Hogy hívjuk az egymás melletti hegyek csoportját?', 'hegység'], ['Hogy hívjuk a két hegy vagy domb közötti mélyedést?', 'völgy'], ['Hogy hívjuk a kis, keskeny folyóvizet?', 'patak'], ['Hogy hívjuk a patakoknál sokkal nagyobb, széles, sok vizet szállító vízfolyást?', 'folyó']]);
      return mcq(q, a, shuffle(['síkság', 'dombság', 'hegység', 'völgy', 'patak', 'folyó', 'tó'].filter(x => x !== a)).slice(0, 3), { fmt: v => v, hint: 'Felszínformák: síkság, domb, dombság, hegy, hegység, völgy. Vizek: forrás, patak, folyó, tó.' });
    }
    if (L === 2) { const flow = Math.random() < .5, a = pick(flow ? ['patak', 'csermely', 'csatorna'] : ['tó', 'mocsár', 'halastó']); return mcq(`Melyik ${flow ? 'folyóvíz' : 'állóvíz'}?`, a, shuffle(flow ? ['tó', 'mocsár', 'halastó'] : ['patak', 'csermely', 'csatorna']).slice(0, 2), { fmt: v => v, hint: 'A folyóvíz mozog, folyik egy irányba (patak, folyó). Az állóvíz egy helyben marad (tó, mocsár).' }); }
    const [q, a, w] = pick([['Mi hazánk legmagasabb pontja?', 'a Kékes', ['a Gellért-hegy', 'a Mecsek', 'a Badacsony']], ['Melyik hazánk leghosszabb folyója (az országon belül mért hossz alapján)?', 'a Tisza', ['a Duna', 'a Rába', 'a Dráva']], ['Melyik Közép-Európa legnagyobb tava?', 'a Balaton', ['a Velencei-tó', 'a Fertő tó', 'a Tisza-tó']], ['Melyik folyó szeli ketté Budapestet?', 'a Duna', ['a Tisza', 'a Rába', 'a Zagyva']], ['Melyik hazánk legnagyobb nagytája?', 'az Alföld', ['a Kisalföld', 'az Északi-középhegység', 'a Dunántúli-dombság']], ['Melyik hegységben van a Kékes?', 'a Mátrában', ['a Bükkben', 'a Mecsekben', 'a Bakonyban']]]);
    return mcq(q, a, w, { fmt: v => v, hint: 'Kékes: 1014 m, a Mátrában. A Tisza a leghosszabb folyónk az országon belül, a Balaton a legnagyobb tavunk.' });
  },
  regions(L) {
    const R = ['Alföld', 'Kisalföld', 'Nyugat-magyarországi-peremvidék', 'Dunántúli-dombság', 'Dunántúli-középhegység', 'Északi-középhegység'];
    const PL = [['Hortobágy', 'Alföld'], ['Nyírség', 'Alföld'], ['Duna–Tisza köze', 'Alföld'], ['Szigetköz', 'Kisalföld'], ['Hanság', 'Kisalföld'], ['Kőszegi-hegység', 'Nyugat-magyarországi-peremvidék'], ['Göcsej', 'Nyugat-magyarországi-peremvidék'],
      ['Mecsek', 'Dunántúli-dombság'], ['Tolnai-dombság', 'Dunántúli-dombság'], ['Bakony', 'Dunántúli-középhegység'], ['Vértes', 'Dunántúli-középhegység'], ['Pilis', 'Dunántúli-középhegység'], ['Mátra', 'Északi-középhegység'], ['Bükk', 'Északi-középhegység'], ['Börzsöny', 'Északi-középhegység'], ['Zemplén', 'Északi-középhegység']];
    if (L === 1) {
      const [q, a] = pick([['Melyik hazánk legnagyobb és legalacsonyabban fekvő nagytája?', 'Alföld'], ['Melyik nagytájon van hazánk legmagasabb pontja, a Kékes?', 'Északi-középhegység'], ['Melyik nagytáj fekszik az ország északnyugati sarkában, a Duna mentén?', 'Kisalföld'], ['Melyik nagytáj húzódik az ország nyugati határa mentén, az Alpok lábánál?', 'Nyugat-magyarországi-peremvidék'], ['Melyik nagytáj hegyei húzódnak a Balatontól északra?', 'Dunántúli-középhegység']]);
      return mcq(q, a, shuffle(R.filter(x => x !== a)).slice(0, 3), { fmt: v => v, hint: 'Hazánk hat nagytája: Alföld, Kisalföld, Nyugat-magyarországi-peremvidék, Dunántúli-dombság, Dunántúli-középhegység, Északi-középhegység.' });
    }
    if (L === 2) { const [p, a] = pick(PL); return mcq(`Melyik nagytájhoz tartozik: <b>${p}</b>?`, a, shuffle(R.filter(x => x !== a)).slice(0, 3), { fmt: v => v, hint: 'Az Alföld és a Kisalföld síkság. A Dunántúli- és az Északi-középhegység hegyei: Bakony, Vértes, Pilis, illetve Mátra, Bükk, Börzsöny, Zemplén. A Mecsek a Dunántúli-dombságban van.' }); }
    const reg = pick(['Dunántúli-középhegység', 'Északi-középhegység', 'Alföld']), a = pick(PL.filter(x => x[1] === reg))[0], wr = shuffle(PL.filter(x => x[1] !== reg)).slice(0, 3).map(x => x[0]);
    return mcq(`Melyik tartozik ide: <b>${reg}</b>?`, a, wr, { fmt: v => v, hint: 'Északi-középhegység: Börzsöny, Mátra, Bükk, Zemplén. Dunántúli-középhegység: Bakony, Vértes, Pilis. Alföld: Hortobágy, Nyírség, Duna–Tisza köze.' });
  },
  country(L) {
    const NB = ['Ausztria', 'Szlovákia', 'Ukrajna', 'Románia', 'Szerbia', 'Horvátország', 'Szlovénia'];
    if (L === 1) { const odd = pick(['Lengyelország', 'Csehország', 'Németország', 'Olaszország', 'Bulgária']); return mcq('Melyik ország NEM szomszédos Magyarországgal?', odd, shuffle(NB).slice(0, 3), { fmt: v => v, hint: 'Hazánknak hét szomszédja van: Ausztria, Szlovákia, Ukrajna, Románia, Szerbia, Horvátország, Szlovénia.' }); }
    if (L === 2) { const [c, d] = pick([['Ausztria', 'nyugat'], ['Szlovákia', 'észak'], ['Ukrajna', 'északkelet'], ['Románia', 'kelet'], ['Szerbia', 'dél'], ['Horvátország', 'délnyugat']]); return mcq(`Magyarországtól milyen irányban van ${c}?`, d, shuffle(farDirs(d)).slice(0, 3), { fmt: v => v, hint: 'Nyugaton Ausztria, északon Szlovákia, északkeleten Ukrajna, keleten Románia, délen Szerbia, délnyugaton Horvátország és Szlovénia.' }); }
    const MS = [['Bács-Kiskun', 'Kecskemét'], ['Baranya', 'Pécs'], ['Békés', 'Békéscsaba'], ['Borsod-Abaúj-Zemplén', 'Miskolc'], ['Csongrád-Csanád', 'Szeged'], ['Fejér', 'Székesfehérvár'], ['Győr-Moson-Sopron', 'Győr'], ['Hajdú-Bihar', 'Debrecen'], ['Heves', 'Eger'], ['Jász-Nagykun-Szolnok', 'Szolnok'], ['Komárom-Esztergom', 'Tatabánya'], ['Nógrád', 'Salgótarján'], ['Pest', 'Budapest'], ['Somogy', 'Kaposvár'], ['Szabolcs-Szatmár-Bereg', 'Nyíregyháza'], ['Tolna', 'Szekszárd'], ['Vas', 'Szombathely'], ['Veszprém', 'Veszprém'], ['Zala', 'Zalaegerszeg']];
    const [m, sz] = pick(MS.filter(([m, sz]) => !m.includes(sz) && m !== 'Pest'));
    return mcq(`Mi a székhelye ennek a megyének: <b>${m}</b>?`, sz, shuffle(MS.filter(x => x[1] !== sz)).slice(0, 3).map(x => x[1]), { fmt: v => v, hint: 'Magyarországnak 19 megyéje van, mindegyiknek van székhelye. Pest megye székhelye Budapest, a főváros.' });
  }
};

/* ---------- interactive variants (sort, label, set, riddle) ---------- */
function bodySvg() {
  let s = `<circle cx="110" cy="52" r="40" fill="#f3c9a5" stroke="#1d2742" stroke-width="2.5"/>`;
  s += `<path d="M84 46 C84 26 136 24 136 46 C138 60 84 62 84 46Z" fill="#f4a6c1" stroke="#c2255c" stroke-width="2"/><path d="M96 38 q6 6 0 12 M110 32 q-6 8 0 16 M124 38 q-6 6 0 12" fill="none" stroke="#c2255c" stroke-width="1.5"/>`;
  s += `<rect x="99" y="88" width="22" height="18" fill="#f3c9a5" stroke="#1d2742" stroke-width="2.5"/>`;
  s += `<rect x="45" y="100" width="130" height="192" rx="44" fill="#f3c9a5" stroke="#1d2742" stroke-width="2.5"/>`;
  s += `<ellipse cx="86" cy="158" rx="22" ry="36" fill="#ffc9c9" stroke="#e03131" stroke-width="2"/><ellipse cx="134" cy="158" rx="22" ry="36" fill="#ffc9c9" stroke="#e03131" stroke-width="2"/>`;
  s += `<path d="M118 172 c-7 -9 -20 -2 -14 8 l14 14 l14 -14 c6 -10 -7 -17 -14 -8z" fill="#e03131" stroke="#a51111" stroke-width="1.5"/>`;
  s += `<path d="M120 214 c18 -6 30 8 22 24 c-6 12 -24 14 -34 6 c-6 -6 -2 -14 6 -14 c8 0 10 -8 6 -16z" fill="#f2b48a" stroke="#c46a2c" stroke-width="2"/>`;
  return svg(220, 300, s, 'bodyfig');
}
const SORTS = {
  state: L => sortQ('Válogasd szét halmazállapot szerint!', { 'szilárd': ['jég', 'kő', 'vaj', 'fa', 'homok', 'vas', 'üveg'], 'folyékony': ['víz', 'tej', 'olaj', 'méz', 'szörp', 'tea'], 'légnemű': ['levegő', 'vízgőz', 'füst'] }, L === 3 ? 3 : 2, { hint: 'Szilárd: megtartja az alakját. Folyékony: folyik. Légnemű: kitölti a teret.' }),
  animal: L => { const g = shuffle(Object.keys(ANIMALS)).slice(0, 3), src = {}; g.forEach(k => src[k] = ANIMALS[k].filter(a => L === 3 || !TRICKY.includes(a)).map(a => [a, EMO[a]])); return sortQ('Válogasd szét az állatokat csoportjuk szerint!', src, 2, { hint: 'Emlős: szőr, szoptat. Madár: toll. Hal: kopoltyú. Kétéltű: csupasz bőr. Hüllő: pikkely. Rovar: 6 láb.' }); },
  light: L => sortQ('Természetes vagy mesterséges fényforrás?', { 'természetes': ['a Nap', 'a villám', 'a csillagok', 'a szentjánosbogár'], 'mesterséges': ['zseblámpa', 'villanykörte', 'gyertya', 'utcai lámpa'] }, 3, { hint: 'A természetes fényforrás magától világít. A mesterségeset az ember készítette.' }),
  burn: L => sortQ('Mi ég, és mi nem?', { 'éghető': ['fa', 'papír', 'szén', 'gyertyaviasz', 'száraz levél', 'fenyőtoboz'], 'éghetetlen': ['kő', 'vas', 'üveg', 'homok', 'víz', 'tégla'] }, 3, { hint: 'Ami meggyullad és elég, az éghető.' }),
  habitat: L => sortQ('Hol élnek? Válogasd szét!', Object.fromEntries(Object.entries(HABITAT).map(([k, v]) => [k, v.map(a => [a, EMO[a]])])), 2, { hint: 'Erdő: fák között. Mező: füves, nyílt terület. Víz, vízpart: tó, folyó és partja.' }),
  health: L => sortQ('Egészséges vagy egészségtelen szokás?', { 'egészséges': ['zöldséget eszem', 'sokat mozgok a szabadban', 'eleget alszom', 'kezet mosok evés előtt', 'vizet iszom'], 'egészségtelen': ['sok cukros üdítőt iszom', 'késő éjjelig tévézek', 'nem reggelizem', 'egész nap ülök', 'nem mosok fogat'] }, 3, { hint: 'Ami jót tesz a testednek, az egészséges szokás.' }),
  water: L => sortQ('Állóvíz vagy folyóvíz?', { 'állóvíz': ['tó', 'mocsár', 'halastó', 'Balaton'], 'folyóvíz': ['patak', 'folyó', 'Duna', 'Tisza'] }, 3, { hint: 'Az állóvíz egy helyben marad, a folyóvíz egy irányba folyik.' }),
  edible: L => sortQ('Melyik részét esszük?', { 'gyökerét': ['répa', 'retek', 'cékla', 'petrezselyemgyökér'], 'levelét': ['saláta', 'káposzta', 'spenót', 'sóska'], 'termését': ['alma', 'paradicsom', 'paprika', 'uborka', 'szilva'] }, 2, { hint: 'A gyökér a földben nő, a levél a száron, a termés a virágból fejlődik.' }),
  move: L => sortQ('Helyváltoztató vagy helyzetváltoztató mozgás?', { 'helyváltoztató': ['futás', 'úszás', 'séta', 'kerékpározás'], 'helyzetváltoztató': ['guggolás', 'hajolás', 'karkörzés', 'bólintás'] }, 3, { hint: 'Helyváltoztató: máshová kerülsz. Helyzetváltoztató: helyben maradsz.' }),
  weather: L => sortQ('Csapadék vagy nem csapadék?', { 'csapadék': ['eső', 'hó', 'jégeső', 'dér', 'harmat'], 'nem csapadék': ['szél', 'napsütés', 'villám', 'felhő'] }, 3, { hint: 'Csapadék a levegőből lehulló vagy kicsapódó víz.' })
};
const LABELS = {
  plant: () => labelQ('Címkézd fel a növény részeit!', plantSvg(null), [{ name: 'virág', x: 45.5, y: 16 }, { name: 'levél', x: 64, y: 40 }, { name: 'szár', x: 45.5, y: 60 }, { name: 'gyökér', x: 45.5, y: 86 }], { hint: 'Alulról felfelé: gyökér, szár, levél, virág.' }),
  body: () => labelQ('Címkézd fel a szerveket!', bodySvg(), [{ name: 'agy', x: 50, y: 15 }, { name: 'tüdő', x: 39, y: 50 }, { name: 'szív', x: 54, y: 61 }, { name: 'gyomor', x: 60, y: 77 }], { hint: 'Az agy a fejben van. A mellkasban a két tüdő és köztük a szív. Lejjebb, a hasban a gyomor.' }),
  compass4: () => labelQ('Írd be a fővilágtájakat!', compass(null, []), [{ name: 'észak', x: 50, y: 25 }, { name: 'kelet', x: 75, y: 50 }, { name: 'dél', x: 50, y: 75 }, { name: 'nyugat', x: 25, y: 50 }], { hint: 'Fent az észak, lent a dél, jobbra a kelet, balra a nyugat.' }),
  compassX: () => labelQ('Írd be a mellékvilágtájakat! (Az észak fent van.)', compass(null, [0]), [{ name: 'északkelet', x: 70, y: 31 }, { name: 'délkelet', x: 70, y: 69 }, { name: 'délnyugat', x: 30, y: 69 }, { name: 'északnyugat', x: 30, y: 31 }], { hint: 'A mellékvilágtájak két fővilágtáj között vannak: északkelet az észak és a kelet között.' })
};
const thermoSet = L => { const t = L === 1 ? ri(0, 6) * 5 : L === 2 ? ri(0, 30) : ri(-10, -1); return { type: 'set', kind: 'thermo', prompt: `Állítsd be a hőmérőt erre: <b>${String(t).replace('-', '−')} °C</b>`, answer: t, start: t === 10 ? 0 : 10, min: -10, max: 30, answerText: `${String(t).replace('-', '−')} °C`, hint: 'A hosszú vonalak 10 fokonként, a közepesek 5 fokonként vannak. 0 alatt mínusz fokok vannak.' }; };
const compassSet = L => { const i = L === 1 ? pick([0, 2, 4, 6]) : pick([1, 3, 5, 7]); return { type: 'set', kind: 'compass', prompt: `Fordítsd a nyilat erre: <b>${DIRS[i]}</b>`, answer: i, start: (i + 3) % 8, answerText: DIRS[i], hint: 'Fent az észak, lent a dél, jobbra a kelet, balra a nyugat. A mellékvilágtájak kettő között vannak.' }; };
const RIDDLES = [
  ['állat', ['Hat lábam van, és tudok repülni.', 'Virágról virágra szállok.', 'A kaptárban lakom a társaimmal.', 'Mézet készítek.'], 'méh', ['katica', 'lepke', 'hangya']],
  ['állat', ['Emlős vagyok, éjszaka járok élelem után.', 'Bogarakat, csigákat, gilisztákat eszem.', 'Télen téli álmot alszom.', 'A hátamon sok hegyes tüske van.'], 'sün', ['mókus', 'vakond', 'nyúl']],
  ['állat', ['Madár vagyok, ősszel délre költözöm.', 'Hosszú a lábam és a csőröm.', 'Békát és egeret is eszem.', 'Gyakran villanyoszlop tetején fészkelek.'], 'gólya', ['gém', 'hattyú', 'sas']],
  ['állat', ['A bőröm csupasz és nedves.', 'Ebihalként kezdtem az életemet a vízben.', 'Hosszú, ragadós nyelvemmel kapom el a rovarokat.', 'Nagyokat ugrom, és brekegek.'], 'béka', ['gyík', 'gőte', 'teknős']],
  ['állat', ['Emlős vagyok, fákon élek.', 'Ügyesen ugrálok ágról ágra.', 'Ősszel diót és makkot rejtek el télire.', 'Hosszú, bozontos a farkam.'], 'mókus', ['nyest', 'sün', 'harkály']],
  ['állat', ['Madár vagyok, az erdőben élek.', 'Erős, hegyes csőröm van.', 'A fák kérge alól szedem ki a rovarokat.', 'Kopogással vájok odút a fába.'], 'harkály', ['bagoly', 'cinege', 'rigó']],
  ['állat', ['Emlős vagyok, de alig látok.', 'A föld alatt ásom a járataimat.', 'Gilisztákat és rovarlárvákat eszem.', 'Földkupacokat túrok a kertben.'], 'vakond', ['egér', 'sün', 'ürge']],
  ['állat', ['Rovar vagyok, hat lábam van.', 'A levéltetveket eszem, ezért a kertészek szeretnek.', 'A szárnyfedőm piros.', 'Fekete pöttyök vannak a hátamon.'], 'katica', ['méh', 'hangya', 'szöcske']],
  ['állat', ['Madár vagyok.', 'Éjszaka vadászom, nappal alszom.', 'A sötétben is jól látok, és a fejemet messzire hátra tudom fordítani.', 'Egereket fogok, és huhogok.'], 'bagoly', ['sas', 'gólya', 'harkály']],
  ['állat', ['A vízben élek.', 'Kopoltyúval lélegzem.', 'Pikkelyek borítanak, uszonyokkal úszom.', 'Halastavakban is tenyésztenek, karácsonykor sok családnál halászlé lesz belőlem.'], 'ponty', ['csuka', 'harcsa', 'cápa']],
  ['állat', ['Emlős vagyok, növényevő.', 'Háziállat vagyok, régen szekeret is húztam.', 'Patám és sörényem van.', 'Lépésben, ügetésben és vágtában is tudok haladni.'], 'ló', ['tehén', 'szamár', 'kecske']],
  ['állat', ['Háziállat vagyok, a mezőn legelek.', 'Kérődző vagyok.', 'Szarvam van.', 'Tejet adok, és bőgök.'], 'tehén', ['ló', 'kecske', 'juh']],
  ['növény', ['Magas növény vagyok, a mezőn termesztenek.', 'Nagy, sárga virágom van.', 'A virágom a Nap felé fordul.', 'A magomból olajat préselnek.'], 'napraforgó', ['kukorica', 'búza', 'pipacs']],
  ['növény', ['Fa vagyok, az erdőben élek.', 'Nagyon sok évig élhetek.', 'Karéjos a levelem.', 'A termésem a makk.'], 'tölgyfa', ['bükkfa', 'fenyőfa', 'nyírfa']],
  ['növény', ['Vadvirág vagyok, a mezőn és a búzaföldek szélén növök.', 'Vékony, szőrös a szárom.', 'A szirmaim vékonyak, mint a selyempapír.', 'Élénkpiros a virágom.'], 'pipacs', ['búzavirág', 'kamilla', 'napraforgó']],
  ['növény', ['Gyümölcsfa termése vagyok.', 'Ősszel érek meg.', 'Lehetek piros, sárga vagy zöld.', 'Belőlem készül a rétes és a pite, és ropogós vagyok.'], 'alma', ['körte', 'szilva', 'szőlő']],
  ['növény', ['Az erdőben, a nedves talajon élek.', 'Nem vagyok se növény, se állat.', 'Nincs zöld levelem, virágom sem.', 'Kalapom és tönköm van.'], 'gomba', ['páfrány', 'moha', 'tölgyfa']],
  ['test', ['A mellkasodban vagyok.', 'Egész életedben dolgozom, sosem pihenek.', 'Ha futsz, gyorsabban dobogok.', 'Én pumpálom a vért az egész testedbe.'], 'szív', ['tüdő', 'gyomor', 'agy']],
  ['test', ['A mellkasodban vagyok, ketten vagyunk.', 'Ha futsz, gyorsabban dolgozom.', 'Rajtam keresztül jut a levegő oxigénje a véredbe.', 'Velem lélegzel.'], 'tüdő', ['szív', 'máj', 'gyomor']],
  ['test', ['Érzékszerv vagyok.', 'Ketten vagyunk, az arcodon.', 'Pislogással védekezem a por ellen.', 'Velem látod a színeket.'], 'szem', ['fül', 'orr', 'nyelv']],
  ['test', ['Érzékszerv vagyok, ketten vagyunk.', 'A fejed két oldalán vagyok.', 'A túl hangos zene árthat nekem.', 'Velem hallod a hangokat.'], 'fül', ['szem', 'orr', 'bőr']],
  ['táj', ['Állóvíz vagyok a Dunántúlon.', 'Nyáron sokan fürdenek bennem.', 'Közép-Európa legnagyobb tava vagyok.', 'A partomon van Siófok és Tihany.'], 'Balaton', ['Velencei-tó', 'Fertő tó', 'Tisza-tó']],
  ['táj', ['Folyó vagyok.', 'Németországban erednek a forrásaim, és a Fekete-tengerbe ömlök.', 'Átfolyok Budapesten.', 'Európa második leghosszabb folyója vagyok.'], 'Duna', ['Tisza', 'Rába', 'Dráva']],
  ['táj', ['Folyó vagyok.', 'Ukrajnában, a Kárpátokban erednek a forrásaim.', 'Átszelem az Alföldet, Szeged mellett is elfolyok.', 'Az országon belül én vagyok hazánk leghosszabb folyója.'], 'Tisza', ['Duna', 'Körös', 'Maros']],
  ['táj', ['Hegycsúcs vagyok.', 'Az Északi-középhegységben vagyok.', 'A Mátrában emelkedem.', 'Magyarország legmagasabb pontja vagyok, 1014 méter magas.'], 'Kékes', ['Dobogókő', 'Istállós-kő', 'Írott-kő']],
  ['táj', ['Nagytáj vagyok.', 'Sík, alacsony vidék vagyok.', 'A Duna és a Tisza is átfolyik rajtam.', 'Hazánk legnagyobb nagytája vagyok, rajtam van a Hortobágy.'], 'Alföld', ['Kisalföld', 'Dunántúli-dombság', 'Északi-középhegység']],
  ['táj', ['Város vagyok.', 'A Duna két partján terülök el.', 'Hazánk legnagyobb városa vagyok.', 'Magyarország fővárosa vagyok.'], 'Budapest', ['Debrecen', 'Szeged', 'Győr']],
  ['jelenség', ['Az égen látsz, de nem vagyok felhő.', 'Eső után jelenhetek meg, ha közben süt a nap.', 'Ív alakú vagyok.', 'Sok színem van: piros, narancs, sárga, zöld, kék, lila.'], 'szivárvány', ['villám', 'dér', 'köd']],
  ['jelenség', ['Csapadék vagyok.', 'Télen hullok.', 'Apró jégkristályokból állok, fehér vagyok.', 'Ha sok esik belőlem, lehet szánkózni.'], 'hó', ['eső', 'jégeső', 'harmat']],
  ['jelenség', ['Szilárd halmazállapotú vagyok.', 'Ha melegítenek, elolvadok.', '0 fok alatt a vízből keletkezem.', 'Korcsolyázni lehet rajtam.'], 'jég', ['hó', 'vízgőz', 'üveg']]
];
const kiQ = L => { const cats = L === 1 ? ['állat', 'növény'] : L === 2 ? ['test', 'jelenség', 'állat'] : ['táj', 'táj2', 'növény', 'jelenség']; const [, clues, ans, wr] = pick(RIDDLES.filter(r => cats.includes(r[0]))); return riddleQ(clues, ans, wr); };
const mix = (base, alts, p) => L => { const a = alts(L); return a && Math.random() < p ? a() : base(L); };
K4.state = mix(K4.state, L => L === 1 ? () => SORTS.state(L) : L === 3 ? () => thermoSet(pick([1, 2, 3])) : null, .4);
K4.energy = mix(K4.energy, L => () => (L === 1 ? SORTS.light : L === 2 ? SORTS.burn : SORTS.move)(L), .4);
K4.plant = mix(K4.plant, L => L === 1 ? LABELS.plant : L === 3 ? () => SORTS.edible(L) : null, .45);
K4.animal = mix(K4.animal, L => L !== 2 ? () => SORTS.animal(L) : null, .35);
K4.habitat = mix(K4.habitat, L => L === 1 ? () => SORTS.habitat(L) : null, .4);
K4.body = mix(K4.body, L => L === 2 ? LABELS.body : null, .45);
K4.health = mix(K4.health, L => L === 1 ? () => SORTS.health(L) : null, .4);
K4.weather = mix(K4.weather, L => L === 3 ? () => SORTS.weather(L) : null, .4);
K4.compass = mix(K4.compass, L => L === 1 ? (Math.random() < .5 ? LABELS.compass4 : () => compassSet(1)) : L === 2 ? (Math.random() < .5 ? LABELS.compassX : () => compassSet(2)) : null, .45);
K4.landform = mix(K4.landform, L => L === 2 ? () => SORTS.water(L) : null, .4);
K4.lab = L => LAB_GENS[pick(Object.keys(LAB_GENS))](L);
K4.state = mix(K4.state, L => () => heatLab(L), .2);
K4.sorter = L => { const k = pick(Object.keys(SORTS)); return SORTS[k](L); };
K4.ki = kiQ;
/* ---------- maps: counties, neighbours, landscapes, Budapest's bridges ---------- */
const COUNTIES = Object.keys(MAPDATA.counties);
const BIG_COUNTIES = ['Pest', 'Baranya', 'Bács-Kiskun', 'Borsod-Abaúj-Zemplén', 'Hajdú-Bihar', 'Győr-Moson-Sopron', 'Csongrád-Csanád', 'Somogy', 'Zala', 'Vas', 'Békés', 'Szabolcs-Szatmár-Bereg'];
const SEATS = { 'Bács-Kiskun': 'Kecskemét', 'Baranya': 'Pécs', 'Békés': 'Békéscsaba', 'Borsod-Abaúj-Zemplén': 'Miskolc', 'Csongrád-Csanád': 'Szeged', 'Fejér': 'Székesfehérvár', 'Győr-Moson-Sopron': 'Győr', 'Hajdú-Bihar': 'Debrecen', 'Heves': 'Eger', 'Jász-Nagykun-Szolnok': 'Szolnok', 'Komárom-Esztergom': 'Tatabánya', 'Nógrád': 'Salgótarján', 'Somogy': 'Kaposvár', 'Szabolcs-Szatmár-Bereg': 'Nyíregyháza', 'Tolna': 'Szekszárd', 'Vas': 'Szombathely', 'Veszprém': 'Veszprém', 'Zala': 'Zalaegerszeg' };
const TOWNS = { 'Sopron': 'Győr-Moson-Sopron', 'Esztergom': 'Komárom-Esztergom', 'Gödöllő': 'Pest', 'Gyula': 'Békés', 'Hódmezővásárhely': 'Csongrád-Csanád', 'Kalocsa': 'Bács-Kiskun', 'Siófok': 'Somogy', 'Keszthely': 'Zala', 'Tihany': 'Veszprém', 'Tokaj': 'Borsod-Abaúj-Zemplén', 'Mohács': 'Baranya', 'Paks': 'Tolna', 'Kőszeg': 'Vas', 'Gyöngyös': 'Heves', 'Balassagyarmat': 'Nógrád', 'Jászberény': 'Jász-Nagykun-Szolnok', 'Mátészalka': 'Szabolcs-Szatmár-Bereg', 'Dunaújváros': 'Fejér', 'Pápa': 'Veszprém', 'Szentendre': 'Pest', 'Hajdúszoboszló': 'Hajdú-Bihar', 'Nagykanizsa': 'Zala' };
const mega = n => `<b>${n}</b> megye`;
const otherCounties = (c, k = 3, ex = []) => shuffle(COUNTIES.filter(x => x !== c && !ex.includes(x))).slice(0, k);
const countyTap = (c, extra = '') => mapQ(`Hol van ${mega(c)}? Koppints rá a térképen!${extra}`, c, { hint: `${c} megye székhelye ${SEATS[c] || 'Budapest'}. ${MAP_HINTS[c] || ''}`.trim(), speak: `Hol van ${c} megye? Koppints rá a térképen!` });
const MAP_HINTS = {
  'Pest': 'Budapestet öleli körül, az ország közepén.', 'Baranya': 'Az ország legdélebbi része, a Mecsek környéke.', 'Bács-Kiskun': 'A Duna és a Tisza között, délen; ez a legnagyobb megye.', 'Borsod-Abaúj-Zemplén': 'Északkeleten, Szlovákia mellett.',
  'Hajdú-Bihar': 'Keleten, Románia mellett; itt van a Hortobágy.', 'Győr-Moson-Sopron': 'Északnyugaton, Ausztria és Szlovákia mellett.', 'Csongrád-Csanád': 'Délen, a Tisza mentén, Szerbia mellett.', 'Somogy': 'A Balaton déli partja mentén.',
  'Zala': 'Délnyugaton, a Balaton nyugati csücskénél.', 'Vas': 'Nyugaton, Ausztria mellett.', 'Békés': 'Délkeleten, Románia mellett.', 'Szabolcs-Szatmár-Bereg': 'A legkeletebbi megye, Ukrajna és Románia mellett.',
  'Veszprém': 'A Balaton északi partja mentén.', 'Fejér': 'Budapesttől délnyugatra, itt a Velencei-tó.', 'Tolna': 'Délen, a Duna jobb partján.', 'Komárom-Esztergom': 'Északon, a Duna mentén, Szlovákia mellett.',
  'Nógrád': 'Északon, Szlovákia mellett, Pesttől északra.', 'Heves': 'Északon, itt a Mátra és a Kékes.', 'Jász-Nagykun-Szolnok': 'Az ország közepén, keletre, a Tisza mentén.'
};
const hlChoice = c => ({ type: 'choice', prompt: 'Melyik megye van kiemelve a térképen?', visual: mapRef({ hl: c }), answer: c, options: shuffle([c, ...otherCounties(c)]).map(v => ({ value: v, html: v })), answerText: c, hint: MAP_HINTS[c] });
const townQ = () => { const [t, c] = pick(Object.entries(TOWNS)); return mcq(`Melyik megyében van <b>${t}</b>?`, c, otherCounties(c), { fmt: v => v, hint: `${t} ${c} megyében van. ${MAP_HINTS[c] || ''}`.trim() }); };
const seatQ = () => { const [m, sz] = pick(Object.entries(SEATS).filter(([m, sz]) => !m.includes(sz))); return mcq(`Mi a székhelye ennek a megyének: <b>${m}</b>?`, sz, shuffle(Object.values(SEATS).filter(x => x !== sz)).slice(0, 3), { fmt: v => v, hint: 'A megyeszékhely általában a megye legnagyobb városa.' }); };
const seatTap = () => { const c = pick(Object.keys(SEATS)), t = SEATS[c]; const dots = shuffle([t, ...shuffle(Object.values(SEATS).filter(x => x !== t)).slice(0, 5)]); return mapQ(`Hol van <b>${t}</b>, ${c} megye székhelye? Koppints a pontra!`, t, { pick: 'dot', dots, hint: MAP_HINTS[c] }); };
K4.megyek = L => {
  const r = Math.random();
  if (L === 1) return r < .55 ? countyTap(pick(BIG_COUNTIES)) : r < .8 ? hlChoice(pick(BIG_COUNTIES)) : seatQ();
  if (L === 2) return r < .45 ? countyTap(pick(COUNTIES)) : r < .7 ? townQ() : r < .85 ? hlChoice(pick(COUNTIES)) : seatQ();
  if (r < .35) return seatTap();
  if (r < .65) { const [t, c] = pick(Object.entries(TOWNS)); return mapQ(`Melyik megyében van <b>${t}</b>? Koppints a megyére!`, c, { hint: MAP_HINTS[c] }); }
  return r < .85 ? townQ() : countyTap(pick(COUNTIES));
};

const DIR_NB = [['keletre', 'Románia'], ['északra', 'Szlovákia'], ['nyugatra', 'Ausztria'], ['délre', 'Szerbia'], ['északkeletre', 'Ukrajna']];
const NB_HINT = 'Nyugaton Ausztria, északon Szlovákia, északkeleten Ukrajna, keleten Románia, délen Szerbia, délnyugaton Horvátország és Szlovénia.';
const SIGHTS = {
  'Kékes': 'a Kékes, hazánk legmagasabb pontja', 'Tihany': 'Tihany, a Balaton félszigete', 'Tokaj': 'Tokaj, a híres borvidék központja', 'Aggtelek': 'Aggtelek, a Baradla-barlang', 'Hortobágy': 'a Hortobágy, az első nemzeti parkunk',
  'Esztergom': 'Esztergom, a bazilika városa', 'Visegrád': 'Visegrád vára a Duna-kanyarban', 'Hollókő': 'Hollókő, a palóc falu', 'Kőszeg': 'Kőszeg, az Alpokalja kisvárosa', 'Pannonhalma': 'Pannonhalma, a bencés főapátság',
  'Bugac': 'Bugac, a kiskunsági puszta', 'Badacsony': 'a Badacsony, a tanúhegy a Balaton partján', 'Villány': 'Villány, a déli borvidék', 'Ópusztaszer': 'Ópusztaszer, a Feszty-körkép', 'Őriszentpéter': 'Őriszentpéter, az Őrség központja'
};
const sightTap = () => { const s = pick(Object.keys(SIGHTS)); const near = Object.keys(SIGHTS).filter(x => x !== s && Math.hypot(MAPDATA.places[x][0] - MAPDATA.places[s][0], MAPDATA.places[x][1] - MAPDATA.places[s][1]) > 45);
  return mapQ(`Hol van ${SIGHTS[s]}? Koppints a pontra!`, s, { pick: 'dot', dots: shuffle([s, ...shuffle(near).slice(0, 4)]), hint: SIGHT_HINT[s] }); };
const SIGHT_HINT = { 'Kékes': 'A Mátrában, északon, Gyöngyös fölött.', 'Tihany': 'A Balaton északi partján, egy félszigeten.', 'Tokaj': 'Északkeleten, ahol a Bodrog a Tiszába ömlik.', 'Aggtelek': 'Egészen északon, a szlovák határ mellett.', 'Hortobágy': 'Keleten, Debrecentől nyugatra, az Alföldön.',
  'Esztergom': 'Északon, a Duna partján, a szlovák határon.', 'Visegrád': 'A Duna-kanyarban, Budapesttől északra.', 'Hollókő': 'Északon, Nógrád megyében.', 'Kőszeg': 'Nyugaton, az osztrák határ mellett.', 'Pannonhalma': 'Északnyugaton, Győr közelében.',
  'Bugac': 'Az Alföldön, Kecskemét közelében.', 'Badacsony': 'A Balaton északi partjának nyugati részén.', 'Villány': 'Egészen délen, Baranyában.', 'Ópusztaszer': 'Délen, Szeged közelében.', 'Őriszentpéter': 'Az ország délnyugati sarkában, a határ mellett.' };
K4.terkep = L => {
  const r = Math.random();
  if (L === 1) {
    if (r < .55) { const n = pick(NEIGHBOURS); return mapQ(`Hol van <b>${n}</b>? Koppints rá a térképen!`, n, { map: 'region', hint: NB_HINT, speak: `Hol van ${n}? Koppints rá a térképen!` }); }
    if (r < .8) { const n = pick(NEIGHBOURS); return { type: 'choice', prompt: 'Melyik szomszédos ország van kiemelve?', visual: mapRef({ hl: n }, true), answer: n, options: shuffle([n, ...shuffle(NEIGHBOURS.filter(x => x !== n)).slice(0, 3)]).map(v => ({ value: v, html: v })), answerText: n, hint: NB_HINT }; }
    return mcq('Hány szomszédos országa van Magyarországnak?', 7, [5, 6, 8], { hint: 'Számold meg: Ausztria, Szlovákia, Ukrajna, Románia, Szerbia, Horvátország, Szlovénia.' });
  }
  if (L === 2) return r < .6 ? sightTap() : r < .8 ? (() => { const [d, n] = pick(DIR_NB); return mapQ(`Koppints arra az országra, amelyik Magyarországtól <b>${d}</b> van!`, n, { map: 'region', hint: 'Az északi irány a térképen felfelé van, a keleti jobbra, a déli lefelé, a nyugati balra.' }); })() : hlChoice(pick(COUNTIES));
  if (r < .45) return sightTap();
  if (r < .7) { const n = pick(NEIGHBOURS); return { type: 'choice', prompt: 'Melyik ország van kiemelve? Mi a fővárosa?', visual: mapRef({ hl: n }, true), answer: CAPITALS[n], options: shuffle([CAPITALS[n], ...shuffle(NEIGHBOURS.filter(x => x !== n)).slice(0, 3).map(x => CAPITALS[x])]).map(v => ({ value: v, html: v })), answerText: `${n}, fővárosa ${CAPITALS[n]}`, hint: NB_HINT }; }
  if (r < .85) { const [d, n] = pick(DIR_NB); return mapQ(`Koppints arra az országra, amelyik Magyarországtól <b>${d}</b> van!`, n, { map: 'region', hint: 'Az északi irány a térképen felfelé van, a keleti jobbra, a déli lefelé, a nyugati balra.' }); }
  return mcq('Melyik folyó szeli ketté Budapestet és az egész országot észak–déli irányban?', 'Duna', ['Tisza', 'Dráva', 'Rába'], { fmt: v => v, hint: 'Európa második leghosszabb folyója.' });
};
const CAPITALS = { 'Ausztria': 'Bécs', 'Szlovákia': 'Pozsony', 'Ukrajna': 'Kijev', 'Románia': 'Bukarest', 'Szerbia': 'Belgrád', 'Horvátország': 'Zágráb', 'Szlovénia': 'Ljubljana' };

/* tájak és nevezetességek */
const TAJ_COUNTY = [['a Hortobágy', 'Hajdú-Bihar', ['Jász-Nagykun-Szolnok', 'Borsod-Abaúj-Zemplén']], ['Tokaj-Hegyalja', 'Borsod-Abaúj-Zemplén', []], ['az Aggteleki-karszt', 'Borsod-Abaúj-Zemplén', []], ['az Őrség', 'Vas', ['Zala']], ['Göcsej', 'Zala', ['Vas']],
  ['a Szigetköz', 'Győr-Moson-Sopron', []], ['a Nyírség', 'Szabolcs-Szatmár-Bereg', ['Hajdú-Bihar']], ['Bugac', 'Bács-Kiskun', []], ['a Jászság', 'Jász-Nagykun-Szolnok', ['Pest']], ['a Sárköz', 'Tolna', ['Baranya']], ['a Villányi-hegység', 'Baranya', []],
  ['a Tihanyi-félsziget', 'Veszprém', ['Somogy', 'Zala']], ['a Kékes', 'Heves', ['Nógrád']], ['Hollókő', 'Nógrád', []], ['Pannonhalma', 'Győr-Moson-Sopron', []], ['a Velencei-tó', 'Fejér', []], ['Visegrád', 'Pest', ['Komárom-Esztergom']], ['Ópusztaszer', 'Csongrád-Csanád', []], ['Kőszeg', 'Vas', []]];
const TAJ_FACTS = [
  [1, 'Melyik tájon legelnek szürkemarhák és rackajuhok a végtelen pusztán?', 'a Hortobágyon', ['az Őrségben', 'a Mecsekben', 'a Szigetközben'], 'Ez a táj az Alföldön van, Debrecen közelében.'],
  [1, 'Melyik hegységben van a Kékes, hazánk legmagasabb pontja?', 'a Mátrában', ['a Bükkben', 'a Mecsekben', 'a Börzsönyben'], 'Az Északi-középhegység egyik hegysége, Gyöngyös fölött.'],
  [1, 'Melyik tónak van a nagyobb része Ausztriában?', 'a Fertő tónak', ['a Balatonnak', 'a Velencei-tónak', 'a Tisza-tónak'], 'Sopron közelében fekszik, a nyugati határon.'],
  [1, 'Melyik hazánk legnagyobb mesterséges tava?', 'a Tisza-tó', ['a Balaton', 'a Velencei-tó', 'a Fertő tó'], 'Egy gát duzzasztotta fel egy folyó vizét. Melyik folyóról kapta a nevét?'],
  [1, 'Melyik félszigeten áll híres apátság, és virágzik nyáron a levendula a Balatonnál?', 'Tihany', ['Siófok', 'Keszthely', 'Badacsony'], 'A Balaton északi partján benyúlik a tóba.'],
  [1, 'Melyik városban áll hazánk legnagyobb temploma, a bazilika?', 'Esztergomban', ['Egerben', 'Pécsen', 'Debrecenben'], 'A Duna partján van, a szlovák határon.'],
  [1, 'Melyik város fekszik a Mecsek lábánál?', 'Pécs', ['Győr', 'Eger', 'Szeged'], 'A Dunántúl déli részén van, Baranya megye székhelye.'],
  [2, 'Hol van a Baradla-barlang, hazánk leghíresebb cseppkőbarlangja?', 'az Aggteleki-karsztban', ['a Mecsekben', 'a Mátrában', 'a Bakonyban'], 'Egészen északon, a szlovák határ mellett.'],
  [2, 'Melyik tájon készül a világhírű aszú bor?', 'Tokaj-Hegyalján', ['a Hortobágyon', 'az Őrségben', 'a Nyírségben'], 'Ott, ahol a Bodrog a Tiszába ömlik.'],
  [2, 'Mi a neve a Hortobágy híres, kilenc boltívű kőhídjának?', 'Kilenclyukú híd', ['Lánchíd', 'Margit híd', 'Megyeri híd'], 'A neve megmondja, hány „lyuka”, vagyis boltíve van.'],
  [2, 'Melyik volt hazánk első nemzeti parkja?', 'a Hortobágyi Nemzeti Park', ['a Bükki Nemzeti Park', 'az Őrségi Nemzeti Park', 'az Aggteleki Nemzeti Park'], '1973-ban alapították, a pusztát védi.'],
  [2, 'Melyik tájon van a Bugaci-puszta, ahol a csikósok lovasbemutatót tartanak?', 'a Kiskunságban', ['a Hajdúságban', 'a Nyírségben', 'a Jászságban'], 'A Duna és a Tisza között, Kecskemét közelében.'],
  [2, 'Hogy hívják a hazánk nyugati szélén, az Alpok lábánál fekvő tájat?', 'Alpokalja', ['Alföld', 'Nyírség', 'Mátra'], 'A neve elárulja: az Alpok „alja”, vagyis lába.'],
  [2, 'Melyik vár magasodik a Duna-kanyar fölött?', 'a visegrádi vár', ['az egri vár', 'a szigetvári vár', 'a budai vár'], 'Budapesttől északra, ahol a Duna dél felé fordul.'],
  [2, 'Melyik hegységben van a Szalajka-völgy és a Fátyol-vízesés?', 'a Bükkben', ['a Mátrában', 'a Mecsekben', 'a Börzsönyben'], 'Eger és Miskolc között emelkedik.'],
  [2, 'Melyik hazánk legnagyobb szigete, a Duna és a Mosoni-Duna között?', 'a Szigetköz', ['a Csepel-sziget', 'a Margit-sziget', 'a Szentendrei-sziget'], 'Győr közelében, a Kisalföldön van.'],
  [3, 'Hol van az Írott-kő, a Dunántúl legmagasabb pontja?', 'a Kőszegi-hegységben', ['a Mecsekben', 'a Bakonyban', 'a Mátrában'], 'Az Alpokalján, az osztrák határon.'],
  [3, 'Melyik két hegység tartozik az Alpokaljához?', 'a Soproni- és a Kőszegi-hegység', ['a Bükk és a Mátra', 'a Mecsek és a Villányi-hegység', 'a Pilis és a Börzsöny'], 'Mindkettő a nyugati határ mellett van, egy-egy városról kapta a nevét.'],
  [3, 'Mi a nagytáj neve, amelyhez az Alpokalja tartozik?', 'Nyugat-magyarországi-peremvidék', ['Dunántúli-dombság', 'Kisalföld', 'Északi-középhegység'], 'Az ország nyugati peremén, szélén van.'],
  [3, 'Hol látható a Feszty-körkép, amely a honfoglalást mutatja be?', 'Ópusztaszeren', ['Budapesten', 'Visegrádon', 'Esztergomban'], 'Csongrád-Csanád megyében, Szeged közelében van.'],
  [3, 'Hogy hívják a Duna menti ártéri erdőt Tolna megyében, ahol sok gímszarvas él?', 'Gemenc', ['Zselic', 'Bakony', 'Őrség'], 'A Duna–Dráva Nemzeti Parkhoz tartozik.'],
  [3, 'Melyik tájon van csillagpark, ahol különösen sötét és csillagos az éjszakai égbolt?', 'a Zselicben', ['a Hortobágyon', 'a Szigetközben', 'a Jászságban'], 'Somogy megyei erdős, dombos táj, Kaposvár közelében.'],
  [3, 'Mit őriz Hollókő, a Nógrád megyei kis falu?', 'a palócok hagyományait', ['a kunok hagyományait', 'a jászok hagyományait', 'a matyók hagyományait'], 'Északon, a Cserhátban élő népcsoport hagyományait.'],
  [3, 'Melyik nemzeti parkhoz tartozik a Baradla-barlang?', 'Aggteleki Nemzeti Park', ['Bükki Nemzeti Park', 'Duna–Ipoly Nemzeti Park', 'Őrségi Nemzeti Park'], 'A barlang abban a karsztban van, amelyről a park a nevét kapta.']
];
const NPARKS = ['Aggteleki', 'Balaton-felvidéki', 'Bükki', 'Duna–Dráva', 'Duna–Ipoly', 'Fertő–Hanság', 'Hortobágyi', 'Kiskunsági', 'Körös–Maros', 'Őrségi'];
const FAKE_NP = ['Mátrai', 'Mecseki', 'Velencei', 'Zalai', 'Pilisi'];
const npQ = () => { const f = pick(FAKE_NP); return mcq('Melyik <b>nem</b> nemzeti park? (Hazánkban 10 nemzeti park van.)', `${f} Nemzeti Park`, shuffle(NPARKS).slice(0, 3).map(x => `${x} Nemzeti Park`), { fmt: v => v, hint: 'A 10 nemzeti park: ' + NPARKS.join(', ') + '.' }); };
const TAJ_SORT = L => sortQ('Hegység, alföldi táj vagy tó? Válogasd szét!', { 'hegység': ['Bükk', 'Mátra', 'Mecsek', 'Börzsöny', 'Kőszegi-hegység', 'Zempléni-hegység'], 'alföldi táj': ['Hortobágy', 'Kiskunság', 'Nyírség', 'Hajdúság', 'Jászság'], 'tó': ['Balaton', 'Velencei-tó', 'Fertő tó', 'Tisza-tó'] }, 2, { hint: 'A hegység magas, hegyes. Az alföldi táj sík. A tó állóvíz.' });
const TAJ_RIDDLES = [
  ['táj2', ['Az Alföldön vagyok, Hajdú-Bihar megyében.', 'Végtelen füves puszta vagyok, szürkemarha és racka legel rajtam.', 'Rajtam áll a híres Kilenclyukú híd.', 'Hazánk első nemzeti parkja vagyok.'], 'Hortobágy', ['Kiskunság', 'Nyírség', 'Őrség']],
  ['táj2', ['A föld alatt vagyok, egészen északon.', 'Bennem a csepegő víz cseppköveket formált.', 'Egy részem Szlovákia alá is átnyúlik.', 'Hazánk leghíresebb cseppkőbarlangja vagyok, Aggteleknél.'], 'Baradla-barlang', ['Szemlő-hegyi-barlang', 'Tapolcai-tavasbarlang', 'Szent István-barlang']],
  ['táj2', ['Félsziget vagyok a Balatonban.', 'Híres apátság áll rajtam.', 'Nyáron lilán virágzik rajtam a levendula.', 'Ha a partomon kiáltasz, a visszhang válaszol.'], 'Tihany', ['Badacsony', 'Siófok', 'Keszthely']],
  ['táj2', ['Hazánk nyugati szélén vagyok, Ausztria mellett.', 'Az Alpok legkeletibb nyúlványai vagyunk.', 'Hozzám tartozik a Soproni- és a Kőszegi-hegység.', 'Rajtam van az Írott-kő, a Dunántúl legmagasabb pontja.'], 'Alpokalja', ['Bakony', 'Mecsek', 'Mátra']],
  ['táj2', ['Hazánk északkeleti részén vagyok.', 'Vulkanikus hegyoldalaimon szőlő terem.', 'Nálam ömlik a Bodrog a Tiszába.', 'Világhírű a borom, az aszú.'], 'Tokaj-Hegyalja', ['Badacsony', 'Villányi-hegység', 'Mátra']],
  ['táj2', ['A nyugati határ közelében, Vas megyében vagyok.', 'Erdős, dombos, csapadékos táj vagyok.', 'A falvaim szétszórt házcsoportjait szereknek hívják.', 'Saját nemzeti parkom is van, hazánk legfiatalabb nemzeti parkja.'], 'Őrség', ['Göcsej', 'Hanság', 'Sárköz']],
  ['táj2', ['A Kisalföldön vagyok, Győr közelében.', 'A Duna és a Mosoni-Duna között fekszem.', 'Rengeteg kis folyóág és ártéri erdő szabdal.', 'Hazánk legnagyobb szigete vagyok.'], 'Szigetköz', ['Csepel-sziget', 'Margit-sziget', 'Hanság']],
  ['táj2', ['A Tiszántúl északkeleti részén vagyok.', 'A talajom homokos.', 'Rengeteg alma terem rajtam.', 'A központom Nyíregyháza.'], 'Nyírség', ['Hajdúság', 'Jászság', 'Kiskunság']],
  ['táj2', ['Az Alföldön, a Duna és a Tisza között vagyok.', 'Homokbuckák és szikes tavak vannak rajtam.', 'Bugacon lovasbemutatót tartanak a csikósok.', 'Nevemet a kunokról kaptam.'], 'Kiskunság', ['Hortobágy', 'Nyírség', 'Jászság']],
  ['táj2', ['A Dunántúl déli részén emelkedem.', 'Baranya megyében vagyok.', 'A legmagasabb csúcsom a Zengő.', 'A lábamnál fekszik Pécs városa.'], 'Mecsek', ['Bakony', 'Villányi-hegység', 'Zselic']],
  ['táj2', ['Állóvíz vagyok Fejér megyében.', 'Budapest és Székesfehérvár között fekszem.', 'Sok nád nő bennem, nyáron fürdenek bennem.', 'Hazánk harmadik legnagyobb természetes tava vagyok.'], 'Velencei-tó', ['Balaton', 'Fertő tó', 'Tisza-tó']],
  ['táj2', ['Állóvíz vagyok az Alföldön.', 'Nem a természet hozott létre: egy gát duzzasztott fel.', 'Egy nagy folyó vize táplál, róla kaptam a nevem.', 'Hazánk legnagyobb mesterséges tava vagyok.'], 'Tisza-tó', ['Velencei-tó', 'Balaton', 'Fertő tó']],
  ['táj2', ['Állóvíz vagyok hazánk északnyugati szélén.', 'A nagyobb részem Ausztriában van.', 'Nádas, sekély tó vagyok, sok madár fészkel bennem.', 'Sopron közelében fekszem.'], 'Fertő tó', ['Velencei-tó', 'Balaton', 'Tisza-tó']],
  ['táj2', ['Itt a Duna nagy kanyart vesz, és dél felé fordul.', 'A Börzsöny és a Visegrádi-hegység között vagyok.', 'A partomon áll Visegrád vára.', 'Esztergom és Szentendre is a közelemben van.'], 'Duna-kanyar', ['Szigetköz', 'Csepel-sziget', 'Tokaj-Hegyalja']],
  ['táj2', ['Kis falu vagyok a Cserhátban, Nógrád megyében.', 'A palóc népcsoport hagyományait őrzöm.', 'Húsvétkor népviseletbe öltöznek a lakóim.', 'Világörökségi helyszín vagyok, váram is van.'], 'Hollókő', ['Visegrád', 'Tihany', 'Pannonhalma']],
  ['táj2', ['Dombon álló település vagyok Győr közelében.', 'Több mint ezer éve bencés szerzetesek élnek itt.', 'Híres főapátságom van.', 'Világörökségi helyszín vagyok.'], 'Pannonhalma', ['Tihany', 'Esztergom', 'Hollókő']]
];
RIDDLES.push(...TAJ_RIDDLES);
K4.tajak = L => {
  const r = Math.random();
  const fact = () => { const [, q, a, w, hn] = pick(TAJ_FACTS.filter(f => f[0] <= L && (L === 1 || f[0] >= L - 1))); return mcq(q, a, w, { fmt: v => v, hint: hn }); };
  const county = () => { const [t, c, ex] = pick(TAJ_COUNTY); return mcq(`Melyik megyében van ${t}?`, c, otherCounties(c, 3, ex), { fmt: v => v, hint: MAP_HINTS[c] }); };
  const rid = () => { const [, cl, a, w] = pick(TAJ_RIDDLES); return riddleQ(cl, a, w); };
  if (L === 1) return r < .5 ? fact() : r < .7 ? TAJ_SORT(L) : r < .85 ? sightTap() : rid();
  if (L === 2) return r < .35 ? fact() : r < .55 ? rid() : r < .75 ? county() : r < .9 ? sightTap() : npQ();
  return r < .3 ? fact() : r < .5 ? county() : r < .7 ? rid() : r < .85 ? npQ() : sightTap();
};

/* Budapest hídjai */
const BR_FACTS = [
  [1, 'Melyik folyón ívelnek át Budapest hídjai?', 'a Dunán', ['a Tiszán', 'a Balatonon', 'a Rábán'], 'Európa második leghosszabb folyója, Budapestet Budára és Pestre osztja.'],
  [1, 'Melyik volt az első állandó híd Buda és Pest között?', 'Lánchíd', ['Margit híd', 'Erzsébet híd', 'Szabadság híd'], 'Láncokon függ, és Széchenyi István építtette.'],
  [1, 'Melyik hidat őrzik kőoroszlánok a két hídfőnél?', 'Lánchíd', ['Szabadság híd', 'Petőfi híd', 'Árpád híd'], 'A legrégebbi budapesti híd.'],
  [1, 'Melyik híd közepéről lehet lesétálni a Margit-szigetre?', 'Margit híd', ['Lánchíd', 'Szabadság híd', 'Petőfi híd'], 'A híd neve ugyanaz, mint a szigeté.'],
  [1, 'Milyen színű a Szabadság híd?', 'zöld', ['fehér', 'piros', 'sárga'], 'Ugyanolyan színű, mint a fű.'],
  [1, 'Milyen színű az Erzsébet híd?', 'fehér', ['zöld', 'kék', 'fekete'], 'Olyan színű, mint a hó.'],
  [2, 'Kinek a kezdeményezésére épült meg a Lánchíd?', 'Széchenyi István', ['Kossuth Lajos', 'Petőfi Sándor', 'Deák Ferenc'], 'Őt „a legnagyobb magyarnak” is nevezik, a híd hivatalos neve is őt őrzi.'],
  [2, 'Melyik híd tetején ülnek bronz turulmadarak?', 'Szabadság híd', ['Lánchíd', 'Erzsébet híd', 'Megyeri híd'], 'A zöld színű híd, a Gellért-hegy lábánál.'],
  [2, 'Melyik hidat nevezték el egy királynéról, akit mindenki Sisinek hívott?', 'Erzsébet híd', ['Margit híd', 'Szabadság híd', 'Árpád híd'], 'A fehér híd.'],
  [2, 'Melyik híd kapta a nevét egy nagy magyar költőről?', 'Petőfi híd', ['Rákóczi híd', 'Árpád híd', 'Szabadság híd'], 'Ő írta a Nemzeti dalt.'],
  [2, 'Melyik a legészakibb budapesti Duna-híd, az M0-s körgyűrű része?', 'Megyeri híd', ['Árpád híd', 'Rákóczi híd', 'Margit híd'], 'A legújabb híd, 2008-ban adták át.'],
  [2, 'Mi történt 1944–45 telén Budapest összes Duna-hídjával?', 'a háborúban felrobbantották őket', ['elsodorta őket az árvíz', 'lebontották, mert elöregedtek', 'átfestették őket'], 'A második világháború vége felé történt; később újjáépítették őket.'],
  [3, 'Mi volt a Rákóczi híd régi neve?', 'Lágymányosi híd', ['Kossuth híd', 'Ferenc József híd', 'Horthy Miklós híd'], 'Arról a budai városrészről kapta, ahol a hídfője van.'],
  [3, 'Mi volt a Szabadság híd eredeti neve?', 'Ferenc József híd', ['Lágymányosi híd', 'Széchenyi híd', 'Mátyás király híd'], 'Az akkori királyról nevezték el, amikor 1896-ban átadták.'],
  [3, 'Milyen hídfajta a Megyeri híd?', 'ferdekábeles híd', ['lánchíd', 'kőhíd', 'fahíd'], 'A magas pilonokról ferdén lefutó kábelek tartják.'],
  [3, 'Melyik híd tör meg a közepén, a Margit-szigetnél?', 'Margit híd', ['Árpád híd', 'Petőfi híd', 'Erzsébet híd'], 'A Margit-sziget déli csücskénél ágazik le a sziget felé.'],
  [3, 'Mikor adták át a Lánchidat?', '1849-ben', ['1749-ben', '1896-ban', '1945-ben'], 'Közvetlenül az 1848–49-es szabadságharc után adták át.']
];
const BR_RIDDLES = [
  [['Budapesten vagyok.', 'Két kapuszerű kőpillérem van.', 'A két hídfőmnél kőoroszlánok őrködnek.', 'Én voltam az első állandó híd Buda és Pest között.'], 'Lánchíd', ['Margit híd', 'Erzsébet híd', 'Szabadság híd']],
  [['Budapest egyik hídja vagyok.', 'Fehér színű vagyok.', 'A háború után teljesen újjáépítettek, 1964-ben adtak át újra.', 'Egy királynéról, Sisiről neveztek el.'], 'Erzsébet híd', ['Szabadság híd', 'Lánchíd', 'Petőfi híd']],
  [['Budapest egyik hídja vagyok.', 'Zöld színű vagyok, a Gellért-hegy lábánál.', 'A tetőmön turulmadarak ülnek.', 'A honfoglalás ezeréves ünnepére, 1896-ban adtak át.'], 'Szabadság híd', ['Erzsébet híd', 'Margit híd', 'Lánchíd']],
  [['Budapest legészakibb Duna-hídja vagyok.', 'Az autópálya-körgyűrű, az M0 része vagyok.', 'Magas pilonokról ferde kábelek tartanak.', '2008-ban adtak át.'], 'Megyeri híd', ['Árpád híd', 'Rákóczi híd', 'Lánchíd']]
];
const brOrder = () => { const k = [...Array(8).keys()].sort(() => Math.random() - .5).slice(0, 4).sort((a, b) => a - b), ans = k.map(i => BRIDGES[i].n);
  return { type: 'build', prompt: 'Rakd sorba a hidakat északról délre, ahogy a Duna folyik! Koppints rájuk sorban.', answer: ans, tiles: shuffle(ans), visual: danubeSvg({}), explain: 'Északról délre: ' + BRIDGES.map(b => b.n).join(', ') + '.', hint: 'Északról délre: Megyeri, Árpád, Margit, Lánchíd, Erzsébet, Szabadság, Petőfi, Rákóczi.' }; };
const brLabel = () => { const starts = pick([[0, 2, 4, 6], [1, 3, 5, 7], [0, 2, 5, 7], [0, 3, 5, 7], [1, 3, 6, 0]]).sort((a, b) => a - b);
  return labelQ('Írd a hidak nevét a helyükre! (Az észak fent van.)', danubeSvg({}), starts.map(i => ({ name: BRIDGES[i].n, x: dcx(BRIDGES[i].y) / 260 * 100, y: BRIDGES[i].y / 340 * 100 })), { hint: 'Északról délre: Megyeri, Árpád, Margit, Lánchíd, Erzsébet, Szabadság, Petőfi, Rákóczi.' }); };
const brHl = L => { const i = L === 1 ? pick([2, 3, 4, 5]) : ri(0, 7), b = BRIDGES[i].n; const pool = L === 1 ? [2, 3, 4, 5] : [...Array(8).keys()];
  return { type: 'choice', prompt: 'Melyik híd van kiemelve? (Az észak fent van.)', visual: danubeSvg({ hl: i }), answer: b, options: shuffle([b, ...shuffle(pool.filter(x => x !== i)).slice(0, 3).map(x => BRIDGES[x].n)]).map(v => ({ value: v, html: v })), answerText: b, hint: 'Északról délre: Megyeri, Árpád, Margit, Lánchíd, Erzsébet, Szabadság, Petőfi, Rákóczi. A Margit híd a szigetnél, a Lánchíd a két kőpillérről ismerhető fel.' }; };
K4.hidak = L => {
  const r = Math.random(), fact = () => { const [, q, a, w, hn] = pick(BR_FACTS.filter(f => f[0] === L || (L > 1 && f[0] === L - 1 && Math.random() < .4))); return mcq(q, a, w, { fmt: v => v, hint: hn }); };
  if (L === 1) return r < .4 ? brHl(1) : fact();
  if (L === 2) return r < .3 ? brOrder() : r < .5 ? brHl(2) : r < .7 ? (() => { const [cl, a, w] = pick(BR_RIDDLES); return riddleQ(cl, a, w); })() : fact();
  return r < .35 ? brLabel() : r < .55 ? brOrder() : r < .7 ? (() => { const [cl, a, w] = pick(BR_RIDDLES); return riddleQ(cl, a, w); })() : fact();
};
/* ---------- more questions for the small topics, and three new topics ---------- */
// fact = [level, question, answer, wrong answers, hint]
const factQ = ([, q, a, w, hint]) => mcq(q, a, w, { fmt: v => v, hint });
const withFacts = (base, facts, p) => L => { const pool = facts.filter(f => f[0] === L); return pool.length && Math.random() < p ? factQ(pick(pool)) : base(L); };
const MORE = {
  measure: [
    [1, 'Mivel mérjük meg, milyen hosszú a ceruza?', 'vonalzóval', ['mérleggel', 'hőmérővel', 'órával'], 'Rövid dolgok hosszát vonalzóval mérjük.'],
    [1, 'Mivel mérjük a lázat?', 'lázmérővel', ['vonalzóval', 'mérleggel', 'mérőpohárral'], 'A láz a testhőmérséklet; ehhez külön hőmérő van.'],
    [1, 'Mivel mérjük az időt egy futóversenyen?', 'stopperórával', ['mérleggel', 'vonalzóval', 'hőmérővel'], 'Ez egy olyan óra, amelyet elindíthatsz és megállíthatsz.'],
    [1, 'Mivel mérjük, mennyi tej kell a palacsintához?', 'mérőpohárral', ['vonalzóval', 'hőmérővel', 'stopperórával'], 'A folyadék mennyiségét (űrtartalmát) mérjük vele.'],
    [1, 'Mivel mérjük meg, hány kiló a liszt?', 'konyhai mérleggel', ['mérőszalaggal', 'hőmérővel', 'stopperórával'], 'A tömeget mérleggel mérjük.'],
    [2, 'Mennyi 1 kg?', '100 dkg', ['10 dkg', '1000 dkg', '50 dkg'], '1 kg = 100 dkg, 1 dkg = 10 g.'],
    [2, 'Mennyi 1 liter?', '10 dl', ['100 dl', '5 dl', '1000 dl'], '1 l = 10 dl, 1 dl = 100 ml.'],
    [2, 'Mennyi 1 méter?', '100 cm', ['10 cm', '1000 cm', '60 cm'], '1 m = 10 dm = 100 cm.'],
    [2, 'Hány óra egy nap?', '24 óra', ['12 óra', '60 óra', '10 óra'], 'Egy nap 24 óra: ennyi idő alatt fordul meg a Föld.'],
    [2, 'Melyik a legnehezebb?', '1 kg kenyér', ['80 dkg liszt', '50 dkg alma', '10 dkg csoki'], 'Váltsd át: 1 kg = 100 dkg.'],
    [2, 'Melyik a leghosszabb?', '1 m', ['90 cm', '9 dm', '50 cm'], 'Váltsd át: 1 m = 100 cm, 9 dm = 90 cm.'],
    [2, 'Melyikbe fér több víz?', '2 literes üveg', ['15 dl-es kancsó', '5 dl-es pohár', '1 literes üveg'], 'Váltsd át: 1 l = 10 dl, tehát 2 l = 20 dl.']
  ],
  weather: [
    [1, 'Melyik évszakban esik leggyakrabban hó?', 'télen', ['nyáron', 'tavasszal', 'ősszel'], 'A hó akkor esik, amikor fagypont alatt van a hőmérséklet.'],
    [1, 'Melyik évszak követi a nyarat?', 'az ősz', ['a tél', 'a tavasz', 'újra a nyár'], 'Az évszakok sorrendje: tavasz, nyár, ősz, tél.'],
    [1, 'Melyik évszakban a leghosszabbak a nappalok?', 'nyáron', ['télen', 'ősszel', 'tavasszal'], 'Nyáron korán kel és későn nyugszik a Nap.'],
    [1, 'Mi a szél?', 'a levegő mozgása', ['a felhők színe', 'a lehulló víz', 'a Nap melege'], 'Amikor a levegő áramlik, azt szélnek érezzük.'],
    [1, 'Hogyan véded magad nyáron a tűző naptól?', 'sapkát veszek, és naptejet használok', ['kabátot veszek', 'nem iszom vizet', 'délben futok a napon'], 'A nap sugarai leégést és napszúrást okozhatnak.'],
    [1, 'Mit vegyél fel, ha esik az eső?', 'esőkabátot', ['fürdőruhát', 'papucsot', 'napszemüveget'], 'Olyan ruha kell, amin nem jut át a víz.'],
    [2, 'Mi a dér?', 'a talajra és a növényekre fagyott apró jégkristályok', ['hulló hópelyhek', 'nagy esőcseppek', 'a talajhoz közeli felhő'], 'Hideg, derült éjszakákon keletkezik, reggel fehérré teszi a füvet.'],
    [2, 'Mi a harmat?', 'a hűvös hajnalon a fűre kicsapódó vízcseppek', ['a jégeső olvadéka', 'a fák nedve', 'a köd neve télen'], 'A levegő párája lecsapódik a hideg fűszálakon.'],
    [2, 'Mi a köd?', 'a talaj közelében lebegő apró vízcseppek', ['a füst a kéményből', 'a hó, ami nem esik le', 'a szél porfelhője'], 'A köd olyan, mint egy felhő, ami leereszkedett a földre.'],
    [2, 'Mi jellemző a zivatarra?', 'villámlás, mennydörgés és heves eső', ['csendes, apró szitálás', 'havazás tavasszal', 'erős napsütés'], 'Nyáron, meleg időben gyakori.'],
    [2, 'Mi a jégeső?', 'jéggolyók hullanak az égből, főleg nyári zivatarban', ['a téli havazás másik neve', 'a fagyott tó felszíne', 'a jégcsap olvadása'], 'Nyáron is eshet, a zivatarfelhőben fagynak meg a cseppek.'],
    [3, 'Milyen az éghajlata hazánknak?', 'mérsékelt, négy évszakkal', ['trópusi, egész évben forró', 'sarkvidéki, egész évben hideg', 'sivatagi, alig esik eső'], 'Nálunk négy jól elkülönülő évszak van.'],
    [3, 'Mi a különbség az időjárás és az éghajlat között?', 'az időjárás a mostani állapot, az éghajlat sok év átlaga', ['nincs különbség', 'az időjárás csak télen van', 'az éghajlatot hőmérővel mérjük'], 'Az időjárás napról napra változik, az éghajlat egy terület jellemző, hosszú távú időjárása.'],
    [3, 'Miért látjuk előbb a villámot, mint halljuk a mennydörgést?', 'mert a fény gyorsabb, mint a hang', ['mert a hang gyorsabb', 'mert a villám hangtalan', 'mert a felhők elnyelik a hangot'], 'A fény szinte azonnal ideér, a hang lassabban halad.'],
    [3, 'Mit tegyél, ha a szabadban ér a zivatar?', 'ne állj magányos fa alá, keress épületet', ['állj a legmagasabb fa alá', 'menj fel a dombtetőre', 'fogd meg a fémkerítést'], 'A villám a magas, kiemelkedő pontokba csap.']
  ],
  health: [
    [1, 'Hányszor moss fogat naponta?', 'legalább kétszer', ['hetente egyszer', 'csak ünnepnapon', 'soha'], 'Reggel és este is moss fogat!'],
    [1, 'Mit igyál, ha szomjas vagy?', 'vizet', ['kólát', 'energiaitalt', 'nagyon cukros szörpöt'], 'A víz oltja legjobban a szomjat, és nincs benne cukor.'],
    [1, 'Melyik egészséges tízórai?', 'gyümölcs vagy teljes kiőrlésű szendvics', ['chips', 'csoki', 'cukorka'], 'Ami vitamint és tartós energiát ad, az egészséges.'],
    [1, 'Mit viselj biciklizéskor?', 'bukósisakot', ['papucsot', 'napszemüveget a fejem tetején', 'semmit sem kell'], 'A bukósisak eséskor megvédi a fejedet.'],
    [1, 'Mit tegyél, mielőtt átmész az úton?', 'megállok, és körülnézek balra, jobbra, majd újra balra', ['futva átrohanok', 'csak jobbra nézek', 'a telefonomat nézem'], 'Mindig a zebrán menj át, és nézz körül alaposan!'],
    [2, 'Körülbelül mennyit aludjon egy kisiskolás éjszaka?', 'körülbelül 10 órát', ['4 órát', '6 órát', '15 órát'], 'A pihent agy jobban tanul.'],
    [2, 'Mit tegyél, ha megégeted az ujjad?', 'hideg folyó víz alá tartom', ['bekenem vajjal', 'szorosan bekötöm', 'nem csinálok semmit'], 'A hideg víz lehűti az égett bőrt. Szólj egy felnőttnek is!'],
    [2, 'Mit tegyél, ha vérzik az orrod?', 'előrehajolok, és összeszorítom az orrom', ['hátrahajtom a fejem', 'lefekszem a hátamra', 'ugrálok'], 'Előre hajolj, hogy a vér ne folyjon le a torkodba.'],
    [2, 'Mit mondj, ha mentőt hívsz?', 'a nevemet, a pontos címet és hogy mi történt', ['csak azt, hogy baj van', 'a kedvenc színemet', 'semmit, leteszem'], 'A mentőknek tudniuk kell, hová menjenek és mi a baj.'],
    [2, 'Miért fontos a reggeli?', 'energiát ad a délelőtti tanuláshoz', ['mert utána nem kell ebédelni', 'mert ettől nő a hajunk', 'nem fontos'], 'Éjszaka sokáig nem eszünk, reggel tölteni kell az energiát.'],
    [3, 'Mi a kórokozó?', 'apró élőlény (például baktérium vagy vírus), amely betegséget okoz', ['egy gyógyszer', 'egy vitamin', 'egy testrész'], 'Szabad szemmel nem látjuk őket.'],
    [3, 'Hogyan terjed a nátha?', 'cseppfertőzéssel: köhögéssel, tüsszentéssel', ['a napfénnyel', 'a vízcsapból', 'zenehallgatással'], 'Ezért kell zsebkendőbe tüsszenteni.'],
    [3, 'Mit tegyél, ha lázas vagy?', 'pihenek, sok folyadékot iszom, és szólok egy felnőttnek', ['focizni megyek', 'nem iszom semmit', 'hideg vízben fürdök sokáig'], 'Lázas betegségben a pihenés és a folyadék segít.'],
    [3, 'Melyik étel ad sok kalciumot a csontjainknak?', 'tej, sajt, joghurt', ['cukorka', 'kóla', 'chips'], 'A tejtermékek erősítik a csontokat és a fogakat.'],
    [3, 'Miért kell napkrémet használni?', 'megvédi a bőrt a leégéstől', ['hogy jobb legyen az illatunk', 'hogy ne fázzunk', 'hogy gyorsabban fussunk'], 'A Nap sugarai megégethetik a bőrt.']
  ],
  body: [
    [1, 'Hány érzékszervünk van?', '5', ['3', '4', '7'], 'Szem, fül, orr, nyelv, bőr.'],
    [1, 'Melyik érzékszervünkkel érezzük, hogy valami meleg vagy hideg?', 'a bőrünkkel', ['a fülünkkel', 'az orrunkkal', 'a szemünkkel'], 'A bőrünkkel tapintunk, és a meleget, hideget is érezzük.'],
    [1, 'Mivel érezzük a virág illatát?', 'az orrunkkal', ['a fülünkkel', 'a nyelvünkkel', 'a szemünkkel'], 'A szaglás érzékszerve az orr.'],
    [1, 'Mivel érezzük az ízeket?', 'a nyelvünkkel', ['a fülünkkel', 'a bőrünkkel', 'a szemünkkel'], 'Az ízlelés érzékszerve a nyelv.'],
    [1, 'Mire jó a szempilla?', 'védi a szemet a portól', ['segít hallani', 'segít szagolni', 'semmire'], 'A szempilla és a pislogás védi a szemet.'],
    [2, 'Hány foga van egy felnőtt embernek?', '32', ['20', '24', '40'], 'A gyerekeknek 20 tejfoguk van, a felnőtteknek 32 maradó foguk.'],
    [2, 'Hány tejfoga van egy kisgyereknek?', '20', ['10', '32', '28'], 'A tejfogak helyére nőnek a maradó fogak.'],
    [2, 'Mi szállítja az oxigént a testünkben?', 'a vér', ['a csontok', 'a haj', 'a köröm'], 'A szív a vért pumpálja, a vér oxigént visz minden testrészhez.'],
    [2, 'Melyik a testünk legnagyobb szerve?', 'a bőr', ['a máj', 'a tüdő', 'az agy'], 'Az egész testünket beborítja.'],
    [2, 'Mi a gerincoszlop?', 'a hátunkban húzódó csontoszlop, amely tartja a testet', ['egy izom a karban', 'a szív része', 'a koponya másik neve'], 'Csigolyákból áll.'],
    [3, 'Mi védi az agyat?', 'a koponya', ['a bordák', 'a gerinc', 'a medence'], 'A fejünk csontjai kemény „sisakot” alkotnak.'],
    [3, 'Mi védi a szívet és a tüdőt?', 'a bordák', ['a koponya', 'a térdkalács', 'a lapocka'], 'A bordák kosárként veszik körül a mellkas szerveit.'],
    [3, 'Mi a fogak feladata?', 'felaprítják az ételt', ['pumpálják a vért', 'irányítják a testet', 'levegőt szállítanak'], 'Az emésztés a szájban, a rágással kezdődik.'],
    [3, 'Hová jut a belélegzett levegő?', 'a tüdőbe', ['a gyomorba', 'a szívbe', 'az agyba'], 'Az orron és a légcsövön át a tüdőbe.']
  ],
  landform: [
    [1, 'Hogy hívjuk a hegy legmagasabb pontját?', 'csúcs', ['lejtő', 'völgy', 'hegyláb'], 'A hegy részei: csúcs (teteje), lejtő (oldala), hegyláb (alja).'],
    [1, 'Hogy hívjuk a hegy oldalát?', 'lejtő', ['csúcs', 'völgy', 'forrás'], 'A hegy részei: csúcs, lejtő, hegyláb.'],
    [1, 'Hogy hívjuk azt a helyet, ahol a víz a földből előtör?', 'forrás', ['torkolat', 'tó', 'völgy'], 'A forrásból indul el a patak.'],
    [1, 'Hogy hívjuk a vízzel minden oldalról körülvett szárazföldet?', 'sziget', ['félsziget', 'völgy', 'domb'], 'Ilyen a Margit-sziget vagy a Csepel-sziget.'],
    [2, 'Mi a félsziget?', 'három oldalról víz veszi körül', ['minden oldalról víz veszi körül', 'egy fél hegy', 'egy kis tó'], 'Ilyen a Tihanyi-félsziget a Balatonban.'],
    [2, 'Mi a mocsár?', 'sekély, növényekkel sűrűn benőtt állóvíz', ['gyors folyású patak', 'magas hegy', 'homokos síkság'], 'Sok nád és sás nő benne.'],
    [2, 'Mi a csatorna?', 'ember által ásott, mesterséges folyóvíz', ['egy hegy neve', 'természetes tó', 'egy forrás'], 'Öntözésre vagy hajózásra készítik.'],
    [2, 'Mi a barlang?', 'föld alatti üreg, gyakran cseppkövekkel', ['egy magas fa', 'egy sziget', 'egy völgy a folyó mellett'], 'Híres barlangunk a Baradla Aggteleknél.'],
    [3, 'Hol van a Dunántúl legmagasabb pontja, az Írott-kő?', 'a Kőszegi-hegységben', ['a Mecsekben', 'a Bakonyban', 'a Mátrában'], 'Az osztrák határon, az Alpokalján.'],
    [3, 'Mi a Bükk legmagasabb csúcsa?', 'az Istállós-kő', ['a Kékes', 'a Zengő', 'a Dobogókő'], 'A Bükk Eger és Miskolc között van.'],
    [3, 'Milyen magas a Kékes?', 'körülbelül 1014 méter', ['körülbelül 514 méter', 'körülbelül 2014 méter', 'körülbelül 114 méter'], 'Ez az egyetlen hegycsúcsunk, amely 1000 méternél magasabb.'],
    [3, 'Mi a tanúhegy, például a Badacsony?', 'vulkáni eredetű, lapos tetejű hegy a Balaton-felvidéken', ['egy homokdomb az Alföldön', 'egy barlang', 'egy mesterséges domb'], 'Régen vulkánok működtek a Balaton északi partján.']
  ],
  plant: [
    [1, 'Mire van szüksége a növénynek a növekedéshez?', 'fényre, vízre, levegőre és tápanyagra', ['csak sötétségre', 'csak cukorra', 'semmire'], 'A növény a gyökerével vizet és tápanyagot vesz fel, a levelével fényt hasznosít.'],
    [1, 'Mi lesz a magból?', 'új növény', ['virágpor', 'levél', 'kő'], 'A mag kicsírázik, és új növény fejlődik belőle.'],
    [1, 'Mi lesz a virágból?', 'termés', ['gyökér', 'szár', 'föld'], 'A virágból fejlődik a termés, abban van a mag.'],
    [1, 'Melyik évszakban hullatják le a leveleiket a lombos fák?', 'ősszel', ['tavasszal', 'nyáron', 'egész évben'], 'Ősszel a levelek elszíneződnek és lehullanak.'],
    [1, 'Hogy hívjuk a fa vastag szárát?', 'törzs', ['gyökér', 'korona', 'levél'], 'A fa részei: gyökér, törzs, korona (ágak és levelek).'],
    [2, 'Melyik fa örökzöld?', 'a fenyő', ['a tölgy', 'a bükk', 'a nyír'], 'Az örökzöldek télen is megtartják a leveleiket (tűleveleiket).'],
    [2, 'Mi terem a tölgyfán?', 'makk', ['dió', 'alma', 'gesztenye'], 'A makk a tölgyfa termése, a vaddisznók és a mókusok szeretik.'],
    [2, 'Kik segítik a virágok beporzását?', 'a rovarok, például a méhek', ['a halak', 'a csigák', 'a vakondok'], 'A méhek virágról virágra viszik a virágport.'],
    [2, 'Melyik lágyszárú növény?', 'a pipacs', ['a tölgy', 'a fenyő', 'az akác'], 'A lágyszárú növény szára puha és zöld, a fásszárúé kemény.'],
    [3, 'Mit készít a levél a napfény segítségével?', 'táplálékot (cukrot) a növénynek', ['virágport', 'gyökeret', 'magot'], 'A zöld levél napfény, víz és levegő segítségével táplálékot készít.'],
    [3, 'Milyen gázt bocsátanak ki a növények nappal a levegőbe?', 'oxigént', ['füstöt', 'vízgőzt és homokot', 'semmilyet'], 'Az oxigént mi és az állatok belélegezzük.'],
    [3, 'Melyik fásszárú növény?', 'az akác', ['a pipacs', 'a búza', 'a kamilla'], 'A fásszárú növény szára kemény, megfásodott: fák és cserjék.']
  ],
  regions: [
    [1, 'Melyik nagytájon fekszik Debrecen?', 'Alföld', ['Kisalföld', 'Dunántúli-dombság', 'Északi-középhegység'], 'Debrecen keleten van, a nagy síkságon.'],
    [1, 'Melyik nagytájon fekszik Győr?', 'Kisalföld', ['Alföld', 'Északi-középhegység', 'Dunántúli-dombság'], 'Győr északnyugaton van, a kisebbik síkságon.'],
    [1, 'Melyik nagytájon fekszik Pécs?', 'Dunántúli-dombság', ['Alföld', 'Kisalföld', 'Északi-középhegység'], 'Pécs a Mecsek lábánál van, délen.'],
    [1, 'Melyik nagytájon fekszik Eger?', 'Északi-középhegység', ['Alföld', 'Kisalföld', 'Dunántúli-dombság'], 'Eger a Bükk lábánál van, északon.']
  ],
  country: [
    [1, 'Hány szomszédos országa van Magyarországnak?', '7', ['4', '5', '9'], 'Ausztria, Szlovákia, Ukrajna, Románia, Szerbia, Horvátország, Szlovénia.'],
    [1, 'Mi Magyarország fővárosa?', 'Budapest', ['Debrecen', 'Szeged', 'Győr'], 'A Duna két partján fekszik.'],
    [1, 'Hány megyéje van Magyarországnak?', '19', ['7', '12', '25'], 'És mellettük Budapest, a főváros.'],
    [1, 'Milyen színű a magyar zászló fentről lefelé?', 'piros, fehér, zöld', ['zöld, fehér, piros', 'piros, sárga, zöld', 'kék, fehér, piros'], 'A piros van felül, a zöld alul.'],
    [2, 'Melyik a legnagyobb városunk Budapest után?', 'Debrecen', ['Szeged', 'Pécs', 'Győr'], 'Hajdú-Bihar megye székhelye, az Alföldön.']
  ]
};
MORE.energy = [
  [1, 'Melyik ad fényt és meleget is?', 'a tűz', ['a Hold', 'a tükör', 'a víz'], 'A tűz világít és melegít is.'],
  [1, 'Mi kell ahhoz, hogy lássunk?', 'fény', ['zaj', 'szél', 'víz'], 'Teljes sötétben semmit sem látunk.'],
  [2, 'Mit tegyél, ha tüzet látsz?', 'szólok egy felnőttnek, és hívjuk a 105-öt vagy a 112-t', ['elbújok az ágy alá', 'vizet öntök a konnektorra', 'bent maradok, és nézem'], 'A tűzoltók száma 105, az általános segélyhívó 112.'],
  [3, 'Mivel oltsuk el az égő olajat a serpenyőben?', 'letakarjuk egy fedővel', ['vizet öntünk rá', 'ráfújunk', 'megkeverjük'], 'A víztől szétfröccsen az égő olaj! A fedő elzárja a levegőt.'],
  [3, 'Miért alszik ki a gyertya, ha befőttesüveget borítunk rá?', 'elfogy alatta a levegő (oxigén)', ['mert megijed', 'mert túl meleg lesz', 'mert kialszik a fény'], 'Az égéshez levegő kell.']
];
MORE.animal = [
  [2, 'Melyik állat rak tojást?', 'a tyúk', ['a kutya', 'a tehén', 'a macska'], 'A madarak, a hüllők, a kétéltűek és a halak tojással szaporodnak.'],
  [2, 'Hány lába van a rovaroknak?', '6', ['4', '8', '10'], 'Minden rovarnak hat lába van.'],
  [2, 'Hány lába van a póknak?', '8', ['6', '4', '10'], 'A pók nem rovar: nyolc lába van.'],
  [2, 'Melyik állat alszik téli álmot?', 'a sün', ['a róka', 'a veréb', 'a szarvas'], 'Téli álmot alszik például a sün, a denevér és az ürge.'],
  [2, 'Melyik madár költözik ősszel melegebb vidékre?', 'a fecske', ['a veréb', 'a cinege', 'a varjú'], 'A fecske és a gólya ősszel délre költözik.']
];
MORE.habitat = [
  [3, 'Kik a termelők a táplálékláncban?', 'a zöld növények', ['a ragadozók', 'a gombák', 'a növényevők'], 'A zöld növények a napfény segítségével maguk készítik a táplálékukat.'],
  [3, 'Melyik ragadozó?', 'a róka', ['a nyúl', 'az őz', 'a mezei egér'], 'A ragadozó más állatokat eszik.'],
  [3, 'Melyik növényevő?', 'az őz', ['a róka', 'a farkas', 'a bagoly'], 'A növényevő füvet, levelet, termést eszik.'],
  [3, 'Mi történne, ha eltűnnének a rókák az erdőből?', 'elszaporodnának az egerek és a nyulak', ['több lenne a fa', 'kiszáradna a patak', 'semmi'], 'Az életközösség tagjai összefüggnek: a ragadozók szabályozzák a zsákmányállatok számát.'],
  [3, 'Mit csinálnak a lebontók (például a gombák és a giliszták)?', 'lebontják az elhalt növényeket és állatokat', ['virágot hoznak', 'megeszik a rókát', 'vizet szállítanak'], 'A lebontók munkájából lesz a talaj tápanyaga.']
];
MORE.country.push(
  [2, 'Melyik ország fővárosa Bécs?', 'Ausztria', ['Szlovákia', 'Románia', 'Szerbia'], 'Bécs nyugati szomszédunk fővárosa.'],
  [2, 'Mi Szlovákia fővárosa?', 'Pozsony', ['Bécs', 'Zágráb', 'Belgrád'], 'Közel van a magyar határhoz, a Duna partján.'],
  [2, 'Melyik a legnagyobb területű megyénk?', 'Bács-Kiskun', ['Pest', 'Nógrád', 'Komárom-Esztergom'], 'A Duna és a Tisza között fekszik, délen.'],
  [2, 'Melyik a legkisebb területű megyénk?', 'Komárom-Esztergom', ['Bács-Kiskun', 'Pest', 'Borsod-Abaúj-Zemplén'], 'Északon, a Duna mentén fekszik.']);
MORE.weather.push(
  [3, 'Milyen felhőből lesz zivatar?', 'a magasra tornyosuló gomolyfelhőből', ['a vékony fátyolfelhőből', 'a ködből', 'a kéményfüstből'], 'A nyári zivatarfelhő óriási, sötét toronyként nő az égen.'],
  [3, 'Mit jelent a fagypont alatti hőmérséklet?', '0 °C-nál hidegebb', ['0 °C-nál melegebb', 'pontosan 10 °C', 'amikor esik az eső'], '0 °C-on fagy meg a víz.']);
for (const [k, facts] of Object.entries(MORE)) K4[k] = withFacts(K4[k], facts, .5);

/* Folyóink és tavaink */
const RIVER_HL = ['Duna', 'Tisza', 'Rába', 'Körös', 'Maros', 'Zagyva', 'Sajó', 'Bodrog', 'Sió', 'Zala'];
const RIVER_HINT = { 'Duna': 'Hazánk legnagyobb folyója: északnyugatról érkezik, a Duna-kanyarnál dél felé fordul, és Budapesten is átfolyik.', 'Tisza': 'Északkeleten lép be, és dél felé kanyarog az Alföldön, Szegednél hagyja el az országot.', 'Rába': 'Nyugatról, Ausztriából érkezik, és Győrnél ömlik a Mosoni-Dunába.', 'Körös': 'Keletről, Romániából érkezik, és Csongrádnál ömlik a Tiszába.', 'Maros': 'Keletről, Romániából érkezik, és Szegednél ömlik a Tiszába.', 'Zagyva': 'Északról, a Mátra mellől folyik dél felé, és Szolnoknál ömlik a Tiszába.', 'Sajó': 'Északról, Szlovákiából érkezik, Miskolc mellett folyik el, és a Tiszába ömlik.', 'Bodrog': 'Északkeletről érkezik, és Tokajnál ömlik a Tiszába.', 'Sió': 'A Balatonból indul Siófoknál, és a Dunába ömlik.', 'Zala': 'Nyugatról érkezik, és a Balaton nyugati csücskébe ömlik.' };
const riverHl = () => { const r = pick(RIVER_HL); return { type: 'choice', prompt: 'Melyik folyó van kiemelve a térképen?', visual: mapRef({ hlRiver: r, rivers: false }), answer: r, options: shuffle([r, ...shuffle(RIVER_HL.filter(x => x !== r)).slice(0, 3)]).map(v => ({ value: v, html: v })), answerText: r, hint: RIVER_HINT[r] }; };
const TISZA_TRIB = ['Maros', 'Körös', 'Zagyva', 'Sajó', 'Bodrog'], DUNA_TRIB = ['Rába', 'Sió', 'Dráva', 'Ipoly'];
const tribQ = () => Math.random() < .5
  ? mcq('Melyik folyó a <b>Tisza</b> mellékfolyója?', pick(TISZA_TRIB), shuffle(DUNA_TRIB).slice(0, 3), { fmt: v => v, hint: 'A Tiszába ömlik: Szamos, Bodrog, Sajó, Zagyva, Körös, Maros. A Dunába ömlik: Rába, Sió, Ipoly, Dráva (és maga a Tisza is).' })
  : mcq('Melyik folyó a <b>Duna</b> mellékfolyója?', pick(DUNA_TRIB), shuffle(TISZA_TRIB).slice(0, 3), { fmt: v => v, hint: 'A Dunába ömlik: Rába, Sió, Ipoly, Dráva (és maga a Tisza is). A Tiszába ömlik: Bodrog, Sajó, Zagyva, Körös, Maros.' });
const RIVER_FACTS = [
  [1, 'Melyik folyó folyik át Budapesten?', 'a Duna', ['a Tisza', 'a Rába', 'a Zagyva'], 'Budapestet Budára és Pestre osztja.'],
  [1, 'Melyik a leghosszabb folyónk az országon belül?', 'a Tisza', ['a Duna', 'a Rába', 'a Körös'], 'Az Alföldet szeli át észak–déli irányban.'],
  [1, 'Hová ömlik a Duna?', 'a Fekete-tengerbe', ['a Balatonba', 'az Adriai-tengerbe', 'az Északi-tengerbe'], 'Sok országon át folyik keletre, a tengerig.'],
  [1, 'Hogy hívjuk azt a helyet, ahol a folyó ered?', 'forrás', ['torkolat', 'meder', 'gát'], 'A folyó a forrásnál „születik”.'],
  [1, 'Hogy hívjuk azt a helyet, ahol a folyó egy másik folyóba vagy a tengerbe ömlik?', 'torkolat', ['forrás', 'meder', 'part'], 'A torkolatnál ér véget a folyó útja.'],
  [1, 'Hogy hívjuk a folyót, amely egy nagyobb folyóba ömlik?', 'mellékfolyó', ['főfolyó', 'tenger', 'forrás'], 'A Zagyva például a Tisza mellékfolyója.'],
  [1, 'Milyen víz a Balaton?', 'állóvíz', ['folyóvíz', 'tenger', 'patak'], 'A tó vize egy helyben marad, nem folyik el egy irányba.'],
  [2, 'Melyik városnál ömlik a Maros a Tiszába?', 'Szegednél', ['Szolnoknál', 'Tokajnál', 'Győrnél'], 'Hazánk déli részén, a Tisza partján.'],
  [2, 'Melyik városnál ömlik a Zagyva a Tiszába?', 'Szolnoknál', ['Szegednél', 'Tokajnál', 'Győrnél'], 'Jász-Nagykun-Szolnok megye székhelyén.'],
  [2, 'Melyik városnál ömlik a Bodrog a Tiszába?', 'Tokajnál', ['Szegednél', 'Szolnoknál', 'Csongrádnál'], 'Ott, ahol a híres borvidék is van.'],
  [2, 'Melyik folyó vezeti le a Balaton vizét a Dunába?', 'a Sió', ['a Zala', 'a Rába', 'a Kapos'], 'Siófoknál indul ki a tóból.'],
  [2, 'Melyik folyó a Balaton legnagyobb befolyója?', 'a Zala', ['a Sió', 'a Rába', 'a Dráva'], 'Nyugatról, a Kis-Balatonon át érkezik.'],
  [2, 'Melyik folyó jelöli ki a határ egy részét Horvátország felé?', 'a Dráva', ['a Rába', 'a Zagyva', 'a Sió'], 'Hazánk déli határán folyik, Barcs mellett.'],
  [2, 'Melyik folyó jelöli ki a határ egy részét Szlovákia felé (a Duna mellett)?', 'az Ipoly', ['a Dráva', 'a Maros', 'a Rába'], 'Nógrád megye északi szélén folyik.'],
  [2, 'Melyik folyó partján fekszik Szeged?', 'a Tisza', ['a Duna', 'a Rába', 'a Zagyva'], 'Szeged az Alföld déli részén van.'],
  [2, 'A Duna melyik partján fekszik Buda?', 'a jobb partján', ['a bal partján', 'a forrásánál', 'a torkolatánál'], 'A partot mindig a folyás irányába nézve nevezzük meg. A Duna délre folyik; dél felé nézve jobb kéz felől van Buda.'],
  [2, 'Hogyan döntjük el, melyik a folyó jobb partja?', 'a folyás irányába nézve jobb kéz felőli part', ['a forrás felé nézve jobb kéz felőli part', 'mindig a nagyobb város felőli part', 'mindig a keleti part'], 'Képzeld el, hogy csónakban ülsz, és a víz visz előre.'],
  [3, 'Hol ered a Duna?', 'Németországban, a Fekete-erdőben', ['Ausztriában', 'Szlovákiában', 'Romániában'], 'Nyugaton ered, és keletre, a Fekete-tengerig folyik.'],
  [3, 'Hol ered a Tisza?', 'Ukrajnában, a Kárpátokban', ['Ausztriában, az Alpokban', 'Szlovákiában', 'Szerbiában'], 'Északkeletről érkezik hazánkba.'],
  [3, 'Hová ömlik a Tisza?', 'a Dunába, Szerbiában', ['a Balatonba', 'egyenesen a Fekete-tengerbe', 'a Marosba'], 'A Tisza is a Duna mellékfolyója.'],
  [3, 'Hány országon folyik át a Duna?', '10', ['4', '6', '15'], 'Ez a világ legtöbb országán átfolyó folyója.'],
  [3, 'Mi a tiszavirág?', 'egy rovar (kérész), amely júniusban tömegesen rajzik a Tisza felett', ['egy vízinövény', 'egy hal', 'egy madár'], 'Csak néhány óráig él kifejlett rovarként.'],
  [3, 'Mit nevezünk árvíznek?', 'amikor a folyó vize kilép a medréből', ['amikor kiszárad a folyó', 'amikor befagy a folyó', 'amikor tiszta a víz'], 'Hóolvadás vagy sok eső után történhet.'],
  [3, 'Mi védi a településeket az árvíztől?', 'a gát (töltés)', ['a híd', 'a kikötő', 'a vízimalom'], 'A folyó mentén magas földsáncot építenek.'],
  [3, 'Melyik tó vize gyógyvíz, és télen is meleg?', 'a Hévízi-tó', ['a Velencei-tó', 'a Fertő tó', 'a Tisza-tó'], 'Keszthely közelében, Zala megyében van.']
];
function riverSvg() {
  let s = `<rect x="0" y="0" width="240" height="300" fill="#d8f5a2"/><path d="M0 0 L240 0 L240 12 Q120 20 0 12Z" fill="#e7f5ff"/>`;
  s += `<path d="M0 72 L30 22 L58 58 L84 18 L118 70Z" fill="#a9845c" stroke="#7a5c3a" stroke-width="2"/><path d="M76 30 L84 18 L92 30Z" fill="#fff"/><path d="M24 32 L30 22 L36 32Z" fill="#fff"/>`;
  s += `<rect x="0" y="262" width="240" height="38" fill="#4dabf7"/><path d="M0 262 q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="#4dabf7"/>`;
  s += `<path d="M60 62 C66 90 84 110 96 130" fill="none" stroke="#339af0" stroke-width="4" stroke-linecap="round"/>`;
  s += `<path d="M96 130 C110 155 118 170 120 190" fill="none" stroke="#339af0" stroke-width="8" stroke-linecap="round"/>`;
  s += `<path d="M120 190 C124 220 132 240 138 266" fill="none" stroke="#339af0" stroke-width="14" stroke-linecap="round"/>`;
  s += `<path d="M228 60 C200 90 180 120 168 150 C156 175 140 185 121 192" fill="none" stroke="#339af0" stroke-width="5" stroke-linecap="round"/>`;
  s += `<circle cx="60" cy="62" r="5" fill="#1c7ed6"/><path d="M128 210 l0 22 M124 226 l4 6 l4 -6" stroke="#1864ab" stroke-width="2" fill="none"/>`;
  s += `<text x="200" y="290" font-size="13" fill="#fff" font-weight="700">tenger</text>`;
  return svg(240, 300, s, 'riverfig');
}
const riverLabel = () => Math.random() < .55
  ? labelQ('Címkézd fel a folyó részeit!', riverSvg(), [{ name: 'forrás', x: 25, y: 21 }, { name: 'mellékfolyó', x: 71, y: 44 }, { name: 'főfolyó', x: 52, y: 72 }, { name: 'torkolat', x: 57, y: 88 }], { hint: 'A folyó a forrásnál ered, a torkolatnál ömlik a tengerbe. A mellékfolyó a nagyobb főfolyóba ömlik.' })
  : labelQ('Melyik a folyó jobb és bal partja? (A kis nyíl mutatja, merre folyik a víz.)', riverSvg(), [{ name: 'forrás', x: 25, y: 21 }, { name: 'jobb part', x: 37, y: 73 }, { name: 'bal part', x: 72, y: 73 }, { name: 'torkolat', x: 57, y: 88 }], { hint: 'A folyás irányába nézz (lefelé)! Ilyenkor a jobb kezed felé eső part a jobb part. Lefelé nézve a jobb kezed a kép bal oldalán van.' });
const RIVER_RIDDLES = [
  [['Rövid folyó vagyok a Dunántúlon.', 'Egy nagy üdülővárosból, a Balaton déli partjáról indulok.', 'Zsilip szabályozza a vizemet.', 'Én vezetem le a Balaton vizét a Dunába.'], 'Sió', ['Zala', 'Rába', 'Kapos']],
  [['Folyó vagyok a Dunántúl nyugati részén.', 'Göcsej dombjai között kanyargok.', 'A Kis-Balatonon át érkezem.', 'Én vagyok a Balaton legnagyobb befolyója.'], 'Zala', ['Sió', 'Rába', 'Mura']],
  [['Folyó vagyok, az Alpokban erednek a forrásaim.', 'Hazánk déli határán folyok.', 'Barcs városa mellett is elhaladok.', 'Horvátország és Magyarország között határt alkotok, aztán a Dunába ömlök.'], 'Dráva', ['Mura', 'Rába', 'Sió']],
  [['Szlovákiából érkezem.', 'Sárospatak mellett folyok el.', 'Tokajnál ömlök a Tiszába.', 'Rólam kapta a nevét a Bodrogköz.'], 'Bodrog', ['Sajó', 'Hernád', 'Zagyva']],
  [['Folyó vagyok, Ausztriából érkezem.', 'Szentgotthárdnál lépek be hazánkba.', 'Vas megyén kanyargok keresztül.', 'Győrnél ömlök a Mosoni-Dunába.'], 'Rába', ['Zala', 'Dráva', 'Lajta']]
];
const RIVER_SORT = L => sortQ('Folyó vagy tó? Válogasd szét!', { 'folyó': ['Duna', 'Tisza', 'Rába', 'Dráva', 'Körös', 'Zagyva', 'Maros', 'Sajó'], 'tó': ['Balaton', 'Velencei-tó', 'Fertő tó', 'Tisza-tó', 'Hévízi-tó'] }, 3, { hint: 'A folyó vize folyik egy irányba. A tó vize egy helyben marad. Vigyázz: a Tisza folyó, de a Tisza-tó tó!' });
const RIVER_BUILDS = [
  { prompt: 'Rakd sorba a víz útját a forrástól a tengerig! Koppints rájuk sorban.', answer: ['forrás', 'patak', 'folyó', 'torkolat'], hint: 'A forrásból kis patak lesz, a patakokból folyó, a folyó a torkolatnál ér a tengerbe.' },
  { prompt: 'Rakd sorba a víz körforgását! Kezdd a párolgással.', answer: ['párolgás', 'felhőképződés', 'csapadékhullás', 'lefolyás'], hint: 'A Nap melegére a víz elpárolog, a gőzből felhő lesz, a felhőből eső hull, az eső a patakokon, folyókon át visszafolyik a tengerbe.' }
];
K4.folyok = L => {
  const r = Math.random(), fact = () => factQ(pick(RIVER_FACTS.filter(f => f[0] === L || (L === 3 && f[0] === 2 && Math.random() < .3))));
  const rid = () => { const [cl, a, w] = pick(RIVER_RIDDLES); return riddleQ(cl, a, w); };
  const build = () => { const b = pick(RIVER_BUILDS); return { type: 'build', prompt: b.prompt, answer: b.answer, tiles: shuffle(b.answer), hint: b.hint, explain: b.answer.join(' → ') }; };
  if (L === 1) return r < .55 ? fact() : r < .7 ? RIVER_SORT(L) : r < .85 ? build() : riverLabel();
  if (L === 2) return r < .4 ? fact() : r < .6 ? riverHl() : r < .75 ? tribQ() : r < .9 ? riverLabel() : build();
  return r < .35 ? fact() : r < .55 ? riverHl() : r < .7 ? rid() : r < .85 ? tribQ() : build();
};

/* Föld, Nap, Hold */
function moonSvg(ph) {
  const lit = '#ffe066', dark = '#2b3550';
  let s = `<rect x="0" y="0" width="140" height="140" rx="16" fill="#101829"/><circle cx="24" cy="26" r="1.6" fill="#fff"/><circle cx="118" cy="114" r="1.4" fill="#fff"/><circle cx="112" cy="22" r="1.2" fill="#fff"/>`;
  s += `<circle cx="70" cy="70" r="48" fill="${ph === 'telihold' ? lit : dark}" stroke="#56627f" stroke-width="1.5"/>`;
  if (ph === 'növő') s += `<path d="M70 22 A48 48 0 0 1 70 118 Z" fill="${lit}"/>`;
  if (ph === 'fogyó') s += `<path d="M70 22 A48 48 0 0 0 70 118 Z" fill="${lit}"/>`;
  return svg(140, 140, s, 'moonfig');
}
const MOON = { 'újhold': 'újhold', 'növő': 'növő hold (első negyed)', 'telihold': 'telihold', 'fogyó': 'fogyó hold (utolsó negyed)' };
const moonQ = () => { const k = pick(Object.keys(MOON)); return { type: 'choice', prompt: 'Melyik holdfázist látod?', visual: moonSvg(k), answer: MOON[k], options: shuffle(Object.values(MOON)).map(v => ({ value: v, html: v })), answerText: MOON[k], hint: 'Ha a Hold világos része olyan, mint a D betű, akkor dagad, vagyis nő. Ha olyan, mint a C betű, akkor csökken, vagyis fogy. Újholdkor nem látjuk, teliholdkor kerek.' }; };
const SPACE_FACTS = [
  [1, 'Mi a Nap?', 'egy csillag', ['egy bolygó', 'egy hold', 'egy felhő'], 'A Nap egy hatalmas, izzó gázgömb: csillag. Fényt és meleget ad.'],
  [1, 'Mi a Föld?', 'egy bolygó', ['egy csillag', 'egy hold', 'egy üstökös'], 'A Föld a Nap körül keringő bolygó.'],
  [1, 'Melyik égitest kering a Föld körül?', 'a Hold', ['a Nap', 'a Mars', 'a Sarkcsillag'], 'A Hold a Föld kísérője.'],
  [1, 'Mi okozza, hogy váltakozik a nappal és az éjszaka?', 'a Föld forog a tengelye körül', ['a Hold eltakarja a Napot', 'a Nap éjszakára kialszik', 'a felhők'], 'A Földnek mindig az a fele van nappalban, amelyik a Nap felé néz.'],
  [1, 'Merre kel fel a Nap?', 'keleten', ['nyugaton', 'északon', 'délen'], 'Keleten kel, nyugaton nyugszik.'],
  [1, 'Merre nyugszik le a Nap?', 'nyugaton', ['keleten', 'északon', 'délen'], 'Keleten kel, nyugaton nyugszik.'],
  [1, 'Világít-e a Hold magától?', 'nem, a Nap fényét veri vissza', ['igen, mint egy lámpa', 'csak télen', 'csak teliholdkor'], 'A Hold olyan, mint egy tükör, a napfényt veri vissza.'],
  [1, 'Hány évszak van nálunk?', '4', ['2', '3', '6'], 'Tavasz, nyár, ősz, tél.'],
  [2, 'Mennyi idő alatt fordul meg a Föld egyszer a tengelye körül?', '1 nap (24 óra)', ['1 hét', '1 hónap', '1 év'], 'Ezért tart egy nap 24 óráig.'],
  [2, 'Mennyi idő alatt kerüli meg a Föld a Napot?', '1 év', ['1 nap', '1 hét', '1 hónap'], 'Egy év alatt egyszer kerüli meg, közben váltakoznak az évszakok.'],
  [2, 'Körülbelül mennyi idő alatt kerüli meg a Hold a Földet?', 'körülbelül 1 hónap', ['1 nap', '1 hét', '1 év'], 'A holdfázisok is ennyi idő alatt ismétlődnek.'],
  [2, 'Merre látjuk délben a Napot?', 'délen, a legmagasabban', ['északon, a legalacsonyabban', 'keleten, a látóhatáron', 'nyugaton, lenyugodva'], 'Délben a Nap delel: a legmagasabban áll az égen, déli irányban.'],
  [2, 'Hányadik bolygó a Föld a Naptól számítva?', 'a harmadik', ['az első', 'az ötödik', 'a nyolcadik'], 'Merkúr, Vénusz, Föld, Mars, Jupiter, Szaturnusz, Uránusz, Neptunusz.'],
  [2, 'Hány bolygó kering a Nap körül?', '8', ['5', '12', '20'], 'Merkúr, Vénusz, Föld, Mars, Jupiter, Szaturnusz, Uránusz, Neptunusz.'],
  [2, 'Mi okozza az évszakok váltakozását?', 'a Föld ferde tengellyel kering a Nap körül', ['a Hold néha eltakarja a Napot', 'a Nap néha erősebben ég', 'a felhők mennyisége'], 'Nyáron a mi oldalunk a Nap felé dől, ezért melegebb van és hosszabbak a nappalok.'],
  [3, 'Melyik a Naprendszer legnagyobb bolygója?', 'a Jupiter', ['a Föld', 'a Mars', 'a Merkúr'], 'Óriási gázbolygó, több mint ezer Föld férne el benne.'],
  [3, 'Melyik bolygó van a legközelebb a Naphoz?', 'a Merkúr', ['a Vénusz', 'a Föld', 'a Mars'], 'Az első bolygó a Naptól.'],
  [3, 'Melyiket hívják vörös bolygónak?', 'a Marsot', ['a Jupitert', 'a Vénuszt', 'a Szaturnuszt'], 'Vöröses színű a talaja miatt.'],
  [3, 'Melyik bolygónak vannak feltűnő, széles gyűrűi?', 'a Szaturnusznak', ['a Marsnak', 'a Merkúrnak', 'a Földnek'], 'A gyűrűk jégből és kőzetdarabokból állnak.'],
  [3, 'Mikor a leghosszabb nálunk a nappal?', 'június 21. körül, nyáron', ['december 21. körül', 'március 1-jén', 'november 1-jén'], 'Ez a nyári napforduló.'],
  [3, 'Mikor a legrövidebb nálunk a nappal?', 'december 21. körül, télen', ['június 21. körül', 'augusztus 20-án', 'április 1-jén'], 'Ez a téli napforduló.'],
  [3, 'Mi a napéjegyenlőség?', 'amikor a nappal és az éjszaka egyforma hosszú', ['amikor nincs éjszaka', 'amikor a Hold eltakarja a Napot', 'amikor telihold van'], 'Tavasszal (március 20–21. körül) és ősszel (szeptember 22–23. körül) van.'],
  [3, 'Melyik csillag segít éjszaka megtalálni az északi irányt?', 'a Sarkcsillag', ['a Nap', 'a Hold', 'a Vénusz'], 'A Göncölszekér segítségével lehet megtalálni.']
];
const SPACE_RIDDLES = [
  [['Égitest vagyok, éjszaka gyakran látsz.', 'Nem világítok magamtól, a Nap fényét verem vissza.', 'Néha kerek vagyok, néha csak egy vékony sarló.', 'A Föld körül keringek, nagyjából egy hónap alatt.'], 'Hold', ['Nap', 'Mars', 'Sarkcsillag']],
  [['Csillag vagyok.', 'Fényt és meleget adok.', 'A bolygók körülöttem keringenek.', 'Nappal az égen látsz, de belém nézni veszélyes!'], 'Nap', ['Hold', 'Föld', 'Jupiter']],
  [['Bolygó vagyok.', 'A harmadik vagyok a Naptól számítva.', 'Felszínem nagy részét víz borítja.', 'Rajtam élsz te is!'], 'Föld', ['Mars', 'Vénusz', 'Hold']],
  [['Bolygó vagyok, a Föld szomszédja.', 'Vöröses színű vagyok.', 'Robotjárművek kutatják a felszínemet.', 'Nevemet a háború római istenéről kaptam.'], 'Mars', ['Vénusz', 'Jupiter', 'Merkúr']]
];
const SPACE_SORT = L => sortQ('Csillag vagy bolygó? Válogasd szét!', { 'csillag': ['Nap', 'Sarkcsillag', 'Szíriusz'], 'bolygó': ['Föld', 'Mars', 'Jupiter', 'Vénusz', 'Szaturnusz', 'Merkúr'] }, L === 1 ? 2 : 3, { hint: 'A csillag maga világít (például a Nap). A bolygó egy csillag körül kering, és nem világít magától.' });
const planetBuild = L => { const ans = ['Merkúr', 'Vénusz', 'Föld', 'Mars', 'Jupiter'].slice(0, L === 3 ? 5 : 4); return { type: 'build', prompt: 'Rakd sorba a bolygókat a Naptól kezdve! Koppints rájuk sorban.', answer: ans, tiles: shuffle(ans), hint: 'A Naptól kifelé: Merkúr, Vénusz, Föld, Mars, Jupiter, Szaturnusz, Uránusz, Neptunusz.', explain: ans.join(' → ') }; };
K4.fold = L => {
  const r = Math.random(), fact = () => factQ(pick(SPACE_FACTS.filter(f => f[0] === L || (L === 3 && f[0] === 2 && Math.random() < .3))));
  if (L === 1) return r < .65 ? fact() : r < .8 ? SPACE_SORT(L) : (() => { const [cl, a, w] = pick(SPACE_RIDDLES); return riddleQ(cl, a, w); })();
  if (L === 2) return r < .5 ? fact() : r < .7 ? moonQ() : r < .85 ? planetBuild(L) : SPACE_SORT(L);
  return r < .5 ? fact() : r < .65 ? moonQ() : r < .8 ? planetBuild(L) : (() => { const [cl, a, w] = pick(SPACE_RIDDLES); return riddleQ(cl, a, w); })();
};

/* Térképolvasás */
const SYMBOLS = {
  'város': '<circle cx="70" cy="45" r="11" fill="#1d2742"/>',
  'hegycsúcs': '<path d="M52 60 L70 26 L88 60Z" fill="#7a4b26"/>',
  'folyó': '<path d="M14 54 C34 30 52 66 72 44 S108 26 126 44" fill="none" stroke="#1c7ed6" stroke-width="7" stroke-linecap="round"/>',
  'tó': '<path d="M36 46 C34 26 70 18 96 28 C120 38 110 64 80 66 C56 68 38 62 36 46Z" fill="#4dabf7" stroke="#1c7ed6" stroke-width="2"/>',
  'vasútvonal': '<line x1="10" y1="45" x2="130" y2="45" stroke="#1d2742" stroke-width="9"/><line x1="10" y1="45" x2="130" y2="45" stroke="#fff" stroke-width="4" stroke-dasharray="12 12"/>',
  'országhatár': '<line x1="10" y1="45" x2="130" y2="45" stroke="#c92a2a" stroke-width="5" stroke-dasharray="14 6 3 6"/>',
  'erdő': '<rect x="14" y="16" width="112" height="58" rx="8" fill="#b2f2bb"/>' + [[38, 52], [62, 40], [86, 54], [108, 40]].map(([x, y]) => `<path d="M${x} ${y - 16} L${x - 9} ${y + 2} L${x + 9} ${y + 2}Z" fill="#2b8a3e"/><rect x="${x - 2}" y="${y + 2}" width="4" height="6" fill="#7a4b26"/>`).join(''),
  'vár': '<path d="M50 66 L50 34 L56 34 L56 28 L62 28 L62 34 L68 34 L68 28 L74 28 L74 34 L80 34 L80 28 L86 28 L86 34 L90 34 L90 66Z" fill="#868e96" stroke="#1d2742" stroke-width="2"/><rect x="64" y="50" width="12" height="16" fill="#1d2742"/>'
};
const symQ = () => { const k = pick(Object.keys(SYMBOLS)); return { type: 'choice', prompt: 'Mit jelöl ez a térképjel?', visual: svg(140, 90, `<rect x="2" y="2" width="136" height="86" rx="10" fill="#fff" stroke="#ced4da" stroke-width="2"/>${SYMBOLS[k]}`, 'symfig'), answer: k, options: shuffle([k, ...shuffle(Object.keys(SYMBOLS).filter(x => x !== k)).slice(0, 3)]).map(v => ({ value: v, html: v })), answerText: k, hint: 'A térkép jeleit a jelmagyarázat magyarázza meg. Kék: víz. Barna háromszög: hegycsúcs. Pötty: település.' }; };
const COLORS = [['#69db7c', 'síkság (alföld)'], ['#ffe066', 'dombság'], ['#c0915e', 'hegység'], ['#4dabf7', 'víz (folyó, tó, tenger)']];
const colorQ = () => { const [c, a] = pick(COLORS); return { type: 'choice', prompt: 'Mit jelöl a domborzati térképen ez a szín?', visual: svg(140, 70, `<rect x="10" y="8" width="120" height="54" rx="10" fill="${c}" stroke="#1d2742" stroke-width="2"/>`, 'symfig'), answer: a, options: shuffle(COLORS.map(x => x[1])).map(v => ({ value: v, html: v })), answerText: a, hint: 'Zöld: síkság. Sárga: dombság. Barna: hegység; minél sötétebb, annál magasabb. Kék: víz; minél sötétebb, annál mélyebb.' }; };
const MAP_FACTS = [
  [1, 'Melyik irány van a térképen általában felül?', 'észak', ['dél', 'kelet', 'nyugat'], 'Fent az észak, lent a dél, jobbra a kelet, balra a nyugat.'],
  [1, 'Hogy hívjuk a térkép jeleinek magyarázatát?', 'jelmagyarázat', ['méretarány', 'iránytű', 'alaprajz'], 'A térkép szélén egy kis táblázat mondja meg, melyik jel mit jelent.'],
  [1, 'Hogy hívjuk a felülről nézett rajzot egy szobáról vagy egy házról?', 'alaprajz', ['jelmagyarázat', 'fénykép', 'domborzati térkép'], 'Felülről nézve a bútorok csak a „talpukat” mutatják.'],
  [1, 'Milyen színnel jelöli a térkép a vizeket?', 'kékkel', ['zölddel', 'barnával', 'sárgával'], 'A folyók, tavak és tengerek kékek.'],
  [2, 'Mit jelent, ha a barna szín egyre sötétebb?', 'a hegy egyre magasabb', ['a víz egyre mélyebb', 'a város egyre nagyobb', 'egyre több az erdő'], 'A domborzati térképen a sötétebb barna magasabb helyet jelöl.'],
  [2, 'Mit jelent, ha a kék szín egyre sötétebb?', 'a víz egyre mélyebb', ['a hegy egyre magasabb', 'egyre hidegebb van', 'a folyó egyre gyorsabb'], 'A sötétebb kék mélyebb vizet jelöl.'],
  [2, 'Mit mutat meg a méretarány?', 'hányszor kisebb a térkép a valóságnál', ['merre van észak', 'milyen magas a hegy', 'mi a város neve'], 'Például: 1 cm a térképen = 1 km a valóságban.'],
  [2, 'Mire használjuk az iránytűt?', 'a világtájak meghatározására', ['a hőmérséklet mérésére', 'a távolság mérésére', 'az idő mérésére'], 'Az iránytű tűje mindig észak felé mutat.'],
  [2, 'Mit tegyél, hogy a térkép iránya egyezzen a valósággal?', 'tájolom: a térkép északját észak felé fordítom', ['fejjel lefelé tartom', 'összehajtom', 'nem számít, hogyan tartom'], 'Ezt hívjuk a térkép tájolásának.']
];
const scaleQ = () => {
  const k = pick([1, 2, 5, 10]), n = ri(2, 9);
  return Math.random() < .6
    ? { type: 'input', prompt: `A térképen 1 cm a valóságban ${k} km. Két falu a térképen ${n} cm-re van egymástól. Hány km a távolság a valóságban?`, answer: n * k, hint: `Minden centiméter ${k} km. Szorozd meg: ${n} · ${k}.` }
    : { type: 'input', prompt: `A térképen 1 cm a valóságban ${k} km. Két város a valóságban ${n * k} km-re van egymástól. Hány cm a távolság a térképen?`, answer: n, hint: `Hányszor van meg a ${k} km-ben a ${n * k} km? Oszd el: ${n * k} : ${k}.` };
};
K4.terkepolv = L => {
  const r = Math.random(), fact = () => factQ(pick(MAP_FACTS.filter(f => f[0] === Math.min(L, 2))));
  if (L === 1) return r < .45 ? symQ() : r < .7 ? colorQ() : fact();
  if (L === 2) return r < .3 ? symQ() : r < .5 ? colorQ() : r < .8 ? fact() : scaleQ();
  return r < .5 ? scaleQ() : r < .7 ? symQ() : r < .85 ? colorQ() : fact();
};
/* ---------- NAT 2020 / kerettanterv: further units of grade 4 ---------- */
const topicFrom = (facts, extras) => L => { const ex = (extras[L] || []).filter(Boolean); if (ex.length && Math.random() < ex.length * .15) return pick(ex)(L); const pool = facts.filter(f => f[0] === L); return factQ(pick(pool.length ? pool : facts)); };

/* Hang és fény */
const SOUND_LIGHT = [
  [1, 'Mi továbbítja a hangot a fülünkig?', 'a levegő rezgése', ['a fény', 'a szél', 'a meleg'], 'A hangforrás rezeg, a rezgést a levegő viszi tovább a fülünkig.'],
  [1, 'Mivel érzékeljük a hangokat?', 'a fülünkkel', ['a szemünkkel', 'az orrunkkal', 'a nyelvünkkel'], 'A hallás érzékszerve a fül.'],
  [1, 'Mi keletkezik, ha egy tárgy útját állja a fénynek?', 'árnyék', ['szivárvány', 'visszhang', 'tükörkép'], 'A fény nem tud átmenni az átlátszatlan tárgyon, mögötte sötét folt, árnyék lesz.'],
  [1, 'Mi veri vissza a fényt, úgyhogy látjuk benne magunkat?', 'a tükör', ['a fal', 'a fa', 'a kő'], 'A sima, fényes felület visszaveri a fényt.'],
  [1, 'Melyik hang mély?', 'a medve brummogása', ['a kismadár csipogása', 'a síp hangja', 'a szúnyog zümmögése'], 'A nagy testű állatok és a nagy hangszerek hangja általában mély.'],
  [2, 'Mi a visszhang?', 'a hang visszaverődése egy falról vagy hegyoldalról', ['a nagyon halk hang', 'a madarak éneke', 'a fény visszaverődése'], 'A hang nekiütközik egy nagy felületnek, és visszajön hozzánk.'],
  [2, 'Hogyan terjed a fény?', 'egyenes vonalban', ['csak körbe-körbe', 'cikcakkban', 'csak felfelé'], 'Ezért nem látunk be a sarok mögé.'],
  [2, 'Mivé bontja a prizma a fehér fényt?', 'a szivárvány színeire', ['fekete és fehér csíkokra', 'hanggá', 'meleggé'], 'A fehér fény valójában sok szín keveréke.'],
  [2, 'Miért hallunk hangot, amikor megpendítjük a gitár húrját?', 'mert a húr rezeg', ['mert a húr világít', 'mert a húr meleg lesz', 'mert a húr elszakad'], 'Minden hang rezgésből születik.'],
  [2, 'Mit tehetsz a füled védelmében?', 'nem hallgatok túl hangos zenét fülhallgatóval', ['mindig nagyon hangosan hallgatok zenét', 'ceruzával tisztítom a fülem', 'semmit sem kell tennem'], 'A túl erős hang tartósan károsíthatja a hallást.'],
  [3, 'Miért nincs hang a világűrben?', 'mert nincs levegő, ami továbbítaná', ['mert túl hideg van', 'mert túl sötét van', 'mert túl messze van a Nap'], 'A hanghoz kell valami (levegő, víz), ami rezgésbe jön.'],
  [3, 'Mikor a legrövidebb az árnyékunk egy napsütéses napon?', 'délben', ['reggel', 'este', 'egész nap ugyanakkora'], 'Délben áll a Nap a legmagasabban, ezért ekkor a legrövidebb az árnyék.'],
  [3, 'Miért látjuk a Holdat éjszaka?', 'mert visszaveri a Nap fényét', ['mert maga világít', 'mert a Föld megvilágítja lámpákkal', 'mert benne tűz ég'], 'A Hold nem fényforrás, csak visszaveri a fényt.'],
  [3, 'Mi szükséges ahhoz, hogy lássunk egy tárgyat?', 'a tárgyról fény jusson a szemünkbe', ['a tárgy legyen hangos', 'a tárgy legyen meleg', 'csukott szem'], 'Sötétben ezért nem látunk semmit.']
];
const LIGHT_SORT = L => sortQ('Átlátszó, áttetsző vagy átlátszatlan? Válogasd szét!', { 'átlátszó': ['ablaküveg', 'tiszta víz', 'celofán', 'szemüveglencse'], 'áttetsző': ['tejüveg', 'sütőpapír', 'jégvirágos ablak', 'vékony függöny'], 'átlátszatlan': ['fa', 'kő', 'karton', 'tégla', 'vaslap'] }, L === 1 ? 1 : 2, { hint: 'Átlátszó: tisztán átlátsz rajta. Áttetsző: átjut a fény, de homályosan látsz. Átlátszatlan: a fény nem jut át.' });
K4.hangfeny = topicFrom(SOUND_LIGHT, { 1: [LIGHT_SORT], 2: [LIGHT_SORT], 3: [LIGHT_SORT] });

/* Mozgás */
const MOTION = [
  [1, 'Hogyan mozog a hal?', 'úszik', ['repül', 'ugrik', 'kúszik'], 'A hal uszonyaival úszik a vízben.'],
  [1, 'Hogyan mozog a kígyó?', 'kúszik', ['repül', 'fut', 'ugrik'], 'Nincs lába, a testével kígyózva halad.'],
  [1, 'Melyik állat repül?', 'a denevér', ['a vakond', 'a sün', 'a csiga'], 'A denevér emlős, de bőrszárnyaival repül.'],
  [1, 'Mi segíti a kacsát az úszásban?', 'az úszóhártyás lába', ['a hosszú farka', 'a csőre', 'a fülei'], 'Az ujjai között bőrhártya van, mint egy evező.'],
  [1, 'Mi segíti a vakondot az ásásban?', 'a lapátszerű mellső lába', ['a hosszú farka', 'a szárnya', 'a nagy füle'], 'Erős, széles mellső lábával túrja a földet.'],
  [2, 'Milyen mozgás, amikor az elinduló autó egyre gyorsabban megy?', 'gyorsuló mozgás', ['egyenletes mozgás', 'lassuló mozgás', 'nem mozog'], 'Ha egyre nagyobb lesz a sebesség, a mozgás gyorsuló.'],
  [2, 'Milyen mozgás, amikor a mozgólépcső mindig ugyanolyan sebesen halad?', 'egyenletes mozgás', ['gyorsuló mozgás', 'lassuló mozgás', 'ütközés'], 'Ha a sebesség nem változik, a mozgás egyenletes.'],
  [2, 'Mi történik, amikor a biciklis fékez?', 'lassul a mozgása', ['gyorsul a mozgása', 'egyenletesen halad tovább', 'felfelé repül'], 'A fékezés csökkenti a sebességet.'],
  [2, 'Mi segíti a madarat a repülésben?', 'a szárnya, a tollai és a könnyű csontjai', ['a nehéz csontjai', 'a négy lába', 'a pikkelyei'], 'A madár csontjai üregesek, ezért könnyűek.'],
  [2, 'Mivel kapaszkodik a mókus a fán?', 'éles karmaival', ['úszóhártyájával', 'a csőrével', 'a patájával'], 'Ügyesen fut fel a fatörzsön, és ágról ágra ugrál.'],
  [2, 'Melyik a ló leglassabb járásmódja?', 'lépés', ['ügetés', 'vágta', 'galopp'], 'A ló járásmódjai: lépés, ügetés, vágta (galopp).'],
  [3, 'Mi segíti a lovat a gyors futásban?', 'hosszú, erős lábai és kemény patái', ['rövid lábai', 'úszóhártyája', 'szárnyai'], 'A ló testfelépítése a gyors futáshoz alkalmazkodott.'],
  [3, 'Mi történik, amikor két biliárdgolyó összeütközik?', 'megváltozik a mozgásuk iránya és sebessége', ['mindkettő megáll örökre', 'összeolvadnak', 'semmi sem változik'], 'Ütközéskor a testek mozgása megváltozik.'],
  [3, 'Miért áramvonalas a hal teste?', 'hogy könnyebben haladjon a vízben', ['hogy jobban lásson', 'hogy repülni tudjon', 'hogy melegebb legyen'], 'A hegyes, sima test könnyen hasítja a vizet.'],
  [3, 'Melyik szárazföldi állat a leggyorsabb futó?', 'a gepárd', ['a ló', 'a nyúl', 'az elefánt'], 'Rövid távon a gepárd fut a leggyorsabban.']
];
const MOVE_SORT = L => sortQ('Hogyan mozognak? Válogasd szét!', { 'repül': [['fecske', '🐦'], ['denevér', '🦇'], ['lepke', '🦋'], ['méh', '🐝']], 'úszik': [['ponty', '🐟'], ['delfin', '🐬'], ['bálna', '🐋']], 'ugrik': [['béka', '🐸'], ['kenguru', '🦘'], ['szöcske', '🦗']], 'kúszik, csúszik': [['kígyó', '🐍'], ['csiga', '🐌'], ['giliszta', '🪱']] }, L === 3 ? 2 : 1, { hint: 'Gondold végig, mije van az állatnak: szárnya, uszonya, erős hátsó lába, vagy egyáltalán nincs lába.' });
K4.mozgas = topicFrom(MOTION, { 1: [MOVE_SORT], 2: [MOVE_SORT], 3: [MOVE_SORT] });

/* Haszonnövények, háziállatok, idénygyümölcsök */
const FARM = [
  [1, 'Mit kapunk a tehéntől?', 'tejet', ['gyapjút', 'tojást', 'mézet'], 'A tehén tejéből vaj, sajt, túró is készül.'],
  [1, 'Mit kapunk a juhtól?', 'gyapjút', ['tojást', 'mézet', 'tollat'], 'A juh gyapjából fonal, abból pulóver készül.'],
  [1, 'Mit kapunk a méhektől?', 'mézet', ['tejet', 'gyapjút', 'tojást'], 'A méhek a virágok nektárjából készítik.'],
  [1, 'Hogy hívják a tehén kicsinyét?', 'borjú', ['csikó', 'bárány', 'malac'], 'Tehén – borjú, ló – csikó, juh – bárány, disznó – malac.'],
  [1, 'Hogy hívják a ló kicsinyét?', 'csikó', ['borjú', 'gida', 'malac'], 'Tehén – borjú, ló – csikó, juh – bárány, disznó – malac.'],
  [1, 'Hogy hívják a juh kicsinyét?', 'bárány', ['csikó', 'borjú', 'gida'], 'Tehén – borjú, ló – csikó, juh – bárány, kecske – gida.'],
  [1, 'Hogy hívják a kecske kicsinyét?', 'gida', ['bárány', 'csikó', 'borjú'], 'A kecske kicsinye a gida.'],
  [1, 'Melyik növény magjából lesz a liszt, abból pedig a kenyér?', 'a búza', ['a napraforgó', 'a cukorrépa', 'a burgonya'], 'A búzát learatják, megőrlik, a lisztből kenyeret sütnek.'],
  [2, 'Miből készül a cukor nálunk?', 'cukorrépából', ['búzából', 'burgonyából', 'napraforgóból'], 'A cukorrépa gyökerében sok cukor van.'],
  [2, 'Melyik növény magjából préselnek étolajat?', 'a napraforgóéból', ['a búzáéból', 'a cukorrépáéból', 'a burgonyáéból'], 'A napraforgó és a repce magjából olaj készül.'],
  [2, 'Melyik részét esszük a burgonyának?', 'a gumóját', ['a virágát', 'a levelét', 'a termését'], 'A gumó a föld alatt fejlődik.'],
  [2, 'Mi a neve a tyúk párjának?', 'kakas', ['bika', 'kos', 'bak'], 'Tyúk – kakas, tehén – bika, juh – kos, kecske – bak.'],
  [2, 'Mi a neve a tehén párjának?', 'bika', ['kakas', 'kos', 'kan'], 'Tyúk – kakas, tehén – bika, juh – kos, disznó – kan.'],
  [2, 'Mi a neve a juh párjának?', 'kos', ['bika', 'bak', 'kakas'], 'Juh – kos, kecske – bak, tehén – bika.'],
  [2, 'Melyik gyümölcs érik nálunk ősszel?', 'a szőlő', ['a cseresznye', 'a kajszibarack', 'a görögdinnye'], 'Ősszel érik a szőlő, az alma, a dió.'],
  [2, 'Melyik gyümölcs érik nálunk kora nyáron?', 'a cseresznye', ['a szőlő', 'a dió', 'a gesztenye'], 'Júniusban érik a cseresznye.'],
  [3, 'Miért jó az idényzöldséget és -gyümölcsöt választani?', 'frissebb, és nem kell messziről szállítani', ['mert drágább', 'mert télen terem', 'mert nincs benne vitamin'], 'Ami nálunk éppen megérik, azt nem kell sokáig szállítani és tárolni.'],
  [3, 'Mi a háziállat?', 'olyan állat, amelyet az ember tart és gondoz', ['olyan állat, amely csak az erdőben él', 'csak a kutya', 'minden vadon élő állat'], 'A háziállatokat az ember szelídítette meg, és gondoskodik róluk.'],
  [3, 'Mi a haszonnövény?', 'olyan növény, amelyet az ember termeszt valamilyen haszonért', ['minden vadvirág', 'a gyom', 'csak a fa'], 'Például élelemnek, takarmánynak, olajnak, cukornak.'],
  [3, 'Miből készül a vászon (régen nagyon sokat termesztették)?', 'lenből vagy kenderből', ['búzából', 'cukorrépából', 'tökből'], 'A len és a kender szárának rostjaiból fonalat, abból vásznat szőttek.']
];
const BREAD = { type: 'build', prompt: 'Hogyan lesz a búzából kenyér? Rakd sorba! Koppints rájuk sorban.', answer: ['vetés', 'aratás', 'őrlés', 'sütés'], hint: 'Először elvetik a búzát, nyáron learatják, a malomban megőrlik lisztté, végül a pék kenyeret süt.', explain: 'vetés → aratás → őrlés → sütés' };
const breadQ = () => ({ ...BREAD, tiles: shuffle(BREAD.answer) });
const FARM_SORT = L => Math.random() < .5
  ? sortQ('Háziállat vagy vadon élő állat? Válogasd szét!', { 'háziállat': [['tehén', '🐄'], ['tyúk', '🐔'], ['kecske', '🐐'], ['liba', '🪿'], ['ló', '🐴'], ['juh', '🐑']], 'vadon élő': [['róka', '🦊'], ['őz', '🦌'], ['vaddisznó', '🐗'], ['mókus', '🐿️'], ['farkas', '🐺']] }, L === 1 ? 2 : 3, { hint: 'A háziállatokról az ember gondoskodik. A vadon élők maguk keresik a táplálékukat.' })
  : sortQ('Mikor érik nálunk? Válogasd szét!', { 'tavasszal': ['spárga', 'sóska', 'újhagyma', 'retek'], 'nyáron': ['cseresznye', 'kajszibarack', 'görögdinnye', 'paradicsom', 'uborka'], 'ősszel': ['szőlő', 'alma', 'dió', 'tök', 'gesztenye'] }, L === 3 ? 2 : 1, { hint: 'Tavasszal a korai zöldségek, nyáron a cseresznye, a barack és a dinnye, ősszel a szőlő, az alma és a dió.' });
K4.haszon = topicFrom(FARM, { 1: [FARM_SORT], 2: [FARM_SORT, breadQ], 3: [FARM_SORT, breadQ] });

/* Környezetvédelem */
const ECO = [
  [1, 'Melyik szelektív kukába dobod a régi újságot?', 'a kékbe (papír)', ['a sárgába (műanyag)', 'a zöldbe (üveg)', 'a barnába (bio)'], 'Kék: papír. Sárga: műanyag és fém. Zöld: üveg. Barna: komposztálható hulladék.'],
  [1, 'Melyik szelektív kukába dobod az üres műanyag flakont?', 'a sárgába (műanyag)', ['a kékbe (papír)', 'a zöldbe (üveg)', 'a barnába (bio)'], 'Kék: papír. Sárga: műanyag és fém. Zöld: üveg. Barna: komposztálható hulladék.'],
  [1, 'Melyik szelektív kukába dobod az üres befőttesüveget?', 'a zöldbe (üveg)', ['a kékbe (papír)', 'a sárgába (műanyag)', 'a barnába (bio)'], 'Kék: papír. Sárga: műanyag és fém. Zöld: üveg. Barna: komposztálható hulladék.'],
  [1, 'Hogyan takarékoskodhatsz a vízzel fogmosáskor?', 'elzárom a csapot, amíg mosom a fogam', ['végig folyatom a vizet', 'kétszer annyi vizet használok', 'nem mosok fogat'], 'Így sok liter víz marad meg minden nap.'],
  [1, 'Mit tegyél, ha kimész a szobából?', 'lekapcsolom a villanyt', ['égve hagyom a villanyt', 'bekapcsolom a tévét is', 'kinyitom az ablakot'], 'Így áramot takarítunk meg.'],
  [1, 'Szabad-e leszakítani egy védett virágot?', 'nem, a védett növényeket nem szabad leszedni', ['igen, ha szép', 'igen, ha csak egyet', 'igen, ha senki sem látja'], 'A védett növényeket és állatokat a törvény is óvja.'],
  [2, 'Mi kerülhet a komposztba?', 'almacsutka, krumplihéj, falevél', ['műanyag zacskó', 'elem', 'üvegpalack'], 'A komposztban a növényi maradékokból értékes táptalaj lesz.'],
  [2, 'Hová kerüljön a lemerült elem?', 'külön elemgyűjtőbe (például a boltban)', ['a kommunális kukába', 'a komposztba', 'a patakba'], 'Az elemben mérgező anyagok vannak.'],
  [2, 'Melyik bomlik le a leggyorsabban a természetben?', 'a banánhéj', ['a műanyag palack', 'az üvegpalack', 'az alumíniumdoboz'], 'A növényi maradékokat a lebontók néhány hét alatt lebontják.'],
  [2, 'Melyik megújuló energiaforrás?', 'a napenergia', ['a szén', 'a kőolaj', 'a földgáz'], 'Megújuló: nap, szél, víz. Ezek nem fogynak el.'],
  [2, 'Miért jó a szelektív hulladékgyűjtés?', 'mert a szétválogatott hulladékból új dolgok készülhetnek', ['mert így több lesz a szemét', 'mert így szebb a kuka', 'nem jó semmire'], 'Ezt hívjuk újrahasznosításnak.'],
  [2, 'Mi a nemzeti park célja?', 'hogy megvédje egy táj élővilágát és értékeit', ['hogy gyárat építsenek benne', 'hogy szemetet gyűjtsenek oda', 'hogy kivágják az erdőt'], 'Hazánkban 10 nemzeti park van.'],
  [3, 'Melyik nem megújuló energiaforrás?', 'a kőolaj', ['a szélenergia', 'a napenergia', 'a víz energiája'], 'A szén, a kőolaj és a földgáz egyszer elfogy, és szennyezi a levegőt.'],
  [3, 'Mi szennyezi a levegőt?', 'az autók és gyárak füstje', ['a fák', 'a szél', 'az eső'], 'Ezért jó gyalog, biciklivel vagy tömegközlekedéssel menni.'],
  [3, 'Mit jelent az újrahasznosítás?', 'a hulladékból új terméket készítenek', ['a szemetet elássák', 'a szemetet elégetik', 'mindent kidobunk'], 'Például a régi papírból új füzet lehet.'],
  [3, 'Hazánk legnagyobb (legnehezebb) repülő madara, fokozottan védett:', 'a túzok', ['a fecske', 'a veréb', 'a cinege'], 'A túzok az Alföld füves pusztáin él.'],
  [3, 'Mi volt az ártéri (fok-) gazdálkodás lényege?', 'az áradó folyó vizét csatornákon vezették az árterekre, és ott halásztak, legeltettek', ['a folyót teljesen elzárták', 'az ártéren gyárakat építettek', 'a folyóból kiszivattyúzták a vizet'], 'Az emberek a természet ritmusához igazodtak, és megőrizték az ártér élővilágát.']
];
const BIN_SORT = L => sortQ('Melyik kukába való? Válogasd szét!', { '🟦 papír': ['újság', 'kartondoboz', 'régi füzet', 'papírzacskó'], '🟨 műanyag': ['műanyag flakon', 'joghurtos pohár', 'fóliazacskó', 'üdítős kupak'], '🟩 üveg': ['befőttesüveg', 'üvegpalack', 'parfümös üveg'], '🟫 bio': ['almacsutka', 'banánhéj', 'krumplihéj', 'falevél'] }, L === 3 ? 2 : 1, { hint: 'Kék: papír. Sárga: műanyag. Zöld: üveg. Barna: komposztálható, növényi hulladék.' });
K4.kornyvedelem = topicFrom(ECO, { 1: [BIN_SORT], 2: [BIN_SORT], 3: [BIN_SORT] });

/* Idő és naptár */
const MONTHS = ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'];
const DAYS31 = ['január', 'március', 'május', 'július', 'augusztus', 'október', 'december'];
const TIME_FACTS = [
  [1, 'Hány nap van egy héten?', '7', ['5', '10', '12'], 'Hétfő, kedd, szerda, csütörtök, péntek, szombat, vasárnap.'],
  [1, 'Hány hónapból áll egy év?', '12', ['10', '7', '52'], 'Januártól decemberig 12 hónap.'],
  [1, 'Melyik a téli hónap?', 'január', ['július', 'április', 'szeptember'], 'Téli hónapok: december, január, február.'],
  [1, 'Melyik a nyári hónap?', 'július', ['január', 'október', 'március'], 'Nyári hónapok: június, július, augusztus.'],
  [1, 'Melyik napszak jön a délután után?', 'este', ['reggel', 'délelőtt', 'dél'], 'Reggel, délelőtt, dél, délután, este, éjszaka.'],
  [1, 'Melyik évszakban van a karácsony?', 'télen', ['nyáron', 'tavasszal', 'ősszel'], 'Karácsony december 24–26.'],
  [2, 'Hány napból áll egy év?', '365 (szökőévben 366)', ['100', '300', '52'], 'Szökőévben február 29 napos.'],
  [2, 'Hány napos a február szökőévben?', '29', ['28', '30', '31'], 'Négyévente van szökőév.'],
  [2, 'Hány év egy évtized?', '10', ['100', '5', '1000'], 'Évtized: 10 év. Évszázad: 100 év. Évezred: 1000 év.'],
  [2, 'Hány év egy évszázad?', '100', ['10', '50', '1000'], 'Évtized: 10 év. Évszázad: 100 év. Évezred: 1000 év.'],
  [2, 'Hány hét van körülbelül egy évben?', '52', ['12', '30', '100'], '365 nap : 7 = 52 hét és 1 nap.'],
  [3, 'Hány napos a november?', '30', ['31', '28', '29'], 'Az öklödön számolhatod: a bütyök 31 napos hónap, a mélyedés 30 (vagy február).'],
  [3, 'Melyik évszázadban élünk?', 'a 21. században', ['a 20. században', 'a 19. században', 'a 2. században'], 'A 2001 és 2100 közötti évek tartoznak a 21. századba.'],
  [3, 'Mit mutat a naptár?', 'az év napjait, heteit és hónapjait', ['a hőmérsékletet', 'a világtájakat', 'az időjárást'], 'A naptárban az ünnepeket és a fontos dátumokat is megtaláljuk.']
];
const monthsBuild = L => { const st = ri(0, L === 3 ? 11 : 8), n = L === 1 ? 3 : 4, ans = Array.from({ length: n }, (_, i) => MONTHS[(st + i) % 12]); return { type: 'build', prompt: 'Rakd sorba a hónapokat! Koppints rájuk sorban.', answer: ans, tiles: shuffle(ans), hint: 'Január, február, március, április, május, június, július, augusztus, szeptember, október, november, december.', explain: ans.join(' → ') }; };
const lifeBuild = () => { const ans = ['csecsemőkor', 'kisgyermekkor', 'iskoláskor', 'serdülőkor', 'felnőttkor', 'időskor']; const k = ri(0, 2), part = ans.slice(k, k + 4); return { type: 'build', prompt: 'Rakd sorba az ember életszakaszait! Koppints rájuk sorban.', answer: part, tiles: shuffle(part), hint: 'Csecsemőkor, kisgyermekkor, iskoláskor, serdülőkor, felnőttkor, időskor.', explain: part.join(' → ') }; };
const monthDays = () => { const m = pick(MONTHS), d = m === 'február' ? '28 vagy 29' : DAYS31.includes(m) ? '31' : '30'; return mcq(`Hány napos ${artOf(m)} <b>${m}</b>?`, d, ['31', '30', '28 vagy 29', '27'].filter(x => x !== d).slice(0, 3), { fmt: v => v, hint: 'Ökölszámolás: a bütykök a 31 napos hónapok, a mélyedések a 30 naposak (és a február).' }); };
K4.ido = topicFrom(TIME_FACTS, { 1: [monthsBuild], 2: [monthsBuild, lifeBuild], 3: [lifeBuild, monthDays] });

/* additions to existing topics */
SPACE_FACTS.push(
  [2, 'Mi az a csillagkép?', 'csillagok csoportja, amelyet egy alakzatnak képzelünk', ['egy bolygó', 'egy holdfázis', 'egy felhő'], 'Ilyen a Göncölszekér, az Orion vagy a Kis Göncöl.'],
  [2, 'Melyik csillagkép segít megtalálni a Sarkcsillagot?', 'a Göncölszekér', ['az Orion', 'a Skorpió', 'a Hattyú'], 'A Göncölszekér hátsó két csillagát meghosszabbítva eljutunk a Sarkcsillaghoz.'],
  [3, 'Ki fordította elsőként távcsövét az égbolt felé, és fedezte fel a Jupiter holdjait?', 'Galileo Galilei', ['Kolumbusz Kristóf', 'Isaac Newton', 'Neil Armstrong'], '1609-ben vizsgálta az eget távcsővel.'],
  [3, 'Ki volt az első magyar űrhajós?', 'Farkas Bertalan', ['Neil Armstrong', 'Jurij Gagarin', 'Kapu Tibor'], 'Farkas Bertalan 1980-ban repült az űrbe; Kapu Tibor 2025-ben, a második magyarként.'],
  [3, 'Mire való a távcső?', 'a távoli tárgyakat közelebbinek és nagyobbnak mutatja', ['a hőmérsékletet méri', 'a hangot erősíti', 'az időt méri'], 'A csillagászok távcsővel vizsgálják az égitesteket.']);
MAP_FACTS.push(
  [2, 'Melyik térkép mutatja a megyéket, a határokat és a településeket?', 'a közigazgatási térkép', ['a domborzati térkép', 'a turistatérkép', 'az alaprajz'], 'A közigazgatási térképen minden megye más színű.'],
  [2, 'Melyik térkép mutatja színekkel a hegyeket, dombokat és síkságokat?', 'a domborzati térkép', ['a közigazgatási térkép', 'az autóstérkép', 'az alaprajz'], 'Zöld: síkság, sárga: dombság, barna: hegység.'],
  [2, 'Melyik térképen találod a jelzett turistautakat?', 'a turistatérképen', ['az autóstérképen', 'a közigazgatási térképen', 'a földgömbön'], 'Az erdei utakat színes jelzések (pl. kék sáv, piros kereszt) mutatják.'],
  [2, 'Melyik térképet használod, ha autóval utazol?', 'az autóstérképet', ['a turistatérképet', 'a domborzati térképet', 'az alaprajzot'], 'Ezen az utak, az autópályák és a benzinkutak látszanak.']);
MORE.health.push(
  [1, 'Hová mész, ha beteg vagy, és meg kell vizsgálni?', 'a háziorvoshoz (körzeti orvoshoz)', ['a postára', 'a fodrászhoz', 'a pékségbe'], 'A háziorvos megvizsgál, és ha kell, gyógyszert ír fel.'],
  [1, 'Hol kapod meg az orvos által felírt gyógyszert?', 'a gyógyszertárban (patikában)', ['a könyvtárban', 'a játékboltban', 'az iskolában'], 'A gyógyszerész adja ki a gyógyszert.'],
  [2, 'Hogyan védheted a szemedet?', 'jó fénynél olvasok, és szünetet tartok a képernyő előtt', ['sötétben olvasok', 'egész nap a telefont nézem', 'a napba nézek'], 'A szem a legfontosabb érzékszervünk, vigyázz rá!'],
  [2, 'Mi okozhat túlsúlyt?', 'sok édesség és kevés mozgás', ['sok zöldség', 'sok víz', 'sok alvás'], 'A kiegyensúlyozott étrend és a mozgás segít megőrizni az egészséget.'],
  [3, 'Mi jellemző az influenzára?', 'magas láz, fáradtság, izomfájdalom', ['csak egy kis orrfolyás', 'viszkető pöttyök', 'fogfájás'], 'Az influenza súlyosabb a náthánál, ilyenkor pihenni kell.'],
  [3, 'Hová viszik a mentők a súlyos beteget?', 'a kórházba', ['a gyógyszertárba', 'az iskolába', 'a fogorvoshoz'], 'A kórházban orvosok és ápolók gyógyítják a betegeket.']);
/* item-based generators: many different questions from the sort lists */
const fromGroups = (groups, ask, hint, opts = {}) => () => { const bins = Object.keys(groups), b = pick(bins), it = pick(groups[b]), w = Array.isArray(it) ? it[0] : it, em = Array.isArray(it) ? it[1] : '';
  return { type: 'choice', prompt: ask(w), visual: em ? `<div class="big-emoji">${em}</div>` : undefined, answer: b, options: (opts.keep ? bins : shuffle(bins)).map(v => ({ value: v, html: v })), answerText: b, hint }; };
const lightItem = fromGroups({ 'átlátszó': ['ablaküveg', 'tiszta víz', 'celofán', 'szemüveglencse', 'befőttesüveg'], 'áttetsző': ['tejüveg', 'sütőpapír', 'jégvirágos ablak', 'vékony függöny', 'zsírpapír'], 'átlátszatlan': ['fa', 'kő', 'karton', 'tégla', 'vaslap', 'könyv'] },
  w => `Átlátszó, áttetsző vagy átlátszatlan: <b>${w}</b>?`, 'Átlátszó: tisztán átlátsz rajta. Áttetsző: átjut a fény, de homályosan látsz. Átlátszatlan: a fény nem jut át.', { keep: true });
const moveItem = fromGroups({ 'repül': [['fecske', '🐦'], ['denevér', '🦇'], ['lepke', '🦋'], ['méh', '🐝'], ['sas', '🦅'], ['katica', '🐞']], 'úszik': [['ponty', '🐟'], ['delfin', '🐬'], ['bálna', '🐋'], ['cápa', '🦈']], 'ugrik': [['béka', '🐸'], ['kenguru', '🦘'], ['szöcske', '🦗']], 'kúszik, csúszik': [['kígyó', '🐍'], ['csiga', '🐌'], ['giliszta', '🪱']] },
  w => `Hogyan mozog ${artOf(w)} <b>${w}</b>?`, 'Gondold végig, mije van az állatnak: szárnya, uszonya, erős hátsó lába, vagy egyáltalán nincs lába.');
const binItem = fromGroups({ 'kék (papír)': ['újság', 'kartondoboz', 'régi füzet', 'papírzacskó', 'tojástartó'], 'sárga (műanyag)': ['műanyag flakon', 'joghurtos pohár', 'fóliazacskó', 'üdítős kupak', 'samponos flakon'], 'zöld (üveg)': ['befőttesüveg', 'üvegpalack', 'parfümös üveg', 'lekváros üveg'], 'barna (bio)': ['almacsutka', 'banánhéj', 'krumplihéj', 'falevél', 'levágott fű'] },
  w => `Melyik szelektív kukába való: <b>${w}</b>?`, 'Kék: papír. Sárga: műanyag. Zöld: üveg. Barna: komposztálható, növényi hulladék.', { keep: true });
const YOUNG = [['tehén', 'borjú'], ['ló', 'csikó'], ['juh', 'bárány'], ['disznó', 'malac'], ['kecske', 'gida'], ['tyúk', 'csibe'], ['kutya', 'kölyökkutya'], ['macska', 'kiscica'], ['kacsa', 'kiskacsa']];
const youngItem = () => { const [a, y] = pick(YOUNG); return mcq(`Hogy hívják ${artOf(a)} <b>${a}</b> kicsinyét?`, y, shuffle(YOUNG.filter(x => x[1] !== y)).slice(0, 3).map(x => x[1]), { fmt: v => v, hint: 'Tehén – borjú, ló – csikó, juh – bárány, disznó – malac, kecske – gida, tyúk – csibe.' }); };
const PRODUCT = [['tehén', 'tej'], ['juh', 'gyapjú'], ['tyúk', 'tojás'], ['méh', 'méz'], ['liba', 'toll'], ['búza', 'liszt'], ['napraforgó', 'étolaj'], ['cukorrépa', 'cukor'], ['szőlő', 'must'], ['len', 'vászon']];
const productItem = () => { const [a, p] = pick(PRODUCT); return mcq(`Mit ad nekünk, vagy mi készül belőle: <b>${a}</b>?`, p, shuffle(PRODUCT.filter(x => x[1] !== p)).slice(0, 3).map(x => x[1]), { fmt: v => v, hint: 'Tehén – tej, juh – gyapjú, tyúk – tojás, méh – méz, búza – liszt, napraforgó – olaj, cukorrépa – cukor.' }); };
const monthAfter = () => { const i = ri(0, 11), m = MONTHS[i], nx = MONTHS[(i + 1) % 12]; return mcq(`Melyik hónap következik ${m} után?`, nx, shuffle(MONTHS.filter(x => x !== nx && x !== m)).slice(0, 3), { fmt: v => v, hint: MONTHS.join(', ') + '.' }); };
const seasonOf = () => { const i = ri(0, 11), m = MONTHS[i], s = ['tél', 'tél', 'tavasz', 'tavasz', 'tavasz', 'nyár', 'nyár', 'nyár', 'ősz', 'ősz', 'ősz', 'tél'][i]; return { type: 'choice', prompt: `Melyik évszakhoz tartozik <b>${m}</b>?`, answer: s, options: ['tavasz', 'nyár', 'ősz', 'tél'].map(v => ({ value: v, html: v })), answerText: s, hint: 'Tavasz: március, április, május. Nyár: június, július, augusztus. Ősz: szeptember, október, november. Tél: december, január, február.' }; };
K4.hangfeny = topicFrom(SOUND_LIGHT, { 1: [LIGHT_SORT, lightItem, lightItem], 2: [LIGHT_SORT, lightItem], 3: [LIGHT_SORT, lightItem] });
K4.mozgas = topicFrom(MOTION, { 1: [MOVE_SORT, moveItem, moveItem], 2: [MOVE_SORT, moveItem], 3: [MOVE_SORT, moveItem] });
K4.haszon = topicFrom(FARM, { 1: [FARM_SORT, youngItem, productItem], 2: [FARM_SORT, breadQ, productItem], 3: [FARM_SORT, breadQ, productItem] });
K4.kornyvedelem = topicFrom(ECO, { 1: [BIN_SORT, binItem, binItem], 2: [BIN_SORT, binItem], 3: [BIN_SORT, binItem] });
K4.ido = topicFrom(TIME_FACTS, { 1: [monthsBuild, monthAfter, seasonOf], 2: [monthsBuild, lifeBuild, monthAfter, seasonOf], 3: [lifeBuild, monthDays, monthAfter] });
PAGES['kornyezet-4'] = {
  id: 'kornyezet-4', title: 'Környezetismeret', grade: 4,
  blurb: 'Halmazállapotok és mérés, időjárás, tűz, fény és mozgás, a növények és állatok, életközösségek, testünk és egészségünk, világtájak és térképolvasás, a Föld és a Naprendszer, folyóink és tavaink, hazánk tájai, megyéi és nevezetességei, Budapest hídjai. Egy kör 10 feladat.',
  topics: [
    { id: 'sorter', sample: '🧺', name: 'Válogató', desc: 'Válogasd szét a kártyákat a kosarakba!', gen: K4.sorter },
    { id: 'ki', sample: '❓', name: 'Ki vagyok én?', desc: 'Találós kérdések: minél kevesebb tippből!', gen: K4.ki },
    { id: 'lab', sample: '🧪', name: 'Kísérletező', desc: 'Mit gondolsz? Próbáld ki! Mit láttál?', gen: K4.lab },
    { id: 'state', sample: 'jég · víz · gőz', name: 'Halmazállapotok', desc: 'Szilárd, folyékony, légnemű; olvadás, fagyás; a hőmérő.', gen: K4.state },
    { id: 'ido', sample: '📅 ⏳', name: 'Idő és naptár', desc: 'Hónapok, napok, évszakok, életszakaszok.', gen: K4.ido },
    { id: 'measure', sample: '°C · kg · dl', name: 'Mérés', desc: 'Mérőeszközök és mértékegységek.', gen: K4.measure },
    { id: 'weather', sample: '☀️ 🌧️ 💨', name: 'Időjárás', desc: 'Időjárásjelek, csapadék, mérőeszközök.', gen: K4.weather },
    { id: 'energy', sample: '🔥 💡 🏃', name: 'Tűz, fény, mozgás', desc: 'Fényforrások, éghető anyagok, mozgásformák.', gen: K4.energy },
    { id: 'hangfeny', sample: '🔊 💡', name: 'Hang és fény', desc: 'Rezgés, visszhang; árnyék, tükör, átlátszó anyagok.', gen: K4.hangfeny },
    { id: 'mozgas', sample: '🐎 🐟 🦅', name: 'Mozgás', desc: 'Mozgásfajták; hogyan mozognak az állatok?', gen: K4.mozgas },
    { id: 'plant', sample: '🌱 🌼', name: 'A növények', desc: 'Részeik és szerepük, életszakaszok, ehető részek.', gen: K4.plant },
    { id: 'animal', sample: '🦇 🐋 🐧', name: 'Az állatok csoportjai', desc: 'Emlős, madár, hal, kétéltű, hüllő, rovar.', gen: K4.animal },
    { id: 'habitat', sample: '🌳 🌾 🌊', name: 'Életközösségek', desc: 'Erdő, mező, vízpart; tápláléklánc.', gen: K4.habitat },
    { id: 'haszon', sample: '🌾 🐄 🍎', name: 'Haszonnövények, háziállatok', desc: 'Búza, cukorrépa, napraforgó; háziállatok és kicsinyeik; idénygyümölcsök.', gen: K4.haszon },
    { id: 'kornyvedelem', sample: '♻️', name: 'Környezetvédelem', desc: 'Szelektív gyűjtés, komposzt, takarékosság, természetvédelem.', gen: K4.kornyvedelem },
    { id: 'body', sample: '👁️ 👂 ❤️', name: 'Testünk', desc: 'Érzékszervek, szervek és feladatuk.', gen: K4.body },
    { id: 'health', sample: '🩺 112', name: 'Egészségünk', desc: 'Egészséges szokások, betegségek, segélyhívás.', gen: K4.health },
    { id: 'compass', sample: 'É · K · D · Ny', name: 'Világtájak', desc: 'Fő- és mellékvilágtájak, tájékozódás.', gen: K4.compass },
    { id: 'terkepolv', sample: '🗺️ ▲ ●', name: 'Térképolvasás', desc: 'Térképjelek, színek, méretarány.', gen: K4.terkepolv },
    { id: 'fold', sample: '🌍 ☀️ 🌙', name: 'Föld, Nap, Hold', desc: 'Nappal és éjszaka, évszakok, holdfázisok, bolygók.', gen: K4.fold },
    { id: 'landform', sample: '⛰️ 〰️', name: 'Felszínformák és vizek', desc: 'Síkság, dombság, hegység; patak, folyó, tó.', gen: K4.landform },
    { id: 'folyok', sample: 'Duna · Tisza', name: 'Folyóink és tavaink', desc: 'Folyók, mellékfolyók, torkolatok, a víz körforgása.', gen: K4.folyok },
    { id: 'regions', sample: 'Alföld · Mátra', name: 'Hazánk nagytájai', desc: 'A hat nagytáj és jellemző tájaik.', gen: K4.regions },
    { id: 'country', sample: '🇭🇺', name: 'Magyarország', desc: 'Szomszédos országok, megyék és megyeszékhelyek.', gen: K4.country },
    { id: 'terkep', sample: '🗺️ 📍', name: 'Térképes kalandok', desc: 'Koppints a térképre: szomszédok, nevezetes helyek.', gen: K4.terkep },
    { id: 'megyek', sample: '19 megye', name: 'Megyék a térképen', desc: 'Keresd meg a megyéket, székhelyeket és városokat!', gen: K4.megyek },
    { id: 'tajak', sample: 'Alpokalja · Hortobágy', name: 'Tájak és nevezetességek', desc: 'Alpokalja, Őrség, Tokaj, Aggtelek, nemzeti parkok…', gen: K4.tajak },
    { id: 'hidak', sample: '🌉', name: 'Budapest hídjai', desc: 'A Duna-hidak sorrendje, története, érdekességei.', gen: K4.hidak }
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
  let score = 0, wrong = [], val = '', q = null, left = cfg.secs, over = false, last = '', pause = false, deck = [];
  const timeEl = h('span', { class: 'sz-time' }), bar = h('i'), scoreEl = h('span', { class: 'sz-score' }), qEl = h('div', { class: 'sz-q' }), disp = h('div', { class: 'numdisp' }), card = h('div', { class: 'qcard sz-card' });
  const next = () => {
    // shuffled deck: every fact of the chosen tables comes once before any of them repeats
    if (!deck.length) { deck = shuffle(cfg.tables.flatMap(t => Array.from({ length: 10 }, (_, i) => Math.random() < .5 ? [t, i + 1] : [i + 1, t]))); if (deck.length > 1 && `${deck[deck.length - 1][0]}·${deck[deck.length - 1][1]}` === last) deck.unshift(deck.pop()); }
    let [a, b] = deck.pop();
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
  const seen = new Set(items.map(qKey));
  let i = 0, guard = 0;
  while (items.length < 10 && guard++ < 80) {
    const x = pool[i++ % pool.length], lvl = Math.max(1, store.get(pk(x.pid, x.tid, 'lvl'), 1) - (x.e.b === 1 ? 1 : 0));
    try { const q = x.t.gen(lvl), key = q && qKey(q); if (q && q.type !== 'read' && !q.autoSpeak && !seen.has(key)) { seen.add(key); items.push({ ...q, _page: x.pid, _topic: x.tid }); } } catch (e) {}
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
