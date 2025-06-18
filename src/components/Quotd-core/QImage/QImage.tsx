import { Image } from '@mantine/core';
import { ImageUrlList } from '../../../data/ImageUrlList';
import { forwardRef, useEffect } from 'react';

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
        const displayImageIndex = typeof outgoingImageIndex === 'number' ? outgoingImageIndex : currentImageIndex;

        // Effect to handle image loading
        useEffect(() => {
            // Only try to load the image if we need to (when currentImageIndex != outgoingImageIndex)
            if (outgoingImageIndex !== undefined && currentImageIndex !== outgoingImageIndex) {
                const imageUrl = ImageUrlList[currentImageIndex];
                
                // Load the image
                loadImageByUrl(imageUrl).then(() => {
                    // Notify parent that image is loaded
                    if (onImageLoaded) {
                        onImageLoaded();
                    }
                }).catch((error) => {
                    console.warn('Image loading failed:', error);
                    // Still call onImageLoaded to prevent infinite loading state
                    if (onImageLoaded) {
                        onImageLoaded();
                    }
                });
            }
        }, [currentImageIndex, outgoingImageIndex, onImageLoaded]);

        return (
            <>
                <Image
                    {...(variant === 'display'
                        ? { mah: 400, maw: 580, radius: 'md' }
                        : { h: 720, w: 1080 }
                    )}
                    mx="auto"
                    fit="cover"
                    src={ImageUrlList[displayImageIndex]}
                    alt="Inspirational nature image"
                    style={{
                    filter: 'brightness(0.7)' // Reduces brightness by 30%
                    }}
                />
                {children && (
                <>{children}</>
                )}
            </>
        );
    }
);
