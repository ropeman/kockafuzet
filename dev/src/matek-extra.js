/* ===== More maths for grades 1–4: number line, number pyramids, magic squares, data, solids, combinatorics, games ===== */

/* ---------- number line: tap the place of a number ---------- */
function numlineSvg(q, mark) {
  const W = 600, x0 = 30, x1 = 570, n = (q.max - q.min) / q.step, X = v => x0 + (v - q.min) / (q.max - q.min) * (x1 - x0);
  let s = `<line x1="${x0 - 12}" y1="50" x2="${x1 + 14}" y2="50" class="s-ink" stroke-width="3"/><path d="M${x1 + 14} 44 L${x1 + 24} 50 L${x1 + 14} 56Z" class="f-ink"/>`;
  for (let i = 0; i <= n; i++) { const v = q.min + i * q.step, big = (v - q.min) % q.every === 0; s += `<line x1="${X(v)}" y1="${big ? 36 : 42}" x2="${X(v)}" y2="${big ? 64 : 58}" class="s-ink" stroke-width="${big ? 3 : 1.6}"/>`; if (big) s += `<text x="${X(v)}" y="86" text-anchor="middle" font-size="17" class="f-ink">${String(v).replace('-', '−')}</text>`; }
  if (mark != null) s += `<path d="M${X(mark)} 34 l-9 -16 h18z" class="${q.type === 'numline' ? 'nl-mark' : 'f-red'}"/>`;
  return svg(W + 20, 96, s, 'numline');
}
UI.numline = (q, send) => {
  let v = null, locked = false;
  const box = h('div', { class: 'nlwrap' });
  const draw = () => { box.innerHTML = numlineSvg(q, v); };
  const sb = h('button', { class: 'btn primary', disabled: true, onclick: () => send(v) }, 'Kész');
  const setV = x => { if (locked) return; v = Math.max(q.min, Math.min(q.max, Math.round((x - q.min) / q.step) * q.step + q.min)); sb.disabled = false; draw(); };
  box.addEventListener('pointerdown', e => { const sv = box.querySelector('svg'), r = sv.getBoundingClientRect(), px = (e.clientX - r.left) * 620 / r.width; setV(q.min + (px - 30) / 540 * (q.max - q.min)); });
  const onKey = e => { if (expOpen || locked) return; if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); setV((v == null ? q.min : v) + (e.key === 'ArrowRight' ? q.step : -q.step)); } };
  document.addEventListener('keydown', onKey); cleanups.push(() => document.removeEventListener('keydown', onKey));
  draw();
  return {
    el: h('div', { class: 'setwrap' }, h('p', { class: 'mute ihelp' }, 'Koppints a számegyenesen a szám helyére (a nyilakkal is mozgathatod).'), box), submitBtn: sb,
    wrong() { v = null; sb.disabled = true; draw(); },
    lock(r, ok) { locked = true; v = q.answer; draw(); box.querySelector('.nl-mark') && box.querySelector('.nl-mark').classList.add(ok ? 'ok' : 'fix'); document.removeEventListener('keydown', onKey); },
    done() { sb.remove(); }
  };
};
UI.numline.judge = (q, r) => r === q.answer;
const NL = { 1: [[0, 10, 1, 5], [0, 20, 1, 5], [0, 20, 1, 2]], 2: [[0, 100, 10, 10], [0, 100, 5, 10], [20, 60, 2, 10]], 3: [[0, 1000, 100, 100], [0, 1000, 50, 100], [300, 500, 10, 50]], 4: [[0, 10000, 1000, 1000], [0, 5000, 250, 1000], [-10, 10, 1, 5]] };
const nlRange = (g, L) => { const [min, max, step, every] = NL[g][Math.min(L, 3) - 1]; return { min, max, step, every }; };
const byN = n => n + '-' + ({ 1: 'esével', 2: 'esével', 5: 'ösével', 10: 'esével', 50: 'esével', 100: 'asával', 250: 'esével', 1000: 'esével' }[n] || 'ével');
const nlHint = R => R.step === R.every ? `A vonalak ${byN(R.step)} követik egymást.` : `A hosszú vonalak ${byN(R.every)}, a rövidek ${byN(R.step)} követik egymást.`;
const nlTap = g => L => { const R = nlRange(g, L); let a; do { a = R.min + ri(0, (R.max - R.min) / R.step) * R.step; } while ((a - R.min) % R.every === 0 && Math.random() < .7); return { type: 'numline', ...R, answer: a, prompt: `Hol van ${azN(a)} <b>${String(a).replace('-', '−')}</b>? Koppints a helyére a számegyenesen!`, answerText: String(a), hint: nlHint(R) }; };
const nlRead = g => L => { const R = nlRange(g, L); let a, tries = 0; do { a = R.min + ri(0, (R.max - R.min) / R.step) * R.step; } while ((a - R.min) % R.every === 0 && tries++ < 50); return { type: 'input', prompt: 'Melyik számot mutatja a piros nyíl?', visual: numlineSvg({ ...R, type: 'x' }, a), answer: a, neg: a < 0, hint: `Keresd meg a nyíl előtti hosszú vonalat, és számold tovább ${byN(R.step)}.` }; };
const nlGen = g => L => (Math.random() < .55 ? nlTap(g) : nlRead(g))(L);

/* ---------- number pyramid (számpiramis): every brick is the sum of the two below ---------- */
function pyramidHtml(rows, hide) {
  return `<div class="pyr">${rows.slice().reverse().map((r, ri2) => `<div class="pyr-row">${r.map((v, j) => `<span class="pyr-b${hide && hide[0] === rows.length - 1 - ri2 && hide[1] === j ? ' q' : ''}">${hide && hide[0] === rows.length - 1 - ri2 && hide[1] === j ? '?' : v}</span>`).join('')}</div>`).join('')}</div>`;
}
const pyramidQ = (lo, hi, levels) => L => {
  const base = Array.from({ length: levels }, () => ri(lo, hi)), rows = [base];
  while (rows[rows.length - 1].length > 1) { const p = rows[rows.length - 1]; rows.push(p.slice(1).map((v, i) => v + p[i])); }
  const r = L === 1 ? ri(1, rows.length - 1) : ri(0, rows.length - 1), c = ri(0, rows[r].length - 1);
  return { type: 'input', prompt: 'Számpiramis: minden tégla a két alatta lévő összege. Mi kerül a kérdőjel helyére?', visual: pyramidHtml(rows, [r, c]), answer: rows[r][c], hint: r === 0 ? 'Vond ki a fölötte lévő téglából a mellette lévő téglát!' : 'Add össze a két alatta lévő téglát!' };
};

