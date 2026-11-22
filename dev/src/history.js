/* ===== auto-advance and looking back at earlier answers ===== */

// --- auto-advance: after an answer the "Tovább" button counts down and then moves on by itself ---
const AUTO_STEPS = [3, 5, 8, 0, 2];   // tapping the ⏱ chip steps through these; 0 = off
const autoSecs = () => { const v = Number(store.get('tt.autonext', 3)); return AUTO_STEPS.includes(v) ? v : 3; };
let autoTimer = null;
function stopAuto() {
  if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  if (S && S.autoBtn) { S.autoBtn.textContent = S.autoLabel; S.autoBtn.classList.remove('counting'); }
  document.removeEventListener('pointerdown', autoInterrupt, true);
}
// the child tapping anything else (hint, explanation, a dot, scrolling the answer) means "wait, I'm reading"
function autoInterrupt(e) {
  if (!S || !S.autoBtn) return;
  if (e.target.closest && (e.target.closest('.next') || e.target.closest('.autochip'))) return;
  stopAuto();
}
function startAuto(btn, label, firstTryOk) {
  stopAuto();
  S.autoBtn = btn; S.autoLabel = label;
  const secs = autoSecs();
  if (S.autoChip) S.autoChip.textContent = secs ? `⏱ ${secs} mp` : '⏱ ki';
  if (!secs) return;
  // a wrong answer needs time to read the correct one, so it waits twice as long
  let left = firstTryOk ? secs : Math.max(secs * 2, 6);
  const q = S.q;
  const show = () => { btn.textContent = `${label} (${left})`; btn.classList.add('counting'); };
  show();
  autoTimer = setInterval(() => {
    if (!S || S.q !== q || !btn.isConnected || expOpen) { if (expOpen) return; stopAuto(); return; }
    left--;
    if (left <= 0) { stopAuto(); btn.click(); } else show();
  }, 1000);
  setTimeout(() => document.addEventListener('pointerdown', autoInterrupt, true), 0);
  cleanups.push(stopAuto);
}

// --- what the child answered, per question of the round ---
const cloneResp = r => r instanceof Set ? [...r] : Array.isArray(r) ? r.slice() : r && typeof r === 'object' ? { ...r } : r;
function recordTry(i, q, resp, ok) {
  S.hist = S.hist || [];
  const rec = S.hist[i] && S.hist[i].q === q ? S.hist[i] : (S.hist[i] = { q, tries: [] });
  rec.tries.push({ r: cloneResp(resp), ok });
}
const buildJoin = q => q.joiner != null ? q.joiner : q.tiles && q.tiles.every(t => [...String(t)].length === 1) ? '' : ' → ';
function answerTextOf(q) {
  if (q.answerText) return q.answerText;
  if (q.type === 'read') return q.text;
  if (q.type === 'choice' || q.type === 'riddle' || q.type === 'lab') return (q.options.find(o => o.value === q.answer) || {}).html;
  if (q.type === 'build') return q.answer.join(buildJoin(q));
  if (q.type === 'find') return q.targets.map(i => q.cells[i]).join(', ');
  return String(q.answer);
}
function respText(q, r) {
  const neg = x => String(x).replace('-', '−');
  switch (q.type) {
    case 'choice': case 'riddle': case 'lab': { const o = q.options.find(o => o.value === r); return o ? o.html : String(r); }
    case 'input': case 'numline': return r == null || r === '' ? '(üres)' : neg(r);
    case 'set': return q.kind === 'thermo' ? `${neg(r)} °C` : q.kind === 'clock' ? `${Math.floor(r / 60) || 12}:${String(r % 60).padStart(2, '0')}` : DIRS[r];
    case 'find': { const a = [...(r || [])]; return a.length ? a.map(i => q.cells[i]).join(', ') : '(semmit nem jelöltél)'; }
    case 'build': return (r || []).join(buildJoin(q));
    case 'sort': {
      const bad = q.items.filter(it => r && r[it.id] !== it.bin);
      return bad.length ? bad.map(it => `${it.text} → ${(q.bins.find(b => b.id === r[it.id]) || {}).label || '?'}`).join('<br>') : 'mindet jó helyre tetted';
    }
    case 'label': {
      const lab = Object.fromEntries(q.labels.map(l => [l.id, l.text]));
      return q.spots.map((s, i) => `${i + 1}. ${lab[r && r[s.id]] || '?'}`).join(', ');
    }
    case 'map': return r || '(nem jelöltél)';
    case 'read': return r ? 'felolvastad' : 'nem sikerült';
  }
  return String(r);
}

