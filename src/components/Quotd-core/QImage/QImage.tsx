import { Image } from '@mantine/core';
import { QImageUrlList } from './QImageUrlList';
import { forwardRef } from 'react';

interface QuoteImageProps {
    currentImageIndex: number;
    children?: React.ReactNode;
}

export const QImage = forwardRef<HTMLDivElement, QuoteImageProps>(
    ({ currentImageIndex, children }) => {
        return (
            <>
                <Image
                    radius="md"
                    mah={400}
                    maw={580}
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
