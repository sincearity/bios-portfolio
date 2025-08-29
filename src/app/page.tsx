import { InteractiveTerminal } from '@/components/ui/InteractiveTerminal'

export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-[clamp(12px,3vw,24px)] bg-bg text-fg"
      aria-labelledby="page-title"
    >
      <h1 id="page-title" className="sr-only">
        Doan Nguyen — Portfolio Terminal
      </h1>

      <section
        aria-label="Terminal window"
        className="w-full max-w-[clamp(22rem,80vw,42rem)] terminal-box animate-glow rounded-lg overflow-hidden border border-border/70 bg-surface-2/40 backdrop-blur"
      >
        <header className="flex items-center gap-[clamp(6px,1.2vw,10px)] border-b border-border/70 bg-card/90 px-[clamp(10px,2.5vw,16px)] py-[clamp(6px,1.2vw,10px)]">
          <span className="h-[10px] w-[10px] rounded-full bg-red-500/70" />
          <span className="h-[10px] w-[10px] rounded-full bg-yellow-500/70" />
          <span className="h-[10px] w-[10px] rounded-full bg-green-500/70" />
          <span className="ml-3 text-muted [font-size:clamp(11px,1.2vw,13px)] tracking-wide">
            portfolio.sh
          </span>
        </header>

        <div className="relative p-[clamp(18px,4vw,28px)]">
          <InteractiveTerminal />
        </div>
      </section>
    </main>
  )
}
