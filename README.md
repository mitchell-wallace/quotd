# Quotd

Quotd is a web application for generating inspirational Bible quotes overlaid on beautiful background images. Users can customize fonts, font sizes, and images, then download the result as a PNG image.

## Features

- **Random Quote Selection**: Choose from a curated list of over 100 Bible verses (KJV and NKJV translations).
- **Font Customization**: Select from 15+ Google Fonts with adjustable sizing and spacing factors.
- **Image Backgrounds**: Cycle through a collection of high-quality nature and abstract images.
- **Responsive Design**: Built with Mantine UI for a modern, mobile-friendly interface.
- **Download Functionality**: Export the quote image at 1080x720 resolution using html-to-image.
- **State Management**: Uses Zustand for efficient quote, font, and image state handling.
- **Controls**: Easy navigation to next/previous quotes, fonts, images, and font size adjustments.

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **UI Library**: Mantine 7
- **Routing**: React Router DOM 7
- **State Management**: Zustand 5
- **Fonts**: Various @fontsource packages (e.g., Raleway, Roboto Slab, etc.)
- **Image Export**: html-to-image 1.11
- **Icons**: @tabler/icons-react
- **Testing**: Vitest 3 with @testing-library/react
- **Storybook**: 8.5 for component development and documentation
- **Linting/Formatting**: ESLint 9, Prettier 3, Stylelint 16
- **Other**: PostCSS for styling, Unsplash JS (unused in current code)

## Installation

1. Clone the repository:
   ```
   git clone <repo-url>
   cd quotd-vite
   ```

2. Install dependencies using Yarn (packageManager: yarn@4.6.0):
   ```
   yarn install
   ```

3. Run the development server:
   ```
   yarn dev
   ```
   The app will be available at http://localhost:5173

## Usage

- **Home Page (/)**: Introduction with welcome message, image, and links to the developer's agency (ephodstudio.com) and portfolio (mitchellwallace.dev). Click "Get Inspired" to navigate to the quote generator.
- **Quote Generator (/app)**: 
  - Use controls to cycle through quotes, fonts, images, and adjust font size.
  - Preview the quote overlaid on the background.
  - Click "Download" to save as PNG (filename: quote-timestamp.png).

## Project Structure

- `src/App.tsx`: Main app component with MantineProvider and Router.
- `src/components/Quotd-core/`: Core functionality including QCanvas (renders quote on image), QControls (buttons for changes), QLayout (main layout), Download (handles PNG export).
- `src/components/Welcome/`: Landing page component.
- `src/data/`: 
  - `WordsList.ts`: Array of Bible quotes with text, source, and translation.
  - `FontDefinitions.ts`: Font configs with name, sizing, and spacing factors.
  - `ImageUrlList.ts`: Background image paths (imported in store).
- `src/pages/`: Route components (Home.page.tsx, Quotes.page.tsx).
- `src/stores/`: Zustand stores (quoteStore.ts for state/actions, headerStore.ts for navigation).
- `public/assets/images/core/`: Background images for quotes.
- `scripts/optimize-images.cjs`: Script for image optimization.
- Config files: `package.json`, `vite.config.mjs`, `tsconfig.json`, `vercel.json` for deployment.

## Building and Deployment

- **Build for Production**:
  ```
  yarn build
  ```
  Outputs to `dist/` directory.

- **Preview Build**:
  ```
  yarn preview
  ```

- **Type Check**:
  ```
  yarn typecheck
  ```

- **Run Tests**:
  ```
  yarn test
  ```
  Includes linting, formatting, Vitest, and build verification.

- **Storybook**:
  ```
  yarn storybook
  ```
  Runs at http://localhost:6006.

- **Deployment**: Configured for Vercel via `vercel.json`. Push to GitHub and deploy via Vercel dashboard.

