# Tailwind Migration Task List

This document provides a comprehensive, bite-sized task list for progressively migrating the Quotd app from Mantine to Tailwind CSS and custom components. Tasks are ordered sequentially, grouped by phases from the migration plan. Each task includes:
- **Description**: What to do.
- **Files Involved**: Specific files to edit.
- **Verification Metric**: Simple success criteria (e.g., visual check, test run).

Use this list to track progress. Mark as [x] when complete. Test components are marked with `/* TEST: Tailwind [Component] */` comments for easy identification and cleanup. After each task, run `yarn dev` and visually verify in browser (e.g., screenshot comparisons or manual inspection). Run `yarn test` at phase ends.

## Phase 1: Preparation and Setup

- [ ] **Task 1.1: Install Tailwind CSS dependencies**  
  Description: Add Tailwind, PostCSS, and Autoprefixer as dev deps via yarn. Run `npx tailwindcss init -p` to generate configs. Update `postcss.config.cjs` to include Tailwind.  
  Files Involved: `package.json`, `postcss.config.cjs`, `tailwind.config.js` (new).  
  Verification Metric: Run `yarn install`; no errors. Check `tailwind.config.js` exists and has basic theme extend (e.g., colors from `src/theme.ts`).

- [ ] **Task 1.2: Add Tailwind directives to global CSS**  
  Description: Create or update `src/index.css` with `@tailwind base; @tailwind components; @tailwind utilities;`. Import fonts from `@fontsource` packages in `src/main.tsx` if not already.  
  Files Involved: `src/index.css` (new or update), `src/main.tsx`.  
  Verification Metric: Run `yarn dev`; page loads without CSS errors. Inspect elements in browser dev tools for Tailwind base styles (e.g., box-sizing: border-box).

- [ ] **Task 1.3: Extract Mantine theme to Tailwind config**  
  Description: Copy colors, gradients (e.g., `themeGradients.logo`), fonts (from `src/data/FontDefinitions.ts`), spacing from `src/theme.ts` to `tailwind.config.js` extend section. Add custom plugins if needed for gradients.  
  Files Involved: `tailwind.config.js`, `src/theme.ts` (reference only).  
  Verification Metric: Restart dev server; apply a test class like `bg-gradient-to-r from-primary to-secondary` in console on an element – matches Mantine gradient visually.

- [ ] **Task 1.4: Install utility libraries**  
  Description: Add `clsx` for conditional classes and `prettier-plugin-tailwindcss` for class sorting. Update `.prettierrc.mjs` to use the plugin.  
  Files Involved: `package.json`, `.prettierrc.mjs`.  
  Verification Metric: Run `yarn prettier:write src/App.tsx`; classes (if any) are sorted alphabetically without errors.

## Phase 2: Custom Primitives Development and Initial Testing

- [ ] **Task 2.1: Build custom Button component**  
  Description: Create `src/components/tailwind/Button.tsx` matching Mantine variants (filled/outline), sizes (xl/md), colors (secondary). Use `forwardRef`, `clsx`. Support leftSection (Icon).  
  Files Involved: `src/components/tailwind/Button.tsx` (new).  
  Verification Metric: Add a test instance in `src/App.tsx` with `/* TEST: Tailwind Button */ <Button variant="filled" size="xl">Test</Button>`; loads with matching Mantine Button style (color, padding, hover).

- [ ] **Task 2.2: Test Button on Home page**  
  Description: In `src/components/Welcome/Welcome.tsx`, replace one Mantine Button (e.g., "Get Inspired") with Tailwind Button, mark as `/* TEST: Tailwind Button on Welcome */`. Keep original for comparison.  
  Files Involved: `src/components/Welcome/Welcome.tsx`.  
  Verification Metric: Navigate to `/`; Tailwind Button looks identical to Mantine one (size, color, icon alignment). Click works (navigates to /app).

