# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Web Development
- `npm run dev` - Start development server
- `npm run build` - Build production version (includes TypeScript compilation)
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Run ESLint and Stylelint
- `npm run prettier` - Check code formatting
- `npm run prettier:write` - Format code with Prettier
- `npm run vitest` - Run tests once
- `npm run vitest:watch` - Run tests in watch mode
- `npm run test` - Full test suite (typecheck + prettier + lint + vitest + build)

### Mobile App (Capacitor)
- `npm run build:mobile` - Build and sync to all platforms
- `npm run cap:sync` - Sync web assets to native projects
- `npm run cap:sync:ios` - Sync iOS only
- `npm run cap:sync:android` - Sync Android only (targets Pixel_8_API_35)
- `npm run cap:open:ios` - Open iOS project in Xcode
- `npm run cap:open:android` - Open Android project in Android Studio (targets Pixel_8_API_35)
- `npm run cap:run:ios` - Run on iOS simulator/device
- `npm run cap:run:android` - Run on Android emulator/device (targets Pixel_8_API_35)

## Architecture Overview

This is a **quote generator application** that creates inspirational Bible verse images. The core architecture follows a component-based **Vue 3** structure with **Pinia** for state management and **Tailwind CSS** for styling.

### Platform Support

The application supports both **web** and **native mobile** (iOS/Android) platforms using Capacitor:

- **Web Version**: Traditional web app with header and footer
- **Mobile App Version**: Native app with bottom navigation bar
  - No home page (launches directly to app)
  - Two tabs: "App" (quote generator) and "Library" (under construction)
  - Platform detection automatically switches layouts

### Key Application Flow
1. **Data Layer**: Static data stored in `src/data/` (biblical quotes, background images, font definitions)
2. **State Management**: Pinia store (`src/stores/quoteStore.ts`) manages current selections and UI state
3. **Quote Generation**: Combines background images, typography, and verses into downloadable graphics
4. **Download System**: Uses `html-to-image` library to convert DOM elements to downloadable images
5. **Share System**: Uses Capacitor Share API on native platforms, falls back to clipboard on web
6. **Platform Detection**: `src/utils/platform.ts` determines web vs native environment

### Core Components Architecture

**QLayout** (`src/components/Quotd-core/QLayout.vue`)
- Main layout component that orchestrates the quote generation interface
- Contains controls, canvas, download, and share functionality
- Handles both native share API and web clipboard fallback

**QCanvas** (`src/components/Quotd-core/QCanvas.vue`)
- Renders the quote preview with 3:2 aspect ratio
- Supports both 'display' and 'download' variants with different dimensions
- Combines QImage and QTypography components

**QTypography** (`src/components/Quotd-core/QTypography.vue`)
- Handles text rendering with dynamic font loading
- Manages font scaling based on variant (display: 580px width, download: 1080px width)
- Uses FontDefinitions for sizing and spacing factors
- Implements ResizeObserver for responsive text scaling

**QImage** (`src/components/Quotd-core/QImage.vue`)
- Renders background images from ImageUrlList
- Applies brightness filter for text readability

### State Management Pattern

The application uses a single Pinia store (`useQuoteStore`) that manages:
- Current selections (font, quote, image indices)
- Font loading state and transitions
- Image loading state and transitions
- Navigation between options (next/previous actions)
- Font size controls with min/max constraints

### Data Structure

**Static Data Location**: `src/data/`
- `WordsList.ts` - Array of biblical quotes with text, source, and translation
- `ImageUrlList.ts` - Array of background image URLs (mix of local and Unsplash)
- `FontDefinitions.ts` - Font configurations with sizing and spacing factors

### Font Loading System

The application implements custom font loading with:
- 15 Google Fonts imported via @fontsource packages
- Dynamic font loading detection using `document.fonts.check()`
- Loading state management to prevent UI glitches during font transitions
- Font-specific sizing and spacing factors for optimal rendering

### Download System

**Two-Stage Rendering**:
1. **Display Mode**: Responsive preview (max 580px width, 400px height)
2. **Download Mode**: Fixed dimensions (1080x720px) rendered in hidden DownloadFrame

**Download Process**:
- Hidden DownloadFrame component renders the quote at download dimensions
- `html-to-image` converts the DOM element to PNG
- Automatic file download with timestamp-based filename

### Share System

**Platform-Adaptive Sharing**:
- **Native (iOS/Android)**: Uses Capacitor Share API to share image via native share sheet
- **Web**: Copies share URL to clipboard and shows "Copied to clipboard!" feedback

### Routing Structure

**Web Version** (`WebLayout.vue`):
- `/` - HomePage with Welcome component
- `/app` - QuotesPage with main quote generator (QLayout)

**Mobile App Version** (`MobileLayout.vue`):
- `/app` - QuotesPage (default route, no home page)
- `/library` - Library page (under construction placeholder)

The router (`src/router.ts`) automatically selects the appropriate layout based on platform detection.

### Testing Setup

- **Vitest** for unit testing
- **Playwright** for E2E testing (`npm run test:e2e`)
- **TypeScript** strict mode enabled
- **ESLint** with TypeScript configuration