/* ---------- magic square (bűvös négyzet) ---------- */
const LOSHU = [[2, 7, 6], [9, 5, 1], [4, 3, 8]];
const magicQ = add => L => {
  let sq = LOSHU.map(r => r.slice()); const t = ri(0, 7);
  for (let i = 0; i < t % 4; i++) sq = sq[0].map((_, j) => sq.map(r => r[j]).reverse());
  if (t > 3) sq = sq.map(r => r.slice().reverse());
  const k = add(L); sq = sq.map(r => r.map(v => v + k));
  const sum = sq[0].reduce((a, b) => a + b, 0), n = L === 1 ? 1 : L === 2 ? 2 : 3, LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  let hide, target;
  do { hide = new Set(); while (hide.size < n) hide.add(ri(0, 8)); target = [...hide][0]; } while (!LINES.some(l => l.includes(target) && l.every(c => c === target || !hide.has(c))));
  const cell = i => hide.has(i) ? (i === target ? '<b class="q">?</b>' : '<i></i>') : sq[Math.floor(i / 3)][i % 3];
  return { type: 'input', prompt: `Bűvös négyzet: minden sorban, oszlopban és átlóban ${sum} az összeg. Mi kerül a kérdőjel helyére?`, visual: `<div class="magic">${Array.from({ length: 9 }, (_, i) => `<span>${cell(i)}</span>`).join('')}</div>`, answer: sq[Math.floor(target / 3)][target % 3], hint: `Keress egy sort, oszlopot vagy átlót, amelyben csak a kérdőjel hiányzik! ${sum}-ből vond ki a másik kettőt.` };
};

/* ---------- open sentences and divisibility: tap every number that fits ---------- */
const WITH_N = { 2: '2-vel', 3: '3-mal', 4: '4-gyel', 5: '5-tel', 6: '6-tal', 7: '7-tel', 8: '8-cal', 9: '9-cel' };
const findNums = (prompt, cells, ok, hint) => ({ type: 'find', prompt, cells: cells.map(String), targets: cells.map((c, i) => ok(c) ? i : -1).filter(i => i >= 0), hint });
const openQ = g => L => {
  for (;;) {
    let q;
    if (g === 1) { const a = ri(2, 6), b = ri(a + 3, 10); q = findNums(`Koppints minden számra, amely igazzá teszi: <b>□ + ${a} &lt; ${b}</b>`, Array.from({ length: 11 }, (_, i) => i), x => x + a < b, `Próbáld ki sorban a számokat: 0 + ${a}, 1 + ${a}… Melyik kisebb, mint ${b}?`); }
    else if (g === 2) { const k = ri(2, 6), m = ri(2, 8) * k + ri(1, k - 1), gt = Math.random() < .5; q = findNums(`Koppints minden számra, amely igazzá teszi: <b>□ · ${k} ${gt ? '&gt;' : '&lt;'} ${m}</b>`, Array.from({ length: 11 }, (_, i) => i), x => gt ? x * k > m : x * k < m, `Szorozd meg a számokat ${WITH_N[k]}, és nézd meg, ${gt ? 'nagyobb' : 'kisebb'}-e, mint ${m}!`); }
    else { const k = ri(3, 9), lo = ri(1, 5) * k + ri(1, k - 1), hi = lo + ri(2, 4) * k; q = findNums(`Koppints minden számra, amely igazzá teszi: <b>${lo} &lt; □ · ${k} &lt; ${hi}</b>`, Array.from({ length: 11 }, (_, i) => i), x => x * k > lo && x * k < hi, `Szorozd meg a számokat ${WITH_N[k]}, és nézd meg, ${lo} és ${hi} közé esik-e!`); }
    if (q.targets.length >= 1 && q.targets.length < q.cells.length) return q;
  }
};
const divisQ = L => {
  const d = L === 1 ? pick([2, 5, 10]) : L === 2 ? pick([3, 4, 5, 10]) : pick([3, 4, 6, 9, 25]);
  for (;;) { const cells = shuffle(Array.from({ length: 300 }, (_, i) => i + 10)).slice(0, 12); const q = findNums(`Koppints az összes <b>${d}</b>-${d === 10 ? 'zel' : d === 25 ? 'tel' : ({ 2: 'vel', 3: 'mal', 4: 'gyel', 5: 'tel', 6: 'tal', 9: 'cel' })[d]} osztható számra!`, cells, x => x % d === 0, ({ 2: 'Az utolsó számjegy páros (0, 2, 4, 6, 8).', 5: 'Az utolsó számjegy 0 vagy 5.', 10: 'Az utolsó számjegy 0.', 3: 'A számjegyek összege osztható 3-mal.', 9: 'A számjegyek összege osztható 9-cel.', 4: 'Az utolsó két jegyből álló szám osztható 4-gyel.', 6: 'Páros, és a számjegyek összege osztható 3-mal.', 25: 'Az utolsó két jegy 00, 25, 50 vagy 75.' })[d]); if (q.targets.length >= 2 && q.targets.length <= 6) return q; }
};
const evenFind = L => { for (;;) { const cells = shuffle(Array.from({ length: L === 1 ? 20 : 99 }, (_, i) => i + 1)).slice(0, 12), odd = Math.random() < .5; const q = findNums(`Koppints az összes <b>${odd ? 'páratlan' : 'páros'}</b> számra!`, cells, x => (x % 2 === 1) === odd, 'Páros szám végződése: 0, 2, 4, 6, 8. Páratlané: 1, 3, 5, 7, 9.'); if (q.targets.length >= 3 && q.targets.length <= 9) return q; } };

