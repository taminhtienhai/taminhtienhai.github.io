import { defineConfig, presetAttributify, presetIcons, presetTagify, presetWind } from 'unocss'

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
    shortcuts: {
        'chip': 'px-1 inline-flex items-center rounded-full text-xs font-100 bg-gray-800 text-white'
    },
    presets: [
        presetWind(),
        presetAttributify(),
        presetTagify({
            extraProperties: matched => matched.startsWith('i-')
                ? { display: 'inline' }
                : {}
        }),
        presetIcons({
            collections: {
                mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
            }
        })
    ],
    content: {
        pipeline: {
            include: [
                'src/**/*.{js,ts}',
            ],
        },
    },
});