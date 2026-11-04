import { createElement as h } from 'react';
import type { SiteContent } from '../content/types.ts';

/** This surface must remain outside main's transformed scrolling container. */
export function LoadingOverlay({site, label = 'Home'}: {site: SiteContent; label?: string}) {
  const titles = ['Home', 'Work', ...site.projects.map(project => project.title), 'About', 'Contact', 'Success', 'Archive', 'Error', 'Styleguide'];
  return h('div', {className: 'loading-container'}, h('div', {className: 'loading-screen'},
    h('div', {className: 'rounded-div-wrap top'}, h('div', {className: 'rounded-div'})),
    h('div', {className: 'loading-words'},
      ...site.copy.greetings.map((word, index) => h('h2', {key: `greeting-${index}`,
        className: (index === site.copy.greetings.length - 1 ? 'home-active-last' : 'home-active') +
          (index === 0 ? ' home-active-first' : '') + (word === 'おい' ? ' jap' : '')}, word, h('div', {className: 'dot'}))),
      ...titles.map((title, index) => h('h2', {key: `route-${index}`, className: title === label ? 'active' : undefined},
        title, h('div', {className: 'dot'})))),
    h('div', {className: 'rounded-div-wrap bottom'}, h('div', {className: 'rounded-div'}))));
}
