"use client";
import GuidedEnquiry from "@/components/forms/GuidedEnquiry";
type Props = { formName: string; formSlug: string; intent?: string; submitLabel?: string; successRedirect?: string };
export default function ContactForm(props: Props) { return <GuidedEnquiry kind="enquiry" {...props} />; }
