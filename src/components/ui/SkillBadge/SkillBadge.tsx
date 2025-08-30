import * as React from 'react'

type Tone = 'accent' | 'blue' | 'purple' | 'amber' | 'magenta'
const toneToHsl: Record<Tone, string> = {
  accent: 'var(--accent)',
  blue: '212 100% 60%',
  purple: '268 90% 65%',
  amber: '38 100% 56%',
  magenta: '315 85% 65%',
}

function toId(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

export function SkillBadge({
  label,
  code,
  tone = 'accent',
  title,
}: {
  label: string
  /** short code shown inside the icon (e.g., TS, NX, TW) */
  code?: string
  tone?: Tone
  title?: string
}) {
  const id = React.useMemo(
    () => `g-${toId(label)}-${Math.random().toString(36).slice(2, 7)}`,
    [label]
  )
  const hsl = toneToHsl[tone]
  const fg = 'var(--bg)'
  const border = 'var(--border)'

  return (
    <div
      className="
        inline-flex items-center gap-2 rounded-full
        border border-[hsl(var(--border)/0.5)]
        px-3 py-[6px] leading-none
        bg-[hsl(var(--surface-1))]
      "
      title={title || label}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden className="shrink-0">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={`hsl(${hsl} / 0.95)`} />
            <stop offset="100%" stopColor={`hsl(${hsl} / 0.65)`} />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="20" height="20" rx="6" fill={`url(#${id})`} />
        <rect
          x="1"
          y="1"
          width="20"
          height="20"
          rx="6"
          fill="none"
          stroke={`hsl(${border})`}
          opacity="0.35"
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="10"
          fontWeight="700"
          fill={`hsl(${fg})`}
        >
          {(code || label).toUpperCase().slice(0, 3)}
        </text>
      </svg>
      <span className="text-[13px]">{label}</span>
    </div>
  )
}
