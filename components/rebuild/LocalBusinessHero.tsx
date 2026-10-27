
import { EditorLink, EditorSection, EditorText, EditorVisual } from "@/components/website-editor/Editable";
import Link from "next/link";
import { ArrowDown, Check } from "lucide-react";
import HeroSystem from "./HeroSystem";
import { CallLink } from "./LocalBusinessSections";

export default function LocalBusinessHero() {
  return <>
    <EditorSection editorId="rebuild.components.rebuild.LocalBusinessHero.tsx.section.b2c0db33a28c" className="brand-hero" aria-labelledby="home-heading">
      <div className="brand-hero-copy"><p className="brand-eyebrow"><EditorText editorId="rebuild.components.rebuild.LocalBusinessHero.tsx.text.8206d6f52711" tag="p" value={"Websites, CRM & connected systems"} /></p>
        <h1 id="home-heading"><EditorText editorId="r51bdcc7901-1kd" tag="h1" value={"A better website."} /><br /><EditorText editorId="r51bdcc7901-1l6" tag="span" value={"A clearer next step."} /></h1>
        <p className="brand-hero-lead"><EditorText editorId="rebuild.components.rebuild.LocalBusinessHero.tsx.text.699e20195c00" tag="p" value={"Help customers choose your business. Give your team a clear way to take the conversation forward."} /></p>
        <p className="brand-hero-description"><EditorText editorId="rebuild.components.rebuild.LocalBusinessHero.tsx.text.054f7b2929f5" tag="p" value={"We design and build websites, organise customer records and connect the follow-up. Start with the part you need, or bring them together."} /></p>
        <div className="brand-hero-actions"><CallLink /><EditorLink editorId="rebuild.components.rebuild.LocalBusinessHero.tsx.link.09c8e4d7b0e0" href="#connection" className="rebuild-text-link"><EditorText editorId="rebuild.components.rebuild.LocalBusinessHero.tsx.text.fb9d3345aed7" tag="Link" value={"See how it connects"} /><ArrowDown size={17} aria-hidden="true" /></EditorLink></div>
        <p className="brand-hero-location"><EditorText editorId="rebuild.components.rebuild.LocalBusinessHero.tsx.text.03f9ba949c87" tag="p" value={"From Carlow, Ireland. Built around your business."} /></p>
      </div>
      <EditorVisual editorId="home.hero-illustration" label="Hero illustration" alt="An example website enquiry flowing into a customer record and next action."><HeroSystem /></EditorVisual>
    </EditorSection>
    <div className="brand-principles"><p><EditorText editorId="rebuild.components.rebuild.LocalBusinessHero.tsx.text.10e13d1a8b6f" tag="p" value={"Clear thinking."} /><br /><strong><EditorText editorId="rebuild.components.rebuild.LocalBusinessHero.tsx.text.b54acda53d0d" tag="strong" value={"From the first conversation."} /></strong></p><span><Check size={17} aria-hidden="true" /><EditorText editorId="rebuild.components.rebuild.LocalBusinessHero.tsx.text.0198a5f8cc5c" tag="span" value={"Design and technical delivery together"} /></span><span><Check size={17} aria-hidden="true" /><EditorText editorId="rebuild.components.rebuild.LocalBusinessHero.tsx.text.c2d6ffe93b80" tag="span" value={"Agreed scope and costs"} /></span><span><Check size={17} aria-hidden="true" /><EditorText editorId="rebuild.components.rebuild.LocalBusinessHero.tsx.text.201093f58fb8" tag="span" value={"A practical handover"} /></span></div>
  </>;
}
