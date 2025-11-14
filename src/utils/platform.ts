import { Capacitor } from '@capacitor/core';

/**
 * Checks if the app is running as a native mobile app via Capacitor
 */
export const isNativeApp = (): boolean => {
  return Capacitor.isNativePlatform();
};

/**
 * Gets the current platform (ios, android, or web)
 */
export const getPlatform = (): string => {
  return Capacitor.getPlatform();
};

/**
 * Checks if running on iOS
 */
export const isIOS = (): boolean => {
  return Capacitor.getPlatform() === 'ios';
};

/**
 * Checks if running on Android
 */
export const isAndroid = (): boolean => {
  return Capacitor.getPlatform() === 'android';
};
