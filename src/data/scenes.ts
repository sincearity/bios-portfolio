export type Scene = 'home' | 'bios-terminal' | 'mustard-cms'

export const SCENES: Record<Scene, string> = {
  'bios-terminal': `> OPEN bios-terminal

BIOS-TERMINAL
A minimalist terminal UI with typewriter pacing,
syntax-like highlights, and synced cursor.

STACK
- Next.js (App Router)
- Tailwind tokens + utilities
- Custom Typewriter (smart pauses, links)

ACTIONS
[BACK]`,
  'mustard-cms': `> OPEN mustard-cms

MUSTARD CMS
A lightweight content system focused on designer-friendly workflows
and clean, opinionated UI components.

HIGHLIGHTS
- MDX content
- Design tokens
- Minimal authoring experience

ACTIONS
[BACK]`,
  home: `> INITIATING PORTFOLIO ...

HELLO, I'M DOAN NGUYEN.
COO @ MUSTARD SOFTWARE. DESIGNER + ENGINEER.

[PROJECTS]
- BIOS-TERMINAL      [OPEN bios-terminal]
- MUSTARD CMS        [OPEN mustard-cms]

[INFO]
- ABOUT              [OPEN about]
- RESUME             [OPEN resume]

[CONTACT]
EMAIL: doan@mustard.so
GITHUB: https://github.com/sincearity`,
}

// Scenes that can be navigated to via [OPEN ...]
export const OPENABLE: ReadonlySet<Scene> = new Set(['bios-terminal', 'mustard-cms'] as const)
