import type { Media, ProjectSection } from '../content/types.ts';

function Picture({media}: {media: Media}) {
  return <img className="template-media" src={media.src} alt={media.alt} loading="lazy" />;
}

/** Compatibility renderer for adopters using the existing standalone section API. */
export function Section({section}: {section: ProjectSection}) {
  if (section.type === 'text') return <section className="section case-intro once-in template-copy"><h2>{section.heading}</h2><p>{section.body}</p></section>;
  if (section.type === 'video') return <section className="section single-block block-fullwidth">
    <video className="template-media" controls playsInline muted loop preload="metadata" src={section.media.src} poster={section.media.poster} aria-label={section.media.alt} />
    <p>{section.media.alt}</p></section>;
  if (section.type === 'gallery') return <section className="section single-block block-mobile-devices template-gallery">
    {section.items.map((media, index) => <figure key={`${media.src}-${index}`}><Picture media={media} /></figure>)}</section>;
  return <section className={`section single-block ${section.type === 'device' ? 'block-device' : 'block-fullwidth'}`}>
    <figure className={section.type === 'device' ? 'template-device' : ''}><Picture media={section.media} /></figure></section>;
}
