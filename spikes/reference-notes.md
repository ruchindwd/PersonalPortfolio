# Reference teardown — karishma-christopher.vercel.app (2026-11-09)

Pulled from live computed styles. Use as the *quality bar*, not as something to copy.

## What makes the UX feel good
- **Every section is a "fold"**: `min-height: calc(100svh - 72px)`, content vertically centred. One idea per screen, lots of air.
- **One typeface, used with conviction**: Plus Jakarta Sans 800 at -0.035em for display, 400 for body; Caveat 700 for one handwritten accent per screen.
- **One colour**: green #178042 (deep #125F32, tint #E9F6EE, wash). Ink #1E2420, muted #555A57, stone border #E3E1DC, stone-soft surface #F4F3F0. White background.
- **Pills everywhere**: status pill (border stone, 14px/500, 7px 16px), tool pills (border 1.5px, 18px/600, 12px 22px), skill pills (tinted, 17px/500), tag pills (tinted, 13px/600, 5px 12px).
- **Cards**: white, border stone, radius 16, padding 28, min-height 280, shadow 0 1px 2px .06; hover lift -4px + shadow 0 12px 32px .10, ↗ circle button fills green.
- **Eyebrow labels**: 13px/600 uppercase, tracking .18em, muted, hairlines either side, 56px below.
- **Type scale**: display 64/56/52 (800), section title 32 (700, -0.02em), card title 24 (700), body 17/1.65 muted, about body 20/1.65.
- **Hero**: 3-col grid [1fr 480px 1fr], 480×640 cut-out portrait sitting on a stone-soft arch (rounded-top 210px); big word blocks hover with a tint wash.
- **Motion**: handwriting "write" reveal (clip-path wipe), fade-in 8px rise, dice travel/hops with cubic-bezier(.22,.8,.3,1), 0.2s transitions, respects reduced motion.
- **Nav**: sticky 72px, white 92% + blur 12px, border-bottom stone, inner max 1180px, 24px gutters.
- **Content max**: 1180px (hero 1240px). Section inner padding 80px 24px.
- **Squiggle underline**: repeating SVG wave as background-image on a span.

## What we do differently (so it is Ruchin's, not hers)
- Our own type pairing (display grotesk + humanist sans + a different handwriting face), our own accent colour.
- Portrait as a rounded card with a tilted tint behind it, not a cut-out on an arch.
- The signature interaction is "Automate this" (messy → flow → results), not a dice.

## Hero, measured from her live page at 1440×900 (2026-11-09) — now copied in portfolio.html
- Fold: `height: calc(100svh - 72px)`, `min-height: 560px`, overflow hidden, border-bottom stone.
- Top block: padding-top 48px, gap 12px. Greeting 44px Caveat 700 green, rotated -2°, "write" reveal. Pill 14px/500 muted, border stone, padding 7px 16px, 8px green dot, "|" in stone-faint.
- Grid: max 1240px, `[minmax(0,1fr) 480px minmax(0,1fr)]`, rows `minmax(0,1fr)`, items end, flex 1.
- Word blocks are `<a>`s: flex column, gap 16px, self-center, padding 32px (40px on the inner side, 16px outer), radius 24px, hover green wash. Title 64px/0.98 weight 800 tracking -0.035em with a `<br>` (hidden under lg). Subtitle 19px/1.55 muted, max 320px.
- Portrait column: flex column, `justify-content: safe flex-end`, h-full, overflow hidden. Inner 480px wide; arch `absolute inset-x 30px bottom 0 h 540px rounded-t 210px` stone-soft; image 1500×2000 cut-out, `w-full h-auto`. Measured: image [472,259,480,640], arch [502,359,420,540], titles at y=458.
- Mobile (<1024): column; titles 38px, subtitles 15px/1.5, portrait last at 300px with a 330px arch (radius 130, inset 20px).
- Dice bubble: white, border stone, radius 16, padding 12px 16px, 15px text + 13px grey "Tap to roll" inline; sits at [762,810,260,67], i.e. bottom-centre over the portrait's shoulder.

## /work page, measured from her live page at 1440×900 (2026-11-10)

Separate route (`/work`), same sticky header with "My work" underlined as the active link. Three creative bits, all copied into our `work.html`:

1. **Rewriting subtitle** — `<p>` 28px/600 muted with an inline-block handwriting span (44px, green) that cycles `AI agents → Workflows → Processes → Apps` every ~2.4s. Outer span transitions `width 0.5s`, inner span re-runs `write` (clip-path inset from the right, 0.9s cubic-bezier(.45,.05,.55,.95)). Page text keeps a sr-only full sentence. Ours: `Apps → AI agents → Roadmaps → Workflows` + "that paid off", white cover scaled on X instead of clip-path, `clip-path:inset(0)` on the box so the baseline stays the text baseline.
2. **Tabs with counts** — h-12, gap 36, border-b stone; `7 Agents & Apps / 4 Process Optimization / 3 Workshops`, count span in green on the active tab, 2px green underline animated `left,width 0.3s`. Mobile: h-11, gap 12, 12.5px, horizontal scroll with hidden scrollbar.
3. **List + detail (≥768px)** — grid `[0.9fr 1.3fr]` gap 56; left column `relative` with an `absolute inset-0` white card (rounded 24, border stone, overflow hidden): counter row `01` 56px/800 stone-faint + `/ 07` 20px grey (px 24, pt 28, pb 12), then a scrolling list (gap 4, px 20, pb 24) of buttons (py 16 px 16, 3px left border green/stone, rounded-r 12, hover green-wash, title 17px/700 + `01 · Client` 12px, green → on the active row), 64px white fade at the bottom. Right: stone-soft panel rounded 24, p 48 (40 below lg), min-h 520, gap 22: client pill (white, 14px/600, px 14 py 6), h2 48px/800/1.08/-0.03em green-strong, p 18px/1.65 muted max-w 560, tag pills (tint bg, 14px/600, px 14 py 7), `Next: … →` outline button bottom-right. Panel content re-mounts with `fade-in 0.3s` (opacity + 8px rise).
   **Mobile (<768px)** — accordion `ul` border-t; rows py 18 with `01 · Client` 12px over title 18px/700, 34px circle +/− (border green when open); open panel = stone-soft rounded 16 p 20, h2 26px/800/1.15, p 15px/1.6, tags 12px, same fade-in.

Page positions (desktop): h1 y=120 72px/800/-0.04em; subtitle y=210; tabs y=287; grid y=375; detail h2 y=477. Below the list: a stone-soft contact fold (same form as home) and the footer. Her home page links to `/work` from the nav, from each work card and from a "See all my work →" outline button under the cards; ours does the same.
