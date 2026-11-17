/* ===== Környezetismeret, 3. osztály (NAT 2020 kerettanterv) ===== */
// Reuses the grade-4 helpers (factQ, topicFrom, fromGroups, sortQ, labs, maps) from kornyezet-4.js and lab.js.
const K3 = {};
const easier = gen => L => gen(Math.max(1, L - 1));

/* Élő és élettelen, érzékszervek */
const LIVING = [
  [1, 'Melyik élőlény?', 'a fa', ['a kő', 'a felhő', 'az autó'], 'Az élőlény táplálkozik, lélegzik, növekszik és szaporodik.'],
  [1, 'Melyik élettelen?', 'a kő', ['a gomba', 'a kutya', 'a fű'], 'Az élettelen dolgok nem táplálkoznak, nem nőnek, nem szaporodnak.'],
  [1, 'Mivel állapítod meg, hogy a citrom savanyú?', 'a nyelvemmel', ['a fülemmel', 'a szememmel', 'az orrommal'], 'Az ízeket a nyelvünkkel érezzük.'],
  [1, 'Mivel állapítod meg, milyen színű a labda?', 'a szememmel', ['a nyelvemmel', 'a fülemmel', 'az orrommal'], 'A színeket a szemünkkel látjuk.'],
  [1, 'Mivel állapítod meg, hogy a fa kérge érdes?', 'a bőrömmel, tapintással', ['a fülemmel', 'az orrommal', 'a nyelvemmel'], 'A tapintás érzékszerve a bőr.'],
  [1, 'Mivel állapítod meg, hogy finom illata van a kenyérnek?', 'az orrommal', ['a fülemmel', 'a szememmel', 'a bőrömmel'], 'A szaglás érzékszerve az orr.'],
  [2, 'Melyik NEM életjelenség?', 'a rozsdásodás', ['a táplálkozás', 'a növekedés', 'a szaporodás'], 'Életjelenségek: táplálkozás, légzés, növekedés, szaporodás, mozgás.'],
  [2, 'Mi kell minden élőlénynek az élethez?', 'víz, levegő, táplálék', ['csak napfény', 'csak kő', 'semmi'], 'Ezek az életfeltételek. A zöld növényeknek fény is kell.'],
  [2, 'Melyik tulajdonság mérhető?', 'a tömeg', ['az íz', 'az illat', 'a szépség'], 'Mérhető: hosszúság, tömeg, űrtartalom, hőmérséklet, idő.'],
  [2, 'Melyik tulajdonságot NEM tudjuk mérőeszközzel megmérni?', 'az illatot', ['a hosszúságot', 'a tömeget', 'a hőmérsékletet'], 'Az illatot csak érzékeljük, mérőszámmal nem adjuk meg.'],
  [3, 'Mi a különbség a növény és az állat táplálkozása között?', 'a zöld növény maga készíti a táplálékát, az állat másból táplálkozik', ['nincs különbség', 'a növény nem táplálkozik', 'az állat napfényből készít táplálékot'], 'A zöld növény a napfény segítségével táplálékot készít.'],
  [3, 'Melyik testrésze van a madárnak, de a halnak nincs?', 'szárny', ['szem', 'száj', 'farok'], 'A madár testét toll borítja, két lába és két szárnya van.']
];
const LIVE_SORT = L => sortQ('Élő vagy élettelen? Válogasd szét!', { 'élő': [['fa', '🌳'], ['gomba', '🍄'], ['kutya', '🐕'], ['virág', '🌷'], ['hal', '🐟'], ['katica', '🐞']], 'élettelen': [['kő', '🪨'], ['felhő', '☁️'], ['autó', '🚗'], ['víz', '💧'], ['labda', '⚽'], ['ház', '🏠']] }, L === 1 ? 2 : 3, { hint: 'Az élőlény táplálkozik, lélegzik, növekszik és szaporodik.' });
K3.elo = topicFrom(LIVING, { 1: [LIVE_SORT], 2: [LIVE_SORT], 3: [LIVE_SORT] });

/* Mérés */
K3.meres = L => { const r = Math.random(); if (L === 3 && r < .4) return K4.measure(3); return r < .55 ? factQ(pick(MORE.measure.filter(f => f[0] === Math.min(L, 2)))) : K4.measure(L === 3 ? 2 : 1); };

/* A víz */
const WATER3 = [
  [1, 'Milyen halmazállapotú a jég?', 'szilárd', ['folyékony', 'légnemű'], 'Jég: szilárd. Víz: folyékony. Vízgőz: légnemű.'],
  [1, 'Milyen halmazállapotú a vízgőz?', 'légnemű', ['szilárd', 'folyékony'], 'Jég: szilárd. Víz: folyékony. Vízgőz: légnemű.'],
  [1, 'Hogyan takarékoskodhatsz a vízzel?', 'zuhanyzom fürdés helyett', ['folyatom a csapot', 'naponta kétszer kádban fürdök', 'nyitva hagyom a csapot'], 'A zuhanyzás sokkal kevesebb vizet használ, mint a kádfürdő.'],
  [2, 'Melyik két folyamat ellentétes egymással?', 'a párolgás és a lecsapódás', ['az olvadás és a párolgás', 'a fagyás és a lecsapódás', 'a forrás és a párolgás'], 'Párolgás: folyadékból gőz. Lecsapódás: gőzből folyadék.'],
  [2, 'Mi történik a vízzel a víz körforgásában, amikor a Nap melegíti a tengert?', 'elpárolog', ['megfagy', 'eltűnik örökre', 'kővé válik'], 'A víz elpárolog, felhő lesz belőle, majd csapadékként visszahull.'],
  [2, 'Miből lesz a felhő?', 'apró vízcseppekből és jégkristályokból', ['füstből', 'vattából', 'porból'], 'A felszálló pára a magasban lehűl, és apró cseppekké csapódik le.'],
  [3, 'Miért kell vigyázni az ivóvízre?', 'mert a Föld vizének csak kis része iható édesvíz', ['mert a víz sosem fogy el', 'mert a víz drága festék', 'nem kell rá vigyázni'], 'A Föld vizének legnagyobb része sós tengervíz.'],
  [3, 'Milyen víz van a tengerekben?', 'sós víz', ['édesvíz', 'ásványvíz', 'esővíz'], 'A tengerek és óceánok vize sós; a folyók és a legtöbb tó vize édesvíz.']
];
const cycleBuild = () => { const b = RIVER_BUILDS[1]; return { type: 'build', prompt: b.prompt, answer: b.answer, tiles: shuffle(b.answer), hint: b.hint, explain: b.answer.join(' → ') }; };
K3.viz = topicFrom(WATER3, { 1: [() => SORTS.state(1), () => heatLab(1)], 2: [() => heatLab(2), cycleBuild, () => K4.state(2)], 3: [cycleBuild, () => heatLab(3), () => K4.state(2)] });

