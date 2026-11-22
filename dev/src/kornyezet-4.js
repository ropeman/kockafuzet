/* ===== Környezetismeret 4 (NAT 2020 kerettanterv témakörei) ===== */
// drawings
function thermo(t, lo = -10, hi = 30) {
  const top = 16, bot = 216, y = v => bot - (v - lo) / (hi - lo) * (bot - top);
  let s = `<rect x="46" y="${top - 10}" width="24" height="${bot - top + 24}" rx="12" class="f-card s-ink" stroke-width="3"/>`;
  s += `<rect x="52" y="${y(t)}" width="12" height="${bot + 14 - y(t)}" class="f-red"/><circle cx="58" cy="${bot + 22}" r="19" class="f-red s-ink" stroke-width="3"/>`;
  for (let v = lo; v <= hi; v++) { const big = v % 5 === 0; s += `<line x1="74" y1="${y(v)}" x2="${big ? 92 : 83}" y2="${y(v)}" class="s-ink" stroke-width="${v % 10 === 0 ? 2.5 : big ? 1.8 : 1}"/>`; if (v % 10 === 0) s += `<text x="97" y="${y(v) + 5}" font-size="15" class="f-ink">${v}</text>`; }
  s += `<text x="58" y="${bot + 60}" text-anchor="middle" font-size="14" class="f-ink">°C</text>`;
  return svg(130, bot + 66, s, 'thermo');
}
const DIRS = ['észak', 'északkelet', 'kelet', 'délkelet', 'dél', 'délnyugat', 'nyugat', 'északnyugat'];
// wrong options for a direction question: never the neighbouring directions (they could be argued)
const farDirs = d => { const i = DIRS.indexOf(d); return DIRS.filter((_, j) => Math.min((i - j + 8) % 8, (j - i + 8) % 8) >= 2); };
function compass(dirIdx, labels) {
  let s = `<circle cx="110" cy="110" r="96" class="f-card s-ink" stroke-width="3"/>`;
  for (let i = 0; i < 8; i++) { const a = i * 45 * Math.PI / 180, r1 = i % 2 ? 78 : 70; s += `<line x1="${110 + r1 * Math.sin(a)}" y1="${110 - r1 * Math.cos(a)}" x2="${110 + 92 * Math.sin(a)}" y2="${110 - 92 * Math.cos(a)}" class="s-ink" stroke-width="${i % 2 ? 1.5 : 3}"/>`; }
  const ab = { 0: 'É', 1: 'ÉK', 2: 'K', 3: 'DK', 4: 'D', 5: 'DNy', 6: 'Ny', 7: 'ÉNy' };
  (labels || [0]).forEach(i => { const a = i * 45 * Math.PI / 180; s += `<text x="${110 + 54 * Math.sin(a)}" y="${110 - 54 * Math.cos(a) + 6}" text-anchor="middle" font-size="${i % 2 ? 14 : 18}" font-weight="700" class="f-ink">${ab[i]}</text>`; });
  if (dirIdx !== null) { const a = dirIdx * 45 * Math.PI / 180, x = 110 + 82 * Math.sin(a), yy = 110 - 82 * Math.cos(a); s += `<line x1="110" y1="110" x2="${x}" y2="${yy}" class="s-red" stroke-width="6" stroke-linecap="round" marker-end="url(#cah)"/>`; }
  s += `<circle cx="110" cy="110" r="7" class="f-ink"/>`;
  return svg(220, 220, `<defs><marker id="cah" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="#d8412f"/></marker></defs>${s}`, 'compass');
}
const PLANT_Y = { 'virág': 40, 'levél': 112, 'szár': 150, 'gyökér': 214 };
function plantSvg(part) {
  let s = `<rect x="0" y="182" width="220" height="70" fill="#b98a5a" opacity=".35"/><line x1="0" y1="182" x2="220" y2="182" stroke="#8a5a2b" stroke-width="3"/>`;
  s += `<path d="M100 182 q-4 22 -22 40 M100 182 q2 26 -2 52 M100 182 q6 20 26 36 M90 206 q-10 4 -18 2 M110 214 q10 0 16 6" fill="none" stroke="#8a5a2b" stroke-width="3" stroke-linecap="round"/>`;
  s += `<path d="M100 182 C100 140 98 100 100 58" fill="none" stroke="#2f9e44" stroke-width="7" stroke-linecap="round"/>`;
  s += `<path d="M100 128 C70 100 50 112 44 124 C66 136 86 136 100 128Z" fill="#40c057" stroke="#2b8a3e" stroke-width="2"/><path d="M100 104 C130 78 150 90 156 102 C134 114 114 114 100 104Z" fill="#40c057" stroke="#2b8a3e" stroke-width="2"/>`;
  for (let i = 0; i < 6; i++) { const a = i * 60 * Math.PI / 180; s += `<ellipse cx="${100 + 18 * Math.sin(a)}" cy="${40 - 18 * Math.cos(a)}" rx="11" ry="15" transform="rotate(${i * 60} ${100 + 18 * Math.sin(a)} ${40 - 18 * Math.cos(a)})" fill="#f783ac" stroke="#c2255c" stroke-width="1.5"/>`; }
  s += `<circle cx="100" cy="40" r="10" fill="#ffd43b" stroke="#e67700" stroke-width="2"/>`;
  if (part) { const yy = PLANT_Y[part], x0 = part === 'levél' ? 150 : part === 'virág' ? 122 : part === 'gyökér' ? 126 : 106; s += `<line x1="200" y1="${yy}" x2="${x0 + 8}" y2="${yy}" class="s-red" stroke-width="4"/><path d="M${x0} ${yy} l12 -7 v14z" class="f-red"/><circle cx="205" cy="${yy}" r="12" class="f-hi s-ink" stroke-width="2"/><text x="205" y="${yy + 6}" text-anchor="middle" font-size="16" font-weight="700" class="f-ink">?</text>`; }
  return svg(220, 252, s, 'plant');
}
const EMO = { kutya: '🐕', tehén: '🐄', 'ló': '🐎', 'sün': '🦔', denevér: '🦇', 'bálna': '🐋', delfin: '🐬', 'mókus': '🐿️', 'nyúl': '🐇', 'hattyú': '🦢', sas: '🦅', pingvin: '🐧', 'tyúk': '🐓', kacsa: '🦆', bagoly: '🦉', 'cápa': '🦈', 'béka': '🐸', 'gyík': '🦎', 'kígyó': '🐍', 'teknős': '🐢', krokodil: '🐊', 'méh': '🐝', katica: '🐞', 'hangya': '🐜', lepke: '🦋', 'szöcske': '🦗', 'légy': '🪰', 'szúnyog': '🦟', ponty: '🐟', 'harcsa': '🐟',
  szarvas: '🦌', vaddisznó: '🐗', gomba: '🍄', 'tölgyfa': '🌳', 'mezei nyúl': '🐇', 'pipacs': '🌺', 'vidra': '🦦', 'nád': '🌾', 'szitakötő': '🪽', 'harkály': '🐦', 'fácán': '🐦', 'gém': '🐦', 'ürge': '🐿️' };
const emo = w => EMO[w] ? `<div class="big-emoji" role="img" aria-label="${w}">${EMO[w]}</div>` : '';

const ANIMALS = {
  'emlős': ['kutya', 'tehén', 'ló', 'sün', 'mókus', 'nyúl', 'denevér', 'bálna', 'delfin'],
  'madár': ['hattyú', 'sas', 'tyúk', 'kacsa', 'bagoly', 'gólya', 'cinege', 'pingvin', 'strucc'],
  'hal': ['ponty', 'csuka', 'harcsa', 'cápa', 'pisztráng'],
  'kétéltű': ['béka', 'gőte', 'szalamandra'],
  'hüllő': ['gyík', 'kígyó', 'teknős', 'krokodil', 'vipera'],
  'rovar': ['méh', 'katica', 'hangya', 'lepke', 'szöcske', 'légy', 'szúnyog', 'cserebogár']
};
const TRICKY = ['denevér', 'bálna', 'delfin', 'pingvin', 'strucc', 'teknős', 'cápa', 'gőte'];
const AFEAT = [
  ['Tollas a teste, tojással szaporodik, a mellső végtagja szárny.', 'madár'],
  ['Hat lába van, a teste három részből áll.', 'rovar'],
  ['Kopoltyúval lélegzik, uszonyokkal úszik.', 'hal'],
  ['Szőrös a teste, a kicsinyeit szoptatja.', 'emlős'],
  ['Csupasz, nedves a bőre, a vízben és a szárazföldön is él.', 'kétéltű'],
  ['Pikkelyes, száraz a bőre, tojással szaporodik.', 'hüllő']
];
const HABITAT = {
  'erdő': ['szarvas', 'vaddisznó', 'harkály', 'mókus', 'szajkó', 'gomba', 'tölgyfa', 'bükkfa', 'páfrány', 'szalamandra'],
  'mező': ['ürge', 'mezei pocok', 'pacsirta', 'fácán', 'mezei nyúl', 'pipacs', 'búzavirág', 'szöcske', 'fürj', 'kamilla'],
  'víz, vízpart': ['gém', 'vidra', 'béka', 'nád', 'gyékény', 'fűzfa', 'tavirózsa', 'szitakötő', 'hattyú', 'ponty']
};
const CHAINS = [['fű', 'szöcske', 'béka', 'gólya'], ['fű', 'nyúl', 'róka'], ['búzaszem', 'mezei pocok', 'bagoly'], ['levél', 'hernyó', 'cinege', 'karvaly'], ['makk', 'vaddisznó', 'farkas'], ['szúnyoglárva', 'kishal', 'csuka', 'vidra']];

const K4 = {
  state(L) {
    if (L === 1) {
      const items = { 'szilárd': ['jég', 'kő', 'vaj', 'fa', 'homok', 'vas', 'üveg', 'csoki'], 'folyékony': ['víz', 'tej', 'olaj', 'méz', 'szörp', 'tea'], 'légnemű': ['levegő', 'vízgőz', 'füst'] };
      const k = pick(Object.keys(items)), w = pick(items[k]);
      return { type: 'choice', prompt: `Milyen halmazállapotú: <b>${w}</b>?`, answer: k, options: Object.keys(items).map(v => ({ value: v, html: v })), hint: 'Szilárd: megtartja az alakját. Folyékony: felveszi az edény alakját, folyik. Légnemű: kitölti a teret, gyakran nem is látjuk.' };
    }
    if (L === 2) {
      const [txt, ans] = pick([['A jégkocka a meleg szobában vízzé válik.', 'olvadás'], ['Télen a tócsa vize jéggé válik.', 'fagyás'], ['A napon a vizes ruha megszárad, a víz eltűnik belőle.', 'párolgás'],
        ['A fazékban a víz bugyogni kezd, és gőz száll fel belőle.', 'forrás'], ['A hideg ablaküvegen vízcseppek jelennek meg.', 'lecsapódás'], ['A tavaszi napsütésben elolvad a hóember.', 'olvadás'], ['A fürdőszoba tükre bepárásodik zuhanyzás után.', 'lecsapódás'], ['A mélyhűtőben a víz megfagy.', 'fagyás']]);
      return mcq(`Mi történik? ${txt}`, ans, shuffle(['olvadás', 'fagyás', 'párolgás', 'forrás', 'lecsapódás'].filter(x => x !== ans)).slice(0, 3), { fmt: v => v, hint: 'Olvadás: szilárdból folyékony. Fagyás: folyékonyból szilárd. Párolgás és forrás: folyékonyból légnemű (forrás: bugyogva, melegítéskor). Lecsapódás: légneműből folyékony.' });
    }
    const t = Math.random() < .4 ? ri(-10, -1) : ri(0, 30);
    return { type: 'input', prompt: 'Hány fokot mutat a hőmérő? (°C)', visual: thermo(t), answer: t, neg: t < 0, hint: 'A hosszú vonalak 10 fokonként, a közepesek 5 fokonként vannak, a kis vonalak 1 fokot jelentenek. A 0 alatti értékek mínuszok.' };
  },
  measure(L) {
    if (L === 1) {
      const [q, a] = pick([['Mivel mérjük a hőmérsékletet?', 'hőmérővel'], ['Mivel mérjük a tömeget (milyen nehéz valami)?', 'mérleggel'], ['Mivel mérjük meg a szoba hosszát?', 'mérőszalaggal'], ['Mivel mérjük a folyadék mennyiségét?', 'mérőpohárral'], ['Mivel mérjük az időt?', 'órával']]);
      return mcq(q, a, ['hőmérővel', 'mérleggel', 'mérőszalaggal', 'mérőpohárral', 'órával'].filter(x => x !== a).sort(() => Math.random() - .5).slice(0, 3), { fmt: v => v, hint: 'Hőmérő: hőmérséklet. Mérleg: tömeg. Mérőszalag, vonalzó: hosszúság. Mérőpohár: űrtartalom. Óra: idő.' });
    }
    if (L === 2) {
      const [q, a, w] = pick([['Mi a hőmérséklet mértékegysége?', '°C (Celsius-fok)', ['kg', 'cm', 'l']], ['Melyik a tömeg mértékegysége?', 'kg', ['°C', 'm', 'dl']], ['Melyik a hosszúság mértékegysége?', 'cm', ['kg', 'l', '°C']], ['Melyik az űrtartalom mértékegysége?', 'dl', ['kg', 'cm', '°C']], ['Melyik az idő mértékegysége?', 'perc', ['kg', 'cm', 'l']]]);
      return mcq(q, a, w, { fmt: v => v, hint: 'Hosszúság: mm, cm, dm, m, km. Tömeg: g, dkg, kg. Űrtartalom: ml, dl, l. Idő: másodperc, perc, óra. Hőmérséklet: °C.' });
    }
    const [a, b, k, max] = pick([['l', 'dl', 10, 9], ['kg', 'dkg', 100, 5], ['m', 'cm', 100, 5], ['km', 'm', 1000, 5], ['óra', 'perc', 60, 3], ['perc', 'másodperc', 60, 3]]);
    const n = ri(1, max);
    return { type: 'input', prompt: `${n} ${a} = <span class="blank">?</span> ${b}`, answer: n * k, hint: `1 ${a} = ${k} ${b}` };
  },
  weather(L) {
    if (L === 1) {
      const [em, ans] = pick([['☀️', 'napos'], ['🌧️', 'esős'], ['🌨️', 'havazik'], ['⛈️', 'zivatar'], ['🌫️', 'ködös'], ['💨', 'szeles'], ['☁️', 'borult, felhős']]);
      return mcq('Milyen időt jelöl ez a jel?', ans, shuffle(['napos', 'esős', 'havazik', 'zivatar', 'ködös', 'szeles', 'borult, felhős'].filter(x => x !== ans)).slice(0, 3), { visual: `<div class="big-emoji">${em}</div>`, fmt: v => v, hint: 'Az időjárás elemei: hőmérséklet, csapadék, szél, felhőzet. Az időjárás-jelentés ezeket rajzokkal mutatja.' });
    }
    if (L === 2) {
      const [q, a, w] = pick([['Mivel mérjük, mennyi eső esett?', 'csapadékmérővel', ['hőmérővel', 'szélzászlóval', 'mérleggel']], ['Mi mutatja, merről fúj a szél?', 'a szélzászló', ['a hőmérő', 'a csapadékmérő', 'az iránytű']], ['Mivel mérjük a levegő hőmérsékletét?', 'hőmérővel', ['csapadékmérővel', 'szélzászlóval', 'vonalzóval']], ['Melyik NEM az időjárás eleme?', 'a földrengés', ['a szél', 'a csapadék', 'a hőmérséklet']]]);
      return mcq(q, a, w, { fmt: v => v, hint: 'Hőmérő: hőmérséklet. Csapadékmérő: mennyi eső vagy hó esett. Szélzászló: a szél iránya.' });
    }
    const odd = pick(['szél', 'napsütés', 'villám']), cs = shuffle(['eső', 'hó', 'jégeső', 'dér', 'harmat']).slice(0, 3);
    return mcq('Melyik NEM csapadék?', odd, cs, { fmt: v => v, hint: 'Csapadék a levegőből lehulló vagy kicsapódó víz: eső, hó, jégeső, dér, harmat.' });
  },
  energy(L) {
    if (L === 1) {
      const nat = ['a Nap', 'a villám', 'a csillagok', 'a szentjánosbogár'], art = ['a zseblámpa', 'a villanykörte', 'a gyertya', 'az utcai lámpa'];
      const isNat = Math.random() < .5, w = pick(isNat ? nat : art);
      return { type: 'choice', prompt: `Milyen fényforrás ${w}?`, answer: isNat ? 'természetes' : 'mesterséges', options: [{ value: 'természetes', html: 'természetes' }, { value: 'mesterséges', html: 'mesterséges (ember készítette)' }], hint: 'A természetes fényforrás magától világít (Nap, villám). A mesterségeset az ember készítette (lámpa, gyertya).' };
    }
    if (L === 2) {
      const burn = ['fa', 'papír', 'szén', 'gyertyaviasz', 'száraz levél', 'fenyőtoboz'], no = ['kő', 'vas', 'üveg', 'homok', 'víz', 'tégla'];
      const want = Math.random() < .5, ans = pick(want ? burn : no), wr = shuffle(want ? no : burn).slice(0, 3);
      return mcq(`Melyik anyag ${want ? 'éghető' : 'éghetetlen'}?`, ans, wr, { fmt: v => v, hint: 'Az éghető anyagok meggyulladnak és elégnek (fa, papír). Az éghetetlenek nem (kő, fém, üveg, víz).' });
    }
    const [q, a, w, hint] = pick([
      ['Mi NEM kell az égéshez?', 'víz', ['éghető anyag', 'levegő', 'elég magas hőmérséklet'], 'Az égéshez három dolog kell: éghető anyag, levegő (oxigén) és elég magas hőmérséklet. Ezért oltja el a víz a tüzet.'],
      ['Melyik helyváltoztató mozgás?', 'futás', ['guggolás', 'karkörzés', 'hajolás'], 'Helyváltoztató mozgás: máshová kerülünk (futás, úszás). Helyzetváltoztató: helyben maradunk, csak a testhelyzet változik.'],
      ['Melyik helyzetváltoztató mozgás?', 'guggolás', ['futás', 'úszás', 'kerékpározás'], 'Helyzetváltoztató mozgásnál helyben maradunk, csak a testhelyzetünk változik.'],
      ['Melyik a ló leggyorsabb járásmódja?', 'vágta', ['lépés', 'ügetés', 'poroszkálás'], 'A ló járásmódjai a leglassabbtól: lépés, ügetés (és poroszkálás), vágta.'],
      ['Mi mozgatja a csontjainkat?', 'az izmok', ['a bőr', 'a szív', 'a tüdő'], 'A csontokat az izmok mozgatják, az ízületekben hajlanak.'],
      ['Mi a szivárvány?', 'a napfény színekre bomlása az esőcseppekben', ['egy fényes felhő', 'a villám nyoma', 'a Hold fénye'], 'Ha a napfény esőcseppeken halad át, színekre bomlik: így látjuk a szivárványt.']]);
    return mcq(q, a, w, { fmt: v => v, hint });
  },
  plant(L) {
    if (L === 1) { const part = pick(Object.keys(PLANT_Y)); return mcq('Mi a neve a nyíllal jelölt résznek?', part, Object.keys(PLANT_Y).filter(x => x !== part), { visual: plantSvg(part), fmt: v => v, hint: 'A növény részei alulról felfelé: gyökér (a földben), szár, levél, virág. A virágból lesz a termés, abban van a mag.' }); }
    if (L === 2) {
      const [q, a] = pick([['Melyik rész veszi fel a vizet a talajból?', 'gyökér'], ['Melyik rész szállítja a vizet a levelekhez?', 'szár'], ['Melyik rész készít táplálékot a napfény segítségével?', 'levél'], ['Melyik rész csalogatja a rovarokat?', 'virág'], ['Miben fejlődik a mag?', 'termés'], ['Melyik rész rögzíti a növényt a talajban?', 'gyökér']]);
      return mcq(q, a, ['gyökér', 'szár', 'levél', 'virág', 'termés'].filter(x => x !== a).sort(() => Math.random() - .5).slice(0, 3), { fmt: v => v, hint: 'Gyökér: rögzít, vizet szív fel. Szár: tart és szállít. Levél: napfényből táplálékot készít. Virág: belőle lesz a termés. Termés: védi a magot.' });
    }
    if (Math.random() < .35) return { type: 'build', prompt: 'Rakd sorba a növény életszakaszait! Koppints rájuk sorban.', answer: ['csírázás', 'növekedés', 'virágzás', 'termésérés'], tiles: shuffle(['csírázás', 'növekedés', 'virágzás', 'termésérés']), explain: 'A magból kicsírázik a növény, megnő, virágot hoz, végül megérik a termése.', hint: 'Minden a magból indul.' };
    const [w, a, em] = pick([['répa', 'gyökér', '🥕'], ['retek', 'gyökér', ''], ['cékla', 'gyökér', ''], ['alma', 'termés', '🍎'], ['paradicsom', 'termés', '🍅'], ['paprika', 'termés', '🫑'], ['saláta', 'levél', '🥬'], ['káposzta', 'levél', ''], ['karfiol', 'virág', ''], ['brokkoli', 'virág', '🥦'], ['borsó', 'mag', ''], ['napraforgó', 'mag', '🌻'], ['spárga', 'szár', '']]);
    return mcq(`Melyik részét esszük ennek a növénynek: <b>${w}</b>?`, a, ['gyökér', 'szár', 'levél', 'virág', 'termés', 'mag'].filter(x => x !== a).sort(() => Math.random() - .5).slice(0, 3), { visual: em ? `<div class="big-emoji">${em}</div>` : undefined, fmt: v => v, hint: 'Gondold végig, hol nő az a rész, amit megeszünk: a földben (gyökér), a szárán, levélként, virágként vagy termésként.' });
  },
  animal(L) {
    const groups = Object.keys(ANIMALS);
    if (L === 2) { const [d, a] = pick(AFEAT); return mcq(`Melyik állatcsoportra igaz? ${d}`, a, groups.filter(x => x !== a).sort(() => Math.random() - .5).slice(0, 3), { fmt: v => v, hint: 'Emlős: szőr, szoptat. Madár: toll, tojás. Hal: kopoltyú, uszony. Kétéltű: csupasz, nedves bőr. Hüllő: pikkely, száraz bőr. Rovar: 6 láb.' }); }
    let w; do { w = L === 3 ? pick(TRICKY) : pick(ANIMALS[pick(groups)]); } while (L === 1 && TRICKY.includes(w));
    const g = groups.find(k => ANIMALS[k].includes(w));
    const why = { 'denevér': 'A denevér repül, de szőrös, és szoptatja a kicsinyeit: emlős.', 'bálna': 'A bálna a vízben él, de levegőt vesz és szoptat: emlős.', 'delfin': 'A delfin levegőt vesz és szoptat: emlős.', 'pingvin': 'A pingvin nem repül, de tollas és tojást rak: madár.', 'strucc': 'A strucc nem repül, de tollas és tojást rak: madár.', 'teknős': 'A teknős pikkelyes bőrű és tojást rak: hüllő.', 'cápa': 'A cápa kopoltyúval lélegzik: hal.', 'gőte': 'A gőte csupasz, nedves bőrű, vízben és szárazon is él: kétéltű.' }[w];
    return mcq(`Melyik csoportba tartozik ez az állat: <b>${w}</b>?`, g, groups.filter(x => x !== g).sort(() => Math.random() - .5).slice(0, 3), { visual: emo(w) || undefined, fmt: v => v, explain: why, hint: 'Emlős: szőr, szoptat. Madár: toll, tojás. Hal: kopoltyú. Kétéltű: csupasz bőr, víz és szárazföld. Hüllő: pikkely. Rovar: 6 láb.' });
  },
  habitat(L) {
    if (L === 1) { const k = pick(Object.keys(HABITAT)), w = pick(HABITAT[k]); return { type: 'choice', prompt: `Hol él ez az élőlény: <b>${w}</b>?`, visual: emo(w) || undefined, answer: k, options: Object.keys(HABITAT).map(v => ({ value: v, html: v })), hint: 'Gondold végig, mit eszik és hol talál menedéket: a fák között, a füves mezőn vagy a víz mellett?' }; }
    if (L === 2) {
      if (Math.random() < .5) { const a = pick(['park', 'szántóföld', 'gyümölcsös', 'kert']); return mcq('Melyik mesterséges (ember által létrehozott) életközösség?', a, ['erdő', 'tópart', 'hegyi rét'], { fmt: v => v, hint: 'A mesterséges életközösséget az ember hozta létre és gondozza: park, kert, szántóföld.' }); }
      const k = pick(Object.keys(HABITAT)), others = Object.keys(HABITAT).filter(x => x !== k), odd = pick(HABITAT[pick(others)]), same = shuffle(HABITAT[k]).slice(0, 3);
      return mcq('Melyik nem illik a többi közé? (Ugyanott élnek?)', odd, same, { fmt: v => v, explain: `A többi: ${k} élőlénye.`, hint: 'Keresd azt, amelyik más életközösségben él.' });
    }
    const ch = pick(CHAINS);
    return { type: 'build', prompt: 'Rakd sorba a táplálékláncot! Kezdd azzal, akit megesznek.', answer: ch, tiles: shuffle(ch), explain: ch.join(' → '), hint: 'A tápláléklánc egy növénnyel kezdődik. Utána az jön, aki megeszi, aztán az, aki őt eszi meg.' };
  },
  body(L) {
    if (L === 1) { const [e, s] = pick([['szem', 'látás'], ['fül', 'hallás'], ['orr', 'szaglás'], ['nyelv', 'ízlelés'], ['bőr', 'tapintás']]); const em = { szem: '👁️', 'fül': '👂', orr: '👃', nyelv: '👅', 'bőr': '✋' }[e]; return mcq(`Mire való ez az érzékszerv: <b>${e}</b>?`, s, ['látás', 'hallás', 'szaglás', 'ízlelés', 'tapintás'].filter(x => x !== s).sort(() => Math.random() - .5).slice(0, 3), { visual: `<div class="big-emoji">${em}</div>`, fmt: v => v, hint: 'Öt érzékszervünk van: szem, fül, orr, nyelv, bőr.' }); }
    const [q, a, w] = pick([['Melyik szervünk pumpálja a vért?', 'a szív', ['a tüdő', 'a gyomor', 'az agy']], ['Melyik szervünkkel lélegzünk?', 'a tüdő', ['a szív', 'a máj', 'a gyomor']], ['Hol kezdődik az étel megemésztése, miután lenyeltük?', 'a gyomorban', ['a tüdőben', 'a szívben', 'az agyban']], ['Melyik szervünk irányítja a testünket, és gondolkodunk vele?', 'az agy', ['a szív', 'a gyomor', 'a tüdő']], ['Mi tartja a testünket, és védi a belső szerveket?', 'a csontváz', ['a bőr', 'a haj', 'a szív']], ['Mi köti össze a csontokat, hogy hajlítani tudjuk őket?', 'az ízületek', ['a fogak', 'a körmök', 'a tüdő']]]);
    return mcq(q, a, w, { fmt: v => v, hint: 'Szív: vérkeringés. Tüdő: légzés. Gyomor: emésztés. Agy: irányítás, gondolkodás. Csontok, izmok, ízületek: mozgás.' });
  },
  health(L) {
    if (L === 1) {
      const [q, a, w] = pick([['Melyik egészséges szokás?', 'Minden nap zöldséget és gyümölcsöt eszem.', ['Sok cukros üdítőt iszom.', 'Késő éjszakáig tévézek.', 'Reggeli nélkül megyek iskolába.']], ['Melyik egészséges szokás?', 'Minden nap mozgok a szabadban.', ['Egész délután a telefont nyomkodom.', 'Sok chipset eszem.', 'Nem mosok kezet evés előtt.']], ['Mit tegyél, ha tüsszentesz?', 'Zsebkendőbe vagy a könyökhajlatomba tüsszentek.', ['A tenyerembe tüsszentek, aztán kezet fogok.', 'Mások felé fordulok.', 'Semmit, ez nem számít.']], ['Mikor kell kezet mosni?', 'Evés előtt és WC-használat után.', ['Csak hetente egyszer.', 'Csak ha látszik a kosz.', 'Soha.']]]);
      return mcq(q, a, w, { fmt: v => v, hint: 'Egészséges: változatos étrend, sok mozgás, elég alvás, tisztálkodás.' });
    }
    if (L === 2) {
      const [q, a, w] = pick([['Mi a mentők telefonszáma?', '104', ['105', '107', '108']], ['Mi a tűzoltók telefonszáma?', '105', ['104', '107', '106']], ['Mi a rendőrség telefonszáma?', '107', ['104', '105', '103']], ['Melyik az általános segélyhívó szám, amelyet bármilyen vészhelyzetben hívhatsz?', '112', ['104', '105', '107']]]);
      return mcq(q, a, w, { fmt: v => v, hint: 'Mentők: 104. Tűzoltók: 105. Rendőrség: 107. Általános segélyhívó: 112.' });
    }
    const [q, a, w] = pick([['Körülbelül mennyi az egészséges ember testhőmérséklete?', '36,5 °C', ['33 °C', '39 °C', '41 °C']], ['Mivel mérjük a lázat?', 'lázmérővel', ['mérleggel', 'vonalzóval', 'órával']], ['Mire jó a védőoltás?', 'Megvéd bizonyos betegségektől.', ['Gyorsabban nő tőle a hajunk.', 'Elmulasztja a fogfájást.', 'Erősebbek lesznek az izmaink.']], ['Melyik a nátha jellemző tünete?', 'orrfolyás, tüsszögés', ['kék folt a térden', 'fogfájás', 'hajhullás']], ['Milyen betegségnél jelennek meg viszkető pöttyök az egész testen?', 'bárányhimlő', ['nátha', 'fogszuvasodás', 'napszúrás']]]);
    return mcq(q, a, w, { fmt: v => v, hint: 'Az egészséges testhőmérséklet 36–37 °C. Ennél magasabb: láz. A védőoltás felkészíti a szervezetet egy betegség ellen.' });
  },
  compass(L) {
    if (L < 3) { const i = L === 1 ? pick([0, 2, 4, 6]) : pick([1, 3, 5, 7]); return mcq('Merre mutat a piros nyíl?', DIRS[i], shuffle(DIRS.filter(x => x !== DIRS[i] && (L === 1 ? DIRS.indexOf(x) % 2 === 0 : true))).slice(0, 3), { visual: compass(i, [0]), fmt: v => v, hint: 'Fent van az észak (É), lent a dél (D), jobbra a kelet (K), balra a nyugat (Ny). A mellékvilágtájak kettő között: északkelet, délkelet, délnyugat, északnyugat.' }); }
    if (Math.random() < .5) {
      const i = ri(0, 7), turn = pick([['jobbra', 2], ['balra', -2], ['hátra', 4]]), j = (i + turn[1] + 8) % 8;
      return mcq(`${cap(DIRS[i])} felé nézel. Ha ${turn[0]} fordulsz, merre nézel?`, DIRS[j], shuffle(DIRS.filter(x => x !== DIRS[j])).slice(0, 3), { visual: compass(null, [0, 2, 4, 6]), fmt: v => v, hint: 'Ha észak felé nézel, jobb kezed felől van a kelet, bal kezed felől a nyugat, mögötted a dél.' });
    }
    const [city, d] = pick([['Szeged', 'délkelet'], ['Pécs', 'délnyugat'], ['Miskolc', 'északkelet'], ['Sopron', 'nyugat'], ['Debrecen', 'kelet'], ['Eger', 'északkelet'], ['Kecskemét', 'délkelet'], ['Szombathely', 'nyugat'], ['Nyíregyháza', 'északkelet'], ['Zalaegerszeg', 'délnyugat'], ['Kaposvár', 'délnyugat'], ['Békéscsaba', 'délkelet']]);
    return mcq(`Budapesttől milyen irányban van ${city}?`, d, shuffle(farDirs(d)).slice(0, 3), { fmt: v => v, hint: 'Gondolj Magyarország térképére: Budapest középen, kicsit feljebb. Fent az észak, jobbra a kelet.' });
  },
  landform(L) {
    if (L === 1) {
      const [q, a] = pick([['Hogy hívjuk a nagy, sík, alacsony területet?', 'síkság'], ['Hogy hívjuk az egymás melletti dombok csoportját?', 'dombság'], ['Hogy hívjuk az egymás melletti hegyek csoportját?', 'hegység'], ['Hogy hívjuk a két hegy vagy domb közötti mélyedést?', 'völgy'], ['Hogy hívjuk a kis, keskeny folyóvizet?', 'patak'], ['Hogy hívjuk a patakoknál sokkal nagyobb, széles, sok vizet szállító vízfolyást?', 'folyó']]);
      return mcq(q, a, shuffle(['síkság', 'dombság', 'hegység', 'völgy', 'patak', 'folyó', 'tó'].filter(x => x !== a)).slice(0, 3), { fmt: v => v, hint: 'Felszínformák: síkság, domb, dombság, hegy, hegység, völgy. Vizek: forrás, patak, folyó, tó.' });
    }
    if (L === 2) { const flow = Math.random() < .5, a = pick(flow ? ['patak', 'csermely', 'csatorna'] : ['tó', 'mocsár', 'halastó']); return mcq(`Melyik ${flow ? 'folyóvíz' : 'állóvíz'}?`, a, shuffle(flow ? ['tó', 'mocsár', 'halastó'] : ['patak', 'csermely', 'csatorna']).slice(0, 2), { fmt: v => v, hint: 'A folyóvíz mozog, folyik egy irányba (patak, folyó). Az állóvíz egy helyben marad (tó, mocsár).' }); }
    const [q, a, w] = pick([['Mi hazánk legmagasabb pontja?', 'a Kékes', ['a Gellért-hegy', 'a Mecsek', 'a Badacsony']], ['Melyik hazánk leghosszabb folyója (az országon belül mért hossz alapján)?', 'a Tisza', ['a Duna', 'a Rába', 'a Dráva']], ['Melyik Közép-Európa legnagyobb tava?', 'a Balaton', ['a Velencei-tó', 'a Fertő tó', 'a Tisza-tó']], ['Melyik folyó szeli ketté Budapestet?', 'a Duna', ['a Tisza', 'a Rába', 'a Zagyva']], ['Melyik hazánk legnagyobb nagytája?', 'az Alföld', ['a Kisalföld', 'az Északi-középhegység', 'a Dunántúli-dombság']], ['Melyik hegységben van a Kékes?', 'a Mátrában', ['a Bükkben', 'a Mecsekben', 'a Bakonyban']]]);
    return mcq(q, a, w, { fmt: v => v, hint: 'Kékes: 1014 m, a Mátrában. A Tisza a leghosszabb folyónk az országon belül, a Balaton a legnagyobb tavunk.' });
  },
  regions(L) {
    const R = ['Alföld', 'Kisalföld', 'Nyugat-magyarországi-peremvidék', 'Dunántúli-dombság', 'Dunántúli-középhegység', 'Északi-középhegység'];
    const PL = [['Hortobágy', 'Alföld'], ['Nyírség', 'Alföld'], ['Duna–Tisza köze', 'Alföld'], ['Szigetköz', 'Kisalföld'], ['Hanság', 'Kisalföld'], ['Kőszegi-hegység', 'Nyugat-magyarországi-peremvidék'], ['Göcsej', 'Nyugat-magyarországi-peremvidék'],
      ['Mecsek', 'Dunántúli-dombság'], ['Tolnai-dombság', 'Dunántúli-dombság'], ['Bakony', 'Dunántúli-középhegység'], ['Vértes', 'Dunántúli-középhegység'], ['Pilis', 'Dunántúli-középhegység'], ['Mátra', 'Északi-középhegység'], ['Bükk', 'Északi-középhegység'], ['Börzsöny', 'Északi-középhegység'], ['Zemplén', 'Északi-középhegység']];
    if (L === 1) {
      const [q, a] = pick([['Melyik hazánk legnagyobb és legalacsonyabban fekvő nagytája?', 'Alföld'], ['Melyik nagytájon van hazánk legmagasabb pontja, a Kékes?', 'Északi-középhegység'], ['Melyik nagytáj fekszik az ország északnyugati sarkában, a Duna mentén?', 'Kisalföld'], ['Melyik nagytáj húzódik az ország nyugati határa mentén, az Alpok lábánál?', 'Nyugat-magyarországi-peremvidék'], ['Melyik nagytáj hegyei húzódnak a Balatontól északra?', 'Dunántúli-középhegység']]);
      return mcq(q, a, shuffle(R.filter(x => x !== a)).slice(0, 3), { fmt: v => v, hint: 'Hazánk hat nagytája: Alföld, Kisalföld, Nyugat-magyarországi-peremvidék, Dunántúli-dombság, Dunántúli-középhegység, Északi-középhegység.' });
    }
    if (L === 2) { const [p, a] = pick(PL); return mcq(`Melyik nagytájhoz tartozik: <b>${p}</b>?`, a, shuffle(R.filter(x => x !== a)).slice(0, 3), { fmt: v => v, hint: 'Az Alföld és a Kisalföld síkság. A Dunántúli- és az Északi-középhegység hegyei: Bakony, Vértes, Pilis, illetve Mátra, Bükk, Börzsöny, Zemplén. A Mecsek a Dunántúli-dombságban van.' }); }
    const reg = pick(['Dunántúli-középhegység', 'Északi-középhegység', 'Alföld']), a = pick(PL.filter(x => x[1] === reg))[0], wr = shuffle(PL.filter(x => x[1] !== reg)).slice(0, 3).map(x => x[0]);
    return mcq(`Melyik tartozik ide: <b>${reg}</b>?`, a, wr, { fmt: v => v, hint: 'Északi-középhegység: Börzsöny, Mátra, Bükk, Zemplén. Dunántúli-középhegység: Bakony, Vértes, Pilis. Alföld: Hortobágy, Nyírség, Duna–Tisza köze.' });
  },
  country(L) {
    const NB = ['Ausztria', 'Szlovákia', 'Ukrajna', 'Románia', 'Szerbia', 'Horvátország', 'Szlovénia'];
    if (L === 1) { const odd = pick(['Lengyelország', 'Csehország', 'Németország', 'Olaszország', 'Bulgária']); return mcq('Melyik ország NEM szomszédos Magyarországgal?', odd, shuffle(NB).slice(0, 3), { fmt: v => v, hint: 'Hazánknak hét szomszédja van: Ausztria, Szlovákia, Ukrajna, Románia, Szerbia, Horvátország, Szlovénia.' }); }
    if (L === 2) { const [c, d] = pick([['Ausztria', 'nyugat'], ['Szlovákia', 'észak'], ['Ukrajna', 'északkelet'], ['Románia', 'kelet'], ['Szerbia', 'dél'], ['Horvátország', 'délnyugat']]); return mcq(`Magyarországtól milyen irányban van ${c}?`, d, shuffle(farDirs(d)).slice(0, 3), { fmt: v => v, hint: 'Nyugaton Ausztria, északon Szlovákia, északkeleten Ukrajna, keleten Románia, délen Szerbia, délnyugaton Horvátország és Szlovénia.' }); }
    const MS = [['Bács-Kiskun', 'Kecskemét'], ['Baranya', 'Pécs'], ['Békés', 'Békéscsaba'], ['Borsod-Abaúj-Zemplén', 'Miskolc'], ['Csongrád-Csanád', 'Szeged'], ['Fejér', 'Székesfehérvár'], ['Győr-Moson-Sopron', 'Győr'], ['Hajdú-Bihar', 'Debrecen'], ['Heves', 'Eger'], ['Jász-Nagykun-Szolnok', 'Szolnok'], ['Komárom-Esztergom', 'Tatabánya'], ['Nógrád', 'Salgótarján'], ['Pest', 'Budapest'], ['Somogy', 'Kaposvár'], ['Szabolcs-Szatmár-Bereg', 'Nyíregyháza'], ['Tolna', 'Szekszárd'], ['Vas', 'Szombathely'], ['Veszprém', 'Veszprém'], ['Zala', 'Zalaegerszeg']];
    const [m, sz] = pick(MS.filter(([m, sz]) => !m.includes(sz) && m !== 'Pest'));
    return mcq(`Mi a székhelye ennek a megyének: <b>${m}</b>?`, sz, shuffle(MS.filter(x => x[1] !== sz)).slice(0, 3).map(x => x[1]), { fmt: v => v, hint: 'Magyarországnak 19 megyéje van, mindegyiknek van székhelye. Pest megye székhelye Budapest, a főváros.' });
  }
};

