import type { Config } from 'tailwindcss';
import daisy from 'daisyui';
import typography from '@tailwindcss/typography';
import { addIconSelectors } from '@iconify/tailwind';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts}",
  ],

  theme: {
    fontFamily: {
      sans: 'Pixelify Sans, Helvetica, Arial, sans-serif',
      serif: 'VT323, ui-serif, Georgia',
      mono: 'JetBrains Mono, ui-monospace, SFMono-Regular'
    },
    extend: {},
  },
  daisyui: {
    themes: ['light', 'dark'],
  },
  plugins: [
    typography,
    daisy,
    addIconSelectors(['mdi', 'material-symbols', 'jam']),
  ],
} satisfies Config;
