# McKay High School Orchestras

A working React / Next.js website concept with a charcoal-and-forest-green design, authentic performance imagery, and interactive 3D ensemble stages.

## Run locally

Node 22.13 or later is required.

```sh
npm install
npx next dev --hostname 127.0.0.1
```

Open http://127.0.0.1:3000. For a production export, run `npx next build`; the deployable static site is written to `out/`. This project retains the Sites starter's optional Vinext/Worker scripts, but the delivered preview and static export use Next.js directly. Use the commands above for this implementation.

## Recommended stack and architectural choices

- **Next.js App Router + React 19 + TypeScript:** Server-rendered pages, prerendered ensemble routes, shared persistent layout, and typed content. A static export keeps the current presentation site inexpensive and easy to host. If authenticated editing or server APIs are added, remove `output: 'export'` and deploy the server version.
- **Tailwind CSS 4 + custom theme tokens:** Tailwind utilities and one responsive stylesheet define forest-green surfaces, restrained glass effects, typography, responsive grids, and reduced-motion behavior.
- **Three.js + React Three Fiber + Drei:** Real WebGL chair geometry, lights, shadows, pointer raycasting, and constrained orbit controls. Fiber is the React renderer; Drei supplies camera interaction. The stage is dynamically imported with SSR disabled so the homepage does not load the 3D renderer.
- **Radix / installed Shadcn primitives:** Accessible donation and calendar dialogs, plus a progress indicator with semantic state. A DOM legend duplicates all section counts for keyboards, touch, screen readers, and devices without WebGL.
- **Native HTML video and audio:** Background video uses muted autoplay, inline playback, a pause control, and reduced-motion detection. The shared root layout keeps the audio player mounted during client-side navigation. No audio plays before user interaction.
- **Existing Google Calendar + X embed:** The school's seven calendar sources are carried over. X loads on request, with a direct account link when its embed is blocked. Calendar subscriptions use Google links and public ICS feeds; individual sample events demonstrate Google prefilled-event links and Apple/Outlook ICS downloads.
- **Existing PayPal donation destination:** The preview links to the school's real hosted button. A production campaign total should come from a server-owned ledger, updated by verified payment webhooks, never from clicks or client storage.

For production editing, a small headless CMS such as Sanity or a district-approved CMS can own ensembles, concert listings, media, campaign descriptions, and approved logos. Keep payment secrets and social API credentials on the server. The preview does not require a CMS or user accounts.

## Source structure

```text
app/
  layout.tsx                     Shared metadata, styles, persistent audio
  page.tsx                       Homepage entry
  globals.css                    Theme, layout, responsive and motion rules
  ensembles/[slug]/page.tsx       Five generated ensemble routes
  resources/[slug]/page.tsx       Handbook, elementary, contact, auction, donation, calendar
components/orchestra/
  HomePage.tsx                    Header, welcome, concert promotion, ensemble cards, footer
  Features.tsx                    Video, audio, live calendar, ICS actions, fundraising, social
  EnsemblePage.tsx                Ensemble page and lazy-loaded WebGL boundary
  Orchestra3DSeating.tsx          Data-to-chair layout, scene, hover isolation, accessible legend
  ResourcePage.tsx                Original-content links and seven calendar subscriptions
components/ui/                   Existing accessible UI primitives
lib/orchestra-data.ts            Ensemble data, sample concerts, media and integration settings
public/
  favicon.svg                    Site-specific favicon
.openai/hosting.json             Sites identity and static output configuration
next.config.ts                   Static export and project root
```

## 3D component logic

`Section` supplies `id`, `name`, `color`, and `count`. `createSeats()` produces one `Seat` per musician with a stable ID, section ID, 3D position, and rotation. Three chairs per curved row stay separated; the chairs face the conductor's podium. These are illustrative layouts, not official student rosters. For exact seating, replace generated positions with director-maintained seat records while retaining the same `Seat` interface.

Each `Chair` group owns a seat, back, and four legs. Pointer events stop propagation to avoid selecting chairs behind the nearest hit. Hover sets a temporary section; clicking/tapping pins a selection. All chairs outside the active section change to a dark neutral material. The HTML overlay reads the same section data to show the section's name and member count. Focusable buttons provide equivalent selection without a mouse. Reset clears selection and restores the camera.

The canvas uses `frameloop="demand"`, capped pixel density, a simple stage mesh, and one shadow-casting light. It redraws on interaction instead of running continuously. An error boundary and Canvas fallback preserve usable section counts if WebGL fails. For hundreds or thousands of musicians, use instanced chair geometry and update per-instance colors; the current 24–40-player examples favor readable foundational code.

## Live connections and remaining assets

Already connected from the official program homepage:

- Eventbrite Bach & Mendelssohn listing; check organizer availability before advertising a current date.
- Givebutter silent auction; its link contains May 1 and may represent a previous campaign.
- PayPal hosted donation button.
- Seven published Google Calendar sources, their Google/Apple subscription links, and the official X account.
- Current handbook, elementary program, and contact pages remain accessible at their original official destinations. Their content has not been copied or invented.

Configure these fields in `lib/orchestra-data.ts` when approved assets are available:

```ts
heroVideoUrl: '/media/orchestra-hero.mp4',
tracks: [
  {
    title: 'Approved performance title',
    subtitle: 'McKay · State competition',
    url: '/media/approved-recording.mp3',
  },
],
```

The source intentionally leaves these fields empty: no approved school video or audio was supplied. The homepage displays an authentic performance photo; the audio player clearly says recordings are coming soon. Do not label unrelated stock music as a McKay performance. Optimize video to a short muted 1080p loop and serve a compressed poster image; provide public HTTPS media or files in `public/media/`.

The $1,200 / $5,000 campaign and all ensemble counts are samples. The optional sample-concert calendar actions are explicitly labeled. The live embedded calendar is the default. A donation click triggers a visual celebration and opens an explanatory dialog; it does not increase the fundraising total or claim that payment succeeded. To make totals live, implement server-side verified, idempotent PayPal webhook processing, refunds, and a read-only campaign summary endpoint. The linked hosted button cannot confirm payments to this static frontend.

Background video, audio playback, live social embed, and public calendar subscriptions depend on approved media or third-party availability. The implementation contains their integration code, but empty media fields do not imply that these assets were migrated.

## Accessibility and privacy

Visible focus rings, semantic headings, accessible dialogs, named controls, section counts outside WebGL, touch selection, reduced-motion styles, and a no-autoplay audio policy are included. Student names and personal roster information are intentionally absent from this public concept. Color is reinforced by instrument names and counts. Review the final approved media, branding, contrast, and content with the school before public launch.

## Sources

- Program copy and integration links: https://www.mckayorchestras.com/
- Performance photo source: https://www.stephanieannboyd.com/alex-figueroa-mckay-high-school-orchestras-50-state-string-orchestra-project
- React Three Fiber canvas: https://r3f.docs.pmnd.rs/api/canvas
- React Three Fiber pointer events: https://r3f.docs.pmnd.rs/api/events

The performance image is an authentic McKay photo on the source page above; no reuse license was stated there. Obtain school/photographer approval or replace it with a school-supplied asset before a public launch. The private concept does not represent a completed content/rights review.

All six requested affiliation logos and the original violin-outline McKay header logo were migrated from the original public site into `public/branding/`. They are displayed with their original colors and accessible names.
