import type { Media, ProjectSection, SiteContent } from './types.ts';

type RecordValue = Record<string, unknown>;

function isRecord(value: unknown): value is RecordValue {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function nonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function decodedPath(path: string): string | null {
  try {
    return decodeURIComponent(path);
  } catch {
    return null;
  }
}

function hasTraversal(path: string): boolean {
  const decoded = decodedPath(path);
  if (decoded === null || decoded.includes('\\')) return true;
  return decoded.split(/[/?#]/, 1)[0] === '..' || decoded.split(/[/?#]/).includes('..');
}

export function isSafeHref(href: string): boolean {
  if (!href || /[\u0000-\u0020\\]/.test(href) || hasTraversal(href)) return false;
  if (href.startsWith('//') || href.startsWith('\\\\')) return false;

  if (href.startsWith('/')) return !hasTraversal(href);

  const scheme = /^([a-z][a-z\d+.-]*):/i.exec(href)?.[1]?.toLowerCase();
  if (!scheme || !['http', 'https', 'mailto', 'tel'].includes(scheme)) return false;
  if (scheme === 'mailto') return /^mailto:[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/i.test(href);
  if (scheme === 'tel') return /^tel:\+?[\d(). -]{3,}$/i.test(href);

  try {
    const url = new URL(href);
    return url.protocol === `${scheme}:` && !!url.hostname && !hasTraversal(url.pathname);
  } catch {
    return false;
  }
}

export function isSafeMediaPath(path: string): boolean {
  return path.startsWith('/') && !path.startsWith('//') &&
    !/[\u0000-\u0020\\]/.test(path) && !hasTraversal(path);
}

function addStringError(errors: string[], path: string, value: unknown) {
  if (!nonEmptyString(value)) errors.push(`${path} is required.`);
}

function validateMedia(value: unknown, path: string, errors: string[]) {
  if (!isRecord(value)) {
    errors.push(`${path} is required.`);
    return;
  }
  if (!nonEmptyString(value.src) || !isSafeMediaPath(value.src)) {
    errors.push(`Unsafe local media path at ${path}.`);
  }
  addStringError(errors, `${path}.alt`, value.alt);
  if (value.poster !== undefined &&
      (!nonEmptyString(value.poster) || !isSafeMediaPath(value.poster))) {
    errors.push(`Unsafe local media path at ${path}.poster.`);
  }
}

function validateMediaSlots(value: unknown, path: string, errors: string[]) {
  if (value === undefined) return;
  if (!isRecord(value)) { errors.push(`${path} must be a media slot map.`); return; }
  for (const [slot, media] of Object.entries(value)) validateMedia(media, `${path}.${slot}`, errors);
}

function validateTextSlots(value: unknown, path: string, errors: string[]) {
  if (value === undefined) return;
  if (!isRecord(value) || !Object.values(value).every(text => typeof text === 'string')) {
    errors.push(`${path} must be a text slot map.`);
  }
}

function validateLink(value: unknown, path: string, errors: string[]) {
  if (!isRecord(value)) {
    errors.push(`${path} must be a link.`);
    return;
  }
  addStringError(errors, `${path}.label`, value.label);
  if (!nonEmptyString(value.href) || !isSafeHref(value.href)) {
    errors.push(`Unsafe link at ${path}.href.`);
  }
}

function validateSection(value: unknown, path: string, errors: string[]) {
  if (!isRecord(value) || !nonEmptyString(value.type)) {
    errors.push(`${path} must declare a supported section type.`);
    return;
  }

  const section = value as unknown as ProjectSection;
  switch (section.type) {
    case 'text':
      addStringError(errors, `${path}.heading`, section.heading);
      addStringError(errors, `${path}.body`, section.body);
      return;
    case 'image':
    case 'device':
    case 'video':
      validateMedia(section.media, `${path}.media`, errors);
      return;
    case 'gallery':
      if (!Array.isArray(section.items)) {
        errors.push(`${path}.items must be a media list.`);
        return;
      }
      section.items.forEach((media, index) => validateMedia(media, `${path}.items[${index}]`, errors));
      return;
    default:
      errors.push(`${path}.type is unsupported.`);
  }
}

function validateContact(value: unknown, errors: string[]) {
  if (value === undefined) return;
  if (!isRecord(value)) {
    errors.push('contact must be an object when provided.');
    return;
  }
  if (value.email !== undefined && (!nonEmptyString(value.email) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email))) {
    errors.push('contact.email must be a valid email when provided.');
  }
  if (value.phone !== undefined && !nonEmptyString(value.phone)) {
    errors.push('contact.phone must not be empty when provided.');
  }
  if (value.social !== undefined) {
    if (!Array.isArray(value.social)) errors.push('contact.social must be a link list.');
    else value.social.forEach((link, index) => validateLink(link, `contact.social[${index}]`, errors));
  }
}

/** Returns readable configuration errors; it performs no file or network access. */
export function validateContent(value: unknown): string[] {
  const errors: string[] = [];
  if (!isRecord(value)) return ['Content must be an object.'];
  const content = value as unknown as SiteContent;

  if (!isRecord(content.identity)) errors.push('identity must be an object.');
  else {
    for (const key of ['name', 'role', 'location', 'bio', 'availability'] as const) {
      addStringError(errors, `identity.${key}`, content.identity[key]);
    }
    addStringError(errors, 'identity.timeZone', content.identity.timeZone);
    if (nonEmptyString(content.identity.timeZone)) {
      try {
        new Intl.DateTimeFormat('en', { timeZone: content.identity.timeZone });
      } catch {
        errors.push('Invalid timezone at identity.timeZone.');
      }
    }
    if (content.identity.portrait !== undefined) validateMedia(content.identity.portrait, 'identity.portrait', errors);
  }

  validateContact(content.contact, errors);

  if (!isRecord(content.copy)) errors.push('copy must be an object.');
  else {
    const copyKeys = ['homeTitle', 'homeIntro', 'aboutTitle', 'aboutIntro', 'contactTitle', 'contactIntro',
      'workTitle', 'archiveTitle', 'errorTitle', 'errorBody', 'emptyWork', 'emptyArchive'] as const;
    for (const key of copyKeys) addStringError(errors, `copy.${key}`, content.copy[key]);
    if (!Array.isArray(content.copy.greetings) ||
        !content.copy.greetings.every(nonEmptyString)) errors.push('copy.greetings must be a list of non-empty strings.');
  }

  if (!Array.isArray(content.services)) errors.push('services must be a list.');
  else content.services.forEach((service, index) => {
    if (!isRecord(service)) errors.push(`services[${index}] must be an object.`);
    else {
      addStringError(errors, `services[${index}].title`, service.title);
      addStringError(errors, `services[${index}].description`, service.description);
    }
  });

  const categoryIds = new Set<string>();
  if (!Array.isArray(content.categories)) errors.push('categories must be a list.');
  else content.categories.forEach((category, index) => {
    if (!isRecord(category)) {
      errors.push(`categories[${index}] must be an object.`);
      return;
    }
    const id = category.id;
    if (!nonEmptyString(id) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
      errors.push(`Invalid category id at categories[${index}].`);
    } else if (categoryIds.has(id)) errors.push(`Duplicate category id: ${id}.`);
    else categoryIds.add(id);
    addStringError(errors, `categories[${index}].label`, category.label);
  });

  const projectSlugs = new Set<string>();
  if (!Array.isArray(content.projects)) errors.push('projects must be a list.');
  else content.projects.forEach((project, index) => {
    const path = `projects[${index}]`;
    if (!isRecord(project)) {
      errors.push(`${path} must be an object.`);
      return;
    }
    const slug = project.slug;
    if (!nonEmptyString(slug) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      errors.push(`Invalid project slug at ${path}.`);
    } else if (projectSlugs.has(slug)) errors.push(`Duplicate project slug: ${slug}.`);
    else projectSlugs.add(slug);
    for (const key of ['title', 'summary', 'year', 'client'] as const) addStringError(errors, `${path}.${key}`, project[key]);
    if (!Array.isArray(project.roles) || !project.roles.every(nonEmptyString)) errors.push(`${path}.roles must be a list of non-empty strings.`);
    if (!Array.isArray(project.categories)) errors.push(`${path}.categories must be a list.`);
    else project.categories.forEach(category => {
      if (!nonEmptyString(category) || !categoryIds.has(category)) errors.push(`Unknown category in ${path}.categories: ${String(category)}.`);
    });
    if (project.thumbnail === undefined) errors.push(`Project thumbnail is required at ${path}.`);
    else validateMedia(project.thumbnail, `${path}.thumbnail`, errors);
    if (!Array.isArray(project.sections)) errors.push(`${path}.sections must be a list.`);
    else project.sections.forEach((section, sectionIndex) => validateSection(section, `${path}.sections[${sectionIndex}]`, errors));
    validateMediaSlots(project.media, `${path}.media`, errors);
    validateTextSlots(project.copy, `${path}.copy`, errors);
    if (project.layout !== undefined && (!Number.isInteger(project.layout) || project.layout < 1 || project.layout > 11)) {
      errors.push(`${path}.layout must be an integer from 1 to 11.`);
    }
    if (project.credits !== undefined && (!Array.isArray(project.credits) || !project.credits.every(nonEmptyString))) {
      errors.push(`${path}.credits must be a list of non-empty strings.`);
    }
    if (project.location !== undefined) addStringError(errors, `${path}.location`, project.location);
    if (project.externalUrl !== undefined &&
        (!nonEmptyString(project.externalUrl) || !isSafeHref(project.externalUrl))) {
      errors.push(`Unsafe link at ${path}.externalUrl.`);
    }
  });

  if (!Array.isArray(content.archive)) errors.push('archive must be a list.');
  else content.archive.forEach((entry, index) => {
    const path = `archive[${index}]`;
    if (!isRecord(entry)) errors.push(`${path} must be an object.`);
    else {
      for (const key of ['title', 'year', 'role'] as const) addStringError(errors, `${path}.${key}`, entry[key]);
      if (entry.href !== undefined && (!nonEmptyString(entry.href) || !isSafeHref(entry.href))) {
        errors.push(`Unsafe link at ${path}.href.`);
      }
    }
  });

  if (content.presentation !== undefined) {
    if (!isRecord(content.presentation)) errors.push('presentation must be an object.');
    else {
      validateMediaSlots(content.presentation.media, 'presentation.media', errors);
      validateTextSlots(content.presentation.text, 'presentation.text', errors);
      if (content.presentation.locationLines !== undefined && (!Array.isArray(content.presentation.locationLines) ||
          content.presentation.locationLines.length !== 3 || !content.presentation.locationLines.every(nonEmptyString))) {
        errors.push('presentation.locationLines must contain three non-empty lines.');
      }
    }
  }

  if (!isRecord(content.theme)) errors.push('theme must be an object.');
  else for (const key of ['accent', 'background', 'foreground'] as const) {
    if (typeof content.theme[key] !== 'string' || !/^#[\da-f]{6}$/i.test(content.theme[key])) {
      errors.push(`Invalid theme color at theme.${key}.`);
    }
  }

  return errors;
}

export function assertContent(value: unknown): asserts value is SiteContent {
  const errors = validateContent(value);
  if (errors.length) throw new Error(`Invalid site content:\n${errors.map(error => `- ${error}`).join('\n')}`);
}

export type { Media };
