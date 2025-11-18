import { toPng } from 'html-to-image';
import { Capacitor } from '@capacitor/core';
import { saveToLibrary } from '../../services/libraryService';

/**
 * Captures the quote canvas as a PNG data URL
 */
async function captureQuoteImage(downloadFrameEl: HTMLDivElement): Promise<string> {
  const canvasElement = downloadFrameEl.querySelector('div > div') as HTMLElement;

  if (!canvasElement) {
    throw new Error('Could not find canvas element for download');
  }

  return await toPng(canvasElement, {
    pixelRatio: 1, // Use 1 to get exactly 1080x720px
    skipAutoScale: true,
    quality: 1.0,
    backgroundColor: 'white',
  });
}

/**
 * Web download: Standard browser download link
 */
async function handleWebDownload(dataUrl: string, fileName: string): Promise<void> {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  link.click();
}

/**
 * Mobile download: Save to app's library folder
 */
async function handleMobileDownload(dataUrl: string): Promise<void> {
  const base64Data = dataUrl.split(',')[1];

  // Save to library
  const savedImage = await saveToLibrary(base64Data);

  console.log('File saved to library:', savedImage.uri);

  // Show success message
  alert('Quote saved to Library!');
}

/**
 * Downloads the quote image with a fixed width of 1080px
 * For Capacitor apps, saves to app library folder
 * For web, uses standard browser download
 * @param downloadFrameEl - Reference to the download frame element
 */
export const handleDownload = (downloadFrameEl: HTMLDivElement) => async () => {
  if (!downloadFrameEl) {
    return;
  }

  try {
    const dataUrl = await captureQuoteImage(downloadFrameEl);
    const fileName = `quote-${new Date().getTime()}.png`;

    if (Capacitor.isNativePlatform()) {
      await handleMobileDownload(dataUrl);
    } else {
      await handleWebDownload(dataUrl, fileName);
    }
  } catch (error) {
    console.error('Error downloading image:', error);
    alert('Failed to download image. Please try again.');
  }
};
