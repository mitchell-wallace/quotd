import { render as rtlRender } from '@testing-library/react';

export function render(ui: React.ReactNode) {
  return rtlRender(ui);
}
