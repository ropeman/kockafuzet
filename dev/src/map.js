/* ===== Maps: Hungary with counties, the neighbours, Budapest's Danube bridges; tap-on-map question type ===== */
let _mapN = 0;
function huMap(o = {}) {
  const M = MAPDATA, cid = 'huclip' + (++_mapN); let s = `<defs><clipPath id="${cid}"><path d="${M.outline}"/></clipPath></defs>`;
  for (const [n, c] of Object.entries(M.counties)) s += `<path class="mc${o.hl === n ? ' hl' : ''}" data-a="${n}" d="${c.d}"/>`;
  s += `<path class="mc bp${o.hl === 'Budapest' ? ' hl' : ''}" data-a="Budapest" d="${M.budapest}"/>`;
  for (const [n, d] of Object.entries(M.rivers)) s += `<path class="mr${n === 'Duna' || n === 'Tisza' ? ' big' : ''}${o.hlRiver === n ? ' hl' : ''}" clip-path="url(#${cid})" d="${d}"/>`;
  if (o.rivers !== false) for (const [n, [x, y]] of Object.entries(M.riverLabels)) s += `<text class="mriv" x="${x}" y="${y}">${n}</text>`;
  s += M.lakes.map(l => `<path class="ml" d="${l.d}"/>`).join('');
  if (o.names) for (const [n, c] of Object.entries(M.counties)) s += `<text class="mname" x="${c.c[0]}" y="${c.c[1]}">${n.replace(/-(?=.{6,})/, '-​')}</text>`;
  (o.dots || []).forEach((n, i) => {
    const [x, y] = M.places[n];
    s += `<g class="md${o.mark === n ? ' hl' : ''}" data-a="${n}"><circle class="hit" cx="${x}" cy="${y}" r="20"/><circle class="dot" cx="${x}" cy="${y}" r="6"/>`;
    if (o.labels) s += `<text class="mlab" x="${x + 9}" y="${y - 7}">${o.labels === 'num' ? i + 1 : n}</text>`;
    s += '</g>';
  });
  return `<svg class="vis humap" viewBox="0 0 ${M.W} ${M.H}" width="${M.W}" height="${M.H}" aria-hidden="true">${s}</svg>`;
}
function regionMap(o = {}) {
  const M = MAPDATA, cid = 'huclip' + (++_mapN); let s = `<defs><clipPath id="${cid}"><path d="${M.outline}"/></clipPath></defs>`;
  for (const [n, c] of Object.entries(M.region)) s += `<path class="rc${n === 'Magyarország' ? ' hu' : ''}${o.hl === n ? ' hl' : ''}" data-a="${n}" d="${c.d}"/>`;
  s += `<text class="rname hu" x="${M.region['Magyarország'].c[0]}" y="${M.region['Magyarország'].c[1] + 5}">Magyarország</text>`;
  if (o.names) for (const [n, c] of Object.entries(M.region)) if (n !== 'Magyarország' && NEIGHBOURS.includes(n)) s += `<text class="rname" x="${c.c[0]}" y="${c.c[1]}">${n}</text>`;
  return `<svg class="vis regmap" viewBox="0 0 ${M.W} ${M.H}" width="${M.W}" height="${M.H}" aria-hidden="true">${s}</svg>`;
}
const NEIGHBOURS = ['Ausztria', 'Szlovákia', 'Ukrajna', 'Románia', 'Szerbia', 'Horvátország', 'Szlovénia'];
const mapCentre = (q, a) => q.map === 'region' ? MAPDATA.region[a].c : q.pick === 'dot' ? MAPDATA.places[a] : a === 'Budapest' ? MAPDATA.places.Budapest : MAPDATA.counties[a].c;

/* ---------- Koppints a térképre! ---------- */
UI.map = (q, send) => {
  let sel = null, locked = false;
  const fig = h('div', { class: 'mapfig' + (q.map === 'region' ? ' reg' : ''), html: q.map === 'region' ? regionMap() : huMap({ dots: q.dots }) });
  const sv = fig.querySelector('svg');
  const items = [...sv.querySelectorAll(q.pick === 'dot' ? '.md' : q.map === 'region' ? '.rc:not(.hu)' : '.mc')];
  if (q.map === 'region') sv.querySelectorAll('.rc:not(.hu)').forEach(el => { if (!NEIGHBOURS.includes(el.dataset.a)) el.classList.add('far'); });
  const sb = h('button', { class: 'btn primary', disabled: true, onclick: () => send(sel) }, 'Kész');
  const choose = a => { if (locked) return; sel = a; items.forEach(el => el.classList.toggle('sel', el.dataset.a === a)); sb.disabled = false; };
  items.forEach(el => {
    el.classList.add('tap'); el.setAttribute('tabindex', '0'); el.setAttribute('role', 'button');
    el.addEventListener('click', () => choose(el.dataset.a));
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(el.dataset.a); } });
  });
  const tag = (a, cls) => {
    const [x, y] = mapCentre(q, a), t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('x', x); t.setAttribute('y', q.pick === 'dot' ? y - 12 : y + 5); t.setAttribute('class', 'mtag ' + cls); t.textContent = a; sv.append(t);
  };
  const el = a => items.find(x => x.dataset.a === a);
  return {
    el: h('div', { class: 'mapwrap' }, h('p', { class: 'mute ihelp' }, q.pick === 'dot' ? 'Koppints a megfelelő pontra, aztán nyomd meg a Kész gombot.' : 'Koppints a térképen a helyes területre, aztán nyomd meg a Kész gombot.'), fig), submitBtn: sb,
    wrong(r) { const w = el(r); if (w) { w.classList.remove('sel'); w.classList.add('was-wrong'); } sel = null; sb.disabled = true; },
    lock(r, ok) {
      locked = true; items.forEach(x => { x.classList.remove('sel', 'tap'); x.removeAttribute('tabindex'); });
      const a = el(q.answer); if (a) a.classList.add('right');
      if (!ok && r && r !== q.answer && el(r)) { el(r).classList.add('wrong'); tag(r, 'bad'); }
      tag(q.answer, 'good');
    },
    done() { sb.remove(); }
  };
};
UI.map.judge = (q, r) => r === q.answer;
function mapQ(prompt, answer, o = {}) {
  return { type: 'map', map: o.map || 'hu', pick: o.pick || 'area', dots: o.dots, prompt, answer, answerText: answer, hint: o.hint, speak: o.speak };
}