/* ---------- interactive variants (sort, label, set, riddle) ---------- */
function bodySvg() {
  let s = `<circle cx="110" cy="52" r="40" fill="#f3c9a5" stroke="#1d2742" stroke-width="2.5"/>`;
  s += `<path d="M84 46 C84 26 136 24 136 46 C138 60 84 62 84 46Z" fill="#f4a6c1" stroke="#c2255c" stroke-width="2"/><path d="M96 38 q6 6 0 12 M110 32 q-6 8 0 16 M124 38 q-6 6 0 12" fill="none" stroke="#c2255c" stroke-width="1.5"/>`;
  s += `<rect x="99" y="88" width="22" height="18" fill="#f3c9a5" stroke="#1d2742" stroke-width="2.5"/>`;
  s += `<rect x="45" y="100" width="130" height="192" rx="44" fill="#f3c9a5" stroke="#1d2742" stroke-width="2.5"/>`;
  s += `<ellipse cx="86" cy="158" rx="22" ry="36" fill="#ffc9c9" stroke="#e03131" stroke-width="2"/><ellipse cx="134" cy="158" rx="22" ry="36" fill="#ffc9c9" stroke="#e03131" stroke-width="2"/>`;
  s += `<path d="M118 172 c-7 -9 -20 -2 -14 8 l14 14 l14 -14 c6 -10 -7 -17 -14 -8z" fill="#e03131" stroke="#a51111" stroke-width="1.5"/>`;
  s += `<path d="M120 214 c18 -6 30 8 22 24 c-6 12 -24 14 -34 6 c-6 -6 -2 -14 6 -14 c8 0 10 -8 6 -16z" fill="#f2b48a" stroke="#c46a2c" stroke-width="2"/>`;
  return svg(220, 300, s, 'bodyfig');
}
const SORTS = {
  state: L => sortQ('Válogasd szét halmazállapot szerint!', { 'szilárd': ['jég', 'kő', 'vaj', 'fa', 'homok', 'vas', 'üveg'], 'folyékony': ['víz', 'tej', 'olaj', 'méz', 'szörp', 'tea'], 'légnemű': ['levegő', 'vízgőz', 'füst'] }, L === 3 ? 3 : 2, { hint: 'Szilárd: megtartja az alakját. Folyékony: folyik. Légnemű: kitölti a teret.' }),
  animal: L => { const g = shuffle(Object.keys(ANIMALS)).slice(0, 3), src = {}; g.forEach(k => src[k] = ANIMALS[k].filter(a => L === 3 || !TRICKY.includes(a)).map(a => [a, EMO[a]])); return sortQ('Válogasd szét az állatokat csoportjuk szerint!', src, 2, { hint: 'Emlős: szőr, szoptat. Madár: toll. Hal: kopoltyú. Kétéltű: csupasz bőr. Hüllő: pikkely. Rovar: 6 láb.' }); },
  light: L => sortQ('Természetes vagy mesterséges fényforrás?', { 'természetes': ['a Nap', 'a villám', 'a csillagok', 'a szentjánosbogár'], 'mesterséges': ['zseblámpa', 'villanykörte', 'gyertya', 'utcai lámpa'] }, 3, { hint: 'A természetes fényforrás magától világít. A mesterségeset az ember készítette.' }),
  burn: L => sortQ('Mi ég, és mi nem?', { 'éghető': ['fa', 'papír', 'szén', 'gyertyaviasz', 'száraz levél', 'fenyőtoboz'], 'éghetetlen': ['kő', 'vas', 'üveg', 'homok', 'víz', 'tégla'] }, 3, { hint: 'Ami meggyullad és elég, az éghető.' }),
  habitat: L => sortQ('Hol élnek? Válogasd szét!', Object.fromEntries(Object.entries(HABITAT).map(([k, v]) => [k, v.map(a => [a, EMO[a]])])), 2, { hint: 'Erdő: fák között. Mező: füves, nyílt terület. Víz, vízpart: tó, folyó és partja.' }),
  health: L => sortQ('Egészséges vagy egészségtelen szokás?', { 'egészséges': ['zöldséget eszem', 'sokat mozgok a szabadban', 'eleget alszom', 'kezet mosok evés előtt', 'vizet iszom'], 'egészségtelen': ['sok cukros üdítőt iszom', 'késő éjjelig tévézek', 'nem reggelizem', 'egész nap ülök', 'nem mosok fogat'] }, 3, { hint: 'Ami jót tesz a testednek, az egészséges szokás.' }),
  water: L => sortQ('Állóvíz vagy folyóvíz?', { 'állóvíz': ['tó', 'mocsár', 'halastó', 'Balaton'], 'folyóvíz': ['patak', 'folyó', 'Duna', 'Tisza'] }, 3, { hint: 'Az állóvíz egy helyben marad, a folyóvíz egy irányba folyik.' }),
  edible: L => sortQ('Melyik részét esszük?', { 'gyökerét': ['répa', 'retek', 'cékla', 'petrezselyemgyökér'], 'levelét': ['saláta', 'káposzta', 'spenót', 'sóska'], 'termését': ['alma', 'paradicsom', 'paprika', 'uborka', 'szilva'] }, 2, { hint: 'A gyökér a földben nő, a levél a száron, a termés a virágból fejlődik.' }),
  move: L => sortQ('Helyváltoztató vagy helyzetváltoztató mozgás?', { 'helyváltoztató': ['futás', 'úszás', 'séta', 'kerékpározás'], 'helyzetváltoztató': ['guggolás', 'hajolás', 'karkörzés', 'bólintás'] }, 3, { hint: 'Helyváltoztató: máshová kerülsz. Helyzetváltoztató: helyben maradsz.' }),
  weather: L => sortQ('Csapadék vagy nem csapadék?', { 'csapadék': ['eső', 'hó', 'jégeső', 'dér', 'harmat'], 'nem csapadék': ['szél', 'napsütés', 'villám', 'felhő'] }, 3, { hint: 'Csapadék a levegőből lehulló vagy kicsapódó víz.' })
};
const LABELS = {
  plant: () => labelQ('Címkézd fel a növény részeit!', plantSvg(null), [{ name: 'virág', x: 45.5, y: 16 }, { name: 'levél', x: 64, y: 40 }, { name: 'szár', x: 45.5, y: 60 }, { name: 'gyökér', x: 45.5, y: 86 }], { hint: 'Alulról felfelé: gyökér, szár, levél, virág.' }),
  body: () => labelQ('Címkézd fel a szerveket!', bodySvg(), [{ name: 'agy', x: 50, y: 15 }, { name: 'tüdő', x: 39, y: 50 }, { name: 'szív', x: 54, y: 61 }, { name: 'gyomor', x: 60, y: 77 }], { hint: 'Az agy a fejben van. A mellkasban a két tüdő és köztük a szív. Lejjebb, a hasban a gyomor.' }),
  compass4: () => labelQ('Írd be a fővilágtájakat!', compass(null, []), [{ name: 'észak', x: 50, y: 25 }, { name: 'kelet', x: 75, y: 50 }, { name: 'dél', x: 50, y: 75 }, { name: 'nyugat', x: 25, y: 50 }], { hint: 'Fent az észak, lent a dél, jobbra a kelet, balra a nyugat.' }),
  compassX: () => labelQ('Írd be a mellékvilágtájakat! (Az észak fent van.)', compass(null, [0]), [{ name: 'északkelet', x: 70, y: 31 }, { name: 'délkelet', x: 70, y: 69 }, { name: 'délnyugat', x: 30, y: 69 }, { name: 'északnyugat', x: 30, y: 31 }], { hint: 'A mellékvilágtájak két fővilágtáj között vannak: északkelet az észak és a kelet között.' })
};
const thermoSet = L => { const t = L === 1 ? ri(0, 6) * 5 : L === 2 ? ri(0, 30) : ri(-10, -1); return { type: 'set', kind: 'thermo', prompt: `Állítsd be a hőmérőt erre: <b>${String(t).replace('-', '−')} °C</b>`, answer: t, start: t === 10 ? 0 : 10, min: -10, max: 30, answerText: `${String(t).replace('-', '−')} °C`, hint: 'A hosszú vonalak 10 fokonként, a közepesek 5 fokonként vannak. 0 alatt mínusz fokok vannak.' }; };
const compassSet = L => { const i = L === 1 ? pick([0, 2, 4, 6]) : pick([1, 3, 5, 7]); return { type: 'set', kind: 'compass', prompt: `Fordítsd a nyilat erre: <b>${DIRS[i]}</b>`, answer: i, start: (i + 3) % 8, answerText: DIRS[i], hint: 'Fent az észak, lent a dél, jobbra a kelet, balra a nyugat. A mellékvilágtájak kettő között vannak.' }; };
const RIDDLES = [
  ['állat', ['Hat lábam van, és tudok repülni.', 'Virágról virágra szállok.', 'A kaptárban lakom a társaimmal.', 'Mézet készítek.'], 'méh', ['katica', 'lepke', 'hangya']],
  ['állat', ['Emlős vagyok, éjszaka járok élelem után.', 'Bogarakat, csigákat, gilisztákat eszem.', 'Télen téli álmot alszom.', 'A hátamon sok hegyes tüske van.'], 'sün', ['mókus', 'vakond', 'nyúl']],
  ['állat', ['Madár vagyok, ősszel délre költözöm.', 'Hosszú a lábam és a csőröm.', 'Békát és egeret is eszem.', 'Gyakran villanyoszlop tetején fészkelek.'], 'gólya', ['gém', 'hattyú', 'sas']],
  ['állat', ['A bőröm csupasz és nedves.', 'Ebihalként kezdtem az életemet a vízben.', 'Hosszú, ragadós nyelvemmel kapom el a rovarokat.', 'Nagyokat ugrom, és brekegek.'], 'béka', ['gyík', 'gőte', 'teknős']],
  ['állat', ['Emlős vagyok, fákon élek.', 'Ügyesen ugrálok ágról ágra.', 'Ősszel diót és makkot rejtek el télire.', 'Hosszú, bozontos a farkam.'], 'mókus', ['nyest', 'sün', 'harkály']],
  ['állat', ['Madár vagyok, az erdőben élek.', 'Erős, hegyes csőröm van.', 'A fák kérge alól szedem ki a rovarokat.', 'Kopogással vájok odút a fába.'], 'harkály', ['bagoly', 'cinege', 'rigó']],
  ['állat', ['Emlős vagyok, de alig látok.', 'A föld alatt ásom a járataimat.', 'Gilisztákat és rovarlárvákat eszem.', 'Földkupacokat túrok a kertben.'], 'vakond', ['egér', 'sün', 'ürge']],
  ['állat', ['Rovar vagyok, hat lábam van.', 'A levéltetveket eszem, ezért a kertészek szeretnek.', 'A szárnyfedőm piros.', 'Fekete pöttyök vannak a hátamon.'], 'katica', ['méh', 'hangya', 'szöcske']],
  ['állat', ['Madár vagyok.', 'Éjszaka vadászom, nappal alszom.', 'A sötétben is jól látok, és a fejemet messzire hátra tudom fordítani.', 'Egereket fogok, és huhogok.'], 'bagoly', ['sas', 'gólya', 'harkály']],
  ['állat', ['A vízben élek.', 'Kopoltyúval lélegzem.', 'Pikkelyek borítanak, uszonyokkal úszom.', 'Halastavakban is tenyésztenek, karácsonykor sok családnál halászlé lesz belőlem.'], 'ponty', ['csuka', 'harcsa', 'cápa']],
  ['állat', ['Emlős vagyok, növényevő.', 'Háziállat vagyok, régen szekeret is húztam.', 'Patám és sörényem van.', 'Lépésben, ügetésben és vágtában is tudok haladni.'], 'ló', ['tehén', 'szamár', 'kecske']],
  ['állat', ['Háziállat vagyok, a mezőn legelek.', 'Kérődző vagyok.', 'Szarvam van.', 'Tejet adok, és bőgök.'], 'tehén', ['ló', 'kecske', 'juh']],
  ['növény', ['Magas növény vagyok, a mezőn termesztenek.', 'Nagy, sárga virágom van.', 'A virágom a Nap felé fordul.', 'A magomból olajat préselnek.'], 'napraforgó', ['kukorica', 'búza', 'pipacs']],
  ['növény', ['Fa vagyok, az erdőben élek.', 'Nagyon sok évig élhetek.', 'Karéjos a levelem.', 'A termésem a makk.'], 'tölgyfa', ['bükkfa', 'fenyőfa', 'nyírfa']],
  ['növény', ['Vadvirág vagyok, a mezőn és a búzaföldek szélén növök.', 'Vékony, szőrös a szárom.', 'A szirmaim vékonyak, mint a selyempapír.', 'Élénkpiros a virágom.'], 'pipacs', ['búzavirág', 'kamilla', 'napraforgó']],
  ['növény', ['Gyümölcsfa termése vagyok.', 'Ősszel érek meg.', 'Lehetek piros, sárga vagy zöld.', 'Belőlem készül a rétes és a pite, és ropogós vagyok.'], 'alma', ['körte', 'szilva', 'szőlő']],
  ['növény', ['Az erdőben, a nedves talajon élek.', 'Nem vagyok se növény, se állat.', 'Nincs zöld levelem, virágom sem.', 'Kalapom és tönköm van.'], 'gomba', ['páfrány', 'moha', 'tölgyfa']],
  ['test', ['A mellkasodban vagyok.', 'Egész életedben dolgozom, sosem pihenek.', 'Ha futsz, gyorsabban dobogok.', 'Én pumpálom a vért az egész testedbe.'], 'szív', ['tüdő', 'gyomor', 'agy']],
  ['test', ['A mellkasodban vagyok, ketten vagyunk.', 'Ha futsz, gyorsabban dolgozom.', 'Rajtam keresztül jut a levegő oxigénje a véredbe.', 'Velem lélegzel.'], 'tüdő', ['szív', 'máj', 'gyomor']],
  ['test', ['Érzékszerv vagyok.', 'Ketten vagyunk, az arcodon.', 'Pislogással védekezem a por ellen.', 'Velem látod a színeket.'], 'szem', ['fül', 'orr', 'nyelv']],
  ['test', ['Érzékszerv vagyok, ketten vagyunk.', 'A fejed két oldalán vagyok.', 'A túl hangos zene árthat nekem.', 'Velem hallod a hangokat.'], 'fül', ['szem', 'orr', 'bőr']],
  ['táj', ['Állóvíz vagyok a Dunántúlon.', 'Nyáron sokan fürdenek bennem.', 'Közép-Európa legnagyobb tava vagyok.', 'A partomon van Siófok és Tihany.'], 'Balaton', ['Velencei-tó', 'Fertő tó', 'Tisza-tó']],
  ['táj', ['Folyó vagyok.', 'Németországban erednek a forrásaim, és a Fekete-tengerbe ömlök.', 'Átfolyok Budapesten.', 'Európa második leghosszabb folyója vagyok.'], 'Duna', ['Tisza', 'Rába', 'Dráva']],
  ['táj', ['Folyó vagyok.', 'Ukrajnában, a Kárpátokban erednek a forrásaim.', 'Átszelem az Alföldet, Szeged mellett is elfolyok.', 'Az országon belül én vagyok hazánk leghosszabb folyója.'], 'Tisza', ['Duna', 'Körös', 'Maros']],
  ['táj', ['Hegycsúcs vagyok.', 'Az Északi-középhegységben vagyok.', 'A Mátrában emelkedem.', 'Magyarország legmagasabb pontja vagyok, 1014 méter magas.'], 'Kékes', ['Dobogókő', 'Istállós-kő', 'Írott-kő']],
  ['táj', ['Nagytáj vagyok.', 'Sík, alacsony vidék vagyok.', 'A Duna és a Tisza is átfolyik rajtam.', 'Hazánk legnagyobb nagytája vagyok, rajtam van a Hortobágy.'], 'Alföld', ['Kisalföld', 'Dunántúli-dombság', 'Északi-középhegység']],
  ['táj', ['Város vagyok.', 'A Duna két partján terülök el.', 'Hazánk legnagyobb városa vagyok.', 'Magyarország fővárosa vagyok.'], 'Budapest', ['Debrecen', 'Szeged', 'Győr']],
  ['jelenség', ['Az égen látsz, de nem vagyok felhő.', 'Eső után jelenhetek meg, ha közben süt a nap.', 'Ív alakú vagyok.', 'Sok színem van: piros, narancs, sárga, zöld, kék, lila.'], 'szivárvány', ['villám', 'dér', 'köd']],
  ['jelenség', ['Csapadék vagyok.', 'Télen hullok.', 'Apró jégkristályokból állok, fehér vagyok.', 'Ha sok esik belőlem, lehet szánkózni.'], 'hó', ['eső', 'jégeső', 'harmat']],
  ['jelenség', ['Szilárd halmazállapotú vagyok.', 'Ha melegítenek, elolvadok.', '0 fok alatt a vízből keletkezem.', 'Korcsolyázni lehet rajtam.'], 'jég', ['hó', 'vízgőz', 'üveg']]
];
const kiQ = L => { const cats = L === 1 ? ['állat', 'növény'] : L === 2 ? ['test', 'jelenség', 'állat'] : ['táj', 'táj2', 'növény', 'jelenség']; const [, clues, ans, wr] = pick(RIDDLES.filter(r => cats.includes(r[0]))); return riddleQ(clues, ans, wr); };
const mix = (base, alts, p) => L => { const a = alts(L); return a && Math.random() < p ? a() : base(L); };
K4.state = mix(K4.state, L => L === 1 ? () => SORTS.state(L) : L === 3 ? () => thermoSet(pick([1, 2, 3])) : null, .4);
K4.energy = mix(K4.energy, L => () => (L === 1 ? SORTS.light : L === 2 ? SORTS.burn : SORTS.move)(L), .4);
K4.plant = mix(K4.plant, L => L === 1 ? LABELS.plant : L === 3 ? () => SORTS.edible(L) : null, .45);
K4.animal = mix(K4.animal, L => L !== 2 ? () => SORTS.animal(L) : null, .35);
K4.habitat = mix(K4.habitat, L => L === 1 ? () => SORTS.habitat(L) : null, .4);
K4.body = mix(K4.body, L => L === 2 ? LABELS.body : null, .45);
K4.health = mix(K4.health, L => L === 1 ? () => SORTS.health(L) : null, .4);
K4.weather = mix(K4.weather, L => L === 3 ? () => SORTS.weather(L) : null, .4);
K4.compass = mix(K4.compass, L => L === 1 ? (Math.random() < .5 ? LABELS.compass4 : () => compassSet(1)) : L === 2 ? (Math.random() < .5 ? LABELS.compassX : () => compassSet(2)) : null, .45);
K4.landform = mix(K4.landform, L => L === 2 ? () => SORTS.water(L) : null, .4);
K4.lab = L => LAB_GENS[pick(Object.keys(LAB_GENS))](L);
K4.state = mix(K4.state, L => () => heatLab(L), .2);
K4.sorter = L => { const k = pick(Object.keys(SORTS)); return SORTS[k](L); };
K4.ki = kiQ;
/* ---------- maps: counties, neighbours, landscapes, Budapest's bridges ---------- */
const COUNTIES = Object.keys(MAPDATA.counties);
const BIG_COUNTIES = ['Pest', 'Baranya', 'Bács-Kiskun', 'Borsod-Abaúj-Zemplén', 'Hajdú-Bihar', 'Győr-Moson-Sopron', 'Csongrád-Csanád', 'Somogy', 'Zala', 'Vas', 'Békés', 'Szabolcs-Szatmár-Bereg'];
const SEATS = { 'Bács-Kiskun': 'Kecskemét', 'Baranya': 'Pécs', 'Békés': 'Békéscsaba', 'Borsod-Abaúj-Zemplén': 'Miskolc', 'Csongrád-Csanád': 'Szeged', 'Fejér': 'Székesfehérvár', 'Győr-Moson-Sopron': 'Győr', 'Hajdú-Bihar': 'Debrecen', 'Heves': 'Eger', 'Jász-Nagykun-Szolnok': 'Szolnok', 'Komárom-Esztergom': 'Tatabánya', 'Nógrád': 'Salgótarján', 'Somogy': 'Kaposvár', 'Szabolcs-Szatmár-Bereg': 'Nyíregyháza', 'Tolna': 'Szekszárd', 'Vas': 'Szombathely', 'Veszprém': 'Veszprém', 'Zala': 'Zalaegerszeg' };
const TOWNS = { 'Sopron': 'Győr-Moson-Sopron', 'Esztergom': 'Komárom-Esztergom', 'Gödöllő': 'Pest', 'Gyula': 'Békés', 'Hódmezővásárhely': 'Csongrád-Csanád', 'Kalocsa': 'Bács-Kiskun', 'Siófok': 'Somogy', 'Keszthely': 'Zala', 'Tihany': 'Veszprém', 'Tokaj': 'Borsod-Abaúj-Zemplén', 'Mohács': 'Baranya', 'Paks': 'Tolna', 'Kőszeg': 'Vas', 'Gyöngyös': 'Heves', 'Balassagyarmat': 'Nógrád', 'Jászberény': 'Jász-Nagykun-Szolnok', 'Mátészalka': 'Szabolcs-Szatmár-Bereg', 'Dunaújváros': 'Fejér', 'Pápa': 'Veszprém', 'Szentendre': 'Pest', 'Hajdúszoboszló': 'Hajdú-Bihar', 'Nagykanizsa': 'Zala' };
const mega = n => `<b>${n}</b> megye`;
const otherCounties = (c, k = 3, ex = []) => shuffle(COUNTIES.filter(x => x !== c && !ex.includes(x))).slice(0, k);
const countyTap = (c, extra = '') => mapQ(`Hol van ${mega(c)}? Koppints rá a térképen!${extra}`, c, { hint: `${c} megye székhelye ${SEATS[c] || 'Budapest'}. ${MAP_HINTS[c] || ''}`.trim(), speak: `Hol van ${c} megye? Koppints rá a térképen!` });
const MAP_HINTS = {
  'Pest': 'Budapestet öleli körül, az ország közepén.', 'Baranya': 'Az ország legdélebbi része, a Mecsek környéke.', 'Bács-Kiskun': 'A Duna és a Tisza között, délen; ez a legnagyobb megye.', 'Borsod-Abaúj-Zemplén': 'Északkeleten, Szlovákia mellett.',
  'Hajdú-Bihar': 'Keleten, Románia mellett; itt van a Hortobágy.', 'Győr-Moson-Sopron': 'Északnyugaton, Ausztria és Szlovákia mellett.', 'Csongrád-Csanád': 'Délen, a Tisza mentén, Szerbia mellett.', 'Somogy': 'A Balaton déli partja mentén.',
  'Zala': 'Délnyugaton, a Balaton nyugati csücskénél.', 'Vas': 'Nyugaton, Ausztria mellett.', 'Békés': 'Délkeleten, Románia mellett.', 'Szabolcs-Szatmár-Bereg': 'A legkeletebbi megye, Ukrajna és Románia mellett.',
  'Veszprém': 'A Balaton északi partja mentén.', 'Fejér': 'Budapesttől délnyugatra, itt a Velencei-tó.', 'Tolna': 'Délen, a Duna jobb partján.', 'Komárom-Esztergom': 'Északon, a Duna mentén, Szlovákia mellett.',
  'Nógrád': 'Északon, Szlovákia mellett, Pesttől északra.', 'Heves': 'Északon, itt a Mátra és a Kékes.', 'Jász-Nagykun-Szolnok': 'Az ország közepén, keletre, a Tisza mentén.'
};
const hlChoice = c => ({ type: 'choice', prompt: 'Melyik megye van kiemelve a térképen?', visual: mapRef({ hl: c }), answer: c, options: shuffle([c, ...otherCounties(c)]).map(v => ({ value: v, html: v })), answerText: c, hint: MAP_HINTS[c] });
const townQ = () => { const [t, c] = pick(Object.entries(TOWNS)); return mcq(`Melyik megyében van <b>${t}</b>?`, c, otherCounties(c), { fmt: v => v, hint: `${t} ${c} megyében van. ${MAP_HINTS[c] || ''}`.trim() }); };
const seatQ = () => { const [m, sz] = pick(Object.entries(SEATS).filter(([m, sz]) => !m.includes(sz))); return mcq(`Mi a székhelye ennek a megyének: <b>${m}</b>?`, sz, shuffle(Object.values(SEATS).filter(x => x !== sz)).slice(0, 3), { fmt: v => v, hint: 'A megyeszékhely általában a megye legnagyobb városa.' }); };
const seatTap = () => { const c = pick(Object.keys(SEATS)), t = SEATS[c]; const dots = shuffle([t, ...shuffle(Object.values(SEATS).filter(x => x !== t)).slice(0, 5)]); return mapQ(`Hol van <b>${t}</b>, ${c} megye székhelye? Koppints a pontra!`, t, { pick: 'dot', dots, hint: MAP_HINTS[c] }); };
K4.megyek = L => {
  const r = Math.random();
  if (L === 1) return r < .55 ? countyTap(pick(BIG_COUNTIES)) : r < .8 ? hlChoice(pick(BIG_COUNTIES)) : seatQ();
  if (L === 2) return r < .45 ? countyTap(pick(COUNTIES)) : r < .7 ? townQ() : r < .85 ? hlChoice(pick(COUNTIES)) : seatQ();
  if (r < .35) return seatTap();
  if (r < .65) { const [t, c] = pick(Object.entries(TOWNS)); return mapQ(`Melyik megyében van <b>${t}</b>? Koppints a megyére!`, c, { hint: MAP_HINTS[c] }); }
  return r < .85 ? townQ() : countyTap(pick(COUNTIES));
};

