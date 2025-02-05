import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { HeaderSimple } from './components/.MantineUI/HeaderSimple/HeaderSimple';
import { FooterCentered } from './components/.MantineUI/FooterCentered/FooterCentered';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <HeaderSimple />
      <Router />
      <FooterCentered />
    </MantineProvider>
  );
}
