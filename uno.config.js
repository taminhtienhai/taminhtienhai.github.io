import { defineConfig, presetAttributify, presetIcons, presetUno, presetTypography } from 'unocss'
import { presetRadix } from "unocss-preset-radix";

export default defineConfig({
    rules: [
        ['text-blooming-dahlia', { color: '#E69A8DFF' }],
        ['text-pacific-coast', { color: '#5B84B1FF' }],
        ['bg-living-coral', { background: '#FC766AFF' }],
        [/^text-#([a-zA-Z0-9]+)$/, ([, code]) => ({
            color: `#${code}`
        })],
        [/^bg-#([a-zA-Z0-9]+])$/, ([, code]) => ({
            background: `#${code}`
        })],
        [/^bt-#([a-zA-Z0-9]+)-#([a-zA-Z0-9]+)$/, ([, bg, text]) => ({
            background: `#${bg}`,
            color: `#${text}`
        })],
    ],
    shortcuts: [
        {
            'chip': 'px-1 inline-flex items-center rounded-full text-xs font-100 text-white',
        },
        [/^chip-(.*)$/, ([, c]) => `px-1 rounded-full text-xs font-100 bg-#EDECEC text-${c}`],
        {
            'flex-center': 'inline-flex justify-center items-center',
        }
    ],
    preflights: [
        {
            getCSS: ({ }) => `
            html,
            body {
                min-height: 100%;
                width: 100%;
                margin: 0;
            }
            * {
                box-sizing: border-box;
            }
            `,
        }
    ],
    presets: [
        presetUno(),
        presetAttributify(),
        presetTypography(),
        presetIcons({
            collections: {
                mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
                msb: () => import('@iconify-json/material-symbols/icons.json').then(i => i.default),
            }
        }),
        presetRadix({
            palette: ["bronze", "plum", "iris", "amber", "sand", "mauve", "gray", "blue"],
        }),
    ],
    content: {
        pipeline: {
            include: [
                'src/component.ts',
                'index.html',
                'static/components/*.css',
                'index.css',
                'uno.config.js',
            ],
        },
    },
});