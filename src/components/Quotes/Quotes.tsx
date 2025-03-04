import { Group, Container, Box } from '@mantine/core';
import { useState, useCallback, useEffect } from 'react';
import { QuoteTypography, fonts, loadFontByIndex } from './QuoteTypography';
import { QuoteImage } from './QuoteImage';
import { SplitButton } from './SplitButton';
import { QuoteWordsList } from './QuoteWordsList';
import { QuoteImageUrlList } from './QuoteImageUrlList';

export function Quotes() {
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const [actualFontIndex, setActualFontIndex] = useState(0); // Tracks the currently displayed font
  const [isFontLoading, setIsFontLoading] = useState(false);
  const [currentFontSize, setCurrentFontSize] = useState(2.6);
  const [currentWordsIndex, setCurrentWordsIndex] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Preload the initial font
  useEffect(() => {
    // Load the first font on mount
    loadFontByIndex(0);
  }, []);

  const handleFontChange = useCallback(async (newIndex: number) => {
    setIsFontLoading(true);
    setCurrentFontIndex(newIndex);
    // The actual font will be updated once loading is complete
  }, []);

  const handleFontLoaded = useCallback(() => {
    // Update the actual font index to match the current font index once loaded
    setActualFontIndex(currentFontIndex);
    setIsFontLoading(false);
  }, [currentFontIndex]);

  const nextFont = useCallback(() => {
    if (isFontLoading) {
      return; // Prevent changing font while loading
    }
    const nextIndex = (currentFontIndex + 1) % fonts.length;
    handleFontChange(nextIndex);
  }, [currentFontIndex, handleFontChange, isFontLoading]);

  const prevFont = useCallback(() => {
    if (isFontLoading) {
      return; // Prevent changing font while loading
    }
    const prevIndex = (currentFontIndex - 1 + fonts.length) % fonts.length;
    handleFontChange(prevIndex);
  }, [currentFontIndex, handleFontChange, isFontLoading]);

  const maxFontSize:number = 3.2;
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
          loading={isFontLoading}
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
            previousFontIndex={isFontLoading ? actualFontIndex : undefined}
            onFontLoaded={handleFontLoaded}
          />
        </QuoteImage>
      </Box>
    </Container>
  );
}