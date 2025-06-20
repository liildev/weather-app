import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	envPrefix: 'APP_',
	plugins: [react(), tsconfigPaths()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/shared/lib/test/setup'],
		include: ['src/**/*.{test,spec}.{ts,tsx}'],
	},
});
