import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { content as configuredContent, type Media } from '../src/content/index.ts';
import { fixture as content } from './fixtures/content.ts';
import { validateContent } from '../src/content/validation.ts';

test('configured content is valid and all configured media exists locally', () => {
  const content = configuredContent;
  assert.deepEqual(validateContent(content), []);
  const media: Media[] = [];
  if (content.identity.portrait) media.push(content.identity.portrait);
  for (const project of content.projects) {
    media.push(project.thumbnail);
    for (const section of project.sections) {
      if (section.type === 'gallery') media.push(...section.items);
      else if ('media' in section) media.push(section.media);
    }
  }
  for (const item of media) assert.ok(existsSync(resolve('public', `.${item.src}`)), item.src);
});

test('empty editable collections and unbounded category sets are valid', () => {
  const empty = {
    ...content,
    contact: undefined,
    services: [], categories: [], projects: [], archive: [], copy: { ...content.copy, greetings: [] },
  };
  assert.deepEqual(validateContent(empty), []);
  const uncategorized = structuredClone(content);
  uncategorized.projects[0].categories = [];
  assert.deepEqual(validateContent(uncategorized), []);

  const expanded = {
    ...content,
    categories: [...content.categories, { id: 'research', label: 'Research' },
      { id: 'community-labs', label: 'Community labs' }],
  };
  assert.deepEqual(validateContent(expanded), []);
});

test('rejects duplicate and malformed project/category identifiers', () => {
  const invalid = {
    ...content,
    categories: [...content.categories, { ...content.categories[0] }, { id: 'No spaces', label: 'Bad' }],
    projects: [...content.projects, { ...content.projects[0] }, { ...content.projects[1], slug: '../escape' }],
  };
  const errors = validateContent(invalid);
  assert.ok(errors.some(error => error.includes('Duplicate category id')));
  assert.ok(errors.some(error => error.includes('Invalid category id')));
  assert.ok(errors.some(error => error.includes('Duplicate project slug')));
  assert.ok(errors.some(error => error.includes('Invalid project slug')));
});

test('rejects unsafe links and traversal in local media paths', () => {
  const invalid = {
    ...content,
    contact: { email: 'hello@example.com', social: [
      { label: 'Unsafe', href: 'javascript:alert(1)' },
      { label: 'Protocol relative', href: '//bad.example/path' },
      { label: 'Traversal', href: '/one/../two' },
    ] },
    projects: content.projects.map((project, index) => index === 0 ? {
      ...project, thumbnail: { src: '/demo/../../secret.svg', alt: 'Unsafe path' },
    } : project),
  };
  const errors = validateContent(invalid);
  assert.ok(errors.some(error => error.includes('Unsafe link')));
  assert.ok(errors.some(error => error.includes('Unsafe local media path')));
});

test('rejects missing required data, unresolved references, timezone, and theme colors', () => {
  const invalid = {
    ...content,
    identity: { ...content.identity, name: ' ', timeZone: 'Mars/Olympus' },
    theme: { ...content.theme, accent: 'blue' },
    copy: { ...content.copy, homeTitle: '' },
    projects: content.projects.map((project, index) => index === 0 ? {
      ...project, title: '', categories: ['missing-category'], thumbnail: undefined,
    } : project),
  };
  const errors = validateContent(invalid);
  assert.ok(errors.some(error => error.includes('identity.name')));
  assert.ok(errors.some(error => error.includes('copy.homeTitle')));
  assert.ok(errors.some(error => error.includes('Unknown category')));
  assert.ok(errors.some(error => error.includes('Project thumbnail is required')));
  assert.ok(errors.some(error => error.includes('Invalid timezone')));
  assert.ok(errors.some(error => error.includes('Invalid theme color')));
});
