"""Browser test of the interactive question types (drag, tap, set, riddle) with mouse and touch."""
import subprocess, sys, time, os, math
from playwright.sync_api import sync_playwright
os.makedirs("/tmp/kfshots", exist_ok=True)
srv = subprocess.Popen([sys.executable, "-m", "http.server", "8777", "-d", "/tmp/kfsite"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
B = "http://localhost:8777/kockafuzet"; fails, errs = [], []
def check(c, m):
    print(("  ok   " if c else "  FAIL ") + m)
    if not c: fails.append(m)
def show(pg, expr):
    pg.evaluate("e => { const p = PAGES['kornyezet-4']; if (!S) startTopic(p, p.topics[0]); S.q = (0, eval)(e); S.tries = 0; S.done = false; renderQ(); }", expr); pg.wait_for_timeout(150)
def center(pg, sel):
    b = pg.locator(sel).first.bounding_box(); return b["x"] + b["width"] / 2, b["y"] + b["height"] / 2
def drag(pg, src, dst):
    x1, y1 = center(pg, src); x2, y2 = center(pg, dst)
    pg.mouse.move(x1, y1); pg.mouse.down(); pg.mouse.move(x1 + 10, y1 + 10, steps=3); pg.mouse.move(x2, y2, steps=8); pg.mouse.up(); pg.wait_for_timeout(60)
try:
    with sync_playwright() as p:
        br = p.chromium.launch()
        pg = br.new_page(viewport={"width": 1100, "height": 1000}); pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto(B + "/kornyezet/4/"); pg.wait_for_timeout(300)
        check(pg.locator("button.tile", has_text="Válogató").count() == 1 and pg.locator("button.tile", has_text="Ki vagyok én?").count() == 1, "new topics on the page")

        print("sort: drag with mouse + tap")
        show(pg, "SORTS.state(1)")
        items = pg.evaluate("S.q.items.map(i => [i.id, S.q.bins.findIndex(b => b.id === i.bin)])")
        pg.screenshot(path="/tmp/kfshots/i-sort-start.png")
        for k, (iid, bi) in enumerate(items):
            if k % 2 == 0: drag(pg, f".sitem[data-id='{iid}']", f".sbin >> nth={bi}")
            else: pg.click(f".sitem[data-id='{iid}']"); pg.click(f".sbin-h >> nth={bi}"); pg.wait_for_timeout(40)
        check(pg.locator(".spool .sitem").count() == 0, "all cards placed (drag and tap)")
        pg.screenshot(path="/tmp/kfshots/i-sort-placed.png")
        pg.click(".actions .btn.primary"); pg.wait_for_timeout(100)
        check(pg.evaluate("S.res[S.n-1]") == "ok", "correct sorting accepted")
        pg.screenshot(path="/tmp/kfshots/i-sort-done.png")

        print("sort: wrong first try keeps correct cards, returns wrong ones")
        show(pg, "SORTS.light(1)")
        ids = pg.evaluate("S.q.items.map(i => i.id)")
        for iid in ids: pg.click(f".sitem[data-id='{iid}']"); pg.click(".sbin-h >> nth=0"); pg.wait_for_timeout(20)
        pg.click(".actions .btn.primary"); pg.wait_for_timeout(100)
        back = pg.locator(".spool .sitem").count(); n1 = pg.evaluate("S.q.items.filter(i => i.bin === 'b1').length")
        check(back == n1, f"wrong cards went back to the pile ({back}/{n1})")

        print("label: drag + tap")
        show(pg, "LABELS.plant()")
        ans = pg.evaluate("S.q.spots.map((s, i) => [i, S.q.answer[s.id]])")
        for i, lid in ans:
            if i % 2 == 0: drag(pg, f".lchip[data-id='{lid}']", f".lspot >> nth={i}")
            else: pg.click(f".lchip[data-id='{lid}']"); pg.click(f".lspot >> nth={i}"); pg.wait_for_timeout(40)
        pg.screenshot(path="/tmp/kfshots/i-label-placed.png")
        pg.click(".actions .btn.primary"); pg.wait_for_timeout(100)
        check(pg.evaluate("S.res[S.n-1]") == "ok", "labels accepted")
        show(pg, "LABELS.body()"); pg.screenshot(path="/tmp/kfshots/i-label-body.png")

        print("set thermometer by clicking on it, compass by tapping the ring")
        show(pg, "Object.assign(thermoSet(2), { answer: 23, prompt: 'Állítsd be: 23 °C' })")
        bb = pg.locator(".setfig svg").bounding_box()
        y = bb["y"] + (216 - (23 + 10) / 40 * 200) / 282 * bb["height"]
        pg.mouse.click(bb["x"] + bb["width"] * 0.45, y); pg.wait_for_timeout(60)
        got = pg.inner_text(".setval")
        if "23" not in got:
            v = int(got.split()[0].replace("−", "-"))
            for _ in range(abs(23 - v)): pg.keyboard.press("ArrowUp" if v < 23 else "ArrowDown")
        check("23" in pg.inner_text(".setval"), f"thermometer set to 23 ({pg.inner_text('.setval')})")
        pg.screenshot(path="/tmp/kfshots/i-thermo.png")
        pg.click(".actions .btn.primary"); pg.wait_for_timeout(100)
        check(pg.evaluate("S.res[S.n-1]") == "ok", "thermometer answer accepted")
        show(pg, "Object.assign(compassSet(2), { answer: 5, start: 1, prompt: 'Fordítsd a nyilat: délnyugat' })")
        bb = pg.locator(".setfig svg").bounding_box(); a = math.radians(225)
        pg.mouse.click(bb["x"] + bb["width"] * (110 + 70 * math.sin(a)) / 220, bb["y"] + bb["height"] * (110 - 70 * math.cos(a)) / 220); pg.wait_for_timeout(60)
        check(pg.inner_text(".setval") == "délnyugat", f"compass turned by tapping ({pg.inner_text('.setval')})")
        pg.screenshot(path="/tmp/kfshots/i-compass.png")

        print("riddle")
        show(pg, "riddleQ(RIDDLES[0][1], RIDDLES[0][2], RIDDLES[0][3])")
        pg.click("text=Még egy tipp"); pg.wait_for_timeout(60)
        check(pg.locator(".clues li").count() == 2, "second clue revealed")
        pg.locator(".opt", has_text="méh").click(); pg.wait_for_timeout(100)
        check("2 tippből" in pg.inner_text(".riddlewrap"), "riddle solved from 2 clues")
        pg.screenshot(path="/tmp/kfshots/i-riddle.png")

        print("touch screen")
        ctx = br.new_context(viewport={"width": 390, "height": 844}, has_touch=True, is_mobile=True)
        m = ctx.new_page(); m.on("pageerror", lambda e: errs.append("touch: " + str(e)))
        m.goto(B + "/kornyezet/4/"); m.wait_for_timeout(300)
        show(m, "SORTS.burn(1)")
        items = m.evaluate("S.q.items.map(i => [i.id, S.q.bins.findIndex(b => b.id === i.bin)])")
        for iid, bi in items: m.tap(f".sitem[data-id='{iid}']"); m.tap(f".sbin-h >> nth={bi}"); m.wait_for_timeout(30)
        m.tap(".actions .btn.primary"); m.wait_for_timeout(100)
        check(m.evaluate("S.res[S.n-1]") == "ok", "sorting by tapping on a phone")
        check(not m.evaluate("document.documentElement.scrollWidth > innerWidth"), "no sideways scroll on phone")
        m.screenshot(path="/tmp/kfshots/i-phone.png", full_page=True)
        br.close()
finally: srv.terminate()
print("page errors:", errs or "none"); print("FAILED:", len(fails), fails)
sys.exit(1 if fails or errs else 0)
