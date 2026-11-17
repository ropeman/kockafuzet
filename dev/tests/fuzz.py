"""Run every topic generator many times in a real browser and validate the questions.

Usage: python3 dev/tests/fuzz.py [N]   (needs a staged site: dev/tests/stage.sh)
"""
import json, subprocess, sys, time
from playwright.sync_api import sync_playwright

N = int(sys.argv[1]) if len(sys.argv) > 1 else 300
JS = r"""
(N) => {
  window.LETTERS_OVERRIDE = ALL_G.slice();
  const problems = [], stats = {};
  const RX = /undefined|NaN|\[object/;
  const bad = s => RX.test(String(s));
  const per = {};
  const add = (where, msg, q) => { per[where] = (per[where] || 0) + 1; if (per[where] <= 3 && problems.length < 400) problems.push(where + ': ' + msg + ' :: ' + JSON.stringify({ p: q && q.prompt, a: q && q.answer }).slice(0, 220)); };
  for (const [pid, page] of Object.entries(PAGES)) {
    for (const t of page.topics || []) {
      if (!t.gen) continue;
      for (let L = 1; L <= 3; L++) {
        const where = `${pid}/${t.id}/L${L}`; let n = 0;
        for (let i = 0; i < N; i++) {
          let q;
          try { q = t.gen(L); } catch (e) { add(where, 'THROW ' + e.message); break; }
          n++;
          if (!q || !UI[q.type]) { add(where, 'bad type ' + (q && q.type), q); continue; }
          if (bad(q.prompt) || bad(q.visual || '') || bad(q.hint || '') || bad(q.explain || '')) add(where, 'bad text [' + ([q.prompt, q.visual, q.hint, q.explain].map(x => String(x || '').match(RX)).find(Boolean) || [''])[0] + '] ' + ([q.prompt, q.visual, q.hint, q.explain].map(x => { const m = String(x || '').match(RX); return m ? String(x).slice(Math.max(0, m.index - 40), m.index + 30) : ''; }).find(Boolean)), q);
          if (q.type === 'choice') {
            const vals = q.options.map(o => String(o.value));
            if (new Set(vals).size !== vals.length) add(where, 'duplicate options ' + vals.join('|'), q);
            if (!vals.includes(String(q.answer))) add(where, 'answer not in options ' + vals.join('|'), q);
            if (q.options.length < 2) add(where, 'too few options', q);
            if (q.options.some(o => !String(o.html).trim() || bad(o.html))) add(where, 'empty/bad option html', q);
          } else if (q.type === 'input') {
            const a = Number(q.answer);
            if (!Number.isInteger(a)) add(where, 'non-integer answer', q);
            if (a < 0 && !q.neg) add(where, 'negative answer without neg', q);
            if (String(Math.abs(a)).length > 7) add(where, 'answer too long', q);
          } else if (q.type === 'build') {
            const tiles = q.tiles.slice(); for (const g of q.answer) { const k = tiles.indexOf(g); if (k < 0) { add(where, 'tile missing ' + g, q); break; } tiles.splice(k, 1); }
          } else if (q.type === 'sort') {
            const bins = new Set(q.bins.map(b => b.id)), ids = q.items.map(i => i.id);
            if (q.items.some(it => !bins.has(it.bin))) add(where, 'item in unknown bin', q);
            if (new Set(ids).size !== ids.length) add(where, 'duplicate item ids', q);
            if (new Set(q.items.map(i => i.text)).size !== ids.length) add(where, 'duplicate item text', q);
            if (q.bins.some(b => !q.items.some(it => it.bin === b.id))) add(where, 'empty bin', q);
          } else if (q.type === 'label') {
            if (q.spots.some(s => !q.labels.some(l => l.id === q.answer[s.id]))) add(where, 'label answer missing', q);
            if (q.spots.some(s => s.x < 0 || s.x > 100 || s.y < 0 || s.y > 100)) add(where, 'spot outside picture', q);
          } else if (q.type === 'set') {
            if (q.answer === q.start) add(where, 'starts at the answer', q);
            if (q.kind === 'thermo' && (q.answer < q.min || q.answer > q.max)) add(where, 'target out of range', q);
          } else if (q.type === 'riddle') {
            if (!q.options.some(o => o.value === q.answer) || new Set(q.options.map(o => o.value)).size !== q.options.length) add(where, 'riddle options bad', q);
            if (q.clues.slice(0, -1).some(c => c.toLowerCase().includes(String(q.answer).toLowerCase()))) add(where, 'clue gives the answer away', q);
          } else if (q.type === 'numline') {
            if (q.answer < q.min || q.answer > q.max || (q.answer - q.min) % q.step !== 0) add(where, 'numline answer off grid', q);
          } else if (q.type === 'lab') {
            const vals = q.options.map(o => o.value);
            if (!vals.includes(q.answer) || new Set(vals).size !== vals.length || vals.length < 2) add(where, 'lab options bad', q);
            if (!LAB[q.lab]) add(where, 'unknown lab ' + q.lab, q);
            if (q.lab === 'heat' && !HEAT[q.mode]) add(where, 'unknown heat mode', q);
            if (q.lab === 'float' && !FLOAT.some(f => f[0] === q.item)) add(where, 'unknown float item', q);
            if (q.lab === 'dissolve' && !DISSOLVE[q.item]) add(where, 'unknown dissolve item', q);
          } else if (q.type === 'map') {
            const pool = q.map === 'region' ? MAPDATA.region : q.pick === 'dot' ? MAPDATA.places : Object.assign({ Budapest: 1 }, MAPDATA.counties);
            if (!(q.answer in pool)) add(where, 'map answer unknown ' + q.answer, q);
            if (q.pick === 'dot' && (!q.dots.includes(q.answer) || new Set(q.dots).size !== q.dots.length || q.dots.some(d => !(d in MAPDATA.places)))) add(where, 'map dots bad', q);
          } else if (q.type === 'find') {
            if (!q.targets.length || q.targets.some(i => i < 0 || i >= q.cells.length)) add(where, 'bad targets', q);
          }
        }
        stats[where] = n;
      }
    }
  }
  return { problems, topics: Object.keys(stats).length / 3, runs: Object.values(stats).reduce((a, b) => a + b, 0) };
}
"""
srv = subprocess.Popen([sys.executable, "-m", "http.server", "8771", "-d", "/tmp/kfsite"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1)
try:
    with sync_playwright() as p:
        br = p.chromium.launch(); pg = br.new_page()
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto("http://localhost:8771/kockafuzet/"); pg.wait_for_timeout(400)
        res = pg.evaluate(JS, N)
        br.close()
finally:
    srv.terminate()
print(f"topics: {res['topics']:.0f}  questions generated: {res['runs']}")
for line in res["problems"]:
    print("  ", line)
print("page errors:", errs or "none")
print("PROBLEMS:", len(res["problems"]))
sys.exit(1 if res["problems"] or errs else 0)
