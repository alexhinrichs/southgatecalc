# SOUTHGATE CALC

Bare-bones four-function calculator that runs in the browser. Space-age dark theme with yellow keys.

## Live site

**Public URL (GitHub Pages):** [https://alexhinrichs.github.io/southgatecalc/](https://alexhinrichs.github.io/southgatecalc/)

Hosted on GitHub’s CDN — not your home network. Source: [github.com/alexhinrichs/southgatecalc](https://github.com/alexhinrichs/southgatecalc).

## Status

**M4 — Finished product** (complete — Alex signed off)

**M5 — GitHub Pages** (live)

Milestones M0–M5 are complete.

## Features

- Digits `0–9`, decimal, clear (`C`)
- Operators `+ − × ÷` with classic pending-operator chaining
- Equals (`=`)
- Divide-by-zero shows `Error` (recover with `C` or a new digit)
- Display input capped at 12 characters

## Run locally

Requires [Node.js](https://nodejs.org/) 18+.

```bash
npm start
```

Open the URL printed in the terminal (often `http://localhost:3000`).

Any static file server pointed at this folder also works. Prefer HTTP over opening `index.html` via `file://` so ES modules load reliably.

## Test

```bash
npm test
```

Uses Node’s built-in test runner against the pure engine in `src/calculator.js` (no browser required).

## Project layout

| Path | Role |
|------|------|
| `index.html` | Page shell + keypad |
| `styles.css` | Visual system |
| `src/calculator.js` | Pure math engine (no DOM) |
| `src/app.js` | UI ↔ engine wiring |
| `tests/` | Automated engine tests |
| `docs/VISUAL_HANDOFF.md` | Milestone visual QA checklists |

## Deploy (GitHub Pages)

Already configured: branch `main`, folder `/ (root)`.

After you change the app:

```bash
git add -A
git commit -m "Your message"
git push
```

GitHub Pages rebuilds from `main` in about a minute.

## Non-goals / limitations

Out of scope for this release:

- Keyboard shortcuts
- Calculation history / memory keys
- Scientific functions, percent, backspace
- Backend, auth, analytics
- CI pipeline / custom domain

## Definition of Done

- F1–F7 covered by automated tests and the visual demo script
- `npm test` passes with zero failures
- App runs from README instructions
- Public Pages URL works over HTTPS
- Known limitations documented (this section)
