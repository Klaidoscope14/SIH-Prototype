"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"
import CircularProgress from "@/components/circular-progress"
import SankeyLite from "@/components/sankey-lite"

type MineralKey = "aluminum" | "copper" | "lithium"

type KPI = {
  mci: number 
  gwpCircular: number 
  energySavingsPct: number
  optimalRecycledPct: number
}

type MineralData = {
  name: string
  tag: string
  kpi: KPI
  sankey: {
    inputs: { label: string; value: number }[]
    processes: string[]
    outputs: { label: string; value: number }[]
    loopPercent: number
    landfillPercent: number
    title: string
  }
  comparison: {
    metrics: Array<{
      key: string
      linear: number
      circular: number
      unit?: string
    }>
    title: string
  }
}

const MINERALS: Record<MineralKey, MineralData> = {
  aluminum: {
    name: "Aluminum",
    tag: "High Recyclability",
    kpi: {
      mci: 0.85,
      gwpCircular: 0.8,
      energySavingsPct: 95,
      optimalRecycledPct: 90,
    },
    sankey: {
      title: "Aluminum Flow: Circular Pathway",
      inputs: [
        { label: "Primary Bauxite (10%)", value: 10 },
        { label: "Post-Consumer Scrap (90%)", value: 90 },
      ],
      processes: ["Smelting", "Manufacturing"],
      outputs: [
        { label: "Final Product (96%)", value: 96 },
        { label: "Process Waste (4%)", value: 4 },
      ],
      loopPercent: 90,
      landfillPercent: 4,
    },
    comparison: {
      title: "Impact: Linear vs. Circular Production",
      metrics: [
        { key: "Global Warming Potential (kg CO₂-eq)", linear: 16.5, circular: 0.8, unit: "kg CO₂-eq" },
        { key: "Water Scarcity (m³)", linear: 12.1, circular: 1.5, unit: "m³" },
        { key: "Resource Depletion (relative)", linear: 100, circular: 20 },
      ],
    },
  },
  copper: {
    name: "Copper",
    tag: "Essential for Electrification",
    kpi: {
      mci: 0.65,
      gwpCircular: 1.2,
      energySavingsPct: 80,
      optimalRecycledPct: 60,
    },
    sankey: {
      title: "Copper Flow: Circular Pathway",
      inputs: [
        { label: "Primary Ore (40%)", value: 40 },
        { label: "Recycled Scrap (60%)", value: 60 },
      ],
      processes: ["Refining", "Manufacturing"],
      outputs: [
        { label: "Final Product (90%)", value: 90 },
        { label: "Process Waste (10%)", value: 10 },
      ],
      loopPercent: 60,
      landfillPercent: 10,
    },
    comparison: {
      title: "Impact: Linear vs. Circular Production",
      metrics: [
        { key: "Global Warming Potential (kg CO₂-eq)", linear: 4.1, circular: 1.2, unit: "kg CO₂-eq" },
        { key: "Water Scarcity (m³)", linear: 9.5, circular: 3.1, unit: "m³" },
        { key: "Resource Depletion (relative)", linear: 85, circular: 40 },
      ],
    },
  },
  lithium: {
    name: "Lithium",
    tag: "Critical Mineral",
    kpi: {
      mci: 0.4,
      gwpCircular: 3.5,
      energySavingsPct: 45,
      optimalRecycledPct: 30,
    },
    sankey: {
      title: "Lithium Flow: Circular Pathway",
      inputs: [
        { label: "Primary Ore (70%)", value: 70 },
        { label: "Recycled Scrap (30%)", value: 30 },
      ],
      processes: ["Extraction", "Manufacturing"],
      outputs: [
        { label: "Final Product (85%)", value: 85 },
        { label: "Process Waste (15%)", value: 15 },
      ],
      loopPercent: 30,
      landfillPercent: 15,
    },
    comparison: {
      title: "Impact: Linear vs. Circular Production",
      metrics: [
        { key: "Global Warming Potential (kg CO₂-eq)", linear: 9.2, circular: 3.5, unit: "kg CO₂-eq" },
        { key: "Water Scarcity (m³)", linear: 14.0, circular: 8.2, unit: "m³" },
        { key: "Resource Depletion (relative)", linear: 95, circular: 60 },
      ],
    },
  },
}

