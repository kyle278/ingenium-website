import { ArrowUpRight } from "lucide-react";
import { EditorLink, EditorSection, EditorText } from "@/components/website-editor/Editable";
import styles from "./home-follow-up.module.css";

const problems = [
  { title: "Nobody owns the enquiry", description: "It sits in a shared inbox until someone remembers it." },
  { title: "The quote goes out, then silence", description: "No reminder to chase, so a warm customer goes cold or books elsewhere." },
  { title: "Details live in five places", description: "Texts, notebooks, spreadsheets. Finding the latest version eats the day." },
];

const before = ["No reply", "Quote not chased", "Lost in inbox"];
const after = ["Replied instantly", "Follow-up scheduled", "In pipeline, owner set"];

export default function HomeFollowUp({ editorId }: { editorId: string }) {
  const text = (key: string, value: string, tag = "p") => (
    <EditorText editorId={`${editorId}.${key}`} tag={tag} value={value} />
  );

  return (
    <EditorSection editorId={editorId} id="follow-up-problem" className={`core-section ${styles.section}`} aria-labelledby="follow-up-heading">
      <div className={styles.copy}>
        <p className="brand-eyebrow">{text("eyebrow", "The real problem")}</p>
        <h2 id="follow-up-heading">{text("heading", "Most businesses don't have a lead problem. They have a follow-up problem.", "h2")}</h2>
        <p className={styles.intro}>{text("intro", "Enquiries arrive by phone, email, Facebook and the website. Some get a reply the same hour. Some get one next week. Some never do. Here is where the work slips away.")}</p>
        <ul className={styles.problems}>
          {problems.map((problem, index) => (
            <li key={problem.title}>
              <span className={styles.number} aria-hidden="true">{index + 1}</span>
              <div>
                <h3>{text(`problem.${index}.title`, problem.title, "h3")}</h3>
                <p>{text(`problem.${index}.description`, problem.description)}</p>
              </div>
            </li>
          ))}
        </ul>
        <EditorLink editorId={`${editorId}.calculator-link`} href="/follow-up-calculator" className={`rebuild-text-link ${styles.calculatorLink}`}>
          {text("calculator-link.text", "What could slow replies be costing you?", "span")}<ArrowUpRight size={17} aria-hidden="true" />
        </EditorLink>
      </div>
      <figure className={styles.comparison} aria-labelledby="follow-up-comparison-heading">
        <figcaption id="follow-up-comparison-heading" className={styles.label}>{text("comparison.heading", "Enquiries this week: before and after")}</figcaption>
        <ul className={styles.rows} aria-label="Before Ingenium">
          {before.map((status, index) => (
            <li key={status} className={`${styles.row} ${index === 1 ? styles.warning : styles.danger}`}>
              <span className={styles.dot} aria-hidden="true" />
              <span className={`${styles.bar} ${styles[`bar${index}`]}`} aria-hidden="true" />
              <span className={styles.badge}>{text(`before.${index}`, status, "span")}</span>
            </li>
          ))}
        </ul>
        <p className={`${styles.label} ${styles.divider}`}>{text("comparison.after", "With Ingenium")}</p>
        <ul className={styles.rows} aria-label="With Ingenium">
          {after.map((status, index) => (
            <li key={status} className={`${styles.row} ${styles.success}`}>
              <span className={styles.dot} aria-hidden="true" />
              <span className={`${styles.bar} ${styles[`bar${index}`]}`} aria-hidden="true" />
              <span className={styles.badge}>{text(`after.${index}`, status, "span")}</span>
            </li>
          ))}
        </ul>
        <p className={styles.note}>Illustration of an agreed workflow, using sample data.</p>
      </figure>
    </EditorSection>
  );
}
