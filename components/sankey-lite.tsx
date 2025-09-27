"use client"

import { useRef, useState } from "react"
import type { Node, Props } from "./types" // Assuming types are extracted to a separate file

export default function SankeyLite({ inputs, processes, outputs, loopPercent, landfillPercent }: Props) {
  const width = 900
  const height = 260
  const pad = 14
  const colW = 200
  const nodeH = 36

  // Build nodes
  const leftNodes: Node[] = inputs.map((d, i) => ({
    x: pad,
    y: pad + i * (nodeH + pad),
    w: colW,
    h: nodeH,
    label: d.label,
  }))

  const midNodes: Node[] = processes.map((p, i) => ({
    x: width / 2 - colW / 2,
    y: pad + i * (nodeH + pad),
    w: colW,
    h: nodeH,
    label: p,
  }))

  const rightNodes: Node[] = outputs.map((d, i) => ({
    x: width - colW - pad,
    y: pad + i * (nodeH + pad),
    w: colW,
    h: nodeH,
    label: d.label,
  }))

  // Special nodes
  const eol: Node = {
    x: width - colW - pad,
    y: height - nodeH - pad,
    w: colW,
    h: nodeH,
    label: "End-of-Life Collection",
  }
  const scrap: Node = { x: pad, y: height - nodeH - pad, w: colW, h: nodeH, label: "Post-Consumer Scrap" }

  // Track hover item + mouse position for tooltip
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [hover, setHover] = useState<{ title: string; detail?: string } | null>(null)
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  // Slightly darker node, add subtle elevation and hover glow
  const rect = (n: Node, fill = "oklch(0.22 0 0)") => (
    <g
      key={n.label}
      role="listitem"
      tabIndex={0}
      onMouseEnter={(e) => setHover({ title: n.label })}
      onMouseMove={(e) => {
        const b = containerRef.current?.getBoundingClientRect()
        setMouse({ x: e.clientX - (b?.left ?? 0), y: e.clientY - (b?.top ?? 0) })
      }}
      onMouseLeave={() => setHover(null)}
    >
      <rect
        x={n.x}
        y={n.y}
        width={n.w}
        height={n.h}
        rx={12}
        fill={fill}
        stroke="rgba(255,255,255,0.08)"
        style={{ filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.3))" }}
      />
      <text x={n.x + 12} y={n.y + n.h / 2 + 4} fill="oklch(0.98 0 0)" fontSize="12">
        {n.label}
      </text>
    </g>
  )

  // Unified marker ids to avoid duplicates and add hover color
  // (markers defined in the <svg> defs below)

  // Draw a flow with interactivity and hover highlight
  function flowLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    opts: { valuePct: number; label: string; color?: string; dotted?: boolean } = { valuePct: 0, label: "" },
  ) {
    const color = opts.color ?? "var(--brand)"
    const base = Math.max(4, Math.min(16, (opts.valuePct / 100) * 16))
    const isHover = hover?.title === opts.label
    const stroke = isHover ? "var(--accent-blue)" : color
    const width = isHover ? base + 4 : base

    return (
      <line
        key={opts.label + x1 + y1 + x2 + y2}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        strokeWidth={width}
        strokeDasharray={opts.dotted ? "4 4" : "0"}
        markerEnd={`url(#arrow-${isHover ? "accent" : color === "var(--destructive)" ? "red" : "brand"})`}
        strokeLinecap="round"
        className="transition-[stroke,stroke-width] duration-150 text-secondary"
        onMouseEnter={(e) => setHover({ title: opts.label, detail: `${opts.valuePct}%` })}
        onMouseMove={(e) => {
          const b = containerRef.current?.getBoundingClientRect()
          setMouse({ x: e.clientX - (b?.left ?? 0), y: e.clientY - (b?.top ?? 0) })
        }}
        onMouseLeave={() => setHover(null)}
      />
    )
  }

  // Loop path with hover
  function loopPath(from: Node, to: Node, percent: number) {
    const startX = from.x + from.w
    const startY = from.y + from.h / 2
    const endX = to.x
    const endY = to.y + to.h / 2
    const c1x = startX + 140
    const c1y = startY + 60
    const c2x = endX - 140
    const c2y = endY + 60
    const base = Math.max(4, Math.min(20, (percent / 100) * 20))
    const isHover = hover?.title === "Closed Loop Return"
    const stroke = isHover ? "var(--accent-blue)" : "var(--brand)"
    const width = isHover ? base + 4 : base

    return (
      <path
        d={`M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`}
        fill="none"
        stroke={stroke}
        strokeWidth={width}
        markerEnd={`url(#arrow-${isHover ? "accent" : "brand"})`}
        className="transition-[stroke,stroke-width] duration-150"
        onMouseEnter={() => setHover({ title: "Closed Loop Return", detail: `${percent}%` })}
        onMouseMove={(e) => {
          const b = containerRef.current?.getBoundingClientRect()
          setMouse({ x: e.clientX - (b?.left ?? 0), y: e.clientY - (b?.top ?? 0) })
        }}
        onMouseLeave={() => setHover(null)}
      />
    )
  }

  return (
    // Make container relative for positioning the HTML tooltip
    <div ref={containerRef} className="relative w-full overflow-x-auto">
      <svg width={width} height={height} role="img" aria-label="Circular flow visualization">
        {/* Defs with distinct marker ids */}
        <defs>
          <marker
            id="arrow-brand"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--brand)" />
          </marker>
          <marker
            id="arrow-red"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--destructive)" />
          </marker>
          <marker
            id="arrow-accent"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent-blue)" />
          </marker>
        </defs>

        {/* Columns */}
        {leftNodes.map((n) => rect(n))}
        {midNodes.map((n) => rect(n))}
        {rightNodes.map((n) => rect(n))}
        {rect(eol)}
        {rect(scrap)}

        {/* Flows left -> mid with hover */}
        {leftNodes.map((ln, i) => {
          const mn = midNodes[Math.min(i, midNodes.length - 1)]
          const pct = inputs[i]?.value ?? 0
          return flowLine(ln.x + ln.w, ln.y + ln.h / 2, mn.x, mn.y + mn.h / 2, {
            valuePct: pct,
            label: `${ln.label} → ${mn.label}`,
          })
        })}

        {/* Flows mid -> right with hover */}
        {midNodes.map((mn, i) => {
          const rn = rightNodes[Math.min(i, rightNodes.length - 1)]
          const outVal = outputs[Math.min(i, outputs.length - 1)]?.value ?? 0
          return flowLine(mn.x + mn.w, mn.y + mn.h / 2, rn.x, rn.y + rn.h / 2, {
            valuePct: outVal,
            label: `${mn.label} → ${rn.label}`,
          })
        })}

        {/* Loop from EoL back to Scrap with hover */}
        {loopPath(eol, scrap, loopPercent)}

        {/* Dotted red line to landfill with hover */}
        <g
          onMouseEnter={() => setHover({ title: "Landfill", detail: `${landfillPercent}%` })}
          onMouseMove={(e) => {
            const b = containerRef.current?.getBoundingClientRect()
            setMouse({ x: e.clientX - (b?.left ?? 0), y: e.clientY - (b?.top ?? 0) })
          }}
          onMouseLeave={() => setHover(null)}
        >
          <text x={eol.x + eol.w + 8} y={eol.y + eol.h / 2 + 4} fill="oklch(0.9 0.05 30)" fontSize="12">
            Landfill ({landfillPercent}%)
          </text>
          <line
            x1={eol.x + eol.w}
            y1={eol.y + eol.h / 2}
            x2={eol.x + eol.w + 80}
            y2={eol.y + eol.h / 2}
            stroke="var(--destructive)"
            strokeWidth={3}
            strokeDasharray="4 4"
            markerEnd="url(#arrow-red)"
            strokeLinecap="round"
            className="transition-[stroke-width] duration-150 hover:stroke-[4]"
          />
        </g>
      </svg>

      {/* Simple HTML tooltip for accessibility and smooth hover */}
      {hover && (
        <div
          role="tooltip"
          className="pointer-events-none absolute z-10 rounded-md border border-[color:var(--color-border)]/50 bg-[oklch(0.18_0_0)] px-2 py-1 text-xs text-foreground shadow-md"
          style={{ left: mouse.x + 12, top: mouse.y + 12 }}
        >
          <div className="font-medium">{hover.title}</div>
          {hover.detail && <div className="text-[11px] text-muted-foreground">{hover.detail}</div>}
        </div>
      )}
    </div>
  )
}
