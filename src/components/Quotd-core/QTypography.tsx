import { useEffect, useRef, useState } from 'react';
import { WordsList } from '../../data/WordsList';
// Import fonts
import '@fontsource/raleway';
import '@fontsource/roboto-slab';
import '@fontsource/inconsolata';
import '@fontsource/exo-2';
import '@fontsource/maiden-orange';
import '@fontsource/lilita-one';
import '@fontsource/covered-by-your-grace';
import '@fontsource/smooch-sans';
import '@fontsource/syne-mono';
import '@fontsource/walter-turncoat';
import '@fontsource/nothing-you-could-do';
import '@fontsource/josefin-slab';
import '@fontsource/architects-daughter';
import '@fontsource/love-ya-like-a-sister';
import '@fontsource/fredericka-the-great';

import { FontDefinitions } from '../../data/FontDefinitions';

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
      maxHeight: 0,
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
        for (let i = 0; i < 50; i++) {
          // Check every 100ms for up to 5s
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
  variant?: 'display' | 'download';
  currentWordsIndex: number;
  currentFontIndex: number;
  currentFontSize: number;
  outgoingFontIndex?: number; // Optional prop to handle the case when we're still loading a font
  onFontLoaded?: () => void; // Callback when font is loaded
}

export function QTypography({
  variant,
  currentWordsIndex,
  currentFontIndex,
  currentFontSize,
  outgoingFontIndex,
  onFontLoaded,
}: QuoteTextProps) {
  // Use previousFontIndex if provided (during loading), otherwise use currentFontIndex
  const displayFontIndex =
    typeof outgoingFontIndex === 'number' ? outgoingFontIndex : currentFontIndex;
  const boxRef = useRef<HTMLDivElement>(null);
  const [viewScaleFactor, setViewScaleFactor] = useState(1);
  const isDisplayVariant = variant !== 'download';

  useEffect(() => {
    if (variant === 'download') {
      // Set a constant scale of 1080 / 580
      setViewScaleFactor(1080 / 580);
    }

    const updateScale = () => {
      if (variant === 'display' && boxRef.current) {
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
  }, [variant]);

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
    <div
      ref={boxRef}
      className="quote-typography absolute inset-0 mx-auto flex"
      style={{
        maxHeight: variant === 'display' ? 400 : (400 / 580) * 1080,
        maxWidth: variant === 'display' ? 580 : 1080,
        padding: `${2 * viewScaleFactor}em`,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="flex flex-col items-center">
        <p
          className="text-center"
          style={{
            maxWidth: variant === 'display' ? 500 : (500 / 580) * 1080,
            width: '80%',
            fontFamily: `"${FontDefinitions[displayFontIndex].fontName}", sans-serif`,
            fontSize: `${currentFontSize * FontDefinitions[displayFontIndex].sizingFactor * viewScaleFactor}em`,
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            lineHeight: `${1.4 * FontDefinitions[displayFontIndex].spacingFactor}`,
          }}
          data-testid={isDisplayVariant ? 'quote-text' : undefined}
        >
          {WordsList[currentWordsIndex].text}
        </p>
        <p
          className="text-center"
          style={{
            maxWidth: variant === 'display' ? 500 : (500 / 580) * 1080,
            width: '80%',
            fontFamily: `"${FontDefinitions[displayFontIndex].fontName}", sans-serif`,
            fontSize: `${currentFontSize * FontDefinitions[displayFontIndex].sizingFactor * viewScaleFactor - 0.6}em`,
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            lineHeight: `${1.4 * FontDefinitions[displayFontIndex].spacingFactor}`,
          }}
          data-testid={isDisplayVariant ? 'quote-source' : undefined}
        >
          {WordsList[currentWordsIndex].source} {WordsList[currentWordsIndex].translation}
        </p>
      </div>
    </div>
  );
}

export type { QuoteTextProps };
