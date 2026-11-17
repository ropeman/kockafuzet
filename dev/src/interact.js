/* ===== Interactive question types: sort, label, set, riddle ===== */
// Sort and label work one card / one spot at a time: tap the answer, get feedback at once.
// A miss is remembered: the question is then scored like a second try (no retry round needed).
const noteMiss = n => { if (n && S) S.tries = Math.max(S.tries, 1); };

/* ---------- Válogató: which basket does this card go into? ---------- */
UI.sort = (q, send) => {
  const order = q.items.slice(), place = {}; let k = 0, miss = 0, missHere = false, busy = false, locked = false;
  const counter = h('div', { class: 'sprog' });
  const card = h('div', { class: 'scard', 'aria-live': 'polite' });
  const note = h('div', { class: 'snote' });
  const binList = Object.fromEntries(q.bins.map(b => [b.id, h('div', { class: 'sbin-items' })]));
  const binBtns = q.bins.map((b, i) => h('button', { class: 'sbtn', 'data-bin': b.id, onclick: () => pickBin(b.id) },
    h('span', { class: 'sbtn-k' }, String(i + 1)), h('span', { class: 'sbtn-l' }, b.label)));
  const bins = h('div', { class: 'sbins', style: `--n:${q.bins.length}` }, q.bins.map((b, i) => h('div', { class: 'sbin' }, binBtns[i], binList[b.id])));
  function show() {
    const it = order[k];
    counter.textContent = `${k + 1}. kártya a ${q.items.length}-ból`;
    card.innerHTML = `<div class="scard-in pop" data-id="${it.id}">${it.html}</div>`;
    note.textContent = 'Hová tartozik? Koppints a megfelelő kosárra!'; note.className = 'snote';
    binBtns.forEach(b => b.classList.remove('no'));
    missHere = false;
    if (autoRead() && canSpeak()) speak(it.text);
  }
  function pickBin(bid) {
    if (busy || locked || k >= order.length) return;
    const it = order[k], btn = binBtns.find(b => b.dataset.bin === bid);
    if (bid !== it.bin) {
      if (!missHere) { miss++; missHere = true; }
      btn.classList.remove('no'); void btn.offsetWidth; btn.classList.add('no');
      card.firstChild && card.firstChild.classList.add('shake');
      setTimeout(() => card.firstChild && card.firstChild.classList.remove('shake'), 420);
      note.textContent = 'Nem oda tartozik. Próbáld egy másik kosárral!'; note.className = 'snote bad';
      beep(false); return;
    }
    place[it.id] = bid; busy = true;
    binList[bid].append(h('span', { class: 'schip pop' + (missHere ? ' late' : ''), html: it.html }));
    note.textContent = pick(['Ügyes!', 'Így van!', 'Szuper!', 'Pontosan!']); note.className = 'snote good';
    card.firstChild && card.firstChild.classList.add('fly');
    setTimeout(() => { busy = false; k++; if (k < order.length) show(); else { counter.textContent = 'Kész!'; card.innerHTML = ''; note.textContent = ''; noteMiss(miss); send({ ...place }); } }, 520);
  }
  const onKey = e => { if (expOpen || locked) return; const n = +e.key; if (n >= 1 && n <= q.bins.length) { e.preventDefault(); pickBin(q.bins[n - 1].id); } };
  document.addEventListener('keydown', onKey); cleanups.push(() => document.removeEventListener('keydown', onKey));
  show();
  return {
    el: h('div', { class: 'sortwrap' }, counter, card, note, bins),
    wrong() {},
    lock() { locked = true; binBtns.forEach(b => b.disabled = true); document.removeEventListener('keydown', onKey); }
  };
};
UI.sort.judge = (q, r) => q.items.every(it => r[it.id] === it.bin);

