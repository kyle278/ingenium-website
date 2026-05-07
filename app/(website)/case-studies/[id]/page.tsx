import { notFound, permanentRedirect } from "next/navigation";

import { caseStudies, getCaseStudyById } from "@/src/lib/caseStudies";
import { getCanonicalProofPathForCaseStudy } from "@/src/lib/proofStories";

interface CaseStudyPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ id: study.id }));
}

export default async function CaseStudyRedirectPage({ params }: CaseStudyPageProps) {
  const { id } = await params;
  const study = getCaseStudyById(id);

  if (!study) {
    notFound();
  }

  const canonicalPath = getCanonicalProofPathForCaseStudy(id);

  if (!canonicalPath) {
    notFound();
  }

  permanentRedirect(canonicalPath);
}
