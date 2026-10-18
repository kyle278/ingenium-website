import { PRICE } from "@/lib/starter-website";

export function PriceHeadline() {
  return <div className="starter-price">
    <p className="starter-price-was">Normally <s>{PRICE.regularSetup}</s>.</p>
    <div className="starter-price-now">
      <p><span className="starter-price-label">Now</span><strong>{PRICE.setup}</strong><span className="starter-price-label">setup.</span></p>
      <span className="starter-price-pill">Save {PRICE.setupSaving}.</span>
    </div>
    <p className="starter-price-recurring">+ {PRICE.monthly}/month for hosting and care. Domain paid separately.</p>
  </div>;
}

export function PriceDetails({ detailed = false }: { detailed?: boolean }) {
  return <div className="starter-price-details">
    <p className="starter-price-included">Hosting and up to 30 minutes of small changes each month. Your domain stays in your name.</p>
    <p className="starter-price-terms">No contract · No VAT charged</p>
    {detailed && <>
      <p className="starter-price-yearly">Annual hosting and care option: {PRICE.yearly} paid up front for 12 months. Domain paid separately.</p>
      <details className="starter-price-diff">
        <summary>Compare Starter with the larger Websites package</summary>
        <table>
          <thead><tr><th scope="col"><span className="sr-only">Feature</span></th><th scope="col">Starter Website</th><th scope="col">Standard Websites</th></tr></thead>
          <tbody>
            <tr><th scope="row">Setup</th><td>{PRICE.setup} (normally {PRICE.regularSetup})</td><td>{PRICE.standardSetup}</td></tr>
            <tr><th scope="row">Monthly care</th><td>{PRICE.monthly}</td><td>{PRICE.standardMonthly}</td></tr>
            <tr><th scope="row">Pages</th><td>1 page</td><td>Up to 5 pages</td></tr>
            <tr><th scope="row">Content</th><td>Written for you</td><td>2 review rounds</td></tr>
            <tr><th scope="row">Monthly changes</th><td>Up to 30 minutes</td><td>1 hour</td></tr>
          </tbody>
        </table>
      </details>
    </>}
  </div>;
}

export default function PriceBlock() {
  return <><PriceHeadline /><PriceDetails detailed /></>;
}
