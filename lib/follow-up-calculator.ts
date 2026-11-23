export const calculatorFields = [
  { id: "enquiries", label: "Enquiries per month", min: 0, max: 1000, step: 1, initial: 28, unit: "", help: "Include calls, emails, messages and website enquiries." },
  { id: "jobValue", label: "Average job value", min: 0, max: 50000, step: 1, initial: 600, unit: "€", help: "Use your typical job value, excluding VAT." },
  { id: "slowReplyRate", label: "Enquiries that get a slow or no reply", min: 0, max: 100, step: 1, initial: 20, unit: "%", help: "Estimate the share that waits longer than your team intends." },
  { id: "winRate", label: "Of those, how many would you normally win?", min: 0, max: 100, step: 1, initial: 30, unit: "%", help: "Your expected win rate if these enquiries were handled promptly." },
] as const;

export type CalculatorField = typeof calculatorFields[number]["id"];
export type CalculatorValues = Record<CalculatorField, number>;

export const calculatorDefaults: CalculatorValues = { enquiries: 28, jobValue: 600, slowReplyRate: 20, winRate: 30 };

export function normaliseCalculatorValue(id: CalculatorField, value: number): number {
  const field = calculatorFields.find(field => field.id === id)!;
  return Number.isFinite(value) ? Math.min(field.max, Math.max(field.min, Math.round(value))) : field.min;
}

export function calculateFollowUpCost(values: CalculatorValues) {
  const enquiries = normaliseCalculatorValue("enquiries", values.enquiries);
  const jobValue = normaliseCalculatorValue("jobValue", values.jobValue);
  const slowReplyRate = normaliseCalculatorValue("slowReplyRate", values.slowReplyRate);
  const winRate = normaliseCalculatorValue("winRate", values.winRate);
  const monthlyJobs = enquiries * (slowReplyRate / 100) * (winRate / 100);
  const monthlyValue = monthlyJobs * jobValue;
  return { monthlyJobs, monthlyValue, annualValue: monthlyValue * 12 };
}
