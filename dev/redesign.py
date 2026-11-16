"""Structural changes for the redesign; applied to the JS by build.py via sub()."""
import math

LOGO = ('<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="11" fill="#3563e9"/>'
        '<path d="M7 14h26M7 20h26M7 26h26M14 7v26M20 7v26M26 7v26" stroke="#fff" stroke-opacity=".3" stroke-width="1.5"/>'
        '<path d="M12 21l5.5 5.5L29 14" fill="none" stroke="#ffc93c" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>')

ICON_MATEK = ('<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true">'
              '<path d="M9 4v10M4 9h10M18 9h10M19.5 19.5l7 7M26.5 19.5l-7 7M4 21h10M4 26.5h10"/></svg>')
ICON_MAGYAR = ('<svg viewBox="0 0 32 32" aria-hidden="true"><text x="16" y="24" text-anchor="middle" '
               'font-family="Fredoka,ui-rounded,sans-serif" font-weight="600" font-size="21" fill="currentColor">Aa</text></svg>')

def star(cx, cy, ro, ri):
    pts = []
    for i in range(10):
        r = ro if i % 2 == 0 else ri
        a = -math.pi / 2 + i * math.pi / 5
        pts.append(f"{cx + r * math.cos(a):.1f},{cy + r * math.sin(a):.1f}")
    return " ".join(pts)

holes = "".join(f'<circle cx="80" cy="{y}" r="6" fill="#e9edf6"/>' for y in range(72, 280, 40))
HERO = f'''<svg viewBox="0 0 440 340" role="img" aria-label="Kockás füzetlap egy összeadással, betűkártyával és arany csillaggal">
<defs><pattern id="hg" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#3563e9" stroke-opacity=".17" stroke-width="1"/></pattern></defs>
<g transform="rotate(-4 220 170)">
<rect x="66" y="50" width="300" height="250" rx="18" fill="#1d2742" opacity=".1"/>
<rect x="58" y="38" width="300" height="250" rx="18" fill="#ffffff"/>
<rect x="58" y="38" width="300" height="250" rx="18" fill="url(#hg)"/>
<path d="M104 38v250" stroke="#ee6a4c" stroke-opacity=".6" stroke-width="2"/>
{holes}
<text x="124" y="128" font-family="Fredoka,ui-rounded,sans-serif" font-weight="600" font-size="44" fill="#1d2742">3 + 4 =</text>
<circle cx="304" cy="113" r="31" fill="#e8eefe"/>
<text x="304" y="129" text-anchor="middle" font-family="Fredoka,ui-rounded,sans-serif" font-weight="600" font-size="44" fill="#3563e9">7</text>
<text x="124" y="206" font-family="Fredoka,ui-rounded,sans-serif" font-weight="500" font-size="36" fill="#1d2742">ma · má · mi</text>
<path d="M124 244h170" stroke="#3563e9" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 11"/>
</g>
<g transform="translate(332 196) rotate(9)">
<rect y="7" width="80" height="80" rx="17" fill="#c9472b"/>
<rect width="80" height="80" rx="17" fill="#ee6a4c"/>
<text x="40" y="57" text-anchor="middle" font-family="Fredoka,ui-rounded,sans-serif" font-weight="600" font-size="46" fill="#ffffff">Á</text>
</g>
<polygon points="{star(62, 66, 40, 17)}" fill="#e0a812" transform="translate(0 5)"/>
<polygon points="{star(62, 66, 40, 17)}" fill="#ffc93c"/>
<g transform="translate(150 322) rotate(-5)">
<rect width="150" height="20" rx="4" fill="#3563e9"/><rect width="150" height="6" rx="3" fill="#5a7fef"/>
<rect x="-22" width="26" height="22" rx="5" fill="#f2a7b8"/><rect x="-2" width="10" height="22" fill="#c9cfdc"/>
<polygon points="150,0 178,11 150,22" fill="#f3d9a8"/><polygon points="170,8 178,11 170,14" fill="#1d2742"/>
</g>
</svg>'''

