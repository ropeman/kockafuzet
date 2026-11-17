/* ===== Kísérletező: predict → try → observe mini-lab ===== */
// q = { type:'lab', lab:'heat'|'float'|'dissolve', prompt, options, answer, ...lab params }
const LAB = {};

/* ---------- 1. Melegítés, hűtés: ice, water, steam ---------- */
function beakerSvg(t, mode) {
  const st = t < 0 ? 'solid' : t === 0 ? 'mix' : t < 100 ? 'liquid' : 'boil';
  let s = '';
  const flame = t > 20 ? Math.min(1, (t - 20) / 80) : 0;
  s += `<rect x="40" y="226" width="140" height="10" rx="3" fill="#868e96"/>`;
  if (flame > 0) s += `<path d="M110 ${224 - 26 * flame} C${100 - 8 * flame} ${218 - 10 * flame} 100 224 110 224 C120 224 ${120 + 8 * flame} ${218 - 10 * flame} 110 ${224 - 26 * flame}Z" fill="#ff922b"/><path d="M110 ${224 - 14 * flame} C105 220 105 224 110 224 C115 224 115 220 110 ${224 - 14 * flame}Z" fill="#ffd43b"/>`;
  if (t < -2) for (let k = 0; k < 3; k++) s += `<text x="${52 + k * 50}" y="246" font-size="13" fill="#1c7ed6">❄</text>`;
  const top = 70, bot = 196, lvl = 110;
  if (st === 'solid' && mode !== 'melt') s += `<rect x="64" y="${lvl}" width="92" height="${bot - lvl}" fill="#e7f5ff" stroke="#74c0fc" stroke-width="2"/><path d="M76 124 l10 10 M120 150 l14 -8 M90 172 l12 6 M132 182 l-8 -10" stroke="#a5d8ff" stroke-width="2"/>`;
  else if (st === 'solid') [[72, 160], [112, 166], [92, 132]].forEach(([x, y]) => { s += `<rect x="${x}" y="${y}" width="30" height="30" rx="5" fill="#e7f5ff" stroke="#74c0fc" stroke-width="2.5"/><path d="M${x + 6} ${y + 7} l8 0" stroke="#fff" stroke-width="3"/>`; });
  else {
    s += `<rect x="64" y="${lvl}" width="92" height="${bot - lvl}" fill="#74c0fc" opacity=".85"/><path d="M64 ${lvl} q12 -4 23 0 t23 0 t23 0 t23 0" fill="none" stroke="#1c7ed6" stroke-width="2"/>`;
    if (st === 'mix') [[76, 112], [118, 114]].forEach(([x, y]) => { s += `<rect x="${x}" y="${y}" width="22" height="18" rx="5" fill="#e7f5ff" stroke="#74c0fc" stroke-width="2"/>`; });
    if (st === 'boil') {
      [[80, 180, 5], [104, 160, 4], [130, 176, 6], [118, 136, 4], [90, 146, 3], [140, 150, 4]].forEach(([x, y, r]) => { s += `<circle class="bub" cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".85"/>`; });
      [[86, 0], [110, 1], [134, 2]].forEach(([x, i]) => { s += `<path class="steam s${i}" d="M${x} 96 q-10 -14 0 -28 q10 -14 0 -28" fill="none" stroke="#adb5bd" stroke-width="5" stroke-linecap="round" opacity=".8"/>`; });
    }
  }
  s += `<path d="M60 ${top} L60 ${bot + 4} Q60 ${bot + 12} 68 ${bot + 12} L152 ${bot + 12} Q160 ${bot + 12} 160 ${bot + 4} L160 ${top}" fill="none" stroke="#1d2742" stroke-width="3"/><line x1="56" y1="${top}" x2="64" y2="${top}" stroke="#1d2742" stroke-width="3"/><line x1="156" y1="${top}" x2="164" y2="${top}" stroke="#1d2742" stroke-width="3"/>`;
  s += `<rect x="170" y="8" width="44" height="26" rx="8" fill="${t < 0 ? '#d0ebff' : t >= 100 ? '#ffe3e3' : '#fff3bf'}" stroke="#1d2742" stroke-width="2"/><text x="192" y="27" font-size="15" text-anchor="middle" font-weight="700" fill="#1d2742">${String(t).replace('-', '−')}°</text>`;
  return svg(220, 250, s, 'labfig');
}
const HEAT = {
  melt: { start: -15, prompt: 'Mi lesz a jégkockákkal, ha 0 °C fölé melegíted őket?', answer: 'elolvadnak, víz lesz belőlük', wrongs: ['még keményebbek lesznek', 'gőzzé válnak, eltűnnek', 'semmi sem történik velük'], seen: t => t >= 3, obs: 'A jég elolvadt, víz lett belőle. A jég 0 °C-on olvad.', help: 'Húzd a csúszkát jobbra, hogy melegítsd a jeget!' },
  boil: { start: 20, prompt: 'Mi történik a vízzel, ha 100 °C-ra melegíted?', answer: 'forrni kezd, és gőz lesz belőle', wrongs: ['megfagy', 'jéggé válik', 'semmi, csak meleg lesz'], seen: t => t >= 100, obs: 'A víz forr: buborékok szállnak fel, és gőz lesz belőle. A víz 100 °C-on forr.', help: 'Húzd a csúszkát egészen 100 fokig!' },
  freeze: { start: 20, prompt: 'Mi lesz a vízzel, ha 0 °C alá hűtöd?', answer: 'megfagy, jég lesz belőle', wrongs: ['felforr', 'gőzzé válik', 'semmi sem történik vele'], seen: t => t <= -3, obs: 'A víz megfagyott, jég lett belőle. A víz 0 °C-on fagy meg.', help: 'Húzd a csúszkát balra, hogy lehűtsd a vizet!' }
};
LAB.heat = (q, onSeen) => {
  const H = HEAT[q.mode]; let t = H.start, fired = false;
  const fig = h('div', { class: 'labstage' });
  const rng = h('input', { type: 'range', min: -20, max: 110, step: 1, value: t, class: 'labrange', 'aria-label': 'Hőmérséklet' });
  const draw = () => { fig.innerHTML = beakerSvg(t, q.mode); if (!fired && H.seen(t)) { fired = true; onSeen(H.obs); } };
  rng.addEventListener('input', () => { t = +rng.value; draw(); });
  const step = d => { t = Math.max(-20, Math.min(110, t + d)); rng.value = t; draw(); };
  const ctl = h('div', { class: 'labctl' }, h('button', { class: 'btn small', onclick: () => step(-10) }, '❄️ Hűtés'), rng, h('button', { class: 'btn small', onclick: () => step(10) }, '🔥 Melegítés'));
  draw();
  return { el: h('div', { class: 'labexp' }, fig, ctl, h('p', { class: 'mute ihelp' }, H.help)), stop() { ctl.querySelectorAll('button,input').forEach(b => b.disabled = true); } };
};

