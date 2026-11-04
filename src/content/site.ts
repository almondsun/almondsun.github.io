import type { SiteContent } from './types.ts';
import { projects } from './projects.ts';

export const site: SiteContent = {
  identity: {
    name: 'Martín Ramírez Espinosa',
    role: 'Freelance\nDesigner & Developer',
    location: 'Colombia',
    timeZone: 'UTC',
    bio: 'Describe the combination of your interests, skills and experience. Explain what makes your approach distinctive and how you help people bring their ideas to life.',
    availability: 'Describe your availability for new projects.',
    portrait: { src: '/media/hero.png', alt: 'Portrait of Martín Ramírez Espinosa' },
  },
  contact: {
    email: 'maramirezes@unal.edu.co',
    phone: '+1 555 010 0200',
    social: [
      { label: 'Awwwards', href: 'https://example.com/awwwards' },
      { label: 'Instagram', href: 'https://example.com/instagram' },
      { label: 'Twitter', href: 'https://example.com/twitter' },
      { label: 'LinkedIn', href: 'https://example.com/linkedin' },
    ],
  },
  copy: {
    homeTitle: 'Freelance Designer & Developer',
    homeIntro: 'Describe the work you do and the people you work with. Share your approach to creating thoughtful digital experiences, and explain the difference you want to make.',
    aboutTitle: 'Helping ideas thrive\nin the digital world',
    aboutIntro: 'Describe who you help and how you approach your work. Introduce your experience, your interests and the values that guide each project you take on.',
    contactTitle: "Let's start a\nproject together",
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
    { title: 'Design', description: 'Describe your design practice, the problems you solve and how you create clear, useful experiences. Explain what clients can expect when working with you.' },
    { title: 'Development', description: 'Describe your development practice and the ways you bring an idea to life. Explain the technologies, interactions and details that support your work.' },
    { title: 'The full package', description: 'Describe how your skills come together across a complete project, from the first conversation to the final result. Share what makes that collaboration valuable.' },
  ],
  categories: [{ id: 'design', label: 'Design' }, { id: 'development', label: 'Development' }],
  projects,
  archive: Array.from({ length: 66 }, (_, index) => ({ title: `Archive project ${String(index + 1).padStart(2, '0')}`,
    year: String(2024 - Math.floor(index / 12)), role: 'Design & Development', location: 'Your location', href: 'https://example.com' })),
  theme: { accent: '#455CE9', background: '#ffffff', foreground: '#1C1D20' },
  presentation: { locationLines: ['Located', 'in', 'Colombia'], edition: '2026 © Edition', clockPlaceholder: '00:00 UTC', media: { 'profile-picture': { src: '/media/avatar.png', alt: 'Portrait of Martín Ramírez Espinosa' } }, text: {} },
};
