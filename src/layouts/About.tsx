import React, { createElement as h, Fragment } from 'react';
import type { LayoutProps } from './shared.ts';
import { layoutCopy, mediaFor, secondaryContact } from './shared.ts';
import { LoadingOverlay } from './loader.tsx';

// Browser-normalized reference structure; edit these ordinary React elements directly.
export function About({site, project, next, includeLoader = true}: LayoutProps) {
  const secondary = secondaryContact(site);
  const foundation = layoutCopy(site, 'about-foundation-title');
  return h(Fragment, null,
    h("div", {"className": "no-scroll-overlay"}),
    includeLoader ? h(LoadingOverlay, { site, label: "About" }) : null,
    h("main", {"className": "main", "id": "about", "data-barba": "container", "data-barba-namespace": "about"},
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
              h("li", {"className": "btn btn-link active"},
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
        h("header", {"className": "section default-header about-header", "data-scroll-section": ""},
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
              h("li", {"className": "btn btn-link active"},
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
                  h("span", null,
                    site.copy.aboutTitle.split('\n')[0]
                  ),
                  h("span", null,
                    site.copy.aboutTitle.split('\n').slice(1).join(' ')
                  )
                )
              )
            )
          )
        ),
        h("section", {"className": "section no-padding line-globe once-in", "data-scroll-section": ""},
          h("div", {"className": "container medium"},
            h("div", {"className": "row"},
              h("div", {"className": "flex-col"},
                h("div", {"className": "stripe"}),
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
            )
          )
        ),
        h("section", {"className": "section about-image once-in", "data-scroll-section": ""},
          h("div", {"className": "bottom-lightgray"}),
          h("div", {"className": "container"},
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
                h("p", {"data-scroll": "", "data-scroll-speed": "-1", "data-scroll-position": "top", "data-scroll-offset": "0%, -50%"},
                  site.copy.aboutIntro
                ),
                h("p", {"data-scroll": "", "data-scroll-speed": "-1", "data-scroll-position": "top", "data-scroll-offset": "0%, -50%"},
                  h("span", {"style": {"opacity": "0.5", "display": "block", "paddingTop": "0.5em"}},
                    "Always exploring",
                    h("span", {"className": "animate-dot"},
                      "."
                    ),
                    h("span", {"className": "animate-dot"},
                      "."
                    ),
                    h("span", {"className": "animate-dot"},
                      "."
                    )
                  )
                )
              ),
              h("div", {"className": "flex-col"},
                h("div", {"className": "single-about-image"},
                  h("div", {"className": "overlay overlay-image", "data-scroll": "", "data-scroll-speed": "-2", "data-scroll-position": "top"}),
                  h("div", {"className": "overlay"})
                )
              )
            )
          )
        ),
        h("section", {"className": "section about-services", "data-scroll-section": ""},
          h("div", {"className": "container"},
            h("div", {"className": "row"},
              h("div", {"className": "flex-col"},
                h("h2", null,
                  layoutCopy(site, 'about-pillars-heading') || 'I can help you with',
                  h("span", {"className": "animate-dot"},
                    "."
                  ),
                  h("span", {"className": "animate-dot"},
                    "."
                  ),
                  h("span", {"className": "animate-dot"},
                    "."
                  )
                )
              )
            ),
            h("div", {"className": "row"},
              h("div", {"className": "flex-col"},
                h("h5", null,
                  "01"
                ),
                h("div", {"className": "stripe"}),
                h("h4", null,
                  site.services[0]?.title
                ),
                h("p", null,
                  site.services[0]?.description
                )
              ),
              h("div", {"className": "flex-col"},
                h("h5", null,
                  "02"
                ),
                h("div", {"className": "stripe"}),
                h("h4", null,
                  site.services[1]?.title
                ),
                h("p", null,
                  site.services[1]?.description
                )
              ),
              h("div", {"className": "flex-col"},
                h("h5", null,
                  "03"
                ),
                h("div", {"className": "stripe"}),
                h("h4", null,
                  h("span", null,
                    h("svg", {"width": "100px", "height": "100px", "viewBox": "0 0 100 100", "version": "1.1", "xmlns": "http://www.w3.org/2000/svg", "xmlnsXlink": "http://www.w3.org/1999/xlink"},
                      h("title", null,
                        "Oval + Oval + Oval + Oval Mask"
                      ),
                      h("g", {"id": "Page-1", "stroke": "none", "strokeWidth": "1", "fill": "none", "fillRule": "evenodd"},
                        h("g", {"id": "Artboard", "transform": "translate(-468.000000, -671.000000)", "fill": "#FFFFFF"},
                          h("g", {"id": "Oval-+-Oval-+-Oval-+-Oval-Mask", "transform": "translate(468.000000, 671.000000)"},
                            h("path", {"d": "M99.1731586,50.0066986 C71.9402858,50.4482381 50,72.6619049 50,100 L50,100 L49.9933014,99.1731586 C49.5517619,71.9402858 27.3380951,50 0,50 L0,50 L0.826841425,49.9933014 C28.0597142,49.5517619 50,27.3380951 50,0 L50,0 L50.0066986,0.826841425 C50.4482381,28.0597142 72.6619049,50 100,50 L100,50 Z", "id": "Combined-Shape"})
                          )
                        )
                      )
                    )
                  ),
                  site.services[2]?.title
                ),
                h("p", null,
                  site.services[2]?.description
                )
              )
            )
          )
        ),
        h("section", {"className": "section about-awwwards", "data-scroll-section": ""},
          h("div", {"className": "container medium"},
            h("div", {"className": "row"},
              h("div", {"className": "flex-col"},
                h("div", {"className": "single-image"},
                  h("div", {"className": "overlay", "data-scroll": "", "data-scroll-speed": "-1", "style": {"backgroundImage": 'url(' + mediaFor(site, undefined, "about-secondary-image", '/placeholders/1600x1000.svg').src + ')'}}),
                  h("div", {"className": "overlay"})
                )
              ),
              h("div", {"className": "flex-col"},
                foundation ? h('div', { className: 'foundation-mark', 'aria-hidden': true }, 'E × M') : h("div", {"className": "awwwards-badge"},
                  h("svg", {"width": "102", "height": "101", "viewBox": "0 0 102 101"},
                    h("g", {"fill": "#999D9E", "fillRule": "evenodd"},
                      h("path", {"d": "M39.767 93.293c.393.425.65.947.771 1.569.122.62.072 1.3-.147 2.035-.22.736-.55 1.33-.993 1.782-.442.453-.944.75-1.506.888a3.16 3.16 0 0 1-1.697-.046 3.155 3.155 0 0 1-1.435-.89c-.392-.424-.65-.947-.77-1.567-.122-.621-.073-1.3.147-2.035.22-.736.551-1.33.993-1.783.442-.453.944-.75 1.505-.888a3.151 3.151 0 0 1 1.687.043 3.17 3.17 0 0 1 1.445.892m-2.91-.117c-.4.105-.762.334-1.084.69-.323.355-.573.83-.75 1.427-.18.596-.23 1.131-.156 1.604.075.474.251.864.528 1.171.276.306.623.523 1.041.648.417.125.826.134 1.225.03.4-.105.761-.334 1.084-.69.322-.353.573-.83.751-1.427.178-.596.23-1.132.155-1.605-.076-.474-.25-.864-.528-1.17a2.232 2.232 0 0 0-1.04-.647 2.237 2.237 0 0 0-1.227-.03M24.549 94.32l-3.606-2.355.46-.704 2.849 1.86 1.22-1.867-2.328-1.52.459-.704 2.329 1.52 1.833-2.805.755.493zM14.076 85.963l-2.865-3.216.628-.558 2.264 2.54 1.666-1.483-1.85-2.077.627-.56 1.851 2.077 2.502-2.23.6.674zM6.269 75.28l-.427-.794 6.398-3.44.428.797zM8.523 62.668c-.159.549-.477 1.036-.953 1.459-.476.424-1.102.727-1.876.908-.775.182-1.47.188-2.085.02-.615-.17-1.115-.464-1.502-.885a3.251 3.251 0 0 1-.778-1.481c-.164-.7-.12-1.332.131-1.896.252-.563.68-1.011 1.284-1.345l.417.777c-.432.25-.738.565-.92.945-.181.38-.212.823-.094 1.328.103.438.302.805.599 1.1.297.298.677.495 1.14.592.464.098.996.076 1.595-.064s1.085-.357 1.457-.65c.372-.293.625-.638.759-1.036.134-.397.15-.814.048-1.253-.118-.504-.343-.887-.674-1.147s-.745-.407-1.243-.44l.028-.88c.69.03 1.272.242 1.748.635.476.394.795.94.959 1.64a3.244 3.244 0 0 1-.04 1.673M0 50.804l7.264.068.008-.902-7.263-.069zM1.517 38.559l.214-.823 7.676-.654-.238.914-2.055.152-.695 2.672 1.722 1.133-.24.924-6.384-4.318zm4.716-.361-3.434.254 2.875 1.896.56-2.15zM5.975 26.94l.454-.78 5.55 3.234 1.656-2.841.727.423-2.111 3.622zM15.682 20.103a.609.609 0 0 1-.457-.165.625.625 0 0 1-.058-.901.628.628 0 0 1 .443-.224.628.628 0 0 1 .465.174.616.616 0 0 1 .215.436.628.628 0 0 1-.172.465.612.612 0 0 1-.436.215M21.572 9.366l.7-.483 6.235 4.525-.778.536-1.654-1.23-2.273 1.567.562 1.984-.787.541-2.005-7.44zm3.804 2.81-2.764-2.053.936 3.314 1.828-1.261zM31.592 3.705l.913-.28 3.161 5.218.001-5.383.754-.231 3.006 4.463-.294-6.096.903-.277.252 7.52-.873.267-2.962-4.39.024 5.29-.882.27zM50.677 7.362l.922.052 1.805-4.972 1.262 5.143.911.051L57.941.491 56.998.44l-1.833 5.822-1.278-5.226-.786-.045-1.862 5.051L50.076.053 49.123 0zM66.865 2.618 67.74 3l-.992 6.02 3.501-4.089.724.315-.62 5.345 3.742-4.822.865.377-4.698 5.876-.838-.365.605-5.26-3.421 4.033-.847-.369zM83.643 12.338l.643.558-2.827 7.165-.714-.619.778-1.909-2.084-1.809-1.78 1.037-.722-.626 6.706-3.797zm-1.773 4.384 1.298-3.188-2.974 1.732 1.676 1.456zM92.114 21.531l1.317 2.052c.363.565.504 1.093.425 1.584-.08.49-.376.9-.888 1.23-.43.276-.85.388-1.257.337-.407-.05-.782-.255-1.125-.61l-1.766 3.723-.544-.847 1.728-3.686-.616-.96-2.9 1.86-.487-.76 6.113-3.923zm-1.206 3.635c.221.343.46.556.717.637.258.081.541.023.85-.176.6-.384.677-.923.232-1.616l-.812-1.266-1.8 1.154.813 1.267zM98.695 34.374l.563 1.944c.172.591.19 1.17.058 1.733a3.07 3.07 0 0 1-.862 1.502c-.442.438-1.03.762-1.76.974-.731.211-1.4.25-2.008.116a3.083 3.083 0 0 1-1.53-.81 3.373 3.373 0 0 1-.877-1.498l-.561-1.944 6.977-2.017zm-5.645 3.598c.126.44.334.814.623 1.127.287.313.665.524 1.133.634.468.11 1.01.075 1.629-.104.617-.178 1.096-.439 1.431-.78.338-.343.544-.723.621-1.142a2.765 2.765 0 0 0-.075-1.285l-.274-.947-5.363 1.55.274.947zM94.306 49.604c.174-.337.412-.613.715-.83.302-.216.633-.356.992-.42l.47.744c-1.068.262-1.6.802-1.595 1.618.003.353.11.639.322.859.212.22.518.329.92.327.261-.002.485-.073.671-.212.185-.14.34-.313.463-.521.123-.21.273-.504.45-.885.225-.472.49-.845.795-1.12.306-.276.697-.414 1.174-.417.338-.003.642.075.913.233.27.157.482.374.636.65.153.275.231.586.234.932.003.478-.097.865-.298 1.164-.203.299-.493.532-.87.7l-.472-.733c.537-.225.804-.6.801-1.126-.002-.283-.09-.511-.263-.683a.852.852 0 0 0-.624-.256.998.998 0 0 0-.62.2 1.726 1.726 0 0 0-.432.497 8.178 8.178 0 0 0-.399.806c-.238.534-.517.948-.836 1.24-.32.293-.745.44-1.277.443a2.176 2.176 0 0 1-1.11-.268 1.929 1.929 0 0 1-.746-.753 2.23 2.23 0 0 1-.27-1.083c-.004-.401.082-.77.256-1.106M96.244 60.796a.614.614 0 0 1 .481-.076.622.622 0 0 1 .485.761.62.62 0 0 1-.771.482.608.608 0 0 1-.399-.277.625.625 0 0 1-.074-.49.613.613 0 0 1 .278-.4M91.014 68.24c.472-.177.969-.178 1.492-.004l-.216.908c-.38-.12-.71-.135-.986-.045-.276.089-.49.29-.64.602-.16.337-.187.656-.078.957.109.302.38.557.819.766l4.594 2.202-.386.805-4.51-2.162c-.7-.334-1.141-.765-1.326-1.291-.185-.526-.142-1.072.13-1.64.266-.555.635-.921 1.107-1.098M84.224 78.813a2.14 2.14 0 0 1 1.253-.117c.437.086.862.312 1.277.68l3.592 3.174-.598.677-3.631-3.21c-.373-.33-.768-.49-1.183-.479-.417.01-.803.218-1.161.622-.357.404-.516.813-.476 1.228.04.414.248.786.62 1.116l3.63 3.21-.597.677-3.592-3.177c-.414-.366-.69-.762-.826-1.188a2.175 2.175 0 0 1-.034-1.262c.114-.416.329-.803.646-1.16.32-.364.68-.627 1.08-.79M79.427 92.7l-2.071 1.286c-.571.355-1.101.488-1.59.401-.489-.087-.895-.388-1.217-.905-.27-.436-.376-.856-.319-1.262.057-.406.266-.778.626-1.116l-3.696-1.821.855-.531 3.66 1.783.97-.602-1.818-2.927.767-.477 3.833 6.171zm-3.617-1.259c-.346.215-.562.45-.648.707-.084.256-.03.54.163.852.376.605.914.69 1.613.256l1.279-.794-1.128-1.816-1.279.795zM62.587 92.627l.886 3.006-.901 4.571.965-.284.617-3.558 2.449 2.653.975-.288-3.24-3.35-.886-3.006zM54.211 97.34a.613.613 0 0 1 .211.438.618.618 0 0 1-.588.685.63.63 0 0 1-.473-.15.628.628 0 0 1-.213-.45.621.621 0 0 1 .6-.674.612.612 0 0 1 .463.151"})
                    )
                  ),
                  h("svg", {"width": "49", "height": "30", "viewBox": "0 0 49 30"},
                    h("path", {"d": "m37.068.118-4.8 26.632-5.577.734-6.588-15.95-2.236 17.112-5.577.734L.76 4.898l6.34-.835 6.873 16.944 2-18.112 5.883-.774 6.62 16.977L30.729.952l6.339-.834zm11.367 20.48c.32 2.434-1.264 4.499-3.698 4.82-2.434.32-4.5-1.265-4.821-3.699-.32-2.434 1.265-4.5 3.699-4.82 2.434-.32 4.5 1.265 4.82 3.699z", "fill": "#999D9E", "fillRule": "evenodd"})
                  )
                ),
                h("h2", null,
                  foundation || h(Fragment, null, 'Awwwards', h('br'), layoutCopy(site, 'about-h2-01'))
                ),
                h("p", null,
                  layoutCopy(site, "about-p-01")
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
