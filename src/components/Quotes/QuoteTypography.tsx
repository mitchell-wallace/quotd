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

interface FontDefinition {
  fontName: string;
  sizingFactor: number;
  spacingFactor: number;
}

export const fonts: FontDefinition[] = [
  { fontName: 'Raleway', sizingFactor: 0.75, spacingFactor: 0.9 },
  { fontName: 'Roboto Slab', sizingFactor: 0.7, spacingFactor: 1.0 },
  { fontName: 'Inconsolata', sizingFactor: 0.7, spacingFactor: 1.0 },
  { fontName: 'Exo 2', sizingFactor: 0.75, spacingFactor: 0.95 },
  { fontName: 'Maiden Orange', sizingFactor: 0.95, spacingFactor: 0.8 },
  { fontName: 'Lilita One', sizingFactor: 0.8, spacingFactor: 0.95 },
  { fontName: 'Covered By Your Grace', sizingFactor: 0.9, spacingFactor: 0.85 },
  { fontName: 'Smooch Sans', sizingFactor: 1.0, spacingFactor: 0.75 },
  { fontName: 'Syne Mono', sizingFactor: 0.65, spacingFactor: 1.05 },
  { fontName: 'Walter Turncoat', sizingFactor: 0.7, spacingFactor: 1 },
  { fontName: 'Nothing You Could Do', sizingFactor: 0.7, spacingFactor: 1 },
  { fontName: 'Josefin Slab', sizingFactor: 0.8, spacingFactor: 0.85 },
  { fontName: 'Architects Daughter', sizingFactor: 0.7, spacingFactor: 1 },
  { fontName: 'Love Ya Like A Sister', sizingFactor: 0.7, spacingFactor: 1 },
  { fontName: 'Fredericka the Great', sizingFactor: 0.7, spacingFactor: 1 },
] as const;

// Helper function to load a font and return a promise that resolves when the font is loaded
export const loadFontByIndex = (fontIndex: number): Promise<void> => {
  return new Promise((resolve) => {
    // Use the FontFace API's document.fonts.ready promise
    // This doesn't seem correct - there is still a brief moment where the font is not loaded
    document.fonts.ready.then(() => {
      const checkFontLoaded = () => {
        if (document.fonts.check(`1em "${fonts[fontIndex].fontName}"`)) {
          resolve();
          return true;
        }
        return false;
      };
      const isLoadedPreviously = checkFontLoaded();

      // If not loaded
      if (!isLoadedPreviously) {
        document.fonts.load(`1em "${fonts[fontIndex].fontName}"`);
        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            resolve();
          }, 100);
          if (checkFontLoaded()) {
            break;
          }
        }
        
      }
    });
  });
};

interface QuoteTextProps {
  currentWordsIndex: number;
  currentFontIndex: number;
  currentFontSize: number;
  previousFontIndex?: number; // Optional prop to handle the case when we're still loading a font
  onFontLoaded?: () => void; // Callback when font is loaded
}

export function QuoteTypography({ 
  currentWordsIndex, 
  currentFontIndex, 
  currentFontSize,
  previousFontIndex,
  onFontLoaded
}: QuoteTextProps) {
  // Use previousFontIndex if provided (during loading), otherwise use currentFontIndex
  const displayFontIndex = typeof previousFontIndex === 'number' ? previousFontIndex : currentFontIndex;
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
    if (previousFontIndex !== undefined && currentFontIndex !== previousFontIndex) {
      // const fontToLoad = fonts[currentFontIndex].fontName;
      
      // Load the font
      loadFontByIndex(currentFontIndex).then(() => {
        // Notify parent that font is loaded
        if (onFontLoaded) {
          onFontLoaded();
        }
      });
    }
  }, [currentFontIndex, previousFontIndex, onFontLoaded]);

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
            fontFamily: `"${fonts[displayFontIndex].fontName}", sans-serif`,
            fontSize: `${currentFontSize * fonts[displayFontIndex].sizingFactor * viewScaleFactor}em`,
            fontDisplay: 'swap',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            lineHeight: `${1.4 * fonts[displayFontIndex].spacingFactor}`,
            maxWidth: '80%'
          }}
        >
          {QuoteWordsList[currentWordsIndex].text}
        </Text>
        <Text 
          maw={500}
          style={{ 
            fontFamily: `"${fonts[displayFontIndex].fontName}", sans-serif`,
            fontSize: `${(currentFontSize * fonts[displayFontIndex].sizingFactor * viewScaleFactor) - 0.8}em`,
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            lineHeight: `${1.4 * fonts[displayFontIndex].spacingFactor}`,
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
