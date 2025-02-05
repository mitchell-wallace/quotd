import { Image } from '@mantine/core';
import { QuoteImageUrlList } from './QuoteImageUrlList';

interface QuoteImageProps {
    currentImageIndex: number;
}

export function QuoteImage({ currentImageIndex }: QuoteImageProps) {
    return (
        <Image
            radius="md"
            height={400}
            maw={580}
            mx="auto"
            fit="cover"
            src={QuoteImageUrlList[currentImageIndex]}
            alt="Astronaut waving hello"
        />
    );
}