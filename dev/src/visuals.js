/* ===== Matematika: visuals ===== */
const DICE = { 1: [[1, 1]], 2: [[0, 0], [2, 2]], 3: [[0, 0], [1, 1], [2, 2]], 4: [[0, 0], [2, 0], [0, 2], [2, 2]], 5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]], 6: [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]] };
function diceSvg(n) {
  const c = DICE[n].map(([x, y]) => `<circle cx="${30 + x * 30}" cy="${30 + y * 30}" r="10" class="f-blue"/>`).join('');
  return svg(120, 120, `<rect x="4" y="4" width="112" height="112" rx="18" class="f-card s-ink" stroke-width="4"/>${c}`, 'dice');
}
function frames(parts) {           // ten-frames; parts = [[count, cssClass], ...]
  const cells = []; parts.forEach(([n, cls]) => { for (let i = 0; i < n; i++) cells.push(cls); });
  const nf = Math.max(1, Math.ceil(cells.length / 10)); let out = '';
  for (let f = 0; f < nf; f++) {
    const ox = f * 156 + 4;
    out += `<rect x="${ox}" y="4" width="140" height="56" class="f-none s-ink" stroke-width="3"/>`;
    for (let i = 1; i < 5; i++) out += `<line x1="${ox + i * 28}" y1="4" x2="${ox + i * 28}" y2="60" class="s-line" stroke-width="2"/>`;
    out += `<line x1="${ox}" y1="32" x2="${ox + 140}" y2="32" class="s-line" stroke-width="2"/>`;
    for (let i = 0; i < 10; i++) { const cls = cells[f * 10 + i]; if (cls) out += `<circle cx="${ox + (i % 5) * 28 + 14}" cy="${i < 5 ? 18 : 46}" r="10" class="${cls}"/>`; }
  }
  return svg(nf * 156, 64, out, 'frames');
}
function clockSvg(hh, mm, size = 170) {
  let s = `<circle cx="70" cy="70" r="66" class="f-card s-ink" stroke-width="4"/>`;
  for (let i = 0; i < 60; i++) { const a = i * 6 * Math.PI / 180, r1 = i % 5 ? 60 : 56; s += `<line x1="${70 + r1 * Math.sin(a)}" y1="${70 - r1 * Math.cos(a)}" x2="${70 + 63 * Math.sin(a)}" y2="${70 - 63 * Math.cos(a)}" class="s-ink" stroke-width="${i % 5 ? 1 : 2.5}"/>`; }
  for (let i = 1; i <= 12; i++) { const a = i * 30 * Math.PI / 180; s += `<text x="${70 + 45 * Math.sin(a)}" y="${70 - 45 * Math.cos(a) + 5}" text-anchor="middle" font-size="15" class="f-ink">${i}</text>`; }
  const ha = ((hh % 12) * 30 + mm * .5) * Math.PI / 180, ma = mm * 6 * Math.PI / 180;
  s += `<line x1="70" y1="70" x2="${70 + 30 * Math.sin(ha)}" y2="${70 - 30 * Math.cos(ha)}" class="s-ink" stroke-width="6" stroke-linecap="round"/>`;
  s += `<line x1="70" y1="70" x2="${70 + 50 * Math.sin(ma)}" y2="${70 - 50 * Math.cos(ma)}" class="s-blue" stroke-width="3.5" stroke-linecap="round"/>`;
  s += `<circle cx="70" cy="70" r="4" class="f-ink"/>`;
  return svg(140, 140, s).replace('<svg ', `<svg style="width:${size}px" `);
}
function polySvg(n, rot = 0, sx = 1, sy = 1) {
  const pts = []; for (let i = 0; i < n; i++) { const a = rot + i * 2 * Math.PI / n - Math.PI / 2; pts.push(`${(60 + 50 * Math.cos(a) * sx).toFixed(1)},${(60 + 50 * Math.sin(a) * sy).toFixed(1)}`); }
  return svg(120, 120, `<polygon points="${pts.join(' ')}" class="f-hi s-ink" stroke-width="4" stroke-linejoin="round"/>`);
}
const SHAPES = {
  'háromszög': r => svg(120, 120, `<polygon points="${pick([['60,10 112,104 8,104'], ['20,104 108,104 70,12'], ['14,100 106,92 40,16']])[0]}" class="f-hi s-ink" stroke-width="4" stroke-linejoin="round"/>`),
  'négyzet': r => svg(120, 120, `<rect x="22" y="22" width="76" height="76" class="f-hi s-ink" stroke-width="4" ${r ? `transform="rotate(${r} 60 60)"` : ''}/>`),
  'téglalap': r => svg(120, 120, `<rect x="10" y="32" width="100" height="56" class="f-hi s-ink" stroke-width="4" ${r ? `transform="rotate(${r} 60 60)"` : ''}/>`),
  'kör': () => svg(120, 120, `<circle cx="60" cy="60" r="48" class="f-hi s-ink" stroke-width="4"/>`),
  'ötszög': r => polySvg(5, (r || 0) * Math.PI / 180),
  'hatszög': r => polySvg(6, (r || 0) * Math.PI / 180)
};
function pieSvg(n, k) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const a0 = i * 2 * Math.PI / n - Math.PI / 2, a1 = (i + 1) * 2 * Math.PI / n - Math.PI / 2;
    const p = a => `${(60 + 54 * Math.cos(a)).toFixed(2)} ${(60 + 54 * Math.sin(a)).toFixed(2)}`;
    s += `<path d="M60 60 L${p(a0)} A54 54 0 ${(a1 - a0) > Math.PI ? 1 : 0} 1 ${p(a1)} Z" class="${i < k ? 'f-hi' : 'f-card'} s-ink" stroke-width="3" stroke-linejoin="round"/>`;
  }
  return svg(120, 120, s);
}
function numLine(lo, hi, v) {
  const x = n => 20 + (n - lo) * (320 / (hi - lo));
  let s = `<line x1="${x(lo) - 10}" y1="40" x2="${x(hi) + 10}" y2="40" class="s-ink" stroke-width="3"/>`;
  for (let n = lo; n <= hi; n++) {
    const big = n % 5 === 0;
    s += `<line x1="${x(n)}" y1="${big ? 30 : 34}" x2="${x(n)}" y2="${big ? 50 : 46}" class="s-ink" stroke-width="${big ? 3 : 2}"/>`;
    if (big) s += `<text x="${x(n)}" y="72" text-anchor="middle" font-size="15" class="f-ink">${String(n).replace('-', '−')}</text>`;
  }
  s += `<circle cx="${x(v)}" cy="40" r="9" class="f-red s-ink" stroke-width="3"/>`;
  return svg(360, 82, s);
}
function rectSvg(a, b, label = true) {
  const sc = Math.min(210 / Math.max(a, b), 26), w = a * sc, hh = b * sc, ox = 40, oy = 30;
  let s = `<rect x="${ox}" y="${oy}" width="${w}" height="${hh}" class="f-hi s-ink" stroke-width="4"/>`;
  if (label) s += `<text x="${ox + w / 2}" y="${oy - 8}" text-anchor="middle" font-size="18" class="f-ink">${a} cm</text><text x="${ox + w + 8}" y="${oy + hh / 2 + 6}" font-size="18" class="f-ink">${b} cm</text>`;
  return svg(ox + w + 80, oy + hh + 14, s);
}
function gridRect(w, hh) {
  const sc = Math.min(32, 280 / w); let s = '';
  for (let i = 0; i < w; i++) for (let j = 0; j < hh; j++) s += `<rect x="${4 + i * sc}" y="${4 + j * sc}" width="${sc}" height="${sc}" class="f-hi s-ink" stroke-width="1.5"/>`;
  return svg(w * sc + 8, hh * sc + 8, s);
}
const col = (a, op, b) => {
  const A = String(a), B = String(b), w = Math.max(A.length, B.length + 2);
  return `<div class="col"><div>${A.padStart(w)}</div><div class="u">${(op + ' ' + B).padStart(w)}</div></div>`;
};

