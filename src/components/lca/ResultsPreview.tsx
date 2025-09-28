"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { formatCO2e, formatEnergy, formatVolume, formatNumber } from "@/lib/format"
import type { Phase1Results } from "@/lib/types"
import { Construction } from "lucide-react"

interface ResultsPreviewProps {
  results: Phase1Results
}

export default function ResultsPreview({ results }: ResultsPreviewProps) {
  // Prepare data for the bar chart
  const chartData = [
    {
      category: "Electricity",
      value: results.hotspots.find(h => h.name === "Electricity")?.share_pct || 0,
      color: "#3b82f6" // blue-500
    },
    {
      category: "Fuels", 
      value: results.hotspots.find(h => h.name === "Fuels")?.share_pct || 0,
      color: "#ef4444" // red-500
    },
    {
      category: "Transport",
      value: results.hotspots.find(h => h.name === "Transport")?.share_pct || 0,
      color: "#10b981" // emerald-500
    }
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Global Warming Potential
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCO2e(results.gwp_kgco2e, "kg CO2e", 1)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Total greenhouse gas emissions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Energy Consumption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatEnergy(results.energy_mj, "MJ", 0)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Total energy consumption
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Water Consumption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-600">
              {formatVolume(results.water_m3, "m³", 2)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Total water consumption
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Impact Hotspots Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Impact Hotspots</CardTitle>
          <CardDescription>
            Breakdown of global warming potential by source
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="category" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value: number) => [`${formatNumber(value, 1)}%`, 'Share']}
                  labelStyle={{ color: '#374151' }}
                />
                <Legend />
                <Bar 
                  dataKey="value" 
                  fill="#3b82f6"
                  name="Impact Share"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Hotspots List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Impact Breakdown</CardTitle>
          <CardDescription>
            Detailed breakdown of environmental impacts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.hotspots.map((hotspot, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {hotspot.name}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${hotspot.share_pct}%` }}
                    ></div>
                  </div>
                  <Badge variant="outline" className="min-w-[60px] justify-center">
                    {formatNumber(hotspot.share_pct, 1)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Phase 2 Notice */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Construction className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-orange-900 mb-1">
                Phase 2 Analytics Under Construction
              </h4>
              <p className="text-sm text-orange-800">
                Advanced analytics including Sankey diagrams, circularity scores, 
                and AI-powered recommendations are currently being developed and 
                will be available in Phase 2.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
