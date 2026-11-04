import React, { createElement as h, Fragment } from 'react';
import type { LayoutProps } from './shared.ts';
import { layoutCopy, mediaFor } from './shared.ts';
import { LoadingOverlay } from './loader.tsx';

// Browser-normalized reference structure; edit these ordinary React elements directly.
export function Work({site, project, next, includeLoader = true}: LayoutProps) {
  return h(Fragment, null,
    h("div", {"className": "no-scroll-overlay"}),
    includeLoader ? h(LoadingOverlay, { site, label: "Work" }) : null,
    h("main", {"className": "main", "id": "work", "data-barba": "container", "data-barba-namespace": "work"},
      h("div", {"className": "mouse-pos-list-image no-select"},
        h("div", {"className": "mouse-pos-list-image-bounce overlay"},
          h("div", {"className": "float-image-wrap"},
            site.projects.map((project, index) => h("li", {"className": "mouse-pos-list-image-inner " + project.categories.join(' ') + ' visible', "key": project.slug, "data-project": project.slug, "data-categories": JSON.stringify(project.categories)},
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
              h("li", {"className": "btn btn-link"},
                h("a", {"href": "", "className": "btn-click magnetic", "data-strength": "24", "data-strength-text": "12"},
                  h("span", {"className": "btn-text"},
                    h("span", {"className": "btn-text-inner"},
                      "Home"
                    )
                  )
                )
              ),
              h("li", {"className": "btn btn-link active"},
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
        h("header", {"className": "section default-header work-header", "data-scroll-section": ""},
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
              h("li", {"className": "btn btn-link active"},
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
                    site.copy.workTitle.split('\n')[0]
                  ),
                  h("span", null,
                    site.copy.workTitle.split('\n').slice(1).join(' ')
                  )
                )
              )
            )
          )
        ),
        h("section", {"className": "section work-filters", "data-scroll-section": ""},
          h("div", {"className": "container once-in"},
            h("div", {"className": "filter-row"},
              h("div", {"className": "toggle-row"},
                h("div", {"className": "btn btn-normal all-btn active", "data-filter-all": "", "role": "button", "tabIndex": "0", "aria-pressed": "true"},
                  h("div", {"className": "btn-click magnetic", "data-strength": "25", "data-strength-text": "15"},
                    h("div", {"className": "btn-fill"}),
                    h("span", {"className": "btn-text"},
                      h("span", {"className": "btn-text-inner change"},
                        "All"
                      )
                    )
                  )
                ),
                site.categories.map((category) => h("div", {"className": 'btn btn-normal ' + category.id + '-btn', "data-category": category.id, "key": category.id, "role": "button", "tabIndex": "0", "aria-pressed": "false"},
                  h("div", {"className": "btn-click magnetic", "data-strength": "25", "data-strength-text": "15"},
                    h("div", {"className": "btn-fill"}),
                    h("span", {"className": "btn-text"},
                      h("span", {"className": "btn-text-inner change"},
                        category.label,
                        h("div", {"className": "count-nr"},
                          site.projects.filter(project => project.categories.includes(category.id)).length
                        )
                      )
                    )
                  )
                ))
              ),
              h("div", {"className": "grid-row"},
                h("div", {"className": "btn btn-normal btn-icon rows-btn active", "role": "button", "tabIndex": "0", "aria-pressed": "true"},
                  h("div", {"className": "btn-click magnetic", "data-strength": "25", "data-strength-text": "15"},
                    h("div", {"className": "btn-fill"}),
                    h("span", {"className": "btn-text"},
                      h("span", {"className": "btn-text-inner change"},
                        h("svg", {"style": {"width": "20px"}, "width": "20", "height": "19", "viewBox": "0 0 20 19"},
                          h("g", {"fill": "currentColor", "fillRule": "evenodd"},
                            h("path", {"d": "M0 6h20v1H0zM0 0h20v1H0zM0 12h20v1H0zM0 18h20v1H0z"})
                          )
                        )
                      )
                    )
                  )
                ),
                h("div", {"className": "btn btn-normal btn-icon columns-btn", "role": "button", "tabIndex": "0", "aria-pressed": "false"},
                  h("div", {"className": "btn-click magnetic", "data-strength": "25", "data-strength-text": "15"},
                    h("div", {"className": "btn-fill"}),
                    h("span", {"className": "btn-text"},
                      h("span", {"className": "btn-text-inner change"},
                        h("svg", {"style": {"width": "20px"}, "width": "20", "height": "20", "viewBox": "0 0 20 20"},
                          h("g", {"fill": "currentColor", "fillRule": "nonzero"},
                            h("path", {"d": "M8 0H0v8h8V0zM7 1v6H1V1h6zM8 12H0v8h8v-8zm-1 1v6H1v-6h6zM20 0h-8v8h8V0zm-1 1v6h-6V1h6zM20 12h-8v8h8v-8zm-1 1v6h-6v-6h6z"})
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        ),
        h("section", {"className": "section-wrap section-wrap-work once-in", "data-scroll-section": ""},
          h("section", {"className": "section work-grid small-work-grid grid-fade grid-rows-part visible"},
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
              h("ul", {"className": "work-items mouse-pos-list-image-wrap all-active"},
                site.projects.map((project, index) => h("li", {"className": "" + project.categories.join(' ') + ' visible', "key": project.slug, "data-project": project.slug, "data-categories": JSON.stringify(project.categories)},
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
                    ),
                    h("div", {"className": "flex-col animate"},
                      h("p", null,
                        project.roles.join(' & ')
                      )
                    ),
                    h("div", {"className": "flex-col animate"},
                      h("p", null,
                        project.year
                      )
                    )
                  )
                )),
                h("div", {"className": "stripe last animate"}),
                site.projects.length === 0 ? h('li', { role: 'status' }, site.copy.emptyWork) : null
              )
            )
          ),
          h("section", {"className": "section work-tiles grid-fade grid-columns-part"},
            h("div", {"className": "container"},
              h("ul", null,
                site.projects.map((project, index) => h("li", {"className": "" + project.categories.join(' ') + ' visible', "key": project.slug, "data-project": project.slug, "data-categories": JSON.stringify(project.categories)},
                  h("div", {"className": "single-tile-wrap"},
                    h("a", {"href": '/work/' + project.slug, "className": "row"},
                      h("div", {"className": "flex-col"},
                        h("div", {"className": "tile-image"},
                          h("div", {"className": "overlay overlay-color", "style": {"backgroundColor": "rgb(241, 241, 241)"}}),
                          h("div", {"className": "overlay overlay-image lazy", "style": {"backgroundPositionX": "center", "backgroundPositionY": "center", "backgroundRepeat": "no-repeat", "backgroundSize": "cover"}, "data-bg": project.thumbnail.src})
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
                site.projects.length === 0 ? h('li', { role: 'status' }, site.copy.emptyWork) : null
              )
            )
          )
        ),
        h("section", {"className": "section center-grid-btn center-grid-btn-archive", "data-scroll-section": ""},
          h("div", {"className": "container"},
            h("div", {"className": "grid-after-btn"},
              h("div", {"className": "btn btn-normal btn-dark"},
                h("a", {"href": "/archive", "className": "btn-click magnetic", "data-strength": "25", "data-strength-text": "15"},
                  h("div", {"className": "btn-fill"}),
                  h("span", {"className": "btn-text"},
                    h("span", {"className": "btn-text-inner change"},
                      "Archive",
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
