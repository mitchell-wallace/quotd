import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.quotd.app',
  appName: 'QuotD',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
    SafeArea: {
      offsetForKeyboardInsetBug: true,
    },
  },
};

export default config;
