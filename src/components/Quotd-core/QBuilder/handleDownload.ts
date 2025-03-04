import html2canvas from 'html2canvas';
import { QuoteImageUrlList } from '../../QuoteImage/QuoteImageUrlList';
import { RefObject } from 'react';

/**
 * Downloads the quote image with a fixed width of 1080px
 * @param quoteImageRef - Reference to the quote image element
 * @param currentImageIndex - Current image index in the QuoteImageUrlList
 */
export const handleDownload = (
  quoteImageRef: RefObject<HTMLDivElement> | null,
  currentImageIndex: number
) => async () => {
  if (!quoteImageRef?.current) {
    return;
  }
  
  try {
    // Get the original image URL
    const imageUrl = QuoteImageUrlList[currentImageIndex];
    
    // Create a new offscreen canvas for manual drawing
    const canvas = document.createElement('canvas');
    const width = 1080;
    const height = width * (2/3); // Maintain 3:2 aspect ratio
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    
    // Create a new image for drawing
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    // Wait for the image to load
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = imageUrl;
    });
    
    // Draw the image with correct sizing (cover)
    const imgRatio = img.width / img.height;
    let drawWidth, drawHeight, offsetX = 0, offsetY = 0;
    
    if (imgRatio > width / height) {
      // Image is wider than canvas
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    } else {
      // Image is taller than canvas
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    }
    
    // Draw image
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    
    // Apply brightness filter
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'; // equivalent to brightness(0.7)
    ctx.fillRect(0, 0, width, height);
    
    // Now capture the text/typography separately
    const textElement = quoteImageRef.current.querySelector('.quote-typography');
    if (textElement) {
      // Use html2canvas just for the text part
      const textCanvas = await html2canvas(textElement as HTMLElement, {
        backgroundColor: null,
        scale: width / quoteImageRef.current.offsetWidth
      });
      
      // Draw text canvas on top of our image
      ctx.drawImage(textCanvas, 0, 0, width, height);
    }
    
    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        }
      }, 'image/png');
    });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `quote-${new Date().getTime()}.png`;
    link.href = url;
    link.click();
    
    // Clean up
    URL.revokeObjectURL(url);
  } catch (error) {
    // console.error('Error downloading image:', error);
  }
};
