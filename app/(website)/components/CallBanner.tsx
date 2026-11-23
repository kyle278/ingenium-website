import { EditorLink, EditorText } from "@/components/website-editor/Editable";
import styles from "./call-banner.module.css";

export default function CallBanner() {
  return <aside className={styles.banner} aria-label="Free introductory call">
    <p>
      <span><EditorText editorId="site.call-banner.intro" tag="span" value="Free 15-minute call." /></span>{" "}
      <strong><EditorText editorId="site.call-banner.reassurance" tag="strong" value="A written scope and fixed price before you commit." /></strong>{" "}
      <EditorLink editorId="site.call-banner.booking" href="/book-a-call" className={styles.link}>
        <EditorText editorId="site.call-banner.booking.text" tag="span" value="Book a time" />
      </EditorLink>
    </p>
  </aside>;
}
