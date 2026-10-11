import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/index.ts',
        'src/types/**',
        'scripts/**',
        '**/*.d.ts',
        '**/*.test.ts',
      ],
      reporter: ['text', 'json', 'html'],
    },
  },
});