// --- the dots: a finished question's dot can be tapped to look at it again ---
function reviewDot(i) {
  const cls = S.res[i] || (i === S.n - 1 ? 'now' : '');
  const d = h('i', { class: cls });
  if (S.res[i] && S.hist && S.hist[i]) makeTappable(d, i);
  return d;
}
function makeTappable(d, i) {
  if (d.classList.contains('tap')) return;
  d.classList.add('tap'); d.setAttribute('role', 'button'); d.setAttribute('tabindex', '0');
  d.setAttribute('aria-label', `${i + 1}. kérdés megnézése (${S.res[i] === 'ok' ? 'jó' : 'hibás'})`);
  d.addEventListener('click', () => openReview(i));
  d.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openReview(i); } });
}
function refreshDot(i) {
  if (!S.dotsEl) return;
  const d = S.dotsEl.children[i]; if (!d) return;
  d.className = S.res[i] || '';
  if (S.res[i] && S.hist && S.hist[i]) makeTappable(d, i);
}
function reviewRow() {
  if (!S || !S.hist || !S.hist.some(Boolean)) return null;
  const dots = h('div', { class: 'dots big' });
  for (let i = 0; i < S.total; i++) { const d = h('i', { class: S.res[i] || '' }); if (S.res[i] && S.hist[i]) makeTappable(d, i); dots.append(d); }
  const bad = S.res.filter(x => x === 'no').length;
  return h('div', { class: 'revrow' }, dots, h('p', { class: 'mute small' }, bad ? 'Koppints egy pöttyre, és megnézheted a válaszodat. A narancssárgák a hibásak.' : 'Koppints egy pöttyre, és megnézheted a válaszodat.'));
}

// --- the look-back card ---
function reviewBody(rec, i) {
  const q = rec.q, res = S.res[i];
  const status = res === 'ok' ? '✓ Elsőre jó' : rec.tries.some(t => t.ok) ? '✓ Másodikra jó' : '✗ Nem sikerült';
  const body = h('div', { class: 'rev-body' });
  body.append(h('div', { class: 'rev-status ' + (res === 'ok' ? 'good' : 'bad') }, `${i + 1}. kérdés · ${status}`));
  body.append(h('div', { class: 'prompt', html: q.prompt }));
  if (q.type === 'riddle') body.append(h('ol', { class: 'clues' }, q.clues.map(c => h('li', null, c))));
  if (q.visual) body.append(h('div', { class: 'visual', html: expandVis(q.visual) }));
  const tried = rec.tries.map(t => t.r);
  if (q.type === 'choice' || q.type === 'riddle' || q.type === 'lab') {
    body.append(h('div', { class: 'opts long' }, q.options.map(o => h('button', { class: 'opt' + (o.value === q.answer ? ' right' : tried.includes(o.value) ? ' wrong' : ''), disabled: true, html: o.html }))));
  } else if (q.type === 'map') {
    const before = cleanups.length;
    try { const ui = UI.map(q, () => {}); const w = tried.filter(r => r !== q.answer).pop(); ui.lock(w, !w); ui.el.querySelectorAll('.ihelp').forEach(x => x.remove()); body.append(ui.el); } catch (e) {}
    cleanups.splice(before).forEach(f => { try { f(); } catch (e) {} });
  }
  const lines = h('div', { class: 'rev-lines' });
  rec.tries.forEach((t, k) => lines.append(h('p', { class: t.ok ? 'good' : 'bad', html: `${rec.tries.length > 1 ? (k ? 'Második' : 'Első') + ' válaszod' : 'A válaszod'}: <b>${respText(q, t.r)}</b> ${t.ok ? '✓' : '✗'}` })));
  if (!rec.tries.some(t => t.ok) || res !== 'ok') lines.append(h('p', { html: `A helyes válasz: <b>${answerTextOf(q)}</b>` }));
  if (q.explain) lines.append(h('p', { class: 'mute', html: q.explain }));
  body.append(lines);
  return body;
}
function openReview(i) {
  if (!S || !S.hist || !S.hist[i]) return;
  stopAuto();
  try { speechSynthesis.cancel(); } catch (e) {}
  const idx = S.hist.map((r, k) => r && S.res[k] ? k : -1).filter(k => k >= 0);
  let at = idx.indexOf(i); if (at < 0) return;
  const prevFocus = document.activeElement;
  const holder = h('div');
  const prev = h('button', { class: 'btn', onclick: () => go(at - 1) }, '◀ Előző');
  const nextB = h('button', { class: 'btn', onclick: () => go(at + 1) }, 'Következő ▶');
  const closeB = h('button', { class: 'btn primary', onclick: () => close() }, 'Vissza');
  const card = h('div', { class: 'exp-card rev-card', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Korábbi válasz' },
    h('div', { class: 'exp-head' }, h('span', { class: 'exp-badge' }, '👀 Visszanézés'), h('button', { class: 'exp-x', 'aria-label': 'Bezárás', onclick: () => close() }, '✕')),
    holder, h('div', { class: 'actions' }, prev, closeB, nextB));
  const ov = h('div', { class: 'exp-ov', onclick: e => { if (e.target === ov) close(); } }, card);
  const go = k => {
    at = Math.max(0, Math.min(idx.length - 1, k));
    holder.replaceChildren(reviewBody(S.hist[idx[at]], idx[at]));
    prev.disabled = at === 0; nextB.disabled = at === idx.length - 1;
    card.scrollTop = 0;
  };
  const onKey = e => {
    e.stopImmediatePropagation();
    if (e.key === 'Escape' || e.key === 'Enter') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(at + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(at - 1); }
  };
  const close = () => { window.removeEventListener('keydown', onKey, true); ov.remove(); expOpen = null; if (prevFocus && prevFocus.focus) prevFocus.focus(); };
  window.addEventListener('keydown', onKey, true);
  document.body.append(ov); expOpen = close;
  go(at); closeB.focus();
}