def apply(sub, js_get):
    # home intro instead of the plain title
    sub("""    h('header', null,
      h('h1', { html: 'Kocka<span class="hl">füzet</span>' }),
      h('p', { class: 'mute' }, 'Gyakorló feladatok az 1–4. osztályos NAT-kerettanterv témái szerint. Válassz tantárgyat és osztályt!')),""",
        """    h('section', { class: 'hero' },
      h('div', null,
        h('h1', null, 'Gyakorolj játékosan, a saját tempódban!'),
        h('p', { class: 'lead' }, 'Interaktív matek- és magyarfeladatok 1–4. osztályosoknak, a NAT témái szerint. Egy kör 10 feladat, a csillagok megmutatják, hol tartasz.'),
        h('ul', { class: 'perks' }, h('li', null, 'Ingyenes'), h('li', null, 'Reklám és regisztráció nélkül'), h('li', null, 'Telefonon és tableten is')),
        h('div', { class: 'hero-cta' },
          h('a', { class: 'btn primary', href: '#matek' }, 'Matematika'),
          h('a', { class: 'btn primary magyar', href: '#magyar' }, 'Magyar nyelv'))),
      h('div', { class: 'hero-art', html: HERO_SVG })),""")
    # subject sections with icon and short description
    sub("    return h('section', { class: 'subject' }, h('h2', null, sub.name), grid);",
        "    return h('section', { class: 'subject subj-' + sub.s, id: sub.s },\n"
        "      h('div', { class: 'subj-head' }, h('span', { class: 'subj-ico', html: SUBJ_ICON[sub.s] }),\n"
        "        h('div', null, h('h2', null, sub.name), h('p', { class: 'mute' }, SUBJ_DESC[sub.s]))), grid);")
    # grade cards with progress bar
    sub("""          h('span', { class: 'mute' }, `${got} / ${max} csillag`)));""",
        """          h('span', { class: 'meter', 'aria-hidden': 'true' }, h('i', { style: `width:${Math.round(got / max * 100)}%` })),
          h('span', { class: 'mute' }, `${got} / ${max} csillag`),
          h('span', { class: 'go' }, 'Gyakorlás →')));""")
    # settings row
    sub("""    h('div', { class: 'bar' },
      h('button', { class: 'linkbtn', onclick: () => { muted""",
        """    h('div', { class: 'prefs' },
      h('button', { class: 'linkbtn', onclick: () => { muted""")
    # profile panel heading
    sub("box.append(h('div', { class: 'mute' }, 'Ki gyakorol most? Minden gyereknek külön gyűlnek a csillagai ezen az eszközön.'), row, tools);",
        "box.append(h('div', { class: 'who' }, h('h3', null, 'Ki gyakorol most?'), h('span', { class: 'mute' }, 'A csillagok gyerekenként, ezen az eszközön gyűlnek.')), row, tools);")
    # grade page: breadcrumbs and coloured heading
    sub("""    h('div', { class: 'bar' },
      h('a', { class: 'btn small', href: BASE, style: 'text-decoration:none' }, '← Főoldal'),
      h('span', { class: 'mute' }, 'Gyakorol: ' + who)),
    h('header', null, h('h1', { html: `${page.title} <span class="hl">${page.grade}. osztály</span>` }), h('p', { class: 'mute' }, page.blurb)),""",
        """    h('div', { class: 'bar' },
      h('nav', { class: 'crumbs', 'aria-label': 'Útvonal' },
        h('a', { href: BASE }, 'Főoldal'), h('span', { class: 'sep' }, '›'),
        h('a', { href: BASE + '#' + page.id.split('-')[0] }, PLAN.find(p => p.s === page.id.split('-')[0]).name), h('span', { class: 'sep' }, '›'),
        h('span', { 'aria-current': 'page' }, `${page.grade}. osztály`)),
      h('span', { class: 'whochip' }, 'Gyakorol: ' + who)),
    h('header', { class: 'page-head' },
      h('span', { class: 'subj-ico', html: SUBJ_ICON[page.id.split('-')[0]] }),
      h('div', null, h('h1', null, `${page.title} · ${page.grade}. osztály`), h('p', { class: 'mute' }, page.blurb))),""")
    # scroll to #matek / #magyar on the home page
    sub("  if (PAGES[id]) showTopics(PAGES[id]); else showHub();\n  window.scrollTo(0, 0);",
        "  if (PAGES[id]) showTopics(PAGES[id]); else showHub();\n  window.scrollTo(0, 0);\n"
        "  const tgt = !id && location.hash.length > 1 && document.getElementById(location.hash.slice(1)); if (tgt) tgt.scrollIntoView();")

    import json
    consts = ("const HERO_SVG = " + json.dumps(HERO) + ";\n"
              "const SUBJ_ICON = " + json.dumps({"matek": ICON_MATEK, "magyar": ICON_MAGYAR}) + ";\n"
              "const SUBJ_DESC = " + json.dumps({"matek": "Számolás, számok, mértékegységek, geometria és szöveges feladatok.",
                                                 "magyar": "Betűk, olvasás, helyesírás, nyelvtan és szövegértés."}, ensure_ascii=False) + ";\n")
    return consts

ICON_MOD = ('<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.5l3.6 7.6 8.2 1-6 5.7 1.5 8.2L16 22l-7.3 4 1.5-8.2-6-5.7 8.2-1z" '
            'fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>')
