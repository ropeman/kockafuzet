"""End-to-end browser test of the staged site (dev/tests/stage.sh first). Saves screenshots to /tmp/kfshots."""
import subprocess, sys, time, os, re
from playwright.sync_api import sync_playwright

os.makedirs("/tmp/kfshots", exist_ok=True)
PORT = 8773
srv = subprocess.Popen([sys.executable, "-m", "http.server", str(PORT), "-d", "/tmp/kfsite"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1)
B = f"http://localhost:{PORT}/kockafuzet"
errs, fails = [], []
def check(cond, msg):
    print(("  ok   " if cond else "  FAIL ") + msg)
    if not cond: fails.append(msg)

def answer_current(pg, right=True):
    """Answer the current question via the engine (right or deliberately wrong)."""
    return pg.evaluate("""(right) => {
      const q = S.q; let r;
      if (q.type === 'choice') r = right ? q.answer : q.options.find(o => o.value !== q.answer).value;
      else if (q.type === 'input') r = right ? String(q.answer) : String(Number(q.answer) + 1);
      else if (q.type === 'find') r = right ? new Set(q.targets) : new Set([0]);
      else if (q.type === 'build') r = right ? q.answer.slice() : q.answer.slice().reverse().concat(['x']);
      else r = right;
      submit(r); return q.type; }""", right)

try:
    with sync_playwright() as p:
        br = p.chromium.launch()
        ctx = br.new_context(viewport={"width": 1100, "height": 900})
        pg = ctx.new_page()
        pg.on("pageerror", lambda e: errs.append(f"{pg.url}: {e}"))
        pg.on("console", lambda m: m.type == "error" and "404" not in m.text and errs.append(f"{pg.url}: {m.text}"))

        print("hub")
        pg.goto(B + "/"); pg.wait_for_timeout(500)
        grades = pg.eval_on_selector_all(".grade:not(.off):not(.mode)", "e => e.map(x => x.getAttribute('href'))")
        check(len(grades) == 8, f"8 grade cards ({len(grades)})")
        check(pg.locator(".grade.mode").count() == 4, "4 game cards")
        check(pg.locator(".parent-cta").count() == 1, "parents' link card")
        pg.screenshot(path="/tmp/kfshots/hub.png", full_page=True)

        print("every page renders")
        for href in grades + ["/kockafuzet/jatek/szorzo/", "/kockafuzet/jatek/ora/", "/kockafuzet/jatek/penz/", "/kockafuzet/jatek/hibak/", "/kockafuzet/szuloknek/", "/kockafuzet/adatvedelem/"]:
            pg.goto(f"http://localhost:{PORT}{href}"); pg.wait_for_timeout(150)
            check(pg.locator("h1").count() >= 1, f"{href} has a heading: {pg.locator('h1').first.inner_text()[:40]!r}")
        for href in ["/kockafuzet/matek/2/", "/kockafuzet/magyar/3/"]:
            pg.goto(f"http://localhost:{PORT}{href}"); pg.wait_for_timeout(200)
            pg.screenshot(path=f"/tmp/kfshots/{href.strip('/').replace('/', '-')}.png", full_page=True)

        print("play a round with mistakes (matek-2 / Szorzótábla)")
        pg.goto(B + "/matek/2/"); pg.wait_for_timeout(200)
        pg.locator("button.tile", has_text="Szorzótábla").click(); pg.wait_for_timeout(150)
        pg.screenshot(path="/tmp/kfshots/question.png")
        for i in range(10):
            right = i not in (0, 1)
            answer_current(pg, right)
            if not right: answer_current(pg, False)
            pg.wait_for_timeout(30)
            pg.locator("button.next").click(); pg.wait_for_timeout(30)
        check(pg.locator(".results").count() == 1, "round finishes with a results card")
        check("8 / 10" in pg.inner_text(".results h2"), f"score shows 8 / 10 ({pg.inner_text('.results h2')})")
        miss = pg.evaluate("getMistakes().length")
        check(miss == 2, f"2 mistakes remembered ({miss})")

        print("practise mistakes")
        pg.goto(B + "/jatek/hibak/"); pg.wait_for_timeout(200)
        check("2 feladat" in pg.inner_text("main"), "mistakes page lists 2 tasks")
        pg.screenshot(path="/tmp/kfshots/hibak.png", full_page=True)
        pg.get_by_role("button", name=re.compile("Gyakorlás")).click(); pg.wait_for_timeout(150)
        for i in range(2):
            answer_current(pg, True); pg.locator("button.next").click(); pg.wait_for_timeout(30)
        check("2 hibát kijavítottál" in pg.inner_text("main"), "mistakes fixed message")
        check(pg.evaluate("getMistakes().length") == 0, "mistake list empty after fixing")

        print("times-table challenge")
        pg.goto(B + "/jatek/szorzo/"); pg.wait_for_timeout(200)
        pg.screenshot(path="/tmp/kfshots/szorzo-setup.png", full_page=True)
        pg.get_by_role("button", name="Indulás!").click(); pg.wait_for_timeout(200)
        for i in range(6):
            t = pg.inner_text(".sz-q").split("=")[0].strip().replace("·", "*").replace(":", "//")
            ans = eval(t)
            for ch in str(ans): pg.keyboard.press(ch)
            pg.wait_for_timeout(60)
        score = pg.inner_text(".sz-score")
        check(score.startswith("6"), f"6 correct answers counted ({score})")
        pg.screenshot(path="/tmp/kfshots/szorzo-play.png")
        pg.evaluate("szorzoEnd(PAGES['jatek-szorzo'], {secs:60, tables:[2,3], op:'mul'}, 'test', 14, ['7 · 8 = 56'])")
        pg.wait_for_timeout(100)
        check("14 jó válasz" in pg.inner_text("main") and "7 · 8 = 56" in pg.inner_text("main"), "end screen shows score and facts to practise")
        pg.screenshot(path="/tmp/kfshots/szorzo-end.png")

        print("parents' page")
        pg.goto(B + "/szuloknek/"); pg.wait_for_timeout(300)
        check(pg.locator("table.prog tbody tr").count() >= 1, "progress table has a row")
        pg.screenshot(path="/tmp/kfshots/szulo.png", full_page=True)
        pg.select_option("#b-page", "matek-3"); pg.wait_for_timeout(100)
        pg.locator(".builder .chip", has_text="Írásbeli összeadás").click()
        pg.locator(".builder .chip", has_text="Közepes").click()
        pg.get_by_role("button", name=re.compile("Megosztható link")).click(); pg.wait_for_timeout(100)
        link = pg.input_value(".share-out input")
        check("/feladatsor/?" in link and "p=matek-3" in link and "add" in link, f"share link built: {link[:90]}")

        print("shared set: same questions on another device")
        firsts = []
        for k in range(2):
            c2 = br.new_context(); p2 = c2.new_page(); p2.on("pageerror", lambda e: errs.append(f"set: {e}"))
            p2.goto(link); p2.wait_for_timeout(200)
            p2.get_by_role("button", name="Kezdés").click(); p2.wait_for_timeout(100)
            firsts.append(p2.evaluate("S.list.map(q => q.prompt + '|' + q.answer).join('\\n')"))
            if k == 0:
                for i in range(10):
                    answer_current(p2, i != 3)
                    if i == 3: answer_current(p2, False)
                    p2.locator("button.next").click(); p2.wait_for_timeout(20)
                check("9 / 10" in p2.inner_text("main"), "shared set result 9 / 10")
                p2.screenshot(path="/tmp/kfshots/feladatsor-result.png")
            c2.close()
        check(firsts[0] == firsts[1] and len(firsts[0]) > 20, "both devices got identical questions")

        print("printable worksheet")
        pg.goto(B + "/szuloknek/"); pg.wait_for_timeout(200)
        pg.select_option("#b-page", "magyar-2"); pg.wait_for_timeout(100)
        for name in ["Hosszú mássalhangzók", "j vagy ly?", "Melyik nem illik?"]:
            pg.locator(".builder .chip", has_text=name).click()
        pg.locator(".builder .chip", has_text="20").click()
        pg.get_by_role("link", name=re.compile("Feladatlap nyomtatáshoz")).click(); pg.wait_for_timeout(400)
        nq, nk = pg.locator(".pq").count(), pg.locator(".pkey li").count()
        check(nq == 20 and nk == 20, f"worksheet has 20 questions and 20 answers ({nq}/{nk})")
        pg.screenshot(path="/tmp/kfshots/nyomtatas.png", full_page=True)
        pg.emulate_media(media="print")
        pg.pdf(path="/tmp/kfshots/feladatlap.pdf", format="A4", print_background=True)
        pg.emulate_media(media="screen")
        pg.goto(B + "/nyomtatas/?p=matek-2&t=money,clock&l=2&n=10&s=42"); pg.wait_for_timeout(300)
        pg.emulate_media(media="print"); pg.pdf(path="/tmp/kfshots/feladatlap-matek.pdf", format="A4", print_background=True); pg.emulate_media(media="screen")

        print("offline")
        pg.goto(B + "/"); pg.wait_for_timeout(300)
        ok = pg.evaluate("navigator.serviceWorker.ready.then(() => true)")
        pg.wait_for_timeout(1500)
        pg.reload(); pg.wait_for_timeout(500)
        check(pg.evaluate("!!navigator.serviceWorker.controller"), "service worker controls the page")
        ctx.set_offline(True)
        pg.goto(B + "/matek/3/"); pg.wait_for_timeout(500)
        check("Matematika" in pg.inner_text("h1"), "grade page opens offline")
        pg.goto(B + "/jatek/ora/"); pg.wait_for_timeout(300)
        check("Óra" in pg.inner_text("h1"), "game page opens offline")
        ctx.set_offline(False)

        print("mobile + dark")
        m = br.new_context(viewport={"width": 390, "height": 844}, color_scheme="dark").new_page()
        m.on("pageerror", lambda e: errs.append(f"mobile: {e}"))
        for href, name in [("/", "m-hub"), ("/szuloknek/", "m-szulo"), ("/jatek/szorzo/", "m-szorzo"), ("/magyar/2/", "m-magyar2")]:
            m.goto(B + href); m.wait_for_timeout(300)
            check(not m.evaluate("document.documentElement.scrollWidth > innerWidth"), f"no sideways scroll on {href}")
            m.screenshot(path=f"/tmp/kfshots/{name}.png", full_page=True)
        br.close()
finally:
    srv.terminate()
print("page errors:", errs or "none")
print("FAILED:", len(fails), fails)
sys.exit(1 if fails or errs else 0)
