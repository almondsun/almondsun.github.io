import type { Project, SiteContent } from './content/types.ts';
import * as Layout from './layouts/index.ts';

export function resolvePage(site: SiteContent, path: string) {
  const fixed: Record<string, string> = { '/': 'Home', '/work': site.copy.workTitle,
    '/about': 'About', '/contact': 'Contact', '/archive': site.copy.archiveTitle,
    '/styleguide': 'Styleguide', '/success': 'Thank you', '/error': site.copy.errorTitle };
  const labels: Record<string, string> = { '/': 'Home', '/work': 'Work', '/about': 'About', '/contact': 'Contact',
    '/archive': 'Archive', '/styleguide': 'Styleguide', '/success': 'Success', '/error': 'Error' };
  const project = site.projects.find(project => path === `/work/${project.slug}`);
  return { project, transitionLabel: project?.title ?? labels[path] ?? 'Error', title: project?.title ?? fixed[path] ?? site.copy.errorTitle,
    namespace: project ? 'work-single' : path === '/' ? 'home' : fixed[path] ? path.slice(1) : 'error' };
}

const emptyProject: Project = { slug: '', title: '', summary: '', year: '', client: '', roles: [], categories: [],
  thumbnail: { src: '/placeholders/1600x1000.svg', alt: 'Image placeholder' }, sections: [] };
const cases = [Layout.Case01, Layout.Case02, Layout.Case03, Layout.Case04, Layout.Case05, Layout.Case06,
  Layout.Case07, Layout.Case08, Layout.Case09, Layout.Case10, Layout.Case11];

/** Route selection only: all markup lives in ordinary editable React components. */
export function PortfolioPages({site, path, includeLoader = true}: {site: SiteContent; path: string; includeLoader?: boolean}) {
  const { project, namespace } = resolvePage(site, path);
  const index = project ? site.projects.indexOf(project) : 0;
  const next = site.projects[(index + 1) % site.projects.length] ?? emptyProject;
  const Page = project ? cases[((project.layout ?? index + 1) - 1 + cases.length) % cases.length] :
    ({home: Layout.Home, work: Layout.Work, about: Layout.About, contact: Layout.Contact,
      success: Layout.Contact, archive: Layout.Archive, styleguide: Layout.Styleguide} as Record<string, typeof Layout.Home>)[namespace] ?? Layout.Error;
  return <Page site={site} project={project ?? emptyProject} next={next} includeLoader={includeLoader} />;
}

export { Section } from "./layouts/Section.tsx";
