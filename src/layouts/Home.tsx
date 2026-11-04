import React, { createElement as h, Fragment } from 'react';
import type { LayoutProps } from './shared.ts';
import { layoutCopy, mediaFor } from './shared.ts';
import { LoadingOverlay } from './loader.tsx';

// Browser-normalized reference structure; edit these ordinary React elements directly.
export function Home({site, project, next, includeLoader = true}: LayoutProps) {
  return h(Fragment, null,
    h("div", {"className": "no-scroll-overlay"}),
    includeLoader ? h(LoadingOverlay, { site, label: "Home" }) : null,
    h("main", {"className": "main", "id": "home", "data-barba": "container", "data-barba-namespace": "home"},
      h("div", {"className": "mouse-pos-list-image no-select"},
        h("div", {"className": "mouse-pos-list-image-bounce overlay"},
          h("div", {"className": "float-image-wrap"},
            site.projects.slice(0, 4).map((project, index) => h("li", {"className": "mouse-pos-list-image-inner " + project.categories.join(' ') + ' visible', "key": project.slug, "data-project": project.slug, "data-categories": JSON.stringify(project.categories)},
              h("div", {"className": "overlay overlay-image lazy", "style": {"backgroundColor": "rgb(241, 241, 241)", "backgroundPositionX": "center", "backgroundPositionY": "center", "backgroundRepeat": "no-repeat", "backgroundSize": "cover"}, "data-bg": project.thumbnail.src})
            ))
          )
        )
      ),
      h("div", {"className": "mouse-pos-list-btn no-select"}),
      h("div", {"className": "mouse-pos-list-span no-select"},
        h("p", null,
          "View"
        )
      ),
      h("div", {"className": "btn btn-hamburger"},
        h("div", {"className": "btn-click magnetic", "data-strength": "50", "data-strength-text": "25"},
          h("div", {"className": "btn-fill"}),
          h("div", {"className": "btn-text"},
            h("div", {"className": "btn-bars"}),
            h("span", {"className": "btn-text-inner"},
              "Menu"
            )
          )
        )
      ),
      h("div", {"className": "overlay fixed-nav-back"}),
      h("div", {"className": "fixed-nav theme-dark"},
        h("div", {"className": "fixed-nav-rounded-div"},
          h("div", {"className": "rounded-div-wrap"},
            h("div", {"className": "rounded-div"})
          )
        ),
        h("div", {"className": "fixed-nav-inner"},
          h("div", {"className": "row nav-row"},
            h("h5", null,
              "Navigation"
            ),
            h("div", {"className": "stripe"}),
            h("ul", {"className": "links-wrap"},
              h("li", {"className": "btn btn-link active"},
                h("a", {"href": "", "className": "btn-click magnetic", "data-strength": "24", "data-strength-text": "12"},
                  h("span", {"className": "btn-text"},
                    h("span", {"className": "btn-text-inner"},
                      "Home"
                    )
                  )
                )
              ),
              h("li", {"className": "btn btn-link"},
                h("a", {"href": "/work", "className": "btn-click magnetic", "data-strength": "24", "data-strength-text": "12"},
                  h("span", {"className": "btn-text"},
                    h("span", {"className": "btn-text-inner"},
                      "Work"
                    )
                  )
                )
              ),
              h("li", {"className": "btn btn-link"},
                h("a", {"href": "/about", "className": "btn-click magnetic", "data-strength": "24", "data-strength-text": "12"},
                  h("span", {"className": "btn-text"},
                    h("span", {"className": "btn-text-inner"},
                      "About"
                    )
                  )
                )
              ),
              h("li", {"className": "btn btn-link"},
                h("a", {"href": "/contact", "className": "btn-click magnetic", "data-strength": "24", "data-strength-text": "12"},
                  h("span", {"className": "btn-text"},
                    h("span", {"className": "btn-text-inner"},
                      "Contact"
                    )
                  )
                )
              )
            )
          ),
          h("div", {"className": "row social-row"},
            h("div", {"className": "stripe"}),
            h("div", {"className": "socials"},
              h("h5", null,
                "Socials"
              ),
              h("ul", null,
                site.contact?.social?.map((social) => h("li", {"className": "btn btn-link btn-link-external", "key": social.href},
                  h("a", {"href": social.href, "target": "_blank", "className": "btn-click magnetic", "data-strength": "20", "data-strength-text": "10"},
                    h("span", {"className": "btn-text"},
                      h("span", {"className": "btn-text-inner"},
                        social.label
                      )
                    )
                  )
                ))
              )
            )
          )
        )
      ),
      h("div", {"className": "main-wrap", "data-scroll-container": ""},
        h("header", {"className": "section home-header theme-dark", "data-scroll-section": ""},
          h("div", {"className": "overlay personal-image no-select once-in", "data-scroll": "", "data-scroll-speed": "-3", "data-scroll-position": "top"},
            site.identity.portrait ? h('img', { className: 'overlay', src: site.identity.portrait.src, alt: site.identity.portrait.alt }) : null
          ),
          h("div", {"className": "overlay get-height once-in once-in-secondary"},
            h("div", {"className": "hanger"},
              h("p", null,
                h("span", null,
                  site.presentation?.locationLines?.[0] ?? 'Located'
                ),
                h("span", null,
                  site.presentation?.locationLines?.[1] ?? "in your"
                ),
                h("span", null,
                  site.presentation?.locationLines?.[2] ?? "Location"
                )
              ),
              h("svg", {"width": "300px", "height": "121px", "viewBox": "0 0 300 121", "version": "1.1", "xmlns": "http://www.w3.org/2000/svg", "xmlnsXlink": "http://www.w3.org/1999/xlink"},
                h("title", null,
                  "Combined Shape"
                ),
                h("g", {"id": "Page-1", "stroke": "none", "strokeWidth": "1", "fill": "none", "fillRule": "evenodd"},
                  h("g", {"id": "Artboard", "transform": "translate(0.000000, -366.000000)", "fill": "#1C1D20"},
                    h("g", {"id": "Group", "transform": "translate(149.816828, 426.633657) rotate(90.000000) translate(-149.816828, -426.633657) translate(89.816828, 276.816828)"},
                      h("g", {"id": "Hanger", "transform": "translate(60.000000, 149.816828) rotate(-90.000000) translate(-60.000000, -149.816828) translate(-89.816828, 89.816828)"},
                        h("path", {"d": "M239.633657,0 C272.770742,1.0182436e-15 299.633657,26.862915 299.633657,60 C299.633657,93.137085 272.770742,120 239.633657,120 L0,120 L0,0 L239.633657,0 Z M239.633657,18.7755102 C216.866,18.7755102 198.409167,37.232343 198.409167,60 C198.409167,82.767657 216.866,101.22449 239.633657,101.22449 C262.401314,101.22449 280.858147,82.767657 280.858147,60 C280.858147,37.232343 262.401314,18.7755102 239.633657,18.7755102 Z", "id": "Combined-Shape"})
                      )
                    )
                  )
                )
              ),
              h("div", {"className": "digital-ball"},
                h("div", {"className": "overlay"}),
                h("div", {"className": "globe"},
                  h("div", {"className": "globe-wrap"},
                    h("div", {"className": "circle"}),
                    h("div", {"className": "circle"}),
                    h("div", {"className": "circle"}),
                    h("div", {"className": "circle-hor"}),
                    h("div", {"className": "circle-hor-middle"})
                  )
                )
              )
            )
          ),
          h("div", {"className": "nav-bar"},
            h("div", {"className": "credits-top"},
              h("div", {"className": "btn btn-link btn-left-top"},
                h("a", {"href": "", "className": "btn-click magnetic", "data-strength": "20", "data-strength-text": "10"},
                  h("span", {"className": "btn-text"},
                    h("div", {"className": "credit"},
                      h("span", null,
                        "©"
                      )
                    ),
                    h("div", {"className": "cbd"},
                      h("span", {"className": "code-by"},
                        "Code by"
                      ),
                      h("span", {"className": "dennis"},
                        h("span", {"className": "dennis-span"},
                          site.identity.name.split(' ')[0]
                        ),
                        h("span", {"className": "snellenberg"},
                          site.identity.name.split(' ').slice(1).join(' ')
                        )
                      )
                    )
                  )
                )
              )
            ),
            h("ul", {"className": "links-wrap"},
              h("li", {"className": "btn btn-link"},
                h("a", {"href": "/work", "className": "btn-click magnetic", "data-strength": "20", "data-strength-text": "10"},
                  h("span", {"className": "btn-text"},
                    h("span", {"className": "btn-text-inner"},
                      "Work"
                    )
                  )
                )
              ),
              h("li", {"className": "btn btn-link"},
                h("a", {"href": "/about", "className": "btn-click magnetic", "data-strength": "20", "data-strength-text": "10"},
                  h("span", {"className": "btn-text"},
                    h("span", {"className": "btn-text-inner"},
                      "About"
                    )
                  )
                )
              ),
              h("li", {"className": "btn btn-link"},
                h("a", {"href": "/contact", "className": "btn-click magnetic", "data-strength": "20", "data-strength-text": "10"},
                  h("span", {"className": "btn-text"},
                    h("span", {"className": "btn-text-inner"},
                      "Contact"
                    )
                  )
                )
              ),
              h("li", {"className": "btn btn-link btn-menu"},
                h("div", {"className": "btn-click magnetic", "data-strength": "20", "data-strength-text": "10"},
                  h("div", {"className": "btn-text"},
                    h("span", {"className": "btn-text-inner"},
                      "Menu"
                    )
                  )
                )
              )
            )
          ),
          h("div", {"className": "container once-in once-in-secondary"},
            h("div", {"className": "row"},
              h("div", {"className": "flex-col"},
                h("div", {"className": "header-above-h4", "data-scroll": "", "data-scroll-speed": "1"},
                  h("div", {"className": "arrow big"},
                    h("svg", {"width": "14px", "height": "14px", "viewBox": "0 0 14 14", "version": "1.1", "xmlns": "http://www.w3.org/2000/svg", "xmlnsXlink": "http://www.w3.org/1999/xlink"},
                      h("title", null,
                        "arrow-up-right"
                      ),
                      h("g", {"id": "Page-1", "stroke": "none", "strokeWidth": "1", "fill": "none", "fillRule": "evenodd"},
                        h("g", {"id": "Artboard", "transform": "translate(-1019.000000, -279.000000)", "stroke": "#FFFFFF", "strokeWidth": "1.5"},
                          h("g", {"id": "arrow-up-right", "transform": "translate(1026.000000, 286.000000) rotate(90.000000) translate(-1026.000000, -286.000000) translate(1020.000000, 280.000000)"},
                            h("polyline", {"id": "Path", "points": "2.76923077 0 12 0 12 9.23076923"}),
                            h("line", {"x1": "12", "y1": "0", "x2": "0", "y2": "12", "id": "Path"})
                          )
                        )
                      )
                    )
                  )
                ),
                h("h4", null,
                  h("span", null,
                    site.identity.role.split('\n')[0]
                  ),
                  site.identity.role.split('\n').slice(1).join(' ')
                )
              )
            )
          ),
          h("div", {"className": "big-name"},
            h("div", {"className": "name-h1", "data-scroll": "", "data-scroll-direction": "horizontal", "data-scroll-speed": "4", "data-scroll-position": "top"},
              h("div", {"className": "name-wrap"},
                h("h1", {"className": "no-select once-in once-in-secondary"},
                  site.identity.name,
                  h("span", {"className": "spacer"},
                    "—"
                  )
                )
              )
            )
          ),
          h("div", {"className": "white-block"})
        ),
        h("section", {"className": "section home-intro", "data-scroll-section": ""},
          h("div", {"className": "container medium"},
            h("div", {"className": "row"},
              h("div", {"className": "flex-col"},
                h("h4", {"className": "span-lines animate"},
                  site.copy.homeIntro
                )
              ),
              h("div", {"className": "flex-col"},
                h("div", {"className": "text-wrap fade-in animate"},
                  h("p", null,
                    site.identity.bio
                  )
                ),
                h("div", {"className": "btn btn-round", "data-scroll": "", "data-scroll-speed": "2"},
                  h("a", {"href": "/about", "className": "btn-click magnetic ", "data-strength": "100", "data-strength-text": "50"},
                    h("div", {"className": "btn-fill"}),
                    h("span", {"className": "btn-text"},
                      h("span", {"className": "btn-text-inner"},
                        "About me"
                      )
                    )
                  )
                )
              )
            )
          )
        ),
        h("section", {"className": "section work-grid large-work-grid", "data-scroll-section": ""},
          h("div", {"className": "container"},
            h("div", {"className": "grid-sub-title"},
              h("div", {"className": "flex-col"},
                h("h5", null,
                  "Recent work"
                )
              )
            ),
            h("ul", {"className": "work-items mouse-pos-list-image-wrap"},
              site.projects.slice(0, 4).map((project, index) => h("li", {"className": "" + project.categories.join(' ') + ' visible', "key": project.slug, "data-project": project.slug, "data-categories": JSON.stringify(project.categories)},
                h("div", {"className": "stripe animate"}),
                h("a", {"href": '/work/' + project.slug, "className": "row"},
                  h("div", {"className": "flex-col"},
                    h("h4", null,
                      h("span", null,
                        project.title
                      )
                    )
                  ),
                  h("div", {"className": "flex-col animate"},
                    h("p", null,
                      project.location ?? 'Your location'
                    )
                  )
                )
              )),
              h("div", {"className": "stripe last animate"}),
              site.projects.slice(0, 4).length === 0 ? h('li', { role: 'status' }, site.copy.emptyWork) : null
            )
          )
        ),
        h("section", {"className": "section work-tiles work-tiles-home", "data-scroll-section": ""},
          h("div", {"className": "container"},
            h("ul", null,
              site.projects.slice(0, 4).map((project, index) => h("li", {"className": "" + project.categories.join(' ') + ' visible', "key": project.slug, "data-project": project.slug, "data-categories": JSON.stringify(project.categories)},
                h("div", {"className": "single-tile-wrap"},
                  h("a", {"href": '/work/' + project.slug, "className": "row"},
                    h("div", {"className": "flex-col"},
                      h("div", {"className": "tile-image"},
                        h("div", {"className": "overlay overlay-image lazy", "style": {"backgroundColor": "rgb(241, 241, 241)", "backgroundPositionX": "center", "backgroundPositionY": "center", "backgroundRepeat": "no-repeat", "backgroundSize": "cover"}, "data-bg": project.thumbnail.src})
                      )
                    ),
                    h("div", {"className": "flex-col"},
                      h("h4", null,
                        h("span", null,
                          project?.title ?? ''
                        )
                      ),
                      h("div", {"className": "stripe"})
                    ),
                    h("div", {"className": "flex-col"},
                      h("p", null,
                        project.roles.join(' & ')
                      )
                    ),
                    h("div", {"className": "flex-col"},
                      h("p", null,
                        project.year
                      )
                    )
                  )
                )
              )),
              site.projects.slice(0, 4).length === 0 ? h('li', { role: 'status' }, site.copy.emptyWork) : null
            )
          )
        ),
        h("section", {"className": "section center-grid-btn center-grid-btn-home", "data-scroll-section": "", "style": {"paddingBottom": "calc(var(--section-padding) - 2.5vw)"}},
          h("div", {"className": "container"},
            h("div", {"className": "grid-after-btn"},
              h("div", {"className": "btn btn-normal"},
                h("a", {"href": "/work", "className": "btn-click magnetic", "data-strength": "25", "data-strength-text": "15"},
                  h("div", {"className": "btn-fill"}),
                  h("span", {"className": "btn-text"},
                    h("span", {"className": "btn-text-inner change"},
                      "More work",
                      h("div", {"className": "count-nr"},
                        site.projects.length
                      )
                    )
                  )
                )
              )
            )
          )
        ),
        h("div", {"className": "footer-rounded-div", "data-scroll-section": ""},
          h("div", {"className": "rounded-div-wrap"},
            h("div", {"className": "rounded-div"})
          )
        ),
        h("div", {"className": "footer-wrap footer-footer-wrap theme-dark", "data-scroll-section": ""},
          h("footer", {"className": "section footer", "data-scroll": "", "data-scroll-speed": "-4", "data-scroll-position": "bottom"},
            h("div", {"className": "container medium"},
              h("div", {"className": "row"},
                h("div", {"className": "flex-col"},
                  h("div", {"className": "arrow"},
                    h("svg", {"width": "14px", "height": "14px", "viewBox": "0 0 14 14", "version": "1.1", "xmlns": "http://www.w3.org/2000/svg", "xmlnsXlink": "http://www.w3.org/1999/xlink"},
                      h("title", null,
                        "arrow-up-right"
                      ),
                      h("g", {"id": "Page-1", "stroke": "none", "strokeWidth": "1", "fill": "none", "fillRule": "evenodd"},
                        h("g", {"id": "Artboard", "transform": "translate(-1019.000000, -279.000000)", "stroke": "#FFFFFF", "strokeWidth": "1.5"},
                          h("g", {"id": "arrow-up-right", "transform": "translate(1026.000000, 286.000000) rotate(90.000000) translate(-1026.000000, -286.000000) translate(1020.000000, 280.000000)"},
                            h("polyline", {"id": "Path", "points": "2.76923077 0 12 0 12 9.23076923"}),
                            h("line", {"x1": "12", "y1": "0", "x2": "0", "y2": "12", "id": "Path"})
                          )
                        )
                      )
                    )
                  ),
                  h("h2", null,
                    h("span", null,
                      h("div", {"className": "profile-picture", "style": {"backgroundImage": 'url(' + mediaFor(site, undefined, 'profile-picture', site.identity.portrait?.src ?? '/placeholders/810x810.svg').src + ')'}}),
                      "Let’s work"
                    ),
                    h("span", null,
                      "together"
                    )
                  )
                )
              ),
              h("div", {"className": "row"},
                h("div", {"className": "flex-col"},
                  h("div", {"className": "stripe"}),
                  h("div", {"className": "btn-fixed"},
                    h("div", {"className": "btn btn-round", "data-scroll": "", "data-scroll-speed": "-1", "data-scroll-direction": "horizontal", "data-scroll-position": "bottom", "data-scroll-offset": "-50%, 0"},
                      h("a", {"href": "/contact", "className": "btn-click magnetic ", "data-strength": "100", "data-strength-text": "50"},
                        h("div", {"className": "btn-fill"}),
                        h("span", {"className": "btn-text"},
                          h("span", {"className": "btn-text-inner"},
                            "Get in touch"
                          )
                        )
                      )
                    )
                  )
                )
              ),
              h("div", {"className": "row"},
                h("div", {"className": "flex-col"},
                  h("div", {"className": "btn btn-normal"},
                    h("a", {"href": site.contact?.email ? 'mailto:' + site.contact.email : '#', "className": "btn-click magnetic", "data-strength": "25", "data-strength-text": "15"},
                      h("div", {"className": "btn-fill"}),
                      h("span", {"className": "btn-text"},
                        h("span", {"className": "btn-text-inner change"},
                          site.contact?.email ?? ''
                        )
                      )
                    )
                  ),
                  h("div", {"className": "btn btn-normal"},
                    h("a", {"href": site.contact?.phone ? 'tel:' + site.contact.phone.replace(/\s/g, '') : '#', "className": "btn-click magnetic", "data-strength": "25", "data-strength-text": "15"},
                      h("div", {"className": "btn-fill"}),
                      h("span", {"className": "btn-text"},
                        h("span", {"className": "btn-text-inner change"},
                          site.contact?.phone ?? ''
                        )
                      )
                    )
                  )
                )
              )
            ),
            h("div", {"className": "container no-padding"},
              h("div", {"className": "row bottom-footer"},
                h("div", {"className": "flex-col"},
                  h("div", {"className": "credits"},
                    h("h5", null,
                      "Version"
                    ),
                    h("p", null,
                      site.presentation?.edition ?? '2026 © Edition'
                    )
                  ),
                  h("div", {"className": "time"},
                    h("h5", null,
                      "Local time"
                    ),
                    h("p", null,
                      h("span", {"id": "timeSpan"},
                        site.presentation?.clockPlaceholder ?? '00:00 UTC'
                      )
                    )
                  )
                ),
                h("div", {"className": "flex-col"},
                  h("div", {"className": "socials"},
                    h("h5", null,
                      "Socials"
                    ),
                    h("ul", null,
                      site.contact?.social?.map((social) => h("li", {"className": "btn btn-link btn-link-external", "key": social.href},
                        h("a", {"href": social.href, "target": "_blank", "className": "btn-click magnetic", "data-strength": "20", "data-strength-text": "10"},
                          h("span", {"className": "btn-text"},
                            h("span", {"className": "btn-text-inner"},
                              social.label
                            )
                          )
                        )
                      ))
                    ),
                    h("div", {"className": "stripe"})
                  )
                )
              )
            )
          ),
          h("div", {"className": "overlay overlay-gradient"})
        )
      )
    )
  );
}
