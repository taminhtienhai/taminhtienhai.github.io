/// <reference types="vitest" />
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.js';
import { loadEnv } from "vite";
 
export default mergeConfig(viteConfig, defineConfig({
    test: {
        root: './tests',
        env: loadEnv('development', process.cwd(), ''),
    },
}));