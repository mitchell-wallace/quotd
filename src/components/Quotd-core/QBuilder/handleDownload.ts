import { toPng } from 'html-to-image';
import { RefObject } from 'react';

/**
 * Downloads the quote image with a fixed width of 1080px
 * @param quoteImageRef - Reference to the quote image element
 */
export const handleDownload = (
  quoteImageRef: RefObject<HTMLDivElement>
) => async () => {
  if (!quoteImageRef?.current) {
    return;
  }
  
  try {
    // Use html-to-image library to capture the element
    const dataUrl = await toPng(quoteImageRef.current, {
      width: 1080, // Fixed width
      height: 720, // Height based on 3:2 aspect ratio
      pixelRatio: 2, // Higher quality
      canvasWidth: 1080,
      canvasHeight: 720,
      skipAutoScale: true,
      style: {
        // Make sure filters are applied
        filter: 'brightness(0.7)'
      }
    });
    
    // Create a download link
    const link = document.createElement('a');
    link.download = `quote-${new Date().getTime()}.png`;
    link.href = dataUrl;
    link.click();
    
  } catch (error) {
    console.error('Error downloading image:', error);
  }
};
