import { Text, Box } from '@mantine/core';
import { QuoteWordsList } from './QuoteWordsList';
import { useEffect, useRef, useState } from 'react';

// Import fonts
import "@fontsource/tangerine";
import "@fontsource/amatic-sc";
import "@fontsource/josefin-slab";
import "@fontsource/architects-daughter";
import "@fontsource/reenie-beanie";
import "@fontsource/fredericka-the-great";
import "@fontsource/love-ya-like-a-sister";
import "@fontsource/syne-mono";
import "@fontsource/walter-turncoat";
import "@fontsource/nothing-you-could-do";
import "@fontsource/covered-by-your-grace";

export const fonts = [
  { value: 'Reenie Beanie', label: 'Reenie Beanie', sizingFactor: 1, spacingFactor: 0.7 },
  { value: 'Amatic SC', label: 'Amatic SC', sizingFactor: 1.1, spacingFactor: 0.85 },
  { value: 'Josefin Slab', label: 'Josefin Slab', sizingFactor: 0.8, spacingFactor: 1 },
  { value: 'Syne Mono', label: 'Syne Mono', sizingFactor: 0.6, spacingFactor: 1.1 },
  { value: 'Walter Turncoat', label: 'Walter Turncoat', sizingFactor: 0.7, spacingFactor: 1 },
  { value: 'Nothing You Could Do', label: 'Nothing You Could Do', sizingFactor: 0.7, spacingFactor: 1 },
  { value: 'Covered By Your Grace', label: 'Covered By Your Grace', sizingFactor: 0.9, spacingFactor: 0.9 },
  { value: 'Architects Daughter', label: 'Architects Daughter', sizingFactor: 0.7, spacingFactor: 1 },
  { value: 'Love Ya Like A Sister', label: 'Love Ya Like A Sister', sizingFactor: 0.7, spacingFactor: 1 },
  { value: 'Fredericka the Great', label: 'Fredericka the Great', sizingFactor: 0.7, spacingFactor: 1 },
  { value: 'Tangerine', label: 'Tangerine', sizingFactor: 1.4, spacingFactor: 0.7 }
] as const;

// Helper function to load a font and return a promise that resolves when the font is loaded
export const loadFont = (fontFamily: string): Promise<void> => {
  return new Promise((resolve) => {
    // Use the FontFace API to check if the font is loaded
    document.fonts.ready.then(() => {
      setTimeout(() => {
        document.body.removeChild(testElement);
        // Resolve anyway after timeout to prevent hanging
        resolve();
      }, 3000); // 3 second timeout

      // Create a test element with the font
      const testElement = document.createElement('span');
      testElement.style.fontFamily = `"${fontFamily}", sans-serif`;
      testElement.style.visibility = 'hidden';
      testElement.textContent = 'Test Font Loading';
      document.body.appendChild(testElement);
      
      // Check if font is already loaded
      if (document.fonts.check(`1em "${fontFamily}"`)) {
        document.body.removeChild(testElement);
        resolve();
        return;
      }
      
      // If not loaded yet, wait for it to load
      const timeout = setTimeout(() => {
        document.body.removeChild(testElement);
        // Resolve anyway after timeout to prevent hanging
        resolve();
      }, 3000); // 3 second timeout
      
      // Set up an observer to check when the font loads
      const checkFont = () => {
        if (document.fonts.check(`1em "${fontFamily}"`)) {
          clearTimeout(timeout);
          document.body.removeChild(testElement);
          resolve();
          return true;
        }
        return false;
      };
      
      // Try checking immediately
      if (!checkFont()) {
        // If not loaded, check periodically
        const interval = setInterval(() => {
          if (checkFont()) {
            clearInterval(interval);
          }
        }, 50);
        
        // Clear interval after timeout
        setTimeout(() => clearInterval(interval), 3000);
      }
    });
  });
};

interface QuoteTextProps {
  currentWordsIndex: number;
  currentFontIndex: number;
  currentFontSize: number;
  actualFontIndex?: number; // Optional prop to handle the case when we're still loading a font
  onFontLoaded?: () => void; // Callback when font is loaded
}

export function QuoteTypography({ 
  currentWordsIndex, 
  currentFontIndex, 
  currentFontSize,
  actualFontIndex,
  onFontLoaded
}: QuoteTextProps) {
  // Use actualFontIndex if provided (during loading), otherwise use currentFontIndex
  const displayFontIndex = typeof actualFontIndex === 'number' ? actualFontIndex : currentFontIndex;
  const selectedFont = fonts[displayFontIndex].value;
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
    // Only try to load the font if we need to (when currentFontIndex != actualFontIndex)
    if (actualFontIndex !== undefined && currentFontIndex !== actualFontIndex) {
      const fontToLoad = fonts[currentFontIndex].value;
      
      // Load the font
      loadFont(fontToLoad).then(() => {
        // Notify parent that font is loaded
        if (onFontLoaded) {
          onFontLoaded();
        }
      });
    }
  }, [currentFontIndex, actualFontIndex, onFontLoaded]);

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
      <Text 
        maw={500}
        style={{ 
          fontFamily: `"${selectedFont}", sans-serif`,
          fontSize: `${currentFontSize * fonts[displayFontIndex].sizingFactor * viewScaleFactor}em`,
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          lineHeight: `${1.4 * fonts[displayFontIndex].spacingFactor}`,
          maxWidth: '80%'
        }}
      >
        {QuoteWordsList[currentWordsIndex].text}
      </Text>
    </Box>
  );
}

export type { QuoteTextProps };
