# simulate 10-question rounds for every topic and level with the engine's own nextQ; report repeats
import subprocess, sys, time
from playwright.sync_api import sync_playwright
srv = subprocess.Popen([sys.executable, "-m", "http.server", "8777", "-d", "/tmp/kfsite"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
try:
  with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(); pg.add_init_script("localStorage.setItem('tt.autonext','0')"); errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto("http://localhost:8777/kockafuzet/"); pg.wait_for_timeout(400)
    r = pg.evaluate("""() => { const out = []; window.renderQ = () => {}; window.LETTERS_OVERRIDE = ALL_G.slice();
      for (const pid of PAGE_IDS) { const P = PAGES[pid]; if (!P.topics) continue;
        for (const t of P.topics) for (const L of [1, 2, 3]) { let rep = 0;
          for (let run = 0; run < 30; run++) { S = { page: P, topic: t, n: 0, total: 10, level: L, res: [], tries: 0 }; const keys = [];
            for (let i = 0; i < 10; i++) { nextQ(); keys.push(qKey(S.q)); } rep += keys.length - new Set(keys).size; }
          if (rep) out.push(`${pid}/${t.id} L${L}: ${(rep / 30).toFixed(2)} repeats per round`); } }
      return out; }""")
    print("\n".join(r) or "no repeats anywhere"); print("errors:", errs or "none")
    b.close()
finally: srv.terminate()
