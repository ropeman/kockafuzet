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
