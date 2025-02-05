import { Image, Select, Group, Container, Text, Box } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';

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
];

export function Quotes() {
  const [selectedFont, setSelectedFont] = useState(fonts[0].value);

  const handleFontChange = (value: string | null) => {
    if (value) {
      setSelectedFont(value);
    }
  };

  return (
    <Container ta="center">
      <Group justify="center">
        <Select
          data={fonts}
          label="Font"
          placeholder="Pick one"
          radius="md"
          size="md"
          maw={260}
          value={selectedFont}
          onChange={handleFontChange}
          rightSection={<IconChevronDown size={18} />}
          rightSectionWidth={30}
        />
      </Group>
      <Box pos="relative" mt={30}>
        <Image
          radius="md"
          height={400}
          maw={580}
          mx="auto"
          fit="cover"
          src="/assets/images/hello.jpeg"
          alt="Astronaut waving hello"
        />
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
          <Text 
            size="xl" 
            fw={700}
            style={{ 
              fontFamily: `"${selectedFont}", sans-serif`,
              fontSize: '2.5rem',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              lineHeight: 1.4,
              maxWidth: '80%'
            }}
          >
            The journey of a thousand miles begins with a single step
          </Text>
        </Box>
      </Box>
    </Container>
  );
}