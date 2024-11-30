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
    extend: {}
  },
  daisyui: {
    themes: ['light', 'dark'],
  },
  plugins: [
    typography,
    daisy,
    addIconSelectors(['mdi', 'material-symbols']),
  ],
} satisfies Config;
