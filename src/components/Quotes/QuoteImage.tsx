import { Image } from '@mantine/core';
import { createApi } from 'unsplash-js';

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY as string
});

export const imageUrls = [
    "/assets/images/hello.jpeg",
    "https://images.unsplash.com/photo-1738584672976-3518c132482d?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1738249034651-1896f689be58?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
] as const;

export async function fetchRandomNatureImage(): Promise<string | null> {
    try {
        const result = await unsplash.photos.getRandom({
            query: 'nature landscape',
            orientation: 'landscape'
        });

        if (result.type === 'success') {
            const photo = result.response;
            if (!Array.isArray(photo)) {  // getRandom returns single photo
                console.log(photo.urls.regular);
                return photo.urls.regular;
            }
        }
        return null;
    } catch (error) {
        console.error('Error fetching image from Unsplash:', error);
        return null;
    }
}

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
            src={imageUrls[currentImageIndex]}
            alt="Astronaut waving hello"
        />
    );
}