/* A különleges víz: keverékek, oldatok, változások */
const MIX = [
  [1, 'Mi történik a cukorral, ha a teába keverjük?', 'feloldódik', ['leülepszik', 'a tetején úszik', 'megfagy'], 'A cukor oldódik a vízben, ezért édes lesz a tea.'],
  [1, 'Milyen víz van a Balatonban?', 'édesvíz', ['sós víz', 'tengervíz', 'gyógyvíz'], 'A tavaink és folyóink vize édesvíz, a tengereké sós.'],
  [2, 'Melyik oldat?', 'sós víz', ['homokos víz', 'olajos víz', 'kavicsos víz'], 'Az oldatban az anyag teljesen eloszlik, nem látszanak a szemcséi.'],
  [2, 'Melyik változás fordítható vissza?', 'a jég olvadása', ['a fa elégése', 'a kenyér megsütése', 'a tojás megfőzése'], 'Az olvadt jég újra megfagyasztható, de az elégett fát nem kapjuk vissza.'],
  [2, 'Melyik változás NEM fordítható vissza?', 'a papír elégése', ['a víz megfagyása', 'a jég olvadása', 'a só feloldása'], 'Égés után az anyag nem kapható vissza.'],
  [3, 'Hogyan kaphatod vissza a sót a sós vízből?', 'hagyom elpárologni a vizet', ['lefagyasztom', 'megkeverem', 'szűrőn átöntöm'], 'Ha a víz elpárolog, a só kristályai a tál alján maradnak.'],
  [3, 'Miért fagy be később a tenger, mint egy tó?', 'mert a sós víz alacsonyabb hőmérsékleten fagy meg', ['mert a tenger mindig meleg', 'mert a tengerben sok hal van', 'mert a tenger nem víz'], 'Az édesvíz 0 °C-on fagy meg, a sós víz csak hidegebben.'],
  [3, 'Hogyan választhatod szét a homokot és a vizet?', 'szűréssel', ['keveréssel', 'rázással', 'sehogy'], 'A szűrőpapíron a víz átfolyik, a homok fennmarad.']
];
K3.oldat = topicFrom(MIX, { 1: [() => dissolveLab(1), () => floatLab(1)], 2: [() => dissolveLab(2), () => floatLab(2)], 3: [() => dissolveLab(3)] });

/* Mágnesesség */
const MAGNET = [
  [1, 'Mit vonz a mágnes?', 'a vasszöget', ['a fakanalat', 'a papírt', 'a műanyag poharat'], 'A mágnes a vasat és az acélt vonzza.'],
  [1, 'Melyiket NEM vonzza a mágnes?', 'a radírt', ['a gemkapcsot', 'a vasszöget', 'a vascsavart'], 'A mágnes a vasat és az acélt vonzza, a fát, a papírt, a műanyagot nem.'],
  [1, 'Merre mutat az iránytű tűje?', 'észak felé', ['mindig felém', 'kelet felé', 'mindig lefelé'], 'Az iránytű tűje egy kis mágnes, amely észak felé fordul.'],
  [2, 'Mit tesz két mágnes, ha azonos pólusukat (északit az északihoz) közelítjük?', 'taszítják egymást', ['vonzzák egymást', 'összeolvadnak', 'semmi sem történik'], 'Azonos pólusok taszítják, különböző pólusok vonzzák egymást.'],
  [2, 'Mit tesz két mágnes, ha az egyik északi pólusát a másik déli pólusához közelítjük?', 'vonzzák egymást', ['taszítják egymást', 'elolvadnak', 'semmi sem történik'], 'Különböző pólusok vonzzák egymást.'],
  [2, 'Miért fordul az iránytű tűje mindig észak felé?', 'mert a Föld is egy hatalmas mágnes', ['mert ott süt a Nap', 'mert arra fúj a szél', 'mert a tű nehéz'], 'A Föld mágnesessége fordítja észak felé a mágnestűt.'],
  [2, 'Kiknek segített régen sokat az iránytű?', 'a tengerészeknek', ['a pékeknek', 'a kertészeknek', 'a fodrászoknak'], 'A nyílt tengeren nincs mihez igazodni, az iránytűvel mégis tartották az irányt.'],
  [3, 'Hol a legerősebb a rúdmágnes?', 'a két végén, a pólusoknál', ['a közepén', 'mindenhol ugyanolyan', 'sehol'], 'A mágnes két végét pólusnak hívjuk: északi és déli pólus.'],
  [3, 'Vonzza-e a mágnes a vasszöget egy vékony papírlapon keresztül?', 'igen', ['nem', 'csak vízben', 'csak éjszaka'], 'A mágnes hatása átjut a papíron, a fán és a vízen is.'],
  [3, 'Vonzza-e a mágnes az alumínium üdítősdobozt?', 'nem', ['igen', 'csak ha üres', 'csak ha hideg'], 'Az alumínium fém, de nem vonzza a mágnes. Csak a vasat és az acélt vonzza.']
];
const MAG_SORT = L => sortQ('Vonzza a mágnes vagy nem? Válogasd szét!', { 'vonzza': ['vasszög', 'gemkapocs', 'vascsavar', 'acél olló', 'biztosítótű'], 'nem vonzza': ['fakanál', 'papír', 'radír', 'üvegpohár', 'alumíniumdoboz', 'műanyag vonalzó'] }, L === 1 ? 2 : 3, { hint: 'A mágnes a vasból és acélból készült tárgyakat vonzza. Az alumíniumot, a fát, a papírt és a műanyagot nem.' });
K3.magnes = topicFrom(MAGNET, { 1: [MAG_SORT], 2: [MAG_SORT], 3: [MAG_SORT] });

