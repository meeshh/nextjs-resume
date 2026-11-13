// preloaded after happydom.ts so the DOM globals exist before Testing Library loads
import { cleanup } from '@testing-library/react';
import { afterEach } from 'bun:test';

// Bun exposes no globals for Testing Library to hook into, so unmount between tests explicitly
afterEach(() => {
  cleanup();
});
