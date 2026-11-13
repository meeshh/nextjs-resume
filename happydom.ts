import { GlobalRegistrator } from '@happy-dom/global-registrator';
import { mock } from 'bun:test';

GlobalRegistrator.register();

// `server-only` throws outside of the React Server Components bundler condition
mock.module('server-only', () => ({}));
