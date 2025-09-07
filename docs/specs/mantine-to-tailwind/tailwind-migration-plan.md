# Tailwind CSS Migration Plan for Quotd App

This document outlines a detailed, progressive plan for migrating the Quotd application from Mantine UI (version 7.16.2) to Tailwind CSS (v3.x) combined with custom React components. The goal is to reduce dependency on Mantine's component library, improve customization control, and leverage Tailwind's utility-first approach for faster styling and smaller bundle sizes. The migration will be incremental to minimize disruptions, maintain visual consistency, and manage technical complexity.

Key considerations:
- **Mantine Components Analysis**: Mantine provides pre-built components like `Button`, `Title`, `Text`, `Container`, `Group`, `AspectRatio`, `Image`, `Anchor`, etc. Complex, interactive components (e.g., `Button`, `ColorSchemeToggle`) will be rebuilt as custom components using Tailwind for styling and React for logic. Simple layout/wrapper components (e.g., `Box`, `Container`) can be replaced directly with Tailwind classes on `<div>` elements. Utility hooks like `useMediaQuery` will be replaced with Tailwind's responsive prefixes or custom hooks.
- **Visual Consistency**: Extract Mantine's theme (from `src/theme.ts`) into Tailwind's config (`tailwind.config.js`) for colors, spacing, fonts, etc. Use Tailwind's arbitrary values and plugins to match gradients, shadows, and radii. During transition, co-locate Mantine and Tailwind styles to ensure parity.
- **CSS Modules to Tailwind Mapping**: Convert `*.module.css` files (e.g., `Welcome.module.css`) to Tailwind classes. Map properties like `margin: 30px` to `m-8` (using Tailwind's spacing scale), gradients to `bg-gradient-to-r from-blue to-purple`, etc. Use tools like `tailwindcss-classnames` or manual refactoring.
- **Project Architecture**: Introduce a hybrid structure temporarily:
  - `src/components/mantine/`: Legacy Mantine-wrapped components (for gradual replacement).
  - `src/components/tailwind/`: New custom Tailwind components (e.g., `Button.tsx`, `Typography.tsx`).
  - `src/components/shared/`: Pure logic components (no styling, e.g., hooks, utilities).
  - `src/components/ui/`: Final consolidated custom UI primitives post-migration.
  - Update `src/Layout.tsx` and pages to import from appropriate directories.
  - Post-migration: Remove `src/components/mantine/` and consolidate into `src/components/ui/`.
- **Complexity Management**: Break into phases with checkpoints (e.g., visual diffs, tests). Use feature flags or conditional rendering for A/B testing components. Run full test suite (`yarn test`) after each phase. Monitor bundle size with `vite-bundle-analyzer`.
- **Dependencies**: Install Tailwind (`yarn add -D tailwindcss postcss autoprefixer`), remove Mantine gradually (`@mantine/core`, `@mantine/hooks`). Retain fonts via `@fontsource/*`. Update PostCSS config to include Tailwind.

## Phase 1: Preparation and Setup (1-2 days)
### Objectives
- Assess current usage and prepare tooling without code changes.
### Steps
1. **Inventory Mantine Usage**:
   - Use `search_files` tool or grep for Mantine imports/components across codebase (e.g., `grep -r "@mantine" src/`).
   - Categorize: Interactive (Button, Toggle) vs. Layout (Container, Group) vs. Text (Title, Text).
   - Map to equivalents: e.g., `Button` → Custom Button; `Container` → `<div className="container mx-auto px-4">`.
   - Document in a table: Component | Usage Count | Replacement Strategy | Dependencies.

2. **Tooling Setup**:
   - Run `npx tailwindcss init -p` to generate `tailwind.config.js` and update `postcss.config.cjs`.
   - Extract theme from `src/theme.ts` (e.g., colors, gradients like `themeGradients.logo`) into Tailwind config:
     ```
     module.exports = {
       theme: {
         extend: {
           colors: { primary: '#007bff', /* match Mantine */ },
           fontFamily: { sans: ['Raleway', 'sans-serif'] /* from FontDefinitions */ },
           backgroundImage: { 'gradient-logo': 'linear-gradient(45deg, #007bff, #6c757d)' },
         },
       },
       plugins: [],
     };
     ```
   - Add Tailwind directives to `src/index.css` or `src/main.tsx`: `@tailwind base; @tailwind components; @tailwind utilities;`.
   - Install additional tools: `yarn add clsx` (for conditional classes), `yarn add -D prettier-plugin-tailwindcss` (for sorting classes).

3. **Baseline Tests**:
   - Run `yarn test` and `yarn storybook` to establish baseline.
   - Screenshot key pages (Home, /app) for visual regression testing (use tools like Percy or manual diffs).

4. **Checkpoint**: Commit setup changes. No functional changes yet.

## Phase 2: Component Analysis and Custom Primitives Development (3-5 days)
### Objectives
- Build reusable custom components that match Mantine visuals.
### Steps
1. **Prioritize Components**:
   - High-impact: `Button` (used in Welcome, QLayout, Download), `Title`/`Text` (headers, body), `Group` (layouts).
   - Low-impact: `AspectRatio` → Tailwind `aspect-[3/2]`, `Image` → `<img className="rounded-md object-cover">`.
   - Start with non-critical: Replace `Container` in `QLayout.tsx` with `<div className="max-w-4xl mx-auto px-4">`.

2. **Develop Custom Components**:
   - Create `src/components/tailwind/Button.tsx`:
     ```
     import { forwardRef } from 'react';
     import { clsx } from 'clsx';
     interface ButtonProps { variant?: 'filled' | 'outline'; color?: string; size?: 'xl'; /* etc. */ }
     const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'filled', color = 'secondary', size = 'md', children, ...props }, ref) => (
       <button ref={ref} className={clsx('rounded-md font-medium transition-colors', variant === 'filled' ? `bg-${color}-500 text-white hover:bg-${color}-600` : 'border border-gray-300', size === 'xl' ? 'px-8 py-3 text-lg' : 'px-4 py-2', className)} {...props}>{children}</button>
     ));
     export { Button };
     ```
     - Match variants/sizes from Mantine theme.
   - Similarly for `Typography.tsx` (Title/Text wrapper): Use Tailwind `text-4xl font-bold` etc., with props for variants.
   - For hooks: Replace `useMediaQuery` with `useBreakpoint` custom hook using `window.matchMedia`.
   - Simple replacements: `Box` → `<div className="...">` with Tailwind props.

3. **Style Mapping from CSS Modules**:
   - For `Welcome.module.css`: Map `.title { text-align: center; margin-top: 100px; }` → `ta-center mt-24` (use responsive: `md:mt-24`).
   - Gradients: `.gradient { background: linear-gradient(...); }` → `bg-gradient-to-r from-blue-500 to-purple-500`.
   - Create a mapping spreadsheet: CSS Property | Tailwind Equivalent | Notes (e.g., custom spacing if needed).
   - Use PurgeCSS or Tailwind's JIT to scan for unused classes.

4. **Checkpoint**: Build 5-10 core components. Test in isolation with Storybook (add Tailwind stories). Visual diff against Mantine versions.

## Phase 3: Progressive Replacement and Hybrid Architecture (5-7 days)
### Objectives
- Replace Mantine components incrementally while maintaining functionality.
### Steps
1. **Introduce Architecture**:
   - Refactor imports: In `Welcome.tsx`, conditionally import `Button` from `/tailwind` or `/mantine`.
   - Use a config flag (e.g., `const USE_TAILWIND = true;` in `vite.config.mjs` or env var) for A/B switching.
   - Update `src/Layout.tsx` and `src/App.tsx` to wrap with Tailwind classes where possible (e.g., remove MantineProvider gradually).

2. **Migrate by Page/Component**:
   - Start with Welcome page: Replace `Title`, `Text`, `Button`, `Group`, `Image` with customs/Tailwind.
     - e.g., `<Title className={classes.title}>` → `<h1 className="text-4xl font-bold text-center mt-24 px-4">`.
     - Map `themeGradients.logo` to Tailwind gradient class.
   - Then QLayout: Replace `Container`, `Button` (Download), integrate QControls/QCanvas (which use Mantine internally – refactor sub-components first).
   - Handle responsive: Use Tailwind breakpoints (sm:, md:) to match `useMediaQuery` logic.
   - For ColorSchemeToggle: Build custom dark mode toggle using Tailwind's `dark:` prefix and localStorage.

3. **Consistency Maintenance**:
   - Audit visuals: Use browser dev tools to compare computed styles (e.g., padding, colors).
   - Update Tailwind config iteratively to match Mantine (e.g., add custom shadows: `shadow-mantine-lg`).
   - Temporary CSS vars in `src/index.css` for bridging: `--mantine-color-primary: #007bff;` and reference in Tailwind.

4. **Checkpoint**: Migrate one full page (e.g., Home). Run `yarn dev` and test responsiveness. Update tests to use new components.

## Phase 4: Full Migration, Testing, and Optimization (3-5 days)
### Objectives
- Complete replacements, validate, and optimize.
### Steps
1. **Migrate Remaining Components**:
   - QCanvas, QControls: Replace any Mantine (e.g., sliders if present – none currently, but prepare).
   - Router/Layout: Ensure no Mantine leaks.
   - Remove Mantine imports once all usages are replaced.

2. **Testing and Validation**:
   - Unit tests: Update `@testing-library/react` snapshots for new renders.
   - E2E: Add Cypress/Playwright tests for flows (quote generation, download).
   - Performance: Measure bundle size pre/post (remove Mantine ~200KB savings).
   - Accessibility: Ensure ARIA props transfer (e.g., Button role="button").
   - Cross-browser: Test on Chrome, Firefox, Safari.

3. **Cleanup**:
   - Remove Mantine deps: `yarn remove @mantine/core @mantine/hooks`.
   - Delete `src/components/mantine/`, consolidate to `src/components/ui/`.
   - Update Prettier/Stylelint to enforce Tailwind class sorting.
   - Optimize: Purge unused Tailwind classes in production build.

4. **Documentation**:
   - Update README.md with new stack (Tailwind, custom components).
   - Add component docs in Storybook.

## Phase 5: Deployment and Monitoring (1 day)
### Objectives
- Deploy and monitor post-migration.
### Steps
1. **Build and Deploy**:
   - Run `yarn build` and preview.
   - Deploy to Vercel; monitor for regressions.

2. **Rollback Plan**: Keep git branch for Mantine version; use feature flags if issues arise.

3. **Post-Migration Metrics**:
   - Bundle size reduction.
   - Load time improvements.
   - User feedback on visuals.

## Risks and Mitigations
- **Visual Drift**: Mitigate with theme extraction and visual testing tools (e.g., Chromatic).
- **Time Overruns**: Phase gates with daily commits; prioritize core flows (quote gen/download).
- **Breaking Changes**: Incremental commits; test after each component swap.
- **Team Coordination**: If multi-dev, assign phases (e.g., one for components, one for testing).

This plan ensures a controlled migration, estimated at 2-3 weeks, resulting in a leaner, more customizable app.