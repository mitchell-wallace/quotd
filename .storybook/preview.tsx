import React, { useEffect } from 'react';
import { addons } from '@storybook/preview-api';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

import '../src/style.css';

const channel = addons.getChannel();

export const parameters = {
  layout: 'fullscreen',
  options: { showPanel: false },
};

function ColorSchemeWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handle = (isDark: boolean) => {
      document.documentElement.classList.toggle('dark', isDark);
    };
    channel.on(DARK_MODE_EVENT_NAME, handle);
    return () => channel.off(DARK_MODE_EVENT_NAME, handle);
  }, []);
  return children;
}

export const decorators = [
  (renderStory: any) => <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>,
];
