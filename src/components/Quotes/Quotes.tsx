import { Group, Container, Box, Button } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useState, useCallback } from 'react';
import { QuoteText } from './QuoteText';
import { QuoteImage } from './QuoteImage';

export function Quotes() {
  const [currentFontIndex, setCurrentFontIndex] = useState(0);

  const nextFont = useCallback(() => {
    setCurrentFontIndex((prev) => (prev + 1) % 11);
  }, []);

  const prevFont = useCallback(() => {
    setCurrentFontIndex((prev) => (prev - 1 + 11) % 11);
  }, []);

  return (
    <Container ta="center">
      <Group justify="center">
        <Group gap={0}>
          <Button
            variant="light"
            onClick={prevFont}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            <IconMinus size={18} />
          </Button>
          <Button
            variant="light"
            style={{ borderRadius: 0, borderLeft: '1px solid var(--mantine-color-gray-3)', borderRight: '1px solid var(--mantine-color-gray-3)' }}
            w={80}
          >
            Font
          </Button>
          <Button
            variant="light"
            onClick={nextFont}
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            <IconPlus size={18} />
          </Button>
        </Group>
      </Group>
      <Box pos="relative" mt={30}>
        <QuoteImage />
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
          <QuoteText 
            text="The journey of a thousand miles begins with a single step"
            currentFontIndex={currentFontIndex}
          />
        </Box>
      </Box>
    </Container>
  );
}