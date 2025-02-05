import React, { useState } from 'react';
import { Burger, Container, Group, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderSimple.module.css';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { link: '/', label: 'Home' },
  { link: '/app', label: 'App' },
  { link: 'https://checkboxd.vercel.app/', label: 'Checkboxd' },
  { link: '', label: 'Contact' },
];

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  const items = links.map((link) => (
    link.link.startsWith('http') ? (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {link.label}
      </a>
    ) : (
      <Link
        key={link.label}
        to={link.link}
        className={classes.link}
        data-active={active === link.link || undefined}
        onClick={() => setActive(link.link)}
      >
        {link.label}
      </Link>
    )
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Title className={classes.title}>
            <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
            Quotd.
            </Text>
        </Title>

        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <ColorSchemeToggle />

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}