/* ===== Így működik: step-by-step worked examples ===== */
// Hungarian suffix -n/-on/-en/-ön after a clock number (a 3-on, az 5-ön, a 12-n)
const onN = n => n + '-' + ({ 1: 'en', 2: 'n', 3: 'on', 4: 'en', 5: 'ön', 6: 'on', 7: 'en', 8: 'on', 9: 'en', 10: 'en', 11: 'en', 12: 'n' }[n] || 'n');
const PLACES = ['egyesek', 'tízesek', 'százasok', 'ezresek', 'tízezresek'];
const num = s => Number(String(s).replace(/[\s ]/g, ''));

/* ---------- work out which explanation fits a question ---------- */
function deriveEx(q, pageId, topicId) {
  if (!q) return null;
  const P = String(q.prompt || ''), V = String(q.visual || ''), A = q.answer;
  let m;
  if ((m = V.match(/<div class="col"><div>\s*([\d]+)<\/div><div class="u">\s*([+−·])\s+(\d+)<\/div>/))) {
    const a = num(m[1]), b = num(m[3]);
    if (m[2] === '+') return { k: 'coladd', a, b };
    if (m[2] === '−' && a >= b) return { k: 'colsub', a, b };
    return null;
  }
  if (topicId !== 'place' && (m = P.match(/^(\d[\d\s]*) ([+−]) (\d[\d\s]*) = <span class="blank">/))) {
    const a = num(m[1]), b = num(m[3]);
    if (m[2] === '+') return { k: 'add', a, b };
    if (a >= b) return { k: 'sub', a, b };
  }
  if ((m = P.match(/^(\d+) · (\d+) = <span class="blank">/)) && +m[1] <= 10 && +m[2] <= 10) return { k: 'mul', a: +m[1], b: +m[2] };
  if ((m = P.match(/^(\d+) : (\d+) = /)) && +m[1] <= 100 && +m[2] <= 10 && +m[2] >= 2) return { k: 'divrem', a: +m[1], b: +m[2] };
  if ((m = P.match(/^Mennyi az? (\d+) (fele|harmada|negyede|ötöde|hatoda|nyolcada|tizede)\?/))) {
    const n = { fele: 2, harmada: 3, negyede: 4, 'ötöde': 5, hatoda: 6, nyolcada: 8, tizede: 10 }[m[2]];
    return +m[1] <= 100 ? { k: 'fracof', W: +m[1], n, kk: 1 } : null;
  }
  if ((m = P.match(/(\d+) <span class="frac"><span>(\d+)<\/span><span>(\d+)<\/span><\/span> része/)) && +m[1] <= 100) return { k: 'fracof', W: +m[1], n: +m[3], kk: +m[2] };
  if (/^Mekkora része van/.test(P) && typeof A === 'string' && (m = A.match(/^(\d+)\/(\d+)$/))) return { k: 'pie', kk: +m[1], n: +m[2] };
  const clockTopic = ['matek-1/clock', 'matek-2/clock', 'jatek-ora/half', 'jatek-ora/quarter', 'jatek-ora/five'].includes(`${pageId}/${topicId}`);
  if (clockTopic && typeof A === 'string') {
    if ((m = A.match(/^(\d{1,2}):(\d\d)$/))) return { k: 'clock', hh: +m[1], mm: +m[2] };
    if ((m = A.match(/^(\d+) óra$/))) return { k: 'clock', hh: +m[1], mm: 0 };
    if ((m = A.match(/^(negyed|fél|háromnegyed) (\d+)$/))) { const nx = +m[2], hh = nx === 1 ? 12 : nx - 1; return { k: 'clock', hh, mm: { negyed: 15, 'fél': 30, 'háromnegyed': 45 }[m[1]] }; }
  }
  if ((m = P.match(/^Melyik (?:betű )?hiányzik\? <b>(.*?)<span class="blank">…<\/span>(.*?)<\/b>/)) && typeof A === 'string') {
    const w = m[1] + A + m[2], i = m[1].length, vowel = /^[aáeéiíoóöőuúüű]$/.test(A), dbl = /^(.)\1$/.test(A);
    if (vowel || dbl || (A.length === 1 && q.options && q.options.some(o => o.value === A + A))) return { k: 'length', w, i, g: A, vowel };
  }
  if ((m = P.match(/(?:Hány szótagú ez a szó|Hogyan választjuk el ezt a szót): <b>([^<]+)<\/b>/) || P.match(/(?:Hány szótagú|Hogyan választjuk el) az? <b>([^<]+)<\/b> szó/))) {
    const plain = m[1], hy = (typeof HYPH2 !== 'undefined' ? HYPH2 : []).concat(HYPH).find(x => x.replace(/-/g, '') === plain);
    if (hy) return { k: 'syl', w: hy };
  }
  return null;
}

