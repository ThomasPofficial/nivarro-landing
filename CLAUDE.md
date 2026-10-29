# nivarro-landing

## Machine view must stay in sync

`lib/machine.ts` is the plain-Markdown copy of the whole site, served at `/machine` (with a copy-to-clipboard button) and `/llms.txt` for AI agents.

**Every change to site copy, prices, plans, features, stats, quotes or pages must update `lib/machine.ts` in the same commit, and bump `MACHINE_UPDATED`.** Treat it like any other page. `npm test` (`lib/machine.test.ts`) fails if a dollar amount on the home, pricing, donations or for-schools pages, or a nav page, is missing from it.
