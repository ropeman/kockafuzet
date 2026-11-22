/* ===== extra questions, so that repeated rounds stay fresh =====
   Loaded after all subject files: adds to their lists and wraps some topics' generators. */

const topicOf = (pid, tid) => PAGES[pid] && PAGES[pid].topics.find(t => t.id === tid);
// mix a list of [level, question, answer, wrongs, hint] facts into a topic; p = share of the new facts
function addFacts(pid, tid, facts, p = .5) {
  const t = topicOf(pid, tid); if (!t) return;
  const base = t.gen;
  t.gen = L => { const pool = facts.filter(f => f[0] === L); return pool.length && Math.random() < p ? factQ(pick(pool)) : base(L); };
}
function setGen(pid, tid, gen) { const t = topicOf(pid, tid); if (t) t.gen = gen; }

/* ---------- reading comprehension: more texts, and up to three questions per text ---------- */
// level 1: the first questions, level 3: the last (harder) ones, level 2: any
const compPick = (t, L) => { const n = t.q.length; return t.q[L === 1 ? ri(0, Math.max(0, n - 2)) : L === 3 ? ri(Math.min(1, n - 1), n - 1) : ri(0, n - 1)]; };
const compGen = list => L => { const t = pick(list), [q, a, wr] = compPick(t, L); return { ...mcq('Olvasd el figyelmesen, és válaszolj!', a, wr, { fmt: v => v, visual: `<div><div class="passage">${t.t}</div><div class="qline">${q}</div></div>`, hint: 'Olvasd el a szöveget még egyszer, és keresd meg benne a választ.' }), key: undefined }; };

