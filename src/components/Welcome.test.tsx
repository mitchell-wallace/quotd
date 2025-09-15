import { render, screen } from '@test-utils';
import { Welcome } from './Welcome';

describe('Welcome component', () => {
  it('links to agency website', () => {
    render(<Welcome />);
    expect(screen.getByText('our agency website')).toHaveAttribute(
      'href',
      'https://ephodstudio.com/'
    );
  });
});