- [ ] **Task 2.3: Build custom Typography components (Title and Text)**  
  Description: Create `src/components/tailwind/Typography.tsx` as a wrapper for Title/Text with props for size, weight, color (dimmed), gradient. Use HTML elements with Tailwind classes.  
  Files Involved: `src/components/tailwind/Typography.tsx` (new).  
  Verification Metric: Test in `src/App.tsx` with `/* TEST: Tailwind Title */ <Typography variant="title" gradient="logo">Test Title</Typography>`; matches Mantine Title font/size/gradient.

- [ ] **Task 2.4: Test Typography on Home page**  
  Description: In `src/components/Welcome/Welcome.tsx`, replace Mantine Title and one Text with Tailwind Typography, mark as `/* TEST: Tailwind Typography on Welcome */`.  
  Files Involved: `src/components/Welcome/Welcome.tsx`.  
  Verification Metric: Reload `/`; Title/Text render with same alignment, size, color (dimmed for Text), and gradient on span. Responsive on mobile (use dev tools).

- [ ] **Task 2.5: Build custom Group component**  
  Description: Create `src/components/tailwind/Group.tsx` for flex layouts (justify-center, gap). Support orientation (horizontal/vertical).  
  Files Involved: `src/components/tailwind/Group.tsx` (new).  
  Verification Metric: Test in `src/App.tsx` with `/* TEST: Tailwind Group */ <Group><button>Test1</button><button>Test2</button></Group>`; buttons align horizontally with gap, centered.

- [ ] **Task 2.6: Test Group on Home page**  
  Description: In `src/components/Welcome/Welcome.tsx`, replace Mantine Group around Button with Tailwind Group, mark as `/* TEST: Tailwind Group on Welcome */`.  
  Files Involved: `src/components/Welcome/Welcome.tsx`.  
  Verification Metric: Buttons (or elements) in group center properly with consistent spacing; no layout shift.

## Phase 3: Progressive Replacement

- [ ] **Task 3.1: Replace Container in QLayout**  
  Description: In `src/components/Quotd-core/QLayout/QLayout.tsx`, replace Mantine Container with `<div className="max-w-4xl mx-auto px-4">` (Tailwind).  
  Files Involved: `src/components/Quotd-core/QLayout/QLayout.tsx`.  
  Verification Metric: Navigate to `/app`; content centered with padding, no width changes. Measure with dev tools (max-width ~1024px).

- [ ] **Task 3.2: Build and test custom Image with AspectRatio**  
  Description: Create `src/components/tailwind/Image.tsx` with Tailwind classes for radius, fit, responsive sizes. For AspectRatio, use wrapper div with `aspect-[3/2]`. Test on a duplicate canvas.  
  Files Involved: `src/components/tailwind/Image.tsx` (new), `src/components/Quotd-core/QCanvas/QCanvas.tsx` (add test duplicate: `/* TEST: Tailwind Image Canvas */`).  
  Verification Metric: On `/app`, second canvas shows image with same aspect ratio, rounding, object-cover; no distortion.

- [ ] **Task 3.3: Replace Download Button in QLayout with Tailwind Button**  
  Description: Replace Mantine Button in `QLayout.tsx` with custom Tailwind Button (include IconDownload), mark as `/* TEST: Tailwind Download Button */`.  
  Files Involved: `src/components/Quotd-core/QLayout/QLayout.tsx`.  
  Verification Metric: Click "Download" button; downloads PNG correctly. Button style (filled, icon left, min-width) matches original.

- [ ] **Task 3.4: Build custom Anchor component**  
  Description: Create `src/components/tailwind/Anchor.tsx` with Tailwind for link styling (color, hover underline).  
  Files Involved: `src/components/tailwind/Anchor.tsx` (new).  
  Verification Metric: Test in `src/App.tsx` with `/* TEST: Tailwind Anchor */ <Anchor href="#">Test Link</Anchor>`; blue color, underline on hover.

- [ ] **Task 3.5: Test Anchor on Home page**  
  Description: In `src/components/Welcome/Welcome.tsx`, replace one Mantine Anchor (e.g., agency link) with Tailwind Anchor, mark as `/* TEST: Tailwind Anchor on Welcome */`.  
  Files Involved: `src/components/Welcome/Welcome.tsx`.  
  Verification Metric: Links clickable, styled same (size lg, color); hover effect works.

