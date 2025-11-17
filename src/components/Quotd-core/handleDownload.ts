import { toPng } from 'html-to-image';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

/**
 * Downloads the quote image with a fixed width of 1080px
 * For Capacitor apps, saves to device and opens share dialog
 * For web, uses standard browser download
 * @param downloadFrameRef - Reference to the download frame element
 */
export const handleDownload = (downloadFrameEl: HTMLDivElement) => async () => {
  if (!downloadFrameEl) {
    return;
  }

  try {
    // Find the QCanvas inside the download frame
    const canvasElement = downloadFrameEl.querySelector('div > div') as HTMLElement; // Target the Box with AspectRatio

    if (!canvasElement) {
      console.error('Could not find canvas element for download');
      return;
    }

    // Use html-to-image to capture the canvas at 1080px width
    const dataUrl = await toPng(canvasElement, {
      pixelRatio: 1, // Use 1 to get exactly 1080x720px
      skipAutoScale: true,
      quality: 1.0,
      backgroundColor: 'white',
    });

    const fileName = `quote-${new Date().getTime()}.png`;

    // Check if running in a Capacitor native app
    if (Capacitor.isNativePlatform()) {
      // Extract base64 data from data URL
      const base64Data = dataUrl.split(',')[1];

      // Save file to device
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Cache, // Use cache directory for temporary storage
      });

      console.log('File saved to:', savedFile.uri);

      // Share the file using the native share dialog
      await Share.share({
        title: 'Share Quote',
        text: 'Check out this quote!',
        url: savedFile.uri,
        dialogTitle: 'Save or Share Quote',
      });
    } else {
      // Web browser - use standard download
      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    }
  } catch (error) {
    console.error('Error downloading image:', error);
    // Show user-friendly error message
    alert('Failed to save image. Please try again.');
  }
};