/* ===== shared helpers for grades 2–3 ===== */
// Hungarian article before a number written in digits: "az 5", "a 7", "az 1 000"
const azN = n => {
  const s = String(Math.abs(n)); if (n < 0) return 'a';
  if (s[0] === '5') return 'az';
  if (s[0] === '1') return (s.length === 1 || s.length === 4) ? 'az' : 'a';
  return 'a';
};
const Az = n => azN(n) === 'az' ? 'Az' : 'A';
// base-ten blocks: tens as rods, ones as cubes
function blocks(t, e) {
  let s = '', x = 4;
  for (let i = 0; i < t; i++) { for (let j = 0; j < 10; j++) s += `<rect x="${x}" y="${4 + j * 12}" width="12" height="12" class="f-blue s-ink" stroke-width="1"/>`; x += 18; }
  x += 10;
  for (let i = 0; i < e; i++) s += `<rect x="${x + (i % 3) * 16}" y="${112 - Math.floor(i / 3) * 16}" width="12" height="12" class="f-hi s-ink" stroke-width="1"/>`;
  return svg(x + 52, 128, s);
}
// forint coins and notes
const COIN = { 5: ['#e3b23c', '#e3b23c'], 10: ['#c9ced8', '#c9ced8'], 20: ['#e3b23c', '#e3b23c'], 50: ['#c9ced8', '#c9ced8'], 100: ['#c9ced8', '#e3b23c'], 200: ['#e3b23c', '#c9ced8'] };
const NOTE = { 500: '#c98bb9', 1000: '#7fa7d9', 2000: '#b9905c', 5000: '#d9a441', 10000: '#c9786b', 20000: '#7fb39a' };
function moneySvg(list) {
  let s = '', x = 6; const H = 96;
  list.forEach(v => {
    if (NOTE[v]) {
      s += `<g transform="translate(${x} 12)"><rect width="128" height="70" rx="6" fill="${NOTE[v]}" stroke="#1d2742" stroke-opacity=".5" stroke-width="2"/><rect x="8" y="8" width="112" height="54" rx="4" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2"/><text x="64" y="44" text-anchor="middle" font-size="24" fill="#1d2742" font-weight="700">${fmt(v)}</text><text x="64" y="60" text-anchor="middle" font-size="11" fill="#1d2742">FORINT</text></g>`;
      x += 138;
    } else {
      const r = v >= 100 ? 34 : v >= 20 ? 31 : 27, [ring, core] = COIN[v];
      s += `<g transform="translate(${x + r} ${H / 2})"><circle r="${r}" fill="${ring}" stroke="#1d2742" stroke-opacity=".45" stroke-width="2"/>${ring !== core ? `<circle r="${r - 9}" fill="${core}"/>` : `<circle r="${r - 5}" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2"/>`}<text y="8" text-anchor="middle" font-size="${v >= 100 ? 21 : 22}" fill="#1d2742" font-weight="700">${v}</text><text y="22" text-anchor="middle" font-size="9" fill="#1d2742">Ft</text></g>`;
      x += 2 * r + 10;
    }
  });
  return svg(x, H, s, 'money');
}
// Roman numerals
const ROMAN = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
const toRoman = n => { let s = ''; for (const [v, r] of ROMAN) while (n >= v) { s += r; n -= v; } return s; };
// Hungarian clock phrases: negyed 3 = 2:15, fél 3 = 2:30, háromnegyed 3 = 2:45
const huTime = (hh, mm) => { const nx = hh % 12 + 1; return mm === 0 ? `${hh} óra` : mm === 15 ? `negyed ${nx}` : mm === 30 ? `fél ${nx}` : `háromnegyed ${nx}`; };
const relOpts = { fmt: v => ({ '<': '&lt;', '>': '&gt;', '=': '=' })[v] };
// '2-es', '3-as', '5-ös', '6-os' … (the 3-as szorzótábla)
const esN = n => n + '-' + ({ 1: 'es', 2: 'es', 3: 'as', 4: 'es', 5: 'ös', 6: 'os', 7: 'es', 8: 'as', 9: 'es', 10: 'es' })[n];
// accusative and allative forms of small numbers: 3-at, 5-öt; 3-hoz, 5-höz
const accN = n => n + '-' + ({ 1: 'et', 2: 't', 3: 'at', 4: 'et', 5: 'öt', 6: 'ot', 7: 'et', 8: 'at', 9: 'et', 10: 'et', 11: 'et', 12: 't', 13: 'at', 14: 'et', 15: 'öt' }[n] || 't');
const hozN = n => n + '-' + ({ 1: 'hez', 2: 'höz', 3: 'hoz', 4: 'hez', 5: 'höz', 6: 'hoz', 7: 'hez', 8: 'hoz', 9: 'hez', 10: 'hez' }[n] || 'hoz');
