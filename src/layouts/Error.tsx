import React, { createElement as h, Fragment } from 'react';
import type { LayoutProps } from './shared.ts';
import { layoutCopy, mediaFor } from './shared.ts';
import { LoadingOverlay } from './loader.tsx';

// Browser-normalized reference structure; edit these ordinary React elements directly.
export function Error({site, project, next, includeLoader = true}: LayoutProps) {
  return h(Fragment, null,
    h("div", {"className": "no-scroll-overlay"}),
    includeLoader ? h(LoadingOverlay, { site, label: "Error" }) : null,
    h("main", {"className": "main", "id": "error", "data-barba": "container", "data-barba-namespace": "error"},
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
        h("header", {"className": "section default-header error-header full-height theme-dark", "data-scroll-section": ""},
          h("div", {"className": "overlay overlay-video"},
            h("video", {"className": "overlay lazy", "src": mediaFor(site, undefined, "error-video-1").src || undefined, "autoPlay": true, "loop": true, "muted": true, "playsInline": true, "poster": mediaFor(site, undefined, "error-video-1", "/placeholders/1600x1000.svg").poster ?? "/placeholders/1600x1000.svg"})
          ),
          h("div", {"className": "overlay overlay-dark"}),
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
              h("div", {"className": "flex-col"},
                h("h1", {"className": "once-in"},
                  h("span", null,
                    site.copy.errorTitle
                  ),
                  h("span", null,
                    site.copy.errorBody
                  )
                ),
                h("p", {"className": "once-in"},
                  layoutCopy(site, "error-p-01")
                ),
                h("div", {"className": "stripe once-in"}),
                h("div", {"className": "btn-row once-in"},
                  h("div", {"className": "btn btn-round"},
                    h("a", {"href": "", "className": "btn-click magnetic", "data-strength": "100", "data-strength-text": "50"},
                      h("div", {"className": "btn-fill"}),
                      h("span", {"className": "btn-text"},
                        h("span", {"className": "btn-text-inner"},
                          "Back to home"
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        ),
        h("footer", {"className": "section footer footer-contact theme-dark", "data-scroll-section": ""},
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
        )
      )
    )
  );
}