/* ---------- drawing helpers ---------- */
function jumpLine(start, jumps, upto) {
  const pts = [start]; let v = start; jumps.forEach(j => { v += j; pts.push(v); });
  const lo0 = Math.min(...pts), hi0 = Math.max(...pts), span = hi0 - lo0;
  const unit = span > 300 ? 100 : span > 30 ? 10 : 1;
  const lo = Math.floor(lo0 / (unit * (unit === 1 ? 5 : 1))) * unit * (unit === 1 ? 5 : 1), hi = Math.ceil(hi0 / (unit * (unit === 1 ? 5 : 1))) * unit * (unit === 1 ? 5 : 1) || lo + 10;
  const W = 560, x = n => 24 + (n - lo) / (hi - lo) * (W - 48), y = 96;
  const tick = unit === 1 ? 1 : unit === 10 ? (hi - lo <= 120 ? 1 : 10) : 10, lab = unit === 1 ? 5 : unit === 10 ? 10 : 100;
  let s = `<line x1="${x(lo) - 12}" y1="${y}" x2="${x(hi) + 12}" y2="${y}" class="s-ink" stroke-width="3"/>`;
  if ((hi - lo) / tick <= 160) for (let n = lo; n <= hi; n += tick) { const big = n % lab === 0; s += `<line x1="${x(n)}" y1="${y - (big ? 9 : 5)}" x2="${x(n)}" y2="${y + (big ? 9 : 5)}" class="s-ink" stroke-width="${big ? 2.5 : 1.2}"/>`; }
  for (let n = lo; n <= hi; n += lab) s += `<text x="${x(n)}" y="${y + 30}" text-anchor="middle" font-size="14" class="f-ink">${n}</text>`;
  let p = start;
  jumps.slice(0, upto).forEach((j, i) => {
    const a = x(p), b = x(p + j), mid = (a + b) / 2, hgt = Math.min(60, Math.max(26, Math.abs(b - a) * .45));
    s += `<path d="M${a} ${y - 4} Q${mid} ${y - 4 - hgt * 2} ${b} ${y - 4}" fill="none" class="${j > 0 ? 's-blue' : 's-red'} ${i === upto - 1 ? 'ex-new' : ''}" stroke-width="3" marker-end="url(#ah)"/>`;
    s += `<text x="${mid}" y="${y - 10 - hgt}" text-anchor="middle" font-size="16" class="${j > 0 ? 'f-blue' : 'f-red'}" font-weight="700">${j > 0 ? '+' : '−'}${Math.abs(j)}</text>`;
    p += j;
  });
  s += `<circle cx="${x(start)}" cy="${y}" r="7" class="f-ink"/><circle cx="${x(p)}" cy="${y}" r="9" class="f-hi s-ink" stroke-width="2.5"/>`;
  s += `<text x="${x(p)}" y="${y + 52}" text-anchor="middle" font-size="18" font-weight="700" class="f-ink">${p}</text>`;
  return svg(W, 160, `<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="context-stroke" class="f-ink"/></marker></defs>${s}`, 'ex-svg');
}
function dotRows(rows, cols, showRows) {
  const r = 11, gap = 30, w = cols * gap + 20, hh = rows * gap + 20; let s = '';
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) s += `<circle cx="${20 + j * gap}" cy="${20 + i * gap}" r="${r}" class="${i < showRows ? (i === showRows - 1 ? 'f-hi s-ink ex-new' : 'f-blue') : 'f-none s-line'}" stroke-width="2"/>`;
  for (let i = 0; i < showRows; i++) s += `<text x="${cols * gap + 4}" y="${26 + i * gap}" font-size="14" class="f-ink">${(i + 1) * cols}</text>`;
  return svg(w + 30, hh, s, 'ex-svg');
}
function groupDots(total, size, showGroups) {
  const q = Math.floor(total / size), r = total % size, cols = Math.min(size, 5), rowsIn = Math.ceil(size / cols);
  const gw = cols * 18 + 14, gh = rowsIn * 18 + 14, per = Math.max(1, Math.floor(540 / (gw + 10)));
  let s = '', gi = 0;
  const place = k => [6 + (k % per) * (gw + 10), 6 + Math.floor(k / per) * (gh + 10)];
  for (; gi < q; gi++) {
    const [ox, oy] = place(gi), on = gi < showGroups;
    if (on) s += `<rect x="${ox}" y="${oy}" width="${gw}" height="${gh}" rx="10" class="f-soft s-blue ${gi === showGroups - 1 ? 'ex-new' : ''}" stroke-width="2"/>`;
    for (let d = 0; d < size; d++) s += `<circle cx="${ox + 14 + (d % cols) * 18}" cy="${oy + 14 + Math.floor(d / cols) * 18}" r="6.5" class="${on ? 'f-blue' : 'f-none s-line'}" stroke-width="1.5"/>`;
  }
  if (r) { const [ox, oy] = place(gi); for (let d = 0; d < r; d++) s += `<circle cx="${ox + 14 + (d % cols) * 18}" cy="${oy + 14 + Math.floor(d / cols) * 18}" r="6.5" class="${showGroups >= q ? 'f-red' : 'f-none s-line'}" stroke-width="1.5"/>`; }
  const rowsTot = Math.ceil((q + (r ? 1 : 0)) / per);
  return svg(Math.min(per, q + (r ? 1 : 0)) * (gw + 10) + 8, rowsTot * (gh + 10) + 8, s, 'ex-svg');
}
function colGrid(a, op, b, opt) {   // opt: { res: digits shown from right, cur: column index, carries: {col: '1'}, bplus: {col: '+1'} }
  const A = String(a), B = String(b), R = String(opt.full), n = Math.max(A.length, B.length, R.length);
  const cell = (txt, cls = '') => `<span class="cg ${cls}">${txt}</span>`;
  const colCls = i => (i === opt.cur ? ' cur' : '');
  const row = (str, from) => Array.from({ length: n }, (_, k) => { const i = n - 1 - k, ch = str[str.length - 1 - i]; return cell(ch !== undefined ? ch : '', colCls(i) + (from ? ' ' + from : '')); }).join('');
  const carry = Array.from({ length: n }, (_, k) => { const i = n - 1 - k; return cell(opt.carries && opt.carries[i] ? opt.carries[i] : '', 'carry' + colCls(i)); }).join('');
  const brow = Array.from({ length: n }, (_, k) => { const i = n - 1 - k, ch = B[B.length - 1 - i]; return cell((ch !== undefined ? ch : '') + (opt.bplus && opt.bplus[i] ? `<sup>${opt.bplus[i]}</sup>` : ''), colCls(i)); }).join('');
  const res = Array.from({ length: n }, (_, k) => { const i = n - 1 - k, ch = R[R.length - 1 - i]; return cell(i < opt.res && ch !== undefined ? ch : '', 'res' + colCls(i) + (i === opt.res - 1 ? ' ex-new' : '')); }).join('');
  return `<div class="cgrid" style="--n:${n}">${cell('')}${carry}${cell('')}${row(A)}${cell(op, 'op')}${brow}<span class="cline"></span>${cell('')}${res}</div>`;
}
function clockEx(hh, mm, mode) {
  let s = `<circle cx="70" cy="70" r="66" class="f-card s-ink" stroke-width="4"/>`;
  if (mode === 'min' || mode === 'all') { const ma = mm * 6 * Math.PI / 180, big = mm > 30 ? 1 : 0; if (mm > 0) s += `<path d="M70 70 L70 12 A58 58 0 ${big} 1 ${70 + 58 * Math.sin(ma)} ${70 - 58 * Math.cos(ma)} Z" class="f-hi ex-new" opacity=".55"/>`; }
  for (let i = 0; i < 60; i++) { const a = i * 6 * Math.PI / 180, r1 = i % 5 ? 60 : 56; s += `<line x1="${70 + r1 * Math.sin(a)}" y1="${70 - r1 * Math.cos(a)}" x2="${70 + 63 * Math.sin(a)}" y2="${70 - 63 * Math.cos(a)}" class="s-ink" stroke-width="${i % 5 ? 1 : 2.5}"/>`; }
  for (let i = 1; i <= 12; i++) { const a = i * 30 * Math.PI / 180; s += `<text x="${70 + 45 * Math.sin(a)}" y="${70 - 45 * Math.cos(a) + 5}" text-anchor="middle" font-size="15" class="f-ink">${i}</text>`; }
  const ha = ((hh % 12) * 30 + mm * .5) * Math.PI / 180, ma = mm * 6 * Math.PI / 180;
  const hourOn = mode !== 'min', minOn = mode !== 'hour';
  s += `<line x1="70" y1="70" x2="${70 + 30 * Math.sin(ha)}" y2="${70 - 30 * Math.cos(ha)}" class="${hourOn ? 's-red' : 's-line'}" stroke-width="${mode === 'hour' ? 8 : 6}" stroke-linecap="round"/>`;
  s += `<line x1="70" y1="70" x2="${70 + 50 * Math.sin(ma)}" y2="${70 - 50 * Math.cos(ma)}" class="${minOn ? 's-blue' : 's-line'}" stroke-width="${mode === 'min' ? 6 : 3.5}" stroke-linecap="round"/>`;
  s += `<circle cx="70" cy="70" r="4" class="f-ink"/>`;
  return svg(140, 140, s, 'ex-svg ex-clock');
}
const tiles = (toks, cls = () => '', divs = new Set()) => `<div class="ltiles">${toks.map((g, i) => (divs.has(i) ? '<span class="ldiv ex-new">-</span>' : '') + `<span class="lt ${cls(i)}">${g}</span>`).join('')}</div>`;

