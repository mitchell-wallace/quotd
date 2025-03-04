import { Group, Container, Box, Button } from '@mantine/core';
import { useState, useCallback, useEffect, useRef } from 'react';
import { QuoteTypography, loadFontByIndex } from '../QuoteTypography/QuoteTypography';
import { FontDefinitions } from '../QuoteTypography/FontDefinitions';
import { QuoteImage } from '../QuoteImage/QuoteImage';
import { SplitButton } from '../SplitButton/SplitButton';
import { QuoteWordsList } from '../QuoteTypography/QuoteWordsList';
import { QuoteImageUrlList } from '../QuoteImage/QuoteImageUrlList';
import { IconDownload } from '@tabler/icons-react';
import html2canvas from 'html2canvas';

export function QuoteBuilder() {
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const [outgoingFontIndex, setOutgoingFontIndex] = useState(currentFontIndex);
  const [isFontLoading, setIsFontLoading] = useState(false);
  const [currentFontSize, setCurrentFontSize] = useState(2.6);
  const [currentWordsIndex, setCurrentWordsIndex] = useState(Math.floor(Math.random() * QuoteWordsList.length));
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
    setOutgoingFontIndex(currentFontIndex);
    setIsFontLoading(false);
  }, [currentFontIndex]);

  const nextFont = useCallback(() => {
    if (isFontLoading) {
      return; // Prevent changing font while loading
    }
    const nextIndex = (currentFontIndex + 1) % FontDefinitions.length;
    handleFontChange(nextIndex);
  }, [currentFontIndex, handleFontChange, isFontLoading]);

  const prevFont = useCallback(() => {
    if (isFontLoading) {
      return; // Prevent changing font while loading
    }
    const prevIndex = (currentFontIndex - 1 + FontDefinitions.length) % FontDefinitions.length;
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

  const quoteImageRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!quoteImageRef.current) {
      return;
    }
    
    try {
      // Create a canvas with fixed width of 1080px
      const canvas = await html2canvas(quoteImageRef.current, {
        scale: 1080 / quoteImageRef.current.offsetWidth,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });
      
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          }
        }, 'image/png');
      });
      
      // Create a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `quote-${new Date().getTime()}.png`;
      link.href = url;
      link.click();
      
      // Clean up
      URL.revokeObjectURL(url);
    } catch (error) {
      // console.error('Error downloading image:', error);
    }
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
      <Box pos="relative" mt={30} ref={quoteImageRef}>
        <QuoteImage 
          currentImageIndex={currentImageIndex} >
          <QuoteTypography 
            currentWordsIndex={currentWordsIndex}
            currentFontIndex={currentFontIndex}
            currentFontSize={currentFontSize}
            outgoingFontIndex={isFontLoading ? outgoingFontIndex : undefined}
            onFontLoaded={handleFontLoaded}
          />
        </QuoteImage>
      </Box>
      <Button 
        leftSection={<IconDownload size={18} />}
        onClick={handleDownload}
        mt={20}
        variant="filled"
        miw={160}
      >
        Download
      </Button>
    </Container>
  );
}