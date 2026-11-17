/* ===== Interactive question types: sort, label, set, riddle ===== */
// Tap-to-select + tap-to-place, and drag with mouse or finger. Targets carry data-drop="id".
function makeDraggable(el, id, onPick, onDrop) {
  let sx = 0, sy = 0, ghost = null, moved = false;
  el.style.touchAction = 'none';
  el.addEventListener('pointerdown', e => {
    if (el.disabled || e.button > 0) return;
    sx = e.clientX; sy = e.clientY; moved = false;
    try { el.setPointerCapture(e.pointerId); } catch (x) {}
  });
  el.addEventListener('pointermove', e => {
    if (!el.hasPointerCapture || !el.hasPointerCapture(e.pointerId)) return;
    if (!moved && Math.hypot(e.clientX - sx, e.clientY - sy) < 8) return;
    if (!moved) { moved = true; onPick(id, true); ghost = el.cloneNode(true); ghost.classList.add('drag-ghost'); document.body.append(ghost); }
    ghost.style.left = e.clientX + 'px'; ghost.style.top = e.clientY + 'px';
    document.querySelectorAll('.drop-hover').forEach(x => x.classList.remove('drop-hover'));
    const t = dropTargetAt(e.clientX, e.clientY); if (t) t.classList.add('drop-hover');
  });
  const end = e => {
    document.querySelectorAll('.drop-hover').forEach(x => x.classList.remove('drop-hover'));
    if (ghost) { ghost.remove(); ghost = null; }
    if (moved) { const t = dropTargetAt(e.clientX, e.clientY); onDrop(id, t ? t.dataset.drop : null); el._suppressClick = true; setTimeout(() => { el._suppressClick = false; }, 50); }
    moved = false;
  };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
  el.addEventListener('click', e => { if (el._suppressClick) { e.preventDefault(); return; } onPick(id, false); });
}
function dropTargetAt(x, y) { const el = document.elementFromPoint(x, y); return el && el.closest('[data-drop]'); }

/* ---------- Válogató: sort items into baskets ---------- */
UI.sort = (q, send) => {
  const place = {}; let sel = null;
  const chip = it => { const b = h('button', { class: 'sitem', html: it.html, 'data-id': it.id }); makeDraggable(b, it.id, pickIt, dropIt); return b; };
  const chips = Object.fromEntries(q.items.map(it => [it.id, chip(it)]));
  const pool = h('div', { class: 'spool', 'data-drop': '_pool', 'aria-label': 'Szétválogatandó kártyák' });
  const binEls = Object.fromEntries(q.bins.map(b => [b.id, h('div', { class: 'sbin-items' })]));
  const bins = h('div', { class: 'sbins', style: `--n:${q.bins.length}` }, q.bins.map(b => h('div', { class: 'sbin', 'data-drop': b.id, onclick: e => { if (e.target.closest('.sitem')) return; if (sel) dropIt(sel, b.id); } },
    h('button', { class: 'sbin-h', onclick: () => sel && dropIt(sel, b.id) }, b.label), binEls[b.id])));
  const sb = h('button', { class: 'btn primary', disabled: true, onclick: () => send({ ...place }) }, 'Kész');
  function pickIt(id, dragging) { sel = dragging || sel !== id ? id : null; draw(); }
  function dropIt(id, target) { if (!target) { sel = null; draw(); return; } if (target === '_pool') delete place[id]; else place[id] = target; sel = null; draw(); }
  function draw() {
    q.items.forEach(it => { const c = chips[it.id], home = place[it.id] ? binEls[place[it.id]] : pool; if (c.parentNode !== home) home.append(c); c.classList.toggle('sel', sel === it.id); c.setAttribute('aria-pressed', String(sel === it.id)); });
    pool.classList.toggle('empty', Object.keys(place).length === q.items.length);
    bins.classList.toggle('armed', !!sel);
    sb.disabled = Object.keys(place).length !== q.items.length;
  }
  draw();
  return {
    el: h('div', { class: 'sortwrap' }, h('p', { class: 'mute ihelp' }, 'Húzd a kártyákat a helyükre, vagy koppints egy kártyára, aztán a kosárra.'), pool, bins), submitBtn: sb,
    wrong(r) { q.items.forEach(it => { if (r[it.id] !== it.bin) { delete place[it.id]; chips[it.id].classList.add('was-wrong'); } else chips[it.id].classList.add('right', 'fixed'); }); draw(); },
    lock(r) { q.items.forEach(it => { const c = chips[it.id]; c.disabled = true; c.classList.remove('sel', 'was-wrong'); binEls[it.bin].append(c); c.classList.add(r[it.id] === it.bin ? 'right' : 'wrong'); }); bins.classList.remove('armed'); },
    done() { sb.remove(); }
  };
};
UI.sort.judge = (q, r) => q.items.every(it => r[it.id] === it.bin);

