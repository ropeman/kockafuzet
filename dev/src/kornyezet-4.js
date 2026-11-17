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
      const [q, a] = pick([['Hogy hívjuk a nagy, sík, alacsony területet?', 'síkság'], ['Hogy hívjuk az egymás melletti dombok csoportját?', 'dombság'], ['Hogy hívjuk az egymás melletti hegyek csoportját?', 'hegység'], ['Hogy hívjuk a két hegy vagy domb közötti mélyedést?', 'völgy'], ['Hogy hívjuk a kis, keskeny folyóvizet?', 'patak'], ['Hogy hívjuk a nagy folyóvizet?', 'folyó']]);
      return mcq(q, a, shuffle(['síkság', 'dombság', 'hegység', 'völgy', 'patak', 'folyó', 'tó'].filter(x => x !== a)).slice(0, 3), { fmt: v => v, hint: 'Felszínformák: síkság, domb, dombság, hegy, hegység, völgy. Vizek: forrás, patak, folyó, tó.' });
    }
    if (L === 2) { const flow = Math.random() < .5, a = pick(flow ? ['patak', 'folyó', 'csatorna'] : ['tó', 'mocsár', 'halastó']); return mcq(`Melyik ${flow ? 'folyóvíz' : 'állóvíz'}?`, a, shuffle(flow ? ['tó', 'mocsár', 'halastó'] : ['patak', 'folyó', 'csatorna']).slice(0, 2), { fmt: v => v, hint: 'A folyóvíz mozog, folyik egy irányba (patak, folyó). Az állóvíz egy helyben marad (tó, mocsár).' }); }
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
    const [m, sz] = pick(MS);
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
const countyTap = (c, extra = '') => mapQ(`Hol van ${mega(c)}? Koppints rá a térképen!${extra}`, c, { hint: `${artOf(c) === 'az' ? 'Az' : 'A'} ${c} megye székhelye ${SEATS[c] || 'Budapest'}. ${MAP_HINTS[c] || ''}`.trim(), speak: `Hol van ${c} megye? Koppints rá a térképen!` });
const MAP_HINTS = {
  'Pest': 'Budapestet öleli körül, az ország közepén.', 'Baranya': 'Az ország legdélebbi része, a Mecsek környéke.', 'Bács-Kiskun': 'A Duna és a Tisza között, délen; ez a legnagyobb megye.', 'Borsod-Abaúj-Zemplén': 'Északkeleten, Szlovákia mellett.',
  'Hajdú-Bihar': 'Keleten, Románia mellett; itt van a Hortobágy.', 'Győr-Moson-Sopron': 'Északnyugaton, Ausztria és Szlovákia mellett.', 'Csongrád-Csanád': 'Délen, a Tisza mentén, Szerbia mellett.', 'Somogy': 'A Balaton déli partja mentén.',
  'Zala': 'Délnyugaton, a Balaton nyugati csücskénél.', 'Vas': 'Nyugaton, Ausztria mellett.', 'Békés': 'Délkeleten, Románia mellett.', 'Szabolcs-Szatmár-Bereg': 'A legkeletebbi megye, Ukrajna és Románia mellett.',
  'Veszprém': 'A Balaton északi partja mentén.', 'Fejér': 'Budapesttől délnyugatra, itt a Velencei-tó.', 'Tolna': 'Délen, a Duna jobb partján.', 'Komárom-Esztergom': 'Északon, a Duna mentén, Szlovákia mellett.',
  'Nógrád': 'Északon, Szlovákia mellett, Pesttől északra.', 'Heves': 'Északon, itt a Mátra és a Kékes.', 'Jász-Nagykun-Szolnok': 'Az ország közepén, keletre, a Tisza mentén.'
};
const hlChoice = c => ({ type: 'choice', prompt: 'Melyik megye van kiemelve a térképen?', visual: huMap({ hl: c }), answer: c, options: shuffle([c, ...otherCounties(c)]).map(v => ({ value: v, html: v })), answerText: c, hint: MAP_HINTS[c] });
const townQ = () => { const [t, c] = pick(Object.entries(TOWNS)); return mcq(`Melyik megyében van <b>${t}</b>?`, c, otherCounties(c), { fmt: v => v, hint: `${t} ${artOf(c)} ${c} megyében van. ${MAP_HINTS[c] || ''}`.trim() }); };
const seatQ = () => { const [m, sz] = pick(Object.entries(SEATS)); return mcq(`Mi a székhelye ennek a megyének: <b>${m}</b>?`, sz, shuffle(Object.values(SEATS).filter(x => x !== sz)).slice(0, 3), { fmt: v => v, hint: 'A megyeszékhely általában a megye legnagyobb városa.' }); };
const seatTap = () => { const c = pick(Object.keys(SEATS)), t = SEATS[c]; const dots = shuffle([t, ...shuffle(Object.values(SEATS).filter(x => x !== t)).slice(0, 5)]); return mapQ(`Hol van <b>${t}</b>, ${artOf(c)} ${c} megye székhelye? Koppints a pontra!`, t, { pick: 'dot', dots, hint: MAP_HINTS[c] }); };
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
const SIGHT_HINT = { 'Kékes': 'A Mátrában, északon, Eger közelében.', 'Tihany': 'A Balaton északi partján, egy félszigeten.', 'Tokaj': 'Északkeleten, ahol a Bodrog a Tiszába ömlik.', 'Aggtelek': 'Egészen északon, a szlovák határ mellett.', 'Hortobágy': 'Keleten, Debrecentől nyugatra, az Alföldön.',
  'Esztergom': 'Északon, a Duna partján, a szlovák határon.', 'Visegrád': 'A Duna-kanyarban, Budapesttől északra.', 'Hollókő': 'Északon, Nógrád megyében.', 'Kőszeg': 'Nyugaton, az osztrák határ mellett.', 'Pannonhalma': 'Északnyugaton, Győr közelében.',
  'Bugac': 'Az Alföldön, Kecskemét közelében.', 'Badacsony': 'A Balaton északi partjának nyugati részén.', 'Villány': 'Egészen délen, Baranyában.', 'Ópusztaszer': 'Délen, Szeged közelében.', 'Őriszentpéter': 'Az ország délnyugati sarkában, a határ mellett.' };