const DIR_NB = [['keletre', 'Románia'], ['északra', 'Szlovákia'], ['nyugatra', 'Ausztria'], ['délre', 'Szerbia'], ['északkeletre', 'Ukrajna']];
const NB_HINT = 'Nyugaton Ausztria, északon Szlovákia, északkeleten Ukrajna, keleten Románia, délen Szerbia, délnyugaton Horvátország és Szlovénia.';
const SIGHTS = {
  'Kékes': 'a Kékes, hazánk legmagasabb pontja', 'Tihany': 'Tihany, a Balaton félszigete', 'Tokaj': 'Tokaj, a híres borvidék központja', 'Aggtelek': 'Aggtelek, a Baradla-barlang', 'Hortobágy': 'a Hortobágy, az első nemzeti parkunk',
  'Esztergom': 'Esztergom, a bazilika városa', 'Visegrád': 'Visegrád vára a Duna-kanyarban', 'Hollókő': 'Hollókő, a palóc falu', 'Kőszeg': 'Kőszeg, az Alpokalja kisvárosa', 'Pannonhalma': 'Pannonhalma, a bencés főapátság',
  'Bugac': 'Bugac, a kiskunsági puszta', 'Badacsony': 'a Badacsony, a tanúhegy a Balaton partján', 'Villány': 'Villány, a déli borvidék', 'Ópusztaszer': 'Ópusztaszer, a Feszty-körkép', 'Őriszentpéter': 'Őriszentpéter, az Őrség központja'
};
const sightTap = () => { const s = pick(Object.keys(SIGHTS)); const near = Object.keys(SIGHTS).filter(x => x !== s && Math.hypot(MAPDATA.places[x][0] - MAPDATA.places[s][0], MAPDATA.places[x][1] - MAPDATA.places[s][1]) > 45);
  return mapQ(`Hol van ${SIGHTS[s]}? Koppints a pontra!`, s, { pick: 'dot', dots: shuffle([s, ...shuffle(near).slice(0, 4)]), hint: SIGHT_HINT[s] }); };
const SIGHT_HINT = { 'Kékes': 'A Mátrában, északon, Gyöngyös fölött.', 'Tihany': 'A Balaton északi partján, egy félszigeten.', 'Tokaj': 'Északkeleten, ahol a Bodrog a Tiszába ömlik.', 'Aggtelek': 'Egészen északon, a szlovák határ mellett.', 'Hortobágy': 'Keleten, Debrecentől nyugatra, az Alföldön.',
  'Esztergom': 'Északon, a Duna partján, a szlovák határon.', 'Visegrád': 'A Duna-kanyarban, Budapesttől északra.', 'Hollókő': 'Északon, Nógrád megyében.', 'Kőszeg': 'Nyugaton, az osztrák határ mellett.', 'Pannonhalma': 'Északnyugaton, Győr közelében.',
  'Bugac': 'Az Alföldön, Kecskemét közelében.', 'Badacsony': 'A Balaton északi partjának nyugati részén.', 'Villány': 'Egészen délen, Baranyában.', 'Ópusztaszer': 'Délen, Szeged közelében.', 'Őriszentpéter': 'Az ország délnyugati sarkában, a határ mellett.' };
K4.terkep = L => {
  const r = Math.random();
  if (L === 1) {
    if (r < .55) { const n = pick(NEIGHBOURS); return mapQ(`Hol van <b>${n}</b>? Koppints rá a térképen!`, n, { map: 'region', hint: NB_HINT, speak: `Hol van ${n}? Koppints rá a térképen!` }); }
    if (r < .8) { const n = pick(NEIGHBOURS); return { type: 'choice', prompt: 'Melyik szomszédos ország van kiemelve?', visual: mapRef({ hl: n }, true), answer: n, options: shuffle([n, ...shuffle(NEIGHBOURS.filter(x => x !== n)).slice(0, 3)]).map(v => ({ value: v, html: v })), answerText: n, hint: NB_HINT }; }
    return mcq('Hány szomszédos országa van Magyarországnak?', 7, [5, 6, 8], { hint: 'Számold meg: Ausztria, Szlovákia, Ukrajna, Románia, Szerbia, Horvátország, Szlovénia.' });
  }
  if (L === 2) return r < .6 ? sightTap() : r < .8 ? (() => { const [d, n] = pick(DIR_NB); return mapQ(`Koppints arra az országra, amelyik Magyarországtól <b>${d}</b> van!`, n, { map: 'region', hint: 'Az északi irány a térképen felfelé van, a keleti jobbra, a déli lefelé, a nyugati balra.' }); })() : hlChoice(pick(COUNTIES));
  if (r < .45) return sightTap();
  if (r < .7) { const n = pick(NEIGHBOURS); return { type: 'choice', prompt: 'Melyik ország van kiemelve? Mi a fővárosa?', visual: mapRef({ hl: n }, true), answer: CAPITALS[n], options: shuffle([CAPITALS[n], ...shuffle(NEIGHBOURS.filter(x => x !== n)).slice(0, 3).map(x => CAPITALS[x])]).map(v => ({ value: v, html: v })), answerText: `${n}, fővárosa ${CAPITALS[n]}`, hint: NB_HINT }; }
  if (r < .85) { const [d, n] = pick(DIR_NB); return mapQ(`Koppints arra az országra, amelyik Magyarországtól <b>${d}</b> van!`, n, { map: 'region', hint: 'Az északi irány a térképen felfelé van, a keleti jobbra, a déli lefelé, a nyugati balra.' }); }
  return mcq('Melyik folyó szeli ketté Budapestet és az egész országot észak–déli irányban?', 'Duna', ['Tisza', 'Dráva', 'Rába'], { fmt: v => v, hint: 'Európa második leghosszabb folyója.' });
};
const CAPITALS = { 'Ausztria': 'Bécs', 'Szlovákia': 'Pozsony', 'Ukrajna': 'Kijev', 'Románia': 'Bukarest', 'Szerbia': 'Belgrád', 'Horvátország': 'Zágráb', 'Szlovénia': 'Ljubljana' };

/* tájak és nevezetességek */
const TAJ_COUNTY = [['a Hortobágy', 'Hajdú-Bihar', ['Jász-Nagykun-Szolnok', 'Borsod-Abaúj-Zemplén']], ['Tokaj-Hegyalja', 'Borsod-Abaúj-Zemplén', []], ['az Aggteleki-karszt', 'Borsod-Abaúj-Zemplén', []], ['az Őrség', 'Vas', ['Zala']], ['Göcsej', 'Zala', ['Vas']],
  ['a Szigetköz', 'Győr-Moson-Sopron', []], ['a Nyírség', 'Szabolcs-Szatmár-Bereg', ['Hajdú-Bihar']], ['Bugac', 'Bács-Kiskun', []], ['a Jászság', 'Jász-Nagykun-Szolnok', ['Pest']], ['a Sárköz', 'Tolna', ['Baranya']], ['a Villányi-hegység', 'Baranya', []],
  ['a Tihanyi-félsziget', 'Veszprém', ['Somogy', 'Zala']], ['a Kékes', 'Heves', ['Nógrád']], ['Hollókő', 'Nógrád', []], ['Pannonhalma', 'Győr-Moson-Sopron', []], ['a Velencei-tó', 'Fejér', []], ['Visegrád', 'Pest', ['Komárom-Esztergom']], ['Ópusztaszer', 'Csongrád-Csanád', []], ['Kőszeg', 'Vas', []]];
const TAJ_FACTS = [
  [1, 'Melyik tájon legelnek szürkemarhák és rackajuhok a végtelen pusztán?', 'a Hortobágyon', ['az Őrségben', 'a Mecsekben', 'a Szigetközben'], 'Ez a táj az Alföldön van, Debrecen közelében.'],
  [1, 'Melyik hegységben van a Kékes, hazánk legmagasabb pontja?', 'a Mátrában', ['a Bükkben', 'a Mecsekben', 'a Börzsönyben'], 'Az Északi-középhegység egyik hegysége, Gyöngyös fölött.'],
  [1, 'Melyik tónak van a nagyobb része Ausztriában?', 'a Fertő tónak', ['a Balatonnak', 'a Velencei-tónak', 'a Tisza-tónak'], 'Sopron közelében fekszik, a nyugati határon.'],
  [1, 'Melyik hazánk legnagyobb mesterséges tava?', 'a Tisza-tó', ['a Balaton', 'a Velencei-tó', 'a Fertő tó'], 'Egy gát duzzasztotta fel egy folyó vizét. Melyik folyóról kapta a nevét?'],
  [1, 'Melyik félszigeten áll híres apátság, és virágzik nyáron a levendula a Balatonnál?', 'Tihany', ['Siófok', 'Keszthely', 'Badacsony'], 'A Balaton északi partján benyúlik a tóba.'],
  [1, 'Melyik városban áll hazánk legnagyobb temploma, a bazilika?', 'Esztergomban', ['Egerben', 'Pécsen', 'Debrecenben'], 'A Duna partján van, a szlovák határon.'],
  [1, 'Melyik város fekszik a Mecsek lábánál?', 'Pécs', ['Győr', 'Eger', 'Szeged'], 'A Dunántúl déli részén van, Baranya megye székhelye.'],
  [2, 'Hol van a Baradla-barlang, hazánk leghíresebb cseppkőbarlangja?', 'az Aggteleki-karsztban', ['a Mecsekben', 'a Mátrában', 'a Bakonyban'], 'Egészen északon, a szlovák határ mellett.'],
  [2, 'Melyik tájon készül a világhírű aszú bor?', 'Tokaj-Hegyalján', ['a Hortobágyon', 'az Őrségben', 'a Nyírségben'], 'Ott, ahol a Bodrog a Tiszába ömlik.'],
  [2, 'Mi a neve a Hortobágy híres, kilenc boltívű kőhídjának?', 'Kilenclyukú híd', ['Lánchíd', 'Margit híd', 'Megyeri híd'], 'A neve megmondja, hány „lyuka”, vagyis boltíve van.'],
  [2, 'Melyik volt hazánk első nemzeti parkja?', 'a Hortobágyi Nemzeti Park', ['a Bükki Nemzeti Park', 'az Őrségi Nemzeti Park', 'az Aggteleki Nemzeti Park'], '1973-ban alapították, a pusztát védi.'],
  [2, 'Melyik tájon van a Bugaci-puszta, ahol a csikósok lovasbemutatót tartanak?', 'a Kiskunságban', ['a Hajdúságban', 'a Nyírségben', 'a Jászságban'], 'A Duna és a Tisza között, Kecskemét közelében.'],
  [2, 'Hogy hívják a hazánk nyugati szélén, az Alpok lábánál fekvő tájat?', 'Alpokalja', ['Alföld', 'Nyírség', 'Mátra'], 'A neve elárulja: az Alpok „alja”, vagyis lába.'],
  [2, 'Melyik vár magasodik a Duna-kanyar fölött?', 'a visegrádi vár', ['az egri vár', 'a szigetvári vár', 'a budai vár'], 'Budapesttől északra, ahol a Duna dél felé fordul.'],
  [2, 'Melyik hegységben van a Szalajka-völgy és a Fátyol-vízesés?', 'a Bükkben', ['a Mátrában', 'a Mecsekben', 'a Börzsönyben'], 'Eger és Miskolc között emelkedik.'],
  [2, 'Melyik hazánk legnagyobb szigete, a Duna és a Mosoni-Duna között?', 'a Szigetköz', ['a Csepel-sziget', 'a Margit-sziget', 'a Szentendrei-sziget'], 'Győr közelében, a Kisalföldön van.'],
  [3, 'Hol van az Írott-kő, a Dunántúl legmagasabb pontja?', 'a Kőszegi-hegységben', ['a Mecsekben', 'a Bakonyban', 'a Mátrában'], 'Az Alpokalján, az osztrák határon.'],
  [3, 'Melyik két hegység tartozik az Alpokaljához?', 'a Soproni- és a Kőszegi-hegység', ['a Bükk és a Mátra', 'a Mecsek és a Villányi-hegység', 'a Pilis és a Börzsöny'], 'Mindkettő a nyugati határ mellett van, egy-egy városról kapta a nevét.'],
  [3, 'Mi a nagytáj neve, amelyhez az Alpokalja tartozik?', 'Nyugat-magyarországi-peremvidék', ['Dunántúli-dombság', 'Kisalföld', 'Északi-középhegység'], 'Az ország nyugati peremén, szélén van.'],
  [3, 'Hol látható a Feszty-körkép, amely a honfoglalást mutatja be?', 'Ópusztaszeren', ['Budapesten', 'Visegrádon', 'Esztergomban'], 'Csongrád-Csanád megyében, Szeged közelében van.'],
  [3, 'Hogy hívják a Duna menti ártéri erdőt Tolna megyében, ahol sok gímszarvas él?', 'Gemenc', ['Zselic', 'Bakony', 'Őrség'], 'A Duna–Dráva Nemzeti Parkhoz tartozik.'],
  [3, 'Melyik tájon van csillagpark, ahol különösen sötét és csillagos az éjszakai égbolt?', 'a Zselicben', ['a Hortobágyon', 'a Szigetközben', 'a Jászságban'], 'Somogy megyei erdős, dombos táj, Kaposvár közelében.'],
  [3, 'Mit őriz Hollókő, a Nógrád megyei kis falu?', 'a palócok hagyományait', ['a kunok hagyományait', 'a jászok hagyományait', 'a matyók hagyományait'], 'Északon, a Cserhátban élő népcsoport hagyományait.'],
  [3, 'Melyik nemzeti parkhoz tartozik a Baradla-barlang?', 'Aggteleki Nemzeti Park', ['Bükki Nemzeti Park', 'Duna–Ipoly Nemzeti Park', 'Őrségi Nemzeti Park'], 'A barlang abban a karsztban van, amelyről a park a nevét kapta.']
];
const NPARKS = ['Aggteleki', 'Balaton-felvidéki', 'Bükki', 'Duna–Dráva', 'Duna–Ipoly', 'Fertő–Hanság', 'Hortobágyi', 'Kiskunsági', 'Körös–Maros', 'Őrségi'];
const FAKE_NP = ['Mátrai', 'Mecseki', 'Velencei', 'Zalai', 'Pilisi'];
const npQ = () => { const f = pick(FAKE_NP); return mcq('Melyik <b>nem</b> nemzeti park? (Hazánkban 10 nemzeti park van.)', `${f} Nemzeti Park`, shuffle(NPARKS).slice(0, 3).map(x => `${x} Nemzeti Park`), { fmt: v => v, hint: 'A 10 nemzeti park: ' + NPARKS.join(', ') + '.' }); };
const TAJ_SORT = L => sortQ('Hegység, alföldi táj vagy tó? Válogasd szét!', { 'hegység': ['Bükk', 'Mátra', 'Mecsek', 'Börzsöny', 'Kőszegi-hegység', 'Zempléni-hegység'], 'alföldi táj': ['Hortobágy', 'Kiskunság', 'Nyírség', 'Hajdúság', 'Jászság'], 'tó': ['Balaton', 'Velencei-tó', 'Fertő tó', 'Tisza-tó'] }, 2, { hint: 'A hegység magas, hegyes. Az alföldi táj sík. A tó állóvíz.' });
const TAJ_RIDDLES = [
  ['táj2', ['Az Alföldön vagyok, Hajdú-Bihar megyében.', 'Végtelen füves puszta vagyok, szürkemarha és racka legel rajtam.', 'Rajtam áll a híres Kilenclyukú híd.', 'Hazánk első nemzeti parkja vagyok.'], 'Hortobágy', ['Kiskunság', 'Nyírség', 'Őrség']],
  ['táj2', ['A föld alatt vagyok, egészen északon.', 'Bennem a csepegő víz cseppköveket formált.', 'Egy részem Szlovákia alá is átnyúlik.', 'Hazánk leghíresebb cseppkőbarlangja vagyok, Aggteleknél.'], 'Baradla-barlang', ['Szemlő-hegyi-barlang', 'Tapolcai-tavasbarlang', 'Szent István-barlang']],
  ['táj2', ['Félsziget vagyok a Balatonban.', 'Híres apátság áll rajtam.', 'Nyáron lilán virágzik rajtam a levendula.', 'Ha a partomon kiáltasz, a visszhang válaszol.'], 'Tihany', ['Badacsony', 'Siófok', 'Keszthely']],
  ['táj2', ['Hazánk nyugati szélén vagyok, Ausztria mellett.', 'Az Alpok legkeletibb nyúlványai vagyunk.', 'Hozzám tartozik a Soproni- és a Kőszegi-hegység.', 'Rajtam van az Írott-kő, a Dunántúl legmagasabb pontja.'], 'Alpokalja', ['Bakony', 'Mecsek', 'Mátra']],
  ['táj2', ['Hazánk északkeleti részén vagyok.', 'Vulkanikus hegyoldalaimon szőlő terem.', 'Nálam ömlik a Bodrog a Tiszába.', 'Világhírű a borom, az aszú.'], 'Tokaj-Hegyalja', ['Badacsony', 'Villányi-hegység', 'Mátra']],
  ['táj2', ['A nyugati határ közelében, Vas megyében vagyok.', 'Erdős, dombos, csapadékos táj vagyok.', 'A falvaim szétszórt házcsoportjait szereknek hívják.', 'Saját nemzeti parkom is van, hazánk legfiatalabb nemzeti parkja.'], 'Őrség', ['Göcsej', 'Hanság', 'Sárköz']],
  ['táj2', ['A Kisalföldön vagyok, Győr közelében.', 'A Duna és a Mosoni-Duna között fekszem.', 'Rengeteg kis folyóág és ártéri erdő szabdal.', 'Hazánk legnagyobb szigete vagyok.'], 'Szigetköz', ['Csepel-sziget', 'Margit-sziget', 'Hanság']],
  ['táj2', ['A Tiszántúl északkeleti részén vagyok.', 'A talajom homokos.', 'Rengeteg alma terem rajtam.', 'A központom Nyíregyháza.'], 'Nyírség', ['Hajdúság', 'Jászság', 'Kiskunság']],
  ['táj2', ['Az Alföldön, a Duna és a Tisza között vagyok.', 'Homokbuckák és szikes tavak vannak rajtam.', 'Bugacon lovasbemutatót tartanak a csikósok.', 'Nevemet a kunokról kaptam.'], 'Kiskunság', ['Hortobágy', 'Nyírség', 'Jászság']],
  ['táj2', ['A Dunántúl déli részén emelkedem.', 'Baranya megyében vagyok.', 'A legmagasabb csúcsom a Zengő.', 'A lábamnál fekszik Pécs városa.'], 'Mecsek', ['Bakony', 'Villányi-hegység', 'Zselic']],
  ['táj2', ['Állóvíz vagyok Fejér megyében.', 'Budapest és Székesfehérvár között fekszem.', 'Sok nád nő bennem, nyáron fürdenek bennem.', 'Hazánk harmadik legnagyobb természetes tava vagyok.'], 'Velencei-tó', ['Balaton', 'Fertő tó', 'Tisza-tó']],
  ['táj2', ['Állóvíz vagyok az Alföldön.', 'Nem a természet hozott létre: egy gát duzzasztott fel.', 'Egy nagy folyó vize táplál, róla kaptam a nevem.', 'Hazánk legnagyobb mesterséges tava vagyok.'], 'Tisza-tó', ['Velencei-tó', 'Balaton', 'Fertő tó']],
  ['táj2', ['Állóvíz vagyok hazánk északnyugati szélén.', 'A nagyobb részem Ausztriában van.', 'Nádas, sekély tó vagyok, sok madár fészkel bennem.', 'Sopron közelében fekszem.'], 'Fertő tó', ['Velencei-tó', 'Balaton', 'Tisza-tó']],
  ['táj2', ['Itt a Duna nagy kanyart vesz, és dél felé fordul.', 'A Börzsöny és a Visegrádi-hegység között vagyok.', 'A partomon áll Visegrád vára.', 'Esztergom és Szentendre is a közelemben van.'], 'Duna-kanyar', ['Szigetköz', 'Csepel-sziget', 'Tokaj-Hegyalja']],
  ['táj2', ['Kis falu vagyok a Cserhátban, Nógrád megyében.', 'A palóc népcsoport hagyományait őrzöm.', 'Húsvétkor népviseletbe öltöznek a lakóim.', 'Világörökségi helyszín vagyok, váram is van.'], 'Hollókő', ['Visegrád', 'Tihany', 'Pannonhalma']],
  ['táj2', ['Dombon álló település vagyok Győr közelében.', 'Több mint ezer éve bencés szerzetesek élnek itt.', 'Híres főapátságom van.', 'Világörökségi helyszín vagyok.'], 'Pannonhalma', ['Tihany', 'Esztergom', 'Hollókő']]
];
RIDDLES.push(...TAJ_RIDDLES);
K4.tajak = L => {
  const r = Math.random();
  const fact = () => { const [, q, a, w, hn] = pick(TAJ_FACTS.filter(f => f[0] <= L && (L === 1 || f[0] >= L - 1))); return mcq(q, a, w, { fmt: v => v, hint: hn }); };
  const county = () => { const [t, c, ex] = pick(TAJ_COUNTY); return mcq(`Melyik megyében van ${t}?`, c, otherCounties(c, 3, ex), { fmt: v => v, hint: MAP_HINTS[c] }); };
  const rid = () => { const [, cl, a, w] = pick(TAJ_RIDDLES); return riddleQ(cl, a, w); };
  if (L === 1) return r < .5 ? fact() : r < .7 ? TAJ_SORT(L) : r < .85 ? sightTap() : rid();
  if (L === 2) return r < .35 ? fact() : r < .55 ? rid() : r < .75 ? county() : r < .9 ? sightTap() : npQ();
  return r < .3 ? fact() : r < .5 ? county() : r < .7 ? rid() : r < .85 ? npQ() : sightTap();
};

