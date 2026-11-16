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
    return { type: 'input', prompt: 'Számold ki írásban!', visual: col(a, '−', b), answer: a - b, hint: 'Jobbról balra vonj ki. Ha a felső számjegy kisebb, kölcsönözz tízest a szomszédos helyiértékről. Ellenőrzés: a különbség + a kivonandó = a kisebbítendő.' };
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