K4.terkep = L => {
  const r = Math.random();
  if (L === 1) {
    if (r < .55) { const n = pick(NEIGHBOURS); return mapQ(`Hol van <b>${n}</b>? Koppints rá a térképen!`, n, { map: 'region', hint: NB_HINT, speak: `Hol van ${n}? Koppints rá a térképen!` }); }
    if (r < .8) { const n = pick(NEIGHBOURS); return { type: 'choice', prompt: 'Melyik szomszédos ország van kiemelve?', visual: regionMap({ hl: n }), answer: n, options: shuffle([n, ...shuffle(NEIGHBOURS.filter(x => x !== n)).slice(0, 3)]).map(v => ({ value: v, html: v })), answerText: n, hint: NB_HINT }; }
    return mcq('Hány szomszédos országa van Magyarországnak?', 7, [5, 6, 8], { hint: 'Számold meg: Ausztria, Szlovákia, Ukrajna, Románia, Szerbia, Horvátország, Szlovénia.' });
  }
  if (L === 2) return r < .6 ? sightTap() : r < .8 ? (() => { const [d, n] = pick(DIR_NB); return mapQ(`Koppints arra az országra, amelyik Magyarországtól <b>${d}</b> van!`, n, { map: 'region', hint: 'Az északi irány a térképen felfelé van, a keleti jobbra, a déli lefelé, a nyugati balra.' }); })() : hlChoice(pick(COUNTIES));
  if (r < .45) return sightTap();
  if (r < .7) { const n = pick(NEIGHBOURS); return { type: 'choice', prompt: 'Melyik ország van kiemelve? Mi a fővárosa?', visual: regionMap({ hl: n }), answer: CAPITALS[n], options: shuffle([CAPITALS[n], ...shuffle(NEIGHBOURS.filter(x => x !== n)).slice(0, 3).map(x => CAPITALS[x])]).map(v => ({ value: v, html: v })), answerText: `${n}, fővárosa ${CAPITALS[n]}`, hint: NB_HINT }; }
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
  [1, 'Melyik tó nagyobb része van Ausztriában?', 'a Fertő tóé', ['a Balatoné', 'a Velencei-tóé', 'a Tisza-tóé'], 'Sopron közelében fekszik, a nyugati határon.'],
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
  [2, 'Melyik a hazánk legnagyobb szigete, a Duna és a Mosoni-Duna között?', 'a Szigetköz', ['a Csepel-sziget', 'a Margit-sziget', 'a Szentendrei-sziget'], 'Győr közelében, a Kisalföldön van.'],
  [3, 'Hol van az Írott-kő, a Dunántúl legmagasabb pontja?', 'a Kőszegi-hegységben', ['a Mecsekben', 'a Bakonyban', 'a Mátrában'], 'Az Alpokalján, az osztrák határon.'],
  [3, 'Melyik két hegység tartozik az Alpokaljához?', 'a Soproni- és a Kőszegi-hegység', ['a Bükk és a Mátra', 'a Mecsek és a Villányi-hegység', 'a Pilis és a Börzsöny'], 'Mindkettő a nyugati határ mellett van, egy-egy városról kapta a nevét.'],
  [3, 'Mi a nagytáj neve, amelyhez az Alpokalja tartozik?', 'Nyugat-magyarországi-peremvidék', ['Dunántúli-dombság', 'Kisalföld', 'Északi-középhegység'], 'Az ország nyugati peremén, szélén van.'],
  [3, 'Hol látható a Feszty-körkép, amely a honfoglalást mutatja be?', 'Ópusztaszeren', ['Budapesten', 'Visegrádon', 'Esztergomban'], 'Csongrád-Csanád megyében, Szeged közelében van.'],
  [3, 'Hogy hívják a Duna menti ártéri erdőt Tolna megyében, ahol sok gímszarvas él?', 'Gemenc', ['Zselic', 'Bakony', 'Őrség'], 'A Duna–Dráva Nemzeti Parkhoz tartozik.'],
  [3, 'Hol van csillagpark, ahol különösen sötét és csillagos az éjszakai égbolt?', 'a Zselicben', ['a Hortobágyon', 'a Szigetközben', 'a Jászságban'], 'Somogy megyei erdős, dombos táj, Kaposvár közelében.'],
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
PAGES['kornyezet-4'] = {
  id: 'kornyezet-4', title: 'Környezetismeret', grade: 4,
  blurb: 'Halmazállapotok és mérés, időjárás, tűz, fény és mozgás, a növények és állatok, életközösségek, testünk és egészségünk, világtájak, hazánk tájai, megyéi és nevezetességei, térképes feladatok, Budapest hídjai. Egy kör 10 feladat.',
  topics: [
    { id: 'sorter', sample: '🧺', name: 'Válogató', desc: 'Válogasd szét a kártyákat a kosarakba!', gen: K4.sorter },
    { id: 'ki', sample: '❓', name: 'Ki vagyok én?', desc: 'Találós kérdések: minél kevesebb tippből!', gen: K4.ki },
    { id: 'lab', sample: '🧪', name: 'Kísérletező', desc: 'Mit gondolsz? Próbáld ki! Mit láttál?', gen: K4.lab },
    { id: 'state', sample: 'jég · víz · gőz', name: 'Halmazállapotok', desc: 'Szilárd, folyékony, légnemű; olvadás, fagyás; a hőmérő.', gen: K4.state },
    { id: 'measure', sample: '°C · kg · dl', name: 'Mérés', desc: 'Mérőeszközök és mértékegységek.', gen: K4.measure },
    { id: 'weather', sample: '☀️ 🌧️ 💨', name: 'Időjárás', desc: 'Időjárásjelek, csapadék, mérőeszközök.', gen: K4.weather },
    { id: 'energy', sample: '🔥 💡 🏃', name: 'Tűz, fény, mozgás', desc: 'Fényforrások, éghető anyagok, mozgásformák.', gen: K4.energy },
    { id: 'plant', sample: '🌱 🌼', name: 'A növények', desc: 'Részeik és szerepük, életszakaszok, ehető részek.', gen: K4.plant },
    { id: 'animal', sample: '🦇 🐋 🐧', name: 'Az állatok csoportjai', desc: 'Emlős, madár, hal, kétéltű, hüllő, rovar.', gen: K4.animal },
    { id: 'habitat', sample: '🌳 🌾 🌊', name: 'Életközösségek', desc: 'Erdő, mező, vízpart; tápláléklánc.', gen: K4.habitat },
    { id: 'body', sample: '👁️ 👂 ❤️', name: 'Testünk', desc: 'Érzékszervek, szervek és feladatuk.', gen: K4.body },
    { id: 'health', sample: '🩺 112', name: 'Egészségünk', desc: 'Egészséges szokások, betegségek, segélyhívás.', gen: K4.health },
    { id: 'compass', sample: 'É · K · D · Ny', name: 'Világtájak', desc: 'Fő- és mellékvilágtájak, tájékozódás.', gen: K4.compass },
    { id: 'landform', sample: '⛰️ 〰️', name: 'Felszínformák és vizek', desc: 'Síkság, dombság, hegység; patak, folyó, tó.', gen: K4.landform },
    { id: 'regions', sample: 'Alföld · Mátra', name: 'Hazánk nagytájai', desc: 'A hat nagytáj és jellemző tájaik.', gen: K4.regions },
    { id: 'country', sample: '🇭🇺', name: 'Magyarország', desc: 'Szomszédos országok, megyék és megyeszékhelyek.', gen: K4.country },
    { id: 'terkep', sample: '🗺️ 📍', name: 'Térképes kalandok', desc: 'Koppints a térképre: szomszédok, nevezetes helyek.', gen: K4.terkep },
    { id: 'megyek', sample: '19 megye', name: 'Megyék a térképen', desc: 'Keresd meg a megyéket, székhelyeket és városokat!', gen: K4.megyek },
    { id: 'tajak', sample: 'Alpokalja · Hortobágy', name: 'Tájak és nevezetességek', desc: 'Alpokalja, Őrség, Tokaj, Aggtelek, nemzeti parkok…', gen: K4.tajak },
    { id: 'hidak', sample: '🌉', name: 'Budapest hídjai', desc: 'A Duna-hidak sorrendje, története, érdekességei.', gen: K4.hidak }
  ]
};
