/* ===== Napi 5 perc: spaced daily review and weekly goal ===== */
// Each practised topic sits in a "box" 1–5. A good round moves it up (seen less often), a weak one back to box 1.
const INTERVAL = [0, 1, 2, 4, 7, 14];          // days until the next review, by box
const GOAL = 4;                                 // practice days per week
const WD = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'];
const dayNo = (t = Date.now()) => Math.floor((t - new Date(t).getTimezoneOffset() * 6e4) / 864e5);
const RVK = () => `tt.${active}.rv`, DAYS = () => `tt.${active}.days`, DONE = () => `tt.${active}.daily`;
const getRv = () => store.get(RVK(), {});
function markDay() { const d = dayNo(), l = store.get(DAYS(), []); if (!l.includes(d)) { l.push(d); store.set(DAYS(), l.slice(-120)); } }
function rvUpdate(pid, tid, ok) {          // ok: true = step up, false = back to box 1, null = stay
  const rv = getRv(), k = `${pid}/${tid}`, e = rv[k] || { b: 1, d: dayNo(), n: 0 };
  if (ok === true) e.b = Math.min(5, e.b + 1); else if (ok === false) e.b = 1;
  e.d = dayNo() + INTERVAL[e.b]; e.n = (e.n || 0) + 1; rv[k] = e; store.set(RVK(), rv);
}
function reviewAfterRound(page, topic, correct) {
  markDay();
  if (!page || !topic || !page.topics || !topic.gen) return;
  rvUpdate(page.id, topic.id, correct >= 9 ? true : correct < 7 ? false : null);
}
function weekInfo() {
  const wd = (new Date().getDay() + 6) % 7, today = dayNo(), start = today - wd, days = new Set(store.get(DAYS(), []));
  const arr = WD.map((_, i) => ({ on: days.has(start + i), today: start + i === today, future: start + i > today }));
  return { arr, count: arr.filter(x => x.on).length };
}
function weekEl() {
  const { arr, count } = weekInfo();
  return h('div', { class: 'week' },
    h('div', { class: 'wdots', 'aria-label': `Ezen a héten ${count} napon gyakoroltál` }, arr.map((x, i) => h('span', { class: 'wd' + (x.on ? ' on' : '') + (x.today ? ' today' : '') + (x.future ? ' fut' : '') }, h('i', null, x.on ? '✓' : ''), h('small', null, WD[i])))),
    h('span', { class: 'wgoal' }, count >= GOAL ? `Heti cél teljesítve: ${count} nap! 🎉` : `Heti cél: ${count} / ${GOAL} nap`));
}
function dailyList() {
  const rv = getRv(), today = dayNo();
  const entries = Object.entries(rv).map(([k, e]) => {
    const [pid, tid] = k.split('/'), p = PAGES[pid], t = p && p.topics && p.topics.find(x => x.id === tid);
    return t && t.gen && printable(t) ? { pid, tid, t, e } : null;
  }).filter(Boolean);
  if (!entries.length) return null;
  const order = (a, b) => a.e.b - b.e.b || a.e.d - b.e.d;
  const due = entries.filter(x => x.e.d <= today).sort(order), later = entries.filter(x => x.e.d > today).sort(order);
  const pool = due.length >= 3 ? due.slice(0, 6) : due.concat(later).slice(0, 4);
  const items = shuffle(getMistakes()).slice(0, 3).map(m => ({ ...m.q, _page: m.p, _topic: m.t, _mk: m.k }));
  const seen = new Set(items.map(q => q.prompt + '|' + q.answer));
  let i = 0, guard = 0;
  while (items.length < 10 && guard++ < 80) {
    const x = pool[i++ % pool.length], lvl = Math.max(1, store.get(pk(x.pid, x.tid, 'lvl'), 1) - (x.e.b === 1 ? 1 : 0));
    try { const q = x.t.gen(lvl), key = q.prompt + '|' + q.answer; if (q && q.type !== 'read' && !q.autoSpeak && !seen.has(key)) { seen.add(key); items.push({ ...q, _page: x.pid, _topic: x.tid }); } } catch (e) {}
  }
  return shuffle(items);
}
function startDaily() {
  const list = dailyList(); if (!list || !list.length) return;
  const res = {};
  startList({
    page: { id: 'napi', title: 'Napi 5 perc', topics: [] }, title: 'Napi 5 perc', list,
    back: () => { S = null; showHub(); },
    onAnswer: (q, first) => {
      if (q._mk) { if (first) setMistakes(getMistakes().filter(m => m.k !== q._mk)); return; }
      if (!first) rememberMistake(PAGES[q._page], { id: q._topic }, q);
      const k = q._page + '/' + q._topic; res[k] = res[k] === false ? false : first;
    },
    onFinish: s => {
      Object.entries(res).forEach(([k, ok]) => { const [p, t] = k.split('/'); rvUpdate(p, t, ok); });
      store.set(DONE(), dayNo()); markDay();
      const { count } = weekInfo();
      mount(h('div', { class: 'qcard results' },
        h('p', { class: 'mute' }, 'Napi 5 perc'),
        h('h2', null, `${s.correct} / ${s.total} jó elsőre`),
        h('div', { class: 'pop sz-trophy', html: count >= GOAL ? '🏆' : s.correct >= s.total - 1 ? '🌟' : '⭐' }),
        weekEl(),
        h('p', { class: 'mute' }, count >= GOAL ? 'Megvan a heti cél! Holnap új ismétlés vár.' : `Holnap új ismétlés vár. Még ${GOAL - count} nap, és megvan a heti cél.`),
        h('div', { class: 'actions' }, h('button', { class: 'btn primary', onclick: () => { S = null; showHub(); } }, 'Főoldal'), h('button', { class: 'btn', onclick: startDaily }, 'Még egy kör'))));
    }
  });
}
function hubTop() {
  const done = store.get(DONE(), -1) === dayNo(), any = Object.keys(getRv()).length > 0;
  return [h('section', { class: 'daily' + (done ? ' done' : '') },
    h('div', { class: 'daily-main' },
      h('span', { class: 'daily-ico', 'aria-hidden': 'true' }, done ? '✅' : '⏱️'),
      h('div', { class: 'daily-txt' }, h('h2', null, done ? 'Mára kész a Napi 5 perc!' : 'Napi 5 perc'),
        h('p', { class: 'mute' }, !any ? 'Gyakorolj néhány témát, és innentől minden nap összeállítom a legfontosabb ismétlést.' : done ? 'Holnap új ismétlés vár. Ha van kedved, jöhet még egy kör.' : 'Rövid, vegyes ismétlés abból, amit már tanultál. Ami nehezebb volt, gyakrabban visszajön.')),
      any ? h('button', { class: 'btn primary', onclick: startDaily }, done ? 'Még egy kör' : 'Indulás') : null),
    weekEl())];
}
