import type { Link, Media, Project, SiteContent } from '../content/types.ts';
import { layoutText } from '../content/layout-copy.ts';

export type LayoutProps = { site: SiteContent; project: Project; next: Project; includeLoader?: boolean };

export function layoutCopy(site: SiteContent, key: string, project?: Project): string {
  return project?.copy?.[key] ?? site.presentation?.text?.[key] ?? layoutText[key] ?? '';
}

/** Slots preserve media geometry independently from replaceable owner content. */
export function mediaFor(site: SiteContent, project: Project | undefined, slot: string, fallback = ''): Media {
  return project?.media?.[slot] ?? site.presentation?.media?.[slot] ?? { src: fallback, alt: 'Image placeholder' };
}

/** Keep alternative contact links distinct from telephone data. */
export function secondaryContact(site: SiteContent): Link | undefined {
  if (site.contact?.secondaryLink) return site.contact.secondaryLink;
  const phone = site.contact?.phone;
  return phone ? { label: phone, href: 'tel:' + phone.replace(/\s/g, '') } : undefined;
}
