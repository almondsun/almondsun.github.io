export interface Note {
  readonly title: string;
  readonly kind: string;
  readonly project: string;
  readonly summary: string;
  readonly topics: readonly string[];
  readonly href: string;
  readonly featured: boolean;
}

export const notes = [
  {
    title: "Architecture and trust boundaries",
    kind: "Architecture note",
    project: "RAGdoll",
    summary:
      "How provider, scholarly-source, storage, evidence, and terminal boundaries preserve user control and keep model output outside domain logic until validation succeeds.",
    topics: ["System architecture", "Trust boundaries", "Pydantic"],
    href: "https://almondsun.github.io/ragdoll/architecture/",
    featured: true,
  },
  {
    title: "Evidence and cited dossiers",
    kind: "Product contract",
    project: "RAGdoll",
    summary:
      "The distinction between metadata, abstracts, acquired full text, page-aware passages, and the citations that support synthesized claims.",
    topics: ["Research provenance", "Citations", "Human approval"],
    href: "https://almondsun.github.io/ragdoll/evidence-and-dossiers/",
    featured: false,
  },
  {
    title: "From tensors to a GPT",
    kind: "Theory handbook",
    project: "smaLLM",
    summary:
      "A zero-prerequisite path through tensors, probability, tokenization, autograd, causal attention, the decoder-only Transformer, training, evaluation, and the source implementation.",
    topics: ["Language models", "PyTorch", "Causal attention"],
    href: "https://github.com/almondsun/smallm/tree/main/notes",
    featured: false,
  },
  {
    title: "Final capacity-controlled tokenizer panel",
    kind: "Experiment report",
    project: "smaLLM",
    summary:
      "The preregistered final comparison of boundary-aware ByteBPE512 and matched character controls, including every seed, corpus, checkpoint identity, reversal, and limitation.",
    topics: ["Experiment design", "Tokenization", "Sealed evaluation"],
    href: "https://github.com/almondsun/smallm/blob/main/experiments/030-final-capacity-panel-and-project-completion.md",
    featured: true,
  },
  {
    title: "Privacy by design for local archive analytics",
    kind: "Engineering note",
    project: "insIGht",
    summary:
      "Why official exports, local persistence, bounded archive parsing, no telemetry, and explicit limitations are product behavior rather than implementation details.",
    topics: ["Local-first", "Privacy", "Defensive parsing"],
    href: "https://github.com/almondsun/insight#privacy-by-design",
    featured: false,
  },
  {
    title: "Hardware, firmware, and host boundaries",
    kind: "System design",
    project: "AudioLab",
    summary:
      "The repository contract separating an implemented TLV320AIC3104 daughterboard, STM32 firmware, host tooling, specifications, and future verification work.",
    topics: ["Embedded systems", "Audio DSP", "Hardware interfaces"],
    href: "https://github.com/almondsun/audiolab#repository-structure",
    featured: true,
  },
] as const satisfies readonly Note[];

export const featuredNotes = notes.filter((note) => note.featured);
