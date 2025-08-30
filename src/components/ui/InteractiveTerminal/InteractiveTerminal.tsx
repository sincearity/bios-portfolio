'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Typewriter } from '@/components/ui/Typewriter'
import { SCENES, OPENABLE, type Scene } from '@/data/scenes'
import { SkillBadge } from '@/components'

type Phase = 'idle' | 'out' | 'in'
type AppKind = 'about' | 'resume' | null

export function InteractiveTerminal() {
  const [scene, setScene] = useState<Scene>('home')
  const [phase, setPhase] = useState<Phase>('idle')
  const [instantNext, setInstantNext] = useState(false)
  const [scanKey, setScanKey] = useState(0)
  const [app, setApp] = useState<AppKind>(null) // <— NEW: overlay “apps”

  // timeouts
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

    tOut.current = window.setTimeout(() => {
      setScanKey((k) => k + 1)
      setScene(next)
      setPhase('in')
      tIdle.current = window.setTimeout(() => setPhase('idle'), 240)
    }, 180)
  }, [])

  // open scene or app
  const openTarget = useCallback(
    (id: string) => {
      const lower = id.toLowerCase()
      if (OPENABLE.has(lower as Scene)) {
        transitionTo(lower as Scene, false)
        return
      }
      // treat everything else as an app overlay
      if (lower === 'about' || lower === 'resume') {
        setApp(lower as AppKind)
      }
    },
    [transitionTo]
  )

  const handleSelect = useCallback((id: string) => openTarget(id), [openTarget])
  const handleOpen = useCallback((id: string) => openTarget(id), [openTarget])

  const handleBack = useCallback(() => {
    transitionTo('home', true)
  }, [transitionTo])

  // keyboard: 'b' = back (only when not on home)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'b' && scene !== 'home') handleBack()
      if (e.key === 'Escape' && app) setApp(null) // close app with Esc
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [scene, handleBack, app])

  useEffect(() => clearTimers, [])

  const text = useMemo(() => SCENES[scene], [scene])

  return (
    <div
      data-phase={phase}
      className={phase === 'out' ? 'scene-exit' : phase === 'in' ? 'scene-enter' : undefined}
      aria-busy={phase !== 'idle'}
    >
      {/* scanline wipe overlay during phase "in" */}
      {phase === 'in' && <div key={scanKey} className="scan-wipe" />}

      {/* terminal */}
      <div className="terminal-box terminal-box--minimal fx-crt scanlines">
        <Typewriter
          text={text}
          speed={24}
          onSelect={handleSelect}
          onOpen={handleOpen}
          onBack={handleBack}
          instant={instantNext}
        />
      </div>

      {/* app overlay (minimal, animated) */}
      {app && <AppOverlay app={app} onClose={() => setApp(null)} />}
    </div>
  )
}

/* Reusable overlay “window” */

function AppOverlay({ app, onClose }: { app: 'about' | 'resume'; onClose: () => void }) {
  // close on backdrop click, keep content clicks inside
  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="
          bg-[hsl(var(--surface-1))]
          text-[hsl(var(--fg))]
          rounded-[var(--radius-lg)]
          border border-[hsl(var(--border)/0.7)]
          shadow-2xl
          w-[min(820px,92vw)]
          max-h-[80vh]
          overflow-auto
          p-6 sm:p-8
          scene-enter
        "
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="app-title"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id="app-title" className="text-lg font-semibold tracking-tight">
            {app === 'about' ? 'About Doan' : 'Résumé'}
          </h2>
          <button
            onClick={onClose}
            className="focus-ring text-[hsl(var(--muted))] hover:opacity-80"
          >
            [CLOSE]
          </button>
        </div>

        {app === 'about' ? <AboutContent /> : <ResumeContent />}
      </div>
    </div>
  )
}

/* Content blocks */

function AboutContent() {
  return (
    <div className="prose prose-invert max-w-none">
      <div className="flex items-start gap-4 mb-4">
        <img
          src="/doan-headshot.jpg"
          alt="Doan Nguyen"
          className="w-14 h-14 rounded-full border border-[hsl(var(--border)/0.4)]"
        />
        <p className="text-base sm:text-lg leading-relaxed">
          I’m <strong>Doan Nguyen</strong>, a designer–engineer building calm, resilient digital
          experiences…
        </p>
      </div>

      <p>
        Currently, I serve as <strong>COO at Mustard Software</strong>, where I design and deliver
        products…
      </p>

      <h3 className="text-xs uppercase tracking-wider text-muted mt-6 mb-2">What I Do</h3>
      <ul className="list-disc pl-4 space-y-1">
        <li>Product & interface design with a minimalist, system-first approach</li>
        <li>Front-end engineering with Next.js, TypeScript, and Tailwind</li>
        <li>Design system architecture & scalable component libraries</li>
      </ul>

      <p className="text-sm text-muted italic mt-6">
        Beyond work, I explore music, creative coding, and ways design can feel both playful and
        purposeful.
      </p>
    </div>
  )
}

