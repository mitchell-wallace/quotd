import { Text } from '@mantine/core';

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

const fonts = [
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

interface QuoteTextProps {
  text: string;
  currentFontIndex: number;
  currentFontSize: number;
}

export function QuoteText({ text, currentFontIndex, currentFontSize }: QuoteTextProps) {
  const selectedFont = fonts[currentFontIndex].value;

  return (
    <Text 
      size="xl" 

      maw={500}
      style={{ 
        fontFamily: `"${selectedFont}", sans-serif`,
        fontSize: `${currentFontSize * fonts[currentFontIndex].sizingFactor}rem`,
        color: 'white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        lineHeight: `${1.4 * fonts[currentFontIndex].spacingFactor}`,
        maxWidth: '80%'
      }}
    >
      {text}
    </Text>
  );
}

export type { QuoteTextProps };
