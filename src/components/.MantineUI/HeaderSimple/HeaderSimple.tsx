import { useEffect } from 'react';
import { Burger, Container, Group, Text, Title, Anchor } from '@mantine/core';
import { useDisclosure, useClickOutside, useViewportSize } from '@mantine/hooks';
import classes from './HeaderSimple.module.css';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { Link, useLocation } from 'react-router-dom';
import { useHeaderStore } from '@/stores/headerStore';
import { themeGradients, getThemeColor } from '@/theme';

const links = [
  { link: '/', label: 'Home' },
  { link: '/app', label: 'App' },
  { link: 'https://ephodstudio.com/#get-quote', label: 'Contact' }
];

export function HeaderSimple() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const location = useLocation();
  const { active, setActive } = useHeaderStore();
  const headerRef = useClickOutside(() => {
    if (opened) {
      close();
    }
  });
  const { width } = useViewportSize();

  // Set initial active state from location
  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname, setActive]);

  // Close menu when viewport becomes larger than xs breakpoint
  useEffect(() => {
    if (width >= 576) {
      close();
    }
  }, [width, close]);

  const handleLinkClick = (path: string) => {
    setActive(path);
    close();
  };

  const items = links.map((link) => (
    link.link.startsWith('http') ? (
      <Anchor
        key={link.label}
        href={link.link}
        className={classes.link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => close()}
      >
        {link.label}
      </Anchor>
    ) : (
      <Anchor
        key={link.label}
        component={Link}
        to={link.link}
        className={classes.link}
        underline="never"
        data-active={active === link.link || undefined}
        onClick={() => handleLinkClick(link.link)}
        variant="filled"
        c={active === link.link ? "white" : undefined}
        style={{
          backgroundColor: active === link.link ? getThemeColor("secondary") : undefined,
        }}
      >
        {link.label}
      </Anchor>
    )
  ));

  return (
    <header className={classes.header} ref={headerRef}>
      <Container size="md" className={classes.inner}>
        <Title className={classes.title}>
            <Text inherit variant="gradient" component="span" gradient={themeGradients.logo}>
            Quotd.
            </Text>
        </Title>

        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Group>
          <ColorSchemeToggle />
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="xs" />
        </Group>

        {/* Mobile menu */}
        <div className={`${classes.mobileMenu} ${opened ? classes.mobileMenuOpened : ''}`}>
          {items}
        </div>
      </Container>
    </header>
  );
}