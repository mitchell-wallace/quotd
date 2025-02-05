import { Image } from '@mantine/core';

export const imageUrls = [
    "/assets/images/hello.jpeg",
    "https://images.unsplash.com/photo-1738584672976-3518c132482d?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1738249034651-1896f689be58?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

] as const;

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