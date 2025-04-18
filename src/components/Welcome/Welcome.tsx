import { Anchor, Image, Text, Title, Button, Group, AspectRatio,  } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './Welcome.module.css';
import { IconChevronRight } from '@tabler/icons-react';
import { useHeaderStore } from '@/stores/headerStore';
import { themeGradients } from '@/theme';
import { useMediaQuery } from '@mantine/hooks';

export function Welcome() {
  const navigate = useNavigate();
  const setActive = useHeaderStore((state) => state.setActive);
  const isXs = useMediaQuery('(max-width: 40em)');
  const isXxs = useMediaQuery('(max-width: 24em)');

  const handleGetInspired = () => {
    navigate('/app');
    setActive('/app');
  };

  return (
    <>
      <Title
        className={classes.title}
        ta="center"
        mt={isXs ? 0 : 100}
        px={15}
      >
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={themeGradients.logo}>
          Quotd.
        </Text>
      </Title>
      <AspectRatio ratio={3/2}>
        <Image
          radius="md"
          mah={isXs ? 260 : 400}
          maw={isXs ? 400 : 580}
          mx="auto"
          mt={isXxs ? 10 : 30}
          fit="cover"
          src="/assets/images/hello.webp"
          className={classes.welcomeImage}
          alt="Astronaut waving hello"
        />
      </AspectRatio>

      <Text 
        c="dimmed" 
        ta="center" 
        size={isXxs ? "md" : "lg"} 
        maw={580} 
        mx="auto" 
        mt={isXxs ? 15 : 30}
        px={15}
      >
        Find daily inspiration right here. Visit{' '}
        <Anchor href="https://ephodstudio.com/" size="lg">
          our agency website
        </Anchor>
        {' '}or{' '}
        <Anchor href="https://mitchellwallace.dev/" size="lg">
          my portfolio
        </Anchor>
        {' '}to see more of our work.
      </Text>

      <Group justify="center">
        <Button
          variant="filled"
          color="secondary"
          size="xl"
          radius="md"
          mt={isXxs ? 15 : 30}
          onClick={handleGetInspired}
        >
          Get Inspired
          <IconChevronRight size={18} stroke={1.5} style={{ marginLeft: '0.5rem', marginRight: '-0.1rem' }} />
        </Button>
      </Group>
    </>
  );
}
// Photo by T Leish: https://www.pexels.com/photo/astronaut-with-a-planet-earth-ball-5258241/