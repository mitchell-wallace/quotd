import { Menu, ActionIcon, useMantineColorScheme, rem } from '@mantine/core';
import { IconSun, IconMoon, IconBrightnessAuto } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const isDark = colorScheme === 'dark';
  const isAuto = colorScheme === 'auto';

  const Icon = isAuto ? IconBrightnessAuto : isDark ? IconMoon : IconSun;

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon
          variant="outline"
          color={isDark ? 'dark2' : 'gray2'}
          size="lg"
          aria-label="Toggle color scheme"
        >
          <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Color scheme</Menu.Label>
        <Menu.Item
          leftSection={<IconSun style={{ width: rem(14), height: rem(14) }} />}
          onClick={() => setColorScheme('light')}
        >
          Light
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMoon style={{ width: rem(14), height: rem(14) }} />}
          onClick={() => setColorScheme('dark')}
        >
          Dark
        </Menu.Item>
        <Menu.Item
          leftSection={<IconBrightnessAuto style={{ width: rem(14), height: rem(14) }} />}
          onClick={() => setColorScheme('auto')}
        >
          Auto
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
