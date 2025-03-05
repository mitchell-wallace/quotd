import { Image } from '@mantine/core';
import { QImageUrlList } from './QImageUrlList';
import { forwardRef } from 'react';

interface QuoteImageProps {
    currentImageIndex: number;
    children?: React.ReactNode;
    variant?: 'display' | 'download';
}

export const QImage = forwardRef<HTMLDivElement, QuoteImageProps>(
    ({ currentImageIndex, children, variant }, ref) => {
        return (
            <>
                <Image
                    {...(variant === 'display'
                        ? { mah: 400, maw: 580, radius: 'md' }
                        : { h: 720, w: 1080 }
                    )}
                    mx="auto"
                    fit="cover"
                    src={QImageUrlList[currentImageIndex]}
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
