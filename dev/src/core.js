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
    : q.type === 'riddle' ? q.clues[0] : q.type === 'lab' ? (q.mode || q.item || '') : q.type === 'map' ? q.map + (q.dots || []).length : q.type === 'find' ? q.cells.join(',') : q.type === 'numline' ? q.min + '-' + q.max : '';
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
