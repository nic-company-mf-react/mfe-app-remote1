import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
	// @axiom/mfe-lib-shared 청크가 내부적으로 react-i18next, i18next를 import하므로
	// Rolldown이 이들을 번들링할 때 식별자 minify 버그로 `import { t } from 'react'`를
	// 생성합니다. MF shared 또는 peer dep으로 사용되는 패키지는 exclude 처리합니다.
	optimizeDeps: {
		exclude: ['@axiom/mfe-lib-shared'],
		// file: 링크된 mfe-lib-shared 쪽 중첩 node_modules와 원격 앱의 동일 패키지가
		// 서로 다른 경로로 최적화되면, 일부 청크가 MF로 래핑된 react와 불일치하여
		// `does not provide an export named 'createContext'` 가 날 수 있습니다.
		include: ['react', 'react/jsx-runtime', 'react-dom', '@tanstack/react-query'],
	},
	plugins: [
		react(),
		tailwindcss(),
		federation({
			name: 'remote1App',
			dts: false,
			dev: {
				disableDynamicRemoteTypeHints: true,
			},
			filename: 'remote1Entry.js',
			exposes: {
				'./Remote1App': './src/bridge.tsx',
			},
			shared: {
				react: { singleton: true, requiredVersion: '^19.0.0' },
				'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
				'react-router': { singleton: true, requiredVersion: '^7.0.0' },
				'@tanstack/react-query': { singleton: true, requiredVersion: '^5.96.2' },
				'react-helmet-async': { singleton: true, requiredVersion: '^3.0.0' },
				'@axiom/mfe-lib-shared': { singleton: true, requiredVersion: '^0.0.0' },
				zustand: {
					singleton: true,
					requiredVersion: '^5.0.0', // package.json과 맞춤
				},
			},
		}),
	],
	resolve: {
		dedupe: ['react', 'react-dom', 'react-router', '@tanstack/react-query', '@tanstack/query-core'],
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
	server: {
		port: 5174,
		cors: true,
	},
});
