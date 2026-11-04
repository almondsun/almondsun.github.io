import React, { createElement as h, Fragment } from 'react';
import type { LayoutProps } from './shared.ts';
import { layoutCopy, mediaFor, secondaryContact } from './shared.ts';
import { LoadingOverlay } from './loader.tsx';

// Browser-normalized reference structure; edit these ordinary React elements directly.
export function Archive({site, project, next, includeLoader = true}: LayoutProps) {
  const secondary = secondaryContact(site);
  return h(Fragment, null,
    h("div", {"className": "no-scroll-overlay"}),
    includeLoader ? h(LoadingOverlay, { site, label: "Archive" }) : null,
    h("main", {"className": "main", "id": "archive", "data-barba": "container", "data-barba-namespace": "archive"},
      h("div", {"className": "mouse-pos-list-image no-select"}),
      h("div", {"className": "mouse-pos-list-btn no-select"}),
      h("div", {"className": "mouse-pos-list-span no-select"},
        h("p", null,
          layoutCopy(site, "archive-p-01")
        ),
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
        h("p", null)
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
              h("li", {"className": "btn btn-link"},
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
        h("header", {"className": "section default-header work-header archive-header", "data-scroll-section": ""},
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
          h("div", {"className": "container medium"},
            h("div", {"className": "row"},
              h("div", {"className": "flex-col once-in"},
                h("h1", null,
                  h("span", null,
                    "Archive",
                    h("div", {"className": "count-nr"},
                      site.projects.length
                    )
                  )
                )
              )
            )
          )
        ),
        h("section", {"className": "section-wrap section-wrap-work once-in archive-work-grid", "data-scroll-section": ""},
          h("section", {"className": "section work-grid tiny-work-grid"},
            h("div", {"className": "container"},
              h("div", {"className": "grid-sub-title"},
                h("div", {"className": "flex-col"},
                  h("h5", null,
                    "Client"
                  )
                ),
                h("div", {"className": "flex-col"},
                  h("h5", null,
                    "Location"
                  )
                ),
                h("div", {"className": "flex-col"},
                  h("h5", null,
                    "Services"
                  )
                ),
                h("div", {"className": "flex-col"},
                  h("h5", null,
                    "Year"
                  )
                )
              ),
              h("ul", {"className": "work-items mouse-pos-list-archive"},
                site.archive.map((entry, index) => h("li", {"key": index},
                  h("div", {"className": "stripe animate"}),
                  h("a", {"href": entry.href ?? '#', "target": "_blank", "className": "row"},
                    h("div", {"className": "flex-col"},
                      h("h4", null,
                        h("span", null,
                          entry.title
                        )
                      )
                    ),
                    h("div", {"className": "flex-col animate"},
                      h("p", null,
                        entry.location ?? 'Your location'
                      )
                    ),
                    h("div", {"className": "flex-col animate"},
                      h("p", null,
                        entry.role
                      )
                    ),
                    h("div", {"className": "flex-col animate"},
                      h("p", null,
                        entry.year
                      )
                    ),
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
                    )
                  )
                )),
                h("div", {"className": "stripe last animate"}),
                site.archive.length === 0 ? h('li', { role: 'status' }, site.copy.emptyArchive) : null
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
                  secondary ? h("div", {"className": "btn btn-normal"},
                    h("a", {"href": secondary.href, "className": "btn-click magnetic", "data-strength": "25", "data-strength-text": "15"},
                      h("div", {"className": "btn-fill"}),
                      h("span", {"className": "btn-text"},
                        h("span", {"className": "btn-text-inner change"},
                          secondary.label
                        )
                      )
                    )
                  ) : null
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
