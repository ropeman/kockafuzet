/* ===== topic sections: long topic lists are shown in groups with headings ===== */
const SECTIONS = {
  'matek-1': [
    ['Számok és számolás', ['count', 'add', 'sub', 'split', 'rel', 'neigh', 'seq', 'dbl', 'numline', 'order']],
    ['Gondolkodj!', ['word', 'open', 'pattern', 'pyramid', 'match', 'data']],
    ['Alakzatok és az óra', ['shape', 'clock', 'clockset']]],
  'matek-2': [
    ['Számok 100-ig', ['place', 'numline', 'order', 'digits', 'parity', 'even', 'seq']],
    ['Műveletek', ['add', 'sub', 'mul', 'div', 'pyramid', 'match', 'open', 'machine']],
    ['Szöveges feladatok, gondolkodás', ['word', 'combi', 'data']],
    ['Mérés, idő, pénz, alakzatok', ['units', 'money', 'clock', 'clockset', 'shape']]],
  'matek-3': [
    ['Számok 1000-ig', ['place', 'round', 'roman', 'numline', 'order', 'digits']],
    ['Műveletek', ['mental', 'add', 'sub', 'mul', 'div', 'pyramid', 'match', 'magic', 'open', 'machine']],
    ['Törtek, mérés, idő', ['frac', 'units', 'span', 'clockset']],
    ['Geometria', ['perim', 'solids', 'sym']],
    ['Szöveges feladatok, gondolkodás', ['word', 'combi', 'data']]],
  'matek-4': [
    ['Számok', ['place', 'round', 'neg', 'numline', 'digits', 'divis', 'estim']],
    ['Műveletek', ['add', 'sub', 'mul', 'div', 'pyramid', 'magic', 'machine']],
    ['Törtek, mérés, idő', ['frac', 'units', 'span']],
    ['Geometria', ['area', 'solids', 'sym']],
    ['Szöveges feladatok, adatok, valószínűség', ['word', 'prob', 'combi', 'data']]],
  'magyar-2': [
    ['Betűk és hangok', ['abc', 'letters', 'vowel', 'double', 'syl']],
    ['Helyesírás', ['jly', 'caps', 'punct']],
    ['Szavak és szövegek', ['group', 'meaning', 'comp']]],
  'magyar-3': [
    ['Betűrend, elválasztás', ['abc', 'syl', 'plural']],
    ['Helyesírás', ['jly', 'proper']],
    ['Nyelvtan', ['pos', 'tense', 'hol', 'sent']],
    ['Szavak és szövegek', ['meaning', 'comp']]],
  'magyar-4': [
    ['Betűrend, szótagolás', ['abc', 'syl']],
    ['Helyesírás', ['jly', 'val', 'caps']],
    ['Nyelvtan', ['root', 'sent', 'kind', 'tense']],
    ['Szavak és szövegek', ['meaning', 'comp']]],
  'kornyezet-4': [
    ['Hazánk földrajza', ['dolgozat', 'regions', 'nagytaj', 'hegyseg', 'dombsag', 'folyoink', 'tavaink', 'folyok', 'landform', 'country', 'megyek', 'tajak', 'hidak']],
    ['Tájékozódás, térkép, Föld', ['compass', 'terkepolv', 'terkep', 'fold']],
    ['Élővilág', ['plant', 'animal', 'habitat', 'haszon', 'kornyvedelem']],
    ['Testünk, egészségünk', ['body', 'health']],
    ['Anyagok, mérés, időjárás', ['state', 'measure', 'ido', 'weather']],
    ['Tűz, fény, hang, mozgás', ['energy', 'hangfeny', 'mozgas']],
    ['Játékos gyakorlók', ['sorter', 'ki', 'lab']]],
  'kornyezet-3': [
    ['Lakóhelyünk, tájékozódás', ['lakohely', 'vilagtaj', 'budapest']],
    ['Élővilág és testünk', ['noveny', 'allat', 'eletkoz', 'test']],
    ['Anyagok és mérés', ['elo', 'meres', 'viz', 'oldat', 'magnes']],
    ['Idő, naptár, égitestek', ['ora', 'naptar', 'egitest']],
    ['Játékos gyakorlók', ['sorter', 'ki']]]
};
for (const [pid, secs] of Object.entries(SECTIONS)) if (PAGES[pid]) PAGES[pid].sections = secs;

// [title, topics] groups for the topic list; anything not listed lands in "Egyéb" at the end
function topicGroups(page) {
  if (!page.sections) return [[null, page.topics]];
  const groups = page.sections.map(([title, ids]) => [title, ids.map(id => page.topics.find(t => t.id === id)).filter(Boolean)]).filter(g => g[1].length);
  const used = new Set(groups.flatMap(g => g[1])), rest = page.topics.filter(t => !used.has(t));
  if (rest.length) groups.push(['Egyéb', rest]);
  return groups;
}
