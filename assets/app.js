const PAGE_IDS = ['matek-1', 'matek-4', 'magyar-1', 'magyar-4'];
const HERO_SVG = "<svg viewBox=\"0 0 440 340\" role=\"img\" aria-label=\"Kock\u00e1s f\u00fczetlap egy \u00f6sszead\u00e1ssal, bet\u0171k\u00e1rty\u00e1val \u00e9s arany csillaggal\">\n<defs><pattern id=\"hg\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\"><path d=\"M20 0H0V20\" fill=\"none\" stroke=\"#3563e9\" stroke-opacity=\".17\" stroke-width=\"1\"/></pattern></defs>\n<g transform=\"rotate(-4 220 170)\">\n<rect x=\"66\" y=\"50\" width=\"300\" height=\"250\" rx=\"18\" fill=\"#1d2742\" opacity=\".1\"/>\n<rect x=\"58\" y=\"38\" width=\"300\" height=\"250\" rx=\"18\" fill=\"#ffffff\"/>\n<rect x=\"58\" y=\"38\" width=\"300\" height=\"250\" rx=\"18\" fill=\"url(#hg)\"/>\n<path d=\"M104 38v250\" stroke=\"#ee6a4c\" stroke-opacity=\".6\" stroke-width=\"2\"/>\n<circle cx=\"80\" cy=\"72\" r=\"6\" fill=\"#e9edf6\"/><circle cx=\"80\" cy=\"112\" r=\"6\" fill=\"#e9edf6\"/><circle cx=\"80\" cy=\"152\" r=\"6\" fill=\"#e9edf6\"/><circle cx=\"80\" cy=\"192\" r=\"6\" fill=\"#e9edf6\"/><circle cx=\"80\" cy=\"232\" r=\"6\" fill=\"#e9edf6\"/><circle cx=\"80\" cy=\"272\" r=\"6\" fill=\"#e9edf6\"/>\n<text x=\"124\" y=\"128\" font-family=\"Fredoka,ui-rounded,sans-serif\" font-weight=\"600\" font-size=\"44\" fill=\"#1d2742\">3 + 4 =</text>\n<circle cx=\"304\" cy=\"113\" r=\"31\" fill=\"#e8eefe\"/>\n<text x=\"304\" y=\"129\" text-anchor=\"middle\" font-family=\"Fredoka,ui-rounded,sans-serif\" font-weight=\"600\" font-size=\"44\" fill=\"#3563e9\">7</text>\n<text x=\"124\" y=\"206\" font-family=\"Fredoka,ui-rounded,sans-serif\" font-weight=\"500\" font-size=\"36\" fill=\"#1d2742\">ma \u00b7 m\u00e1 \u00b7 mi</text>\n<path d=\"M124 244h170\" stroke=\"#3563e9\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-dasharray=\"1 11\"/>\n</g>\n<g transform=\"translate(332 196) rotate(9)\">\n<rect y=\"7\" width=\"80\" height=\"80\" rx=\"17\" fill=\"#c9472b\"/>\n<rect width=\"80\" height=\"80\" rx=\"17\" fill=\"#ee6a4c\"/>\n<text x=\"40\" y=\"57\" text-anchor=\"middle\" font-family=\"Fredoka,ui-rounded,sans-serif\" font-weight=\"600\" font-size=\"46\" fill=\"#ffffff\">\u00c1</text>\n</g>\n<polygon points=\"62.0,26.0 72.0,52.2 100.0,53.6 78.2,71.3 85.5,98.4 62.0,83.0 38.5,98.4 45.8,71.3 24.0,53.6 52.0,52.2\" fill=\"#e0a812\" transform=\"translate(0 5)\"/>\n<polygon points=\"62.0,26.0 72.0,52.2 100.0,53.6 78.2,71.3 85.5,98.4 62.0,83.0 38.5,98.4 45.8,71.3 24.0,53.6 52.0,52.2\" fill=\"#ffc93c\"/>\n<g transform=\"translate(150 322) rotate(-5)\">\n<rect width=\"150\" height=\"20\" rx=\"4\" fill=\"#3563e9\"/><rect width=\"150\" height=\"6\" rx=\"3\" fill=\"#5a7fef\"/>\n<rect x=\"-22\" width=\"26\" height=\"22\" rx=\"5\" fill=\"#f2a7b8\"/><rect x=\"-2\" width=\"10\" height=\"22\" fill=\"#c9cfdc\"/>\n<polygon points=\"150,0 178,11 150,22\" fill=\"#f3d9a8\"/><polygon points=\"170,8 178,11 170,14\" fill=\"#1d2742\"/>\n</g>\n</svg>";
const SUBJ_ICON = {"matek": "<svg viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" aria-hidden=\"true\"><path d=\"M9 4v10M4 9h10M18 9h10M19.5 19.5l7 7M26.5 19.5l-7 7M4 21h10M4 26.5h10\"/></svg>", "magyar": "<svg viewBox=\"0 0 32 32\" aria-hidden=\"true\"><text x=\"16\" y=\"24\" text-anchor=\"middle\" font-family=\"Fredoka,ui-rounded,sans-serif\" font-weight=\"600\" font-size=\"21\" fill=\"currentColor\">Aa</text></svg>"};
const SUBJ_DESC = {"matek": "Számolás, számok, mértékegységek, geometria és szöveges feladatok.", "magyar": "Betűk, olvasás, helyesírás, nyelvtan és szövegértés."};
'use strict';
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
  if (PAGES[id]) showTopics(PAGES[id]); else showHub();
  window.scrollTo(0, 0);
  const tgt = !id && location.hash.length > 1 && document.getElementById(location.hash.slice(1)); if (tgt) tgt.scrollIntoView();
}
const BASE = '/kockafuzet/';
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
    ...blocks,
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
        h('a', { href: BASE + '#' + page.id.split('-')[0] }, PLAN.find(p => p.s === page.id.split('-')[0]).name), h('span', { class: 'sep' }, '›'),
        h('span', { 'aria-current': 'page' }, `${page.grade}. osztály`)),
      h('span', { class: 'whochip' }, 'Gyakorol: ' + who)),
    h('header', { class: 'page-head' },
      h('span', { class: 'subj-ico', html: SUBJ_ICON[page.id.split('-')[0]] }),
      h('div', null, h('h1', null, `${page.title} · ${page.grade}. osztály`), h('p', { class: 'mute' }, page.blurb))),
  ];
  if (page.settings) nodes.push(page.settings(() => showTopics(page)));
  nodes.push(tiles);
  mount(...nodes);
}

