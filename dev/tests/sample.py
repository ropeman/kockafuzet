"""Print sample questions (prompt → answer, options) for review. Usage: sample.py PAGEID [n]"""
import subprocess, sys, time, re
from playwright.sync_api import sync_playwright
pid = sys.argv[1]; n = int(sys.argv[2]) if len(sys.argv) > 2 else 2
srv = subprocess.Popen([sys.executable, "-m", "http.server", "8772", "-d", "/tmp/kfsite"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
try:
    with sync_playwright() as p:
        br = p.chromium.launch(); pg = br.new_page(); pg.add_init_script("localStorage.setItem('tt.autonext','0')"); pg.goto("http://localhost:8772/kockafuzet/"); pg.wait_for_timeout(300)
        out = pg.evaluate("""([pid, n]) => { window.LETTERS_OVERRIDE = ALL_G.slice(); const strip = s => String(s ?? '').replace(/<svg[\\s\\S]*?<\\/svg>/g, '[kép]').replace(/<[^>]+>/g, ' ').replace(/\\s+/g, ' ').trim();
          const r = []; for (const t of PAGES[pid].topics) for (let L = 1; L <= 3; L++) for (let i = 0; i < n; i++) { const q = t.gen(L);
            const opts = q.options ? q.options.map(o => strip(o.html)).join(' | ') : q.tiles ? q.tiles.join(' ') : '';
            r.push(`${t.id} L${L}: ${strip(q.prompt)} ${q.visual && !/svg|big-emoji/.test(q.visual) ? '«' + strip(q.visual) + '»' : ''}${/svg/.test(q.visual||'') ? ' [kép]' : ''} => ${strip(q.answerText || (Array.isArray(q.answer) ? q.answer.join(' ') : q.answer))}${opts ? '   {' + opts + '}' : ''}${q.hint ? '\\n        hint: ' + strip(q.hint).slice(0, 160) : ''}`); }
          return r; }""", [pid, n])
        br.close()
finally: srv.terminate()
print("\n".join(out))
