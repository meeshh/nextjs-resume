import { personal } from '@content';
import { render, screen } from '@test-utils';
import { describe, expect, test } from 'bun:test';
import { fullName } from 'src/helpers/utils';
import { Header } from './Header';

describe('<Header />', () => {
  test('Renders the name and title headings', () => {
    render(<Header />);

    expect(
      screen.getByRole('heading', { level: 1, name: fullName }),
    ).toBeDefined();
    expect(
      screen.getByRole('heading', { level: 2, name: personal.title }),
    ).toBeDefined();
  });

  test('Does not render private widgets without a secret', () => {
    render(<Header />);

    expect(screen.queryByRole('textbox')).toBeNull();
  });
});
