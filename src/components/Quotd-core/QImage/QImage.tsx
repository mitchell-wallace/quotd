import { Image, AspectRatio  } from '@mantine/core';
import { QImageUrlList } from './QImageUrlList';

interface QuoteImageProps {
    currentImageIndex: number;
    children?: React.ReactNode;
}

export function QImage({ currentImageIndex, children }: QuoteImageProps) {
    return (
        <AspectRatio ratio={3/2} style={{ position: 'relative' }}>
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
        </AspectRatio>
    );
}