/* Mérd meg az időt! (óraolvasás, időmérők) */
const pad2c = n => String(n).padStart(2, '0');
const clockRead = L => {
  const hh = ri(1, 12), mm = L === 1 ? pick([0, 30]) : L === 2 ? pick([0, 15, 30, 45, 5, 10, 20, 25, 35, 40, 50, 55]) : ri(0, 59), ans = `${hh}:${pad2c(mm)}`;
  const o = new Set([ans]); o.add(`${mm === 0 ? 12 : Math.max(1, Math.round(mm / 5))}:${pad2c(hh * 5 % 60)}`); o.add(`${hh % 12 + 1}:${pad2c(mm)}`); o.add(`${hh}:${pad2c((mm + (L === 3 ? 5 : 30)) % 60)}`);
  while (o.size < 4) o.add(`${ri(1, 12)}:${pad2c(L === 1 ? pick([0, 30]) : ri(0, 11) * 5)}`);
  return mcq('Hány óra van? Válaszd ki a digitális órát!', ans, [...o].filter(x => x !== ans).slice(0, 3), { visual: clockSvg(hh, mm, 190), fmt: v => v, hint: 'A rövid mutató az órát, a hosszú mutató a percet mutatja. A hosszú mutató minden számnál 5 percet lép.' });
};
const TIMEF = [
  [1, 'Hány perc egy óra?', '60', ['100', '30', '24'], '1 óra = 60 perc.'],
  [1, 'Hány óra egy nap?', '24', ['12', '60', '7'], '1 nap = 24 óra.'],
  [1, 'Melyik mutató mutatja a perceket?', 'a hosszú mutató', ['a rövid mutató', 'egyik sem', 'a számlap'], 'Rövid mutató: óra. Hosszú mutató: perc.'],
  [2, 'Mivel mérték az időt régen, ha sütött a Nap?', 'napórával', ['homokórával', 'karórával', 'stopperrel'], 'A napóra a pálca árnyékával mutatja az időt.'],
  [2, 'Mikor nem működik a napóra?', 'éjszaka és borús időben', ['nyáron', 'délben', 'soha nem működik'], 'A napórához napfény kell, hogy árnyék legyen.'],
  [2, 'Hogyan mér időt a homokóra?', 'a homok egyenletesen lepereg egyik feléből a másikba', ['csörög', 'világít', 'mutatója van'], 'Ha lepergett, letelt a kimért idő.'],
  [2, 'Hány másodperc egy perc?', '60', ['100', '10', '24'], '1 perc = 60 másodperc.'],
  [3, 'Mit jelent, hogy háromnegyed 5?', '4 óra 45 perc', ['5 óra 45 perc', '3 óra 45 perc', '5 óra 15 perc'], 'Háromnegyed 5: még negyed óra van 5 óráig.'],
  [3, 'Mit jelent, hogy fél 8?', '7 óra 30 perc', ['8 óra 30 perc', '8 óra 15 perc', '7 óra 15 perc'], 'Fél 8: félúton vagyunk 7 és 8 óra között.'],
  [3, 'Mit jelent, hogy negyed 10?', '9 óra 15 perc', ['10 óra 15 perc', '9 óra 45 perc', '10 óra 25 perc'], 'Negyed 10: 9 óra után negyed órával.']
];
K3.ora = topicFrom(TIMEF, { 1: [clockRead, clockRead, clockRead], 2: [clockRead, clockRead, clockRead], 3: [clockRead, clockRead] });