/* ---------- Címkézd fel: what is at the highlighted number? ---------- */
UI.label = (q, send) => {
  const put = {}, lab = Object.fromEntries(q.labels.map(l => [l.id, l])); let k = 0, miss = 0, missHere = false, busy = false, locked = false;
  const spots = q.spots.map((s, i) => h('div', { class: 'lspot', style: `left:${s.x}%;top:${s.y}%` }, String(i + 1)));
  const fig = h('div', { class: 'lfig', html: q.img }); spots.forEach(s => fig.append(s));
  const ask = h('div', { class: 'snote' });
  const btns = q.labels.map(l => h('button', { class: 'opt lname', onclick: () => pickName(l.id) }, l.text));
  const bank = h('div', { class: 'lbank' }, btns);
  function show() {
    spots.forEach((s, i) => s.classList.toggle('cur', i === k));
    ask.innerHTML = `Mi van a <b>${k + 1}.</b> számnál? Válaszd ki a nevét!`; ask.className = 'snote';
    btns.forEach(b => b.classList.remove('wrong'));
    missHere = false;
  }
  function pickName(lid) {
    if (busy || locked || k >= q.spots.length) return;
    const sid = q.spots[k].id, b = btns[q.labels.findIndex(l => l.id === lid)];
    if (q.answer[sid] !== lid) {
      if (!missHere) { miss++; missHere = true; }
      b.classList.add('wrong'); ask.innerHTML = `Ez nem a ${k + 1}. hely neve. Próbáld újra!`; ask.className = 'snote bad'; beep(false); return;
    }
    put[sid] = lid; busy = true;
    spots[k].textContent = lab[lid].text; spots[k].classList.remove('cur'); spots[k].classList.add('filled', missHere ? 'late' : 'right');
    b.classList.add('used'); b.disabled = true;
    ask.textContent = pick(['Ügyes!', 'Így van!', 'Szuper!']); ask.className = 'snote good';
    setTimeout(() => { busy = false; k++; if (k < q.spots.length) show(); else { noteMiss(miss); send({ ...put }); } }, 450);
  }
  show();
  return {
    el: h('div', { class: 'labelwrap' }, fig, ask, bank),
    wrong() {},
    lock() { locked = true; btns.forEach(b => b.disabled = true); spots.forEach((s, i) => { s.classList.remove('cur'); s.textContent = lab[q.answer[q.spots[i].id]].text; s.classList.add('filled'); }); }
  };
};
UI.label.judge = (q, r) => q.spots.every(s => r[s.id] === q.answer[s.id]);

/* ---------- Állítsd be: set an instrument (thermometer, compass) ---------- */
UI.set = (q, send) => {
  let v = q.start;
  const box = h('div', { class: 'setfig' }), readout = h('div', { class: 'setval', 'aria-live': 'polite' });
  const fmtV = x => q.kind === 'thermo' ? `${String(x).replace('-', '−')} °C` : q.kind === 'clock' ? '' : DIRS[x];
  const draw = () => { box.innerHTML = q.kind === 'thermo' ? thermo(v) : q.kind === 'clock' ? clockSvg(Math.floor(v / 60) || 12, v % 60, 230) : compass(v, q.labels || [0, 2, 4, 6]); readout.textContent = fmtV(v); readout.hidden = q.kind === 'clock'; };
  const setV = x => { v = q.kind === 'thermo' ? Math.max(q.min, Math.min(q.max, x)) : q.kind === 'clock' ? ((x % 720) + 720) % 720 : (x + 8) % 8; draw(); };
  const fromPoint = e => {
    const s = box.querySelector('svg'); if (!s) return; const r = s.getBoundingClientRect(), vb = s.viewBox.baseVal;
    const px = (e.clientX - r.left) * vb.width / r.width, py = (e.clientY - r.top) * vb.height / r.height;
    if (q.kind === 'thermo') setV(Math.round(-10 + (216 - py) / 200 * 40));
    else if (q.kind === 'clock') { const ang = (Math.atan2(px - 70, 70 - py) * 180 / Math.PI + 360) % 360, d = Math.hypot(px - 70, py - 70); if (d < 34) setV(((Math.round(ang / 30) % 12) * 60) + v % 60); else setV(Math.floor(v / 60) * 60 + (Math.round(ang / 30) % 12) * 5); }
    else { const ang = Math.atan2(px - 110, 110 - py) * 180 / Math.PI; setV(Math.round(((ang + 360) % 360) / 45) % 8); }
  };
  let drag = false;
  box.addEventListener('pointerdown', e => { drag = true; try { box.setPointerCapture(e.pointerId); } catch (x) {} fromPoint(e); });
  box.addEventListener('pointermove', e => { if (drag) fromPoint(e); });
  box.addEventListener('pointerup', () => { drag = false; });
  box.style.touchAction = 'none';
  const step = d => setV(v + (q.kind === 'clock' ? d * 5 : d));
  const ctr = q.kind === 'clock'
    ? h('div', { class: 'chips setctl' }, h('button', { class: 'btn', onclick: () => setV(v - 60) }, '− 1 óra'), h('button', { class: 'btn', onclick: () => setV(v + 60) }, '+ 1 óra'), h('button', { class: 'btn', onclick: () => setV(v - 5) }, '− 5 perc'), h('button', { class: 'btn', onclick: () => setV(v + 5) }, '+ 5 perc'))
    : q.kind === 'thermo'
    ? h('div', { class: 'chips setctl' }, h('button', { class: 'btn', onclick: () => step(-5) }, '−5'), h('button', { class: 'btn', onclick: () => step(-1) }, '−1'), h('button', { class: 'btn', onclick: () => step(1) }, '+1'), h('button', { class: 'btn', onclick: () => step(5) }, '+5'))
    : h('div', { class: 'chips setctl' }, h('button', { class: 'btn', onclick: () => step(-1) }, '↺ Balra'), h('button', { class: 'btn', onclick: () => step(1) }, 'Jobbra ↻'));
  const onKey = e => { if (expOpen) return; if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); step(1); } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { e.preventDefault(); step(-1); } };
  document.addEventListener('keydown', onKey); cleanups.push(() => document.removeEventListener('keydown', onKey));
  const sb = h('button', { class: 'btn primary', onclick: () => send(v) }, 'Kész');
  draw();
  return {
    el: h('div', { class: 'setwrap' }, h('p', { class: 'mute ihelp' }, q.kind === 'thermo' ? 'Húzd a hőmérő oszlopát, vagy használd a gombokat.' : q.kind === 'clock' ? 'Koppints a számlap szélére a nagy mutatóhoz, a közepe közelébe a kis mutatóhoz, vagy használd a gombokat.' : 'Koppints arra az irányra a körön, vagy forgasd a gombokkal.'), box, readout, ctr), submitBtn: sb,
    wrong() {},
    lock(r, ok) { ctr.querySelectorAll('button').forEach(b => b.disabled = true); document.removeEventListener('keydown', onKey); if (!ok) { v = q.answer; draw(); readout.classList.add('fix'); } },
    done() { sb.remove(); }
  };
};
UI.set.judge = (q, r) => r === q.answer;

