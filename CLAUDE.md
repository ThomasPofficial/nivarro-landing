# nivarro-landing

## Machine view must stay in sync

`lib/machine.ts` is the plain-Markdown copy of the whole site, served at `/machine` (with a copy-to-clipboard button) and `/llms.txt` for AI agents.

**Every change to site copy, prices, plans, features, stats, quotes or pages must update `lib/machine.ts` in the same commit, and bump `MACHINE_UPDATED`.** Treat it like any other page. `npm test` (`lib/machine.test.ts`) fails if a dollar amount on the home, pricing, donations or for-schools pages, or a nav page, is missing from it.

## Machine view on every page

Besides the whole-site `/machine`, every page has its own machine view, the same as app.nivarro.co:
the header/footer "View as machine" button (`components/site/MachineViewButton.tsx`) shows the current
page's `<main>` as Markdown with copy buttons, and agents can fetch any page as Markdown with
`?view=machine` or `Accept: text/markdown` (`middleware.ts` → `/api/machine`, converter in `lib/machineView/`,
shared with the app). It reads the rendered page, so it needs no upkeep; keep markup semantic (real headings,
lists, links, buttons) and put `data-machine-skip` on purely decorative chrome.
