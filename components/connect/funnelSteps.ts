export type FunnelFieldKey =
  | 'hasMentorshipProgram'
  | 'alumniPriority'
  | 'biggestProblem'
  | 'wouldPay'
  | 'hesitationReason'
  | 'hesitationReasonOther'
  | 'decisionMaker'
  | 'fairCutPercent'
  | 'budgetPerSemester'
  | 'wantsDemoCall'
  | 'demoEmail'
  | 'heardVia'

export type FunnelStepType = 'choice' | 'scale' | 'text' | 'percent' | 'dollar' | 'email'

export type FunnelStep = {
  key: FunnelFieldKey
  question: string
  type: FunnelStepType
  options?: string[]
  showIf?: (answers: Partial<Record<FunnelFieldKey, string>>) => boolean
}

export const FUNNEL_STEPS: FunnelStep[] = [
  {
    key: 'hasMentorshipProgram',
    question: 'Does your school have a formal way to connect students with alumni for mentorship?',
    type: 'choice',
    options: ['Yes', 'No', 'Informally'],
  },
  {
    key: 'alumniPriority',
    question: 'How much of a priority is strengthening alumni engagement right now?',
    type: 'scale',
    options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  },
  {
    key: 'biggestProblem',
    question: "What's the biggest problem at your school that software could actually solve?",
    type: 'text',
  },
  {
    key: 'wouldPay',
    question:
      'If a platform handled matching, fundraising, and admin oversight well, would your school consider paying for it?',
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
    key: 'decisionMaker',
    question: "Who'd actually make this decision at your school?",
    type: 'choice',
    options: ['You', 'Department head', 'Principal', 'Advancement office', 'Other'],
  },
  {
    key: 'fairCutPercent',
    question:
      "What's a fair cut for us to take on funds raised through the platform, on top of standard payment processing fees (about 2.9% + $0.30 per transaction)?",
    type: 'percent',
  },
  {
    key: 'budgetPerSemester',
    question: 'Roughly what would your school realistically pay per semester for a platform like this?',
    type: 'dollar',
  },
  {
    key: 'wantsDemoCall',
    question: 'Would you be willing to do a 15-minute call to see a live demo?',
    type: 'choice',
    options: ['Yes', 'No'],
  },
  {
    key: 'demoEmail',
    question: "What's the best email to reach you at?",
    type: 'email',
    showIf: (answers) => answers.wantsDemoCall === 'Yes',
  },
  {
    key: 'heardVia',
    question: 'How did you hear about Nivarro?',
    type: 'choice',
    options: ['Email', 'Social media', 'A colleague or coworker', 'A student or parent', 'Other'],
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
    return value.trim().length > 0
  }
  if (step.type === 'percent' || step.type === 'dollar') {
    const n = Number(value)
    return Number.isFinite(n) && n >= 0
  }
  return (step.options ?? []).includes(value)
}
