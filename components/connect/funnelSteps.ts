export type FunnelFieldKey =
  | 'hasMentorshipProgram'
  | 'alumniPriority'
  | 'decisionMaker'
  | 'heardVia'
  | 'wouldPay'
  | 'hesitationReason'
  | 'hesitationReasonOther'
  | 'wantsDemoCall'
  | 'biggestProblem'
  | 'fairCutPercent'
  | 'budgetPerSemester'
  | 'email'

export type FunnelStepType = 'choice' | 'slider' | 'text' | 'percent' | 'dollar' | 'email'

export type FunnelStep = {
  key: FunnelFieldKey
  question: string
  type: FunnelStepType
  options?: string[]
  optional?: boolean
  showIf?: (answers: Partial<Record<FunnelFieldKey, string>>) => boolean
}

export const FUNNEL_STEPS: FunnelStep[] = [
  {
    key: 'hasMentorshipProgram',
    question:
      'Does your school currently have a formal way to connect students with alumni for mentorship?',
    type: 'choice',
    options: ['Yes', 'No', 'Informally'],
  },
  {
    key: 'alumniPriority',
    question: 'How much of a priority is strengthening alumni engagement at your school right now?',
    type: 'slider',
    options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  },
  {
    key: 'decisionMaker',
    question:
      'Who would be the actual decision-maker for adopting something like this at your school?',
    type: 'choice',
    options: ['You', 'Department head', 'Principal', 'Advancement office', 'Other'],
  },
  {
    key: 'heardVia',
    question: 'How did you hear about Nivarro?',
    type: 'choice',
    options: ['Email', 'Social media', 'A colleague or coworker', 'A student or parent', 'Other'],
  },
  {
    key: 'wouldPay',
    question:
      'If a platform did this well — automated matching, fundraising tools, and admin oversight — would your school consider paying for it?',
    type: 'choice',
    options: ['Yes, likely', 'Possibly, need more info', 'Unlikely'],
  },
  {
    key: 'hesitationReason',
    question: "What's the main reason?",
    type: 'choice',
    options: [
      'Budget constraints',
      'Already have a solution',
      'Not a priority right now',
      "Don't trust a new platform with alumni data",
      'Other',
    ],
    showIf: (answers) => answers.wouldPay !== 'Yes, likely',
  },
  {
    key: 'hesitationReasonOther',
    question: 'What is it?',
    type: 'text',
    showIf: (answers) => answers.hesitationReason === 'Other',
  },
  {
    key: 'wantsDemoCall',
    question: 'Would you be willing to do a 15-minute call to see a live demo?',
    type: 'choice',
    options: ['Yes', 'No'],
  },
  {
    key: 'biggestProblem',
    question:
      "What's the biggest problem you face at your school that you think could maybe be solved by software?",
    type: 'text',
    optional: true,
  },
  {
    key: 'fairCutPercent',
    question:
      "What would you consider a fair cut for us to take on funds raised through the platform, on top of standard payment processing fees (about 2.9% + $0.30 per transaction)?",
    type: 'percent',
  },
  {
    key: 'budgetPerSemester',
    question:
      'Roughly how much would your school realistically pay per semester (half the school year) for a platform like this?',
    type: 'dollar',
  },
  {
    key: 'email',
    question: 'Where should we send early access?',
    type: 'email',
  },
]

export function nextVisibleStepIndex(
  fromIndex: number,
  answers: Partial<Record<FunnelFieldKey, string>>
): number {
  let i = fromIndex
  while (i < FUNNEL_STEPS.length && FUNNEL_STEPS[i].showIf && !FUNNEL_STEPS[i].showIf!(answers)) {
    i++
  }
  return i
}

export function validateStepAnswer(step: FunnelStep, value: string): boolean {
  if (step.type === 'email') {
    return value.includes('@')
  }
  if (step.type === 'text') {
    if (step.optional) return true
    return value.trim().length > 0
  }
  if (step.type === 'percent' || step.type === 'dollar') {
    const n = Number(value)
    return Number.isFinite(n) && n >= 0
  }
  return (step.options ?? []).includes(value)
}
