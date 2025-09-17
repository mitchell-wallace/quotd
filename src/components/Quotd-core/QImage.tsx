import { createEffect, JSX } from 'solid-js';
import { ImageUrlList } from '../../data/ImageUrlList';

// Helper function to load an image and return a promise that resolves when the image is loaded
export const loadImageByUrl = (imageUrl: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
    img.src = imageUrl;
  });
};

interface QuoteImageProps {
  currentImageIndex: number;
  variant?: 'display' | 'download';
  outgoingImageIndex?: number; // Optional prop to handle the case when we're still loading an image
  onImageLoaded?: () => void; // Callback when image is loaded
  children?: JSX.Element;
}

export function QImage({ currentImageIndex, children, variant, outgoingImageIndex, onImageLoaded }: QuoteImageProps) {
  // Use outgoingImageIndex if provided (during loading), otherwise use currentImageIndex
  const displayImageIndex =
    typeof outgoingImageIndex === 'number' ? outgoingImageIndex : currentImageIndex;
  const isDisplayVariant = variant === 'display';

  // Effect to handle image loading
  createEffect(() => {
    // Only try to load the image if we need to (when currentImageIndex != outgoingImageIndex)
    if (outgoingImageIndex !== undefined && currentImageIndex !== outgoingImageIndex) {
      const imageUrl = ImageUrlList[currentImageIndex];

      // Load the image
      loadImageByUrl(imageUrl)
        .then(() => {
          if (onImageLoaded) onImageLoaded();
        })
        .catch((error) => {
          console.warn('Image loading failed:', error);
          if (onImageLoaded) onImageLoaded();
        });
    }
  });

  return (
    <div
      class="relative h-full w-full"
      style={{
        'max-height': variant === 'display' ? '400px' : undefined,
        'max-width': variant === 'display' ? '580px' : undefined,
        width: variant === 'display' ? '100%' : '1080px',
        height: variant === 'display' ? '100%' : '720px',
      }}
    >
      <img
        class={`mx-auto h-full w-full object-cover ${variant === 'display' ? 'rounded-md' : ''}`}
        src={ImageUrlList[displayImageIndex]}
        alt="Inspirational nature image"
        style={{ filter: 'brightness(0.7)' }}
        data-testid={isDisplayVariant ? 'quote-image' : undefined}
      />
      {children}
    </div>
  );
}
