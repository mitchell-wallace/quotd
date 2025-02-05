import React from 'react';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { ActionIcon, Anchor, Group, Text } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import classes from './FooterCentered.module.css';

const links = [
  { link: 'https://ephodstudio.com/#get-quote', label: 'Contact' },
  { link: 'https://mitchellwallace.dev', label: 'Portfolio' },
  { link: 'https://checkboxd.vercel.app/', label: 'Checkboxd' }
];

const socialLinks = {
  github: 'https://github.com/mitchelldwallace',
  linkedin: 'https://linkedin.com/in/mitchelldwallace'
};

export function FooterCentered() {
  const location = useLocation();

  const items = links.map((link) => {
    const isExternal = link.link.startsWith('http');
    
    if (isExternal) {
      return (
        <Anchor
          c="dimmed"
          key={link.label}
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
          lh={1}
          size="sm"
        >
          {link.label}
        </Anchor>
      );
    }

    return (
      <Anchor
        component={Link}
        to={link.link}
        c="dimmed"
        key={link.label}
        lh={1}
        size="sm"
        data-active={location.pathname === link.link || undefined}
      >
        {link.label}
      </Anchor>
    );
  });

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Text> 2025 Quotd. All rights reserved.</Text>

        <Group className={classes.links}>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon 
            component="a"
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            size="lg" 
            variant="default" 
            radius="xl"
          >
            <IconBrandGithub size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon 
            component="a"
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            size="lg" 
            variant="default" 
            radius="xl"
          >
            <IconBrandLinkedin size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}