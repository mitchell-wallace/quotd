import { Image } from '@mantine/core';

const imageUrls = ["/assets/images/hello.jpeg"] as const;

interface QuoteImageProps {
    currentImageIndex: number;
  }

export function QuoteImage({ currentImageIndex }: QuoteImageProps) {
    return (
        <>
        <Image
          radius="md"
          height={400}
          maw={580}
          mx="auto"
          fit="cover"
          src={imageUrls[currentImageIndex]}
          alt="Astronaut waving hello"
        />
        </>
        
    );
}