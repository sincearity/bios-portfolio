import { Typewriter } from '@/components/ui/typewriter'

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-3 sm:px-4">
      <div className="w-full max-w-2xl rounded-md border border-[hsl(var(--border))]/70 bg-[hsl(var(--bg))]/95 backdrop-blur-[2px] overflow-hidden animate-glow">
        {/* header strip */}
        <div className="flex items-center gap-2 border-b border-[hsl(var(--border))]/70 bg-[hsl(var(--card))]/90 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs text-muted">portfolio.sh</span>
        </div>

        {/* terminal content */}
        <div className="p-5 sm:p-7">
          <Typewriter
            text={`> INITIATING PORTFOLIO ...

HELLO, I'M DOAN NGUYEN.
COO @ MUSTARD SOFTWARE. DESIGNER + ENGINEER.

[PROJECTS]
- BIOS-TERMINAL
- MUSTARD CMS

[CONTACT]
EMAIL: doan@mustard.so
GITHUB: https://github.com/sincearity`}
            speed={24}
          />
        </div>
      </div>
    </main>
  )
}
