import type { ImageMetadata } from "astro";

import ragdollArchitecture from "../assets/images/case-studies/ragdoll-architecture.png";
import ragdollAudit from "../assets/images/case-studies/ragdoll-audit.png";
import ragdollWorkflow from "../assets/images/case-studies/ragdoll-workflow.png";
import smallmResults from "../assets/images/case-studies/smallm-results.svg";

interface CaseStudyDecision {
  readonly title: string;
  readonly body: string;
}

interface CaseStudyMedia {
  readonly image: ImageMetadata;
  readonly alt: string;
  readonly caption: string;
}

interface CaseStudyLink {
  readonly label: string;
  readonly href: string;
}

export interface CaseStudy {
  readonly slug: string;
  readonly project: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly role: string;
  readonly period: string;
  readonly problem: readonly string[];
  readonly constraints: readonly string[];
  readonly decisions: readonly CaseStudyDecision[];
  readonly turningPoints: readonly string[];
  readonly results: readonly string[];
  readonly limitations: readonly string[];
  readonly nextSteps: readonly string[];
  readonly media: readonly [CaseStudyMedia, ...CaseStudyMedia[]];
  readonly links: readonly [CaseStudyLink, ...CaseStudyLink[]];
  readonly lastVerified: string;
  readonly sourceRevision: string;
}