/* ---------- 2. Úszik vagy elsüllyed? ---------- */
const FLOAT = [['fadarab', '🪵', 1], ['alma', '🍎', 1], ['jégkocka', '🧊', 1], ['műanyag labda', '🏐', 1], ['falevél', '🍂', 1], ['gyertya', '🕯️', 1], ['parafa dugó', '<span class="cork"></span>', 1],
  ['vascsavar', '🔩', 0], ['kő', '🪨', 0], ['pénzérme', '🪙', 0], ['kulcs', '🔑', 0], ['üveggolyó', '<span class="marble"></span>', 0], ['kanál', '🥄', 0]];
LAB.float = (q, onSeen) => {
  const [name, em, fl] = FLOAT.find(f => f[0] === q.item);
  const obj = h('div', { class: 'fobj', html: em });
  const tank = h('div', { class: 'tank' }, h('div', { class: 'water' }), obj);
  const go = h('button', { class: 'btn primary small', onclick: () => { go.disabled = true; obj.classList.add(fl ? 'floats' : 'sinks'); setTimeout(() => onSeen(fl ? `${capW(artOf(name))} ${name} úszik a víz tetején, mert könnyebb, mint ugyanannyi víz.` : `${capW(artOf(name))} ${name} lesüllyedt a víz aljára, mert nehezebb, mint ugyanannyi víz.`), 1100); } }, '💧 Tedd a vízbe!');
  return { el: h('div', { class: 'labexp' }, tank, go), stop() { go.disabled = true; } };
};
const capW = s => s[0].toUpperCase() + s.slice(1);

