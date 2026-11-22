/* ===== Matematika 1 (számkör 20, 100) ===== */
const COUNT_EM = [['🍎', 'alma'], ['🐟', 'hal'], ['⭐', 'csillag'], ['🎈', 'lufi'], ['🚗', 'autó'], ['🐞', 'katica'], ['🌸', 'virág'], ['🍐', 'körte'], ['⚽', 'labda'], ['🐥', 'csibe'], ['🍓', 'eper'], ['🦋', 'pillangó']];
const SHAPE_RID = [['Három oldala és három csúcsa van.', 'háromszög', 1], ['Négy egyforma hosszú oldala van, és minden sarka derékszög.', 'négyzet', 1], ['Kerek, nincs se oldala, se csúcsa.', 'kör', 1],
  ['Négy oldala van: két hosszabb és két rövidebb, a szemközti oldalai egyformák.', 'téglalap', 1], ['Öt oldala és öt csúcsa van.', 'ötszög', 2], ['Hat oldala van, olyan, mint egy méhsejt.', 'hatszög', 3]];
const SHAPE_OBJ = [['egy pénzérme', 'kör', 1], ['az ablaküveg', 'téglalap', 1], ['a dobókocka egy lapja', 'négyzet', 1], ['a figyelmeztető közlekedési tábla', 'háromszög', 1], ['az óra számlapja', 'kör', 1],
  ['egy füzetlap', 'téglalap', 1], ['a sakktábla egy mezője', 'négyzet', 1], ['a tányér', 'kör', 1], ['az ajtó', 'téglalap', 1], ['a kockacukor egy lapja', 'négyzet', 2], ['a sátor bejárata', 'háromszög', 2], ['egy méhsejt', 'hatszög', 3], ['a focilabda fekete foltja', 'ötszög', 3]];
