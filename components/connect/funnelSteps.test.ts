import { describe, it, expect } from 'vitest'
import { FUNNEL_STEPS, validateStepAnswer, nextVisibleStepIndex } from './funnelSteps'

describe('funnelSteps', () => {
  it('has exactly 12 steps in the spec order', () => {
    expect(FUNNEL_STEPS.map((s) => s.key)).toEqual([
      'hasMentorshipProgram',
      'alumniPriority',
      'decisionMaker',
      'heardVia',
      'wouldPay',
      'hesitationReason',
      'hesitationReasonOther',
      'wantsDemoCall',
      'biggestProblem',
      'fairCutPercent',
      'budgetPerSemester',
      'email',
    ])
  })

  it('every choice/slider step has at least 2 options', () => {
    for (const step of FUNNEL_STEPS) {
      if (step.type === 'choice' || step.type === 'slider') {
        expect(step.options?.length ?? 0).toBeGreaterThanOrEqual(2)
      }
    }
  })

  it('text/percent/dollar/email steps have no options', () => {
    for (const step of FUNNEL_STEPS) {
      if (step.type === 'text' || step.type === 'percent' || step.type === 'dollar' || step.type === 'email') {
        expect(step.options).toBeUndefined()
      }
    }
  })

  it('the alumniPriority slider runs 1 through 10', () => {
    const step = FUNNEL_STEPS.find((s) => s.key === 'alumniPriority')!
    expect(step.type).toBe('slider')
    expect(step.options).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])
  })

  it('biggestProblem is optional; every other text/choice/slider step is required', () => {
    const biggestProblem = FUNNEL_STEPS.find((s) => s.key === 'biggestProblem')!
    expect(biggestProblem.optional).toBe(true)
    const required = FUNNEL_STEPS.filter((s) => s.key !== 'biggestProblem')
    for (const step of required) {
      expect(step.optional).toBeFalsy()
    }
  })

  it('email is unconditional and is the final step', () => {
    const emailIndex = FUNNEL_STEPS.findIndex((s) => s.key === 'email')
    expect(emailIndex).toBe(FUNNEL_STEPS.length - 1)
    expect(FUNNEL_STEPS[emailIndex].showIf).toBeUndefined()
  })

  it('validateStepAnswer accepts a listed option for a choice step', () => {
    const step = FUNNEL_STEPS.find((s) => s.key === 'hasMentorshipProgram')!
    expect(validateStepAnswer(step, 'Yes')).toBe(true)
  })

  it('validateStepAnswer rejects an unlisted option for a choice step', () => {
    const step = FUNNEL_STEPS.find((s) => s.key === 'hasMentorshipProgram')!
    expect(validateStepAnswer(step, 'Not a real option')).toBe(false)
  })

  it('validateStepAnswer rejects empty text for a required text step', () => {
    const step = FUNNEL_STEPS.find((s) => s.key === 'hesitationReasonOther')!
    expect(validateStepAnswer(step, '   ')).toBe(false)
    expect(validateStepAnswer(step, 'No budget this year')).toBe(true)
  })

  it('validateStepAnswer accepts empty text for the optional biggestProblem step', () => {
    const step = FUNNEL_STEPS.find((s) => s.key === 'biggestProblem')!
    expect(validateStepAnswer(step, '')).toBe(true)
    expect(validateStepAnswer(step, '   ')).toBe(true)
    expect(validateStepAnswer(step, 'Too many spreadsheets')).toBe(true)
  })

  it('validateStepAnswer accepts a non-negative number for percent/dollar steps', () => {
    const percentStep = FUNNEL_STEPS.find((s) => s.key === 'fairCutPercent')!
    const dollarStep = FUNNEL_STEPS.find((s) => s.key === 'budgetPerSemester')!
    expect(validateStepAnswer(percentStep, '5')).toBe(true)
    expect(validateStepAnswer(percentStep, '-1')).toBe(false)
    expect(validateStepAnswer(percentStep, 'abc')).toBe(false)
    expect(validateStepAnswer(dollarStep, '500')).toBe(true)
  })

  it('validateStepAnswer accepts an email containing @', () => {
    const step = FUNNEL_STEPS.find((s) => s.key === 'email')!
    expect(validateStepAnswer(step, 'person@example.com')).toBe(true)
    expect(validateStepAnswer(step, 'not-an-email')).toBe(false)
  })

  it('nextVisibleStepIndex skips hesitationReason when wouldPay is "Yes, likely"', () => {
    const hesitationIndex = FUNNEL_STEPS.findIndex((s) => s.key === 'hesitationReason')
    const wantsDemoCallIndex = FUNNEL_STEPS.findIndex((s) => s.key === 'wantsDemoCall')
    const result = nextVisibleStepIndex(hesitationIndex, { wouldPay: 'Yes, likely' })
    expect(result).toBe(wantsDemoCallIndex)
  })

  it('nextVisibleStepIndex shows hesitationReason when wouldPay is not "Yes, likely"', () => {
    const hesitationIndex = FUNNEL_STEPS.findIndex((s) => s.key === 'hesitationReason')
    const result = nextVisibleStepIndex(hesitationIndex, { wouldPay: 'Unlikely' })
    expect(result).toBe(hesitationIndex)
  })

  it('nextVisibleStepIndex skips hesitationReasonOther unless hesitationReason is "Other"', () => {
    const otherIndex = FUNNEL_STEPS.findIndex((s) => s.key === 'hesitationReasonOther')
    const wantsDemoCallIndex = FUNNEL_STEPS.findIndex((s) => s.key === 'wantsDemoCall')
    expect(nextVisibleStepIndex(otherIndex, { hesitationReason: 'Budget constraints' })).toBe(
      wantsDemoCallIndex
    )
    expect(nextVisibleStepIndex(otherIndex, { hesitationReason: 'Other' })).toBe(otherIndex)
  })
})
