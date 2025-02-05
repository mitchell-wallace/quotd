import { Anchor, Image, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

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
    </>
  );
}
// Photo by T Leish: https://www.pexels.com/photo/astronaut-with-a-planet-earth-ball-5258241/