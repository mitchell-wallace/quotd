# Quotd

Quotd is a web and mobile application for generating inspirational Bible quotes overlaid on beautiful background images. Users can customize fonts, font sizes, and images, then download the result as a PNG image.

## Features

- **Random Quote Selection**: Choose from a curated list of over 100 Bible verses (KJV and NKJV translations).
- **Font Customization**: Select from 15+ Google Fonts with adjustable sizing and spacing factors.
- **Image Backgrounds**: Cycle through a collection of high-quality nature and abstract images.
- **Responsive Design**: Built with Tailwind CSS for a modern, mobile-friendly interface.
- **Download Functionality**: Export the quote image at 1080x720 resolution using html-to-image.
- **Share Functionality**: Native share on mobile (iOS/Android), clipboard fallback on web.
- **State Management**: Uses Pinia for efficient quote, font, and image state handling.
- **Controls**: Easy navigation to next/previous quotes, fonts, images, and font size adjustments.

## Tech Stack

- **Frontend**: Vue 3 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **Routing**: Vue Router 4
- **State Management**: Pinia 2
- **Mobile**: Capacitor 7 (iOS & Android)
- **Fonts**: Various @fontsource packages (e.g., Raleway, Roboto Slab, etc.)
- **Image Export**: html-to-image 1.11
- **Icons**: @tabler/icons-vue
- **Testing**: Vitest 3, Playwright for E2E
- **Linting/Formatting**: ESLint 9, Prettier 3, Stylelint 16
- **Other**: Capacitor Share & Filesystem APIs

## Installation

1. Clone the repository:
   ```
   git clone <repo-url>
   cd quotd-vite
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```
   The app will be available at http://localhost:5173

## Usage

- **Home Page (/)**: Introduction with welcome message, image, and links to the developer's agency (ephodstudio.com) and portfolio (mitchellwallace.dev). Click "Get Inspired" to navigate to the quote generator.
- **Quote Generator (/app)**: 
  - Use controls to cycle through quotes, fonts, images, and adjust font size.
  - Preview the quote overlaid on the background.
  - Click "Download" to save as PNG (filename: quote-timestamp.png).

## Project Structure

- `src/App.vue`: Main app component with router-view.
- `src/router.ts`: Router configuration with platform-aware layout selection.
- `src/layouts/`: Platform-specific layouts (WebLayout.vue, MobileLayout.vue).
- `src/components/Quotd-core/`: Core functionality including QCanvas (renders quote on image), QControls (buttons for changes), QLayout (main layout), DownloadFrame (handles PNG export).
- `src/components/Welcome/`: Landing page component.
- `src/data/`:
  - `WordsList.ts`: Array of Bible quotes with text, source, and translation.
  - `FontDefinitions.ts`: Font configs with name, sizing, and spacing factors.
  - `ImageUrlList.ts`: Background image paths (imported in store).
- `src/pages/`: Route components (Home.page.vue, Quotes.page.vue, Library.page.vue).
- `src/stores/`: Pinia stores (quoteStore.ts for state/actions, headerStore.ts for navigation).
- `src/utils/platform.ts`: Platform detection utilities for Capacitor.
- `public/assets/images/core/`: Background images for quotes.
- `capacitor.config.ts`: Capacitor configuration for mobile apps.
- Config files: `package.json`, `vite.config.mjs`, `tsconfig.json`, `vercel.json` for deployment.

## Building and Deployment

- **Build for Production**:
  ```
  npm run build
  ```
  Outputs to `dist/` directory.

- **Preview Build**:
  ```
  npm run preview
  ```

- **Type Check**:
  ```
  npm run typecheck
  ```

- **Run Tests**:
  ```
  npm run test
  ```
  Includes linting, formatting, Vitest, and build verification.

- **E2E Tests**:
  ```
  npm run test:e2e
  ```
  Runs Playwright end-to-end tests.

- **Mobile Build**:
  ```
  npm run build:mobile
  ```
  Builds web assets and syncs to native iOS/Android projects.

- **Deployment**: Configured for Vercel via `vercel.json`. Push to GitHub and deploy via Vercel dashboard.