/* Napok, hónapok, évszakok, kalendárium */
const CAL = [
  [1, 'Melyik évszakban van húsvét?', 'tavasszal', ['nyáron', 'ősszel', 'télen'], 'Húsvétkor a tavasz érkezését is ünnepeljük.'],
  [1, 'Melyik évszakban van a szüret?', 'ősszel', ['tavasszal', 'nyáron', 'télen'], 'Ősszel szedik le a szőlőt.'],
  [1, 'Melyik nap jön a szerda után?', 'csütörtök', ['kedd', 'péntek', 'vasárnap'], 'Hétfő, kedd, szerda, csütörtök, péntek, szombat, vasárnap.'],
  [1, 'Melyik napszak van, amikor felkel a Nap?', 'reggel', ['este', 'éjszaka', 'délután'], 'Reggel, délelőtt, dél, délután, este, éjszaka.'],
  [2, 'Melyik napon ünnepeljük a Föld napját?', 'április 22-én', ['december 24-én', 'március 15-én', 'augusztus 20-án'], 'Ezen a napon a bolygónk védelmére figyelünk.'],
  [2, 'Mikor van a madarak és fák napja?', 'május 10-én', ['január 1-jén', 'október 23-án', 'november 11-én'], 'Ilyenkor madárodúkat készítünk, fát ültetünk.'],
  [2, 'Mikor van a víz világnapja?', 'március 22-én', ['július 1-jén', 'december 6-án', 'november 1-jén'], 'A tiszta víz fontosságára hívja fel a figyelmet.'],
  [2, 'Mikor van az állatok világnapja?', 'október 4-én', ['április 1-jén', 'május 1-jén', 'december 31-én'], 'Ezen a napon az állatok védelmére figyelünk.'],
  [2, 'Melyik ünnephez tartozik a télbúcsúztató jelmezes mulatság?', 'a farsanghoz', ['a szürethez', 'a húsvéthoz', 'a karácsonyhoz'], 'A mohácsi busójárás is farsangi szokás.'],
  [3, 'Melyik napon esznek hagyományosan libát?', 'Márton-napon (november 11.)', ['húsvétkor', 'Szent Iván-éjjel', 'farsangkor'], 'Aki Márton-napon libát eszik, egész évben jóllakik, tartja a mondás.'],
  [3, 'Mit ültetnek Luca-napon (december 13.) egy tányérba, hogy karácsonyra kizöldelljen?', 'búzát', ['krumplit', 'almafát', 'tulipánt'], 'A Luca-búza az újjászülető természetet jelképezi.'],
  [3, 'Mikor ugrálják át hagyományosan a tüzet, a nyári napforduló idején?', 'Szent Iván éjjelén (június 24. körül)', ['karácsonykor', 'Luca-napon', 'Márton-napon'], 'Ez az év egyik legrövidebb éjszakája.'],
  [3, 'Augusztus 20-án az államalapítás mellett melyiket ünnepeljük?', 'az új kenyeret', ['az első hóesést', 'a szüretet', 'a tavasz kezdetét'], 'Nyáron aratnak, az új búzából sütik az első kenyeret.']
];
const WEEKDAYS = ['hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat', 'vasárnap'];
const daysBuild = () => { const st = ri(0, 6), ans = Array.from({ length: 4 }, (_, i) => WEEKDAYS[(st + i) % 7]); return { type: 'build', prompt: 'Rakd sorba a hét napjait! Koppints rájuk sorban.', answer: ans, tiles: shuffle(ans), hint: WEEKDAYS.join(', ') + '.', explain: ans.join(' → ') }; };
const partsBuild = () => { const ans = ['reggel', 'délelőtt', 'délután', 'este']; return { type: 'build', prompt: 'Rakd sorba a napszakokat! Koppints rájuk sorban.', answer: ans, tiles: shuffle(ans), hint: 'Reggel, délelőtt, dél, délután, este, éjszaka.', explain: ans.join(' → ') }; };
K3.naptar = topicFrom(CAL, { 1: [daysBuild, partsBuild, seasonOf, () => monthsBuild(1)], 2: [monthAfter, seasonOf, lifeBuild], 3: [lifeBuild, monthDays] });

/* Föld, Nap, Hold */
const EARTH3 = [
  [1, 'Mi okozza, hogy váltakozik a nappal és az éjszaka?', 'a Föld forog a tengelye körül', ['a Nap éjszakára kialszik', 'a felhők eltakarják a Napot', 'a Hold eltakarja a Napot'], 'A Földnek mindig az a fele van nappalban, amelyik a Nap felé néz.'],
  [2, 'Ha nálunk dél van, mi van a Föld túlsó oldalán?', 'éjszaka', ['szintén dél', 'reggel 8 óra', 'nincs semmi'], 'Ezért van az, hogy a Föld különböző helyein más-más az idő (időzónák).'],
  [2, 'Miért nem ugyanannyi az idő a világ minden pontján?', 'mert a Föld forog, és mindig csak egyik felét éri a napfény', ['mert az órák rosszak', 'mert máshol lassabban telik a nap', 'mert a Hold zavarja'], 'A Földet időzónákra osztották.']
];
K3.egitest = L => Math.random() < .25 ? factQ(pick(EARTH3.filter(f => f[0] <= Math.max(1, L)))) : L === 3 && Math.random() < .3 ? moonQ() : K4.fold(Math.min(L, 2));

/* Lakóhelyünk, közlekedés */
const TOWN = [
  [1, 'Mi Magyarország fővárosa?', 'Budapest', ['Debrecen', 'Szeged', 'Pécs'], 'A főváros a Duna két partján fekszik.'],
  [1, 'Hogy hívjuk a kisebb, falusi települést?', 'község (falu)', ['főváros', 'nagyváros', 'megye'], 'Települések: főváros, város, község (falu), tanya.'],
  [1, 'Mi a tanya?', 'egy-egy ház gazdasági épületekkel, a falvaktól távol', ['egy nagy bevásárlóközpont', 'a város közepe', 'egy hegycsúcs'], 'Tanyák főleg az Alföldön vannak.'],
  [2, 'Hogy hívjuk a város legrégebbi, központi részét?', 'belváros', ['kertváros', 'külváros', 'tanya'], 'A belvárosban vannak a fontos hivatalok, templomok, üzletek.'],
  [2, 'Hogy hívjuk a családi házas, kertes városrészt?', 'kertváros', ['belváros', 'ipari negyed', 'tanya'], 'A kertvárosban kertes családi házak állnak.'],
  [2, 'Melyik a környezetkímélőbb közlekedés?', 'busszal menni sok emberrel együtt', ['mindenki külön autóval megy', 'üresen járatni a motort', 'repülővel menni a szomszéd utcába'], 'A tömegközlekedés, a kerékpár és a gyaloglás kevésbé szennyezi a levegőt.'],
  [3, 'Mi az agglomeráció?', 'egy nagyváros körüli települések, amelyek szorosan kapcsolódnak hozzá', ['a város legmagasabb háza', 'egy hegység neve', 'egy folyó torkolata'], 'Sokan a környező településekről járnak be dolgozni a nagyvárosba.'],
  [3, 'Mit tudsz meg a menetrendből?', 'mikor indul és érkezik a busz vagy a vonat', ['milyen idő lesz holnap', 'mennyibe kerül a kenyér', 'merre van észak'], 'Utazás előtt érdemes megnézni a menetrendet.']
];
const TRANSPORT_SORT = L => sortQ('Szárazföldi, vízi vagy légi közlekedés? Válogasd szét!', { 'szárazföldi': [['vonat', '🚆'], ['busz', '🚌'], ['villamos', '🚋'], ['kerékpár', '🚲'], ['autó', '🚗']], 'vízi': [['hajó', '🚢'], ['komp', '⛴️'], ['csónak', '🛶']], 'légi': [['repülőgép', '✈️'], ['helikopter', '🚁'], ['hőlégballon', '🎈']] }, L === 1 ? 1 : 2, { hint: 'Szárazföldön: utakon, síneken. Vízen: folyón, tavon, tengeren. Levegőben: repülve.' });
K3.lakohely = topicFrom(TOWN, { 1: [TRANSPORT_SORT], 2: [TRANSPORT_SORT], 3: [TRANSPORT_SORT] });

