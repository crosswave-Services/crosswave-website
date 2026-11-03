# CROSSWAVE web (React + TypeScript + Tailwind + shadcn/ui)

This folder holds the React version of the CROSSWAVE header and hero (`hero-01`). It sits next to the existing static website in the repository root and does not change it.

## Stack

| Requirement | How it's set up here |
|---|---|
| TypeScript | `tsconfig.json` (strict). The `@/*` import alias points to `src/*` |
| Tailwind CSS | Tailwind 3.4 with `tailwind.config.ts`, `postcss.config.js`, `src/index.css` and `tailwindcss-animate` |
| shadcn/ui structure | `components.json`, `src/lib/utils.ts` (`cn` helper), components in `src/components/ui` |
| Build tool | Vite 5 + React 18 |

## Run it

```bash
cd web
```

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:5173.
- `/` shows the React header, hero and sector slider.
- `/index.html`, `/about.html`, `/service.html` and the other pages are the existing static site. A small Vite plugin in `vite.config.ts` serves them in dev and preview, so every link in the new header works locally.

Other scripts:

```bash
npm run build
```

```bash
npm run typecheck
```

## Default paths

| What | Path | Alias |
|---|---|---|
| UI components | `src/components/ui/` | `@/components/ui` |
| Other components | `src/components/` | `@/components` |
| Utilities | `src/lib/utils.ts` | `@/lib/utils` |
| Global styles / theme tokens | `src/index.css` | — |
| Static assets (logo, favicon) | `public/` | served from `/` |

### Why `components/ui` matters

The shadcn CLI (`npx shadcn@latest add <component>`) writes every component into the folder set by `aliases.ui` in `components.json`, which is `@/components/ui` here. Components also import each other through that path. For example, `hero-01.tsx` imports `@/components/ui/hero-01-utils/header`, and the header imports `@/components/ui/button` and `@/components/ui/sheet`. If the folder or alias were different, those imports would break and newly added shadcn components would land somewhere else. Keeping `src/components/ui` also keeps generated primitives (button, sheet, input…) separate from page-level components you write yourself.

## Files in `src/components/ui`

| File | Source |
|---|---|
| `button.tsx`, `sheet.tsx`, `input.tsx`, `label.tsx`, `navigation-menu.tsx` | shadcn/ui, copied unchanged |
| `hero-01.tsx` | The supplied component, with the demo data replaced by CROSSWAVE's menu, service imagery and sectors |
| `demo.tsx` | Supplied demo wrapper (rendered by `src/main.tsx`) |
| `hero-01-utils/header.tsx` | Logo, desktop navigation menu with the Services mega-menu, and a mobile `Sheet` menu |
| `hero-01-utils/hero.tsx` | CROSSWAVE hero copy, CTAs and a quick-start consultation field |
| `hero-01-utils/brand-slider.tsx` | Infinite marquee, used for the sectors CROSSWAVE supports |

The `hero-01-utils` files were not part of the supplied snippet, so they were written to match the props and types `hero-01.tsx` uses (`NavigationSection`, `AvatarList`, `BrandList`).

### Content decisions

- **Avatars** show photos for the six service divisions, not people, so the hero makes no claims about clients.
- **The brand slider** lists the sectors CROSSWAVE supports. Add real client logos (`image`/`lightimg`) only once you have permission to show them.
- **The quick-start email field** sends nothing itself. It opens `/booking.html?email=…`, where the email is pre-filled and the visitor completes and submits the full consultation form.

## Setting up a project like this from scratch

If you start a new project instead:

1. Create a Vite React + TypeScript app:

   ```bash
   npm create vite@latest my-app -- --template react-ts
   ```

2. Install Tailwind 3 and generate its config:

   ```bash
   npm install -D tailwindcss@3 postcss autoprefixer tailwindcss-animate
   ```

   ```bash
   npx tailwindcss init -p --ts
   ```

3. Add the `@/*` path alias to `tsconfig.json` and `vite.config.ts` (see this folder for an example), then initialise shadcn/ui:

   ```bash
   npx shadcn@latest init
   ```

4. Add the components:

   ```bash
   npx shadcn@latest add button sheet input label navigation-menu
   ```

5. Install the remaining dependencies:

   ```bash
   npm install @radix-ui/react-slot class-variance-authority lucide-react @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-icons @radix-ui/react-navigation-menu
   ```

For Next.js, use `npx create-next-app@latest --typescript --tailwind` and then `npx shadcn@latest init`. The component paths stay the same.

## Notes

- `@radix-ui/react-navigation-menu` is pinned to 1.2.1. The newest 1.4.x release logs a ref warning under React 18.
- Photos load from Unsplash. If one fails, the frame falls back to the brand gradient or the wave emblem.
