// One source for the published school plans, used by /pricing, home and /fundraising.
// KEEP IN SYNC with lib/machine.ts (the Pricing section).

export type Plan = {
  key: 'private' | 'public' | 'charter' | 'founding'
  name: string
  eyebrow: string
  price: string
  perYear: string
  note: string
  bullets: string[]
}

export const PLANS: Plan[] = [
  {
    key: 'private',
    name: 'Private',
    eyebrow: 'PRIVATE SCHOOLS',
    price: '$650',
    perYear: '$7,800',
    note: 'per month · $7,800/yr · $0 setup',
    bullets: [
      "Syncs with Raiser's Edge NXT / Blackbaud",
      'Every feature included',
      'Check-in calls every two weeks',
      'Monthly, or yearly in one invoice',
    ],
  },
  {
    key: 'public',
    name: 'Public',
    eyebrow: 'PUBLIC SCHOOLS',
    price: '$750',
    perYear: '$9,000',
    note: 'per month · $9,000/yr · $0 setup',
    bullets: [
      'Alumni database hosted by Nivarro',
      'Our agent imports your spreadsheets',
      'Every feature included',
      'Check-in calls every two weeks',
    ],
  },
  {
    key: 'charter',
    name: 'Charter',
    eyebrow: 'CHARTER SCHOOLS',
    price: '$750',
    perYear: '$9,000',
    note: 'per month · $9,000/yr · $0 setup',
    bullets: [
      'Alumni database hosted by Nivarro',
      'Our agent imports your spreadsheets',
      'Every feature included',
      'Check-in calls every two weeks',
    ],
  },
  {
    key: 'founding',
    name: 'Founding 7',
    eyebrow: 'FOUNDING 7 · PRIVATE SCHOOLS',
    price: '$325',
    perYear: '$3,900',
    note: 'per month for life · $3,900/yr · $0 setup',
    bullets: [
      'First semester free',
      'Syncs with Blackbaud',
      'Every feature included',
      'Weekly check-in calls',
    ],
  },
]

const Y = '✓'
const N = '—'

/** Plans compared. Columns: Private, Public, Charter, Founding 7. */
export const COMPARE: [string, string, string, string, string][] = [
  ['Price', '$650/month', '$750/month', '$750/month', '$325/month for life'],
  ['Per year', '$7,800', '$9,000', '$9,000', '$3,900'],
  ['Setup fee', '$0', '$0', '$0', '$0'],
  ['First semester free', N, N, N, Y],
  ['Billing', 'Monthly, or yearly in one invoice', 'Monthly, or yearly in one invoice', 'Monthly, or yearly in one invoice', 'Monthly, or yearly in one invoice'],
  ['Alumni database', "Syncs with Raiser's Edge NXT / Blackbaud", 'Hosted by Nivarro', 'Hosted by Nivarro', 'Syncs with Blackbaud'],
  ['Spreadsheet import by our agent', `${N} (not needed)`, Y, Y, `${N} (not needed)`],
  ['Check-in calls', 'Every two weeks', 'Every two weeks', 'Every two weeks', 'Weekly'],
]

/** Features, all included in every plan. Columns: Private, Public, Charter, Founding 7. */
export const FEATURES: [string, string, string, string, string][] = [
  ['Alumni dashboard with AI search', Y, Y, Y, Y],
  ['Contact-data update bot (staff approve)', Y, Y, Y, Y],
  ['Personalized alumni emails, easy opt-out', Y, Y, Y, Y],
  ['Alumni check-in system', Y, Y, Y, Y],
  ['Gmail add-on', Y, Y, Y, Y],
  ['Parent logins and portal', Y, Y, Y, Y],
  ['Events: career days, panels, job shadows', Y, Y, Y, Y],
  ['Verified alumni mentorship*', Y, Y, Y, Y],
  ['Messaging off switch', Y, Y, Y, Y],
  ['Giving pages, no fee on gifts', `${Y} (annual fund)`, `${Y} (booster and PTA)`, `${Y} (annual fund)`, Y],
  ['Safety: school-verified adults, human approval, logged threads', Y, Y, Y, Y],
  ['Encrypted records, school owns its data', Y, Y, Y, Y],
  ['Cancel anytime', Y, Y, Y, Y],
]

export const MENTORSHIP_NOTE = '*Mentorship launches once insurance is in place.'

/** What each school mainly uses it for. Columns: Private, Public, Charter. */
export const USES: [string, string, string, string][] = [
  ['Main goal', 'Keep alumni engaged so they give', 'Show outcomes, bring graduates back', 'Prove outcomes and build a donor base'],
  ['Biggest pain it solves', 'Messy Blackbaud reports and outdated contacts', 'No alumni system at all', 'No alumni system and untapped donations'],
  ['Who usually signs', 'Head of School or Advancement', 'Booster club or education foundation', 'Charter board or executive director'],
]

/** Against the competition. Columns: Nivarro, Almabase, Blackbaud. */
export const COMPETITION: [string, string, string, string][] = [
  ['Yearly price', '$7,800–9,000, published', '~$6,000–25,000, by quote', '~$10,000–150,000+, by quote'],
  ['Setup', '$0', 'Varies', '~$5,000–75,000'],
  ['AI contact-data update bot', Y, 'Limited', 'Limited'],
  ['Safe mentorship for under-18s', Y, N, N],
  ['Cancel anytime', Y, 'Contract', 'Multi-year contract, fees to leave early'],
]
