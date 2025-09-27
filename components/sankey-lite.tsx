"use client"

type IO = { label: string; value: number }
export type Props = {
  inputs: IO[]
  processes: string[]
  outputs: IO[]
  loopPercent: number
  landfillPercent: number
}

const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export default function SankeyLite({ inputs, processes, outputs, landfillPercent }: Props) {
  // Canvas & layout
  const width = 1000
  const height = 340
  const padX = 32
  const padY = 22
  const colW = 240
  const colGap = (width - padX * 2 - colW * 3) / 2 // gaps between 3 columns

  const nodeH = 44
  const rows = Math.max(inputs.length, processes.length, outputs.length)
  const vGap = clamp((height - padY * 2 - nodeH * rows) / Math.max(1, rows - 1), 18, 30)

  const X = {
    left: padX,
    mid: padX + colW + colGap,
    right: padX + (colW + colGap) * 2,
  }

  const left = inputs.map((d, i) => ({ x: X.left, y: padY + i * (nodeH + vGap), w: colW, h: nodeH, label: d.label, pct: d.value }))
  const mid = processes.map((p, i) => ({ x: X.mid, y: padY + i * (nodeH + vGap), w: colW, h: nodeH, label: p }))
  const right = outputs.map((d, i) => ({ x: X.right, y: padY + i * (nodeH + vGap), w: colW, h: nodeH, label: d.label, pct: d.value }))

  const eol = {
  x: X.right,
  y: height - nodeH - padY,
  w: colW,
  h: nodeH,
  label: "End-of-Life Collection",
}

const scrap = {
  x: X.left,
  y: height - nodeH - padY,
  w: colW,
  h: nodeH,
  label: "Post-Consumer Scrap",
  offsetY: 40, // 👈 custom offset to drop the loop connection below the box
}

  // Thick, visible strokes
  const thickness = (pct: number) => clamp(4 + Math.pow(pct / 100, 0.7) * 8, 4, 12)
 // 4–14px

  // Nice curve between two points
  const curve = (x1: number, y1: number, x2: number, y2: number, t = 0.42) => {
    const c1x = lerp(x1, x2, t)
    const c2x = lerp(x1, x2, 1 - t)
    return `M ${x1} ${y1} C ${c1x} ${y1}, ${c2x} ${y2}, ${x2} ${y2}`
  }

  // Simple node
  const Node = ({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={16} fill="hsl(var(--card))" stroke="hsl(var(--border))" />
      <text x={x + 16} y={y + h / 2 + 5} fill="hsl(var(--foreground))" fontSize="13" fontWeight={500}>
        {label}
      </text>
    </g>
  )

  // Links (brand/accent/destructive by className)
  const Link = ({
  a,
  b,
  pct,
  tone,
  label,
  customThickness,
}: {
  a: { x: number; y: number }
  b: { x: number; y: number }
  pct: number
  tone: "brand" | "accent-blue" | "destructive"
  label: string
  customThickness?: (pct: number) => number
}) => {
  const sw = customThickness ? customThickness(pct) : thickness(clamp(pct, 0, 100))
    const startX = a.x // off node border
    const endX = b.x - 15
    return (
      <path
        d={curve(startX, a.y, endX, b.y)}
        stroke="currentColor"
        className={`text-${tone}`}
        strokeWidth={sw}
        strokeLinecap="round"
        fill="none"
        markerEnd={`url(#arrow-${tone})`}
        aria-label={label}
      />
    )
  }

  // Build links
  const links: JSX.Element[] = []
  // left -> mid
  left.forEach((ln, i) => {
    const tgt = mid[Math.min(i, mid.length - 1)]
    links.push(
      <Link
        key={`${ln.label}->${tgt.label}`}
        a={{ x: ln.x + ln.w, y: ln.y + ln.h / 2 }}
        b={{ x: tgt.x, y: tgt.y + tgt.h / 2 }}
        pct={ln.pct ?? 0}
        tone="brand"
        label={`${ln.label} → ${tgt.label}`}
      />,
    )
  })
  // mid -> right
  mid.forEach((mn, i) => {
    const rn = right[Math.min(i, right.length - 1)]
    links.push(
      <Link
        key={`${mn.label}->${rn.label}`}
        a={{ x: mn.x + mn.w, y: mn.y + mn.h / 2 }}
        b={{ x: rn.x, y: rn.y + rn.h / 2 }}
        pct={rn.pct ?? 0}
        tone="brand"
        label={`${mn.label} → ${rn.label}`}
      />,
    )
  })
  // loop (eol -> scrap)
  // loop (eol -> scrap) → thinner stroke
// loop (eol -> scrap) → thinner stroke only for the blue arrow
// links.push(
//   <Link
//     key="Closed Loop Return"
//     a={{ x: eol.x + eol.w/40, y: eol.y + eol.h / 2 }}
//     b={{ x: scrap.x, y: scrap.y + scrap.h / 2 }}
//     pct={loopPercent}
//     tone="accent-blue"
//     label="Closed Loop Return"
//     customThickness={(p) => clamp(3 + Math.pow(p / 100, 0.7) * 6, 3, 9)} // 3–9px
//   />,
// )



  const landfillStroke = Math.max(6, thickness(clamp(landfillPercent, 0, 100)) - 6)

  return (
    <div className="relative w-full overflow-x-auto">
      <svg width={width} height={height} role="img" aria-label="Circular flow visualization">
        {/* arrowheads in plain colors (no filters/gradients) */}
        <defs>
          <marker id="arrow-brand" viewBox="0 0 10 10" refX="2.0" refY="5" markerWidth="2" markerHeight="2" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--brand))" />
          </marker>
          <marker id="arrow-accent-blue" viewBox="0 0 10 10" refX="8.2" refY="5" markerWidth="2" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--accent-blue))" />
          </marker>
          <marker id="arrow-destructive" viewBox="0 0 10 10" refX="8.2" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--destructive))" />
          </marker>
        </defs>

        {/* nodes first */}
        {left.map((n) => (
          <Node key={n.label} {...n} />
        ))}
        {mid.map((n) => (
          <Node key={n.label} {...n} />
        ))}
        {right.map((n) => (
          <Node key={n.label} {...n} />
        ))}
        <Node {...eol} />
        <Node {...scrap} />

        {/* links on TOP (after nodes) */}
        <g>{links}</g>

        {/* landfill (dotted, red, always visible) */}
        <g>
          <text x={eol.x + eol.w + 10} y={eol.y + eol.h / 2 + 4} fill="hsl(var(--muted-foreground))" fontSize="12">
            Landfill ({landfillPercent}%)
          </text>
          <line
            x1={eol.x + eol.w + 10}
            y1={eol.y + eol.h / 2}
            x2={eol.x + eol.w + 120}
            y2={eol.y + eol.h / 2}
            stroke="currentColor"
            className="text-destructive"
            strokeWidth={landfillStroke}
            strokeLinecap="round"
            strokeDasharray="6 6"
            markerEnd="url(#arrow-destructive)"
          />
        </g>
      </svg>
    </div>
  )
}