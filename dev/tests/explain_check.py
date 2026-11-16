"""Verify step-by-step explanations: every derived explanation runs, and its steps reach the correct answer."""
import subprocess, sys, time
from playwright.sync_api import sync_playwright
N = int(sys.argv[1]) if len(sys.argv) > 1 else 200
JS = r"""
(N) => {
  window.LETTERS_OVERRIDE = ALL_G.slice();
  const cover = {}, bad = [], per = {};
  const add = (w, m) => { per[w] = (per[w] || 0) + 1; if (per[w] <= 3) bad.push(w + ': ' + m); };
  const strip = s => String(s).replace(/<[^>]+>/g, ' ');
  for (const [pid, page] of Object.entries(PAGES)) for (const t of page.topics || []) for (let L = 1; L <= 3; L++) {
    const w = `${pid}/${t.id}/L${L}`;
    for (let i = 0; i < N; i++) {
      const q = t.gen(L); let ex;
      try { ex = deriveEx(q, pid, t.id); } catch (e) { add(w, 'derive threw ' + e.message); continue; }
      if (!ex) continue;
      cover[w] = (cover[w] || 0) + 1;
      let st; try { st = EXPLAIN[ex.k](ex); } catch (e) { add(w, `explain ${ex.k} threw ${e.message} ${JSON.stringify(ex)}`); continue; }
      if (!st.length || st.some(s => !s.t || /undefined|NaN/.test(s.t + s.v))) { add(w, 'empty/bad step ' + JSON.stringify(ex)); continue; }
      const last = st[st.length - 1].t, all = st.map(s => s.t).join(' | ');
      const has = v => new RegExp('(^|[^0-9])' + v + '([^0-9]|$)').test(last);
      if (ex.k === 'add' && !has(ex.a + ex.b)) add(w, 'add result ' + JSON.stringify(ex) + ' :: ' + last);
      if (ex.k === 'sub' && !has(ex.a - ex.b)) add(w, 'sub result ' + JSON.stringify(ex) + ' :: ' + last);
      if (ex.k === 'mul' && !all.includes(`${ex.a} · ${ex.b} = ${ex.a * ex.b}`)) add(w, 'mul result ' + JSON.stringify(ex));
      if (ex.k === 'divrem') { const qq = Math.floor(ex.a / ex.b), r = ex.a % ex.b; if (!last.includes(`= ${qq}`) || (r && !last.includes(`maradék ${r}`))) add(w, 'div result ' + JSON.stringify(ex) + ' :: ' + last); }
      if (ex.k === 'coladd' || ex.k === 'colsub') {
        const digs = [...all.matchAll(/Leírjuk(?: alulra)?: (\d+)/g)].map(m => m[1]);
        const built = Number(digs.slice().reverse().join(''));
        const want = ex.k === 'coladd' ? ex.a + ex.b : ex.a - ex.b;
        if (built !== want) add(w, `${ex.k} digits ${digs.join(',')} -> ${built} != ${want} ${JSON.stringify(ex)}`);
      }
      if (ex.k === 'fracof' && !all.includes(String(ex.W / ex.n * ex.kk))) add(w, 'frac ' + JSON.stringify(ex));
      if (ex.k === 'clock') { const d = `${ex.hh}:${String(ex.mm).padStart(2, '0')}`; if (!last.includes(d)) add(w, 'clock ' + JSON.stringify(ex) + ' :: ' + last); if (typeof q.answer === 'string' && !/:/.test(q.answer) && !last.includes(q.answer.replace(/^\d+ óra$/, m => m))) add(w, 'clock phrase ' + q.answer + ' :: ' + last); }
      if (ex.k === 'syl' && typeof q.answer === 'string' && q.answer.includes('-') && !last.includes(q.answer)) add(w, 'syl ' + q.answer + ' :: ' + last);
      if (ex.k === 'syl' && typeof q.answer === 'number' && q.answer !== ex.w.split('-').length) add(w, 'syl count mismatch ' + ex.w + ' ' + q.answer);
      if (ex.k === 'length' && !last.includes(ex.w) && !all.includes(ex.w)) add(w, 'length ' + JSON.stringify(ex));
    }
  }
  return { cover, bad };
}
"""
srv = subprocess.Popen([sys.executable, "-m", "http.server", "8774", "-d", "/tmp/kfsite"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
try:
    with sync_playwright() as p:
        br = p.chromium.launch(); pg = br.new_page(); pg.goto("http://localhost:8774/kockafuzet/"); pg.wait_for_timeout(300)
        res = pg.evaluate(JS, N); br.close()
finally: srv.terminate()
topics = {}
for w, n in res["cover"].items():
    k = w.rsplit("/", 1)[0]; topics[k] = topics.get(k, 0) + n
print("topics with explanations:", len(topics))
for k in sorted(topics): print(f"   {k}: {topics[k]}")
for b in res["bad"]: print("  BAD", b)
print("PROBLEMS:", len(res["bad"]))
sys.exit(1 if res["bad"] else 0)
