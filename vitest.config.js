/// <reference types="vitest" />
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.js';
import { config } from "dotenv";

export default mergeConfig(viteConfig, defineConfig({
    test: {
        root: './tests',
        env: {
            ...config({ path: ".env.development" }).parsed,
        },
    },
    
}));