/* ---------- explanations: each returns [{ v: visual html, t: caption }] ---------- */
const EXPLAIN = {
  add({ a, b }) {
    const s = a + b;
    if (a < 10 && b < 10 && s > 10) {
      const need = 10 - a, rest = b - need;
      return [
        { v: frames([[a, 'f-blue']]), t: `${a} + ${b} = ? Van ${a} kék pötty.` },
        { v: frames([[a, 'f-blue'], [need, 'f-red']]), t: `Töltsük fel a tízes keretet! A 10-hez még ${need} kell: ${a} + ${need} = 10.` },
        { v: frames([[a, 'f-blue'], [need, 'f-red'], [rest, 'f-hi']]), t: `A második számból már ${need} elfogyott, még ${rest} maradt.` },
        { v: frames([[a, 'f-blue'], [need, 'f-red'], [rest, 'f-hi']]), t: `10 + ${rest} = ${s}. Tehát ${a} + ${b} = ${s}.` }];
    }
    if (s <= 20) return [{ v: frames([[a, 'f-blue']]), t: `Van ${a} pötty.` }, { v: frames([[a, 'f-blue'], [b, 'f-red']]), t: `Hozzáteszünk még ${b} pöttyöt.` }, { v: frames([[a, 'f-blue'], [b, 'f-red']]), t: `Összesen ${s}. Tehát ${a} + ${b} = ${s}.` }];
    const unit = a >= 100 && b % 10 === 0 && b >= 100 ? 100 : 10;
    const t = b - b % unit, e = b % unit, nextR = Math.ceil((a + t) / unit) * unit, x = Math.min(e, nextR - (a + t)), y = e - x;
    const jumps = [t, x, y].filter(j => j > 0), steps = [{ v: jumpLine(a, jumps, 0), t: `${a} + ${b} = ? Induljunk el az első számtól a számegyenesen.` }];
    let cur = a, k = 0;
    if (t) { k++; steps.push({ v: jumpLine(a, jumps, k), t: `Előbb hozzáadjuk a ${unit === 100 ? 'százasokat' : 'tízeseket'}: ${cur} + ${t} = ${cur + t}.` }); cur += t; }
    if (x) { k++; steps.push({ v: jumpLine(a, jumps, k), t: y ? `Kiegészítjük a következő kerek ${unit === 100 ? 'százasig' : 'tízesig'}: ${cur} + ${x} = ${cur + x}.` : `Hozzáadjuk az egyeseket: ${cur} + ${x} = ${cur + x}.` }); cur += x; }
    if (y) { k++; steps.push({ v: jumpLine(a, jumps, k), t: `Hozzáadjuk, ami még maradt: ${cur} + ${y} = ${cur + y}.` }); cur += y; }
    steps.push({ v: jumpLine(a, jumps, jumps.length), t: `Megérkeztünk: ${a} + ${b} = ${s}.` });
    return steps;
  },
  sub({ a, b }) {
    const d = a - b;
    if (a <= 20 && b < 10 && a > 10 && a - b < 10) {
      const u = a - 10, rest = b - u;
      return [
        { v: frames([[a, 'f-blue']]), t: `${a} − ${b} = ? Van ${a} pötty: egy teli tízes keret és még ${u}.` },
        { v: frames([[10, 'f-blue'], [u, 'f-none s-red']]), t: `Előbb elveszünk ${u} pöttyöt, hogy éppen 10 maradjon.` },
        { v: frames([[10 - rest, 'f-blue'], [rest, 'f-none s-red']]), t: `Még ${rest} pöttyöt kell elvenni: 10 − ${rest} = ${d}.` },
        { v: frames([[d, 'f-blue']]), t: `Tehát ${a} − ${b} = ${d}.` }];
    }
    if (a <= 20) return [{ v: frames([[a, 'f-blue']]), t: `Van ${a} pötty.` }, { v: frames([[d, 'f-blue'], [b, 'f-none s-red']]), t: `Elveszünk ${b} pöttyöt.` }, { v: frames([[d, 'f-blue']]), t: `Maradt ${d}. Tehát ${a} − ${b} = ${d}.` }];
    const unit = a >= 100 && b % 100 === 0 ? 100 : 10;
    const t = b - b % unit, e = b % unit, low = Math.floor((a - t) / unit) * unit, x = Math.min(e, (a - t) - low), y = e - x;
    const jumps = [-t, -x, -y].filter(j => j < 0), steps = [{ v: jumpLine(a, jumps, 0), t: `${a} − ${b} = ? Induljunk el ${azN(a)} ${a} számtól, és lépjünk visszafelé.` }];
    let cur = a, k = 0;
    if (t) { k++; steps.push({ v: jumpLine(a, jumps, k), t: `Előbb elvesszük a ${unit === 100 ? 'százasokat' : 'tízeseket'}: ${cur} − ${t} = ${cur - t}.` }); cur -= t; }
    if (x) { k++; steps.push({ v: jumpLine(a, jumps, k), t: y ? `Visszalépünk a kerek ${unit === 100 ? 'százasig' : 'tízesig'}: ${cur} − ${x} = ${cur - x}.` : `Elvesszük az egyeseket: ${cur} − ${x} = ${cur - x}.` }); cur -= x; }
    if (y) { k++; steps.push({ v: jumpLine(a, jumps, k), t: `Elvesszük, ami még maradt: ${cur} − ${y} = ${cur - y}.` }); cur -= y; }
    steps.push({ v: jumpLine(a, jumps, jumps.length), t: `Megérkeztünk: ${a} − ${b} = ${d}.` });
    return steps;
  },
  mul({ a, b }) {
    const show = a <= 5 ? Array.from({ length: a }, (_, i) => i + 1) : [1, 2, 5, a].filter((v, i, arr) => arr.indexOf(v) === i);
    const st = show.map(k => ({ v: dotRows(a, b, k), t: k === a ? `${a === 1 ? `${a} · ${b} azt jelenti: 1 sor, benne ${b} pötty. ` : ''}${a} sor: ${a} · ${b} = ${a * b}.` : k === 1 ? `${a} · ${b} azt jelenti: ${a} sor, mindegyikben ${b} pötty. Az első sor: ${b}.` : k === 5 && a > 5 ? `5 sor: 5 · ${b} = ${5 * b}. Ezt könnyű megjegyezni!` : `${k} sor: ${Array(k).fill(b).join(' + ')} = ${k * b}.` }));
    if (a > 5 && a < 10) st.splice(st.length - 1, 0, { v: dotRows(a, b, a), t: `5 sorhoz jön még ${a - 5} sor: ${5 * b} + ${(a - 5) * b} = ${a * b}.` });
    if (a === 9) st.push({ v: dotRows(a, b, a), t: `Trükk: 9 sor = 10 sor − 1 sor: ${10 * b} − ${b} = ${9 * b}.` });
    return st;
  },
  divrem({ a, b }) {
    const q = Math.floor(a / b), r = a % b, small = a <= 60;
    const pic = k => small ? groupDots(a, b, k) : `<div class="ex-big">${a} : ${b}</div>`;
    const st = [{ v: pic(0), t: `${a} : ${b} = ? Hány ${esN(b)} csoportot tudunk kirakni ${a} pöttyből?` }];
    if (small) st.push({ v: pic(1), t: `Az első csoport: ${b} pötty.` });
    st.push({ v: pic(q), t: `Gondolj a szorzótáblára: ${q} · ${b} = ${q * b}${q < 10 && (q + 1) * b <= a + b - 1 ? `, de ${q + 1} · ${b} = ${(q + 1) * b} már több, mint ${a}` : ''}. Tehát ${q} csoport lesz.` });
    st.push({ v: pic(q), t: r ? `Kimaradt ${a} − ${q * b} = ${r} pötty: ez a maradék. A maradék mindig kisebb, mint ${b}. Tehát ${a} : ${b} = ${q}, maradék ${r}.` : `Nem maradt ki semmi. Tehát ${a} : ${b} = ${q}.` });
    return st;
  },
  coladd({ a, b }) {
    const A = String(a), B = String(b), full = a + b, n = Math.max(A.length, B.length), st = [];
    const carries = {}; let c = 0;
    st.push({ v: colGrid(a, '+', b, { full, res: 0, cur: -1, carries: {} }), t: 'Az azonos helyiértékek pontosan egymás alatt vannak. Jobbról balra, az egyesekkel kezdünk.' });
    for (let i = 0; i < n; i++) {
      const x = +(A[A.length - 1 - i] || 0), y = +(B[B.length - 1 - i] || 0), s = x + y + c;
      const parts = [x, y].concat(c ? [c] : []).join(' + ');
      const msg = `${cap(PLACES[i])}: ${parts} = ${s}. ` + (s >= 10 ? (i === n - 1 ? `Leírjuk: ${s}.` : `Leírjuk alulra: ${s % 10}, és maradt az 1. Ezt a következő oszlophoz adjuk.`) : `Leírjuk alulra: ${s}.`);
      c = s >= 10 ? 1 : 0;
      if (c && i < n - 1) carries[i + 1] = '1';
      st.push({ v: colGrid(a, '+', b, { full, res: s >= 10 && i === n - 1 ? i + 2 : i + 1, cur: i, carries: { ...carries } }), t: msg });
    }
    st.push({ v: colGrid(a, '+', b, { full, res: String(full).length, cur: -1, carries }), t: `Kész: ${a} + ${b} = ${full}.` });
    return st;
  },
  colsub({ a, b }) {
    const A = String(a), B = String(b), full = a - b, n = A.length, st = [], plus = {};
    let c = 0;
    st.push({ v: colGrid(a, '−', b, { full, res: 0, cur: -1 }), t: 'Jobbról balra haladunk. Minden oszlopban azt keressük: az alsó számhoz mennyit kell adni, hogy a felsőt kapjuk?' });
    for (let i = 0; i < n; i++) {
      const x = +A[A.length - 1 - i], y0 = +(B[B.length - 1 - i] || 0), y = y0 + c, big = y > x, target = big ? x + 10 : x, d = target - y;
      let msg = `${cap(PLACES[i])}: `;
      if (c) msg += `az alsó számjegyhez hozzáadjuk a maradt 1-et: ${y0} + 1 = ${y}. `;
      msg += `${hozN(y)} mennyit kell adni, hogy ${target} legyen? ${d}. `;
      msg += big ? `Leírjuk alulra: ${d}, és maradt az 1.` : `Leírjuk alulra: ${d}.`;
      if (c) plus[i] = '+1';
      st.push({ v: colGrid(a, '−', b, { full, res: i + 1, cur: i, bplus: { ...plus } }), t: msg.replace(/^(.)/, ch => ch.toUpperCase()) });
      c = big ? 1 : 0;
    }
    st.push({ v: colGrid(a, '−', b, { full, res: n, cur: -1, bplus: plus }), t: `Kész: ${a} − ${b} = ${full}. Ellenőrzés: ${full} + ${b} = ${a}.` });
    return st;
  },
  fracof({ W, n, kk }) {
    const one = W / n;
    const pic = k => { const cols = n, per = one, dcol = Math.min(per, 5), rws = Math.ceil(per / dcol); let s = ''; for (let g = 0; g < cols; g++) { const ox = 6 + g * (dcol * 16 + 18); s += `<rect x="${ox}" y="6" width="${dcol * 16 + 8}" height="${rws * 16 + 8}" rx="8" class="${k && g < kk ? 'f-hi' : 'f-soft'} s-line ${k && g === kk - 1 ? 'ex-new' : ''}" stroke-width="1.5"/>`; for (let d = 0; d < per; d++) s += `<circle cx="${ox + 12 + (d % dcol) * 16}" cy="${18 + Math.floor(d / dcol) * 16}" r="5.5" class="f-blue"/>`; } return svg(cols * (dcol * 16 + 18) + 6, rws * 16 + 22, s, 'ex-svg'); };
    const st = [{ v: pic(0), t: `${W} pöttyöt ${n} egyenlő részre osztunk.` }, { v: pic(1), t: `Egy rész: ${W} : ${n} = ${one}.` }];
    if (kk > 1) st.push({ v: pic(kk), t: `${kk} rész: ${one} · ${kk} = ${one * kk}.` });
    return st;
  },
  pie({ kk, n }) {
    return [{ v: pieSvg(n, 0).replace('class="vis', 'class="vis ex-svg'), t: `A kört ${n} egyenlő részre vágtuk. Ez a nevező: alul áll.` },
      { v: pieSvg(n, kk).replace('class="vis', 'class="vis ex-svg'), t: `Ebből ${kk} rész színes. Ez a számláló: felül áll.` },
      { v: `<div class="ex-big">${fr(kk, n)}</div>`, t: `Tehát a kör ${kk}/${n} része színes.` }];
  },
  clock({ hh, mm }) {
    const nx = hh % 12 + 1, pos = mm / 5;
    const st = [{ v: clockEx(hh, mm, 'hour'), t: mm === 0 ? `Először a kismutatót nézzük (piros, rövid). Pontosan ${azN(hh)} ${onN(hh)} áll.` : `Először a kismutatót nézzük (piros, rövid). ${cap(azN(hh))} ${hh} és ${azN(nx)} ${nx} között van, tehát már elmúlt ${hh} óra.` }];
    if (mm === 0) st.push({ v: clockEx(hh, mm, 'min'), t: 'A nagymutató (kék, hosszú) a 12-n áll: egész óra van.' });
    else if (Number.isInteger(pos)) st.push({ v: clockEx(hh, mm, 'min'), t: `A nagymutató (kék, hosszú) ${azN(pos)} ${onN(pos)} áll. Minden szám 5 perc, így ${pos} · 5 = ${mm} perc telt el.` });
    else st.push({ v: clockEx(hh, mm, 'min'), t: `A nagymutató (kék, hosszú) ${mm} percnél áll: számold ötösével a számokat, aztán egyesével a kis vonalakat.` });
    const say = mm === 0 ? `${hh} óra` : mm === 15 ? `Negyedóra telt el ${hh} óra után, úton vagyunk ${nx} óra felé. Ezért ezt mondjuk: negyed ${nx}.` : mm === 30 ? `Fél óra telt el: félúton vagyunk ${nx} óra felé. Ezért ezt mondjuk: fél ${nx}.` : mm === 45 ? `Háromnegyed óra telt el, mindjárt ${nx} óra. Ezért ezt mondjuk: háromnegyed ${nx}.` : `${hh} óra ${mm} perc van.`;
    st.push({ v: clockEx(hh, mm, 'all'), t: (mm === 0 ? `Tehát ${say} van.` : say) + ` Digitálisan: ${hh}:${String(mm).padStart(2, '0')}.` });
    return st;
  },
  length({ w, i, g, vowel }) {
    const tk = tok(w); let pos = 0, ti = 0; for (; ti < tk.length; ti++) { if (pos === i) break; pos += tk[ti].length; }
    const doubled = !vowel && /^(.)\1$/.test(g), isLong = vowel ? /[áéíóőúű]/.test(g) : doubled;
    const shortG = vowel ? ({ á: 'a', é: 'e', í: 'i', ó: 'o', ő: 'ö', ú: 'u', ű: 'ü' }[g] || g) : g[0], longG = vowel ? ({ a: 'á', e: 'é', i: 'í', o: 'ó', ö: 'ő', u: 'ú', ü: 'ű' }[g] || g) : g[0] + g[0];
    const hl = k => k === ti || (doubled && k === ti + 1) ? 'hl' : '';
    const bar = long => `<div class="lenbar ex-new"><span style="width:${long ? 86 : 32}%"></span><b>${long ? 'hosszú hang' : 'rövid hang'}</b></div>`;
    return [
      { v: tiles(tk), t: `Mondd ki lassan, hangosan: ${w}. Figyeld, melyik hang hogyan szól!`, say: w },
      { v: tiles(tk, hl) + bar(isLong), t: `A kiemelt hang ${isLong ? 'hosszan' : 'röviden'} szól.`, say: w },
      { v: tiles(tk, hl), t: vowel ? (isLong ? `Hosszú magánhangzó: ékezettel írjuk: ${longG}.` : `Rövid magánhangzó: ékezet nélkül írjuk: ${shortG}.`) : (isLong ? `Hosszú mássalhangzó: két betűvel írjuk: ${longG}.` : `Rövid mássalhangzó: egy betűvel írjuk: ${shortG}.`) + ` Helyesen: ${w}.` }];
  },
  syl({ w }) {
    const plain = w.replace(/-/g, ''), tk = tok(plain), V = new Set(['a', 'á', 'e', 'é', 'i', 'í', 'o', 'ó', 'ö', 'ő', 'u', 'ú', 'ü', 'ű']);
    const vi = tk.map((g, i) => V.has(g) ? i : -1).filter(i => i >= 0), bounds = []; w.split('-').reduce((acc, x) => { acc += tok(x).length; bounds.push(acc); return acc; }, 0); bounds.pop();
    const vcls = k => V.has(tk[k]) ? 'hl' : '';
    const st = [{ v: tiles(tk), t: `Bontsuk betűkre: ${plain}. A kétjegyű betűk (cs, sz, ny…) egy betűnek számítanak.` },
      { v: tiles(tk, vcls), t: `Keressük meg a magánhangzókat! ${vi.length} van, tehát a szó ${vi.length} szótagú.` }];
    const shown = new Set();
    bounds.forEach((bd, j) => {
      const left = vi[j], right = vi[j + 1], between = tk.slice(left + 1, right);
      shown.add(bd);
      const why = between.length === 0 ? 'Két magánhangzó áll egymás mellett: közöttük választunk el.' : between.length === 1 ? `Két magánhangzó között egy mássalhangzó van (${between[0]}): az átmegy a következő szótagba.` : `Két magánhangzó között ${between.length} mássalhangzó van (${between.join(', ')}): csak az utolsó megy át a következő szótagba.`;
      st.push({ v: tiles(tk, vcls, new Set(shown)), t: why });
    });
    st.push({ v: tiles(tk, () => '', new Set(bounds)), t: `Így választjuk el: ${w}.` });
    return st;
  }
};

