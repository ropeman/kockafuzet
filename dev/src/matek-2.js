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
      hint: L === 3 && b % 10 ? `Bontsd a kivonandót: ${a} − ${t} = ${a - t}, aztán ${a - t} − ${b % 10}.` : 'Ha az egyesekből nem tudsz elvenni, bonts fel egy tízest 10 egyesre.' };
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
        ['Egy kenyér tömege körülbelül 1', 'kg'], ['Egy radír hossza körülbelül 4', 'cm'], ['Egy fazékba körülbelül 5', 'l'], ['Egy bögrébe körülbelül 3', 'dl'],
        ['A füzet hossza körülbelül 20', 'cm'], ['Egy kádba körülbelül 150', 'l'], ['Egy kistestű kutya tömege körülbelül 8', 'kg'], ['A ház magassága körülbelül 10', 'm'], ['Egy kancsóba körülbelül 1', 'l'],
        ['Egy csészébe körülbelül 2', 'dl'], ['A tanító néni magassága körülbelül 170', 'cm'], ['Egy görögdinnye tömege körülbelül 5', 'kg'], ['Az uszoda hossza 25', 'm'], ['Egy hátizsák tömege körülbelül 4', 'kg'], ['Egy locsolókannába körülbelül 10', 'l'], ['A kisujjad hossza körülbelül 5', 'cm']]);
      const wr = shuffle(['cm', 'm', 'l', 'dl', 'kg'].filter(u => u !== ans)).slice(0, 2);
      const end = /\S(ba|be) körülbelül/.test(txt) ? ' fér.' : '.';
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
    if (L < 3 && Math.random() < .35) { const ks = L === 1 ? ['háromszög', 'négyzet', 'téglalap'] : Object.keys(SIDES), a = pick(ks), b = pick(ks), da = SHAPE_DAT[a][0], db = SHAPE_DAT[b][0]; return { type: 'input', prompt: a === b ? `Hány ${ask} van összesen két ${da}?` : `Hány ${ask} van összesen egy ${da} és egy ${db}?`, answer: SIDES[a] + SIDES[b], visual: `<div class="row">${SHAPES[a](0)}${SHAPES[b](0)}</div>`, hint: 'Számold meg mindkét alakzat oldalait (csúcsait), és add össze!' }; }
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
