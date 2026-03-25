import { defineConfig, globalIgnores } from "eslint/config";
import reactConfig from "@nic/mfe-lib-shared/config/eslint/react";

export default defineConfig([globalIgnores(["dist"]), ...reactConfig]);
