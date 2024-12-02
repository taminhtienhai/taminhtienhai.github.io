import type { Config } from 'tailwindcss';
import daisy from 'daisyui';
import typography from '@tailwindcss/typography';
import { addIconSelectors } from '@iconify/tailwind';

export default {
  content: [
    "./index.html",
    "./build.mjs",
    "./src/**/*.{js,ts}",
  ],

  theme: {
    fontFamily: {
      'blog-content': "Poppins",
      sans: "'Pixelify Sans', Helvetica, Arial, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, SFMono-Regular",
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
