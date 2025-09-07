# Mantine Usage Inventory

This document inventories all Mantine components, hooks, and styles used in the Quotd codebase (based on search for '@mantine' in src/*.tsx files). The analysis categorizes them, counts approximate usages (by file occurrences), suggests replacement strategies for Tailwind migration, and notes dependencies.

## Summary
- **Total Mantine Imports**: 11 files use Mantine.
- **Categories**:
  - **Interactive Components**: Require custom React components with Tailwind styling for behavior and visuals.
  - **Layout Components**: Replace with `<div>` or semantic elements using Tailwind utility classes (e.g., flex, grid, spacing).
  - **Text Components**: Replace with HTML elements (h1, p, a) styled with Tailwind text utilities.
  - **Hooks**: Implement custom React hooks or use Tailwind's built-in responsive features.
  - **Styles/Provider**: Remove global CSS and Provider, integrate Tailwind directives.
- **Overall Strategy**: Start with simple replacements (layout/text), then build customs for interactive. Test visuals post-replacement.

## Detailed Inventory Table

| Component/Hook | Category | Usage Count (Files) | Example Usage Files | Replacement Strategy | Dependencies/Notes |
|---------------|----------|---------------------|---------------------|----------------------|-------------------|
| Button | Interactive | 3 | Welcome.tsx, SplitButton.tsx, QLayout.tsx | Build custom `Button.tsx` with Tailwind classes (e.g., `bg-primary text-white px-4 py-2 rounded-md transition-colors`). Support variants (filled, outline), sizes (xl), colors (secondary). Use `clsx` for conditional classes. | React forwardRef; Match Mantine theme colors in Tailwind config. |
| Group | Layout | 3 | Welcome.tsx, SplitButton.tsx, QControls.tsx | Replace with `<div className="flex justify-center gap-4">` or `<div className="flex items-center">` for button groups. Use Tailwind's flex utilities. | Responsive: Add `md:gap-6`; No deps, pure Tailwind. |
| Box | Layout | 4 | SplitButton.tsx, QTypography.tsx, QCanvas.tsx, DownloadFrame.tsx | Replace with `<div className="...">` using Tailwind padding, margin, etc. (e.g., `p-4 bg-white rounded`). For wrappers, often no class needed or `flex-1`. | Simple; Map to specific utilities like `w-full h-full`. |
| Text | Text | 2 | Welcome.tsx, QTypography.tsx | Replace with `<p className="text-dimmed text-center text-lg max-w-[580px] mx-auto mt-8 px-4">`. Use `text-{size}-{weight}` variants. | Semantic: Use `<span>` or `<p>`; Color: Map `c="dimmed"` to `text-gray-500`. |
| Title | Text | 1 | Welcome.tsx | Replace with `<h1 className="text-4xl font-bold text-center mt-24 px-4">`. Support gradient via `bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent`. | Use `themeGradients` from theme.ts in Tailwind config. |
| Image | Other | 2 | Welcome.tsx, QImage.tsx | Replace with `<img className="rounded-md max-h-96 max-w-sm mx-auto mt-8 object-cover">` or native `<img>` with Tailwind. For AspectRatio combo, add `aspect-[3/2]`. | Tailwind object-fit; Alt text preserved. |
| Container | Layout | 1 | QLayout.tsx | Replace with `<div className="max-w-4xl mx-auto px-4">` for centered content. | Responsive padding: `px-4 md:px-6`. |
| AspectRatio | Layout | 2 | Welcome.tsx, QCanvas.tsx | Replace with `<div className="aspect-[3/2] relative"> <img className="absolute inset-0 w-full h-full object-cover rounded-md" /> </div>`. | Use Tailwind aspect ratio plugin if needed; Custom CSS for complex ratios. |
| Anchor | Text | 1 | Welcome.tsx | Replace with `<a href="..." className="text-blue-500 hover:underline text-lg">`. | Semantic `<a>`; Color from Tailwind theme. |
| Stack | Layout | 1 | QTypography.tsx | Replace with `<div className="flex flex-col gap-2">` for vertical stacking. | Gap utilities for spacing. |
| Menu | Interactive | 1 | ColorSchemeToggle.tsx | Build custom `Menu.tsx` with Tailwind dropdown (e.g., using Headless UI or native details/summary). | Complex: May need external lib like @headlessui/react for accessibility. |
| ActionIcon | Interactive | 1 | ColorSchemeToggle.tsx | Build custom icon button: `<button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"> <Icon /> </button>`. | Use Tabler icons; Tailwind for hover states. |
| Loader | Interactive | 1 | SplitButton.tsx | Replace with custom spinner: `<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary">`. Or use a Tailwind spinner utility. | Pure CSS animation; No external deps. |
| useMediaQuery | Hook | 1 | Welcome.tsx | Implement custom `useBreakpoint` hook: `useEffect` with `window.matchMedia('(max-width: 40em)')`. Or use Tailwind responsive classes directly (e.g., `mt-0 md:mt-24`). | React hooks; Avoid if possible with Tailwind sm:/md: prefixes. |
| useMantineColorScheme | Hook | 1 | ColorSchemeToggle.tsx | Implement custom dark mode hook using `localStorage` and `prefers-color-scheme` media query. Toggle `dark` class on html/root. | Integrate with Tailwind `dark:` prefix; Use `useEffect` for persistence. |
| MantineProvider | Provider | 1 | App.tsx | Remove; Use Tailwind's config for theme. For color scheme, add custom provider if needed for context. | Update App.tsx to <div className="dark"> or similar. |
| '@mantine/core/styles.css' | Styles | 1 | App.tsx | Remove; Replace with Tailwind directives in global CSS: `@tailwind base; @tailwind components; @tailwind utilities;`. | Ensure font imports remain (via @fontsource). |

## Additional Notes
- **Global Usage**: MantineProvider wraps the app in `src/App.tsx` – replace with Tailwind setup in `src/main.tsx` or CSS.
- **Dependencies**: Core Mantine deps (@mantine/core, @mantine/hooks) used across; remove after full replacement. Fonts (@fontsource/*) stay.
- **Unmentioned Components**: No usages of advanced Mantine like Modal, Select, etc. – migration is straightforward.
- **Next Steps**: Use this inventory to prioritize Phase 2 of the migration plan. Update table after any code changes.

This inventory was generated by searching for '@mantine' patterns in src/*.tsx files.