import { Group, Container, Box } from '@mantine/core';
import { useState, useCallback } from 'react';
import { QuoteTypography } from './QuoteTypography';
import { QuoteImage, imageUrls } from './QuoteImage';
import { SplitButton } from './SplitButton';
import { QuoteWordsList } from './QuoteWordsList';

export function Quotes() {
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const [currentFontSize, setCurrentFontSize] = useState(3);
  const [currentWordsIndex, setCurrentWordsIndex] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextFont = useCallback(() => {
    setCurrentFontIndex((prev) => (prev + 1) % 11);
  }, []);

  const prevFont = useCallback(() => {
    setCurrentFontIndex((prev) => (prev - 1 + 11) % 11);
  }, []);

  const maxFontSize:number = 5.5;
  const minFontSize:number = 1.5;
  const incFontSize:number = 0.25;

  const nextFontSize = useCallback(() => {
    setCurrentFontSize((prev) => {
      const next = prev + incFontSize;
      return Math.min(next, maxFontSize);
    });
  }, []);

  const prevFontSize = useCallback(() => {
    setCurrentFontSize((prev) => {
      const next = prev - incFontSize;
      return Math.max(next, minFontSize);
    });
  }, []);

  const nextWordsIndex = useCallback(() => {
    setCurrentWordsIndex((prev) => (prev + 1) % QuoteWordsList.length);
  }, []);

  const prevWordsIndex = useCallback(() => {
    setCurrentWordsIndex((prev) => (prev - 1 + QuoteWordsList.length) % QuoteWordsList.length);
  }, []);

  const nextImageIndex = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
  }, []);

  const prevImageIndex = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  }, []);

  return (
    <Container ta="center">
      <Group justify="center" maw={580} mx="auto">
        <SplitButton
          buttonText="Font"
          prevAction={prevFont}
          nextAction={nextFont}
          iconStyle="arrows"
        />
        <SplitButton
          buttonText="Font Size"
          prevAction={prevFontSize}
          nextAction={nextFontSize}
          iconStyle="plusminus"
        />
        <SplitButton
          buttonText="Words"
          prevAction={prevWordsIndex}
          nextAction={nextWordsIndex}
          iconStyle="arrows"
        />
        <SplitButton
          buttonText="Image"
          prevAction={prevImageIndex}
          nextAction={nextImageIndex}
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
          <QuoteTypography 
            currentWordsIndex={currentWordsIndex}
            currentFontIndex={currentFontIndex}
            currentFontSize={currentFontSize}
          />
        </Box>
      </Box>
    </Container>
  );
}