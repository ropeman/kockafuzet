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
