"use client";
import CallRequestJourney from "./CallRequestJourney";
import GuidedEnquiry from "@/components/forms/GuidedEnquiry";
export default function LocalRequestForm({ kind, initialService, initialPackage }: { kind: "call" | "visibility"; initialService?: string; initialPackage?: string }) {
  return kind === "call" ? <CallRequestJourney initialService={initialService} initialPackage={initialPackage} /> : <GuidedEnquiry kind="visibility" formName="Google Visibility Check" formSlug="contact" submitLabel="Request my free visibility check" />;
}