/* ===== practice session ===== */
function startTopic(page, topic) {
  S = { page, topic, n: 0, total: 10, correct: 0, level: store.get(pk(page.id, topic.id, 'lvl'), 1), streak: 0, wrongRun: 0, res: [], q: null, tries: 0, last: '' };
  nextQ();
}
function nextQ() {
  if (S.n >= S.total) return finish();
  let q, g = 0;
  do { q = S.topic.gen(S.level); } while (q.key === undefined && (q.prompt + '|' + q.answer) === S.last && g++ < 6);
  S.last = q.prompt + '|' + q.answer;
  S.q = q; S.tries = 0; S.n++;
  renderQ();
}
const PRAISE = ['Ügyes!', 'Szuper!', 'Így van!', 'Remek!', 'Pontos!', 'Nagyszerű!'];

function renderQ() {
  runCleanups();
  const q = S.q, page = S.page;
  const dots = h('div', { class: 'dots', 'aria-label': `${S.n}. kérdés a ${S.total}-ből` });
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

  if (q.hint) {
    const hintBox = h('div', { class: 'hint', hidden: true, html: q.hint });
    const hb = h('button', { class: 'linkbtn', onclick: () => { hintBox.hidden = !hintBox.hidden; } }, 'Segítség');
    card.append(hb, hintBox);
  }
  card.append(fb, actions);
  if (ui.submitBtn) actions.append(ui.submitBtn);

  mount(
    h('div', { class: 'bar' },
      h('button', { class: 'btn small', onclick: () => showTopics(page) }, '← Témák'),
      dots,
      h('span', { class: 'lvl' }, `Szint ${S.level}/3`)),
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
    S.ui.lock && S.ui.lock(resp, true);
    let extra = '';
    if (S.tries === 1) {
      S.streak++; S.wrongRun = 0;
      if (S.streak >= 3 && S.level < 3) { S.level++; S.streak = 0; extra = 'Szint fel! Egyre nehezebb jön.'; }
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
    S.streak = 0; S.wrongRun++;
    let extra = '';
    if (S.wrongRun >= 2 && S.level > 1) { S.level--; S.wrongRun = 0; extra = 'Menjünk egy kicsit könnyebben.'; }
    S.ui.lock && S.ui.lock(resp, false);
    const ans = q.answerText || (q.type === 'read' ? q.text : q.type === 'choice' ? (q.options.find(o => o.value === q.answer) || {}).html : q.type === 'build' ? q.answer.join('') : String(q.answer));
    S.fb.append(h('div', { class: 'fb bad', html: `A helyes válasz: <b>${ans}</b>${q.explain ? `<small>${q.explain}</small>` : ''}${extra ? `<small>${extra}</small>` : ''}` }));
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
function finish() {
  runCleanups();
  const { page, topic, correct, total } = S;
  const st = correct >= 9 ? 3 : correct >= 7 ? 2 : correct >= 5 ? 1 : 0;
  const best = store.get(pk(page.id, topic.id, 'stars'), 0);
  if (st > best) store.set(pk(page.id, topic.id, 'stars'), st);
  store.set(pk(page.id, topic.id, 'lvl'), S.level);
  const msg = st === 3 ? 'Hibátlan közelében! Nagyszerű munka.' : st === 2 ? 'Nagyon jó! Még egy kör, és meglesz a három csillag.' : st === 1 ? 'Jó kezdés. Gyakoroljunk még egy kört!' : 'Semmi baj, a gyakorlás segít. Próbáld újra!';
  mount(h('div', { class: 'qcard results' },
    h('h2', null, `${correct} jó válasz a ${total}-ből`),
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
    const hint = L === 3 ? `Előbb vegyél el ${a - 10}-t, hogy 10 maradjon, aztán még ${b - (a - 10)}-t: 10 − ${b - (a - 10)}.` : 'Képzeld el a pöttyöket, és vegyél el belőlük annyit, amennyit a feladat kér.';
    return { type: 'input', prompt: `${a} − ${b} = <span class="blank">?</span>`, answer: a - b, hint, visual: L <= 2 ? frames([[a, 'f-blue']]) : '' };
  },
  split(L) {
    if (L === 1) { const t = ri(3, 10), a = ri(1, t - 1); return { type: 'input', prompt: `${t} = ${a} + <span class="blank">?</span>`, answer: t - a, hint: `Mennyit kell ${a}-hoz adni, hogy ${t} legyen?`, visual: frames([[a, 'f-blue'], [t - a, 'f-red']]).replace(/class="f-red"/g, 'class="f-none s-red" stroke-width="3"') }; }
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
      return { type: 'input', prompt: `Melyik számjegy áll a(z) ${PLACE[p]} helyén a ${fmt(n)} számban?`, answer: d, hint: 'Jobbról balra: egyesek, tízesek, százasok, ezresek.' };
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
    return { type: 'input', prompt: `Hány ${isT ? 'tízes' : 'százas'} van összesen a ${fmt(n)} számban?`, answer: Math.floor(n / (isT ? 10 : 100)), hint: `Hány ${isT ? 'tízest' : 'százast'} tudsz kivenni a számból? Vágd le a(z) ${isT ? 'egyesek' : 'tízesek és egyesek'} helyét.` };
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
    return { type: 'input', prompt: 'Számold ki írásban!', visual: col(a, '−', b), answer: a - b, hint: 'Jobbról balra vonj ki. Ha a felső számjegy kisebb, kölcsönözz tízest a szomszédos helyiértékről. Ellenőrzés: a különbség + a kivonandó = a kisebbítendő.' };
  },
  mul(L) {
    if (L === 1) { const a = ri(3, 9), b = ri(3, 9); return { type: 'input', prompt: `${a} · ${b} = <span class="blank">?</span>`, answer: a * b, hint: `Ha nem jut eszedbe, indulj ismert szorzatból: ${a} · ${b} = ${a} · ${b - 1} + ${a}.` }; }
    if (L === 2 || Math.random() < .4) { const a = L === 2 ? ri(12, 99) : ri(101, 499), b = ri(2, 9); return { type: 'input', prompt: 'Számold ki írásban!', visual: col(a, '·', b), answer: a * b, hint: 'Szorozd meg egyesével jobbról balra a számjegyeket, és vidd át a tízest.' }; }
    const a = ri(12, 45), b = ri(11, 30); return { type: 'input', prompt: 'Számold ki írásban!', visual: col(a, '·', b), answer: a * b, hint: `Szorozz külön: ${a} · ${Math.floor(b / 10) * 10} és ${a} · ${b % 10}, aztán add össze.` };
  },
  div(L) {
    if (L === 1) { const b = ri(3, 9), q = ri(3, 10); return { type: 'input', prompt: `${b * q} : ${b} = <span class="blank">?</span>`, answer: q, hint: `Melyik számot szorozva ${b}-mal kapsz ${b * q}-t?` }; }
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
    if (L === 2) { const n = pick([2, 3, 4, 5, 6, 8, 10]), W = n * ri(2, 10); return { type: 'input', prompt: `Mennyi a ${W} ${FRN[n]}?`, answer: W / n, hint: `Oszd el a ${W}-t ${n} egyenlő részre.` }; }
    if (Math.random() < .45) {
      const a = ri(2, 8); let b = ri(2, 8); while (b === a) b = ri(2, 8);
      const bigger = a < b ? a : b;
      return mcq(`Melyik a nagyobb: ${fr(1, a)} vagy ${fr(1, b)}?`, `1/${bigger}`, [`1/${a === bigger ? b : a}`, 'egyforma'], { fmt: v => v === 'egyforma' ? v : fr(1, v.split('/')[1]), hint: 'Minél több egyenlő részre osztunk valamit, annál kisebb egy rész.' });
    }
    const n = pick([3, 4, 5, 6, 8]), k = ri(2, n - 1), W = n * ri(2, 8);
    return { type: 'input', prompt: `Számítsd ki: ${W} ${fr(k, n)} része = <span class="blank">?</span>`, answer: (W / n) * k, hint: `Előbb keresd meg az egy részt: ${W} : ${n}. Utána szorozd ${k}-val.` };
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
      () => { const k = ri(4, 9), d = ri(6, 14), e = ri(3, 8); return [`${n1} és ${n2} együtt ${k} dobozba tesz matricát, dobozonként ${d}-et. Ha ${e} matricát elajándékoznak, hány marad?`, k * d - e, 'Előbb az összes matrica, utána vond ki az elajándékozottakat.']; }
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

const Lset = () => new Set(store.get('tt.letters', DEFAULT_G));
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
  blurb: 'Betűk, hangok, szótagok és szavak olvasása. Egy kör 10 feladat. A „Hangosan” feladatnál a gép meghallgatja az olvasást (Chrome vagy Edge, letöltött fájlként).',
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
const CAPS = [['Duna', 1], ['Balaton', 1], ['Budapest', 1], ['Magyarország', 1], ['Pécel', 1], ['Mátra', 1], ['Tisza', 1], ['Szeged', 1], ['Anna', 1], ['Bence', 1], ['május', 2], ['hétfő', 2], ['szerda', 2], ['január', 2], ['magyar', 2], ['német', 2], ['tavasz', 2], ['folyó', 2], ['város', 2]];
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
    if (L === 1) return { type: 'input', prompt: `Hány szótagú a(z) <b>${plain}</b> szó?`, answer: w.split('-').length, hint: 'Annyi szótag van, ahány magánhangzó. Tapsold el a szót!' };
    const syls = w.split('-'), tk = tok(plain);
    const cnt = syls.map(s => tok(s).length), bounds = []; cnt.reduce((a, c) => { bounds.push(a + c); return a + c; }, 0); bounds.pop();
    const join = set => tk.map((g, i) => (set.has(i) ? '-' : '') + g).join('');
    const k = bounds.length, cands = Array.from({ length: tk.length - 1 }, (_, i) => i + 1);
    const wrongs = new Set(); let g = 0; const corr = join(new Set(bounds));
    while (wrongs.size < 2 && g++ < 80 && k > 0) { const s = new Set(shuffle(cands).slice(0, k)); const j = join(s); if (j !== corr) wrongs.add(j); }
    return mcq(`Hogyan választjuk el a(z) <b>${plain}</b> szót?`, corr, [...wrongs], { fmt: v => v, hint: 'Egy magánhangzó egy szótagot alkot. Két magánhangzó között általában az utolsó mássalhangzó kerül át a következő szótagba. A kettős betűket (cs, sz, ty, gy…) nem választjuk el.' });
  },
  root(L) {
    if (L === 1) {
      const [w, t] = pick(ROOTS1), wr = [w, w.slice(0, t.length - 1), w.slice(0, t.length + 1)].filter(x => x !== t && x.length > 0);
      return mcq(`Mi a(z) <b>${w}</b> szó tője?`, t, wr, { fmt: v => v, hint: 'A szótő a szó „magja”, ahhoz kapcsoljuk a toldalékot. Vedd le a végéről a toldalékot.' });
    }
    if (L === 2) {
      const [w, t, a, b] = pick(ROOTS2);
      return mcq(`Melyik a szótő a(z) <b>${w}</b> szóban?`, t, [w, w.slice(0, t.length + a.length), w.slice(0, t.length - 1)], { fmt: v => v, explain: `${t} + ${a} + ${b}`, hint: 'Két toldalék van a szó végén. A szótő az, ami marad, ha mindkettőt levesszük.' });
    }
    const [w, t, s] = pick(ROOTS1);
    return mcq(`Melyik a toldalék a(z) <b>${w}</b> szóban?`, s, [t.slice(0, 2), t.slice(-1) + s.slice(0, 1), t].filter(x => x !== s), { fmt: v => v, explain: `${t} + ${s}`, hint: 'A toldalék a szó végén lévő rész, amit a szótőhöz teszünk.' });
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
    if (L === 3) { const ask = names[idx]; return mcq(`Melyik mondat szól a(z) <b>${ask} időről</b>?`, tr[idx], tr.filter((_, i) => i !== idx), { fmt: v => v, hint: 'Múlt: -t, -tt, -ott; jelen: most történik; jövő: „fog”.' }); }
    const adv = L === 1 ? ['Most', 'Tegnap', 'Holnap'][idx] + ' ' : '';
    let s = tr[idx]; if (adv) s = adv + s[0].toLowerCase() + s.slice(1);
    return { type: 'choice', prompt: `Melyik időben van az ige?<br><b>${s}</b>`, answer: names[idx], options: names.map(n => ({ value: n, html: n + ' idő' })), hint: 'Múlt: már megtörtént. Jelen: most történik. Jövő: még nem történt meg, „fog” segíti.' };
  },
  meaning(L) {
    if (L === 1) { const [a, b] = pick(OPP), flip = Math.random() < .5, q = flip ? b : a, ans = flip ? a : b; return mcq(`Mi a(z) <b>${q}</b> ellentéte?`, ans, shuffle(OPP.flat().filter(x => x !== ans && x !== q)).slice(0, 3), { fmt: v => v, hint: 'Az ellentét az ellenkező jelentésű szó.' }); }
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


route();
