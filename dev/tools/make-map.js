// Generates dev/src/mapdata.js from Natural Earth data (public domain), via npm packages:
//   datamaps (Hungary admin-1 TopoJSON), world-atlas (countries), @geo-maps/earth-lakes-10m, @geo-maps/earth-rivers-10m,
//   topojson-client, d3-geo.   Usage:  node dev/tools/make-map.js <node_modules dir> <out file>
const fs = require('fs'), path = require('path');
const NM = process.argv[2], OUT = process.argv[3];
const req = m => require(path.join(NM, m));
const topo = req('topojson-client'), d3 = req('d3-geo');

// --- Hungary counties: merge the cities with county rights back into their county
const src = fs.readFileSync(path.join(NM, 'datamaps/dist/datamaps.hun.js'), 'utf8');
const st = src.indexOf('{"type":"Topology"'); let d = 0, e = st, inS = false;
for (; e < src.length; e++) { const c = src[e]; if (c === '"' && src[e - 1] !== '\\') inS = !inS; if (inS) continue; if (c === '{') d++; else if (c === '}') { d--; if (!d) break; } }
const hu = JSON.parse(src.slice(st, e + 1)), G = hu.objects.hun.geometries;
const CITY = { 'Szombathely': 'Vas', 'Sopron': 'Győr-Moson-Sopron', 'Gyôr': 'Győr-Moson-Sopron', 'Tatabánya': 'Komárom-Esztergom', 'Érd': 'Pest', 'Székesfehérvár': 'Fejér', 'Veszprém': 'Veszprém', 'Zalaegerszeg': 'Zala', 'Nagykanizsa': 'Zala', 'Kaposvár': 'Somogy', 'Pécs': 'Baranya', 'Szekszárd': 'Tolna', 'Kecskemét': 'Bács-Kiskun', 'Szeged': 'Csongrád-Csanád', 'Hódmezôvásárhely': 'Csongrád-Csanád', 'Szolnok': 'Jász-Nagykun-Szolnok', 'Békéscsaba': 'Békés', 'Eger': 'Heves', 'Salgótarján': 'Nógrád', 'Miskolc': 'Borsod-Abaúj-Zemplén', 'Nyíregyháza': 'Szabolcs-Szatmár-Bereg', 'Debrecen': 'Hajdú-Bihar', 'Dunaújváros': 'Fejér' };
const FIX = { 'Gyor-Moson-Sopron': 'Győr-Moson-Sopron', 'Csongrád': 'Csongrád-Csanád' };
const groups = {};
G.forEach((g, i) => {
  const n = g.properties.name, county = i < 20 ? (FIX[n] || n) : CITY[n];
  if (!county) throw new Error('unknown unit ' + n);
  (groups[county] = groups[county] || []).push(g);
});
const counties = Object.entries(groups).map(([name, gs]) => ({ name, geo: topo.merge(hu, gs) }));
const huOutline = topo.merge(hu, G);

// --- projections
const W = 600, H = 380;
const pHU = d3.geoMercator().fitExtent([[12, 12], [W - 12, H - 12]], huOutline);
const box = { type: 'MultiPoint', coordinates: [[13.6, 44.2], [27.6, 50.4], [13.6, 50.4], [27.6, 44.2]] };
const pRG = d3.geoMercator().fitExtent([[0, 0], [W, H]], box);
pRG.clipExtent([[0, 0], [W, H]]); pHU.clipExtent([[-5, -5], [W + 5, H + 5]]);

