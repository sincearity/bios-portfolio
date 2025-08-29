'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Typewriter } from '@/components/ui/Typewriter'
import { SCENES, OPENABLE, type Scene } from '@/data/scenes'

type Phase = 'idle' | 'out' | 'in'

export function InteractiveTerminal() {
  const [scene, setScene] = useState<Scene>('home')
  const [phase, setPhase] = useState<Phase>('idle')
  const [instantNext, setInstantNext] = useState(false)
  const [scanKey, setScanKey] = useState(0)

  // timeout refs so we can cleanly cancel on unmount or rapid transitions
  const tOut = useRef<number | null>(null)
  const tIn = useRef<number | null>(null)
  const tIdle = useRef<number | null>(null)

  const clearTimers = () => {
    if (tOut.current) window.clearTimeout(tOut.current)
    if (tIn.current) window.clearTimeout(tIn.current)
    if (tIdle.current) window.clearTimeout(tIdle.current)
    tOut.current = tIn.current = tIdle.current = null
  }

  const transitionTo = useCallback((next: Scene, instant: boolean) => {
    clearTimers()
    setPhase('out')
    setInstantNext(instant)

    // fade-out quickly, then wipe + swap
    tOut.current = window.setTimeout(() => {
      setScanKey((k) => k + 1) // retrigger scan overlay
      setScene(next)
      setPhase('in')

      // after fade-in, return to idle
      tIdle.current = window.setTimeout(() => setPhase('idle'), 240)
    }, 180)
  }, [])

  // Unify selection & open behavior
  const goIfValid = useCallback(
    (id: string) => {
      if (OPENABLE.has(id as Scene)) transitionTo(id as Scene, false)
    },
    [transitionTo]
  )

  const handleSelect = useCallback((id: string) => goIfValid(id), [goIfValid])
  const handleOpen = useCallback((id: string) => goIfValid(id), [goIfValid])

  const handleBack = useCallback(() => {
    transitionTo('home', true) // instant on return
  }, [transitionTo])

  // keyboard: 'b' = back (only when not on home)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'b' && scene !== 'home') handleBack()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [scene, handleBack])

  useEffect(() => clearTimers, []) // cleanup on unmount

  const text = useMemo(() => SCENES[scene], [scene])

  return (
    <div
      data-phase={phase}
      className={phase === 'out' ? 'scene-exit' : phase === 'in' ? 'scene-enter' : undefined}
      aria-busy={phase !== 'idle'}
    >
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
