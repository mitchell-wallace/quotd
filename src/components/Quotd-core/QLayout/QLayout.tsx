import { Container } from '@mantine/core';
import { ReactNode } from 'react';

interface QLayoutProps {
  children: ReactNode;
}

export function QLayout({ children }: QLayoutProps) {
  return (
    <Container ta="center">
      {children}
    </Container>
  );
}
