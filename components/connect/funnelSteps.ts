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
  | 'heardVia'

export type FunnelStepType = 'choice' | 'slider' | 'text' | 'percent' | 'dollar'

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
    question: 'Does your school have a formal alumni-student mentorship system?',
    type: 'choice',
    options: ['Yes', 'No', 'Informally'],
  },
  {
    key: 'alumniPriority',
    question: 'How much of a priority is alumni engagement at your school right now?',
    type: 'slider',
    options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  },
  {
    key: 'biggestProblem',
    question: "What's the biggest problem at your school that software could maybe solve?",
    type: 'text',
  },
  {
    key: 'wouldPay',
    question:
      'Would your school consider paying for a platform that does matching, fundraising, and admin oversight well?',
    type: 'choice',
    options: ['Yes, likely', 'Possibly', 'Unlikely'],
  },
  {
    key: 'hesitationReason',
    question: "What's the main reason?",
    type: 'choice',
    options: [
      'Budget',
      'Already have a solution',
      'Not a priority',
      "Don't trust a new platform with data",
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
    question: "Who's the actual decision-maker for adopting something like this?",
    type: 'choice',
    options: ['You', 'Department head', 'Principal', 'Advancement office', 'Other'],
  },
  {
    key: 'fairCutPercent',
    question:
      "What's a fair cut for us to take on funds raised, on top of processing fees (~2.9% + $0.30)?",
    type: 'percent',
  },
  {
    key: 'budgetPerSemester',
    question: 'Roughly how much would your school pay per semester for this?',
    type: 'dollar',
  },
  {
    key: 'wantsDemoCall',
    question: 'Would you do a 15-minute call to see a live demo?',
    type: 'choice',
    options: ['Yes', 'No'],
  },
  {
    key: 'heardVia',
    question: 'How did you hear about Nivarro?',
    type: 'choice',
    options: ['Email', 'Social media', 'Colleague', 'Student or parent', 'Other'],
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
  if (step.type === 'text') {
    return value.trim().length > 0
  }
  if (step.type === 'percent' || step.type === 'dollar') {
    const n = Number(value)
    return Number.isFinite(n) && n >= 0
  }
  return (step.options ?? []).includes(value)
}
