"use client"

import { useState, useCallback, useEffect } from "react"
import { Typewriter } from "@/components/ui/typewriter"

type Scene = "home" | "bios-terminal" | "mustard-cms"

function getSceneText(scene: Scene) {
    switch (scene) {
        case "bios-terminal":
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
        case "mustard-cms":
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
    const [scene, setScene] = useState<Scene>("home")
    const [instant, setInstant] = useState(false)

    const handleSelect = useCallback((id: string) => {
        if (id === "bios-terminal") setScene("bios-terminal")
        if (id === "mustard-cms") setScene("mustard-cms")
        // animate when opening
        setInstant(false)
    }, [])

    const handleOpen = useCallback((id: string) => {
        setInstant(false)                 // animate this next text
        if (id === "bios-terminal") setScene("bios-terminal")
        if (id === "mustard-cms") setScene("mustard-cms")
    }, [])

    const handleBack = useCallback(() => {
        setInstant(true)                  // next text (home) renders instantly
        setScene("home")
    }, [])


    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === "b" && scene !== "home") handleBack()
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [scene, handleBack])

    return (
        <Typewriter
            text={getSceneText(scene)}
            speed={24}
            onSelect={handleSelect}
            onOpen={handleOpen}
            onBack={handleBack}
            instant={instant}
        />
    )
}
