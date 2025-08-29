import type { Config } from 'tailwindcss'

const config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        bg: 'hsl(var(--bg))',
        fg: 'hsl(var(--fg))',
        muted: 'hsl(var(--muted))',
        accent: 'hsl(var(--accent))',
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
        card: 'hsl(var(--card))',
        surface: {
          0: 'hsl(var(--surface-0))',
          1: 'hsl(var(--surface-1))',
          2: 'hsl(var(--surface-2))',
        },
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        danger: 'hsl(var(--danger))',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius-lg)',
      },
      boxShadow: {
        glow: '0 8px 24px rgba(0,0,0,0.35), 0 0 30px hsl(var(--accent) / 0.10)',
      },
      transitionDuration: {
        fast: 'var(--motion-fast)',
        slow: 'var(--motion-slow)',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2%)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn var(--motion-slow) ease-in-out both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