/* Budapest hídjai */
const BR_FACTS = [
  [1, 'Melyik folyón ívelnek át Budapest hídjai?', 'a Dunán', ['a Tiszán', 'a Balatonon', 'a Rábán'], 'Európa második leghosszabb folyója, Budapestet Budára és Pestre osztja.'],
  [1, 'Melyik volt az első állandó híd Buda és Pest között?', 'Lánchíd', ['Margit híd', 'Erzsébet híd', 'Szabadság híd'], 'Láncokon függ, és Széchenyi István építtette.'],
  [1, 'Melyik hidat őrzik kőoroszlánok a két hídfőnél?', 'Lánchíd', ['Szabadság híd', 'Petőfi híd', 'Árpád híd'], 'A legrégebbi budapesti híd.'],
  [1, 'Melyik híd közepéről lehet lesétálni a Margit-szigetre?', 'Margit híd', ['Lánchíd', 'Szabadság híd', 'Petőfi híd'], 'A híd neve ugyanaz, mint a szigeté.'],
  [1, 'Milyen színű a Szabadság híd?', 'zöld', ['fehér', 'piros', 'sárga'], 'Ugyanolyan színű, mint a fű.'],
  [1, 'Milyen színű az Erzsébet híd?', 'fehér', ['zöld', 'kék', 'fekete'], 'Olyan színű, mint a hó.'],
  [2, 'Kinek a kezdeményezésére épült meg a Lánchíd?', 'Széchenyi István', ['Kossuth Lajos', 'Petőfi Sándor', 'Deák Ferenc'], 'Őt „a legnagyobb magyarnak” is nevezik, a híd hivatalos neve is őt őrzi.'],
  [2, 'Melyik híd tetején ülnek bronz turulmadarak?', 'Szabadság híd', ['Lánchíd', 'Erzsébet híd', 'Megyeri híd'], 'A zöld színű híd, a Gellért-hegy lábánál.'],
  [2, 'Melyik hidat nevezték el egy királynéról, akit mindenki Sisinek hívott?', 'Erzsébet híd', ['Margit híd', 'Szabadság híd', 'Árpád híd'], 'A fehér híd.'],
  [2, 'Melyik híd kapta a nevét egy nagy magyar költőről?', 'Petőfi híd', ['Rákóczi híd', 'Árpád híd', 'Szabadság híd'], 'Ő írta a Nemzeti dalt.'],
  [2, 'Melyik a legészakibb budapesti Duna-híd, az M0-s körgyűrű része?', 'Megyeri híd', ['Árpád híd', 'Rákóczi híd', 'Margit híd'], 'A legújabb híd, 2008-ban adták át.'],
  [2, 'Mi történt 1944–45 telén Budapest összes Duna-hídjával?', 'a háborúban felrobbantották őket', ['elsodorta őket az árvíz', 'lebontották, mert elöregedtek', 'átfestették őket'], 'A második világháború vége felé történt; később újjáépítették őket.'],
  [3, 'Mi volt a Rákóczi híd régi neve?', 'Lágymányosi híd', ['Kossuth híd', 'Ferenc József híd', 'Horthy Miklós híd'], 'Arról a budai városrészről kapta, ahol a hídfője van.'],
  [3, 'Mi volt a Szabadság híd eredeti neve?', 'Ferenc József híd', ['Lágymányosi híd', 'Széchenyi híd', 'Mátyás király híd'], 'Az akkori királyról nevezték el, amikor 1896-ban átadták.'],
  [3, 'Milyen hídfajta a Megyeri híd?', 'ferdekábeles híd', ['lánchíd', 'kőhíd', 'fahíd'], 'A magas pilonokról ferdén lefutó kábelek tartják.'],
  [3, 'Melyik híd tör meg a közepén, a Margit-szigetnél?', 'Margit híd', ['Árpád híd', 'Petőfi híd', 'Erzsébet híd'], 'A Margit-sziget déli csücskénél ágazik le a sziget felé.'],
  [3, 'Mikor adták át a Lánchidat?', '1849-ben', ['1749-ben', '1896-ban', '1945-ben'], 'Közvetlenül az 1848–49-es szabadságharc után adták át.']
];
const BR_RIDDLES = [
  [['Budapesten vagyok.', 'Két kapuszerű kőpillérem van.', 'A két hídfőmnél kőoroszlánok őrködnek.', 'Én voltam az első állandó híd Buda és Pest között.'], 'Lánchíd', ['Margit híd', 'Erzsébet híd', 'Szabadság híd']],
  [['Budapest egyik hídja vagyok.', 'Fehér színű vagyok.', 'A háború után teljesen újjáépítettek, 1964-ben adtak át újra.', 'Egy királynéról, Sisiről neveztek el.'], 'Erzsébet híd', ['Szabadság híd', 'Lánchíd', 'Petőfi híd']],
  [['Budapest egyik hídja vagyok.', 'Zöld színű vagyok, a Gellért-hegy lábánál.', 'A tetőmön turulmadarak ülnek.', 'A honfoglalás ezeréves ünnepére, 1896-ban adtak át.'], 'Szabadság híd', ['Erzsébet híd', 'Margit híd', 'Lánchíd']],
  [['Budapest legészakibb Duna-hídja vagyok.', 'Az autópálya-körgyűrű, az M0 része vagyok.', 'Magas pilonokról ferde kábelek tartanak.', '2008-ban adtak át.'], 'Megyeri híd', ['Árpád híd', 'Rákóczi híd', 'Lánchíd']]
];
const brOrder = () => { const k = [...Array(8).keys()].sort(() => Math.random() - .5).slice(0, 4).sort((a, b) => a - b), ans = k.map(i => BRIDGES[i].n);
  return { type: 'build', prompt: 'Rakd sorba a hidakat északról délre, ahogy a Duna folyik! Koppints rájuk sorban.', answer: ans, tiles: shuffle(ans), visual: danubeSvg({}), explain: 'Északról délre: ' + BRIDGES.map(b => b.n).join(', ') + '.', hint: 'Északról délre: Megyeri, Árpád, Margit, Lánchíd, Erzsébet, Szabadság, Petőfi, Rákóczi.' }; };
const brLabel = () => { const starts = pick([[0, 2, 4, 6], [1, 3, 5, 7], [0, 2, 5, 7], [0, 3, 5, 7], [1, 3, 6, 0]]).sort((a, b) => a - b);
  return labelQ('Írd a hidak nevét a helyükre! (Az észak fent van.)', danubeSvg({}), starts.map(i => ({ name: BRIDGES[i].n, x: dcx(BRIDGES[i].y) / 260 * 100, y: BRIDGES[i].y / 340 * 100 })), { hint: 'Északról délre: Megyeri, Árpád, Margit, Lánchíd, Erzsébet, Szabadság, Petőfi, Rákóczi.' }); };
const brHl = L => { const i = L === 1 ? pick([2, 3, 4, 5]) : ri(0, 7), b = BRIDGES[i].n; const pool = L === 1 ? [2, 3, 4, 5] : [...Array(8).keys()];
  return { type: 'choice', prompt: 'Melyik híd van kiemelve? (Az észak fent van.)', visual: danubeSvg({ hl: i }), answer: b, options: shuffle([b, ...shuffle(pool.filter(x => x !== i)).slice(0, 3).map(x => BRIDGES[x].n)]).map(v => ({ value: v, html: v })), answerText: b, hint: 'Északról délre: Megyeri, Árpád, Margit, Lánchíd, Erzsébet, Szabadság, Petőfi, Rákóczi. A Margit híd a szigetnél, a Lánchíd a két kőpillérről ismerhető fel.' }; };
K4.hidak = L => {
  const r = Math.random(), fact = () => { const [, q, a, w, hn] = pick(BR_FACTS.filter(f => f[0] === L || (L > 1 && f[0] === L - 1 && Math.random() < .4))); return mcq(q, a, w, { fmt: v => v, hint: hn }); };
  if (L === 1) return r < .4 ? brHl(1) : fact();
  if (L === 2) return r < .3 ? brOrder() : r < .5 ? brHl(2) : r < .7 ? (() => { const [cl, a, w] = pick(BR_RIDDLES); return riddleQ(cl, a, w); })() : fact();
  return r < .35 ? brLabel() : r < .55 ? brOrder() : r < .7 ? (() => { const [cl, a, w] = pick(BR_RIDDLES); return riddleQ(cl, a, w); })() : fact();
};
/* ---------- more questions for the small topics, and three new topics ---------- */
// fact = [level, question, answer, wrong answers, hint]
const factQ = ([, q, a, w, hint]) => mcq(q, a, w, { fmt: v => v, hint });
const withFacts = (base, facts, p) => L => { const pool = facts.filter(f => f[0] === L); return pool.length && Math.random() < p ? factQ(pick(pool)) : base(L); };
const MORE = {
  measure: [
    [1, 'Mivel mérjük meg, milyen hosszú a ceruza?', 'vonalzóval', ['mérleggel', 'hőmérővel', 'órával'], 'Rövid dolgok hosszát vonalzóval mérjük.'],
    [1, 'Mivel mérjük a lázat?', 'lázmérővel', ['vonalzóval', 'mérleggel', 'mérőpohárral'], 'A láz a testhőmérséklet; ehhez külön hőmérő van.'],
    [1, 'Mivel mérjük az időt egy futóversenyen?', 'stopperórával', ['mérleggel', 'vonalzóval', 'hőmérővel'], 'Ez egy olyan óra, amelyet elindíthatsz és megállíthatsz.'],
    [1, 'Mivel mérjük, mennyi tej kell a palacsintához?', 'mérőpohárral', ['vonalzóval', 'hőmérővel', 'stopperórával'], 'A folyadék mennyiségét (űrtartalmát) mérjük vele.'],
    [1, 'Mivel mérjük meg, hány kiló a liszt?', 'konyhai mérleggel', ['mérőszalaggal', 'hőmérővel', 'stopperórával'], 'A tömeget mérleggel mérjük.'],
    [2, 'Mennyi 1 kg?', '100 dkg', ['10 dkg', '1000 dkg', '50 dkg'], '1 kg = 100 dkg, 1 dkg = 10 g.'],
    [2, 'Mennyi 1 liter?', '10 dl', ['100 dl', '5 dl', '1000 dl'], '1 l = 10 dl, 1 dl = 100 ml.'],
    [2, 'Mennyi 1 méter?', '100 cm', ['10 cm', '1000 cm', '60 cm'], '1 m = 10 dm = 100 cm.'],
    [2, 'Hány óra egy nap?', '24 óra', ['12 óra', '60 óra', '10 óra'], 'Egy nap 24 óra: ennyi idő alatt fordul meg a Föld.'],
    [2, 'Melyik a legnehezebb?', '1 kg kenyér', ['80 dkg liszt', '50 dkg alma', '10 dkg csoki'], 'Váltsd át: 1 kg = 100 dkg.'],
    [2, 'Melyik a leghosszabb?', '1 m', ['90 cm', '9 dm', '50 cm'], 'Váltsd át: 1 m = 100 cm, 9 dm = 90 cm.'],
    [2, 'Melyikbe fér több víz?', '2 literes üveg', ['15 dl-es kancsó', '5 dl-es pohár', '1 literes üveg'], 'Váltsd át: 1 l = 10 dl, tehát 2 l = 20 dl.']
  ],
  weather: [
    [1, 'Melyik évszakban esik leggyakrabban hó?', 'télen', ['nyáron', 'tavasszal', 'ősszel'], 'A hó akkor esik, amikor fagypont alatt van a hőmérséklet.'],
    [1, 'Melyik évszak követi a nyarat?', 'az ősz', ['a tél', 'a tavasz', 'újra a nyár'], 'Az évszakok sorrendje: tavasz, nyár, ősz, tél.'],
    [1, 'Melyik évszakban a leghosszabbak a nappalok?', 'nyáron', ['télen', 'ősszel', 'tavasszal'], 'Nyáron korán kel és későn nyugszik a Nap.'],
    [1, 'Mi a szél?', 'a levegő mozgása', ['a felhők színe', 'a lehulló víz', 'a Nap melege'], 'Amikor a levegő áramlik, azt szélnek érezzük.'],
    [1, 'Hogyan véded magad nyáron a tűző naptól?', 'sapkát veszek, és naptejet használok', ['kabátot veszek', 'nem iszom vizet', 'délben futok a napon'], 'A nap sugarai leégést és napszúrást okozhatnak.'],
    [1, 'Mit vegyél fel, ha esik az eső?', 'esőkabátot', ['fürdőruhát', 'papucsot', 'napszemüveget'], 'Olyan ruha kell, amin nem jut át a víz.'],
    [2, 'Mi a dér?', 'a talajra és a növényekre fagyott apró jégkristályok', ['hulló hópelyhek', 'nagy esőcseppek', 'a talajhoz közeli felhő'], 'Hideg, derült éjszakákon keletkezik, reggel fehérré teszi a füvet.'],
    [2, 'Mi a harmat?', 'a hűvös hajnalon a fűre kicsapódó vízcseppek', ['a jégeső olvadéka', 'a fák nedve', 'a köd neve télen'], 'A levegő párája lecsapódik a hideg fűszálakon.'],
    [2, 'Mi a köd?', 'a talaj közelében lebegő apró vízcseppek', ['a füst a kéményből', 'a hó, ami nem esik le', 'a szél porfelhője'], 'A köd olyan, mint egy felhő, ami leereszkedett a földre.'],
    [2, 'Mi jellemző a zivatarra?', 'villámlás, mennydörgés és heves eső', ['csendes, apró szitálás', 'havazás tavasszal', 'erős napsütés'], 'Nyáron, meleg időben gyakori.'],
    [2, 'Mi a jégeső?', 'jéggolyók hullanak az égből, főleg nyári zivatarban', ['a téli havazás másik neve', 'a fagyott tó felszíne', 'a jégcsap olvadása'], 'Nyáron is eshet, a zivatarfelhőben fagynak meg a cseppek.'],
    [3, 'Milyen az éghajlata hazánknak?', 'mérsékelt, négy évszakkal', ['trópusi, egész évben forró', 'sarkvidéki, egész évben hideg', 'sivatagi, alig esik eső'], 'Nálunk négy jól elkülönülő évszak van.'],
    [3, 'Mi a különbség az időjárás és az éghajlat között?', 'az időjárás a mostani állapot, az éghajlat sok év átlaga', ['nincs különbség', 'az időjárás csak télen van', 'az éghajlatot hőmérővel mérjük'], 'Az időjárás napról napra változik, az éghajlat egy terület jellemző, hosszú távú időjárása.'],
    [3, 'Miért látjuk előbb a villámot, mint halljuk a mennydörgést?', 'mert a fény gyorsabb, mint a hang', ['mert a hang gyorsabb', 'mert a villám hangtalan', 'mert a felhők elnyelik a hangot'], 'A fény szinte azonnal ideér, a hang lassabban halad.'],
    [3, 'Mit tegyél, ha a szabadban ér a zivatar?', 'ne állj magányos fa alá, keress épületet', ['állj a legmagasabb fa alá', 'menj fel a dombtetőre', 'fogd meg a fémkerítést'], 'A villám a magas, kiemelkedő pontokba csap.']
  ],
  health: [
    [1, 'Hányszor moss fogat naponta?', 'legalább kétszer', ['hetente egyszer', 'csak ünnepnapon', 'soha'], 'Reggel és este is moss fogat!'],
    [1, 'Mit igyál, ha szomjas vagy?', 'vizet', ['kólát', 'energiaitalt', 'nagyon cukros szörpöt'], 'A víz oltja legjobban a szomjat, és nincs benne cukor.'],
    [1, 'Melyik egészséges tízórai?', 'gyümölcs vagy teljes kiőrlésű szendvics', ['chips', 'csoki', 'cukorka'], 'Ami vitamint és tartós energiát ad, az egészséges.'],
    [1, 'Mit viselj biciklizéskor?', 'bukósisakot', ['papucsot', 'napszemüveget a fejem tetején', 'semmit sem kell'], 'A bukósisak eséskor megvédi a fejedet.'],
    [1, 'Mit tegyél, mielőtt átmész az úton?', 'megállok, és körülnézek balra, jobbra, majd újra balra', ['futva átrohanok', 'csak jobbra nézek', 'a telefonomat nézem'], 'Mindig a zebrán menj át, és nézz körül alaposan!'],
    [2, 'Körülbelül mennyit aludjon egy kisiskolás éjszaka?', 'körülbelül 10 órát', ['4 órát', '6 órát', '15 órát'], 'A pihent agy jobban tanul.'],
    [2, 'Mit tegyél, ha megégeted az ujjad?', 'hideg folyó víz alá tartom', ['bekenem vajjal', 'szorosan bekötöm', 'nem csinálok semmit'], 'A hideg víz lehűti az égett bőrt. Szólj egy felnőttnek is!'],
    [2, 'Mit tegyél, ha vérzik az orrod?', 'előrehajolok, és összeszorítom az orrom', ['hátrahajtom a fejem', 'lefekszem a hátamra', 'ugrálok'], 'Előre hajolj, hogy a vér ne folyjon le a torkodba.'],
    [2, 'Mit mondj, ha mentőt hívsz?', 'a nevemet, a pontos címet és hogy mi történt', ['csak azt, hogy baj van', 'a kedvenc színemet', 'semmit, leteszem'], 'A mentőknek tudniuk kell, hová menjenek és mi a baj.'],
    [2, 'Miért fontos a reggeli?', 'energiát ad a délelőtti tanuláshoz', ['mert utána nem kell ebédelni', 'mert ettől nő a hajunk', 'nem fontos'], 'Éjszaka sokáig nem eszünk, reggel tölteni kell az energiát.'],
    [3, 'Mi a kórokozó?', 'apró élőlény (például baktérium vagy vírus), amely betegséget okoz', ['egy gyógyszer', 'egy vitamin', 'egy testrész'], 'Szabad szemmel nem látjuk őket.'],
    [3, 'Hogyan terjed a nátha?', 'cseppfertőzéssel: köhögéssel, tüsszentéssel', ['a napfénnyel', 'a vízcsapból', 'zenehallgatással'], 'Ezért kell zsebkendőbe tüsszenteni.'],
    [3, 'Mit tegyél, ha lázas vagy?', 'pihenek, sok folyadékot iszom, és szólok egy felnőttnek', ['focizni megyek', 'nem iszom semmit', 'hideg vízben fürdök sokáig'], 'Lázas betegségben a pihenés és a folyadék segít.'],
    [3, 'Melyik étel ad sok kalciumot a csontjainknak?', 'tej, sajt, joghurt', ['cukorka', 'kóla', 'chips'], 'A tejtermékek erősítik a csontokat és a fogakat.'],
    [3, 'Miért kell napkrémet használni?', 'megvédi a bőrt a leégéstől', ['hogy jobb legyen az illatunk', 'hogy ne fázzunk', 'hogy gyorsabban fussunk'], 'A Nap sugarai megégethetik a bőrt.']
  ],
  body: [
    [1, 'Hány érzékszervünk van?', '5', ['3', '4', '7'], 'Szem, fül, orr, nyelv, bőr.'],
    [1, 'Melyik érzékszervünkkel érezzük, hogy valami meleg vagy hideg?', 'a bőrünkkel', ['a fülünkkel', 'az orrunkkal', 'a szemünkkel'], 'A bőrünkkel tapintunk, és a meleget, hideget is érezzük.'],
    [1, 'Mivel érezzük a virág illatát?', 'az orrunkkal', ['a fülünkkel', 'a nyelvünkkel', 'a szemünkkel'], 'A szaglás érzékszerve az orr.'],
    [1, 'Mivel érezzük az ízeket?', 'a nyelvünkkel', ['a fülünkkel', 'a bőrünkkel', 'a szemünkkel'], 'Az ízlelés érzékszerve a nyelv.'],
    [1, 'Mire jó a szempilla?', 'védi a szemet a portól', ['segít hallani', 'segít szagolni', 'semmire'], 'A szempilla és a pislogás védi a szemet.'],
    [2, 'Hány foga van egy felnőtt embernek?', '32', ['20', '24', '40'], 'A gyerekeknek 20 tejfoguk van, a felnőtteknek 32 maradó foguk.'],
    [2, 'Hány tejfoga van egy kisgyereknek?', '20', ['10', '32', '28'], 'A tejfogak helyére nőnek a maradó fogak.'],
    [2, 'Mi szállítja az oxigént a testünkben?', 'a vér', ['a csontok', 'a haj', 'a köröm'], 'A szív a vért pumpálja, a vér oxigént visz minden testrészhez.'],
    [2, 'Melyik a testünk legnagyobb szerve?', 'a bőr', ['a máj', 'a tüdő', 'az agy'], 'Az egész testünket beborítja.'],
    [2, 'Mi a gerincoszlop?', 'a hátunkban húzódó csontoszlop, amely tartja a testet', ['egy izom a karban', 'a szív része', 'a koponya másik neve'], 'Csigolyákból áll.'],
    [3, 'Mi védi az agyat?', 'a koponya', ['a bordák', 'a gerinc', 'a medence'], 'A fejünk csontjai kemény „sisakot” alkotnak.'],
    [3, 'Mi védi a szívet és a tüdőt?', 'a bordák', ['a koponya', 'a térdkalács', 'a lapocka'], 'A bordák kosárként veszik körül a mellkas szerveit.'],
    [3, 'Mi a fogak feladata?', 'felaprítják az ételt', ['pumpálják a vért', 'irányítják a testet', 'levegőt szállítanak'], 'Az emésztés a szájban, a rágással kezdődik.'],
    [3, 'Hová jut a belélegzett levegő?', 'a tüdőbe', ['a gyomorba', 'a szívbe', 'az agyba'], 'Az orron és a légcsövön át a tüdőbe.']
  ],
  landform: [
    [1, 'Hogy hívjuk a hegy legmagasabb pontját?', 'csúcs', ['lejtő', 'völgy', 'hegyláb'], 'A hegy részei: csúcs (teteje), lejtő (oldala), hegyláb (alja).'],
    [1, 'Hogy hívjuk a hegy oldalát?', 'lejtő', ['csúcs', 'völgy', 'forrás'], 'A hegy részei: csúcs, lejtő, hegyláb.'],
    [1, 'Hogy hívjuk azt a helyet, ahol a víz a földből előtör?', 'forrás', ['torkolat', 'tó', 'völgy'], 'A forrásból indul el a patak.'],
    [1, 'Hogy hívjuk a vízzel minden oldalról körülvett szárazföldet?', 'sziget', ['félsziget', 'völgy', 'domb'], 'Ilyen a Margit-sziget vagy a Csepel-sziget.'],
    [2, 'Mi a félsziget?', 'három oldalról víz veszi körül', ['minden oldalról víz veszi körül', 'egy fél hegy', 'egy kis tó'], 'Ilyen a Tihanyi-félsziget a Balatonban.'],
    [2, 'Mi a mocsár?', 'sekély, növényekkel sűrűn benőtt állóvíz', ['gyors folyású patak', 'magas hegy', 'homokos síkság'], 'Sok nád és sás nő benne.'],
    [2, 'Mi a csatorna?', 'ember által ásott, mesterséges folyóvíz', ['egy hegy neve', 'természetes tó', 'egy forrás'], 'Öntözésre vagy hajózásra készítik.'],
    [2, 'Mi a barlang?', 'föld alatti üreg, gyakran cseppkövekkel', ['egy magas fa', 'egy sziget', 'egy völgy a folyó mellett'], 'Híres barlangunk a Baradla Aggteleknél.'],
    [3, 'Hol van a Dunántúl legmagasabb pontja, az Írott-kő?', 'a Kőszegi-hegységben', ['a Mecsekben', 'a Bakonyban', 'a Mátrában'], 'Az osztrák határon, az Alpokalján.'],
    [3, 'Mi a Bükk legmagasabb csúcsa?', 'az Istállós-kő', ['a Kékes', 'a Zengő', 'a Dobogókő'], 'A Bükk Eger és Miskolc között van.'],
    [3, 'Milyen magas a Kékes?', 'körülbelül 1014 méter', ['körülbelül 514 méter', 'körülbelül 2014 méter', 'körülbelül 114 méter'], 'Ez az egyetlen hegycsúcsunk, amely 1000 méternél magasabb.'],
    [3, 'Mi a tanúhegy, például a Badacsony?', 'vulkáni eredetű, lapos tetejű hegy a Balaton-felvidéken', ['egy homokdomb az Alföldön', 'egy barlang', 'egy mesterséges domb'], 'Régen vulkánok működtek a Balaton északi partján.']
  ],
  plant: [
    [1, 'Mire van szüksége a növénynek a növekedéshez?', 'fényre, vízre, levegőre és tápanyagra', ['csak sötétségre', 'csak cukorra', 'semmire'], 'A növény a gyökerével vizet és tápanyagot vesz fel, a levelével fényt hasznosít.'],
    [1, 'Mi lesz a magból?', 'új növény', ['virágpor', 'levél', 'kő'], 'A mag kicsírázik, és új növény fejlődik belőle.'],
    [1, 'Mi lesz a virágból?', 'termés', ['gyökér', 'szár', 'föld'], 'A virágból fejlődik a termés, abban van a mag.'],
    [1, 'Melyik évszakban hullatják le a leveleiket a lombos fák?', 'ősszel', ['tavasszal', 'nyáron', 'egész évben'], 'Ősszel a levelek elszíneződnek és lehullanak.'],
    [1, 'Hogy hívjuk a fa vastag szárát?', 'törzs', ['gyökér', 'korona', 'levél'], 'A fa részei: gyökér, törzs, korona (ágak és levelek).'],
    [2, 'Melyik fa örökzöld?', 'a fenyő', ['a tölgy', 'a bükk', 'a nyír'], 'Az örökzöldek télen is megtartják a leveleiket (tűleveleiket).'],
    [2, 'Mi terem a tölgyfán?', 'makk', ['dió', 'alma', 'gesztenye'], 'A makk a tölgyfa termése, a vaddisznók és a mókusok szeretik.'],
    [2, 'Kik segítik a virágok beporzását?', 'a rovarok, például a méhek', ['a halak', 'a csigák', 'a vakondok'], 'A méhek virágról virágra viszik a virágport.'],
    [2, 'Melyik lágyszárú növény?', 'a pipacs', ['a tölgy', 'a fenyő', 'az akác'], 'A lágyszárú növény szára puha és zöld, a fásszárúé kemény.'],
    [3, 'Mit készít a levél a napfény segítségével?', 'táplálékot (cukrot) a növénynek', ['virágport', 'gyökeret', 'magot'], 'A zöld levél napfény, víz és levegő segítségével táplálékot készít.'],
    [3, 'Milyen gázt bocsátanak ki a növények nappal a levegőbe?', 'oxigént', ['füstöt', 'vízgőzt és homokot', 'semmilyet'], 'Az oxigént mi és az állatok belélegezzük.'],
    [3, 'Melyik fásszárú növény?', 'az akác', ['a pipacs', 'a búza', 'a kamilla'], 'A fásszárú növény szára kemény, megfásodott: fák és cserjék.']
  ],
  regions: [
    [1, 'Melyik nagytájon fekszik Debrecen?', 'Alföld', ['Kisalföld', 'Dunántúli-dombság', 'Északi-középhegység'], 'Debrecen keleten van, a nagy síkságon.'],
    [1, 'Melyik nagytájon fekszik Győr?', 'Kisalföld', ['Alföld', 'Északi-középhegység', 'Dunántúli-dombság'], 'Győr északnyugaton van, a kisebbik síkságon.'],
    [1, 'Melyik nagytájon fekszik Pécs?', 'Dunántúli-dombság', ['Alföld', 'Kisalföld', 'Északi-középhegység'], 'Pécs a Mecsek lábánál van, délen.'],
    [1, 'Melyik nagytájon fekszik Eger?', 'Északi-középhegység', ['Alföld', 'Kisalföld', 'Dunántúli-dombság'], 'Eger a Bükk lábánál van, északon.']
  ],
  country: [
    [1, 'Hány szomszédos országa van Magyarországnak?', '7', ['4', '5', '9'], 'Ausztria, Szlovákia, Ukrajna, Románia, Szerbia, Horvátország, Szlovénia.'],
    [1, 'Mi Magyarország fővárosa?', 'Budapest', ['Debrecen', 'Szeged', 'Győr'], 'A Duna két partján fekszik.'],
    [1, 'Hány megyéje van Magyarországnak?', '19', ['7', '12', '25'], 'És mellettük Budapest, a főváros.'],
    [1, 'Milyen színű a magyar zászló fentről lefelé?', 'piros, fehér, zöld', ['zöld, fehér, piros', 'piros, sárga, zöld', 'kék, fehér, piros'], 'A piros van felül, a zöld alul.'],
    [2, 'Melyik a legnagyobb városunk Budapest után?', 'Debrecen', ['Szeged', 'Pécs', 'Győr'], 'Hajdú-Bihar megye székhelye, az Alföldön.']
  ]
};
MORE.energy = [
  [1, 'Melyik ad fényt és meleget is?', 'a tűz', ['a Hold', 'a tükör', 'a víz'], 'A tűz világít és melegít is.'],
  [1, 'Mi kell ahhoz, hogy lássunk?', 'fény', ['zaj', 'szél', 'víz'], 'Teljes sötétben semmit sem látunk.'],
  [2, 'Mit tegyél, ha tüzet látsz?', 'szólok egy felnőttnek, és hívjuk a 105-öt vagy a 112-t', ['elbújok az ágy alá', 'vizet öntök a konnektorra', 'bent maradok, és nézem'], 'A tűzoltók száma 105, az általános segélyhívó 112.'],
  [3, 'Mivel oltsuk el az égő olajat a serpenyőben?', 'letakarjuk egy fedővel', ['vizet öntünk rá', 'ráfújunk', 'megkeverjük'], 'A víztől szétfröccsen az égő olaj! A fedő elzárja a levegőt.'],
  [3, 'Miért alszik ki a gyertya, ha befőttesüveget borítunk rá?', 'elfogy alatta a levegő (oxigén)', ['mert megijed', 'mert túl meleg lesz', 'mert kialszik a fény'], 'Az égéshez levegő kell.']
];
MORE.animal = [
  [2, 'Melyik állat rak tojást?', 'a tyúk', ['a kutya', 'a tehén', 'a macska'], 'A madarak, a hüllők, a kétéltűek és a halak tojással szaporodnak.'],
  [2, 'Hány lába van a rovaroknak?', '6', ['4', '8', '10'], 'Minden rovarnak hat lába van.'],
  [2, 'Hány lába van a póknak?', '8', ['6', '4', '10'], 'A pók nem rovar: nyolc lába van.'],
  [2, 'Melyik állat alszik téli álmot?', 'a sün', ['a róka', 'a veréb', 'a szarvas'], 'Téli álmot alszik például a sün, a denevér és az ürge.'],
  [2, 'Melyik madár költözik ősszel melegebb vidékre?', 'a fecske', ['a veréb', 'a cinege', 'a varjú'], 'A fecske és a gólya ősszel délre költözik.']
];
MORE.habitat = [
  [3, 'Kik a termelők a táplálékláncban?', 'a zöld növények', ['a ragadozók', 'a gombák', 'a növényevők'], 'A zöld növények a napfény segítségével maguk készítik a táplálékukat.'],
  [3, 'Melyik ragadozó?', 'a róka', ['a nyúl', 'az őz', 'a mezei egér'], 'A ragadozó más állatokat eszik.'],
  [3, 'Melyik növényevő?', 'az őz', ['a róka', 'a farkas', 'a bagoly'], 'A növényevő füvet, levelet, termést eszik.'],
  [3, 'Mi történne, ha eltűnnének a rókák az erdőből?', 'elszaporodnának az egerek és a nyulak', ['több lenne a fa', 'kiszáradna a patak', 'semmi'], 'Az életközösség tagjai összefüggnek: a ragadozók szabályozzák a zsákmányállatok számát.'],
  [3, 'Mit csinálnak a lebontók (például a gombák és a giliszták)?', 'lebontják az elhalt növényeket és állatokat', ['virágot hoznak', 'megeszik a rókát', 'vizet szállítanak'], 'A lebontók munkájából lesz a talaj tápanyaga.']
];
MORE.country.push(
  [2, 'Melyik ország fővárosa Bécs?', 'Ausztria', ['Szlovákia', 'Románia', 'Szerbia'], 'Bécs nyugati szomszédunk fővárosa.'],
  [2, 'Mi Szlovákia fővárosa?', 'Pozsony', ['Bécs', 'Zágráb', 'Belgrád'], 'Közel van a magyar határhoz, a Duna partján.'],
  [2, 'Melyik a legnagyobb területű megyénk?', 'Bács-Kiskun', ['Pest', 'Nógrád', 'Komárom-Esztergom'], 'A Duna és a Tisza között fekszik, délen.'],
  [2, 'Melyik a legkisebb területű megyénk?', 'Komárom-Esztergom', ['Bács-Kiskun', 'Pest', 'Borsod-Abaúj-Zemplén'], 'Északon, a Duna mentén fekszik.']);
