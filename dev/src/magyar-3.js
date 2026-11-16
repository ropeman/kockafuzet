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
