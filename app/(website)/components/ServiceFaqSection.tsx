
import { EditorSection, EditorText } from "@/components/website-editor/Editable";
import { SectionIntro, SurfaceCard } from "./sitePrimitives";

export type ServiceFaqItem = {
  question: string;
  answer: string;
};

type ServiceFaqSectionProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  items: ServiceFaqItem[];
};

export default function ServiceFaqSection({
  eyebrow = "Common Questions",
  title,
  body,
  items,
}: ServiceFaqSectionProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <EditorSection editorId="rb04822633d-js">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SectionIntro eyebrow={eyebrow} title={title} body={body} />
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <SurfaceCard key={item.question} className="panel-hover p-6 md:p-7">
            <h3 className="type-card-title text-[var(--color-text)]">
              <EditorText identity={item.question} editorId="rb04822633d-wr" tag="h3" value={item.question} />
            </h3>
            <p className="mt-4 type-body-base text-[var(--color-text-soft)]">
              <EditorText identity={item.question} editorId="rb04822633d-10c" tag="p" value={item.answer} />
            </p>
          </SurfaceCard>
        ))}
      </div>
    </EditorSection>
  );
}