MORE.weather.push(
  [3, 'Milyen felhőből lesz zivatar?', 'a magasra tornyosuló gomolyfelhőből', ['a vékony fátyolfelhőből', 'a ködből', 'a kéményfüstből'], 'A nyári zivatarfelhő óriási, sötét toronyként nő az égen.'],
  [3, 'Mit jelent a fagypont alatti hőmérséklet?', '0 °C-nál hidegebb', ['0 °C-nál melegebb', 'pontosan 10 °C', 'amikor esik az eső'], '0 °C-on fagy meg a víz.']);
for (const [k, facts] of Object.entries(MORE)) K4[k] = withFacts(K4[k], facts, .5);

/* Folyóink és tavaink */
const RIVER_HL = ['Duna', 'Tisza', 'Rába', 'Körös', 'Maros', 'Zagyva', 'Sajó', 'Bodrog', 'Sió', 'Zala'];
const RIVER_HINT = { 'Duna': 'Hazánk legnagyobb folyója: északnyugatról érkezik, a Duna-kanyarnál dél felé fordul, és Budapesten is átfolyik.', 'Tisza': 'Északkeleten lép be, és dél felé kanyarog az Alföldön, Szegednél hagyja el az országot.', 'Rába': 'Nyugatról, Ausztriából érkezik, és Győrnél ömlik a Mosoni-Dunába.', 'Körös': 'Keletről, Romániából érkezik, és Csongrádnál ömlik a Tiszába.', 'Maros': 'Keletről, Romániából érkezik, és Szegednél ömlik a Tiszába.', 'Zagyva': 'Északról, a Mátra mellől folyik dél felé, és Szolnoknál ömlik a Tiszába.', 'Sajó': 'Északról, Szlovákiából érkezik, Miskolc mellett folyik el, és a Tiszába ömlik.', 'Bodrog': 'Északkeletről érkezik, és Tokajnál ömlik a Tiszába.', 'Sió': 'A Balatonból indul Siófoknál, és a Dunába ömlik.', 'Zala': 'Nyugatról érkezik, és a Balaton nyugati csücskébe ömlik.' };
const riverHl = () => { const r = pick(RIVER_HL); return { type: 'choice', prompt: 'Melyik folyó van kiemelve a térképen?', visual: mapRef({ hlRiver: r, rivers: false }), answer: r, options: shuffle([r, ...shuffle(RIVER_HL.filter(x => x !== r)).slice(0, 3)]).map(v => ({ value: v, html: v })), answerText: r, hint: RIVER_HINT[r] }; };
const TISZA_TRIB = ['Maros', 'Körös', 'Zagyva', 'Sajó', 'Bodrog'], DUNA_TRIB = ['Rába', 'Sió', 'Dráva', 'Ipoly'];
const tribQ = () => Math.random() < .5
  ? mcq('Melyik folyó a <b>Tisza</b> mellékfolyója?', pick(TISZA_TRIB), shuffle(DUNA_TRIB).slice(0, 3), { fmt: v => v, hint: 'A Tiszába ömlik: Szamos, Bodrog, Sajó, Zagyva, Körös, Maros. A Dunába ömlik: Rába, Sió, Ipoly, Dráva (és maga a Tisza is).' })
  : mcq('Melyik folyó a <b>Duna</b> mellékfolyója?', pick(DUNA_TRIB), shuffle(TISZA_TRIB).slice(0, 3), { fmt: v => v, hint: 'A Dunába ömlik: Rába, Sió, Ipoly, Dráva (és maga a Tisza is). A Tiszába ömlik: Bodrog, Sajó, Zagyva, Körös, Maros.' });
const RIVER_FACTS = [
  [1, 'Melyik folyó folyik át Budapesten?', 'a Duna', ['a Tisza', 'a Rába', 'a Zagyva'], 'Budapestet Budára és Pestre osztja.'],
  [1, 'Melyik a leghosszabb folyónk az országon belül?', 'a Tisza', ['a Duna', 'a Rába', 'a Körös'], 'Az Alföldet szeli át észak–déli irányban.'],
  [1, 'Hová ömlik a Duna?', 'a Fekete-tengerbe', ['a Balatonba', 'az Adriai-tengerbe', 'az Északi-tengerbe'], 'Sok országon át folyik keletre, a tengerig.'],
  [1, 'Hogy hívjuk azt a helyet, ahol a folyó ered?', 'forrás', ['torkolat', 'meder', 'gát'], 'A folyó a forrásnál „születik”.'],
  [1, 'Hogy hívjuk azt a helyet, ahol a folyó egy másik folyóba vagy a tengerbe ömlik?', 'torkolat', ['forrás', 'meder', 'part'], 'A torkolatnál ér véget a folyó útja.'],
  [1, 'Hogy hívjuk a folyót, amely egy nagyobb folyóba ömlik?', 'mellékfolyó', ['főfolyó', 'tenger', 'forrás'], 'A Zagyva például a Tisza mellékfolyója.'],
  [1, 'Milyen víz a Balaton?', 'állóvíz', ['folyóvíz', 'tenger', 'patak'], 'A tó vize egy helyben marad, nem folyik el egy irányba.'],
  [2, 'Melyik városnál ömlik a Maros a Tiszába?', 'Szegednél', ['Szolnoknál', 'Tokajnál', 'Győrnél'], 'Hazánk déli részén, a Tisza partján.'],
  [2, 'Melyik városnál ömlik a Zagyva a Tiszába?', 'Szolnoknál', ['Szegednél', 'Tokajnál', 'Győrnél'], 'Jász-Nagykun-Szolnok megye székhelyén.'],
  [2, 'Melyik városnál ömlik a Bodrog a Tiszába?', 'Tokajnál', ['Szegednél', 'Szolnoknál', 'Csongrádnál'], 'Ott, ahol a híres borvidék is van.'],
  [2, 'Melyik folyó vezeti le a Balaton vizét a Dunába?', 'a Sió', ['a Zala', 'a Rába', 'a Kapos'], 'Siófoknál indul ki a tóból.'],
  [2, 'Melyik folyó a Balaton legnagyobb befolyója?', 'a Zala', ['a Sió', 'a Rába', 'a Dráva'], 'Nyugatról, a Kis-Balatonon át érkezik.'],
  [2, 'Melyik folyó jelöli ki a határ egy részét Horvátország felé?', 'a Dráva', ['a Rába', 'a Zagyva', 'a Sió'], 'Hazánk déli határán folyik, Barcs mellett.'],
  [2, 'Melyik folyó jelöli ki a határ egy részét Szlovákia felé (a Duna mellett)?', 'az Ipoly', ['a Dráva', 'a Maros', 'a Rába'], 'Nógrád megye északi szélén folyik.'],
  [2, 'Melyik folyó partján fekszik Szeged?', 'a Tisza', ['a Duna', 'a Rába', 'a Zagyva'], 'Szeged az Alföld déli részén van.'],
  [2, 'A Duna melyik partján fekszik Buda?', 'a jobb partján', ['a bal partján', 'a forrásánál', 'a torkolatánál'], 'A partot mindig a folyás irányába nézve nevezzük meg. A Duna délre folyik; dél felé nézve jobb kéz felől van Buda.'],
  [2, 'Hogyan döntjük el, melyik a folyó jobb partja?', 'a folyás irányába nézve jobb kéz felőli part', ['a forrás felé nézve jobb kéz felőli part', 'mindig a nagyobb város felőli part', 'mindig a keleti part'], 'Képzeld el, hogy csónakban ülsz, és a víz visz előre.'],
  [3, 'Hol ered a Duna?', 'Németországban, a Fekete-erdőben', ['Ausztriában', 'Szlovákiában', 'Romániában'], 'Nyugaton ered, és keletre, a Fekete-tengerig folyik.'],
  [3, 'Hol ered a Tisza?', 'Ukrajnában, a Kárpátokban', ['Ausztriában, az Alpokban', 'Szlovákiában', 'Szerbiában'], 'Északkeletről érkezik hazánkba.'],
  [3, 'Hová ömlik a Tisza?', 'a Dunába, Szerbiában', ['a Balatonba', 'egyenesen a Fekete-tengerbe', 'a Marosba'], 'A Tisza is a Duna mellékfolyója.'],
  [3, 'Hány országon folyik át a Duna?', '10', ['4', '6', '15'], 'Ez a világ legtöbb országán átfolyó folyója.'],
  [3, 'Mi a tiszavirág?', 'egy rovar (kérész), amely júniusban tömegesen rajzik a Tisza felett', ['egy vízinövény', 'egy hal', 'egy madár'], 'Csak néhány óráig él kifejlett rovarként.'],
  [3, 'Mit nevezünk árvíznek?', 'amikor a folyó vize kilép a medréből', ['amikor kiszárad a folyó', 'amikor befagy a folyó', 'amikor tiszta a víz'], 'Hóolvadás vagy sok eső után történhet.'],
  [3, 'Mi védi a településeket az árvíztől?', 'a gát (töltés)', ['a híd', 'a kikötő', 'a vízimalom'], 'A folyó mentén magas földsáncot építenek.'],
  [3, 'Melyik tó vize gyógyvíz, és télen is meleg?', 'a Hévízi-tó', ['a Velencei-tó', 'a Fertő tó', 'a Tisza-tó'], 'Keszthely közelében, Zala megyében van.']
];
function riverSvg() {
  let s = `<rect x="0" y="0" width="240" height="300" fill="#d8f5a2"/><path d="M0 0 L240 0 L240 12 Q120 20 0 12Z" fill="#e7f5ff"/>`;
  s += `<path d="M0 72 L30 22 L58 58 L84 18 L118 70Z" fill="#a9845c" stroke="#7a5c3a" stroke-width="2"/><path d="M76 30 L84 18 L92 30Z" fill="#fff"/><path d="M24 32 L30 22 L36 32Z" fill="#fff"/>`;
  s += `<rect x="0" y="262" width="240" height="38" fill="#4dabf7"/><path d="M0 262 q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="#4dabf7"/>`;
  s += `<path d="M60 62 C66 90 84 110 96 130" fill="none" stroke="#339af0" stroke-width="4" stroke-linecap="round"/>`;
  s += `<path d="M96 130 C110 155 118 170 120 190" fill="none" stroke="#339af0" stroke-width="8" stroke-linecap="round"/>`;
  s += `<path d="M120 190 C124 220 132 240 138 266" fill="none" stroke="#339af0" stroke-width="14" stroke-linecap="round"/>`;
  s += `<path d="M228 60 C200 90 180 120 168 150 C156 175 140 185 121 192" fill="none" stroke="#339af0" stroke-width="5" stroke-linecap="round"/>`;
  s += `<circle cx="60" cy="62" r="5" fill="#1c7ed6"/><path d="M128 210 l0 22 M124 226 l4 6 l4 -6" stroke="#1864ab" stroke-width="2" fill="none"/>`;
  s += `<text x="200" y="290" font-size="13" fill="#fff" font-weight="700">tenger</text>`;
  return svg(240, 300, s, 'riverfig');
}
const riverLabel = () => Math.random() < .55
  ? labelQ('Címkézd fel a folyó részeit!', riverSvg(), [{ name: 'forrás', x: 25, y: 21 }, { name: 'mellékfolyó', x: 71, y: 44 }, { name: 'főfolyó', x: 52, y: 72 }, { name: 'torkolat', x: 57, y: 88 }], { hint: 'A folyó a forrásnál ered, a torkolatnál ömlik a tengerbe. A mellékfolyó a nagyobb főfolyóba ömlik.' })
  : labelQ('Melyik a folyó jobb és bal partja? (A kis nyíl mutatja, merre folyik a víz.)', riverSvg(), [{ name: 'forrás', x: 25, y: 21 }, { name: 'jobb part', x: 37, y: 73 }, { name: 'bal part', x: 72, y: 73 }, { name: 'torkolat', x: 57, y: 88 }], { hint: 'A folyás irányába nézz (lefelé)! Ilyenkor a jobb kezed felé eső part a jobb part. Lefelé nézve a jobb kezed a kép bal oldalán van.' });
const RIVER_RIDDLES = [
  [['Rövid folyó vagyok a Dunántúlon.', 'Egy nagy üdülővárosból, a Balaton déli partjáról indulok.', 'Zsilip szabályozza a vizemet.', 'Én vezetem le a Balaton vizét a Dunába.'], 'Sió', ['Zala', 'Rába', 'Kapos']],
  [['Folyó vagyok a Dunántúl nyugati részén.', 'Göcsej dombjai között kanyargok.', 'A Kis-Balatonon át érkezem.', 'Én vagyok a Balaton legnagyobb befolyója.'], 'Zala', ['Sió', 'Rába', 'Mura']],
  [['Folyó vagyok, az Alpokban erednek a forrásaim.', 'Hazánk déli határán folyok.', 'Barcs városa mellett is elhaladok.', 'Horvátország és Magyarország között határt alkotok, aztán a Dunába ömlök.'], 'Dráva', ['Mura', 'Rába', 'Sió']],
  [['Szlovákiából érkezem.', 'Sárospatak mellett folyok el.', 'Tokajnál ömlök a Tiszába.', 'Rólam kapta a nevét a Bodrogköz.'], 'Bodrog', ['Sajó', 'Hernád', 'Zagyva']],
  [['Folyó vagyok, Ausztriából érkezem.', 'Szentgotthárdnál lépek be hazánkba.', 'Vas megyén kanyargok keresztül.', 'Győrnél ömlök a Mosoni-Dunába.'], 'Rába', ['Zala', 'Dráva', 'Lajta']]
];
const RIVER_SORT = L => sortQ('Folyó vagy tó? Válogasd szét!', { 'folyó': ['Duna', 'Tisza', 'Rába', 'Dráva', 'Körös', 'Zagyva', 'Maros', 'Sajó'], 'tó': ['Balaton', 'Velencei-tó', 'Fertő tó', 'Tisza-tó', 'Hévízi-tó'] }, 3, { hint: 'A folyó vize folyik egy irányba. A tó vize egy helyben marad. Vigyázz: a Tisza folyó, de a Tisza-tó tó!' });
const RIVER_BUILDS = [
  { prompt: 'Rakd sorba a víz útját a forrástól a tengerig! Koppints rájuk sorban.', answer: ['forrás', 'patak', 'folyó', 'torkolat'], hint: 'A forrásból kis patak lesz, a patakokból folyó, a folyó a torkolatnál ér a tengerbe.' },
  { prompt: 'Rakd sorba a víz körforgását! Kezdd a párolgással.', answer: ['párolgás', 'felhőképződés', 'csapadékhullás', 'lefolyás'], hint: 'A Nap melegére a víz elpárolog, a gőzből felhő lesz, a felhőből eső hull, az eső a patakokon, folyókon át visszafolyik a tengerbe.' }
];
K4.folyok = L => {
  const r = Math.random(), fact = () => factQ(pick(RIVER_FACTS.filter(f => f[0] === L || (L === 3 && f[0] === 2 && Math.random() < .3))));
  const rid = () => { const [cl, a, w] = pick(RIVER_RIDDLES); return riddleQ(cl, a, w); };
  const build = () => { const b = pick(RIVER_BUILDS); return { type: 'build', prompt: b.prompt, answer: b.answer, tiles: shuffle(b.answer), hint: b.hint, explain: b.answer.join(' → ') }; };
  if (L === 1) return r < .55 ? fact() : r < .7 ? RIVER_SORT(L) : r < .85 ? build() : riverLabel();
  if (L === 2) return r < .4 ? fact() : r < .6 ? riverHl() : r < .75 ? tribQ() : r < .9 ? riverLabel() : build();
  return r < .35 ? fact() : r < .55 ? riverHl() : r < .7 ? rid() : r < .85 ? tribQ() : build();
};

/* Föld, Nap, Hold */
function moonSvg(ph) {
  const lit = '#ffe066', dark = '#2b3550';
  let s = `<rect x="0" y="0" width="140" height="140" rx="16" fill="#101829"/><circle cx="24" cy="26" r="1.6" fill="#fff"/><circle cx="118" cy="114" r="1.4" fill="#fff"/><circle cx="112" cy="22" r="1.2" fill="#fff"/>`;
  s += `<circle cx="70" cy="70" r="48" fill="${ph === 'telihold' ? lit : dark}" stroke="#56627f" stroke-width="1.5"/>`;
  if (ph === 'növő') s += `<path d="M70 22 A48 48 0 0 1 70 118 Z" fill="${lit}"/>`;
  if (ph === 'fogyó') s += `<path d="M70 22 A48 48 0 0 0 70 118 Z" fill="${lit}"/>`;
  return svg(140, 140, s, 'moonfig');
}
const MOON = { 'újhold': 'újhold', 'növő': 'növő hold (első negyed)', 'telihold': 'telihold', 'fogyó': 'fogyó hold (utolsó negyed)' };
const moonQ = () => { const k = pick(Object.keys(MOON)); return { type: 'choice', prompt: 'Melyik holdfázist látod?', visual: moonSvg(k), answer: MOON[k], options: shuffle(Object.values(MOON)).map(v => ({ value: v, html: v })), answerText: MOON[k], hint: 'Ha a Hold világos része olyan, mint a D betű, akkor dagad, vagyis nő. Ha olyan, mint a C betű, akkor csökken, vagyis fogy. Újholdkor nem látjuk, teliholdkor kerek.' }; };
const SPACE_FACTS = [
  [1, 'Mi a Nap?', 'egy csillag', ['egy bolygó', 'egy hold', 'egy felhő'], 'A Nap egy hatalmas, izzó gázgömb: csillag. Fényt és meleget ad.'],
  [1, 'Mi a Föld?', 'egy bolygó', ['egy csillag', 'egy hold', 'egy üstökös'], 'A Föld a Nap körül keringő bolygó.'],
  [1, 'Melyik égitest kering a Föld körül?', 'a Hold', ['a Nap', 'a Mars', 'a Sarkcsillag'], 'A Hold a Föld kísérője.'],
  [1, 'Mi okozza, hogy váltakozik a nappal és az éjszaka?', 'a Föld forog a tengelye körül', ['a Hold eltakarja a Napot', 'a Nap éjszakára kialszik', 'a felhők'], 'A Földnek mindig az a fele van nappalban, amelyik a Nap felé néz.'],
  [1, 'Merre kel fel a Nap?', 'keleten', ['nyugaton', 'északon', 'délen'], 'Keleten kel, nyugaton nyugszik.'],
  [1, 'Merre nyugszik le a Nap?', 'nyugaton', ['keleten', 'északon', 'délen'], 'Keleten kel, nyugaton nyugszik.'],
  [1, 'Világít-e a Hold magától?', 'nem, a Nap fényét veri vissza', ['igen, mint egy lámpa', 'csak télen', 'csak teliholdkor'], 'A Hold olyan, mint egy tükör, a napfényt veri vissza.'],
  [1, 'Hány évszak van nálunk?', '4', ['2', '3', '6'], 'Tavasz, nyár, ősz, tél.'],
  [2, 'Mennyi idő alatt fordul meg a Föld egyszer a tengelye körül?', '1 nap (24 óra)', ['1 hét', '1 hónap', '1 év'], 'Ezért tart egy nap 24 óráig.'],
  [2, 'Mennyi idő alatt kerüli meg a Föld a Napot?', '1 év', ['1 nap', '1 hét', '1 hónap'], 'Egy év alatt egyszer kerüli meg, közben váltakoznak az évszakok.'],
  [2, 'Körülbelül mennyi idő alatt kerüli meg a Hold a Földet?', 'körülbelül 1 hónap', ['1 nap', '1 hét', '1 év'], 'A holdfázisok is ennyi idő alatt ismétlődnek.'],
  [2, 'Merre látjuk délben a Napot?', 'délen, a legmagasabban', ['északon, a legalacsonyabban', 'keleten, a látóhatáron', 'nyugaton, lenyugodva'], 'Délben a Nap delel: a legmagasabban áll az égen, déli irányban.'],
  [2, 'Hányadik bolygó a Föld a Naptól számítva?', 'a harmadik', ['az első', 'az ötödik', 'a nyolcadik'], 'Merkúr, Vénusz, Föld, Mars, Jupiter, Szaturnusz, Uránusz, Neptunusz.'],
  [2, 'Hány bolygó kering a Nap körül?', '8', ['5', '12', '20'], 'Merkúr, Vénusz, Föld, Mars, Jupiter, Szaturnusz, Uránusz, Neptunusz.'],
  [2, 'Mi okozza az évszakok váltakozását?', 'a Föld ferde tengellyel kering a Nap körül', ['a Hold néha eltakarja a Napot', 'a Nap néha erősebben ég', 'a felhők mennyisége'], 'Nyáron a mi oldalunk a Nap felé dől, ezért melegebb van és hosszabbak a nappalok.'],
  [3, 'Melyik a Naprendszer legnagyobb bolygója?', 'a Jupiter', ['a Föld', 'a Mars', 'a Merkúr'], 'Óriási gázbolygó, több mint ezer Föld férne el benne.'],
  [3, 'Melyik bolygó van a legközelebb a Naphoz?', 'a Merkúr', ['a Vénusz', 'a Föld', 'a Mars'], 'Az első bolygó a Naptól.'],
  [3, 'Melyiket hívják vörös bolygónak?', 'a Marsot', ['a Jupitert', 'a Vénuszt', 'a Szaturnuszt'], 'Vöröses színű a talaja miatt.'],
  [3, 'Melyik bolygónak vannak feltűnő, széles gyűrűi?', 'a Szaturnusznak', ['a Marsnak', 'a Merkúrnak', 'a Földnek'], 'A gyűrűk jégből és kőzetdarabokból állnak.'],
  [3, 'Mikor a leghosszabb nálunk a nappal?', 'június 21. körül, nyáron', ['december 21. körül', 'március 1-jén', 'november 1-jén'], 'Ez a nyári napforduló.'],
  [3, 'Mikor a legrövidebb nálunk a nappal?', 'december 21. körül, télen', ['június 21. körül', 'augusztus 20-án', 'április 1-jén'], 'Ez a téli napforduló.'],
  [3, 'Mi a napéjegyenlőség?', 'amikor a nappal és az éjszaka egyforma hosszú', ['amikor nincs éjszaka', 'amikor a Hold eltakarja a Napot', 'amikor telihold van'], 'Tavasszal (március 20–21. körül) és ősszel (szeptember 22–23. körül) van.'],
  [3, 'Melyik csillag segít éjszaka megtalálni az északi irányt?', 'a Sarkcsillag', ['a Nap', 'a Hold', 'a Vénusz'], 'A Göncölszekér segítségével lehet megtalálni.']
];
const SPACE_RIDDLES = [
  [['Égitest vagyok, éjszaka gyakran látsz.', 'Nem világítok magamtól, a Nap fényét verem vissza.', 'Néha kerek vagyok, néha csak egy vékony sarló.', 'A Föld körül keringek, nagyjából egy hónap alatt.'], 'Hold', ['Nap', 'Mars', 'Sarkcsillag']],
  [['Csillag vagyok.', 'Fényt és meleget adok.', 'A bolygók körülöttem keringenek.', 'Nappal az égen látsz, de belém nézni veszélyes!'], 'Nap', ['Hold', 'Föld', 'Jupiter']],
  [['Bolygó vagyok.', 'A harmadik vagyok a Naptól számítva.', 'Felszínem nagy részét víz borítja.', 'Rajtam élsz te is!'], 'Föld', ['Mars', 'Vénusz', 'Hold']],
  [['Bolygó vagyok, a Föld szomszédja.', 'Vöröses színű vagyok.', 'Robotjárművek kutatják a felszínemet.', 'Nevemet a háború római istenéről kaptam.'], 'Mars', ['Vénusz', 'Jupiter', 'Merkúr']]
];
const SPACE_SORT = L => sortQ('Csillag vagy bolygó? Válogasd szét!', { 'csillag': ['Nap', 'Sarkcsillag', 'Szíriusz'], 'bolygó': ['Föld', 'Mars', 'Jupiter', 'Vénusz', 'Szaturnusz', 'Merkúr'] }, L === 1 ? 2 : 3, { hint: 'A csillag maga világít (például a Nap). A bolygó egy csillag körül kering, és nem világít magától.' });
const planetBuild = L => { const ans = ['Merkúr', 'Vénusz', 'Föld', 'Mars', 'Jupiter'].slice(0, L === 3 ? 5 : 4); return { type: 'build', prompt: 'Rakd sorba a bolygókat a Naptól kezdve! Koppints rájuk sorban.', answer: ans, tiles: shuffle(ans), hint: 'A Naptól kifelé: Merkúr, Vénusz, Föld, Mars, Jupiter, Szaturnusz, Uránusz, Neptunusz.', explain: ans.join(' → ') }; };
K4.fold = L => {
  const r = Math.random(), fact = () => factQ(pick(SPACE_FACTS.filter(f => f[0] === L || (L === 3 && f[0] === 2 && Math.random() < .3))));
  if (L === 1) return r < .65 ? fact() : r < .8 ? SPACE_SORT(L) : (() => { const [cl, a, w] = pick(SPACE_RIDDLES); return riddleQ(cl, a, w); })();
  if (L === 2) return r < .5 ? fact() : r < .7 ? moonQ() : r < .85 ? planetBuild(L) : SPACE_SORT(L);
  return r < .5 ? fact() : r < .65 ? moonQ() : r < .8 ? planetBuild(L) : (() => { const [cl, a, w] = pick(SPACE_RIDDLES); return riddleQ(cl, a, w); })();
};

