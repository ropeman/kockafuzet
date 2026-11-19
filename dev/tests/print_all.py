import subprocess, sys, time
from playwright.sync_api import sync_playwright
srv = subprocess.Popen([sys.executable, "-m", "http.server", "8777", "-d", "/tmp/kfsite"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
try:
  with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(); errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto("http://localhost:8777/kockafuzet/"); pg.wait_for_timeout(300)
    tops = pg.evaluate("PAGE_IDS.filter(p => PAGES[p].topics).flatMap(p => PAGES[p].topics.map(t => [p, t.id, printable(t)]))")
    bad = []; skipped = [x for x in tops if not x[2]]
    for pid, tid, ok in tops:
        if not ok: continue
        for L in (1, 3):
            n0 = len(errs); pg.goto(f"http://localhost:8777/kockafuzet/nyomtatas/?p={pid}&t={tid}&l={L}&n=8&s=11"); pg.wait_for_timeout(120)
            n = pg.locator(".pq").count(); txt = pg.inner_text("body")
            keys = pg.locator(".key li, .answers li, .keylist li").count()
            if n != 8 or len(errs) > n0 or "undefined" in txt or "NaN" in txt or "[object" in txt: bad.append(f"{pid}/{tid} L{L}: questions {n}, errors {errs[n0:]}, bad text {'undefined' in txt or 'NaN' in txt or '[object' in txt}")
    print("\n".join(bad) or "all worksheets ok"); print("not printable:", [f"{a}/{b2}" for a, b2, _ in skipped]); print("total topics:", len(tops))
    b.close()
finally: srv.terminate()