/* Világtájak és térkép */
K3.vilagtaj = L => { const r = Math.random(); if (L === 1) return r < .35 ? K4.compass(1) : r < .55 ? LABELS.compass4() : r < .75 ? compassSet(1) : factQ(pick(MAP_FACTS.filter(f => f[0] === 1))); if (L === 2) return r < .3 ? K4.compass(2) : r < .5 ? LABELS.compassX() : r < .7 ? symQ() : factQ(pick(MAP_FACTS.filter(f => f[0] === 1))); return r < .3 ? K4.compass(3) : r < .5 ? colorQ() : r < .7 ? symQ() : factQ(pick(MAP_FACTS)); };

/* Budapest */
const BP = [
  [1, 'Melyik folyó folyik át Budapesten?', 'a Duna', ['a Tisza', 'a Rába', 'a Dráva'], 'A Duna osztja ketté a várost.'],
  [1, 'A Duna melyik partján van Buda, ahol a Várhegy áll?', 'a nyugati (jobb) partján', ['a keleti (bal) partján', 'a Margit-szigeten', 'a Csepel-szigeten'], 'Buda dombos, Pest sík terület.'],
  [1, 'Hol ülésezik az Országgyűlés Budapesten?', 'az Országházban (Parlamentben)', ['a Halászbástyán', 'a Hősök terén', 'a Margit-szigeten'], 'Az Országház a Duna pesti partján áll.'],
  [1, 'Melyik sziget van Budapesten a Duna közepén, nagy parkkal?', 'a Margit-sziget', ['a Tihanyi-félsziget', 'a Szigetköz', 'a Szentendrei-sziget'], 'A Margit híd és az Árpád híd is érinti.'],
  [2, 'Mikor egyesült Buda, Pest és Óbuda Budapestté?', '1873-ban', ['1000-ben', '1848-ban', '1956-ban'], 'Azóta hívjuk a fővárost Budapestnek.'],
  [2, 'Hány kerülete van Budapestnek?', '23', ['10', '19', '50'], 'A kerületeket római számokkal jelöljük.'],
  [2, 'Melyik budai nevezetesség?', 'a Halászbástya', ['az Országház', 'a Hősök tere', 'a Szent István-bazilika'], 'A Halászbástya és a Mátyás-templom a budai Várnegyedben van.'],
  [2, 'Melyik hegyen áll a Szabadság-szobor?', 'a Gellért-hegyen', ['a Kékesen', 'a Várhegyen', 'a Mecseken'], 'A Gellért-hegyről szép kilátás nyílik a városra.'],
  [3, 'Melyik pesti nevezetesség?', 'a Hősök tere', ['a Halászbástya', 'a Budai Vár', 'a Mátyás-templom'], 'A Hősök tere a Városliget bejáratánál van.'],
  [3, 'Mire volt büszke Budapest 1896-ban?', 'az európai kontinens első földalatti vasútjára', ['az első repülőtérre', 'a világ legmagasabb házára', 'az első autópályára'], 'A kisföldalatti (M1) ma is jár az Andrássy út alatt.'],
  [3, 'Hogy hívjuk Budapest két legnagyobb szigetét?', 'Csepel-sziget és Margit-sziget', ['Szigetköz és Tihany', 'Hanság és Csepel', 'Margit-sziget és Szigetköz'], 'A Csepel-sziget a déli, a Margit-sziget a belső városrészben van.']
];
K3.budapest = topicFrom(BP, { 2: [() => brHl(1)], 3: [() => brHl(1)] });