/* ---------- Párosító: sort the calculations by their result ---------- */
const matchQ = (make, prompt) => L => {
  for (let g = 0; g < 50; g++) {
    const groups = {}, seen = new Set();
    const res = new Set(); while (res.size < 3) res.add(make.res(L));
    let ok = true;
    for (const r of res) { const ex = new Set(); for (let k = 0; k < 40 && ex.size < 2; k++) { const e = make.expr(r, L); if (e && !seen.has(e)) { ex.add(e); seen.add(e); } } if (ex.size < 2) { ok = false; break; } groups[String(r)] = [...ex]; }
    if (ok) return sortQ(prompt, groups, 2, { hint: 'Számold ki mindegyik kártyát, és tedd ahhoz az eredményhez, amennyi lett!' });
  }
  return null;
};
const M_ADD1 = { res: L => ri(L === 1 ? 5 : 8, L === 1 ? 10 : 18), expr: (r, L) => { if (Math.random() < .7) { const a = ri(0, r); return `${a} + ${r - a}`; } const b = ri(1, L === 1 ? 10 - r || 1 : 20 - r); return r + b <= (L === 1 ? 10 : 20) ? `${r + b} − ${b}` : null; } };
const M_ADD2 = { res: L => (L === 1 ? ri(2, 9) * 10 : ri(20, 99)), expr: r => { if (Math.random() < .6) { const a = ri(1, r - 1); return `${a} + ${r - a}`; } const b = ri(1, 40); return r + b <= 100 ? `${r + b} − ${b}` : null; } };
const M_MUL = { res: () => pick([12, 18, 24, 36, 16, 20, 30, 40, 8, 6]), expr: r => { const ds = []; for (let a = 1; a <= 10; a++) if (r % a === 0 && r / a <= 10) ds.push(a); const a = pick(ds); return `${a} · ${r / a}`; } };
const M_DIV3 = { res: () => ri(2, 9), expr: r => { const b = ri(2, 10); return `${r * b} : ${b}`; } };
const M_BIG = { res: () => ri(2, 9) * 100, expr: r => { const t = Math.random(); if (t < .4) { const a = ri(1, r / 10 - 1) * 10; return `${a} + ${r - a}`; } if (t < .7) { const b = ri(1, 30) * 10; return `${r + b} − ${b}`; } const ds = [2, 4, 5, 10].filter(d => r % d === 0); const d = pick(ds); return `${r / d} · ${d}`; } };

/* ---------- number cards: build the largest / smallest number; order numbers ---------- */
const digitsQ = n => L => {
  const ds = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, n), big = Math.random() < .5;
  let ans = ds.slice().sort((a, b) => big ? b - a : a - b);
  if (!big && ans[0] === 0) { const k = ans.findIndex(d => d > 0); ans = [ans[k], ...ans.filter((_, i) => i !== k)]; }
  return { type: 'build', prompt: `Rakd ki a <b>${big ? 'legnagyobb' : 'legkisebb'}</b> ${({ 2: 'kétjegyű', 3: 'háromjegyű', 4: 'négyjegyű' })[n]} számot ezekből a számkártyákból!`, answer: ans.map(String), tiles: shuffle(ds.map(String)), hint: big ? 'A legnagyobb számjegy kerüljön előre, a legnagyobb helyi értékre!' : 'A legkisebb számjegy kerüljön előre, de 0-val nem kezdődhet a szám!', explain: ans.join('') };
};
const orderQ = (lo, hi, k) => L => {
  const set = new Set(); while (set.size < k) set.add(ri(lo, hi)); const up = Math.random() < .6, ans = [...set].sort((a, b) => up ? a - b : b - a);
  return { type: 'build', prompt: `Rakd ${up ? 'növekvő' : 'csökkenő'} sorrendbe! Koppints rájuk sorban.`, answer: ans.map(String), tiles: shuffle(ans.map(String)), hint: up ? 'Kezdd a legkisebbel!' : 'Kezdd a legnagyobbal!', explain: ans.join(up ? ' < ' : ' > ') };
};

/* ---------- patterns (grade 1) ---------- */
const PAT_EMO = [['🔴', '🔵', '🟡'], ['🍎', '🍐', '🍌'], ['⭐', '🌙', '☀️'], ['🐶', '🐱', '🐭'], ['▲', '■', '●']];
const patternQ = L => {
  const set = pick(PAT_EMO), unit = pick(L === 1 ? [[0, 1], [0, 0, 1]] : L === 2 ? [[0, 1, 2], [0, 0, 1], [0, 1, 1]] : [[0, 1, 1, 2], [0, 0, 1, 2], [0, 1, 2, 1]]);
  const len = unit.length * 2 + ri(1, unit.length - 1), seq = Array.from({ length: len }, (_, i) => set[unit[i % unit.length]]), ans = set[unit[len % unit.length]];
  const used = [...new Set(unit.map(i => set[i]))];
  return { type: 'choice', prompt: 'Mi jön ezután? Folytasd a mintát!', visual: `<div class="big-emoji pat">${seq.join(' ')} <span class="blank">?</span></div>`, answer: ans, options: shuffle([...new Set([...used, ...set])]).map(v => ({ value: v, html: v })), answerText: ans, hint: 'Keresd meg, melyik rész ismétlődik újra és újra!' };
};

/* ---------- doubling and halving ---------- */
const DBL_STORY = [n => [`Petinek ${n} matricája van, Annának kétszer annyi. Hány matricája van Annának?`, 2 * n], n => [`Egy biciklinek 2 kereke van. Hány kereke van ${n} biciklinek?`, 2 * n],
  n => [`Egy zokni-pár 2 zokniból áll. Hány zokni van ${n} párban?`, 2 * n], n => [`${2 * n} szem cukrot igazságosan elosztunk két gyerek között. Hány szemet kap egy gyerek?`, n],
  n => [`Gondoltam egy számot. A kétszerese ${2 * n}. Melyik számra gondoltam?`, n], n => [`Gondoltam egy számot. A fele ${n}. Melyik számra gondoltam?`, 2 * n], n => [`A kosárban ${2 * n} tojás van. A felét megsütjük. Hány tojás marad?`, n]];
