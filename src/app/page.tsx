import { InteractiveTerminal } from '@/components/InteractiveTerminal'

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-[clamp(12px,3vw,24px)]">
      <div className="w-full max-w-[clamp(22rem,80vw,42rem)] terminal-box animate-glow">
        <div className="flex items-center gap-[clamp(6px,1.2vw,10px)] border-b border-border/70 bg-card/90 px-[clamp(10px,2.5vw,16px)] py-[clamp(6px,1.2vw,10px)]">
          <span className="h-[10px] w-[10px] rounded-full bg-red-500/70" />
          <span className="h-[10px] w-[10px] rounded-full bg-yellow-500/70" />
          <span className="h-[10px] w-[10px] rounded-full bg-green-500/70" />
          <span className="ml-3 text-muted [font-size:clamp(11px,1.2vw,13px)] tracking-wide">
            portfolio.sh
          </span>
        </div>

        <div className="p-[clamp(18px,4vw,28px)] relative">
          <InteractiveTerminal />
        </div>
      </div>
    </main>
  )
}