/* Gyümölcsök, zöldségek, gyógy- és fűszernövények; a kenyér */
const HERBS = [
  [1, 'Melyik növényből főzünk teát hasfájás vagy megfázás ellen?', 'kamilla', ['pipacs', 'nárcisz', 'búza'], 'A kamilla virágából gyógyteát készítünk.'],
  [1, 'Melyik fűszernövény zöld levelét szórjuk a levesbe?', 'petrezselyem', ['tulipán', 'tölgy', 'napraforgó'], 'A petrezselyem gyökerét és levelét is esszük.'],
  [1, 'Melyik részét esszük a répának?', 'a gyökerét', ['a levelét', 'a virágát', 'a termését'], 'A répa a föld alatt nő.'],
  [1, 'Melyik részét esszük az almának?', 'a termését', ['a gyökerét', 'a szárát', 'a levelét'], 'A termés a virágból fejlődik.'],
  [2, 'Melyik gyógynövény termésében van sok C-vitamin?', 'csipkebogyó', ['pipacs', 'gyermekláncfű', 'kamilla'], 'A csipkebogyóból teát és lekvárt is készítenek.'],
  [2, 'Melyik fa virágából készül megfázás elleni tea?', 'hársfa', ['tölgyfa', 'fenyőfa', 'diófa'], 'A hárs nyár elején virágzik, illata messzire érződik.'],
  [2, 'Melyik fűszer híres Szegedről és Kalocsáról?', 'a pirospaprika', ['a fahéj', 'a bors', 'a vanília'], 'A fűszerpaprika hungarikum.'],
  [2, 'Mi történik a lehullott levelekkel és a konyhai növényi hulladékkal a komposztban?', 'lebomlanak, és értékes földdé válnak', ['kővé válnak', 'műanyaggá válnak', 'eltűnnek nyom nélkül'], 'A lebontók (gombák, giliszták) végzik el ezt a munkát.'],
  [3, 'Melyik NEM gyógynövény?', 'a tulipán', ['a kamilla', 'a menta', 'a hárs'], 'Gyógynövény: kamilla, menta, citromfű, hárs, csipkebogyó, kakukkfű.'],
  [3, 'Mitől kel meg a kenyértészta?', 'az élesztőtől', ['a sótól', 'a víztől', 'a liszttől'], 'Az élesztő gázt termel, attól lesz a tészta laza és puha.']
];
const BREAD3 = () => { const ans = ['aratás', 'őrlés', 'dagasztás', 'sütés']; return { type: 'build', prompt: 'Hogyan lesz a búzából kenyér? Rakd sorba! Koppints rájuk sorban.', answer: ans, tiles: shuffle(ans), hint: 'Learatják a búzát, a malomban megőrlik lisztté, a pék megdagasztja a tésztát, végül kisüti.', explain: ans.join(' → ') }; };
const HERB_SORT = L => sortQ('Gyógynövény vagy fűszernövény? Válogasd szét!', { 'gyógynövény (tea)': ['kamilla', 'hárs', 'csipkebogyó', 'citromfű'], 'fűszernövény': ['petrezselyem', 'kapor', 'bazsalikom', 'majoránna'] }, 2, { hint: 'A gyógynövényekből főleg teát főzünk. A fűszernövényekkel az ételt ízesítjük.' });
K3.noveny = topicFrom(HERBS, { 1: [() => LABELS.plant(), () => K4.plant(1)], 2: [BREAD3, HERB_SORT, () => SORTS.edible(2)], 3: [BREAD3, HERB_SORT, () => K4.plant(3)] });

/* Háziállatok, vadon élő állatok */
K3.allat = L => { const r = Math.random(); if (r < .3) return youngItem(); if (r < .5) return productItem(); if (r < .65) return FARM_SORT(1); return K4.animal(L === 3 ? 2 : 1); };

/* Erdő, mező, vízpart */
const FOREST = [
  [1, 'Melyik állat él az erdőben?', 'az őz', ['a ponty', 'a tehén', 'a teve'], 'Az erdő lakói: őz, szarvas, vaddisznó, róka, mókus, harkály.'],
  [1, 'Melyik növény nő a vízparton?', 'a nád', ['a kaktusz', 'a búza', 'a fenyő'], 'A vízpart növényei: nád, gyékény, sás, fűz.'],
  [2, 'Melyik az erdő legfelső szintje?', 'a lombkoronaszint', ['a cserjeszint', 'a gyepszint', 'a mohaszint'], 'Felülről lefelé: lombkoronaszint, cserjeszint, gyepszint, mohaszint.'],
  [2, 'Mi a mesterséges életközösség?', 'amit az ember hozott létre és gondoz, például a park', ['az ősi erdő', 'a vadon élő tó', 'a hegyi rét'], 'Természetes: erdő, mező, vízpart. Mesterséges: park, kert, gyümölcsös, szántóföld.'],
  [3, 'Miért van az őznek és a nyúlnak szemben a halnak más testfelépítése?', 'mert más az élőhelyük és az életmódjuk', ['mert más a színük', 'véletlenül', 'mert más a nevük'], 'Az élőlények testfelépítése az élőhelyükhöz alkalmazkodott.']
];
const layersBuild = () => { const ans = ['lombkoronaszint', 'cserjeszint', 'gyepszint', 'mohaszint']; return { type: 'build', prompt: 'Rakd sorba az erdő szintjeit felülről lefelé! Koppints rájuk sorban.', answer: ans, tiles: shuffle(ans), hint: 'Legfelül a fák lombja, alatta a bokrok, aztán a fű és a virágok, legalul a moha.', explain: ans.join(' → ') }; };
K3.eletkoz = topicFrom(FOREST, { 1: [() => K4.habitat(1), () => SORTS.habitat(1)], 2: [() => K4.habitat(2), layersBuild], 3: [layersBuild, () => K4.habitat(3)] });

/* Testünk, egészségünk */
const REST_SORT = L => sortQ('Aktív vagy passzív pihenés? Válogasd szét!', { 'aktív pihenés': ['kirándulás', 'biciklizés', 'labdázás', 'úszás', 'táncolás'], 'passzív pihenés': ['alvás', 'olvasás', 'zenehallgatás', 'pihenés a kanapén'] }, L === 1 ? 2 : 3, { hint: 'Aktív pihenés: mozgással pihenünk. Passzív pihenés: nyugalomban pihenünk.' });
K3.test = L => { const r = Math.random(); if (r < .2) return REST_SORT(L); if (r < .55) return K4.body(1); return K4.health(Math.min(L, 2)); };

/* Válogató és Ki vagyok én? a 3. osztálynak */
const SORTS3 = [LIVE_SORT, MAG_SORT, TRANSPORT_SORT, REST_SORT, HERB_SORT, L => SORTS.state(L), L => SORTS.light(L), L => SORTS.water(L)];
K3.sorter = L => pick(SORTS3)(L);
K3.ki = L => { const pool = RIDDLES.filter(r => (L === 1 ? ['állat', 'növény'] : ['állat', 'növény', 'test', 'jelenség']).includes(r[0])); const [, cl, a, w] = pick(pool); return riddleQ(cl, a, w); };

