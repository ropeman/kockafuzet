import subprocess, sys, time
from playwright.sync_api import sync_playwright
srv = subprocess.Popen([sys.executable, "-m", "http.server", "8777", "-d", "/tmp/kfsite"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
try:
  with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(); pg.add_init_script("localStorage.setItem('tt.autonext','0')")
    pg.goto("http://localhost:8777/kockafuzet/"); pg.wait_for_timeout(400)
    r = pg.evaluate("""() => { const out = []; window.LETTERS_OVERRIDE = ALL_G.slice();
      for (const pid of PAGE_IDS) { const P = PAGES[pid]; if (!P.topics) continue;
        for (const t of P.topics) { const sz = [1, 2, 3].map(L => { const s = new Set(); for (let i = 0; i < 1500; i++) s.add(qKey(t.gen(L))); return s.size; });
          const all = new Set(); for (const L of [1,2,3]) for (let i = 0; i < 1500; i++) all.add(qKey(t.gen(L)));
          if (Math.min(...sz) < 14) out.push(`${pid}/${t.id}: L1 ${sz[0]}, L2 ${sz[1]}, L3 ${sz[2]} | all levels ${all.size}`); } }
      return out; }""")
    print("\n".join(r)); b.close()
finally: srv.terminate()