/* ---------- Címkézd fel: put labels on a picture ---------- */
UI.label = (q, send) => {
  const put = {}; let sel = null;           // spotId -> labelId
  const lab = Object.fromEntries(q.labels.map(l => [l.id, l]));
  const chips = Object.fromEntries(q.labels.map(l => { const b = h('button', { class: 'sitem lchip', 'data-id': l.id }, l.text); makeDraggable(b, l.id, pickL, dropL); return [l.id, b]; }));
  const bank = h('div', { class: 'spool lbank', 'data-drop': '_pool' });
  const spots = Object.fromEntries(q.spots.map((s, i) => [s.id, h('button', { class: 'lspot', 'data-drop': s.id, style: `left:${s.x}%;top:${s.y}%`, 'aria-label': `${i + 1}. hely`, onclick: () => spotClick(s.id) }, String(i + 1))]));
  const fig = h('div', { class: 'lfig', html: q.img }); Object.values(spots).forEach(s => fig.append(s));
  const sb = h('button', { class: 'btn primary', disabled: true, onclick: () => send({ ...put }) }, 'Kész');
  function pickL(id, dragging) { sel = dragging || sel !== id ? id : null; draw(); }
  function dropL(id, target) {
    Object.keys(put).forEach(k => { if (put[k] === id) delete put[k]; });
    if (target && target !== '_pool') put[target] = id;
    sel = null; draw();
  }
  function spotClick(sid) { if (sel) dropL(sel, sid); else if (put[sid]) { delete put[sid]; draw(); } }
  function draw() {
    q.spots.forEach((s, i) => { const sp = spots[s.id], l = put[s.id]; sp.textContent = l ? lab[l].text : String(i + 1); sp.classList.toggle('filled', !!l); });
    q.labels.forEach(l => { const used = Object.values(put).includes(l.id), c = chips[l.id]; c.classList.toggle('used', used); c.classList.toggle('sel', sel === l.id); c.setAttribute('aria-pressed', String(sel === l.id)); });
    fig.classList.toggle('armed', !!sel);
    sb.disabled = Object.keys(put).length !== q.spots.length;
  }
  bank.append(...Object.values(chips));
  draw();
  return {
    el: h('div', { class: 'labelwrap' }, h('p', { class: 'mute ihelp' }, 'Húzd a neveket a számokra, vagy koppints egy névre, aztán a helyére.'), fig, bank), submitBtn: sb,
    wrong(r) { q.spots.forEach(s => { if (r[s.id] !== q.answer[s.id]) delete put[s.id]; else spots[s.id].classList.add('right'); }); draw(); },
    lock(r) { q.spots.forEach(s => { const sp = spots[s.id]; sp.disabled = true; sp.textContent = lab[q.answer[s.id]].text; sp.classList.add('filled', r[s.id] === q.answer[s.id] ? 'right' : 'wrong'); }); Object.values(chips).forEach(c => c.disabled = true); },
    done() { sb.remove(); }
  };
};
UI.label.judge = (q, r) => q.spots.every(s => r[s.id] === q.answer[s.id]);

/* ---------- Állítsd be: set an instrument (thermometer, compass) ---------- */
UI.set = (q, send) => {
  let v = q.start;
  const box = h('div', { class: 'setfig' }), readout = h('div', { class: 'setval', 'aria-live': 'polite' });
  const fmtV = x => q.kind === 'thermo' ? `${String(x).replace('-', '−')} °C` : DIRS[x];
  const draw = () => { box.innerHTML = q.kind === 'thermo' ? thermo(v) : compass(v, q.labels || [0, 2, 4, 6]); readout.textContent = fmtV(v); };
  const setV = x => { v = q.kind === 'thermo' ? Math.max(q.min, Math.min(q.max, x)) : (x + 8) % 8; draw(); };
  const fromPoint = e => {
    const s = box.querySelector('svg'); if (!s) return; const r = s.getBoundingClientRect(), vb = s.viewBox.baseVal;
    const px = (e.clientX - r.left) * vb.width / r.width, py = (e.clientY - r.top) * vb.height / r.height;
    if (q.kind === 'thermo') setV(Math.round(-10 + (216 - py) / 200 * 40));
    else { const ang = Math.atan2(px - 110, 110 - py) * 180 / Math.PI; setV(Math.round(((ang + 360) % 360) / 45) % 8); }
  };
  let drag = false;
  box.addEventListener('pointerdown', e => { drag = true; try { box.setPointerCapture(e.pointerId); } catch (x) {} fromPoint(e); });
  box.addEventListener('pointermove', e => { if (drag) fromPoint(e); });
  box.addEventListener('pointerup', () => { drag = false; });
  box.style.touchAction = 'none';
  const step = d => setV(v + d);
  const ctr = q.kind === 'thermo'
    ? h('div', { class: 'chips setctl' }, h('button', { class: 'btn', onclick: () => step(-5) }, '−5'), h('button', { class: 'btn', onclick: () => step(-1) }, '−1'), h('button', { class: 'btn', onclick: () => step(1) }, '+1'), h('button', { class: 'btn', onclick: () => step(5) }, '+5'))
    : h('div', { class: 'chips setctl' }, h('button', { class: 'btn', onclick: () => step(-1) }, '↺ Balra'), h('button', { class: 'btn', onclick: () => step(1) }, 'Jobbra ↻'));
  const onKey = e => { if (expOpen) return; if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); step(1); } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { e.preventDefault(); step(-1); } };
  document.addEventListener('keydown', onKey); cleanups.push(() => document.removeEventListener('keydown', onKey));
  const sb = h('button', { class: 'btn primary', onclick: () => send(v) }, 'Kész');
  draw();
  return {
    el: h('div', { class: 'setwrap' }, h('p', { class: 'mute ihelp' }, q.kind === 'thermo' ? 'Húzd a hőmérő oszlopát, vagy használd a gombokat.' : 'Koppints arra az irányra a körön, vagy forgasd a gombokkal.'), box, readout, ctr), submitBtn: sb,
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
