export type FunnelFieldKey =
  | 'gender'
  | 'ageRange'
  | 'attendedPrivateSchool'
  | 'connectionLevel'
  | 'mentorInterest'
  | 'topInterest'
  | 'email'

export type FunnelStep = {
  key: FunnelFieldKey
  question: string
  type: 'choice' | 'email'
  options?: string[]
}

export const FUNNEL_STEPS: FunnelStep[] = [
  {
    key: 'gender',
    question: "What's your gender?",
    type: 'choice',
    options: ['Male', 'Female', 'Prefer not to say'],
  },
  {
    key: 'ageRange',
    question: "What's your age range?",
    type: 'choice',
    options: ['18–24', '25–34', '35–44', '45–54', '55–64', '65+'],
  },
  {
    key: 'attendedPrivateSchool',
    question: 'Did you attend a private or independent school?',
    type: 'choice',
    options: ['Yes', 'No'],
  },
  {
    key: 'connectionLevel',
    question: 'How connected do you feel to your school today?',
    type: 'choice',
    options: ['Very connected', 'Somewhat connected', "Lost touch"],
  },
  {
    key: 'mentorInterest',
    question: 'Would you be interested in mentoring a current student in your field?',
    type: 'choice',
    options: ['Yes, definitely', 'Maybe', 'Not right now'],
  },
  {
    key: 'topInterest',
    question: "What's most appealing to you?",
    type: 'choice',
    options: [
      'Reconnecting with classmates',
      'Mentoring a student',
      'Seeing the real impact of giving',
      'All of it',
    ],
  },
  {
    key: 'email',
    question: 'Last step — where should we send your early access invite?',
    type: 'email',
  },
]

export function validateStepAnswer(step: FunnelStep, value: string): boolean {
  if (step.type === 'email') {
    return value.includes('@')
  }
  return (step.options ?? []).includes(value)
}
