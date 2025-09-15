import { RefObject } from 'react';
import { toPng } from 'html-to-image';

/**
 * Downloads the quote image with a fixed width of 1080px
 * @param downloadFrameRef - Reference to the download frame element
 */
export const handleDownload = (downloadFrameRef: RefObject<HTMLDivElement>) => async () => {
  if (!downloadFrameRef?.current) {
    return;
  }

  try {
    // Find the QCanvas inside the download frame
    const canvasElement = downloadFrameRef.current.querySelector('div > div') as HTMLElement; // Target the Box with AspectRatio

    if (!canvasElement) {
      // console.error('Could not find canvas element for download');
      return;
    }

    // Use html-to-image to capture the canvas at 1080px width
    const dataUrl = await toPng(canvasElement, {
      pixelRatio: 1, // Use 1 to get exactly 1080x720px
      skipAutoScale: true,
      quality: 1.0,
      backgroundColor: 'white',
    });

    // Create a download link
    const link = document.createElement('a');
    link.download = `quote-${new Date().getTime()}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    // console.error('Error downloading image:', error);
  }
};