// compact path: rounded coordinates, drop points closer than 0.9 px
function pathOf(proj, geo) {
  let out = '';
  const ctx = { mx: 0, my: 0, lx: null, ly: null,
    moveTo(x, y) { out += `M${x.toFixed(1)} ${y.toFixed(1)}`; this.lx = x; this.ly = y; },
    lineTo(x, y) { if (Math.hypot(x - this.lx, y - this.ly) < 0.9) return; out += `L${x.toFixed(1)} ${y.toFixed(1)}`; this.lx = x; this.ly = y; },
    closePath() { out += 'Z'; }, arc() {} };
  d3.geoPath(proj, ctx)(geo);
  return out.replace(/L/g, ' ').replace(/ -/g, '-');
}
const r1 = n => Math.round(n * 10) / 10;
const data = { W, H, counties: {}, budapest: '', outline: pathOf(pHU, huOutline), lakes: [], rivers: '', region: {} };
counties.forEach(c => { const g = d3.geoPath(pHU); const [cx, cy] = g.centroid(c.geo); if (c.name === 'Budapest') data.budapest = pathOf(pHU, c.geo); else data.counties[c.name] = { d: pathOf(pHU, c.geo), c: [r1(cx), r1(cy)] }; });

// lakes inside Hungary (Balaton, Velencei-tó, Fertő), rivers clipped to the map
const lakes = JSON.parse(fs.readFileSync(path.join(NM, '@geo-maps/earth-lakes-10m/map.geo.json')));
const inHU = ([x, y]) => x > 16 && x < 23 && y > 45.7 && y < 48.6;
const polys = [];
lakes.geometries.forEach(g => (g.type === 'MultiPolygon' ? g.coordinates : [g.coordinates]).forEach(pc => { if (pc[0].some(inHU)) polys.push({ type: 'Polygon', coordinates: pc }); }));
polys.forEach(pg => { const a = d3.geoPath(pHU).area(pg); if (a > 100 || (a > 18 && d3.geoContains(huOutline, d3.geoCentroid(pg)))) data.lakes.push({ d: pathOf(pHU, pg), a: Math.round(a), c: d3.geoPath(pHU).centroid(pg).map(r1), ll: d3.geoCentroid(pg).map(v => Math.round(v * 100) / 100) }); });
data.lakes.sort((a, b) => b.a - a.a);
// main rivers as simplified lines through towns along them (lon, lat)
const RIV = {
  'Duna': [[17.16, 48.01], [17.45, 47.88], [17.83, 47.73], [18.12, 47.75], [18.45, 47.77], [18.74, 47.80], [18.86, 47.82], [18.97, 47.79], [19.10, 47.76], [19.13, 47.70], [19.07, 47.63], [19.08, 47.53], [19.08, 47.45], [18.96, 47.33], [18.95, 47.22], [18.94, 46.97], [18.92, 46.80], [18.86, 46.62], [18.88, 46.45], [18.95, 46.18], [18.80, 46.05], [18.70, 45.99], [18.85, 45.87]],
  'Tisza': [[22.82, 48.10], [22.50, 48.10], [22.31, 48.15], [22.17, 48.38], [21.92, 48.33], [21.65, 48.17], [21.41, 48.12], [21.08, 47.93], [20.92, 47.75], [20.76, 47.62], [20.50, 47.50], [20.35, 47.30], [20.20, 47.17], [20.10, 46.93], [20.14, 46.71], [20.19, 46.53], [20.15, 46.25], [20.10, 46.17]],
  'Rába': [[16.27, 46.95], [16.60, 47.01], [16.94, 47.25], [17.25, 47.45], [17.63, 47.69]],
  'Körös': [[21.28, 46.65], [21.13, 46.77], [20.83, 46.93], [20.55, 46.86], [20.14, 46.71]],
  'Mosoni-Duna': [[17.16, 48.01], [17.27, 47.87], [17.45, 47.78], [17.63, 47.69]],
  'Maros': [[20.75, 46.14], [20.62, 46.17], [20.48, 46.20], [20.32, 46.23], [20.17, 46.25]],
  'Zagyva': [[19.80, 48.10], [19.72, 47.98], [19.70, 47.86], [19.68, 47.67], [19.80, 47.57], [19.91, 47.50], [20.02, 47.32], [20.20, 47.17]],
  'Sajó': [[20.36, 48.30], [20.50, 48.27], [20.63, 48.24], [20.75, 48.15], [20.85, 48.05], [20.97, 47.98], [21.05, 47.93]],
  'Hernád': [[21.23, 48.53], [21.18, 48.40], [21.10, 48.25], [20.98, 48.10], [20.92, 48.03]],
  'Bodrog': [[21.69, 48.42], [21.57, 48.32], [21.48, 48.20], [21.41, 48.12]],
  'Sió': [[18.05, 46.91], [18.25, 46.84], [18.55, 46.75], [18.70, 46.55], [18.85, 46.38]],
  'Zala': [[16.40, 46.86], [16.59, 46.85], [16.84, 46.84], [17.05, 46.78], [17.18, 46.68], [17.24, 46.71]]
};
const smooth = pts => { let o = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`; for (let k = 1; k < pts.length - 1; k++) { const m = [(pts[k][0] + pts[k + 1][0]) / 2, (pts[k][1] + pts[k + 1][1]) / 2]; o += `Q${pts[k][0].toFixed(1)} ${pts[k][1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`; } const l = pts[pts.length - 1]; return o + `L${l[0].toFixed(1)} ${l[1].toFixed(1)}`; };
data.rivers = Object.fromEntries(Object.entries(RIV).map(([n, ll]) => [n, smooth(ll.map(v => pHU(v)))]));
data.riverLabels = { 'Duna': pHU([18.84, 46.75]).map(r1), 'Tisza': pHU([20.05, 47.05]).map(r1) };

// neighbours map
const world = JSON.parse(fs.readFileSync(path.join(NM, 'world-atlas/countries-50m.json')));
const C = topo.feature(world, world.objects.countries).features;
const NB = { 'Hungary': 'Magyarország', 'Austria': 'Ausztria', 'Slovakia': 'Szlovákia', 'Ukraine': 'Ukrajna', 'Romania': 'Románia', 'Serbia': 'Szerbia', 'Croatia': 'Horvátország', 'Slovenia': 'Szlovénia',
  'Poland': 'Lengyelország', 'Czechia': 'Csehország', 'Germany': 'Németország', 'Italy': 'Olaszország', 'Bosnia and Herz.': 'Bosznia-Hercegovina', 'Moldova': 'Moldova', 'Bulgaria': 'Bulgária', 'Montenegro': 'Montenegró', 'Kosovo': 'Koszovó', 'Switzerland': 'Svájc', 'Belarus': 'Fehéroroszország', 'North Macedonia': 'Észak-Macedónia', 'Macedonia': 'Észak-Macedónia', 'Albania': 'Albánia' };
C.forEach(f => { const hun = NB[f.properties.name]; if (!hun) return; const g = d3.geoPath(pRG); const dd = pathOf(pRG, f); if (dd.length < 10) return; const [cx, cy] = g.centroid(f); data.region[hun] = { d: dd, c: [r1(cx), r1(cy)] }; });
data.regionLakes = data.lakes.length ? pathOf(pRG, polys.sort((a, b) => d3.geoPath(pHU).area(b) - d3.geoPath(pHU).area(a))[0]) : '';

// places (lon, lat) projected onto the Hungary map
const PLACES = { 'Budapest': [19.0402, 47.4979], 'Debrecen': [21.6273, 47.5316], 'Szeged': [20.1414, 46.253], 'Miskolc': [20.7784, 48.1035], 'Pécs': [18.2323, 46.0727], 'Győr': [17.6504, 47.6875],
  'Nyíregyháza': [21.7167, 47.9554], 'Kecskemét': [19.6897, 46.8964], 'Székesfehérvár': [18.4221, 47.186], 'Szombathely': [16.6218, 47.2307], 'Szolnok': [20.1825, 47.1621], 'Eger': [20.3772, 47.9025],
  'Sopron': [16.5845, 47.6817], 'Veszprém': [17.9115, 47.0933], 'Kaposvár': [17.7968, 46.359], 'Zalaegerszeg': [16.8416, 46.8417], 'Békéscsaba': [21.0877, 46.6736], 'Tatabánya': [18.4048, 47.5692],
  'Salgótarján': [19.8034, 48.0985], 'Szekszárd': [18.7062, 46.3474], 'Kékes': [20.0094, 47.8722], 'Tihany': [17.8898, 46.9136], 'Esztergom': [18.7404, 47.7928], 'Tokaj': [21.4089, 48.1172], 'Aggtelek': [20.4996, 48.4729], 'Hortobágy': [21.1531, 47.5833],
  'Kőszeg': [16.5418, 47.3887], 'Őriszentpéter': [16.4248, 46.8409], 'Visegrád': [18.9708, 47.7853], 'Bugac': [19.6799, 46.6886], 'Badacsony': [17.4869, 46.7958], 'Hollókő': [19.5917, 47.9969],
  'Pannonhalma': [17.7553, 47.5490], 'Villány': [18.4536, 45.8689], 'Mohács': [18.6833, 45.9931], 'Szentendre': [19.0756, 47.6694], 'Gyula': [21.2847, 46.6473], 'Ópusztaszer': [20.0866, 46.4857], 'Siófok': [18.0486, 46.9041], 'Keszthely': [17.2482, 46.7681], 'Jászberény': [19.9116, 47.5005], 'Gödöllő': [19.3667, 47.6],
  'Istállós-kő': [20.418, 48.064], 'Csóványos': [18.947, 47.944], 'Írott-kő': [16.435, 47.353], 'Pilis': [18.886, 47.692], 'Zengő': [18.345, 46.181], 'Kőris-hegy': [17.749, 47.290], 'János-hegy': [18.958, 47.518],
  // centres of landscapes, for the blind-map tasks
  'Mátra': [19.95, 47.86], 'Bükk': [20.47, 48.07], 'Börzsöny': [18.95, 47.93], 'Cserhát': [19.45, 47.93], 'Zempléni-hegység': [21.45, 48.38], 'Bakony': [17.72, 47.24],
  'Vértes': [18.38, 47.42], 'Gerecse': [18.52, 47.66], 'Budai-hegység': [18.90, 47.55], 'Mecsek': [18.20, 46.17], 'Kőszegi-hegység': [16.50, 47.39], 'Keszthelyi-hegység': [17.32, 46.86],
  'Velencei-hegység': [18.62, 47.26], 'Visegrádi-hegység': [18.98, 47.75], 'Villányi-hegység': [18.40, 45.88], 'Soproni-hegység': [16.50, 47.66],
  'Balaton': [17.75, 46.85], 'Velencei-tó': [18.58, 47.21], 'Fertő tó': [16.74, 47.67], 'Tisza-tó': [20.65, 47.62],
  'Nyírség': [22.00, 47.85], 'Kiskunság': [19.50, 46.75], 'Jászság': [19.95, 47.45], 'Szigetköz': [17.45, 47.85], 'Hanság': [17.20, 47.70], 'Mezőföld': [18.60, 46.90],
  'Somogyi-dombság': [17.65, 46.48], 'Zalai-dombság': [16.85, 46.70], 'Tolnai-dombság': [18.55, 46.45], 'Gödöllői-dombság': [19.40, 47.62], 'Őrség': [16.35, 46.85] };
data.places = Object.fromEntries(Object.entries(PLACES).map(([k, v]) => [k, pHU(v).map(r1)]));

fs.writeFileSync(OUT, '/* generated by dev/tools/make-map.js from Natural Earth (public domain) */\nconst MAPDATA = ' + JSON.stringify(data) + ';\n');
console.log('counties', Object.keys(data.counties).length, '| lakes', data.lakes.map(l => l.a).join(','), '| region', Object.keys(data.region).length, '| bytes', fs.statSync(OUT).size);