/* Térképolvasás */
const SYMBOLS = {
  'város': '<circle cx="70" cy="45" r="11" fill="#1d2742"/>',
  'hegycsúcs': '<path d="M52 60 L70 26 L88 60Z" fill="#7a4b26"/>',
  'folyó': '<path d="M14 54 C34 30 52 66 72 44 S108 26 126 44" fill="none" stroke="#1c7ed6" stroke-width="7" stroke-linecap="round"/>',
  'tó': '<path d="M36 46 C34 26 70 18 96 28 C120 38 110 64 80 66 C56 68 38 62 36 46Z" fill="#4dabf7" stroke="#1c7ed6" stroke-width="2"/>',
  'vasútvonal': '<line x1="10" y1="45" x2="130" y2="45" stroke="#1d2742" stroke-width="9"/><line x1="10" y1="45" x2="130" y2="45" stroke="#fff" stroke-width="4" stroke-dasharray="12 12"/>',
  'országhatár': '<line x1="10" y1="45" x2="130" y2="45" stroke="#c92a2a" stroke-width="5" stroke-dasharray="14 6 3 6"/>',
  'erdő': '<rect x="14" y="16" width="112" height="58" rx="8" fill="#b2f2bb"/>' + [[38, 52], [62, 40], [86, 54], [108, 40]].map(([x, y]) => `<path d="M${x} ${y - 16} L${x - 9} ${y + 2} L${x + 9} ${y + 2}Z" fill="#2b8a3e"/><rect x="${x - 2}" y="${y + 2}" width="4" height="6" fill="#7a4b26"/>`).join(''),
  'vár': '<path d="M50 66 L50 34 L56 34 L56 28 L62 28 L62 34 L68 34 L68 28 L74 28 L74 34 L80 34 L80 28 L86 28 L86 34 L90 34 L90 66Z" fill="#868e96" stroke="#1d2742" stroke-width="2"/><rect x="64" y="50" width="12" height="16" fill="#1d2742"/>'
};
const symQ = () => { const k = pick(Object.keys(SYMBOLS)); return { type: 'choice', prompt: 'Mit jelöl ez a térképjel?', visual: svg(140, 90, `<rect x="2" y="2" width="136" height="86" rx="10" fill="#fff" stroke="#ced4da" stroke-width="2"/>${SYMBOLS[k]}`, 'symfig'), answer: k, options: shuffle([k, ...shuffle(Object.keys(SYMBOLS).filter(x => x !== k)).slice(0, 3)]).map(v => ({ value: v, html: v })), answerText: k, hint: 'A térkép jeleit a jelmagyarázat magyarázza meg. Kék: víz. Barna háromszög: hegycsúcs. Pötty: település.' }; };
const COLORS = [['#69db7c', 'síkság (alföld)'], ['#ffe066', 'dombság'], ['#c0915e', 'hegység'], ['#4dabf7', 'víz (folyó, tó, tenger)']];
const colorQ = () => { const [c, a] = pick(COLORS); return { type: 'choice', prompt: 'Mit jelöl a domborzati térképen ez a szín?', visual: svg(140, 70, `<rect x="10" y="8" width="120" height="54" rx="10" fill="${c}" stroke="#1d2742" stroke-width="2"/>`, 'symfig'), answer: a, options: shuffle(COLORS.map(x => x[1])).map(v => ({ value: v, html: v })), answerText: a, hint: 'Zöld: síkság. Sárga: dombság. Barna: hegység; minél sötétebb, annál magasabb. Kék: víz; minél sötétebb, annál mélyebb.' }; };
const MAP_FACTS = [
  [1, 'Melyik irány van a térképen általában felül?', 'észak', ['dél', 'kelet', 'nyugat'], 'Fent az észak, lent a dél, jobbra a kelet, balra a nyugat.'],
  [1, 'Hogy hívjuk a térkép jeleinek magyarázatát?', 'jelmagyarázat', ['méretarány', 'iránytű', 'alaprajz'], 'A térkép szélén egy kis táblázat mondja meg, melyik jel mit jelent.'],
  [1, 'Hogy hívjuk a felülről nézett rajzot egy szobáról vagy egy házról?', 'alaprajz', ['jelmagyarázat', 'fénykép', 'domborzati térkép'], 'Felülről nézve a bútorok csak a „talpukat” mutatják.'],
  [1, 'Milyen színnel jelöli a térkép a vizeket?', 'kékkel', ['zölddel', 'barnával', 'sárgával'], 'A folyók, tavak és tengerek kékek.'],
  [2, 'Mit jelent, ha a barna szín egyre sötétebb?', 'a hegy egyre magasabb', ['a víz egyre mélyebb', 'a város egyre nagyobb', 'egyre több az erdő'], 'A domborzati térképen a sötétebb barna magasabb helyet jelöl.'],
  [2, 'Mit jelent, ha a kék szín egyre sötétebb?', 'a víz egyre mélyebb', ['a hegy egyre magasabb', 'egyre hidegebb van', 'a folyó egyre gyorsabb'], 'A sötétebb kék mélyebb vizet jelöl.'],
  [2, 'Mit mutat meg a méretarány?', 'hányszor kisebb a térkép a valóságnál', ['merre van észak', 'milyen magas a hegy', 'mi a város neve'], 'Például: 1 cm a térképen = 1 km a valóságban.'],
  [2, 'Mire használjuk az iránytűt?', 'a világtájak meghatározására', ['a hőmérséklet mérésére', 'a távolság mérésére', 'az idő mérésére'], 'Az iránytű tűje mindig észak felé mutat.'],
  [2, 'Mit tegyél, hogy a térkép iránya egyezzen a valósággal?', 'tájolom: a térkép északját észak felé fordítom', ['fejjel lefelé tartom', 'összehajtom', 'nem számít, hogyan tartom'], 'Ezt hívjuk a térkép tájolásának.']
];
const scaleQ = () => {
  const k = pick([1, 2, 5, 10]), n = ri(2, 9);
  return Math.random() < .6
    ? { type: 'input', prompt: `A térképen 1 cm a valóságban ${k} km. Két falu a térképen ${n} cm-re van egymástól. Hány km a távolság a valóságban?`, answer: n * k, hint: `Minden centiméter ${k} km. Szorozd meg: ${n} · ${k}.` }
    : { type: 'input', prompt: `A térképen 1 cm a valóságban ${k} km. Két város a valóságban ${n * k} km-re van egymástól. Hány cm a távolság a térképen?`, answer: n, hint: `Hányszor van meg ${azN(n * k)} ${n * k} km-ben ${azN(k)} ${k} km? Oszd el: ${n * k} : ${k}.` };
};
K4.terkepolv = L => {
  const r = Math.random(), fact = () => factQ(pick(MAP_FACTS.filter(f => f[0] === Math.min(L, 2))));
  if (L === 1) return r < .45 ? symQ() : r < .7 ? colorQ() : fact();
  if (L === 2) return r < .3 ? symQ() : r < .5 ? colorQ() : r < .8 ? fact() : scaleQ();
  return r < .5 ? scaleQ() : r < .7 ? symQ() : r < .85 ? colorQ() : fact();
};
/* ---------- NAT 2020 / kerettanterv: further units of grade 4 ---------- */
const topicFrom = (facts, extras) => L => { const ex = (extras[L] || []).filter(Boolean); if (ex.length && Math.random() < ex.length * .15) return pick(ex)(L); const pool = facts.filter(f => f[0] === L); return factQ(pick(pool.length ? pool : facts)); };

/* Hang és fény */
const SOUND_LIGHT = [
  [1, 'Mi továbbítja a hangot a fülünkig?', 'a levegő rezgése', ['a fény', 'a szél', 'a meleg'], 'A hangforrás rezeg, a rezgést a levegő viszi tovább a fülünkig.'],
  [1, 'Mivel érzékeljük a hangokat?', 'a fülünkkel', ['a szemünkkel', 'az orrunkkal', 'a nyelvünkkel'], 'A hallás érzékszerve a fül.'],
  [1, 'Mi keletkezik, ha egy tárgy útját állja a fénynek?', 'árnyék', ['szivárvány', 'visszhang', 'tükörkép'], 'A fény nem tud átmenni az átlátszatlan tárgyon, mögötte sötét folt, árnyék lesz.'],
  [1, 'Mi veri vissza a fényt, úgyhogy látjuk benne magunkat?', 'a tükör', ['a fal', 'a fa', 'a kő'], 'A sima, fényes felület visszaveri a fényt.'],
  [1, 'Melyik hang mély?', 'a medve brummogása', ['a kismadár csipogása', 'a síp hangja', 'a szúnyog zümmögése'], 'A nagy testű állatok és a nagy hangszerek hangja általában mély.'],
  [2, 'Mi a visszhang?', 'a hang visszaverődése egy falról vagy hegyoldalról', ['a nagyon halk hang', 'a madarak éneke', 'a fény visszaverődése'], 'A hang nekiütközik egy nagy felületnek, és visszajön hozzánk.'],
  [2, 'Hogyan terjed a fény?', 'egyenes vonalban', ['csak körbe-körbe', 'cikcakkban', 'csak felfelé'], 'Ezért nem látunk be a sarok mögé.'],
  [2, 'Mivé bontja a prizma a fehér fényt?', 'a szivárvány színeire', ['fekete és fehér csíkokra', 'hanggá', 'meleggé'], 'A fehér fény valójában sok szín keveréke.'],
  [2, 'Miért hallunk hangot, amikor megpendítjük a gitár húrját?', 'mert a húr rezeg', ['mert a húr világít', 'mert a húr meleg lesz', 'mert a húr elszakad'], 'Minden hang rezgésből születik.'],
  [2, 'Mit tehetsz a füled védelmében?', 'nem hallgatok túl hangos zenét fülhallgatóval', ['mindig nagyon hangosan hallgatok zenét', 'ceruzával tisztítom a fülem', 'semmit sem kell tennem'], 'A túl erős hang tartósan károsíthatja a hallást.'],
  [3, 'Miért nincs hang a világűrben?', 'mert nincs levegő, ami továbbítaná', ['mert túl hideg van', 'mert túl sötét van', 'mert túl messze van a Nap'], 'A hanghoz kell valami (levegő, víz), ami rezgésbe jön.'],
  [3, 'Mikor a legrövidebb az árnyékunk egy napsütéses napon?', 'délben', ['reggel', 'este', 'egész nap ugyanakkora'], 'Délben áll a Nap a legmagasabban, ezért ekkor a legrövidebb az árnyék.'],
  [3, 'Miért látjuk a Holdat éjszaka?', 'mert visszaveri a Nap fényét', ['mert maga világít', 'mert a Föld megvilágítja lámpákkal', 'mert benne tűz ég'], 'A Hold nem fényforrás, csak visszaveri a fényt.'],
  [3, 'Mi szükséges ahhoz, hogy lássunk egy tárgyat?', 'a tárgyról fény jusson a szemünkbe', ['a tárgy legyen hangos', 'a tárgy legyen meleg', 'csukott szem'], 'Sötétben ezért nem látunk semmit.']
];
const LIGHT_SORT = L => sortQ('Átlátszó, áttetsző vagy átlátszatlan? Válogasd szét!', { 'átlátszó': ['ablaküveg', 'tiszta víz', 'celofán', 'szemüveglencse'], 'áttetsző': ['tejüveg', 'sütőpapír', 'jégvirágos ablak', 'vékony függöny'], 'átlátszatlan': ['fa', 'kő', 'karton', 'tégla', 'vaslap'] }, L === 1 ? 1 : 2, { hint: 'Átlátszó: tisztán átlátsz rajta. Áttetsző: átjut a fény, de homályosan látsz. Átlátszatlan: a fény nem jut át.' });
K4.hangfeny = topicFrom(SOUND_LIGHT, { 1: [LIGHT_SORT], 2: [LIGHT_SORT], 3: [LIGHT_SORT] });

/* Mozgás */
const MOTION = [
  [1, 'Hogyan mozog a hal?', 'úszik', ['repül', 'ugrik', 'kúszik'], 'A hal uszonyaival úszik a vízben.'],
  [1, 'Hogyan mozog a kígyó?', 'kúszik', ['repül', 'fut', 'ugrik'], 'Nincs lába, a testével kígyózva halad.'],
  [1, 'Melyik állat repül?', 'a denevér', ['a vakond', 'a sün', 'a csiga'], 'A denevér emlős, de bőrszárnyaival repül.'],
  [1, 'Mi segíti a kacsát az úszásban?', 'az úszóhártyás lába', ['a hosszú farka', 'a csőre', 'a fülei'], 'Az ujjai között bőrhártya van, mint egy evező.'],
  [1, 'Mi segíti a vakondot az ásásban?', 'a lapátszerű mellső lába', ['a hosszú farka', 'a szárnya', 'a nagy füle'], 'Erős, széles mellső lábával túrja a földet.'],
  [2, 'Milyen mozgás, amikor az elinduló autó egyre gyorsabban megy?', 'gyorsuló mozgás', ['egyenletes mozgás', 'lassuló mozgás', 'nem mozog'], 'Ha egyre nagyobb lesz a sebesség, a mozgás gyorsuló.'],
  [2, 'Milyen mozgás, amikor a mozgólépcső mindig ugyanolyan sebesen halad?', 'egyenletes mozgás', ['gyorsuló mozgás', 'lassuló mozgás', 'ütközés'], 'Ha a sebesség nem változik, a mozgás egyenletes.'],
  [2, 'Mi történik, amikor a biciklis fékez?', 'lassul a mozgása', ['gyorsul a mozgása', 'egyenletesen halad tovább', 'felfelé repül'], 'A fékezés csökkenti a sebességet.'],
  [2, 'Mi segíti a madarat a repülésben?', 'a szárnya, a tollai és a könnyű csontjai', ['a nehéz csontjai', 'a négy lába', 'a pikkelyei'], 'A madár csontjai üregesek, ezért könnyűek.'],
  [2, 'Mivel kapaszkodik a mókus a fán?', 'éles karmaival', ['úszóhártyájával', 'a csőrével', 'a patájával'], 'Ügyesen fut fel a fatörzsön, és ágról ágra ugrál.'],
  [2, 'Melyik a ló leglassabb járásmódja?', 'lépés', ['ügetés', 'vágta', 'galopp'], 'A ló járásmódjai: lépés, ügetés, vágta (galopp).'],
  [3, 'Mi segíti a lovat a gyors futásban?', 'hosszú, erős lábai és kemény patái', ['rövid lábai', 'úszóhártyája', 'szárnyai'], 'A ló testfelépítése a gyors futáshoz alkalmazkodott.'],
  [3, 'Mi történik, amikor két biliárdgolyó összeütközik?', 'megváltozik a mozgásuk iránya és sebessége', ['mindkettő megáll örökre', 'összeolvadnak', 'semmi sem változik'], 'Ütközéskor a testek mozgása megváltozik.'],
  [3, 'Miért áramvonalas a hal teste?', 'hogy könnyebben haladjon a vízben', ['hogy jobban lásson', 'hogy repülni tudjon', 'hogy melegebb legyen'], 'A hegyes, sima test könnyen hasítja a vizet.'],
  [3, 'Melyik szárazföldi állat a leggyorsabb futó?', 'a gepárd', ['a ló', 'a nyúl', 'az elefánt'], 'Rövid távon a gepárd fut a leggyorsabban.']
];
const MOVE_SORT = L => sortQ('Hogyan mozognak? Válogasd szét!', { 'repül': [['fecske', '🐦'], ['denevér', '🦇'], ['lepke', '🦋'], ['méh', '🐝']], 'úszik': [['ponty', '🐟'], ['delfin', '🐬'], ['bálna', '🐋']], 'ugrik': [['béka', '🐸'], ['kenguru', '🦘'], ['szöcske', '🦗']], 'kúszik, csúszik': [['kígyó', '🐍'], ['csiga', '🐌'], ['giliszta', '🪱']] }, L === 3 ? 2 : 1, { hint: 'Gondold végig, mije van az állatnak: szárnya, uszonya, erős hátsó lába, vagy egyáltalán nincs lába.' });
K4.mozgas = topicFrom(MOTION, { 1: [MOVE_SORT], 2: [MOVE_SORT], 3: [MOVE_SORT] });

/* Haszonnövények, háziállatok, idénygyümölcsök */
const FARM = [
  [1, 'Mit kapunk a tehéntől?', 'tejet', ['gyapjút', 'tojást', 'mézet'], 'A tehén tejéből vaj, sajt, túró is készül.'],
  [1, 'Mit kapunk a juhtól?', 'gyapjút', ['tojást', 'mézet', 'tollat'], 'A juh gyapjából fonal, abból pulóver készül.'],
  [1, 'Mit kapunk a méhektől?', 'mézet', ['tejet', 'gyapjút', 'tojást'], 'A méhek a virágok nektárjából készítik.'],
  [1, 'Hogy hívják a tehén kicsinyét?', 'borjú', ['csikó', 'bárány', 'malac'], 'Tehén – borjú, ló – csikó, juh – bárány, disznó – malac.'],
  [1, 'Hogy hívják a ló kicsinyét?', 'csikó', ['borjú', 'gida', 'malac'], 'Tehén – borjú, ló – csikó, juh – bárány, disznó – malac.'],
  [1, 'Hogy hívják a juh kicsinyét?', 'bárány', ['csikó', 'borjú', 'gida'], 'Tehén – borjú, ló – csikó, juh – bárány, kecske – gida.'],
  [1, 'Hogy hívják a kecske kicsinyét?', 'gida', ['bárány', 'csikó', 'borjú'], 'A kecske kicsinye a gida.'],
  [1, 'Melyik növény magjából lesz a liszt, abból pedig a kenyér?', 'a búza', ['a napraforgó', 'a cukorrépa', 'a burgonya'], 'A búzát learatják, megőrlik, a lisztből kenyeret sütnek.'],
  [2, 'Miből készül a cukor nálunk?', 'cukorrépából', ['búzából', 'burgonyából', 'napraforgóból'], 'A cukorrépa gyökerében sok cukor van.'],
  [2, 'Melyik növény magjából préselnek étolajat?', 'a napraforgóéból', ['a búzáéból', 'a cukorrépáéból', 'a burgonyáéból'], 'A napraforgó és a repce magjából olaj készül.'],
  [2, 'Melyik részét esszük a burgonyának?', 'a gumóját', ['a virágát', 'a levelét', 'a termését'], 'A gumó a föld alatt fejlődik.'],
  [2, 'Mi a neve a tyúk párjának?', 'kakas', ['bika', 'kos', 'bak'], 'Tyúk – kakas, tehén – bika, juh – kos, kecske – bak.'],
  [2, 'Mi a neve a tehén párjának?', 'bika', ['kakas', 'kos', 'kan'], 'Tyúk – kakas, tehén – bika, juh – kos, disznó – kan.'],
  [2, 'Mi a neve a juh párjának?', 'kos', ['bika', 'bak', 'kakas'], 'Juh – kos, kecske – bak, tehén – bika.'],
  [2, 'Melyik gyümölcs érik nálunk ősszel?', 'a szőlő', ['a cseresznye', 'a kajszibarack', 'a görögdinnye'], 'Ősszel érik a szőlő, az alma, a dió.'],
  [2, 'Melyik gyümölcs érik nálunk kora nyáron?', 'a cseresznye', ['a szőlő', 'a dió', 'a gesztenye'], 'Júniusban érik a cseresznye.'],
  [3, 'Miért jó az idényzöldséget és -gyümölcsöt választani?', 'frissebb, és nem kell messziről szállítani', ['mert drágább', 'mert télen terem', 'mert nincs benne vitamin'], 'Ami nálunk éppen megérik, azt nem kell sokáig szállítani és tárolni.'],
  [3, 'Mi a háziállat?', 'olyan állat, amelyet az ember tart és gondoz', ['olyan állat, amely csak az erdőben él', 'csak a kutya', 'minden vadon élő állat'], 'A háziállatokat az ember szelídítette meg, és gondoskodik róluk.'],
  [3, 'Mi a haszonnövény?', 'olyan növény, amelyet az ember termeszt valamilyen haszonért', ['minden vadvirág', 'a gyom', 'csak a fa'], 'Például élelemnek, takarmánynak, olajnak, cukornak.'],
  [3, 'Miből készül a vászon (régen nagyon sokat termesztették)?', 'lenből vagy kenderből', ['búzából', 'cukorrépából', 'tökből'], 'A len és a kender szárának rostjaiból fonalat, abból vásznat szőttek.']
];
const BREAD = { type: 'build', prompt: 'Hogyan lesz a búzából kenyér? Rakd sorba! Koppints rájuk sorban.', answer: ['vetés', 'aratás', 'őrlés', 'sütés'], hint: 'Először elvetik a búzát, nyáron learatják, a malomban megőrlik lisztté, végül a pék kenyeret süt.', explain: 'vetés → aratás → őrlés → sütés' };
const breadQ = () => ({ ...BREAD, tiles: shuffle(BREAD.answer) });
const FARM_SORT = L => Math.random() < .5
  ? sortQ('Háziállat vagy vadon élő állat? Válogasd szét!', { 'háziállat': [['tehén', '🐄'], ['tyúk', '🐔'], ['kecske', '🐐'], ['liba', '🪿'], ['ló', '🐴'], ['juh', '🐑']], 'vadon élő': [['róka', '🦊'], ['őz', '🦌'], ['vaddisznó', '🐗'], ['mókus', '🐿️'], ['farkas', '🐺']] }, L === 1 ? 2 : 3, { hint: 'A háziállatokról az ember gondoskodik. A vadon élők maguk keresik a táplálékukat.' })
  : sortQ('Mikor érik nálunk? Válogasd szét!', { 'tavasszal': ['spárga', 'sóska', 'újhagyma', 'retek'], 'nyáron': ['cseresznye', 'kajszibarack', 'görögdinnye', 'paradicsom', 'uborka'], 'ősszel': ['szőlő', 'alma', 'dió', 'tök', 'gesztenye'] }, L === 3 ? 2 : 1, { hint: 'Tavasszal a korai zöldségek, nyáron a cseresznye, a barack és a dinnye, ősszel a szőlő, az alma és a dió.' });
K4.haszon = topicFrom(FARM, { 1: [FARM_SORT], 2: [FARM_SORT, breadQ], 3: [FARM_SORT, breadQ] });

/* Környezetvédelem */
const ECO = [
  [1, 'Melyik szelektív kukába dobod a régi újságot?', 'a kékbe (papír)', ['a sárgába (műanyag)', 'a zöldbe (üveg)', 'a barnába (bio)'], 'Kék: papír. Sárga: műanyag és fém. Zöld: üveg. Barna: komposztálható hulladék.'],
  [1, 'Melyik szelektív kukába dobod az üres műanyag flakont?', 'a sárgába (műanyag)', ['a kékbe (papír)', 'a zöldbe (üveg)', 'a barnába (bio)'], 'Kék: papír. Sárga: műanyag és fém. Zöld: üveg. Barna: komposztálható hulladék.'],
  [1, 'Melyik szelektív kukába dobod az üres befőttesüveget?', 'a zöldbe (üveg)', ['a kékbe (papír)', 'a sárgába (műanyag)', 'a barnába (bio)'], 'Kék: papír. Sárga: műanyag és fém. Zöld: üveg. Barna: komposztálható hulladék.'],
  [1, 'Hogyan takarékoskodhatsz a vízzel fogmosáskor?', 'elzárom a csapot, amíg mosom a fogam', ['végig folyatom a vizet', 'kétszer annyi vizet használok', 'nem mosok fogat'], 'Így sok liter víz marad meg minden nap.'],
  [1, 'Mit tegyél, ha kimész a szobából?', 'lekapcsolom a villanyt', ['égve hagyom a villanyt', 'bekapcsolom a tévét is', 'kinyitom az ablakot'], 'Így áramot takarítunk meg.'],
  [1, 'Szabad-e leszakítani egy védett virágot?', 'nem, a védett növényeket nem szabad leszedni', ['igen, ha szép', 'igen, ha csak egyet', 'igen, ha senki sem látja'], 'A védett növényeket és állatokat a törvény is óvja.'],
  [2, 'Mi kerülhet a komposztba?', 'almacsutka, krumplihéj, falevél', ['műanyag zacskó', 'elem', 'üvegpalack'], 'A komposztban a növényi maradékokból értékes táptalaj lesz.'],
  [2, 'Hová kerüljön a lemerült elem?', 'külön elemgyűjtőbe (például a boltban)', ['a kommunális kukába', 'a komposztba', 'a patakba'], 'Az elemben mérgező anyagok vannak.'],
  [2, 'Melyik bomlik le a leggyorsabban a természetben?', 'a banánhéj', ['a műanyag palack', 'az üvegpalack', 'az alumíniumdoboz'], 'A növényi maradékokat a lebontók néhány hét alatt lebontják.'],
  [2, 'Melyik megújuló energiaforrás?', 'a napenergia', ['a szén', 'a kőolaj', 'a földgáz'], 'Megújuló: nap, szél, víz. Ezek nem fogynak el.'],
  [2, 'Miért jó a szelektív hulladékgyűjtés?', 'mert a szétválogatott hulladékból új dolgok készülhetnek', ['mert így több lesz a szemét', 'mert így szebb a kuka', 'nem jó semmire'], 'Ezt hívjuk újrahasznosításnak.'],
  [2, 'Mi a nemzeti park célja?', 'hogy megvédje egy táj élővilágát és értékeit', ['hogy gyárat építsenek benne', 'hogy szemetet gyűjtsenek oda', 'hogy kivágják az erdőt'], 'Hazánkban 10 nemzeti park van.'],
  [3, 'Melyik nem megújuló energiaforrás?', 'a kőolaj', ['a szélenergia', 'a napenergia', 'a víz energiája'], 'A szén, a kőolaj és a földgáz egyszer elfogy, és szennyezi a levegőt.'],
  [3, 'Mi szennyezi a levegőt?', 'az autók és gyárak füstje', ['a fák', 'a szél', 'az eső'], 'Ezért jó gyalog, biciklivel vagy tömegközlekedéssel menni.'],
  [3, 'Mit jelent az újrahasznosítás?', 'a hulladékból új terméket készítenek', ['a szemetet elássák', 'a szemetet elégetik', 'mindent kidobunk'], 'Például a régi papírból új füzet lehet.'],
  [3, 'Hazánk legnagyobb (legnehezebb) repülő madara, fokozottan védett:', 'a túzok', ['a fecske', 'a veréb', 'a cinege'], 'A túzok az Alföld füves pusztáin él.'],
  [3, 'Mi volt az ártéri (fok-) gazdálkodás lényege?', 'az áradó folyó vizét csatornákon vezették az árterekre, és ott halásztak, legeltettek', ['a folyót teljesen elzárták', 'az ártéren gyárakat építettek', 'a folyóból kiszivattyúzták a vizet'], 'Az emberek a természet ritmusához igazodtak, és megőrizték az ártér élővilágát.']
];
const BIN_SORT = L => sortQ('Melyik kukába való? Válogasd szét!', { '🟦 papír': ['újság', 'kartondoboz', 'régi füzet', 'papírzacskó'], '🟨 műanyag': ['műanyag flakon', 'joghurtos pohár', 'fóliazacskó', 'üdítős kupak'], '🟩 üveg': ['befőttesüveg', 'üvegpalack', 'parfümös üveg'], '🟫 bio': ['almacsutka', 'banánhéj', 'krumplihéj', 'falevél'] }, L === 3 ? 2 : 1, { hint: 'Kék: papír. Sárga: műanyag. Zöld: üveg. Barna: komposztálható, növényi hulladék.' });
K4.kornyvedelem = topicFrom(ECO, { 1: [BIN_SORT], 2: [BIN_SORT], 3: [BIN_SORT] });

/* Idő és naptár */
const MONTHS = ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'];
const DAYS31 = ['január', 'március', 'május', 'július', 'augusztus', 'október', 'december'];
const TIME_FACTS = [
  [1, 'Hány nap van egy héten?', '7', ['5', '10', '12'], 'Hétfő, kedd, szerda, csütörtök, péntek, szombat, vasárnap.'],
  [1, 'Hány hónapból áll egy év?', '12', ['10', '7', '52'], 'Januártól decemberig 12 hónap.'],
  [1, 'Melyik a téli hónap?', 'január', ['július', 'április', 'szeptember'], 'Téli hónapok: december, január, február.'],
  [1, 'Melyik a nyári hónap?', 'július', ['január', 'október', 'március'], 'Nyári hónapok: június, július, augusztus.'],
  [1, 'Melyik napszak jön a délután után?', 'este', ['reggel', 'délelőtt', 'dél'], 'Reggel, délelőtt, dél, délután, este, éjszaka.'],
  [1, 'Melyik évszakban van a karácsony?', 'télen', ['nyáron', 'tavasszal', 'ősszel'], 'Karácsony december 24–26.'],
  [2, 'Hány napból áll egy év?', '365 (szökőévben 366)', ['100', '300', '52'], 'Szökőévben február 29 napos.'],
  [2, 'Hány napos a február szökőévben?', '29', ['28', '30', '31'], 'Négyévente van szökőév.'],
  [2, 'Hány év egy évtized?', '10', ['100', '5', '1000'], 'Évtized: 10 év. Évszázad: 100 év. Évezred: 1000 év.'],
  [2, 'Hány év egy évszázad?', '100', ['10', '50', '1000'], 'Évtized: 10 év. Évszázad: 100 év. Évezred: 1000 év.'],
  [2, 'Hány hét van körülbelül egy évben?', '52', ['12', '30', '100'], '365 nap : 7 = 52 hét és 1 nap.'],
  [3, 'Hány napos a november?', '30', ['31', '28', '29'], 'Az öklödön számolhatod: a bütyök 31 napos hónap, a mélyedés 30 (vagy február).'],
  [3, 'Melyik évszázadban élünk?', 'a 21. században', ['a 20. században', 'a 19. században', 'a 2. században'], 'A 2001 és 2100 közötti évek tartoznak a 21. századba.'],
  [3, 'Mit mutat a naptár?', 'az év napjait, heteit és hónapjait', ['a hőmérsékletet', 'a világtájakat', 'az időjárást'], 'A naptárban az ünnepeket és a fontos dátumokat is megtaláljuk.']
];
const monthsBuild = L => { const st = ri(0, L === 3 ? 11 : 8), n = L === 1 ? 3 : 4, ans = Array.from({ length: n }, (_, i) => MONTHS[(st + i) % 12]); return { type: 'build', prompt: 'Rakd sorba a hónapokat! Koppints rájuk sorban.', answer: ans, tiles: shuffle(ans), hint: 'Január, február, március, április, május, június, július, augusztus, szeptember, október, november, december.', explain: ans.join(' → ') }; };
const lifeBuild = () => { const ans = ['csecsemőkor', 'kisgyermekkor', 'iskoláskor', 'serdülőkor', 'felnőttkor', 'időskor']; const k = ri(0, 2), part = ans.slice(k, k + 4); return { type: 'build', prompt: 'Rakd sorba az ember életszakaszait! Koppints rájuk sorban.', answer: part, tiles: shuffle(part), hint: 'Csecsemőkor, kisgyermekkor, iskoláskor, serdülőkor, felnőttkor, időskor.', explain: part.join(' → ') }; };
const monthDays = () => { const m = pick(MONTHS), d = m === 'február' ? '28 vagy 29' : DAYS31.includes(m) ? '31' : '30'; return mcq(`Hány napos ${artOf(m)} <b>${m}</b>?`, d, ['31', '30', '28 vagy 29', '27'].filter(x => x !== d).slice(0, 3), { fmt: v => v, hint: 'Ökölszámolás: a bütykök a 31 napos hónapok, a mélyedések a 30 naposak (és a február).' }); };
K4.ido = topicFrom(TIME_FACTS, { 1: [monthsBuild], 2: [monthsBuild, lifeBuild], 3: [lifeBuild, monthDays] });

/* additions to existing topics */
SPACE_FACTS.push(
  [2, 'Mi az a csillagkép?', 'csillagok csoportja, amelyet egy alakzatnak képzelünk', ['egy bolygó', 'egy holdfázis', 'egy felhő'], 'Ilyen a Göncölszekér, az Orion vagy a Kis Göncöl.'],
  [2, 'Melyik csillagkép segít megtalálni a Sarkcsillagot?', 'a Göncölszekér', ['az Orion', 'a Skorpió', 'a Hattyú'], 'A Göncölszekér hátsó két csillagát meghosszabbítva eljutunk a Sarkcsillaghoz.'],
  [3, 'Ki fordította elsőként távcsövét az égbolt felé, és fedezte fel a Jupiter holdjait?', 'Galileo Galilei', ['Kolumbusz Kristóf', 'Isaac Newton', 'Neil Armstrong'], '1609-ben vizsgálta az eget távcsővel.'],
  [3, 'Ki volt az első magyar űrhajós?', 'Farkas Bertalan', ['Neil Armstrong', 'Jurij Gagarin', 'Kapu Tibor'], 'Farkas Bertalan 1980-ban repült az űrbe; Kapu Tibor 2025-ben, a második magyarként.'],
  [3, 'Mire való a távcső?', 'a távoli tárgyakat közelebbinek és nagyobbnak mutatja', ['a hőmérsékletet méri', 'a hangot erősíti', 'az időt méri'], 'A csillagászok távcsővel vizsgálják az égitesteket.']);