const dblQ = L => { if (Math.random() < (L === 3 ? .6 : .35)) { const n = L === 1 ? ri(1, 5) : ri(L === 2 ? 2 : 3, 10), [p, a] = pick(DBL_STORY)(n); return { type: 'input', prompt: p, answer: a, hint: 'A kétszerese (duplája) azt jelenti: kétszer annyi. A fele: két egyenlő részre osztjuk.' }; }
  if (L === 3 && Math.random() < .4) { const n = pick([4, 8, 12, 16, 20]); return { type: 'input', prompt: `Mennyi ${azN(n)} <b>${n}</b> felének a fele?`, answer: n / 4, hint: `Először felezd meg: ${n} fele ${n / 2}. Aztán azt is felezd meg!` }; }
  { const max = L === 1 ? 5 : 10; if (Math.random() < .5) { const n = ri(1, max); return { type: 'input', prompt: `Mennyi ${azN(n)} <b>${n}</b> duplája (kétszerese)?`, answer: 2 * n, hint: `A dupla azt jelenti: ${n} + ${n}.` }; } const n = ri(1, max); return { type: 'input', prompt: `Mennyi ${azN(2 * n)} <b>${2 * n}</b> fele?`, answer: n, hint: `Melyik számot kell önmagához adni, hogy ${2 * n} legyen?` }; } };

/* ---------- word problems, grade 1 ---------- */
const NAMES1 = [['Anna', 'Annának'], ['Bence', 'Bencének'], ['Zsófi', 'Zsófinak'], ['Máté', 'Máténak'], ['Lili', 'Lilinek'], ['Dani', 'Daninak'], ['Hanna', 'Hannának'], ['Ádám', 'Ádámnak'], ['Emma', 'Emmának'], ['Levente', 'Leventének']];
const ITEMS1 = [['almája', 'Hány almája', '🍎'], ['matricája', 'Hány matricája', '⭐'], ['golyója', 'Hány golyója', '🔵'], ['ceruzája', 'Hány ceruzája', '✏️']];
const word1 = L => {
  const [n, nd] = pick(NAMES1), max = L === 1 ? 10 : 20, t = pick(['plus', 'minus', 'more', 'plus2']);
  if (t === 'plus') { const a = ri(1, max - 2), b = ri(1, max - a), [it, ask, em] = pick(ITEMS1); return { type: 'input', prompt: `${nd} ${a} ${it} van. Kap még ${accN(b)}. ${ask} lesz?`, answer: a + b, visual: `<div class="big-emoji">${em}</div>`, hint: 'Összeadással számolj: amennyi volt, meg amennyit kapott.' }; }
  if (t === 'minus') { const a = ri(3, max), b = ri(1, a - 1); return { type: 'input', prompt: `A fán ${a} madár ült. ${b} elrepült. Hány madár maradt a fán?`, answer: a - b, visual: '<div class="big-emoji">🐦</div>', hint: 'Kivonással számolj: amennyi volt, kevesebb annyival, amennyi elrepült.' }; }
  if (t === 'more') { const a = ri(1, max - 5), b = ri(1, 5); return { type: 'input', prompt: `${n} ${a} éves. A bátyja ${b} évvel idősebb. Hány éves a bátyja?`, answer: a + b, hint: 'Az idősebb több évet jelent: adj hozzá!' }; }
  const a = ri(1, 6), b = ri(1, 6), c = ri(1, Math.max(1, max - a - b)); return { type: 'input', prompt: `A kosárban ${a} piros, ${b} sárga és ${c} zöld alma van. Hány alma van a kosárban összesen?`, answer: a + b + c, visual: '<div class="big-emoji">🧺</div>', hint: 'Add össze mindhárom számot!' };
};

/* ---------- clock: set the hands ---------- */
const clockSet = L => {
  const hh = ri(1, 12), mm = L === 1 ? pick([0, 30]) : L === 2 ? pick([0, 15, 30, 45]) : ri(0, 11) * 5, ans = (hh % 12) * 60 + mm;
  const label = L === 3 ? `${hh}:${String(mm).padStart(2, '0')}` : huTime(hh, mm);
  return { type: 'set', kind: 'clock', prompt: `Állítsd be az órát: <b>${label}</b>`, answer: ans, start: (ans + 60 * ri(2, 5) + (mm ? 0 : 15)) % 720, answerText: `${hh}:${String(mm).padStart(2, '0')}`, hint: 'A kis mutató az órát, a nagy mutató a percet mutatja. Fél óránál a nagy mutató a 6-oson áll, negyednél a 3-ason, háromnegyednél a 9-esen.' };
};

/* ---------- time spans ---------- */
const spanQ = L => {
  const h1 = ri(7, 18), m1 = ri(0, 11) * 5, len = L === 1 ? pick([15, 30, 45, 60]) : L === 2 ? ri(2, 14) * 5 : ri(13, 40) * 5;
  const t2 = h1 * 60 + m1 + len, f = (hh, mm) => `${hh}:${String(mm).padStart(2, '0')}`;
  return { type: 'input', prompt: `Az előadás ${f(h1, m1)}-kor kezdődik, és ${f(Math.floor(t2 / 60), t2 % 60)}-kor ér véget. Hány percig tart?`, answer: len, hint: 'Számolj el a következő egész óráig, aztán add hozzá a többit! 1 óra = 60 perc.' };
};

/* ---------- combinatorics ---------- */
const OUTFITS = [[(a, b) => `Lilinek ${a} pólója és ${b} szoknyája van. Hányféleképpen öltözhet fel, ha egy pólót és egy szoknyát vesz fel?`, '👕 × 👗'],
  [(a, b) => `A fagyizóban ${a}-féle tölcsér és ${b}-féle fagyi van. Hányféle egygombócos fagyit kérhetsz?`, '🍦'],
  [(a, b) => `Bence ${a} sapka és ${b} sál közül választ. Hányféleképpen választhat egy sapkát és egy sálat?`, '🧢 × 🧣'],
  [(a, b) => `A menüben ${a}-féle leves és ${b}-féle főétel van. Hányféle ebédet állíthatsz össze egy levesből és egy főételből?`, '🍲 × 🍝'],
  [(a, b) => `Annának ${a} színes ceruzája és ${b} filctolla van. Hányféleképpen választhat ki egy ceruzát és egy filctollat?`, '✏️ × 🖊️'],
  [(a, b) => `A háztól a parkig ${a} út vezet, a parktól az iskoláig ${b} út. Hányféleképpen juthatsz el a parkon át az iskolába?`, '🏠 → 🌳 → 🏫'],
  [(a, b) => `Egy szendvicshez ${a}-féle kenyér és ${b}-féle feltét közül választhatsz. Hányféle szendvicset készíthetsz egy kenyérből és egy feltétből?`, '🍞 × 🧀']];
