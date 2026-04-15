import { defineConfig, globalIgnores } from 'eslint/config';
import reactConfig from '@axiom/mfe-lib-shared/config/eslint/react';

export default defineConfig([globalIgnores(['dist']), ...reactConfig]);
