"use client";
import GuidedEnquiry from "@/components/forms/GuidedEnquiry";
export default function WebsiteBriefForm({ formName, formSlug }: { formName: string; formSlug: string }) { return <GuidedEnquiry kind="brief" formName={formName} formSlug={formSlug} submitLabel="Send my website brief" />; }
