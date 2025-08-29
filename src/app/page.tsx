import { Typewriter } from "@/components/ui/typewriter"

export default function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-2xl rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--bg))] shadow-lg overflow-hidden">
                {/* header strip */}
                <div className="flex items-center gap-2 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2">
                    <span className="h-3 w-3 rounded-full bg-red-500/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <span className="h-3 w-3 rounded-full bg-green-500/80" />
                    <span className="ml-3 text-xs text-muted">portfolio.sh</span>
                </div>

                {/* terminal content */}
                <div className="p-6">
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
