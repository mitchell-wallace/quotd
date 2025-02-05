import { Group, Container, Box } from '@mantine/core';
import { useState, useCallback } from 'react';
import { QuoteText } from './QuoteText';
import { QuoteImage } from './QuoteImage';
import { SplitButton } from './SplitButton';

export function Quotes() {
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextFont = useCallback(() => {
    setCurrentFontIndex((prev) => (prev + 1) % 11);
  }, []);

  const prevFont = useCallback(() => {
    setCurrentFontIndex((prev) => (prev - 1 + 11) % 11);
  }, []);

  return (
    <Container ta="center">
      <Group justify="center">
        <SplitButton
          buttonText="Font"
          prevAction={prevFont}
          nextAction={nextFont}
          iconStyle="arrows"
        />
      </Group>
      <Box pos="relative" mt={30}>
        <QuoteImage 
          currentImageIndex={currentImageIndex} />
        <Box 
          pos="absolute" 
          top={0} 
          left={0} 
          right={0} 
          bottom={0} 
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <QuoteText 
            text="The journey of a thousand miles begins with a single step"
            currentFontIndex={currentFontIndex}
          />
        </Box>
      </Box>
    </Container>
  );
}