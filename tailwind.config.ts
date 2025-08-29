// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // ✅ use string form
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      borderRadius: {
        xl: 'var(--radius)',
        '2xl': 'calc(var(--radius) + 8px)',
      },
      colors: {
        bg: 'hsl(var(--bg))',
        fg: 'hsl(var(--fg))',
        muted: 'hsl(var(--muted))',
        border: 'hsl(var(--border))',
        card: 'hsl(var(--card))',
        accent: { DEFAULT: 'hsl(var(--accent))', fg: 'hsl(var(--accent-fg))' },
        ring: 'hsl(var(--ring))',
      },
    },
  },
  plugins: [],
}

export default config
