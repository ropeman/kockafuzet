"""Auto-advance countdown and looking back at earlier answers (run dev/tests/stage.sh first)."""
import subprocess, sys, time
from playwright.sync_api import sync_playwright

PORT = 8779
srv = subprocess.Popen([sys.executable, "-m", "http.server", str(PORT), "-d", "/tmp/kfsite"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1)
B = f"http://localhost:{PORT}/kockafuzet"
errs, fails = [], []
def check(cond, msg):
    print(("  ok   " if cond else "  FAIL ") + msg)
    if not cond: fails.append(msg)

ANSWER = """(right) => {
  const q = S.q; let r;
  if (q.type === 'choice') r = right ? q.answer : q.options.find(o => o.value !== q.answer).value;
  else if (q.type === 'input') r = right ? String(q.answer) : String(Number(q.answer) + 1);
  else if (q.type === 'find') r = right ? new Set(q.targets) : new Set([0]);
  else if (q.type === 'build') r = right ? q.answer.slice() : q.answer.slice().reverse().concat(['x']);
  else if (q.type === 'sort') r = right ? Object.fromEntries(q.items.map(i => [i.id, i.bin])) : {};
  else if (q.type === 'label') r = right ? { ...q.answer } : {};
  else if (['riddle', 'lab', 'map', 'numline', 'set'].includes(q.type)) r = right ? q.answer : (q.type === 'riddle' || q.type === 'lab' ? q.options.find(o => o.value !== q.answer).value : '__x__');
  else r = right;
  submit(r); return q.type; }"""

try:
    with sync_playwright() as p:
        br = p.chromium.launch()
        pg = br.new_page(viewport={"width": 1000, "height": 900})
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto(B + "/matek/2/"); pg.wait_for_timeout(300)
        pg.locator(".tile").first.click(); pg.wait_for_timeout(200)

        # 1) right answer: countdown of 3 on the button, moves on by itself
        pg.evaluate(ANSWER, True); pg.wait_for_timeout(100)
        t = pg.locator(".next").inner_text()
        check("(3)" in t, f"button counts down from 3 by default: {t!r}")
        check(pg.locator(".autochip").inner_text().strip() == "⏱ 3 mp", "the ⏱ chip shows 3 mp")
        n0 = pg.evaluate("S.n")
        pg.wait_for_timeout(3400)
        check(pg.evaluate("S.n") == n0 + 1, "moved to the next question after 3 s")

        # 2) wrong answer (twice): waits longer (6 s)
        pg.evaluate(ANSWER, False); pg.wait_for_timeout(50)
        if pg.evaluate("!S.done && !document.querySelector('.next')"): pg.evaluate(ANSWER, False)
        pg.wait_for_timeout(100)
        t = pg.locator(".next").inner_text()
        check("(6)" in t, f"wrong answer waits 6 s: {t!r}")

        # 3) tapping somewhere else stops the countdown
        n1 = pg.evaluate("S.n")
        pg.locator(".qcard .prompt").click()
        pg.wait_for_timeout(6500)
        check(pg.evaluate("S.n") == n1, "tapping the page stops the countdown")
        check("(" not in pg.locator(".next").inner_text(), "button shows plain Tovább after stopping")

        # 4) the chip cycles 3 → 5 → 8 → ki and is remembered
        pg.locator(".autochip").click(); pg.wait_for_timeout(50)
        check("(10)" in pg.locator(".next").inner_text(), "chip → 5 s restarts the countdown (10 after a wrong answer)")
        pg.locator(".autochip").click(); pg.locator(".autochip").click(); pg.wait_for_timeout(50)
        check(pg.locator(".autochip").inner_text().strip() == "⏱ ki", "chip can switch it off")
        check(pg.evaluate("store.get('tt.autonext')") == 0, "setting is saved")
        pg.wait_for_timeout(2500)
        check(pg.evaluate("S.n") == n1, "off means it waits for the child")
        pg.evaluate("store.set('tt.autonext', 3)")

        # 5) dots of answered questions open the look-back card
        pg.locator(".next").click(); pg.wait_for_timeout(200)
        taps = pg.locator(".bar .dots i.tap").count()
        check(taps == 2, f"two answered dots are tappable: {taps}")
        pg.locator(".bar .dots i.tap").nth(1).click(); pg.wait_for_timeout(150)
        check(pg.locator(".rev-card").count() == 1, "tapping a dot opens the look-back card")
        txt = pg.locator(".rev-card").inner_text()
        check("2. kérdés" in txt and "helyes válasz" in txt.lower(), "card shows question 2 and the right answer")
        check("válaszod" in txt, "card shows what the child answered")
        pg.locator(".rev-card .actions .btn", has_text="Előző").click(); pg.wait_for_timeout(100)
        check("1. kérdés" in pg.locator(".rev-card").inner_text(), "Előző goes to question 1")
        pg.keyboard.press("Escape"); pg.wait_for_timeout(100)
        check(pg.locator(".rev-card").count() == 0, "Escape closes the card")
        check(pg.evaluate("S.q && S.n") == n1 + 1, "the current question is still there")

        # 6) the results page shows tappable dots too
        pg.evaluate("store.set('tt.autonext', 0)")
        for _ in range(12):
            if pg.evaluate("S.n > S.total || !document.querySelector('.bar .dots')"): break
            pg.evaluate(ANSWER, True); pg.wait_for_timeout(30)
            if pg.locator(".next").count(): pg.locator(".next").click(); pg.wait_for_timeout(60)
        check(pg.locator(".results .revrow .dots i.tap").count() == 10, "results page: 10 tappable dots")
        pg.locator(".results .revrow .dots i.tap").nth(1).click(); pg.wait_for_timeout(100)
        check(pg.locator(".rev-card").count() == 1, "results page: a dot opens the look-back card")
        pg.screenshot(path="/tmp/kfshots/review.png")
        pg.keyboard.press("Escape")

        # 7) a map and a sort question in the look-back card (Környezet 4)
        pg.goto(B + "/kornyezet/4/"); pg.wait_for_timeout(300)
        out = pg.evaluate("""() => { const res = {};
          for (const [tid, want] of [['hegyseg', 'map'], ['dombsag', 'sort'], ['folyoink', 'choice']]) {
            const t = PAGES['kornyezet-4'].topics.find(x => x.id === tid); startTopic(PAGES['kornyezet-4'], t);
            let q = null; for (let k = 0; k < 300; k++) { const x = t.gen(1 + k % 3); if (x.type === want) { q = x; break; } }
            if (!q) { res[tid] = 'no ' + want; continue; }
            S.q = q; renderQ();
            const r = want === 'map' ? 'Zengő' === q.answer ? 'Kékes' : 'Zengő' : want === 'sort' ? Object.fromEntries(q.items.map(i => [i.id, q.bins[0].id])) : q.options.find(o => o.value !== q.answer).value;
            submit(r); if (!document.querySelector('.next')) submit(r);
            openReview(S.n - 1); const c = document.querySelector('.rev-card'); res[tid] = c ? c.innerText.replace(/\\s+/g, ' ').slice(0, 160) + (c.querySelector('svg') ? ' [svg]' : '') : 'none';
            expOpen && expOpen(); }
          return res; }""")
        for k, v in out.items():
            print("     ", k, "→", v)
            check(v != "none" and not v.startswith("no ") and "undefined" not in v, f"look-back works for {k}")
        check("[svg]" in out.get("hegyseg", ""), "map question shows the map in the look-back card")
        br.close()
finally:
    srv.terminate()
print("page errors:", errs or "none")
print("FAILED:", len(fails), fails)
