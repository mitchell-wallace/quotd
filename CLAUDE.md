# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `yarn dev` - Start development server
- `yarn build` - Build production version (includes TypeScript compilation)
- `yarn typecheck` - Run TypeScript type checking
- `yarn lint` - Run ESLint and Stylelint
- `yarn prettier` - Check code formatting
- `yarn prettier:write` - Format code with Prettier
- `yarn vitest` - Run tests once
- `yarn vitest:watch` - Run tests in watch mode
- `yarn test` - Full test suite (typecheck + prettier + lint + vitest + build)
- `yarn storybook` - Start Storybook development server

## Architecture Overview

This is a **quote generator application** that creates inspirational Bible verse images. The core architecture follows a component-based React structure with Zustand for state management.

### Key Application Flow
1. **Data Layer**: Static data stored in `src/data/` (biblical quotes, background images, font definitions)
2. **State Management**: Zustand store (`src/stores/quoteStore.ts`) manages current selections and UI state
3. **Quote Generation**: Combines background images, typography, and verses into downloadable graphics
4. **Download System**: Uses `html-to-image` library to convert DOM elements to downloadable images

### Core Components Architecture

**QLayout** (`src/components/Quotd-core/QLayout/QLayout.tsx`)
- Main layout component that orchestrates the quote generation interface
- Contains controls, canvas, and download functionality

**QCanvas** (`src/components/Quotd-core/QCanvas/QCanvas.tsx`)
- Renders the quote preview with 3:2 aspect ratio
- Supports both 'display' and 'download' variants with different dimensions
- Combines QImage and QTypography components

**QTypography** (`src/components/Quotd-core/QTypography/QTypography.tsx`)
- Handles text rendering with dynamic font loading
- Manages font scaling based on variant (display: 580px width, download: 1080px width)
- Uses FontDefinitions for sizing and spacing factors

**QImage** (`src/components/Quotd-core/QImage/QImage.tsx`)
- Renders background images from ImageUrlList
- Applies brightness filter for text readability

### State Management Pattern

The application uses a single Zustand store (`useQuoteStore`) that manages:
- Current selections (font, quote, image indices)
- Font loading state and transitions
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

### Routing Structure

- `/` - HomePage with Welcome component
- `/app` - QuotesPage with main quote generator (QLayout)

### Testing Setup

- **Vitest** for unit testing with React Testing Library
- **Storybook** for component development and testing
- **TypeScript** strict mode enabled
- **ESLint** with Mantine configuration