import { forwardRef, useEffect } from 'react';
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
  children?: React.ReactNode;
  variant?: 'display' | 'download';
  outgoingImageIndex?: number; // Optional prop to handle the case when we're still loading an image
  onImageLoaded?: () => void; // Callback when image is loaded
}

export const QImage = forwardRef<HTMLDivElement, QuoteImageProps>(
  ({ currentImageIndex, children, variant, outgoingImageIndex, onImageLoaded }, ref) => {
    // Use outgoingImageIndex if provided (during loading), otherwise use currentImageIndex
    const displayImageIndex =
      typeof outgoingImageIndex === 'number' ? outgoingImageIndex : currentImageIndex;
    const isDisplayVariant = variant === 'display';

    // Effect to handle image loading
    useEffect(() => {
      // Only try to load the image if we need to (when currentImageIndex != outgoingImageIndex)
      if (outgoingImageIndex !== undefined && currentImageIndex !== outgoingImageIndex) {
        const imageUrl = ImageUrlList[currentImageIndex];

        // Load the image
        loadImageByUrl(imageUrl)
          .then(() => {
            // Notify parent that image is loaded
            if (onImageLoaded) {
              onImageLoaded();
            }
          })
          .catch((error) => {
            console.warn('Image loading failed:', error);
            // Still call onImageLoaded to prevent infinite loading state
            if (onImageLoaded) {
              onImageLoaded();
            }
          });
      }
    }, [currentImageIndex, outgoingImageIndex, onImageLoaded]);

    return (
      <div
        ref={ref}
        className="relative h-full w-full"
        style={{
          maxHeight: variant === 'display' ? 400 : undefined,
          maxWidth: variant === 'display' ? 580 : undefined,
          width: variant === 'display' ? '100%' : 1080,
          height: variant === 'display' ? '100%' : 720,
        }}
      >
        <img
          className={`mx-auto h-full w-full object-cover ${variant === 'display' ? 'rounded-md' : ''}`}
          src={ImageUrlList[displayImageIndex]}
          alt="Inspirational nature image"
          style={{ filter: 'brightness(0.7)' }}
          data-testid={isDisplayVariant ? 'quote-image' : undefined}
        />
        {children && <>{children}</>}
      </div>
    );
  }
);