COMP2.push(
  { t: 'Zoli a parkban sétált a nagypapájával. Egy padon ültek le, és kenyérmorzsát szórtak a galamboknak. Hazafelé fagyit is ettek.', q: [['Kivel sétált Zoli?', 'A nagypapájával.', ['Az anyukájával.', 'A barátjával.']], ['Mit szórtak a galamboknak?', 'Kenyérmorzsát.', ['Magot.', 'Kekszet.']], ['Mit ettek hazafelé?', 'Fagyit.', ['Pogácsát.', 'Almát.']]] },
  { t: 'Réka kertjében három tyúk és egy kakas él. A tyúkok minden reggel tojnak. Réka gyűjti össze a tojásokat egy kosárba.', q: [['Hány tyúk él Réka kertjében?', 'Három.', ['Egy.', 'Öt.']], ['Ki gyűjti össze a tojásokat?', 'Réka.', ['A kakas.', 'Réka anyukája.']], ['Mibe gyűjti Réka a tojásokat?', 'Egy kosárba.', ['Egy dobozba.', 'Egy vödörbe.']]] },
  { t: 'Csütörtökön Tomi születésnapja volt. Kapott egy piros kisautót és egy könyvet a dinoszauruszokról. A tortáján hét gyertya égett.', q: [['Melyik napon volt Tomi születésnapja?', 'Csütörtökön.', ['Kedden.', 'Vasárnap.']], ['Milyen színű kisautót kapott Tomi?', 'Pirosat.', ['Kéket.', 'Zöldet.']], ['Hány éves lett Tomi?', 'Hét.', ['Hat.', 'Nyolc.']]] },
  { t: 'Télen nagy hó esett. Emma és Dani hóembert építettek az udvaron. A szeme két darab szén lett, az orra egy sárgarépa.', q: [['Mit építettek a gyerekek?', 'Hóembert.', ['Hóvárat.', 'Szánkót.']], ['Hol építették?', 'Az udvaron.', ['A parkban.', 'Az iskolában.']], ['Mi lett a hóember orra?', 'Egy sárgarépa.', ['Egy darab szén.', 'Egy gomb.']]] },
  { t: 'Ancsa minden este fogat mos, aztán pizsamát vesz. Lefekvés előtt anya mesét olvas neki. Ancsa kedvenc meséje a Kisgömböc.', q: [['Mit csinál Ancsa először este?', 'Fogat mos.', ['Pizsamát vesz.', 'Mesét olvas.']], ['Ki olvas mesét Ancsának?', 'Anya.', ['Apa.', 'A nagymama.']], ['Melyik Ancsa kedvenc meséje?', 'A Kisgömböc.', ['A Hamupipőke.', 'A Piroska és a farkas.']]] },
  { t: 'A piacon anya krumplit, hagymát és paprikát vett. Bálint vitte a kosarat. Otthon paprikás krumpli lett az ebéd.', q: [['Hol vásárolt anya?', 'A piacon.', ['A boltban.', 'A pékségben.']], ['Ki vitte a kosarat?', 'Bálint.', ['Anya.', 'Az árus.']], ['Mi lett az ebéd?', 'Paprikás krumpli.', ['Gulyásleves.', 'Rántott hús.']]] },
  { t: 'Nyáron a család a Balatonhoz utazott. A gyerekek egész nap fürödtek és homokvárat építettek. Este lángost ettek.', q: [['Hová utazott a család?', 'A Balatonhoz.', ['A hegyekbe.', 'A nagymamához.']], ['Mit építettek a gyerekek?', 'Homokvárat.', ['Hóembert.', 'Hidat.']], ['Mit ettek este?', 'Lángost.', ['Pizzát.', 'Palacsintát.']]] },
  { t: 'Kati kiskertjében sok virág nyílik. A tulipán piros, a nárcisz sárga, a jácint lila. Kati minden reggel meglocsolja őket.', q: [['Milyen színű a tulipán?', 'Piros.', ['Sárga.', 'Lila.']], ['Melyik virág lila?', 'A jácint.', ['A nárcisz.', 'A tulipán.']], ['Mikor locsolja meg Kati a virágokat?', 'Minden reggel.', ['Minden este.', 'Vasárnaponként.']]] },
  { t: 'Az osztály állatkertbe ment. Láttak elefántot, zsiráfot és majmokat. A gyerekeknek a majmok tetszettek a legjobban, mert nagyon viccesek voltak.', q: [['Hová ment az osztály?', 'Az állatkertbe.', ['A cirkuszba.', 'A múzeumba.']], ['Melyik állatok tetszettek a legjobban?', 'A majmok.', ['Az elefántok.', 'A zsiráfok.']], ['Miért tetszettek a majmok?', 'Mert viccesek voltak.', ['Mert nagyok voltak.', 'Mert énekeltek.']]] },
  { t: 'Vili, a papagáj, tud beszélni. Reggel azt mondja: „Jó reggelt!” Ha éhes, hangosan kiabál: „Kérek kekszet!”', q: [['Milyen állat Vili?', 'Papagáj.', ['Kutya.', 'Macska.']], ['Mit mond Vili reggel?', '„Jó reggelt!”', ['„Kérek kekszet!”', '„Jó éjszakát!”']], ['Mit kér Vili, ha éhes?', 'Kekszet.', ['Almát.', 'Magot.']]] },
  { t: 'Ádám elejtette a poharat, és az eltört. Gyorsan szólt anyának. Anya segített feltakarítani a szilánkokat, és megdicsérte Ádámot, hogy szólt.', q: [['Mi tört el?', 'A pohár.', ['A tányér.', 'Az ablak.']], ['Kinek szólt Ádám?', 'Anyának.', ['Apának.', 'A testvérének.']], ['Miért dicsérte meg anya Ádámot?', 'Mert szólt neki.', ['Mert nem tört el semmi.', 'Mert egyedül feltakarított.']]] },
  { t: 'Ősszel Gabi és apa sárkányt eregettek a dombon. Erős szél fújt, így a sárkány nagyon magasra szállt. A sárkány farka színes masnikból készült.', q: [['Mikor eregettek sárkányt?', 'Ősszel.', ['Tavasszal.', 'Télen.']], ['Miből készült a sárkány farka?', 'Színes masnikból.', ['Papírból.', 'Madzagból.']], ['Miért szállt magasra a sárkány?', 'Mert erős szél fújt.', ['Mert könnyű volt.', 'Mert apa feldobta.']]] },
  { t: 'Juli a könyvtárba ment. Két könyvet kölcsönzött ki: egyet a lovakról, egyet a csillagokról. Két hét múlva vissza kell vinnie őket.', q: [['Hová ment Juli?', 'A könyvtárba.', ['Az iskolába.', 'A boltba.']], ['Hány könyvet kölcsönzött ki?', 'Kettőt.', ['Egyet.', 'Hármat.']], ['Mikor kell visszavinnie a könyveket?', 'Két hét múlva.', ['Holnap.', 'Egy év múlva.']]] },
  { t: 'Reggel köd volt, ezért a busz lassan ment. Marci így tíz percet késett az iskolából. A tanító néni megértette, és nem haragudott.', q: [['Milyen idő volt reggel?', 'Köd volt.', ['Esett a hó.', 'Sütött a nap.']], ['Mennyit késett Marci?', 'Tíz percet.', ['Öt percet.', 'Egy órát.']], ['Miért késett Marci?', 'Mert a köd miatt lassan ment a busz.', ['Mert elaludt.', 'Mert otthon felejtette a táskáját.']]] }
);
COMP3.push(
  { t: 'A tűzoltók nemcsak a tüzet oltják el. Ha egy macska fennragad a fán, vagy árvíz van, akkor is segítenek. A tűzoltóautón létra, tömlő és sok szerszám van. Az általános segélyhívó szám: 112.', q: [['Mi az általános segélyhívó szám?', '112.', ['911.', '123.']], ['Mi van a tűzoltóautón?', 'Létra, tömlő és szerszámok.', ['Ágyak és párnák.', 'Csak víz.']], ['Mit tudunk meg a tűzoltókról?', 'Nemcsak tüzet oltanak, hanem más bajban is segítenek.', ['Csak tüzet oltanak.', 'Csak állatokat mentenek.']]] },
  { t: 'Kata nagymamája régen falun élt. Akkor még nem volt a házukban vízvezeték, ezért a kútról hordták a vizet. Este petróleumlámpa világított, mert villany sem volt.', q: [['Hol élt régen Kata nagymamája?', 'Falun.', ['Budapesten.', 'Egy hajón.']], ['Honnan hordták a vizet?', 'A kútról.', ['A folyóból.', 'A csapból.']], ['Miért petróleumlámpa világított?', 'Mert nem volt villany.', ['Mert szebb volt.', 'Mert olcsóbb volt a villanynál.']]] },
  { t: 'A hangyák nagy családokban, bolyokban élnek. Minden hangyának megvan a feladata: vannak, akik élelmet gyűjtenek, mások a bolyt építik vagy a petéket gondozzák. A királynő petéket rak.', q: [['Hogy hívjuk a hangyák otthonát?', 'Boly.', ['Kaptár.', 'Odú.']], ['Mi a királynő feladata?', 'Petéket rak.', ['Élelmet gyűjt.', 'A bolyt építi.']], ['Mit mutat a szöveg a hangyákról?', 'Hogy közösen, munkamegosztásban dolgoznak.', ['Hogy egyedül élnek.', 'Hogy csak játszanak.']]] },
  { t: 'Bálint először ment egyedül a pékségbe. Anya adott neki egy listát: egy kenyér, hat kifli és egy kakaós csiga. A pénztárnál Bálint rájött, hogy a csigát elfelejtette, ezért visszament érte.', q: [['Hány kiflit kellett venni?', 'Hatot.', ['Egyet.', 'Négyet.']], ['Mit felejtett el Bálint először?', 'A kakaós csigát.', ['A kenyeret.', 'A kiflit.']], ['Hol vette észre Bálint a hibát?', 'A pénztárnál.', ['Otthon.', 'Az utcán.']]] },
  { t: 'A vakond a föld alatt él. Mellső lábaival ássa a hosszú járatokat. A szeme nagyon kicsi, alig lát, de a szaglása és a hallása kiváló. Gilisztákat és rovarokat eszik.', q: [['Mivel ás a vakond?', 'A mellső lábaival.', ['Az orrával.', 'A fogaival.']], ['Mit eszik a vakond?', 'Gilisztákat és rovarokat.', ['Füvet és gyökereket.', 'Halakat.']], ['Melyik érzékszerve gyenge a vakondnak?', 'A látása.', ['A szaglása.', 'A hallása.']]] },
  { t: 'Március 15-én Zsófi kokárdát tűzött a kabátjára. Az iskolában ünnepséget tartottak, ahol a negyedikesek verset mondtak. Zsófi is szerepelt: ő a Nemzeti dalt szavalta.', q: [['Mit tűzött Zsófi a kabátjára?', 'Kokárdát.', ['Virágot.', 'Jelvényt.']], ['Kik mondtak verset az ünnepségen?', 'A negyedikesek.', ['A tanárok.', 'Az elsősök.']], ['Melyik verset szavalta Zsófi?', 'A Nemzeti dalt.', ['A Himnuszt.', 'A Szózatot.']]] },
  { t: 'A busz megállt a megállóban. Egy idős néni szállt fel nehéz szatyrokkal. Peti felállt, és átadta neki a helyét. A néni megköszönte, és mosolyogva leült.', q: [['Ki szállt fel a buszra?', 'Egy idős néni.', ['Egy kisfiú.', 'Egy rendőr.']], ['Mit csinált Peti?', 'Átadta a helyét.', ['Segített leszállni.', 'Megvette a jegyet.']], ['Milyen volt Peti?', 'Udvarias és segítőkész.', ['Szemtelen.', 'Ijedős.']]] },
  { t: 'Idén nyáron nagyon meleg volt, és sokáig nem esett az eső. A kertben a növények elhervadtak volna, ezért Lőrinc minden este meglocsolta őket. A paradicsomok így szépen megértek.', q: [['Mikor locsolt Lőrinc?', 'Minden este.', ['Minden reggel.', 'Hetente egyszer.']], ['Mi lett a paradicsomokkal?', 'Szépen megértek.', ['Elhervadtak.', 'Elfagytak.']], ['Miért kellett locsolni?', 'Mert sokáig nem esett az eső.', ['Mert túl sok eső esett.', 'Mert hideg volt.']]] },
  { t: 'A sün éjszaka indul táplálékot keresni. Csigákat, bogarakat és gilisztákat eszik. Ha veszélyben van, gombóccá gömbölyödik, és a tüskéi megvédik. Télen avarkupacban alszik.', q: [['Mikor keres táplálékot a sün?', 'Éjszaka.', ['Délben.', 'Reggel.']], ['Hol tölti a telet a sün?', 'Avarkupacban.', ['Fa odújában.', 'A tó jegén.']], ['Mit csinál a sün, ha veszélyben van?', 'Gombóccá gömbölyödik.', ['Elszalad.', 'Elbújik a vízben.']]] },
  { t: 'Eszter hegedülni tanul. Hetente kétszer jár zeneiskolába, otthon pedig minden nap gyakorol fél órát. Decemberben a karácsonyi hangversenyen fog játszani.', q: [['Milyen hangszeren tanul Eszter?', 'Hegedűn.', ['Zongorán.', 'Furulyán.']], ['Hányszor jár zeneiskolába egy héten?', 'Kétszer.', ['Egyszer.', 'Minden nap.']], ['Mennyit gyakorol otthon naponta?', 'Fél órát.', ['Két órát.', 'Öt percet.']]] },
  { t: 'A hóvirág az egyik első tavaszi virág. Már februárban kidugja a fejét a hó alól. Fehér, lecsüngő virága kis harangra hasonlít. Védett növény, ezért nem szabad leszedni.', q: [['Mikor nyílik a hóvirág?', 'Már februárban.', ['Nyár közepén.', 'Ősszel.']], ['Mire hasonlít a virága?', 'Egy kis harangra.', ['Egy csillagra.', 'Egy labdára.']], ['Miért nem szabad leszedni a hóvirágot?', 'Mert védett növény.', ['Mert mérgező.', 'Mert szúr.']]] },
  { t: 'Dávid kedvenc sportja a foci. Szombatonként meccse van a csapatával. A legutóbbi meccsen ő lőtte a győztes gólt az utolsó percben. A csapat 2:1-re nyert.', q: [['Mikor vannak Dávid meccsei?', 'Szombatonként.', ['Vasárnaponként.', 'Hétfőnként.']], ['Mikor lőtte Dávid a gólt?', 'Az utolsó percben.', ['Az első percben.', 'A szünetben.']], ['Mi lett a meccs eredménye?', 'Dávidék 2:1-re nyertek.', ['Döntetlen lett.', 'Dávidék kikaptak.']]] }
);
COMP.push(
  { t: 'Magyarország leghíresebb barlangja az Aggteleki-karszt Baradla-barlangja. A cseppkövek úgy keletkeznek, hogy a mészkövön átszivárgó víz cseppenként lerakja az oldott anyagot. Egy cseppkő száz év alatt csak körülbelül egy centimétert nő.', q: [['Hogy hívják Aggtelek leghíresebb barlangját?', 'Baradla.', ['Pál-völgyi-barlang.', 'Szemlő-hegyi-barlang.']], ['Hogyan keletkeznek a cseppkövek?', 'A szivárgó víz lerakja az oldott anyagot.', ['A szél hordja össze őket.', 'Az emberek faragják ki őket.']], ['Mit tudunk meg a cseppkövek növekedéséről?', 'Nagyon lassan nőnek.', ['Néhány nap alatt megnőnek.', 'Télen gyorsabban nőnek.']]] },
  { t: 'Mátyás király sokszor álruhában járta az országot. Így tudta meg, hogyan élnek az emberek, és kik bánnak velük igazságtalanul. A nép ezért nevezte őt igazságos Mátyásnak. Sok mese szól róla.', q: [['Milyen jelzőt kapott Mátyás a néptől?', 'Igazságos.', ['Bátor.', 'Gazdag.']], ['Miért járt Mátyás álruhában?', 'Hogy megtudja, hogyan élnek az emberek.', ['Hogy elbújjon az ellenség elől.', 'Mert szerette a jelmezeket.']], ['Mit tudunk meg a szöveg végén?', 'Hogy sok mese szól róla.', ['Hogy sosem hagyta el a palotát.', 'Hogy nem szerette a népet.']]] },
  { t: 'A szelektív hulladékgyűjtés azt jelenti, hogy a szemetet anyag szerint külön gyűjtjük. A sárga kukába a műanyag és a fém, a kékbe a papír kerül. Az üveget külön konténerbe visszük. Így a hulladék nagy részét újra fel lehet használni.', q: [['Milyen színű kukába kerül a papír?', 'Kékbe.', ['Sárgába.', 'Zöldbe.']], ['Hová visszük az üveget?', 'Külön konténerbe.', ['A kék kukába.', 'A sárga kukába.']], ['Miért jó a szelektív gyűjtés?', 'Mert a hulladékot újra fel lehet használni.', ['Mert kevesebb kuka kell.', 'Mert így nem kell kivinni a szemetet.']]] },
  { t: 'Kristóf a nyári szünetben a nagyszüleinél volt a tanyán. Reggelente segített megetetni az állatokat: a tyúkokat, a kecskéket és a lovat. A ló neve Csillag volt, mert fehér folt volt a homlokán. A szünet végére Kristóf már egyedül is meg tudta nyergelni.', q: [['Hol töltötte Kristóf a nyári szünetet?', 'A nagyszüleinél a tanyán.', ['Táborban.', 'A tengerparton.']], ['Miért hívták a lovat Csillagnak?', 'Mert fehér folt volt a homlokán.', ['Mert éjjel szeretett futni.', 'Mert nagyon gyors volt.']], ['Mit tanult meg Kristóf a szünet végére?', 'Egyedül megnyergelni a lovat.', ['Megfejni a kecskét.', 'Traktort vezetni.']]] },
  { t: 'A Holdon nincs levegő, ezért ott hang sem terjed. Az űrhajósoknak szkafandert kell viselniük. Mivel a Hold vonzása hatszor gyengébb a Földénél, az űrhajósok ott nagyokat tudnak ugrani.', q: [['Mit kell viselniük az űrhajósoknak?', 'Szkafandert.', ['Esőkabátot.', 'Búvárruhát.']], ['Miért nem terjed a hang a Holdon?', 'Mert nincs levegő.', ['Mert túl hideg van.', 'Mert sötét van.']], ['Miért tudnak az űrhajósok nagyokat ugrani a Holdon?', 'Mert gyengébb a Hold vonzása.', ['Mert erősebbek lettek.', 'Mert rugós a cipőjük.']]] },
  { t: 'Hanna osztálya újságot készít. Hanna írja az iskolai híreket, Levente rajzolja a képregényt, Boróka pedig a rejtvényeket állítja össze. Az újság havonta egyszer jelenik meg, és mindenki kap belőle egy példányt.', q: [['Mit csinál Levente?', 'Képregényt rajzol.', ['Híreket ír.', 'Rejtvényeket készít.']], ['Ki állítja össze a rejtvényeket?', 'Boróka.', ['Hanna.', 'Levente.']], ['Milyen gyakran jelenik meg az újság?', 'Havonta egyszer.', ['Hetente.', 'Évente egyszer.']]] },
  { t: 'A fecskék sárból építik a fészküket, gyakran házak eresze alá. Repülés közben kapják el a rovarokat. Ősszel, mielőtt elindulnak Afrikába, a villanydrótokon gyülekeznek. A népi mondás szerint ha alacsonyan repülnek, eső várható.', q: [['Miből építik a fecskék a fészküket?', 'Sárból.', ['Gallyakból.', 'Tollból.']], ['Hol gyülekeznek ősszel a fecskék?', 'A villanydrótokon.', ['A háztetőkön.', 'A tó partján.']], ['Mit jelez a népi mondás szerint, ha a fecskék alacsonyan repülnek?', 'Hogy eső várható.', ['Hogy jön a tél.', 'Hogy nagy meleg lesz.']]] },
  { t: 'Zsombor megtalálta a padláson nagyapja régi fényképezőgépét. Ebben még film volt, nem memóriakártya. A képeket nem lehetett azonnal megnézni: a filmet előbb elő kellett hívatni. Zsombor kipróbálta, és két hét múlva kapta meg a képeit.', q: [['Mit talált Zsombor a padláson?', 'Egy régi fényképezőgépet.', ['Egy régi rádiót.', 'Egy régi telefont.']], ['Mi volt a gépben memóriakártya helyett?', 'Film.', ['Elem.', 'Papír.']], ['Mennyi idő múlva kapta meg Zsombor a képeket?', 'Két hét múlva.', ['Azonnal.', 'Egy év múlva.']]] },
  { t: 'Egy kísérletben a gyerekek két egyforma növényt ültettek. Az egyiket napos ablakba tették, a másikat egy sötét szekrénybe. Mindkettőt ugyanannyit locsolták. Két hét múlva a napon lévő növény zöld és erős lett, a szekrényben lévő sárga és gyenge.', q: [['Hová tették a második növényt?', 'Egy sötét szekrénybe.', ['A hűtőbe.', 'A kertbe.']], ['Mi volt ugyanaz a két növénynél?', 'A locsolás.', ['A fény.', 'A hely.']], ['Mit bizonyít a kísérlet?', 'Hogy a növénynek fény kell a fejlődéshez.', ['Hogy a növénynek nem kell víz.', 'Hogy a sötétben jobban nő.']]] },
  { t: 'A piacon szombat reggel nagy a nyüzsgés. A termelők friss zöldséget, gyümölcsöt, tojást és sajtot árulnak. Sokan azért járnak ide, mert az áru a környékről érkezik, így frissebb, mint a boltban.', q: [['Melyik napon nagy a nyüzsgés a piacon?', 'Szombaton.', ['Hétfőn.', 'Vasárnap.']], ['Kik árulnak a piacon?', 'A termelők.', ['A tanárok.', 'A turisták.']], ['Miért járnak sokan a piacra?', 'Mert az áru frissebb, mint a boltban.', ['Mert ott olcsó a játék.', 'Mert ott van a mozi.']]] },
  { t: 'Lóci nagyon szerette volna megnyerni az iskolai rajzversenyt. Egy hétig dolgozott a képén, amely a Balatont ábrázolta naplementében. Végül második lett. Először csalódott volt, de amikor meglátta a győztes képet, gratulált a nyertesnek.', q: [['Mit ábrázolt Lóci képe?', 'A Balatont naplementében.', ['Egy hegyet télen.', 'Az iskolát.']], ['Hányadik lett Lóci?', 'Második.', ['Első.', 'Harmadik.']], ['Mit mutat Lóci viselkedése a végén?', 'Hogy sportszerű volt.', ['Hogy irigy volt.', 'Hogy nem érdekelte a verseny.']]] },
  { t: 'Régen a hírek lassan terjedtek. A leveleket postakocsi vitte, amely napokig is úton volt. Ma egy üzenet néhány másodperc alatt átér a világ másik végére is.', q: [['Mi vitte régen a leveleket?', 'A postakocsi.', ['A vonat.', 'A repülő.']], ['Mennyi ideig lehetett úton régen egy levél?', 'Napokig.', ['Néhány percig.', 'Egy óráig.']], ['Mit hasonlít össze a szöveg?', 'A régi és a mai hírközlést.', ['A falut és a várost.', 'A nyarat és a telet.']]] }
);
setGen('magyar-2', 'comp', compGen(COMP2));
setGen('magyar-3', 'comp', compGen(COMP3));
setGen('magyar-4', 'comp', compGen(COMP));