/* item-based questions to give every topic enough variety */
const liveItem = fromGroups({ 'élő': [['fa', '🌳'], ['gomba', '🍄'], ['kutya', '🐕'], ['virág', '🌷'], ['hal', '🐟'], ['katica', '🐞'], ['fű', '🌱'], ['ember', '🧒'], ['madár', '🐦']], 'élettelen': [['kő', '🪨'], ['felhő', '☁️'], ['autó', '🚗'], ['víz', '💧'], ['labda', '⚽'], ['ház', '🏠'], ['homok', '⏳'], ['szék', '🪑']] },
  w => `Élő vagy élettelen: <b>${w}</b>?`, 'Az élőlény táplálkozik, lélegzik, növekszik és szaporodik.', { keep: true });
const SENSE = [['a citrom savanyú', 'a nyelvemmel (ízlelés)'], ['a cukor édes', 'a nyelvemmel (ízlelés)'], ['milyen színű az alma', 'a szememmel (látás)'], ['milyen alakú a felhő', 'a szememmel (látás)'], ['csörög a kulcscsomó', 'a fülemmel (hallás)'], ['énekel a madár', 'a fülemmel (hallás)'], ['illatos a rózsa', 'az orrommal (szaglás)'], ['füstszag van', 'az orrommal (szaglás)'], ['sima az üveg', 'a bőrömmel (tapintás)'], ['hideg a jégkocka', 'a bőrömmel (tapintás)']];
const senseItem = () => { const [w, a] = pick(SENSE); return mcq(`Mivel érzékeled, hogy ${w}?`, a, ['a nyelvemmel (ízlelés)', 'a szememmel (látás)', 'a fülemmel (hallás)', 'az orrommal (szaglás)', 'a bőrömmel (tapintás)'].filter(x => x !== a).sort(() => Math.random() - .5).slice(0, 3), { fmt: v => v, hint: 'Szem: látás. Fül: hallás. Orr: szaglás. Nyelv: ízlelés. Bőr: tapintás.' }); };
const magnetItem = fromGroups({ 'igen, vonzza': ['vasszög', 'gemkapocs', 'vascsavar', 'acél olló', 'biztosítótű', 'vasreszelék'], 'nem vonzza': ['fakanál', 'papír', 'radír', 'üvegpohár', 'alumíniumdoboz', 'műanyag vonalzó', 'gumilabda'] },
  w => `Vonzza a mágnes: <b>${w}</b>?`, 'A mágnes a vasat és az acélt vonzza. A fát, a papírt, a műanyagot, az üveget és az alumíniumot nem.', { keep: true });
const transportItem = fromGroups({ 'szárazföldön': [['vonat', '🚆'], ['busz', '🚌'], ['villamos', '🚋'], ['kerékpár', '🚲'], ['autó', '🚗'], ['metró', '🚇'], ['traktor', '🚜']], 'vízen': [['hajó', '🚢'], ['komp', '⛴️'], ['csónak', '🛶'], ['vitorlás', '⛵']], 'levegőben': [['repülőgép', '✈️'], ['helikopter', '🚁'], ['hőlégballon', '🎈']] },
  w => `Hol közlekedik ${artOf(w)} <b>${w}</b>?`, 'Szárazföldön: utakon, síneken. Vízen: folyón, tavon, tengeren. Levegőben: repülve.', { keep: true });
const bpItem = fromGroups({ 'Budán': ['a Budai Vár', 'a Halászbástya', 'a Mátyás-templom', 'a Gellért-hegy', 'a Citadella'], 'Pesten': ['az Országház', 'a Szent István-bazilika', 'a Hősök tere', 'a Városliget', 'az Operaház', 'az Andrássy út'] },
  w => `Budán vagy Pesten van ${w}?`, 'Buda a Duna nyugati, dombos partján van (Vár, Gellért-hegy). Pest a keleti, sík parton (Országház, Hősök tere).', { keep: true });
TOWN.push(
  [1, 'Melyik szárazföldi közlekedési eszköz?', 'a villamos', ['a komp', 'a helikopter', 'a vitorlás'], 'A villamos síneken jár a városban.'],
  [1, 'Mivel lehet a legkörnyezetkímélőbben iskolába menni a közeli lakásból?', 'gyalog vagy kerékpárral', ['taxival', 'helikopterrel', 'motorcsónakkal'], 'Ez nem szennyezi a levegőt, és egészséges is.'],
  [2, 'Hogy hívjuk a város szélén lévő városrészt?', 'külváros', ['belváros', 'városközpont', 'tanya'], 'A külváros a város szélén van, gyakran ott vannak a gyárak és a raktárak.'],
  [2, 'Melyik vízi közlekedési eszköz visz át autókat is a folyón, ahol nincs híd?', 'a komp', ['a metró', 'a villamos', 'a helikopter'], 'A komp folyón vagy tavon szállít embereket és járműveket.']);
BP.push([1, 'Melyik a legrégebbi budapesti Duna-híd?', 'a Lánchíd', ['a Megyeri híd', 'a Petőfi híd', 'a Rákóczi híd'], '1849-ben adták át, kőoroszlánok őrzik.'],
  [1, 'Melyik épületben őrzik a Szent Koronát?', 'az Országházban', ['a Halászbástyán', 'a Nagyvásárcsarnokban', 'a Hősök terén'], 'Az Országház a Duna pesti partján álló, nagy kupolás épület.']);
