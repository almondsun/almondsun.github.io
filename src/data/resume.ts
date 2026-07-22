export const resume = {
  name: "Martín Ramírez Espinosa",
  title: "Research Engineering · Machine Learning Systems · Signal Processing",
  location: "Manizales, Colombia",
  email: "maramirezes@unal.edu.co",
  portfolio: "https://almondsun.github.io",
  github: "https://github.com/almondsun",
  linkedin: "https://www.linkedin.com/in/martin-ramirez-espinosa/",
  profile:
    "Electronic Engineering and Mathematics student and GCPDS member building inspectable ML systems, research software, and signal-processing tools.",
  availability:
    "Available for remote internships, part-time engineering roles, and focused contracts alongside my studies in Colombia.",
  education: [
    {
      institution: "Universidad Nacional de Colombia (UNAL)",
      degree: "B.Eng. Electronic Engineering",
      period: "Jan 2024 – expected Nov 2028",
    },
    {
      institution: "Universidad Nacional de Colombia (UNAL)",
      degree: "B.Sc. Mathematics",
      period: "Jul 2026 – expected Dec 2028",
    },
  ],
  experience: [
    {
      role: "Research Group Member",
      organization: "GCPDS · Universidad Nacional de Colombia",
      period: "Sep 2024 – present",
      detail:
        "Research training and project development across digital signal processing, machine learning, artificial intelligence, and research software in the LIA-UNAL ecosystem.",
      href: "https://scienti.minciencias.gov.co/gruplac/jsp/visualiza/visualizagr.jsp?nro=00000000001375",
    },
    {
      role: "Open-source contributor",
      organization: "ANE2-Calibration-SDR",
      period: "Mar 2026",
      detail:
        "Integrated a self-contained spectral node-calibration runtime with artifact provenance, PSD-frame calibration, and integration tests in an upstream-approved and merged pull request.",
      href: "https://github.com/dramirezbe/ANE2-Calibration-SDR/pull/4",
    },
    {
      role: "Mathematics Tutor · Social service",
      organization: "Colsemenor",
      period: "Jun 2022 – Aug 2023",
      detail:
        "Supported students in grades 5–7 with adapted explanations and exercises, progress monitoring, and clear mathematical communication.",
      href: undefined,
    },
  ],
  projects: [
    {
      name: "RAGdoll",
      stack: "Python · Textual · SQLite FTS5 · Pydantic",
      href: "https://github.com/almondsun/ragdoll",
      bullets: [
        "Designed an explainable scholarly-research workspace with explicit plan, curation, and full-text approval; provenance, evidence levels, and passage citations remain inspectable.",
        "Recorded run: 24 candidates, six curated papers, five full texts, one abstract fallback, 307 chunks, seven dossier sections, and 23/25 directly supported claims; 98 tests and >90% coverage.",
      ],
    },
    {
      name: "smaLLM",
      stack: "Python · PyTorch · Experiment design",
      href: "https://github.com/almondsun/smallm",
      bullets: [
        "Built an end-to-end GPT-style laboratory from corpus provenance and tokenizers through training, checkpoint identity, controlled baselines, and one-shot sealed evaluation.",
        "Final preregistered capacity-controlled panel matched parameters within 0.40%; ByteBPE512 won 8/9 comparisons against char136 while preserving the reversal and limitations; 182 tests, 90.49% branch coverage.",
      ],
    },
  ],
  additionalProjects:
    "Additional work: insIGht, a local-first Rust/Tauri privacy product · AudioLab, an STM32/USB-audio hardware and firmware platform.",
  skills: {
    languages: "Python, Rust, C/C++, TypeScript, SQL",
    research: "PyTorch, information retrieval, design of experiments, digital signal processing",
    systems: "SQLite, GitHub Actions, Linux, strict typing, automated testing",
  },
  spokenLanguages: "Spanish — native · English — professional working proficiency, B2 (210 hours)",
} as const;