/* ---------- Budapest's Danube bridges (schematic, north at the top) ---------- */
const BRIDGES = [
  { n: 'Megyeri híd', y: 30, c: '#495057' }, { n: 'Árpád híd', y: 84, c: '#495057' }, { n: 'Margit híd', y: 132, c: '#a0742b' }, { n: 'Lánchíd', y: 174, c: '#6c757d' },
  { n: 'Erzsébet híd', y: 208, c: '#f8f9fa' }, { n: 'Szabadság híd', y: 240, c: '#2f9e44' }, { n: 'Petőfi híd', y: 272, c: '#495057' }, { n: 'Rákóczi híd', y: 304, c: '#495057' }
];
const dcx = y => 132 + 14 * Math.sin((y - 20) / 55);
function danubeSvg(o = {}) {
  const ys = []; for (let y = 0; y <= 340; y += 10) ys.push(y);
  const L = ys.map(y => `${(dcx(y) - 22).toFixed(1)} ${y}`), R = ys.map(y => `${(dcx(y) + 22).toFixed(1)} ${y}`).reverse();
  let s = `<rect x="0" y="0" width="260" height="340" class="f-soft"/>`;
  s += `<path d="M${L.join(' L')} L${R.join(' L')} Z" fill="#74c0fc" stroke="#1c7ed6" stroke-width="2"/>`;
  const mx = dcx(108);
  s += `<ellipse cx="${mx.toFixed(1)}" cy="108" rx="8" ry="21" fill="#8ce99a" stroke="#2b8a3e" stroke-width="1.5"/>`;
  s += `<path d="M${(dcx(340) - 9).toFixed(1)} 340 Q${dcx(322).toFixed(1)} 314 ${(dcx(340) + 9).toFixed(1)} 340Z" fill="#8ce99a" stroke="#2b8a3e" stroke-width="1.5"/>`;
  BRIDGES.forEach((b, i) => {
    const x1 = dcx(b.y) - 30, x2 = dcx(b.y) + 30, hl = o.hl === i, st = hl ? '#e03131' : b.c, w = hl ? 9 : 6;
    const path = b.n === 'Margit híd' ? `M${x1.toFixed(1)} ${b.y + 4} L${dcx(b.y - 3).toFixed(1)} ${b.y - 3} L${x2.toFixed(1)} ${b.y + 4}` : `M${x1.toFixed(1)} ${b.y} L${x2.toFixed(1)} ${b.y}`;
    if (hl) s += `<path d="${path}" fill="none" stroke="#ffd43b" stroke-width="16" stroke-linecap="round" opacity=".8"/>`;
    s += `<path d="${path}" fill="none" stroke="#1d2742" stroke-width="${w + 3}" stroke-linecap="round"/><path d="${path}" fill="none" stroke="${st}" stroke-width="${w}" stroke-linecap="round"/>`;
    if (b.n === 'Lánchíd') [-11, 11].forEach(d => { s += `<rect x="${(dcx(b.y) + d - 4).toFixed(1)}" y="${b.y - 10}" width="8" height="20" rx="1.5" fill="#ced4da" stroke="#1d2742" stroke-width="1.5"/>`; });
    if (b.n === 'Megyeri híd') s += `<path d="M${dcx(b.y).toFixed(1)} ${b.y - 16} L${dcx(b.y).toFixed(1)} ${b.y} M${dcx(b.y).toFixed(1)} ${b.y - 16} L${(dcx(b.y) - 24).toFixed(1)} ${b.y} M${dcx(b.y).toFixed(1)} ${b.y - 16} L${(dcx(b.y) + 24).toFixed(1)} ${b.y}" stroke="#1d2742" stroke-width="1.5" fill="none"/>`;
    if (o.names) s += `<text x="${(x2 + 8).toFixed(1)}" y="${b.y + 4}" font-size="11" class="f-ink">${b.n}</text>`;
  });
  s += `<text x="34" y="190" font-size="20" class="f-ink" text-anchor="middle">Buda</text><text x="${o.names ? 240 : 228}" y="${o.names ? 330 : 190}" font-size="20" class="f-ink" text-anchor="middle">Pest</text>`;
  s += `<text x="20" y="24" font-size="13" class="f-ink">É ▲</text>`;
  if (!o.names) s += `<text x="${(mx + 13).toFixed(1)}" y="112" font-size="10" class="f-ink">Margit-sziget</text><text x="${(dcx(330) + 14).toFixed(1)}" y="334" font-size="10" class="f-ink">Csepel-sziget</text>`;
  return svg(260, 340, s, 'danube');
}
