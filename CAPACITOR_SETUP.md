# Capacitor Mobile App Setup

This document describes the Capacitor setup for creating native iOS and Android versions of the QuotD application.

## Overview

The application now supports both web and mobile platforms using Capacitor. When running as a native mobile app, the interface adapts to provide a mobile-optimized experience with:

- **Bottom Navigation Bar**: Replaces the traditional header/footer with a mobile-style bottom tab bar
- **Two Tabs**:
  - **App Tab**: The quote generator functionality (existing `/app` route)
  - **Library Tab**: Placeholder for future saved quotes feature (currently shows "Under Construction")
- **No Home Page**: Mobile app launches directly to the App tab

## Architecture

### Platform Detection

The app uses a platform detection utility (`src/utils/platform.ts`) to determine if it's running as a native app or in a web browser:

```typescript
import { isNativeApp, getPlatform, isIOS, isAndroid } from '@/utils/platform';
```

### Conditional Routing

The router (`src/router.ts`) conditionally loads different layouts:

- **Native App**: Uses `AppLayout.vue` with bottom navigation
- **Web Browser**: Uses `Layout.vue` with header and footer

### Components

1. **AppLayout.vue**: Mobile-specific layout with bottom tab navigation
2. **Library.page.vue**: Placeholder page for the library feature
3. **Platform utilities**: Helper functions for platform detection

## Configuration Files

### capacitor.config.ts

Main configuration file for Capacitor:

```typescript
{
  appId: 'com.quotd.app',
  appName: 'QuotD',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  }
}
```

### index.html

Updated with mobile-optimized viewport settings including `viewport-fit=cover` for notched devices.

## Build Scripts

The following npm scripts are available:

### Development
- `yarn dev` - Start Vite dev server (web only)
- `yarn build` - Build for production

### Capacitor Commands

#### Sync (Copy web assets to native projects)
- `yarn cap:sync` - Sync to all platforms
- `yarn cap:sync:ios` - Sync iOS only
- `yarn cap:sync:android` - Sync Android only

#### Open in IDE
- `yarn cap:open:ios` - Open iOS project in Xcode
- `yarn cap:open:android` - Open Android project in Android Studio

#### Run on Device/Emulator
- `yarn cap:run:ios` - Build and run on iOS simulator/device
- `yarn cap:run:android` - Build and run on Android emulator/device

#### Combined Build
- `yarn build:mobile` - Build web assets and sync to all platforms

## Development Workflow

### Initial Setup (Already Completed)

1. ✅ Install Capacitor dependencies
2. ✅ Create capacitor.config.ts
3. ✅ Add iOS and Android platforms
4. ✅ Configure platform detection utilities
5. ✅ Create mobile-specific layouts and routes

### Making Changes

1. **Make code changes** to your Vue components
2. **Build the web assets**:
   ```bash
   yarn build
   ```
3. **Sync to native platforms**:
   ```bash
   yarn cap:sync
   ```

### Testing on iOS

**Requirements**: macOS with Xcode installed

```bash
# Build and sync
yarn build:mobile

# Open in Xcode
yarn cap:open:ios

# Or run directly
yarn cap:run:ios
```

### Testing on Android

**Requirements**: Android Studio installed

```bash
# Build and sync
yarn build:mobile

# Open in Android Studio
yarn cap:open:android

# Or run directly
yarn cap:run:android
```

## Platform Directories

- `ios/` - Native iOS project (Xcode)
- `android/` - Native Android project (Android Studio)

These directories are **git-ignored** and regenerated when needed.

## Capacitor Doctor

To check your Capacitor setup:

```bash
npx cap doctor
```

This will verify:
- Latest dependencies are installed
- Development environment is properly configured
- Platform-specific tools (Xcode, Android Studio) are available

## Key Features of This Setup

### ✅ Verified Components

1. **Configuration**: capacitor.config.ts properly configured
2. **Dependencies**: All Capacitor packages installed (@capacitor/core, @capacitor/cli, @capacitor/ios, @capacitor/android, @capacitor/app)
3. **Platforms**: iOS and Android projects initialized
4. **Build Process**: Verified successful builds and syncs
5. **Type Safety**: TypeScript compilation passes without errors
6. **Code Quality**: Prettier formatting applied

### Mobile Optimizations

1. **Viewport**: Configured for notched devices with `viewport-fit=cover`
2. **Safe Areas**: Bottom navigation respects safe area insets
3. **Platform Detection**: Automatic detection of native vs web environment
4. **Responsive Layout**: Bottom nav bar with proper touch targets

### Future Enhancements

The Library tab is currently a placeholder. When implementing it, you can:

1. Create a proper Library UI in `src/pages/Library.page.vue`
2. Add state management for saved quotes
3. Implement local storage or backend integration
4. Add features like favorites, sharing, etc.

## Troubleshooting

### Build Issues

If you encounter build issues:

```bash
# Clean and rebuild
rm -rf dist
yarn build
npx cap sync
```

### iOS-Specific

- Ensure Xcode Command Line Tools are installed
- Run `pod install` in the `ios/App` directory if needed
- Check iOS deployment target in Xcode (should be iOS 13.0+)

### Android-Specific

- Ensure Android Studio is installed
- Install Android SDK and build tools
- Check Android API level in `android/app/build.gradle` (should be API 22+)

### Platform Detection Not Working

If platform detection isn't working correctly, check:

1. Build output includes the platform utilities
2. Capacitor core is properly imported in main.ts
3. The app is being run through Capacitor (not directly in a browser)

## Additional Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Capacitor Vue Guide](https://capacitorjs.com/solution/vue)
- [Capacitor CLI Reference](https://capacitorjs.com/docs/cli)
- [Capacitor Workflow Guide](https://capacitorjs.com/docs/basics/workflow)
