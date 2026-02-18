"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  editorAttrs?: {
    "data-content-block-key"?: string;
    "data-page-key"?: string;
    "data-section-key"?: string;
  };
}

export default function FaqAccordion({ items, editorAttrs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="rounded-lg border border-slate-800/70 bg-slate-900/30">
            <button
              type="button"
              onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
              className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
              {...editorAttrs}
            >
              <span className="text-sm font-semibold text-white">{item.question}</span>
              <ChevronDown
                className="faq-chevron h-4 w-4 shrink-0 text-slate-500"
                data-open={isOpen ? "true" : "false"}
              />
            </button>
            <div
              className={`grid overflow-hidden px-4 transition-[grid-template-rows,opacity] duration-300 ${
                isOpen ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] pb-0 opacity-70"
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-sm leading-relaxed text-slate-400" {...editorAttrs}>
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
