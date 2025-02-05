import { Anchor, Image, Text, Title, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './Welcome.module.css';
import { IconChevronRight } from '@tabler/icons-react';
import { useHeaderStore } from '@/stores/headerStore';

export function Welcome() {
  const navigate = useNavigate();
  const setActive = useHeaderStore((state) => state.setActive);

  const handleGetInspired = () => {
    navigate('/app');
    setActive('/app');
  };

  return (
    <>
      <Title className={classes.title} ta="center" mt={100} px={15}>
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
        src="/assets/images/hello.webp"
        className={classes.welcomeImage}
        alt="Astronaut waving hello"
      />

      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl" px={15}>
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
          variant="gradient"
          gradient={{ from: 'pink', to: 'yellow' }}
          size="xl"
          radius="md"
          mt={30}
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