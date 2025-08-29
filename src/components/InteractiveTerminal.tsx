'use client'

import { useState, useCallback, useEffect } from 'react'
import { Typewriter } from '@/components/ui/typewriter'

type Scene = 'home' | 'bios-terminal' | 'mustard-cms'

function getSceneText(scene: Scene) {
  switch (scene) {
    case 'bios-terminal':
      return `> OPEN bios-terminal

BIOS-TERMINAL
A minimalist terminal UI with typewriter pacing,
syntax-like highlights, and synced glow/cursor.

STACK
- Next.js (App Router)
- Tailwind tokens + utilities
- Custom Typewriter (smart pauses, links)

ACTIONS
[BACK]`
    case 'mustard-cms':
      return `> OPEN mustard-cms

MUSTARD CMS
A lightweight content system focused on designer-friendly workflows
and clean, opinionated UI components.

HIGHLIGHTS
- MDX content
- Design tokens
- Minimal authoring experience

ACTIONS
[BACK]`
    default:
      return `> INITIATING PORTFOLIO ...

HELLO, I'M DOAN NGUYEN.
COO @ MUSTARD SOFTWARE. DESIGNER + ENGINEER.

[PROJECTS]
- BIOS-TERMINAL [OPEN bios-terminal]
- MUSTARD CMS [OPEN mustard-cms]

[CONTACT]
EMAIL: doan@mustard.so
GITHUB: https://github.com/sincearity`
  }
}

export function InteractiveTerminal() {
  const [scene, setScene] = useState<Scene>('home')
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle')
  const [instantNext, setInstantNext] = useState(false)
  const [scanKey, setScanKey] = useState(0) // to retrigger wipe

  const transitionTo = useCallback((next: Scene, instant: boolean) => {
    setPhase('out')
    setInstantNext(instant)
    // fade-out quickly, then wipe + swap
    window.setTimeout(() => {
      setScanKey((k) => k + 1) // retrigger scan overlay
      setScene(next)
      setPhase('in')
      // after fade-in, return to idle
      window.setTimeout(() => setPhase('idle'), 240)
    }, 180)
  }, [])

  const handleSelect = useCallback(
    (id: string) => {
      if (id === 'bios-terminal') transitionTo('bios-terminal', false)
      if (id === 'mustard-cms') transitionTo('mustard-cms', false)
    },
    [transitionTo]
  )

  const handleOpen = useCallback(
    (id: string) => {
      if (id === 'bios-terminal') transitionTo('bios-terminal', false)
      if (id === 'mustard-cms') transitionTo('mustard-cms', false)
    },
    [transitionTo]
  )

  const handleBack = useCallback(() => {
    transitionTo('home', true) // instant on return
  }, [transitionTo])

  // keyboard: b = back
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'b' && scene !== 'home') handleBack()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [scene, handleBack])

  const text = getSceneText(scene)

  return (
    <div className={phase === 'out' ? 'scene-exit' : phase === 'in' ? 'scene-enter' : undefined}>
      {/* scanline wipe overlay during phase "in" to sell the swap */}
      {phase === 'in' && <div key={scanKey} className="scan-wipe" />}

      <Typewriter
        text={text}
        speed={24}
        onSelect={handleSelect}
        onOpen={handleOpen}
        onBack={handleBack}
        instant={instantNext}
      />
    </div>
  )
}
