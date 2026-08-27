import { describe, it, expect } from 'vitest'
import { FUNNEL_STEPS, validateStepAnswer } from './funnelSteps'

describe('funnelSteps', () => {
  it('has exactly 7 steps in the documented order', () => {
    expect(FUNNEL_STEPS.map((s) => s.key)).toEqual([
      'gender',
      'ageRange',
      'attendedPrivateSchool',
      'connectionLevel',
      'mentorInterest',
      'topInterest',
      'email',
    ])
  })

  it('every choice step has at least 2 options', () => {
    for (const step of FUNNEL_STEPS) {
      if (step.type === 'choice') {
        expect(step.options?.length ?? 0).toBeGreaterThanOrEqual(2)
      }
    }
  })

  it('the email step has type "email" and no options', () => {
    const emailStep = FUNNEL_STEPS.find((s) => s.key === 'email')!
    expect(emailStep.type).toBe('email')
    expect(emailStep.options).toBeUndefined()
  })

  it('validateStepAnswer accepts a listed option for a choice step', () => {
    const genderStep = FUNNEL_STEPS.find((s) => s.key === 'gender')!
    expect(validateStepAnswer(genderStep, genderStep.options![0])).toBe(true)
  })

  it('validateStepAnswer rejects an unlisted option for a choice step', () => {
    const genderStep = FUNNEL_STEPS.find((s) => s.key === 'gender')!
    expect(validateStepAnswer(genderStep, 'Not a real option')).toBe(false)
  })

  it('validateStepAnswer accepts an email containing @ for the email step', () => {
    const emailStep = FUNNEL_STEPS.find((s) => s.key === 'email')!
    expect(validateStepAnswer(emailStep, 'person@example.com')).toBe(true)
  })

  it('validateStepAnswer rejects a string with no @ for the email step', () => {
    const emailStep = FUNNEL_STEPS.find((s) => s.key === 'email')!
    expect(validateStepAnswer(emailStep, 'not-an-email')).toBe(false)
  })
})
