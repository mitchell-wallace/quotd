import { Group, Container, Box } from '@mantine/core';
import { useState, useCallback } from 'react';
import { QuoteTypography } from './QuoteTypography';
import { QuoteImage } from './QuoteImage';
import { SplitButton } from './SplitButton';
import { QuoteWordsList } from './QuoteWordsList';
import { QuoteImageUrlList } from './QuoteImageUrlList';

export function Quotes() {
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const [currentFontSize, setCurrentFontSize] = useState(2.6);
  const [currentWordsIndex, setCurrentWordsIndex] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextFont = useCallback(() => {
    setCurrentFontIndex((prev) => (prev + 1) % 11);
  }, []);

  const prevFont = useCallback(() => {
    setCurrentFontIndex((prev) => (prev - 1 + 11) % 11);
  }, []);

  const maxFontSize:number = 3.4;
  const minFontSize:number = 2.0;
  const incFontSize:number = 0.2;

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
    setCurrentImageIndex((prev) => (prev + 1) % QuoteImageUrlList.length);
  }, []);

  const prevImageIndex = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + QuoteImageUrlList.length) % QuoteImageUrlList.length);
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
          currentImageIndex={currentImageIndex} >
          <QuoteTypography 
            currentWordsIndex={currentWordsIndex}
            currentFontIndex={currentFontIndex}
            currentFontSize={currentFontSize}
          />
        </QuoteImage>
      </Box>
    </Container>
  );
}