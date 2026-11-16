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
const CAPS = [['Duna', 1], ['Balaton', 1], ['Budapest', 1], ['Magyarország', 1], ['Debrecen', 1], ['Mátra', 1], ['Tisza', 1], ['Szeged', 1], ['Anna', 1], ['Bence', 1], ['május', 2], ['hétfő', 2], ['szerda', 2], ['január', 2], ['magyar', 2], ['német', 2], ['tavasz', 2], ['folyó', 2], ['város', 2]];
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
    if (L === 1) return { type: 'input', prompt: `Hány szótagú ${artOf(plain)} <b>${plain}</b> szó?`, answer: w.split('-').length, hint: 'Annyi szótag van, ahány magánhangzó. Tapsold el a szót!' };
    const syls = w.split('-'), tk = tok(plain);
    const cnt = syls.map(s => tok(s).length), bounds = []; cnt.reduce((a, c) => { bounds.push(a + c); return a + c; }, 0); bounds.pop();
    const join = set => tk.map((g, i) => (set.has(i) ? '-' : '') + g).join('');
    const k = bounds.length, cands = Array.from({ length: tk.length - 1 }, (_, i) => i + 1);
    const wrongs = new Set(); let g = 0; const corr = join(new Set(bounds));
    while (wrongs.size < 2 && g++ < 80 && k > 0) { const s = new Set(shuffle(cands).slice(0, k)); const j = join(s); if (j !== corr) wrongs.add(j); }
    return mcq(`Hogyan választjuk el ${artOf(plain)} <b>${plain}</b> szót?`, corr, [...wrongs], { fmt: v => v, hint: 'Egy magánhangzó egy szótagot alkot. Két magánhangzó között általában az utolsó mássalhangzó kerül át a következő szótagba. A kettős betűket (cs, sz, ty, gy…) nem választjuk el.' });
  },
  root(L) {
    if (L === 1) {
      const [w, t] = pick(ROOTS1), wr = [w, w.slice(0, t.length - 1), w.slice(0, t.length + 1)].filter(x => x !== t && x.length > 0);
      return mcq(`Mi ${artOf(w)} <b>${w}</b> szó tője?`, t, wr, { fmt: v => v, hint: 'A szótő a szó „magja”, ahhoz kapcsoljuk a toldalékot. Vedd le a végéről a toldalékot.' });
    }
    if (L === 2) {
      const [w, t, a, b] = pick(ROOTS2);
      return mcq(`Melyik a szótő ${artOf(w)} <b>${w}</b> szóban?`, t, [w, w.slice(0, t.length + a.length), w.slice(0, t.length - 1)], { fmt: v => v, explain: `${t} + ${a} + ${b}`, hint: 'Két toldalék van a szó végén. A szótő az, ami marad, ha mindkettőt levesszük.' });
    }
    const [w, t, s] = pick(ROOTS1);
    return mcq(`Melyik a toldalék ${artOf(w)} <b>${w}</b> szóban?`, s, [t.slice(0, 2), t.slice(-1) + s.slice(0, 1), t].filter(x => x !== s), { fmt: v => v, explain: `${t} + ${s}`, hint: 'A toldalék a szó végén lévő rész, amit a szótőhöz teszünk.' });
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
    if (L === 3) { const ask = names[idx]; return mcq(`Melyik mondat szól a <b>${ask} időről</b>?`, tr[idx], tr.filter((_, i) => i !== idx), { fmt: v => v, hint: 'Múlt: -t, -tt, -ott; jelen: most történik; jövő: „fog”.' }); }
    const adv = L === 1 ? ['Most', 'Tegnap', 'Holnap'][idx] + ' ' : '';
    let s = tr[idx]; if (adv) s = adv + s[0].toLowerCase() + s.slice(1);
    return { type: 'choice', prompt: `Melyik időben van az ige?<br><b>${s}</b>`, answer: names[idx], options: names.map(n => ({ value: n, html: n + ' idő' })), hint: 'Múlt: már megtörtént. Jelen: most történik. Jövő: még nem történt meg, „fog” segíti.' };
  },
  meaning(L) {
    if (L === 1) { const [a, b] = pick(OPP), flip = Math.random() < .5, q = flip ? b : a, ans = flip ? a : b; return mcq(`Mi ${artOf(q)} <b>${q}</b> ellentéte?`, ans, shuffle(OPP.flat().filter(x => x !== ans && x !== q)).slice(0, 3), { fmt: v => v, hint: 'Az ellentét az ellenkező jelentésű szó.' }); }
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
