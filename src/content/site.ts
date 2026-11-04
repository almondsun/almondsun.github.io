import type { SiteContent } from './types.ts';
import { projects } from './projects.ts';

export const site: SiteContent = {
  identity: {
    name: 'Martín Ramírez Espinosa',
    role: 'Software, Data\n& Automation',
    location: 'Colombia',
    timeZone: 'America/Bogota',
    bio: 'An engineering and mathematics student drawn to complex systems, practical problem-solving and building things from scratch.',
    availability: 'Describe your availability for new projects.',
    portrait: { src: '/media/hero.png', alt: 'Portrait of Martín Ramírez Espinosa' },
  },
  contact: {
    email: 'maramirezes@unal.edu.co',
    secondaryLink: { label: '@mitin_ra', href: 'https://www.instagram.com/mitin_ra/' },
    social: [
      { label: 'GitHub', href: 'https://github.com/almondsun' },
      { label: 'Instagram', href: 'https://www.instagram.com/mitin_ra/' },
    ],
  },
  copy: {
    homeTitle: 'Software, Data & Automation',
    homeIntro: 'I build software that brings data, tools and AI models together to make complex processes easier.',
    aboutTitle: 'Understanding systems.\nBuilding useful things.',
    aboutIntro: 'I’m interested in how systems work—and how to make them more useful. I enjoy building applications from scratch, analyzing data and connecting existing AI models to practical workflows.',
    contactTitle: 'Let’s connect and exchange ideas.',
    contactIntro: 'Share a little about your project. This demo never sends a message.',
    workTitle: 'Creating next level\ndigital products',
    archiveTitle: 'Archive',
    errorTitle: 'Error 404',
    errorBody: 'Are you lost?',
    emptyWork: 'There are no projects to display yet.',
    emptyArchive: 'There are no archive entries to display yet.',
    greetings: ['Hello', 'Bonjour', 'स्वागत हे', 'Ciao', 'Olá', 'おい', 'Hallå', 'Guten tag', 'Hallo'],
  },
  services: [
    { title: 'Software', description: 'From an initial idea to a working application, I enjoy building tools with Python and C and understanding how their parts fit together.' },
    { title: 'Data', description: 'I work with data, local databases and APIs to explore information and connect it to applications.' },
    { title: 'AI & Automation', description: 'I’m most interested in what existing models can do inside real systems: helping automate processes and turn ideas into useful tools.' },
  ],
  categories: [{ id: 'design', label: 'Design' }, { id: 'development', label: 'Development' }],
  projects,
  archive: Array.from({ length: 66 }, (_, index) => ({ title: `Archive project ${String(index + 1).padStart(2, '0')}`,
    year: String(2024 - Math.floor(index / 12)), role: 'Design & Development', location: 'Your location', href: 'https://example.com' })),
  theme: { accent: '#455CE9', background: '#ffffff', foreground: '#1C1D20' },
  presentation: { locationLines: ['Located', 'in', 'Colombia'], edition: '2026 © Edition', clockPlaceholder: '--:--', media: { 'profile-picture': { src: '/media/avatar.png', alt: 'Portrait of Martín Ramírez Espinosa' } }, text: {
    'home-hero-name': 'Martín Ramírez',
    'about-pillars-heading': 'What I work with',
    'about-foundation-title': 'Engineering & Mathematics',
    'about-p-01': 'I’m studying Electronic Engineering and pursuing a double-degree path in Mathematics at Universidad Nacional de Colombia. Alongside my studies, I build software and explore ways to put data and AI models to practical use.',
    'contact-profile-heading': 'Profile Details',
    'contact-profile-line-1': 'Based in Colombia',
    'contact-profile-line-2': 'Software, Data & Automation',
  } },
};
