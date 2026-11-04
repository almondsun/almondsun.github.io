import React, { createElement as h, Fragment } from 'react';
import type { LayoutProps } from './shared.ts';
import { layoutCopy, mediaFor } from './shared.ts';
import { LoadingOverlay } from './loader.tsx';

// Browser-normalized reference structure; edit these ordinary React elements directly.
export function Case09({site, project, next, includeLoader = true}: LayoutProps) {
  return h(Fragment, null,
    h("div", {"className": "no-scroll-overlay"}),
    includeLoader ? h(LoadingOverlay, { site, label: project.title }) : null,
    h("main", {"className": "main", "id": "work-single", "data-barba": "container", "data-barba-namespace": "work-single"},
      h("div", {"className": "mouse-pos-list-image no-select"}),
      h("div", {"className": "mouse-pos-list-btn no-select"}),
      h("div", {"className": "mouse-pos-list-span no-select"},
        h("p", null,
          "Next case"
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
        h("section", {"className": "section case-top-wrap "},
          h("header", {"className": "section default-header case-header", "data-scroll-section": ""},
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
            h("div", {"className": "container medium once-in"},
              h("div", {"className": "row"},
                h("div", {"className": "flex-col"},
                  h("h1", null,
                    project?.title ?? ''
                  )
                )
              )
            )
          ),
          h("section", {"className": "section case-intro once-in", "data-scroll-section": ""},
            h("div", {"className": "container medium"},
              h("div", {"className": "row"},
                h("div", {"className": "flex-col"},
                  h("h5", null,
                    "Role / Services"
                  ),
                  h("div", {"className": "stripe"}),
                  h("li", null,
                    h("p", null,
                      project.roles.join(' & ')
                    )
                  )
                ),
                h("div", {"className": "flex-col"},
                  h("h5", null,
                    "Credits"
                  ),
                  h("div", {"className": "stripe"}),
                  h("li", null,
                    h("p", null,
                      project.credits?.[0] ?? 'Your credit'
                    )
                  )
                ),
                h("div", {"className": "flex-col"},
                  h("h5", null,
                    "Location & year"
                  ),
                  h("div", {"className": "stripe"}),
                  h("li", null,
                    h("p", null,
                      project.location ?? 'Your location'
                    )
                  ),
                  h("li", null,
                    h("p", null,
                      project.year
                    )
                  )
                )
              )
            )
          ),
          h("section", {"className": "section case-intro-image once-in block-padding-bottom ", "data-scroll-section": ""},
            h("div", {"className": "container"},
              h("div", {"className": "row"},
                h("div", {"className": "flex-col"},
                  h("div", {"className": "btn-wrap theme-dark"},
                    h("div", {"className": "btn btn-round", "data-scroll": "", "data-scroll-speed": "2", "data-scroll-position": "top"},
                      h("a", {"href": project?.externalUrl ?? 'https://example.com', "target": "_blank", "className": "btn-click magnetic ", "data-strength": "100", "data-strength-text": "50"},
                        h("div", {"className": "btn-fill"}),
                        h("span", {"className": "btn-text"},
                          h("span", {"className": "btn-text-inner"},
                            "Live site",
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
                        )
                      )
                    )
                  ),
                  h("div", {"className": "single-image"},
                    h("img", {"className": "overlay lazy", "data-scroll": "", "data-scroll-speed": "-1", "src": mediaFor(site, project, "image-1", "/placeholders/1600x1000.svg").src, "data-src": mediaFor(site, project, "image-1", "/placeholders/1600x1000.svg").src, "alt": mediaFor(site, project, "image-1", "/placeholders/1600x1000.svg").alt}),
                    h("img", {"className": "overlay overlay-image-top lazy", "data-src": mediaFor(site, project, "image-2", "/placeholders/1600x1000.svg").src})
                  )
                )
              )
            )
          )
        ),
        h("section", {"className": "section single-block block-device block_0 block-padding-bottom ", "style": {"backgroundColor": "rgb(216, 213, 204)"}, "data-scroll-section": ""},
          h("div", {"className": "container"},
            h("div", {"className": "row device-macprohigher"},
              h("div", {"className": "flex-col"},
                h("div", {"className": "device"},
                  h("div", {"className": "single-image"},
                    h("div", {"className": "overlay overlay-image playpauze"},
                      h("video", {"className": "overlay", "src": mediaFor(site, project, "video-3").src || undefined, "loop": true, "muted": true, "playsInline": true, "poster": mediaFor(site, project, "video-3", "/placeholders/1600x1000.svg").poster ?? "/placeholders/1600x1000.svg"})
                    )
                  ),
                  h("div", {"className": "overlay-device-image"},
                    h("div", {"className": "overlay overlay-device", "style": {"backgroundImage": "url(\"/assets/img/device-macpro-higher.png\")", "backgroundPositionX": "center", "backgroundPositionY": "center", "backgroundRepeat": "no-repeat", "backgroundAttachment": "initial", "backgroundOrigin": "initial", "backgroundClip": "initial", "backgroundColor": "initial", "backgroundSize": "cover"}})
                  )
                )
              )
            )
          )
        ),
        h("section", {"className": "section single-block block-mobile-devices block_1", "data-scroll-section": ""},
          h("div", {"className": "container no-padding block-padding-sides amount-3"},
            h("div", {"className": "row device-iphone13nonotch"},
              h("div", {"className": "flex-col block-padding-bottom"},
                h("div", {"className": "device", "data-scroll": "", "data-scroll-target": ".block_1", "data-scroll-speed": "-1"},
                  h("div", {"className": "single-image"},
                    h("div", {"className": "overlay overlay-image playpauze"},
                      h("video", {"className": "overlay", "src": mediaFor(site, project, "video-4").src || undefined, "loop": true, "muted": true, "playsInline": true, "poster": mediaFor(site, project, "video-4", "/placeholders/1600x1000.svg").poster ?? "/placeholders/1600x1000.svg"})
                    )
                  ),
                  h("div", {"className": "overlay-device-image"},
                    h("div", {"className": "overlay overlay-device", "style": {"backgroundImage": "url(\"/assets/img/device-iphone13-nonotch.png\")", "backgroundPositionX": "center", "backgroundPositionY": "center", "backgroundRepeat": "no-repeat", "backgroundAttachment": "initial", "backgroundOrigin": "initial", "backgroundClip": "initial", "backgroundColor": "initial", "backgroundSize": "cover"}})
                  )
                )
              ),
              h("div", {"className": "flex-col block-padding-bottom"},
                h("div", {"className": "device"},
                  h("div", {"className": "single-image"},
                    h("img", {"className": "overlay overlay-image lazy", "src": mediaFor(site, project, "image-5", "/placeholders/540x1170.svg").src, "data-src": mediaFor(site, project, "image-5", "/placeholders/540x1170.svg").src, "width": "540", "height": "1170", "alt": mediaFor(site, project, "image-5", "/placeholders/540x1170.svg").alt})
                  ),
                  h("div", {"className": "overlay-device-image"},
                    h("div", {"className": "overlay overlay-device", "style": {"backgroundImage": "url(\"/assets/img/device-iphone13-nonotch.png\")", "backgroundPositionX": "center", "backgroundPositionY": "center", "backgroundRepeat": "no-repeat", "backgroundAttachment": "initial", "backgroundOrigin": "initial", "backgroundClip": "initial", "backgroundColor": "initial", "backgroundSize": "cover"}})
                  )
                )
              ),
              h("div", {"className": "flex-col block-padding-bottom"},
                h("div", {"className": "device", "data-scroll": "", "data-scroll-target": ".block_1", "data-scroll-speed": "1"},
                  h("div", {"className": "single-image"},
                    h("div", {"className": "overlay overlay-image playpauze"},
                      h("video", {"className": "overlay", "src": mediaFor(site, project, "video-6").src || undefined, "loop": true, "muted": true, "playsInline": true, "poster": mediaFor(site, project, "video-6", "/placeholders/1600x1000.svg").poster ?? "/placeholders/1600x1000.svg"})
                    )
                  ),
                  h("div", {"className": "overlay-device-image"},
                    h("div", {"className": "overlay overlay-device", "style": {"backgroundImage": "url(\"/assets/img/device-iphone13-nonotch.png\")", "backgroundPositionX": "center", "backgroundPositionY": "center", "backgroundRepeat": "no-repeat", "backgroundAttachment": "initial", "backgroundOrigin": "initial", "backgroundClip": "initial", "backgroundColor": "initial", "backgroundSize": "cover"}})
                  )
                )
              )
            )
          )
        ),
        h("section", {"className": "section single-block block-device block_2 block-padding-bottom ", "style": {"backgroundColor": "rgb(216, 213, 204)"}, "data-scroll-section": ""},
          h("div", {"className": "container"},
            h("div", {"className": "row device-ipadpro"},
              h("div", {"className": "flex-col"},
                h("div", {"className": "device"},
                  h("div", {"className": "single-image"},
                    h("div", {"className": "overlay overlay-image playpauze"},
                      h("video", {"className": "overlay", "src": mediaFor(site, project, "video-7").src || undefined, "loop": true, "muted": true, "playsInline": true, "poster": mediaFor(site, project, "video-7", "/placeholders/1600x1000.svg").poster ?? "/placeholders/1600x1000.svg"})
                    )
                  ),
                  h("div", {"className": "overlay-device-image"},
                    h("div", {"className": "overlay overlay-device", "style": {"backgroundImage": "url(\"/assets/img/device-ipad-pro-lower.png\")", "backgroundPositionX": "center", "backgroundPositionY": "center", "backgroundRepeat": "no-repeat", "backgroundAttachment": "initial", "backgroundOrigin": "initial", "backgroundClip": "initial", "backgroundColor": "initial", "backgroundSize": "cover"}}),
                    h("img", {"className": "overlay overlay-pencil lazy", "data-scroll": "", "data-scroll-speed": "1.5", "data-src": "/assets/img/device-apple-pencil.png"})
                  )
                )
              )
            )
          )
        ),
        h("div", {"className": "footer-rounded-div", "data-scroll-section": ""},
          h("div", {"className": "rounded-div-wrap"},
            h("div", {"className": "rounded-div", "style": {"backgroundColor": "rgb(216, 213, 204)"}})
          )
        ),
        h("div", {"className": "footer-wrap footer-case-wrap theme-dark", "data-scroll-section": ""},
          h("section", {"className": "section footer", "data-scroll": "", "data-scroll-speed": "-4", "data-scroll-position": "bottom", "data-scroll-offset": "-25%, 0%"},
            h("div", {"className": "container medium"},
              h("a", {"href": '/work/' + next.slug, "className": "row next-case-btn"},
                h("div", {"className": "flex-col"},
                  h("p", null,
                    "Next case"
                  ),
                  h("h2", null,
                    next?.title ?? ''
                  )
                ),
                h("div", {"className": "tile-image-wrap"},
                  h("div", {"className": "tile-image"},
                    h("div", {"className": "overlay overlay-image lazy", "data-scroll": "", "data-scroll-speed": "2.5", "data-scroll-position": "bottom", "style": {"backgroundColor": "var(--color-lightgray)", "backgroundPositionX": "center", "backgroundPositionY": "center", "backgroundRepeat": "no-repeat", "backgroundSize": "cover"}, "data-bg": next.thumbnail.src})
                  )
                )
              ),
              h("div", {"className": "row"},
                h("div", {"className": "flex-col"},
                  h("div", {"className": "stripe"})
                )
              ),
              h("div", {"className": "row"},
                h("div", {"className": "flex-col"},
                  h("div", {"className": "btn btn-normal"},
                    h("a", {"href": "/work", "className": "btn-click magnetic", "data-strength": "25", "data-strength-text": "15"},
                      h("div", {"className": "btn-fill"}),
                      h("span", {"className": "btn-text"},
                        h("span", {"className": "btn-text-inner change"},
                          "All work",
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
                        h("a", {"href": project?.externalUrl ?? 'https://example.com', "target": "_blank", "className": "btn-click magnetic", "data-strength": "20", "data-strength-text": "10"},
                          h("span", {"className": "btn-text"},
                            h("span", {"className": "btn-text-inner"},
                              "Awwwards"
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
        ),
        h("style", null,
          ".block-fullwidth {background: #000;}"
        )
      )
    )
  );
}