const combiQ = L => {
  const t = L === 1 ? 'outfit' : pick(L === 2 ? ['outfit', 'cards2', 'order3'] : ['outfit', 'cards3', 'order3', 'hands', 'cards2']);
  if (t === 'outfit') { const a = ri(2, L === 1 ? 3 : 5), b = ri(2, L === 1 ? 3 : 4), [mk, em] = pick(OUTFITS); return { type: 'input', prompt: mk(a, b), answer: a * b, visual: `<div class="big-emoji">${em}</div>`, hint: `Az első dolog mindegyik választásához ${b}-féle második választható. Ez összesen ${a} · ${b}. Rajzold le, ha segít!` }; }
  if (t === 'cards2') { const ds = shuffle([1, 2, 3, 4, 5, 6, 7]).slice(0, 3).sort(); return { type: 'input', prompt: `Hány különböző kétjegyű számot rakhatsz ki ezekből a kártyákból: ${ds.join(', ')}? (Egy kártyát egy számban csak egyszer használhatsz.)`, answer: 6, hint: 'Az első helyre 3 kártya kerülhet, a második helyre a maradék 2: 3 · 2.' }; }
  if (t === 'cards3') { const ds = shuffle([1, 2, 3, 4, 5, 6, 7]).slice(0, 3).sort(); return { type: 'input', prompt: `Hány különböző háromjegyű számot rakhatsz ki ${azN(ds[0])} ${ds.join(', ')} kártyákból, ha mindhármat felhasználod?`, answer: 6, hint: 'Az első helyre 3, a másodikra 2, a harmadikra 1 kártya marad: 3 · 2 · 1.' }; }
  if (t === 'order3') return { type: 'input', prompt: 'Hányféle sorrendben állhat be 3 gyerek a sorba?', answer: 6, hint: 'Az első helyre 3 gyerek állhat, a másodikra 2, a harmadikra 1: 3 · 2 · 1.' };
  const n = ri(3, 5); return { type: 'input', prompt: `${n} barát találkozik, és mindenki mindenkivel egyszer kezet fog. Hány kézfogás lesz?`, answer: n * (n - 1) / 2, hint: 'Rajzold le pontokkal, és kösd össze mindegyiket mindegyikkel! Számold a vonalakat.' };
};

/* ---------- data: pictograms and bar charts ---------- */
function barSvg(labels, vals, max, unit) {
  const W = 380, H = 230, x0 = 46, y0 = 190, bw = 46, gap = (W - x0 - labels.length * bw) / (labels.length + 1), Y = v => y0 - v / max * 160;
  let s = '';
  for (let v = 0; v <= max; v += unit) s += `<line x1="${x0}" y1="${Y(v)}" x2="${W - 6}" y2="${Y(v)}" class="s-ink" stroke-width="${v ? .6 : 2}" opacity="${v ? .35 : 1}"/>` + ((v / unit) % (max / unit > 8 ? 2 : 1) === 0 ? `<text x="${x0 - 8}" y="${Y(v) + 5}" text-anchor="end" font-size="14" class="f-ink">${v}</text>` : '');
  labels.forEach((l, i) => { const x = x0 + gap + i * (bw + gap); s += `<rect x="${x}" y="${Y(vals[i])}" width="${bw}" height="${y0 - Y(vals[i])}" rx="4" fill="${['#4dabf7', '#ff922b', '#51cf66', '#cc5de8', '#fcc419'][i]}" stroke="#1d2742" stroke-width="1.5"/><text x="${x + bw / 2}" y="${y0 + 22}" text-anchor="middle" font-size="28">${l}</text>`; });
  return svg(W, H + 10, s, 'barchart');
}
const DATA_SETS = [['Kedvenc gyümölcsök', ['🍎', '🍌', '🍓', '🍐'], 'gyereknek'], ['Állatok a tanyán', ['🐔', '🐄', '🐖', '🐑'], 'állat'], ['Eladott fagyik', ['🍦', '🍨', '🍧', '🧁'], 'darab']];
const dataQ = g => L => {
  const [title, labels, what] = pick(DATA_SETS), unit = g <= 2 ? 1 : g === 3 ? 2 : 5, max = unit * (g <= 2 ? 8 : 10);
  const vals = labels.map(() => ri(1, max / unit) * unit);
  if (g === 1 || (g === 2 && Math.random() < .5)) {
    const i = ri(0, 3), v = Math.min(vals[i], 9) || 1;
    const rows = labels.map((l, k) => `<div class="pict"><b>${l}</b> ${'●'.repeat(Math.min(vals[k], 9))}</div>`).join('');
    return { type: 'input', prompt: `${title}: hány pöttyöt kapott a ${labels[i]}?`, visual: `<div class="pictwrap">${rows}</div>`, answer: Math.min(vals[i], 9), hint: 'Számold meg a pöttyöket a jel mellett!' };
  }
  const vis = barSvg(labels, vals, max, unit), r = Math.random(), i = ri(0, 3); let j = ri(0, 3); while (j === i) j = ri(0, 3);
  if (r < .4) return { type: 'input', prompt: `${title}: mennyit mutat a ${labels[i]} oszlopa?`, visual: vis, answer: vals[i], hint: `Kövesd az oszlop tetejét balra, a számokhoz! A vonalak ${byN(unit)} követik egymást.` };
  if (r < .65 && new Set(vals).size === 4) { const mx = labels[vals.indexOf(Math.max(...vals))]; return { type: 'choice', prompt: `${title}: melyikből van a legtöbb?`, visual: vis, answer: mx, options: labels.map(v => ({ value: v, html: v })), answerText: mx, hint: 'Keresd a legmagasabb oszlopot!' }; }
  if (r < .85 && vals[i] !== vals[j]) { const [a, b] = vals[i] > vals[j] ? [i, j] : [j, i]; return { type: 'input', prompt: `${title}: mennyivel több ${labels[a]}, mint ${labels[b]}?`, visual: vis, answer: vals[a] - vals[b], hint: 'Olvasd le mindkét oszlopot, és vond ki a kisebbet a nagyobból!' }; }
  return { type: 'input', prompt: `${title}: mennyi a négy oszlop együtt?`, visual: vis, answer: vals.reduce((a, b) => a + b, 0), hint: 'Olvasd le az oszlopokat egyenként, és add össze őket!' };
};