const SHAPE_DAT = { 'háromszög': ['háromszögnek', 3], 'négyzet': ['négyzetnek', 4], 'téglalap': ['téglalapnak', 4], 'ötszög': ['ötszögnek', 5], 'hatszög': ['hatszögnek', 6] };
const M1 = {
  count(L) {
    const n = L === 1 ? ri(1, 10) : L === 2 ? ri(5, 15) : ri(11, 20), r = Math.random();
    const hint = 'Számold meg egyesével. A tízes keretben egy sor 5 pötty, és 10 pötty tölt meg egy keretet. A képeken ötösével vannak a sorok.';
    if (r < .45) { const [e, nm] = pick(COUNT_EM); return mcq(`Hány ${nm} van a képen?`, n, near(n, 3, 1, 20), { visual: `<div class="cnt-em">${Array.from({ length: n }, () => `<span>${e}</span>`).join('')}</div>`, hint }); }
    return mcq('Hány pötty van a képen?', n, near(n, 3, 1, 20), { visual: L === 1 && n <= 6 && r < .75 ? diceSvg(n) : frames([[n, 'f-blue']]), hint });
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
      if (t === 'after') { const n = ri(1, 18); return { type: 'input', prompt: `Melyik szám jön ${n} után?`, answer: n + 1, hint: `Számolj tovább eggyel: ${n}, …` }; }
      if (t === 'before') { const n = ri(2, 19); return { type: 'input', prompt: `Melyik szám van ${n} előtt?`, answer: n - 1, hint: 'Számolj visszafelé eggyel!' }; }
      const n = ri(1, 17); return { type: 'input', prompt: `Melyik szám van ${n} és ${n + 2} között?`, answer: n + 1, hint: `Az a szám, amelyik ${n} után jön.` };
    }
    if (L === 2) { const a = ri(0, 12), d = ri(3, 8); return { type: 'input', prompt: `Hány egész szám van ${a} és ${a + d} között?`, answer: d - 1, hint: `Számold végig: ${a + 1}, ${a + 2}, … ${azN(a + d)} ${a + d} előttiig.` }; }
    const n = ri(1, 19), k = pick([1, 2]), ans = `${n - k < 0 ? 0 : n - k} és ${n + k}`;
    if (n - k < 0 || n + k > 20) return M1.neigh(3);
    return mcq(`Melyik két szám van ${k === 1 ? 'közvetlenül' : '2-vel'} ${azN(n)} ${n} előtt és után?`, ans, [`${n - k + 1} és ${n + k + 1}`, `${n - k - 1 < 0 ? n + 1 : n - k - 1} és ${n + k - 1}`, `${n} és ${n + k}`].filter((x, i, a) => x !== ans && a.indexOf(x) === i), { fmt: v => v, hint: k === 1 ? 'Számszomszédok: az eggyel kisebb és az eggyel nagyobb szám.' : 'Lépj 2-t visszafelé és 2-t előre a számegyenesen!' });
  },
  seq(L) {
    let step, start, len = 5;
    if (L === 1) { step = pick([1, 1, -1]); start = step > 0 ? ri(1, 12) : ri(8, 20); }
    else if (L === 2) { step = pick([2, 2, 5]); start = step === 5 ? 0 : ri(0, 12); }
    else { step = pick([-2, -3, 3, 4]); start = step < 0 ? ri(4 * -step, 20) : ri(0, 20 - 4 * step); }
    const seq = Array.from({ length: len }, (_, i) => start + i * step);
    const hide = L === 3 ? ri(1, 3) : ri(2, 4);
    const txt = seq.map((v, i) => i === hide ? '<span class="blank">?</span>' : v).join(', ');
    return { type: 'input', prompt: `Folytasd a sort!<br>${txt}`, answer: seq[hide], hint: `Nézd meg, mennyivel ${step > 0 ? 'nő' : 'csökken'} a szám két szomszédos tag között.` };
  },
  shape(L) {
    const r = Math.random(), lv = x => x[2] <= L;
    if (r < .22) { const [d, a] = pick(SHAPE_RID.filter(lv)); return mcq(`Melyik alakzatra igaz?<br><b>${d}</b>`, a, shuffle(SHAPE_RID.filter(lv).map(x => x[1]).filter(x => x !== a)).slice(0, 3), { fmt: v => v, hint: 'Számold meg az oldalakat és a csúcsokat. A körnek nincs sarka.' }); }
    if (r < .42) { const [o, a] = pick(SHAPE_OBJ.filter(lv)), names = [...new Set(SHAPE_RID.filter(lv).map(x => x[1]))]; return mcq(`Milyen alakú ${o}?`, a, shuffle(names.filter(x => x !== a)).slice(0, 3), { fmt: v => v, hint: 'Képzeld el a tárgyat, és nézd meg, hány oldala és sarka van.' }); }
    if (L > 1 && r < .6) { const nm = pick(Object.keys(SHAPE_DAT).filter(x => L === 3 || x !== 'hatszög')), ask = pick(['oldala', 'csúcsa']); return { type: 'input', prompt: `Hány ${ask} van ${artOf(nm)} <b>${SHAPE_DAT[nm][0]}</b>?`, answer: SHAPE_DAT[nm][1], hint: 'A sokszögnek ugyanannyi csúcsa van, mint oldala.' }; }
    const pool = L === 1 ? ['háromszög', 'négyzet', 'kör', 'téglalap'] : L === 2 ? ['háromszög', 'négyzet', 'kör', 'téglalap', 'ötszög'] : ['háromszög', 'négyzet', 'kör', 'téglalap', 'ötszög', 'hatszög'];
    const name = pick(pool), rot = L === 1 ? 0 : pick([0, 0, 15, 30, 45]);
    return mcq('Milyen alakzat ez?', name, shuffle(pool.filter(x => x !== name)).slice(0, 3), { visual: SHAPES[name](rot), fmt: v => v, hint: 'Számold meg az oldalakat és a csúcsokat. A körnek nincs sarka.' });
  },
  clock(L) {
    const hh = ri(1, 12), mm = L === 1 ? 0 : pick([0, 30]), t = (x, y) => `${x}:${String(y).padStart(2, '0')}`, rr = Math.random();
    if (L === 1 && rr < .3) { const d = pick([1, 1, 2]), later = Math.random() < .6, a = later ? (hh + d - 1) % 12 + 1 : (hh - d + 11) % 12 + 1, opts = new Set([t(a, 0)]); while (opts.size < 4) opts.add(t(ri(1, 12), 0)); return { type: 'choice', prompt: later ? `Most ennyi az idő. Hány óra lesz ${d} órával később?` : `Most ennyi az idő. Hány óra volt ${d} órával korábban?`, visual: clockSvg(hh, 0), answer: t(a, 0), options: shuffle([...opts]).map(v => ({ value: v, html: v })), hint: 'Először olvasd le, hány óra van most, aztán számolj tovább vagy vissza a számlapon!' }; }
    if ((L === 3 && rr < .5) || (L === 1 && rr < .55)) {
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
