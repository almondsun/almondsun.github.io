# Motion lifecycle

## Route ownership

`main.tsx` owns one persistent original `.loading-container` outside the transformed scroll root. The renderer is mounted with `includeLoader={false}`. Route motion never creates a second cold loader.

`createTransitions` serializes cover → commit → reveal. A new request replaces the pending destination during cover; requests during reveal start the next cycle only after the current reveal finishes. Disposal invalidates queued work and prevents late commits. The Router URL and displayed route are intentionally separate: click navigation updates history only when covered; browser history changes wait for cover before replacing the displayed page.

Normal navigation covers in500ms with Power4.in; its upper10vh cap grows concurrently over400ms on both breakpoints. React mounts the destination under cover, then resumes the choreography. The continuation reveals words after50ms (opacity0→1, y0→−50 over800ms, Power4.out), starts curtain exit650ms after mount (800ms, Power3.inOut), fades words650–1250ms, resets the upper cap at850ms and collapses the lower cap850–1700ms. A slow mount extends coverage, never exposes unmounted content.

Incoming content is positioned immediately at50vh desktop/20vh mobile. Its1s Expo.out entry starts800ms after mount, stagger50ms. Entry and overlay are independent tracks: unlocking the settled overlay does not wait for every staggered item. There is no extra500ms covered hold.
Route hooks, observers, media, clocks and ScrollTriggers belong to `mountMotion` and `mountInteractions` and are disposed before the next route mounts. The transition owner manages focus, cursor, scroll lock, preference changes and unmount cancellation. Reduced motion bypasses animated cover/reveal and uses native scrolling; contact remains a local simulation.

## Scroll and interaction contracts

Desktop fine-pointer wheel events normalize pixel/line/page units and apply an observed 0.08 gain before ScrollSmoother interpolation. Editable fields, nested scroll containers, zoom, touch and reduced motion retain native input. This gain needs browser displacement verification against the original, not just unit testing.

Parallax reads `data-scroll-direction` (`horizontal` → x), speed, position and offsets. Floating previews follow the canonical rendered collection order rather than the filtered row index. Filters use `data-categories` JSON and category controls, with legacy classes only as a fallback. Original fade class sequencing switches membership/view at 300ms and clears entry state at 700ms; timers are aborted on route disposal and revisions suppress stale rapid switches.

## Focused verification

Run `node --test tests/transitions.test.ts` for ordering, latest destination, disposal, reveal serialization, wheel units and axis selection. Integration verification must additionally exercise actual browser history, rapid clicks, wheel displacement, loader geometry, filter/grid fades, keyboard navigation, reduced-motion changes, and mobile. Unit checks do not certify visual or timing parity.

## Transition labels

`resolvePage()` exposes a short `transitionLabel` independently of its existing document `title`. Fixed routes use Home, Work, About, Contact, Archive, Styleguide, Success and Error; project routes use the editable project title. Changing a heading or document title does not lengthen the loading label.

## Cold profiles

Home does not reuse navigation entry. Its words fade in500–1300ms at y−50. With nine greetings the screen exits2320–3120ms (Power4.inOut), content begins2520ms (1500ms, stagger70ms, Expo.out), words fade2520–2820ms and the lower cap collapses2320–3320ms (Power4.inOut). Content starts50vh desktop/10vh mobile. For n greetings, exit is1120+150×(n−1)ms; empty input uses Home, and one word remains safe. The first word is initially selected, successive nonfinal words switch from900ms at150ms intervals and the last switches at910+150×(n−1)ms.

Direct internal-page loads show their short label immediately. Screen exit500–1300ms, entry700ms (1000ms/stagger50ms,50vh desktop/10vh mobile), word fade700–1000ms and lower-cap collapse500–1500ms. Both cold profiles use a10vh desktop/5vh mobile lower cap.

`tests/choreography.test.ts` seeks actual paused GSAP timelines on plain numeric targets, asserting intermediate opacity/position values as well as exact track timings. Browser comparison is still necessary for CSS-unit conversion, React mount cost and rendering.

## Mount and transform ownership regressions

React layout work can run between GSAP ticks. Overlay continuations and entry tracks are therefore created together in a fresh animation frame, after the destination is mounted. Their delays do not inherit a pre-mount ticker timestamp. Pending frame callbacks are cancelled on disposal or a switch to reduced motion.

`mountMotion` accepts an optional fourth `entrySettled` promise without changing its callable cleanup return. Parallax on a `.once-in` element is installed only after that element's route entry settles; other parallax tracks retain their existing setup. Cleanup/reduced-motion checks reject late setup after disposal. This prevents font/ScrollTrigger refreshes from overwriting the cold hero's entry transform.

A committed browser regression probe exercises the gray hero during cold reveal and a synthetic250ms React layout delay. With the installed official CLI and an isolated loopback preview:

```sh
playwright cli -s=choreography-check open http://127.0.0.1:5173/
playwright cli -s=choreography-check run-code --filename=tests/browser/choreography.cjs
playwright cli -s=choreography-check close
```

The probe refuses non-loopback targets. It does not deliver forms, navigate to external services or change application files.

Normal navigation also records monotonic coverage and layout-commit timestamps. Both tracks compensate the same post-mount setup time, rooted at the later of full coverage and actual layout commit. Physical mount latency is reported separately, not recovered on the curtain alone: doing so would break matched-curtain entry geometry. A destination ready after the planned curtain exit instead receives a complete covered reveal. Content entry holds at least800ms after its actual layout commit. Cold profiles are unchanged.

The callable interaction cleanup also exposes `closeForNavigation()`. The persistent route owner invokes it at coverage start: desktop (>540px) clears drawer/button and ARIA state without restoring focus to the outgoing control or releasing the navigation scroll lock. Mobile retains the drawer on its outgoing page. Escape/backdrop/manual close retain their original focus behavior. `tests/browser/menu-transition.cjs` verifies both breakpoints with visible controls and real pointer clicks.

Covered route commits use React `flushSync` to update displayed content and router location together after full coverage. This removes an avoidable concurrent-render scheduling gap without moving entry before the actual layout commit or bypassing the covered mount barrier.
