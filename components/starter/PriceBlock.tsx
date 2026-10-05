import { FOUNDING_PLACES_LEFT, FOUNDING_PLACES_TOTAL, PRICE } from "@/lib/starter-website";

/**
 * The crossed-out prices are labelled as the standard Websites package on the same line,
 * because the Starter Website is a smaller product (see the brief's Price display notes).
 */
export function PriceHeadline() {
  return (
    <div className="starter-price">
      <p className="starter-price-was">
        <span>Our standard Websites package:</span>{" "}
        <s>{PRICE.standardSetup}</s> + <s>{PRICE.standardMonthly}/month</s>
      </p>
      <div className="starter-price-now">
        <p>
          <span className="sr-only">Starter Website: </span>
          <strong>{PRICE.setup}</strong>
          <span className="starter-price-plus">+</span>
          <strong>{PRICE.monthly}</strong><span className="starter-price-month">/month</span>
        </p>
        <span className="starter-price-pill">Save {PRICE.setupSaving} on setup</span>
      </div>
    </div>
  );
}

/** Everything under the headline price. In the hero this sits below the button. */
export function PriceDetails() {
  return (
    <div className="starter-price-details">
      <p className="starter-price-included">Hosting and monthly changes included. Your domain is yours, in your name and paid by you.</p>
      <p className="starter-price-yearly">Or pay {PRICE.yearly} for the year up front and <strong>get 2 months free</strong>.</p>
      <p className="starter-price-terms">No contract · No VAT charged</p>
      <details className="starter-price-diff">
        <summary>What&apos;s the difference?</summary>
        <table>
          <thead><tr><th scope="col"><span className="sr-only">Feature</span></th><th scope="col">Starter Website</th><th scope="col">Standard Websites</th></tr></thead>
          <tbody>
            <tr><th scope="row">Pages</th><td>1 page</td><td>Up to 5 pages</td></tr>
            <tr><th scope="row">Content</th><td>Written for you</td><td>2 review rounds</td></tr>
            <tr><th scope="row">Timing and changes</th><td>Live in 5 days</td><td>1 hour of changes a month</td></tr>
          </tbody>
        </table>
      </details>
      {FOUNDING_PLACES_LEFT > 0 && (
        <p className="starter-founding"><strong>Founding Clients:</strong> first 2 months of the plan free. {FOUNDING_PLACES_LEFT} of {FOUNDING_PLACES_TOTAL} places left.</p>
      )}
    </div>
  );
}

export default function PriceBlock() {
  return <><PriceHeadline /><PriceDetails /></>;
}
