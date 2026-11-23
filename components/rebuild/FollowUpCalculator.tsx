"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { calculatorDefaults, calculatorFields, calculateFollowUpCost, normaliseCalculatorValue, type CalculatorField } from "@/lib/follow-up-calculator";
import styles from "./follow-up-calculator.module.css";

const currency = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const jobs = new Intl.NumberFormat("en-IE", { maximumFractionDigits: 1 });
const initialInputs = Object.fromEntries(Object.entries(calculatorDefaults).map(([id, value]) => [id, String(value)])) as Record<CalculatorField, string>;

export default function FollowUpCalculator() {
  const [inputs, setInputs] = useState(initialInputs);
  const values = {
    enquiries: normaliseCalculatorValue("enquiries", Number(inputs.enquiries)),
    jobValue: normaliseCalculatorValue("jobValue", Number(inputs.jobValue)),
    slowReplyRate: normaliseCalculatorValue("slowReplyRate", Number(inputs.slowReplyRate)),
    winRate: normaliseCalculatorValue("winRate", Number(inputs.winRate)),
  };
  const result = calculateFollowUpCost(values);
  const update = (id: CalculatorField, value: string) => setInputs(previous => ({ ...previous, [id]: value }));

  return <div className={styles.layout}>
    <section className={styles.inputs} aria-labelledby="calculator-inputs-heading">
      <h2 id="calculator-inputs-heading">Start with your numbers.</h2>
      <p className={styles.description}>Move a slider or type an amount. The starting values are examples; replace them with your own estimates.</p>
      <div className={styles.fields}>
        {calculatorFields.map(field => <div key={field.id} className={styles.field}>
          <div className={styles.fieldHeading}>
            <label htmlFor={`${field.id}-number`}>{field.label}</label>
            <div className={styles.numberWrap}>
              {field.unit === "€" && <span aria-hidden="true">€</span>}
              <input id={`${field.id}-number`} type="number" inputMode="numeric" min={field.min} max={field.max} step={field.step} value={inputs[field.id]} aria-describedby={`${field.id}-help`} onChange={event => update(field.id, event.target.value)} onBlur={() => update(field.id, String(values[field.id]))} />
              {field.unit === "%" && <span aria-hidden="true">%</span>}
            </div>
          </div>
          <input className={styles.slider} type="range" aria-label={`${field.label} slider`} aria-describedby={`${field.id}-help`} aria-valuetext={field.unit === "€" ? currency.format(values[field.id]) : `${values[field.id]}${field.unit}`} min={field.min} max={field.max} step={field.step} value={values[field.id]} onChange={event => update(field.id, event.target.value)} />
          <p id={`${field.id}-help`} className={styles.help}>{field.help}</p>
        </div>)}
      </div>
      <button className={styles.reset} type="button" onClick={() => setInputs({ ...initialInputs })}><RotateCcw size={16} aria-hidden="true" />Reset example numbers</button>
    </section>
    <section className={styles.result} aria-labelledby="calculator-result-heading">
      <p className="brand-eyebrow">Your estimate</p>
      <h2 id="calculator-result-heading">Work potentially at risk each year</h2>
      <div role="status" aria-live="polite" aria-atomic="true" className={styles.liveResult}>
        <p className={styles.amount}>{currency.format(result.annualValue)}</p>
        <p className={styles.monthly}>About <strong>{jobs.format(result.monthlyJobs)} jobs a month</strong>, or <strong>{currency.format(result.monthlyValue)}</strong> in monthly work.</p>
      </div>
      <p className={styles.caveat}>This is potential job value exposed to slow replies, not confirmed lost revenue or profit. Some customers may still book. Faster follow-up does not guarantee you will win this work.</p>
      <Link href="/book-a-call?service=crm&package=crm-automation" className="rebuild-button">Talk through my numbers<ArrowUpRight size={17} aria-hidden="true" /></Link>
      <p className={styles.help}>Free 15-minute call. Your calculator inputs stay in this page and are not sent with your booking.</p>
      <div className={styles.formula}>
        <h3>How it’s calculated</h3>
        <p>Monthly enquiries × slow-reply share × expected win rate × average job value × 12.</p>
        <p className={styles.equation}>{values.enquiries} × {values.slowReplyRate}% × {values.winRate}% × {currency.format(values.jobValue)} × 12 = <strong>{currency.format(result.annualValue)}</strong></p>
      </div>
    </section>
  </div>;
}
