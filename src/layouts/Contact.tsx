import React, { createElement as h, Fragment } from 'react';
import type { LayoutProps } from './shared.ts';
import { layoutCopy, mediaFor } from './shared.ts';
import { LoadingOverlay } from './loader.tsx';

// Browser-normalized reference structure; edit these ordinary React elements directly.
export function Contact({site, project, next, includeLoader = true}: LayoutProps) {
  return h(Fragment, null,
    h("div", {"className": "no-scroll-overlay"}),
    includeLoader ? h(LoadingOverlay, { site, label: "Contact" }) : null,
    h("main", {"className": "main", "id": "contact", "data-barba": "container", "data-barba-namespace": "contact"},
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
              h("li", {"className": "btn btn-link active"},
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
        h("header", {"className": "section default-header contact-header theme-dark", "data-scroll-section": ""},
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
              h("li", {"className": "btn btn-link active"},
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
            h("div", {"className": "row once-in"},
              h("div", {"className": "flex-col"},
                h("h1", null,
                  h("span", null,
                    h("div", {"className": "profile-picture", "style": {"backgroundImage": 'url(' + mediaFor(site, undefined, 'profile-picture', site.identity.portrait?.src ?? '/placeholders/810x810.svg').src + ')'}}),
                    site.copy.contactTitle.split('\n')[0]
                  ),
                  h("span", null,
                    site.copy.contactTitle.split('\n').slice(1).join(' ')
                  )
                )
              ),
              h("div", {"className": "flex-col"},
                h("div", {"className": "profile-picture", "style": {"backgroundImage": 'url(' + mediaFor(site, undefined, 'profile-picture', site.identity.portrait?.src ?? '/placeholders/810x810.svg').src + ')'}}),
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
            ),
            h("div", {"className": "row once-in"},
              h("div", {"className": "flex-col"},
                h("form", {"className": "form", "encType": "multipart/form-data", "noValidate": true, "onSubmit": (event: React.FormEvent) => event.preventDefault()},
                  h("div", {"className": "website-field"},
                    h("label", {"className": "label", "htmlFor": "tel"},
                      "Phone Number"
                    ),
                    h("input", {"className": "field", "type": "text", "id": "form-tel", "name": "tel", "tabIndex": "-1"})
                  ),
                  h("div", {"className": "form-col"},
                    h("h5", null,
                      "01"
                    ),
                    h("label", {"className": "label", "htmlFor": "name"},
                      "What's your name?"
                    ),
                    h("input", {"className": "field", "type": "text", "id": "form-name", "name": "name", "defaultValue": "", "required": true, "placeholder": "Your name *"})
                  ),
                  h("div", {"className": "form-col"},
                    h("h5", null,
                      "02"
                    ),
                    h("label", {"className": "label", "htmlFor": "email"},
                      "What's your email?"
                    ),
                    h("input", {"className": "field", "type": "email", "id": "form-email", "name": "email", "defaultValue": "", "required": true, "placeholder": "you@example.com *"})
                  ),
                  h("div", {"className": "form-col"},
                    h("h5", null,
                      "03"
                    ),
                    h("label", {"className": "label", "htmlFor": "email"},
                      "What's the name of your organization?"
                    ),
                    h("input", {"className": "field", "type": "text", "id": "form-company", "name": "company", "defaultValue": "", "required": true, "placeholder": "Your name *"})
                  ),
                  h("div", {"className": "form-col"},
                    h("h5", null,
                      "04"
                    ),
                    h("label", {"className": "label", "htmlFor": "email"},
                      "What services are you looking for?"
                    ),
                    h("input", {"className": "field", "type": "text", "id": "form-service", "name": "service", "defaultValue": "", "required": true, "placeholder": "Web Design, Web Development ..."})
                  ),
                  h("div", {"className": "form-col"},
                    h("h5", null,
                      "05"
                    ),
                    h("label", {"className": "label", "htmlFor": "message"},
                      "Your message"
                    ),
                    h("textarea", {"className": "field", "type": "text", "id": "form-message", "name": "message", "rows": "8", "required": true, "placeholder": "Hello, can you help me with my project? *"})
                  ),
                  h("div", {"className": "btn-contact-send"},
                    h("div", {"className": "btn btn-round", "data-scroll": "", "data-scroll-speed": "2", "data-scroll-offset": "-50%, 0%"},
                      h("div", {"className": "btn-click magnetic", "data-strength": "100", "data-strength-text": "50"},
                        h("div", {"className": "btn-fill"}),
                        h("span", {"className": "btn-text"},
                          h("input", {"type": "submit", "name": "submit", "value": "Send it!", "className": "form-btn"})
                        )
                      )
                    )
                  )
                )
              ),
              h("div", {"className": "flex-col"},
                h("h5", null,
                  "Contact Details"
                ),
                h("ul", {"className": "links-wrap"},
                  h("li", {"className": "btn btn-link btn-link-external"},
                    h("a", {"href": site.contact?.email ? 'mailto:' + site.contact.email : '#', "className": "btn-click magnetic", "data-strength": "20", "data-strength-text": "10"},
                      h("span", {"className": "btn-text"},
                        h("span", {"className": "btn-text-inner"},
                          site.contact?.email ?? ''
                        )
                      )
                    )
                  ),
                  h("li", {"className": "btn btn-link btn-link-external"},
                    h("a", {"href": site.contact?.phone ? 'tel:' + site.contact.phone.replace(/\s/g, '') : '#', "className": "btn-click magnetic", "data-strength": "20", "data-strength-text": "10"},
                      h("span", {"className": "btn-text"},
                        h("span", {"className": "btn-text-inner"},
                          site.contact?.phone ?? ''
                        )
                      )
                    )
                  )
                ),
                h("h5", null,
                  "Business Details"
                ),
                h("ul", {"className": "links-wrap"},
                  h("li", null,
                    h("p", null,
                      layoutCopy(site, "contact-p-01")
                    )
                  ),
                  h("li", null,
                    h("p", null,
                      layoutCopy(site, "contact-p-02")
                    )
                  ),
                  h("li", null,
                    h("p", null,
                      layoutCopy(site, "contact-p-03")
                    )
                  ),
                  h("li", null,
                    h("p", null,
                      layoutCopy(site, "contact-p-04")
                    )
                  )
                ),
                h("h5", null,
                  "Socials"
                ),
                h("ul", {"className": "links-wrap"},
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
