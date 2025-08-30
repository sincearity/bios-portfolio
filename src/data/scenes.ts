export type Scene = 'home' | 'bios-terminal' | 'mustard-cms'

export const SCENES: Record<Scene, string> = {
  'bios-terminal': `> OPEN bios-terminal

BIOS-TERMINAL
A minimalist terminal UI with typewriter pacing,
syntax-like highlights, and synced cursor.

STACK
- Next.js (App Router)
- TypeScript
- Tailwind (design tokens + utilities)
- Custom Typewriter component
- Framer Motion (animations)

HIGHLIGHTS
- Accessible motion fallbacks
- Dark-first visual language
- Inline actions and smart pauses

ACTIONS
[BACK]`,
  'mustard-cms': `> OPEN mustard-cms

MUSTARD CMS
A lightweight content system focused on designer-friendly workflows
and clean, opinionated UI components.

STACK
- Next.js (App Router)
- TypeScript
- Tailwind (design tokens + utilities)
- Payload CMS
- Postgres (via Neon)
- Vercel (deploy + hosting)
- Version Control integration

HIGHLIGHTS
- Minimal authoring experience
- Scalable design system primitives
- Built-in version control for safe content ops

ACTIONS
[BACK]`,
  home: `> INITIATING PORTFOLIO ...

HELLO, I'M DOAN NGUYEN.
COO @ MUSTARD SOFTWARE. DESIGNER + ENGINEER.

[PROJECTS]
- BIOS-TERMINAL      [OPEN bios-terminal]
  stack: Next.js · TypeScript · Tailwind · Framer Motion

- MUSTARD CMS        [OPEN mustard-cms]
  stack: Next.js · TypeScript · Tailwind · Payload CMS · Postgres · Vercel


[INFO]
- ABOUT              [OPEN about]
- RESUME             [OPEN resume]

[CONTACT]
EMAIL: doan@mustard.so
GITHUB: https://github.com/sincearity`,
}

// Scenes that can be navigated to via [OPEN ...]
export const OPENABLE: ReadonlySet<Scene> = new Set(['bios-terminal', 'mustard-cms'] as const)
