"use client";

import { useEffect, useRef } from "react";

export default function FormStepHeading({ step }: { step: 0 | 1 }) {
  const heading = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(step);

  useEffect(() => {
    if (previousStep.current !== step) {
      heading.current?.focus({ preventScroll: true });
      heading.current?.parentElement?.scrollIntoView({ block: "start", behavior: "instant" });
      previousStep.current = step;
    }
  }, [step]);

  return (
    <div className="form-step-heading">
      <p className="rebuild-kicker">Step {step + 1} of 2 · {step === 0 ? "Your details" : "Privacy and consent"}</p>
      <h2 ref={heading} tabIndex={-1}>{step === 0 ? "Tell us a little about your project." : "Now for the boring but important stuff."}</h2>
      <p>{step === 0 ? "Share your details first. Privacy and consent come next." : "Review how we use your details and choose whether you’d like email updates before sending."}</p>
    </div>
  );
}
