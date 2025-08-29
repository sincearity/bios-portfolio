"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
    text: string
    speed?: number
    newlinePause?: number
    sentencePause?: number
    commaPause?: number
    onSelect?: (id: string) => void
    onOpen?: (id: string) => void
    onBack?: () => void
    /** if true, render full text immediately (no typing) */
    instant?: boolean
}

function toId(label: string) {
    return label.trim().toLowerCase().replace(/\s+/g, "-")
}

function FocusLink(props: React.ComponentProps<"button">) {
    const { className = "", ...rest } = props
    return (
        <button
            type="button"
            {...rest}
            className={`focus-ring underline underline-offset-2 hover:opacity-80 ${className}`}
        />
    )
}

/** Render inline tokens like [OPEN project-name] and [BACK] once fully typed */
function renderInlineTags(line: string, onOpen?: (id: string) => void, onBack?: () => void) {
    // Case-insensitive match for [OPEN xxx] or [BACK]
    const tagRe = /\[(OPEN)(?:\s+([^\]]+))?\]|\[(BACK)\]/gi
    const out: React.ReactNode[] = []
    let lastIndex = 0
    let m: RegExpExecArray | null

    while ((m = tagRe.exec(line))) {
        if (m.index > lastIndex) out.push(line.slice(lastIndex, m.index))

        if ((m[1]?.toLowerCase?.()) === "open") {
            const raw = (m[2] || "").trim()
            const id = toId(raw)
            out.push(
                <FocusLink key={`${m.index}-open`} onClick={() => onOpen?.(id)} className="text-accent">
                    [OPEN{raw ? ` ${raw}` : ""}]
                </FocusLink>
            )
        } else if ((m[3]?.toLowerCase?.()) === "back") {
            out.push(
                <FocusLink key={`${m.index}-back`} onClick={() => onBack?.()} className="text-muted">
                    [BACK]
                </FocusLink>
            )
        }
        lastIndex = tagRe.lastIndex
    }

    if (lastIndex < line.length) out.push(line.slice(lastIndex))
    return out.length ? out : line
}

function ClickableItem({ label, onSelect }: { label: string; onSelect?: (id: string) => void }) {
    const id = toId(label)
    return (
        <FocusLink onClick={() => onSelect?.(id)} className="text-accent">
            {label}
        </FocusLink>
    )
}

function highlight(
    line: string,
    opts: { onSelect?: (id: string) => void; onOpen?: (id: string) => void; onBack?: () => void }
) {
    const { onSelect, onOpen, onBack } = opts

    if (line.startsWith(">")) return <span className="text-accent">{renderInlineTags(line, onOpen, onBack)}</span>
    if (/^\[.*\]$/.test(line)) return <span className="text-muted">{renderInlineTags(line, onOpen, onBack)}</span>

    // LIST ITEM: "- LABEL [OPEN something]"
    if (/^-\s+/.test(line)) {
        const withoutDash = line.replace(/^-+\s*/, "")
        const m = withoutDash.match(/^([^\[]+)(.*)$/) // label (no "[") + trailing (tags)
        const label = (m?.[1] ?? withoutDash).trim()
        const trailing = m?.[2] ?? ""

        return (
            <>
                <span className="text-muted">- </span>
                <ClickableItem label={label} onSelect={onSelect} />{" "}
                {trailing ? renderInlineTags(trailing, onOpen, onBack) : null}
            </>
        )
    }

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

    if (line.startsWith("GITHUB:")) {
        const v = line.replace("GITHUB:", "").trim()
        const href = v.startsWith("http") ? v : `https://github.com/${v}`
        return (
            <>
                <span className="text-purple-400">GITHUB:</span>{" "}
                <a href={href} target="_blank" rel="noreferrer" className="text-green-400 underline underline-offset-2 hover:opacity-80">
                    {v}
                </a>
            </>
        )
    }

    return renderInlineTags(line, onOpen, onBack)
}

export function Typewriter({
                               text,
                               speed = 25,
                               newlinePause = 300,
                               sentencePause = 220,
                               commaPause = 120,
                               onSelect,
                               onOpen,
                               onBack,
                               instant = false, // <-- include and default
                           }: Props) {
    const [displayed, setDisplayed] = useState("")
    const idx = useRef(0)
    const t = useRef<number | null>(null)
    const prevTextRef = useRef<string | null>(null)

    useEffect(() => {
        // only react when the text changes
        if (prevTextRef.current === text) {
            return
        }
        prevTextRef.current = text

        // cancel any pending timer before starting new cycle
        if (t.current) window.clearTimeout(t.current)

        if (instant) {
            // show everything at once for this new text
            setDisplayed(text)
            idx.current = text.length
            return
        }

        // animate from scratch for this new text
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
    }, [text, speed, newlinePause, sentencePause, commaPause, instant])


    const parts = displayed.split("\n")
    const lastIndex = parts.length - 1

    return (
        <div className="font-mono [font-size:clamp(14px,1.7vw,16px)] leading-relaxed text-left">
            {parts.slice(0, lastIndex).map((line, i) => (
                <span key={i} className="block">
          {highlight(line, { onSelect, onOpen, onBack })}
        </span>
            ))}

            <span className="inline">
        {highlight(parts[lastIndex] ?? "", { onSelect, onOpen, onBack })}
                <span className="caret"><i aria-hidden /></span>
      </span>
        </div>
    )
}

