import subprocess, sys, time
from playwright.sync_api import sync_playwright
srv = subprocess.Popen([sys.executable, "-m", "http.server", "8777", "-d", "/tmp/kfsite"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
try:
  with sync_playwright() as p:
    b = p.chromium.launch(); ctx = b.new_context(viewport={"width": 375, "height": 800}, has_touch=True, is_mobile=True); pg = ctx.new_page(); pg.add_init_script("localStorage.setItem('tt.autonext','0')"); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto("http://localhost:8777/kockafuzet/"); pg.wait_for_timeout(400)
    r = pg.evaluate("""() => { const out = []; window.LETTERS_OVERRIDE = ALL_G.slice(); window.speak = () => {};
      for (const pid of PAGE_IDS) { const P = PAGES[pid]; if (!P.topics) continue;
        for (const t of P.topics) { try { startTopic(P, t); } catch (e) { out.push(pid + '/' + t.id + ' start: ' + e); continue; }
          for (const L of [1, 2, 3]) for (let i = 0; i < 4; i++) { try { S.q = t.gen(L); S.tries = 0; renderQ();
              const card = document.querySelector('.qcard') || document.querySelector('main');
              if (document.documentElement.scrollWidth > innerWidth + 1) out.push(`${pid}/${t.id} L${L} ${S.q.type}: page wider than screen (${document.documentElement.scrollWidth})`);
              document.querySelectorAll('.qcard .visual svg, .qcard svg').forEach(sv => { const r = sv.getBoundingClientRect(); if (r.width < 20 && sv.closest('.visual')) out.push(`${pid}/${t.id}: tiny svg`); });
              document.querySelectorAll('.opt').forEach(o => { if (o.scrollWidth > o.clientWidth + 2) out.push(`${pid}/${t.id} L${L}: option text overflows: ${o.textContent.slice(0, 40)}`); });
            } catch (e) { out.push(`${pid}/${t.id} L${L}: ${e}`); } } } }
      return [...new Set(out)]; }""")
    print("\n".join(r) or "render sweep clean"); print("page errors:", errs[:5] or "none"); b.close()
finally: srv.terminate()
