import { Anchor, Image, Text, Title, Button, Group } from '@mantine/core';
import classes from './Welcome.module.css';
import { IconChevronRight } from '@tabler/icons-react';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Quotd.
        </Text>
      </Title>
      <Image
        radius="md"
        height={400}
        maw={580}
        mx="auto"
        mt={30}
        fit="cover"
        src="/assets/images/hello.jpeg"
        alt="Astronaut waving hello"
      />

      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Find daily inspiration right here. Visit{' '}
        <Anchor href="https://ephodstudio.com/" size="lg">
          our agency website
        </Anchor>
        {' '}or {' '}
        <Anchor href="https://mitchellwallace.dev/" size="lg">
          my portfolio
        </Anchor>
        {' '}to see more of our work.
      </Text>

      <Group justify="center">
        <Button mx="auto" mt="xl" size="lg">
          Get inspired
          <IconChevronRight size={18} stroke={1.5} style={{ marginLeft: '0.5rem', marginRight: '-0.1rem' }} />

        </Button>
      </Group>

    </>
  );
}
// Photo by T Leish: https://www.pexels.com/photo/astronaut-with-a-planet-earth-ball-5258241/