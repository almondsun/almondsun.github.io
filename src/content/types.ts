export type Media = {
  src: string;
  alt: string;
  poster?: string;
};

export type Link = {
  label: string;
  href: string;
};

export type TextSection = {
  type: 'text';
  heading: string;
  body: string;
};

export type ImageSection = {
  type: 'image' | 'device';
  media: Media;
};

export type VideoSection = {
  type: 'video';
  media: Media;
};

export type GallerySection = {
  type: 'gallery';
  items: Media[];
};

export type ProjectSection = TextSection | ImageSection | VideoSection | GallerySection;

export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  client: string;
  roles: string[];
  categories: string[];
  thumbnail: Media;
  sections: ProjectSection[];
  externalUrl?: string;
  location?: string;
  credits?: string[];
  /** Original case composition, 1–11; omitted selects by collection order. */
  layout?: number;
  media?: Record<string, Media>;
  copy?: Record<string, string>;
};

export type ArchiveEntry = {
  title: string;
  year: string;
  role: string;
  href?: string;
  location?: string;
};

export type SiteIdentity = {
  name: string;
  role: string;
  location: string;
  timeZone: string;
  bio: string;
  availability: string;
  portrait?: Media;
};

export type Contact = {
  email?: string;
  phone?: string;
  social?: Link[];
};

export type SiteCopy = {
  homeTitle: string;
  homeIntro: string;
  aboutTitle: string;
  aboutIntro: string;
  contactTitle: string;
  contactIntro: string;
  workTitle: string;
  archiveTitle: string;
  errorTitle: string;
  errorBody: string;
  emptyWork: string;
  emptyArchive: string;
  greetings: string[];
};

export type Service = {
  title: string;
  description: string;
};

export type Theme = {
  accent: string;
  background: string;
  foreground: string;
};

export type SiteContent = {
  identity: SiteIdentity;
  contact?: Contact;
  copy: SiteCopy;
  services: Service[];
  categories: { id: string; label: string }[];
  projects: Project[];
  archive: ArchiveEntry[];
  theme: Theme;
  /** Optional editable slots belonging to the faithful presentation. */
  presentation?: {
    locationLines?: [string, string, string];
    edition?: string;
    clockPlaceholder?: string;
    text?: Record<string, string>;
    media?: Record<string, Media>;
  };
};
