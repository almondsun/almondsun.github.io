import type { SiteContent, Project } from '../../src/content/types.ts';

// Independent test data: adopters can replace or remove every shipped demo project.
const project: Project = {
  slug: 'fixture-one', title: 'Fixture One', summary: 'An independent test project.',
  year: '2025', client: 'Fixture client', roles: ['Research'], categories: ['fixture'],
  thumbnail: { src: '/test-media.svg', alt: 'Test illustration' }, sections: [],
};
export const fixture: SiteContent = {
  identity: { name: 'Fixture Person', role: 'Designer', location: 'Remote', timeZone: 'UTC',
    bio: 'Independent configuration fixture.', availability: 'Available for testing.' },
  copy: {
    homeTitle: 'Test home', homeIntro: 'Independent home content.',
    aboutTitle: 'Test about', aboutIntro: 'Independent about content.',
    contactTitle: 'Test contact', contactIntro: 'A local-only contact fixture.',
    workTitle: 'Test work', archiveTitle: 'Test archive', errorTitle: 'Not found',
    errorBody: 'Unknown test page.', emptyWork: 'No test projects.', emptyArchive: 'No archive entries.', greetings: [],
  },
  categories: [{ id: 'fixture', label: 'Fixture' }],
  projects: [project, { ...project, slug: 'fixture-two', title: 'Fixture Two' }],
  services: [], archive: [], theme: { foreground: '#202020', background: '#ffffff', accent: '#123456' },
};
