import type { ImageMetadata } from "astro";

import audiolabImage from "../assets/images/projects/audiolab.png";
import insightImage from "../assets/images/projects/insight.png";
import mlTheoryImage from "../assets/images/projects/ml-theory-cover.svg";
import ragdollImage from "../assets/images/projects/ragdoll.png";
import sialyticsImage from "../assets/images/projects/sialytics-cover.svg";
import smallmImage from "../assets/images/projects/smallm-results.svg";

export interface ProjectLink {
  readonly label: string;
  readonly href: string;
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly eyebrow: string;
  readonly tagline: string;
  readonly summary: string;
  readonly evidence: readonly string[];
  readonly stack: readonly string[];
  readonly status: string;
  readonly image: ImageMetadata;
  readonly imageAlt: string;
  readonly imageFit?: "cover" | "contain";
  readonly links: readonly ProjectLink[];
  readonly featured: boolean;
  readonly caseStudyHref?: string;
  readonly lastVerified: string;
  readonly sourceRevision: string;
}

export const projects = [
  {
    slug: "ragdoll",
    title: "RAGdoll",
    eyebrow: "Research systems · AI",
    tagline: "Scholarly research, with receipts.",
    summary:
      "A terminal workspace that turns ambiguous research questions into curated, cited literature dossiers while preserving human approval, retrieval provenance, evidence level, and exact supporting passages.",
    evidence: [
      "Separate approval boundaries for search, paper curation, and open-full-text acquisition.",
      "A recorded run indexed 307 page-aware passages and produced a seven-section dossier.",
      "98 offline tests, strict typing, security-focused adapters, and a deterministic no-key demo.",
    ],
    stack: ["Python", "Textual", "SQLite FTS5", "OpenAI", "Ollama"],
    status: "OpenAI Build Week submission · v2.2 release candidate",
    image: ragdollImage,
    imageAlt: "RAGdoll research with receipts project banner",
    links: [
      { label: "Repository", href: "https://github.com/almondsun/ragdoll" },
      { label: "Documentation", href: "https://almondsun.github.io/ragdoll/" },
      { label: "Video", href: "https://www.youtube.com/watch?v=aytzIq-5S5k" },
    ],
    featured: true,
    caseStudyHref: "/projects/ragdoll/",
    lastVerified: "2026-07-21",
    sourceRevision: "86de0c1092a7694978506def2a9b0eb3d520f284",
  },
  {
    slug: "smallm",
    title: "smaLLM",
    eyebrow: "Language models · Reproducible research",
    tagline: "A GPT-style language-model lab built from scratch.",
    summary:
      "An inspectable PyTorch implementation spanning tokenization, causal attention, training, generation, controlled baselines, sealed evaluation, and reproducible experiment artifacts.",
    evidence: [
      "A preregistered panel matched the character control within 0.40% of ByteBPE512's parameter count.",
      "ByteBPE512 won eight of nine matched sealed-test comparisons; the Douglass reversal remains documented.",
      "Completed at version 1.0 with strict typing, 182 tests, 90.49% branch coverage, and a five-minute CPU demo.",
    ],
    stack: ["Python", "PyTorch", "Transformers", "Experiment design"],
    status: "Completed research artifact",
    image: smallmImage,
    imageAlt: "Sealed-test bits per character results for smaLLM tokenizers",
    imageFit: "contain",
    links: [{ label: "Repository", href: "https://github.com/almondsun/smallm" }],
    featured: true,
    caseStudyHref: "/projects/smallm/",
    lastVerified: "2026-07-21",
    sourceRevision: "c5b79db34b26c633c55358733e80d0315042a56c",
  },
  {
    slug: "insight",
    title: "insIGht",
    eyebrow: "Desktop product · Privacy",
    tagline: "Instagram relationship analytics without an Instagram login.",
    summary:
      "A local-first desktop application that turns official Instagram exports into searchable relationship snapshots without scraping, telemetry, cloud processing, or unofficial APIs.",
    evidence: [
      "Rust owns archive parsing, validation, SQLite persistence, reports, and native filesystem access.",
      "Defensive import limits bound paths, file counts, individual files, and aggregate decompression.",
      "Typed Tauri commands connect a React interface to immutable local snapshots.",
    ],
    stack: ["Rust", "Tauri", "React", "TypeScript", "SQLite"],
    status: "Cross-platform desktop application",
    image: insightImage,
    imageAlt: "insIGht local Instagram export import interface",
    links: [{ label: "Repository", href: "https://github.com/almondsun/insight" }],
    featured: true,
    lastVerified: "2026-07-21",
    sourceRevision: "a27353b0b21a0d81fd0838f2d97a261f38ff9954",
  },
  {
    slug: "audiolab",
    title: "AudioLab",
    eyebrow: "Electronics · Embedded DSP",
    tagline: "A mixed hardware, firmware, and host-software audio platform.",
    summary:
      "A NUCLEO-F429ZI and TLV320AIC3104 platform for USB audio, codec control, real-time DSP, measurement, and validation across explicit hardware and software boundaries.",
    evidence: [
      "Implemented Altium daughterboard with project-owned libraries, schematics, PCB outputs, renders, and a 3D model.",
      "Architecture separates STM32 firmware, hardware design, host tooling, specifications, and verification artifacts.",
      "The repository labels proof-of-concept firmware honestly while the final codec contract remains in progress.",
    ],
    stack: ["C", "C++", "STM32", "USB Audio", "Altium"],
    status: "Hardware implemented · firmware boundary evolving",
    image: audiolabImage,
    imageAlt: "Top render of the AudioLab TLV320AIC3104 codec daughterboard",
    imageFit: "contain",
    links: [{ label: "Repository", href: "https://github.com/almondsun/audiolab" }],
    featured: false,
    lastVerified: "2026-07-21",
    sourceRevision: "d6377fdcf967ad846bbf2e4d36b7f58683809271",
  },
  {
    slug: "sialytics",
    title: "SIAlytics",
    eyebrow: "Data product · Browser automation",
    tagline: "Academic progress students can inspect for themselves.",
    summary:
      "A defensive local workflow that reads an authorized UNAL academic-history session and produces an Excel workbook for semester trends, curriculum progress, PAPA, and PAPPI.",
    evidence: [
      "Sign-in remains manual; sensitive session material and authenticated pages are never retained.",
      "Unknown structures, incomplete pagination, expired sessions, and ambiguous empty states fail closed.",
      "The end-to-end extraction was validated against a real SIA session on June 28, 2026.",
    ],
    stack: ["Python", "Playwright", "OpenPyXL", "Jupyter"],
    status: "Validated student tool · Spanish interface",
    image: sialyticsImage,
    imageAlt: "Editorial cover representing SIAlytics academic analytics",
    links: [{ label: "Repository", href: "https://github.com/almondsun/sialytics" }],
    featured: false,
    lastVerified: "2026-07-21",
    sourceRevision: "1b5bb382043c1bfb0634a7f4001e472bba96f012",
  },
  {
    slug: "ml-theory",
    title: "Machine Learning Theory",
    eyebrow: "Mathematics · Coursework archive",
    tagline: "The mathematical foundation behind the systems work.",
    summary:
      "A navigable UNAL course archive covering statistical learning, regression, kernels and RKHS, manual neural networks, model assessment, optimization, and time-series experiments.",
    evidence: [
      "Topic-oriented navigation preserves the original course structure without presenting coursework as a product.",
      "Selected notebooks cover RKHS mean embeddings, manual backpropagation, diagnostics, and experimental comparison.",
      "The repository is explicitly archived as a readable academic record.",
    ],
    stack: ["Mathematics", "Python", "Jupyter", "LaTeX"],
    status: "Archived academic record",
    image: mlTheoryImage,
    imageAlt: "Editorial cover representing kernels, learning theory, and model assessment",
    links: [{ label: "Repository", href: "https://github.com/almondsun/ml-theory" }],
    featured: false,
    lastVerified: "2026-07-21",
    sourceRevision: "46d4d9ff26759f8d23deb559ecc60029f54dcdbc",
  },
] as const satisfies readonly Project[];

export const featuredProjects = projects.filter((project) => project.featured);
