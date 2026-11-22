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
    return { type: 'build', prompt: 'Rakd ki a szót a képhez!', visual: `<div class="big-emoji" role="img" aria-label="kép">${em}</div>`, answer: tk, tiles: shuffle(tiles), joiner: '', say: w, explain: `A szó: <b>${w}</b>.`, hint: 'Mondd ki lassan a kép nevét, és keresd az első hangot, aztán a következőt.' };
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
