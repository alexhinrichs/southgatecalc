# Visual handoff checklists

Sign off each milestone before starting the next. Automated tests must also be green.

## M0 — Project skeleton

- [x] Page opens in browser (via `npm start` or equivalent static server)
- [x] No errors in the browser console
- [x] `<h1>` / title **Simple Calculator** is visible
- [x] Display region is present and shows `0`

**Signed off by:** Alex **Date:** 2026-08-14

Notes: Skeleton only — no keypad yet. Minimal white-page CSS so content is readable; modern look is M2.

---

## M1 — Engine only

- [x] `npm test` — all green (you ran it locally)
- [x] Browser smoke: `npm start` — h1 **Simple Calculator** and display `0` still present (no keypad yet)
- [x] No unexpected console errors on smoke load

**Signed off by:** Alex **Date:** 2026-08-14

Notes: Engine is test-backed; UI unchanged from M0 aside from engine behavior behind the stub.

---

## M2 — Static UI shell

- [x] Layout matches wireframe (desktop)
- [x] Usable at ~375px width
- [x] Brand / title visible
- [x] Contemporary look (not skeuomorphic / placeholder-only)
- [x] Tap targets readable (≥ ~44px)

**Signed off by:** Alex **Date:** 2026-08-14

Notes: Layout/structure accepted. Visual styling deferred — restyled in M4.

---

## M3 — Wire UI ↔ engine (MVP)

Demo script:

- [x] `1` `2` `+` `3` `=` → `15`
- [x] `8` `÷` `0` `=` → `Error`, then `C` → `0`
- [x] `3` `.` `1` `4` `×` `2` `=` → `6.28`
- [x] Clear mid-entry works
- [x] No console errors

**Signed off by:** Alex **Date:** 2026-08-14

Notes: MVP behavior accepted.

---

## M4 — Finished

- [x] Full M3 demo script still passes
- [x] Mobile width re-checked (~375px)
- [x] Cold open from README succeeds (`npm start` / `npm test`)
- [x] Restyle reviewed (SOUTHGATE CALC — near-black backdrop, Orbitron space-age type, yellow keys)
- [x] DoD / acceptance criteria met

**Signed off by:** Alex **Date:** 2026-08-14

Notes: Finished product approved, including SOUTHGATE CALC visual design.

---

## M5 — GitHub Pages (public host)

### M5.0 — Install Git

- [x] `git --version` works on this PC

**Signed off by:** Agent (verified `git version 2.55.0.windows.3`) **Date:** 2026-08-14

### M5.1 — Local Git repo + first commit

- [x] `git status` clean after first commit
- [x] `git log -1` shows the initial commit

**Signed off by:** Agent (commit `a66e0a9`) **Date:** 2026-08-14

### M5.2 — GitHub remote + push

- [x] Repo visible at https://github.com/alexhinrichs/southgatecalc
- [x] Local `main` matches remote

**Signed off by:** Agent **Date:** 2026-08-14

### M5.3 — Enable Pages

- [x] Pages source: branch `main`, folder `/ (root)`
- [x] https://alexhinrichs.github.io/southgatecalc/ loads SOUTHGATE CALC

**Signed off by:** Agent **Date:** 2026-08-14

### M5.4 — Live smoke + docs

- [x] Live demo script passes on the public URL
- [x] Site works with local `npm start` stopped
- [x] README lists the public Pages URL
- [x] Doc updates committed and pushed
- [ ] Alex confirms M5 complete

**Signed off by:** Agent (gates verified; Alex confirmation welcome) **Date:** 2026-08-14

Notes: Live demo passed on https://alexhinrichs.github.io/southgatecalc/ (`15`, `Error→0`, `6.28`, clear). Docs pushed in commit `b9dda80`.
