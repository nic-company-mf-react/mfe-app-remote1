import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		federation({
			name: 'remote1App',
			dts: false,
			filename: 'remote1Entry.js',
			exposes: {
				'./Remote1App': './src/bridge.tsx',
			},
			shared: {
				react: { singleton: true, requiredVersion: '^19.0.0' },
				'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
				'react-router': { singleton: true, requiredVersion: '^7.0.0' },
				'@tanstack/react-query': { singleton: true, requiredVersion: '^5.95.2' },
				'react-helmet-async': { singleton: true, requiredVersion: '^3.0.0' },
				'@nic/mfe-lib-shared': { singleton: true, requiredVersion: '^0.0.0' },
			},
		}),
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
	server: {
		port: 5174,
		cors: true,
	},
});