/* ---------- 3. Oldódás: mi lesz vele a vízben? ---------- */
const DISSOLVE = { 'cukor': 'sol', 'só': 'sol', 'homok': 'sink', 'kavics': 'sink', 'olaj': 'top' };
const INSTR = { 'cukor': 'cukorral', 'só': 'sóval', 'homok': 'homokkal', 'kavics': 'kaviccsal', 'olaj': 'olajjal' };
const DIS_TXT = { sol: 'feloldódik, eltűnik a vízben', sink: 'leülepszik a pohár aljára', top: 'a víz tetején marad' };
const DIS_OBS = { sol: 'feloldódott: a szemcsék eltűntek, de a víz íze megváltozott.', sink: 'nem oldódott fel: leülepedett a pohár aljára.', top: 'nem keveredett el a vízzel: a víz tetején maradt, mert könnyebb a víznél.' };
function glassSvg(kind, stir) {
  let s = `<rect x="58" y="60" width="104" height="150" fill="#e7f5ff"/><rect x="58" y="96" width="104" height="114" fill="#a5d8ff" opacity=".8"/>`;
  const r = (k, m) => (Math.sin(k * 12.9898 + m * 78.233) * 43758.5453) % 1, ab = v => Math.abs(v);
  const n = 26;
  for (let k = 0; k < n; k++) {
    if (kind === 'sol') { if (k >= n * (1 - stir / 3)) continue; const x = 64 + ab(r(k, 1)) * 92, y = stir ? 104 + ab(r(k, 2 + stir)) * 98 : 200 + ab(r(k, 2)) * 8; s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="4" height="4" fill="#fff" stroke="#adb5bd" stroke-width=".6"/>`; }
    else if (kind === 'sink') { const swirl = stir > 0 && stir < 3, x = 64 + ab(r(k, 1)) * 92, y = swirl ? 104 + ab(r(k, 2 + stir)) * 98 : 198 + ab(r(k, 2)) * 9; s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="#c9a66b" stroke="#8d6e3f" stroke-width=".6"/>`; }
    else if (k < 9) { const x = 66 + ab(r(k, 1)) * 86, y = stir > 0 && stir < 3 ? 110 + ab(r(k, 2 + stir)) * 80 : 99 + ab(r(k, 2)) * 4; s += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${stir >= 3 ? 9 : 6}" ry="3.5" fill="#ffd43b" stroke="#e67700" stroke-width=".8"/>`; }
  }
  if (stir > 0 && stir < 3) s += `<path d="M90 70 L128 200" stroke="#868e96" stroke-width="6" stroke-linecap="round"/><ellipse cx="128" cy="200" rx="8" ry="5" fill="#868e96"/>`;
  s += `<path d="M54 52 L58 214 Q58 222 66 222 L154 222 Q162 222 162 214 L166 52" fill="none" stroke="#1d2742" stroke-width="3"/>`;
  return svg(220, 236, s, 'labfig');
}
LAB.dissolve = (q, onSeen) => {
  const kind = DISSOLVE[q.item]; let stir = 0;
  const fig = h('div', { class: 'labstage', html: glassSvg(kind, 0) });
  const btn = h('button', { class: 'btn primary small', onclick: () => { stir++; fig.innerHTML = glassSvg(kind, stir); btn.textContent = stir < 3 ? `🥄 Keverd tovább! (${3 - stir})` : '✔ Megkeverted'; if (stir >= 3) { btn.disabled = true; onSeen(`${capW(artOf(q.item))} ${q.item} ${DIS_OBS[kind]}`); } } }, '🥄 Keverd meg! (3)');
  return { el: h('div', { class: 'labexp' }, fig, btn, h('p', { class: 'mute ihelp' }, `${q.item === 'olaj' ? 'Beleöntöttük' : 'Beleszórtuk'} ${artOf(q.item)} ${accWord(q.item)} a vízbe. Keverd meg háromszor!`)), stop() { btn.disabled = true; } };
};
const accWord = w => ({ cukor: 'cukrot', 'só': 'sót', homok: 'homokot', kavics: 'kavicsot', olaj: 'olajat' })[w] || w;

/* ---------- the question type ---------- */
UI.lab = (q, send) => {
  let pred = null, obs = null, locked = false;
  const btns = q.options.map(o => h('button', { class: 'opt', onclick: () => { if (locked || o.value === pred || btns.find(b => b._v === o.value).classList.contains('wrong')) return; pred = o.value; draw(); } }, h('span', { html: o.html })));
  btns.forEach((b, i) => { b._v = q.options[i].value; });
  const stage = h('div', { class: 'labstep2 off' }, h('h3', { class: 'labh' }, '2. Próbáld ki!'));
  const obsEl = h('div', { class: 'labobs', hidden: true });
  const sb = h('button', { class: 'btn primary', disabled: true, onclick: () => send(pred) }, 'Ellenőrzés');
  const exp = LAB[q.lab](q, text => { obs = text; obsEl.hidden = false; obsEl.replaceChildren(h('b', null, '3. Megfigyelés: '), text); if (autoRead() && canSpeak()) speak(text); draw(); });
  stage.append(exp.el, obsEl);
  function draw() {
    btns.forEach(b => { b.classList.toggle('sel', b._v === pred); b.setAttribute('aria-pressed', String(b._v === pred)); });
    stage.classList.toggle('off', !pred && !obs);
    sb.disabled = !(pred && obs);
  }
  draw();
  return {
    el: h('div', { class: 'labwrap' }, h('h3', { class: 'labh' }, '1. Mit gondolsz? Válassz!'), h('div', { class: 'opts long labopts' }, btns), stage), submitBtn: sb,
    wrong(v) { const b = btns.find(x => x._v === v); if (b) { b.classList.remove('sel'); b.classList.add('wrong'); b.disabled = true; } pred = null; draw(); },
    lock(v, ok) { locked = true; exp.stop(); btns.forEach(b => { b.disabled = true; b.classList.remove('sel'); if (b._v === q.answer) b.classList.add('right'); else if (b._v === v && !ok) b.classList.add('wrong'); }); },
    done() { sb.remove(); }
  };
};
UI.lab.judge = (q, r) => r === q.answer;

/* ---------- generators ---------- */
const labQ = (lab, prompt, answer, wrongs, extra) => ({ type: 'lab', lab, prompt: '🧪 ' + prompt, answer, options: shuffle([answer, ...wrongs]).map(v => ({ value: v, html: v })), answerText: answer, ...extra });
const heatLab = L => { const m = L === 1 ? 'melt' : L === 2 ? pick(['melt', 'freeze']) : pick(['boil', 'freeze', 'melt']), H = HEAT[m]; return labQ('heat', H.prompt, H.answer, H.wrongs, { mode: m, hint: 'A víz 0 °C-on fagy meg, és a jég 0 °C-on olvad el. 100 °C-on a víz forr.', explain: H.obs }); };
const floatLab = L => { const pool = L === 1 ? FLOAT.filter(f => ['fadarab', 'alma', 'kő', 'vascsavar', 'pénzérme', 'műanyag labda', 'kulcs', 'jégkocka'].includes(f[0])) : FLOAT; const [n, , fl] = pick(pool); return labQ('float', `Úszik vagy elsüllyed ${artOf(n)} <b>${n}</b>, ha vízbe teszed?`, fl ? 'úszik a víz tetején' : 'elsüllyed', [fl ? 'elsüllyed' : 'úszik a víz tetején'], { item: n, hint: 'Ami könnyebb, mint ugyanannyi víz, az úszik. A fa, a jég és a legtöbb műanyag úszik; a fémek és a kövek elsüllyednek.' }); };
const dissolveLab = L => { const it = pick(L === 1 ? ['cukor', 'homok', 'só'] : Object.keys(DISSOLVE)), k = DISSOLVE[it]; return labQ('dissolve', `Mi történik ${artOf(it)} <b>${INSTR[it]}</b>, ha ${it === 'olaj' ? 'vízbe öntöd' : 'vízbe szórod'} és megkevered?`, DIS_TXT[k], Object.values(DIS_TXT).filter(x => x !== DIS_TXT[k]), { item: it, hint: 'A cukor és a só feloldódik a vízben. A homok és a kavics leülepszik. Az olaj a víz tetején marad.' }); };
const LAB_GENS = { heat: heatLab, float: floatLab, dissolve: dissolveLab };