MAP_FACTS.push(
  [2, 'Melyik térkép mutatja a megyéket, a határokat és a településeket?', 'a közigazgatási térkép', ['a domborzati térkép', 'a turistatérkép', 'az alaprajz'], 'A közigazgatási térképen minden megye más színű.'],
  [2, 'Melyik térkép mutatja színekkel a hegyeket, dombokat és síkságokat?', 'a domborzati térkép', ['a közigazgatási térkép', 'az autóstérkép', 'az alaprajz'], 'Zöld: síkság, sárga: dombság, barna: hegység.'],
  [2, 'Melyik térképen találod a jelzett turistautakat?', 'a turistatérképen', ['az autóstérképen', 'a közigazgatási térképen', 'a földgömbön'], 'Az erdei utakat színes jelzések (pl. kék sáv, piros kereszt) mutatják.'],
  [2, 'Melyik térképet használod, ha autóval utazol?', 'az autóstérképet', ['a turistatérképet', 'a domborzati térképet', 'az alaprajzot'], 'Ezen az utak, az autópályák és a benzinkutak látszanak.']);
MORE.health.push(
  [1, 'Hová mész, ha beteg vagy, és meg kell vizsgálni?', 'a háziorvoshoz (körzeti orvoshoz)', ['a postára', 'a fodrászhoz', 'a pékségbe'], 'A háziorvos megvizsgál, és ha kell, gyógyszert ír fel.'],
  [1, 'Hol kapod meg az orvos által felírt gyógyszert?', 'a gyógyszertárban (patikában)', ['a könyvtárban', 'a játékboltban', 'az iskolában'], 'A gyógyszerész adja ki a gyógyszert.'],
  [2, 'Hogyan védheted a szemedet?', 'jó fénynél olvasok, és szünetet tartok a képernyő előtt', ['sötétben olvasok', 'egész nap a telefont nézem', 'a napba nézek'], 'A szem a legfontosabb érzékszervünk, vigyázz rá!'],
  [2, 'Mi okozhat túlsúlyt?', 'sok édesség és kevés mozgás', ['sok zöldség', 'sok víz', 'sok alvás'], 'A kiegyensúlyozott étrend és a mozgás segít megőrizni az egészséget.'],
  [3, 'Mi jellemző az influenzára?', 'magas láz, fáradtság, izomfájdalom', ['csak egy kis orrfolyás', 'viszkető pöttyök', 'fogfájás'], 'Az influenza súlyosabb a náthánál, ilyenkor pihenni kell.'],
  [3, 'Hová viszik a mentők a súlyos beteget?', 'a kórházba', ['a gyógyszertárba', 'az iskolába', 'a fogorvoshoz'], 'A kórházban orvosok és ápolók gyógyítják a betegeket.']);
/* item-based generators: many different questions from the sort lists */
const fromGroups = (groups, ask, hint, opts = {}) => () => { const bins = Object.keys(groups), b = pick(bins), it = pick(groups[b]), w = Array.isArray(it) ? it[0] : it, em = Array.isArray(it) ? it[1] : '';
  return { type: 'choice', prompt: ask(w), visual: em ? `<div class="big-emoji">${em}</div>` : undefined, answer: b, options: (opts.keep ? bins : shuffle(bins)).map(v => ({ value: v, html: v })), answerText: b, hint }; };
const lightItem = fromGroups({ 'átlátszó': ['ablaküveg', 'tiszta víz', 'celofán', 'szemüveglencse', 'befőttesüveg'], 'áttetsző': ['tejüveg', 'sütőpapír', 'jégvirágos ablak', 'vékony függöny', 'zsírpapír'], 'átlátszatlan': ['fa', 'kő', 'karton', 'tégla', 'vaslap', 'könyv'] },
  w => `Átlátszó, áttetsző vagy átlátszatlan: <b>${w}</b>?`, 'Átlátszó: tisztán átlátsz rajta. Áttetsző: átjut a fény, de homályosan látsz. Átlátszatlan: a fény nem jut át.', { keep: true });
const moveItem = fromGroups({ 'repül': [['fecske', '🐦'], ['denevér', '🦇'], ['lepke', '🦋'], ['méh', '🐝'], ['sas', '🦅'], ['katica', '🐞']], 'úszik': [['ponty', '🐟'], ['delfin', '🐬'], ['bálna', '🐋'], ['cápa', '🦈']], 'ugrik': [['béka', '🐸'], ['kenguru', '🦘'], ['szöcske', '🦗']], 'kúszik, csúszik': [['kígyó', '🐍'], ['csiga', '🐌'], ['giliszta', '🪱']] },
  w => `Hogyan mozog ${artOf(w)} <b>${w}</b>?`, 'Gondold végig, mije van az állatnak: szárnya, uszonya, erős hátsó lába, vagy egyáltalán nincs lába.');
const binItem = fromGroups({ 'kék (papír)': ['újság', 'kartondoboz', 'régi füzet', 'papírzacskó', 'tojástartó'], 'sárga (műanyag)': ['műanyag flakon', 'joghurtos pohár', 'fóliazacskó', 'üdítős kupak', 'samponos flakon'], 'zöld (üveg)': ['befőttesüveg', 'üvegpalack', 'parfümös üveg', 'lekváros üveg'], 'barna (bio)': ['almacsutka', 'banánhéj', 'krumplihéj', 'falevél', 'levágott fű'] },
  w => `Melyik szelektív kukába való: <b>${w}</b>?`, 'Kék: papír. Sárga: műanyag. Zöld: üveg. Barna: komposztálható, növényi hulladék.', { keep: true });
const YOUNG = [['tehén', 'borjú'], ['ló', 'csikó'], ['juh', 'bárány'], ['disznó', 'malac'], ['kecske', 'gida'], ['tyúk', 'csibe'], ['kutya', 'kölyökkutya'], ['macska', 'kiscica'], ['kacsa', 'kiskacsa']];
const youngItem = () => { const [a, y] = pick(YOUNG); return mcq(`Hogy hívják ${artOf(a)} <b>${a}</b> kicsinyét?`, y, shuffle(YOUNG.filter(x => x[1] !== y)).slice(0, 3).map(x => x[1]), { fmt: v => v, hint: 'Tehén – borjú, ló – csikó, juh – bárány, disznó – malac, kecske – gida, tyúk – csibe.' }); };
const PRODUCT = [['tehén', 'tej'], ['juh', 'gyapjú'], ['tyúk', 'tojás'], ['méh', 'méz'], ['liba', 'toll'], ['búza', 'liszt'], ['napraforgó', 'étolaj'], ['szőlő', 'must'], ['len', 'vászon']];
const productItem = () => { const [a, p] = pick(PRODUCT); return mcq(`Mit ad nekünk, vagy mi készül belőle: <b>${a}</b>?`, p, shuffle(PRODUCT.filter(x => x[1] !== p)).slice(0, 3).map(x => x[1]), { fmt: v => v, hint: 'Tehén – tej, juh – gyapjú, tyúk – tojás, méh – méz, búza – liszt, napraforgó – olaj, cukorrépa – cukor.' }); };
const monthAfter = () => { const i = ri(0, 11), m = MONTHS[i], nx = MONTHS[(i + 1) % 12]; return mcq(`Melyik hónap következik ${m} után?`, nx, shuffle(MONTHS.filter(x => x !== nx && x !== m)).slice(0, 3), { fmt: v => v, hint: MONTHS.join(', ') + '.' }); };
const seasonOf = () => { const i = ri(0, 11), m = MONTHS[i], s = ['tél', 'tél', 'tavasz', 'tavasz', 'tavasz', 'nyár', 'nyár', 'nyár', 'ősz', 'ősz', 'ősz', 'tél'][i]; return { type: 'choice', prompt: `Melyik évszakhoz tartozik <b>${m}</b>?`, answer: s, options: ['tavasz', 'nyár', 'ősz', 'tél'].map(v => ({ value: v, html: v })), answerText: s, hint: 'Tavasz: március, április, május. Nyár: június, július, augusztus. Ősz: szeptember, október, november. Tél: december, január, február.' }; };
K4.hangfeny = topicFrom(SOUND_LIGHT, { 1: [LIGHT_SORT, lightItem, lightItem], 2: [LIGHT_SORT, lightItem], 3: [LIGHT_SORT, lightItem] });
K4.mozgas = topicFrom(MOTION, { 1: [MOVE_SORT, moveItem, moveItem], 2: [MOVE_SORT, moveItem], 3: [MOVE_SORT, moveItem] });
K4.haszon = topicFrom(FARM, { 1: [FARM_SORT, youngItem, productItem], 2: [FARM_SORT, breadQ, productItem], 3: [FARM_SORT, breadQ, productItem] });
K4.kornyvedelem = topicFrom(ECO, { 1: [BIN_SORT, binItem, binItem], 2: [BIN_SORT, binItem], 3: [BIN_SORT, binItem] });
K4.ido = topicFrom(TIME_FACTS, { 1: [monthsBuild, monthAfter, seasonOf], 2: [monthsBuild, lifeBuild, monthAfter, seasonOf], 3: [lifeBuild, monthDays, monthAfter] });
/* ---------- Nagytájaink közelről: the six large regions, as taught in 4th grade notebooks ---------- */
// name, where, character, towns, sub-units, highest point [name, m, range], extras
const NT = [
  { n: 'Alpokalja', alt: 'Nyugat-magyarországi-peremvidék', where: 'az ország nyugati része', look: 'hegyek és dombok, erdők és rétek', climate: 'csapadékos, szeles', towns: ['Sopron', 'Kőszeg', 'Szombathely'], parts: ['Soproni-hegység', 'Kőszegi-hegység'], top: ['Írott-kő', 882, 'a Kőszegi-hegységben'] },
  { n: 'Dunántúli-dombvidék', alt: 'Dunántúli-dombság', where: 'az ország délnyugati része', look: 'dombságok és két kisebb hegység', climate: 'csapadékos', towns: ['Pécs', 'Kaposvár', 'Szekszárd'], parts: ['Somogyi-dombság', 'Zalai-dombság', 'Baranyai-dombság', 'Tolnai-dombság', 'Mecsek', 'Villányi-hegység'], top: ['Zengő', 680, 'a Mecsekben'], big: 'Pécs' },
  { n: 'Dunántúli-középhegység', alt: null, where: 'az ország északnyugati része, a Balaton északi oldalán', look: 'középhegységek, erdők', climate: 'csapadékos', towns: ['Veszprém', 'Tata', 'Tapolca'], parts: ['Keszthelyi-hegység', 'Balaton-felvidék', 'Bakony', 'Vértes', 'Gerecse', 'Budai-hegység', 'Pilis', 'Visegrádi-hegység'], top: ['Pilis-tető', 756, 'a Pilis hegységben'] },
  { n: 'Északi-középhegység', alt: null, where: 'az ország északi része', look: 'hazánk legmagasabb hegységei, erdők', climate: 'hűvösebb, csapadékos', towns: ['Eger', 'Miskolc', 'Gyöngyös', 'Salgótarján'], parts: ['Börzsöny', 'Cserhát', 'Mátra', 'Bükk', 'Zempléni-hegység', 'Aggteleki-karszt'], top: ['Kékes', 1014, 'a Mátrában'] },
  { n: 'Kisalföld', alt: null, where: 'az ország északnyugati sarka', look: 'sík vidék, folyók és szántóföldek', climate: 'mérsékelten csapadékos', towns: ['Győr', 'Mosonmagyaróvár'], parts: ['Szigetköz', 'Hanság'], top: null },
  { n: 'Alföld', alt: null, where: 'az ország középső és keleti része', look: 'hazánk legnagyobb, sík nagytája', climate: 'kevés csapadék, sok napsütés, forró nyár', towns: ['Debrecen', 'Szeged', 'Kecskemét', 'Szolnok'], parts: ['Hortobágy', 'Nyírség', 'Hajdúság', 'Kiskunság', 'Jászság'], top: null }
];
const NT3 = NT.slice(0, 3), ntName = r => r.n + (r.alt ? ` (${r.alt})` : '');
const ntHint = r => `${r.n}: ${r.where}; ${r.look}. Városai: ${r.towns.join(', ')}.${r.top ? ` Legmagasabb pontja: ${r.top[0]}, ${r.top[1]} m.` : ''}`;
const ntOthers = (r, pool) => shuffle(pool.filter(x => x !== r)).slice(0, 3).map(x => x.n);
const NT_GENS = {
  where: (r, pool) => mcq(`Hol fekszik hazánkban ${artOf(r.n)} <b>${r.n}</b>?`, r.where, shuffle(NT.filter(x => x !== r).map(x => x.where)).filter((v, i, a) => a.indexOf(v) === i && v !== r.where).slice(0, 3), { fmt: v => v, hint: ntHint(r) }),
  town: (r, pool) => { const t = pick(r.towns); return mcq(`Melyik nagytájon fekszik <b>${t}</b>?`, r.n, ntOthers(r, pool), { fmt: v => v, hint: ntHint(r) }); },
  part: (r, pool) => { const p = pick(r.parts); return mcq(`Melyik nagytájhoz tartozik: <b>${p}</b>?`, r.n, ntOthers(r, pool), { fmt: v => v, hint: ntHint(r) }); },
  top: (r, pool) => r.top ? mcq(`Mi ${artOf(r.n)} <b>${r.n}</b> legmagasabb pontja?`, r.top[0], NT.filter(x => x.top && x !== r).map(x => x.top[0]), { fmt: v => v, hint: `${r.top[0]} ${r.top[2]}, ${r.top[1]} m magas.` }) : null,
  height: (r, pool) => r.top ? mcq(`Milyen magas ${artOf(r.top[0])} <b>${r.top[0]}</b>, ${artOf(r.n)} ${r.n} legmagasabb pontja?`, `${r.top[1]} m`, NT.filter(x => x.top && x !== r).map(x => `${x.top[1]} m`), { fmt: v => v, hint: 'Írott-kő 882 m (Alpokalja), Pilis-tető 756 m (Dunántúli-középhegység), Zengő 680 m (Dunántúli-dombvidék), Kékes 1014 m (Északi-középhegység).' }) : null,
  peakOf: (r, pool) => r.top ? mcq(`Melyik nagytáj legmagasabb pontja ${artOf(r.top[0])} <b>${r.top[0]}</b> (${r.top[1]} m)?`, r.n, ntOthers(r, NT.filter(x => x.top)), { fmt: v => v, hint: ntHint(r) }) : null,
  look: (r, pool) => mcq(`Melyik nagytájra igaz: <b>${r.where}; ${r.look}</b>?`, r.n, ntOthers(r, pool), { fmt: v => v, hint: ntHint(r) })
};
const NT_FACTS = [
  [1, 'Melyik nagytáj fekszik a Balaton északi oldalán?', 'Dunántúli-középhegység', ['Dunántúli-dombvidék', 'Alpokalja', 'Kisalföld'], 'A Balaton-felvidék és a Bakony a Dunántúli-középhegység része.'],
  [1, 'Melyik nagytáj legnagyobb városa Pécs?', 'Dunántúli-dombvidék', ['Alpokalja', 'Dunántúli-középhegység', 'Alföld'], 'Pécs a Mecsek lábánál fekszik.'],
  [1, 'Mi a Dunántúli-dombvidék legnagyobb városa?', 'Pécs', ['Sopron', 'Győr', 'Veszprém'], 'A Mecsek déli lábánál fekszik.'],
  [1, 'Milyen az Alpokalja időjárása?', 'csapadékos, szeles', ['száraz, sok napsütéssel', 'egész évben forró', 'egész évben havas'], 'Az Alpok közelsége miatt sok eső esik.'],
  [2, 'Melyik két hegység tartozik az Alpokaljához?', 'a Soproni- és a Kőszegi-hegység', ['a Mecsek és a Villányi-hegység', 'a Bakony és a Vértes', 'a Mátra és a Bükk'], 'Mindkettő a nyugati határ mellett van.'],
  [2, 'Melyik két középhegység van a Dunántúli-dombvidéken?', 'a Mecsek és a Villányi-hegység', ['a Bakony és a Vértes', 'a Soproni- és a Kőszegi-hegység', 'a Mátra és a Bükk'], 'Mindkettő Baranya megyében van.'],
  [2, 'Melyik NEM a Dunántúli-dombvidék dombsága?', 'Cserhát', ['Somogyi-dombság', 'Baranyai-dombság', 'Tolnai-dombság'], 'A dombságai: Somogyi-, Zalai-, Baranyai- és Tolnai-dombság. A Cserhát az Északi-középhegység része.'],
  [2, 'Melyik hegységben van a Zengő?', 'a Mecsekben', ['a Bakonyban', 'a Kőszegi-hegységben', 'a Pilisben'], 'A Zengő a Mecsek legmagasabb csúcsa.'],
  [2, 'Melyik hegységben van az Írott-kő?', 'a Kőszegi-hegységben', ['a Soproni-hegységben', 'a Mecsekben', 'a Pilisben'], 'Az osztrák határon, Kőszeg közelében.'],
  [2, 'Melyik a Dunántúli-középhegység legnagyobb hegysége?', 'a Bakony', ['a Vértes', 'a Gerecse', 'a Pilis'], 'A Bakony a Balatontól északra húzódik.'],
  [3, 'Melyik a legmagasabb: Írott-kő, Pilis-tető vagy Zengő?', 'az Írott-kő (882 m)', ['a Pilis-tető (756 m)', 'a Zengő (680 m)', 'mind egyforma'], 'Írott-kő 882 m, Pilis-tető 756 m, Zengő 680 m.'],
  [3, 'Melyik a legalacsonyabb: Írott-kő, Pilis-tető vagy Zengő?', 'a Zengő (680 m)', ['az Írott-kő (882 m)', 'a Pilis-tető (756 m)', 'mind egyforma'], 'Írott-kő 882 m, Pilis-tető 756 m, Zengő 680 m.'],
  [3, 'Hány méterrel magasabb az Írott-kő (882 m) a Zengőnél (680 m)?', '202 méterrel', ['102 méterrel', '302 méterrel', '182 méterrel'], '882 − 680 = 202.'],
  [3, 'Hány méterrel magasabb a Pilis (756 m) a Zengőnél (680 m)?', '76 méterrel', ['56 méterrel', '86 méterrel', '176 méterrel'], '756 − 680 = 76.']
];
const NT_SORT = () => { const r3 = shuffle(NT3); return sortQ('Melyik nagytájhoz tartozik? Válogasd szét!', Object.fromEntries(r3.map(r => [r.n, [...new Set([...r.parts, ...r.towns])]])), 2, { hint: NT3.map(r => `${r.n}: ${[...r.parts, ...r.towns].join(', ')}`).join('. ') + '.' }); };
const NT_RIDDLES = [
  [['Nagytáj vagyok az ország nyugati részén.', 'Hegyek és dombok, erdők és rétek borítanak.', 'Csapadékos és szeles vagyok.', 'Rajtam van Sopron és Kőszeg, legmagasabb pontom az Írott-kő.'], 'Alpokalja', ['Dunántúli-dombvidék', 'Dunántúli-középhegység', 'Kisalföld']],
  [['Nagytáj vagyok az ország délnyugati részén.', 'Somogyi-, Zalai-, Baranyai- és Tolnai-dombság tartozik hozzám.', 'Két kisebb hegységem is van: a Mecsek és a Villányi-hegység.', 'Legnagyobb városom Pécs.'], 'Dunántúli-dombvidék', ['Alpokalja', 'Dunántúli-középhegység', 'Alföld']],
  [['Nagytáj vagyok a Dunántúlon.', 'A Balaton északi oldalán húzódom.', 'Legnagyobb hegységem a Bakony.', 'Legmagasabb pontom a Pilis, 756 m.'], 'Dunántúli-középhegység', ['Északi-középhegység', 'Alpokalja', 'Dunántúli-dombvidék']],
  [['Nagytáj vagyok az ország északi részén.', 'A Mátra, a Bükk és a Zempléni-hegység tartozik hozzám.', 'Eger és Miskolc is a közelemben van.', 'Rajtam van hazánk legmagasabb pontja, a Kékes.'], 'Északi-középhegység', ['Dunántúli-középhegység', 'Alpokalja', 'Kisalföld']]
];
K4.nagytaj = L => {
  const r = Math.random(), pool = L === 1 ? NT3 : NT, reg = pick(L === 3 ? NT : NT3);
  if (r < .12) return NT_SORT();
  if (r < .24) { const [cl, a, w] = pick(NT_RIDDLES.slice(0, L === 1 ? 3 : 4)); return riddleQ(cl, a, w); }
  if (r < .45) return factQ(pick(NT_FACTS.filter(f => f[0] === L)));
  const keys = L === 1 ? ['where', 'town', 'look', 'peakOf'] : L === 2 ? ['part', 'town', 'top', 'peakOf', 'where'] : ['height', 'part', 'top', 'peakOf', 'look'];
  for (;;) { const q = NT_GENS[pick(keys)](reg, pool); if (q) return q; }
};
/* ---------- separate quizzes: Hazánk folyói, Tavaink, Hegységeink, Dombságaink és síkságaink ---------- */
const isLakeFact = f => /tó\b|tava|Balaton|Hévíz/.test(f[1]) && !/Sió|Zala|Melyik tó vize gyógyvíz/.test(f[1]) || /Hévízi/.test(f[2]);
const isRiverFact = f => !isLakeFact(f) && /Duna|Tisza|Maros|Zagyva|Bodrog|Sió|Zala|Dráva|Ipoly|tiszavirág|Szeged|Budapest|leghosszabb folyó|Horvátország/.test(f[1] + ' ' + f[2]);
const GENERAL_WATER = RIVER_FACTS.filter(f => !isLakeFact(f) && !isRiverFact(f));
const RIVER_SPEC = RIVER_FACTS.filter(isRiverFact);

/* Hazánk folyói */
const RV = {
  'Duna': { into: 'a Fekete-tengerbe', towns: ['Budapest', 'Esztergom', 'Vác', 'Paks', 'Baja', 'Mohács', 'Dunaújváros'] },
  'Tisza': { into: 'a Dunába', towns: ['Szolnok', 'Szeged', 'Tiszaújváros', 'Vásárosnamény'] },
  'Rába': { into: 'a Mosoni-Dunába', towns: ['Szentgotthárd', 'Körmend', 'Sárvár'] },
  'Dráva': { into: 'a Dunába', towns: ['Barcs'] },
  'Mura': { into: 'a Drávába', towns: [] },
  'Ipoly': { into: 'a Dunába', towns: ['Balassagyarmat'] },
  'Sió': { into: 'a Dunába', towns: ['Siófok'] },
  'Zala': { into: 'a Balatonba', towns: ['Zalaegerszeg'] },
  'Kapos': { into: 'a Sióba', towns: ['Kaposvár'] },
  'Zagyva': { into: 'a Tiszába', towns: ['Hatvan', 'Jászberény'] },
  'Sajó': { into: 'a Tiszába', towns: ['Kazincbarcika'] },
  'Hernád': { into: 'a Sajóba', towns: [] },
  'Bodrog': { into: 'a Tiszába', towns: ['Sárospatak'] },
  'Szamos': { into: 'a Tiszába', towns: ['Csenger'] },
  'Körös': { into: 'a Tiszába', towns: ['Gyula', 'Békés', 'Szarvas'] },
  'Maros': { into: 'a Tiszába', towns: ['Makó'] }
};
const RV_NAMES = Object.keys(RV);
const RV_INTO = [...new Set(Object.values(RV).map(r => r.into))];
const INTO_NAME = { 'a Dunába': 'Duna', 'a Tiszába': 'Tisza', 'a Sajóba': 'Sajó', 'a Sióba': 'Sió', 'a Drávába': 'Dráva', 'a Mosoni-Dunába': 'Mosoni-Duna', 'a Balatonba': 'Balaton', 'a Fekete-tengerbe': 'Fekete-tenger' };
const DOWN = n => { const out = [n]; let cur = n; for (let k = 0; k < 8; k++) { const nx = RV[cur] ? INTO_NAME[RV[cur].into] : ({ 'Mosoni-Duna': 'Duna', 'Balaton': 'Sió', 'Duna': 'Fekete-tenger' })[cur]; if (!nx || out.includes(nx)) break; out.push(nx); cur = nx; } return out; };
const rvIntoQ = L => { const pool = L === 1 ? ['Duna', 'Tisza', 'Zagyva', 'Maros', 'Sió', 'Zala', 'Dráva', 'Körös'] : RV_NAMES, n = pick(pool), a = RV[n].into, down = DOWN(n); return mcq(`Hová ömlik ${artOf(n)} <b>${n}</b>?`, a, shuffle(RV_INTO.filter(x => x !== a && !down.includes(INTO_NAME[x]))).slice(0, 3), { fmt: v => v, hint: 'A Tiszába ömlik: Szamos, Bodrog, Sajó, Zagyva, Körös, Maros. A Dunába: Ipoly, Sió, Dráva és a Tisza. A Zala a Balatonba, a Rába a Mosoni-Dunába, a Hernád a Sajóba, a Kapos a Sióba, a Mura a Drávába ömlik.' }); };
const rvTowns = n => RV[n].towns.filter(t => !t.toLowerCase().startsWith(n.toLowerCase().slice(0, 4)));
const rvTownQ = L => { const pool = RV_NAMES.filter(n => rvTowns(n).length && (L > 1 || ['Duna', 'Tisza', 'Rába', 'Körös', 'Zala', 'Sió', 'Maros'].includes(n))), n = pick(pool), t = pick(rvTowns(n)); return mcq(`Melyik folyó partján fekszik <b>${t}</b>?`, n, shuffle(RV_NAMES.filter(x => x !== n && !RV[x].towns.includes(t))).slice(0, 3), { fmt: v => v, hint: RIVER_HINT[n] || `${t} ${artOf(n)} ${n} partján fekszik.` }); };
const RV_SORT = () => sortQ('A Duna vagy a Tisza mellékfolyója? Válogasd szét!', { 'Duna': ['Ipoly', 'Sió', 'Dráva', 'Tisza'], 'Tisza': ['Szamos', 'Bodrog', 'Sajó', 'Zagyva', 'Körös', 'Maros'] }, 3, { hint: 'A Dunába ömlik: Ipoly, Sió, Dráva és maga a Tisza is. A Tiszába ömlik: Szamos, Bodrog, Sajó, Zagyva, Körös, Maros.' });
const RV_EXTRA = [
  [1, 'Melyik folyónkból duzzasztották fel a Tisza-tavat?', 'a Tiszából', ['a Dunából', 'a Rábából', 'a Körösből'], 'A tó a folyóról kapta a nevét.'],
  [1, 'Melyik nagy folyónk szeli át az Alföldet észak–déli irányban?', 'a Tisza', ['a Rába', 'a Sió', 'a Zala'], 'Hazánk „legmagyarabb” folyója.'],
  [2, 'Melyik két folyó jelöl határt Horvátország felé?', 'a Dráva és a Mura', ['a Rába és a Zala', 'a Sajó és a Hernád', 'a Körös és a Maros'], 'Mindkettő hazánk délnyugati határán folyik.'],
  [2, 'Melyik folyó jelöli a határt Szlovákia felé a Duna mellett?', 'az Ipoly', ['a Dráva', 'a Maros', 'a Kapos'], 'Balassagyarmat mellett folyik, Szobnál ömlik a Dunába.'],
  [2, 'Melyik városnál ömlik a Körös a Tiszába?', 'Csongrádnál', ['Szegednél', 'Tokajnál', 'Szolnoknál'], 'A Körös keletről, Romániából érkezik.'],
  [3, 'Hány kilométer hosszan folyik a Tisza hazánkban?', 'kb. 600 km', ['kb. 60 km', 'kb. 6000 km', 'kb. 150 km'], 'A Tisza hosszabban folyik hazánkban, mint a Duna (kb. 417 km).'],
  [3, 'Melyik folyó partján fekszik Győr?', 'a Mosoni-Duna és a Rába partján', ['a Tisza partján', 'a Körös partján', 'a Zala partján'], 'Győr a „folyók városa”: itt találkozik a Mosoni-Duna, a Rába és a Rábca.'],
  [3, 'Melyik folyóba ömlik a Hernád?', 'a Sajóba', ['a Dunába', 'a Rábába', 'a Balatonba'], 'A Hernád Szlovákiából érkezik, és a Sajóba ömlik, a Sajó pedig a Tiszába.']
];
const RV_FACTS = [...RIVER_SPEC, ...RV_EXTRA];
K4.folyoink = L => {
  const r = Math.random(), fact = () => factQ(pick(RV_FACTS.filter(f => f[0] === L || (L === 3 && f[0] === 2 && Math.random() < .3))));
  if (L === 1) return r < .3 ? fact() : r < .5 ? rvTownQ(L) : r < .7 ? rvIntoQ(L) : r < .85 ? riverHl() : RV_SORT();
  if (L === 2) return r < .25 ? fact() : r < .45 ? rvTownQ(L) : r < .6 ? rvIntoQ(L) : r < .75 ? riverHl() : r < .87 ? tribQ() : RV_SORT();
  return r < .25 ? fact() : r < .45 ? rvIntoQ(L) : r < .6 ? rvTownQ(L) : r < .75 ? riverHl() : r < .88 ? (() => { const [cl, a, w] = pick(RIVER_RIDDLES); return riddleQ(cl, a, w); })() : RV_SORT();
};
/* the old topic keeps the general part: river parts, banks, water cycle */
K4.folyok = L => { const r = Math.random(), build = () => { const b = pick(RIVER_BUILDS); return { type: 'build', prompt: b.prompt, answer: b.answer, tiles: shuffle(b.answer), hint: b.hint, explain: b.answer.join(' → ') }; };
  const pool = GENERAL_WATER.filter(f => f[0] <= L); return r < .4 ? factQ(pick(pool)) : r < .65 ? riverLabel() : r < .85 ? build() : RIVER_SORT(L); };

