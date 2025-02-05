import { Image, Select, Group, Container, Text, Box } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
// import classes from './Quotes.module.css';

const fonts = [
  { value: 'Playfair Display', label: 'Playfair' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Roboto Slab', label: 'Roboto Slab' }
];

export function Quotes() {
  const [selectedFont, setSelectedFont] = useState(fonts[0].value);

  return (
    <Container ta="center">
      <Group justify="center">
        <Select
          data={fonts}
          label="Font"
          placeholder="Pick one"
          radius="md"
          size="md"
          maw={160}
          value={selectedFont}
          onChange={setSelectedFont}
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
              fontFamily: selectedFont,
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