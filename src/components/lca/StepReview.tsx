"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, RotateCcw, CheckCircle, AlertCircle } from "lucide-react"
import type { Phase1Inputs, Metal } from "@/lib/types"
import { estimateMissing, validatePercentSum } from "@/lib/calculators"

interface StepReviewProps {
  inputs: Phase1Inputs
  onUpdate: (updates: Partial<Phase1Inputs>) => void
  onReset: () => void
  metal: Metal
}

const metalData: Record<Metal, { name: string; icon: string }> = {
  aluminium: { name: "Aluminium", icon: "Al" },
  aluminum: { name: "Aluminum", icon: "Al" }, // US spelling
  copper: { name: "Copper", icon: "Cu" },
  steel: { name: "Steel", icon: "Fe" },
  calcium: { name: "Calcium", icon: "Ca" },
  lithium: { name: "Lithium", icon: "Li" }
}

const gridRegionLabels: Record<string, string> = {
  EU: "European Union",
  US: "United States", 
  CN: "China",
  IN: "India",
  OTHER: "Other"
}

const routeLabels: Record<string, string> = {
  primary: "Primary (Mined)",
  secondary: "Secondary (Recycled)",
  hybrid: "Hybrid (Mixed)"
}

const transportModeLabels: Record<string, string> = {
  truck: "Truck",
  rail: "Rail",
  sea: "Sea",
  air: "Air"
}

export default function StepReview({ inputs, onUpdate, onReset, metal }: StepReviewProps) {
  const handleAIFill = () => {
    const estimated = estimateMissing(inputs)
    onUpdate(estimated)
  }

  const compositionValidation = validatePercentSum(
    inputs.composition.map(c => ({ label: c.component, value: c.percent }))
  )

  const fuelTotal = Object.values(inputs.route.energy.fuel_mix_pct).reduce((sum, value) => sum + value, 0)
  const isFuelTotalValid = Math.abs(fuelTotal - 100) < 0.1

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Review Your Inputs</h3>
          <p className="text-sm text-gray-600">
            Please review all information before running the assessment
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAIFill} className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            AI-Fill Missing
          </Button>
          <Button variant="outline" onClick={onReset} className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {/* Product Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              Product Information
              {inputs.product_name ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Product Name:</span>
              <span className="text-sm font-medium">{inputs.product_name || "Not specified"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Metal:</span>
              <span className="text-sm font-medium">
                {metalData[metal]?.name} ({metalData[metal]?.icon})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Functional Unit:</span>
              <span className="text-sm font-medium">{inputs.functional_unit_kg} kg</span>
            </div>
          </CardContent>
        </Card>

        {/* Composition */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              Composition
              {compositionValidation.ok ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {inputs.composition.map((part, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-sm text-gray-600">{part.component}:</span>
                  <span className="text-sm font-medium">{part.percent}%</span>
                </div>
              ))}
              <div className="flex justify-between border-t pt-2">
                <span className="text-sm font-medium">Total:</span>
                <Badge variant={compositionValidation.ok ? "default" : "destructive"}>
                  {compositionValidation.total}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Production Route */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              Production Route
              <CheckCircle className="w-4 h-4 text-green-600" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Route Type:</span>
              <span className="text-sm font-medium">{routeLabels[inputs.route.route]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Plant Yield:</span>
              <span className="text-sm font-medium">{inputs.route.plant_yield_pct}%</span>
            </div>
            {(inputs.route.recycled_content_pct || 0) > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Recycled Content:</span>
                <span className="text-sm font-medium">{inputs.route.recycled_content_pct}%</span>
              </div>
            )}
            {(inputs.route.byproduct_credit_pct || 0) > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Byproduct Credit:</span>
                <span className="text-sm font-medium">{inputs.route.byproduct_credit_pct}%</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Energy Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              Energy Profile
              {isFuelTotalValid ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Electricity:</span>
              <span className="text-sm font-medium">
                {inputs.route.energy.electricity_kwh_per_t 
                  ? `${inputs.route.energy.electricity_kwh_per_t} kWh/t`
                  : "AI Estimated"
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Grid Region:</span>
              <span className="text-sm font-medium">
                {gridRegionLabels[inputs.route.energy.grid_region]}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Onsite Renewables:</span>
              <span className="text-sm font-medium">{inputs.route.energy.onsite_renewables_pct}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Fuel Mix Total:</span>
              <Badge variant={isFuelTotalValid ? "default" : "destructive"}>
                {fuelTotal.toFixed(1)}%
              </Badge>
            </div>
            {(inputs.route.energy.efficiency_bonus_pct || 0) > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Efficiency Bonus:</span>
                <span className="text-sm font-medium">{inputs.route.energy.efficiency_bonus_pct}%</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Transport */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              Transport
              <CheckCircle className="w-4 h-4 text-green-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {inputs.route.transport_inbound && inputs.route.transport_inbound.length > 0 ? (
              <div className="space-y-2">
                {inputs.route.transport_inbound.map((leg, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      {transportModeLabels[leg.mode]}:
                    </span>
                    <span className="text-sm font-medium">
                      {leg.distance_km} km
                      {leg.mass_tonnes && ` (${leg.mass_tonnes} t)`}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No transport legs specified</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Validation Summary */}
      <Card className={compositionValidation.ok && isFuelTotalValid ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            {compositionValidation.ok && isFuelTotalValid ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <span className="font-medium">
              {compositionValidation.ok && isFuelTotalValid 
                ? "All inputs are valid and ready for assessment"
                : "Please fix validation errors before proceeding"
              }
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