export const caseStudies = [
  {
    slug: "ragdoll",
    project: "RAGdoll",
    eyebrow: "Research systems · AI",
    title: "Making the path from research question to cited claim inspectable.",
    summary:
      "RAGdoll is a terminal workspace for planning scholarly searches, curating paper collections, acquiring approved open evidence, and producing cited dossiers without hiding the research trail.",
    role: "I designed and implemented the domain model, retrieval and evidence pipeline, provider contracts, persistence, Textual interface, security boundaries, tests, documentation, and Build Week submission materials.",
    period: "July 2026 · OpenAI Build Week",
    problem: [
      "AI research assistants often collapse query planning, retrieval, source selection, evidence acquisition, and synthesis into one opaque response.",
      "That makes it difficult to distinguish metadata from full text, recover the passage behind a claim, or understand which human decisions shaped the result.",
    ],
    constraints: [
      "The operator must approve the research plan, paper collection, and full-text acquisition separately.",
      "Paper content is untrusted; remote acquisition cannot bypass paywalls, private addresses, redirects, or source terms.",
      "Model output must cross Pydantic validation before entering domain logic, and the model never writes files or contacts scholarly sources directly.",
      "A dossier is a bounded, reproducible result—not a claim of exhaustive literature coverage or automatic truth.",
    ],
    decisions: [
      {
        title: "Keep reasoning behind a narrow provider boundary",
        body: "OpenAI and Ollama adapters return validated domain contracts. Retrieval, permissions, persistence, and export remain deterministic application responsibilities.",
      },
      {
        title: "Persist the decisions, not only the answer",
        body: "SQLite records exact queries, source identifiers, retrieval times, score components, approval fingerprints, evidence provenance, and page-aware chunks indexed with FTS5.",
      },
      {
        title: "Invalidate derived work when its evidence changes",
        body: "Changing the staged corpus deletes stale dossiers and grounded answers immediately and requires new evidence consent before synthesis resumes.",
      },
      {
        title: "Treat extraction as a hostile boundary",
        body: "Full-text acquisition prefers declared open-access HTTPS sources, rejects unsafe destinations, isolates PDF extraction, and labels abstract fallback rather than presenting it as full text.",
      },
    ],
    turningPoints: [
      "The terminal interface moved from sequential command output to a resumable workspace where plans, papers, sources, dossier sections, and exact passages remain visible together.",
      "The acceptance audit found two claims whose citations resolved but did not directly support the wording. Those failures stayed in the published result and sharpened the distinction between citation integrity and entailment verification.",
      "A minimal live GPT-5.6 request failed for insufficient quota. The OpenAI Responses adapter and model configuration remain implemented, but the submission does not simulate or claim a successful paid request.",
    ],
    results: [
      "24 discovery candidates and six human-curated papers.",
      "Five open full-text documents plus one explicitly labeled abstract fallback.",
      "307 page-aware evidence chunks and a checkpointed seven-section dossier.",
      "All 25 citation identifiers resolved; manual inspection found 23 of 25 claims directly supported by their cited passage.",
      "98 offline tests, strict typing, security-focused adapters, more than 90% coverage, and a deterministic no-key judge demo.",
    ],
    limitations: [
      "Coverage varies by field, language, venue, date, and scholarly API availability; the retrieved collection is not the literature itself.",
      "Resolvable citations prove provenance, not that every generated claim is semantically entailed by its passage.",
      "PDF extraction does not perform OCR, and some open documents will remain unavailable or poorly structured.",
      "No successful paid GPT-5.6 execution is represented in the recorded demo.",
    ],
    nextSteps: [
      "Complete blinded retrieval-quality evaluation against the documented recall, ranking, coverage, and duplicate-rate gates.",
      "Strengthen semantic citation-support checks without replacing human review.",
      "Expand source coverage only through narrow adapters that preserve provenance and source terms.",
    ],
    media: [
      {
        image: ragdollWorkflow,
        alt: "RAGdoll workflow from approved plan through curated papers and cited evidence",
        caption:
          "Approval is a workflow boundary: the system does not silently move from a question to acquired evidence.",
      },
      {
        image: ragdollArchitecture,
        alt: "RAGdoll architecture separating OpenAI, the Pydantic domain, and external adapters",
        caption:
          "Model reasoning stays behind validated contracts; adapters own retrieval, storage, extraction, and presentation.",
      },
      {
        image: ragdollAudit,
        alt: "RAGdoll recorded audit with 24 candidates, six papers, 307 chunks, seven sections, and 23 of 25 supported claims",
        caption:
          "The recorded acceptance run preserves both the working result and the two citation-support failures.",
      },
    ],
    links: [
      { label: "Repository", href: "https://github.com/almondsun/ragdoll" },
      { label: "Documentation", href: "https://almondsun.github.io/ragdoll/" },
      { label: "Recorded demo", href: "https://www.youtube.com/watch?v=aytzIq-5S5k" },
      { label: "Build Week project", href: "https://devpost.com/software/ragdoll-xfwzms" },
    ],
    lastVerified: "2026-07-21",
    sourceRevision: "86de0c1092a7694978506def2a9b0eb3d520f284",
  },
  {
    slug: "smallm",
    project: "smaLLM",
    eyebrow: "Language models · Reproducible research",
    title: "Turning a tokenizer hunch into a capacity-controlled sealed experiment.",
    summary:
      "smaLLM is an inspectable PyTorch laboratory covering corpus provenance, tokenization, causal Transformer modeling, controlled training, sealed evaluation, and candid experiment reports.",
    role: "I built the complete experimental system: corpus preparation, three tokenizer families, decoder-only Transformer, training and checkpoint contracts, evaluation tools, 30 experiment reports, tests, CI, and final preregistered study.",
    period: "2026 · Completed at version 1.0",
    problem: [
      "A boundary-aware byte tokenizer appeared to outperform a character model, but its larger vocabulary also increased the embedding and output parameter count.",
      "The useful question was not whether one run won; it was whether the effect survived corrected evaluation, multiple seeds and corpora, sealed tests, and a near-parameter-matched control.",
    ],
    constraints: [
      "Corpus identities, checksums, normalization, chronological splits, configurations, seeds, and checkpoint hashes must be preserved.",
      "Validation selects checkpoints; terminal test regions remain sealed until the final one-shot evaluation.",
      "Results must be normalized as bits per character so tokenizer sequence lengths remain comparable.",
      "Negative results, reversals, and threats to validity stay in the permanent record.",
    ],
    decisions: [
      {
        title: "Correct the measurement contract before scaling",
        body: "The project fixed tokenizer leakage and incomplete validation coverage, then reran controlled comparisons rather than treating earlier numbers as final evidence.",
      },
      {
        title: "Add a meaningful capacity control",
        body: "The final char136 arm matched ByteBPE512 within 0.40% of its parameter count, alongside the historical char128 arm.",
      },
      {
        title: "Freeze the protocol before source access",
        body: "The final three-corpus × three-arm × three-seed panel was preregistered before the new public-domain sources were accessed.",
      },
      {
        title: "Make sealed evaluation refuse ambiguous state",
        body: "The evaluator verifies corpus and checkpoint identity, requires full coverage, writes once, and rejects incomplete or inconsistent panel artifacts.",
      },
    ],
    turningPoints: [
      "Simple BPE128 shortened sequences and improved the appearance of generated text but underperformed the corrected character control on BPC.",
      "Boundary-aware ByteBPE512 produced a repeatable advantage, but the capacity confound required a new matched control rather than a stronger headline.",
      "The final Douglass seed-4242 comparison reversed by 0.0018 BPC. Keeping it visible narrowed the conclusion from universal superiority to a corpus-dependent result.",
    ],
    results: [
      "The final study contains 27 sealed observations across three new corpora, three model arms, and three fixed seeds.",
      "ByteBPE512 won eight of nine same-seed comparisons against near-parameter-matched char136 and all nine against historical char128.",
      "Mean matched-control improvements were 0.1447 BPC on Frankenstein, 0.0187 on Douglass, and 0.1717 on Origin of Species.",
      "The repository closes with 182 tests, 90.49% branch coverage, strict mypy over 47 source files, package builds, dependency auditing, and a five-minute CPU demo.",
    ],
    limitations: [
      "The models are intentionally small and do not establish behavior at production language-model scale.",
      "Each corpus is one English public-domain work; the fixed panel is not a population sample.",
      "Chronological validation and terminal test regions can differ materially in difficulty.",
      "The observed advantage is tokenizer- and corpus-dependent, not a universal BPE claim.",
    ],
    nextSteps: [
      "Treat the project as a completed research artifact rather than extending the modeling roadmap indefinitely.",
      "Future replication should broaden languages, genres, corpus sizes, and model scales while preserving the sealed protocol.",
      "Use the documented controls and artifact contracts as the baseline for any independent extension.",
    ],
    media: [
      {
        image: smallmResults,
        alt: "Sealed-test bits per character comparison between character controls and ByteBPE512",
        caption:
          "The final evidence includes matched controls, every corpus and seed, and the narrow Douglass reversal.",
      },
    ],
    links: [
      { label: "Repository", href: "https://github.com/almondsun/smallm" },
      {
        label: "Final experiment",
        href: "https://github.com/almondsun/smallm/blob/main/experiments/030-final-capacity-panel-and-project-completion.md",
      },
      {
        label: "Architecture",
        href: "https://github.com/almondsun/smallm/blob/main/docs/architecture.md",
      },
    ],
    lastVerified: "2026-07-21",
    sourceRevision: "c5b79db34b26c633c55358733e80d0315042a56c",
  },
] as const satisfies readonly CaseStudy[];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
