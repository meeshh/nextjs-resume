import { render, screen } from '@test-utils';
import { describe, expect, test } from 'bun:test';
import { links } from 'edit-me/config/links';
import { Footer } from './Footer';

describe('<Footer />', () => {
  test('Hides social links on the public page', () => {
    render(<Footer />);
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });

  test('Shows social links on the private page', () => {
    render(<Footer secret="secret" />);
    expect(screen.getAllByRole('link')).toHaveLength(links.length);
  });
});
