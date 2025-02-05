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
  { value: 'Tangerine', label: 'Tangerine' },
  { value: 'Amatic SC', label: 'Amatic SC' },
  { value: 'Josefin Slab', label: 'Josefin Slab' },
  { value: 'Architects Daughter', label: 'Architects Daughter' },
  { value: 'Reenie Beanie', label: 'Reenie Beanie' },
  { value: 'Fredericka the Great', label: 'Fredericka the Great' },
  { value: 'Love Ya Like A Sister', label: 'Love Ya Like A Sister' },
  { value: 'Syne Mono', label: 'Syne Mono' },
  { value: 'Walter Turncoat', label: 'Walter Turncoat' },
  { value: 'Nothing You Could Do', label: 'Nothing You Could Do' },
  { value: 'Covered By Your Grace', label: 'Covered By Your Grace' }
] as const;

interface QuoteTextProps {
  text: string;
  currentFontIndex: number;
}

export function QuoteText({ text, currentFontIndex }: QuoteTextProps) {
  const selectedFont = fonts[currentFontIndex].value;

  return (
    <Text 
      size="xl" 

      maw={500}
      style={{ 
        fontFamily: `"${selectedFont}", sans-serif`,
        fontSize: '2.5rem',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        lineHeight: 1.4,
        maxWidth: '80%'
      }}
    >
      {text}
    </Text>
  );
}

export type { QuoteTextProps };
