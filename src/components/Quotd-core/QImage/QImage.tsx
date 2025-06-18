import { Image } from '@mantine/core';
import { ImageUrlList } from '../../../data/ImageUrlList';
import { forwardRef } from 'react';

interface QuoteImageProps {
    currentImageIndex: number;
    children?: React.ReactNode;
    variant?: 'display' | 'download';
}

export const QImage = forwardRef<HTMLDivElement, QuoteImageProps>(
    ({ currentImageIndex, children, variant }) => {
        return (
            <>
                <Image
                    {...(variant === 'display'
                        ? { mah: 400, maw: 580, radius: 'md' }
                        : { h: 720, w: 1080 }
                    )}
                    mx="auto"
                    fit="cover"
                    src={ImageUrlList[currentImageIndex]}
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
