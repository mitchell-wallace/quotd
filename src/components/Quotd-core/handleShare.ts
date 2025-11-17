import { toPng } from 'html-to-image';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

/**
 * Captures the quote canvas as a PNG data URL
 */
async function captureQuoteImage(downloadFrameEl: HTMLDivElement): Promise<string> {
  const canvasElement = downloadFrameEl.querySelector('div > div') as HTMLElement;

  if (!canvasElement) {
    throw new Error('Could not find canvas element for share');
  }

  return await toPng(canvasElement, {
    pixelRatio: 1,
    skipAutoScale: true,
    quality: 1.0,
    backgroundColor: 'white',
  });
}

/**
 * Web share: Creates a shareable URL with quote configuration and copies to clipboard
 * Returns a callback to reset the button state
 */
async function handleWebShare(
  fontIndex: number,
  fontSize: number,
  wordsIndex: number,
  imageIndex: number,
): Promise<() => void> {
  // Build share URL with query parameters
  const baseUrl = window.location.origin + window.location.pathname;
  const params = new URLSearchParams({
    font: fontIndex.toString(),
    size: fontSize.toString(),
    words: wordsIndex.toString(),
    image: imageIndex.toString(),
  });

  const shareUrl = `${baseUrl}?${params.toString()}`;

  // Copy to clipboard
  try {
    await navigator.clipboard.writeText(shareUrl);
    console.log('Share URL copied to clipboard:', shareUrl);

    // Return a no-op reset function for web
    return () => {};
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    throw new Error('Failed to copy link to clipboard');
  }
}

/**
 * Mobile share: Saves image and opens native share dialog
 */
async function handleMobileShare(dataUrl: string): Promise<() => void> {
  const base64Data = dataUrl.split(',')[1];
  const fileName = `quote-${new Date().getTime()}.png`;

  // Save file to cache directory for temporary sharing
  const savedFile = await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: Directory.Cache,
  });

  console.log('File saved to cache for sharing:', savedFile.uri);

  // Open native share dialog
  await Share.share({
    title: 'Share Quote',
    text: 'Check out this quote!',
    url: savedFile.uri,
    dialogTitle: 'Share Quote',
  });

  // Return a no-op reset function for mobile
  return () => {};
}

export interface ShareOptions {
  downloadFrameEl: HTMLDivElement;
  fontIndex: number;
  fontSize: number;
  wordsIndex: number;
  imageIndex: number;
}

/**
 * Shares the quote
 * For web: Creates shareable URL and copies to clipboard
 * For mobile: Opens native share dialog with the image
 * Returns a callback to reset button state (used for "Copied!" feedback on web)
 */
export const handleShare =
  (options: ShareOptions) =>
  async (): Promise<() => void> => {
    const { downloadFrameEl, fontIndex, fontSize, wordsIndex, imageIndex } = options;

    if (!downloadFrameEl) {
      throw new Error('Download frame element is required');
    }

    try {
      if (Capacitor.isNativePlatform()) {
        // Mobile: Capture image and share via native dialog
        const dataUrl = await captureQuoteImage(downloadFrameEl);
        return await handleMobileShare(dataUrl);
      } else {
        // Web: Create and copy share URL
        return await handleWebShare(fontIndex, fontSize, wordsIndex, imageIndex);
      }
    } catch (error) {
      console.error('Error sharing quote:', error);
      throw error;
    }
  };
