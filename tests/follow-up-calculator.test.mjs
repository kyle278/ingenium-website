import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateFollowUpCost, calculatorDefaults, normaliseCalculatorValue } from '../lib/follow-up-calculator.ts';

test('example estimates use both percentages and annualise the unrounded monthly value', () => {
  const result = calculateFollowUpCost(calculatorDefaults);
  assert.ok(Math.abs(result.monthlyJobs - 1.68) < 1e-10);
  assert.ok(Math.abs(result.monthlyValue - 1008) < 1e-10);
  assert.ok(Math.abs(result.annualValue - 12096) < 1e-10);
});

test('zero enquiries, value or either rate produces no value at risk', () => {
  for (const id of Object.keys(calculatorDefaults)) {
    assert.equal(calculateFollowUpCost({ ...calculatorDefaults, [id]: 0 }).annualValue, 0);
  }
});

test('invalid inputs cannot produce negative, infinite or above-limit estimates', () => {
  assert.equal(normaliseCalculatorValue('winRate', 200), 100);
  assert.equal(normaliseCalculatorValue('jobValue', -5), 0);
  assert.equal(normaliseCalculatorValue('enquiries', NaN), 0);
  assert.equal(normaliseCalculatorValue('jobValue', Infinity), 0);
  assert.equal(calculateFollowUpCost({ enquiries: 1000, jobValue: 50000, slowReplyRate: 100, winRate: 100 }).annualValue, 600000000);
});
