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
  readonly image: string;
  readonly imageAlt: string;
  readonly imageFit?: "cover" | "contain";
  readonly links: readonly ProjectLink[];
  readonly featured: boolean;
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
    image: "/images/projects/ragdoll.png",
    imageAlt: "RAGdoll research with receipts project banner",
    links: [
      { label: "Repository", href: "https://github.com/almondsun/ragdoll" },
      { label: "Documentation", href: "https://almondsun.github.io/ragdoll/" },
      { label: "Video", href: "https://www.youtube.com/watch?v=aytzIq-5S5k" },
    ],
    featured: true,
  },
  {
    slug: "smallm",
    title: "smaLLM",
    eyebrow: "Language models · Reproducible research",
    tagline: "A GPT-style language-model lab built from scratch.",
    summary:
      "An inspectable PyTorch implementation spanning tokenization, causal attention, training, generation, controlled baselines, sealed evaluation, and reproducible experiment artifacts.",
    evidence: [
      "Boundary-aware ByteBPE512 beat the matched character control across eight public-domain corpora.",
      "The final capacity-controlled panel reports every seed, corpus, checkpoint identity, and limitation.",
      "Completed and frozen at version 1.0 with strict typing, branch coverage above 90%, and a five-minute CPU demo.",
    ],
    stack: ["Python", "PyTorch", "Transformers", "Experiment design"],
    status: "Completed research artifact",
    image: "/images/projects/smallm-results.svg",
    imageAlt: "Sealed-test bits per character results for smaLLM tokenizers",
    imageFit: "contain",
    links: [{ label: "Repository", href: "https://github.com/almondsun/smallm" }],
    featured: true,
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
    image: "/images/projects/insight.png",
    imageAlt: "insIGht local Instagram export import interface",
    links: [{ label: "Repository", href: "https://github.com/almondsun/insight" }],
    featured: true,
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
    image: "/images/projects/audiolab.png",
    imageAlt: "Top render of the AudioLab TLV320AIC3104 codec daughterboard",
    imageFit: "contain",
    links: [{ label: "Repository", href: "https://github.com/almondsun/audiolab" }],
    featured: true,
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
    image: "/images/projects/sialytics-cover.svg",
    imageAlt: "Editorial cover representing SIAlytics academic analytics",
    links: [{ label: "Repository", href: "https://github.com/almondsun/sialytics" }],
    featured: false,
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
    image: "/images/projects/ml-theory-cover.svg",
    imageAlt: "Editorial cover representing kernels, learning theory, and model assessment",
    links: [{ label: "Repository", href: "https://github.com/almondsun/ml-theory" }],
    featured: false,
  },
] as const satisfies readonly Project[];

export const featuredProjects = projects.filter((project) => project.featured);