- [ ] **Task 3.6: Replace Box and Stack in QTypography**  
  Description: In `src/components/Quotd-core/QTypography/QTypography.tsx`, replace Mantine Box/Stack with Tailwind divs (`flex flex-col gap-2`, etc.).  
  Files Involved: `src/components/Quotd-core/QTypography/QTypography.tsx`.  
  Verification Metric: Quote text stacks vertically with proper gaps; no overlap or extra space.

## Phase 4: Advanced Components and Full Page Migrations

- [ ] **Task 4.1: Build custom useMediaQuery hook**  
  Description: Create `src/hooks/useBreakpoint.ts` to replace `@mantine/hooks` useMediaQuery.  
  Files Involved: `src/hooks/useBreakpoint.ts` (new).  
  Verification Metric: In `src/App.tsx`, add test: `const isXs = useBreakpoint('(max-width: 40em)'); console.log(isXs);`; logs true on mobile view.

- [ ] **Task 4.2: Migrate Welcome page fully to Tailwind**  
  Description: Replace all Mantine components in `Welcome.tsx` with customs/Tailwind (Button, Title, Text, Group, Image, Anchor, useMediaQuery). Remove test marks after verification. Update imports.  
  Files Involved: `src/components/Welcome/Welcome.tsx`.  
  Verification Metric: Full page `/` looks identical (responsive margins, gradients, image sizing). Run `yarn test` if applicable; no visual diffs.

- [ ] **Task 4.3: Build custom ActionIcon and Menu for ColorSchemeToggle**  
  Description: Create `src/components/tailwind/ActionIcon.tsx` and basic Menu. Update `ColorSchemeToggle.tsx` to use them, replacing useMantineColorScheme. Mark as test.  
  Files Involved: `src/components/tailwind/ActionIcon.tsx` (new), `src/components/ColorSchemeToggle/ColorSchemeToggle.tsx`.  
  Verification Metric: Toggle dark mode; icons change (Sun/Moon), menu opens with Tailwind styles matching original.

- [ ] **Task 4.4: Migrate QControls and test on duplicate**  
  Description: Replace Group in `QControls.tsx` with Tailwind Group. Add a second QControls instance in `QLayout.tsx` marked `/* TEST: Tailwind QControls */`.  
  Files Involved: `src/components/Quotd-core/QControls/QControls.tsx`, `src/components/Quotd-core/QLayout/QLayout.tsx`.  
  Verification Metric: Controls buttons align and function (next/prev); duplicate doesn't break layout.

## Phase 5: Cleanup, Testing, and Completion

- [ ] **Task 5.1: Remove MantineProvider from App.tsx**  
  Description: Replace MantineProvider in `src/App.tsx` with Tailwind class setup (e.g., add `dark` class handling). Remove `@mantine/core/styles.css`.  
  Files Involved: `src/App.tsx`.  
  Verification Metric: App loads; theme (colors, fonts) preserved via Tailwind config. No console errors.

- [ ] **Task 5.2: Full app testing and cleanup**  
  Description: Remove all test duplicates/marks. Run full test suite. Update Storybook stories for new components.  
  Files Involved: All migrated files.  
  Verification Metric: `yarn test` passes 100%; `yarn build` succeeds; bundle size reduced (check with `yarn vite build --debug`). Visual audit: No regressions on / and /app.

- [ ] **Task 5.3: Remove Mantine dependencies**  
  Description: `yarn remove @mantine/core @mantine/hooks`. Update package.json.  
  Files Involved: `package.json`.  
  Verification Metric: `yarn install`; no errors. Dev server runs; all features work.

- [ ] **Task 5.4: Update documentation**  
  Description: Update README.md with Tailwind stack. Add component usage docs in new `src/components/ui/README.md`.  
  Files Involved: `README.md`, `src/components/ui/README.md` (new).  
  Verification Metric: README reflects changes; docs describe new components (props, examples).