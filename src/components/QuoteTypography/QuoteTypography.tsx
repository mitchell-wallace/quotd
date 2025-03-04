import { Text, Box, Stack } from '@mantine/core';
import { QuoteWordsList } from './QuoteWordsList';
import { useEffect, useRef, useState } from 'react';

// Import fonts
import "@fontsource/raleway";
import "@fontsource/roboto-slab";
import "@fontsource/inconsolata";
import "@fontsource/exo-2";
import "@fontsource/maiden-orange";
import "@fontsource/lilita-one";
import "@fontsource/covered-by-your-grace";
import "@fontsource/smooch-sans";
import "@fontsource/syne-mono";
import "@fontsource/walter-turncoat";
import "@fontsource/nothing-you-could-do";
import "@fontsource/josefin-slab";
import "@fontsource/architects-daughter";
import "@fontsource/love-ya-like-a-sister";
import "@fontsource/fredericka-the-great";
import { FontDefinitions } from './FontDefinitions';

// Helper function to load a font and return a promise that resolves when the font is loaded
export const loadFontByIndex = (fontIndex: number): Promise<void> => {
  return new Promise((resolve) => {
    // Add a hidden element with the target font to enable accurate font loading detection
    // Include styling redundancy to ensure it doesn't affect page styling (e.g. increasing page length)
    const hiddenElement = document.createElement('span');
    Object.assign(hiddenElement.style, {
      fontFamily: `"${FontDefinitions[fontIndex].fontName}"`,
      visibility: 'hidden',
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '0px',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      maxWidth: 0,
      maxHeight: 0
    });
    hiddenElement.textContent = '\u00A0'; // Non-breaking space
    document.body.appendChild(hiddenElement);

    document.fonts.ready.then(() => {
      const checkFontLoaded = () => {
        if (document.fonts.check(`1em "${FontDefinitions[fontIndex].fontName}"`)) {
          hiddenElement.remove();
          resolve();
          return true;
        }
        return false;
      };
      const isLoadedPreviously = checkFontLoaded();

      // If not loaded
      if (!isLoadedPreviously) {
        document.fonts.load(`1em "${FontDefinitions[fontIndex].fontName}"`);
        for (let i = 0; i < 50; i++) { // Check every 100ms for up to 5s
          setTimeout(() => {
            resolve();
          }, 100);
          if (checkFontLoaded()) {
            break;
          }
        }
        // Clean up if font is not loaded in time
        hiddenElement.remove();
        
      }
    });
  });
};

interface QuoteTextProps {
  currentWordsIndex: number;
  currentFontIndex: number;
  currentFontSize: number;
  outgoingFontIndex?: number; // Optional prop to handle the case when we're still loading a font
  onFontLoaded?: () => void; // Callback when font is loaded
}

export function QuoteTypography({ 
  currentWordsIndex, 
  currentFontIndex, 
  currentFontSize,
  outgoingFontIndex,
  onFontLoaded
}: QuoteTextProps) {
  // Use previousFontIndex if provided (during loading), otherwise use currentFontIndex
  const displayFontIndex = typeof outgoingFontIndex === 'number' ? outgoingFontIndex : currentFontIndex;
  const boxRef = useRef<HTMLDivElement>(null);
  const [viewScaleFactor, setViewScaleFactor] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (boxRef.current) {
        // Base the scale on the box width, where 580 is our max width
        // This gives us 1 at max width, scaling down proportionally
        const scale = boxRef.current.offsetWidth / 580;
        setViewScaleFactor(scale);
      }
    };

    const resizeObserver = new ResizeObserver(updateScale);
    if (boxRef.current) {
      resizeObserver.observe(boxRef.current);
      updateScale(); // Initial measurement
    }

    return () => resizeObserver.disconnect();
  }, []);

  // Effect to handle font loading
  useEffect(() => {
    // Only try to load the font if we need to (when currentFontIndex != previousFontIndex)
    if (outgoingFontIndex !== undefined && currentFontIndex !== outgoingFontIndex) {
      // const fontToLoad = fonts[currentFontIndex].fontName;
      
      // Load the font
      loadFontByIndex(currentFontIndex).then(() => {
        // Notify parent that font is loaded
        if (onFontLoaded) {
          onFontLoaded();
        }
      });
    }
  }, [currentFontIndex, outgoingFontIndex, onFontLoaded]);

  return (
    <Box
      ref={boxRef}
      pos="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      mah={400}
      maw={580}
      mx="auto"
      p={`${2 * viewScaleFactor}em`}
      display="flex"
      style={{
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Stack align="center">
        <Text 
          maw={500}
          style={{ 
            fontFamily: `"${FontDefinitions[displayFontIndex].fontName}", sans-serif`,
            fontSize: `${currentFontSize * FontDefinitions[displayFontIndex].sizingFactor * viewScaleFactor}em`,
            fontDisplay: 'swap',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            lineHeight: `${1.4 * FontDefinitions[displayFontIndex].spacingFactor}`,
            maxWidth: '80%'
          }}
        >
          {QuoteWordsList[currentWordsIndex].text}
        </Text>
        <Text 
          maw={500}
          style={{ 
            fontFamily: `"${FontDefinitions[displayFontIndex].fontName}", sans-serif`,
            fontSize: `${(currentFontSize * FontDefinitions[displayFontIndex].sizingFactor * viewScaleFactor) - 0.6}em`,
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            lineHeight: `${1.4 * FontDefinitions[displayFontIndex].spacingFactor}`,
            maxWidth: '80%'
          }}
        >
          {QuoteWordsList[currentWordsIndex].source} {QuoteWordsList[currentWordsIndex].translation}
        </Text>
      </Stack>
    </Box>
  );
}

export type { QuoteTextProps };