/* ---------- solids (testek) ---------- */
const SOLIDS = { 'kocka': '🎲', 'gömb': '⚽', 'henger': '🥫', 'kúp': '🍦', 'téglatest': '📦', 'gúla': '⛺' };
const SOLID_FACTS = [
  [1, 'Milyen test a labda?', 'gömb', ['kocka', 'henger', 'téglatest'], 'A gömb mindenhol gömbölyű, nincs éle, nincs csúcsa.'],
  [1, 'Milyen test a konzervdoboz?', 'henger', ['gömb', 'kúp', 'kocka'], 'A hengernek két kör alakú lapja és egy gömbölyű palástja van.'],
  [1, 'Milyen test a cipősdoboz?', 'téglatest', ['kocka', 'gömb', 'kúp'], 'A téglatestnek 6 téglalap alakú lapja van.'],
  [1, 'Milyen alakú a fagylalttölcsér?', 'kúp', ['henger', 'gömb', 'kocka'], 'A kúpnak egy kör alakú lapja és egy csúcsa van.'],
  [2, 'Hány lapja van a kockának?', '6', ['4', '8', '12'], 'Gondolj a dobókockára: 1-től 6-ig minden lapján más szám van.'],
  [2, 'Melyik test gurul el bármerre?', 'a gömb', ['a kocka', 'a téglatest', 'a gúla'], 'A gömbnek nincs lapja, ezért bármerre gurul.'],
  [2, 'Milyen alakúak a kocka lapjai?', 'négyzetek', ['körök', 'háromszögek', 'téglalapok, amelyek nem négyzetek'], 'A kocka 6 lapja egybevágó négyzet.'],
  [2, 'Hány csúcsa van a kúpnak?', '1', ['0', '2', '4'], 'A kúp hegye a csúcsa.'],
  [3, 'Hány éle van a kockának?', '12', ['6', '8', '10'], 'Fent 4, lent 4, oldalt 4 él: 12.'],
  [3, 'Hány csúcsa van a kockának?', '8', ['6', '12', '4'], 'Fent 4 és lent 4 csúcs: 8.'],
  [3, 'Hány lapja van a négyzet alapú gúlának?', '5', ['4', '6', '8'], 'Egy négyzet alap és 4 háromszög oldallap.'],
  [3, 'Melyik testnek nincs se éle, se csúcsa?', 'a gömbnek', ['a kockának', 'a kúpnak', 'a hengernek'], 'A gömb felszíne mindenhol görbe.']
];
const SOLID_TBL = [['kocka', 6, 12, 8], ['téglatest', 6, 12, 8], ['négyzet alapú gúla', 5, 8, 5], ['háromszög alapú gúla', 4, 6, 4], ['háromszög alapú hasáb', 5, 9, 6], ['ötszög alapú hasáb', 7, 15, 10]];
const solidCount = L => { const pool = L === 2 ? SOLID_TBL.slice(0, 3) : SOLID_TBL, [n, f, e, v] = pick(pool), k = pick([['lapja', f], ['éle', e], ['csúcsa', v]]); return { type: 'input', prompt: `Hány ${k[0]} van ${artOf(n)} <b>${n.replace(/a$/, 'á')}${/test$/.test(n) ? 'nek' : 'nak'}</b>?`, answer: k[1], hint: 'Lap: a test sík felülete. Él: ahol két lap találkozik. Csúcs: ahol az élek találkoznak.' }; };
const solidName = () => { const n = pick(Object.keys(SOLIDS)); return { type: 'choice', prompt: 'Milyen test alakú ez a tárgy?', visual: `<div class="big-emoji">${SOLIDS[n]}</div>`, answer: n, options: shuffle([n, ...shuffle(Object.keys(SOLIDS).filter(x => x !== n)).slice(0, 3)]).map(v => ({ value: v, html: v })), answerText: n, hint: 'Dobókocka: kocka. Labda: gömb. Konzervdoboz: henger. Tölcsér: kúp. Doboz: téglatest. Sátor: gúla.' }; };
const SOLID_SORT = L => sortQ('Elgurul vagy nem gurul? Válogasd szét!', { 'elgurul': [['gömb', '⚽'], ['henger', '🥫'], ['kúp', '🍦']], 'nem gurul': [['kocka', '🎲'], ['téglatest', '📦'], ['gúla', '⛺']] }, 2, { hint: 'Amelyiknek van gömbölyű része, az el tud gurulni.' });
const solidsQ = L => { const r = Math.random(); if (r < .15) return SOLID_SORT(L); if (r < .35) return L === 1 ? solidName() : solidCount(L); if (r < .45) return solidName(); return factQ(pick(SOLID_FACTS.filter(f => f[0] === L))); };

/* ---------- mirror symmetry ---------- */
const SYM_LETTERS = { yes: ['A', 'H', 'M', 'O', 'T', 'U', 'V', 'W', 'X', 'Y', 'B', 'C', 'D', 'E'], no: ['F', 'G', 'J', 'L', 'N', 'P', 'Q', 'R', 'S', 'Z'] };
const symQ2 = L => {
  const r = Math.random();
  if (r < .45) { const y = pick(SYM_LETTERS.yes); return mcq('Melyik betű tengelyesen szimmetrikus (két fele egymás tükörképe)?', y, shuffle(SYM_LETTERS.no).slice(0, 3), { fmt: v => `<span class="bigl">${v}</span>`, hint: 'Képzelj egy tükröt a betű közepére (függőlegesen vagy vízszintesen)! Ha a két fele ugyanolyan, szimmetrikus.' }); }
  if (r < .7) { const n = pick(SYM_LETTERS.no); return mcq('Melyik betű NEM tengelyesen szimmetrikus?', n, shuffle(SYM_LETTERS.yes).slice(0, 3), { fmt: v => `<span class="bigl">${v}</span>`, hint: 'Keresd azt, amelyiknek sehogy sem lehet tükörtengelyt húzni.' }); }
  const [q, a, w, hn] = pick([['Hány szimmetriatengelye van a négyzetnek?', '4', ['1', '2', '8'], 'Két átló és két középvonal.'], ['Hány szimmetriatengelye van a téglalapnak (amely nem négyzet)?', '2', ['1', '4', '0'], 'A két középvonala. Az átlói nem tengelyek!'], ['Hány szimmetriatengelye van a szabályos háromszögnek?', '3', ['1', '2', '6'], 'Minden csúcsából a szemközti oldal felezőpontjába.'], ['Melyiknek van végtelen sok szimmetriatengelye?', 'a körnek', ['a négyzetnek', 'a téglalapnak', 'a háromszögnek'], 'A kör bármely átmérője tükörtengely.']]);
  return mcq(q, a, w, { fmt: v => v, hint: hn });
};