function MineralIcon({ type }: { type: MineralKey }) {
  const common = { width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2 }
  if (type === "aluminum") {
    return (
      <svg {...common} viewBox="0 0 24 24" aria-hidden="true">
        <rect x="6" y="3" width="12" height="18" rx="2" />
        <path d="M8 7h8M8 12h8M8 17h8" />
      </svg>
    )
  }
  if (type === "copper") {
    return (
      <svg {...common} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  }
  return (
    <svg {...common} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="7" width="14" height="10" rx="2" />
      <rect x="18" y="10" width="2" height="4" />
      <path d="M9 10v4M12 10v4" />
    </svg>
  )
}

export default function Page() {
  const [selected, setSelected] = useState<MineralKey>("aluminum")
  const data = MINERALS[selected]

  const barData = data.comparison.metrics.map((m) => ({
    name: m.key,
    Linear: m.linear,
    Circular: m.circular,
  }))

  return (
    <div className="min-h-screen bg-charcoal text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-color-border/40 bg-charcoal/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-sm bg-brand" aria-hidden />
            <span className="text-pretty font-semibold tracking-tight">Circularity Intelligence</span>
          </div>
          <Button asChild className="bg-brand text-[oklch(0.1_0_0)] hover:opacity-90 font-mono">
            <a href="https://github.com/Klaidoscope14/SIH-Prototype" target="_blank" rel="noreferrer">
              View on GitHub
            </a>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 space-y-12">
        <section className="space-y-3">
          <h1 className="text-pretty text-3xl md:text-4xl font-bold">Visualizing a Circular Future for Metals</h1>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            An initiative to make circularity analysis fast, intuitive, and actionable. 
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-pretty text-2xl font-semibold">Analyze a Mineral&apos;s Life Cycle</h2>

          <h2 className="text-pretty text-2xl font-semibold">Select a mineral from the below.</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(["aluminum", "copper", "lithium"] as MineralKey[]).map((key) => {
              const active = selected === key
              const m = MINERALS[key]
              return (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  className={`text-left rounded-lg border transition-colors p-4 bg-card hover:bg-accent/10
                    ${active ? "border-brand" : "border-color-border/40"}`}
                  aria-pressed={active}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 grid place-items-center rounded-md ${
                          active ? "bg-brand text-[oklch(0.1_0_0)]" : "bg-secondary text-foreground"
                        }`}
                      >
                        <MineralIcon type={key} />
                      </div>
                      <div>
                        <div className="font-semibold">{m.name}</div>
                        <div className="text-xs text-muted-foreground">{m.tag}</div>
                      </div>
                    </div>
                    {active && <Badge className="bg-brand text-[oklch(0.1_0_0)]">Selected</Badge>}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">Material Circularity Indicator (MCI)</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <CircularProgress value={data.kpi.mci} size={120} strokeWidth={10} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">GWP (Circular Pathway)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {data.kpi.gwpCircular.toFixed(1)}
                    <span className="text-base font-normal text-muted-foreground"> kg CO₂-eq</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">Energy Savings (vs. Primary)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-brand">{data.kpi.energySavingsPct}%</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">Optimal Recycled Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{data.kpi.optimalRecycledPct}%</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">{data.sankey.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <SankeyLite
                  inputs={data.sankey.inputs}
                  processes={data.sankey.processes}
                  outputs={data.sankey.outputs}
                  loopPercent={data.sankey.loopPercent}
                  landfillPercent={data.sankey.landfillPercent}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">{data.comparison.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    Linear: { label: "Linear Pathway", color: "oklch(0.6 0 0)" },
                    Circular: { label: "Circular Pathway", color: "var(--brand)" },
                  }}
                  className="aspect-[16/7] rounded-md border border-color-border/40"
                >
                  <ResponsiveContainer>
                    <BarChart data={barData}>
                      <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: "var(--muted-foreground)" }} />
                      <YAxis tick={{ fill: "var(--muted-foreground)" }} />
                      <Legend />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="Linear" fill="hsl(0 0% 60%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Circular" fill="hsl(0 65% 100%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <p className="mt-3 text-xs text-muted-foreground">
                  Resource Depletion shown as relative index (higher = worse).
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-pretty text-2xl font-semibold">AI-Generated Insights</h2>
          <Card>
            <CardContent className="flex items-start gap-4 p-6">
              <div
                className="h-10 w-10 grid place-items-center rounded-md bg-accent-blue text-[oklch(0.98_0_0)]"
                aria-hidden
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M9 18h6M10 22h4" />
                  <path d="M8 14c-1.243-1.243-2-2.757-2-4a6 6 0 1 1 12 0c0 1.243-.757 2.757-2 4-.8.8-1.103 1.854-1.227 2.54-.075.4-.41.46-.773.46h-2c-.363 0-.698-.06-.773-.46C9.103 15.854 8.8 14.8 8 14Z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Optimization Alert for &#39;{data.name}&#39;</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Our model suggests that by sourcing scrap from a supplier using hydropower for processing, you can
                  further reduce the GWP of your circular pathway by an additional 18% with a minimal cost increase.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-pretty text-2xl font-semibold">Technology Behind the Prototype</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>AI/ML Core</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Uses a neural network trained on LCI databases to predict missing parameters and identify optimization
                opportunities.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Data Sources</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Integrates with open-source databases like ecoinvent to provide a baseline for environmental impact
                factors.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Frontend</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Built with React and displays complex data using interactive visualization libraries.
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}