/* ---------- capital letters, punctuation (grade 2) ---------- */
CAPS2.push('Bence a Tisza partján horgászik.', 'A macskánk neve Pöttyös.', 'Debrecenben él a keresztanyám.', 'Szombaton Kecskemétre utaztunk.', 'Gábor bácsi a szomszédunk.',
  'Nagyapa Pécsen született.', 'Misi és Bori ikrek.', 'A tehenünket Riskának hívják.', 'Dorka Győrben jár iskolába.', 'Este Tomival társasoztunk.', 'Az osztályunk Esztergomba kirándult.',
  'Kati néni finom pogácsát süt.', 'Holnap Visegrádra megyünk hajóval.', 'Ábel a Mátrában túrázott.', 'Vasárnap meglátogatjuk Évi nénit.', 'Robi és Ella a parkban fociznak.',
  'Szegeden sok a híd.', 'Marcsi a Velencei-tónál nyaral.', 'A kiskutyánkat Bundásnak neveztük el.', 'Egerben láttuk a várat.', 'Lackó a Dunába dobott egy kavicsot.', 'Ildikó óvónéni mesét olvasott.');
PUNCT2['.'].push('A nagymamám kertjében sok virág nyílik.', 'Péter minden nap biciklivel jár.', 'Holnap kirándulni megyünk.', 'A kutya a kerítés mellett alszik.', 'Télen gyakran esik a hó.', 'Ma palacsinta lesz vacsorára.', 'Az osztályunkban huszonöt gyerek van.', 'A vonat pontosan érkezett.');
PUNCT2['?'].push('Hová tetted a ceruzámat?', 'Szereted a fagyit?', 'Milyen színű a kabátod?', 'Ki hívott telefonon?', 'Meddig tart a szünet?', 'Eljössz holnap hozzánk?', 'Miért sír a kisbaba?', 'Kié ez a sapka?');
PUNCT2['!'].push('Vigyázz, jön az autó!', 'Hurrá, győztünk!', 'Gyere ide gyorsan!', 'Ne fuss a folyosón!', 'Boldog születésnapot!', 'Jaj, eltört a vázám!', 'Add ide a labdát!', 'De finom ez a leves!');

