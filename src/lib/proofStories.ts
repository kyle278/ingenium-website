import { caseStudies } from "./caseStudies";
import { getProjectBySlug, projects } from "./projects";

export interface ProofStoryRecord {
  clientId: string;
  clientName: string;
  industry: string;
  canonicalPath: string;
  alternatePaths: string[];
  preferredCitationTitle: string;
  services: string[];
  lastReviewed: string;
}

export const PROOF_LAST_REVIEWED = "2026-05-07";

export const proofStories: ProofStoryRecord[] = projects.map((project) => {
  const relatedCaseStudy = caseStudies.find((study) => study.relatedProjectSlug === project.slug);

  return {
    clientId: relatedCaseStudy?.id ?? project.slug,
    clientName: project.clientName,
    industry: project.industry,
    canonicalPath: `/projects/${project.slug}`,
    alternatePaths: relatedCaseStudy ? [`/case-studies/${relatedCaseStudy.id}`] : [],
    preferredCitationTitle: project.projectName,
    services: project.services,
    lastReviewed: PROOF_LAST_REVIEWED,
  };
});

export function getCanonicalProofPathForCaseStudy(caseStudyId: string) {
  const story = proofStories.find((proofStory) => proofStory.alternatePaths.includes(`/case-studies/${caseStudyId}`));

  return story?.canonicalPath;
}

export function getCanonicalProofProjectForCaseStudy(caseStudyId: string) {
  const canonicalPath = getCanonicalProofPathForCaseStudy(caseStudyId);
  const slug = canonicalPath?.replace("/projects/", "");

  return slug ? getProjectBySlug(slug) : undefined;
}
