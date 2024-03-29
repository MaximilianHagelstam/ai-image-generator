import { beforeEach, vi } from 'vitest';

beforeEach(() => {
  vi.stubEnv('NODE_ENV', 'test');
});