/* ---------- grade 4 Hungarian: capitals, meaning, word roots, -val/-vel ---------- */
CAPS.push(...['Pécs', 'Győr', 'Miskolc', 'Eger', 'Szentendre', 'Kékes', 'Bakony', 'Mecsek', 'Zala', 'Rába', 'Hortobágy', 'Ausztria', 'Szlovákia', 'Európa', 'Afrika', 'Zsófia', 'Dávid', 'Réka', 'Bodri', 'Cirmi'].map(w => [w, 1]),
  ...['kedd', 'csütörtök', 'péntek', 'szombat', 'vasárnap', 'február', 'március', 'április', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december', 'nyár', 'ősz', 'tél', 'angol', 'francia', 'olasz', 'lengyel', 'szlovák', 'karácsony', 'húsvét', 'hegy', 'tenger', 'iskola'].map(w => [w, 2]),
  ...['budapesti', 'balatoni', 'debreceni', 'szegedi', 'magyarországi', 'dunai', 'tiszai', 'mátrai', 'európai', 'egri'].map(w => [w, 3]));
setGen('magyar-4', 'caps', L => {
  const pool = CAPS.filter(c => L === 1 ? c[1] === 1 : L === 2 ? c[1] === 2 : true), [w, kind] = pick(pool);
  const flipped = kind === 1 ? w[0].toLowerCase() + w.slice(1) : w[0].toUpperCase() + w.slice(1);
  const hint = kind === 1 ? 'A földrajzi neveket, a személyneveket és az állatneveket nagy kezdőbetűvel írjuk.' : kind === 2 ? 'A hónapok, napok, évszakok, ünnepek és a nemzetiségek neve kis kezdőbetűvel íródik.' : 'A földrajzi névből képzett -i végű szót kis kezdőbetűvel írjuk: budapesti, balatoni.';
  return mcq(kind === 3 ? 'Melyik a helyes írásmód? (Ez egy -i végű melléknév.)' : 'Melyik a helyes írásmód?', w, [flipped, w.toUpperCase()], { fmt: v => v, hint });
});
IDIOM.push(['Hallgatni arany.', 'Néha jobb csendben maradni.'], ['Sok kicsi sokra megy.', 'Apránként is sok gyűlik össze.'], ['Lassan járj, tovább érsz.', 'Ha nem kapkodsz, jobb eredményt érsz el.'],
  ['Aki másnak vermet ás, maga esik bele.', 'Aki másnak rosszat akar, maga jár pórul.'], ['Madarat tolláról, embert barátjáról.', 'Az embert a barátairól lehet megismerni.'], ['Ajándék lónak ne nézd a fogát.', 'Az ajándékot ne kritizáld.'],
  ['Bagoly mondja verébnek, hogy nagyfejű.', 'Olyan hibát kifogásol, ami neki is megvan.'], ['Két legyet üt egy csapásra.', 'Egyszerre két dolgot intéz el.'], ['Kákán is csomót keres.', 'Ott is hibát keres, ahol nincs.'],
  ['Falra hányt borsó.', 'Hiába mondják neki, nem fogadja meg.'], ['Vaj van a fején.', 'Neki is van takargatnivalója.'], ['Ég a keze alatt a munka.', 'Gyorsan és ügyesen dolgozik.'],
  ['Rossz fát tett a tűzre.', 'Valami rosszat csinált.'], ['Itt van a kutya elásva.', 'Ez a dolog lényege, a baj oka.'], ['Sok lúd disznót győz.', 'Többen az erősebbet is legyőzik.'], ['Nem zörög a haraszt, ha a szél nem fújja.', 'Minden pletykának van valami alapja.']);
SYN.push(['dühös', 'mérges'], ['ijedt', 'rémült'], ['lusta', 'rest'], ['fut', 'szalad'], ['autó', 'gépkocsi'], ['orvos', 'doktor'], ['csúnya', 'ronda'], ['halk', 'csendes'], ['szomorú', 'bánatos'], ['kerek', 'gömbölyű'], ['piszkos', 'koszos'], ['beszélget', 'társalog']);
ROOTS2.push(['padokon', 'pad', 'ok', 'on'], ['székeket', 'szék', 'ek', 'et'], ['képeken', 'kép', 'ek', 'en'], ['virágokat', 'virág', 'ok', 'at'], ['hegyeken', 'hegy', 'ek', 'en'], ['dobozokban', 'doboz', 'ok', 'ban'],
  ['gombokat', 'gomb', 'ok', 'at'], ['ágyakon', 'ágy', 'ak', 'on'], ['könyvekből', 'könyv', 'ek', 'ből'], ['falakon', 'fal', 'ak', 'on'], ['vonatokon', 'vonat', 'ok', 'on'], ['erdőkben', 'erdő', 'k', 'ben'], ['autókban', 'autó', 'k', 'ban'], ['hajókon', 'hajó', 'k', 'on']);
VAL.push(['zebra', 'zebrával', 1], ['kifli', 'kiflivel', 1], ['kocsi', 'kocsival', 1], ['mese', 'mesével', 1], ['kefe', 'kefével', 1], ['zene', 'zenével', 1], ['autó', 'autóval', 1], ['rádió', 'rádióval', 1],
  ['hajó', 'hajóval', 1], ['cipő', 'cipővel', 1], ['teve', 'tevével', 1], ['bögre', 'bögrével', 1], ['kréta', 'krétával', 1]);
setGen('magyar-4', 'val', L => {
  const pool = VAL.filter(v => L === 1 ? v[2] === 1 : L === 2 ? v[2] === 2 : true), [stem, ok] = pick(pool);
  const vow = ok.endsWith('al') ? 'a' : 'e', other = vow === 'a' ? 'e' : 'a';
  const wr = [...new Set([stem + 'v' + vow + 'l', stem + 'v' + other + 'l', stem + vow + 'l', ok.replace(/(.)\1/, '$1')])].filter(x => x !== ok && x !== stem);
  return mcq(`Melyik a helyes: ${stem} + -val / -vel?`, ok, shuffle(wr).slice(0, 2), { fmt: v => v, explain: `Helyesen: <b>${ok}</b>.`, hint: 'Ha a szó mássalhangzóra végződik, a v hasonul hozzá: kéz + vel = kézzel. Magánhangzó után a v megmarad: kutya + val = kutyával (az a-ból á lesz, az e-ből é).' });
});

/* ---------- maths ---------- */
SOLID_FACTS.push(
  [1, 'Milyen test a dobókocka?', 'kocka', ['gömb', 'henger', 'gúla'], 'A kockának 6 egyforma négyzet lapja van.'],
  [1, 'Milyen test a narancs?', 'gömb', ['kocka', 'kúp', 'henger'], 'A narancs gömbölyű.'],
  [1, 'Milyen test egy vastag, egyenes gyertya?', 'henger', ['kúp', 'gömb', 'kocka'], 'Az alja és a teteje kör, az oldala gömbölyű: henger.'],
  [1, 'Milyen test a tégla?', 'téglatest', ['kocka', 'gömb', 'kúp'], 'A téglatest a nevét is a tégláról kapta.'],
  [1, 'Milyen test a bohócsipka?', 'kúp', ['henger', 'kocka', 'gömb'], 'A kúpnak egy csúcsa és egy kör alakú lapja van.'],
  [2, 'Melyik testnek van csúcsa?', 'a kúpnak', ['a gömbnek', 'a hengernek'], 'A kúp hegyes vége a csúcs.'],
  [2, 'Melyik testnek van két kör alakú lapja?', 'a hengernek', ['a kúpnak', 'a kockának', 'a gömbnek'], 'A henger alja és teteje is kör.'],
  [2, 'Hány lapja van a téglatestnek?', '6', ['4', '8', '12'], 'Ugyanannyi, mint a kockának.'],
  [2, 'Melyik test tud gurulni is, és megállni is a talpán?', 'a henger', ['a gömb', 'a kocka', 'a gúla'], 'Az oldalán gurul, az alján megáll.'],
  [3, 'Hány éle van a téglatestnek?', '12', ['8', '6', '10'], 'Mint a kockának: 12 él.'],
  [3, 'Hány csúcsa van a négyzet alapú gúlának?', '5', ['4', '8', '6'], 'Az alap 4 csúcsa és a gúla hegye: 5.'],
  [3, 'Hány éle van a négyzet alapú gúlának?', '8', ['4', '5', '12'], 'Az alapon 4, a hegyéhez futó 4: összesen 8.'],
  [3, 'Milyen alakú a henger palástja kiterítve?', 'téglalap', ['kör', 'háromszög', 'ötszög'], 'Ha egy konzervdoboz címkéjét levágod és kiteríted, téglalapot kapsz.'],
  [3, 'Hány négyzetből áll a kocka kiterített hálója?', '6', ['4', '8', '12'], 'Minden lapja egy négyzet.']
);
const PROB2 = [['Egy zsákban 3 piros golyó van. Kék golyót húzunk.', 'lehetetlen'], ['Két dobókockával dobunk. A dobott számok összege 13.', 'lehetetlen'], ['Két dobókockával dobunk. A dobott számok összege 12.', 'lehetséges, de nem biztos'],
  ['Két dobókockával dobunk. A dobott számok összege legalább 2.', 'biztos'], ['Dobókockával dobunk. Páros számot dobunk.', 'lehetséges, de nem biztos'], ['Dobókockával dobunk. 0-t dobunk.', 'lehetetlen'], ['Dobókockával dobunk. 7-nél kisebb számot dobunk.', 'biztos'],
  ['Egy dobozban 5 piros és 1 zöld golyó van. Pirosat húzunk.', 'lehetséges, de nem biztos'], ['Pénzt dobunk fel kétszer. Mindkétszer fejet kapunk.', 'lehetséges, de nem biztos'],
  ['Egy osztályba 30 gyerek jár. Van köztük kettő, akinek ugyanabban a hónapban van a születésnapja.', 'biztos'], ['Kinyitjuk a naptárt, és 32-e van.', 'lehetetlen'],
  ['Számkártyák: 2, 4, 6, 8. Húzunk egyet, és páros számot kapunk.', 'biztos'], ['Számkártyák: 2, 4, 6, 8. Húzunk egyet, és páratlan számot kapunk.', 'lehetetlen'], ['Számkártyák: 1, 2, 3, 4. Húzunk egyet, és 3-nál nagyobb számot kapunk.', 'lehetséges, de nem biztos']];
{ const t = topicOf('matek-4', 'prob'); if (t) { const base = t.gen; t.gen = L => L === 2 && Math.random() < .7 ? (it => mcq(it[0], it[1], ['biztos', 'lehetetlen', 'lehetséges, de nem biztos'], { fmt: v => v, hint: 'Biztos: mindig megtörténik. Lehetetlen: soha nem történhet meg. A kettő között: lehet, hogy megtörténik, de nem biztos.' }))(pick(PROB2)) : base(L); } }

/* ---------- Környezet 4 ---------- */
MORE.weather.push(
  [1, 'Melyik évszak követi a telet?', 'a tavasz', ['a nyár', 'az ősz'], 'Tavasz, nyár, ősz, tél – ez az évszakok sorrendje.'],
  [1, 'Melyik évszakban a legrövidebbek a nappalok?', 'télen', ['nyáron', 'tavasszal', 'ősszel'], 'Télen korán sötétedik és későn világosodik.'],
  [1, 'Mit láthatunk az égen, ha eső után kisüt a nap?', 'szivárványt', ['holdat', 'villámot', 'ködöt'], 'A napfény az esőcseppekben színeire bomlik.'],
  [1, 'Melyik hónap nyári hónap?', 'július', ['január', 'október', 'március'], 'A nyári hónapok: június, július, augusztus.'],
  [1, 'Melyik hónap téli hónap?', 'január', ['május', 'augusztus', 'szeptember'], 'A téli hónapok: december, január, február.'],
  [2, 'Mivel mérjük a szél erősségét?', 'szélmérővel', ['hőmérővel', 'csapadékmérővel', 'vonalzóval'], 'A szélmérő forgó kanalai annál gyorsabban pörögnek, minél erősebb a szél.'],
  [2, 'Mi a felhő?', 'a levegőben lebegő apró vízcseppek és jégkristályok tömege', ['füst', 'vatta', 'a levegő színe'], 'A felszálló vízgőz a magasban lehűl, és apró cseppekké sűrűsödik.'],
  [2, 'Honnan fúj az északi szél?', 'észak felől', ['dél felől', 'kelet felől', 'nyugat felől'], 'A szelet arról az égtájról nevezzük el, ahonnan fúj.'],
  [2, 'Hogy hívják az időjárással foglalkozó szakembert?', 'meteorológus', ['csillagász', 'geológus', 'orvos'], 'A meteorológus méri és előre jelzi az időjárást.'],
  [2, 'Mi a zúzmara?', 'a fák ágaira fagyott jégkristályok ködös, fagyos időben', ['nyári eső', 'meleg szél', 'egy virág'], 'Ködös, fagyos időben a pára az ágakra fagy.'],
  [2, 'Melyik évszakban gyakori a köd?', 'ősszel', ['nyáron', 'július végén'], 'Ősszel a hűvös éjszakák után reggel gyakran ködös az idő.'],
  [3, 'Hogyan keletkezik a szél?', 'a meleg levegő felszáll, és a helyére hidegebb levegő áramlik', ['a fák lengetik', 'a felhők fújják', 'a hullámok keltik'], 'A levegő mozgása a szél.'],
  [3, 'Melyik vidékünkön esik a legtöbb csapadék?', 'nyugaton, az Alpokalján', ['az Alföld közepén', 'a Hortobágyon', 'a Duna–Tisza közén'], 'A nyugati szelek nedves levegőt hoznak.'],
  [3, 'Melyik vidékünk a legszárazabb?', 'az Alföld közepe', ['az Alpokalja', 'a Bakony', 'az Őrség'], 'Az Alföld közepén kevés a csapadék, és sok a napsütés.'],
  [3, 'Mi a különbség a dér és a harmat között?', 'a dér apró jégkristályokból, a harmat vízcseppekből áll', ['nincs különbség', 'a harmat fagyott', 'a dér nyáron keletkezik'], 'Fagypont alatt a pára dérré, fölötte harmattá csapódik ki.'],
  [3, 'Miért hűvösebb a hegytetőn, mint a völgyben?', 'mert felfelé haladva hűl a levegő', ['mert a hegyen nem süt a nap', 'mert ott mindig esik', 'mert közelebb van a Holdhoz'], 'Körülbelül 100 méterenként fél fokkal hűvösebb.'],
  [3, 'Mit jelent az, hogy hazánk éghajlata mérsékelt?', 'se nagyon forró, se nagyon hideg, és négy évszak van', ['egész évben tél van', 'egész évben nyár van', 'csak két évszak van'], 'A mérsékelt övben négy évszak váltja egymást.'],
  [3, 'Villámlás után 3 másodperc múlva dörög. Körülbelül milyen messze van a vihar?', 'kb. 1 km-re', ['kb. 100 km-re', 'a fejünk fölött', 'kb. 10 km-re'], 'A hang kb. 3 másodperc alatt tesz meg 1 kilométert.']
);
addFacts('kornyezet-4', 'energy', [
  [1, 'Melyik ad meleget?', 'a kályha', ['a hűtő', 'a jégkocka', 'a hó'], 'A kályhában a tüzelő elégésekor hő keletkezik.'],
  [1, 'Melyik működik árammal?', 'a hűtőszekrény', ['a kerékpár', 'a gyertya', 'a papírsárkány'], 'A hűtő elektromos árammal működik.'],
  [1, 'Mikor gyújthat tüzet egy gyerek?', 'csak felnőtt jelenlétében', ['egyedül a szobában', 'bárhol, bármikor', 'az erdőben egyedül'], 'A tűz veszélyes, gyerek csak felnőtt felügyeletével gyújthat.'],
  [1, 'Melyik a legerősebb természetes fényforrás?', 'a Nap', ['a Hold', 'a szentjánosbogár', 'a gyertya'], 'A Nap ad fényt és meleget a Földnek.'],
  [2, 'Honnan kapja a Hold a fényét?', 'a Naptól, annak fényét veri vissza', ['saját fénye van', 'villany világítja', 'tűz ég rajta'], 'A Holdnak nincs saját fénye.'],
  [2, 'Mi történik a fénnyel a tükrön?', 'visszaverődik', ['eltűnik', 'megfagy', 'átmegy rajta'], 'A sima, fényes felület visszaveri a fényt.'],
  [2, 'Mikor keletkezik árnyék?', 'ha egy tárgy útját állja a fénynek', ['ha esik az eső', 'ha fúj a szél', 'ha meleg van'], 'A fény egyenes vonalban halad; a tárgy mögött árnyék marad.'],
  [2, 'Melyik megújuló energiaforrás?', 'a napenergia', ['a kőolaj', 'a szén', 'a földgáz'], 'A napfény, a szél és a víz energiája nem fogy el.'],
  [2, 'Hogyan takaríthatsz meg energiát?', 'lekapcsolom a villanyt, ha kimegyek', ['nyitva hagyom a hűtőt', 'egész nap megy a tévé', 'télen nyitva hagyom az ablakot'], 'Ami nem kell, azt kapcsold ki!'],
  [3, 'Melyik NEM megújuló energiaforrás?', 'a kőszén', ['a szél', 'a napfény', 'a folyóvíz'], 'A szén, a kőolaj és a földgáz egyszer elfogy.'],
  [3, 'Mire alakítja át a napelem a napfényt?', 'elektromos áramra', ['szélre', 'vízre', 'hangra'], 'A napelem a napfény energiájából áramot termel.'],
  [3, 'Mi lassítja meg a gurulni hagyott labdát?', 'a súrlódás és a légellenállás', ['semmi, örökké gurul', 'a fény', 'a hang'], 'A talaj és a levegő fékezi a mozgást.'],
  [3, 'Mit vonz magához a mágnes?', 'a vasat', ['a fát', 'a papírt', 'a műanyagot'], 'A mágnes a vasból készült tárgyakat vonzza.'],
  [3, 'Mi keletkezik égéskor?', 'füst, hamu és gázok', ['víz és jég', 'csak fény', 'semmi'], 'Égéskor új anyagok jönnek létre.']
], .45);
MORE.country.push(
  [1, 'Ki írta a magyar Himnuszt?', 'Kölcsey Ferenc', ['Petőfi Sándor', 'Arany János', 'Vörösmarty Mihály'], 'A Himnuszt Kölcsey Ferenc írta, Erkel Ferenc zenésítette meg.'],
  [1, 'Mi a magyar pénz neve?', 'forint', ['euró', 'korona', 'dollár'], 'Magyarország pénze a forint.'],
  [1, 'Melyik ünnepünk március 15.?', 'az 1848-as forradalom ünnepe', ['az államalapítás ünnepe', 'az 1956-os forradalom ünnepe', 'karácsony'], 'Március 15-én az 1848–49-es forradalomra és szabadságharcra emlékezünk.'],
  [1, 'Mikor ünnepeljük az államalapítást?', 'augusztus 20-án', ['március 15-én', 'október 23-án', 'május 1-jén'], 'Augusztus 20. az államalapítás és Szent István király ünnepe.'],
  [2, 'Mikor emlékezünk az 1956-os forradalomra?', 'október 23-án', ['március 15-én', 'augusztus 20-án', 'december 24-én'], 'Október 23. az 1956-os forradalom és szabadságharc emléknapja.'],
  [2, 'Hol ülésezik az Országgyűlés?', 'az Országházban', ['a Budai Várban', 'a Hősök terén', 'a Városligetben'], 'Az Országház a Duna partján áll, Budapesten.'],
  [2, 'Melyik ország fővárosa Bukarest?', 'Románia', ['Szerbia', 'Szlovákia', 'Ukrajna'], 'Románia fővárosa Bukarest.'],
  [2, 'Melyik ország fővárosa Zágráb?', 'Horvátország', ['Szlovénia', 'Szerbia', 'Ausztria'], 'Horvátország fővárosa Zágráb.'],
  [2, 'Melyik ország fővárosa Ljubljana?', 'Szlovénia', ['Horvátország', 'Ausztria', 'Szlovákia'], 'Szlovénia fővárosa Ljubljana.'],
  [2, 'Melyik ország fővárosa Belgrád?', 'Szerbia', ['Románia', 'Horvátország', 'Ukrajna'], 'Szerbia fővárosa Belgrád, a Duna partján.'],
  [2, 'Melyik ország fővárosa Kijev?', 'Ukrajna', ['Románia', 'Szlovákia', 'Szerbia'], 'Ukrajna fővárosa Kijev.'],
  [3, 'Ki szerezte a Himnusz zenéjét?', 'Erkel Ferenc', ['Liszt Ferenc', 'Kodály Zoltán', 'Bartók Béla'], 'A Himnusz zenéjét Erkel Ferenc szerezte.'],
  [3, 'Melyik városban koronázták az Árpád-házi királyokat?', 'Székesfehérváron', ['Debrecenben', 'Szegeden', 'Győrben'], 'Székesfehérvár volt a koronázó város.'],
  [3, 'Mi Magyarország államformája?', 'köztársaság', ['királyság', 'császárság', 'fejedelemség'], 'Magyarország köztársaság, élén a köztársasági elnök áll.']
);
MORE.regions.push(
  [1, 'Hány nagytájra osztjuk Magyarországot?', '6', ['4', '3', '10'], 'Alföld, Kisalföld, Alpokalja, Dunántúli-dombvidék, Dunántúli-középhegység, Északi-középhegység.'],
  [1, 'Melyik nagytájon fekszik Szeged?', 'Alföld', ['Kisalföld', 'Dunántúli-dombvidék', 'Északi-középhegység'], 'Szeged délen, a Tisza partján, a síkságon fekszik.'],
  [1, 'Melyik nagytájon fekszik Sopron?', 'Alpokalja', ['Alföld', 'Dunántúli-dombvidék', 'Északi-középhegység'], 'Sopron az ország nyugati szélén, az Alpok lábánál van.'],
  [1, 'Melyik nagytájon fekszik Miskolc?', 'Északi-középhegység', ['Alföld', 'Kisalföld', 'Dunántúli-dombvidék'], 'Miskolc a Bükk lábánál fekszik.'],
  [2, 'Melyik nagytájon fekszik Veszprém?', 'Dunántúli-középhegység', ['Alföld', 'Kisalföld', 'Alpokalja'], 'Veszprém a Bakony szélén van.'],
  [2, 'Melyik nagytájon fekszik Kaposvár?', 'Dunántúli-dombvidék', ['Kisalföld', 'Alföld', 'Északi-középhegység'], 'Kaposvár a Somogyi-dombságon van.'],
  [2, 'Melyik nagytájon fekszik Kecskemét?', 'Alföld', ['Kisalföld', 'Dunántúli-dombvidék', 'Alpokalja'], 'Kecskemét a Duna–Tisza közén van.'],
  [2, 'Melyik nagytájon fekszik Szombathely?', 'Alpokalja', ['Alföld', 'Dunántúli-középhegység', 'Északi-középhegység'], 'Szombathely az ország nyugati részén van.'],
  [3, 'Melyik nagytájon folyik a Rába és a Mosoni-Duna?', 'Kisalföld', ['Alföld', 'Északi-középhegység', 'Dunántúli-dombvidék'], 'A Kisalföld az ország északnyugati sarkában van.'],
  [3, 'Melyik két nagytájat választja el a Duna-kanyar?', 'a Dunántúli- és az Északi-középhegységet', ['az Alföldet és a Kisalföldet', 'az Alpokalját és a Kisalföldet', 'a Dunántúli-dombvidéket és az Alföldet'], 'A Duna a Visegrádi-hegység és a Börzsöny között tör át.'],
  [3, 'Melyik nagytájunk a legkisebb?', 'az Alpokalja', ['az Alföld', 'a Kisalföld', 'az Északi-középhegység'], 'Az Alpokalja keskeny sáv az ország nyugati határán.'],
  [3, 'Melyik nagytájunkon van a legtöbb szántóföld?', 'az Alföldön', ['az Alpokalján', 'az Északi-középhegységben', 'a Dunántúli-középhegységben'], 'Az Alföld sík, jó termőföldje van – hazánk éléskamrája.']
);
addFacts('kornyezet-4', 'compass', [
  [1, 'Merre kel fel a Nap?', 'keleten', ['nyugaton', 'északon', 'délen'], 'A Nap keleten kel és nyugaton nyugszik.'],
  [1, 'Merre nyugszik le a Nap?', 'nyugaton', ['keleten', 'északon', 'délen'], 'Este a Nap nyugaton bukik le.'],
  [1, 'Hol van a térképen az észak?', 'fent', ['lent', 'balra', 'jobbra'], 'A térképeken az észak általában felül van.'],
  [1, 'Melyik eszköz mutatja az északi irányt?', 'az iránytű', ['a hőmérő', 'a vonalzó', 'az óra'], 'Az iránytű mágneses tűje mindig észak felé fordul.'],
  [2, 'Merre jár a Nap délben?', 'délen', ['északon', 'keleten', 'nyugaton'], 'Nálunk délben a Nap délen jár, a legmagasabban az égen.'],
  [2, 'Mi az északkelet rövidítése?', 'ÉK', ['ÉNy', 'DK', 'KÉ'], 'Észak + kelet = ÉK.'],
  [2, 'Melyik mellékvilágtáj van észak és nyugat között?', 'északnyugat', ['északkelet', 'délnyugat', 'délkelet'], 'É + Ny = északnyugat (ÉNy).'],
  [2, 'Melyik mellékvilágtáj van dél és kelet között?', 'délkelet', ['délnyugat', 'északkelet', 'északnyugat'], 'D + K = délkelet (DK).'],
  [2, 'Délben merre mutat az árnyékunk?', 'észak felé', ['dél felé', 'kelet felé', 'nyugat felé'], 'Délben a Nap délen van, ezért az árnyék észak felé esik.']
], .4);
MORE.body.push(
  [1, 'Mivel látunk?', 'a szemünkkel', ['a fülünkkel', 'az orrunkkal', 'a kezünkkel'], 'A szem a látás érzékszerve.'],
  [1, 'Mivel hallunk?', 'a fülünkkel', ['a szemünkkel', 'a nyelvünkkel', 'a bőrünkkel'], 'A fül a hallás érzékszerve.'],
  [1, 'Hány ujj van egy kezünkön?', '5', ['4', '6', '10'], 'Egy kézen öt ujj van.'],
  [1, 'Melyik testrész van a fejünkön?', 'a fül', ['a térd', 'a könyök', 'a boka'], 'A fejen van a szem, a fül, az orr és a száj.'],
  [2, 'Körülbelül hány csont van egy felnőtt ember testében?', '206', ['20', '50', '1000'], 'A felnőtt csontváza kb. 206 csontból áll.'],
  [2, 'Melyik a leghosszabb csontunk?', 'a combcsont', ['az ujjperc', 'a borda', 'a koponya'], 'A combcsont a comb belsejében van.'],
  [2, 'Mit csinálnak az izmok?', 'összehúzódnak és elernyednek, így mozgatják a testet', ['vért termelnek', 'gondolkodnak', 'látnak'], 'Az izmok a csontokhoz tapadnak, és mozgatják őket.'],
  [2, 'Mit érzékel a bőrünk?', 'a meleget, a hideget, a fájdalmat és az érintést', ['a színeket', 'a hangokat', 'az illatokat'], 'A bőr a tapintás érzékszerve.'],
  [3, 'Mi történik a levegővel a tüdőben?', 'az oxigén a vérbe jut', ['megfagy', 'étellé alakul', 'eltűnik'], 'A tüdőben a vér oxigént vesz fel, és szén-dioxidot ad le.'],
  [3, 'Merre halad az étel lenyelés után?', 'nyelőcső → gyomor → belek', ['tüdő → szív → agy', 'gyomor → szív → fül', 'belek → nyelőcső → száj'], 'A tápcsatorna: száj, nyelőcső, gyomor, vékonybél, vastagbél.'],
  [3, 'Mit nevezünk pulzusnak?', 'a szívverés lüktetését, amit a csuklón is érezhetünk', ['a lélegzetvételt', 'a testhőmérsékletet', 'a köhögést'], 'A pulzust a csuklón vagy a nyakon tapinthatjuk.'],
  [3, 'Miért ver gyorsabban a szívünk futás közben?', 'mert az izmoknak több oxigén kell', ['mert fázunk', 'mert éhesek vagyunk', 'mert álmosak vagyunk'], 'A szív gyorsabban pumpálja az oxigéndús vért az izmokhoz.']
);
MORE.landform.push(
  [1, 'Hogy hívjuk a folyó két szélét?', 'part', ['csúcs', 'völgy', 'forrás'], 'A folyónak jobb és bal partja van.'],
  [1, 'Mi a tó?', 'szárazfölddel körülvett állóvíz', ['folyóvíz', 'hegy', 'erdő'], 'A tó vize nem folyik el.'],
  [1, 'Hogy hívjuk a kisebb, lankás kiemelkedést?', 'domb', ['hegy', 'völgy', 'síkság'], 'A domb alacsonyabb és lankásabb a hegynél.'],
  [2, 'Mi a meder?', 'a mélyedés, amelyben a folyó vize folyik', ['a folyó forrása', 'a folyó partján álló fa', 'egy hal'], 'A folyó a medrében folyik.'],
  [2, 'Mi a torkolat?', 'ahol a folyó egy másik folyóba, tóba vagy tengerbe ömlik', ['ahol a folyó ered', 'a folyó partja', 'egy híd'], 'A Tisza torkolata például Szerbiában van, a Dunában.'],
  [2, 'Mi a vízesés?', 'ahol a víz egy magas sziklafalról lezúdul', ['egy állóvíz', 'egy barlang', 'egy sziget'], 'Hazánk legmagasabb vízesése a Lillafüredi-vízesés.'],
  [2, 'Melyik mesterséges állóvíz?', 'a víztározó', ['a forrás', 'a patak', 'a folyó'], 'A víztározót az ember hozza létre gáttal, ilyen a Tisza-tó.'],
  [3, 'Mi a holtág?', 'a folyó levágott, lefűzött kanyarulata', ['a folyó forrása', 'egy mesterséges csatorna', 'egy hegyi patak'], 'A folyószabályozáskor levágott kanyarokból holtágak lettek.'],
  [3, 'Miért szabályozták a Tiszát?', 'hogy kevesebb legyen az árvíz, és több a termőföld', ['hogy kiszárítsák', 'hogy halakat telepítsenek', 'hogy gyorsabban folyjon a tengerbe'], 'Széchenyi István és Vásárhelyi Pál tervei alapján szabályozták a 19. században.'],
  [3, 'Mi keletkezik, ha a víz kioldja a mészkövet a föld alatt?', 'barlang', ['vulkán', 'sziget', 'síkság'], 'Az Aggteleki-karszt barlangjai így jöttek létre.'],
  [3, 'Mi a vulkán?', 'olyan hegy, amelyből a föld mélyéről izzó láva tör fel', ['egy völgy', 'egy folyó', 'egy tó'], 'Hazánkban ma nincs működő vulkán, de régi vulkáni hegyek vannak, például a Badacsony.']
);
MORE.plant.push(
  [1, 'Melyik zöldség?', 'a sárgarépa', ['az alma', 'a körte', 'a szilva'], 'A sárgarépának a gyökerét esszük.'],
  [1, 'Melyik gyümölcs?', 'a cseresznye', ['a hagyma', 'a krumpli', 'a káposzta'], 'A cseresznye a cseresznyefa termése.'],
  [1, 'Milyen színű a legtöbb növény levele?', 'zöld', ['kék', 'fekete', 'lila'], 'A levelek a nyáron zöldek, ősszel sárgulnak.'],
  [1, 'Melyik virág nyílik már kora tavasszal?', 'a hóvirág', ['a napraforgó', 'a kukorica', 'a krizantém'], 'A hóvirág már februárban nyílik.'],
  [2, 'Melyik tűlevelű fa?', 'a lucfenyő', ['a tölgy', 'a bükk', 'a nyír'], 'A fenyők levele tű alakú, és télen is zöld.'],
  [2, 'Melyik gyógynövény?', 'a kamilla', ['a pipacs', 'a búza', 'a kukorica'], 'A kamillateát megfázáskor és hasfájásra isszák.'],
  [2, 'Melyik mérgező növény?', 'a nadragulya', ['a kamilla', 'a szamóca', 'a petrezselyem'], 'A nadragulya fekete bogyója nagyon mérgező!'],
  [2, 'Hogyan terjed a pitypang magja?', 'a szél repíti', ['a víz viszi', 'gurul', 'a földben kúszik'], 'A pitypang magját kis ernyő repíti a széllel.'],
  [2, 'Mi a rügy?', 'a levél vagy a virág kezdeménye az ágon', ['a fa gyökere', 'egy termés', 'egy rovar'], 'Tavasszal a rügyekből levelek és virágok fakadnak.'],
  [3, 'Mit nevezünk beporzásnak?', 'a virágpor eljuttatását egyik virágról a másikra', ['a növény locsolását', 'a levelek lehullását', 'a mag elültetését'], 'Beporzás nélkül nem fejlődik termés.'],
  [3, 'Miért hullatják le a lombos fák ősszel a leveleiket?', 'hogy télen kevesebb vizet párologtassanak', ['mert megunják', 'hogy több fényt kapjanak', 'mert a madarak leszedik'], 'Télen a fagyos talajból nehéz vizet felvenni.'],
  [3, 'Hogyan tudhatjuk meg egy kivágott fa korát?', 'megszámoljuk az évgyűrűit', ['megmérjük a magasságát', 'megszámoljuk a leveleit', 'megnézzük a kérge színét'], 'Minden évben egy új évgyűrű nő.'],
  [3, 'Mi kell a magnak a csírázáshoz?', 'víz, levegő és megfelelő hőmérséklet', ['csak fény', 'csak hideg', 'semmi'], 'A csírázáshoz víz és meleg kell.']
);
MORE.health.push(
  [1, 'Miből egyél többet?', 'zöldségből és gyümölcsből', ['cukorkából', 'chipsből', 'csokiból'], 'A zöldség és a gyümölcs sok vitamint ad.'],
  [1, 'Mit tegyél, ha piros a gyalogos lámpa?', 'megállok és várok', ['átszaladok', 'gyorsan átmegyek', 'becsukom a szemem'], 'Pirosnál várni kell. Zöldnél mehetsz, de akkor is nézz körül!'],
  [2, 'Hol menj át az úton?', 'a zebrán (gyalogátkelőhelyen)', ['ahol éppen állok', 'két parkoló autó között', 'a kanyarban'], 'A zebra a gyalogosok átkelőhelye.'],
  [2, 'Melyik vitamint készíti a bőrünk napfény hatására?', 'a D-vitamint', ['a C-vitamint', 'az A-vitamint', 'a B-vitamint'], 'A napfény segíti a D-vitamin képződését.'],
  [2, 'Miben van sok C-vitamin?', 'a citromban és a paprikában', ['a cukorkában', 'a sóban', 'a vajban'], 'A C-vitamin segíti a szervezet védekezését.'],
  [2, 'Mit tegyél, ha egy kutya morogva közeledik feléd?', 'nyugodtan megállok, nem futok el, és felnőttet hívok', ['elszaladok sikítva', 'megsimogatom', 'megdobom'], 'A futás üldözésre ingerelheti a kutyát.'],
  [3, 'Mire jó az antibiotikum?', 'baktériumok okozta betegségek gyógyítására', ['vírusos náthára', 'napégésre', 'fáradtságra'], 'Antibiotikumot csak orvos írhat fel, és vírus ellen nem hat.'],
  [3, 'Mi a rendszeres testmozgás hatása?', 'erősíti a szívet, az izmokat és a csontokat', ['elgyengülnek tőle az izmok', 'rontja az alvást', 'semmi'], 'Naponta legalább egy órát mozogj!'],
  [3, 'Mit jelent, hogy egy betegség fertőző?', 'emberről emberre terjedhet', ['nem lehet elkapni', 'csak az időseket érinti', 'csak nyáron van'], 'A fertőző betegségeket kórokozók okozzák.']
);
MORE.measure.push(
  [1, 'Mivel mérjük meg, milyen magas a testvéred?', 'mérőszalaggal', ['mérleggel', 'hőmérővel', 'órával'], 'A magasságot centiméterben mérjük.'],
  [1, 'Mivel mérjük meg, milyen nehéz a táskád?', 'mérleggel', ['vonalzóval', 'hőmérővel', 'mérőpohárral'], 'A tömeget mérleggel, kilogrammban mérjük.'],
  [1, 'Mit mér a hőmérő?', 'hogy milyen meleg vagy hideg van', ['hogy milyen hosszú valami', 'hogy milyen nehéz valami', 'hogy mennyi az idő'], 'A hőmérséklet mértékegysége a Celsius-fok (°C).'],
  [1, 'Mit mér a mérleg?', 'a tömeget, vagyis hogy milyen nehéz valami', ['a hosszúságot', 'az időt', 'a hőmérsékletet'], 'Mérleggel kilót, dekát mérünk.'],
  [2, 'Hány nap egy hét?', '7', ['5', '10', '30'], 'Hétfőtől vasárnapig 7 nap.'],
  [2, 'Hány hónap egy év?', '12', ['10', '7', '52'], 'Januártól decemberig 12 hónap.'],
  [2, 'Mennyi fél óra?', '30 perc', ['50 perc', '15 perc', '60 perc'], '1 óra 60 perc, ennek a fele 30 perc.']
);
addFacts('kornyezet-4', 'state', [
  [2, 'Hány fokon forr a víz?', '100 °C-on', ['0 °C-on', '50 °C-on', '10 °C-on'], 'A víz 100 °C-on forr.'],
  [2, 'Hány fokon fagy meg a víz?', '0 °C-on', ['10 °C-on', '100 °C-on', '−50 °C-on'], 'A víz 0 °C-on fagy meg.'],
  [2, 'Mi a párolgás?', 'amikor a folyadék lassan légneművé válik', ['amikor a víz jéggé válik', 'amikor a jég vízzé válik', 'amikor a gőz vízzé válik'], 'Párolog a víz a tócsából és a vizes ruhából.'],
  [2, 'Mi jellemző a folyadékokra?', 'felveszik az edény alakját', ['megtartják a saját alakjukat', 'kitöltik az egész szobát', 'kemények'], 'A folyadék alakját az edény adja.'],
  [2, 'Mi jellemző a szilárd anyagokra?', 'megtartják az alakjukat', ['felveszik az edény alakját', 'szétterjednek a levegőben', 'folynak'], 'A kő, a fa és a jég alakja magától nem változik.'],
  [2, 'Mi jellemző a légnemű anyagokra?', 'kitöltik a rendelkezésükre álló teret', ['megtartják az alakjukat', 'kemények', 'folynak az asztalon'], 'A levegő kitölti az egész lufit.'],
  [2, 'Hol szárad gyorsabban a vizes ruha?', 'a meleg napon', ['a hideg pincében', 'a hűtőben', 'egy zacskóban'], 'Melegben gyorsabb a párolgás.']
], .4);
LAKE_FACTS.push(
  [1, 'Mi a tó?', 'szárazfölddel körülvett állóvíz', ['folyóvíz', 'tenger', 'patak'], 'A tó vize nem folyik tovább.'],
  [1, 'Melyik állóvíz?', 'a Balaton', ['a Duna', 'a Tisza', 'a Rába'], 'A Balaton tó, a többi folyó.'],
  [1, 'Melyik város fekszik a Balaton déli partján?', 'Siófok', ['Tihany', 'Badacsony', 'Balatonfüred'], 'Siófok a déli part legnagyobb városa.'],
  [1, 'Melyik város fekszik a Balaton északi partján?', 'Balatonfüred', ['Siófok', 'Fonyód', 'Balatonlelle'], 'Balatonfüred az északi parton van.'],
  [1, 'Melyik tó van közelebb Budapesthez?', 'a Velencei-tó', ['a Balaton', 'a Fertő tó', 'a Hévízi-tó'], 'A Velencei-tó Budapest és Székesfehérvár között van.'],
  [1, 'Melyik évszakban fagyhat be a Balaton?', 'télen', ['nyáron', 'ősz elején', 'tavasz végén'], 'Kemény télen a Balaton jege vastag lehet.'],
  [2, 'Melyik tó partján fekszik Keszthely?', 'a Balaton', ['a Velencei-tó', 'a Fertő tó', 'a Tisza-tó'], 'Keszthely a Balaton nyugati csücskében van.'],
  [2, 'Melyik nagytájon van a Tisza-tó?', 'az Alföldön', ['a Kisalföldön', 'az Alpokalján', 'a Dunántúli-dombvidéken'], 'A Tisza-tó a Tiszán, az Alföld északi részén van. A Kiskörei-víztározót hívjuk így.'],
  [2, 'Melyik tavunk közös Ausztriával?', 'a Fertő tó', ['a Balaton', 'a Velencei-tó', 'a Tisza-tó'], 'A Fertő tó nagyobbik része Ausztriában van.'],
  [2, 'Milyen növény nő sűrűn a Velencei-tó és a Fertő tó partján?', 'nád', ['fenyő', 'tulipán', 'kukorica'], 'A nádasokban sok madár fészkel.'],
  [2, 'Melyik balatoni hegy egy régi vulkán, lapos tetejű tanúhegy?', 'a Badacsony', ['a Kékes', 'a Mecsek', 'az Írott-kő'], 'A Badacsony a Balaton északi partján áll.'],
  [3, 'Körülbelül milyen hosszú a Balaton?', 'kb. 77 km', ['kb. 7 km', 'kb. 770 km', 'kb. 17 km'], 'A Balaton kb. 77 km hosszú.'],
  [3, 'Átlagosan milyen mély a Balaton?', 'kb. 3 méter', ['kb. 30 méter', 'kb. 300 méter', 'kb. 1 méter'], 'A Balaton sekély: átlagosan kb. 3 méter, a legmélyebb pontja a Tihanyi-kút, kb. 12 m.'],
  [3, 'Mi a Kis-Balaton feladata?', 'megszűri a Zala vizét, mielőtt a Balatonba jut', ['áramot termel', 'ivóvizet ad Budapestnek', 'kikötő a hajóknak'], 'A Kis-Balaton mocsárvilága tisztítja a vizet.'],
  [3, 'Melyik nemzeti parkhoz tartozik a Fertő tó?', 'a Fertő–Hanság Nemzeti Parkhoz', ['a Hortobágyi Nemzeti Parkhoz', 'a Bükki Nemzeti Parkhoz', 'az Aggteleki Nemzeti Parkhoz'], 'A Fertő tó és a Hanság védett terület.']
);
GENERAL_WATER.push(
  [1, 'Honnan kapják a vizüket a folyók?', 'esőből, hóolvadásból és forrásokból', ['a tengerből', 'a csapból', 'a homokból'], 'A csapadék és a források táplálják a patakokat, a patakok a folyókat.'],
  [1, 'Mi lesz sok kis patakból?', 'folyó', ['tó', 'forrás', 'hegy'], 'A patakok összefolynak, és folyóvá nőnek.'],
  [1, 'Merre folyik a víz?', 'lejtőn lefelé', ['hegynek felfelé', 'mindig észak felé', 'körbe-körbe'], 'A víz mindig a mélyebb hely felé folyik.'],
  [2, 'Milyen a folyó a felső szakaszán, a hegyekben?', 'keskeny és gyors folyású', ['széles és lassú', 'mozdulatlan', 'sós'], 'A hegyekben a víz meredeken, sebesen zúdul lefelé.'],
  [2, 'Milyen a folyó az alsó szakaszán, a síkságon?', 'széles és lassú folyású', ['keskeny és gyors', 'vízeséses', 'száraz'], 'A síkságon a folyó lelassul és kanyarog.'],
  [2, 'Mit szállít a folyó a vízen kívül?', 'hordalékot: homokot, kavicsot, iszapot', ['vasat', 'fényt', 'semmit'], 'A folyó koptatja a medrét, és máshol lerakja a hordalékot.'],
  [2, 'Mi a gát?', 'a víz visszatartására épített fal vagy töltés', ['egy hal', 'egy hajó', 'egy fa'], 'A gát megvéd az árvíztől, vagy felduzzasztja a vizet.'],
  [3, 'Mi a vízgyűjtő terület?', 'az a terület, ahonnan a víz egy folyóba folyik', ['ahol a folyó ered', 'egy nagy tó', 'egy víztorony'], 'Szinte egész Magyarország a Duna vízgyűjtő területén van.'],
  [3, 'Mi az aszály?', 'hosszan tartó csapadékhiány, szárazság', ['nagy árvíz', 'erős szél', 'hideg tél'], 'Aszálykor kiszáradnak a növények, és apadnak a folyók.'],
  [3, 'Mi a belvíz?', 'a földeken megálló, el nem szikkadó víz', ['a folyó medre', 'a tenger vize', 'a csapvíz'], 'Az Alföldön tavasszal a belvíz elöntheti a földeket.'],
  [3, 'Miért fontos a folyók tisztasága?', 'mert ivóvizet és élőhelyet adnak', ['mert szebb a színük', 'mert gyorsabban folynak', 'mert így nem fagynak be'], 'A szennyezés elpusztítja a halakat és a vízi élővilágot.']
);
addFacts('kornyezet-4', 'fold', [
  [1, 'Milyen alakú a Föld?', 'gömb alakú', ['lapos', 'kocka alakú', 'háromszög alakú'], 'A Föld közel gömb alakú, ezt az űrből készült képek is mutatják.'],
  [1, 'Mi kering a Föld körül?', 'a Hold', ['a Nap', 'a Mars', 'a csillagok'], 'A Hold a Föld kísérője.'],
  [1, 'Mi a Nap?', 'egy csillag', ['egy bolygó', 'egy hold', 'egy üstökös'], 'A Nap a hozzánk legközelebbi csillag.'],
  [2, 'Mennyi idő alatt fordul meg a Föld a tengelye körül?', 'egy nap, 24 óra alatt', ['egy év alatt', 'egy hét alatt', 'egy óra alatt'], 'Ettől váltakozik a nappal és az éjszaka.'],
  [2, 'Mennyi idő alatt kerüli meg a Föld a Napot?', 'egy év alatt', ['egy nap alatt', 'egy hónap alatt', 'tíz év alatt'], 'Egy keringés egy év.'],
  [2, 'Mi a földgömb?', 'a Föld kicsinyített mása', ['egy labda', 'egy csillag', 'a város térképe'], 'A földgömbön a kontinensek és az óceánok láthatók.'],
  [2, 'Melyik a Naprendszer legnagyobb bolygója?', 'a Jupiter', ['a Föld', 'a Mars', 'a Merkúr'], 'A Jupiter óriási gázbolygó.'],
  [3, 'Melyik bolygó van a legközelebb a Naphoz?', 'a Merkúr', ['a Vénusz', 'a Föld', 'a Mars'], 'Merkúr, Vénusz, Föld, Mars, Jupiter, Szaturnusz, Uránusz, Neptunusz.'],
  [3, 'Melyik bolygót hívják vörös bolygónak?', 'a Marsot', ['a Jupitert', 'a Vénuszt', 'a Szaturnuszt'], 'A Mars talaja vörös színű.'],
  [3, 'Melyik bolygónak vannak feltűnő gyűrűi?', 'a Szaturnusznak', ['a Marsnak', 'a Merkúrnak', 'a Földnek'], 'A Szaturnusz gyűrűi jégből és kőzetdarabokból állnak.'],
  [3, 'Hány bolygója van a Naprendszernek?', '8', ['9', '7', '12'], 'Nyolc bolygó kering a Nap körül.'],
  [3, 'Mi az Egyenlítő?', 'a Földet északi és déli félgömbre osztó képzeletbeli vonal', ['egy folyó', 'egy hegység', 'egy város'], 'Az Egyenlítő mentén mindig meleg van.'],
  [3, 'Melyik kontinensen van Magyarország?', 'Európában', ['Ázsiában', 'Afrikában', 'Amerikában'], 'Magyarország Közép-Európában van.']
], .4);

/* ---------- Környezet 3 ---------- */
addFacts('kornyezet-3', 'noveny', [
  [1, 'Melyik virág?', 'a tulipán', ['a búza', 'a fenyő', 'a kukorica'], 'A tulipán tavaszi virág.'],
  [2, 'Mit csinál a szár?', 'tartja a növényt, és szállítja a vizet', ['termést hoz', 'beporoz', 'a földben kapaszkodik'], 'A szár köti össze a gyökeret a levelekkel.'],
  [2, 'Melyik növénynek fás a szára?', 'a diófának', ['a pipacsnak', 'a búzának', 'a tulipánnak'], 'A fák és a bokrok szára fás.'],
  [2, 'Melyik növénynek lágy a szára?', 'a tulipánnak', ['a tölgyfának', 'a mogyorónak', 'a diófának'], 'A lágyszárú növények szára zöld és puha.'],
  [2, 'Mi a cserje?', 'fás szárú növény, amelynek a tövétől több szára nő', ['egy virág', 'egy gomba', 'egy fűfajta'], 'Ilyen a mogyoró, a bodza, a csipkebogyó.'],
  [2, 'Melyik cserje?', 'a mogyoró', ['a tölgy', 'a búza', 'a pipacs'], 'A mogyoróbokornak sok szára nő a tövéből.'],
  [2, 'Melyik részét esszük a krumplinak?', 'a föld alatti gumóját', ['a termését', 'a levelét', 'a virágát'], 'A krumpligumó a föld alatt fejlődik.'],
  [2, 'Mikor érik a cseresznye?', 'május végén, júniusban', ['decemberben', 'februárban', 'októberben'], 'A cseresznye a korai nyári gyümölcsök közé tartozik.'],
  [2, 'Melyik gyümölcs érik ősszel?', 'a szőlő', ['a cseresznye', 'az eper', 'a meggy'], 'A szüret szeptemberben és októberben van.'],
  [2, 'Melyik zöldségnek a levelét esszük?', 'a salátának', ['a répának', 'a borsónak', 'a krumplinak'], 'A saláta, a sóska és a káposzta levélzöldség.'],
  [3, 'Miért nem nő jól a növény sötétben?', 'mert fény nélkül nem tud táplálékot készíteni', ['mert fázik', 'mert nincs elég zene', 'mert túl sok a levegő'], 'A levél a napfény segítségével készít táplálékot.'],
  [3, 'Mi a különbség a fa és a cserje között?', 'a fának egy vastag törzse van, a cserjének több vékony szára', ['a cserje mindig magasabb', 'a fa lágyszárú', 'nincs különbség'], 'A fa törzse csak magasabban ágazik el.']
], .45);
addFacts('kornyezet-3', 'oldat', [
  [3, 'Hogyan választhatjuk szét a homokot és a vizet?', 'szűréssel', ['keveréssel', 'rázással', 'fagyasztással'], 'A szűrőpapír átengedi a vizet, a homokot visszatartja.'],
  [3, 'Hogyan kaphatjuk vissza a sót a sós vízből?', 'elpárologtatjuk a vizet', ['megszűrjük', 'összerázzuk', 'mágnest teszünk bele'], 'Párolgás után a só kristályok formájában visszamarad.'],
  [3, 'Miben oldódik gyorsabban a cukor?', 'a meleg teában', ['a hideg vízben', 'a jeges limonádéban', 'ugyanúgy mindegyikben'], 'Melegben és keveréssel gyorsabb az oldódás.'],
  [3, 'Melyik NEM oldódik vízben?', 'az olaj', ['a só', 'a cukor', 'a szörp'], 'Az olaj a víz tetején úszik, nem keveredik vele.'],
  [3, 'Mi gyorsítja az oldódást?', 'a keverés és a melegítés', ['a hűtés', 'a sötét', 'a csend'], 'Kavargatással a cukor hamarabb eltűnik a teában.'],
  [3, 'Hogyan választod szét a vasreszeléket és a homokot?', 'mágnessel', ['szűréssel', 'vízzel', 'fújással'], 'A mágnes magához vonzza a vasat.'],
  [3, 'Hogyan választod szét a borsót és a lisztet?', 'szitával', ['mágnessel', 'párologtatással', 'vízzel'], 'A szita lyukain a liszt átesik, a borsó fennmarad.']
], .5);
addFacts('kornyezet-3', 'meres', [
  [1, 'Mivel mérjük meg, milyen hosszú a padunk?', 'mérőszalaggal', ['mérleggel', 'hőmérővel', 'órával'], 'A hosszúságot centiméterben vagy méterben mérjük.'],
  [1, 'Mit mérünk literben?', 'a folyadék mennyiségét', ['a hosszúságot', 'a tömeget', 'az időt'], 'Például 1 liter tej.'],
  [1, 'Mit mérünk kilogrammban?', 'a tömeget', ['a hosszúságot', 'az időt', 'a folyadékot'], 'Például 1 kg liszt.'],
  [1, 'Mit mérünk méterben?', 'a hosszúságot', ['a tömeget', 'az időt', 'a hőmérsékletet'], 'Például a szoba 4 méter hosszú.'],
  [1, 'Melyik a hosszabb: 1 méter vagy 1 centiméter?', '1 méter', ['1 centiméter', 'egyformák'], '1 m = 100 cm.'],
  [1, 'Melyik nehezebb: 1 kg toll vagy 1 kg vas?', 'egyformák', ['a vas', 'a toll'], 'Mindkettő 1 kg – csak a vas kisebb helyet foglal.']
], .45);
addFacts('kornyezet-3', 'egitest', [
  [1, 'Mikor látjuk a Holdat a legjobban?', 'éjszaka', ['délben', 'soha'], 'Éjjel sötét van, ezért jól látszik.'],
  [1, 'Mit ad nekünk a Nap?', 'fényt és meleget', ['esőt', 'havat', 'szelet'], 'A Nap nélkül nem lenne élet a Földön.'],
  [1, 'Mi a csillag?', 'saját fénnyel világító égitest', ['egy hold', 'egy felhő', 'egy repülő'], 'A Nap is egy csillag.'],
  [2, 'Mit jelent a telihold?', 'a Hold egész korongja világos', ['a Hold nem látszik', 'csak a fele látszik', 'két hold van'], 'Teliholdkor a Nap a Hold felénk forduló egész oldalát megvilágítja.'],
  [2, 'Mit jelent az újhold?', 'a Hold nem látszik az égen', ['a Hold egész korongja világos', 'két hold van', 'a Hold nagyobb'], 'Újholdkor a Hold sötét oldala néz felénk.'],
  [2, 'Mennyi idő alatt változnak végig a holdfázisok?', 'kb. egy hónap alatt', ['egy nap alatt', 'egy év alatt', 'egy óra alatt'], 'Újhold, növekvő hold, telihold, fogyó hold – kb. 29 és fél nap.'],
  [2, 'Melyik csillagkép segít megtalálni a Sarkcsillagot?', 'a Göncölszekér', ['a Skorpió', 'a Halak', 'a Rák'], 'A Göncölszekér hátsó két csillagát meghosszabbítva találjuk meg a Sarkcsillagot.'],
  [3, 'Merre van a Sarkcsillag?', 'északon', ['délen', 'keleten', 'nyugaton'], 'A Sarkcsillag az északi irányt mutatja.'],
  [3, 'Miért nem látjuk nappal a csillagokat?', 'mert a Nap fénye elnyomja őket', ['mert nappal kialszanak', 'mert elbújnak', 'mert mindig felhős az ég'], 'Ott vannak, csak a napfény mellett nem látszanak.'],
  [3, 'Mi az Esthajnalcsillag?', 'a Vénusz bolygó', ['a Sarkcsillag', 'a Hold', 'egy üstökös'], 'A Vénusz nem csillag, hanem bolygó: a Nap fényét veri vissza.'],
  [3, 'Mi a hullócsillag?', 'a légkörben elégő apró kődarab', ['egy leeső csillag', 'egy villám', 'egy madár'], 'A meteor a légkörben izzik fel – nem igazi csillag.']
], .45);
addFacts('kornyezet-3', 'vilagtaj', [
  [1, 'Merre kel fel a Nap?', 'keleten', ['nyugaton', 'északon', 'délen'], 'A Nap keleten kel és nyugaton nyugszik.'],
  [1, 'Merre nyugszik le a Nap?', 'nyugaton', ['keleten', 'északon', 'délen'], 'Este a Nap nyugaton bukik le.'],
  [1, 'Hol van a térképen az észak?', 'fent', ['lent', 'balra', 'jobbra'], 'A térképeken az észak felül van.'],
  [1, 'Melyik eszköz mutatja az északi irányt?', 'az iránytű', ['a hőmérő', 'a vonalzó', 'az óra'], 'Az iránytű mágneses tűje észak felé fordul.'],
  [1, 'Mi a négy fővilágtáj?', 'észak, kelet, dél, nyugat', ['fel, le, jobbra, balra', 'tavasz, nyár, ősz, tél', 'reggel, dél, este, éjjel'], 'A fővilágtájak rövidítése: É, K, D, Ny.']
], .4);
addFacts('kornyezet-3', 'eletkoz', [
  [3, 'Mi a tápláléklánc első tagja?', 'a zöld növény', ['a ragadozó', 'a gomba', 'a víz'], 'A zöld növény a napfény segítségével táplálékot készít, ő a termelő.'],
  [3, 'Melyik ragadozó madár?', 'az egerészölyv', ['a galamb', 'a veréb', 'a fácán'], 'Az ölyv egerekre, pockokra vadászik.'],
  [3, 'Melyik növényevő állat?', 'a mezei nyúl', ['a róka', 'a farkas', 'a bagoly'], 'A nyúl füvet, lóherét és kérget eszik.'],
  [3, 'Melyik mindenevő állat?', 'a vaddisznó', ['az őz', 'a nyúl', 'a szarvas'], 'A vaddisznó makkot, gyökeret, férget és apró állatokat is eszik.'],
  [3, 'Mi az életközösség?', 'egy helyen együtt élő növények és állatok, amelyek hatnak egymásra', ['egy állatcsalád', 'egy város lakói', 'egyetlen fajta növény'], 'Ilyen az erdő, a mező és a vízpart.'],
  [3, 'Miért fontosak a giliszták a talajban?', 'lazítják és termékenyebbé teszik a talajt', ['megeszik a gyökereket', 'kiszárítják a földet', 'mérgezik a növényeket'], 'A giliszták járatain levegő és víz jut a talajba.'],
  [3, 'Miért hívják a harkályt az erdő doktorának?', 'mert kiszedi a fák kérge alól a kártevő rovarokat', ['mert gyógynövényt gyűjt', 'mert fehér a tolla', 'mert kopog'], 'A harkály a kéreg alatt élő lárvákat eszi.']
], .45);

addFacts('kornyezet-4', 'animal', [
  [2, 'Melyik állat emlős, pedig a vízben él?', 'a delfin', ['a ponty', 'a cápa', 'a csuka'], 'A delfin tüdővel lélegzik, és szoptatja a kicsinyét.'],
  [2, 'Mivel lélegzik a hal?', 'kopoltyúval', ['tüdővel', 'a bőrével', 'az orrával'], 'A kopoltyú a vízből veszi ki az oxigént.'],
  [2, 'Mi lesz az ebihalból?', 'béka', ['hal', 'gyík', 'csiga'], 'A béka petéiből ebihalak kelnek, és ezek alakulnak át békává.'],
  [2, 'Mi lesz a hernyóból?', 'lepke', ['méh', 'katica', 'pók'], 'A hernyó bebábozódik, és lepke lesz belőle.'],
  [2, 'Melyik állat vadászik éjszaka?', 'a bagoly', ['a pacsirta', 'a galamb', 'a fecske'], 'A bagoly éjjel vadászik, kiváló a látása és a hallása.'],
  [2, 'Melyik háziállat tejét isszuk?', 'a tehénét', ['a tyúkét', 'a kutyáét', 'a macskáét'], 'A tehén, a kecske és a juh tejét isszuk.'],
  [2, 'Hogy hívják a ló kicsinyét?', 'csikó', ['borjú', 'gida', 'malac'], 'A ló kicsinye a csikó, a tehéné a borjú, a kecskéé a gida.'],
  [2, 'Hogy hívják a kecske kicsinyét?', 'gida', ['csikó', 'bárány', 'malac'], 'A kecske kicsinye a gida, a juhé a bárány.'],
  [2, 'Hogy hívják a tehén kicsinyét?', 'borjú', ['csikó', 'gida', 'bárány'], 'A tehén kicsinye a borjú.']
], .5);
addFacts('kornyezet-4', 'habitat', [
  [3, 'Mit nevezünk fogyasztónak a táplálékláncban?', 'az élőlényt, amely más élőlényeket eszik', ['a zöld növényt', 'a napfényt', 'a vizet'], 'Az állatok fogyasztók: növényevők vagy ragadozók.'],
  [3, 'Melyik a ragadozó ebben a láncban: fű → nyúl → róka?', 'a róka', ['a fű', 'a nyúl'], 'A róka a nyulat eszi.'],
  [3, 'Melyik a növényevő ebben a láncban: makk → mókus → nyest?', 'a mókus', ['a makk', 'a nyest'], 'A mókus a makkot eszi, a mókust a nyest.'],
  [3, 'Mi történne, ha eltűnnének a méhek?', 'sok növény nem hozna termést', ['több gyümölcs teremne', 'semmi', 'több virág nyílna'], 'A méhek porozzák be a virágokat.'],
  [3, 'Melyik vízparti madár fog halat és békát?', 'a szürke gém', ['a pacsirta', 'a fácán', 'a galamb'], 'A gém hosszú lábán gázol a sekély vízben.'],
  [3, 'Hogyan alkalmazkodott a vidra a vízi élethez?', 'úszóhártyás a lába, és sűrű a bundája', ['szárnya van', 'kopoltyúval lélegzik', 'páncélja van'], 'A vidra kiválóan úszik és búvárkodik.'],
  [3, 'Miért veszélyes a szemetelés az erdőben?', 'mert az állatok megsérülhetnek, vagy megehetik a hulladékot', ['mert a szemét elolvad', 'mert a fák megnőnek tőle', 'nem veszélyes'], 'A műanyag évszázadokig nem bomlik le.']
], .5);
GENERAL_WATER.push(
  [1, 'Mi a forrás?', 'ahol a víz a földből a felszínre tör', ['ahol a folyó a tengerbe ömlik', 'egy tó', 'egy híd'], 'A patakok és a folyók forrásnál erednek.'],
  [1, 'Hogy hívjuk a nagyon nagy, sok vizet szállító folyót, például a Dunát?', 'folyam', ['patak', 'ér', 'tó'], 'Ér, patak, folyó, folyam: egyre nagyobbak.'],
  [1, 'Melyik a legkisebb folyóvíz?', 'az ér', ['a patak', 'a folyó', 'a folyam'], 'Ér, patak, folyó, folyam: egyre nagyobbak.']
);

/* ---------- blind map: tap where a mountain range, lake or plain is ---------- */
const BLIND_MTN = { 1: ['Mátra', 'Bükk', 'Börzsöny', 'Bakony', 'Mecsek', 'Zempléni-hegység'], 2: ['Vértes', 'Gerecse', 'Budai-hegység', 'Pilis', 'Kőszegi-hegység', 'Cserhát'], 3: ['Keszthelyi-hegység', 'Velencei-hegység', 'Visegrádi-hegység', 'Villányi-hegység', 'Soproni-hegység'] };
const BLIND_LAKE = ['Balaton', 'Velencei-tó', 'Fertő tó', 'Tisza-tó'];
const BLIND_LOW = { 1: ['Hortobágy', 'Nyírség', 'Kiskunság', 'Szigetköz'], 2: ['Jászság', 'Hanság', 'Mezőföld', 'Somogyi-dombság', 'Zalai-dombság'], 3: ['Tolnai-dombság', 'Gödöllői-dombság', 'Őrség'] };
const BLIND_ALL = [...Object.values(BLIND_MTN).flat(), ...BLIND_LAKE, ...Object.values(BLIND_LOW).flat()];
const BLIND_HINT = { 'Kiskunság': 'A Duna–Tisza közén, Kecskeméttől délnyugatra.', 'Őrség': 'Az ország délnyugati sarkában, az osztrák és a szlovén határ közelében.',
  'Balaton': 'A Dunántúl közepén elnyúló nagy tó.', 'Velencei-tó': 'Budapest és Székesfehérvár között.', 'Fertő tó': 'Az ország északnyugati sarkában, az osztrák határon.', 'Tisza-tó': 'Az Alföld északi részén, a Tiszán, Eger és Debrecen között.' };
const blindHint = p => BLIND_HINT[p] || (typeof MTN !== 'undefined' && MTN[p] ? `${p}: ${MTN[p].nt}, ${MTN[p].near} közelében.` : typeof LOW !== 'undefined' && LOW[p] ? `${p}: ${LOW[p].nt}, ${LOW[p].near} környékén.` : '');
const upTo = (byL, L) => [1, 2, 3].filter(k => k <= L).flatMap(k => byL[k]);
function blindQ(pool, L) {
  const P = MAPDATA.places, p = pick(pool), d = (a, b) => Math.hypot(P[a][0] - P[b][0], P[a][1] - P[b][1]);
  const dots = [p];
  for (const x of shuffle(BLIND_ALL)) { if (dots.length >= (L === 1 ? 4 : 5)) break; if (P[x] && dots.every(y => d(x, y) > 38)) dots.push(x); }
  return mapQ(`Vaktérkép: hol van ${artOf(p)} <b>${p}</b>? Koppints a pontra!`, p, { pick: 'dot', dots: shuffle(dots), hint: blindHint(p) });
}
const blindMtn = L => blindQ(upTo(BLIND_MTN, L), L), blindLow = L => blindQ(upTo(BLIND_LOW, L), L), blindLake = L => blindQ(BLIND_LAKE, L);
const blindAny = L => (pick([blindMtn, blindMtn, blindLow, blindLake]))(L);
const withExtra = (pid, tid, extra, p) => { const t = topicOf(pid, tid); if (!t) return; const base = t.gen; t.gen = L => Math.random() < p ? extra(L) : base(L); };
withExtra('kornyezet-4', 'hegyseg', blindMtn, .2);
withExtra('kornyezet-4', 'dombsag', blindLow, .2);
withExtra('kornyezet-4', 'tavaink', blindLake, .12);
withExtra('kornyezet-4', 'regions', blindAny, .15);

/* ---------- a mixed geography test, like a real class test ---------- */
const GEO_TEST = ['regions', 'nagytaj', 'hegyseg', 'dombsag', 'folyoink', 'tavaink', 'country', 'megyek', 'tajak', 'landform'];
PAGES['kornyezet-4'].topics.push({ id: 'dolgozat', sample: '📝 🗺️', name: 'Nagy földrajzdolgozat', total: 15, desc: 'Vegyes feladatok hazánk tájairól, hegyeiről, vizeiről, megyéiről, vaktérképpel – mint egy igazi dolgozat. 15 kérdés.',
  gen: L => Math.random() < .15 ? blindAny(L) : (topicOf('kornyezet-4', pick(GEO_TEST)) || topicOf('kornyezet-4', 'regions')).gen(L) });