/* ---------- function machine (szabályjáték) ---------- */
const machineQ = g => L => {
  const rules = g <= 2 ? [[x => x + 3, '+ 3'], [x => x + 5, '+ 5'], [x => x - 2, '− 2'], [x => x * 2, '· 2'], [x => x + 10, '+ 10']] : [[x => x * 3, '· 3'], [x => x * 4, '· 4'], [x => x * 2 + 1, '· 2 + 1'], [x => x * 10, '· 10'], [x => x * 5 - 2, '· 5 − 2'], [x => x + 25, '+ 25']];
  const [f, name] = pick(rules), xs = shuffle(Array.from({ length: 9 }, (_, i) => i + 2)).slice(0, 4).sort((a, b) => a - b);
  const table = `<table class="fmach"><tr><th>be</th>${xs.map(x => `<td>${x}</td>`).join('')}</tr><tr><th>ki</th>${xs.map((x, i) => `<td>${i === 3 ? '?' : f(x)}</td>`).join('')}</tr></table>`;
  if (Math.random() < .5) return { type: 'input', prompt: 'Szabályjáték: a gép minden számmal ugyanazt csinálja. Mi kerül a kérdőjel helyére?', visual: table, answer: f(xs[3]), hint: 'Nézd meg, mi lett a többi számból! Mi a szabály?' };
  return mcq('Szabályjáték: mi a gép szabálya? (A „be” számokból lettek a „ki” számok.)', name, shuffle(rules.filter(r => r[1] !== name)).slice(0, 3).map(r => r[1]), { visual: table.replace('>?<', `>${f(xs[3])}<`), fmt: v => `<b>${v}</b>`, hint: 'Próbáld ki mindegyik szabályt az első számon!' });
};

/* ---------- grade 4: fractions on a picture, estimation ---------- */
const estimQ = L => { const a = ri(21, 89), b = ri(21, 89), ex = a * b, near = Math.round(a / 10) * 10 * Math.round(b / 10) * 10; return mcq(`Becsüld meg kerekítéssel: <b>${a} · ${b}</b> körülbelül mennyi?`, near, [near * 10, Math.round(near / 10), near + 1000 * (near > 2000 ? -1 : 1)].filter(x => x > 0 && x !== near), { fmt: v => `≈ ${fmt(v)}`, hint: `Kerekítsd tízesekre: ${Math.round(a / 10) * 10} · ${Math.round(b / 10) * 10}. (A pontos érték: ${fmt(ex)}.)` }); };

