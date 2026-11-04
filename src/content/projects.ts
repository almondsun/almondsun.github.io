import type { Project } from './types.ts';

/** All three work views consume this one ordered collection. */
export const projects: Project[] = Array.from({ length: 11 }, (_, index) => ({
  slug: `project-${String(index + 1).padStart(2, '0')}`,
  title: `Project ${String(index + 1).padStart(2, '0')}`,
  summary: 'Describe the project, its purpose and the work you contributed.',
  year: index < 2 ? '2024' : '2023',
  client: 'Your client',
  location: 'Your location',
  roles: index === 0 || [7, 8, 9].includes(index) ? ['Development'] : ['Design', 'Development'],
  categories: index === 0 || [7, 8, 9].includes(index) ? ['development'] : ['design', 'development'],
  thumbnail: { src: '/placeholders/810x810.svg', alt: `Project ${index + 1} image placeholder` },
  layout: index + 1,
  sections: [],
  media: {},
  externalUrl: 'https://example.com',
}));