LIVING.push([2, 'Milyen életjelenség, amikor a kiscica egyre nagyobb lesz?', 'növekedés', ['szaporodás', 'táplálkozás', 'légzés'], 'Életjelenségek: táplálkozás, légzés, növekedés, szaporodás, mozgás.'],
  [3, 'Milyen életjelenség, amikor a növény magot hoz, és abból új növény lesz?', 'szaporodás', ['növekedés', 'légzés', 'mozgás'], 'Életjelenségek: táplálkozás, légzés, növekedés, szaporodás, mozgás.'],
  [3, 'Mi a közös a fában és a kutyában?', 'mindkettő élőlény: táplálkozik, nő, szaporodik', ['mindkettő tud futni', 'mindkettőnek van levele', 'semmi'], 'Az élőlények közös jellemzői az életjelenségek.']);
MAGNET.push([1, 'Miből készül a mágnes által vonzott gemkapocs?', 'acélból (vasból)', ['fából', 'műanyagból', 'papírból'], 'A mágnes a vasat és az acélt vonzza.']);
K3.elo = topicFrom(LIVING, { 1: [LIVE_SORT, liveItem, senseItem], 2: [LIVE_SORT, liveItem, senseItem], 3: [LIVE_SORT, senseItem] });
K3.magnes = topicFrom(MAGNET, { 1: [MAG_SORT, magnetItem, magnetItem], 2: [MAG_SORT, magnetItem, magnetItem], 3: [MAG_SORT, magnetItem] });
K3.lakohely = topicFrom(TOWN, { 1: [TRANSPORT_SORT, transportItem, transportItem], 2: [TRANSPORT_SORT, transportItem], 3: [TRANSPORT_SORT, transportItem] });
K3.budapest = topicFrom(BP, { 1: [bpItem], 2: [() => brHl(1), bpItem], 3: [() => brHl(1), bpItem] });
K3.viz = topicFrom(WATER3, { 1: [() => SORTS.state(1), () => heatLab(1), () => K4.state(1), () => K4.state(1)], 2: [() => heatLab(2), cycleBuild, () => K4.state(2)], 3: [cycleBuild, () => heatLab(3), () => K4.state(2)] });
SORTS3.push(L => SORTS.burn(L), L => SORTS.health(L), L => SORTS.habitat(L), L => FARM_SORT(L), L => MOVE_SORT(1), L => BIN_SORT(1), L => SORTS.edible(L));
PAGES['kornyezet-3'] = {
  id: 'kornyezet-3', title: 'Környezetismeret', grade: 3,
  blurb: 'Élő és élettelen, mérés, a víz és halmazállapotai, mágnesesség, az idő mérése és a naptár, Föld, Nap, Hold, lakóhelyünk és Budapest, világtájak, növények és állatok, életközösségek, egészségünk. Egy kör 10 feladat.',
  topics: [
    { id: 'sorter', sample: '🧺', name: 'Válogató', desc: 'Válogasd szét a kártyákat a kosarakba!', gen: K3.sorter },
    { id: 'ki', sample: '❓', name: 'Ki vagyok én?', desc: 'Találós kérdések: minél kevesebb tippből!', gen: K3.ki },
    { id: 'elo', sample: '🌳 🪨', name: 'Élő és élettelen', desc: 'Életjelenségek, érzékszervek, tulajdonságok.', gen: L => K3.elo(L) },
    { id: 'meres', sample: 'cm · kg · l', name: 'Mérés', desc: 'Mérőeszközök és mértékegységek.', gen: K3.meres },
    { id: 'viz', sample: '🧊 💧 ☁️', name: 'A víz', desc: 'Halmazállapotok, a víz körforgása, víztakarékosság.', gen: L => K3.viz(L) },
    { id: 'oldat', sample: '🧂 🥄', name: 'A különleges víz', desc: 'Oldatok, keverékek, visszafordítható változások.', gen: K3.oldat },
    { id: 'magnes', sample: '🧲', name: 'Mágnesesség', desc: 'Mit vonz a mágnes? Pólusok, iránytű.', gen: L => K3.magnes(L) },
    { id: 'ora', sample: '🕒', name: 'Mérd meg az időt!', desc: 'Óraolvasás, időmérő eszközök.', gen: K3.ora },
    { id: 'naptar', sample: '📅', name: 'Naptár és jeles napok', desc: 'Napok, hónapok, évszakok, ünnepek, életszakaszok.', gen: K3.naptar },
    { id: 'egitest', sample: '🌍 ☀️ 🌙', name: 'Föld, Nap, Hold', desc: 'Nappal és éjszaka, évszakok, holdfázisok.', gen: K3.egitest },
    { id: 'lakohely', sample: '🏘️ 🚌', name: 'Lakóhelyünk, közlekedés', desc: 'Település, városrészek, közlekedés.', gen: L => K3.lakohely(L) },
    { id: 'vilagtaj', sample: 'É · K · D · Ny', name: 'Világtájak és térkép', desc: 'Iránytű, alaprajz, térképjelek.', gen: K3.vilagtaj },
    { id: 'budapest', sample: '🏛️', name: 'Budapest, a fővárosunk', desc: 'Buda és Pest, nevezetességek, hidak.', gen: L => K3.budapest(L) },
    { id: 'noveny', sample: '🍎 🌿 🍞', name: 'Növények, gyógynövények', desc: 'Növényi részek, gyógy- és fűszernövények, a kenyér útja.', gen: K3.noveny },
    { id: 'allat', sample: '🐄 🦊', name: 'Háziállatok, vadállatok', desc: 'Háziállatok és kicsinyeik, állatcsoportok.', gen: K3.allat },
    { id: 'eletkoz', sample: '🌳 🌾 🌊', name: 'Erdő, mező, vízpart', desc: 'Életközösségek, az erdő szintjei.', gen: K3.eletkoz },
    { id: 'test', sample: '👁️ 🩺', name: 'Testünk, egészségünk', desc: 'Érzékszervek, egészséges életmód, pihenés.', gen: K3.test }
  ]
};