/* ---------- add the topics to the grade pages ---------- */
const addTopics = (pid, list) => PAGES[pid].topics.push(...list);
addTopics('matek-1', [
  { id: 'numline', sample: '0 — 20', name: 'Számegyenes', desc: 'Koppints a szám helyére a számegyenesen!', gen: nlGen(1) },
  { id: 'match', sample: '3+4 → 7', name: 'Párosító', desc: 'Válogasd a műveleteket az eredményükhöz!', gen: matchQ(M_ADD1, 'Melyik eredményhez tartozik? Válogasd szét!') },
  { id: 'pyramid', sample: '△ 3+5', name: 'Számpiramis', desc: 'Minden tégla a két alatta lévő összege.', gen: pyramidQ(0, 4, 3) },
  { id: 'dbl', sample: '4 → 8', name: 'Dupla és fele', desc: 'Kétszerezés és felezés.', gen: dblQ },
  { id: 'pattern', sample: '🔴🔵🔴?', name: 'Minták', desc: 'Mi jön ezután? Folytasd a mintát!', gen: patternQ },
  { id: 'order', sample: '3 < 7 < 12', name: 'Sorba rendezés', desc: 'Növekvő és csökkenő sorrend.', gen: L => orderQ(0, L === 1 ? 10 : 20, L === 3 ? 5 : 4)(L) },
  { id: 'clockset', sample: '🕒', name: 'Állítsd be az órát!', desc: 'Forgasd a mutatókat egész és fél órára.', gen: L => clockSet(L === 3 ? 2 : 1) },
  { id: 'word', sample: 'Anna 5 almája…', name: 'Szöveges feladatok', desc: 'Kis történetek összeadással, kivonással.', gen: word1 },
  { id: 'open', sample: '□ + 4 < 9', name: 'Nyitott mondatok', desc: 'Koppints minden számra, amely igazzá teszi!', gen: openQ(1) },
  { id: 'data', sample: '● ● ●', name: 'Adatok, táblázatok', desc: 'Olvasd le a képes táblázatot!', gen: dataQ(1) }
]);
addTopics('matek-2', [
  { id: 'numline', sample: '0 — 100', name: 'Számegyenes', desc: 'Tízesével, ötösével beosztott számegyenes.', gen: nlGen(2) },
  { id: 'match', sample: '6·4 → 24', name: 'Párosító', desc: 'Válogasd a műveleteket az eredményükhöz!', gen: L => L === 3 ? matchQ(M_MUL, 'Melyik szorzat mennyi? Válogasd szét!')(L) : matchQ(M_ADD2, 'Melyik eredményhez tartozik? Válogasd szét!')(L) },
  { id: 'pyramid', sample: '△ 23+15', name: 'Számpiramis', desc: 'Minden tégla a két alatta lévő összege.', gen: L => pyramidQ(L === 1 ? 2 : 3, L === 3 ? 12 : 20, L === 3 ? 4 : 3)(L) },
  { id: 'digits', sample: '7 · 2 → 72', name: 'Számkártyák', desc: 'Rakd ki a legnagyobb, a legkisebb számot!', gen: digitsQ(2) },
  { id: 'order', sample: '17 < 45 < 90', name: 'Sorba rendezés', desc: 'Számok 100-ig növekvő és csökkenő sorrendben.', gen: orderQ(1, 100, 4) },
  { id: 'clockset', sample: '🕒', name: 'Állítsd be az órát!', desc: 'Egész, negyed, fél, háromnegyed.', gen: L => clockSet(L === 1 ? 1 : 2) },
  { id: 'even', sample: '2 4 6', name: 'Páros keresés', desc: 'Koppints az összes páros vagy páratlan számra!', gen: evenFind },
  { id: 'open', sample: '□ · 3 > 15', name: 'Nyitott mondatok', desc: 'Melyik szám teszi igazzá?', gen: L => openQ(L === 1 ? 1 : 2)(L) },
  { id: 'combi', sample: '👕 × 👗', name: 'Hányféleképpen?', desc: 'Párosítások, sorrendek összeszámolása.', gen: L => combiQ(Math.min(L, 2)) },
  { id: 'data', sample: '📊', name: 'Adatok, diagramok', desc: 'Képes táblázat és oszlopdiagram olvasása.', gen: dataQ(2) },
  { id: 'machine', sample: 'be → ki', name: 'Szabályjáték', desc: 'Találd ki a gép szabályát!', gen: machineQ(2) }
]);
addTopics('matek-3', [
  { id: 'numline', sample: '0 — 1000', name: 'Számegyenes', desc: 'Százasával, ötvenesével, tízesével beosztva.', gen: nlGen(3) },
  { id: 'match', sample: '56:7 → 8', name: 'Párosító', desc: 'Szorzás és osztás eredménye szerint válogass!', gen: L => L === 1 ? matchQ(M_MUL, 'Melyik szorzat mennyi? Válogasd szét!')(L) : L === 2 ? matchQ(M_DIV3, 'Melyik hányados mennyi? Válogasd szét!')(L) : matchQ(M_BIG, 'Melyik eredményhez tartozik? Válogasd szét!')(L) },
  { id: 'pyramid', sample: '△ 120+85', name: 'Számpiramis', desc: 'Háromjegyű számokkal is.', gen: L => pyramidQ(L === 1 ? 10 : 20, L === 1 ? 60 : L === 2 ? 240 : 120, L === 3 ? 4 : 3)(L) },
  { id: 'magic', sample: '▦ 15', name: 'Bűvös négyzet', desc: 'Minden sorban, oszlopban és átlóban ugyanannyi.', gen: magicQ(L => L === 1 ? 0 : ri(1, 20)) },
  { id: 'digits', sample: '5·0·8 → 850', name: 'Számkártyák', desc: 'Rakd ki a legnagyobb, a legkisebb háromjegyű számot!', gen: digitsQ(3) },
  { id: 'order', sample: '305 < 350 < 503', name: 'Sorba rendezés', desc: 'Háromjegyű számok sorba rakása.', gen: orderQ(100, 999, 4) },
  { id: 'clockset', sample: '🕒', name: 'Állítsd be az órát!', desc: 'Óra és perc, 5 percre pontosan.', gen: L => clockSet(L === 1 ? 2 : 3) },
  { id: 'span', sample: '8:15 → 9:00', name: 'Időtartam', desc: 'Mennyi ideig tart? Kezdés és befejezés.', gen: L => spanQ(Math.min(L, 2)) },
  { id: 'open', sample: '□ · 7 < 65', name: 'Nyitott mondatok', desc: 'Egyenlőtlenségek megoldása próbálgatással.', gen: L => openQ(L === 1 ? 2 : 3)(L) },
  { id: 'combi', sample: '1 2 3 → 6', name: 'Hányféleképpen?', desc: 'Párosítások, sorrendek, számkártyák.', gen: L => combiQ(Math.min(L + 1, 3)) },
  { id: 'data', sample: '📊', name: 'Diagramok', desc: 'Oszlopdiagram olvasása, összehasonlítás.', gen: dataQ(3) },
  { id: 'solids', sample: '🎲 ⚽ 🥫', name: 'Testek', desc: 'Kocka, téglatest, gömb, henger, kúp, gúla.', gen: L => solidsQ(Math.min(L, 2)) },
  { id: 'sym', sample: 'A | A', name: 'Tükrözés, szimmetria', desc: 'Tengelyesen szimmetrikus alakzatok.', gen: symQ2 },
  { id: 'machine', sample: 'be → ki', name: 'Szabályjáték', desc: 'Találd ki a gép szabályát!', gen: machineQ(3) }
]);
addTopics('matek-4', [
  { id: 'numline', sample: '−10 … 10 000', name: 'Számegyenes', desc: 'Ezresével beosztott és negatív számegyenes.', gen: nlGen(4) },
  { id: 'divis', sample: '135 : 5 ✓', name: 'Oszthatóság', desc: 'Koppints az összes osztható számra!', gen: divisQ },
  { id: 'magic', sample: '▦ 45', name: 'Bűvös négyzet', desc: 'Hiányzó számok a bűvös négyzetben.', gen: magicQ(L => ri(5, 30) * (L === 3 ? 10 : 1)) },
  { id: 'pyramid', sample: '△ 1250', name: 'Számpiramis', desc: 'Nagyobb számokkal, több sorral.', gen: L => pyramidQ(L === 1 ? 50 : 100, L === 1 ? 400 : 900, L === 1 ? 3 : 4)(L) },
  { id: 'digits', sample: '4·0·7·2', name: 'Számkártyák', desc: 'Rakd ki a legnagyobb, a legkisebb négyjegyű számot!', gen: digitsQ(4) },
  { id: 'span', sample: '1 ó 25 p', name: 'Időtartam', desc: 'Hosszabb időtartamok percben.', gen: L => spanQ(Math.max(2, L)) },
  { id: 'combi', sample: '3·2·1', name: 'Kombinatorika', desc: 'Sorrendek, kézfogások, számkártyák.', gen: L => combiQ(3) },
  { id: 'data', sample: '📊', name: 'Diagramok', desc: 'Oszlopdiagram, összehasonlítás, összeg.', gen: dataQ(4) },
  { id: 'solids', sample: '🎲 ⛺', name: 'Testek', desc: 'Lapok, élek, csúcsok.', gen: L => solidsQ(Math.max(2, L)) },
  { id: 'sym', sample: 'A | A', name: 'Tükrözés, szimmetria', desc: 'Szimmetriatengelyek.', gen: symQ2 },
  { id: 'machine', sample: '· 5 − 2', name: 'Szabályjáték', desc: 'Kétlépéses szabályok is.', gen: machineQ(4) },
  { id: 'estim', sample: '48·31 ≈ 1500', name: 'Becslés', desc: 'Kerekítés és becslés szorzásnál.', gen: estimQ }
]);