function ResumeContent() {
  return (
    <div className="space-y-8">
      {/* Summary */}
      <section className="space-y-3">
        <h3 className="text-sm uppercase tracking-wider text-muted">Summary</h3>
        <p className="text-[15px] leading-relaxed">
          Designer–engineer focused on calm, resilient interfaces. I pair strong visual systems with
          maintainable, performant code — shipping products that are fast, legible, and long-lived.
        </p>
      </section>

      {/* Experience */}
      <section className="space-y-3">
        <h3 className="text-sm uppercase tracking-wider text-muted">Experience</h3>
        <div className="space-y-4">
          {/* Mustard Software */}
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <div className="font-medium">COO — Mustard Software</div>
              <div className="text-sm text-muted">2025 — Present</div>
            </div>
            <ul className="mt-2 text-sm space-y-1">
              <li>Lead design systems, product architecture, and delivery.</li>
              <li>Shape technical direction across client projects (Next.js, Tailwind, MDX).</li>
              <li>Focus on bridging design workflows with developer velocity.</li>
            </ul>
          </div>

          {/* The Juicy Bubbles */}
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <div className="font-medium">Manager — The Juicy Bubbles</div>
              <div className="text-sm text-muted">2021 — 2025</div>
            </div>
            <ul className="mt-2 text-sm space-y-1">
              <li>
                Directed team operations, scheduling, and client experience for a hospitality brand.
              </li>
              <li>Worked closely with ownership on brand growth and customer engagement.</li>
              <li>Built a culture of accountability and streamlined training for new hires.</li>
            </ul>
          </div>

          {/* Cannoli Kitchen */}
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <div className="font-medium">Assistant Manager — Cannoli Kitchen</div>
              <div className="text-sm text-muted">2019 — 2021</div>
            </div>
            <ul className="mt-2 text-sm space-y-1">
              <li>Managed shift operations and ensured consistent customer service quality.</li>
              <li>Trained new employees in food prep, safety standards, and POS systems.</li>
              <li>Balanced high-volume service with attention to hospitality and efficiency.</li>
            </ul>
          </div>

          {/* Legal Secretary */}
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <div className="font-medium">Legal Secretary — Leslie Duberstein, P.A.</div>
              <div className="text-sm text-muted">2018 — 2019</div>
            </div>
            <ul className="mt-2 text-sm space-y-1">
              <li>Prepared and filed legal documents, maintaining confidentiality and accuracy.</li>
              <li>Scheduled client meetings and coordinated case-related communications.</li>
              <li>Organized case files and supported attorneys with daily administrative tasks.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <h3 className="text-sm uppercase tracking-wider text-muted">Skills</h3>

        {/* Design */}
        <div className="space-y-2">
          <h4 className="text-xs uppercase tracking-wider text-muted">Design</h4>
          <div className="flex flex-wrap gap-2">
            <SkillBadge label="Design Systems" code="DS" tone="purple" />
            <SkillBadge label="Typography" code="TX" tone="purple" />
            <SkillBadge label="Figma" code="FG" tone="purple" />
          </div>
        </div>

        {/* Front-end */}
        <div className="space-y-2">
          <h4 className="text-xs uppercase tracking-wider text-muted">Front-end</h4>
          <div className="flex flex-wrap gap-2">
            <SkillBadge label="Next.js" code="NX" />
            <SkillBadge label="React" code="RE" />
            <SkillBadge label="TypeScript" code="TS" />
            <SkillBadge label="Tailwind" code="TW" />
            <SkillBadge label="MDX" code="MDX" />
            <SkillBadge label="Framer Motion" code="FM" />
          </div>
        </div>

        {/* Platform */}
        <div className="space-y-2">
          <h4 className="text-xs uppercase tracking-wider text-muted">Platform</h4>
          <div className="flex flex-wrap gap-2">
            <SkillBadge label="Vercel" code="VC" tone="blue" />
            <SkillBadge label="Node.js" code="ND" tone="blue" />
            <SkillBadge label="Payload CMS" code="PL" tone="blue" />
            <SkillBadge label="Neon / Postgres" code="PG" tone="blue" />
            <SkillBadge label="GitHub Actions" code="GA" tone="blue" />
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="space-y-2">
        <h3 className="text-sm uppercase tracking-wider text-muted">Links</h3>
        <div className="text-sm space-y-1">
          <div>
            <a className="link" href="mailto:doan@mustard.so">
              doan@mustard.so
            </a>
          </div>
          <div>
            <a
              className="link"
              href="https://github.com/sincearity"
              target="_blank"
              rel="noreferrer"
            >
              github.com/sincearity
            </a>
          </div>
          <div>
            <a
              className="link"
              href="https://instagram.com/lunvrs"
              target="_blank"
              rel="noreferrer"
            >
              instagram.com/lunvrs
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
