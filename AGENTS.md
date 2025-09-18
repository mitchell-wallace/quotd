# Repository Guidelines

## Project Structure & Module Organization
- `src/main.tsx` bootstraps Solid; routes in `src/Router.tsx` target pages under `src/pages/*.page.tsx`.
- Quote rendering and download workflows sit in `src/components/Quotd-core/`; shared UI lives in `src/components/` and `src/Layout.tsx`.
- Solid signal stores reside in `src/stores/*`; curated verse/font/image data in `src/data/*`; assets in `public/assets/`; builds in `dist/`; docs and scripts in `docs/` and `scripts/`.

## Build, Test, and Development Commands
- Stick with Yarn 4 for dependency work (`yarn install`).
- `yarn dev` runs Vite; `yarn build` performs `tsc` then `vite build`; `yarn preview -- --host 0.0.0.0 --port 4173` mirrors the Playwright server.
- `yarn typecheck`, `yarn lint`, `yarn stylelint`, and `yarn prettier` guard types, lint rules, CSS, and formatting—append `:write` to auto-fix where available.
- `yarn vitest` (watch) or `yarn vitest --run` cover unit suites, while `yarn test:e2e` builds then executes the Playwright specs in `e2e/`.

## Coding Style & Naming Conventions
- Strict TypeScript with `jsxImportSource: solid-js`; keep components in PascalCase and maintain the `.page.tsx` suffix for routed screens.
- Prettier enforces 100-character lines, single quotes, `trailingComma: 'es5'`, and sorted imports; run `yarn prettier:write` before committing.
- ESLint blends the TypeScript and JSX accessibility presets—resolve warnings and prefer Solid primitives over raw DOM APIs.
- Tailwind utilities stay inline in JSX; additional CSS belongs in `src/style.css`, validated by Stylelint’s `stylelint-config-standard-scss` ruleset.

## Testing Guidelines
- Vitest plus Testing Library (configured via `vitest.setup.mjs`) power unit tests; colocate specs with the code or in sibling `__tests__/` directories.
- Use `vi.fn()` mocks to extend browser APIs when needed, especially around the quote canvas helpers.
- Playwright specs live in `e2e/*.spec.ts`; they expect `http://localhost:4173`, capture traces on first retry, and publish reports in `playwright-report/`.

## Commit & Pull Request Guidelines
- Use short, sentence-case commit titles (e.g., `Add download watermark guard`) and keep each change focused.
- Rebase or switch branches instead of merges, and run the relevant Yarn checks (`yarn test` when unsure) before pushing.
- PRs should link issues, summarise behaviour changes, include UI screenshots when visuals shift, and note manual verification steps.
