import subprocess, sys, time, json
from playwright.sync_api import sync_playwright
srv = subprocess.Popen([sys.executable, "-m", "http.server", "8777", "-d", "/tmp/kfsite"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
JS = r"""() => {
  const out = [], plain = x => String(x ?? '').replace(/<[^>]+>/g, ' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/\s+/g, ' ').trim();
  window.speak = () => {}; window.LETTERS_OVERRIDE = ALL_G.slice();
  const right = q => { switch (q.type) {
    case 'choice': case 'riddle': case 'lab': case 'map': case 'numline': case 'set': return q.answer;
    case 'read': return true; case 'input': return String(q.answer); case 'find': return new Set(q.targets); case 'build': return q.answer.slice();
    case 'sort': return Object.fromEntries(q.items.map(i => [i.id, i.bin])); case 'label': return { ...q.answer };
    default: return undefined; } };
  const wrong = q => { switch (q.type) {
    case 'choice': case 'riddle': case 'lab': return (q.options.find(o => o.value !== q.answer) || {}).value;
    case 'map': return '__nowhere__'; case 'numline': return q.answer === q.min ? q.max : q.min; case 'set': return q.kind === 'clock' ? (q.answer + 60) % 720 : q.kind === 'thermo' ? q.answer + 1 : (q.answer + 4) % 8;
    case 'input': return String(Number(q.answer) + 1); case 'find': return new Set([...q.targets.slice(1), ...(q.cells.length > q.targets.length ? [q.cells.findIndex((_, i) => !q.targets.includes(i))] : [])]);
    case 'build': return q.answer.slice().reverse().join() === q.answer.join() ? null : q.answer.slice().reverse();
    default: return null; } };
  const arith = (q, tag) => { if (q.type !== 'input') return; const p = plain(q.prompt).replace(/(\d) (\d{3})/g, '$1$2');
    const m = p.match(/^(?:Számold ki: )?(\d+) ([+−·:]) (\d+) = \?$/) || p.match(/^(\d+) ([+−·:]) (\d+) =$/); if (!m) return;
    const a = +m[1], b = +m[3], v = { '+': a + b, '−': a - b, '·': a * b, ':': a / b }[m[2]]; if (Number.isInteger(v) && v !== Number(q.answer)) out.push(tag + ' ARITH ' + p + ' answer ' + q.answer); };
  for (const pid of PAGE_IDS) { const P = PAGES[pid]; if (!P.topics) continue;
    for (const t of P.topics) for (const L of [1, 2, 3]) { const tag = `${pid}/${t.id} L${L}`;
      try { startTopic(P, t); S.level = L; S.n = 0; S.res = []; S.seen = new Set(); nextQ();
        for (let k = 0; k < 10 && S.q; k++) { const q = S.q, R = right(q);
          if (R === undefined) { out.push(tag + ' unknown type ' + q.type); break; }
          if (!judge(q, R)) out.push(tag + ' RIGHT REJECTED ' + q.type + ': ' + plain(q.prompt).slice(0, 80));
          const W = wrong(q); if (W !== null && W !== undefined && judge(q, W)) out.push(tag + ' WRONG ACCEPTED ' + q.type + ': ' + plain(q.prompt).slice(0, 80) + ' / ' + JSON.stringify([...(W instanceof Set ? W : [W])]));
          arith(q, tag);
          if (q.type !== 'sort' && q.type !== 'label' && k % 3 === 1 && W !== null && W !== undefined) submit(W);
          submit(R);
          const nb = document.querySelector('button.next'); if (!nb) { out.push(tag + ' no Tovább button after ' + q.type); break; } nb.click(); }
        if (!document.querySelector('.results')) out.push(tag + ' no results card');
        if (S.res.length !== 10) out.push(tag + ' res length ' + S.res.length);
      } catch (e) { out.push(tag + ' THROW ' + e.message); } } }
  return out; }"""
try:
  with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(); errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto("http://localhost:8777/kockafuzet/"); pg.wait_for_timeout(400)
    for run in range(int(sys.argv[1]) if len(sys.argv) > 1 else 3):
        r = pg.evaluate(JS)
        for x in sorted(set(r))[:40]: print(x)
        print(f"run {run}: {len(r)} issues")
    print("page errors:", errs[:5] or "none"); b.close()
finally: srv.terminate()