/* Tavaink */
const LAKE_FACTS = [
  ...RIVER_FACTS.filter(isLakeFact),
  [1, 'Melyik hazánk legnagyobb tava?', 'a Balaton', ['a Velencei-tó', 'a Fertő tó', 'a Tisza-tó'], 'Közép-Európa legnagyobb tava; „magyar tengernek” is hívják.'],
  [1, 'Hogyan becézik a Balatont?', 'magyar tenger', ['kék Duna', 'szőke Tisza', 'puszta'], 'Olyan nagy, hogy sokszor nem látni át a túlsó partjára.'],
  [1, 'Melyik folyó a Balaton legnagyobb befolyója?', 'a Zala', ['a Sió', 'a Rába', 'a Duna'], 'Nyugatról, a Kis-Balatonon át érkezik.'],
  [1, 'Melyik folyó vezeti el a Balaton vizét?', 'a Sió', ['a Zala', 'a Tisza', 'a Rába'], 'Siófoknál indul ki a tóból, és a Dunába ömlik.'],
  [2, 'Hány megye határolja a Balatont?', '3', ['1', '2', '5'], 'Somogy, Veszprém és Zala megye.'],
  [2, 'Melyik megye fekszik a Balaton déli partján?', 'Somogy', ['Veszprém', 'Fejér', 'Vas'], 'Az északi parton Veszprém, a nyugatin Zala, a délin Somogy megye.'],
  [2, 'Milyen a Balaton vize?', 'sekély és édes vizű', ['nagyon mély és sós', 'forró gyógyvíz', 'jéghideg egész nyáron'], 'Átlagosan csak kb. 3 méter mély, ezért nyáron gyorsan felmelegszik.'],
  [2, 'Melyik tó fekszik Budapest és Székesfehérvár között?', 'a Velencei-tó', ['a Fertő tó', 'a Tisza-tó', 'a Hévízi-tó'], 'Fejér megyében van.'],
  [2, 'Melyik tavunk mesterséges, vagyis ember hozta létre?', 'a Tisza-tó', ['a Balaton', 'a Velencei-tó', 'a Fertő tó'], 'A Kiskörénél épült gát duzzasztotta fel a Tiszát.'],
  [2, 'Mi a Kis-Balaton?', 'mocsaras, nádas terület a Balaton nyugati végénél, sok madárral', ['egy kis sziget a Balaton közepén', 'egy hajó neve', 'egy balatoni város'], 'Szűri a Zala vizét, mielőtt a Balatonba ér.'],
  [3, 'Melyik balatoni félsziget nyúlik be legmesszebb a tóba?', 'a Tihanyi-félsziget', ['a Szigligeti-félsziget', 'a Keszthelyi-félsziget', 'a Siófoki-félsziget'], 'Tihanynál a legkeskenyebb a Balaton.'],
  [3, 'Melyik tó szerepel a világörökség listáján Ausztriával közösen?', 'a Fertő tó', ['a Balaton', 'a Velencei-tó', 'a Tisza-tó'], 'A Fertő tó és környéke 2001 óta világörökség.'],
  [3, 'Melyik tó vize télen is meleg, mert forrásból táplálkozik?', 'a Hévízi-tó', ['a Velencei-tó', 'a Fertő tó', 'a Balaton'], 'Gyógytó Zala megyében, Keszthely közelében.']
];
const LAKE_SORT = () => sortQ('A Balaton északi vagy déli partján van? Válogasd szét!', { 'északi part': ['Tihany', 'Balatonfüred', 'Badacsony', 'Balatonalmádi'], 'déli part': ['Siófok', 'Balatonlelle', 'Balatonboglár', 'Fonyód'] }, 3, { hint: 'Az északi parton dombok, hegyek és szőlők vannak (Veszprém megye). A déli part sík, homokos, sekély (Somogy megye).' });
const LAKE_RIDDLES = TAJ_RIDDLES.filter(r => /tó/.test(r[2]));
K4.tavaink = L => { const r = Math.random(); if (r < .15) return LAKE_SORT(); if (r < .3 && L > 1) { const [, cl, a, w] = pick(LAKE_RIDDLES); return riddleQ(cl, a, w); } const pool = LAKE_FACTS.filter(f => f[0] === L); return factQ(pick(pool.length ? pool : LAKE_FACTS)); };

/* Hegységeink */
const MTN = {
  'Bakony': { nt: 'Dunántúli-középhegység', top: ['Kőris-hegy', 709], near: 'Veszprém', fact: 'a Dunántúli-középhegység legnagyobb hegysége, sűrű erdőkkel' },
  'Vértes': { nt: 'Dunántúli-középhegység', near: 'Tatabánya', fact: 'a Bakony és a Gerecse között húzódik' },
  'Gerecse': { nt: 'Dunántúli-középhegység', near: 'Tata', fact: 'Tata és Tatabánya fölött emelkedik' },
  'Budai-hegység': { nt: 'Dunántúli-középhegység', top: ['János-hegy', 527], near: 'Budapest', fact: 'a fővárosban van, a János-hegyen áll az Erzsébet-kilátó' },
  'Pilis': { nt: 'Dunántúli-középhegység', top: ['Pilis-tető', 756], near: 'Esztergom', fact: 'a Dunántúli-középhegység legmagasabb pontja is itt van' },
  'Visegrádi-hegység': { nt: 'Dunántúli-középhegység', top: ['Dobogókő', 699], near: 'Visegrád', fact: 'a Duna-kanyar fölött, itt áll a visegrádi vár' },
  'Velencei-hegység': { nt: 'Dunántúli-középhegység', near: 'Velence', fact: 'gránitból áll, ezek hazánk legidősebb kőzetei közé tartoznak' },
  'Keszthelyi-hegység': { nt: 'Dunántúli-középhegység', near: 'Keszthely', fact: 'a Balaton nyugati csücske fölött emelkedik' },
  'Börzsöny': { nt: 'Északi-középhegység', top: ['Csóványos', 938], near: 'Szob', fact: 'vulkáni eredetű, a Duna-kanyartól északra' },
  'Cserhát': { nt: 'Északi-középhegység', near: 'Balassagyarmat', fact: 'itt fekszik Hollókő, a palóc falu' },
  'Mátra': { nt: 'Északi-középhegység', top: ['Kékes', 1014], near: 'Gyöngyös', fact: 'hazánk legmagasabb hegysége, itt van a Kékes és Galyatető' },
  'Bükk': { nt: 'Északi-középhegység', top: ['Istállós-kő', 959], near: 'Eger', fact: 'mészkőhegység barlangokkal, itt van a Szalajka-völgy és Lillafüred' },
  'Zempléni-hegység': { nt: 'Északi-középhegység', near: 'Sárospatak', fact: 'vulkáni hegység, a lábánál terem a tokaji bor szőlője' },
  'Soproni-hegység': { nt: 'Alpokalja', near: 'Sopron', fact: 'az Alpok nyúlványa a nyugati határon' },
  'Kőszegi-hegység': { nt: 'Alpokalja', top: ['Írott-kő', 882], near: 'Kőszeg', fact: 'itt van a Dunántúl legmagasabb pontja, az Írott-kő' },
  'Mecsek': { nt: 'Dunántúli-dombvidék', top: ['Zengő', 680], near: 'Pécs', fact: 'a Dunántúl déli részén, Pécs fölött emelkedik' },
  'Villányi-hegység': { nt: 'Dunántúli-dombvidék', near: 'Villány', fact: 'hazánk legdélebbi hegysége, híres borvidékkel' }
};
const sameStem = (a, b) => a.slice(0, 4).toLowerCase() === b.slice(0, 4).toLowerCase();
const PEAK_PLACE = { 'Pilis-tető': 'Pilis' };
const MTN_NAMES = Object.keys(MTN), MTN_EASY = ['Bakony', 'Budai-hegység', 'Pilis', 'Mátra', 'Bükk', 'Börzsöny', 'Mecsek', 'Kőszegi-hegység', 'Zempléni-hegység'];
const MTN_NT = ['Dunántúli-középhegység', 'Északi-középhegység', 'Alpokalja', 'Dunántúli-dombvidék'];
const mtnHint = n => `${n}: ${MTN[n].fact}. Nagytája: ${MTN[n].nt}.${MTN[n].top ? ` Legmagasabb pontja: ${MTN[n].top[0]} (${MTN[n].top[1]} m).` : ''}`;
const mtnPool = L => L === 1 ? MTN_EASY : MTN_NAMES;
const MTN_GENS = {
  nt: L => { const n = pick(mtnPool(L)); return mcq(`Melyik nagytájhoz tartozik ${artOf(n)} <b>${n}</b>?`, MTN[n].nt, MTN_NT.filter(x => x !== MTN[n].nt), { fmt: v => v, hint: mtnHint(n) }); },
  near: L => { const n = pick(mtnPool(L).filter(x => !sameStem(x, MTN[x].near))); return mcq(`Melyik hegység emelkedik <b>${MTN[n].near}</b> közelében?`, n, shuffle(MTN_NAMES.filter(x => MTN[x].nt !== MTN[n].nt)).slice(0, 3), { fmt: v => v, hint: mtnHint(n) }); },
  fact: L => { const n = pick(mtnPool(L)); return mcq(`Melyik hegységre igaz: <b>${MTN[n].fact}</b>?`, n, shuffle(MTN_NAMES.filter(x => x !== n)).slice(0, 3), { fmt: v => v, hint: mtnHint(n) }); },
  top: L => { const n = pick(MTN_NAMES.filter(x => MTN[x].top && !sameStem(x, MTN[x].top[0]) && (L > 1 || MTN_EASY.includes(x)))); return mcq(`Melyik hegységben van ${artOf(MTN[n].top[0])} <b>${MTN[n].top[0]}</b>${L === 3 ? '' : ` (${MTN[n].top[1]} m)`}?`, n, shuffle(MTN_NAMES.filter(x => x !== n && MTN[x].top)).slice(0, 3), { fmt: v => v, hint: mtnHint(n) }); },
  height: L => { const n = pick(MTN_NAMES.filter(x => MTN[x].top)), [p, m] = MTN[n].top; return mcq(`Milyen magas ${artOf(p)} <b>${p}</b>, ${artOf(n)} ${n} legmagasabb pontja?`, `${m} m`, shuffle(MTN_NAMES.filter(x => MTN[x].top && x !== n)).slice(0, 3).map(x => `${MTN[x].top[1]} m`), { fmt: v => v, hint: 'Kékes 1014 m, Istállós-kő 959 m, Csóványos 938 m, Írott-kő 882 m, Pilis-tető 756 m, Kőris-hegy 709 m, Dobogókő 699 m, Zengő 680 m, János-hegy 527 m.' }); },
  peakMap: L => { const peaks = ['Kékes', 'Istállós-kő', 'Csóványos', 'Írott-kő', 'Pilis', 'Zengő', 'Kőris-hegy', 'János-hegy'], p = pick(L === 1 ? ['Kékes', 'Írott-kő', 'Zengő', 'Istállós-kő'] : peaks), n = MTN_NAMES.find(x => MTN[x].top && (PEAK_PLACE[MTN[x].top[0]] || MTN[x].top[0]) === p), pn = MTN[n].top[0];
    const far = peaks.filter(x => x !== p && Math.hypot(MAPDATA.places[x][0] - MAPDATA.places[p][0], MAPDATA.places[x][1] - MAPDATA.places[p][1]) > 40);
    return mapQ(`Hol van ${artOf(pn)} <b>${pn}</b>, ${artOf(n)} ${n} legmagasabb pontja? Koppints a pontra!`, p, { pick: 'dot', dots: shuffle([p, ...shuffle(far).slice(0, 4)]), hint: mtnHint(n) }); }
};
const MTN_SORT = () => sortQ('Melyik nagytájhoz tartozik? Válogasd szét!', { 'Dunántúli-középhegység': ['Bakony', 'Vértes', 'Gerecse', 'Budai-hegység', 'Pilis', 'Keszthelyi-hegység'], 'Északi-középhegység': ['Börzsöny', 'Cserhát', 'Mátra', 'Bükk', 'Zempléni-hegység'] }, 3, { hint: 'A Dunántúli-középhegység a Balatontól északra a Dunáig húzódik. Az Északi-középhegység a Dunától keletre, az ország északi részén.' });
const peakBuild = () => { const pk = shuffle(MTN_NAMES.filter(x => MTN[x].top)).slice(0, 4).map(x => MTN[x].top).sort((a, b) => b[1] - a[1]); return { type: 'build', prompt: 'Rakd sorba a csúcsokat a legmagasabbtól a legalacsonyabbig! Koppints rájuk sorban.', answer: pk.map(p => p[0]), tiles: shuffle(pk.map(p => p[0])), hint: 'Kékes 1014 m, Istállós-kő 959 m, Csóványos 938 m, Írott-kő 882 m, Pilis-tető 756 m, Kőris-hegy 709 m, Dobogókő 699 m, Zengő 680 m, János-hegy 527 m.', explain: pk.map(p => `${p[0]} (${p[1]} m)`).join(' → ') }; };
const MTN_RIDDLES = [
  [['Hegység vagyok a Dunántúlon.', 'Sűrű erdeim vannak, a Balatontól északra húzódom.', 'Veszprém és Zirc is a közelemben van.', 'A Dunántúli-középhegység legnagyobb hegysége vagyok.'], 'Bakony', ['Vértes', 'Mecsek', 'Bükk']],
  [['Hegység vagyok az ország északi részén.', 'Mészkőből állok, sok barlangom van.', 'Bennem van a Szalajka-völgy és a Fátyol-vízesés.', 'Legmagasabb pontom az Istállós-kő.'], 'Bükk', ['Mátra', 'Börzsöny', 'Bakony']],
  [['Hegység vagyok az Északi-középhegységben.', 'Gyöngyös fölött emelkedem.', 'Galyatető is rajtam van.', 'Rajtam van hazánk legmagasabb pontja.'], 'Mátra', ['Bükk', 'Börzsöny', 'Cserhát']],
  [['Hegység vagyok a fővárosban.', 'Budapest nyugati részén, Budán emelkedem.', 'Libegővel és gyermekvasúttal is meg lehet közelíteni.', 'A János-hegyemen áll az Erzsébet-kilátó.'], 'Budai-hegység', ['Pilis', 'Gerecse', 'Vértes']],
  [['Hegység vagyok a Dunántúl déli részén.', 'Baranya megyében emelkedem.', 'Legmagasabb pontom a Zengő.', 'A lábamnál fekszik Pécs.'], 'Mecsek', ['Bakony', 'Villányi-hegység', 'Zselic']],
  [['Vulkáni eredetű hegység vagyok.', 'A Duna-kanyartól északra emelkedem.', 'Nagy erdeim vannak, sok vadon élő állattal.', 'Legmagasabb pontom a Csóványos.'], 'Börzsöny', ['Mátra', 'Pilis', 'Bükk']]
];
K4.hegyseg = L => { const r = Math.random(); if (r < .12) return MTN_SORT(); if (r < .22) return L === 1 ? MTN_GENS.peakMap(L) : peakBuild(); if (r < .32) { const [cl, a, w] = pick(MTN_RIDDLES); return riddleQ(cl, a, w); } if (r < .45) return MTN_GENS.peakMap(L);
  const keys = L === 1 ? ['nt', 'near', 'fact', 'top'] : L === 2 ? ['nt', 'near', 'fact', 'top'] : ['height', 'top', 'fact', 'near', 'nt']; return MTN_GENS[pick(keys)](L); };

/* Dombságaink és síkságaink */
const LOW = {
  'Somogyi-dombság': { kind: 'dombság', nt: 'Dunántúli-dombvidék', near: 'Kaposvár', fact: 'a Balatontól délre terül el, része a Zselic is' },
  'Zalai-dombság': { kind: 'dombság', nt: 'Dunántúli-dombvidék', near: 'Zalaegerszeg', fact: 'nyugaton, Zala megyében; része a Göcsej' },
  'Baranyai-dombság': { kind: 'dombság', nt: 'Dunántúli-dombvidék', near: 'Pécs', fact: 'Baranya megyében, a Mecsek és a Villányi-hegység környékén' },
  'Tolnai-dombság': { kind: 'dombság', nt: 'Dunántúli-dombvidék', near: 'Szekszárd', fact: 'a Duna jobb partján, híres a szekszárdi borvidék' },
  'Gödöllői-dombság': { kind: 'dombság', nt: 'Alföld', near: 'Gödöllő', fact: 'Budapesttől keletre, a Pest megyei dombvidék' },
  'Duna–Tisza köze': { kind: 'síkság', nt: 'Alföld', near: 'Kecskemét', fact: 'a Duna és a Tisza között, homokos talajjal' },
  'Hortobágy': { kind: 'síkság', nt: 'Alföld', near: 'Balmazújváros', fact: 'füves puszta, első nemzeti parkunk' },
  'Nyírség': { kind: 'síkság', nt: 'Alföld', near: 'Nyíregyháza', fact: 'homokos vidék, sok almát termesztenek' },
  'Hajdúság': { kind: 'síkság', nt: 'Alföld', near: 'Hajdúszoboszló', fact: 'jó termőföldű (löszös) síkság Debrecen környékén' },
  'Jászság': { kind: 'síkság', nt: 'Alföld', near: 'Jászberény', fact: 'a Zagyva mentén, a jászok földje' },
  'Mezőföld': { kind: 'síkság', nt: 'Alföld', near: 'Székesfehérvár', fact: 'a Dunától nyugatra, Fejér megyében, jó termőföld' },
  'Szigetköz': { kind: 'síkság', nt: 'Kisalföld', near: 'Mosonmagyaróvár', fact: 'a Duna és a Mosoni-Duna közötti szigetvilág' },
  'Hanság': { kind: 'síkság', nt: 'Kisalföld', near: 'Kapuvár', fact: 'egykor mocsaras, lápos vidék a Fertő tó mellett' },
  'Rábaköz': { kind: 'síkság', nt: 'Kisalföld', near: 'Csorna', fact: 'a Rába és a Rábca közötti síkság, híres népviselettel' }
};
const LOW_KIND = [['Hortobágy', 'síkság'], ['Nyírség', 'síkság'], ['Szigetköz', 'síkság'], ['Hanság', 'síkság'], ['Rábaköz', 'síkság'], ['Jászság', 'síkság'], ['Kiskunság', 'síkság'], ['Zselic', 'dombság'], ['Göcsej', 'dombság'], ['Őrség', 'dombság'], ['Bakony', 'hegység'], ['Mátra', 'hegység'], ['Bükk', 'hegység'], ['Mecsek', 'hegység'], ['Börzsöny', 'hegység'], ['Vértes', 'hegység']];
const LOW_NAMES = Object.keys(LOW), LOW_NT = ['Dunántúli-dombvidék', 'Alföld', 'Kisalföld', 'Alpokalja'];
const lowHint = n => `${n}: ${LOW[n].fact}. Nagytája: ${LOW[n].nt}.`;
const LOW_GENS = {
  nt: L => { const n = pick(LOW_NAMES); return mcq(`Melyik nagytájhoz tartozik ${artOf(n)} <b>${n}</b>?`, LOW[n].nt, LOW_NT.filter(x => x !== LOW[n].nt), { fmt: v => v, hint: lowHint(n) }); },
  near: L => { const n = pick(LOW_NAMES.filter(x => !sameStem(x, LOW[x].near))); return mcq(`Melyik táj terül el <b>${LOW[n].near}</b> környékén?`, n, shuffle(LOW_NAMES.filter(x => x !== n)).slice(0, 3), { fmt: v => v, hint: lowHint(n) }); },
  fact: L => { const n = pick(LOW_NAMES); return mcq(`Melyik tájra igaz: <b>${LOW[n].fact}</b>?`, n, shuffle(LOW_NAMES.filter(x => x !== n)).slice(0, 3), { fmt: v => v, hint: lowHint(n) }); },
  kind: L => { const [n, k] = pick(LOW_KIND); return { type: 'choice', prompt: `Hegység, dombság vagy síkság ${artOf(n)} <b>${n}</b>?`, answer: k, options: ['hegység', 'dombság', 'síkság'].map(v => ({ value: v, html: v })), answerText: k, hint: 'A hegység magas, meredek (barna a térképen). A dombság lankás (sárga). A síkság sík (zöld).' }; }
};
const LOW_FACTS = [
  [1, 'Melyik magasabb általában: a domb vagy a hegy?', 'a hegy', ['a domb', 'egyforma magasak', 'a síkság'], 'A dombok alacsonyabbak és lankásabbak, mint a hegyek.'],
  [1, 'Milyen színnel jelöli a domborzati térkép a dombságot?', 'sárgával', ['zölddel', 'sötétbarnával', 'kékkel'], 'Zöld: síkság. Sárga: dombság. Barna: hegység.'],
  [1, 'Melyik hazánk legnagyobb síksága?', 'az Alföld', ['a Kisalföld', 'a Mezőföld', 'a Hanság'], 'Az ország középső és keleti részét foglalja el.'],
  [1, 'Melyik nagytáj négy dombságát tanuljuk: Somogyi-, Zalai-, Baranyai- és Tolnai-dombság?', 'Dunántúli-dombvidék', ['Alföld', 'Kisalföld', 'Északi-középhegység'], 'A Dunántúli-dombvidék az ország délnyugati részén van.'],
  [2, 'Melyik dombság van Budapesttől keletre?', 'a Gödöllői-dombság', ['a Somogyi-dombság', 'a Zalai-dombság', 'a Tolnai-dombság'], 'Pest megyében, Gödöllő környékén.'],
  [2, 'Melyik NEM dombság?', 'a Hortobágy', ['a Somogyi-dombság', 'a Tolnai-dombság', 'a Zalai-dombság'], 'A Hortobágy sík, füves puszta az Alföldön.'],
  [2, 'Melyik a Kisalföld legnagyobb városa?', 'Győr', ['Debrecen', 'Pécs', 'Szeged'], 'A Kisalföld az ország északnyugati sarkában van.'],
  [3, 'Melyik két nagy folyó között terül el a Duna–Tisza köze?', 'a Duna és a Tisza között', ['a Rába és a Zala között', 'a Körös és a Maros között', 'a Dráva és a Mura között'], 'A neve is elárulja!'],
  [3, 'Miért jó a mezőgazdaságnak az Alföld?', 'sík, és sok helyen termékeny a talaja', ['mert hegyes', 'mert mindig esik', 'mert sziklás'], 'Búzát, kukoricát, napraforgót termesztenek rajta.']
];
const LOW_SORT = () => sortQ('Hegység, dombság vagy síkság? Válogasd szét!', { 'hegység': ['Bakony', 'Mátra', 'Bükk', 'Mecsek', 'Börzsöny'], 'dombság': ['Somogyi-dombság', 'Zalai-dombság', 'Tolnai-dombság', 'Gödöllői-dombság'], 'síkság': ['Hortobágy', 'Nyírség', 'Szigetköz', 'Rábaköz', 'Jászság'] }, 2, { hint: 'A hegység magas, meredek. A dombság alacsonyabb, lankás. A síkság sík, nincsenek rajta dombok.' });
K4.dombsag = L => { const r = Math.random(); if (r < .15) return LOW_SORT(); if (r < .3) return factQ(pick(LOW_FACTS.filter(f => f[0] === L))); const keys = L === 1 ? ['kind', 'nt', 'near'] : L === 2 ? ['nt', 'near', 'fact', 'kind'] : ['fact', 'near', 'nt']; return LOW_GENS[pick(keys)](L); };
PAGES['kornyezet-4'] = {
  id: 'kornyezet-4', title: 'Környezetismeret', grade: 4,
  blurb: 'Halmazállapotok és mérés, időjárás, tűz, fény és mozgás, a növények és állatok, életközösségek, testünk és egészségünk, világtájak és térképolvasás, a Föld és a Naprendszer, folyóink és tavaink, hazánk tájai, megyéi és nevezetességei, Budapest hídjai. Egy kör 10 feladat.',
  topics: [
    { id: 'sorter', sample: '🧺', name: 'Válogató', desc: 'Válogasd szét a kártyákat a kosarakba!', gen: K4.sorter },
    { id: 'ki', sample: '❓', name: 'Ki vagyok én?', desc: 'Találós kérdések: minél kevesebb tippből!', gen: K4.ki },
    { id: 'lab', sample: '🧪', name: 'Kísérletező', desc: 'Mit gondolsz? Próbáld ki! Mit láttál?', gen: K4.lab },
    { id: 'state', sample: 'jég · víz · gőz', name: 'Halmazállapotok', desc: 'Szilárd, folyékony, légnemű; olvadás, fagyás; a hőmérő.', gen: K4.state },
    { id: 'ido', sample: '📅 ⏳', name: 'Idő és naptár', desc: 'Hónapok, napok, évszakok, életszakaszok.', gen: K4.ido },
    { id: 'measure', sample: '°C · kg · dl', name: 'Mérés', desc: 'Mérőeszközök és mértékegységek.', gen: K4.measure },
    { id: 'weather', sample: '☀️ 🌧️ 💨', name: 'Időjárás', desc: 'Időjárásjelek, csapadék, mérőeszközök.', gen: K4.weather },
    { id: 'energy', sample: '🔥 💡 🏃', name: 'Tűz, fény, mozgás', desc: 'Fényforrások, éghető anyagok, mozgásformák.', gen: K4.energy },
    { id: 'hangfeny', sample: '🔊 💡', name: 'Hang és fény', desc: 'Rezgés, visszhang; árnyék, tükör, átlátszó anyagok.', gen: K4.hangfeny },
    { id: 'mozgas', sample: '🐎 🐟 🦅', name: 'Mozgás', desc: 'Mozgásfajták; hogyan mozognak az állatok?', gen: K4.mozgas },
    { id: 'plant', sample: '🌱 🌼', name: 'A növények', desc: 'Részeik és szerepük, életszakaszok, ehető részek.', gen: K4.plant },
    { id: 'animal', sample: '🦇 🐋 🐧', name: 'Az állatok csoportjai', desc: 'Emlős, madár, hal, kétéltű, hüllő, rovar.', gen: K4.animal },
    { id: 'habitat', sample: '🌳 🌾 🌊', name: 'Életközösségek', desc: 'Erdő, mező, vízpart; tápláléklánc.', gen: K4.habitat },
    { id: 'haszon', sample: '🌾 🐄 🍎', name: 'Haszonnövények, háziállatok', desc: 'Búza, cukorrépa, napraforgó; háziállatok és kicsinyeik; idénygyümölcsök.', gen: K4.haszon },
    { id: 'kornyvedelem', sample: '♻️', name: 'Környezetvédelem', desc: 'Szelektív gyűjtés, komposzt, takarékosság, természetvédelem.', gen: K4.kornyvedelem },
    { id: 'body', sample: '👁️ 👂 ❤️', name: 'Testünk', desc: 'Érzékszervek, szervek és feladatuk.', gen: K4.body },
    { id: 'health', sample: '🩺 112', name: 'Egészségünk', desc: 'Egészséges szokások, betegségek, segélyhívás.', gen: K4.health },
    { id: 'compass', sample: 'É · K · D · Ny', name: 'Világtájak', desc: 'Fő- és mellékvilágtájak, tájékozódás.', gen: K4.compass },
    { id: 'terkepolv', sample: '🗺️ ▲ ●', name: 'Térképolvasás', desc: 'Térképjelek, színek, méretarány.', gen: K4.terkepolv },
    { id: 'fold', sample: '🌍 ☀️ 🌙', name: 'Föld, Nap, Hold', desc: 'Nappal és éjszaka, évszakok, holdfázisok, bolygók.', gen: K4.fold },
    { id: 'landform', sample: '⛰️ 〰️', name: 'Felszínformák és vizek', desc: 'Síkság, dombság, hegység; patak, folyó, tó.', gen: K4.landform },
    { id: 'nagytaj', sample: 'Írott-kő 882 m', name: 'Nagytájaink közelről', desc: 'Alpokalja, Dunántúli-dombvidék, Dunántúli-középhegység és a többi: városok, hegységek, legmagasabb pontok.', gen: K4.nagytaj },
    { id: 'hegyseg', sample: 'Mátra · Bükk · Bakony', name: 'Hegységeink', desc: 'Hegységek, nagytájuk, legmagasabb csúcsaik a térképen.', gen: K4.hegyseg },
    { id: 'dombsag', sample: 'Somogyi-dombság · Nyírség', name: 'Dombságaink és síkságaink', desc: 'Dombságok és alföldi, kisalföldi tájak.', gen: K4.dombsag },
    { id: 'folyoink', sample: 'Duna · Tisza · Rába', name: 'Hazánk folyói', desc: 'Folyóink, mellékfolyóik, torkolataik, partjukon fekvő városok.', gen: K4.folyoink },
    { id: 'tavaink', sample: 'Balaton · Velencei-tó', name: 'Tavaink', desc: 'Balaton, Velencei-tó, Fertő tó, Tisza-tó, Hévízi-tó.', gen: K4.tavaink },
    { id: 'folyok', sample: 'forrás → torkolat', name: 'A folyó és a víz körforgása', desc: 'A folyó részei, jobb és bal part, a víz körforgása.', gen: K4.folyok },
    { id: 'regions', sample: 'Alföld · Mátra', name: 'Hazánk nagytájai', desc: 'A hat nagytáj és jellemző tájaik.', gen: K4.regions },
    { id: 'country', sample: '🇭🇺', name: 'Magyarország', desc: 'Szomszédos országok, megyék és megyeszékhelyek.', gen: K4.country },
    { id: 'terkep', sample: '🗺️ 📍', name: 'Térképes kalandok', desc: 'Koppints a térképre: szomszédok, nevezetes helyek.', gen: K4.terkep },
    { id: 'megyek', sample: '19 megye', name: 'Megyék a térképen', desc: 'Keresd meg a megyéket, székhelyeket és városokat!', gen: K4.megyek },
    { id: 'tajak', sample: 'Alpokalja · Hortobágy', name: 'Tájak és nevezetességek', desc: 'Alpokalja, Őrség, Tokaj, Aggtelek, nemzeti parkok…', gen: K4.tajak },
    { id: 'hidak', sample: '🌉', name: 'Budapest hídjai', desc: 'A Duna-hidak sorrendje, története, érdekességei.', gen: K4.hidak }
  ]
};