/* ---------- Ki vagyok én? clue riddle ---------- */
UI.riddle = (q, send) => {
  let shown = 1;
  const list = h('ol', { class: 'clues' });
  const more = h('button', { class: 'btn small', onclick: () => reveal() }, '💡 Még egy tipp');
  const choice = UI.choice(q, send);
  const reveal = () => { if (shown < q.clues.length) { shown++; draw(); if (autoRead() && canSpeak()) speak(q.clues[shown - 1]); } };
  const draw = () => { list.replaceChildren(...q.clues.slice(0, shown).map((c, i) => h('li', { class: i === shown - 1 ? 'ex-new' : '' }, c))); more.hidden = shown >= q.clues.length; more.textContent = `💡 Még egy tipp (${q.clues.length - shown} maradt)`; };
  draw();
  return {
    el: h('div', { class: 'riddlewrap' }, list, more, choice.el),
    wrong(v) { choice.wrong(v); reveal(); },
    lock(v, ok) { choice.lock(v, ok); more.hidden = true; if (ok) list.after(h('p', { class: 'riddle-note pop' }, shown === 1 ? 'Már az első tippből kitaláltad! 🌟' : `${shown} tippből kitaláltad!`)); shown = q.clues.length; draw(); }
  };
};
UI.riddle.judge = (q, r) => r === q.answer;

/* ---------- builders used by the content files ---------- */
let _sid = 0;
function sortQ(prompt, groups, perBin, opts = {}) {      // groups: { binLabel: [item, …] }, items may be 'word' or ['word', '🐝']
  const labels = Object.keys(groups), items = [];
  labels.forEach((b, bi) => shuffle(groups[b]).slice(0, perBin).forEach(x => { const [w, em] = Array.isArray(x) ? x : [x, opts.emoji && opts.emoji(x)]; items.push({ id: 'i' + (++_sid), html: em ? `<span class="se">${em}</span>${w}` : w, text: w, bin: 'b' + bi }); }));
  const bins = labels.map((b, bi) => ({ id: 'b' + bi, label: b }));
  return { type: 'sort', prompt, bins, items: shuffle(items), hint: opts.hint, answerText: labels.map((b, bi) => `${b}: ${items.filter(it => it.bin === 'b' + bi).map(it => it.text).join(', ')}`).join('<br>') };
}
function labelQ(prompt, img, spots, opts = {}) {            // spots: [{ name, x, y }]
  const sp = spots.map((s, i) => ({ id: 's' + i, x: s.x, y: s.y })), labels = shuffle(spots.map((s, i) => ({ id: 'l' + i, text: s.name })));
  const answer = Object.fromEntries(spots.map((s, i) => [sp[i].id, 'l' + i]));
  return { type: 'label', prompt, img, spots: sp, labels, answer, hint: opts.hint, answerText: spots.map((s, i) => `${i + 1}. ${s.name}`).join(', ') };
}
function riddleQ(clues, answer, wrongs, hint) {
  return { type: 'riddle', prompt: 'Ki vagyok én? Olvasd el a tippet, és találd ki!', clues, answer, options: shuffle([answer, ...wrongs]).map(v => ({ value: v, html: v })), answerText: answer, hint: hint || 'Ha nem tudod, kérj még egy tippet! Minél kevesebb tippből találod ki, annál ügyesebb vagy.', speak: 'Ki vagyok én? ' + clues[0] };
}