/* ---------- player (modal) ---------- */
let expOpen = null;
function openExplain(ex, title) {
  if (!ex || !EXPLAIN[ex.k]) return;
  const steps = EXPLAIN[ex.k](ex); let i = 0;
  const prevFocus = document.activeElement;
  const vis = h('div', { class: 'exp-vis', 'aria-live': 'polite' }), txt = h('p', { class: 'exp-txt' }), dots = h('div', { class: 'exp-dots', 'aria-hidden': 'true' });
  const back = h('button', { class: 'btn', onclick: () => go(i - 1) }, '◀ Vissza'), fwd = h('button', { class: 'btn primary', onclick: () => i < steps.length - 1 ? go(i + 1) : close() });
  const sp = canSpeak() ? h('button', { class: 'btn small', onclick: () => speak(steps[i].t) }, '🔊') : null;
  const card = h('div', { class: 'exp-card', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Így működik' },
    h('div', { class: 'exp-head' }, h('span', { class: 'exp-badge' }, '💡 Így működik'), title ? h('span', { class: 'mute' }, title) : null, h('button', { class: 'exp-x', 'aria-label': 'Bezárás', onclick: () => close() }, '✕')),
    vis, txt, dots, h('div', { class: 'actions' }, back, sp, fwd));
  const ov = h('div', { class: 'exp-ov', onclick: e => { if (e.target === ov) close(); } }, card);
  const go = k => {
    i = Math.max(0, Math.min(steps.length - 1, k));
    vis.innerHTML = steps[i].v; txt.textContent = steps[i].t;
    dots.replaceChildren(...steps.map((_, j) => h('i', { class: j === i ? 'now' : j < i ? 'ok' : '' })));
    back.disabled = i === 0; fwd.textContent = i < steps.length - 1 ? 'Tovább ▶' : 'Értem!';
    if (autoRead() && canSpeak()) speak(steps[i].t);
  };
  const onKey = e => {
    e.stopImmediatePropagation();
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') { if (e.target.tagName !== 'BUTTON' || e.key === 'ArrowRight') { e.preventDefault(); fwd.click(); } }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
  };
  const close = () => { window.removeEventListener('keydown', onKey, true); ov.remove(); expOpen = null; try { speechSynthesis.cancel(); } catch (e) {} if (prevFocus && prevFocus.focus) prevFocus.focus(); };
  window.addEventListener('keydown', onKey, true);
  document.body.append(ov); expOpen = close;
  go(0); fwd.focus();
}
// a similar example (different numbers) from the same topic, so the explanation does not give the answer away
function exSource(q) {
  if (!S || !q) return null;
  const pid = q._page || (S.page && S.page.id), tid = q._topic || (S.topic && S.topic.id);
  const ex = deriveEx(q, pid, tid); if (!ex || !EXPLAIN[ex.k]) return null;
  const page = PAGES[pid], t = page && page.topics && page.topics.find(x => x.id === tid);
  return { pid, tid, ex, gen: t && t.gen };
}
function similarEx(q, gen, level, pid, tid) {
  const ex = deriveEx(q, pid, tid);
  if (!ex || !gen) return null;
  const key = JSON.stringify(ex);
  for (let g = 0; g < 25; g++) {
    let q2; try { q2 = gen(level); } catch (e) { return null; }
    const e2 = deriveEx(q2, pid, tid);
    if (e2 && e2.k === ex.k && JSON.stringify(e2) !== key) return e2;
  }
  return null;
}
