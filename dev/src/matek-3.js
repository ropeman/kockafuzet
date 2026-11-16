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
    return { type: 'input', prompt: 'Számold ki írásban!', visual: col(a, '−', b), answer: a - b, hint: 'Jobbról balra vonj ki. Ha a felső számjegy kisebb, kérj kölcsön egy tízest a szomszédtól. Ellenőrzés: különbség + kivonandó = kisebbítendő.' };
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
