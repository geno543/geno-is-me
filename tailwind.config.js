/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Serif 4"', '"Georgia"', 'serif'],
        serif: ['"Source Serif 4"', '"Georgia"', 'serif'],
        mono: ['"IBM Plex Mono"', '"Consolas"', 'monospace'],
      },
      colors: {
        paper: '#07130f',
        ink: '#d8e7df',
        title: '#ebf5f0',
        copy: '#b8cec2',
        muted: '#88a99a',
        line: '#1a3127',
      },
    },
  },
  plugins: [],
}

