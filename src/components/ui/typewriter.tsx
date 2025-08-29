"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
    text: string
    speed?: number
    newlinePause?: number
    sentencePause?: number
    commaPause?: number
}

function highlight(line: string) {
    // > commands
    if (line.startsWith(">")) return <span className="text-accent">{line}</span>

    // [SECTION] headers
    if (/^\[.*\]$/.test(line)) return <span className="text-muted">{line}</span>

    // list items (- something)
    if (/^-\s+/.test(line)) {
        const item = line.replace(/^-+\s*/, "")
        return (
            <>
                <span className="text-muted">- </span>
                <span className="text-accent">{item}</span>
            </>
        )
    }

    // EMAIL: make mailto link
    if (line.startsWith("EMAIL:")) {
        const v = line.replace("EMAIL:", "").trim()
        return (
            <>
                <span className="text-purple-400">EMAIL:</span>{" "}
                <a href={`mailto:${v}`} className="text-sky-400 underline underline-offset-2 hover:opacity-80">
                    {v}
                </a>
            </>
        )
    }

    // GITHUB: make external link
    if (line.startsWith("GITHUB:")) {
        const v = line.replace("GITHUB:", "").trim()
        const href = v.startsWith("http") ? v : `https://github.com/${v}`
        return (
            <>
                <span className="text-purple-400">GITHUB:</span>{" "}
                <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-400 underline underline-offset-2 hover:opacity-80"
                >
                    {v}
                </a>
            </>
        )
    }

    return line
}

export function Typewriter({
                               text,
                               speed = 25,
                               newlinePause = 300,
                               sentencePause = 220,
                               commaPause = 120,
                           }: Props) {
    const [displayed, setDisplayed] = useState("")
    const idx = useRef(0)
    const t = useRef<number | null>(null)

    useEffect(() => {
        setDisplayed("")
        idx.current = 0

        const tick = () => {
            const i = idx.current
            if (i >= text.length) return
            const ch = text.charAt(i)
            setDisplayed((prev) => prev + ch)
            idx.current = i + 1

            let delay = speed
            if (ch === "\n") delay += newlinePause
            else if (/[.!?]/.test(ch)) delay += sentencePause
            else if (/[,;:]/.test(ch)) delay += commaPause

            t.current = window.setTimeout(tick, delay)
        }

        t.current = window.setTimeout(tick, speed)
        return () => {
            if (t.current) window.clearTimeout(t.current)
        }
    }, [text, speed, newlinePause, sentencePause, commaPause])

    const lines = displayed.split("\n").map((line, i) => (
        <div key={i}>{highlight(line)}</div>
    ))

    return (
        <div className="font-mono text-[15px] leading-relaxed text-left">
            {lines}
            <span className="inline-block w-px h-5 align-[-2px] bg-[hsl(var(--fg))] ml-0.5 animate-blink" />
        </div>
    )
}
