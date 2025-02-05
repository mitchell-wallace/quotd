import { Image } from '@mantine/core';

export function QuoteImage() {
    return (
        <>
        <Image
          radius="md"
          height={400}
          maw={580}
          mx="auto"
          fit="cover"
          src="/assets/images/hello.jpeg"
          alt="Astronaut waving hello"
        />
        </>
        
    );
}